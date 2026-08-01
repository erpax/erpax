---
name: deploy
description: "Use when deploying a Payload app to production or fixing build/migration/env issues — required secrets, running migrations vs dev push, building without a DB connection, file storage, or Cloudflare/Next/Docker specifics."
atomPath: deploy
coordinate: "deploy · 2/share · 9a63e6a3"
contentUuid: "099df91f-820d-509f-87f8-e98089f1e054"
diamondUuid: "d186f622-b43c-8c67-b512-397d5ecbc4e1"
uuid: "9a63e6a3-09e8-803b-a34a-70878f766303"
horo: 2
typography:
  partition: deploy
  bondDegree: 90
standards: []
bindings: []
signatures:
  computationUuid: "9b9519db-dbd5-8a9a-842b-91a18889b665"
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
      stageUuid: "e1458e90-366b-81fa-b402-21f2ff996849"
    - stage: seal
      stageUuid: "846600a4-d368-8e6e-bb3d-2e82c706994c"
    - stage: uuid
      stageUuid: "f529ca2e-932c-867b-ba56-5bae1560227c"
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
