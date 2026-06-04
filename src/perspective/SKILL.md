---
name: perspective
description: Use when the SAME content-uuid node must read differently per party — a transfer is give for the payer and take for the payee, a supplier edge is "my customer" from the other end, an invoice is AR for the seller and AP for the buyer. The point-of-view projection.
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

## Standards

- ISO 20022 party-role-perspective (debtor/creditor are one transfer)
