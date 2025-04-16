import Decimal from "decimal.js";

export type GaugeVote = {
  address: string;
  votePower: Decimal;
  weightedVotePower: Decimal;
  totalVote: Decimal;
  incentiveShare: Decimal;
};

type ProcessedVote = {
  address: string;
  votePower: Decimal;
  weightedVotePower: Decimal;
  voteTimestamp: string;
};

type GaugeVotesResponse = {
  data: {
    users: {
      id: string;
      votingLocks: {
        bias: string;
        slope: string;
        timestamp: string;
      }[];
      gaugeVotes: {
        weight: string;
        timestamp: string;
      }[];
    }[];
  };
};

type HistoricalLockResponse = {
  data?: {
    lockSnapshots?: {
      bias: string;
      slope: string;
      timestamp: string;
    }[];
  };
};

const getGaugeVotesQuery = (
  gauge: string,
  voteDeadline: number,
  lockTimestamp: number
) => `
query gaugeVotes {
  users(
    first: 1000
    skip: 0
    where: {
      votingLocks_: {
        timestamp_gt: ${lockTimestamp}
      }
      gaugeVotes_: {
        gauge_contains: "${gauge}"
      	timestamp_lte: ${voteDeadline}
      }
    }
  ) {
    id
    votingLocks {
        bias
        slope
        timestamp
      }
    gaugeVotes(
    first: 1,
    orderBy: timestamp
    orderDirection: desc
    where: {
      gauge_: {
        address: "${gauge}"
      },
      timestamp_lte: ${voteDeadline}
    }
    ) {
      weight
      timestamp
    }
  }
}
`;

const getLockSnapshotQuery = (user: string, voteTimestamp: number) => `
  query LockSnapshots {
    lockSnapshots (
      first: 1
      orderBy: timestamp
      orderDirection: desc
      where: {
        user: "${user}"
        timestamp_lte: ${voteTimestamp}
      }
    ) {
      bias
      slope
      timestamp
    }
}
`;

/**
 * Calculate vote power at a given timestamp
 * @param bias - Vote Power at time of lock
 * @param slope - Vote power decay rate (per second)
 * @param timestamp - Timestamp of lock creation
 * @param checkpointTimestamp - Timestamp of checkpoint
 * @returns Vote power at checkpointTimestamp, or 0 if expired
 */
export const getVotePower = (
  bias: string,
  slope: string,
  timestamp: string,
  checkpointTimestamp: string
) => {
  const decimalBias = new Decimal(bias);
  const decimalSlope = new Decimal(slope);
  const secondsSinceLock = new Decimal(checkpointTimestamp).minus(timestamp);

  const votePower = decimalBias.minus(decimalSlope.times(secondsSinceLock));
  return votePower.isPositive() ? votePower : new Decimal(0);
};

/**
 * Get all users who voted for a gauge and calculate their vote power
 * @param gauge - Gauge address
 * @param voteDeadline - Timestamp of vote deadline
 * @param lockTimestamp - Timestamp of lock creation
 * @returns Array of GaugeVote objects
 */
export async function getGaugeVotes(
  gauge: string,
  voteDeadline: number,
  lockTimestamp: number,
  gaugesSubgraph: string
): Promise<GaugeVote[]> {
  console.log("Getting gauge votes for", gauge);
  console.log("Gauges subgraph", gaugesSubgraph);
  console.log("Vote deadline", voteDeadline);
  console.log("Lock timestamp", lockTimestamp);
  // 1. Get all users who voted for the gauge
  const response = await fetch(gaugesSubgraph, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: getGaugeVotesQuery(gauge, voteDeadline, lockTimestamp),
    }),
  });

  const data = (await response.json()) as GaugeVotesResponse;
  const users = data.data.users;

  // 2. Process each user's vote data
  const processedVotes: ProcessedVote[] = (
    await Promise.all(
      users
        .filter((user) => user.gaugeVotes[0].weight !== "0")
        .map(async (user) => {
          let lockData = user.votingLocks[0];
          const voteTimestamp = Number(user.gaugeVotes[0].timestamp);

          // If lock is more recent than vote, fetch historical lock data
          if (Number(lockData.timestamp) > voteTimestamp) {
            const historicalLockResponse = await fetch(gaugesSubgraph, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                query: getLockSnapshotQuery(user.id, voteTimestamp),
              }),
            });

            const historicalData =
              (await historicalLockResponse.json()) as HistoricalLockResponse;
            if (
              historicalData.data?.lockSnapshots &&
              historicalData.data.lockSnapshots.length > 0
            ) {
              lockData = historicalData.data.lockSnapshots[0];
            }
          }

          const baseVotePower = getVotePower(
            lockData.bias,
            lockData.slope,
            lockData.timestamp,
            voteDeadline.toString()
          );

          // Adjust vote power by weight percentage
          // weight of 0.00000000000001 (1e-14) = 100%
          const weight = new Decimal(user.gaugeVotes[0].weight).times(1e14);
          const adjustedVotePower = baseVotePower.times(weight);

          return {
            address: user.id,
            votePower: baseVotePower,
            weightedVotePower: adjustedVotePower,
            voteTimestamp: user.gaugeVotes[0].timestamp,
          };
        })
    )
  ).filter((vote) => vote.weightedVotePower.gt(0)); // Filter out zero vote power
  console.log("Processed votes", processedVotes);
  // 3. Calculate total voting power
  const totalVotePower = processedVotes.reduce(
    (sum, vote) => sum.plus(vote.weightedVotePower),
    new Decimal(0)
  );
  console.log("Total vote power", totalVotePower);
  // 4. Add total voting power to each vote
  return processedVotes.map((vote) => ({
    ...vote,
    totalVote: totalVotePower,
    incentiveShare: vote.weightedVotePower.div(totalVotePower),
  }));
}

/**
 * Get all gauge votes for a list of gauges
 * @param gauges - Array of gauge addresses
 * @param deadline - Timestamp of vote deadline
 * @param lockTimestamp - Timestamp of lock creation
 * @returns Object with gauge addresses as keys and GaugeVote arrays as values
 */
export async function getGaugeVotesForAll(
  gauges: string[],
  deadline: number,
  lockTimestamp: number,
  gaugesSubgraph: string
) {
  const gaugeVotes: Record<string, GaugeVote[]> = {};
  await Promise.all(
    gauges.map(async (gauge) => {
      const votes = await getGaugeVotes(
        gauge,
        deadline,
        lockTimestamp,
        gaugesSubgraph
      );
      gaugeVotes[gauge] = votes;
    })
  );
  return gaugeVotes;
}
