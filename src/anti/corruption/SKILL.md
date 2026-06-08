---
name: corruption
description: "Use when detecting internal-control invariants — content-uuid immutability, segregation of duties, double-entry balance, or reversals-only history; the four architectural impossibilities that make financial corruption structurally detectable."
atomPath: anti/corruption
coordinate: anti/corruption · 4/weave · 8e08397c
contentUuid: "790352b9-56d0-53e3-a1a7-2dae0cb0900f"
diamondUuid: "52a0aa3d-741d-8f66-9041-7dc922cc7d5a"
uuid: "8e08397c-e612-835e-9a4a-8e2d9ec27827"
horo: 4
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
  - "ISO-19011:2018 audit-trail integrity-verification"
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
  computationUuid: "a81eefe2-7073-81da-9d46-5caa18441fc6"
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
      stageUuid: "7bf5dfa4-35e9-88d7-b499-7d73f7aad64c"
    - stage: seal
      stageUuid: "e21c760a-79f7-8a0b-baad-c61cfdef37a5"
    - stage: uuid
      stageUuid: "076d9109-cb2f-816d-86d3-efb0a1426c72"
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

- **ISO-19011:2018** — audit-trail integrity-verification. `scanTransaction` is the executable audit check.
- **SOX §404** — segregation-of-duties internal-controls. `detectSodViolation` enforces creator ≠ approver ≠ payer (four-eyes).
- **ISO-27001 A.8.15 logging A.8.16 monitoring (tamper detection)** — `detectTamper` implements the monitoring obligation.
