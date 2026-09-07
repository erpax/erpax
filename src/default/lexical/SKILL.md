---
name: lexical
description: "Use when reasoning about lexical — is the base rich-text feature set every editable field shares, including the link validation rules: an internal reference resolves against a collection, an external one must be a…"
atomPath: "default/lexical"
coordinate: "default/lexical · 2/share · 1c2de2b3"
contentUuid: "ea66018a-afb6-58b5-86f2-fc1fc7702962"
diamondUuid: "97888688-f621-8a97-ba43-934274ca13dd"
uuid: "1c2de2b3-0f49-838f-9f96-07985b95999a"
horo: 2
typography:
  partition: default
  bondDegree: 27
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
  computationUuid: "b6b7ca0c-5d37-801e-9b49-f93c38c1cb16"
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
      stageUuid: "50ded0fe-47a3-8c47-bef5-efeeeaa2b96f"
    - stage: seal
      stageUuid: "242f4f3f-7ed2-8b3a-a3bf-76639ac4dd28"
    - stage: uuid
      stageUuid: "20ebd111-5f7c-817f-9228-81f48d686324"
version: 2
---
# default/lexical — one editor configuration, so a link means the same thing on every surface

`defaultLexical` is the base rich-text feature set every editable field shares, including the
link validation rules: an internal reference resolves against a collection, an external one
must be a valid URI.

Configuring the editor per field is how two surfaces end up disagreeing about what a link is.


Composes: [[law]].
