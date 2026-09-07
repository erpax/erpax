---
name: provider
description: "Use when reasoning about provider — Each provider file registers itself at its own bottom. Importing this barrel runs those side-effects, so the set of available providers is the set of files present — there is no…"
atomPath: "self/closure/provider"
coordinate: "self/closure/provider · 4/weave · 284e0742"
contentUuid: "8eefb333-2b8d-5961-b831-8b177adf4238"
diamondUuid: "69e9393d-7498-873e-bc05-ce697c4f89d4"
uuid: "284e0742-9f96-831e-a2e7-d63ded86e37f"
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
  computationUuid: "1a24ba5e-00c1-8466-8cc8-2581d3961d07"
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
      stageUuid: "06adf0f5-0f12-8f5c-86a9-9d670c16df69"
    - stage: seal
      stageUuid: "764050b8-09db-8c3a-94cd-028384057fed"
    - stage: uuid
      stageUuid: "d1fffb51-6329-8a8a-9374-2486102fd648"
version: 2
---
# self/closure/provider — importing the barrel IS the registration

Each provider file registers itself at its own bottom. Importing this barrel runs those
side-effects, so the set of available providers is the set of files present — there is no second
list to keep in step with the directory.

**Honest boundary.** Side-effect registration means import ORDER is load-bearing; a provider that
runs code at module top level is exposed to the same initialisation hazard any import cycle carries.

Composes: [[law]].
