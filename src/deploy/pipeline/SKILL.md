---
name: pipeline
description: "Use when changing a deploy or release workflow — the ORDER is the law. Deploy must follow a green CI on the commit CI verified, build before migrating production, run the deterministic gates before shipping and the smoke after, and the release must assert tag equals version before publishing."
atomPath: "deploy/pipeline"
coordinate: "deploy/pipeline · 2/share · 20ba5463"
contentUuid: "276d8d70-99ed-52f3-8b51-3d291ff24418"
diamondUuid: "badb9d09-3d2a-8ea5-aa59-c7f5fd9453c7"
uuid: "20ba5463-35a3-8e9e-885b-73eeac61418a"
horo: 2
typography:
  partition: deploy
  bondDegree: 26
standards: []
bindings: []
signatures:
  computationUuid: "2aefe5eb-6e6e-80a6-9777-9cf26e7fe01e"
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
      stageUuid: "943132fe-6480-89c9-8e90-87a65230c551"
    - stage: seal
      stageUuid: "945b2d71-b6b7-8cb8-8552-ae7f017bf013"
    - stage: uuid
      stageUuid: "27363993-5393-85f4-9133-dffebd0d7446"
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
