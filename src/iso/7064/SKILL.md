---
name: "7064"
description: "Use when implementing or referencing `src/iso/7064/index.ts`."
atomPath: "iso/7064"
coordinate: "iso/7064 · 5/round · e4c603a9"
contentUuid: "958ae30a-f73d-51db-b4f7-553d1d427a22"
diamondUuid: "ea0280fc-16d8-8fd4-9388-42aff9fdd794"
uuid: "e4c603a9-d8ee-864e-90d4-0f539a5401b2"
horo: 5
typography:
  partition: iso
  bondDegree: 3
standards:
  - "EU-2003/88/EC"
  - "ISO-7064"
  - "ISO-7064:2003 check-character-systems"
  - "ISO-7064:2003 mod-XX` plus the issuing"
bindings: []
signatures:
  computationUuid: "5e3b8d74-d7c9-8039-8f0e-60798563937d"
  stages:
    - stage: path
      stageUuid: "501672c3-f75c-8837-8892-9949b8f11c91"
    - stage: trinity
      stageUuid: "c3a656eb-4c35-8dac-abba-6e72b7f1a16b"
    - stage: boundary
      stageUuid: "f01d794c-a486-820b-b50f-914d245f5c81"
    - stage: links
      stageUuid: "6ee5b31f-955e-83b3-97fa-3e49ef86b45f"
    - stage: horo
      stageUuid: "4b373c8e-9ace-81d7-96e0-59d364afc96f"
    - stage: seal
      stageUuid: "1f7a629c-7da2-8976-b401-8baa32b25ead"
    - stage: uuid
      stageUuid: "18a14fb5-2fca-8b3b-9cac-8ad306b5d8a3"
version: 2
---
# `src/iso/7064/index.ts`

ISO 7064 check-character systems — mod-11, mod-97-10, mod-37-2 hash schemes
that embed integrity check digits in identifiers (IBAN, BG EGN, ISBN,
LEI, …).

| Module | Standard implemented |
|---|---|
| `egn-bg.ts` | BG ЕГН (Единен граждански номер) — 10-digit personal id with mod-11 check digit + embedded birth date |

In scope: per-country identifiers whose check-digit algorithm is governed
by ISO 7064. Out of scope: identifiers governed by other algorithms (e.g.
Luhn / mod-10 — credit card PANs go in `iso-iec-7812/`).

When adding a new identifier:

1. New file under this folder, named after the issuing standard
   (`<authority>-<id-type>.ts` — e.g. `iban-no.ts` for Norway-specific
   IBAN parsing).
2. JSDoc banner with `@standard ISO-7064:2003 mod-XX` plus the issuing
   authority's standard.
3. Spec mirror under `tests/standards/iso-7064/`.
4. Re-export from `index.ts`.
5. `pnpm standards:write-index` to refresh `docs/STANDARDS_INDEX.md`.

**Law — [[law]]: a check-character system embeds integrity into the identifier itself — the trailing check digit is computed from the body (mod-11 / mod-97-10 / mod-37-2), so a single-digit error or transposition is caught by the number, not by a lookup.**
