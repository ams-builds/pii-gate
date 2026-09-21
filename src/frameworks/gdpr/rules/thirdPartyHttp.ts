import type { ChangedFile, Finding, Rule } from "../../../types.js";
import { containsAnyWord } from "../../../util/identifiers.js";

const PII_WORDS = ["email", "ssn", "dob", "address", "phone"];
/** JS fetch/axios plus Python requests, httpx and urllib. */
const HTTP_CALL = /\b(?:fetch|(?:axios|requests|httpx)(?:\.(?:get|post|put|patch|delete|request))?|urlopen)\s*\(/i;
const ANONYMISATION_WORDS = ["anonymise", "anonymize", "anonymised", "anonymized", "hash", "redact", "redacted", "mask", "masked", "pseudonymise", "pseudonymize"];
const WINDOW_SPAN = 4;

function windowText(lines: string[], startIndex: number, span: number): string {
  return lines.slice(startIndex, startIndex + span).join(" ");
}

/** Flags fetch/axios calls whose payload includes a PII-ish field with no visible anonymisation step. */
export const thirdPartyHttp: Rule = {
  id: "gdpr/third-party-http",
  check(file: ChangedFile, contents: string): Finding[] {
    const lines = contents.split("\n");
    const findings: Finding[] = [];

    for (const lineNumber of file.changedLines) {
      const text = lines[lineNumber - 1];
      if (text === undefined || !HTTP_CALL.test(text)) continue;

      const window = windowText(lines, lineNumber - 1, WINDOW_SPAN);
      if (containsAnyWord(window, PII_WORDS) && !containsAnyWord(window, ANONYMISATION_WORDS)) {
        findings.push({
          file: file.path,
          line: lineNumber,
          severity: "red",
          rule: "gdpr/third-party-http",
          explanation:
            "A request to an external endpoint appears to send personal data with no anonymisation, hashing, " +
            "or masking step nearby. Sending raw PII to a third party needs a documented legal basis and, " +
            "usually, a data processing agreement.",
        });
      }
    }

    return findings;
  },
};
