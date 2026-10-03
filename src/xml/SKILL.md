---
name: xml
description: "Use when reasoning about xml — Peppol UBL, ISO-20022 pain.00x and OECD SAF-T all emit XML. What they share is not a document model — each owns its namespaces, element order and schema — it is the two layers…"
atomPath: xml
coordinate: "xml · 1/base · db4bd827"
contentUuid: "bd9f06ea-c4b8-5f40-a441-a855f824b639"
diamondUuid: "e6c9f4df-66a0-89ff-beec-c303e9e879e4"
uuid: "db4bd827-d962-8044-a655-431d9ef7a96b"
horo: 1
typography:
  partition: xml
  bondDegree: 19
standards:
  - "XML-1.0 §2.4 predefined-entities · §3.1 element-content"
bindings: []
signatures:
  computationUuid: "20d22622-cfd0-85fe-87a5-db5b84bf976a"
  stages:
    - stage: path
      stageUuid: "55356f4d-86b3-8154-8921-0a55829a11bd"
    - stage: trinity
      stageUuid: "2a4c3b0b-94be-8d5c-af0b-bf065a2c261e"
    - stage: boundary
      stageUuid: "4fa85b63-a4a6-8af1-9d12-4ab495c847db"
    - stage: links
      stageUuid: "0926abec-ddd0-841d-ae27-84c936b5ada4"
    - stage: horo
      stageUuid: "370be8e5-8e5a-806d-b35d-7c7dadb5fb54"
    - stage: seal
      stageUuid: "2b4c69f9-cc49-872a-9d8f-b956d26f3959"
    - stage: uuid
      stageUuid: "fd1f3a35-6af1-8b31-ae23-3039baa824cb"
version: 2
---
# xml — one escaper, one element set, three serializers

Peppol UBL, ISO-20022 pain.00x and OECD SAF-T all emit XML. What they share is not a document
model — each owns its namespaces, element order and schema — it is the two layers underneath:

- [[xml]]/escape — the five predefined entities. Already shared; its own docstring says *"one
  definition, not three"*.
- [[xml]]/element — `escapeAttrs` · `leaf` · `wrap`, built on the escaper. **Not** shared until
  [[rules]]/copy body-hashed the tree and found five of those bodies byte-identical across the
  three exporters.

That gap is the pattern worth naming: the leaf of a shared thing gets shared, and the layer
built directly on top of it gets copied, because each caller writes it while thinking about its
own document rather than about XML.

**Honest boundary.** This atom is the primitives and nothing above them. It does not validate a
document against a schema, does not order elements, and proves no standard's conformance — each
exporter carries its own claim.

**Law — [[law]]: what every serializer needs is one atom, not one per serializer.**

## Standards

- **XML 1.0 §2.4** — predefined entities.
- **XML 1.0 §3.1** — start-tag, attribute, element content.

Composes: [[xml]]/escape · [[xml]]/element · [[rules]]/copy · [[law]].
