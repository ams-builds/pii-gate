import type { ChangedFile } from "./types.js";

/**
 * Parses a git diff range into the set of changed files and the specific
 * line numbers touched, so rules only scan lines actually in the diff.
 */
export function parseDiff(range: string): ChangedFile[] {
  throw new Error("not implemented: parseDiff for range " + range);
}
