# tests/evidence/ — moved to `public/evidence/`

The multimedia evidence pack now lives under **`public/evidence/`** so the
deployed Worker serves the captured walk-throughs as static public assets.
See `public/evidence/README.md` for the full layout + usage notes.

This folder is kept only as a placeholder so existing `tests-failures.log`
references resolve; it can be safely deleted (`rm -rf tests/evidence/`)
once you've confirmed nothing local depends on the old path.
