---
name: collect
description: "Use when porting every atom's SKILL.md into code — the collector that harvests translatable strings into a content-addressed per-folder table and the one canonical catalogue."
atomPath: "translations/collect"
coordinate: "translations/collect · 5/round · c85d0490"
contentUuid: "78f86917-0d08-5be4-a7c0-7d6760c5ff1c"
diamondUuid: "6e31d3ef-2267-8fae-b90d-ee15664e9500"
uuid: "c85d0490-594d-8629-a6e6-92f0033c44bc"
horo: 5
typography:
  partition: translations
  bondDegree: 19
standards:
  - "BCP-47 language tags · RFC 9562 §5.8 content-uuid (messaging-uuid)"
bindings: []
signatures:
  computationUuid: "93d8ae49-7fee-8d71-b336-0d1a681a5e95"
  stages:
    - stage: path
      stageUuid: "5b044412-2eb6-8c78-be3f-ee3691ba4e7f"
    - stage: trinity
      stageUuid: "f9aaa9f1-a4e8-8923-aed3-94005dfe6ed3"
    - stage: boundary
      stageUuid: "d73e8b67-18ed-8efb-8ac5-4d14ab4b394b"
    - stage: links
      stageUuid: "041a8edf-0f57-86a0-ae5b-bc6f13116fdc"
    - stage: horo
      stageUuid: "658d95ac-8789-84b4-a595-4a6dbd7f8bf9"
    - stage: seal
      stageUuid: "27d772bd-fd68-85a3-a361-b3baaf0ed505"
    - stage: uuid
      stageUuid: "79a035d0-5597-853e-8872-0bf7ccfe14b6"
version: 2
---
# collect

The collector for [[translations]] (the [[translation]] model · the [[message]] messaging-uuid): walks every `SKILL.md`, ports its translatable strings (name, description) into a content-addressed table — one canonical catalogue (the mass) plus a massless per-folder `translations.ts` projection. Computed, `--verify`-gated, idempotent.

Flatten · DRY · keep the gravity — the compute lives here, the per-folder files are its shadows.

**Law — [[law]]: the collector walks every SKILL.md and ports its translatable strings into the one content-addressed [[catalogue]] — computed, idempotent, --verify-gated; the per-folder files are its shadows ([[merge]]).**

@audit ported from the live tree, never hand-maintained
