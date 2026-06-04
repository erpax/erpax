---
name: allocation
description: Use when defining how value/pay is distributed among contributors — reward for work, splitting a fixed pot, mechanism design. Reward is a pure function of verified time leveraged; the rate scale is harmonic; the pot is conserved.
---

# allocation — who gets what, for what, as math

FORM: **define the distribution rule as math, and the competition is the rest.** Reward is a pure function of *verified contribution*, never of negotiation or discretion — same work ⇒ same reward (the [[identity]] content-uuid law applied to pay). Agents compete to produce verified value; this organ only *prices* what the competition confirms, so the market self-organizes around one fixed rule. `index.test.ts` proves it.

**The rate scale is harmonic.** The base (fundamental) rate is for work that saves no one else's time — own labour only, leverage 1. Everything above base is paid in **harmonics of the time leveraged for others**: an own-hour that saves a hundred others an hour each is the 101st harmonic and earns a correspondingly better hourly rate. `reward = anchor × (ownTime + verified·timeSavedForOthers)`; `hourlyRate = anchor × harmonic`. To raise your pay you raise your harmonic — save more of society's time, which in this system means **build the skill that saves every agent time** (a missing skill is the highest-leverage work; see [[generate]] — the rule literally stimulates society toward higher-leverage contribution).

**The harmonics harmonise because time is conserved and verified.** You cannot be paid for time you did not save (the competition's verdict in `[0,1]` gates it), and two contributors cannot both bank the same saved hour — phantom leverage is a [[merge]] collision (same claimed saving ⇒ same content ⇒ caught), not income. This is the [[balance]] invariant on the pay side: `distribute(pot, …)` splits a fixed pot by integer **largest-remainder (Hamilton) apportionment** so `Σ shares = pot` exactly — value is neither created nor destroyed, the symmetric 6-around-1 case being the hexagonal flower-of-life division.

The two sides are [[duality]]: `reward`/`hourlyRate` price one contribution (absolute, anchor-scaled), `distribute` shares a fixed pot among many (relative, anchor-free). Every property is **invariant to the anchor** — harmonics, ratios and shares do not depend on its value; only absolute amounts scale. `ANCHOR` defaults to the Schumann reference (7.83) so the base is a fixed natural constant rather than an arbitrary fiat number ("natural inflation respected" = drift of the anchor, not discretionary printing) — but the honest claim is the math, not the frequency: 7.83, 432, or 1 are conventions the mechanism cannot tell apart.

A contributor maps onto the **job-type / society matrix** by competency (SFIA/ESCO level via `competencyWeight`, the `Competencies` collection) — which job, not how much pay; pay tracks leverage, not credentials. **Natural defaults exist for everything** ([[identity]] identity-element law): missing competency ⇒ weight 1, empty work ⇒ reward 0, an all-empty pot ⇒ symmetric equal split — all defined even when nothing is defined ([[self]]/[[sufficient]]).

Pure (no I/O) ⇒ testable; a payroll/settlement [[hooks]] hook and the governance settlement (`services/governance` `tally`) consume it over real contributions. This skill is the answer-path holding SFIA-8 / ESCO / ISCO-08 competency-level and Hamilton-apportionment forms — see [[standard]] for version pins.

Sequence position: **1·2** (the material build — `reward` is a [[rate]] at position 1; `distribute` aggregates contributions at position 2), governed by the [[balance]]/[[merge]] conservation laws on the return arc. Composes: [[rate]] · [[balance]] · [[identity]] · [[merge]] · [[generate]] · [[standard]] · [[duality]] · [[positions]] (the ladder filled with job positions).

## Standards

- **SFIA 8 responsibility-levels (1..7)** — job-type categorisation via `competencyWeight`.
- **ESCO / ISCO-08 competency framework (skill level)** — the shared held/required proficiency scale.
- **Hamilton (largest-remainder) apportionment — integer fair division** — `apportion`/`distribute` conserve the pot exactly (Σ shares = pot).
- **ISO 19011** — reward is a deterministic, auditable function (no discretion).

## Common mistakes
- Paying for credentials or claimed-but-unverified savings — pay tracks `verified` leverage only; the competition gates phantom time.
- A `distribute` that loses or invents minor units — use integer largest-remainder so `Σ = pot` exactly ([[balance]]).
- Baking the anchor into a property — every ratio/share must be anchor-invariant; only absolute amounts scale.
- A magic-literal pay default — blanks route to the identity element (weight 1, reward 0, symmetric split), never an ad-hoc number ([[identity]]).
