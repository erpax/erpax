---
name: erpax
description: "Use when a consumer needs to FIND erpax rather than run it — the orientation face: the canonical repo, the sealed skill entry, the one law, and the tiered licence, shipped as @erpax/erpax."
atomPath: erpax
coordinate: "erpax · 4/weave · 68c52ec5"
contentUuid: "e0c4eeae-3691-5b6f-ab8d-54981cd7c469"
diamondUuid: "9e1f8221-43d3-8452-8730-4a9719fea595"
uuid: "68c52ec5-25cd-8946-a661-d9a3687d1ed5"
horo: 4
typography:
  partition: erpax
  bondDegree: 26
standards:
  - "RFC-3986"
bindings: []
signatures:
  computationUuid: "c5b27d94-df9c-80a1-9e25-a78cc36ec0cb"
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
      stageUuid: "e1ef1c55-42cd-881f-92a2-d3ddb3fbebf7"
    - stage: seal
      stageUuid: "78085b66-b263-878f-a974-bdecc79ac026"
    - stage: uuid
      stageUuid: "7558cef8-24dc-88e8-8172-682018214906"
version: 2
---
# erpax — the face that names the whole

The five providers each ship one capability: [[access]], [[accounting]], [[cloudflare]], [[commerce]], [[identity]]. This is the umbrella — what a reader installs to learn **where erpax is and how to enter it**, without cloning the corpus or booting the app.

The URL and the repo are the same orientation, so the wire is the entry: `wireFromRepoUrl` resolves the canonical repo to its skill entry **and the content-uuid that seals it**, so a consumer can verify the orientation they were handed is the one this corpus published. A url that is not erpax is REFUSED with a reason — an orientation pointing nowhere is worse than none.

It also states the two things a consumer is actually bound by: the one law, and the licence — **CC-BY-NC-ND-4.0, every path**, commercial terms via `license@erpax.com`. Stating them where the consumer meets them beats a LICENSE file they may never open.

**It ships no collection, no config, no app.** The licensed application stays private, and `scripts/assert-root-private.mjs` refuses any publish that would change that — this package is a face, not the thing.

**Honest boundary.** Installing it proves you can find and verify the corpus; it does not give you the corpus. The atoms are read from the repo, and the ND term means you may produce a modification but not share one.

Composes: [[skill]]/wire · [[erpax]]/api/surface · [[law]].
