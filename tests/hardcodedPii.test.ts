import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { hardcodedPii } from "../src/frameworks/gdpr/rules/hardcodedPii.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixturesDir = path.join(__dirname, "..", "fixtures", "gdpr", "hardcoded-pii");

function load(name: string): string {
  return readFileSync(path.join(fixturesDir, name), "utf-8");
}

function allLines(contents: string): number[] {
  return contents.split("\n").map((_, i) => i + 1);
}

describe("gdpr/hardcoded-pii", () => {
  it("flags a hardcoded email address", () => {
    const contents = load("positive-1.ts");
    const findings = hardcodedPii.check({ path: "positive-1.ts", changedLines: allLines(contents) }, contents);
    expect(findings).toHaveLength(1);
    expect(findings[0].severity).toBe("red");
    expect(findings[0].line).toBe(2);
  });

  it("flags a hardcoded phone number", () => {
    const contents = load("positive-2.ts");
    const findings = hardcodedPii.check({ path: "positive-2.ts", changedLines: allLines(contents) }, contents);
    expect(findings).toHaveLength(1);
    expect(findings[0].line).toBe(2);
  });

  it("does not flag a clean file", () => {
    const contents = load("negative-1.ts");
    const findings = hardcodedPii.check({ path: "negative-1.ts", changedLines: allLines(contents) }, contents);
    expect(findings).toHaveLength(0);
  });

  it("does not flag a parameter merely named 'email'", () => {
    const contents = load("negative-2.ts");
    const findings = hardcodedPii.check({ path: "negative-2.ts", changedLines: allLines(contents) }, contents);
    expect(findings).toHaveLength(0);
  });
});
