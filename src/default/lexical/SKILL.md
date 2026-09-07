---
name: lexical
description: "Use when reasoning about lexical — is the base rich-text feature set every editable field shares, including the link validation rules: an internal reference resolves against a collection, an external one must be a…"
atomPath: "default/lexical"
coordinate: "default/lexical · 4/weave · 5e3b4063"
contentUuid: "b73074c4-5f43-58e4-80b4-efe32b02f16c"
diamondUuid: "6b982d07-ba0e-835b-bf71-1e42504642a5"
uuid: "5e3b4063-323a-8baf-90e9-204aea1842ef"
horo: 4
typography:
  partition: default
  bondDegree: 29
standards:
  - "3986 uniform-resource-identifier link-fields"
  - "BCP-47"
  - "BCP-47 language-tag locale-aware-content"
  - "CommonMark 0.31 markdown-fallback"
  - "RFC-3986"
  - "W3C HTML5 Living Standard rich-text-output"
  - "W3C-HTML5"
  - "WCAG-2.1 level-AA accessibility"
  - schema.org HTMLRichText
bindings: []
signatures:
  computationUuid: "418e1db7-3215-89a9-99d2-871f6c7a0a06"
  stages:
    - stage: path
      stageUuid: "ad6ce2b8-cbfb-879a-b292-c4d2c596ae72"
    - stage: trinity
      stageUuid: "0038df68-7689-8b24-94ce-ea772bb41dcc"
    - stage: boundary
      stageUuid: "6c7bcc12-6e7f-8719-ad82-21c8f5e13e74"
    - stage: links
      stageUuid: "d4dda2f1-f95d-83c1-a0ca-8188a9e3d95b"
    - stage: horo
      stageUuid: "12883321-ab50-8f9c-8c84-c04258b3fc07"
    - stage: seal
      stageUuid: "242f4f3f-7ed2-8b3a-a3bf-76639ac4dd28"
    - stage: uuid
      stageUuid: "705d485a-f48d-891d-9125-e170eca47ec6"
version: 2
---
# default/lexical — one editor configuration, so a link means the same thing on every surface

`defaultLexical` is the base rich-text feature set every editable field shares, including the
link validation rules: an internal reference resolves against a collection, an external one
must be a valid URI.

Configuring the editor per field is how two surfaces end up disagreeing about what a link is.


Composes: [[law]].
