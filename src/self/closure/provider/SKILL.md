---
name: provider
description: "Use when reasoning about provider — Each provider file registers itself at its own bottom. Importing this barrel runs those side-effects, so the set of available providers is the set of files present — there is no…"
atomPath: "self/closure/provider"
coordinate: "self/closure/provider · 4/weave · e511dab0"
contentUuid: "58c3a7f2-362d-5bb0-ab6d-769c2ee43820"
diamondUuid: "6b2de7fe-57e0-8ae6-a4b8-2ee4fa2fbd01"
uuid: "e511dab0-03d6-8728-a827-67e55570c985"
horo: 4
typography:
  partition: self
  bondDegree: 25
standards:
  - "EU-2002/58"
  - "W3C-PROV-O"
  - eIDAS
bindings: []
signatures:
  computationUuid: "556c5287-e978-8ffc-89dc-ab38aba0de0c"
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
      stageUuid: "cf71ee83-4d7d-88dc-bfda-fd9c17dd10c4"
    - stage: seal
      stageUuid: "764050b8-09db-8c3a-94cd-028384057fed"
    - stage: uuid
      stageUuid: "35ec5ba4-b9ab-84c5-aa9e-57a141152762"
version: 2
---
# self/closure/provider — importing the barrel IS the registration

Each provider file registers itself at its own bottom. Importing this barrel runs those
side-effects, so the set of available providers is the set of files present — there is no second
list to keep in step with the directory.

**Honest boundary.** Side-effect registration means import ORDER is load-bearing; a provider that
runs code at module top level is exposed to the same initialisation hazard any import cycle carries.

Composes: [[law]].
