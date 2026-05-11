# `tests/standards/`

Tests for code under `src/standards/<id>/`. The folder layout mirrors the
implementation layout exactly — one folder per standard, the same ID, the
same composite-folder convention (`_money/`, `_security-headers/`).

```
tests/standards/
  iso-4217/             validate.int.spec.ts
  iso-3166-1/           validate.int.spec.ts
  iso-3166-2/           validate.int.spec.ts
  iso-8601/             validate.int.spec.ts
  iso-13616/            iban.int.spec.ts
  iso-9362/             bic.int.spec.ts
  bcp-47/               language-tag.int.spec.ts
  nist-sp-800-38/       aes-gcm.int.spec.ts
  nist-sp-800-108/      derive-secret.int.spec.ts
  nist-incits-359/      predicates.int.spec.ts + conventions.int.spec.ts
  rfc-3986/             url-utils + get-url + generate-preview-path
  rfc-6585/             rate-limit.int.spec.ts
  rfc-9110/             cache + get-document + get-globals + get-redirects
  _money/               money.int.spec.ts
  _security-headers/    headers.int.spec.ts
```

## Conventions

- **One folder per standard, ID-matched to `src/standards/<id>/`.**
  Adding a new src/ folder requires adding the matching tests/ folder.
- **One spec per implementation file.** A file at `src/standards/<id>/foo.ts`
  has its tests at `tests/standards/<id>/foo.int.spec.ts`. Bigger surfaces
  may split (rfc-9110 has 4 specs, one per file).
- **Filename suffix is `.int.spec.ts`.** Vitest's include glob is
  `tests/standards/**/*.int.spec.ts` — see `vitest.config.mts`.
- **Banner cites the same standards as the subject file**, plus
  `ISO/IEC 29119:2022 software-testing` for the test-engineering layer.
- **No mocks of the standard.** A standard test exercises the real
  implementation; if the test needs a mock, the standard isn't testable
  enough yet — fix that before writing the test.

## Running

```bash
pnpm vitest run                            # everything
pnpm vitest run tests/standards/           # just standards tests
pnpm vitest run tests/standards/iso-4217/  # just one folder
```

## See also

- `src/standards/README.md` — implementation conventions.
- `docs/STANDARDS.md` §5 — naming rules for files and folders.
- `docs/STANDARDS_AUDIT.md` §7 — per-standard test coverage map.
