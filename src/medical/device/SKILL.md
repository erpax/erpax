---
name: device
description: "Use when reasoning about clinical hardware — the medical device registry where analog physiology collapses at the edge into lawful readings, LOINC-mapped observations, and EMR analog replay."
atomPath: "medical/device"
coordinate: "medical/device · 2/share · 90d62f19"
contentUuid: "91bdd1fd-4ead-5a68-b05f-0ca626bb118c"
diamondUuid: "5b4d8f88-644b-8689-81aa-5096d665deed"
uuid: "90d62f19-bdf8-8a12-ae15-4ee1bd458131"
horo: 2
typography:
  partition: medical
  bondDegree: 38
standards: []
bindings: []
signatures:
  computationUuid: "02e1d38a-8081-8742-8777-a21a4fe558e3"
  stages:
    - stage: path
      stageUuid: "9d518572-ca2a-82b1-9799-fd3a5ebde98d"
    - stage: trinity
      stageUuid: "cf269ed5-e912-8ef7-98e2-0824043f85f2"
    - stage: boundary
      stageUuid: "12606c43-912c-8d88-bd6d-e4c79c26a043"
    - stage: links
      stageUuid: "1c895948-786e-807a-b66f-46deb7494dfd"
    - stage: horo
      stageUuid: "c2baf64b-d0e9-89bf-b12b-b30ea019d181"
    - stage: seal
      stageUuid: "bf5a17b3-b747-8b89-847d-822bb7814f65"
    - stage: uuid
      stageUuid: "285ab9af-d9a0-8bc6-a93b-64751a4323b6"
version: 2
---
# medical/device — clinical hardware registry

The **medical device hub** — 34 hardware modalities (vitals · imaging · lab · therapy · surgical · wearable · diagnostic · hospital) registered with LOINC output slots, each simulating edge collapse into a `DeviceReading` and folding through `observationsFromMedicalDevice` → `observationFromDeviceReading` → `analogResults` / `reconstructAt`.

**Pipeline.** Modality capture (`deviceReadingFrom{Modality}`) → [[readings]] boundary (`readingBoundaryHolds`) → [[quantum/emr]] observation chain → analog replay. Signals extend [[quantum/device]] `MEDICAL_SIGNALS`; biofield never crosses.

**Registry.** `MEDICAL_DEVICES` · `wireModalityToEmr` · `devicesInCategory`. Top-level vocabulary atoms (xray · mri · ultrasound · anesthesia · bed · cassette · watch · [[monitor]]) pivot here — zero duplication ([[merge]] at path scale).

**Homonym — PET vs pet.** The `pet` **imaging modality** (positron emission tomography · LOINC `36952-8` · SUV uptake) is registered here as hospital imaging hardware. The pet atom is a schema.org vocabulary word (companion animals · `PetStore` · lodging) — a homograph only; never route schema.org pet semantics through this registry.

**Law — [[law]]: clinical hardware collapses at the device edge — numbers and LOINC codes only cross into the EMR chain; raw streams stay local; corrections supersede, never delete.**

@see [[readings]] · [[quantum/device]] · [[quantum/emr]] · [[device]] · [[medical]] · vital · biometric · imaging · health
