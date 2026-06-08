---
name: "142"
description: "Use when implementing or referencing `src/standards/etsi-en-319-142/`."
atomPath: etsi/en/319/142
coordinate: etsi/en/319/142 · 4/weave · 08974c4b
contentUuid: "6587573a-a6cd-5366-bb89-5ed068e9fa55"
diamondUuid: "3ccaad28-2e2f-80cc-82ba-a0862e9c7422"
uuid: "08974c4b-672d-8a28-8f4a-0845e206e698"
horo: 4
bonds:
  in:
    - readme
  out: []
typography:
  partition: etsi
  bondDegree: 0
  neighbors: []
standards:
  - "ETSI-EN-319-142"
  - "ETSI-EN-319-142-1 v1.1.1 pades-baseline-profile"
  - "EU 910/2014 eidas qualified-electronic-signature"
  - "EU-2000/31"
  - "EU-765/2008"
  - "ISO-32000"
  - "ISO-32000-1:2008 §12.8 pdf-signature-dictionary"
  - "RFC-5652"
bindings: []
neighbors:
  wikilink: []
  matrix: []
  backlinks: []
signatures:
  computationUuid: "8f3b0059-9516-8fb8-9b8f-36c10f47a0c8"
  stages:
    - stage: path
      stageUuid: "53b585ee-4028-8dd8-be66-7258253bcddf"
    - stage: trinity
      stageUuid: "d4cb2f9a-f7fc-8a2b-9246-1dffc63ac421"
    - stage: boundary
      stageUuid: "bce1d3f6-7e0a-8cfa-84bd-c9ee106fbc7e"
    - stage: links
      stageUuid: "4a3346d1-d774-8030-b03d-38926fadaac0"
    - stage: horo
      stageUuid: "956a1218-20ee-8a49-a3f4-93873b321ebc"
    - stage: seal
      stageUuid: "aa66a1f5-b3c3-820e-92c9-b0504b220a6e"
    - stage: uuid
      stageUuid: "5db4d5c9-0f4d-8204-826a-3ef1e65878d8"
version: 2
---
# `src/standards/etsi-en-319-142/`

ETSI EN 319 142 PAdES — PDF Advanced Electronic Signatures. Required by
EU 910/2014 (eIDAS) for qualified electronic signatures on PDFs (НАП
SAF-T submissions, Декларация Образец 1/6, BG e-procurement bid
responses, signed evidence-pack attestations).

| Module | Standard implemented |
|---|---|
| `profile.ts` | PAdES baseline levels (B-B / B-T / B-LT / B-LTA), subfilter constants, attribute-OID lookup |
| `signature-dictionary.ts` | PDF `/Sig` cos-dict builder with `/ByteRange` + `/Contents` placeholders for the two-pass sign flow |

The two-pass sign flow:

1. **First pass** — caller emits the `/Sig` dictionary via
   `buildPadesSignatureDictionary({ level, reason, location, ... })` and
   serialises the PDF with the `<00...00>` placeholder in `/Contents`.
2. **Second pass** — the per-country signer (e.g.
   `bg-pades-signer.ts`) computes the CMS-detached signature over the
   byte range that wraps the placeholder and back-patches `/Contents`
   with the actual hex-encoded CMS blob.

Out of scope: the actual cryptography. CMS construction +
RFC 3161 timestamp + OCSP fetch live in the per-country signer. This
module only declares the shape; the signer fulfills it.

When extending:
1. New PAdES profile / level → add to `profile.ts`.
2. New per-country signer → new file under
   `src/services/country-clients/<code>-pades-signer.ts`, consumes the
   dictionary builder + the country's qualified seal cert config.
3. Spec mirror under `tests/standards/etsi-en-319-142/`.
4. `pnpm standards:write-index` to refresh `docs/STANDARDS_INDEX.md`.
