import type { ChangedFile, Finding, Rule } from "../../../types.js";
import { containsAnyWord } from "../../../util/identifiers.js";

const PII_WORDS = ["email", "ssn", "dob", "address"];
const LOG_CALL = /\b(?:console\.(?:log|error|warn|info|debug)|logger\.(?:log|error|warn|info|debug))\s*\(([^)]*)\)/i;

/** Flags console/logger calls whose arguments include a PII-named variable (email, ssn, dob, address). */
export const piiInLogs: Rule = {
  id: "gdpr/pii-in-logs",
  check(file: ChangedFile, contents: string): Finding[] {
    const lines = contents.split("\n");
    const findings: Finding[] = [];

    for (const lineNumber of file.changedLines) {
      const text = lines[lineNumber - 1];
      if (text === undefined) continue;

      const call = text.match(LOG_CALL);
      if (call && containsAnyWord(call[1], PII_WORDS)) {
        findings.push({
          file: file.path,
          line: lineNumber,
          severity: "red",
          rule: "gdpr/pii-in-logs",
          explanation:
            "A log statement includes a variable that looks like personal data. Logs are often retained, " +
            "shipped to third-party aggregators, or accessible beyond the original purpose — logging PII in " +
            "plaintext is a clear GDPR exposure.",
        });
      }
    }

    return findings;
  },
};
