import type { ChangedFile, Finding, Rule } from "../../../types.js";

/**
 * `git@github.com:owner/repo` and `https://user:token@host/path` both match the email pattern but are
 * repository URLs, not personal data. Reject a match whose surroundings mark it as one.
 */
function isRepositoryUrl(text: string, match: RegExpExecArray): boolean {
  const before = text.slice(0, match.index);
  const after = text.slice(match.index + match[0].length);
  const sshRemote = /^:\S/.test(after);
  const urlCredentials = /:\/\/\S*:$/.test(before);
  return sshRemote || urlCredentials;
}

function hasEmail(text: string): boolean {
  const match = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.exec(text);
  return match !== null && !isRepositoryUrl(text, match);
}

const PATTERNS: { name: string; matches: (text: string) => boolean }[] = [
  { name: "email address", matches: hasEmail },
  { name: "phone number", matches: (t) => /\b\(?\d{3}\)?[-.\s]\d{3}[-.\s]\d{4}\b/.test(t) },
  { name: "US Social Security number", matches: (t) => /\b\d{3}-\d{2}-\d{4}\b/.test(t) },
  { name: "UK National Insurance number", matches: (t) => /\b[A-CEGHJ-PR-TW-Z]{1}[A-CEGHJ-NPR-TW-Z]{1}\d{6}[A-D]\b/i.test(t) },
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

      for (const { name, matches } of PATTERNS) {
        if (matches(text)) {
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
