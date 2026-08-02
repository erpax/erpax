---
name: perspective
description: "Use when the SAME content-uuid node must read differently per party — a transfer is give for the payer and take for the payee, a supplier edge is \\\\\\\"my customer\\\\\\\" from the other end, an invoice is AR for the seller and AP for the buyer. The point-of-view projection."
atomPath: perspective
coordinate: "perspective · 4/weave · 66720159"
contentUuid: "edecd533-de4d-5274-890f-c4a7d3306427"
diamondUuid: "62ec8bed-1419-8ed3-a51a-6e2a8f48e33b"
uuid: "66720159-f69b-8da2-857a-9f99dab2b08b"
horo: 4
typography:
  partition: perspective
  bondDegree: 60
standards:
  - "ISO 20022 party-role-perspective (debtor/creditor are one transfer)"
  - "ISO 20022 party-role-perspective (debtor/creditor are one transfer)`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "88877fe0-bf84-8565-a819-4d06a15efefb"
  stages:
    - stage: path
      stageUuid: "47043968-a748-879d-a82c-692c8f9fa7f6"
    - stage: trinity
      stageUuid: "d4f23436-791f-8b64-849f-1c3dfdedf620"
    - stage: boundary
      stageUuid: "027f72f7-7895-8c50-ab28-2faad928a41e"
    - stage: links
      stageUuid: "ec6dbe83-2341-89a6-9329-0240439e21a6"
    - stage: horo
      stageUuid: "108781e2-4cb0-8f49-9a51-d6b450c5cb6f"
    - stage: seal
      stageUuid: "06fe005b-da97-8e4d-933a-1cafaf819730"
    - stage: uuid
      stageUuid: "3bf442f0-f927-8ed3-b662-e6ae35371918"
version: 2
---
# perspective — switch the point of view (derived, never stored)

One content ⇒ one id ([[identity]]), but it READS differently from each party's
vantage. The view is the inverse map of a relation/transfer, computed not stored
([[duality]] · [[merge]]): the payer sees outflow ([[give]]), the payee inflow
([[take]]); a `supplier` edge ([[connections]]) reads `customer` from the other
end; a neutral observer (the auditor) sees BOTH sides — the transparency POV the
[[anti/corruption]] invariants stand on. The two party-views always net to zero
([[balance]]) — conservation is what makes the switch sound. Sequence position 5
(round/bind — the surface where one node is presented infinitely).

Matter-twin: `src/services/perspective/index.ts` (viewEdgeFrom · viewTransferFrom
· isConserved). Composes [[flow]], [[accounting]] (debit↔credit duals), [[field]].

**Law — [[law]]: one content ⇒ one [[identity]], but it READS differently per party (payer's [[give]] is payee's [[take]], seller's AR is buyer's AP) — the view is the inverse map computed not stored, and the two party-views always net to zero ([[balance]]).**

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO 20022 party-role-perspective (debtor/creditor are one transfer)`


- ISO 20022 party-role-perspective (debtor/creditor are one transfer)
