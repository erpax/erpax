# Standards Migration Worklist

> Companion to `docs/STANDARDS.md` (the contract) and
> `docs/STANDARDS_AUDIT.md` (the per-file map). This file tracks the
> high-level slice ledger and the small set of open questions that remain.
>
> **State (2026-05-09):** Slices A–T complete. The mechanical relocation
> is done; what remains is incremental annotation as new code lands plus
> the local-only deletion run.

## Slice ledger — A through T (complete)

For per-slice scope, files touched, and verification details, see
`docs/STANDARDS_AUDIT.md` §9 (slice ledger) and §1.1 (utilities pruning
outcome). The ledger below is a one-liner index only.

| Slice | One-line summary                                                                  |
|-------|-----------------------------------------------------------------------------------|
| A     | ISO primitives split into `src/standards/iso-*` + `_money` composite.             |
| B     | JSDoc banners on 15 tax/finance accounting collections.                           |
| C     | JSDoc banners on 11 services in `src/services/`.                                  |
| D     | Banners on 26 collections + access predicates + beforeChange hooks (+ residual).  |
| E     | Security utilities (encryption, KDF, headers, rate limit) + engineering utilities.|
| F     | Dead-stub audit + `scripts/slice-f-delete-dead-stubs.sh` published.               |
| G     | Plugin barrels (auth/export/receivables/payables/parties/hooks/accounting).       |
| H     | Email + i18n annotations.                                                         |
| I     | 54 substantive test files annotated; ISO/IEC 29119 stack added.                   |
| J     | Access, hooks, jobs, config, fields, endpoints, ecommerce + components + app.     |
| K     | NIST primitives relocated to `src/standards/nist-*`.                              |
| L     | Caller migration to `@/standards/<id>`; legacy shims queued for deletion.         |
| M     | Tests moved to `tests/standards/<id>/`; vitest glob extended.                     |
| N     | Hidden dead-tree audit (`src/__tests__/`, `src/lib/`, `src/middleware/`, etc.).   |
| O     | 4 more standards-implementing utilities relocated.                                |
| P     | URI helpers + cache fetchers + security headers → `src/standards/`.               |
| Q     | Final `src/utilities/` pruning + `README.md` + per-file annotations.              |
| R     | Billing / seeding / SDK substantive utility annotations.                          |
| S     | Final audit — zero stale imports, untagged-pure verification, six more banners.   |
| T     | `docs/STANDARDS_AUDIT.md` refreshed to v1.0.0 (post-Slice-S).                     |
| U     | `docs/MIGRATION_WORKLIST.md` rewritten v1.0.0 (this file).                        |
| V     | Master barrel + per-standard READMEs verified; barrel extended to 64 exports.    |
| W     | `docs/STANDARDS.md` consolidated to v1.0.0 (added `_money` to §4, version bump). |
| X     | Misplaced `tests/int/utilities/` specs moved to `tests/standards/{rfc-3986,rfc-9110}/`. |
| Y     | Filled 3 standards-test gaps (`nist-sp-800-108`, `rfc-6585`, `_security-headers`).|
| Z     | `tests/standards/README.md` + `scripts/standards-citation-index.sh` published.    |
| AA    | `pnpm standards:{audit,counts,check}` wired into `package.json` `check`.          |
| BB    | `standards:check` added to `.husky/pre-push`.                                     |
| CC    | `standards` job added to `.github/workflows/ci.yml`, blocks `build`.              |
| DD    | README rewritten to surface the standards system.                                 |
| EE    | `CONTRIBUTING.md` + PR-template standards checklist added.                        |
| FF    | Persistent memory entries seeded; final regression sweep clean.                   |
| GG    | `CHANGELOG.md` 1.0.0 published.                                                   |
| HH    | 10 top-level legacy `*_SUMMARY.md`/`*_PLAN.md` queued for deletion.               |
| II    | `--required` mode added to citation script (closes missing-banner gap).           |
| JJ    | Genuine final audit + `--required` extended to `tests/standards/`.                |
| KK    | `docs/STANDARDS_INDEX.md` materialised + `--verify-index` freshness gate.         |
| LL    | **Bug-hunt:** 4 latent `migrate:create` blockers fixed (TaxCodes, Customers, Vendors, FiscalPeriods). |
| MM    | **Bug-hunt:** 42 cosmetic `defaultColumns` issues found, decision pending.        |
| NN    | **Bug-hunt:** 23 Payload v2-import paths rewritten to v3 + triple-cast removed.   |
| OO    | **Bug-hunt:** 22 `console.*` calls inside `src/plugins/` rewritten to logger.     |
| PP    | **Bug-hunt:** GL-posting subsystem DOA — `services` registry never wired.         |
| QQ    | **Bug-hunt:** 41 access-predicate references to non-existent role shape.          |
| RR    | **Bug-hunt:** services confirmed real; 1 deprecated stub queued for deletion.     |
| SS    | **Bug-hunt:** `req.user.hostId` references field that doesn't exist on User.      |
| TT    | **Bug-hunt:** `host`/`hostId`/`tenant` field-name inconsistency across collections.|
| UU    | **Bug-hunt:** test seeds use same broken role/host shape.                         |
| VV    | **Bug-hunt:** **positive** — broken pattern is contained to accounting plugin only.|
| WW    | Persistent memory refreshed with audit findings.                                  |
| XX    | This pending-actions update.                                                      |
| YY    | BG country bundle (`iso-3166-1/countries/bg.ts`) + 11 BG ASPSPs + БНБ rates.      |
| ZZ    | BG generic clients: Berlin Group PSD2 + НАП mTLS + `clientImplemented:true` × 15. |
| AAA   | BG runtime standards: ЕГН (ISO 7064 mod-11), VAT calc, holiday calendar.          |
| BBB   | PDF stack: ISO 19005 (PDF/A) + ISO 14289 (PDF/UA) + ETSI EN 319 142 (PAdES).      |
| CCC   | BG hybrid invoice (PDF/A-3 + EN-16931 XML) + bg-pades-signer + evidence-attestation.|
| DDD   | BG bank-statement PDF parser + UniCredit + Fibank registry.                       |
| EEE   | EU pan-fallback wiring: ECB rates + VIES + EU CFSP + PEPPOL routed by country.    |
| FFF   | Merged-API schema: `ApiAuditEvents` + `EvidenceAttestations` + persistence helper.|
| GGG   | Master-barrel re-exports + STANDARDS_AUDIT rows for slices YY-FFF (this slice).   |
| HHH   | Host → Tenant unification, no backward compat (closes Decision B from STANDARDS).|
| III   | `defaultColumns` dotted-refs across 11 collections (closes Decision A); audit upgraded.|
| JJJ   | Per-field standards audit — 649 fields/66 collections classified, 0 unjustified; `docs/FIELD_STANDARDS_AUDIT.md` published.|
| KKK   | Strict access DRY — 3 bundle helpers added; 9 collections collapsed from 4-line access blocks to one-liners.|
| LLL   | Event-bridge DRY — 7 of 8 GL handlers wired (invoice:completed/reversed, bill:paid/reversed, inventory:purchased/sold, bank:statement:imported); `emitDomainEvent` helper extracted.|
| MMM   | Handler audit — 1 dead handler wired (`buildDefaultSignCms` → `bg-pades-signer.ts` fallback); 0 missing, 0 redundant after investigation.|
| NNN   | Standards × schema audit — 9 mandatory + 54 recommended field gaps identified; `docs/FIELD_ADD_REMOVE_AUDIT.md` + `docs/REFACTORING_PLAN_TO_COMPLETE.md` published.|
| OOO   | eIDAS/PAdES — 5 signing fields on evidence-attestations + signer envelope.|
| PPP   | SOX/ISO-19011 — `eventId` on audit-events + persistence in `auditTrailAfterChange`.|
| QQQ   | IAS-2 §25 — `valuationMethod` on inventory-movements + threaded through GL.|
| RRR   | EN-16931 BT-151 — `vatCategoryCode` promoted to required (default 'S').|
| SSS   | Last 2 GL handlers wired — `bank:transaction:matched` + `subscription:refunded`. **0 dead handlers.**|
| TTT   | **8 missing collections created** — bank-reconciliations, intercompany-transactions, consolidation-eliminations, prior-period-adjustments, rounding-adjustments, transaction-failures, fx-transactions, payment-allocations. Stale `'hosts'` slug + `'my-collection'` examples purged.|
| UUU   | **8 first-principles ERP collections created** (manufacturing + logistics). Manufacturing: bills-of-materials, work-orders, production-receipts, cost-variances, quality-inspections (IAS-2 §10-14, ISA-95). Logistics: carriers, tracking-events, customs-declarations (INCOTERMS 2020, WCO HS, EU UCC).|
| VVV   | **Agnostic ERPax** — `feature-registry.ts` (16 features × 5 tiers), `featureGuard()` Access predicate, `accountingCollectionAccess({ feature })` extension, 13 collections tagged, `usage-records` collection for IFRS-15 §B16 metered billing.|
| WWW   | **Cloudflare AI** — `services/ai/cloudflare-ai.ts` single entry-point with 5-gate enforcement, `ai-suggestions` audit collection (GDPR Art.22 + EU AI Act + SOX §404), 9 AI feature flags, wrangler.jsonc AI + Vectorize bindings.|
| XXX   | **9 AI use-case handlers** — invoice-OCR, bank-matching, sanctions-screening (high-risk, no auto-accept), anomaly-detection, tax-classification, hs-code, document-classification, embed+semantic-search, audit-summarisation. Barrel + per-feature thin wrappers.|
| YYY   | **Deep AI integration** — 9-gate `callWorkersAi` (PII strip + injection detect + token quota + AI Gateway cache + output validation + audit hash); `ai-security.ts` + Durable Objects (`TenantQuotaCounter` / `RateLimiter` / `JobLock`); all Cloudflare bindings wired (KV, Queues×5, DO×3, Browser, Analytics×4, Email, Rate-Limiter×2).|

## Pending — local execution only

These steps cannot run in the agent sandbox (filesystem deletion blocked,
`tsc --noEmit` exceeds 180s timeout on the 470-file project). Run them
locally on the next opportunity:

```bash
# 1. Delete the ~138 queued dead files (Slices F + L + M + N + O + P + Q + X + HH + NN + RR).
bash scripts/slice-f-delete-dead-stubs.sh

# 2. Confirm the build is still green after deletion.
pnpm tsc --noEmit

# 3. Confirm Payload migrations still scaffold correctly
#    (the original useAsTitle bug that started this entire effort, plus
#    the 4 sibling Slice-LL fixes).
pnpm payload migrate:create

# 4. Run the test suite, including the new tests/standards/<id>/ folders
#    and the 12 standards-keyed test folders (Slices M, X, Y).
pnpm vitest run
```

## Pending — design decisions before further code changes

The bug-hunt phase (Slices LL–VV) surfaced two distinct decisions that
required maintainer judgment before applying mechanical fixes. Both
are now closed.

### Decision A — `defaultColumns` nested-field strategy (Slice MM → III)

**CLOSED by Slice III (2026-05-10).** Payload v3.84.1 supports dotted
refs, so the chosen strategy is **dotted refs** (`'identity.code'`) —
non-invasive, version-appropriate, preserves the data shape. 36 entries
rewritten across 11 collections; `scripts/audit-default-columns.sh`
upgraded to grok dotted refs + factory-injected fields. Final audit:
0 findings.

### Decision B — accounting-plugin host/role/tenant unification (Slices PP+QQ+SS+TT+UU → HHH)

**CLOSED by Slice HHH (2026-05-10).** Both decisions are now
mechanically resolved. Slice CCC + PP + FFF had already migrated the
schema (`tenant` field, `req.user.tenants[]` shape, direct service
singletons); Slice HHH (no backward compat) finished the lexical
unification — file/symbol/path renames, the dead `'hosts'` collection
slug in seeds → canonical `'tenants'`, two genuine bugs fixed
(`reports.ts` and `period-lock.ts` were querying non-existent fields),
and one tombstoned dead file (`base-accounting-hook.ts`).

### Recommended order

```
1. bash scripts/slice-f-delete-dead-stubs.sh   (cleanup)
2. pnpm standards:check                        (sanity)
3. pnpm tsc --noEmit                           (full type check)
4. pnpm payload migrate:create                 (initial migration)
5. pnpm vitest run                             (full suite)
```

## Reserved future builder slots

## Reserved future builder slots

Empty placeholders in the taxonomy — add the folder + `README.md` +
implementation file when the relevant builder ships:

| Path                                  | Will implement                                                  |
|---------------------------------------|-----------------------------------------------------------------|
| `src/standards/saf-t/`                | OECD SAF-T 2.0 export builder                                   |
| `src/standards/peppol-bis-3/`         | Peppol BIS Billing 3.0 invoice builder                          |
| `src/standards/iso-20022/`            | pain.001 / pain.008 / pacs.008 / camt.053 message builders      |
| `src/standards/un-edifact/`           | INVOIC D.96A serializer                                         |

## Conventions every future slice MUST follow

1. **Banner format** matches `docs/STANDARDS.md` §3 exactly: tag and value
   on the same line, hyphenated standard IDs, slug suffix.
2. **Tests run green at the end of each slice.** Run `pnpm vitest run`
   after each slice; do not stack slices without verification.
3. **Imports use `@/standards/<id>` directly**, not the master barrel
   `@/standards`. The master barrel exists for grep-traceability only.
4. **Deprecation shims** — when relocating a public utility, leave a shim
   that `@deprecated` re-exports from the new location for one release,
   then queue the shim for deletion in
   `scripts/slice-f-delete-dead-stubs.sh`.
5. **Update `docs/STANDARDS_AUDIT.md`** in the same commit as the slice.

## Open questions

The following design questions deserve a decision when the relevant code
path lands; current code does not require an answer.

- **Numeric ISO codes** — some flows want ISO 4217 numeric (§6.2) and
  ISO 3166-1 numeric (UN M.49). Decide: extend the existing folders, or
  split into `iso-4217-numeric/` and `un-m49/`?
- **Edition pinning** — some standards have multiple active editions
  (e.g. ISO 8601-1:2019 vs. legacy ISO 8601:2004). Banners currently
  cite the active edition. Should retired editions be cited too in
  legacy code paths?
- **Per-field tags** — for very large collections, do we want per-field
  `@standard` tags inside the `fields:` array, or is the file-level
  banner enough? Recommendation: file-level only, with prose pointers
  in field `admin.description` for human visibility.

## Adding a new slice

When a new feature lands that bears a standard not yet in the taxonomy:

1. Pick or create the canonical folder under `src/standards/<id>/`.
   Use a leading underscore (`_money`, `_security-headers`) for
   composite folders that span multiple standards.
2. Add `README.md` with publisher, edition, in-scope, and out-of-scope.
3. Add the implementation file(s) with a JSDoc banner per
   `STANDARDS.md` §3.
4. Add a mirroring test folder under `tests/standards/<id>/`.
5. Re-export from `src/standards/index.ts` (the master barrel) for
   grep-traceability — but new callers must import directly from
   `@/standards/<id>` per convention #3.
6. Append a row to `docs/STANDARDS_AUDIT.md` §0 and §9.
7. Append a row to this file's slice ledger.

---

**Version:** 1.0.0 — post-Slice-T.
**Last updated:** 2026-05-09.
