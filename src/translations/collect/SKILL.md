---
name: collect
description: "Use when porting every atom's SKILL.md into code — the collector that harvests translatable strings into a content-addressed per-folder table and the one canonical catalogue."
atomPath: translations/collect
coordinate: translations/collect · 5/round · 24068eb2
contentUuid: "9596a059-aaa7-5168-b801-da1550d3ff2b"
diamondUuid: "e215161c-bf0e-81f1-b5e1-776b70eca4cd"
uuid: "24068eb2-1961-875d-9f88-9147982aebb1"
horo: 5
bonds:
  in:
    - catalogue
    - law
    - merge
    - message
    - translation
    - translations
  out:
    - catalogue
    - law
    - merge
    - message
    - translation
    - translations
typography:
  partition: translations
  bondDegree: 19
  neighbors: []
standards:
  - "BCP-47 language tags · RFC 9562 §5.8 content-uuid (messaging-uuid)"
  - "aura gap parity — a non-atom word here is a mint-queue word there"
  - "ported from the live tree, never hand-maintained"
bindings: []
neighbors:
  wikilink:
    - catalogue
    - law
    - merge
    - message
    - translation
    - translations
  matrix:
    - catalogue
    - law
    - merge
    - message
    - translation
    - translations
  backlinks:
    - catalogue
    - law
    - merge
    - message
    - translation
    - translations
signatures:
  computationUuid: "0da4467a-f4ea-83d2-8e43-d366caa926f6"
  stages:
    - stage: path
      stageUuid: "5b044412-2eb6-8c78-be3f-ee3691ba4e7f"
    - stage: trinity
      stageUuid: "f9aaa9f1-a4e8-8923-aed3-94005dfe6ed3"
    - stage: boundary
      stageUuid: "b18abb18-25c3-8cf2-97b2-b1bff61462a0"
    - stage: links
      stageUuid: "041a8edf-0f57-86a0-ae5b-bc6f13116fdc"
    - stage: horo
      stageUuid: "4b938928-82aa-8777-bc28-f7df5a134bb1"
    - stage: seal
      stageUuid: "d0a4c0c2-a274-89ae-b570-17aa7756a79f"
    - stage: uuid
      stageUuid: "31dc454d-f7e1-817b-a3d1-4bb0af9dc7a4"
version: 2
---
# collect

The collector for [[translations]] (the [[translation]] model · the [[message]] messaging-uuid): walks every `SKILL.md`, ports its translatable strings (name, description) into a content-addressed table — one canonical catalogue (the mass) plus a massless per-folder `translations.ts` projection. Computed, `--verify`-gated, idempotent.

Flatten · DRY · keep the gravity — the compute lives here, the per-folder files are its shadows.

**Law — [[law]]: the collector walks every SKILL.md and ports its translatable strings into the one content-addressed [[catalogue]] — computed, idempotent, --verify-gated; the per-folder files are its shadows ([[merge]]).**

@audit ported from the live tree, never hand-maintained
