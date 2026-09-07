---
name: prior
description: "Use when a modern patent claim needs anticipating art — a register of expired grants that are public-domain §102 prior art by construction. Every row's expiry is COMPUTED against the longest term that has ever applied (20 years from filing), never asserted, and the patent number is the citation so a reader checks a row rather than trusting it. Keeps the grant apart from the world: a patent proves a claim was filed, examined and published on a date, never that it works — deployed and undemonstrated are separate fields, and the inference from patented to works is refused."
atomPath: "patent/prior"
coordinate: "patent/prior · 2/share · 410e169b"
contentUuid: "33b16c7d-3680-5e7d-b886-08feb22b093d"
diamondUuid: "1c138c92-cfae-8c1f-aa38-30d75b46860b"
uuid: "410e169b-4c7f-8f0b-a3dc-5c293af8c64e"
horo: 2
typography:
  partition: patent
  bondDegree: 18
standards:
  - "35 U.S.C. §102 — novelty; a prior public disclosure anticipates"
  - "35 U.S.C. §154 — patent term (20 years from filing; 17 from grant pre-1995)"
bindings: []
signatures:
  computationUuid: "0ec89a57-f8d8-8246-adcf-8e74fdfd20de"
  stages:
    - stage: path
      stageUuid: "f4dfe47e-7f22-8d36-bddb-d09b12136e5a"
    - stage: trinity
      stageUuid: "79433720-2d75-8160-bbfb-3bf3a5ae6406"
    - stage: boundary
      stageUuid: "b4c1fb93-a1f8-8b01-9736-91906421dbe2"
    - stage: links
      stageUuid: "2bdf72ad-c338-8048-a762-aef9bfca22e6"
    - stage: horo
      stageUuid: "b0fbd57f-472b-8ac5-8476-70b40a0924e3"
    - stage: seal
      stageUuid: "5986f2ef-297c-8d45-b8d8-84ebbdbb42f1"
    - stage: uuid
      stageUuid: "fb1f2fbc-896a-82c4-84ec-842ae25fa178"
version: 2
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
