import { type PublicClient, type WalletClient } from "viem";

export enum Network {
  CELO = "celo",
  ALFAJORES = "alfajores",
}
export type Gauge = {
  address: `0x${string}`;
  lpToken: `0x${string}`;
  lpSymbol: string;
};

export interface NetworkConfig {
  name: Network;
  client: PublicClient;
  wallet: WalletClient;
  proposalStartTime: number;
  proposalDuration: number;
  maxLockDuration: number;
  proofWaitTime: number;
  cron: string;
  cronJobs: {
    setProposals: {
      cron: string;
    };
  };
  contracts: Contracts;
  bribeApi: string;
  subgraphs?: {
    gauges?: string;
  };
  gauges: Gauge[];
}

export type Contracts = {
  gaugeRegistry: `0x${string}`;
  gaugeController: `0x${string}`;
  bribeVault: `0x${string}`;
  protocolFeesCollector: `0x${string}`;
  regenerativeBribeMarket: `0x${string}`;
  rewardDistributor: `0x${string}`;
  votingEscrow: `0x${string}`;
};
