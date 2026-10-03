---
name: pipeline
description: "Use when changing a deploy or release workflow — the ORDER is the law. Deploy must follow a green CI on the commit CI verified, build before migrating production, run the deterministic gates before shipping and the smoke after, and the release must assert tag equals version before publishing."
atomPath: "deploy/pipeline"
coordinate: "deploy/pipeline · 1/base · 7b87d85a"
contentUuid: "fc6b0a60-af53-566d-83c6-3baba738a5ae"
diamondUuid: "0644dd0b-bcbf-8e42-a8b7-aee141e60ebf"
uuid: "7b87d85a-b4b2-897a-8dca-e6f626220442"
horo: 1
typography:
  partition: deploy
  bondDegree: 26
standards: []
bindings: []
signatures:
  computationUuid: "ada1b214-dc31-82ca-a141-3fc4d3328bc2"
  stages:
    - stage: path
      stageUuid: "3f620d88-f740-835d-a6f1-b6461fa4c15c"
    - stage: trinity
      stageUuid: "da4565ba-2cf6-86d3-a4da-9c6cda260f08"
    - stage: boundary
      stageUuid: "c85c34da-ce5d-8546-b453-7e6f06f12ffe"
    - stage: links
      stageUuid: "eeab1148-339c-8c8f-a55d-1de228c7f1ff"
    - stage: horo
      stageUuid: "943ac05c-c667-802c-a63f-64db41f825b6"
    - stage: seal
      stageUuid: "945b2d71-b6b7-8cb8-8552-ae7f017bf013"
    - stage: uuid
      stageUuid: "2b1a07a1-e7c0-88da-9f78-96cb35fe5a37"
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

The verify job (`verify-live`) is now the **last job of `ci.yml`**: it `needs` every lane
that runs on a push, inherits their verdict (a red lane skips it, and an always-run
condition would be the race returning), and checks out the run's own commit — `github.sha` **is** the
commit CI verified, by construction of the run rather than by looking one up.

It was a separate workflow on `workflow_run` of CI, pinning `workflow_run.head_sha`, until
CodeQL `actions/cache-poisoning/poisonable-step` refused that shape: a `workflow_run` job
holds default-branch cache scope, and executing the triggering SHA under it is untrusted
code — nine alerts, one high, and disabling the cache cleared none. The job never needed
the privilege; it reads no secret. Same three laws, read off the shape that gives the same
guarantees without it: `waits-for-ci` is the `needs` list, `green-only` is the absence of an
always / not-cancelled / failure condition on the job, `verified-sha` is a checkout with no `ref:`.

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
