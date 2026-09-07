---
name: provider
description: "Use when reasoning about provider — Each provider file registers itself at its own bottom. Importing this barrel runs those side-effects, so the set of available providers is the set of files present — there is no…"
atomPath: "self/closure/provider"
coordinate: "self/closure/provider · 5/round · 51aeab5e"
contentUuid: "1610c6d7-a503-5f96-84d0-71153391c555"
diamondUuid: "75ee57d6-439a-84eb-9a20-83bccc0f4cf5"
uuid: "51aeab5e-9446-8944-bc4e-c3572a17729f"
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
  computationUuid: "8ac0d772-f8c2-8639-9a97-87b63931bcbe"
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
      stageUuid: "f37ab815-d70f-8718-8c68-ca214b98ffc6"
    - stage: seal
      stageUuid: "764050b8-09db-8c3a-94cd-028384057fed"
    - stage: uuid
      stageUuid: "19149550-9143-8296-871b-67ca42e4b07e"
version: 2
---
# self/closure/provider — importing the barrel IS the registration

Each provider file registers itself at its own bottom. Importing this barrel runs those
side-effects, so the set of available providers is the set of files present — there is no second
list to keep in step with the directory.

**Honest boundary.** Side-effect registration means import ORDER is load-bearing; a provider that
runs code at module top level is exposed to the same initialisation hazard any import cycle carries.

Composes: [[law]].
