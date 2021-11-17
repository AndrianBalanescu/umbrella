#!/usr/bin/env node

const src = "cli.js";
import { spawn } from "child_process";
import { join } from "path";
const [node, toolsDir, ...args] = process.argv;

const cli = join(toolsDir, "..", "..", src);
const p = spawn(node, ["--loader", "ts-node/esm", cli, ...args]);

p.stdout.pipe(process.stdout);
p.stderr.on('data', d => {
  const dStr = d.toString().trim();
  !dStr.includes("ExperimentalWarning") ? console.log(dStr) : "";
});
