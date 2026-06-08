---
name: supto
description: "Use when reasoning about supto — СУПТО (*Софтуер за управление на продажбите в търговски обекти* — sales-management software for commercial outlets), regulated by **Наредба Н-18** and the НАП registry, is — struct"
atomPath: supto
coordinate: supto · 8/crest · eb296802
contentUuid: "9479231c-74d8-5bd3-a877-b839a1c32e9b"
diamondUuid: "322591bb-7855-8162-be29-42f67ec22f89"
uuid: "eb296802-49db-8b1a-9e52-80a0cfbf4961"
horo: 8
bonds:
  in:
    - access
    - accounting
    - bindings
    - corruption
    - devices
    - duality
    - event
    - hooks
    - identity
    - jobs
    - law
    - lineage
    - number
    - receipts
    - reverse
    - standard
    - sti
    - submissions
    - tax
    - uuid
  out:
    - access
    - accounting
    - bindings
    - corruption
    - devices
    - duality
    - event
    - hooks
    - identity
    - jobs
    - law
    - lineage
    - number
    - receipts
    - reverse
    - standard
    - sti
    - submissions
    - tax
    - uuid
typography:
  partition: supto
  bondDegree: 62
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - access
    - accounting
    - bindings
    - devices
    - duality
    - event
    - hooks
    - identity
    - jobs
    - law
    - number
    - reverse
    - standard
    - sti
    - submissions
    - tax
    - uuid
  matrix:
    - access
    - accounting
    - bindings
    - corruption
    - devices
    - duality
    - event
    - hooks
    - identity
    - jobs
    - law
    - lineage
    - number
    - receipts
    - reverse
    - standard
    - sti
    - submissions
    - tax
    - uuid
  backlinks:
    - access
    - accounting
    - bindings
    - corruption
    - devices
    - duality
    - event
    - hooks
    - identity
    - jobs
    - law
    - lineage
    - number
    - receipts
    - reverse
    - standard
    - sti
    - submissions
    - tax
    - uuid
signatures:
  computationUuid: "fbba193b-5edf-8cb8-a4c4-7bb1b51de65c"
  stages:
    - stage: path
      stageUuid: "c1caa05d-8260-8f05-a39c-810de0d29926"
    - stage: trinity
      stageUuid: "da911176-f751-8955-ad5d-89dcc7f43d09"
    - stage: boundary
      stageUuid: "046049ba-c7c5-8698-88c0-1609db8533c8"
    - stage: links
      stageUuid: "93b2df3d-7f3e-8f2e-b0e1-2f044e149272"
    - stage: horo
      stageUuid: "c61dc154-dc88-82ed-ad15-5bb8d5de1132"
    - stage: seal
      stageUuid: "1d31b401-0e7d-8770-9897-811b0244330f"
    - stage: uuid
      stageUuid: "896ec796-6e4e-877e-b9de-36c11dcd3f99"
version: 2
---
# supto — Наредба Н-18 / СУПТО, mapped onto the content-uuid model

СУПТО (*Софтуер за управление на продажбите в търговски обекти* — sales-management software for commercial outlets), regulated by **Наредба Н-18** and the НАП registry, is — structurally — a **government-mandated content-addressed audit system**. It maps onto the erpax [[identity]] framework almost 1:1; the divergences are exactly what [[identity]]'s *"the uuid type is standards-driven"* predicts.

## The regime → the skill it already is
| Н-18 / СУПТО requirement | erpax skill / mechanism | status |
|---|---|---|
| **УНП** — unique sales number `XXXXXXXX-ZZZZ-0000001` (8-digit ФУ id · 4-digit operator · 7-digit per-device sequence, gapless +1, Arabic only, `-` delimited) | [[number]] (human/regulatory handle) per-**ФУ** scope sequence hook; structurally a decodable structured id like the **uuidv8** of [[identity]] (`encodeStructured`: fixed layout, meaning packed in, read by [[reverse|decode]] not lookup) | **gap** — `number` factory exists, the per-device УНП format + sequence hook does not |
| УНП ties order ↔ fiscal receipt ↔ payment (one number across the sale's whole lifecycle) | the **shared coordinate** law: one id everywhere ([[identity]]); the [[event]] `aggregateId` as the cross-document key | mechanism exists |
| **No delete / no modify** of completed sales; **reversal-only (сторно)** preserving the original | [[reverse]] (mirror the entry, preserve source) + [[identity]] seal/immutability (posted/`SEALED` frozen); `generateReversingEntries` | **implemented** — сторно ≡ the reverse skill's law |
| Tamper protection on recorded sales | **content-uuid Law 8**: recompute the content hash → any in-place edit mismatches and is flagged (`tamper-proof-uuid-field`); the `SEALED`/`TAMPER_PROOF` uuidv8 capability flags | **implemented** — content-addressing *is* the tamper-proofing СУПТО demands |
| Tamper-evident, gapless journal | the **Merkle audit chain** — `priorHash`/`chainLeafUuid = sha256(JCS(row) ‖ prior_leaf)` on `audit-events` | **implemented** |
| **Read-only audit profile** for НАП inspection | [[access]] read-only role; the uuid-share `AccessRole` lattice (audit ⊥) | mechanism exists |
| **Standardized audit file** (XML, Приложение 38, monthly by the 15th) | SAF-T export (`saf-t-export.service`) as the universal base; the BG file is a **country profile** over it (jurisdiction cascade, [[identity]]); submit via `submitBgSaft` over НАП mTLS | **gap** — OECD SAF-T base + НАП mTLS exist; the BG Appendix-38 variant does not |
| ФУ (fiscal device) receipt issuance carrying the УНП | a [[hooks]] membrane call to the device (matter side, like `submitBgSaft`/`postBgNapMtls`); the receipt and the sale share the УНП coordinate | **gap** — no ФУ integration |

## Why УНП ≈ uuid (the match, and the divergence)
The УНП and the structured **uuidv8** are the *same idea*: a fixed-layout, **self-describing, lookup-free** identifier — decode the string and you know its origin (УНП → device+operator+sequence; uuidv8 → slot+capabilities+schema+content). Both make the id the coordinate that ties a flow together. The **divergence** is that УНП is **sequential** (regulatory gapless +1), not a content hash — so per [[identity]]'s standards-driven rule, a СУПТО sale's *regulatory* id is the УНП while the *machine* id is the content-uuid (uuidv8 `TAMPER_PROOF`) riding beside it — the row-`id` ↔ content-`uuid` [[duality]]. The [[number]] law states it exactly: *the number is the human/regulatory handle, the content-uuid the machine identity.*

## Built (the matter that realises this skill)
Core entities use generic concatenated data-type names — the Н-18 reference lives in the `naredba-n-18` standard + this skill, never in a slug (`sales`, not `supto-sales`).
- **УНП format** — `src/standards/naredba-n-18/unp.ts` (format/parse/validate/increment; `parseUnp` = the reverse/decode).
- **Per-ФУ sequence hook** — `src/services/sales/unp-sequence.ts` (`assignSaleUnpHook`: gapless max+1, frozen on update). The operator code (УНП segment ZZZZ) is derived from the linked `operators` register on create (`operator-code.ts`), not hand-typed.
- **Fiscalization scope** (`naredba-n-18/scope.ts`, чл. 3 ал. 1) — cash/card/voucher sales are IN scope (must carry a касов бон); bank transfer / direct debit / PSP / **postal money transfer (наложен платеж)** are LAWFULLY OUTSIDE СУПТО (no касов бон — an invoice/document is issued instead). The *legal* way to not use СУПТО is being out of scope, never circumventing it.
- **No СУПТО bypass** (the core invariant) — an *in-scope* sale cannot be *closed* without a fiscal device → УНП (`assignSaleUnpHook` rejects closing a device-less cash/card/voucher sale), and the revenue membrane throws (never silently skips) for an in-regime, in-scope source with no registered ФУ. Exempt sales close without a УНП (out of scope); an unknown/blank payment type defaults to in-scope (no silent bypass by omission). No in-scope paid sale escapes the register unnumbered.
- **Config cascade** (`fiscal-context.ts`) — nothing in the path is a hardcoded constant: `resolveFiscalContext(payload, {tenant})` walks **deployment → country → tenant → device** to resolve (a) regime applicability (`tenant.config.identity.country` → `COUNTRY_SPECIFICS.fiscalDeviceRegime`; BG → Н-18), (b) receipt currency, (c) VAT bands, (d) the active ФУ number. This separates *out of jurisdiction* (no obligation → skip) from *misconfigured* (in-regime, no device → throw). Per-device `currency` + `taxGroups` overrides on `fiscal-devices`.
- **Collections** — `fiscal-devices` (ФУ register) + `sales` (Наредба Н-18 sale register) + `receipts`/`operators`/`terminals`/`audit-submissions`, tenant-scoped, `delete: () => false`, content-uuid + audit-chain wired.
- **Register integrity** — `validate-fiscal-refs.ts` (beforeChange): a sale cannot be issued on a *decommissioned* ФУ or operator (lenient — only present refs are checked).
- **Immutability + сторно** — `sale-immutability.ts` (completed sales frozen; closed→reversed only) + `reverse-sale.ts` (negated mirror, preserves + seals original).
- **Closed event** — `sale-event.ts` emits `sale:closed` keyed by content-uuid ([[event]]).
- **VAT engine** ([[tax]], one calculator) — `fiscal-receipt.ts` routes VAT through the canonical `bg-vat.ts` (`vatBreakdownForItems`/`vatTotalForItems`, round-half-away-from-zero per НАП — correct for сторно too); the receipt + audit file share it (no duplicate math).
- **Receipt issuance** — `fiscal-receipt.ts` builds the касов бон carrying the УНП + per-rate VAT breakdown + a pluggable `FiscalDeviceDriver` membrane. Wired on `sale:closed` via `receipt-subscriber.ts`, which persists the НАП fiscal-QR (device*УНП*date*time*sum) + virtual-POS terminal and writes the bon number back onto the sale.
- **Virtual device (alternative regime)** — `virtual-device.ts`: НАП lets e-shop remote-card sales issue an *electronic* receipt (УНП + fiscal-QR + virtual-POS number, e-mailed) with **no hardware**, reporting via the monthly audit file. A drop-in `FiscalDeviceDriver`. So the receipt path is pure software, not an external blocker.
- **Generic revenue membrane** — `fiscalize-revenue.ts`: ONE projection from any revenue source into a closed `sales` row, owning the cascade + scope + no-bypass + idempotency + сторно. A sale records its origin in a polymorphic `source` group `{type, ref}` (the [[sti]] discriminator) keying idempotency. Source adapters are thin: `order-fiscalization.ts` (ecommerce `order:activated`/`cancelled`/`refunded`) and `subscription-fiscalization.ts` (`subscription:invoiced` — each card-charged period is an in-scope sale → one касов бон per Stripe invoice, net backed out at the resolved standard rate). VAT tax groups (А/Б/В/Г, `naredba-n-18/vat-groups.ts`) stamp each receipt subtotal + the audit file; the дневен отчет (`daily-report.ts`) aggregates per-ФУ daily turnover.
- **Audit file** — `audit-file.ts` builds the Приложение-38 report + XML over the SAF-T base (count + net control sum + net **VAT** control sum, per-sale `<Vat>`); `submit-audit-file.ts` (collect→build→submit, pluggable mTLS submitter) + the `sales-audit-file` monthly [[jobs]] task (`salesAuditFileJob`, prior-month, per-tenant, cron `0 6 5 * *`), persisting each file as an `audit-submissions` evidence row.
- **Audit profile** — no code: a non-admin/accountant tenant user already gets read-only via `scopedAccess` + `roleScopedAccess`.

123 mirror tests green; src tsc 0.

## Remaining (truly external / one coordination primitive)
- **Concurrency-safe per-ФУ counter** — the `max+1` read-modify-write must serialise through the `RATE_LIMITER`/counter Durable Object under load ([[bindings]]); **blocked** by the documented DO-not-exported-from-worker chain-break. Today uniqueness rests on the `unp` `unique` constraint.
- **Physical ФУ driver + mTLS cert config** — optional: a hardware-device `FiscalDeviceDriver` impl and the НАП submission certs are per-deployment (the interfaces + pluggable submitter are built and ready for injection).
- **НАП registry listing + certification** — operational, outside code.

## Standards

This skill holds **two legally DISTINCT regimes** — do not conflate them. Applying the skill (УНП + immutability + the export engine's two profiles) *is* how each standard is implemented. The answer-path principle ([[standard]]): a sale that flows through this skill is compliant by construction; the `@standard` banners must assert the true regime, edition, and schema version below.

| Standard | Version / edition | Current form (one line) |
|---|---|---|
| **Наредба № Н-18 / СУПТО (Приложение 38)** | Наредба № Н-18 от 13.12.2006 г., as amended (latest 2023–2024 DV amendments aligning чл. 118 ЗДДС, removing mandatory use of the НАП СУПТО-list) | Every in-scope sale is fiscally immutable — no delete/modify, **сторно** (reversal-only) preserving the original — carrying a gapless per-ФУ **УНП** (`XXXXXXXX-ZZZZ-0000001`) that ties order ↔ receipt ↔ payment; emits the monthly **Приложение-38** standardized sales-audit XML (historically due by the 15th). |
| **ДОПК SAF-T** | BG NRA national SAF-T, **XSD 1.0.2** (mandatory 2026-04-01 per НАП Order Z-ЦУ-30-359/27.02.2026) | A SEPARATE regime mandated by the ДОПК/TSSPC (DV issue 26 / 27.03.2025) — NOT part of Наредба Н-18; emits the monthly SAF-T file (due by the **14th**, annual fixed-asset data by 30 June) in the current НАП XSD, from the same single source of truth. Phased: large entities from 2026-01-01, medium 2028, all 2030. |

These are **two profiles over one export engine**, not one file: different legal trigger (Наредба Н-18 vs ДОПК), different cadence (15th vs 14th), different schema. The same fiscally-immutable УНП-keyed `sales` row feeds both.

### Version-attribution corrections (must be true in `@standard` banners)
- **SAF-T is not Наредба Н-18.** It is the ДОПК/TSSPC instrument (DV 26 / 27.03.2025) with its own scope, timeline and schema. The canonical standard string is **"BG Наредба Н-18 / СУПТО (Приложение 38) + ДОПК SAF-T"**, modelled as two standards.
- **Bulgaria's SAF-T is the НАП national variant, not generic OECD.** Drop the "OECD SAF-T 2.0" annotation in `src/standards/saf-t` and `src/services/*`; BG SAF-T is **XSD 1.0.2**. (For reference: OECD SAF-T is v2.0; there is **no SAF-T 3.0.2** — the `SAF-T:3.0.2` tags in `src/hooks/*`, `src/services/*`, `src/standards/*` such as `validateAuditComplianceReporting` and `FiscalPeriods` cite a non-existent version and must be corrected to BG **1.0.2**.)
- **Приложение-38 ≠ SAF-T.** Do not equate "the monthly standardized audit (XML, Приложение 38)" with "SAF-T / `submitBgSaft`" — they are different files, cadences and legal triggers.
- **Pin the Naredba edition.** Cite **"Наредба № Н-18/2006, as amended (latest 2023–2024)"**, never the bare title, so a reader knows which amendment level the banners assert.

**Law — [[law]]: a СУПТО sale carries a gapless per-ФУ УНП ([[number]], the regulatory handle) beside its content-[[uuid]] ([[identity]], the machine id) — no in-scope paid sale closes without a fiscal device → УНП (no silent bypass), completed sales are immutable (no delete/modify, [[reverse|сторно]]-only preserving the original), and content-addressing IS the tamper-proofing Наредба Н-18 demands.**

Composes: [[identity]] (content-uuid + standards-driven id type + uuidv8/decode) · [[number]] (УНП sequence) · [[reverse]] (сторно) · [[standard]] (Н-18 + ДОПК SAF-T are real `@standard`s, not decoration) · [[accounting]] (the sale → GL) · [[event]] (УНП-keyed lifecycle) · [[access]] (audit profile) · [[tax]] (VAT groups А/Б/В/Г + breakdown) · [[audit/submissions]] · [[fiscal/devices]].
