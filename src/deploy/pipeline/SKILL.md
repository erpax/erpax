---
name: pipeline
description: "Use when changing a deploy or release workflow — the ORDER is the law. Deploy must follow a green CI on the commit CI verified, build before migrating production, run the deterministic gates before shipping and the smoke after, and the release must assert tag equals version before publishing."
atomPath: "deploy/pipeline"
coordinate: "deploy/pipeline · 4/weave · 57dea435"
contentUuid: "79d169ae-2611-583b-bb9d-2833f21658d7"
diamondUuid: "3ba658e6-f7a4-8587-8b50-9dd2a69f12b0"
uuid: "57dea435-76cc-8190-9b83-d308d2315bfc"
horo: 4
typography:
  partition: deploy
  bondDegree: 26
standards: []
bindings: []
signatures:
  computationUuid: "b6dc9a3e-3cf4-8a7a-bf22-6f214f4746cc"
  stages:
    - stage: path
      stageUuid: "3f620d88-f740-835d-a6f1-b6461fa4c15c"
    - stage: trinity
      stageUuid: "da4565ba-2cf6-86d3-a4da-9c6cda260f08"
    - stage: boundary
      stageUuid: "c85c34da-ce5d-8546-b453-7e6f06f12ffe"
    - stage: links
      stageUuid: "d1aae0f3-4f83-896c-a86a-7b6477b3cb85"
    - stage: horo
      stageUuid: "e4faba9f-3399-8a6c-aae2-21ff35298169"
    - stage: seal
      stageUuid: "945b2d71-b6b7-8cb8-8552-ae7f017bf013"
    - stage: uuid
      stageUuid: "8e0ca765-97cf-89fa-8b33-96c50b697803"
version: 2
---
# pipeline — the order is the law

A workflow correct today gets reordered tomorrow by someone fixing an unrelated step.
Each law here exists because the opposite ordering **shipped**.

## The race

`ci.yml` and `cloudflare.yml` both triggered on `push: main`, independently. Nothing
connected them, so they ran in parallel and **a commit whose tests were failing
deployed anyway**. CI going red afterwards changed nothing — the Worker was already
live.

Deploy now triggers on `workflow_run` of CI, refuses any conclusion but `success`, and
checks out `workflow_run.head_sha` — **the commit CI actually verified**, not whatever
`main` points at by then. Without that last part a push landing mid-run would deploy
code nothing tested.

## Migrate after build, never before

`Migrate remote D1` ran **before** the build. A build that failed therefore left the
**production schema migrated for a Worker that never shipped** — schema ahead of code,
and nothing to roll it back. Build first: a compile failure now costs nothing.

## Weigh what will ship, before production is touched

A Turbopack build bundled every production fold — **23.4 MB gz** against Cloudflare's
**10 MiB** ceiling — while [[deploy]]/fold read green, because nothing between the build and
the upload packed the Worker or read it. The deploy job now runs `wrangler deploy --dry-run`
and `pnpm erpax deploy fold` after the build and **before the migration**: a Worker that
cannot ship is refused while production is still untouched. Matched on what the step runs,
and the pack must come before the weigh, or the weigh reads no bundle.

## Gates in front, smoke behind

The contract gate and boot gate are deterministic — they cannot flake on someone
else's uptime — so they belong **before** the deploy. The UI smoke tests the deployed
Worker, so it can only run **after**. A gate after the deploy protects nothing, and a
smoke before it tests nothing.

## The release

`publish-packages` must assert the tag matches the package version **before**
`npm publish`, or a mistyped tag ships a version nobody asked for under a name that
cannot be unpublished.

**Honest boundary.** This proves the STEPS ARE ORDERED, never that any step works — a
perfectly ordered pipeline of broken gates passes. It also reads only the two
workflows it names; a third that deploys by another route is invisible to it.

**Law — [[law]]: a deploy follows a green CI on the commit CI verified, builds before
it migrates, gates before it ships and smokes after. Order is not style here — every
inversion of it has a blast radius in production.**

Composes: [[deploy]] · [[outward]]/gate · [[run]]/load · [[law]].
