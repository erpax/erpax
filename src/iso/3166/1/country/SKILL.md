---
name: country
description: "Use when reasoning about country — holds a canonical bundle per country and returns the one for an alpha-2 code: its holidays, its VAT treatment, its bank-statement and invoice formats, its signing profile."
atomPath: "iso/3166/1/country"
coordinate: "iso/3166/1/country · 7/descent · 8299dae6"
contentUuid: "fae8943d-0cab-5bda-9c7d-6871dc7258ea"
diamondUuid: "ac6f7650-a4c5-8bb8-837a-12ea28290f41"
uuid: "8299dae6-c237-8ae1-a384-b2fc1b4ec55e"
horo: 7
typography:
  partition: iso
  bondDegree: 84
standards:
  - "ISO-3166-1:2020 country-codes alpha-2"
  - "ISO/IEC-29119"
  - "Peppol-BIS-3.0"
bindings: []
signatures:
  computationUuid: "5f1e81d4-9b10-8ae0-98cd-1e76b5de8188"
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
      stageUuid: "15db5667-9964-807f-ba9a-f5e2093c42ef"
    - stage: seal
      stageUuid: "f976d4fd-3ce7-89e6-8b41-003ce76a716f"
    - stage: uuid
      stageUuid: "226fb959-a19f-84a8-bf26-c00a89d1bea4"
version: 2
---
# iso/3166/1/country — a country is a bundle of decisions, fetched by its code

`COUNTRY_BUNDLES` holds a canonical bundle per country and `getCountryBundle` returns the one for
an alpha-2 code: its holidays, its VAT treatment, its bank-statement and invoice formats, its
signing profile.

Scattering those across the code that needs them is how one module ends up believing a different
VAT rate than another. Bundling them per country makes the country the unit a reviewer checks.


Composes: [[law]].
