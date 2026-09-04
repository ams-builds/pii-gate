# Prowareign

Prowareign is a local-first CLI that scans a pull request's diff — not the whole repo — for privacy and regulatory compliance risks before you merge. It flags things like hardcoded PII, sensitive fields written to logs, PII sent to third-party HTTP calls without anonymisation, and new data collection with no nearby consent check, each with a red/amber/green severity and a plain-English explanation.

Everything runs on your machine. No network calls, no telemetry, nothing leaves your laptop.

## Status

v1 in progress: GDPR rules only, TypeScript/JavaScript, diff-scoped, terminal-table output. The engine (diff parsing, reporting, rule interface) is framework-agnostic, so future rule packs (e.g. EU AI Act) can be added under `src/frameworks/` without touching the core.

GDPR rules (v1): hardcoded PII, PII in logs, third-party HTTP without anonymisation, missing consent check, and DPIA trigger detection (flags patterns likely requiring an Article 35 DPIA / UK equivalent — the tool never performs the assessment itself). The same rule pack is intended to cover both EU GDPR and UK GDPR, which share near-identical definitions of personal data, consent, and DPIA triggers. This is risk-pattern flagging, not legal certification.

## Project structure

| Path | Responsibility |
|---|---|
| `src/cli.ts` | Entry point: parses args, wires diff → rules → report |
| `src/diff.ts` | Parses a git diff range into changed files and changed line numbers |
| `src/report.ts` | Prints the red/amber/green terminal table |
| `src/types.ts` | Shared `Rule`, `Finding`, `Framework` interfaces |
| `src/frameworks/gdpr/` | GDPR rule pack (v1) |
| `src/frameworks/eu-ai-act/` | Future rule pack, currently empty |
| `fixtures/` | Fixture files per rule: positive/negative cases, plus diff-scoping cases |
| `tests/` | Fixture-based tests asserting each rule catches exactly what it should |

## Development

```bash
npm install
npm run dev -- <path-or-diff-range>
npm test
```
