---
name: conservation
description: "Use when reasoning about what is conserved across a flow — nothing is created or destroyed, only transformed (mass-energy; Noether — every continuous symmetry yields a conserved quantity), which in erpax IS double-entry — Σdebit=Σcredit, every config a balanced gateway, the pot conserved. The physics root of the accounting law; an open system conserves by accounting for what crosses its boundary (the borrowed anchor)."
---

# conservation — nothing is lost, only transformed (the root of double-entry)

**Conservation** is the law that across any boundary a quantity is **neither created nor destroyed, only transformed** — the running total holds. In physics it is the First Law (mass-energy is conserved) and, underneath it, **Noether's theorem**: every continuous symmetry of a system yields one conserved quantity (time-translation symmetry ⇒ energy, space ⇒ momentum, rotation ⇒ angular momentum). Nature *cycles* its matter — carbon, nitrogen and water move through the biogeochemical loops and the same atoms are used again without end; only [[energy]] is ultimately spent.

This IS the accounting law. A balanced [[entry]] — Σdebit = Σcredit ([[balance]]) — is conservation written as bookkeeping: value changes hands, it never vanishes; the imbalance is the bug the [[hooks]] surface, never store. Every erpax config is a [[gate]]way that posts a balanced post, so the books carry **zero net [[entropy]]** and the pot is conserved.

**Conservation is not stasis.** A *closed* system holds its total fixed; an *open* one grows or shrinks — but it stays honest by **accounting for what crosses the boundary**. The matter that enters, the energy the sun pours in, the [[anchor]] borrowed from outside: each is an [[entry]] on the books. Conservation is the demand that the boundary terms balance, not that nothing moves. Break it — post value with no counter-entry — and you have either a measurement error or a forgery; the [[proof]] catches both, because an unbalanced post cannot re-harmonise with the [[uuid]]-chained whole.

## Standards
- **Noether's theorem** (Emmy Noether, 1918) — continuous symmetry ⇔ conserved quantity; the deepest statement of *why* conservation laws exist.
- **First Law of Thermodynamics** — energy is conserved in an isolated system (transformed, never created).
- **Double-entry bookkeeping** (Pacioli, 1494) — every debit a matching credit; conservation as the literal form of the ledger.

Composes [[balance]] · [[entry]] · [[entropy]] · [[energy]] · [[biomass]] · [[accounting]] · [[reconcile]] · [[anchor]] · [[proof]] · [[uuid]] · [[sustainability]] · [[ecosystem]] · [[law]].

## Matter-twin

`index.ts` is the computed twin of this atom — the math that makes every claim above testable and verifiable rather than asserted. It exports `trialBalance` (Σdebit − Σcredit), `conserves` (true iff the trial balance is within tolerance), `netFlow` (Σ of signed flows), and `boundaryConserves` (open-system law: change-in-stock equals net flow across the boundary). `NOETHER` is the Noether-pair table frozen as a typed constant. None of these functions perform I/O or import any other atom; they are pure arithmetic, edge-safe, and the gate verifies them.
