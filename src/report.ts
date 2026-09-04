import type { Finding } from "./types.js";

/** Prints findings as a File | Line | Severity | Rule | Explanation table. */
export function printReport(findings: Finding[]): void {
  throw new Error("not implemented: printReport for " + findings.length + " findings");
}
