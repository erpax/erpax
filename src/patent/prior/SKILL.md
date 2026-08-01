---
name: prior
description: "Use when a modern patent claim needs anticipating art — a register of expired grants that are public-domain §102 prior art by construction. Every row's expiry is COMPUTED against the longest term that has ever applied (20 years from filing), never asserted, and the patent number is the citation so a reader checks a row rather than trusting it. Keeps the grant apart from the world: a patent proves a claim was filed, examined and published on a date, never that it works — deployed and undemonstrated are separate fields, and the inference from patented to works is refused."
atomPath: "patent/prior"
---

# patent/prior — the expired public record, as working §102 art

[[patent]] has the invalidity machinery — `anticipatedBy` · `isObvious` · `isAbstractMath` — and **no art to run it on**. A gate with no corpus never fires ([[rules]]/unraised), so this atom supplies the one body of prior art that needs nobody's permission to publish: **grants whose term has expired**.

The register is Tesla's foundational patents. Three reasons, each checkable rather than reverent:

1. **Every one is expired**, so the whole body is public domain — and `expired()` *computes* that from the grant year against the longest term that has ever applied (20 years from filing; 17 from grant before 1995). The newest row is 1914, so the register cannot rot into being wrong.
2. **The number is the citation.** Each row resolves at the USPTO, so a reader checks a row instead of trusting it — [[rules]]/reference applied to a patent instead of a path.
3. **One of them is this corpus's own [[rodin]]/phase.** US 381,968 claims the rotating magnetic field produced by polyphase currents — the 120° offset that atom computes. The link between erpax and the patent record is a specific document, not an atmosphere.

## The defensive use — and it is the only "security" here

An expired disclosure anticipates a later claim to the same content. A register of expired grants is therefore a standing **anticipation set**: a modern claim reading on polyphase rotating fields, resonant tuned-circuit coupling or radio remote control is anticipated by a public document from the 1890s. That *removes* a monopoly risk rather than creating one.

```
anticipatedBySubject(['rotating magnetic field', 'polyphase'], 2026)  →  US 381,968 (1888)
anticipatedBySubject(['boundary-layer'], 1900)                        →  undefined   (the turbine is 1913)
```

Keywords are **supplied by the caller**, never inferred from the prose: a pattern over English is a guess, and this returns a legal-shaped answer.

## A grant is a verdict about a document, never about nature

| | |
| --- | --- |
| `deployed` | the polyphase AC system became the world's electrical grid |
| `undemonstrated` | global power transmission through the earth was never demonstrated at scale — the patent is real, the working system never existed |

Conflating these is exactly what [[convention]]/discern refuses, so `assertGrantClaim` throws on *"it was patented, therefore it works"* while *"US 381,968 discloses the rotating magnetic field"* passes untouched. A patent office examines a **claim**, not a universe.

**Honest boundary.** This proves a disclosure is **public and dated**, never that a specific modern claim is **invalid** — anticipation is claim-by-claim construction against the actual claim language, and this matches declared subject keywords. It is defensive modelling, not legal advice. The register is **declared**, not scraped: a fabricated row would be worse than a missing one, and its whole value is that every line survives being looked up.

**Law — [[law]]: an expired grant is public-domain prior art, and its number is its citation. A patent proves a claim was filed and published on a date — never that the claim works.**

## Standards

- **35 U.S.C. §102** — novelty: a prior public disclosure anticipates.
- **35 U.S.C. §154** — patent term.

Composes: [[patent]] · [[anchor]] · [[rodin]]/phase · [[convention]]/discern · [[law]].
