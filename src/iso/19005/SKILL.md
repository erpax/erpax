---
name: "19005"
description: "Use when implementing or referencing `src/iso/19005/index.ts`."
atomPath: "iso/19005"
coordinate: "iso/19005 · 7/descent · 088529cd"
contentUuid: "68caaa89-3b6a-5768-ba6c-a72a080e82a7"
diamondUuid: "d123574d-f283-83dc-a420-e669ca45ce67"
uuid: "088529cd-705f-83d6-bd67-599f2a25e238"
horo: 7
typography:
  partition: iso
  bondDegree: 9
standards:
  - "EU-765/2008"
  - "EU-VAT-Implementing-Reg-282/2011"
  - "ISO-19005"
  - "ISO-19005-1:2005 pdf-a-1"
  - "ISO-19005-1:2005 pdf-a-1`"
  - "ISO-19005-2:2011 pdf-a-2"
  - "ISO-19005-2:2011 pdf-a-2`"
  - "ISO-19005-3:2012 pdf-a-3"
  - "ISO-19005-3:2012 pdf-a-3`"
  - "ISO-32000"
  - "ISO/IEC-29119"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "f9d1a6d0-92c2-8a31-9596-5b09ab5f1d50"
  stages:
    - stage: path
      stageUuid: "fb414b43-c139-8f06-ac28-e9853f0eb463"
    - stage: trinity
      stageUuid: "597b0af4-7143-8ee3-990e-4bc1ade1e23d"
    - stage: boundary
      stageUuid: "df70448e-0a49-85db-bbf6-24b305948752"
    - stage: links
      stageUuid: "5a6d9d1e-f598-81aa-b846-28b0514279cb"
    - stage: horo
      stageUuid: "900e1e03-84ad-8787-bc80-f22d14e7112d"
    - stage: seal
      stageUuid: "7d8c3479-bd7a-8c55-94fd-c8f0c376e3de"
    - stage: uuid
      stageUuid: "28999f6f-638c-80ae-82c9-23c8374ff427"
version: 2
---
# `src/iso/19005/index.ts`

ISO 19005 PDF/A — long-term archival PDF profiles. Pins the conformance
levels every PDF the project produces must declare for archival use.

| Module | Standard implemented |
|---|---|
| `profile.ts` | PDF/A-1 / -2 / -3 part + conformance constants + XMP packet helper |
| `metadata.ts` | XMP packet builder with the `pdfaid:part` / `pdfaid:conformance` declarations + Dublin Core / XMP fields archival tools require |

Defaults:

- `PDF_A_DEFAULT` = `{ part: 2, conformance: 'b' }` — PDF/A-2b is the
  safe baseline for new outputs (BG tax law mandates 10-year retention).
- `PDF_A_HYBRID_INVOICE` = `{ part: 3, conformance: 'b' }` — for
  EN-16931 hybrid invoices (PDF/A-3 with embedded XML, Factur-X /
  ZUGFeRD style).

Out of scope here: the actual PDF stream construction. This module emits
the XMP metadata; the caller injects it into the PDF (Puppeteer +
downstream PDF/A converter, or `pdf-lib`'s `setMetadata`).

When extending:
1. New profile / level → add a constant to `profile.ts`.
2. Spec mirror under `tests/standards/iso-19005/`.
3. `pnpm standards:write-index` to refresh `docs/STANDARDS_INDEX.md`.

**Law — [[law]]: every PDF the project emits for archival must declare a PDF/A conformance level in its XMP packet — long-term readability is a self-asserted, embedded fact (the 10-year retention mandate), not an external promise.**

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-19005-1:2005 pdf-a-1`
- `@standard ISO-19005-2:2011 pdf-a-2`
- `@standard ISO-19005-3:2012 pdf-a-3`

Composes: [[standards]].
