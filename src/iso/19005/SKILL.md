---
name: "19005"
description: "Use when implementing or referencing `src/iso/19005/index.ts`."
atomPath: "iso/19005"
coordinate: "iso/19005 · 1/base · 26209138"
contentUuid: "4307d863-6078-5d21-a9bf-d9d830085f28"
diamondUuid: "01edcb9b-ff4f-82a1-a606-47789b66f964"
uuid: "26209138-80fa-89fa-a15f-81bf42a2b6cc"
horo: 1
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
  computationUuid: "1fbe98b7-9c8d-8bc9-af42-34a03eb1b565"
  stages:
    - stage: path
      stageUuid: "fb414b43-c139-8f06-ac28-e9853f0eb463"
    - stage: trinity
      stageUuid: "597b0af4-7143-8ee3-990e-4bc1ade1e23d"
    - stage: boundary
      stageUuid: "df70448e-0a49-85db-bbf6-24b305948752"
    - stage: links
      stageUuid: "e9725e90-a464-8a58-8d57-b917464e438d"
    - stage: horo
      stageUuid: "5379418c-5360-8cce-98df-13c6de674d12"
    - stage: seal
      stageUuid: "7d8c3479-bd7a-8c55-94fd-c8f0c376e3de"
    - stage: uuid
      stageUuid: "4857a3c5-be34-89a4-a038-80c5777e6a4f"
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
