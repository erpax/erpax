---
name: corruption
description: "Use when detecting internal-control invariants — content-uuid immutability, segregation of duties, double-entry balance, or reversals-only history; the four architectural impossibilities that make financial corruption structurally detectable."
atomPath: "anti/corruption"
coordinate: "anti/corruption · 2/share · ce5400d5"
contentUuid: "a899abbf-3675-587e-b34e-027e4fba0f10"
diamondUuid: "81829aec-6506-8ac8-818e-80cd21f50bb5"
uuid: "ce5400d5-ba2b-81a0-a944-c1b9adce2d23"
horo: 2
bonds:
  in:
    - access
    - accounting
    - balance
    - consistency
    - constitution
    - duality
    - event
    - fractal
    - governance
    - holographic
    - hooks
    - identity
    - law
    - legislation
    - merge
    - notification
    - party
    - perspective
    - reverse
    - separation
    - sequence
    - standard
    - supto
    - voting
  out:
    - access
    - accounting
    - balance
    - consistency
    - constitution
    - duality
    - event
    - fractal
    - governance
    - holographic
    - hooks
    - identity
    - law
    - legislation
    - merge
    - notification
    - party
    - perspective
    - reverse
    - separation
    - sequence
    - standard
    - supto
    - voting
typography:
  partition: anti
  bondDegree: 72
  neighbors: []
standards:
  - "EU-2022/1925"
  - "EU-2022/2065"
  - "EU-2022/2554"
  - "EU-2022/2555"
  - "EU-2022/868"
  - "ILO-C001"
  - "ISO-19011"
  - "ISO-19011`"
  - "ISO-27001"
  - "ISO/IEC-27001:2022"
  - "ISO/IEC-27001:2022`"
  - "SOX §404 segregation-of-duties internal-controls"
bindings: []
neighbors:
  wikilink:
    - access
    - accounting
    - balance
    - duality
    - event
    - fractal
    - holographic
    - hooks
    - identity
    - law
    - merge
    - reverse
    - sequence
    - standard
    - supto
  matrix:
    - access
    - accounting
    - balance
    - consistency
    - constitution
    - duality
    - event
    - fractal
    - governance
    - holographic
    - hooks
    - identity
    - law
    - legislation
    - merge
    - notification
    - party
    - perspective
    - reverse
    - separation
    - sequence
    - standard
    - supto
    - voting
  backlinks:
    - access
    - accounting
    - balance
    - consistency
    - constitution
    - duality
    - event
    - fractal
    - governance
    - holographic
    - hooks
    - identity
    - law
    - legislation
    - merge
    - notification
    - party
    - perspective
    - reverse
    - separation
    - sequence
    - standard
    - supto
    - voting
signatures:
  computationUuid: "0a7cb259-f246-8636-888f-5216e8b68aba"
  stages:
    - stage: path
      stageUuid: "29d53fec-2df7-8ef3-b27b-76fdbd140708"
    - stage: trinity
      stageUuid: "6a44bf0e-6a6f-8bb7-89c7-4d6432f6bbff"
    - stage: boundary
      stageUuid: "e397b384-d1d5-8f89-8b4e-6b0ca7067512"
    - stage: links
      stageUuid: "95c594ce-539f-84a9-8062-deea5da92d05"
    - stage: horo
      stageUuid: "28b4254e-99f0-8f7b-b160-91c626a54632"
    - stage: seal
      stageUuid: "e21c760a-79f7-8a0b-baad-c61cfdef37a5"
    - stage: uuid
      stageUuid: "0480f6ed-ec4b-8906-893d-6e7304525cc6"
version: 2
---
# anti-corruption — corruption foreclosed by construction, not policed by policy

FORM: **a ledger is corruption-free iff four invariants hold at once, each a different impossibility.** erpax does not *trust* records and *audit* them after; it makes the fraud a contradiction that fails a pure check. Each invariant catches a concrete scheme, proven by test (`index.test.ts`, `cross-entity.test.ts`):

1. **content-uuid immutability** — the record's id IS the SHA of its content ([[identity]]); recompute ≠ stored ⇒ tamper detected, not believed. `detectTamper`.
2. **segregation of duties** — creator ≠ approver ≠ payer (four-eyes); no single actor completes a value transfer ([[access]], SOX §404). `detectSodViolation`.
3. **double-entry balance** — Σdebit = Σcredit; value cannot be fabricated from nothing ([[balance]], [[accounting]]). `detectImbalance`.
4. **no-delete / reversal-only** — history is append-only; correct by a reversing entry, never erase a posted row ([[reverse]], [[supto]] Наредба Н-18). `detectIllegalErasure`.

`scanTransaction` runs all four; any finding is a corruption signal. All pure (no I/O) ⇒ testable. A document `afterChange` [[hooks]] hook + a scheduled audit job consume it over the live ledger, each pass emitting an audit [[event]].

The costliest schemes are invisible to single-record checks — they live in the join across entities and across institutions (`cross-entity.ts`): self-dealing (approver is a beneficial owner of the payee), shell/ghost vendors, multiple-invoicing, bid-rotation rings, split purchases. The [[merge]] law itself is the multiple-invoicing detector: same content ⇒ same id, so one invoice claimed twice is a collision ([[holographic]]: the whole graph is recoverable, the [[fractal]] check runs at every scale — line, document, institution, federation).

The two sides are [[duality]]: the in-ledger invariants (matter) and the cross-entity graph checks (the schemes immutability cannot see). This skill is the answer-path holding SOX §404 / COSO-2013 / ISO-27001 A.8.15–8.16 / FATF R.24 / ACFE forms — see [[standard]] for version pins.

Sequence position: **9** (unity / verification / audit — the conservation check that closes a pass), on the ring 0·3·6·9·1·2·4·8·7·5 (see [[sequence]]).

**Law — [[law]]: a ledger is corruption-free iff four invariants hold at once — content-uuid immutability ([[identity]]), segregation of duties, double-entry [[balance]], and reversal-only history; fraud is a contradiction that fails a pure check, not a record to be trusted-then-audited.**

## Standards

<!-- standards banners (the 7-dim instrument reads SKILL.md; these atoms declare these standards in this section) -->
- `@standard ISO/IEC-27001:2022`
- `@standard ISO-19011`


- **ISO-19011:2018** — audit-trail integrity-verification. `scanTransaction` is the executable audit check.
- **SOX §404** — segregation-of-duties internal-controls. `detectSodViolation` enforces creator ≠ approver ≠ payer (four-eyes).
- **ISO-27001 A.8.15 logging A.8.16 monitoring (tamper detection)** — `detectTamper` implements the monitoring obligation.
