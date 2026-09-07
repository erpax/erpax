---
name: country
description: "Use when reasoning about country — holds a canonical bundle per country and returns the one for an alpha-2 code: its holidays, its VAT treatment, its bank-statement and invoice formats, its signing profile."
atomPath: "iso/3166/1/country"
coordinate: "iso/3166/1/country · 8/crest · d84ec811"
contentUuid: "e97a5997-f89a-53d8-81b8-5fa5b7a25a74"
diamondUuid: "35d0f5ca-51e1-8b8b-8911-c08aec5276fb"
uuid: "d84ec811-5694-8bfc-bb16-bd0435276722"
horo: 8
typography:
  partition: iso
  bondDegree: 90
standards:
  - "ISO-3166-1:2020 country-codes alpha-2"
  - "ISO/IEC-29119"
  - "Peppol-BIS-3.0"
bindings: []
signatures:
  computationUuid: "0d9ec8dd-5a52-8cab-82d6-e666844dd75d"
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
      stageUuid: "e30f5b62-811f-84a7-bccd-ea75f1674756"
    - stage: seal
      stageUuid: "f976d4fd-3ce7-89e6-8b41-003ce76a716f"
    - stage: uuid
      stageUuid: "9ee7e275-8e76-88e8-bc80-6b084e741f93"
version: 2
---
# iso/3166/1/country — a country is a bundle of decisions, fetched by its code

`COUNTRY_BUNDLES` holds a canonical bundle per country and `getCountryBundle` returns the one for
an alpha-2 code: its holidays, its VAT treatment, its bank-statement and invoice formats, its
signing profile.

Scattering those across the code that needs them is how one module ends up believing a different
VAT rate than another. Bundling them per country makes the country the unit a reviewer checks.


Composes: [[law]].
