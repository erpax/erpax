---
name: "16"
description: "Use when implementing or referencing IFRS 16 / ASC 842 — Leases."
atomPath: "ifrs/16"
coordinate: "ifrs/16 · 2/share · 9f7a45d8"
contentUuid: "c69f9deb-da93-56cd-b389-003b4c5596eb"
diamondUuid: "bd889f06-7a65-8306-9f65-b3b4ca72d84e"
uuid: "9f7a45d8-34cc-8c7d-a365-2ee557edd34e"
horo: 2
typography:
  partition: ifrs
  bondDegree: 1
standards:
  - "IFRS IFRS-16 leases"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO/IEC-29119"
  - "US-GAAP ASC-842-20 lessee-accounting"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "1aaa3227-29b4-814b-86aa-4bd61afd910f"
  stages:
    - stage: path
      stageUuid: "ee6b2a65-3f6f-8d24-96d4-001ede700d7e"
    - stage: trinity
      stageUuid: "b9160e99-c709-8dc3-8d85-67277f6f7828"
    - stage: boundary
      stageUuid: "78d90d82-94b1-806f-bede-b85d060ed22b"
    - stage: links
      stageUuid: "b420a017-a947-8497-9138-26a91f2ca3df"
    - stage: horo
      stageUuid: "6ce00c35-cba1-8e28-a915-e980475d872e"
    - stage: seal
      stageUuid: "25a8b629-5593-8310-8a41-90429c4a99e3"
    - stage: uuid
      stageUuid: "acc1fe03-fd87-83f2-bf96-3d861a944dee"
version: 2
---
# IFRS 16 / ASC 842 — Leases

**IFRS edition:** IFRS 16 (January 2016, effective 2019).
**US-GAAP edition:** ASC 842 (FASB ASU 2016-02), effective 2019 (public) / 2022 (private).
**Publishers:**
- IASB <https://www.ifrs.org/issued-standards/list-of-standards/ifrs-16-leases/>
- FASB <https://asc.fasb.org/topic&trid=77888881>

## What's here

Canonical types for the lessee accounting model both standards now require — every lease (with two narrow exemptions) puts a right-of-use asset and a lease liability on the balance sheet:

- `Lease` — the master record (identifier, term, payments, classification)
- `RouAsset` — initial + subsequent measurement of the right-of-use asset
- `LeaseLiability` — initial PV + interest accretion + payment schedule
- `LeasePayment` — single periodic payment (fixed + variable + interest split)
- `LeaseModification` — IFRS 16 §44-§46 / ASC 842-10-25-8 modification kinds
- `LeaseClassification` — finance / operating / short_term / low_value
- `DiscountRateBasis` — rate-implicit vs incremental-borrowing
- `RecognitionExemption` — the IFRS 16 §5 short-term + low-value carve-outs

Files:

- `types.ts` — semantic types.
- `validate.ts` — runtime guards (`isLeaseClassification`, `isDiscountRateBasis`).
- `index.ts` — barrel.

## Why a canonical types module

`Leases` collection (added in the ERP-completeness slice) carries a rich field set covering term, payments, discount rate, classification, modifications, and impairment. Before this module, the field set drifted in isolation — no compile-time check that the collection's enums (`finance` / `operating` / `short_term` / `low_value`) match what consumer code expects. Now they all reference the canonical `LeaseClassification` union.

Future consumers (the lease-period-postings collection and a `lease.service.ts` for amortisation arithmetic) will project onto the same types — same pattern as IFRS 15 → PerformanceObligations.

## Out of scope

- The lessor accounting model (IFRS 16 §61-§97 + ASC 842-30) — separate module if/when needed.
- Sale-and-leaseback transactions (IFRS 16 §98-§103) — covered by composing this module with revenue-recognition (IFRS 15 / ASC 606).
- Lease-incentive accounting beyond the initial-measurement deduction (covered here as part of `RouAsset.initialDirectCostsAndIncentives`).

## Used by

- `src/plugins/accounting/collections/Leases.ts` — master record, projects onto `Lease` + `RouAsset` + `LeaseLiability`.
- Future: `lease.service.ts` for the canonical PV / amortisation / interest-accretion math (mirrors `depreciation.service.ts`).
- Future: `lease-period-postings` collection for the period-by-period evidence trail (mirrors `depreciation-schedules`).

## References

- IFRS 16 §22-§35 — Initial measurement of the ROU asset.
- IFRS 16 §26-§28 — Initial measurement of the lease liability (PV of unpaid payments, discounted at the rate implicit in the lease or — when not readily determinable — the lessee's incremental borrowing rate).
- IFRS 16 §29-§31 — Subsequent measurement of the ROU asset (cost model).
- IFRS 16 §36-§38 — Subsequent measurement of the lease liability (amortised cost using the effective interest method).
- IFRS 16 §44-§46 — Modifications and remeasurement.
- IFRS 16 §5-§8 — Recognition exemptions (short-term ≤ 12 months, low-value).
- ASC 842-20-25-2 — Lessee classification of finance vs operating leases.
- ASC 842-20-30 — Initial measurement (lessee).
- ASC 842-20-35 — Subsequent measurement (lessee).

**Law — [[law]]: IFRS 16 / ASC 842 owns the canonical lessee types — every lease, bar the two narrow §5 exemptions (short-term, low-value), puts a right-of-use asset AND a lease liability on the balance sheet — the one shape the Leases collection and future amortisation service project onto, so the classification union cannot drift.**

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-4217:2015 currency-codes`

Composes: [[standards]] · [[leases]].
