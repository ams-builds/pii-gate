import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixturesRoot = path.join(__dirname, "..", "fixtures", "gdpr");

export function loadFixture(rule: string, name: string): string {
  return readFileSync(path.join(fixturesRoot, rule, name), "utf-8");
}

export function allLines(contents: string): number[] {
  return contents.split("\n").map((_, i) => i + 1);
}
