---
name: translator
description: "Use when translating a live event tail as it arrives — each realtime message reduced to its language-independent meaning so any EU-language subscriber reads the same thing zero-shot."
atomPath: "realtime/translator"
coordinate: "realtime/translator · 5/round · 368ef957"
contentUuid: "4f9d06b0-d965-53bf-a9ee-28a1de2ef65b"
diamondUuid: "18e90f3e-1584-84c2-8952-316f1864da25"
uuid: "368ef957-df42-8576-9fde-a94a6e756599"
horo: 5
typography:
  partition: realtime
  bondDegree: 109
standards:
  - "interlingua (language-independent meaning) over the realtime tail"
bindings: []
signatures:
  computationUuid: "0f325be3-0e23-87ff-baf9-e78b2adef31e"
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
      stageUuid: "bc9f8ffc-6ae9-86b6-92ee-c717705f939c"
    - stage: seal
      stageUuid: "a0c22524-18d4-8971-af97-9d4228e5bcb3"
    - stage: uuid
      stageUuid: "441d237d-48cc-8d99-a303-fa565361a886"
version: 2
---
# realtime/translator — translate the live tail

The [[realtime]] facet of the [[translator]]: as events arrive in the live tail, each message is reduced to its **language-independent meaning** (the interlingua meaning-uuid), so a subscriber in any of the EU languages reads the same thing — zero-shot, no per-pair model. Two live tails carry the same meaning when their interlingua sequences match.

Matter-twin: `src/realtime/translator/index.ts` (`interlinguaTail` · `sameMeaningTail`). Composes [[realtime]] · [[translator]] · [[eu]] · [[language]].

@standard interlingua (language-independent meaning) over the realtime tail
