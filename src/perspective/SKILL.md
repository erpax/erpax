---
name: perspective
description: "Use when the SAME content-uuid node must read differently per party — a transfer is give for the payer and take for the payee, a supplier edge is \\\"my customer\\\" from the other end, an invoice is AR for the seller and AP for the buyer. The point-of-view projection."
atomPath: perspective
coordinate: perspective · 4/weave · aaca668f
contentUuid: "0eaed05e-5af5-527c-8ac0-41d485461cc5"
diamondUuid: "d24f6d59-db65-815b-b177-07f3ae24d4c6"
uuid: "aaca668f-ae71-8684-bc53-bfb17293eba9"
horo: 4
bonds:
  in:
    - accounting
    - balance
    - brainstorm
    - connections
    - corruption
    - duality
    - entry
    - fields
    - flow
    - give
    - identity
    - law
    - merge
    - take
  out:
    - accounting
    - balance
    - brainstorm
    - connections
    - corruption
    - duality
    - entry
    - fields
    - flow
    - give
    - identity
    - law
    - merge
    - take
typography:
  partition: perspective
  bondDegree: 42
  neighbors: []
standards:
  - "ISO 20022 party-role-perspective (debtor/creditor are one transfer)"
bindings: []
neighbors:
  wikilink:
    - accounting
    - balance
    - connections
    - corruption
    - duality
    - fields
    - flow
    - give
    - identity
    - law
    - merge
    - take
  matrix:
    - accounting
    - balance
    - brainstorm
    - connections
    - corruption
    - duality
    - entry
    - fields
    - flow
    - give
    - identity
    - law
    - merge
    - take
  backlinks:
    - accounting
    - balance
    - brainstorm
    - connections
    - corruption
    - duality
    - entry
    - fields
    - flow
    - give
    - identity
    - law
    - merge
    - take
signatures:
  computationUuid: "05887b73-13ff-8a0b-a07a-a7c1447016cd"
  stages:
    - stage: path
      stageUuid: "47043968-a748-879d-a82c-692c8f9fa7f6"
    - stage: trinity
      stageUuid: "d4f23436-791f-8b64-849f-1c3dfdedf620"
    - stage: boundary
      stageUuid: "63cd6c10-0c07-8aa9-be3f-eeca20dcc9da"
    - stage: links
      stageUuid: "ec6dbe83-2341-89a6-9329-0240439e21a6"
    - stage: horo
      stageUuid: "4ae13f91-47c3-8271-9c8c-813c2f51f0b2"
    - stage: seal
      stageUuid: "096df152-b696-8778-af40-c0a660881c1d"
    - stage: uuid
      stageUuid: "371bb55a-35ba-80df-9e86-6e0a121f9e8a"
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
· isConserved). Composes [[flow]], [[accounting]] (debit↔credit duals), [[fields]].

**Law — [[law]]: one content ⇒ one [[identity]], but it READS differently per party (payer's [[give]] is payee's [[take]], seller's AR is buyer's AP) — the view is the inverse map computed not stored, and the two party-views always net to zero ([[balance]]).**

## Standards

- ISO 20022 party-role-perspective (debtor/creditor are one transfer)
