---
name: immutability
description: "Use when reasoning about whether a posted GL posting can be altered — the beforeChange hook that seals a row once postedDate is set, allowing an admin edit only with a documented override. Read this before assuming postings are immutable: the hook is correct, tested, and attached to NO collection, and gl-postings lacks the override fields it requires."
atomPath: "enforce/posting/immutability"
coordinate: "enforce/posting/immutability · 4/weave · b88f3005"
contentUuid: "1ff8fd93-717b-5b31-b45e-33322c7c2fcf"
diamondUuid: "d29e5e9a-a8cb-8aab-9423-69b8b88ca2ee"
uuid: "b88f3005-c9d8-8314-b0a8-b32a8fe5176e"
horo: 4
typography:
  partition: enforce
  bondDegree: 16
standards: []
bindings: []
signatures:
  computationUuid: "1b1a7a83-5399-81f3-8b16-c928a00a0e36"
  stages:
    - stage: path
      stageUuid: "5c27898d-870f-8413-b4a1-cefb393a0de5"
    - stage: trinity
      stageUuid: "46a24d8a-c851-8516-904f-5762f77c6ddd"
    - stage: boundary
      stageUuid: "ef26d04c-a96b-80d5-b1dc-3888edc7269e"
    - stage: links
      stageUuid: "b01135af-b421-801b-84a1-4172c3437f56"
    - stage: horo
      stageUuid: "34817e8c-1a43-8ea9-ab77-dd11c8ffcfd1"
    - stage: seal
      stageUuid: "e0eed64e-cd94-85b2-be39-9ba4a2eac4b5"
    - stage: uuid
      stageUuid: "55bd751b-ad8f-8e4e-92cd-f1ac5b161eb4"
version: 2
---
# immutability — the control was written, tested, and guarded nothing; it is attached now

Once a posting is posted, it must not change. It is the audit control that sits beside the
double-entry law: an ERP that lets a posted entry be edited has no auditable history, whatever its
trail says.

erpax implemented it **correctly** and wired it to **nothing**. That is now fixed, and the fix was a
PAIR — because this file said, before the wiring existed, exactly why a one-liner would be wrong.

## It was written twice

The same concept lived at two addresses — the same three words, reordered:

| | |
| --- | --- |
| `enforce/posting/immutability` | a real `beforeChange` hook, 90 lines, **tested** (5 cases in [[hooks]]' barrel test) |
| `posting/immutability/enforcer` | a 163-line class, **zero callers**, no SKILL, no test, 2 unrefutable `@invariant` claims |

The class is deleted. This is the [[rules]]/invisible pattern once more — a second implementation of
one truth, growing beside the first because two lawful paths give it two content-uuids and nothing
deduplicates across them.

## How a posted row stayed mutable

`gl-postings` ran `beforeChange: [validateNotLocked, autoPopulateCreatedBy, autoSetTimestamp('postedDate', …)]`.

It **stamped** `postedDate` — the exact seal this hook reads — and then never checked it.
`validateNotLocked` is a **different control**: it stops a posting entering a **locked period**; it
says nothing about editing a row that is already posted. So a posted posting in an **open** period
could be modified freely, by anyone with write access.

The claim *"once posted-date is set, posting becomes immutable"* was true of the code and false of
the system. It was found by [[rules]]/unreached: the atom was reachable from no entry at all.

## Why the fix is a pair

The hook refuses an admin edit unless `data.adminOverride === true`, and refuses that unless
`adminOverrideHistory` carries a reason. **`gl-postings` had neither field.** Wiring the hook alone
would have made a posted row immutable for *everyone* — the documented admin path the hook itself
implements would be unreachable, and the only correction left a reversal.

So both fields were added with the wiring, and the hook runs **first** in `beforeChange`: a posted
row is refused before anything else mutates data.

That precondition was a **law** in `test.ts` rather than a note — `wired ⇒ the collection carries the
override fields` — written as an implication so it passed while unwired, passes after a correct
wiring, and fails only on a wrong one. It did its job: it is what turned a one-line wiring into the
right change, and this paragraph is written by the agent it caught.

**Honest boundary.** The hook's logic is proven in [[hooks]]' barrel test and is not restated beside it — the proof here is about the thing no test covered: whether the hook and the collection it guards agree. Nothing here makes a posted row immutable **in the database**; a hook is bypassed by any write that does not go through Payload's collection layer.

**Law — [[law]]: a control that is not attached is not a control. A hook that is correct, tested, and wired to nothing enforces exactly as much as a sentence claiming it does.**

## Standards

- **SOX §404** — internal control over financial reporting; posted entries are corrected by reversal, not edit.
- **ISO-19011:2018 §6.4** — audit evidence: the record must be what it was.

Composes: [[rules]]/refutable · [[hooks]] · [[law]].
