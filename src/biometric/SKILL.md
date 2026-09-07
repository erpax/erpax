---
name: biometric
description: "Use when measuring a person's body — biometric is the sharpest device measurement, serving identity (who you are) and health (your state) at once; privacy-by-design demands it stays on the edge, so the raw signal never leaves the device, only a derived uuid or a signed assertion does."
atomPath: biometric
coordinate: "biometric · 7/descent · 07867c04"
contentUuid: "a077186e-d3e2-5fc9-b461-bdfecf26c8cf"
diamondUuid: "2dd3a022-2570-855c-a932-6d716f7d207f"
uuid: "07867c04-c90d-8b1e-9337-4fa778b40608"
horo: 7
typography:
  partition: biometric
  bondDegree: 55
standards: []
bindings: []
signatures:
  computationUuid: "2ad10e31-f2af-88c1-b8e3-5a7f4353092a"
  stages:
    - stage: path
      stageUuid: "952c92af-1f35-8515-937f-07b68429276b"
    - stage: trinity
      stageUuid: "41fe4d3b-2230-824f-9e02-86b53c6079f5"
    - stage: boundary
      stageUuid: "4dfad58b-c60a-8bfb-901d-4fd3a7fe175a"
    - stage: links
      stageUuid: "d6d7234c-77f4-8000-b453-238290d9c841"
    - stage: horo
      stageUuid: "68dfd16a-88da-8e5f-a6ae-f9b86e234969"
    - stage: seal
      stageUuid: "4437c728-cfd5-8da6-a669-22d3a5e19bfd"
    - stage: uuid
      stageUuid: "d7532f8f-3e2a-8fef-9125-154fd481932a"
version: 2
---
# biometric — measuring the body (identity ⊕ health)

A **biometric** is a [[device]] [[measurement]] of the living body, and it collapses two ways at once:

- **[[identity]]** — a face, fingerprint, iris, or voice is *who you are*. The right pattern keeps the raw biometric **on the device** (WebAuthn / passkeys, Secure Payment Confirmation): the sensor signs a challenge with a device-held key, and only the public assertion leaves — never the template. The biometric becomes a content-[[uuid]] address, not a stored secret ([[auth]] · [[security]]).
- **[[health]]** — heart rate, HRV, SpO2, temperature are *your state*. Each reading is a [[vital]] [[snapshot]] in the [[coherence]] / [[quantum/emr]] chain, content-addressed and append-only.

## The line — privacy by design

Biometric data is special-category ([[vocabulary/data/protection]], GDPR Art.9): capture and compute on the **edge** (the browser/device — `getUserMedia` → numbers → pure compute), store a template or a derived [[uuid]], never the raw signal; require [[consent]]; minimise. The honest bound — rPPG heart rate from a camera IS measurable; the [[biofield]]/aura is NOT (Rosa, JAMA 1998) — measure what is real, claim nothing more. A biometric, once captured, is [[finality]] one-way *for you* (you cannot revoke a fingerprint) — which is precisely why the raw must never escape the device.

@see [[device]] · [[identity]] · [[auth]] · [[health]] · [[coherence]] · [[vital]] · [[consent]] · [[finality]] · [[uuid]]
