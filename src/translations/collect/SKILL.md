---
name: collect
description: "Use when porting every atom's SKILL.md into code — the collector that harvests translatable strings into a content-addressed per-folder table and the one canonical catalogue."
atomPath: "translations/collect"
coordinate: "translations/collect · 8/crest · 8838512d"
contentUuid: "3913eb96-a878-53a6-a211-3cf5b941fcb2"
diamondUuid: "87051fbc-4c92-8844-afb0-97058155fcae"
uuid: "8838512d-93e0-8321-a953-910de50157e5"
horo: 8
typography:
  partition: translations
  bondDegree: 19
standards:
  - "BCP-47 language tags · RFC 9562 §5.8 content-uuid (messaging-uuid)"
bindings: []
signatures:
  computationUuid: "79b8c542-a00b-8db0-bf73-7c72f182cd2f"
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
      stageUuid: "ee55598b-7e84-825f-8fc1-19ef81d762c6"
    - stage: seal
      stageUuid: "27d772bd-fd68-85a3-a361-b3baaf0ed505"
    - stage: uuid
      stageUuid: "65dd900d-5b3c-8412-8a2a-3d9fc35269a2"
version: 2
---
# collect

The collector for [[translations]] (the [[translation]] model · the [[message]] messaging-uuid): walks every `SKILL.md`, ports its translatable strings (name, description) into a content-addressed table — one canonical catalogue (the mass) plus a massless per-folder `translations.ts` projection. Computed, `--verify`-gated, idempotent.

Flatten · DRY · keep the gravity — the compute lives here, the per-folder files are its shadows.

**Law — [[law]]: the collector walks every SKILL.md and ports its translatable strings into the one content-addressed [[catalogue]] — computed, idempotent, --verify-gated; the per-folder files are its shadows ([[merge]]).**

@audit ported from the live tree, never hand-maintained
