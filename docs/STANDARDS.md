# Standards Taxonomy & Annotation Convention

> Canonical reference for every governing standard cited by erpax code. Every
> file lives in `src/standards/<id>/` (where applicable) and carries a JSDoc
> banner declaring its standards. Agents and humans MUST cite this file before
> proposing renames, new collections, or new standards.

## 1. Why this exists

Naming and JSDoc tags do **not** make an app ISO-compliant — compliance is a
function of process, controls, and conformance to spec (XSDs, regex, code
tables, reporting cadences). What this taxonomy *does* give us:

1. **Discoverability** — agents can grep `@standard ISO-4217` and find every
   currency-touching call site in seconds.
2. **Drift detection** — when an ISO publishes a new edition (e.g. ISO 8601-1:2019
   superseding ISO 8601:2004), every file declaring the old edition shows up in
   one grep.
3. **Audit traceability** — security and finance auditors can trace from a
   control objective (e.g. "all PII at rest is encrypted per ISO/IEC 27002 §10.1")
   to the exact file enforcing it.
4. **Onboarding** — new contributors and AI agents see the governing rule before
   they touch the field.

## 2. Folder convention

```
src/standards/<lowercase-standard-id>/
  README.md                     ← what belongs here, with citation
  index.ts                      ← public API of this standard's helpers
  <implementation files>.ts     ← pure functions, validators, coercers
```

The standard ID is the lowercase, hyphenated, machine-form of the standard's
canonical short name. Examples: `iso-4217`, `iso-3166-1`, `iso-8601`, `rfc-9562`,
`ecma-262`, `peppol-bis-3`, `saf-t`, `oauth-2.1`, `oecd-saf-t`.

When a file *implements* a standard (validators, code tables, message
serializers), it MUST live in `src/standards/<id>/`. When a file merely *uses* a
standard (a Payload collection that stores ISO-4217 currency codes), it stays in
its domain folder and declares the standard via JSDoc.

## 3. JSDoc annotation contract

Every TypeScript file (excluding generated `payload-types.ts`, `*.d.ts`, and
auto-generated migration files) MUST carry a per-file banner of this form:

```ts
/**
 * <one-line summary of the file's purpose>
 *
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-3166-1:2020 country-codes alpha-2
 * @compliance GDPR Art.6(1)(b) lawful-basis-contract
 * @rfc 9562 UUID
 * @see https://www.iso.org/standard/64758.html
 */
```

### Tag grammar

| Tag             | Form                                                                              | Used for                                                          |
|-----------------|-----------------------------------------------------------------------------------|-------------------------------------------------------------------|
| `@standard`     | `<FAMILY>-<NUMBER>[:<EDITION>] <slug>`                                            | ISO, IEC, ISO/IEC, EN, EN-ISO, ECMA standards                     |
| `@rfc`          | `<NUMBER> <slug>`                                                                 | IETF RFCs                                                         |
| `@compliance`   | `<REGIME> <article-or-section> <slug>`                                            | GDPR, PCI-DSS, SOX, eIDAS, SOC 2, HIPAA, CCPA                     |
| `@accounting`   | `IFRS-<n>` or `US-GAAP ASC-<n>` or `<scheme> <slug>`                               | IFRS, US-GAAP, SAF-T, Peppol BIS, UN/EDIFACT, EN 16931            |
| `@security`     | `<framework> <control-id> <slug>`                                                 | ISO 27001 Annex A, ISO 27002, NIST 800-53, OWASP ASVS             |
| `@quality`      | `ISO-25010 <characteristic>`                                                      | quality model citations                                           |
| `@audit`        | `ISO-19011 <clause>`                                                              | audit-procedure citations                                         |
| `@see`          | URL                                                                               | external authoritative link (publisher only — no archive mirrors) |

Per-symbol tags MAY appear on a function/field/class above the file banner's
declared standards when narrowing (e.g. a single function inside an ISO-4217
file that specifically implements ISO-4217 §6.2 numeric codes).

### Parser-readable invariants

- Tag and value MUST be on the same line — no soft wraps.
- Standard IDs use `-` as separator; edition follows `:`; slug is space-separated.
- Multiple values use multiple tags, never comma lists.
- A grep of `^\s*\*\s*@standard\s+(\S+)` yields the full citation index.

### Citation-index helper

`scripts/standards-citation-index.sh` automates the parser-readable promise.
Six modes, exposed as `pnpm` scripts:

```bash
pnpm standards:audit         # print full citation index to stdout
pnpm standards:counts        # totals per tag (sanity)
pnpm standards:check         # exit non-zero on malformed banners
pnpm standards:required      # exit non-zero if any src/standards/ or tests/standards/ file lacks @standard / @rfc
pnpm standards:write-index   # write docs/STANDARDS_INDEX.md (the materialised view)
pnpm standards:verify-index  # exit non-zero if docs/STANDARDS_INDEX.md is stale
```

`standards:check`, `standards:required`, and `standards:verify-index` are
wired as the first steps of `pnpm check`, the pre-push hook, and the
GitHub Actions CI workflow. A stray `@standard` with no value, a new
`src/standards/<id>/` file that forgot its banner, or a stale committed
index all fail the same gate that runs lint, typecheck, and tests.

[`docs/STANDARDS_INDEX.md`](./STANDARDS_INDEX.md) is the materialised
view — browse it on GitHub to see every citation in one place. Treat it
as generated output: after any banner change, run `pnpm standards:write-index`
before committing.

## 4. Standards in scope for erpax

> **Reading this section.** The §4.1–§4.5 tables list every standard erpax
> *cites*. Some have a corresponding folder under `src/standards/` that
> ships code (validators, KDFs, parsers); others are cited only via JSDoc
> banners on domain code. For the authoritative folder inventory see
> `STANDARDS_AUDIT.md` §0; for reserved future-builder slots see §0.1.

### 4.1 Domain — financial / identifier codes

| Folder                   | Standard                                | Governs in erpax                                               |
|--------------------------|-----------------------------------------|----------------------------------------------------------------|
| `iso-4217`               | ISO 4217:2015 — currency codes          | every `currency` field, `Money` type, FX rates                 |
| `iso-3166-1`             | ISO 3166-1:2020 — country codes alpha-2 | tenant country, customer/vendor country, tax jurisdiction      |
| `iso-3166-2`             | ISO 3166-2:2020 — subdivisions          | regions/states, sub-national tax jurisdictions                 |
| `iso-8601`               | ISO 8601-1:2019 / -2:2019 — date-time   | every timestamp, every date-only field, periods, durations     |
| `iso-13616`              | ISO 13616-1:2020 — IBAN                 | bank-account fields                                            |
| `iso-9362`               | ISO 9362:2022 — BIC / SWIFT             | bank-routing fields                                            |
| `iso-6166`               | ISO 6166:2021 — ISIN                    | securities (when added)                                        |
| `iso-17442`              | ISO 17442-1:2020 — LEI                  | legal entity identifier on tenants/parties                     |
| `iso-20022`              | ISO 20022 — financial messaging         | pain.001 (PaymentInitiation), camt.053 (BankStatement), pacs.* |
| `_money`                 | composite — ISO 4217 + integer-cents    | `Money` value type (`amountCents:int + currency:ISO-4217`) — avoids IEEE-754 rounding |

### 4.2 Domain — accounting & invoicing

| Folder           | Standard / Scheme                          | Governs in erpax                                                |
|------------------|--------------------------------------------|-----------------------------------------------------------------|
| `ifrs`           | IFRS — International Financial Reporting   | financial statements, fiscal periods, recognition policies      |
| `us-gaap`        | US-GAAP — ASC codification                 | US-GAAP-mode statements, ASC 606 revenue, ASC 842 leases        |
| `saf-t`          | OECD SAF-T 2.0                             | tax-authority audit file export                                 |
| `peppol-bis-3`   | Peppol BIS Billing 3.0                     | EU B2B/B2G electronic invoicing                                 |
| `en-16931`       | EN 16931:2017 — semantic invoice model     | invoice/credit-note schema, mandatory tax categories            |
| `un-edifact`     | UN/EDIFACT D.96A+                          | legacy EDI invoicing                                            |

### 4.3 Web / engineering

| Folder              | Standard                                       | Governs in erpax                                              |
|---------------------|------------------------------------------------|---------------------------------------------------------------|
| `ecma-262`          | ECMAScript 2024 (ES2024)                       | language baseline                                             |
| `rfc-3986`          | RFC 3986 — URI                                 | every URL field, route construction (`url-utils.ts`, `get-url.ts`, `generate-preview-path.ts`) |
| `rfc-5321`          | RFC 5321 — SMTP                                | mail transport, envelope                                      |
| `rfc-5322`          | RFC 5322 — Internet Message Format             | every email-address field, header construction                |
| `rfc-7519`          | RFC 7519 — JWT                                 | session tokens, API keys (where JWT)                          |
| `rfc-8259`          | RFC 8259 — JSON                                | JSON encoding throughout                                      |
| `rfc-6585`          | RFC 6585 — Additional HTTP Status Codes        | `429 Too Many Requests` rate limiter (`rate-limit.ts`)         |
| `rfc-9110`          | RFC 9110 — HTTP semantics                      | every API route, every endpoint, ETag/cache (`cache.ts`, `get-document.ts`, `get-globals.ts`, `get-redirects.ts`) |
| `rfc-9562`          | RFC 9562 — UUID v1–v8                          | every UUID generation/validation                              |
| `rfc-9700`          | RFC 9700 (BCP) — OAuth 2.1                     | OAuth flows, PKCE, token rotation                             |
| `bcp-47`            | BCP 47 — language tags                         | every locale, i18n routing (`locale-utils.ts`)                 |
| `openapi-3.1`       | OpenAPI 3.1.0                                  | API description (when added)                                  |
| `json-schema-2020-12` | JSON Schema 2020-12                          | request/response validation                                   |

### 4.4 Security, privacy, compliance

| Folder                 | Standard / Regulation                          | Governs in erpax                                              |
|------------------------|------------------------------------------------|---------------------------------------------------------------|
| `iso-27001`            | ISO/IEC 27001:2022 — ISMS                      | management-system controls (process, not code)                |
| `iso-27002`            | ISO/IEC 27002:2022 — controls                  | control implementations cited from code                       |
| `iso-27701`            | ISO/IEC 27701:2019 — privacy                   | PII handling, controller/processor split                      |
| `iso-25010`            | ISO/IEC 25010:2023 — quality model             | non-functional requirements                                   |
| `iso-19011`            | ISO 19011:2018 — auditing guidance             | internal audit hooks                                          |
| `gdpr`                 | EU 2016/679 (GDPR)                             | every PII field, consent, retention                           |
| `pci-dss-4`            | PCI-DSS v4.0                                   | card data flows (we tokenize via Stripe — minimize scope)     |
| `eidas-2`              | EU 910/2014 + 2024/1183 (eIDAS 2)              | qualified e-signature, EUDI Wallet, trust lists               |
| `oauth-2.1`            | RFC 9700 BCP                                   | (alias of rfc-9700)                                           |
| `sox`                  | Sarbanes-Oxley §302/§404                       | segregation of duties, change-management evidence             |
| `soc-2`                | AICPA SOC 2 Trust Services Criteria            | logging, access reviews, incident response                    |
| `_security-headers`    | RFC 6797 HSTS + W3C CSP-3 + W3C Permissions-Policy + W3C Referrer-Policy (composite) | response hardening (`headers.ts`)               |

### 4.5 NIST — security primitive implementations

These folders ship actual code (validators, KDFs, ciphers, RBAC predicates),
not just citations. The legacy locations under `src/utilities/` are
`@deprecated` re-export shims pointing here.

| Folder                  | Standard                                          | Governs in erpax                                          |
|-------------------------|---------------------------------------------------|-----------------------------------------------------------|
| `nist-sp-800-38`        | NIST SP 800-38D — AES-GCM authenticated encryption| field-level encrypt-at-rest (PaymentMethods/Subs/Invoices) |
| `nist-sp-800-108`       | NIST SP 800-108 — KDF (HMAC-SHA256, RFC 5869 HKDF) | per-purpose secret derivation from `PAYLOAD_SECRET`       |
| `nist-incits-359`       | NIST INCITS 359-2012 — Role-Based Access Control  | role predicates + `roles`/`user_roles` mutations          |

Companion citations:
- `nist-fips-197` — AES-256 block cipher (cited; not its own folder)
- `nist-fips-198-1` — HMAC (cited; not its own folder)
- `nist-fips-180-4` — SHA-256 (cited; not its own folder)
- `nist-sp-800-162` — ABAC (cited as companion to `nist-incits-359`)
- `nist-sp-800-63b` — authentication assurance (cited from `rateLimit.ts`)

## 5. Naming rules

- **Folder ID is canonical.** All citations use the folder ID exactly. No
  variants (`iso4217`, `iso_4217`, `ISO-4217` in folder names).
- **Editions are documented in the folder README**, not in folder name. The
  folder is `iso-4217`; the README declares "current edition: ISO 4217:2015".
- **Implementation files inside the folder are domain-named**, not standard-named:
  `src/standards/iso-4217/validate.ts`, not `iso-4217-validate.ts`.
- **Test files mirror their target**: `tests/standards/iso-4217/validate.test.ts`.

## 6. Banner placement rules

1. The banner is the **first non-import statement** in the file.
2. Files re-exporting from a standards module declare every standard they
   surface. Barrel files at `src/standards/index.ts` declare all standards
   the project uses (the master citation index).
3. Test files declare the same standards their subject file declares, plus any
   additional standards the test fixtures invoke (e.g. RFC 9562 UUID for IDs).
4. Generated files (`payload-types.ts`, migrations) are exempt — but every
   collection that *generates* into them declares its standards.

## 7. Glossary of common slugs

| Slug             | Meaning                                          |
|------------------|--------------------------------------------------|
| `currency-codes` | ISO 4217 §5 alphabetic                           |
| `country-codes`  | ISO 3166-1 alpha-2                               |
| `subdivision`    | ISO 3166-2 country-region                        |
| `date-time`      | ISO 8601-1 calendar date-time                    |
| `iban`           | ISO 13616 IBAN                                   |
| `bic`            | ISO 9362 BIC / SWIFT                             |
| `pain.001`       | ISO 20022 customer credit transfer initiation    |
| `camt.053`       | ISO 20022 bank-to-customer statement             |
| `pacs.008`       | ISO 20022 FI-to-FI customer credit transfer      |
| `lei`            | ISO 17442 Legal Entity Identifier                |
| `lawful-basis`   | GDPR Art. 6(1) lawful basis for processing       |
| `data-subject`   | GDPR Art. 4(1) data subject rights               |
| `kyc`            | know-your-customer (no single ISO; see FATF)     |

## 8. Updating this document

Adding a standard requires:

1. A new row in §4 with folder ID, edition, and what it governs.
2. A new folder under `src/standards/<id>/` with README (only if shipping
   code; standards cited only via banners do not need a folder).
3. An entry in `docs/STANDARDS_AUDIT.md` §0 (folder inventory) and §1.1
   (utilities consumer table) for every existing file the standard newly
   governs.
4. A bump of the version line below.

See also `docs/MIGRATION_WORKLIST.md` "Adding a new slice" for the full
recipe including master-barrel re-export and slice-ledger update.

---

**Version:** 1.0.0 — post-Slice-W consolidation.
**Last reviewed:** 2026-05-09.
