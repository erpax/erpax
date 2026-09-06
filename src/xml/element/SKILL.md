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
