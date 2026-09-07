---
name: unfolded
description: "Use when checking that an export earns its place — a symbol with no caller is dead, and one with exactly one caller is un-folded (inline it, delete it, or make it reused). Counts real call sites only: an import or re-export NAMES a symbol without USING it, so counting it hides genuine single-use. Candidates, never a purge list — erpax ships as @erpax/* packages, so an export may be the public face with no in-repo caller. Run: tsx src/rules/unfolded/index.ts"
atomPath: "rules/unfolded"
coordinate: "rules/unfolded · 5/round · 56eb888b"
contentUuid: "34b640ed-1d54-50eb-8386-3ed82541efd7"
diamondUuid: "5540d6c6-ac12-8013-8ed5-c70081f0c74b"
uuid: "56eb888b-5560-80eb-878c-af16e4e2aad9"
horo: 5
typography:
  partition: rules
  bondDegree: 6
standards:
  - "ISO/IEC 25010:2023 §5.5 — reusability: a function called once is inlined, deleted, or reused"
bindings: []
signatures:
  computationUuid: "e6d8da67-adb8-83fd-930b-962119d6a19a"
  stages:
    - stage: path
      stageUuid: "dbaca632-7f08-88d4-a803-026cfc3f9c52"
    - stage: trinity
      stageUuid: "c45f63ad-4807-8298-aeb7-72b49ebfa654"
    - stage: boundary
      stageUuid: "454adb50-193f-8563-80f1-4c7ef276ff94"
    - stage: links
      stageUuid: "8b9aa4c5-a7df-88c7-bca8-c01df86e5722"
    - stage: horo
      stageUuid: "b719b82b-d5f6-898a-a2c0-9c089a963fe5"
    - stage: seal
      stageUuid: "1e3335d3-3a49-8409-b0e8-835a24339999"
    - stage: uuid
      stageUuid: "ac745dcd-f729-849b-b105-c67afbd11d0d"
version: 2
---
# unfolded — an export with no caller is entropy

*"Single-use code is entropy"* sat in the [[rules]] agent laws as **prose** — read every turn by every agent, in every session — while **1,026 violations** lived under it. Nobody disobeyed it; there was nothing to disobey. A sentence is decoration; a gate is a wall.

| | count (2026-07-16) |
| --- | ---: |
| exported symbols | 4,706 |
| **never referenced** (not even a test) | **446** |
| **single use** (exactly one call site) | **580** |
| **un-folded** | **1,026 — 22% of exports** |

## What the code had to get right that prose could not

- **An import is plumbing, not use.** `import { once } from '@/a'` *names* the symbol; counting that makes a genuine single-use (import + one call) look reused. My first measurement did exactly this and reported **693** — hiding 333 violations. The test caught it.
- **A barrel cannot inflate a count.** `export * from './x'` never names the symbol, so only a real reference counts.
- **Generated bundles are not evidence** — they restate every symbol.

**Honest boundary — these are CANDIDATES, never a purge list.** erpax ships as `@erpax/*` packages, so an export may be the **public face** with no in-repo caller; a dynamically-reached symbol (`obj[name]`) is invisible to a lexical scan; and a `sites === 1` that is its own test means the export exists to be tested rather than used — the law's target, but a per-case judgement. A blind sweep here would delete the package's public API and call it DRY.

**Law — [[law]]: an export earns its place by being called more than once — no caller is dead, one caller is un-folded; inline it, delete it, or make it reused.**

Composes: [[rules]] · [[law]].
