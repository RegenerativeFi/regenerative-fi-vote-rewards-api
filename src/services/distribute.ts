import { Account } from "viem/accounts";
import { configs } from "../config";
import { RewardDistributor } from "../config/abis/RewardDistributor";
import { Network } from "../config/types";
import { encodeFunctionData } from "viem";

export interface Proof {
  identifier: `0x${string}`;
  token: `0x${string}`;
  merkleRoot: `0x${string}`;
  proof: `0x${string}`;
}

// Add proofs to the RewardDistributor contract
export async function addProofs(
  proofs: Proof[],
  network: Network,
  account: Account
) {
  const config = configs[network];
  const walletClient = config.wallet;

  const data = encodeFunctionData({
    abi: RewardDistributor,
    functionName: "updateRewardsMetadata",
    args: [proofs],
  });

  const tx = await walletClient.sendTransaction({
    chain: walletClient.chain,
    account,
    to: config.contracts.rewardDistributor,
    data,
  });
  console.log("Transaction sent", tx);
  return tx;
}
