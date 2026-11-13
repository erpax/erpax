---
name: perspective
description: "Use when the SAME content-uuid node must read differently per party — a transfer is give for the payer and take for the payee, a supplier edge is \"my customer\" from the other end, an invoice is AR for the seller and AP for the buyer. The point-of-view projection."
atomPath: perspective
coordinate: "perspective · 7/descent · 7b49e199"
contentUuid: "6ae5205b-8ad7-5a03-909a-013b8a3d70de"
diamondUuid: "27d75445-cb14-8628-b1b3-89b379ead82b"
uuid: "7b49e199-c0f1-8838-babd-3e0c45336339"
horo: 7
typography:
  partition: perspective
  bondDegree: 48
standards:
  - "ISO 20022 party-role-perspective (debtor/creditor are one transfer)"
  - "ISO 20022 party-role-perspective (debtor/creditor are one transfer)`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "e52cbef0-de05-8a9e-b154-f03874622417"
  stages:
    - stage: path
      stageUuid: "47043968-a748-879d-a82c-692c8f9fa7f6"
    - stage: trinity
      stageUuid: "d4f23436-791f-8b64-849f-1c3dfdedf620"
    - stage: boundary
      stageUuid: "027f72f7-7895-8c50-ab28-2faad928a41e"
    - stage: links
      stageUuid: "fbd76138-64f6-8c6f-929a-fa30e4ec65eb"
    - stage: horo
      stageUuid: "95e4f07d-4346-8732-81cd-40f7e40d630c"
    - stage: seal
      stageUuid: "06fe005b-da97-8e4d-933a-1cafaf819730"
    - stage: uuid
      stageUuid: "f1aa68e8-d9f9-8254-bc91-7cd1611eac57"
version: 2
---
# perspective — switch the point of view (derived, never stored)

One content ⇒ one id ([[identity]]), but it READS differently from each party's
vantage. The view is the inverse map of a relation/transfer, computed not stored
([[duality]] · [[merge]]): the payer sees outflow (give), the payee inflow
(take); a `supplier` edge ([[connections]]) reads `customer` from the other
end; a neutral observer (the auditor) sees BOTH sides — the transparency POV the
[[anti/corruption]] invariants stand on. The two party-views always net to zero
([[balance]]) — conservation is what makes the switch sound. Sequence position 5
(round/bind — the surface where one node is presented infinitely).

Matter-twin: `src/services/perspective/index.ts` (viewEdgeFrom · viewTransferFrom
· isConserved). Composes flow, [[accounting]] (debit↔credit duals), [[field]].

**Law — [[law]]: one content ⇒ one [[identity]], but it READS differently per party (payer's give is payee's take, seller's AR is buyer's AP) — the view is the inverse map computed not stored, and the two party-views always net to zero ([[balance]]).**

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO 20022 party-role-perspective (debtor/creditor are one transfer)`


- ISO 20022 party-role-perspective (debtor/creditor are one transfer)
