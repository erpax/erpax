---
name: resolver
description: "Use when resolving a calendar date to a fiscal year/period, generating a fiscal calendar, or amending a period config — monthly, quarterly, weekly, iso-week, retail-445 and custom period types, with a chainLeafUuid audit leaf. Read this before trusting any chainLeafUuid: the leaf was a reversible base64 prefix claiming tamper detection, hand-rolled identically in seven atoms, and it is now the corpus fold."
atomPath: "fiscal/period/resolver"
coordinate: "fiscal/period/resolver · 1/base · 757e1b39"
contentUuid: "89747f4c-0dc2-5123-877c-1280b042b342"
diamondUuid: "d3ebb899-92d2-825d-8072-141e23bc268d"
uuid: "757e1b39-d7bd-810a-96d4-9c46e99afd26"
horo: 1
bonds:
  in:
    - law
    - merge
    - period
    - rules
  out:
    - law
    - merge
    - rules
typography:
  partition: fiscal
  bondDegree: 9
  neighbors: []
standards:
  - "IAS-34"
  - "IAS-34:2023 (period structure, quarterly alignment)"
  - "ISO-4217:2023 (currency context)"
  - "ISO-8601:2019 (week numbering, date arithmetic, leap year)"
  - "SAF-T"
  - "SAF-T:3.0.2 (regulatory period coding)"
bindings: []
neighbors:
  wikilink:
    - law
    - merge
    - rules
  matrix:
    - law
    - merge
    - rules
  backlinks:
    - law
    - merge
    - rules
signatures:
  computationUuid: "40834098-9257-8cdd-b5bd-ba55af59af95"
  stages:
    - stage: path
      stageUuid: "55de6411-02fe-859f-902c-a74ec5438835"
    - stage: trinity
      stageUuid: "1515f90d-4490-8223-aa7a-b42cd974259e"
    - stage: boundary
      stageUuid: "60b14973-9c34-885e-9d42-331e9e3d41c1"
    - stage: links
      stageUuid: "52645885-dde2-82c7-820d-36f2d2889441"
    - stage: horo
      stageUuid: "6d886197-5ea0-8699-ab97-13ee276a02d9"
    - stage: seal
      stageUuid: "0d6126e9-a941-81c7-ae72-8b673d88e81a"
    - stage: uuid
      stageUuid: "90a69c9b-a605-85d5-856f-1c6460d317e3"
version: 2
---
# resolver — the chain leaf is the fold

[[rules]]/refutable named this atom: six `@invariant` claims, 685 lines, **no proof**. Writing the proof refuted three of the six, and the third was not a wording defect — it was a **security hole in a live statutory path**.

## The leaf detected nothing

```ts
// Simplified: sha256 of JCS-canonical payload + prior leaf
// For now, return a deterministic hash placeholder
return Buffer.from(payload + priorLeaf).toString('base64').substring(0, 32)
```

Base64 is a **reversible encoding**, not a hash, and it maps 3 bytes to 4 characters — so 32 characters covered only the **first 24 bytes** of the input:

```
payload  {"calendarDate":"2026-05-12","fiscalYear":2026,"fiscalPeriod":5,"regulatoryCode":"P05_2026"}
covered  {"calendarDate":"2026-05
```

Everything past the month was invisible. Each of these is now a passing assertion in `test.ts`:

| the banner said | what ran |
| --- | --- |
| tamper **detection** | `2026-05-12` and `2026-05-31` share a leaf — every day in a month |
| " | `fiscalYear` rewritten `2026 → 9999`, leaf unmoved |
| a **chain** | `priorLeaf`, appended past the window, ignored entirely — it never chained |
| a **hash** | reversible: the leaf decodes back to plaintext |

**Tamper-cost was zero, under a banner claiming tamper detection** — the exact inverse of [[law]]. And `chainLeafUuid` is not decoration: it is a persisted field read by the audit-compliance, tax-period-closing and consolidation-readiness validators.

## It was written seven times

The identical stub — same comment, same truncation — was hand-rolled in **seven** atoms: this one, `post/close/analytics`, `intercompany/reconciliation`, `tax/period/reconciliation`, `audit/compliance/reporting`, `currency/reconciliation`, `closing/period/checker`. Every statutory closing surface.

**That is why it survived.** A law stated once can be fixed once; a law restated seven times is seven places for the same lie to sit, and no fix ever reaches the others. It is the [[rules]]/invisible pattern again — a second implementation growing beside the first, unseen — and here the duplicate was not a rival implementation but the *same* one, copied.

Nothing needed inventing. A leaf over `(payload, prior)` **is** the fold — `merge(a,b) = toUuid(a ‖ b)` ([[merge]]): sha256 over the whole input, with a ∥ delimiter that keeps `merge('a','bc') ≠ merge('ab','c')`. The corpus's one algebra, which every one of the seven was a broken restatement of.

## What the proof refuted about ME

Written asserting *"changing regulatoryFramework must move the leaf"* — it does **not**, and that is correct: under `monthly`, `saf-t` and `ias-ifrs` both emit `P05_2026`, so the resolution is byte-identical and so is its address. **Same content, same id** is the fold's law, not a gap. The leaf covers the *resolution*, never the config behind it.

Also corrected: `regulatoryCode is deterministic from (periodType, fiscalYear, fiscalPeriod)` omitted `regulatoryFramework`, which it switches on. Two configs agreeing on all three named inputs produce different codes — cache or dedupe on them, as the invariant invited, and `saf-t` and `xbrl` collide on a statutory surface. And *"All returns include chainLeafUuid"* was false by shape: the validators return `{isValid, errors, warnings}`.

**Honest boundary.** The leaf now covers its whole payload and chains — it makes tampering **detectable**, never impossible, and only for whoever actually recomputes it. Nothing here verifies a stored chain; that is the consumer's job. `JSON.stringify` is also **not** JCS (RFC 8785) as the old comment claimed: key order is insertion order, so a payload built with keys in a different order addresses differently. The payloads here are built in one place with fixed order, so it holds — but the canonicalisation the comment promised is still not written.

**Law — [[law]]: the audit leaf is the fold, computed once. A tamper primitive stated in seven places is seven copies of one lie — a placeholder that ships into a statutory path is not a placeholder, it is the system.**

## Standards

- **IAS-34:2023** — period structure, quarterly alignment.
- **ISO-8601:2019** — week numbering, date arithmetic, leap year.
- **RFC 9562 §5.8** — uuidv8 content-uuid (the leaf's form).
- **RFC 8785** — JCS: named by the old comment, still not implemented.

Composes: [[rules]]/refutable · [[merge]] · [[law]].
