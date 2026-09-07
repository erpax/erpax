---
name: key
description: "Use when reasoning about quantum key distribution (BB84 / E91) on the matrix — two peers derive a shared secret from their symmetric entangled binding so both compute the same key order-independently, and eavesdropping is detectable because no-cloning makes an intercept-resend yield a different content-uuid."
atomPath: "quantum/communication/key"
coordinate: "quantum/communication/key · 4/weave · a76647fd"
contentUuid: "479168ea-bbb6-5597-8026-38c41f090b60"
diamondUuid: "b278d7ce-bdbe-8f93-946a-accd53e14fe8"
uuid: "a76647fd-beaf-87cd-ab33-878887e86a54"
horo: 4
typography:
  partition: quantum
  bondDegree: 28
standards:
  - "BB84 (Bennett–Brassard 1984) / E91 (Ekert 1991); no-cloning (Wootters–Zurek 1982)"
bindings: []
signatures:
  computationUuid: "4d47b57f-76ce-87aa-bb47-541c707a1757"
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
      stageUuid: "96e6ff75-4728-8370-984b-d7bbef1ac7b8"
    - stage: seal
      stageUuid: "1b7dddee-b2f0-8ead-b2a0-f8f70d953b5d"
    - stage: uuid
      stageUuid: "8000c105-d056-8272-b256-b4abfdb6c966"
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
    computationUuid: "4d47b57f-76ce-87aa-bb47-541c707a1757"
    contentUuid: "479168ea-bbb6-5597-8026-38c41f090b60"
version: 2
---
# quantum/communication/key — the shared secret IS the symmetric entangled binding

The key-distribution facet of [[communication]]: two peers derive a SHARED SECRET from their entangled binding ([[entanglement]]) — the symmetric, order-independent collision, so both sides compute the SAME key without ever exchanging it. Eavesdropping is DETECTABLE because [[cloning]] is forbidden ([[quantum]] no-cloning, Wootters–Zurek): an intercept-resend cannot reproduce the original's content-[[uuid]], so the relayed carrier presents a different identity and the [[tamper]] is caught.

Matter-twin: `src/quantum/communication/key/index.ts` (`sharedKey` · `eavesdropDetected`). Composes [[communication]] · [[entanglement]] · [[quantum]] · [[uuid]] · [[cloning]] · [[merge]] · [[tamper]].

**Law — [[law]]: the shared secret IS the symmetric entangled binding (`sharedKey(a,b) === sharedKey(b,a)`), so it is computed on both ends without ever travelling; interception necessarily alters the content-uuid, so `eavesdropDetected` fires whenever the relayed identity differs — no-cloning makes the clone attempt detectable.**

@standard BB84 (Bennett–Brassard 1984) / E91 (Ekert 1991); no-cloning (Wootters–Zurek 1982)

<sub>content-uuid `479168ea-bbb6-5597-8026-38c41f090b60` · account `quantum/communication/key` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
