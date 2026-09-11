---
name: guardian
description: "Use when reasoning about a single immune-cell of the corpus — a guardian watches exactly ONE violation axis against its own committed baseline with a fail-closed ratchet, so a rise on its axis reddens the gate on its own and can never be masked by a fix on another axis. Many guardians cross into one seal."
atomPath: guardian
coordinate: "guardian · 8/crest · d3897018"
contentUuid: "e5091713-8541-5d44-ab07-35da4905b6bc"
diamondUuid: "c91e8646-b1c8-8a94-8546-d53e9d662f6e"
uuid: "d3897018-91b3-8e50-88ef-600054b23ec8"
horo: 8
typography:
  partition: guardian
  bondDegree: 58
standards:
  - "ISO/IEC 25010:2023 §5.5 testability — the decision is a pure function"
  - "ISO/IEC 25010:2023 §5.5 testability — the decision is a pure function`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "c79729d6-d765-8f3d-85fe-c6b65d3f61c4"
  stages:
    - stage: path
      stageUuid: "83e530d4-1142-8bf7-b8c4-6462dc97de15"
    - stage: trinity
      stageUuid: "1b2a3bd8-7b72-8687-a35b-b9be066ee8d1"
    - stage: boundary
      stageUuid: "8ba289f9-3046-8359-9e5b-6aab9896923c"
    - stage: links
      stageUuid: "9f877aac-b513-8a1e-a9be-fa493fccba5f"
    - stage: horo
      stageUuid: "2ab1aa7d-e3a0-86a8-a64d-2ca7b3c00012"
    - stage: seal
      stageUuid: "9441f23e-0439-8a74-b69f-fbb34baca302"
    - stage: uuid
      stageUuid: "69e64648-7cdc-8dca-91b7-aea6c5fa481f"
version: 2
---
# guardian — one axis, one baseline, fail-closed

A [[gate]] is the immune system; a **guardian is one immune cell**. It watches exactly **one axis** of violation (naming, trinity, import coverage, …) against its own committed baseline, and rules with a fail-closed ratchet:

- **one axis only** — a guardian never sums two concerns. Independence is the whole point: a naming violation is caught on the *name* guardian regardless of what the *trinity* guardian does, so nothing rides in masked behind an unrelated fix.
- **ratchets only DOWN** — the baseline is a checked-in literal (reviewable in git); the live count may never exceed it, and a change that fixes the axis LOWERS the literal in the same diff. The axis therefore *cannot get worse*.
- **fail-closed** — a non-finite or negative count, or a broken baseline literal, is NOT a pass (a scan that cannot run did not pass). Pure (no fs, no process) ⇒ regression-locked by `test.ts`.

This is the generalization the folder law's NAME and TRINITY guardians are instances of, and the cell that [[convention]]/import is. Summing axes into one ceiling is the anti-pattern: it let `name + 1` hide behind `trinity − 1` (net zero, PASS). One guardian per axis closes that — *naming violations are caught at the gates by the guardians*. There is no summed back-compat verdict; a shim is tamper-surface, not safety (max [[cost]]).

**Law — [[law]]: a guardian watches exactly one axis and ratchets only DOWN, fails closed (a non-finite count or baseline is never a pass), and is independent — its verdict is unaffected by any other axis, so a violation on its axis is caught on its own.**

@see [[gate]] · [[seal]] · [[law]] · [[convention]] · [[cost]] · [[proof]] · [[identity]]

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO/IEC 25010:2023 §5.5 testability — the decision is a pure function`
