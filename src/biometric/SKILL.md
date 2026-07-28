---
name: biometric
description: "Use when measuring a person's body — biometric is the sharpest device measurement, serving identity (who you are) and health (your state) at once; privacy-by-design demands it stays on the edge, so the raw signal never leaves the device, only a derived uuid or a signed assertion does."
atomPath: biometric
coordinate: "biometric · 5/round · 4827160d"
contentUuid: "53fbb321-9f42-5fc4-8b71-81299ebd21b1"
diamondUuid: "1327732c-c481-8958-b9a8-94dafc1a945a"
uuid: "4827160d-bfcd-898e-9b25-3883aeb5377b"
horo: 5
bonds:
  in:
    - auth
    - biofield
    - coherence
    - consent
    - dataprotection
    - device
    - emr
    - finality
    - health
    - identity
    - measurement
    - readings
    - sanitization
    - security
    - snapshot
    - uuid
    - vital
  out:
    - auth
    - biofield
    - coherence
    - consent
    - dataprotection
    - device
    - emr
    - finality
    - health
    - identity
    - measurement
    - readings
    - sanitization
    - security
    - snapshot
    - uuid
    - vital
typography:
  partition: biometric
  bondDegree: 55
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - auth
    - biofield
    - coherence
    - consent
    - dataprotection
    - device
    - emr
    - finality
    - health
    - identity
    - measurement
    - security
    - snapshot
    - uuid
    - vital
  matrix:
    - auth
    - biofield
    - coherence
    - consent
    - dataprotection
    - device
    - emr
    - finality
    - health
    - identity
    - measurement
    - readings
    - sanitization
    - security
    - snapshot
    - uuid
    - vital
  backlinks:
    - auth
    - biofield
    - coherence
    - consent
    - dataprotection
    - device
    - emr
    - finality
    - health
    - identity
    - measurement
    - readings
    - sanitization
    - security
    - snapshot
    - uuid
    - vital
signatures:
  computationUuid: "e8d8d5ad-dc8b-82de-95e7-6052b521c6c8"
  stages:
    - stage: path
      stageUuid: "952c92af-1f35-8515-937f-07b68429276b"
    - stage: trinity
      stageUuid: "41fe4d3b-2230-824f-9e02-86b53c6079f5"
    - stage: boundary
      stageUuid: "4dfad58b-c60a-8bfb-901d-4fd3a7fe175a"
    - stage: links
      stageUuid: "d4c8ac6d-b322-85c8-b9ea-44484bf2dd15"
    - stage: horo
      stageUuid: "d63c31b9-d7ea-8e74-ad2c-8ce8252f8191"
    - stage: seal
      stageUuid: "4437c728-cfd5-8da6-a669-22d3a5e19bfd"
    - stage: uuid
      stageUuid: "ec09f4f2-d589-827c-8177-f4fd5510d419"
version: 2
---
# biometric — measuring the body (identity ⊕ health)

A **biometric** is a [[device]] [[measurement]] of the living body, and it collapses two ways at once:

- **[[identity]]** — a face, fingerprint, iris, or voice is *who you are*. The right pattern keeps the raw biometric **on the device** (WebAuthn / passkeys, Secure Payment Confirmation): the sensor signs a challenge with a device-held key, and only the public assertion leaves — never the template. The biometric becomes a content-[[uuid]] address, not a stored secret ([[auth]] · [[security]]).
- **[[health]]** — heart rate, HRV, SpO2, temperature are *your state*. Each reading is a [[vital]] [[snapshot]] in the [[coherence]] / [[quantum/emr]] chain, content-addressed and append-only.

## The line — privacy by design

Biometric data is special-category ([[data-protection]], GDPR Art.9): capture and compute on the **edge** (the browser/device — `getUserMedia` → numbers → pure compute), store a template or a derived [[uuid]], never the raw signal; require [[consent]]; minimise. The honest bound — rPPG heart rate from a camera IS measurable; the [[biofield]]/aura is NOT (Rosa, JAMA 1998) — measure what is real, claim nothing more. A biometric, once captured, is [[finality]] one-way *for you* (you cannot revoke a fingerprint) — which is precisely why the raw must never escape the device.

@see [[device]] · [[identity]] · [[auth]] · [[health]] · [[coherence]] · [[vital]] · [[consent]] · [[finality]] · [[uuid]]
