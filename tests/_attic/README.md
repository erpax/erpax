# `tests/_attic/` — emptied subdirs

Slice **CCCCC-prep (2026-05-11)** moved every chain integration test
out of `tests/int/chains/` into the canonical co-located position
next to its seed file:

```
tests/int/chains/p2p-three-way-match.int.spec.ts
  ↓
src/plugins/accounting/seeds/chains/p2p-three-way-match.test.ts
```

The now-empty `tests/int/chains/` folder is staged here for permanent
deletion in `scripts/slice-f-delete-dead-stubs.sh`.

Per user directive: *"next to each file create a test file so tests
dir is clean if standard"*. The whole `tests/` tree is on a path to
zero — every spec migrates to its sibling file under `src/`.

Vitest config (`vitest.config.mts`) was updated to scan
`src/**/*.test.ts` so the relocated specs run automatically.
