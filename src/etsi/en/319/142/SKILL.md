---
name: "142"
description: "Use when implementing or referencing `src/etsi/en/319/142/index.ts`."
atomPath: "etsi/en/319/142"
coordinate: "etsi/en/319/142 · 1/base · 3abe79bf"
contentUuid: "aa56ace5-f71a-5dcb-82b0-26d35097c1cf"
diamondUuid: "398ba008-745f-8806-8983-770ab80dc6e9"
uuid: "3abe79bf-08ea-8e66-b777-4bfd9d8fe359"
horo: 1
typography:
  partition: etsi
  bondDegree: 3
standards:
  - "ETSI-EN-319-142"
  - "ETSI-EN-319-142-1 v1.1.1 pades-baseline-profile"
  - "ETSI-EN-319-142-1 v1.1.1 pades-baseline-profile`"
  - "EU 910/2014 eidas qualified-electronic-signature"
  - "EU-765/2008"
  - "ISO-32000"
  - "ISO-32000-1:2008 §12.8 pdf-signature-dictionary"
  - "ISO-32000-1:2008 §12.8 pdf-signature-dictionary`"
  - "RFC-5652"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "50a21f38-bc1c-874c-841f-0b9bea8d90d2"
  stages:
    - stage: path
      stageUuid: "53b585ee-4028-8dd8-be66-7258253bcddf"
    - stage: trinity
      stageUuid: "d4cb2f9a-f7fc-8a2b-9246-1dffc63ac421"
    - stage: boundary
      stageUuid: "bce1d3f6-7e0a-8cfa-84bd-c9ee106fbc7e"
    - stage: links
      stageUuid: "3a50ba08-d9a4-8bb5-89d9-edff866f74a3"
    - stage: horo
      stageUuid: "7af8babf-eebf-83bc-80ee-b9703b5b238a"
    - stage: seal
      stageUuid: "aa66a1f5-b3c3-820e-92c9-b0504b220a6e"
    - stage: uuid
      stageUuid: "bb1816fd-3d4c-8759-869d-6707894a3554"
version: 2
---
# `src/etsi/en/319/142/index.ts`

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
   `src/country/client/index.ts<code>-pades-signer.ts`, consumes the
   dictionary builder + the country's qualified seal cert config.
3. Spec mirror under `tests/standards/etsi-en-319-142/`.
4. `pnpm standards:write-index` to refresh `docs/STANDARDS_INDEX.md`.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ETSI-EN-319-142-1 v1.1.1 pades-baseline-profile`
- `@standard ISO-32000-1:2008 §12.8 pdf-signature-dictionary`

Composes: [[standards]].
