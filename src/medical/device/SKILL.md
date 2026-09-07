---
name: device
description: "Use when reasoning about clinical hardware — the medical device registry where analog physiology collapses at the edge into lawful readings, LOINC-mapped observations, and EMR analog replay."
atomPath: "medical/device"
coordinate: "medical/device · 7/descent · cdd4928f"
contentUuid: "7346a4ff-9c52-5a87-abce-f467af986f4a"
diamondUuid: "14888395-4efe-81c4-9c28-117a7700a70e"
uuid: "cdd4928f-292a-82d2-8332-93a6dc9c21c6"
horo: 7
typography:
  partition: medical
  bondDegree: 97
standards: []
bindings: []
signatures:
  computationUuid: "2969cab7-980a-8ee0-94ed-6baa6cdaf9f6"
  stages:
    - stage: path
      stageUuid: "9d518572-ca2a-82b1-9799-fd3a5ebde98d"
    - stage: trinity
      stageUuid: "cf269ed5-e912-8ef7-98e2-0824043f85f2"
    - stage: boundary
      stageUuid: "12606c43-912c-8d88-bd6d-e4c79c26a043"
    - stage: links
      stageUuid: "616fcf3f-bcd4-80f5-9d8b-6ded3725ed14"
    - stage: horo
      stageUuid: "20cbe07e-e7f2-82b8-b482-c6159b01fc27"
    - stage: seal
      stageUuid: "bf5a17b3-b747-8b89-847d-822bb7814f65"
    - stage: uuid
      stageUuid: "99b617aa-6de4-8931-b46e-fb92ba2f3949"
version: 2
---
# medical/device — clinical hardware registry

The **medical device hub** — 34 hardware modalities (vitals · imaging · lab · therapy · surgical · wearable · diagnostic · hospital) registered with LOINC output slots, each simulating edge collapse into a `DeviceReading` and folding through `observationsFromMedicalDevice` → `observationFromDeviceReading` → `analogResults` / `reconstructAt`.

**Pipeline.** Modality capture (`deviceReadingFrom{Modality}`) → [[readings]] boundary (`readingBoundaryHolds`) → [[quantum/emr]] observation chain → [[analog]] replay. Signals extend [[quantum/device]] `MEDICAL_SIGNALS`; biofield never crosses.

**Registry.** `MEDICAL_DEVICES` · `wireModalityToEmr` · `devicesInCategory`. Top-level vocabulary atoms ([[xray]] · [[mri]] · [[ultrasound]] · [[anesthesia]] · [[bed]] · [[cassette]] · [[watch]] · [[monitor]]) pivot here — zero duplication ([[merge]] at path scale).

**Homonym — PET vs [[pet]].** The `pet` **imaging modality** (positron emission tomography · LOINC `36952-8` · SUV uptake) is registered here as hospital imaging hardware. The [[pet]] atom is a schema.org vocabulary word (companion animals · `PetStore` · lodging) — a homograph only; never route schema.org pet semantics through this registry.

**Law — [[law]]: clinical hardware collapses at the device edge — numbers and LOINC codes only cross into the EMR chain; raw streams stay local; corrections supersede, never delete.**

@see [[readings]] · [[quantum/device]] · [[quantum/emr]] · [[device]] · [[medical]] · [[vital]] · [[biometric]] · [[imaging]] · [[health]]
