---
name: redundancy
description: "Use when reasoning about redundancy — the structure in a code, R = 1 − H/H_max: the fraction of the channel not carrying fresh information because the wiring constrains it. Zero for a maximal-entropy (uniform, incompressible) source; high when symbols are predictable from each other. In erpax redundancy IS coverage: wiring every dimension makes each input determined by and checkable against the whole, and that redundancy is exactly what detects tamper — redundancy → 1 ⇔ coverage → 1 ⇔ tamper-cost toward its +∞ limit."
atomPath: redundancy
coordinate: redundancy · 4/weave · 0c43e3c2
contentUuid: "9b09213c-2601-5b85-989e-c713b9134a3f"
diamondUuid: "29e2cd1a-02af-830c-864d-1a545b18fa29"
uuid: "0c43e3c2-39d7-8ee4-b342-1d49bd8341f0"
horo: 4
bonds:
  in:
    - cost
    - coverage
    - entropy
    - law
    - proof
    - shannon
    - tamper
    - uuid
  out:
    - cost
    - coverage
    - entropy
    - law
    - proof
    - shannon
    - tamper
    - uuid
typography:
  partition: redundancy
  bondDegree: 25
  neighbors: []
standards:
  - "R = 1 − H/log₂n from ../shannon; clamped to [0,1] -- computed"
bindings: []
neighbors:
  wikilink:
    - cost
    - coverage
    - entropy
    - law
    - proof
    - shannon
    - tamper
    - uuid
  matrix:
    - cost
    - coverage
    - entropy
    - law
    - proof
    - shannon
    - tamper
    - uuid
  backlinks:
    - cost
    - coverage
    - entropy
    - law
    - proof
    - shannon
    - tamper
    - uuid
signatures:
  computationUuid: "89c98797-62d0-8158-890b-642c812d230c"
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
      stageUuid: "b2a6e303-74f6-89c1-a216-0eae959f3eaf"
    - stage: seal
      stageUuid: "6efcde22-c70a-8082-91a3-9ca46023cc54"
    - stage: uuid
      stageUuid: "09e50025-3769-83f0-9ee5-aa68dd891c37"
version: 2
---
# redundancy — structure is coverage (R = 1 − H/H_max)

**Redundancy** is the structure in a code: **R = 1 − H/H_max** — the fraction of the channel **not** carrying fresh information because the wiring constrains it. Zero for a maximal-entropy ([[shannon]]) source (uniform, incompressible, every symbol independent); high when the symbols are predictable from one another. An error-correcting code is pure redundancy: it spends channel on structure so it can **correct what does not fit**.

In erpax redundancy **is** [[coverage]]: wiring every dimension through the content-[[uuid]] makes each input **determined by — and checkable against — the whole** (it adds no free parameter), so the graph is redundant, and that redundancy is exactly what **detects [[tamper]]** (a forgery that does not fit the wired constraints is corrected away, like a bit-flip outside the code). This is the information-theory statement of the main law: **redundancy → 1 ⇔ coverage → 1 ⇔ the modelled tamper-[[cost]] toward its +∞ limit**. Maximum entropy = zero redundancy = nothing to check against; full wiring = maximum redundancy = the [[proof]] catches everything.

Matter-twin: `src/redundancy/index.ts` (`redundancy` / `efficiency`).

Composes [[shannon]] · [[coverage]] · [[tamper]] · [[cost]] · [[proof]] · [[entropy]].

**Law — [[law]]: redundancy R = 1 − H/H_max is the structure that detects tamper — zero for an incompressible source, one for a fully-determined one; it IS coverage, so redundancy → 1 ⇔ coverage → 1 ⇔ tamper-cost toward its +∞ limit.**
