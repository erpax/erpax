---
name: immutability
description: "Use when reasoning about whether a posted GL posting can be altered — the beforeChange hook that seals a row once postedDate is set, allowing an admin edit only with a documented override. Read this before assuming postings are immutable: the hook is correct, tested, and attached to NO collection, and gl-postings lacks the override fields it requires."
atomPath: "enforce/posting/immutability"
coordinate: "enforce/posting/immutability · 2/share · 93d1b829"
contentUuid: "e670db65-3d11-5da5-bb3f-7f17979801a1"
diamondUuid: "f372a584-b10e-8af8-9668-57614fca23f7"
uuid: "93d1b829-c3c2-8280-a69f-bf8dc05fdfe4"
horo: 2
bonds:
  in:
    - hooks
    - law
    - merge
    - posting
    - rules
  out:
    - hooks
    - law
    - merge
    - rules
typography:
  partition: enforce
  bondDegree: 12
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - hooks
    - law
    - merge
    - rules
  matrix:
    - hooks
    - law
    - merge
    - rules
  backlinks:
    - hooks
    - law
    - merge
    - rules
signatures:
  computationUuid: "deb7c834-a047-8c2e-a30e-bf95373735c6"
  stages:
    - stage: path
      stageUuid: "5c27898d-870f-8413-b4a1-cefb393a0de5"
    - stage: trinity
      stageUuid: "46a24d8a-c851-8516-904f-5762f77c6ddd"
    - stage: boundary
      stageUuid: "ef26d04c-a96b-80d5-b1dc-3888edc7269e"
    - stage: links
      stageUuid: "6e96b91e-84a6-8193-98f5-12d5873352b7"
    - stage: horo
      stageUuid: "17747673-2f29-83d0-9ea4-78df9cb368df"
    - stage: seal
      stageUuid: "e0eed64e-cd94-85b2-be39-9ba4a2eac4b5"
    - stage: uuid
      stageUuid: "bd95b69e-30ae-83d3-b169-5bf77491dc14"
version: 2
---
# immutability — the control is written, tested, and guards nothing

Once a posting is posted, it must not change. It is the audit control that sits beside the double-entry law: an ERP that lets a posted entry be edited has no auditable history, whatever its trail says.

erpax implements it **correctly**. It is wired to **nothing**.

## It was written twice

The same concept lived at two addresses — the same three words, reordered:

| | |
| --- | --- |
| `enforce/posting/immutability` | a real `beforeChange` hook, 90 lines, **tested** (5 cases in [[hooks]]' barrel test) |
| `posting/immutability/enforcer` | a 163-line class, **zero callers**, no SKILL, no test, 2 unrefutable `@invariant` claims |

The class is deleted. This is the [[rules]]/invisible pattern once more — a second implementation of one truth, growing beside the first because two lawful paths give it two content-uuids and nothing deduplicates across them. It is how one audit leaf became ten ([[merge]]/chainLeaf), and how a second `generateTrialBalance` hid inside a dead service.

## Why a posted row is still mutable

`gl-postings` runs `beforeChange: [validateNotLocked, autoPopulateCreatedBy, autoSetTimestamp('postedDate', …)]`.

It **stamps** `postedDate` — the exact seal this hook reads — and then never checks it. `validateNotLocked` is wired and is a **different control**: it stops a posting from entering a **locked period**; it says nothing about editing a row that is already posted. So a posted posting in an **open** period can be modified freely, by anyone with write access.

The claim *"Once posted-date is set, posting becomes immutable"* was true of the code and false of the system.

## Why it is not simply wired here

The hook refuses an admin edit unless `data.adminOverride === true`, and refuses that unless `adminOverrideHistory` carries a reason. **`gl-postings` has neither field.**

So wiring it as the collection stands makes a posted row immutable for *everyone* — the documented admin path the hook itself implements becomes unreachable, and the only correction left is a reversal. **That may well be the right policy** (it is what an auditor would prefer), but it is a schema-and-policy decision, not a code one, and it is not a thing to discover after wiring.

That precondition is a **law** in `test.ts` rather than a note: `wired ⇒ the collection carries the override fields`. It is an implication, so it passes today, passes after a correct wiring, and fails only on a wrong one. The gap does not block the fix; it blocks the *silent* fix.

**Honest boundary.** The hook's logic is proven in [[hooks]]' barrel test and is not restated beside it — the proof here is about the thing no test covered: whether the hook and the collection it guards agree. Nothing here makes a posted row immutable **in the database**; a hook is bypassed by any write that does not go through Payload's collection layer.

**Law — [[law]]: a control that is not attached is not a control. A hook that is correct, tested, and wired to nothing enforces exactly as much as a sentence claiming it does.**

## Standards

- **SOX §404** — internal control over financial reporting; posted entries are corrected by reversal, not edit.
- **ISO-19011:2018 §6.4** — audit evidence: the record must be what it was.

Composes: [[rules]]/refutable · [[hooks]] · [[law]].
