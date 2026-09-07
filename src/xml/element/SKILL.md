---
name: element
description: "Use when reasoning about element — was already the one shared escaper — its own docstring says *\\\\\\\"one definition, not three\\\\\\\"*."
atomPath: "xml/element"
coordinate: "xml/element · 2/share · 664b4ce7"
contentUuid: "926f630e-3406-5fa3-8ce8-2270553360c3"
diamondUuid: "258dbd01-9bb3-8a66-b9bc-cfd6368f6944"
uuid: "664b4ce7-99f0-8cb9-bf4c-5e24ae9314d1"
horo: 2
typography:
  partition: xml
  bondDegree: 80
standards:
  - "XML-1.0 §3.1 start-tag · attribute · element-content"
bindings: []
signatures:
  computationUuid: "503399e8-a937-8427-af50-3154887ade6d"
  stages:
    - stage: path
      stageUuid: "0322e525-8383-800d-b409-c7b1f0fcbb0c"
    - stage: trinity
      stageUuid: "53640fe7-0601-8763-945f-d380f40671bc"
    - stage: boundary
      stageUuid: "0c98c907-9e4a-8362-9715-1f4bd2488d8f"
    - stage: links
      stageUuid: "a309e87d-56e8-8841-ba68-ee14d10497c6"
    - stage: horo
      stageUuid: "6c990899-53dd-8109-847c-4456ab653763"
    - stage: seal
      stageUuid: "b5dbda9f-1e8e-804a-b0da-e21145637f09"
    - stage: uuid
      stageUuid: "4a9b8daf-1e68-8631-8a58-56be1de1c76a"
version: 2
---
# xml/element — three serializers each wrote the same three functions

`escapeXml` was already the one shared escaper — its own docstring says *"one definition, not
three"*. The elements built **on** it were not: `escapeAttrs` · `leaf` · `wrap` were written
separately in the Peppol UBL, ISO-20022 pain.00x and OECD SAF-T exporters, and body-hashing
([[rules]]/copy) proved five of those bodies byte-identical.

| function | where it lived |
| --- | --- |
| `wrap` | `iso20022/export/service` · `peppol/export/service` · `saf/t/export/service` |
| `escapeAttrs` | `iso20022/export/service` · `peppol/export/service` |
| `leaf` | `iso20022/export/service` · `peppol/export/service` (and a two-argument twin in `saf/t`) |

**Duplication is camouflage.** While one rule lives in three private corners, nothing can show a
fourth exporter is missing it — and the rule here is not cosmetic: `leaf` renders **nothing** for
an absent value rather than an empty tag, because `<cbc:Note/>` is a claim that the field is
present and blank. Three copies is three chances for the next exporter to get that wrong quietly.

`saf/t`'s `leaf` took two arguments where the others took three. The generalised form is a
**superset** — with no attrs it emits the two-argument output byte for byte, which is pinned by a
test rather than asserted here.

**Honest boundary.** This folds the element primitives, not the serializers: each exporter still
owns its namespaces, its element order and its schema. It proves the three bodies were the same,
never that any of them was right — the standards conformance of each document is its own atom's
claim.

**Law — [[law]]: a rule written in three private corners cannot be audited in any of them. One
truth, one address — and the address is the atom whose name it already carries.**

## Standards

- **XML 1.0 §3.1** — start-tag, attribute, element content.

Composes: [[xml]]/escape · [[rules]]/copy · [[law]].
