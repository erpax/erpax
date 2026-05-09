# `src/standards/`

Per-standard implementation modules. One folder per governing standard, named
with the canonical lowercase-hyphenated standard ID (see `docs/STANDARDS.md` §2).

```
src/standards/
  iso-4217/             currency codes
  iso-3166-1/           country codes (alpha-2, alpha-3)
  iso-3166-2/           country subdivisions
  iso-8601/             date / time / duration / format helpers
  iso-13616/            IBAN
  iso-9362/             BIC / SWIFT
  bcp-47/               language tags + locale utilities
  nist-sp-800-38/       AES-256-GCM authenticated encryption
  nist-sp-800-108/      HMAC-SHA256 KDF (HKDF)
  nist-incits-359/      RBAC scope + permission predicates
  rfc-3986/             URI / URL primitives + base-URL resolution
  rfc-6585/             rate limiting (429 retry-after)
  rfc-9110/             HTTP cache adapters (documents / globals / redirects)
  _money/               composite — Money DTO (ISO 4217 + integer cents)
  _security-headers/    composite — CSP-3 + HSTS + Permissions-Policy
```

Reserved future-builder slots (folder will be created when implementation
ships): `saf-t/`, `peppol-bis-3/`, `iso-20022/`, `un-edifact/`.

## Rules

- A folder MUST exist if and only if we ship code that **implements** the
  standard (validators, coercers, message builders, code tables).
- A folder MUST contain a `README.md` declaring the current edition and the
  standard's URL at the canonical publisher (no archive mirrors).
- Implementation files MUST carry a `@standard` JSDoc banner and pure functions
  only — no Payload imports, no I/O.
- Folder ID `_money/` is intentionally a leading-underscore composite that
  uses ISO 4217 plus an integer-cents convention. Composites live under
  `_<short-name>/` to distinguish them from single-standard folders.

## Adding a standard

1. Add it to the table in `docs/STANDARDS.md` §4.
2. Create `src/standards/<id>/README.md`, `index.ts`, and implementation files.
3. Re-export from `src/standards/index.ts`.
4. Add `@standard` banners to every file that USES the standard.
