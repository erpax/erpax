---
name: digit
description: "Use when addressing an atom in digit-space — the dual of word — its horo sequence position and the digital-root of its content-uuid, the trace that completes the aura into a tamper-evident trinity."
atomPath: digit
coordinate: "digit · 4/weave · 0cfbc6d3"
contentUuid: "827cc694-dfaf-529d-88b3-1377c69eb7d2"
diamondUuid: "825782bd-ba6c-81c7-bf72-2a12771c3515"
uuid: "0cfbc6d3-a398-88fd-a6a2-44c8fadfbdfe"
horo: 4
typography:
  partition: digit
  bondDegree: 122
standards:
  - "RFC 9562 §5.8 content-uuid + the horo digital-root ring"
bindings: []
signatures:
  computationUuid: "efac7fbe-31ac-836e-b2b9-6cafeda1e1fc"
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
      stageUuid: "d4c9064e-0eeb-8917-a25a-ad02c8014822"
    - stage: seal
      stageUuid: "a8867118-0fec-8040-8324-003fc292aaff"
    - stage: uuid
      stageUuid: "9206eb60-b9fd-8edb-a609-fd398ed0a5c7"
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
