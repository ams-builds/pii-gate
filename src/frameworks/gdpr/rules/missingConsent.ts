import type { ChangedFile, Finding, Rule } from "../../../types.js";
import { containsAnyWord } from "../../../util/identifiers.js";

const PII_WORDS = ["email", "ssn", "dob", "address", "phone"];
const DB_WRITE = /\b\w+\.(?:create|insert|save|update)\s*\(/i;
const CONSENT_REFERENCE = /consent/i;
const WINDOW_SPAN = 4;

function windowText(lines: string[], startIndex: number, span: number): string {
  return lines.slice(startIndex, startIndex + span).join(" ");
}

/** Flags a new DB write of PII-ish fields with no reference to "consent" anywhere in the file. */
export const missingConsent: Rule = {
  id: "gdpr/missing-consent",
  check(file: ChangedFile, contents: string): Finding[] {
    if (CONSENT_REFERENCE.test(contents)) return [];

    const lines = contents.split("\n");
    const findings: Finding[] = [];

    for (const lineNumber of file.changedLines) {
      const text = lines[lineNumber - 1];
      if (text === undefined || !DB_WRITE.test(text)) continue;

      const window = windowText(lines, lineNumber - 1, WINDOW_SPAN);
      if (containsAnyWord(window, PII_WORDS)) {
        findings.push({
          file: file.path,
          line: lineNumber,
          severity: "amber",
          rule: "gdpr/missing-consent",
          explanation:
            "A new write of personal data was found with no reference to \"consent\" anywhere in this file. " +
            "GDPR requires a documented legal basis for collecting this data — confirm consent (or another " +
            "lawful basis) is captured before this ships.",
        });
      }
    }

    return findings;
  },
};
