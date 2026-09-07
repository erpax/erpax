---
name: "19005"
description: "Use when implementing or referencing `src/iso/19005/index.ts`."
atomPath: "iso/19005"
coordinate: "iso/19005 · 8/crest · de62ece3"
contentUuid: "81e508e1-333d-5e0c-95a0-76762ac8feaa"
diamondUuid: "2234eb70-9147-8a65-919e-086e1fed831e"
uuid: "de62ece3-d905-82bd-b8ac-bb49a3bc671b"
horo: 8
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
  computationUuid: "449b0458-504b-88b6-8455-076e368ba8b3"
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
      stageUuid: "b1143bc1-5446-80ec-9347-01eecdca73ed"
    - stage: seal
      stageUuid: "7d8c3479-bd7a-8c55-94fd-c8f0c376e3de"
    - stage: uuid
      stageUuid: "f8778f99-80a5-87b7-9b25-a620e29021cd"
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
