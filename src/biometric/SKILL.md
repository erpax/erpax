---
name: biometric
description: "Use when measuring a person's body — biometric is the sharpest device measurement, serving identity (who you are) and health (your state) at once; privacy-by-design demands it stays on the edge, so the raw signal never leaves the device, only a derived uuid or a signed assertion does."
atomPath: biometric
coordinate: "biometric · 5/round · d07065f1"
contentUuid: "e84dc19e-b164-5146-83da-a52627569332"
diamondUuid: "3f6613bc-1c56-8445-83cd-9b275e91d6f5"
uuid: "d07065f1-08a1-86a9-b2a5-3ba23529e1c4"
horo: 5
typography:
  partition: biometric
  bondDegree: 55
standards: []
bindings: []
signatures:
  computationUuid: "cc655b60-4e72-84b0-b005-4dc86ea564d1"
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
      stageUuid: "37b3772d-8941-81be-befb-8d807d9009ae"
    - stage: seal
      stageUuid: "4437c728-cfd5-8da6-a669-22d3a5e19bfd"
    - stage: uuid
      stageUuid: "56b809bb-fdf8-876f-804c-4a2a917b1037"
version: 2
---
# biometric — measuring the body (identity ⊕ health)

A **biometric** is a [[device]] [[measurement]] of the living body, and it collapses two ways at once:

- **[[identity]]** — a face, fingerprint, iris, or voice is *who you are*. The right pattern keeps the raw biometric **on the device** (WebAuthn / passkeys, Secure Payment Confirmation): the sensor signs a challenge with a device-held key, and only the public assertion leaves — never the template. The biometric becomes a content-[[uuid]] address, not a stored secret ([[auth]] · [[security]]).
- **[[health]]** — heart rate, HRV, SpO2, temperature are *your state*. Each reading is a [[vital]] [[snapshot]] in the [[coherence]] / [[quantum/emr]] chain, content-addressed and append-only.

## The line — privacy by design

Biometric data is special-category ([[vocabulary/data/protection]], GDPR Art.9): capture and compute on the **edge** (the browser/device — `getUserMedia` → numbers → pure compute), store a template or a derived [[uuid]], never the raw signal; require [[consent]]; minimise. The honest bound — rPPG heart rate from a camera IS measurable; the [[biofield]]/aura is NOT (Rosa, JAMA 1998) — measure what is real, claim nothing more. A biometric, once captured, is [[finality]] one-way *for you* (you cannot revoke a fingerprint) — which is precisely why the raw must never escape the device.

@see [[device]] · [[identity]] · [[auth]] · [[health]] · [[coherence]] · [[vital]] · [[consent]] · [[finality]] · [[uuid]]
