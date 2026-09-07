---
name: "142"
description: "Use when implementing or referencing `src/etsi/en/319/142/index.ts`."
atomPath: "etsi/en/319/142"
coordinate: "etsi/en/319/142 · 7/descent · 7fd851f4"
contentUuid: "30f8cd77-49f6-504b-902e-286aa3357ddb"
diamondUuid: "205f5ace-877c-8647-9558-2b1e6e0a2f07"
uuid: "7fd851f4-879c-8be9-8fd5-350ac0783ec4"
horo: 7
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
  computationUuid: "305a24f7-ec67-8196-8f87-fe338121751d"
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
      stageUuid: "49936752-edcd-8c9f-acac-afe407ba4395"
    - stage: seal
      stageUuid: "aa66a1f5-b3c3-820e-92c9-b0504b220a6e"
    - stage: uuid
      stageUuid: "1a01326a-decb-8f17-85fc-55762857779a"
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
