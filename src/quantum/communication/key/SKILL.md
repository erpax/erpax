---
name: key
description: "Use when reasoning about quantum key distribution (BB84 / E91) on the matrix — two peers derive a shared secret from their symmetric entangled binding so both compute the same key order-independently, and eavesdropping is detectable because no-cloning makes an intercept-resend yield a different content-uuid."
atomPath: quantum/communication/key
coordinate: quantum/communication/key · 8/crest · 36a8e389
contentUuid: "e4bb15f1-6336-5f72-be20-a94ba4f942e8"
diamondUuid: "52f8ad96-c922-8a39-ad70-d2fcfa071f65"
uuid: "36a8e389-0519-8e54-a3cb-39d28c2efdb7"
horo: 8
bonds:
  in:
    - ch
    - collapse
    - communication
    - law
    - merge
    - musical
    - sti
  out:
    - ch
    - collapse
    - law
    - merge
    - musical
    - sti
typography:
  partition: quantum
  bondDegree: 28
  neighbors: []
standards:
  - "BB84 (Bennett–Brassard 1984) / E91 (Ekert 1991); no-cloning (Wootters–Zurek 1982)"
bindings: []
neighbors:
  wikilink:
    - cloning
    - communication
    - entanglement
    - law
    - merge
    - quantum
    - tamper
    - uuid
  matrix:
    - ch
    - collapse
    - law
    - merge
    - musical
    - sti
  backlinks:
    - ch
    - collapse
    - law
    - merge
    - musical
    - sti
signatures:
  computationUuid: "c43b652a-0fe2-8cc3-a706-f1c75f778396"
  stages:
    - stage: path
      stageUuid: "37104ae8-5b2a-8798-951f-906ce4837c21"
    - stage: trinity
      stageUuid: "10dfaa71-cab8-870c-84bc-980d18182581"
    - stage: boundary
      stageUuid: "e5f86477-52a8-8158-8bdb-64083870b97a"
    - stage: links
      stageUuid: "1b5fe80f-75bd-8ba4-8dec-e211ea1b3ae6"
    - stage: horo
      stageUuid: "d6a0079b-b632-8a7d-bbe4-03fd7a32be95"
    - stage: seal
      stageUuid: "1b7dddee-b2f0-8ead-b2a0-f8f70d953b5d"
    - stage: uuid
      stageUuid: "9f657a7e-5540-83ca-8873-bed1c6d78407"
quantum:
  superposition:
    - ch
    - collapse
    - communication
    - law
    - merge
    - musical
    - sti
    - superposition
  collapse:
    - "BB84 (Bennett–Brassard 1984) / E91 (Ekert 1991); no-cloning (Wootters–Zurek 1982)"
    - "Use when reasoning about quantum key distribution (BB84 / E91) on the matrix — two peers derive a shared secret from their symmetric entangled binding so both compute the same key order-independently, and eavesdropping is detectable because no-cloning makes an intercept-resend yield a different content-uuid."
    - "matter-twin:src/quantum/communication/key/index.ts"
    - "the shared secret IS the symmetric entangled binding (`sharedKey(a,b) === sharedKey(b,a)`), so it is computed on both ends without ever travelling; interception necessarily alters the content-uuid, so `eavesdropDetected` fires whenever the relayed identity differs — no-cloning makes the clone attempt detectable."
  seal:
    sandbox: false
    receipt: false
    pathFollow: true
    canonicalRecord: true
    analogResults: false
    speechResults: false
    computationUuid: "c43b652a-0fe2-8cc3-a706-f1c75f778396"
    contentUuid: "e4bb15f1-6336-5f72-be20-a94ba4f942e8"
version: 2
---
# quantum/communication/key — the shared secret IS the symmetric entangled binding

The key-distribution facet of [[communication]]: two peers derive a SHARED SECRET from their entangled binding ([[entanglement]]) — the symmetric, order-independent collision, so both sides compute the SAME key without ever exchanging it. Eavesdropping is DETECTABLE because [[cloning]] is forbidden ([[quantum]] no-cloning, Wootters–Zurek): an intercept-resend cannot reproduce the original's content-[[uuid]], so the relayed carrier presents a different identity and the [[tamper]] is caught.

Matter-twin: `src/quantum/communication/key/index.ts` (`sharedKey` · `eavesdropDetected`). Composes [[communication]] · [[entanglement]] · [[quantum]] · [[uuid]] · [[cloning]] · [[merge]] · [[tamper]].

**Law — [[law]]: the shared secret IS the symmetric entangled binding (`sharedKey(a,b) === sharedKey(b,a)`), so it is computed on both ends without ever travelling; interception necessarily alters the content-uuid, so `eavesdropDetected` fires whenever the relayed identity differs — no-cloning makes the clone attempt detectable.**

@standard BB84 (Bennett–Brassard 1984) / E91 (Ekert 1991); no-cloning (Wootters–Zurek 1982)

<sub>content-uuid `e4bb15f1-6336-5f72-be20-a94ba4f942e8` · account `quantum/communication/key` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
