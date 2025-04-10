import { Network } from "../config/types";
import {
  createMerkleTrees,
  storeMerkleTrees,
  storeProofTransaction,
  getProofTransaction,
} from "./merkle";
import { calculateRewards } from "./rewards";
import { Env } from "../index";
import type { Bribe } from "./rewards";
import { getGaugeVotesForAll } from "./votes";
import { configs } from "../config/";
import { addProofs } from "./distribute";
import { privateKeyToAccount } from "viem/accounts";

type BribesResponse = {
  bribes: {
    token: string;
    amount: string;
    proposal: string;
    gauge: string;
  }[];
};

export async function fetchBribes(
  deadline: number,
  bribeApi: string,
  network: Network
) {
  const queryUrl = `${bribeApi}/${network}/get-incentives/${deadline}`;
  console.log("Fetching bribes from", queryUrl);
  const bribes = await fetch(queryUrl);

  if (!bribes.ok) {
    throw new Error("Failed to fetch bribes");
  }

  const bribesData = (await bribes.json()) as BribesResponse;

  return bribesData.bribes;
}

export async function processBribes(
  gauges: string[],
  deadline: number,
  lockTimestamp: number,
  bribes: Bribe[],
  subgraph: string,
  network: Network,
  env: Env
) {
  // Get votes for each gauge
  const gaugeVotes = await getGaugeVotesForAll(
    gauges,
    deadline,
    lockTimestamp,
    subgraph
  );

  // Calculate rewards
  const rewardsByToken = calculateRewards(bribes, gaugeVotes);

  // Create and store merkle trees
  const merkleData = createMerkleTrees(rewardsByToken, deadline, network);
  await storeMerkleTrees(merkleData, deadline, network, env);

  // Add proofs to the RewardDistributor contract
  const proofs = Object.entries(merkleData[deadline]).map(([token, tree]) => ({
    identifier: tree.identifier as `0x${string}`,
    token: token as `0x${string}`,
    merkleRoot: tree.root as `0x${string}`,
    proof:
      "0x0000000000000000000000000000000000000000000000000000000000000000" as `0x${string}`,
  }));

  const account = privateKeyToAccount(env.PRIVATE_KEY as `0x${string}`);

  const txHash = await addProofs(proofs, network, account);
  console.log("Distribute proofs tx:", txHash);

  // Store the transaction hash
  await storeProofTransaction(deadline, network, txHash, env);

  return { rewardsByToken, merkleData, txHash };
}

export async function processBribesForDeadline(
  network: Network,
  deadline: number,
  env: Env
) {
  const { gauges, subgraphs, bribeApi, maxLockDuration } = configs[network];
  const lockTimestamp = deadline - maxLockDuration;
  const bribes = await fetchBribes(deadline, bribeApi, network);

  if (!subgraphs?.gauges) {
    throw new Error("Gauges subgraph is not configured");
  }

  return processBribes(
    gauges.map((gauge) => gauge.address),
    deadline,
    lockTimestamp,
    bribes,
    subgraphs.gauges!,
    network,
    env
  );
}

export { storeProofTransaction, getProofTransaction };
