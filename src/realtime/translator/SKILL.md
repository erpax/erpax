---
name: translator
description: "Use when translating a live event tail as it arrives — each realtime message reduced to its language-independent meaning so any EU-language subscriber reads the same thing zero-shot."
atomPath: "realtime/translator"
coordinate: "realtime/translator · 2/share · 4d8b91a9"
contentUuid: "62b400df-f206-5253-8dfb-0d35d81a5dc3"
diamondUuid: "2532f880-0dc7-8232-9412-90a5cab5c501"
uuid: "4d8b91a9-0908-8022-91de-7452e2c82bf4"
horo: 2
typography:
  partition: realtime
  bondDegree: 134
standards:
  - "interlingua (language-independent meaning) over the realtime tail"
bindings: []
signatures:
  computationUuid: "11dfa39d-3926-8843-9e03-681432c1a856"
  stages:
    - stage: path
      stageUuid: "825a5814-e7ec-8bd3-97ff-71f053eccdc0"
    - stage: trinity
      stageUuid: "427bd58f-702b-8f35-8aa7-b470708a44c0"
    - stage: boundary
      stageUuid: "0a31109f-8923-8ab8-9fe1-02dde1f88693"
    - stage: links
      stageUuid: "bca216b8-8fd3-89cb-aeeb-e94bad36f3ea"
    - stage: horo
      stageUuid: "65e12e36-0a62-887a-8378-55b8e65afec9"
    - stage: seal
      stageUuid: "a0c22524-18d4-8971-af97-9d4228e5bcb3"
    - stage: uuid
      stageUuid: "67d5c24d-197d-860e-9e82-a3fb42f68d3c"
version: 2
---
# realtime/translator — translate the live tail

The [[realtime]] facet of the [[translator]]: as events arrive in the live tail, each message is reduced to its **language-independent meaning** (the interlingua meaning-uuid), so a subscriber in any of the EU languages reads the same thing — zero-shot, no per-pair model. Two live tails carry the same meaning when their interlingua sequences match.

Matter-twin: `src/realtime/translator/index.ts` (`interlinguaTail` · `sameMeaningTail`). Composes [[realtime]] · [[translator]] · [[eu]] · [[language]].

@standard interlingua (language-independent meaning) over the realtime tail
