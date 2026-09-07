---
name: erpax
description: "Use when a consumer needs to FIND erpax rather than run it — the orientation face: the canonical repo, the sealed skill entry, the one law, and the tiered licence, shipped as @erpax/erpax."
atomPath: erpax
coordinate: "erpax · 2/share · 0d7d62b4"
contentUuid: "9a89802f-c27e-5acd-9571-f849d18ead69"
diamondUuid: "d8a2540b-797f-8617-8fd6-4d3338fcded2"
uuid: "0d7d62b4-44e6-8eda-a0c4-11f83369d618"
horo: 2
typography:
  partition: erpax
  bondDegree: 26
standards:
  - "RFC-3986"
bindings: []
signatures:
  computationUuid: "f8fd7a50-6cab-8f8b-9940-96e31aebd54e"
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
      stageUuid: "34a581ff-2b79-86b0-94f1-b5bbfa75c91a"
    - stage: seal
      stageUuid: "78085b66-b263-878f-a974-bdecc79ac026"
    - stage: uuid
      stageUuid: "977a20a1-8649-8132-b8b9-b17112227b15"
version: 2
---
# erpax — the face that names the whole

The five providers each ship one capability: [[access]], [[accounting]], [[cloudflare]], [[commerce]], [[identity]]. This is the umbrella — what a reader installs to learn **where erpax is and how to enter it**, without cloning the corpus or booting the app.

The URL and the repo are the same orientation, so the wire is the entry: `wireFromRepoUrl` resolves the canonical repo to its skill entry **and the content-uuid that seals it**, so a consumer can verify the orientation they were handed is the one this corpus published. A url that is not erpax is REFUSED with a reason — an orientation pointing nowhere is worse than none.

It also states the two things a consumer is actually bound by: the one law, and the licence — **CC-BY-NC-ND-4.0, every path**, commercial terms via `license@erpax.com`. Stating them where the consumer meets them beats a LICENSE file they may never open.

**It ships no collection, no config, no app.** The licensed application stays private, and `scripts/assert-root-private.mjs` refuses any publish that would change that — this package is a face, not the thing.

**Honest boundary.** Installing it proves you can find and verify the corpus; it does not give you the corpus. The atoms are read from the repo, and the ND term means you may produce a modification but not share one.

Composes: [[skill]]/wire · [[erpax]]/api/surface · [[law]].
