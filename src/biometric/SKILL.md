---
name: biometric
description: "Use when measuring a person's body — biometric is the sharpest device measurement, serving identity (who you are) and health (your state) at once; privacy-by-design demands it stays on the edge, so the raw signal never leaves the device, only a derived uuid or a signed assertion does."
atomPath: biometric
coordinate: biometric · 7/descent · f9197fdf
contentUuid: "a8199136-e651-5dd3-ab77-fe02d4c0bd90"
diamondUuid: "5c2db0de-8184-8db0-b357-ca85cfc215a1"
uuid: "f9197fdf-5dc1-8873-86fe-109885aa4b27"
horo: 7
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
    - sanitization
    - security
    - snapshot
    - uuid
    - vital
typography:
  partition: biometric
  bondDegree: 51
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
    - sanitization
    - security
    - snapshot
    - uuid
    - vital
signatures:
  computationUuid: "f5112ba1-2109-88fa-93bc-7a5954ed45ab"
  stages:
    - stage: path
      stageUuid: "952c92af-1f35-8515-937f-07b68429276b"
    - stage: trinity
      stageUuid: "79abbccf-81e3-81ff-b045-69fd74db1ac0"
    - stage: boundary
      stageUuid: "95da306a-4152-86e5-9f85-f911445da512"
    - stage: links
      stageUuid: "d4c8ac6d-b322-85c8-b9ea-44484bf2dd15"
    - stage: horo
      stageUuid: "8a612ed6-497e-850a-839a-9bb016596bd3"
    - stage: seal
      stageUuid: "8eafecc5-b123-8e69-b63a-9f6b2b858cba"
    - stage: uuid
      stageUuid: "8a993856-1b4a-837d-bf89-bd05b2b1ce27"
version: 2
---
# biometric — measuring the body (identity ⊕ health)

A **biometric** is a [[device]] [[measurement]] of the living body, and it collapses two ways at once:

- **[[identity]]** — a face, fingerprint, iris, or voice is *who you are*. The right pattern keeps the raw biometric **on the device** (WebAuthn / passkeys, Secure Payment Confirmation): the sensor signs a challenge with a device-held key, and only the public assertion leaves — never the template. The biometric becomes a content-[[uuid]] address, not a stored secret ([[auth]] · [[security]]).
- **[[health]]** — heart rate, HRV, SpO2, temperature are *your state*. Each reading is a [[vital]] [[snapshot]] in the [[coherence]] / [[quantum/emr]] chain, content-addressed and append-only.

## The line — privacy by design

Biometric data is special-category ([[data-protection]], GDPR Art.9): capture and compute on the **edge** (the browser/device — `getUserMedia` → numbers → pure compute), store a template or a derived [[uuid]], never the raw signal; require [[consent]]; minimise. The honest bound — rPPG heart rate from a camera IS measurable; the [[biofield]]/aura is NOT (Rosa, JAMA 1998) — measure what is real, claim nothing more. A biometric, once captured, is [[finality]] one-way *for you* (you cannot revoke a fingerprint) — which is precisely why the raw must never escape the device.

@see [[device]] · [[identity]] · [[auth]] · [[health]] · [[coherence]] · [[vital]] · [[consent]] · [[finality]] · [[uuid]]
