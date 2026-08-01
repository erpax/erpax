---
name: key
description: "Use when reasoning about quantum key distribution (BB84 / E91) on the matrix — two peers derive a shared secret from their symmetric entangled binding so both compute the same key order-independently, and eavesdropping is detectable because no-cloning makes an intercept-resend yield a different content-uuid."
atomPath: "quantum/communication/key"
coordinate: "quantum/communication/key · 5/round · 933ce437"
contentUuid: "e9f11504-7746-5f1a-92a9-fa6485749e28"
diamondUuid: "c45ec3dc-6cce-85e7-974f-8536f23eb23b"
uuid: "933ce437-0317-830b-9b53-f25503921708"
horo: 5
typography:
  partition: quantum
  bondDegree: 28
standards:
  - "BB84 (Bennett–Brassard 1984) / E91 (Ekert 1991); no-cloning (Wootters–Zurek 1982)"
bindings: []
signatures:
  computationUuid: "d875c790-ae09-83ef-9e2e-6793d9524d93"
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
      stageUuid: "e99c8058-994a-8f32-84cf-45d41a3a0aaa"
    - stage: seal
      stageUuid: "1b7dddee-b2f0-8ead-b2a0-f8f70d953b5d"
    - stage: uuid
      stageUuid: "5084ddfe-0fc8-8d29-9fa2-05c63d95ab38"
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
    computationUuid: "d875c790-ae09-83ef-9e2e-6793d9524d93"
    contentUuid: "e9f11504-7746-5f1a-92a9-fa6485749e28"
version: 2
---
# quantum/communication/key — the shared secret IS the symmetric entangled binding

The key-distribution facet of [[communication]]: two peers derive a SHARED SECRET from their entangled binding ([[entanglement]]) — the symmetric, order-independent collision, so both sides compute the SAME key without ever exchanging it. Eavesdropping is DETECTABLE because [[cloning]] is forbidden ([[quantum]] no-cloning, Wootters–Zurek): an intercept-resend cannot reproduce the original's content-[[uuid]], so the relayed carrier presents a different identity and the [[tamper]] is caught.

Matter-twin: `src/quantum/communication/key/index.ts` (`sharedKey` · `eavesdropDetected`). Composes [[communication]] · [[entanglement]] · [[quantum]] · [[uuid]] · [[cloning]] · [[merge]] · [[tamper]].

**Law — [[law]]: the shared secret IS the symmetric entangled binding (`sharedKey(a,b) === sharedKey(b,a)`), so it is computed on both ends without ever travelling; interception necessarily alters the content-uuid, so `eavesdropDetected` fires whenever the relayed identity differs — no-cloning makes the clone attempt detectable.**

@standard BB84 (Bennett–Brassard 1984) / E91 (Ekert 1991); no-cloning (Wootters–Zurek 1982)

<sub>content-uuid `e9f11504-7746-5f1a-92a9-fa6485749e28` · account `quantum/communication/key` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
