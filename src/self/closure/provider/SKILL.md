---
name: provider
description: "Use when reasoning about provider — Each provider file registers itself at its own bottom. Importing this barrel runs those side-effects, so the set of available providers is the set of files present — there is no…"
atomPath: "self/closure/provider"
coordinate: "self/closure/provider · 5/round · 8669c7c3"
contentUuid: "0a2a3425-b82b-5af5-84e3-2507838a26eb"
diamondUuid: "353d82d8-7a38-8111-907f-399195420d89"
uuid: "8669c7c3-2970-84fa-804b-5e54c71c57da"
horo: 5
typography:
  partition: self
  bondDegree: 25
standards:
  - "EU-2002/58"
  - "W3C-PROV-O"
  - eIDAS
bindings: []
signatures:
  computationUuid: "b8c433cb-42fc-8134-b7ea-9e93bd60c033"
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
      stageUuid: "d0e810bb-c79b-86a6-a684-8fd898761d37"
    - stage: seal
      stageUuid: "764050b8-09db-8c3a-94cd-028384057fed"
    - stage: uuid
      stageUuid: "952b67a8-ed55-8410-9d65-2a87dc56536b"
version: 2
---
# self/closure/provider — importing the barrel IS the registration

Each provider file registers itself at its own bottom. Importing this barrel runs those
side-effects, so the set of available providers is the set of files present — there is no second
list to keep in step with the directory.

**Honest boundary.** Side-effect registration means import ORDER is load-bearing; a provider that
runs code at module top level is exposed to the same initialisation hazard any import cycle carries.

Composes: [[law]].
