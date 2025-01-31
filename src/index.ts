import { Hono } from "hono";
import { configs } from "./config";
import { Network } from "./config/types";
import {
  fetchBribes,
  processBribes,
  processBribesForDeadline,
} from "./services/bribes";
import { parseExpression } from "cron-parser";
import { Bindings } from "./types";
import { getUserProofs, loadMerkleData } from "./services/merkle";

export interface Env {
  KV: KVNamespace;
  BW: Fetcher;
  URL: string;
  MERKLE_TREES: KVNamespace;
  GITHUB_TOKEN: string;
  PRIVATE_KEY: string;
}

const app = new Hono<{ Bindings: Bindings }>();

app.get("/", (c) => {
  return c.text("Hello World!");
});

function getPreviousDeadline(startTime: number, duration: number) {
  const now = Math.floor(Date.now() / 1000);

  // Validate inputs
  if (duration <= 0) throw new Error("Duration must be positive");
  if (startTime > now) throw new Error("Start time is in the future");

  // Calculate previous deadline
  const periodsSinceStart = Math.floor((now - startTime) / duration);
  if (periodsSinceStart < 0) return startTime;

  return startTime + periodsSinceStart * duration;
}

function validateNetworkConfig(network: Network) {
  const networkConfig = configs[network];

  if (!networkConfig) {
    throw new Error("Invalid network");
  }

  if (!networkConfig.subgraphs?.gauges) {
    throw new Error("Gauges subgraph is not configured");
  }

  return networkConfig;
}

app.get("/:network/process-bribes", async (c) => {
  const { network } = c.req.param() as { network: Network };
  const networkConfig = validateNetworkConfig(network);

  const deadline = getPreviousDeadline(
    networkConfig.proposalStartTime,
    networkConfig.proposalDuration
  );

  // Check if already processed
  try {
    const existingData = await loadMerkleData(deadline, network, c.env);
    return c.json(existingData);
  } catch {
    // Process if not found
    return c.json(await processBribesForDeadline(network, deadline, c.env));
  }
});

app.get("/:network/process-bribes/:deadline", async (c) => {
  const { network, deadline } = c.req.param() as {
    network: Network;
    deadline: string;
  };
  validateNetworkConfig(network);

  // Check if already processed
  try {
    const existingData = await loadMerkleData(Number(deadline), network, c.env);
    return c.json(existingData);
  } catch {
    // Process if not found
    return c.json(
      await processBribesForDeadline(network, Number(deadline), c.env)
    );
  }
});

app.get("/:network/proofs/:user", async (c) => {
  const { network, user } = c.req.param() as { network: Network; user: string };
  validateNetworkConfig(network);
  const proofs = await getUserProofs(user, network, c.env);
  return c.json(proofs);
});

export default app;
