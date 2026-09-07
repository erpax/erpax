---
name: "7064"
description: "Use when implementing or referencing `src/iso/7064/index.ts`."
atomPath: "iso/7064"
coordinate: "iso/7064 · 7/descent · cdd708ea"
contentUuid: "d5454435-1bc6-5db0-8446-291c366075a0"
diamondUuid: "6bddc3ef-7e3d-8f95-9227-b9435a7a0a10"
uuid: "cdd708ea-4996-8232-a0b2-6dbf01ee5325"
horo: 7
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
  computationUuid: "6e5ec3bb-6d80-8884-9ce2-9031c09808aa"
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
      stageUuid: "175c4182-579d-8882-8556-a99e130ff0a1"
    - stage: seal
      stageUuid: "1f7a629c-7da2-8976-b401-8baa32b25ead"
    - stage: uuid
      stageUuid: "13de4e84-a618-8d9d-87b2-7c49ca43c066"
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
