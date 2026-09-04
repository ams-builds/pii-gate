#!/usr/bin/env node
import { readFileSync } from "node:fs";
import path from "node:path";
import { gdpr } from "./frameworks/gdpr/index.js";
import { getChangedFiles } from "./diff.js";
import { printReport } from "./report.js";
import type { Finding } from "./types.js";

function main(): void {
  const [repoPath, range] = process.argv.slice(2);
  if (!repoPath) {
    console.error("Usage: prowareign <repo-path> [git-diff-range]");
    process.exit(1);
  }

  const changedFiles = getChangedFiles(repoPath, range).filter((f) => f.changedLines.length > 0);
  const findings: Finding[] = [];

  for (const file of changedFiles) {
    let contents: string;
    try {
      contents = readFileSync(path.join(repoPath, file.path), "utf-8");
    } catch {
      continue; // deleted file, nothing to scan
    }

    for (const rule of gdpr.rules) {
      findings.push(...rule.check(file, contents));
    }
  }

  printReport(findings);
}

main();
