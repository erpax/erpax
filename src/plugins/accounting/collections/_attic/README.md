# `_attic/` — queued for deletion

Files here are **not** part of the live codebase.

- The 10 `*Report.ts` / `*Calculation.ts` / `*Forecast.ts` etc. stubs were
  retired by **Slice QQQ** when those report shapes moved to
  `services/reports.ts` (DTO-only).
- The 13 `*.ts.bak` files are pre-Slice-WW backups left from
  factory-helper migrations.

The Cowork sandbox FUSE mount blocks `unlink` (only `rename` works), so
**Slice AAAAA-cont (2026-05-11)** moved them here — keeps them out of the
DRY audit + collection barrel + Payload registration. The follow-up
`scripts/slice-f-delete-dead-stubs.sh` (run by the maintainer locally)
will physically delete this folder.

Adding files here = "queued for permanent deletion in the next git push".
