---
name: lexical
description: "Use when reasoning about lexical — is the base rich-text feature set every editable field shares, including the link validation rules: an internal reference resolves against a collection, an external one must be a…"
atomPath: "default/lexical"
coordinate: "default/lexical · 4/weave · 98b13cec"
contentUuid: "75174f60-df58-5118-852d-3642dde6c116"
diamondUuid: "94a798d8-9db2-885f-b22c-07ca92735698"
uuid: "98b13cec-131a-831a-933b-0eab950cfa2f"
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
  computationUuid: "353a984a-b65b-8d98-a1aa-8b42aeea52ee"
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
      stageUuid: "873aab27-1801-8bad-bc24-f26a3432dbfa"
    - stage: seal
      stageUuid: "242f4f3f-7ed2-8b3a-a3bf-76639ac4dd28"
    - stage: uuid
      stageUuid: "c3d18e0a-8028-8ac9-b68c-caea95b30707"
version: 2
---
# default/lexical — one editor configuration, so a link means the same thing on every surface

`defaultLexical` is the base rich-text feature set every editable field shares, including the
link validation rules: an internal reference resolves against a collection, an external one
must be a valid URI.

Configuring the editor per field is how two surfaces end up disagreeing about what a link is.


Composes: [[law]].
