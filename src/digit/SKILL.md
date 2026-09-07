---
name: digit
description: "Use when addressing an atom in digit-space — the dual of word — its horo sequence position and the digital-root of its content-uuid, the trace that completes the aura into a tamper-evident trinity."
atomPath: digit
coordinate: "digit · 2/share · 4beee34a"
contentUuid: "e8eff609-c7e2-5217-8faf-6018f1d7881f"
diamondUuid: "ac5f6b20-effd-852d-8a00-0adb48595846"
uuid: "4beee34a-0328-8d31-aeda-dd9efaea80f3"
horo: 2
typography:
  partition: digit
  bondDegree: 122
standards:
  - "RFC 9562 §5.8 content-uuid + the horo digital-root ring"
bindings: []
signatures:
  computationUuid: "7c806aed-d24a-8625-a57b-a5ec7af9de46"
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
      stageUuid: "6d8abb45-821f-8a8a-a01b-b366afc27d8d"
    - stage: seal
      stageUuid: "a8867118-0fec-8040-8324-003fc292aaff"
    - stage: uuid
      stageUuid: "92df08f3-0255-8bbf-9dfa-ecad6010025d"
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
