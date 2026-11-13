---
name: code
description: "Use when a resolved fiscal period needs its two identifiers — the regulatory code the framework expects (P05_2026, or Q2_2026 under XBRL for a quarterly config) and the chain leaf that binds its payload to the prior leaf through the fold's one algebra (merge). The resolver's child; the base64 'hash placeholder' that once stood here is held false by the test, sentence by sentence."
atomPath: "fiscal/period/resolver/code"
coordinate: "fiscal/period/resolver/code · 7/descent · 79aaeade"
contentUuid: "82c1e809-07a4-51c4-b0a0-fc351cc0b8a1"
diamondUuid: "2d3fe129-b687-8eca-88ae-64ea2d415702"
uuid: "79aaeade-de6d-85ee-9010-4a30c4671478"
horo: 7
typography:
  partition: fiscal
  bondDegree: 36
standards:
  - "SAF-T"
  - "SAF-T period coding"
  - XBRL
  - XBRL period identifiers
bindings: []
signatures:
  computationUuid: "25cae7a6-a80f-84bd-9a17-ac77be44aa28"
  stages:
    - stage: path
      stageUuid: "d13c04c0-e462-8268-817c-0443877d7774"
    - stage: trinity
      stageUuid: "fa8ecefe-219f-8333-b627-c9fb64ba9cfe"
    - stage: boundary
      stageUuid: "e37503fe-734d-88e1-9542-97444af0d616"
    - stage: links
      stageUuid: "cbc74935-6045-826d-bc23-7a308a8d13ec"
    - stage: horo
      stageUuid: "d2e33a5c-9cd0-8d94-a12b-58b52a14e74d"
    - stage: seal
      stageUuid: "ddc9485d-f542-82fa-a7a2-f2eebd3844cf"
    - stage: uuid
      stageUuid: "4202e32c-bdb0-8b5f-b30e-0ad1b56e6eae"
version: 2
---
# fiscal/period/resolver/code — the two identifiers a period carries

A resolved period is named twice. Once for the **framework** it reports under — `P05_2026` for
SAF-T and the default, `Q2_2026` when an XBRL filer runs quarterly periods — and once for the
**chain**: a leaf over `(payload, prior leaf)` that makes every period's row depend on the one before.

Both were private statics in the 714-line resolver hub [[rules]]/concentration named. Both are pure.
`regulatoryCode` is three lines; `chainLeaf` is one, because it is `merge(payload, priorLeaf)` —
the corpus's one fold ([[merge]]) — and the reason it is one line is the reason this atom has a test
worth reading.

## The placeholder that shipped into audit paths

The leaf used to be `Buffer.from(payload + priorLeaf).toString('base64').substring(0, 32)`, named a
"hash placeholder". Base64 maps three bytes to four characters, so thirty-two characters covered the
**first twenty-four bytes** of input — `{"calendarDate":"2026-05` — and nothing after the month.
Two dates in one month produced one leaf. The fiscal year could be rewritten `2026 → 9999` without
moving it. The prior leaf, appended past the window, was ignored entirely, so the chain never
chained. And base64 is reversible, so the leaf decoded back to its plaintext. Tamper-cost zero,
under a banner claiming tamper detection — the exact inverse of [[law]].

Each sentence of that paragraph is an assertion in `test.ts`. That is what moving the function into
its own atom bought: a claim about a one-line function that a reader can refute in one place.

**Honest boundary.** The regulatory code covers the two frameworks that name periods differently
(SAF-T and XBRL-quarterly); IAS/IFRS, US GAAP and local statutory fall through to the padded
default, which is the behaviour the class had, now stated rather than implied.

**Law — [[law]]: an identifier that binds evidence is the fold or it is nothing. A leaf that covers
part of its input, ignores its prior, and decodes to plaintext is a claim of tamper-cost the test
must be able to refute — and now can.**

## Standards

- **SAF-T** — period coding in the standard audit file.
- **XBRL** — period identifiers for quarterly filers.
- **ISO 19011:2018 §6.4** — audit evidence: a leaf is evidence only if it depends on all of its input.

Composes: [[merge]] · [[fiscal]] · [[rules]]/concentration · [[law]].
