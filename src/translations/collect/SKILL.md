---
name: collect
description: "Use when porting every atom's SKILL.md into code — the collector that harvests translatable strings into a content-addressed per-folder table and the one canonical catalogue."
atomPath: "translations/collect"
coordinate: "translations/collect · 1/base · f93bcace"
contentUuid: "e615599a-9140-550e-ad12-cda6ec02e6f7"
diamondUuid: "0ae21926-fb0d-8770-8056-db49995f1b41"
uuid: "f93bcace-5efb-8208-a2ae-aca0197fa70a"
horo: 1
typography:
  partition: translations
  bondDegree: 15
standards:
  - "BCP-47 language tags · RFC 9562 §5.8 content-uuid (messaging-uuid)"
bindings: []
signatures:
  computationUuid: "33c26d95-fb4a-8960-8db4-ba02051a9650"
  stages:
    - stage: path
      stageUuid: "5b044412-2eb6-8c78-be3f-ee3691ba4e7f"
    - stage: trinity
      stageUuid: "f9aaa9f1-a4e8-8923-aed3-94005dfe6ed3"
    - stage: boundary
      stageUuid: "d73e8b67-18ed-8efb-8ac5-4d14ab4b394b"
    - stage: links
      stageUuid: "456fc52b-1adc-8253-8bf5-7b8b9b98a019"
    - stage: horo
      stageUuid: "ef917c5e-7771-8d08-814f-b4a48303044a"
    - stage: seal
      stageUuid: "27d772bd-fd68-85a3-a361-b3baaf0ed505"
    - stage: uuid
      stageUuid: "82f438a4-ca0a-850a-aa96-640b0663dd83"
version: 2
---
# collect

The collector for [[translations]] (the [[translation]] model · the [[message]] messaging-uuid): walks every `SKILL.md`, ports its translatable strings (name, description) into a content-addressed table — one canonical catalogue (the mass) plus a massless per-folder `translations.ts` projection. Computed, `--verify`-gated, idempotent.

Flatten · DRY · keep the gravity — the compute lives here, the per-folder files are its shadows.

**Law — [[law]]: the collector walks every SKILL.md and ports its translatable strings into the one content-addressed catalogue — computed, idempotent, --verify-gated; the per-folder files are its shadows ([[merge]]).**

@audit ported from the live tree, never hand-maintained
