import { describe, expect, it } from "vitest";
import { missingConsent } from "../src/frameworks/gdpr/rules/missingConsent.js";
import { allLines, loadFixture } from "./testUtils.js";

describe("gdpr/missing-consent", () => {
  it("flags a DB write of email with no consent reference in the file", () => {
    const contents = loadFixture("missing-consent", "positive-1.ts");
    const findings = missingConsent.check({ path: "positive-1.ts", changedLines: allLines(contents) }, contents);
    expect(findings).toHaveLength(1);
    expect(findings[0].severity).toBe("amber");
    expect(findings[0].line).toBe(2);
  });

  it("flags a DB write of dob/address with no consent reference in the file", () => {
    const contents = loadFixture("missing-consent", "positive-2.ts");
    const findings = missingConsent.check({ path: "positive-2.ts", changedLines: allLines(contents) }, contents);
    expect(findings).toHaveLength(1);
    expect(findings[0].line).toBe(2);
  });

  it("does not flag when the file already references consent", () => {
    const contents = loadFixture("missing-consent", "negative-1.ts");
    const findings = missingConsent.check({ path: "negative-1.ts", changedLines: allLines(contents) }, contents);
    expect(findings).toHaveLength(0);
  });

  it("does not flag a DB write with no PII-ish fields", () => {
    const contents = loadFixture("missing-consent", "negative-2.ts");
    const findings = missingConsent.check({ path: "negative-2.ts", changedLines: allLines(contents) }, contents);
    expect(findings).toHaveLength(0);
  });
});
