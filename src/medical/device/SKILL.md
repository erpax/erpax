---
name: device
description: "Use when reasoning about clinical hardware — the medical device registry where analog physiology collapses at the edge into lawful readings, LOINC-mapped observations, and EMR analog replay."
atomPath: "medical/device"
coordinate: "medical/device · 2/share · 9fef751b"
contentUuid: "72efffb8-837b-560d-bf3c-79e18f6a61ef"
diamondUuid: "05f3ccbd-5cba-8d88-a955-2a5a3324bb4e"
uuid: "9fef751b-c4eb-8f2e-a284-20892199d2c2"
horo: 2
typography:
  partition: medical
  bondDegree: 57
standards: []
bindings: []
signatures:
  computationUuid: "4f388e0f-0dbc-8b18-a981-933b1c996540"
  stages:
    - stage: path
      stageUuid: "9d518572-ca2a-82b1-9799-fd3a5ebde98d"
    - stage: trinity
      stageUuid: "cf269ed5-e912-8ef7-98e2-0824043f85f2"
    - stage: boundary
      stageUuid: "12606c43-912c-8d88-bd6d-e4c79c26a043"
    - stage: links
      stageUuid: "fd400265-cc5f-85a7-95a7-2b1091fc22b1"
    - stage: horo
      stageUuid: "c7cb6d67-5b25-8b0e-8470-3228de63ec38"
    - stage: seal
      stageUuid: "bf5a17b3-b747-8b89-847d-822bb7814f65"
    - stage: uuid
      stageUuid: "3bd8f0b8-f4ee-841b-b695-4bbc99514add"
version: 2
---
# medical/device — clinical hardware registry

The **medical device hub** — 34 hardware modalities (vitals · imaging · lab · therapy · surgical · wearable · diagnostic · hospital) registered with LOINC output slots, each simulating edge collapse into a `DeviceReading` and folding through `observationsFromMedicalDevice` → `observationFromDeviceReading` → `analogResults` / `reconstructAt`.

**Pipeline.** Modality capture (`deviceReadingFrom{Modality}`) → [[readings]] boundary (`readingBoundaryHolds`) → [[quantum/emr]] observation chain → [[analog]] replay. Signals extend [[quantum/device]] `MEDICAL_SIGNALS`; biofield never crosses.

**Registry.** `MEDICAL_DEVICES` · `wireModalityToEmr` · `devicesInCategory`. Top-level vocabulary atoms (xray · mri · ultrasound · anesthesia · bed · cassette · watch · [[monitor]]) pivot here — zero duplication ([[merge]] at path scale).

**Homonym — PET vs [[pet]].** The `pet` **imaging modality** (positron emission tomography · LOINC `36952-8` · SUV uptake) is registered here as hospital imaging hardware. The [[pet]] atom is a schema.org vocabulary word (companion animals · `PetStore` · lodging) — a homograph only; never route schema.org pet semantics through this registry.

**Law — [[law]]: clinical hardware collapses at the device edge — numbers and LOINC codes only cross into the EMR chain; raw streams stay local; corrections supersede, never delete.**

@see [[readings]] · [[quantum/device]] · [[quantum/emr]] · [[device]] · [[medical]] · vital · biometric · imaging · health
