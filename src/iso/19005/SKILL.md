---
name: "19005"
description: "Use when implementing or referencing `src/standards/iso-19005/`."
atomPath: iso/19005
coordinate: iso/19005 · 7/descent · a2618005
contentUuid: "10d96651-fe6d-5a33-8c46-e4b7988eaa32"
diamondUuid: "b603f733-efed-876e-b236-7a966c167ae8"
uuid: "a2618005-89b3-822f-bf5c-a6845492e442"
horo: 7
bonds:
  in:
    - iso
    - law
  out:
    - law
typography:
  partition: iso
  bondDegree: 3
  neighbors: []
standards:
  - "EU-2000/31"
  - "EU-2005/29"
  - "EU-2011/83"
  - "EU-765/2008"
  - "EU-VAT-Implementing-Reg-282/2011"
  - "ISO-19005"
  - "ISO-19005-1:2005 pdf-a-1"
  - "ISO-19005-2:2011 pdf-a-2"
  - "ISO-19005-3:2012 pdf-a-3"
  - "ISO-32000"
bindings: []
neighbors:
  wikilink:
    - law
  matrix:
    - law
  backlinks:
    - law
signatures:
  computationUuid: "95f0c370-6ae5-8eb8-9676-89e3030adedd"
  stages:
    - stage: path
      stageUuid: "fb414b43-c139-8f06-ac28-e9853f0eb463"
    - stage: trinity
      stageUuid: "597b0af4-7143-8ee3-990e-4bc1ade1e23d"
    - stage: boundary
      stageUuid: "df70448e-0a49-85db-bbf6-24b305948752"
    - stage: links
      stageUuid: "1efb4b11-1850-8308-9481-518cdad5c109"
    - stage: horo
      stageUuid: "56fe2943-a596-84ff-bc38-f6b400767d6f"
    - stage: seal
      stageUuid: "fd34bf22-2239-8b25-b082-5d9d7696cb83"
    - stage: uuid
      stageUuid: "a4926474-033d-85f0-8746-b4cbef1018e4"
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
