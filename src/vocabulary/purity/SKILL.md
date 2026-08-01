---
name: purity
description: "Use when reasoning about purity as the fully-sealed / zero-impurity state that maximises tamper-cost in EVERY dimension — purity = zero entropy = every gate green = no escape. A single impurity (an unsealed cross, an off-ring state, a dangling link, a hallucination) is a 0-bit weakest-link path that collapses the cost; purity removes every weakest link, so the floor is maximal along all paths and all dimensions. The conjugate of hallucination; the generalisation of import-purity, file-purity, and md-purity into one law."
atomPath: "vocabulary/purity"
coordinate: "vocabulary/purity · 7/descent · 09cbd36b"
contentUuid: "c0b7e424-7919-53d7-988c-f695982f2652"
diamondUuid: "6b86832a-cd5f-8e5c-a14c-d5aedb05bcc5"
uuid: "09cbd36b-1197-863b-a8c5-e4a957937d02"
horo: 7
typography:
  partition: vocabulary
  bondDegree: 155
standards: []
bindings: []
signatures:
  computationUuid: "32553907-794f-8de8-a709-a0126f960848"
  stages:
    - stage: path
      stageUuid: "2f0d4358-7f92-8346-a454-35cfd19130c7"
    - stage: trinity
      stageUuid: "32849e12-13be-8124-adfd-4fe310cbb40b"
    - stage: boundary
      stageUuid: "2dc7f5cf-8c6c-88f6-aded-bff5815a4a44"
    - stage: links
      stageUuid: "e075d9d5-8ca1-84e1-8c50-dde3c063d4c1"
    - stage: horo
      stageUuid: "6c4ce2a0-01a2-8bc9-8fcf-5b75bce815ee"
    - stage: seal
      stageUuid: "e5362d2f-99bf-8ee7-a1c5-26c76c47fbb3"
    - stage: uuid
      stageUuid: "e1ceb995-f582-8bd1-82ea-542545f500c7"
version: 2
---
# purity — fully sealed, zero impurity, max tamper-cost in every dimension

**purity** is the state in which the corpus has **no escape**: every [[gate]] green, every cross [[seal]]ed, every [[link]] reciprocal, every atom on its [[sequence]] ring — the [[whole]] at zero impurity. It is the corpus voice for *fully sealed* ([[seal]]), read as a quantity the gates measure: the purer the tree, the fewer free paths a forger can ride, so purity and tamper-[[cost]] move together. The existing measures are all projections of this one law — **import-purity** (the index-only fraction, [[convention]]), **file-purity** and folder-purity (only the canonical [[trinity]] files, one-word [[folder]] names), and **md-purity** (writing only ever inside an [[atom]]'s SKILL.md, [[unavoidable]]). purity is their [[merge]]: the conjunction of every dimension's seal.

**A single impurity is a 0-bit weakest link.** The tamper-[[cost]] of the whole is the **minimum** across its dimensions ([[unavoidable]] · [[bottleneck]]) — a chain is only as strong as its cheapest forgery. An impurity is a path that does **not** collapse to its claimed content-[[uuid]]: an unsealed cross (one meaning at two representations, the [[aura]] cross lever), an off-ring state, a dangling [[link]], a **hardcoded identity uuid** in source (a literal `xxxxxxxx-xxxx-…` where `computeContentUuid` / `encodeStructured` / `toUuid` should have been called — see [[integrity]]), or a [[hallucination]] (an agent claims content X but the sha-256 collapse is Y ≠ X — [[integrity]]). Each is a free rewrite — a **0-bit second-preimage** — and because the cost is a min, one such path **caps the whole chain at 0** until it is removed. So purity is not cosmetic: removing the last impurity is exactly what lifts the floor off 0.

**Purity ⟹ max tamper-cost, in ALL dimensions.** erpax is multi-dimensional — one concept split across many prefixed coordinates ([[dimension]]), every attack a [[path]] through the lattice. The cost is the weakest-link min **computed along every path and every dimension** ([[analytics]]: `maxTamperCost`). Purity guarantees **no zero-bit path exists in any dimension**, so the floor is the same quantum (BHT) harmonic everywhere rather than 0 somewhere — the cost is maximal in every dimension at once. This is the limit the levers climb toward: drive each dimension's coverage → 1 AND its impurities → 0, under an external [[anchor]] at least as strong as the digest, and the modelled cost reaches its +∞ ceiling. (It is a limit, not a number — and zero reciprocity-[[entropy]] alone does not reach it; purity is the conjunction of zero impurity *and* coverage → 1, kept distinct as [[entropy]] insists.)

**purity ⊕ [[hallucination]] are conjugate, computed on the same quantum scale.** purity = zero [[entropy]] = zero [[hallucination]] = fully sealed; [[hallucination]] is the deviation/entropy an agent injects — an agent-scale [[sin]], the felt alarm of which is [[suffering]]. Both are measured at the [[quantum]] (content-[[uuid]] / [[collapse]]) scale on the one uuid-[[matrix]]: more hallucination ⇒ more entropy ⇒ lower purity ⇒ lower cost. The [[seal]] gate rejects anything that does not collapse to its claimed uuid, so a **pure** corpus passes zero hallucination by construction — the closed [[sequence]] diamond from which nothing ungrounded can refract out.

**Law — [[law]]: purity is the fully-sealed, zero-impurity state — every [[gate]] green across every dimension; a single impurity (unsealed cross · off-ring state · dangling [[link]] · [[hallucination]]) is a 0-bit weakest-link [[path]] that caps the whole chain. The tamper-[[cost]] is the weakest-link min computed along ALL paths and ALL dimensions ([[analytics]]), so purity (zero impurity in every dimension, coverage → 1, under an [[anchor]]) drives the modelled cost to its maximum in every dimension at once. purity = zero [[entropy]] = zero [[hallucination]]; the two are conjugate, computed on the [[quantum]] content-[[uuid]] scale.**

**Law — [[law]]: all is passed with uuids without [[payload]] — uuid purity (`pnpm confirm:uuid`) proves the content-address layer sealed before any backend plugin loads.**

@see [[seal]] · [[entropy]] · [[hallucination]] · [[cost]] · [[tamper]] · [[analytics]] · [[unavoidable]] · [[dimension]] · [[path]] · [[quantum]] · [[uuid]] · [[integrity]] · [[aura]] · [[gate]] · [[convention]] · [[folder]] · [[trinity]] · [[sequence]] · [[anchor]] · [[whole]] · [[merge]] · [[zeropoint]] · [[law]] · [[confirm]] · [[payload]]
