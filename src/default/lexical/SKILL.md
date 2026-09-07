---
name: lexical
description: "Use when reasoning about lexical — is the base rich-text feature set every editable field shares, including the link validation rules: an internal reference resolves against a collection, an external one must be a…"
atomPath: "default/lexical"
coordinate: "default/lexical · 7/descent · 530203e4"
contentUuid: "f50e4bf8-dd19-5aaf-bea4-83cbdd7fbec1"
diamondUuid: "a5d10601-df66-8933-b29c-e583fdb1a16c"
uuid: "530203e4-44ac-8748-8f95-a868c8318844"
horo: 7
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
  computationUuid: "c095c38d-0f73-8cec-97f4-42dc051cfeba"
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
      stageUuid: "32e72e53-d765-800e-ae80-d1f853f60cd4"
    - stage: seal
      stageUuid: "242f4f3f-7ed2-8b3a-a3bf-76639ac4dd28"
    - stage: uuid
      stageUuid: "a2a93dd3-1a50-84da-9e1c-ff9753e9f4cd"
version: 2
---
# default/lexical — one editor configuration, so a link means the same thing on every surface

`defaultLexical` is the base rich-text feature set every editable field shares, including the
link validation rules: an internal reference resolves against a collection, an external one
must be a valid URI.

Configuring the editor per field is how two surfaces end up disagreeing about what a link is.


Composes: [[law]].
