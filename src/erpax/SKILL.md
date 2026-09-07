---
name: erpax
description: "Use when a consumer needs to FIND erpax rather than run it — the orientation face: the canonical repo, the sealed skill entry, the one law, and the tiered licence, shipped as @erpax/erpax."
atomPath: erpax
coordinate: "erpax · 1/base · 81d5366c"
contentUuid: "09dee045-792c-5924-a46c-8862332202d9"
diamondUuid: "112185ef-ceb6-8592-a37c-ed1aeb9e4db5"
uuid: "81d5366c-6ca3-84b0-9267-be61217bb398"
horo: 1
typography:
  partition: erpax
  bondDegree: 26
standards:
  - "RFC-3986"
bindings: []
signatures:
  computationUuid: "7949d43c-de7c-8c20-9e9e-7624676c33f8"
  stages:
    - stage: path
      stageUuid: "310fdc7c-997b-8b46-8844-78a6e6ab4850"
    - stage: trinity
      stageUuid: "dc7d79e3-08a5-88bb-8219-22f4c21c766e"
    - stage: boundary
      stageUuid: "685777c9-8ed3-8ec7-97ab-07e2ceecdff0"
    - stage: links
      stageUuid: "50d5ca2e-f395-89fb-acd7-afd4b002fcbf"
    - stage: horo
      stageUuid: "4c2196f5-15e3-874b-a021-dcdac87b082c"
    - stage: seal
      stageUuid: "78085b66-b263-878f-a974-bdecc79ac026"
    - stage: uuid
      stageUuid: "b97a917b-3556-8753-bf6d-73a07049f2d8"
version: 2
---
# erpax — the face that names the whole

The five providers each ship one capability: [[access]], [[accounting]], [[cloudflare]], [[commerce]], [[identity]]. This is the umbrella — what a reader installs to learn **where erpax is and how to enter it**, without cloning the corpus or booting the app.

The URL and the repo are the same orientation, so the wire is the entry: `wireFromRepoUrl` resolves the canonical repo to its skill entry **and the content-uuid that seals it**, so a consumer can verify the orientation they were handed is the one this corpus published. A url that is not erpax is REFUSED with a reason — an orientation pointing nowhere is worse than none.

It also states the two things a consumer is actually bound by: the one law, and the licence — **CC-BY-NC-ND-4.0, every path**, commercial terms via `license@erpax.com`. Stating them where the consumer meets them beats a LICENSE file they may never open.

**It ships no collection, no config, no app.** The licensed application stays private, and `scripts/assert-root-private.mjs` refuses any publish that would change that — this package is a face, not the thing.

**Honest boundary.** Installing it proves you can find and verify the corpus; it does not give you the corpus. The atoms are read from the repo, and the ND term means you may produce a modification but not share one.

Composes: [[skill]]/wire · [[erpax]]/api/surface · [[law]].
