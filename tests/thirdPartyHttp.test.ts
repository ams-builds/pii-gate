import { describe, expect, it } from "vitest";
import { thirdPartyHttp } from "../src/frameworks/gdpr/rules/thirdPartyHttp.js";
import { allLines, loadFixture } from "./testUtils.js";

describe("gdpr/third-party-http", () => {
  it("flags a fetch payload containing an email field", () => {
    const contents = loadFixture("third-party-http", "positive-1.ts");
    const findings = thirdPartyHttp.check({ path: "positive-1.ts", changedLines: allLines(contents) }, contents);
    expect(findings).toHaveLength(1);
    expect(findings[0].severity).toBe("red");
    expect(findings[0].line).toBe(2);
  });

  it("flags an axios.post payload containing a phone field", () => {
    const contents = loadFixture("third-party-http", "positive-2.ts");
    const findings = thirdPartyHttp.check({ path: "positive-2.ts", changedLines: allLines(contents) }, contents);
    expect(findings).toHaveLength(1);
    expect(findings[0].line).toBe(2);
  });

  it("does not flag a request with no PII in the payload", () => {
    const contents = loadFixture("third-party-http", "negative-1.ts");
    const findings = thirdPartyHttp.check({ path: "negative-1.ts", changedLines: allLines(contents) }, contents);
    expect(findings).toHaveLength(0);
  });

  it("does not flag a payload where the PII is passed through hash()", () => {
    const contents = loadFixture("third-party-http", "negative-2.ts");
    const findings = thirdPartyHttp.check({ path: "negative-2.ts", changedLines: allLines(contents) }, contents);
    expect(findings).toHaveLength(0);
  });
});
