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

export const getCacheKey = (network: Network, deadline?: string) => {
  return `incentives:${network}${deadline ? `:${deadline}` : ""}`;
};

export async function fetchBribes(
  deadline: number,
  env: Env,
  network: Network
) {
  const cacheKey = getCacheKey(network, deadline.toString());
  const bribes = await env.INCENTIVES_KV.get(cacheKey);

  if (!bribes) {
    return [];
  }

  const bribesData = JSON.parse(bribes) as BribesResponse;

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

  console.log("Gauge votes", gaugeVotes);

  // Calculate rewards
  const rewardsByToken = calculateRewards(bribes, gaugeVotes);
  console.log("Rewards by token", rewardsByToken);
  // Create and store merkle trees
  const merkleData = createMerkleTrees(rewardsByToken, deadline, network);
  console.log("Merkle data", merkleData);
  await storeMerkleTrees(merkleData, deadline, network, env);

  // Add proofs to the RewardDistributor contract
  const proofs = Object.entries(merkleData[deadline]).map(([token, tree]) => ({
    identifier: tree.identifier as `0x${string}`,
    token: token as `0x${string}`,
    merkleRoot: tree.root as `0x${string}`,
    proof:
      "0x0000000000000000000000000000000000000000000000000000000000000000" as `0x${string}`,
  }));

  console.log("Proofs", proofs);

  if (proofs.length === 0) {
    return { rewardsByToken, merkleData, txHash: null };
  }

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
  const { gauges, subgraphs, maxLockDuration } = configs[network];
  const lockTimestamp = deadline - maxLockDuration;
  const bribes = await fetchBribes(deadline, env, network);
  console.log("Bribes", bribes);

  if (bribes.length === 0) {
    return { rewardsByToken: {}, merkleData: {}, txHash: null };
  }

  if (!subgraphs?.gauges) {
    throw new Error("Gauges subgraph is not configured");
  }

  // Get unique gauge addresses that have bribes and are in our config
  const gaugesWithBribes = [
    ...new Set(bribes.map((bribe) => bribe.gauge.toLowerCase())),
  ].filter((address) =>
    gauges.some((g) => g.address.toLowerCase() === address)
  );

  return processBribes(
    gaugesWithBribes,
    deadline,
    lockTimestamp,
    bribes,
    subgraphs.gauges!,
    network,
    env
  );
}

export { storeProofTransaction, getProofTransaction };
