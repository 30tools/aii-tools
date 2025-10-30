#!/usr/bin/env node
import { spawn } from "node:child_process";
import { createWriteStream, mkdirSync } from "node:fs";
import { resolve } from "node:path";

// Runs the configured SEO MCP command and stores output in public/seo/
const outDir = resolve(process.cwd(), "public", "seo");
mkdirSync(outDir, { recursive: true });
const out = createWriteStream(resolve(outDir, `mcp-output-${Date.now()}.log`));

const args = [
  "-y",
  "@smithery/cli@latest",
  "run",
  "@itsanamune/seo-mcp",
  "--key",
  process.env.SERP_MCP_KEY || "",
  "--profile",
  process.env.SERP_MCP_PROFILE || "noisy-kiwi-RFTall",
];

const child = spawn("npx", args, { stdio: ["ignore", "pipe", "pipe"] });
child.stdout.pipe(out);
child.stderr.pipe(out);

child.on("exit", (code) => {
  console.log(`seo-mcp finished with code ${code}. Logs written to ${out.path}`);
});

