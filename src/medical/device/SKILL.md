---
name: device
description: "Use when reasoning about clinical hardware — the medical device registry where analog physiology collapses at the edge into lawful readings, LOINC-mapped observations, and EMR analog replay."
atomPath: medical/device
coordinate: medical/device · 2/share · 44f93297
contentUuid: "2da13637-dee8-5815-84ac-e96f543efc70"
diamondUuid: "635f720c-0fc2-813e-af07-089c87206512"
uuid: "44f93297-4fbf-8006-b79b-c1fb00ce12d1"
horo: 2
bonds:
  in:
    - available
    - biometric
    - device
    - law
    - medical
    - purpose
    - stack
    - uses
  out:
    - available
    - biometric
    - device
    - law
    - medical
    - purpose
    - stack
    - uses
typography:
  partition: medical
  bondDegree: 65
  neighbors: []
standards:
  - "boundary checks delegate to [[readings]]/[[quantum/device]]; never hand-asserted sensing"
bindings: []
neighbors:
  wikilink:
    - analog
    - anesthesia
    - bed
    - biometric
    - cassette
    - device
    - emr
    - health
    - imaging
    - law
    - medical
    - merge
    - monitor
    - mri
    - pet
    - readings
    - ultrasound
    - vital
    - watch
    - xray
  matrix:
    - available
    - biometric
    - device
    - law
    - medical
    - purpose
    - stack
    - uses
  backlinks:
    - available
    - biometric
    - device
    - law
    - medical
    - purpose
    - stack
    - uses
signatures:
  computationUuid: "45d13dd4-a370-8639-927c-9ba538b17d08"
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
      stageUuid: "fcced7ce-41f2-8c34-af84-e506935d2117"
    - stage: seal
      stageUuid: "bf5a17b3-b747-8b89-847d-822bb7814f65"
    - stage: uuid
      stageUuid: "a74a4f3c-f737-8ba7-8c5c-663fdad4481f"
version: 2
---
# medical/device — clinical hardware registry

The **medical device hub** — 34 hardware modalities (vitals · imaging · lab · therapy · surgical · wearable · diagnostic · hospital) registered with LOINC output slots, each simulating edge collapse into a `DeviceReading` and folding through `observationsFromMedicalDevice` → `observationFromDeviceReading` → `analogResults` / `reconstructAt`.

**Pipeline.** Modality capture (`deviceReadingFrom{Modality}`) → [[readings]] boundary (`readingBoundaryHolds`) → [[quantum/emr]] observation chain → [[analog]] replay. Signals extend [[quantum/device]] `MEDICAL_SIGNALS`; biofield never crosses.

**Registry.** `MEDICAL_DEVICES` · `wireModalityToEmr` · `devicesInCategory`. Top-level vocabulary atoms ([[xray]] · [[mri]] · [[ultrasound]] · [[anesthesia]] · [[bed]] · [[cassette]] · [[watch]] · [[monitor]]) pivot here — zero duplication ([[merge]] at path scale).

**Homonym — PET vs [[pet]].** The `pet` **imaging modality** (positron emission tomography · LOINC `36952-8` · SUV uptake) is registered here as hospital imaging hardware. The [[pet]] atom is a schema.org vocabulary word (companion animals · `PetStore` · lodging) — a homograph only; never route schema.org pet semantics through this registry.

**Law — [[law]]: clinical hardware collapses at the device edge — numbers and LOINC codes only cross into the EMR chain; raw streams stay local; corrections supersede, never delete.**

@see [[readings]] · [[quantum/device]] · [[quantum/emr]] · [[device]] · [[medical]] · [[vital]] · [[biometric]] · [[imaging]] · [[health]]
