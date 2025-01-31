import Decimal from "decimal.js";
import type { GaugeVote } from "./votes";
import { keccak256 } from "viem";
import { encodePacked } from "viem";

export type Bribe = {
  token: string;
  amount: string;
  proposal: string;
  gauge: string;
};

export const generateRewardIdentifier = (
  market: `0x${string}`,
  token: `0x${string}`,
  proposalDeadline: bigint
) => {
  return keccak256(
    encodePacked(
      ["address", "uint256", "address"],
      [market, proposalDeadline, token]
    )
  );
};

export function calculateRewards(
  bribes: Bribe[],
  gaugeVotes: Record<string, GaugeVote[]>
) {
  const rewardsByToken: Record<
    string,
    {
      token: string;
      amount: Decimal;
      userRewards: { user: string; amount: string }[];
    }
  > = {};

  bribes.forEach((bribe) => {
    const votes = gaugeVotes[bribe.gauge];
    if (!votes || votes.length === 0) return;

    if (!rewardsByToken[bribe.token]) {
      rewardsByToken[bribe.token] = {
        token: bribe.token,
        amount: new Decimal(0),
        userRewards: [],
      };
    }

    const bribeAmount = new Decimal(bribe.amount);
    votes.forEach((vote) => {
      const userShare = bribeAmount.mul(vote.incentiveShare);
      const existingReward = rewardsByToken[bribe.token].userRewards.find(
        (r) => r.user === vote.address
      );

      if (existingReward) {
        existingReward.amount = new Decimal(existingReward.amount)
          .plus(userShare)
          .toFixed();
      } else {
        rewardsByToken[bribe.token].userRewards.push({
          user: vote.address,
          amount: userShare.toFixed(),
        });
      }

      rewardsByToken[bribe.token].amount =
        rewardsByToken[bribe.token].amount.plus(userShare);
    });
  });

  return rewardsByToken;
}
