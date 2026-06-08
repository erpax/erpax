---
name: "7064"
description: "Use when implementing or referencing `src/standards/iso-7064/`."
atomPath: iso/7064
coordinate: iso/7064 · 8/crest · 9980ad77
contentUuid: "89818832-c93f-5642-9b4c-ee3c451df915"
diamondUuid: "e8eba428-2ea8-8ef0-9b27-2c5c437cabde"
uuid: "9980ad77-aa79-871a-80b2-797d6da7f38b"
horo: 8
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
  - "EU-2003/88/EC"
  - "ISO-7064"
  - "ISO-7064:2003 check-character-systems"
  - "ISO-7064:2003 mod-XX` plus the issuing"
bindings: []
neighbors:
  wikilink:
    - law
  matrix:
    - law
  backlinks:
    - law
signatures:
  computationUuid: "e6671d98-da46-80bd-8c64-442d215d8019"
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
      stageUuid: "efe63f75-a6d1-8353-9ee0-6028387072e6"
    - stage: seal
      stageUuid: "6fc9804e-988f-895d-a058-e21e43f85e3a"
    - stage: uuid
      stageUuid: "0538948c-6997-89d4-940d-6d8dc29670a6"
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
