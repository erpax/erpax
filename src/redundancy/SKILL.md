---
name: redundancy
description: "Use when reasoning about redundancy — the structure in a code, R = 1 − H/H_max: the fraction of the channel not carrying fresh information because the wiring constrains it. Zero for a maximal-entropy (uniform, incompressible) source; high when symbols are predictable from each other. In erpax redundancy IS coverage: wiring every dimension makes each input determined by and checkable against the whole, and that redundancy is exactly what detects tamper — redundancy → 1 ⇔ coverage → 1 ⇔ tamper-cost toward its +∞ limit."
atomPath: redundancy
coordinate: "redundancy · 8/crest · 2d59efd9"
contentUuid: "1685c7d9-9180-5711-a1c8-1575719ae3ca"
diamondUuid: "dfbbed88-c6e9-88cf-bef4-7fd2fc2eedf0"
uuid: "2d59efd9-cc0f-8bf5-86b7-8b6f61fc0ab0"
horo: 8
typography:
  partition: redundancy
  bondDegree: 27
standards: []
bindings: []
signatures:
  computationUuid: "28367f95-5d24-8fe8-949f-342193de7339"
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
      stageUuid: "c3381aa0-ccc4-8fee-946c-9e8e0abd84dd"
    - stage: seal
      stageUuid: "9467bb01-501e-855b-9895-26acd718bb46"
    - stage: uuid
      stageUuid: "2c45cb1e-9c7f-8b84-a134-c9827773e734"
version: 2
---
# redundancy — structure is coverage (R = 1 − H/H_max)

**Redundancy** is the structure in a code: **R = 1 − H/H_max** — the fraction of the channel **not** carrying fresh information because the wiring constrains it. Zero for a maximal-entropy ([[shannon]]) source (uniform, incompressible, every symbol independent); high when the symbols are predictable from one another. An error-correcting code is pure redundancy: it spends channel on structure so it can **correct what does not fit**.

In erpax redundancy **is** [[coverage]]: wiring every dimension through the content-[[uuid]] makes each input **determined by — and checkable against — the whole** (it adds no free parameter), so the graph is redundant, and that redundancy is exactly what **detects [[tamper]]** (a forgery that does not fit the wired constraints is corrected away, like a bit-flip outside the code). This is the information-theory statement of the main law: **redundancy → 1 ⇔ coverage → 1 ⇔ the modelled tamper-[[cost]] toward its +∞ limit**. Maximum entropy = zero redundancy = nothing to check against; full wiring = maximum redundancy = the [[proof]] catches everything.

Matter-twin: `src/redundancy/index.ts` (`redundancy` / `efficiency`).

Composes [[shannon]] · [[coverage]] · [[tamper]] · [[cost]] · [[proof]] · [[entropy]].

**Law — [[law]]: redundancy R = 1 − H/H_max is the structure that detects tamper — zero for an incompressible source, one for a fully-determined one; it IS coverage, so redundancy → 1 ⇔ coverage → 1 ⇔ tamper-cost toward its +∞ limit.**
