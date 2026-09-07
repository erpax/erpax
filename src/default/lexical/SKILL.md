---
name: lexical
description: "Use when reasoning about lexical — is the base rich-text feature set every editable field shares, including the link validation rules: an internal reference resolves against a collection, an external one must be a…"
atomPath: "default/lexical"
coordinate: "default/lexical · 4/weave · 96572100"
contentUuid: "76ad54b2-dd62-58fc-9a7e-e22951e09c2e"
diamondUuid: "cad8c631-5aae-8abd-96b6-9f8acabb87c9"
uuid: "96572100-5fa8-836c-bf75-2b1e41899d4a"
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
  computationUuid: "000f0d43-2e80-8af6-aa58-3e227156b5a5"
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
      stageUuid: "ee9e9883-63bc-8592-882f-d957d1da4898"
    - stage: seal
      stageUuid: "242f4f3f-7ed2-8b3a-a3bf-76639ac4dd28"
    - stage: uuid
      stageUuid: "134461c8-9402-8f6e-96f0-304b23e0c138"
version: 2
---
# default/lexical — one editor configuration, so a link means the same thing on every surface

`defaultLexical` is the base rich-text feature set every editable field shares, including the
link validation rules: an internal reference resolves against a collection, an external one
must be a valid URI.

Configuring the editor per field is how two surfaces end up disagreeing about what a link is.


Composes: [[law]].
