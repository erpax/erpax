---
name: device
description: "Use when reasoning about clinical hardware — the medical device registry where analog physiology collapses at the edge into lawful readings, LOINC-mapped observations, and EMR analog replay."
atomPath: "medical/device"
coordinate: "medical/device · 2/share · 7a09f80a"
contentUuid: "5426af03-a959-56c0-96bc-5998f8a01824"
diamondUuid: "e94cdf0e-f48c-8bfa-9853-0e654e65042b"
uuid: "7a09f80a-ffef-874f-be37-6fbaef82d500"
horo: 2
bonds:
  in:
    - analog
    - anesthesia
    - available
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
    - purpose
    - readings
    - stack
    - ultrasound
    - uses
    - vital
    - watch
    - xray
  out:
    - analog
    - anesthesia
    - available
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
    - purpose
    - readings
    - stack
    - ultrasound
    - uses
    - vital
    - watch
    - xray
typography:
  partition: medical
  bondDegree: 97
  neighbors: []
standards: []
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
    - analog
    - anesthesia
    - available
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
    - purpose
    - readings
    - stack
    - ultrasound
    - uses
    - vital
    - watch
    - xray
  backlinks:
    - analog
    - anesthesia
    - available
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
    - purpose
    - readings
    - stack
    - ultrasound
    - uses
    - vital
    - watch
    - xray
signatures:
  computationUuid: "810bc9fe-5e0d-8720-b272-dcc19ffd48dd"
  stages:
    - stage: path
      stageUuid: "9d518572-ca2a-82b1-9799-fd3a5ebde98d"
    - stage: trinity
      stageUuid: "cf269ed5-e912-8ef7-98e2-0824043f85f2"
    - stage: boundary
      stageUuid: "12606c43-912c-8d88-bd6d-e4c79c26a043"
    - stage: links
      stageUuid: "02a446a5-27ad-89c3-b877-d637b5ff647e"
    - stage: horo
      stageUuid: "bea2a12d-baf7-847b-9618-e6b8bcc2c6cc"
    - stage: seal
      stageUuid: "bf5a17b3-b747-8b89-847d-822bb7814f65"
    - stage: uuid
      stageUuid: "2dcc34d3-b83c-8dfa-a3c7-37aadad67a74"
version: 2
---
# medical/device — clinical hardware registry

The **medical device hub** — 34 hardware modalities (vitals · imaging · lab · therapy · surgical · wearable · diagnostic · hospital) registered with LOINC output slots, each simulating edge collapse into a `DeviceReading` and folding through `observationsFromMedicalDevice` → `observationFromDeviceReading` → `analogResults` / `reconstructAt`.

**Pipeline.** Modality capture (`deviceReadingFrom{Modality}`) → [[readings]] boundary (`readingBoundaryHolds`) → [[quantum/emr]] observation chain → [[analog]] replay. Signals extend [[quantum/device]] `MEDICAL_SIGNALS`; biofield never crosses.

**Registry.** `MEDICAL_DEVICES` · `wireModalityToEmr` · `devicesInCategory`. Top-level vocabulary atoms ([[xray]] · [[mri]] · [[ultrasound]] · [[anesthesia]] · [[bed]] · [[cassette]] · [[watch]] · [[monitor]]) pivot here — zero duplication ([[merge]] at path scale).

**Homonym — PET vs [[pet]].** The `pet` **imaging modality** (positron emission tomography · LOINC `36952-8` · SUV uptake) is registered here as hospital imaging hardware. The [[pet]] atom is a schema.org vocabulary word (companion animals · `PetStore` · lodging) — a homograph only; never route schema.org pet semantics through this registry.

**Law — [[law]]: clinical hardware collapses at the device edge — numbers and LOINC codes only cross into the EMR chain; raw streams stay local; corrections supersede, never delete.**

@see [[readings]] · [[quantum/device]] · [[quantum/emr]] · [[device]] · [[medical]] · [[vital]] · [[biometric]] · [[imaging]] · [[health]]
