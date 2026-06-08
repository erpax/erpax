---
name: token
description: "Use when defining design primitives — a design token is a named, semantic design decision (color, font-size, spacing, motion) reused across components. The granular unit of design consistency."
atomPath: token
coordinate: token · 4/weave · 778a51cc
contentUuid: "36a3672f-33d7-52f5-84c6-84e005d7c685"
diamondUuid: "b71d1197-e1e7-8911-8c0a-5ab36239a76f"
uuid: "778a51cc-3a90-8928-9b36-80f5c307f7fc"
horo: 4
bonds:
  in:
    - component
    - design
    - law
    - standard
    - theme
  out:
    - component
    - design
    - law
    - standard
    - theme
typography:
  partition: token
  bondDegree: 16
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - component
    - design
    - law
    - standard
    - theme
  matrix:
    - component
    - design
    - law
    - standard
    - theme
  backlinks:
    - component
    - design
    - law
    - standard
    - theme
signatures:
  computationUuid: "0e8d5773-fbfb-8c5a-b5e9-71cb1dfd55cb"
  stages:
    - stage: path
      stageUuid: "4715b9b0-2a3a-817c-8782-9c91dc2dc3fa"
    - stage: trinity
      stageUuid: "6ef709b2-59cb-84c6-a62a-231ed2e7c320"
    - stage: boundary
      stageUuid: "f306ab9c-a779-87e6-9510-39d0b790e5cb"
    - stage: links
      stageUuid: "bf97efed-3a0d-84ae-a6dc-25bebb339046"
    - stage: horo
      stageUuid: "abd47439-6050-8c19-8760-ae91ef48cfab"
    - stage: seal
      stageUuid: "b3cc3b79-5d92-89d8-ac83-4a61abb31a13"
    - stage: uuid
      stageUuid: "70274823-fc27-8b5b-917a-690178154270"
version: 2
---
# token

Use when defining design primitives — a design token is a named, semantic design decision (color, font-size, spacing, motion) reused across components. The granular unit of design consistency.

Composes: [[theme]] · [[component]] · [[standard]] · [[design]].

## Standards
- design-token spec
- W3C design-tokens format

**Law — [[law]]: a token is one named semantic design decision defined in exactly one place and referenced everywhere — never a duplicated literal value.**
