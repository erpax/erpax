---
name: "19005"
description: "Use when implementing or referencing `src/standards/iso-19005/`."
atomPath: "iso/19005"
coordinate: "iso/19005 · 5/round · f45ade33"
contentUuid: "6395e218-747e-5d2e-9b3c-5769bcbaacf9"
diamondUuid: "7169c69b-b990-8d49-835a-7b5cc4ce09dd"
uuid: "f45ade33-6fb3-890b-b9cf-623adff59032"
horo: 5
typography:
  partition: iso
  bondDegree: 1
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
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "1791cc5d-5996-87df-9f51-3b1287597386"
  stages:
    - stage: path
      stageUuid: "fb414b43-c139-8f06-ac28-e9853f0eb463"
    - stage: trinity
      stageUuid: "597b0af4-7143-8ee3-990e-4bc1ade1e23d"
    - stage: boundary
      stageUuid: "df70448e-0a49-85db-bbf6-24b305948752"
    - stage: links
      stageUuid: "004b5792-5863-837e-8ced-a8c3395162dc"
    - stage: horo
      stageUuid: "4d5db45a-7c69-8bc7-9163-1055f956850e"
    - stage: seal
      stageUuid: "fd34bf22-2239-8b25-b082-5d9d7696cb83"
    - stage: uuid
      stageUuid: "c7584b92-d967-894c-8292-f219c429cdc6"
version: 2
---
# `src/standards/iso-19005/`

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
