---
name: digit
description: "Use when addressing an atom in digit-space — the dual of word — its horo sequence position and the digital-root of its content-uuid, the trace that completes the aura into a tamper-evident trinity."
atomPath: digit
coordinate: "digit · 8/crest · cdb50bdf"
contentUuid: "1266bb7c-afbf-539b-a977-bcf75d0d2985"
diamondUuid: "21976547-b8d8-8a3c-a02d-9300830260a6"
uuid: "cdb50bdf-7d24-8014-baf9-26aae0d6a554"
horo: 8
typography:
  partition: digit
  bondDegree: 103
standards:
  - "RFC 9562 §5.8 content-uuid + the horo digital-root ring"
bindings: []
signatures:
  computationUuid: "6ff29567-eee6-84a1-a8fc-f54bf1b8350c"
  stages:
    - stage: path
      stageUuid: "0cc99f24-283b-825b-82d8-df78fcbd8bc1"
    - stage: trinity
      stageUuid: "3243b9ff-11d5-8b6d-b90f-a50994a89285"
    - stage: boundary
      stageUuid: "91dbef71-fd97-8e92-8407-b343fd993dc6"
    - stage: links
      stageUuid: "aae1f56d-96a9-8673-8a6d-4565ba3add17"
    - stage: horo
      stageUuid: "9e9467fe-e833-83d9-8cc6-80dc39d4f962"
    - stage: seal
      stageUuid: "a8867118-0fec-8040-8324-003fc292aaff"
    - stage: uuid
      stageUuid: "259b9a0d-7bf8-8a63-8ea8-1056063029ad"
version: 2
---
# digit

The digit-space **dual** of [[word]]. Every atom has a WORD address (its folder — the [[aura]] link-space) and a DIGIT address: its [[horo]] position on the [[sequence]] ring (structural) ⊕ the digital-root of its content-[[uuid]] (content).

`word ↔ digit` is the duality; with the uuid they are the [[trinity]] (word · digit · uuid). Computing the digit dual **completes the aura** — a word-graph — into a three-fold tamper-evident fold: forging an atom requires its word, its digit, AND its uuid mutually consistent, so the tamper cost → ∞ ([[merge]] · [[proof]] · [[tamper]]).

Off-[[sequence]] is FS-traceable: an atom whose digit address does not recompute from its content is an anomaly — it does not fold onto the ring. Derived from the matrix, computed, never stored.

**Numeric token facet** (prose layer, distinct from horo math): a digit-run in parsed text (`42`, `007`, …) is a content-addressed [[diamond]] via `digitTokenUuid` — `uuid(jcs({ kind:'digit', value }))`, saved in the text index like [[word]] tokens.

**Law — [[law]]: digit is the dual of [[word]] — every atom's [[horo]] [[sequence]] position ⊕ the digital-root of its content-[[uuid]]; computing it completes the [[aura]] into the word·digit·uuid [[trinity]], a three-fold fold whose mutual consistency drives tamper-[[cost]] to ∞. At the prose layer, digit-runs are numeric token [[diamond]]s in text, content-addressed separately from horo digital-root.**

@standard RFC 9562 §5.8 content-uuid + the horo digital-root ring
@audit the digit address is computed from the live matrix, never hand-maintained
@see text · [[word]] · [[diamond]] · [[typography]] · [[atom]]
