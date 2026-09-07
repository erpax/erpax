---
name: guardian
description: "Use when reasoning about a single immune-cell of the corpus — a guardian watches exactly ONE violation axis against its own committed baseline with a fail-closed ratchet, so a rise on its axis reddens the gate on its own and can never be masked by a fix on another axis. Many guardians cross into one seal."
atomPath: guardian
coordinate: "guardian · 2/share · f905d4cd"
contentUuid: "0e902696-c422-5424-b48d-f1f399ec8bb3"
diamondUuid: "3e8b6666-fa9c-81f0-b709-effd19cbfb11"
uuid: "f905d4cd-860e-8836-adc7-764bc31c8230"
horo: 2
typography:
  partition: guardian
  bondDegree: 58
standards:
  - "ISO/IEC 25010:2023 §5.5 testability — the decision is a pure function"
  - "ISO/IEC 25010:2023 §5.5 testability — the decision is a pure function`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "e71d0870-9865-8934-81c1-4edf8d69911f"
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
      stageUuid: "5e4c9f3d-59b9-853c-a839-c49cb5ca4e83"
    - stage: seal
      stageUuid: "9441f23e-0439-8a74-b69f-fbb34baca302"
    - stage: uuid
      stageUuid: "18949c99-e630-8450-8a6a-5ce0468a63e9"
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
