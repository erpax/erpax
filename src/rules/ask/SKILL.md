---
name: ask
description: "Use when measuring or reducing the human-typing cost — a required field with no defaultValue and no computed value is a bare ask. User input is the highest cost in an ERP: it costs attention, invites error, and is re-paid on every document forever. If the law, the tenant, the sequence or the clock determines the value, predefine it case by case and the user CONFIRMS instead of types. What remains is the irreducible ask: the user's actual intent. Run: tsx src/rules/ask/index.ts"
atomPath: "rules/ask"
coordinate: "rules/ask · 8/crest · 612a38e2"
contentUuid: "27c7fbfe-54fa-5d9d-9fd2-49ee924477c7"
diamondUuid: "767f7419-ba1e-8b44-8f7a-7e9fe61628e9"
uuid: "612a38e2-aed5-8f16-b239-4caf7bf1fc2e"
horo: 8
typography:
  partition: rules
  bondDegree: 29
standards:
  - "ISO 9241-110:2020 §6.2 — self-descriptiveness / suitability for the task (do not ask what is known)"
bindings: []
signatures:
  computationUuid: "634bb740-6ca4-848d-b500-30c05b0ee628"
  stages:
    - stage: path
      stageUuid: "9a3fc4dc-9cee-8359-ad84-e759b2319763"
    - stage: trinity
      stageUuid: "9f1f0139-5961-87b2-9023-07cfcb1bdb10"
    - stage: boundary
      stageUuid: "caf52912-d90d-8c5d-be05-ad5c27619918"
    - stage: links
      stageUuid: "ef00e15f-2053-8ae0-8ebb-5847a8b50998"
    - stage: horo
      stageUuid: "ce4f7a7c-efa1-83f8-a948-067ce4cddd3f"
    - stage: seal
      stageUuid: "bb0029ed-995b-8f9c-8f66-2c3a343443e6"
    - stage: uuid
      stageUuid: "34732bba-69ad-8813-b995-09166a54657b"
version: 2
---
# ask — a question the law already answers is not a question

**User input is the highest cost** — higher than tokens, higher than the seed. A token is billed once per turn; a bare ask is paid by a human on **every document, forever**, in attention and in error.

Measured across the live config:

| | count (2026-07-16) |
| --- | ---: |
| collections | 215 |
| required fields | 875 |
| predefined (`defaultValue`) or computed (`readOnly`) | **28** |
| **bare asks** | **847** |

Most are not questions. A VAT rate is fixed by **ЗДДС**; a УНП is a gapless per-device sequence; a legal ground is a **Кодекс на труда** article; a currency is the tenant's; a date is now. Each is a **derivation wearing a question's clothes**. Predefine it case by case and the user does not type — they **confirm**, or delegate the confirmation entirely.

What remains is the **irreducible ask**: which product, how many — the user's actual intent. That is `s > 0` applied to input rather than tokens ([[think]]): the seed cannot be folded, everything downstream can.

The asks concentrate where a standard already prescribes the form — `audit-committee-minutes` (14), `management-assessment-icfr` (14), `debt-schedule` (13), `bank-statements` (12). A document mandated by a standard has its fields **named by that standard**; asking a human to retype them is the purest form of this cost.

**Honest boundary.** This is a **lexical scan** of the config source (importing 215 collections exceeds the local budget), so counts are approximate and a value computed inside a `beforeChange` hook it cannot see reads as a bare ask — 86 of 215 collections have such hooks. It names **candidates for predefinition**; it never decides that a question is answerable. Some asks are the intent itself and must stay.

**Law — [[law]]: if the law, the tenant, the sequence or the clock determines a value, the system computes it and the user confirms — a required field with nothing computed for it is a question the system never asked itself.**

Composes: [[rules]] · [[think]] · [[law]].
