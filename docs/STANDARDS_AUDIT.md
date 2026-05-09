# Standards Audit — File-to-Standard Map

> Companion to `docs/STANDARDS.md`. Maps every src/ and tests/ area to its
> governing standards, target path under `src/standards/<id>/`, and the
> migration risk class. **Refreshed 2026-05-09** after Slices K–S — the
> mechanical relocation of standards primitives is complete; what remains
> is purely incremental annotation as new standards-bearing code lands.

## Risk classes

| Class                    | Meaning                                                                            |
|--------------------------|------------------------------------------------------------------------------------|
| **mechanical**           | Move + rewrite imports + barrel updates. Build-green when re-typed.                |
| **needs-import-update**  | Move triggers updates in N other files; needs careful import sweep.                |
| **structural**           | Touches Payload collection slugs, DB tables, or generated `payload-types.ts`.      |
| **annotation-only**      | Stays where it is. Adds JSDoc banner only.                                         |
| **dead-stub**            | File is a deprecated stub; `git rm` candidate before reorganization.               |
| **complete**             | Slice has shipped; row preserved for traceability.                                 |

## 0. Final-state snapshot — `src/standards/` taxonomy

After Slices K, O, P (relocations), and L (caller migration), the
authoritative implementations of standards primitives live under
`src/standards/<id>/`. Each folder owns a per-folder `README.md` declaring
publisher, edition, scope, and out-of-scope adjacencies.

| Folder                                    | Implements                                                                 | Edition cited                |
|-------------------------------------------|----------------------------------------------------------------------------|------------------------------|
| `src/standards/iso-4217/`                 | currency-code validator + alpha-3 set                                      | ISO 4217:2015                |
| `src/standards/iso-3166-1/`               | country alpha-2 / alpha-3 / numeric-3                                      | ISO 3166-1:2020              |
| `src/standards/iso-3166-2/`               | subdivision codes (regex-validated)                                        | ISO 3166-2:2020              |
| `src/standards/iso-8601/`                 | date-time format validator                                                 | ISO 8601:2019                |
| `src/standards/iso-13616/`                | IBAN structure + mod-97 checksum                                           | ISO 13616-1:2020             |
| `src/standards/iso-9362/`                 | BIC/SWIFT 8/11-char validator                                              | ISO 9362:2022                |
| `src/standards/bcp-47/`                   | language-tag validator                                                     | BCP 47 / RFC 5646            |
| `src/standards/_money/`                   | composite — `Money { amountCents:int; currency:ISO-4217 }` DTO + guard     | ISO 4217 + IEEE-754 avoid    |
| `src/standards/nist-incits-359/`          | RBAC scope/binding registry, role assertions                               | NIST INCITS-359-2012         |
| `src/standards/nist-sp-800-38/`           | AES-GCM (encryption.ts, deriveDataKey.ts)                                  | NIST SP 800-38D + RFC 5116   |
| `src/standards/nist-sp-800-108/`          | HKDF (deriveSecret.ts) + tenantRemoteSecrets bridge                        | NIST SP 800-108 + RFC 5869   |
| `src/standards/rfc-3986/`                 | URI parsing, base-URL resolution, get-url, generate-preview-path           | RFC 3986                     |
| `src/standards/rfc-6585/`                 | rate-limit (429 retry-after) primitives                                    | RFC 6585 §4 + RFC 9110       |
| `src/standards/rfc-9110/`                 | get-document, get-globals, get-redirects (HTTP-cache adapters)             | RFC 9110 + RFC 9111          |
| `src/standards/_security-headers/`        | composite — CSP, HSTS, Permissions-Policy, X-* defenders                   | RFC 9110 + W3C CSP-3 + OWASP |

## 0.1. Reserved future builders

Empty placeholders in the taxonomy (no implementation yet, but folder reserved
to avoid future churn): `src/standards/saf-t/`, `peppol-bis-3/`, `iso-20022/`,
`un-edifact/`. Add a `README.md` and implementation file when the relevant
exporter or importer ships.

## 1. Existing standards-bearing utilities — relocation outcome

| Original path                              | Outcome                                                          | Final location                                       | Status      |
|--------------------------------------------|------------------------------------------------------------------|------------------------------------------------------|-------------|
| `src/utilities/iso/index.ts`               | split per-ISO + Money composite                                  | `src/standards/iso-*/` + `src/standards/_money/`     | complete    |
| `tests/int/utilities/iso.int.spec.ts`      | split + moved                                                    | `tests/standards/iso-*/` + `tests/standards/_money/` | complete    |
| `src/utilities/encryption/index.ts`        | relocated                                                        | `src/standards/nist-sp-800-38/encryption.ts`         | complete    |
| `src/utilities/deriveSecret.ts`            | relocated                                                        | `src/standards/nist-sp-800-108/derive-secret.ts`     | complete    |
| `src/utilities/securityHeaders.ts`         | relocated to composite                                           | `src/standards/_security-headers/headers.ts`         | complete    |
| `src/utilities/rateLimit.ts`               | relocated                                                        | `src/standards/rfc-6585/rate-limit.ts`               | complete    |
| `src/utilities/getURL.ts`, `urlUtils.ts`   | relocated                                                        | `src/standards/rfc-3986/{get-url,url-utils}.ts`      | complete    |
| `src/utilities/generatePreviewPath.ts`     | relocated                                                        | `src/standards/rfc-3986/generate-preview-path.ts`    | complete    |
| `src/utilities/getDocument.ts`             | relocated                                                        | `src/standards/rfc-9110/get-document.ts`             | complete    |
| `src/utilities/getGlobals.ts`              | relocated                                                        | `src/standards/rfc-9110/get-globals.ts`              | complete    |
| `src/utilities/getRedirects.ts`            | relocated                                                        | `src/standards/rfc-9110/get-redirects.ts`            | complete    |
| `src/utilities/formatDateTime.ts`          | annotated, stayed (UI utility)                                   | `src/utilities/formatDateTime.ts`                    | complete    |
| `src/utilities/localeUtils.ts`             | annotated, stayed (BCP-47 helper)                                | `src/utilities/localeUtils.ts`                       | complete    |
| `src/utilities/permissions/*`              | annotated, stayed (NIST INCITS-359 consumer)                     | `src/utilities/permissions/*`                        | complete    |

## 1.1. Surviving `src/utilities/` (post-pruning, 24 top-level files)

Per `src/utilities/README.md`, this directory holds **consumers** of standards,
not implementations. After Slices Q–S, 14 of the 24 top-level files carry
`@standard` / `@rfc` / `@security` banners and 10 are deliberately untagged
pure utilities:

| Tagged (cite at least one standard)              | Untagged (deliberately pure)         |
|--------------------------------------------------|---------------------------------------|
| `errors/{codedError,registry,errorCodes,httpApiError}.ts` (RFC 7807) | `canUseDOM.ts` |
| `scopes/{collectionScopes,constants,filters,types}.ts` (ISO-27001 A.5.23) | `deepMerge.ts` |
| `tenantRemoteSecrets.ts` (NIST SP 800-108)       | `extractID.ts`                        |
| `getEnabledLocalesForTenant.ts` (BCP 47 / EU 1958/1) | `formatAuthors.ts`               |
| `getMeUser.ts` (RFC 6265/7519/5322)              | `getCollectionIDType.ts`             |
| `remoteMediaImport.ts` (RFC 3986/6838/9110)      | `tenantLabelForDuplicateAudit.ts`    |
| `billing/stripeWebhookHandlers.ts` (PCI-DSS, RFC 2104) | `toKebabCase.ts`                |
| `seeding/seedSubscriptionPlans.ts` (IFRS-15, ISO 4217) | `ui.ts`                          |
| `fetchRemoteFile.ts` (RFC 9110 §15.4 / RFC 6838) | `useClickableCard.ts`                |
| `payloadSdk.ts` (RFC 3986/9110/6265)             | `useDebounce.ts`                     |
| `erpaxApiSurface.ts` (RFC 3986 §3.3, RFC 3339)   |                                       |
| `generateMeta.ts` (W3C-HTML5, OGP 1.0)           |                                       |
| `mergeOpenGraph.ts` (OGP 1.0, W3C-HTML5)         |                                       |
| `getMediaUrl.ts` (RFC 3986 §2.1 / §3.4)          |                                       |
| `getTenantFromRequest.ts` (RFC 6265, NIST INCITS-359) |                                  |
| `getUserTenantIDs.ts` (NIST INCITS-359, SOX §404) |                                      |
| `siteTenantWhere.ts` (NIST INCITS-359, ISO-27001 A.5.23) |                                |

Three retired seeders carry `@deprecated` banners pending plugin-shaped
rewrites: `seeding/{seedCurrent,seedComprehensive,setupNewTenant}.ts`.

## 2. Accounting plugin collections (canonical)

`src/plugins/accounting/collections/` — annotation-only; the file-naming
stays domain-driven (Payload convention), and the governing standards are
declared via JSDoc banners.

| Collection file                | Per-file `@standard` / `@accounting` / `@compliance` banner cites                                                |
|--------------------------------|------------------------------------------------------------------------------------------------------------------|
| `TaxJurisdictions.ts`          | ISO 3166-1, ISO 3166-2, ISO 4217, EN 16931 §BG-23, OECD SAF-T (jurisdiction codes)                               |
| `TaxCodes.ts`                  | EN 16931 §BG-23 / §BT-118, OECD SAF-T (tax tables), ISO 4217                                                     |
| `CurrencyRates.ts`             | ISO 4217, IFRS IAS 21 (foreign-currency translation)                                                             |
| `FiscalPeriods.ts`             | ISO 8601 (date), IFRS IAS 1, US-GAAP ASC 210, SOX §404 (period locking)                                          |
| `JournalEntries.ts`            | IFRS IAS 1, US-GAAP ASC 105, SAF-T `<JournalEntries>`, double-entry                                              |
| `GLAccounts.ts`                | IFRS IAS 1, US-GAAP ASC 210, SAF-T `<GeneralLedgerAccounts>`, ISO 4217 (account currency)                         |
| `GLPostings.ts`                | IFRS IAS 1, SAF-T `<Transaction>`, double-entry, audit trail (ISO 19011)                                         |
| `BankStatements.ts`            | ISO 20022 camt.053, ISO 13616 IBAN, ISO 9362 BIC, ISO 4217                                                       |
| `FinancialStatements.ts`       | IFRS IAS 1, US-GAAP ASC 205, ISO 4217                                                                            |
| `PeriodEndAdjustments.ts`      | IFRS IAS 1, IAS 8, US-GAAP ASC 250, SOX §404                                                                     |
| `TaxCalculations.ts`           | EN 16931 §BG-23, OECD SAF-T (tax tables), ISO 3166-1                                                             |
| `FixedAssets.ts`               | IFRS IAS 16, US-GAAP ASC 360, ISO 4217                                                                           |
| `BudgetPlanning.ts`            | IFRS IAS 1, US-GAAP ASC 270, ISO 4217                                                                            |
| `Customers.ts`                 | ISO 17442 LEI, ISO 3166-1, ISO 13616, GDPR Art. 6(1)(b) lawful basis                                             |
| `Vendors.ts`                   | ISO 17442 LEI, ISO 3166-1, ISO 13616, GDPR Art. 6(1)(b)                                                          |

## 3. Core collections

`src/collections/` — annotation-only.

| File                                | Banner cites                                                            |
|-------------------------------------|-------------------------------------------------------------------------|
| `Tenants/index.ts`                  | ISO 17442 LEI, ISO 3166-1, ISO 4217, GDPR (controller)                  |
| `Users/index.ts`                    | RFC 5322 (email), ISO/IEC 27001 A.5.16, GDPR Art. 32 (security of processing) |
| `Roles/index.ts`, `UserRoles/index.ts` | NIST INCITS 359 RBAC, ISO/IEC 27002 §5.15                              |
| `Pages/index.ts`, `Posts/index.ts`  | RFC 3986 (slug → URL), schema.org (SEO), ECMA-402 (i18n)                |
| `Media/index.ts`                    | RFC 6838 (MIME), ISO/IEC 23008 (image), GDPR (no-PII-in-filenames)      |
| `Categories/index.ts`               | schema.org Taxonomy                                                     |
| `Invoices/index.ts`, `InvoiceLines/index.ts` | EN 16931, Peppol BIS Billing 3.0, UN/EDIFACT INVOIC, ISO 4217      |
| `PaymentMethods/index.ts`           | PCI-DSS v4.0 (tokenized), ISO 13616 (IBAN where stored)                 |
| `Payments/index.ts`                 | ISO 20022 pain.001 / pacs.008, ISO 4217                                 |
| `SubscriptionPlans/index.ts`, `Subscriptions/index.ts` | IFRS 15 / ASC 606 (revenue recognition)                  |
| `Items/index.ts`                    | UN/CEFACT UNSPSC (where used), ISO 4217                                 |
| `Products/index.ts`                 | schema.org Product, GS1 GTIN (where used)                               |

## 4. Services

`src/services/` — annotation-only.

| File                                  | Banner cites                                                                |
|---------------------------------------|-----------------------------------------------------------------------------|
| `gl-account.service.ts`               | IFRS IAS 1, SAF-T `<GeneralLedgerAccounts>`                                 |
| `journal-entry.service.ts`            | double-entry, IFRS IAS 1, SAF-T `<JournalEntries>`, ISO 19011 audit trail   |
| `gl-posting.service.ts`               | double-entry, balanced-debit-credit invariant                               |
| `bank-reconciliation.service.ts`      | ISO 20022 camt.053, ISO 13616, ISO 9362                                     |
| `bank-statement-import.service.ts`    | ISO 20022 camt.053, MT940 (legacy)                                          |
| `period-end-adjustment.service.ts`    | IFRS IAS 8, ASC 250, SOX §404                                               |
| `multi-currency.service.ts`           | ISO 4217, IFRS IAS 21                                                       |
| `financial-reporting.service.ts`      | IFRS IAS 1, ASC 205, ISO 4217                                               |
| `tax-automation.service.ts`           | EN 16931, OECD SAF-T, ISO 3166-1, ISO 3166-2                                |
| `host.service.ts`                     | multi-tenant boundary; ISO/IEC 27001 A.5.23                                 |
| `event-emitter.service.ts`            | observability — SOC 2 CC7.2 (system monitoring)                             |

## 5. Plugins

| Plugin path                           | Standards                                                                   |
|---------------------------------------|-----------------------------------------------------------------------------|
| `src/plugins/auth/*`                  | OAuth 2.1 (RFC 9700), JWT (RFC 7519), ISO/IEC 27002 §5.16/5.17/5.18         |
| `src/plugins/export/*`                | OECD SAF-T 2.0, EN 16931, ISO 32000 (PDF), ISO/IEC 26300 (ODF), Peppol      |
| `src/plugins/receivables/*`           | IFRS 9 (impairment), ASC 326, EN 16931                                      |
| `src/plugins/payables/*`              | EN 16931, Peppol BIS 3.0, UN/EDIFACT                                        |
| `src/plugins/parties/*`               | ISO 17442 LEI, ISO 3166-1, ISO 13616, GDPR                                  |
| `src/plugins/accounting/*`            | (see §2)                                                                     |

## 6. Email, i18n, locales

| File / area                            | Standards                                                                  |
|----------------------------------------|----------------------------------------------------------------------------|
| `src/email/*`                          | RFC 5321, RFC 5322, RFC 6532 (i18n addresses), RFC 6376 (DKIM via Resend)  |
| `src/i18n/*`                           | BCP 47, ECMA-402, Unicode CLDR                                             |
| `src/i18n/messages/*.json`             | RFC 8259 JSON, BCP 47 in keys                                              |

## 7. Tests

`tests/standards/<id>/` mirrors `src/standards/<id>/`. After Slice M, the
following 10 folders exist under `tests/standards/`: `iso-4217`, `iso-3166-1`,
`iso-3166-2`, `iso-8601`, `iso-13616`, `iso-9362`, `bcp-47`, `_money`,
`nist-incits-359`, `nist-sp-800-38`. The vitest glob in `vitest.config.mts`
includes both `tests/int/**/*.int.spec.ts` and `tests/standards/**/*.int.spec.ts`.

| Existing test                                   | Outcome                                                  | Status      |
|-------------------------------------------------|----------------------------------------------------------|-------------|
| `tests/int/utilities/iso.int.spec.ts`           | split per-ISO into `tests/standards/iso-*/`              | complete    |
| `tests/int/accounting/*.int.spec.ts`            | annotated; folder stays                                  | complete    |
| `tests/accounting/*` (duplicates of int)        | queued for deletion in `scripts/slice-f-delete-dead-stubs.sh` | complete |
| `tests/int/receivables/*`                       | annotated (IFRS 9, EN 16931)                             | complete    |
| `tests/int/export/*`                            | annotated (SAF-T, EN 16931, PDF/ODF)                     | complete    |
| `tests/int/parties/*`                           | annotated (ISO 17442, GDPR)                              | complete    |
| `tests/int/utilities/*`                         | annotated per file                                       | complete    |
| `tests/e2e/*`                                   | annotated (W3C WebDriver BiDi)                           | complete    |

## 8. Dead trees — queued for deletion

`scripts/slice-f-delete-dead-stubs.sh` carries ~127 file deletions across
Slices F, L, M, N, O, P, Q (run locally; sandbox cannot delete). Categories:

- Retired Ledger kernel: `src/collections/Ledger/**`
- Shadow-of-canonical accounting collections at `src/collections/`: GLAccounts,
  JournalEntries, GLPostings, BankStatements, FinancialStatements,
  PeriodEndAdjustments, TaxCalculations, CurrencyRates, TrialBalance,
  AR/APAgingReport, AllowanceForDoubtfulAccounts, FixedAssets,
  InventoryCostFlow, COGSCalculation, BudgetPlanning, BudgetVariance,
  FinancialRatios, CashFlowForecast, TrendAnalysis
- Empty `index.ts` shells: Customers, Vendors, TaxJurisdictions, TaxCodes,
  FiscalPeriods (each was just `export {}`)
- Slice-A re-export shims: `src/utilities/iso/`, `src/utilities/money/`,
  `src/utilities/encryption/`, `src/utilities/deriveSecret.ts`,
  `src/utilities/rateLimit.ts`, `src/utilities/securityHeaders.ts`,
  `src/utilities/getURL.ts`, `src/utilities/urlUtils.ts`,
  `src/utilities/generatePreviewPath.ts`, `src/utilities/getDocument.ts`,
  `src/utilities/getGlobals.ts`, `src/utilities/getRedirects.ts`
- Hidden dead trees discovered in Slice N: `src/__tests__/`, `src/lib/`,
  `src/middleware/`, `src/payload/`, `tests/accounting/`
- Test duplicates: `tests/accounting/*` mirror of `tests/int/accounting/*`

## 9. Slice ledger (executed)

| Slice | Scope                                                                                           | Status   |
|-------|-------------------------------------------------------------------------------------------------|----------|
| A     | ISO primitives split → `src/standards/iso-*` + `_money`                                         | complete |
| B     | Tax/finance accounting collection banners                                                       | complete |
| C     | Services annotations                                                                            | complete |
| D     | Core collection banners + access predicates + beforeChange hooks                                | complete |
| E     | Security utilities (encryption, KDF, headers, rate limit) + engineering utilities               | complete |
| F     | Dead-stub deletion (script-queued)                                                              | complete |
| G     | Plugin barrels + accounting/auth/export/receivables/payables/parties internals                  | complete |
| H     | Email + i18n annotations                                                                        | complete |
| I     | Tests folder annotations (1, 2, 3 sub-slices)                                                   | complete |
| J     | Access, hooks, jobs, config + fields/endpoints/ecommerce + components + app                     | complete |
| K     | NIST primitives relocated to `src/standards/`                                                   | complete |
| L     | Caller migration to `@/standards/<id>` + shim deletion queueing                                 | complete |
| M     | Tests moved to `tests/standards/<id>/` + vitest glob updated                                    | complete |
| N     | Hidden dead-tree audit (`src/__tests__/`, `src/lib/`, `src/middleware/`, `src/payload/`, etc.)  | complete |
| O     | Additional utility relocations (4 more standards-implementing files)                            | complete |
| P     | URI helpers + cache fetchers + security headers → `src/standards/`                              | complete |
| Q     | Final `src/utilities/` pruning + `README.md` + per-file annotations                             | complete |
| R     | Billing / seeding / SDK substantive utility annotations                                         | complete |
| S     | Final audit — zero stale imports, untagged-pure verification, six more annotations              | complete |

## 10. Pending — to be executed locally by the maintainer

1. `bash scripts/slice-f-delete-dead-stubs.sh` — sandbox cannot delete, so the
   ~127 queued files stay until a local run.
2. `pnpm tsc --noEmit` — too large for sandbox (470+ files); run locally to
   confirm zero type errors after deletion.
3. `pnpm payload migrate:create` — original error fixed in Slice 0; verify it
   still creates a clean migration.
4. `pnpm vitest run` — confirm all 10 `tests/standards/<id>/` folders execute
   under the updated glob.

---

**Version:** 1.0.0 — post-Slice-S.
