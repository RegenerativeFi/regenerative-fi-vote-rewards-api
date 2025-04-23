import { SimpleMerkleTree } from "@openzeppelin/merkle-tree";
import type Decimal from "decimal.js";
import { Env } from "../index";
import { Network } from "../config/types";
import { keccak256, encodePacked } from "viem";
import { configs } from "../config";
import { generateRewardIdentifier } from "./rewards";
import { RewardDistributor } from "../config/abis/RewardDistributor";

export type MerkleData = {
  [deadline: string]: {
    [token: string]: {
      identifier: string;
      root: string;
      tree: string;
      userRewards: { user: string; amount: string }[];
    };
  };
};

export function createMerkleTrees(
  rewardsByToken: Record<
    string,
    {
      token: string;
      amount: Decimal;
      userRewards: { user: string; amount: string }[];
    }
  >,
  deadline: number,
  network: Network
): MerkleData {
  const merkleData: MerkleData = {
    [deadline]: {},
  };

  for (const token in rewardsByToken) {
    const leaves = rewardsByToken[token].userRewards.map((r) =>
      keccak256(
        encodePacked(
          ["address", "uint256"],
          [r.user as `0x${string}`, BigInt(r.amount)]
        )
      )
    );

    const tree = SimpleMerkleTree.of(leaves);

    merkleData[deadline][token] = {
      identifier: generateRewardIdentifier(
        configs[network].contracts.regenerativeBribeMarket,
        token as `0x${string}`,
        BigInt(deadline)
      ),
      root: tree.root,
      tree: JSON.stringify(tree.dump()),
      userRewards: rewardsByToken[token].userRewards,
    };
  }

  return merkleData;
}

export async function storeMerkleTrees(
  merkleData: MerkleData,
  deadline: number,
  network: Network,
  env: Env
) {
  // Store in KV
  await env.MERKLE_TREES.put(
    `merkle-trees-${network}-${deadline}`,
    JSON.stringify(merkleData)
  );

  // Also store in GitHub for public access
  // const content = btoa(JSON.stringify(merkleData, null, 2));
  // await fetch(
  //   `https://api.github.com/repos/OWNER/REPO/contents/merkle-trees/${network}/${deadline}.json`,
  //   {
  //     method: "PUT",
  //     headers: {
  //       Authorization: `Bearer ${env.GITHUB_TOKEN}`,
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       message: `Update merkle tree for network ${network} deadline ${deadline}`,
  //       content,
  //       branch: "main",
  //     }),
  //   }
  // );
}

export async function loadMerkleData(
  deadline: number,
  network: Network,
  env: Env
): Promise<MerkleData> {
  try {
    // Read from KV
    const data = await env.MERKLE_TREES.get(
      `merkle-trees-${network}-${deadline}`
    );
    if (!data) {
      throw new Error(
        `No merkle tree data found for network ${network} deadline ${deadline}`
      );
    }
    return JSON.parse(data);
  } catch (error: any) {
    throw new Error(`Failed to load merkle data: ${error.message}`);
  }
}

export function getMerkleTree(
  data: MerkleData,
  deadline: number,
  token: string
) {
  if (!data[deadline] || !data[deadline][token]) {
    throw new Error(
      `No merkle tree found for deadline ${deadline} and token ${token}`
    );
  }
  return SimpleMerkleTree.load(JSON.parse(data[deadline][token].tree));
}

export async function getUserProofs(user: string, network: Network, env: Env) {
  console.log("Getting user proofs for", user, network);
  const keys = await env.MERKLE_TREES.list({
    prefix: `merkle-trees-${network}-`,
  });
  console.log(
    "Found merkle trees:",
    keys.keys.map((k) => k.name)
  );

  const proofs: Record<
    string,
    {
      identifier: string;
      token: string;
      user: string;
      amount: string;
      proof: string[];
      root: string;
      deadline: number;
      claimed: string;
      claimable: string;
    }[]
  > = {};

  await Promise.all(
    keys.keys.map(async ({ name }) => {
      const deadline = name.split("-").pop()!;
      const data = await loadMerkleData(Number(deadline), network, env);
      proofs[deadline] = [];

      for (const [token, { tree, root, userRewards }] of Object.entries(
        data[deadline]
      )) {
        console.log(`Processing token ${token} for deadline ${deadline}`);
        const merkleTree = SimpleMerkleTree.load(JSON.parse(tree));
        const identifier = generateRewardIdentifier(
          configs[network].contracts.regenerativeBribeMarket,
          token as `0x${string}`,
          BigInt(deadline)
        );

        const userReward = userRewards.find(
          (v) => v.user.toLowerCase() === user.toLowerCase()
        );
        if (userReward) {
          const userLeaf = keccak256(
            encodePacked(
              ["address", "uint256"],
              [user as `0x${string}`, BigInt(userReward.amount)]
            )
          );

          const proof = merkleTree.getProof(userLeaf);
          if (proof) {
            proofs[deadline].push({
              identifier,
              token,
              user,
              amount: userReward.amount,
              deadline: Number(deadline),
              proof,
              root,
              claimed: "0",
              claimable: "0",
            });
          }
        }
      }
    })
  );

  return proofs;
}

export async function getUserProofsWithClaimed(
  user: string,
  network: Network,
  env: Env
) {
  const proofs = await getUserProofs(user, network, env);
  const rewardContract = configs[network].contracts.rewardDistributor;

  // Prepare all contract calls
  const calls = Object.values(proofs).flatMap((deadlineProofs) =>
    deadlineProofs.map((proof) => ({
      address: rewardContract,
      abi: RewardDistributor,
      functionName: "claimed",
      args: [proof.identifier as `0x${string}`, user as `0x${string}`],
    }))
  );

  // Batch fetch all claimed amounts
  const claimedAmounts = await configs[network].client.multicall({
    contracts: calls,
  });

  // Track total claimable by token
  const totalsByToken: Record<string, string> = {};

  // Map results back to proofs and filter out fully claimed
  let claimIndex = 0;
  for (const deadline in proofs) {
    proofs[deadline] = proofs[deadline].filter((proof) => {
      const claimed = claimedAmounts[claimIndex++].result as bigint;
      const claimable = BigInt(proof.amount) - claimed;

      // Skip if fully claimed
      if (claimable <= 0n) return false;

      // Add to totals
      totalsByToken[proof.token] = (
        BigInt(totalsByToken[proof.token] || "0") + claimable
      ).toString();

      // Keep proof with claim info
      proof.claimed = claimed.toString();
      proof.claimable = claimable.toString();
      return true;
    });

    // Remove empty deadlines
    if (proofs[deadline].length === 0) {
      delete proofs[deadline];
    }
  }

  return {
    proofs,
    totals: totalsByToken,
  };
}

export async function storeProofTransaction(
  deadline: number,
  network: Network,
  txHash: string,
  env: Env
) {
  await env.MERKLE_TREES.put(`proof-tx-${network}-${deadline}`, txHash);
}

export async function getProofTransaction(
  deadline: number,
  network: Network,
  env: Env
): Promise<string | null> {
  return await env.MERKLE_TREES.get(`proof-tx-${network}-${deadline}`);
}
