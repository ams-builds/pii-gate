# pii-gate

Catches GDPR privacy mistakes in your code before you merge, without your code leaving your machine.

Spot a hardcoded email, a leaked SSN, or a missing consent check in your diff before it ships, not after a customer or a regulator finds it first.

pii-gate is a local-first CLI that scans a pull request's diff, not the whole repo, for privacy and regulatory compliance risks before you merge. Every finding gets a red/amber/green severity, a plain-English explanation, and the exact regulatory clause it breaks. No network calls, no telemetry, nothing leaves your laptop, ever.

Think of it as a linter, but for privacy: the same five-second habit as running eslint before a commit, except this one catches the mistake that gets a company fined instead of the one that gets a PR comment.

## Status

v1 core done: all five GDPR rules implemented and passing fixture tests, TypeScript/JavaScript and Python, diff-scoped, terminal-table output. The engine (diff parsing, reporting, rule interface) is framework-agnostic, so future rule packs can be added under `src/frameworks/` without touching the core.

GDPR rules (v1):

1. Hardcoded PII (emails, phone numbers, national IDs)
2. Sensitive fields written to logs
3. PII sent to third-party HTTP calls without anonymisation
4. New data collection with no nearby consent check
5. DPIA trigger detection (flags patterns likely requiring an Article 35 DPIA / UK equivalent; the tool never performs the assessment itself)

The same rule pack is intended to cover both EU GDPR and UK GDPR, which share near-identical definitions of personal data, consent, and DPIA triggers. This is risk-pattern flagging, not legal certification.

## Project structure

| Path | Responsibility |
|---|---|
| `src/cli.ts` | Entry point: parses args, wires diff → rules → report |
| `src/diff.ts` | Parses a git diff range into changed files and changed line numbers |
| `src/report.ts` | Prints the red/amber/green terminal table |
| `src/types.ts` | Shared `Rule`, `Finding`, `Framework` interfaces |
| `src/util/identifiers.ts` | Splits camelCase/snake_case so PII word matching catches compound names (`supportEmail`, `user_ssn`) |
| `src/frameworks/gdpr/` | GDPR rule pack (v1) |
| `fixtures/` | Fixture files per rule: positive/negative cases, plus diff-scoping cases |
| `tests/` | Fixture-based tests asserting each rule catches exactly what it should |

## Development

```bash
npm install
npm run dev -- <path-or-diff-range>
npm test
```
