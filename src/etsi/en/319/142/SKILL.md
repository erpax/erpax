---
name: "142"
description: "Use when implementing or referencing `src/standards/etsi-en-319-142/`."
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
