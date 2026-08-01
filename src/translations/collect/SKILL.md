---
name: collect
description: "Use when porting every atom's SKILL.md into code — the collector that harvests translatable strings into a content-addressed per-folder table and the one canonical catalogue."
atomPath: "translations/collect"
coordinate: "translations/collect · 8/crest · ae260807"
contentUuid: "bb7f3d52-2191-50c8-86f6-f6301ab9cbbc"
diamondUuid: "ef36d8de-e060-8675-9978-6c5614f987fc"
uuid: "ae260807-7a44-8a1c-bcbf-abf73e5e9c9f"
horo: 8
typography:
  partition: translations
  bondDegree: 19
standards:
  - "BCP-47 language tags · RFC 9562 §5.8 content-uuid (messaging-uuid)"
bindings: []
signatures:
  computationUuid: "5ddaa676-f227-8e5e-8023-e78e17833424"
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
      stageUuid: "824a4703-41b9-8afb-944d-30a49545c61b"
    - stage: seal
      stageUuid: "27d772bd-fd68-85a3-a361-b3baaf0ed505"
    - stage: uuid
      stageUuid: "7bbcb6a9-a529-831d-bdbc-51f139a782aa"
version: 2
---
# collect

The collector for [[translations]] (the [[translation]] model · the [[message]] messaging-uuid): walks every `SKILL.md`, ports its translatable strings (name, description) into a content-addressed table — one canonical catalogue (the mass) plus a massless per-folder `translations.ts` projection. Computed, `--verify`-gated, idempotent.

Flatten · DRY · keep the gravity — the compute lives here, the per-folder files are its shadows.

**Law — [[law]]: the collector walks every SKILL.md and ports its translatable strings into the one content-addressed [[catalogue]] — computed, idempotent, --verify-gated; the per-folder files are its shadows ([[merge]]).**

@audit ported from the live tree, never hand-maintained
