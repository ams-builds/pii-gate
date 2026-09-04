import { describe, expect, it } from "vitest";
import { piiInLogs } from "../src/frameworks/gdpr/rules/piiInLogs.js";
import { allLines, loadFixture } from "./testUtils.js";

describe("gdpr/pii-in-logs", () => {
  it("flags console.log of an email variable", () => {
    const contents = loadFixture("pii-in-logs", "positive-1.ts");
    const findings = piiInLogs.check({ path: "positive-1.ts", changedLines: allLines(contents) }, contents);
    expect(findings).toHaveLength(1);
    expect(findings[0].severity).toBe("red");
    expect(findings[0].line).toBe(2);
  });

  it("flags logger.info of dob/address variables", () => {
    const contents = loadFixture("pii-in-logs", "positive-2.ts");
    const findings = piiInLogs.check({ path: "positive-2.ts", changedLines: allLines(contents) }, contents);
    expect(findings).toHaveLength(1);
    expect(findings[0].line).toBe(2);
  });

  it("flags a compound camelCase variable name like supportEmail", () => {
    const contents = loadFixture("pii-in-logs", "positive-3.ts");
    const findings = piiInLogs.check({ path: "positive-3.ts", changedLines: allLines(contents) }, contents);
    expect(findings).toHaveLength(1);
    expect(findings[0].line).toBe(3);
  });

  it("does not flag a log with no PII-named variables", () => {
    const contents = loadFixture("pii-in-logs", "negative-1.ts");
    const findings = piiInLogs.check({ path: "negative-1.ts", changedLines: allLines(contents) }, contents);
    expect(findings).toHaveLength(0);
  });

  it("does not flag an unrelated compound variable name", () => {
    const contents = loadFixture("pii-in-logs", "negative-2.ts");
    const findings = piiInLogs.check({ path: "negative-2.ts", changedLines: allLines(contents) }, contents);
    expect(findings).toHaveLength(0);
  });
});
