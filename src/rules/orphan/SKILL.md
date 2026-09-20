---
name: orphan
description: "Use when reasoning about orphan — Removing a dead export does not remove what it used. The imports it named and the inert locals it read stay, referenced by nothing — and **nothing sees them**."
atomPath: "rules/orphan"
coordinate: "rules/orphan · 8/crest · 9efd33c6"
contentUuid: "058a45d8-54bd-5182-aa1c-2b314f15dda4"
diamondUuid: "4f130288-a5bb-8859-9c6f-78b238950a84"
uuid: "9efd33c6-1798-8979-8470-db4030a78ed8"
horo: 8
typography:
  partition: rules
  bondDegree: 9
standards: []
bindings: []
signatures:
  computationUuid: "6e157079-f401-8563-8226-62653bf364c1"
  stages:
    - stage: path
      stageUuid: "398d929d-7933-829e-a755-b36215391c81"
    - stage: trinity
      stageUuid: "a229b173-66b0-80b9-86a7-aae601b5a99a"
    - stage: boundary
      stageUuid: "1bffc2f7-5bc2-8b19-ac2e-f9b668b81949"
    - stage: links
      stageUuid: "34d66832-e65a-879c-a588-0d51437b78f3"
    - stage: horo
      stageUuid: "93564616-15ff-83a7-84e8-dfecb6426954"
    - stage: seal
      stageUuid: "f92fcc89-28c5-89bf-90c3-2e513f0bebe8"
    - stage: uuid
      stageUuid: "458cb5c0-2a2e-88b3-9260-df62f6d926d6"
version: 2
---
# rules/orphan — what a purge leaves behind, cut by the tree instead of by hand

Removing a dead export does not remove what it used. The imports it named and the inert locals it
read stay, referenced by nothing — and **nothing sees them**. `tsc` is content (they are still
well-typed), the unit waves are content (nothing imports them), and the zero-warning lint lane is
the only instrument that objects. It objected **115 times at once**.

| the cascade, measured 2026-09-20 | |
| --- | ---: |
| dead exports purged | 170 |
| symbols orphaned by that purge | 115 |
| rounds needed to reach a fixpoint | 3 |
| files left with no statements at all | 14 |

## The fixpoint is the point

Cutting imports orphans declarations. Cutting declarations orphans **their** imports. A single pass
hands the next cascade to whoever pushes next, so this sweeps until nothing moves.

## Three refusals, each paid for

- **An import clause is REWRITTEN from its survivors, never spliced.** Splicing two adjacent dead
  specifiers by offset leaves `{ a, , d }` — a **parse error**, not a warning. It reached
  `src/dashboard/index.tsx` and turned a cleanup into a red build.
- **A declaration whose initializer is a CALL is refused.** A call may do something when it runs;
  deleting it is a behaviour change wearing a cleanup's clothes.
- **A sweep that would empty a file is refused.** An empty file is not a module, so
  `export * from './x'` against it fails with *"is not a module"* — which no lint rule reports and
  no unit test reaches. Only `tsc` sees it, and only because an importer exists. A file swept to
  nothing is a **deletion**, and deleting capability is a human's decision.

## The linter decides, this atom only cuts

`orphansFrom` reads ESLint's own report. Its scope analysis is the authority; a regex over source
is the guess this corpus has paid for in every gate built on one ([[rules]]/cycle, [[rules]]/prose).
An exported symbol is never touched — that is a FACE, and [[rules]]/unfolded judges those with the
published-package boundary this atom does not know about.

**Honest boundary.** This proves a symbol is unreferenced **in the file the linter scanned**. A
symbol reached dynamically is invisible to it, exactly as it is to the linter — and the purge basis
that feeds it has been wrong three times in three ways: aliased imports name a different local,
re-export clauses name without using, and `export *` names nothing at all.

**Law — [[law]]: a cleanup that needs a person is a cleanup that will be skipped on the push that
needs it. Sweep to a fixpoint, refuse what changes behaviour, and never leave a file that is not a
module.**

Composes: [[rules]] · [[rules]]/unfolded · [[syntax]] · [[law]].
