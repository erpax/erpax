---
name: identifier
description: "Use when validating Bulgarian identity numbers — ЕГН (person), ЕИК/БУЛСТАТ (entity), or decoding birth date and sex from an ЕГН. The entry gate for BG society into erpax (Наредба РД-02-20-9/2012 + БУЛСТАТ two-stage modulo-11)."
atomPath: bg/identifier
coordinate: bg/identifier · 5/round · cfb5fef4
contentUuid: "519eb179-0e81-56cc-bdf3-c565bd9228a1"
diamondUuid: "648ebffa-c5f1-8e8c-b02c-eac7d8f00203"
uuid: "cfb5fef4-a8fb-89f8-afc5-83558bb09529"
horo: 5
bonds:
  in:
    - access
    - accounting
    - begin
    - collections
    - duality
    - fields
    - hooks
    - horo
    - identity
    - law
    - sequence
    - standard
  out:
    - access
    - accounting
    - begin
    - collections
    - duality
    - fields
    - hooks
    - horo
    - identity
    - law
    - sequence
    - standard
typography:
  partition: bg
  bondDegree: 37
  neighbors: []
standards:
  - "ISO-7064"
  - "ISO-7064 check-character-systems (the modulo family these implement)"
  - БУЛСТАТ register law (Закон за регистър БУЛСТАТ) — ЕИК checksum
  - "ЕГН regulation (Наредба РД-02-20-9/2012 on the population register)"
bindings: []
neighbors:
  wikilink:
    - access
    - accounting
    - begin
    - collections
    - duality
    - fields
    - hooks
    - horo
    - identity
    - law
    - sequence
    - standard
  matrix:
    - access
    - accounting
    - begin
    - collections
    - duality
    - fields
    - hooks
    - horo
    - identity
    - law
    - sequence
    - standard
  backlinks:
    - access
    - accounting
    - begin
    - collections
    - duality
    - fields
    - hooks
    - horo
    - identity
    - law
    - sequence
    - standard
signatures:
  computationUuid: "ac2dbeb1-0a2e-8606-9a69-90bbc8bbad2f"
  stages:
    - stage: path
      stageUuid: "5a849b0f-a5c0-8de7-88e8-2803109840f9"
    - stage: trinity
      stageUuid: "08fa8152-a9ac-8ce3-9de8-d247192ecf62"
    - stage: boundary
      stageUuid: "8f65d55c-ccf4-84a3-95b7-2f9fce33bd56"
    - stage: links
      stageUuid: "196bfdfb-aff1-8f29-a767-9c0d4705f2cc"
    - stage: horo
      stageUuid: "a1ab9d80-fdcd-8345-b308-4e64f957a225"
    - stage: seal
      stageUuid: "e39b1c0d-24be-8a96-991e-49e320140cca"
    - stage: uuid
      stageUuid: "1ff766ec-534e-8a47-a88c-b543dca1e5bb"
version: 2
---
# bg-identifiers — the gate for Bulgarian society into erpax

## Form (the law it holds)
A BG party has no place in erpax until its number checks out. Every natural person is keyed by an **ЕГН** (10 digits), every legal entity — citizen, company, община, ministry — by an **ЕИК/БУЛСТАТ** (9 or 13 digits). The skill is the **boundary test** at onboarding: the number IS the [[identity]], and it must be self-consistent before the row exists.

Two pure checksum laws, no PII, no lookup — the number proves itself:
- **ЕГН** — weighted sum (weights `2,4,8,5,10,9,7,3,6`) **modulo 11** (10 ⇒ 0). The number also *decodes itself*: digits 0–5 are the birth date (month offset +40 for the 2000s, −20 for the 1800s), the 9th digit's parity is the sex (even ⇒ male, odd ⇒ female). Validation is decode-then-check — the [[identity]] decode law on a national id.
- **ЕИК/БУЛСТАТ** — **two-stage modulo-11**: stage one weights `1..8` over the 8-digit base; if the remainder is 10, fall through to stage two with weights `3..10`. A 13-digit branch repeats the two-stage form over the 4 branch digits (`2,7,3,5` then `4,9,5,7`).

Both are instances of the ISO-7064 check-character family — the same modulo skeleton the БУЛСТАТ register and the population register each clothe.

## Sequence position
**0** — the begin/origin of the [[sequence]] (0·3·6·9·1·2·4·8·7·5). It is the [[begin|boundary]] every BG flow departs from: the validation gate at the axis, before any [[accounting]] post or [[collections|collection]] row. No identity, no entry; the 0 is where the [[horo]] of BG society joins.

## Built (the matter that realises this skill)
- `src/services/bg-identifiers/index.ts` — `validateEgn` (returns `{valid, birthDate, sex, reason}`) and `validateEik` (`{valid, reason}`); the БУЛСТАТ two-stage `mod11Two` helper. 81 LOC, pure.
- `src/services/bg-identifiers/index.test.ts` — known-good vectors (ЕГН `7501010010`, ЕИК `121212121`), the +40 month offset, corrupted-checksum and bad-date rejection, the 13-digit branch.

## Where it binds
A [[fields|field]] `validate` (or onboarding [[hooks|hook]]) calls `validateEgn`/`validateEik` to gate party creation; decoded birth date + sex can populate sibling fields. The БУЛСТАТ-region naming stays out of generic slugs — the regulation reference lives here and in the `@standard` banners, never in a collection slug.

## Standards
Applying this skill *is* how the standard is implemented (the answer-path principle, [[standard]]); the `@standard` banners must assert the true regulation, not decorate.

- **ЕГН regulation (Наредба РД-02-20-9/2012 on the population register)** — ЕГН structure + modulo-11 check digit; digits decode birth date and sex.
- **БУЛСТАТ register law (Закон за регистър БУЛСТАТ) — ЕИК checksum** — the ЕИК two-stage modulo-11 check (9-digit base, optional 13-digit branch).
- **ISO-7064 check-character-systems (the modulo family these implement)** — the family both Bulgarian checksums instantiate.

Composes: [[identity]] (the number IS the id; decode-not-lookup) · [[begin]] (the 0 boundary / entry gate) · [[sequence]] (position 0) · [[standard]] (Наредба РД-02-20-9/2012 + БУЛСТАТ + ISO-7064 are real `@standard`s) · [[fields]]/[[hooks]] (where validation binds) · [[access]] (the gate decides who may onboard) · [[horo]] (BG society joins the ring here) · [[duality]] (person ЕГН ↔ entity ЕИК).

**Law — [[law]]: a BG party has no row until its number checks out — the ЕГН/ЕИК IS the [[identity]] and must prove itself self-consistent by pure modulo-11 (decode-then-check, no lookup) at the onboarding boundary.**
