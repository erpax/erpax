---
name: translator
description: "Use when translating a live event tail as it arrives — each realtime message reduced to its language-independent meaning so any EU-language subscriber reads the same thing zero-shot."
atomPath: "realtime/translator"
coordinate: "realtime/translator · 7/descent · a26c9226"
contentUuid: "0f5d1516-9821-516b-9cd9-ea824ec0ab6e"
diamondUuid: "a2c6d957-dbf5-89b7-81f8-287b5736f8c6"
uuid: "a26c9226-e554-8e71-ab38-4b3e00c9dc75"
horo: 7
typography:
  partition: realtime
  bondDegree: 134
standards:
  - "interlingua (language-independent meaning) over the realtime tail"
bindings: []
signatures:
  computationUuid: "1a6cb015-803b-8f08-ac1f-1bd923044f9b"
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
      stageUuid: "4aeb0b39-9fad-8e91-a27b-f1e2d078d627"
    - stage: seal
      stageUuid: "a0c22524-18d4-8971-af97-9d4228e5bcb3"
    - stage: uuid
      stageUuid: "f1de4937-05b2-8d36-a626-88594bfd3872"
version: 2
---
# realtime/translator — translate the live tail

The [[realtime]] facet of the [[translator]]: as events arrive in the live tail, each message is reduced to its **language-independent meaning** (the interlingua meaning-uuid), so a subscriber in any of the EU languages reads the same thing — zero-shot, no per-pair model. Two live tails carry the same meaning when their interlingua sequences match.

Matter-twin: `src/realtime/translator/index.ts` (`interlinguaTail` · `sameMeaningTail`). Composes [[realtime]] · [[translator]] · [[eu]] · [[language]].

@standard interlingua (language-independent meaning) over the realtime tail
