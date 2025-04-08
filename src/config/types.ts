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

export type NetworkConfig = {
  name: Network;
  client: PublicClient;
  wallet: WalletClient;
  proposalDuration: number;
  proposalStartTime: number;
  cron: string;
  cronJobs: Record<string, { cron: string }>;
  contracts: Contracts;
  bribeApi: string;
  subgraphs?: {
    gauges?: string;
  };
  gauges: Gauge[];
  maxLockDuration: number;
};

export type Contracts = {
  gaugeRegistry: `0x${string}`;
  gaugeController: `0x${string}`;
  bribeVault: `0x${string}`;
  protocolFeesCollector: `0x${string}`;
  regenerativeBribeMarket: `0x${string}`;
  rewardDistributor: `0x${string}`;
  votingEscrow: `0x${string}`;
};
