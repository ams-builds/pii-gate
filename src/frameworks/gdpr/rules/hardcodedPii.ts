import type { ChangedFile, Finding, Rule } from "../../../types.js";

const PATTERNS: { name: string; pattern: RegExp }[] = [
  { name: "email address", pattern: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/ },
  { name: "phone number", pattern: /\b\(?\d{3}\)?[-.\s]\d{3}[-.\s]\d{4}\b/ },
  { name: "US Social Security number", pattern: /\b\d{3}-\d{2}-\d{4}\b/ },
  { name: "UK National Insurance number", pattern: /\b[A-CEGHJ-PR-TW-Z]{1}[A-CEGHJ-NPR-TW-Z]{1}\d{6}[A-D]\b/i },
];

/** Flags hardcoded emails, phone numbers, and national ID formats on lines actually touched by the diff. */
export const hardcodedPii: Rule = {
  id: "gdpr/hardcoded-pii",
  check(file: ChangedFile, contents: string): Finding[] {
    const lines = contents.split("\n");
    const findings: Finding[] = [];

    for (const lineNumber of file.changedLines) {
      const text = lines[lineNumber - 1];
      if (text === undefined) continue;

      for (const { name, pattern } of PATTERNS) {
        if (pattern.test(text)) {
          findings.push({
            file: file.path,
            line: lineNumber,
            severity: "red",
            rule: "gdpr/hardcoded-pii",
            explanation:
              `Hardcoded ${name} found. GDPR treats this as personal data — ` +
              "committing it into source puts it outside any documented legal basis for processing.",
          });
        }
      }
    }

    return findings;
  },
};
