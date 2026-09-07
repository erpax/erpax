---
name: country
description: "Use when reasoning about country — holds a canonical bundle per country and returns the one for an alpha-2 code: its holidays, its VAT treatment, its bank-statement and invoice formats, its signing profile."
atomPath: "iso/3166/1/country"
coordinate: "iso/3166/1/country · 4/weave · 5eef5eb7"
contentUuid: "38744b4f-0a39-5846-a727-3b49cf546b35"
diamondUuid: "dc025d56-bc60-874d-a443-c33e72e77db6"
uuid: "5eef5eb7-7016-84fb-81bd-7e9846387c5d"
horo: 4
typography:
  partition: iso
  bondDegree: 84
standards:
  - "ISO-3166-1:2020 country-codes alpha-2"
  - "ISO/IEC-29119"
  - "Peppol-BIS-3.0"
bindings: []
signatures:
  computationUuid: "3d0334de-d8b4-8109-a0e6-7530b5a053ab"
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
      stageUuid: "eb37a57c-6457-8916-98e4-6d5076e61b8d"
    - stage: seal
      stageUuid: "f976d4fd-3ce7-89e6-8b41-003ce76a716f"
    - stage: uuid
      stageUuid: "7c9233cb-2c08-8de1-91e3-facb6843c257"
version: 2
---
# iso/3166/1/country — a country is a bundle of decisions, fetched by its code

`COUNTRY_BUNDLES` holds a canonical bundle per country and `getCountryBundle` returns the one for
an alpha-2 code: its holidays, its VAT treatment, its bank-statement and invoice formats, its
signing profile.

Scattering those across the code that needs them is how one module ends up believing a different
VAT rate than another. Bundling them per country makes the country the unit a reviewer checks.


Composes: [[law]].
