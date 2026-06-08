---
name: conservation
description: "Use when reasoning about what is conserved across a flow — nothing is created or destroyed, only transformed (mass-energy; Noether — every continuous symmetry yields a conserved quantity), which in erpax IS double-entry — Σdebit=Σcredit, every config a balanced gateway, the pot conserved. The physics root of the accounting law; an open system conserves by accounting for what crosses its boundary (the borrowed anchor)."
atomPath: conservation
coordinate: conservation · 2/share · 0bcabad1
contentUuid: "d1508860-8b8e-5fee-bdc9-15f5385c7e16"
diamondUuid: "c387f89d-977a-895d-9339-a272a5b6ccf2"
uuid: "0bcabad1-b4fd-8015-bfe7-acb9dd492acc"
horo: 2
bonds:
  in:
    - accounting
    - anchor
    - artery
    - balance
    - biomass
    - blockchain
    - blood
    - compost
    - ecosystem
    - emission
    - energy
    - entropy
    - entry
    - equity
    - gate
    - heart
    - hooks
    - law
    - lung
    - mycelium
    - proof
    - quantum
    - readme
    - reconcile
    - skills
    - soil
    - sustainability
    - unavoidable
    - uuid
    - vein
  out:
    - accounting
    - anchor
    - artery
    - balance
    - biomass
    - blockchain
    - blood
    - compost
    - ecosystem
    - emission
    - energy
    - entropy
    - entry
    - equity
    - gate
    - heart
    - hooks
    - law
    - lung
    - mycelium
    - proof
    - quantum
    - readme
    - reconcile
    - skills
    - soil
    - sustainability
    - unavoidable
    - uuid
    - vein
typography:
  partition: conservation
  bondDegree: 93
  neighbors: []
standards:
  - "Double-entry bookkeeping (Pacioli, 1494) — Σdebit = Σcredit"
  - First Law of Thermodynamics — energy is conserved in an isolated system
  - "Noether's theorem (E. Noether, 1918) — continuous symmetry ⇔ conserved quantity"
  - "UBL-2.1"
  - "computed, never hand-asserted"
bindings: []
neighbors:
  wikilink:
    - accounting
    - anchor
    - balance
    - biomass
    - ecosystem
    - energy
    - entropy
    - entry
    - gate
    - hooks
    - law
    - proof
    - reconcile
    - sustainability
    - uuid
  matrix:
    - accounting
    - anchor
    - artery
    - balance
    - biomass
    - blockchain
    - blood
    - compost
    - ecosystem
    - emission
    - energy
    - entropy
    - entry
    - equity
    - gate
    - heart
    - hooks
    - law
    - lung
    - mycelium
    - proof
    - quantum
    - readme
    - reconcile
    - skills
    - soil
    - sustainability
    - unavoidable
    - uuid
    - vein
  backlinks:
    - accounting
    - anchor
    - artery
    - balance
    - biomass
    - blockchain
    - blood
    - compost
    - ecosystem
    - emission
    - energy
    - entropy
    - entry
    - equity
    - gate
    - heart
    - hooks
    - law
    - lung
    - mycelium
    - proof
    - quantum
    - readme
    - reconcile
    - skills
    - soil
    - sustainability
    - unavoidable
    - uuid
    - vein
signatures:
  computationUuid: "b66fb295-4492-87fc-a10d-0e384cfa9921"
  stages:
    - stage: path
      stageUuid: "4da50aaf-bca0-808d-a7b5-181ad11c2a01"
    - stage: trinity
      stageUuid: "feef67a5-6f21-8917-b026-f482db01fcd2"
    - stage: boundary
      stageUuid: "a0c16b9b-c634-8c31-bf81-0bc1def3e664"
    - stage: links
      stageUuid: "a40f802a-4d15-872b-ab9e-685b84c57294"
    - stage: horo
      stageUuid: "ac990025-b698-8779-95c5-5f24bdfb94a4"
    - stage: seal
      stageUuid: "6710b237-9f9e-8113-b889-8cc642269d4f"
    - stage: uuid
      stageUuid: "8a253f80-61be-8880-90ca-fc667693a589"
version: 2
---
# conservation — nothing is lost, only transformed (the root of double-entry)

**Conservation** is the law that across any boundary a quantity is **neither created nor destroyed, only transformed** — the running total holds. In physics it is the First Law (mass-energy is conserved) and, underneath it, **Noether's theorem**: every continuous symmetry of a system yields one conserved quantity (time-translation symmetry ⇒ energy, space ⇒ momentum, rotation ⇒ angular momentum). Nature *cycles* its matter — carbon, nitrogen and water move through the biogeochemical loops and the same atoms are used again without end; only [[energy]] is ultimately spent.

This IS the accounting law. A balanced [[entry]] — Σdebit = Σcredit ([[balance]]) — is conservation written as bookkeeping: value changes hands, it never vanishes; the imbalance is the bug the [[hooks]] surface, never store. Every erpax config is a [[gate]]way that posts a balanced post, so the books carry **zero net [[entropy]]** and the pot is conserved.

**Conservation is not stasis.** A *closed* system holds its total fixed; an *open* one grows or shrinks — but it stays honest by **accounting for what crosses the boundary**. The matter that enters, the energy the sun pours in, the [[anchor]] borrowed from outside: each is an [[entry]] on the books. Conservation is the demand that the boundary terms balance, not that nothing moves. Break it — post value with no counter-entry — and you have either a measurement error or a forgery; the [[proof]] catches both, because an unbalanced post cannot re-harmonise with the [[uuid]]-chained whole.

## Standards
- **Noether's theorem** (Emmy Noether, 1918) — continuous symmetry ⇔ conserved quantity; the deepest statement of *why* conservation laws exist.
- **First Law of Thermodynamics** — energy is conserved in an isolated system (transformed, never created).
- **Double-entry bookkeeping** (Pacioli, 1494) — every debit a matching credit; conservation as the literal form of the ledger.

**Law — [[law]]: across any boundary a quantity is neither created nor destroyed, only transformed (Noether: every continuous symmetry yields a conserved quantity) — which IS double-entry, Σdebit=Σcredit ([[balance]]); an open system stays honest by [[accounting]] for what crosses the boundary (the borrowed [[anchor]]), so an unbalanced post is the bug the [[proof]] catches, never stores.**

Composes [[balance]] · [[entry]] · [[entropy]] · [[energy]] · [[biomass]] · [[accounting]] · [[reconcile]] · [[anchor]] · [[proof]] · [[uuid]] · [[sustainability]] · [[ecosystem]] · [[law]].

## Matter-twin

`index.ts` is the computed twin of this atom — the math that makes every claim above testable and verifiable rather than asserted. It exports `trialBalance` (Σdebit − Σcredit), `conserves` (true iff the trial balance is within tolerance), `netFlow` (Σ of signed flows), and `boundaryConserves` (open-system law: change-in-stock equals net flow across the boundary). `NOETHER` is the Noether-pair table frozen as a typed constant. None of these functions perform I/O or import any other atom; they are pure arithmetic, edge-safe, and the gate verifies them.
