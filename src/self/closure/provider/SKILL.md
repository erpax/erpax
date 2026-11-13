---
name: provider
description: "Use when reasoning about provider — Each provider file registers itself at its own bottom. Importing this barrel runs those side-effects, so the set of available providers is the set of files present — there is no…"
atomPath: "self/closure/provider"
coordinate: "self/closure/provider · 4/weave · bbb499a8"
contentUuid: "79e4f29a-8e31-59c9-a198-dea99987a225"
diamondUuid: "8e9d656d-3044-80c8-96c6-5f7cbc75ae92"
uuid: "bbb499a8-f07c-853b-adee-4e0a3d072aff"
horo: 4
typography:
  partition: self
  bondDegree: 21
standards:
  - "EU-2002/58"
  - "EU-2016/679"
  - eIDAS
bindings: []
signatures:
  computationUuid: "273fd0ba-ba7c-804c-aeed-6e8480c5edc2"
  stages:
    - stage: path
      stageUuid: "e1de80df-d8c6-8fde-ba0e-5939f36db404"
    - stage: trinity
      stageUuid: "1314554a-ba74-85a9-abad-9ead6446d718"
    - stage: boundary
      stageUuid: "31d3e14c-7011-886d-9cec-0ef8460f6784"
    - stage: links
      stageUuid: "94ee3acd-0268-8b4e-a609-da04d086dd46"
    - stage: horo
      stageUuid: "ef749fa7-2534-8850-9f5d-62effc0aef5b"
    - stage: seal
      stageUuid: "6b339393-11c8-8df8-8d5c-631c4200c8b5"
    - stage: uuid
      stageUuid: "b12e8677-150f-8288-acaf-e08e94a12217"
version: 2
---
# self/closure/provider — importing the barrel IS the registration

Each provider file registers itself at its own bottom. Importing this barrel runs those
side-effects, so the set of available providers is the set of files present — there is no second
list to keep in step with the directory.

**Honest boundary.** Side-effect registration means import ORDER is load-bearing; a provider that
runs code at module top level is exposed to the same initialisation hazard any import cycle carries.

Composes: [[law]].
