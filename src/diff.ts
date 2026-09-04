import { execFileSync } from "node:child_process";
import type { ChangedFile } from "./types.js";

/**
 * Parses unified diff text (as produced by `git diff --unified=0`) into
 * changed files and the new-file line numbers that were added. Pure
 * function, no I/O — this is what diff-scoping is tested against.
 */
export function parseUnifiedDiff(diffText: string): ChangedFile[] {
  const files: ChangedFile[] = [];
  let current: ChangedFile | null = null;
  let newLineCursor = 0;

  for (const line of diffText.split("\n")) {
    const fileMatch = line.match(/^\+\+\+ b\/(.+)$/);
    if (fileMatch) {
      current = { path: fileMatch[1], changedLines: [] };
      files.push(current);
      continue;
    }

    const hunkMatch = line.match(/^@@ -\d+(?:,\d+)? \+(\d+)(?:,\d+)? @@/);
    if (hunkMatch) {
      newLineCursor = parseInt(hunkMatch[1], 10);
      continue;
    }

    if (!current || line.startsWith("---")) continue;

    if (line.startsWith("+")) {
      current.changedLines.push(newLineCursor);
      newLineCursor++;
    } else if (!line.startsWith("-")) {
      newLineCursor++;
    }
  }

  return files;
}

/** Runs `git diff` in repoPath for the given range (or uncommitted changes if omitted) and parses the result. */
export function getChangedFiles(repoPath: string, range?: string): ChangedFile[] {
  const args = ["-C", repoPath, "diff", "--unified=0"];
  if (range) args.push(range);
  const diffText = execFileSync("git", args, { encoding: "utf-8" });
  return parseUnifiedDiff(diffText);
}
