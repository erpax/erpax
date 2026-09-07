---
name: perspective
description: "Use when the SAME content-uuid node must read differently per party — a transfer is give for the payer and take for the payee, a supplier edge is \"my customer\" from the other end, an invoice is AR for the seller and AP for the buyer. The point-of-view projection."
atomPath: perspective
coordinate: "perspective · 2/share · 9363fff3"
contentUuid: "e63bc5a4-d6ff-508f-906e-c258c132d486"
diamondUuid: "ed27ebb2-059f-8ca8-8012-e994a4b9cd78"
uuid: "9363fff3-9f56-8477-a671-6f8eb8358b07"
horo: 2
typography:
  partition: perspective
  bondDegree: 34
standards:
  - "ISO 20022 party-role-perspective (debtor/creditor are one transfer)"
  - "ISO 20022 party-role-perspective (debtor/creditor are one transfer)`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "c2f4d4dd-7c9b-86b7-b388-b0f3c9b0be1b"
  stages:
    - stage: path
      stageUuid: "47043968-a748-879d-a82c-692c8f9fa7f6"
    - stage: trinity
      stageUuid: "d4f23436-791f-8b64-849f-1c3dfdedf620"
    - stage: boundary
      stageUuid: "027f72f7-7895-8c50-ab28-2faad928a41e"
    - stage: links
      stageUuid: "2893daa2-3f0d-8c54-8e9c-aaa6ce9b1c2a"
    - stage: horo
      stageUuid: "cda25a9f-bd13-8b45-898f-fa61383ead0c"
    - stage: seal
      stageUuid: "06fe005b-da97-8e4d-933a-1cafaf819730"
    - stage: uuid
      stageUuid: "75380a4e-eebd-8bdc-b273-adf4b3910146"
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
