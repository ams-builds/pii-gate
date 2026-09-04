import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { hardcodedPii } from "../src/frameworks/gdpr/rules/hardcodedPii.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixturePath = path.join(__dirname, "..", "fixtures", "gdpr", "diff-scoping", "mixed.ts");

describe("diff scoping", () => {
  it("flags PII on a line that is part of the diff", () => {
    const contents = readFileSync(fixturePath, "utf-8");
    const findings = hardcodedPii.check({ path: "mixed.ts", changedLines: [7] }, contents);
    expect(findings).toHaveLength(1);
    expect(findings[0].line).toBe(7);
  });

  it("ignores the same kind of issue when it sits outside the diff", () => {
    const contents = readFileSync(fixturePath, "utf-8");
    // Line 2 also contains an email, but only line 7 is claimed as changed here.
    const findings = hardcodedPii.check({ path: "mixed.ts", changedLines: [7] }, contents);
    expect(findings.some((f) => f.line === 2)).toBe(false);
  });
});
