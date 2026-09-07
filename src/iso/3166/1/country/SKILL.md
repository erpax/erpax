---
name: country
description: "Use when reasoning about country — holds a canonical bundle per country and returns the one for an alpha-2 code: its holidays, its VAT treatment, its bank-statement and invoice formats, its signing profile."
atomPath: "iso/3166/1/country"
coordinate: "iso/3166/1/country · 5/round · 3844e95f"
contentUuid: "26419caa-abcc-5071-91af-9f975f0d33d7"
diamondUuid: "d232f411-2bb0-86cc-bfad-eb1a061575d7"
uuid: "3844e95f-487e-84fb-a5fc-01f25e52ad93"
horo: 5
typography:
  partition: iso
  bondDegree: 90
standards:
  - "ISO-3166-1:2020 country-codes alpha-2"
  - "ISO/IEC-29119"
  - "Peppol-BIS-3.0"
bindings: []
signatures:
  computationUuid: "4e6857fe-fe57-8b6e-a56b-bf8e946b43ad"
  stages:
    - stage: path
      stageUuid: "693914f4-ed29-8973-9b6c-fcbddd6993bc"
    - stage: trinity
      stageUuid: "efb54144-4c98-8485-9a66-6764216ccc24"
    - stage: boundary
      stageUuid: "2b6f5a72-aad5-8b9f-ac19-d82df10995b9"
    - stage: links
      stageUuid: "300108cf-02ef-8dd8-83c0-b0a6a4caa1fc"
    - stage: horo
      stageUuid: "8d2ad545-4f56-8b2f-83d2-e06b42ee0fa6"
    - stage: seal
      stageUuid: "f976d4fd-3ce7-89e6-8b41-003ce76a716f"
    - stage: uuid
      stageUuid: "f3629ece-09bf-8122-aadb-8f5774a9bba4"
version: 2
---
# iso/3166/1/country — a country is a bundle of decisions, fetched by its code

`COUNTRY_BUNDLES` holds a canonical bundle per country and `getCountryBundle` returns the one for
an alpha-2 code: its holidays, its VAT treatment, its bank-statement and invoice formats, its
signing profile.

Scattering those across the code that needs them is how one module ends up believing a different
VAT rate than another. Bundling them per country makes the country the unit a reviewer checks.


Composes: [[law]].
