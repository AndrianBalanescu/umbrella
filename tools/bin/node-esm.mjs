#!/usr/bin/env node

import { spawn } from "child_process";
import { join } from "path";
const [node, _, ...args] = process.argv;

const p = spawn(node, ["--loader", "ts-node/esm", ...args]);

p.stdout.pipe(process.stdout);
p.stderr.on("data", (d) => {
	const dStr = d.toString().trim();
	!dStr.includes("ExperimentalWarning") ? console.log(dStr) : "";
});
