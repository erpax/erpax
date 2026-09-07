---
name: provider
description: "Use when reasoning about provider — Each provider file registers itself at its own bottom. Importing this barrel runs those side-effects, so the set of available providers is the set of files present — there is no…"
atomPath: "self/closure/provider"
coordinate: "self/closure/provider · 1/base · c22f11c6"
contentUuid: "4e8e94d4-9931-54cc-871a-53c3af51f988"
diamondUuid: "f88e5819-d1dc-8eaa-97c1-0b25fbfea701"
uuid: "c22f11c6-5809-8c70-a5f6-2b5ec8d9ab51"
horo: 1
typography:
  partition: self
  bondDegree: 25
standards:
  - "EU-2002/58"
  - "W3C-PROV-O"
  - eIDAS
bindings: []
signatures:
  computationUuid: "95aadbd7-4476-8884-98a0-aa72506d636a"
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
      stageUuid: "c3adfea2-c90a-81c6-a61b-846e0f65a68d"
    - stage: seal
      stageUuid: "764050b8-09db-8c3a-94cd-028384057fed"
    - stage: uuid
      stageUuid: "2454383d-91d0-8cb2-938c-8c2ef170a468"
version: 2
---
# self/closure/provider — importing the barrel IS the registration

Each provider file registers itself at its own bottom. Importing this barrel runs those
side-effects, so the set of available providers is the set of files present — there is no second
list to keep in step with the directory.

**Honest boundary.** Side-effect registration means import ORDER is load-bearing; a provider that
runs code at module top level is exposed to the same initialisation hazard any import cycle carries.

Composes: [[law]].
