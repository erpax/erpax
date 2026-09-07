---
name: perspective
description: "Use when the SAME content-uuid node must read differently per party — a transfer is give for the payer and take for the payee, a supplier edge is \"my customer\" from the other end, an invoice is AR for the seller and AP for the buyer. The point-of-view projection."
atomPath: perspective
coordinate: "perspective · 8/crest · f21397d5"
contentUuid: "d00b74f6-ee8f-57c9-8e06-8c1883d5fb91"
diamondUuid: "baad8e9d-0c14-8fec-86b6-afe079a1d575"
uuid: "f21397d5-ad66-8c55-935d-24e625939bd3"
horo: 8
typography:
  partition: perspective
  bondDegree: 60
standards:
  - "ISO 20022 party-role-perspective (debtor/creditor are one transfer)"
  - "ISO 20022 party-role-perspective (debtor/creditor are one transfer)`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "ab9e0dcf-ef11-8101-bacf-ad880bb0f4a5"
  stages:
    - stage: path
      stageUuid: "47043968-a748-879d-a82c-692c8f9fa7f6"
    - stage: trinity
      stageUuid: "d4f23436-791f-8b64-849f-1c3dfdedf620"
    - stage: boundary
      stageUuid: "027f72f7-7895-8c50-ab28-2faad928a41e"
    - stage: links
      stageUuid: "56785171-b4d8-8340-a24a-9d6e4f9fa82d"
    - stage: horo
      stageUuid: "aefb89c4-f9d0-81eb-a6ba-88ced56df5da"
    - stage: seal
      stageUuid: "06fe005b-da97-8e4d-933a-1cafaf819730"
    - stage: uuid
      stageUuid: "72920f1b-3265-8405-b17e-0ab29e2a7585"
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
