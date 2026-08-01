---
name: unfolded
description: "Use when checking that an export earns its place — a symbol with no caller is dead, and one with exactly one caller is un-folded (inline it, delete it, or make it reused). Counts real call sites only: an import or re-export NAMES a symbol without USING it, so counting it hides genuine single-use. Candidates, never a purge list — erpax ships as @erpax/* packages, so an export may be the public face with no in-repo caller. Run: tsx src/rules/unfolded/index.ts"
atomPath: "rules/unfolded"
coordinate: "rules/unfolded · 2/share · 27cb3be3"
contentUuid: "d9cae191-9eb6-50c0-92eb-f03ee607a12f"
diamondUuid: "849ac32b-a45c-8291-b5c4-630d2c28e4f8"
uuid: "27cb3be3-a014-8e9a-9ecf-cc5a4bf2907f"
horo: 2
typography:
  partition: rules
  bondDegree: 6
standards:
  - "ISO/IEC 25010:2023 §5.5 — reusability: a function called once is inlined, deleted, or reused"
bindings: []
signatures:
  computationUuid: "28fcd320-d334-8eb9-862e-173e96dd4878"
  stages:
    - stage: path
      stageUuid: "dbaca632-7f08-88d4-a803-026cfc3f9c52"
    - stage: trinity
      stageUuid: "c45f63ad-4807-8298-aeb7-72b49ebfa654"
    - stage: boundary
      stageUuid: "f2e536dd-82a3-8d24-9e83-ce7739dbcff7"
    - stage: links
      stageUuid: "8b9aa4c5-a7df-88c7-bca8-c01df86e5722"
    - stage: horo
      stageUuid: "35a11a54-2797-84a0-ad84-d4e9ba8bb77e"
    - stage: seal
      stageUuid: "1e3335d3-3a49-8409-b0e8-835a24339999"
    - stage: uuid
      stageUuid: "c7b023c6-4616-82d4-b0e6-bf2e8e5378b3"
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
