---
name: supto
description: Bulgarian Наредба Н-18 / СУПТО retail fiscal regime — the УНП (unique sales number XXXXXXXX-ZZZZ-0000001), no-delete / reversal-only immutability, read-only audit profile, the monthly standardized audit (XML, Appendix 38), and fiscal-device (ФУ) receipt linkage. Read when implementing BG point-of-sale compliance, or as the worked example of mapping a government audit regime onto the content-uuid model — СУПТО ≈ a state-mandated content-addressed audit system.
---

# supto — Наредба Н-18 / СУПТО, mapped onto the content-uuid model

СУПТО (*Софтуер за управление на продажбите в търговски обекти* — sales-management software for commercial outlets), regulated by **Наредба Н-18** and the НАП registry, is — structurally — a **government-mandated content-addressed audit system**. It maps onto the erpax [[identity]] framework almost 1:1; the divergences are exactly what [[identity]]'s *"the uuid type is standards-driven"* predicts.

## The regime → the skill it already is
| Н-18 / СУПТО requirement | erpax skill / mechanism | status |
|---|---|---|
| **УНП** — unique sales number `XXXXXXXX-ZZZZ-0000001` (8-digit ФУ id · 4-digit operator · 7-digit per-device sequence, gapless +1, Arabic only, `-` delimited) | [[number]] (human/regulatory handle) per-**ФУ** scope sequence hook; structurally a decodable structured id like the **uuidv8** of [[identity]] (`encodeStructured`: fixed layout, meaning packed in, read by [[reverse|decode]] not lookup) | **gap** — `number` factory exists, the per-device УНП format + sequence hook does not |
| УНП ties order ↔ fiscal receipt ↔ payment (one number across the sale's whole lifecycle) | the **shared coordinate** law: one id everywhere ([[identity]]); the [[event]] `aggregateId` as the cross-document key | mechanism exists |
| **No delete / no modify** of completed sales; **reversal-only (сторно)** preserving the original | [[reverse]] (mirror the entry, preserve source) + [[identity]] seal/immutability (posted/`SEALED` frozen); `generateReversingEntries` | **implemented** — сторно ≡ the reverse skill's law |
| Tamper protection on recorded sales | **content-uuid Law 8**: recompute the content hash → any in-place edit mismatches and is flagged (`tamper-proof-uuid-field`); the `SEALED`/`TAMPER_PROOF` uuidv8 capability flags | **implemented** — content-addressing *is* the tamper-proofing СУПТО demands |
| Tamper-evident, gapless journal | the **Merkle audit chain** — `priorHash`/`chainLeafUuid = sha256(JCS(row) ‖ prior_leaf)` on `audit-events` | **implemented** |
| **Read-only audit profile** for НАП inspection | [[access]] read-only role; the uuid-share `AccessRole` lattice (audit ⊥) | mechanism exists |
| **Standardized audit file** (XML, Приложение 38, monthly by the 15th) | SAF-T export (`saf-t-export.service`) as the universal base; the BG file is a **country profile** over it (jurisdiction cascade, [[identity]]); submit via `submitBgSaft` over НАП mTLS | **gap** — OECD SAF-T base + НАП mTLS exist; the BG Appendix-38 variant does not |
| ФУ (fiscal device) receipt issuance carrying the УНП | a [[hooks]] membrane call to the device (matter side, like `submitBgSaft`/`postBgNapMtls`); the receipt and the sale share the УНП coordinate | **gap** — no ФУ integration |

## Why УНП ≈ uuid (the match, and the divergence)
The УНП and the structured **uuidv8** are the *same idea*: a fixed-layout, **self-describing, lookup-free** identifier — decode the string and you know its origin (УНП → device+operator+sequence; uuidv8 → slot+capabilities+schema+content). Both make the id the coordinate that ties a flow together. The **divergence** is that УНП is **sequential** (regulatory gapless +1), not a content hash — so per [[identity]]'s standards-driven rule, a СУПТО sale's *regulatory* id is the УНП while the *machine* id is the content-uuid (uuidv8 `TAMPER_PROOF`) riding beside it — the row-`id` ↔ content-`uuid` [[duality]]. The [[number]] law states it exactly: *the number is the human/regulatory handle, the content-uuid the machine identity.*

## Gaps to close (the seeds)
1. **УНП generator** — a per-ФУ sequence hook emitting `XXXXXXXX-ZZZZ-0000001` + a format validator ([[number]] specialised; tests mirror it).
2. **УНП as the lifecycle coordinate** — stamp it on the sale, propagate to fiscal receipt + payment ([[event]]/[[identity]]).
3. **ФУ integration** — a country-client membrane call ([[hooks]], like `submitBgSaft`).
4. **BG audit file** — the Appendix-38 XML variant over the OECD SAF-T base.
5. **Wire tamper-proof content-uuid + audit chain** onto the СУПТО sales collections (mechanism exists; opt the entities in).

Composes: [[identity]] (content-uuid + standards-driven id type + uuidv8/decode) · [[number]] (УНП sequence) · [[reverse]] (сторно) · [[standard]] (Н-18 is a real `@standard`, not decoration) · [[accounting]] (the sale → GL) · [[event]] (УНП-keyed lifecycle) · [[access]] (audit profile).
