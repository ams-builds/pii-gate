import type { Finding } from "./types.js";

const SEVERITY_LABEL: Record<Finding["severity"], string> = {
  red: "RED",
  amber: "AMBER",
  green: "GREEN",
};

/** Prints a File | Line | Severity | Rule | Explanation table to the terminal. */
export function printReport(findings: Finding[]): void {
  if (findings.length === 0) {
    console.log("No issues found.");
    return;
  }

  console.table(
    findings.map((f) => ({
      File: f.file,
      Line: f.line,
      Severity: SEVERITY_LABEL[f.severity],
      Rule: f.rule,
      Explanation: f.explanation,
    }))
  );
}
