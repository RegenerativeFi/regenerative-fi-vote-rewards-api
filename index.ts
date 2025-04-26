import app from "./src";
import { privateKeyToAccount } from "viem/accounts";
import { Network } from "./src/config/types";
import { processBribesForNetwork } from "./src";

export interface Env {
  KV: KVNamespace;
  BW: Fetcher;
  URL: string;
  MERKLE_TREES: KVNamespace;
  INCENTIVES_KV: KVNamespace;
  GITHUB_TOKEN: string;
  PRIVATE_KEY: string;
}

const chainAccount = (env: Env) => {
  return privateKeyToAccount(env.PRIVATE_KEY as `0x${string}`);
};

export default {
  async scheduled(
    event: ScheduledEvent,
    env: Env,
    ctx: ExecutionContext
  ): Promise<void> {
    console.log("Cron job triggered", event.cron);
    switch (event.cron) {
      case "2 0 * * *":
        // console.log("Processing bribes for Alfajores");
        // await processBribesForNetwork(Network.ALFAJORES, env);
        console.log("Processing bribes for Celo");
        await processBribesForNetwork(Network.CELO, env);
        break;
    }
  },

  async fetch(request: Request, env: any) {
    console.log("Fetch triggered", request.url);
    return await app.fetch(request, env);
  },
};
