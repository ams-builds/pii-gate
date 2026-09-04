import { describe, expect, it } from "vitest";
import { dpiaTrigger } from "../src/frameworks/gdpr/rules/dpiaTrigger.js";
import { allLines, loadFixture } from "./testUtils.js";

describe("gdpr/dpia-trigger", () => {
  it("flags automated decision-making patterns", () => {
    const contents = loadFixture("dpia-trigger", "positive-1.ts");
    const findings = dpiaTrigger.check({ path: "positive-1.ts", changedLines: allLines(contents) }, contents);
    expect(findings.length).toBeGreaterThan(0);
    expect(findings.every((f) => f.severity === "amber")).toBe(true);
  });

  it("flags special-category data processing patterns", () => {
    const contents = loadFixture("dpia-trigger", "positive-2.ts");
    const findings = dpiaTrigger.check({ path: "positive-2.ts", changedLines: allLines(contents) }, contents);
    expect(findings.length).toBeGreaterThan(0);
  });

  it("does not flag plain business logic", () => {
    const contents = loadFixture("dpia-trigger", "negative-1.ts");
    const findings = dpiaTrigger.check({ path: "negative-1.ts", changedLines: allLines(contents) }, contents);
    expect(findings).toHaveLength(0);
  });

  it("does not flag generic 'approve' logic unrelated to the trigger keywords", () => {
    const contents = loadFixture("dpia-trigger", "negative-2.ts");
    const findings = dpiaTrigger.check({ path: "negative-2.ts", changedLines: allLines(contents) }, contents);
    expect(findings).toHaveLength(0);
  });
});
