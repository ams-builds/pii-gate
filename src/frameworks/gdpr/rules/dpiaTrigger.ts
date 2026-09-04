import type { ChangedFile, Finding, Rule } from "../../../types.js";

const TRIGGERS: { name: string; pattern: RegExp }[] = [
  {
    name: "automated decision-making",
    pattern: /\b(autoApprove|autoReject|creditScore|riskScore|eligibilityScore|automatedDecision)\b/i,
  },
  {
    name: "special-category data processing",
    pattern: /\b(healthData|biometric|geneticData|ethnicity|religion|sexualOrientation|tradeUnion|politicalOpinion)\b/i,
  },
  {
    name: "systematic monitoring or profiling",
    pattern: /\b(trackLocation|geolocationHistory|behaviouralProfile|profileUser|surveil)\b/i,
  },
];

/**
 * Flags code patterns associated with GDPR Article 35 DPIA triggers — new
 * automated decision-making, large-scale special-category data processing,
 * or systematic monitoring/profiling. Does not assess risk itself; flags
 * that a human-run DPIA (or UK "Assessment of High Risk Processing"
 * equivalent) likely applies.
 */
export const dpiaTrigger: Rule = {
  id: "gdpr/dpia-trigger",
  check(file: ChangedFile, contents: string): Finding[] {
    const lines = contents.split("\n");
    const findings: Finding[] = [];

    for (const lineNumber of file.changedLines) {
      const text = lines[lineNumber - 1];
      if (text === undefined) continue;

      for (const { name, pattern } of TRIGGERS) {
        if (pattern.test(text)) {
          findings.push({
            file: file.path,
            line: lineNumber,
            severity: "amber",
            rule: "gdpr/dpia-trigger",
            explanation:
              `This looks like ${name}, one of the categories GDPR Article 35 (or the UK equivalent) treats ` +
              "as likely high-risk processing. This does not mean a violation exists — it flags that a " +
              "human-run DPIA / high-risk-processing assessment likely applies before shipping.",
          });
        }
      }
    }

    return findings;
  },
};
