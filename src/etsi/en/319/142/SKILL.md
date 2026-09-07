---
name: "142"
description: "Use when implementing or referencing `src/etsi/en/319/142/index.ts`."
atomPath: "etsi/en/319/142"
coordinate: "etsi/en/319/142 · 4/weave · 04c35893"
contentUuid: "19d13bfe-99a8-5165-a58c-e3451b1e1466"
diamondUuid: "79ce01f2-7cd4-8326-9c95-5fd1f91a0b62"
uuid: "04c35893-1f99-818c-a632-4e0a8aa9b509"
horo: 4
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
  computationUuid: "c0ae7e30-3d08-8155-97e5-44ed17c0ed63"
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
      stageUuid: "e8e5a703-a1f2-82d2-a896-2fd3c10151e2"
    - stage: seal
      stageUuid: "aa66a1f5-b3c3-820e-92c9-b0504b220a6e"
    - stage: uuid
      stageUuid: "2411b392-de25-8c4f-9cd8-5c6c6695e67d"
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
