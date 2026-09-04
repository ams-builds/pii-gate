#!/usr/bin/env node
import { gdpr } from "./frameworks/gdpr/index.js";
import { parseDiff } from "./diff.js";
import { printReport } from "./report.js";
import type { Finding, Framework } from "./types.js";

const frameworks: Record<string, Framework> = {
  gdpr,
};

function main(): void {
  throw new Error("not implemented: wire up args -> parseDiff -> rules -> printReport");
}

main();
