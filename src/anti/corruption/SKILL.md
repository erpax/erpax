---
name: corruption
description: "Use when detecting internal-control invariants — content-uuid immutability, segregation of duties, double-entry balance, or reversals-only history; the four architectural impossibilities that make financial corruption structurally detectable."
atomPath: "anti/corruption"
coordinate: "anti/corruption · 5/round · 00a0f560"
contentUuid: "8520a9ed-0e27-54d6-9cc9-7d7e46720c5a"
diamondUuid: "c4012505-f238-85a5-9f61-bcb875497062"
uuid: "00a0f560-8577-8dc2-b33f-10f8087c394c"
horo: 5
typography:
  partition: anti
  bondDegree: 72
standards:
  - "ISO-19011"
  - "ISO-19011`"
  - "ISO-27001"
  - "ISO/IEC-27001:2022"
  - "ISO/IEC-27001:2022`"
  - "SOX §404 segregation-of-duties internal-controls"
bindings: []
signatures:
  computationUuid: "236739c5-bc1e-8f7f-8c14-ddfc6660ea0e"
  stages:
    - stage: path
      stageUuid: "29d53fec-2df7-8ef3-b27b-76fdbd140708"
    - stage: trinity
      stageUuid: "6a44bf0e-6a6f-8bb7-89c7-4d6432f6bbff"
    - stage: boundary
      stageUuid: "64d37a2e-2809-81d5-9905-ddd70eddd780"
    - stage: links
      stageUuid: "95c594ce-539f-84a9-8062-deea5da92d05"
    - stage: horo
      stageUuid: "47b0b6d7-4644-8d19-ae07-39afd6b99865"
    - stage: seal
      stageUuid: "e21c760a-79f7-8a0b-baad-c61cfdef37a5"
    - stage: uuid
      stageUuid: "191c696e-98ff-8180-bdca-f1ee6a0205ab"
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
