---
name: escape
description: "Use when reasoning about escape — must be replaced before any text or attribute value is embedded in generated XML (**XML 1.0 §2.4**)."
atomPath: "xml/escape"
coordinate: "xml/escape · 8/crest · b0ad1dee"
contentUuid: "a41a9202-426a-5090-9312-ba918e50506d"
diamondUuid: "3fb93d7a-4954-8ece-bae8-88fe8125e993"
uuid: "b0ad1dee-be93-8465-995c-20fe6470b1f3"
horo: 8
typography:
  partition: xml
  bondDegree: 9
standards:
  - "XML-1.0 §2.4 predefined-entities"
bindings: []
signatures:
  computationUuid: "7f9cb8ed-1f6b-8e38-81d4-5667efd2207e"
  stages:
    - stage: path
      stageUuid: "190898cf-d503-8d7f-9628-a22f5b97c35d"
    - stage: trinity
      stageUuid: "a27a96b4-d825-86bd-ac01-16c1e929c620"
    - stage: boundary
      stageUuid: "795be8d2-aad1-82f8-ab4e-ee4bd3861205"
    - stage: links
      stageUuid: "5e6cd3b1-8ecf-8304-a848-39fb4e4b4fc3"
    - stage: horo
      stageUuid: "f3492e0c-7289-8621-a74a-8b3021bcbe5f"
    - stage: seal
      stageUuid: "81f4065c-e5de-802b-b849-31d66410b513"
    - stage: uuid
      stageUuid: "5f4c9996-e9c5-8950-9af0-2820ca31e3c6"
version: 2
---
# xml/escape — the five predefined entities, once

`& < > " '` must be replaced before any text or attribute value is embedded in generated XML
(**XML 1.0 §2.4**). Get it wrong and a customer name containing `&` produces a document that is
not well-formed — an invoice a Peppol access point rejects, or a SAF-T file the tax authority
cannot parse.

One escaper serves every serializer in the corpus — Peppol UBL, ISO-20022 pain.00x, OECD SAF-T.
That was already true when [[rules]]/copy hashed the tree; what was **not** shared was the layer
built directly on top of it, which is [[xml]]/element's finding.

`escapeXml` returns `''` for `undefined` and `null` rather than the strings `"undefined"` /
`"null"`, so an absent field renders as an empty value instead of a word that looks like data.

**Honest boundary.** This escapes the five predefined entities and nothing else: it does not
handle CDATA, does not strip characters XML forbids outright (control bytes below U+0020), and
does not encode. A value carrying a raw control byte still produces a document a strict parser
rejects — [[rules]]/domain names that class for source files; the document surface is not gated.

**Law — [[law]]: escaping is a property of the format, not of the caller. One definition, or the
next serializer writes a sixth one and gets one of the five entities wrong.**

## Standards

- **XML 1.0 §2.4** — character data and markup: the five predefined entities.

Composes: [[xml]] · [[law]].
