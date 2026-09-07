---
name: country
description: "Use when reasoning about country — holds a canonical bundle per country and returns the one for an alpha-2 code: its holidays, its VAT treatment, its bank-statement and invoice formats, its signing profile."
atomPath: "iso/3166/1/country"
coordinate: "iso/3166/1/country · 7/descent · 042ec108"
contentUuid: "94f98249-f517-5a65-8148-162d4536c309"
diamondUuid: "f5a74a84-ff90-81e5-8f11-5f15f6060580"
uuid: "042ec108-6ed5-85c2-bc9b-93f0d58c1359"
horo: 7
typography:
  partition: iso
  bondDegree: 90
standards:
  - "ISO-3166-1:2020 country-codes alpha-2"
  - "ISO/IEC-29119"
  - "Peppol-BIS-3.0"
bindings: []
signatures:
  computationUuid: "04e146d9-1cc1-8a36-b7c1-2ca760b9a3e6"
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
      stageUuid: "10c3764f-c8fe-8eda-98e2-c936e56677fb"
    - stage: seal
      stageUuid: "f976d4fd-3ce7-89e6-8b41-003ce76a716f"
    - stage: uuid
      stageUuid: "764be974-626a-8afb-8dce-9cfc5fe6b32e"
version: 2
---
# iso/3166/1/country — a country is a bundle of decisions, fetched by its code

`COUNTRY_BUNDLES` holds a canonical bundle per country and `getCountryBundle` returns the one for
an alpha-2 code: its holidays, its VAT treatment, its bank-statement and invoice formats, its
signing profile.

Scattering those across the code that needs them is how one module ends up believing a different
VAT rate than another. Bundling them per country makes the country the unit a reviewer checks.


Composes: [[law]].
