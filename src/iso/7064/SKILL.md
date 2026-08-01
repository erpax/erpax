---
name: "7064"
description: "Use when implementing or referencing `src/standards/iso-7064/`."
atomPath: "iso/7064"
coordinate: "iso/7064 · 2/share · ac4a7f81"
contentUuid: "90c1a4ec-20e2-59e1-954b-56ce7f114de5"
diamondUuid: "cdc57397-a749-87a9-aef2-c466c5a4a481"
uuid: "ac4a7f81-be2b-8ca5-bd0b-9dcc1c627ddb"
horo: 2
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
  computationUuid: "b250f40e-c4e7-83d5-b547-0f9859e9244c"
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
      stageUuid: "007b76da-26f4-8a6f-8476-df19bbbc6e71"
    - stage: seal
      stageUuid: "6fc9804e-988f-895d-a058-e21e43f85e3a"
    - stage: uuid
      stageUuid: "8c43e9d2-f76b-8c45-bfa4-6f1bdd8f6f1c"
version: 2
---
# `src/standards/iso-7064/`

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
