import { Context, Hono } from "hono";
import { cors } from "hono/cors";
import { configs } from "./config";
import { Network } from "./config/types";
import {
  fetchBribes,
  processBribes,
  processBribesForDeadline,
  getProofTransaction,
  storeProofTransaction,
} from "./services/bribes";
import { parseExpression } from "cron-parser";
import { Bindings } from "./types";
import {
  getUserProofs,
  getUserProofsWithClaimed,
  loadMerkleData,
} from "./services/merkle";
import { addProofs } from "./services/distribute";
import { privateKeyToAccount } from "viem/accounts";

export interface Env {
  KV: KVNamespace;
  BW: Fetcher;
  URL: string;
  MERKLE_TREES: KVNamespace;
  INCENTIVES_KV: KVNamespace;
  GITHUB_TOKEN: string;
  PRIVATE_KEY: string;
}

const app = new Hono<{ Bindings: Bindings }>();

app.use(cors());

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

export async function processBribesForNetwork(
  network: Network,
  env: Env,
  deadline?: number
) {
  const networkConfig = validateNetworkConfig(network);
  const end =
    deadline ??
    getPreviousDeadline(
      networkConfig.proposalStartTime,
      networkConfig.proposalDuration
    );

  // Check if merkle tree exists and transaction was successful
  try {
    const existingData = await loadMerkleData(end, network, env);
    const txHash = await getProofTransaction(end, network, env);

    // If we have both merkle data and a transaction hash, verify the tx
    if (txHash) {
      const receipt = await networkConfig.client.getTransactionReceipt({
        hash: txHash as `0x${string}`,
      });

      if (receipt && receipt.status === "success") {
        return existingData;
      }
      // If tx failed or doesn't exist, we should reprocess
      console.log("Previous transaction failed or not found, reprocessing...");
    }
  } catch (e) {
    console.log("No existing data found or error loading data, processing...");
  }

  // Process if not found or if previous tx failed
  return await processBribesForDeadline(network, end, env);
}

app.get("/:network/process-bribes", async (c) => {
  const network = c.req.param("network") as Network;
  const data = await processBribesForNetwork(network, c.env);
  return c.json(data);
});

app.get("/:network/process-bribes/:deadline", async (c) => {
  const { network, deadline } = c.req.param() as {
    network: Network;
    deadline: string;
  };
  const data = await processBribesForNetwork(network, c.env, Number(deadline));
  return c.json(data);
});

app.get("/:network/merkle-trees/:deadline", async (c) => {
  const { network, deadline } = c.req.param() as {
    network: Network;
    deadline: string;
  };
  const data = await loadMerkleData(Number(deadline), network, c.env);
  return c.json(data);
});

// app.get("/:network/distribute-proofs/:deadline", async (c) => {
//   const { network, deadline } = c.req.param() as {
//     network: Network;
//     deadline: string;
//   };

//   // Check if we already have a successful transaction
//   // const existingTx = await getProofTransaction(
//   //   Number(deadline),
//   //   network,
//   //   c.env
//   // );
//   // if (existingTx) {
//   //   const receipt = await configs[network].client.getTransactionReceipt({
//   //     hash: existingTx as `0x${string}`,
//   //   });
//   //   if (receipt && receipt.status === "success") {
//   //     return c.json({ txHash: existingTx, status: "already_processed" });
//   //   }
//   // }

//   // load merkle trees
//   const trees = await loadMerkleData(Number(deadline), network, c.env);

//   const proofs = Object.entries(trees[Number(deadline)]).map(
//     ([token, tree]) => ({
//       identifier: tree.identifier as `0x${string}`,
//       token: token as `0x${string}`,
//       merkleRoot: tree.root as `0x${string}`,
//       proof: tree.root as `0x${string}`,
//     })
//   );

//   if (proofs.length === 0) {
//     return c.json({ txHash: null, status: "no_proofs" });
//   }

//   // Distribute proofs
//   const account = privateKeyToAccount(c.env.PRIVATE_KEY as `0x${string}`);
//   const txHash = await addProofs(proofs, network, account);

//   // Store the transaction hash
//   await storeProofTransaction(Number(deadline), network, txHash, c.env);

//   return c.json({ txHash, status: "processing" });
// });

app.get("/:network/proofs/:user", async (c) => {
  const { network, user } = c.req.param() as { network: Network; user: string };
  validateNetworkConfig(network);
  const proofs = await getUserProofsWithClaimed(
    user.toLowerCase(),
    network,
    c.env
  );
  return c.json(proofs);
});

export default app;
