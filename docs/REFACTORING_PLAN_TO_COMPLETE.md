# ERPax — Plan to Complete the ERP CMS at All Scales

> Strict-standards, DRY-clean, no-entropy refactoring plan.
>
> **Scope:** every scale of the system from per-field schema gaps up to multi-tenant deployment topology.
> **Constraints:** every change must (a) cite a standard from `docs/STANDARDS.md` §4, (b) extend a canonical helper rather than create new entropy, (c) leave the standards-citation gates green.
> **Inputs feeding this plan:** `docs/FIELD_STANDARDS_AUDIT.md` (per-field standard classification), `docs/FIELD_ADD_REMOVE_AUDIT.md` (per-standard gaps), `docs/STANDARDS_AUDIT.md` §9 slice ledger (slices A → MMM, all complete), Slice LLL gap matrix (event bridges).
>
> **Status snapshot (2026-05-10):** 0 dead handlers, 0 missing handlers, 0 redundant handlers, 0 unjustified fields, 0 default-column drift, 19/20 GL handlers wired. **9 mandatory + 54 strongly-recommended fields** still missing per the standards (atomic gap). The plan below sequences the remaining work.

---

## L0 — Atomic (per-field gaps)

Source of truth: `docs/FIELD_ADD_REMOVE_AUDIT.md`. **9 mandatory, 54 recommended.** Every addition lands as a single field declaration with a `@standard` / `@compliance` / `@accounting` JSDoc citation in the field's `admin.description`.

| # | Collection | Field | Standard | Justification |
|---|---|---|---|---|
| 1 | `audit-events` | `eventId: text, unique, required` | SOX §404 + ISO 27002 §5.4 | Event traceability — already used by every emission code path; missing on the storage row |
| 2 | `evidence-attestations` | `signatureValue: textarea` | eIDAS + ETSI EN 319 142 PAdES | The actual CMS SignedData blob (today only the wrapper is stored) |
| 3 | `evidence-attestations` | `signedAt: date` | eIDAS Art.3 §35 | ISO 8601 signature creation time (separate from `capturedAt` and `approvedAt`) |
| 4 | `evidence-attestations` | `signingCertificate: textarea` | eIDAS Art.28 | Qualified-seal cert chain (PEM) |
| 5 | `evidence-attestations` | `signatureDigest: text` | NIST FIPS-180-4 | SHA-256 of the signed bytes |
| 6 | `inventory-movements` | `valuationMethod: select {fifo \| weighted_average \| specific_identification}` | IFRS IAS-2 §25 | Cost formula election (the GL handler currently assumes WAC implicitly) |
| 7 | `invoice-lines` | `taxation.vatCategoryCode → required` | EN-16931 BT-151 | Already exists; promote to required to satisfy the EN |
| 8 | `leases` | `discountRatePercent → required` | IFRS-16 §26 | Already exists; promote to required (today optional) |
| 9 | `leases` | `fixedPayment → required` | IFRS-16 §27 | Already exists as optional; promote to required |

**Gating rule for new fields:** every leaf field MUST appear in `docs/FIELD_STANDARDS_AUDIT.md` with a non-`needs justification` classification (regen the doc as part of the change). The 54 recommended additions are queued in `docs/FIELD_ADD_REMOVE_AUDIT.md` and shipped opportunistically when a touching code path lands.

---

## L1 — Per-collection (schema completeness)

For each of the 41 audited collections, achieve "100% standards-cited fields with 0 mandatory gaps." Drive via these standing rules:

1. Every new field MUST cite the governing standard via `admin.description` referencing `docs/STANDARDS.md` §4 + the concrete `BT-…` / `§…` / `Art.…` clause.
2. Every collection MUST use the canonical access bundle (`accountingCollectionAccess` / `tenantMasterDataAccess` / `tenantAdminWriteAccess` / `superAdminOnlyAccess`) — no inline `({ req }) => …` predicates.
3. Every collection MUST go through `multiTenancyField()` for the `tenant` scope and `currencyField()` / `auditFields()` for currency + audit columns. No re-implementing the factory output inline.
4. Every collection that participates in GL posting MUST have a hook that emits the typed domain event via `emitDomainEvent(req, event, subject)` — no fresh `try/catch + logger` boilerplate.
5. `defaultColumns` use dotted refs (`'identity.code'`) per Slice III — never bare-leaf names that hit a nested field.

The L0 atomic adds + the existing slice-ledger work close 100% of L1 once the 9 mandatory fields ship.

---

## L2 — Per-domain (process flows)

Each domain owns its end-to-end flow — sequenced so an external auditor can walk a control objective from event to GL line to financial statement.

### 2.1 Accounting (close-the-books)

| Process | Trigger | Hook | GL impact | Standard |
|---|---|---|---|---|
| Invoice → AR + Revenue | `invoices.afterChange` (status → active) | `invoiceAccountingHook` (existing) | Dr AR / Cr Revenue (+ Dr COGS / Cr Inventory per line, + Dr AR / Cr Sales Tax) | IFRS-15 §31 + IAS-2 §28 |
| Bill → AP + Expense | `invoices.afterChange` (status → active, type=bill) | `billAccountingHook` (existing) | Dr Expense/Inventory / Cr AP (+ Dr Input Tax) | IAS-37 §14 + ASC-405 |
| Payment → Cash | `payments.afterChange` (create) | `paymentAccountingHook` (Slice LLL) | Dr Cash / Cr AR (or Dr AP / Cr Cash) + cascade `invoice:completed` / `bill:paid` | IAS-7 §6 |
| Bank statement → Cash recon | `bank-statements.afterChange` (create) | `bankStatementImportedHook` (Slice LLL) | Dr/Cr Cash per booking entry | ISO 20022 camt.053 + IAS-7 |
| Inventory receipt | `bill.activated` per cost-bearing line | `billAccountingHook` per-line (Slice LLL) | Dr Inventory / Cr AP | IAS-2 §10 |
| Inventory issue (sale) | `invoice.activated` per cost-bearing line | `invoiceAccountingHook` per-line (Slice LLL) | Dr COGS / Cr Inventory | IAS-2 §28 |
| Period-end depreciation | `depreciation-schedules.afterChange` (status → posted) | `depreciation.hook.ts` (existing) | Dr Depr Expense / Cr Accum Depr | IAS-16 §62 + ASC-360 |
| Period-end accruals | `period-end-adjustments.afterChange` (status → posted) | `period-end-adjustment.hook.ts` (existing) | Dr/Cr per accrual type | IAS-1 §27 + SOX §404 |
| Lease IFRS-16 posting | `lease-period-postings.afterChange` (status → posted) | `lease-period-posting.hook.ts` (existing) | Dr Interest Expense + Dr ROU Amortisation / Cr Lease Liability + Cr ROU Asset | IFRS-16 §38 + ASC-842 |
| Period close | future job — `bg-fiscal-period-close` | `period-close.job.ts` (TBA — closes Slice LLL `period:closing` gap) | Locks period; emits closing JE; freezes balances | IAS-1 §10(b) + SOX §404 |

**Gap remaining (1 of 20 GL handlers):** `subscription:refunded` — wire from `stripeWebhookHandlers.ts` via a new `handleChargeRefunded` symmetric to the existing `handleInvoicePaid` → `subscription:invoiced` path. Per "no entropy" — extend the existing handler file, don't create new ones.

### 2.2 ERP — Procure-to-Pay (P2P)

| Step | Collection | Standard |
|---|---|---|
| Vendor onboarding + KYC/UBO | `vendors`, `kyc-checks`, `beneficial-owners` | FATF R.10 + R.24 + EU AMLD5 |
| RFQ → PO | `quotes` → `purchase-orders` | UN/CEFACT |
| Goods receipt | `goods-receipts` | EN-16931 + ISO 20022 |
| Bill match (3-way: PO + GRN + invoice) | `invoices` (type=bill) | SOX §404 control TOM-AP-01 |
| Payment run | `payment-runs` → emits `pain.001` | ISO 20022 pain.001 |
| Vendor disbursement | `payments` (direction=sent) | IAS-7 §6 |

**To wire:** the 3-way match validator (currently absent) — add `validateBillMatchesPo` to `bill.hook.ts` `beforeChange` so a posted bill MUST reference an active PO + GRN with quantities reconciled within tolerance. Cite `SOX §404 control TOM-AP-01`.

### 2.3 ERP — Order-to-Cash (O2C)

| Step | Collection | Standard |
|---|---|---|
| Lead → Quote | `quotes` | (no specific ISO; CRM domain) |
| Quote → Order | ecommerce-plugin `orders` (Slice ZZ-3 wired) | IFRS-15 §9 |
| Pick + Pack + Ship | `shipments` | INCOTERMS 2020 |
| Invoice generation | `invoices` (type=invoice) | EN-16931 |
| Payment receipt | `payments` (direction=received) | ISO 20022 pain.001 / camt.053 |
| Dunning + collections | `dunning-cycles` | IFRS-9 §5.5 ECL staging |
| Refunds + credit memos | `refunds`, `credit-memos` | IFRS-15 §B47 |

**To wire:** `shipment.activated` → emit `inventory:adjusted` (movementKind = `consumption`) + auto-trigger `invoice.activated` for the matching customer order line. Currently the order GL flow assumes shipment ≡ invoice; once `shipments` is properly an entity in the loop, the GL handler should book inventory consumption at ship-time per IAS-2 §28, and revenue at invoice-time per IFRS-15 §31.

### 2.4 ERP — Hire-to-Retire (H2R)

| Step | Collection | Standard |
|---|---|---|
| Onboarding + employment contract | `employees` | national labour code |
| Time tracking | `time-entries` | ILO C-1 |
| Payroll run (gross-to-net) | `payroll-runs` (existing — Slice ZZZ) | per-country social security |
| Employee disbursement | `payment-runs` (pain.001) → `payments` (direction=sent) | ISO 20022 pain.001 |
| Period-end accruals (vacation, social) | `period-end-adjustments` | IAS-19 employee benefits |
| Termination + final payslip | `payroll-runs` (final flag) + `payments` | national labour code |

**To wire:** `payroll-disbursement.hook.ts` already exists; verify it emits `payment:sent` for each disbursement line. Currently does emit; confirm no double-posting against bills.

### 2.5 E-commerce

Already wired in Slice ZZ-3 (orders) + Slice ZZ-2 (subscriptions) + Slice LLL extensions. Remaining gap is `subscription:refunded` (covered above in §2.1).

### 2.6 Marketing (CMS layer)

| Step | Collection | Standard |
|---|---|---|
| Page authoring | `pages` (with hero + content blocks) | WCAG 2.1 AA + RFC 3986 slug |
| Blog | `posts`, `categories` | RFC 3986 |
| Lead capture (forms) | `forms` (Payload form-builder plugin) | GDPR Art.7 (consent on submit) |
| Email | Resend integration | RFC 5321 / 5322 |
| SEO | `meta` group on Pages/Posts | schema.org Article + Open Graph |

**To wire:** every form submission with PII → record a `consent-records` row inline (Slice NNN added the missing `consentEvidence` recommended field; the form-submit handler should populate it with the page snapshot + IP/UA per GDPR Art.7(1)).

---

## L3 — Cross-domain bridges

Already audited in Slice LLL. The event taxonomy in `src/types/events.ts` is the contract; emit-paths and subscribe-paths must stay symmetric.

**Standing rules:**
1. Every domain event has exactly ONE producer hook (per Slice LLL DRY) and at most ONE GL-posting handler — no fan-out emit chains.
2. New events MUST be declared in `src/types/events.ts` with an `@accounting` / `@audit` / `@compliance` JSDoc citation.
3. Every event payload MUST carry: `eventId` (RFC 9562 UUID), `tenantId`, `userId`, `timestamp` (ISO 8601), `aggregateType`, `aggregateId` — already enforced by the `DomainEvent` base type.

**One open consumer gap (per Slice LLL §"Emitted but no GL handler"):**
- `bank:transaction:matched` — fires from `bank-reconciliation.service.ts` line 332 but no GL handler clears the reconciliation provisional entry. Add `glPostingService.subscribe('bank:transaction:matched', ...)` that books the matched JE finalisation.

---

## L4 — Per-country compliance

Per memory: BG is the worked example; EU template established; RoW pending.

**Pattern (Slice YY–FFF):** every country gets a single bundle file at `src/standards/iso-3166-1/countries/<cc>.ts` that merges `profile + specifics + apis + bank apis`. The `country-context.ts` service is the only consumer.

| Country | Status | Next step |
|---|---|---|
| BG | complete (Slices YY–FFF) | maintain — add НАП e-invoicing route when published |
| DE | profile + ECB fallback | add `de.ts` bundle: ELSTER tax-API + 8 SCHUFA-rated ASPSPs (Berlin Group reuses existing client) |
| AT, NL, BE, LU, FR, ES, IT, PT, IE | profile + ECB/VIES fallback | per-country `xx.ts` bundle: national tax-API + national ASPSP list |
| GB | profile + Open Banking | `gb.ts` bundle: HMRC MTD VAT API + UK Open Banking (NOT Berlin Group — separate) + GBP rates |
| US | profile only | `us.ts` bundle: state-by-state sales-tax (Avalara/TaxJar adapter) + ACH/Fedwire (NOT ISO 20022 directly) |

**Standing rule for new country:** the bundle file is the ONLY entry point. `country-context.ts` MUST be the resolver — no direct imports of `<cc>.ts` from anywhere else. This is enforced by maintainer convention (Slice HHH memory note).

---

## L5 — System-level

### 5.1 Multi-tenant isolation

**Already strict (Slice HHH + Slice KKK):**
- Every collection write goes through `multiTenancyField()` factory.
- Every access predicate uses `accountingCollectionAccess()` / `tenantMasterDataAccess()` / `tenantAdminWriteAccess()` / `superAdminOnlyAccess()` bundles.
- Every hook reads tenant via `req.user.tenants[0]?.tenant` (canonical multi-tenant plugin shape) — no `req.user.host` legacy.

**Standing rule:** any collection that writes to D1 without going through `multiTenancyField` is a tenant-isolation violation. Future-proof by extending the per-collection JSDoc lint to detect this.

### 5.2 Observability

**To wire:**
- Every emit-path → trace span in OTel (when introduced)
- Every standards gate → CI green-or-red signal in PR checks (already wired: `standards:check`, `standards:required`, `standards:verify-index` in `.husky/pre-push`)
- Every job run → row in `jobs` table with start/end/status/error (Payload built-in)

### 5.3 Performance

**Standing rules (already enforced by file structure):**
- D1 queries are indexed via Payload-collection `index: true` on filter fields (`tenant`, `slug`, `status`).
- Hot-path reads use `req.payload.find({ depth: 0 })` to avoid relationship hydration.
- Caching of GET routes uses `unstable_cache` per `rfc-9110/cache.ts` (test-bypass already wired).

### 5.4 Deployment

**Cloudflare Workers + D1 + R2 + OpenNext:** unchanged.
**Standards-citation gates in CI:** `.github/workflows/ci.yml` `standards` job blocks `build` (Slice CC).
**Migration discipline:** every schema change → `pnpm payload migrate:create` → review the SQL → land in same PR as the field add. Local-only step (sandbox can't run `payload`).

---

## Sequencing — the one-week plan

The order respects: standards-mandatory before recommended, real bugs before cosmetic, infra-touching before per-domain.

| Day | Slice | Deliverable | Risk |
|---|---|---|---|
| 1 | OOO | Add 5 eIDAS/PAdES fields to `evidence-attestations` (signatureValue, signedAt, signingCertificate, signatureDigest) + wire `signBgPadesPdf` to populate them on save | low |
| 1 | PPP | Add `eventId` to `audit-events` (set by every emitter via the existing `eventId` already on every DomainEvent payload — just persist it) | trivial |
| 2 | QQQ | Add `valuationMethod` to `inventory-movements` + thread the choice through `glPostingService.postInventoryAdjusted` so FIFO/WAC/SI all post correctly per IAS-2 §25 | medium (touches GL math) |
| 2 | RRR | Promote `invoice-lines.taxation.vatCategoryCode`, `leases.discountRatePercent`, `leases.fixedPayment` from optional → required + write the migration | low |
| 3 | SSS | Wire `bank:transaction:matched` GL handler (reconciliation finalisation JE) + `subscription:refunded` Stripe webhook handler — closes both remaining LLL gaps | medium |
| 3 | TTT | 3-way bill-match validator on `bill.hook.ts` `beforeChange` (PO + GRN + invoice quantities reconcile within tolerance) | medium (touches AP control) |
| 4 | UUU | Shipment → IAS-2 inventory-consumption posting at ship-time; revenue at invoice-time (correct decoupling) | high (re-orders the GL flow) |
| 4 | VVV | Form-submit → consent-records writer with `consentEvidence` populated (page snapshot + IP/UA) | low |
| 5 | WWW | DE / AT / NL country bundles — replicate the BG pattern. Each is one file + one `country-context` registry entry | low (mechanical) |
| 5 | XXX | Period-close job — `bg-fiscal-period-close.ts` registered in `payload.config.ts` `jobs.tasks` — emits `period:closing`, locks the period via `validateNotLocked`, books closing JE | medium |

Every slice ends with: `pnpm standards:check && pnpm standards:required && pnpm standards:verify-index` green + 1-line slice-ledger entry in `docs/STANDARDS_AUDIT.md` §9.

---

## Anti-entropy guard rails

These are the maintainer "no entropy" rules that constrain every refactor:

1. **No new audit scripts.** The canonical helpers ARE the gate. If a new property needs enforcement, lift it INTO the helper that owns the property — don't write a watchdog.
2. **No new `*.bk.ts` / `*.legacy.ts` files.** Renames use `git mv` + content rewrite; old name is deleted, never aliased.
3. **No `@deprecated` re-export shims for more than one slice.** Slice F dead-stub deletion script must run before the next slice opens.
4. **No new helper file when an existing helper can take an additional option.** Extend `accountingCollectionAccess({ writeRoles })` rather than create `accountingCollectionAccess` + `accountingCollectionAccessWithCustomRoles` + `accountingCollectionAccessForAuditors`.
5. **No new event when an existing one can carry the payload.** The 26 declared events in `src/types/events.ts` are the contract — propose additions only when an existing one is genuinely insufficient.

---

## How "complete" is measured

| Gate | Today | Target |
|---|---|---|
| `standards:check` | green | green |
| `standards:required` | green | green |
| `standards:verify-index` | green | green |
| `audit-default-columns.sh` | 0 findings | 0 findings |
| `seed-test-coverage.mjs` redundancy | 0 duplicates | 0 duplicates |
| `seed-test-coverage.mjs` collection coverage | 23/43 with seeds | ≥ 35/43 with seeds |
| `FIELD_STANDARDS_AUDIT.md` "needs justification" | 0 | 0 (maintain) |
| `FIELD_ADD_REMOVE_AUDIT.md` 🔴 mandatory | 9 | 0 |
| `FIELD_ADD_REMOVE_AUDIT.md` 🟡 recommended | 54 | ≤ 20 (informational) |
| GL-handler dead subscriptions | 1 (`subscription:refunded`) | 0 |
| Local-only run: `pnpm tsc --noEmit` | unverified | exit 0 |
| Local-only run: `pnpm vitest run` | unverified | exit 0 |
| Local-only run: `pnpm payload migrate:create` | unverified | exit 0 |

---

@audit ISO-19011:2018 audit-evidence
@quality ISO-25010:2023 quality-model maintainability
@compliance SOX §404 internal-controls
@see docs/STANDARDS.md §1 §3 §4
@see docs/STANDARDS_AUDIT.md §9
@see docs/FIELD_STANDARDS_AUDIT.md
@see docs/FIELD_ADD_REMOVE_AUDIT.md
@see docs/MIGRATION_WORKLIST.md
