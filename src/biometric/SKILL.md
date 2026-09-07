---
name: biometric
description: "Use when measuring a person's body — biometric is the sharpest device measurement, serving identity (who you are) and health (your state) at once; privacy-by-design demands it stays on the edge, so the raw signal never leaves the device, only a derived uuid or a signed assertion does."
atomPath: biometric
coordinate: "biometric · 2/share · 56505701"
contentUuid: "fa432f31-944f-5798-95be-42a5669cd052"
diamondUuid: "f3b1e258-0dae-8ea7-b7dc-499af2142c18"
uuid: "56505701-ac14-8639-8e0a-d56aae039171"
horo: 2
typography:
  partition: biometric
  bondDegree: 55
standards: []
bindings: []
signatures:
  computationUuid: "ce6b99d6-9344-8978-99cd-9da477a6d0e8"
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
      stageUuid: "a6cdce4b-1458-86e1-98aa-588842d3dec9"
    - stage: seal
      stageUuid: "4437c728-cfd5-8da6-a669-22d3a5e19bfd"
    - stage: uuid
      stageUuid: "cb58c122-eda2-889e-82ad-a02acebdc494"
version: 2
---
# biometric — measuring the body (identity ⊕ health)

A **biometric** is a [[device]] [[measurement]] of the living body, and it collapses two ways at once:

- **[[identity]]** — a face, fingerprint, iris, or voice is *who you are*. The right pattern keeps the raw biometric **on the device** (WebAuthn / passkeys, Secure Payment Confirmation): the sensor signs a challenge with a device-held key, and only the public assertion leaves — never the template. The biometric becomes a content-[[uuid]] address, not a stored secret ([[auth]] · [[security]]).
- **[[health]]** — heart rate, HRV, SpO2, temperature are *your state*. Each reading is a [[vital]] [[snapshot]] in the [[coherence]] / [[quantum/emr]] chain, content-addressed and append-only.

## The line — privacy by design

Biometric data is special-category ([[vocabulary/data/protection]], GDPR Art.9): capture and compute on the **edge** (the browser/device — `getUserMedia` → numbers → pure compute), store a template or a derived [[uuid]], never the raw signal; require [[consent]]; minimise. The honest bound — rPPG heart rate from a camera IS measurable; the [[biofield]]/aura is NOT (Rosa, JAMA 1998) — measure what is real, claim nothing more. A biometric, once captured, is [[finality]] one-way *for you* (you cannot revoke a fingerprint) — which is precisely why the raw must never escape the device.

@see [[device]] · [[identity]] · [[auth]] · [[health]] · [[coherence]] · [[vital]] · [[consent]] · [[finality]] · [[uuid]]
