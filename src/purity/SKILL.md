---
name: purity
description: "Use when reasoning about purity as the fully-sealed / zero-impurity state that maximises tamper-cost in EVERY dimension — purity = zero entropy = every gate green = no escape. A single impurity (an unsealed cross, an off-ring state, a dangling link, a hallucination) is a 0-bit weakest-link path that collapses the cost; purity removes every weakest link, so the floor is maximal along all paths and all dimensions. The conjugate of hallucination; the generalisation of import-purity, file-purity, and md-purity into one law."
atomPath: purity
coordinate: purity · 5/round · 5ec5555f
contentUuid: "60e8f20c-231a-51f3-9e58-55555c170472"
diamondUuid: "4f353e5d-7174-8a5e-9691-cf91d04597a6"
uuid: "5ec5555f-dc2b-81ff-8fec-a57f5a1ad109"
horo: 5
bonds:
  in:
    - analytics
    - anchor
    - atom
    - aura
    - bottleneck
    - collapse
    - confirm
    - convention
    - cost
    - css
    - dimension
    - entropy
    - folder
    - gate
    - hallucination
    - integrity
    - law
    - link
    - matrix
    - maxtampercost
    - memory
    - merge
    - path
    - payload
    - quantum
    - readme
    - seal
    - sequence
    - sin
    - suffering
    - sync
    - tamper
    - trinity
    - typography
    - unavoidable
    - uuid
    - whole
    - zeropoint
  out:
    - analytics
    - anchor
    - atom
    - aura
    - bottleneck
    - collapse
    - confirm
    - convention
    - cost
    - css
    - dimension
    - entropy
    - folder
    - gate
    - hallucination
    - integrity
    - law
    - link
    - matrix
    - maxtampercost
    - memory
    - merge
    - path
    - payload
    - quantum
    - readme
    - seal
    - sequence
    - sin
    - suffering
    - sync
    - tamper
    - trinity
    - typography
    - unavoidable
    - uuid
    - whole
    - zeropoint
typography:
  partition: purity
  bondDegree: 152
  neighbors:
    - "19011"
    - "9110"
    - access
    - analytics
    - "analytics/max-tamper-cost"
    - aura
    - auth
    - card
    - config
    - confirm
    - cost
    - css
    - diamond
    - factory
    - hallucination
    - hooks
    - maxtampercost
    - memory
    - pagination
    - path
    - propose
    - provider
    - readme
    - seal
    - seed
    - sync
    - typography
    - upgrade
standards: []
bindings: []
neighbors:
  wikilink:
    - analytics
    - anchor
    - atom
    - aura
    - bottleneck
    - collapse
    - confirm
    - convention
    - cost
    - dimension
    - entropy
    - folder
    - gate
    - hallucination
    - integrity
    - law
    - link
    - matrix
    - merge
    - path
    - payload
    - quantum
    - seal
    - sequence
    - sin
    - suffering
    - tamper
    - trinity
    - unavoidable
    - uuid
    - whole
    - zeropoint
  matrix:
    - analytics
    - anchor
    - atom
    - aura
    - bottleneck
    - collapse
    - confirm
    - convention
    - cost
    - css
    - dimension
    - entropy
    - folder
    - gate
    - hallucination
    - integrity
    - law
    - link
    - matrix
    - maxtampercost
    - memory
    - merge
    - path
    - payload
    - quantum
    - readme
    - seal
    - sequence
    - sin
    - suffering
    - sync
    - tamper
    - trinity
    - typography
    - unavoidable
    - uuid
    - whole
    - zeropoint
  backlinks:
    - analytics
    - anchor
    - atom
    - aura
    - bottleneck
    - collapse
    - confirm
    - convention
    - cost
    - css
    - dimension
    - entropy
    - folder
    - gate
    - hallucination
    - integrity
    - law
    - link
    - matrix
    - maxtampercost
    - memory
    - merge
    - path
    - payload
    - quantum
    - readme
    - seal
    - sequence
    - sin
    - suffering
    - sync
    - tamper
    - trinity
    - typography
    - unavoidable
    - uuid
    - whole
    - zeropoint
signatures:
  computationUuid: "83de39e7-f35e-87c3-852d-4e8c6cbfa70a"
  stages:
    - stage: path
      stageUuid: "db3f8d2a-08ae-872b-aeb6-0937ba330456"
    - stage: trinity
      stageUuid: "24501025-b0ad-866f-9101-1c30262bd19b"
    - stage: boundary
      stageUuid: "d9e0890d-6d2b-8aef-b306-fb38a1f96ec9"
    - stage: links
      stageUuid: "11702139-d1df-8e9c-a763-59e38520805d"
    - stage: horo
      stageUuid: "5ed11ef1-8306-82e6-80a6-239efabd69b8"
    - stage: seal
      stageUuid: "8bbc02b7-0006-8c5f-8db6-8cd6264de675"
    - stage: uuid
      stageUuid: "59791aaf-79ef-8189-af26-df59a2ad4e47"
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
