# ERPAX — Automatic Accounting System

A multi-tenant accounting platform built on Payload CMS (Cloudflare D1 / R2 /
OpenNext). Standards-anchored: every governing standard (ISO, RFC, IFRS,
US-GAAP, NIST, GDPR, PCI-DSS, SOC 2, etc.) is declared via JSDoc banners
on the files that implement or use it, and verified by `pnpm standards:check`.

## Standards system

This codebase is organised around the standards it implements. **Read
[`docs/STANDARDS.md`](./docs/STANDARDS.md) before adding new code.**

| Doc                                                       | Purpose                                                            |
|-----------------------------------------------------------|--------------------------------------------------------------------|
| [`docs/STANDARDS.md`](./docs/STANDARDS.md)                | Taxonomy + JSDoc grammar (the contract).                           |
| [`docs/STANDARDS_AUDIT.md`](./docs/STANDARDS_AUDIT.md)    | Per-file map: what standard each file implements / cites.          |
| [`docs/MIGRATION_WORKLIST.md`](./docs/MIGRATION_WORKLIST.md) | Slice ledger + recipe for adding new standards.                  |
| [`src/standards/README.md`](./src/standards/README.md)    | Implementation conventions for `src/standards/<id>/` folders.      |
| [`tests/standards/README.md`](./tests/standards/README.md)| Test layout (mirrors `src/standards/<id>/`).                       |

Discoverability tooling:

```bash
pnpm standards:audit    # full citation index, grouped by tag
pnpm standards:counts   # totals per tag (~1,900 citations across the repo)
pnpm standards:check    # exit non-zero on malformed banners (CI gate)
```

`pnpm standards:check` is the first step of `pnpm check`, the pre-push
hook, and the GitHub Actions CI workflow. Production builds cannot ship
without it passing.

## What's implemented

- 100% GL automation — every transaction emits balanced double-entry GL postings.
- Multi-tenancy with full host isolation (NIST INCITS-359 RBAC + ISO/IEC 27001 A.5.23).
- Multi-currency: integer-cents `Money` value type (`src/standards/_money/`)
  + foreign-currency translation per IFRS IAS 21 (`src/services/multi-currency.service.ts`).
- Tax automation across 10+ jurisdictions (EN 16931 + OECD SAF-T + ISO 3166-1/-2).
- Bank reconciliation against ISO 20022 camt.053 statements + IBAN (ISO 13616) +
  BIC (ISO 9362).
- Periodic financial statements (IFRS IAS 1 + US-GAAP ASC 205).
- 15 standards-implementing modules under `src/standards/<id>/` with full
  test parity at `tests/standards/<id>/`.

## Quick start

```bash
pnpm install
pnpm setup          # one-time .env scaffold
pnpm dev            # local Payload + Next.js
pnpm payload migrate:create   # add a migration
pnpm test           # vitest integration suite
pnpm check          # standards + lint + typecheck + tests (the local gate)
```

For the full script surface see [`package.json`](./package.json) `scripts`.

## Changelog

See [`CHANGELOG.md`](./CHANGELOG.md) for release notes. The most recent
entry (1.0.0) records the standards taxonomy + enforcement work executed
across Slices A–FF.

## License

MIT.
