---
name: redundancy
description: "Use when reasoning about redundancy — the structure in a code, R = 1 − H/H_max: the fraction of the channel not carrying fresh information because the wiring constrains it. Zero for a maximal-entropy (uniform, incompressible) source; high when symbols are predictable from each other. In erpax redundancy IS coverage: wiring every dimension makes each input determined by and checkable against the whole, and that redundancy is exactly what detects tamper — redundancy → 1 ⇔ coverage → 1 ⇔ tamper-cost toward its +∞ limit."
atomPath: redundancy
coordinate: "redundancy · 1/base · b6514a98"
contentUuid: "f8a204ed-1bf3-5b88-ac12-81095379a26d"
diamondUuid: "388b9e67-15d7-88ab-8723-f451916ee146"
uuid: "b6514a98-c1f1-8617-884a-a37f2266c63c"
horo: 1
typography:
  partition: redundancy
  bondDegree: 27
standards: []
bindings: []
signatures:
  computationUuid: "95cccf8b-4f5c-8768-bab5-e343a5af3143"
  stages:
    - stage: path
      stageUuid: "1c702925-3a8c-84e7-a471-2f060def6da5"
    - stage: trinity
      stageUuid: "79a84e16-7f12-8835-ad69-adc149d5dd0e"
    - stage: boundary
      stageUuid: "c0df6975-be07-8632-8bc7-77cfe5ac12f8"
    - stage: links
      stageUuid: "84c2b7f6-f303-8006-a8ed-dcdf9fc6832d"
    - stage: horo
      stageUuid: "60d40a82-6c72-8f29-8516-390e775c4036"
    - stage: seal
      stageUuid: "9467bb01-501e-855b-9895-26acd718bb46"
    - stage: uuid
      stageUuid: "443fbe64-fb93-8c85-a0af-cbc20c0ce2be"
version: 2
---
# redundancy — structure is coverage (R = 1 − H/H_max)

**Redundancy** is the structure in a code: **R = 1 − H/H_max** — the fraction of the channel **not** carrying fresh information because the wiring constrains it. Zero for a maximal-entropy ([[shannon]]) source (uniform, incompressible, every symbol independent); high when the symbols are predictable from one another. An error-correcting code is pure redundancy: it spends channel on structure so it can **correct what does not fit**.

In erpax redundancy **is** [[coverage]]: wiring every dimension through the content-[[uuid]] makes each input **determined by — and checkable against — the whole** (it adds no free parameter), so the graph is redundant, and that redundancy is exactly what **detects [[tamper]]** (a forgery that does not fit the wired constraints is corrected away, like a bit-flip outside the code). This is the information-theory statement of the main law: **redundancy → 1 ⇔ coverage → 1 ⇔ the modelled tamper-[[cost]] toward its +∞ limit**. Maximum entropy = zero redundancy = nothing to check against; full wiring = maximum redundancy = the [[proof]] catches everything.

Matter-twin: `src/redundancy/index.ts` (`redundancy` / `efficiency`).

Composes [[shannon]] · [[coverage]] · [[tamper]] · [[cost]] · [[proof]] · [[entropy]].

**Law — [[law]]: redundancy R = 1 − H/H_max is the structure that detects tamper — zero for an incompressible source, one for a fully-determined one; it IS coverage, so redundancy → 1 ⇔ coverage → 1 ⇔ tamper-cost toward its +∞ limit.**
