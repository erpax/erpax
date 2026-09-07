---
name: deploy
description: "Use when deploying a Payload app to production or fixing build/migration/env issues — required secrets, running migrations vs dev push, building without a DB connection, file storage, or Cloudflare/Next/Docker specifics."
atomPath: deploy
coordinate: "deploy · 1/base · 200b8ac8"
contentUuid: "cb4b0827-3905-5d78-9818-413edc44d754"
diamondUuid: "35ca0a6c-5de5-8f1e-b7ae-13e62134363d"
uuid: "200b8ac8-d518-8663-9c89-b5b8549dfe00"
horo: 1
typography:
  partition: deploy
  bondDegree: 99
standards: []
bindings: []
signatures:
  computationUuid: "fda3ec49-5b37-8497-a79c-4e4a301ca205"
  stages:
    - stage: path
      stageUuid: "b2dec97d-58be-8973-929d-1384ec4ddcf8"
    - stage: trinity
      stageUuid: "d1605ecd-c2ca-8852-a285-06f33468fde4"
    - stage: boundary
      stageUuid: "a6be035f-89e5-84b6-abe3-d9b2b5510ee9"
    - stage: links
      stageUuid: "d3db1d99-7bf0-8094-9885-10212d437084"
    - stage: horo
      stageUuid: "c4685062-f130-8247-a35c-22b05539d6ca"
    - stage: seal
      stageUuid: "846600a4-d368-8e6e-bb3d-2e82c706994c"
    - stage: uuid
      stageUuid: "1ea6358e-8e56-8d97-932b-9e5df866aee1"
version: 2
---
# deploy — Payload production deployment

Source: payloadcms.com/docs/production/deployment + /building-without-a-db-connection.

## Required env
- `PAYLOAD_SECRET` — long, unguessable (security-critical).
- `DATABASE_URL` / adapter connection string.

## Migrations (NOT dev push in prod)
- Run `payload migrate` in production; do NOT rely on dev schema-push.
- Migrations are Payload-generated — create with `payload migrate:create` (no hand-written DB backward-compat). Disable dev push in prod (e.g. gated by `NODE_ENV`).

## Building WITHOUT a live DB connection
The DB requirement comes from Next SSG + Payload Local API, not Payload itself. Two options:
1. Two-stage Next build: `next build --experimental-build-mode compile` then `... generate` (compile needs no DB; `NEXT_PUBLIC_*` are undefined on client during compile).
2. Per-route `export const dynamic = 'force-dynamic'` (disables static optimization → slower site).

## File storage
Never use ephemeral filesystems. Use a cloud storage adapter (S3, R2, Azure, GCS, Vercel/Uploadthing Blob).

## Next / Docker
- `next start` in prod, never `next dev`.
- `output: 'standalone'` for Docker; `NODE_ENV=production`; serve with `HOSTNAME=0.0.0.0 node server.js`.

Composes: [[config]] · [[database]] · [[upload]] · [[bindings]] · [[harden]].

## Harmonized — the gate-green order is the consonant one

Deployment is an ordered breath: **gate → migrate → build → push**. The order is the [[gate]]-green law — only a gate-green tree may collapse into [[reality]], so the gate comes first; then migrate (the schema), build (the OpenNext → Worker artifact), push (ship — the [[stack]] goes live). `harmonized` admits ONLY this order; any other forges reality — a build before its gate, a push before its migration.

Mapped onto the [[rodin]] doubling band `1·2·4·8`, `deployHarmony` reads the band's actual [[harmony]] — and honestly it is **mixed** (the rising doubling is no perfect chord: `1:2` is perfect but `1:4` is dissonant — the consonance math says so, not me). So the harmony that governs a deploy is its **order**, not a pretty interval: the gate-green sequence is the *lawful* one, computed and gated, while the band's musical consonance is reported as it truly is.

Matter-twin: `src/deploy/index.ts` (`DEPLOY` · `deployBand` · `deployHarmony` · `harmonized`). Composes [[harmony]] · [[rodin]] · [[stack]] · [[gate]] · [[reality]].

**Law — [[law]]: the deploy is harmonized only in the one true order — gate · migrate · build · push (the doubling band 1·2·4·8). The gate-green order is the *lawful* one; any other forges reality. The band's musical consonance is computed honestly (the doubling is no perfect chord) — the harmony that ships is the order, and out of order ships a lie.**

## Common mistakes
- Relying on dev push instead of committed migrations.
- Local-disk uploads on ephemeral hosts (data loss).
- Build failing in CI because it tries to reach the DB — use experimental-build-mode compile/generate.
