---
name: pipeline
description: "Use when changing a deploy or release workflow — the ORDER is the law. Deploy must follow a green CI on the commit CI verified, build before migrating production, run the deterministic gates before shipping and the smoke after, and the release must assert tag equals version before publishing."
atomPath: "deploy/pipeline"
coordinate: "deploy/pipeline · 8/crest · f94e5c2c"
contentUuid: "b8691f0e-cb6e-5fd2-88e4-832a54113060"
diamondUuid: "1822b81f-8275-88a1-9899-86d98d23164e"
uuid: "f94e5c2c-2299-8562-9c81-50abb7895010"
horo: 8
typography:
  partition: deploy
  bondDegree: 26
standards: []
bindings: []
signatures:
  computationUuid: "fe8c852a-dd97-8e46-a775-90e3caa89e64"
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
      stageUuid: "21ad691a-1668-8fcb-82fb-6691a114bee8"
    - stage: seal
      stageUuid: "945b2d71-b6b7-8cb8-8552-ae7f017bf013"
    - stage: uuid
      stageUuid: "7ca8093f-9931-866d-8e64-1da3f0126831"
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
