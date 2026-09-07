---
name: element
description: "Use when reasoning about element — was already the one shared escaper — its own docstring says *\"one definition, not three\"*."
atomPath: "xml/element"
coordinate: "xml/element · 1/base · 82f97b2c"
contentUuid: "bf08439f-7996-5f5b-a131-ff4792041f07"
diamondUuid: "193bdd74-f488-84fc-817b-8662ca55c2f7"
uuid: "82f97b2c-019c-8c3d-81c5-3ab7fde85709"
horo: 1
typography:
  partition: xml
  bondDegree: 77
standards:
  - "XML-1.0 §3.1 start-tag · attribute · element-content"
bindings: []
signatures:
  computationUuid: "970d8718-7695-8a94-9877-3a3c8682e04f"
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
      stageUuid: "67686620-7bcb-8b0e-9b4b-81763a955007"
    - stage: seal
      stageUuid: "b5dbda9f-1e8e-804a-b0da-e21145637f09"
    - stage: uuid
      stageUuid: "27d2577c-b82f-83c5-95c6-6e07424d93b2"
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
