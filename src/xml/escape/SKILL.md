---
name: escape
description: "Use when reasoning about escape — must be replaced before any text or attribute value is embedded in generated XML (**XML 1.0 §2.4**)."
atomPath: "xml/escape"
coordinate: "xml/escape · 2/share · 45301b9a"
contentUuid: "760548c5-ffab-5559-8a42-f57f4e33af36"
diamondUuid: "7720c0d5-c710-88d1-b839-8bd6983165c5"
uuid: "45301b9a-5977-8020-a955-9e88992cdcc8"
horo: 2
typography:
  partition: xml
  bondDegree: 9
standards:
  - "XML-1.0 §2.4 predefined-entities"
bindings: []
signatures:
  computationUuid: "f9657cdc-5557-8266-ba15-20a9c4994eb0"
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
      stageUuid: "6f617ba6-553d-81c4-83fa-9a9e59892738"
    - stage: seal
      stageUuid: "81f4065c-e5de-802b-b849-31d66410b513"
    - stage: uuid
      stageUuid: "8bfe0807-8c3e-8d1d-93c8-5fea37c3c921"
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
