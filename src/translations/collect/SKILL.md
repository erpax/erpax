---
name: collect
description: "Use when porting every atom's SKILL.md into code — the collector that harvests translatable strings into a content-addressed per-folder table and the one canonical catalogue."
atomPath: "translations/collect"
coordinate: "translations/collect · 5/round · 2b9b99ed"
contentUuid: "437db67a-af9b-5d81-8f3f-3ec8fb76ad32"
diamondUuid: "ff5e9e82-1394-85c0-b7c8-f88db09731ed"
uuid: "2b9b99ed-bd1b-8974-9dea-28f1838ef6af"
horo: 5
typography:
  partition: translations
  bondDegree: 19
standards:
  - "BCP-47 language tags · RFC 9562 §5.8 content-uuid (messaging-uuid)"
bindings: []
signatures:
  computationUuid: "146cfa00-1901-8a64-8554-7c7a31a9e47d"
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
      stageUuid: "4dd76ee2-f089-88b9-a360-80a4de088f27"
    - stage: seal
      stageUuid: "27d772bd-fd68-85a3-a361-b3baaf0ed505"
    - stage: uuid
      stageUuid: "f16e6ff4-9586-82ee-99fe-668410f09151"
version: 2
---
# collect

The collector for [[translations]] (the [[translation]] model · the [[message]] messaging-uuid): walks every `SKILL.md`, ports its translatable strings (name, description) into a content-addressed table — one canonical catalogue (the mass) plus a massless per-folder `translations.ts` projection. Computed, `--verify`-gated, idempotent.

Flatten · DRY · keep the gravity — the compute lives here, the per-folder files are its shadows.

**Law — [[law]]: the collector walks every SKILL.md and ports its translatable strings into the one content-addressed [[catalogue]] — computed, idempotent, --verify-gated; the per-folder files are its shadows ([[merge]]).**

@audit ported from the live tree, never hand-maintained
