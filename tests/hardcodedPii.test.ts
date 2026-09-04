import { describe, expect, it } from "vitest";
import { hardcodedPii } from "../src/frameworks/gdpr/rules/hardcodedPii.js";
import { allLines, loadFixture } from "./testUtils.js";

describe("gdpr/hardcoded-pii", () => {
  it("flags a hardcoded email address", () => {
    const contents = loadFixture("hardcoded-pii", "positive-1.ts");
    const findings = hardcodedPii.check({ path: "positive-1.ts", changedLines: allLines(contents) }, contents);
    expect(findings).toHaveLength(1);
    expect(findings[0].severity).toBe("red");
    expect(findings[0].line).toBe(2);
  });

  it("flags a hardcoded phone number", () => {
    const contents = loadFixture("hardcoded-pii", "positive-2.ts");
    const findings = hardcodedPii.check({ path: "positive-2.ts", changedLines: allLines(contents) }, contents);
    expect(findings).toHaveLength(1);
    expect(findings[0].line).toBe(2);
  });

  it("does not flag a clean file", () => {
    const contents = loadFixture("hardcoded-pii", "negative-1.ts");
    const findings = hardcodedPii.check({ path: "negative-1.ts", changedLines: allLines(contents) }, contents);
    expect(findings).toHaveLength(0);
  });

  it("does not flag a parameter merely named 'email'", () => {
    const contents = loadFixture("hardcoded-pii", "negative-2.ts");
    const findings = hardcodedPii.check({ path: "negative-2.ts", changedLines: allLines(contents) }, contents);
    expect(findings).toHaveLength(0);
  });
});
