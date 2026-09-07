---
name: translator
description: "Use when translating a live event tail as it arrives — each realtime message reduced to its language-independent meaning so any EU-language subscriber reads the same thing zero-shot."
atomPath: "realtime/translator"
coordinate: "realtime/translator · 2/share · e2e79a5e"
contentUuid: "64fa048f-d534-5626-ad75-ee76eedd18ea"
diamondUuid: "da540486-ca9b-8a28-b4f4-7e782aa8da82"
uuid: "e2e79a5e-afcd-8181-af31-ccba108d0914"
horo: 2
typography:
  partition: realtime
  bondDegree: 134
standards:
  - "interlingua (language-independent meaning) over the realtime tail"
bindings: []
signatures:
  computationUuid: "294dfc71-f3f2-8443-b9d0-fa78db11e92d"
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
      stageUuid: "6f3d975c-c659-80c7-b7aa-3a676b4ef311"
    - stage: seal
      stageUuid: "a0c22524-18d4-8971-af97-9d4228e5bcb3"
    - stage: uuid
      stageUuid: "4aa2b14c-6d9b-8398-a25a-2ccd07e35bbc"
version: 2
---
# realtime/translator — translate the live tail

The [[realtime]] facet of the [[translator]]: as events arrive in the live tail, each message is reduced to its **language-independent meaning** (the interlingua meaning-uuid), so a subscriber in any of the EU languages reads the same thing — zero-shot, no per-pair model. Two live tails carry the same meaning when their interlingua sequences match.

Matter-twin: `src/realtime/translator/index.ts` (`interlinguaTail` · `sameMeaningTail`). Composes [[realtime]] · [[translator]] · [[eu]] · [[language]].

@standard interlingua (language-independent meaning) over the realtime tail
