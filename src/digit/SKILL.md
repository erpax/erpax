---
name: digit
description: "Use when addressing an atom in digit-space — the dual of word — its horo sequence position and the digital-root of its content-uuid, the trace that completes the aura into a tamper-evident trinity."
atomPath: digit
coordinate: "digit · 8/crest · e8235a90"
contentUuid: "cca46359-c94e-5108-9e35-94a92a52a91a"
diamondUuid: "9dcd0660-01d3-8d36-acb3-cb64537d2f31"
uuid: "e8235a90-e634-85c9-9244-6c570b79ed94"
horo: 8
typography:
  partition: digit
  bondDegree: 116
standards:
  - "RFC 9562 §5.8 content-uuid + the horo digital-root ring"
bindings: []
signatures:
  computationUuid: "e7c22031-6e08-8fcb-8dae-cec7e0347a19"
  stages:
    - stage: path
      stageUuid: "0cc99f24-283b-825b-82d8-df78fcbd8bc1"
    - stage: trinity
      stageUuid: "3243b9ff-11d5-8b6d-b90f-a50994a89285"
    - stage: boundary
      stageUuid: "91dbef71-fd97-8e92-8407-b343fd993dc6"
    - stage: links
      stageUuid: "69b1d338-3ac6-8eb8-a61d-31d94fcca6dd"
    - stage: horo
      stageUuid: "f77e36fc-2599-81a1-b764-a857b31ccaab"
    - stage: seal
      stageUuid: "a8867118-0fec-8040-8324-003fc292aaff"
    - stage: uuid
      stageUuid: "ee74957f-50ee-81cc-9902-18c6d9ff30fa"
version: 2
---
# digit

The digit-space **dual** of [[word]]. Every atom has a WORD address (its folder — the [[aura]] link-space) and a DIGIT address: its [[horo]] position on the [[sequence]] ring (structural) ⊕ the digital-root of its content-[[uuid]] (content).

`word ↔ digit` is the duality; with the uuid they are the [[trinity]] (word · digit · uuid). Computing the digit dual **completes the aura** — a word-graph — into a three-fold tamper-evident fold: forging an atom requires its word, its digit, AND its uuid mutually consistent, so the tamper cost → ∞ ([[merge]] · [[proof]] · [[tamper]]).

Off-[[sequence]] is FS-traceable: an atom whose digit address does not recompute from its content is an anomaly — it does not fold onto the ring. Derived from the matrix, computed, never stored.

**Numeric token facet** (prose layer, distinct from horo math): a digit-run in parsed [[text]] (`42`, `007`, …) is a content-addressed [[diamond]] via `digitTokenUuid` — `uuid(jcs({ kind:'digit', value }))`, saved in the [[text]] index like [[word]] tokens.

**Law — [[law]]: digit is the dual of [[word]] — every atom's [[horo]] [[sequence]] position ⊕ the digital-root of its content-[[uuid]]; computing it completes the [[aura]] into the word·digit·uuid [[trinity]], a three-fold fold whose mutual consistency drives tamper-[[cost]] to ∞. At the prose layer, digit-runs are numeric token [[diamond]]s in [[text]], content-addressed separately from horo digital-root.**

@standard RFC 9562 §5.8 content-uuid + the horo digital-root ring
@audit the digit address is computed from the live matrix, never hand-maintained
@see [[text]] · [[word]] · [[diamond]] · [[typography]] · [[atom]]
