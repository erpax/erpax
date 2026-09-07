---
name: relation
description: "Use when reasoning about relation — A Payload relationship is one value with two shapes: the raw id when unpopulated, the whole document when populated. A **polymorphic** one is a third shape — ."
atomPath: "field/relation"
coordinate: "field/relation · 8/crest · 98905420"
contentUuid: "45afe598-4e77-58b9-b05c-5ee85328f0dc"
diamondUuid: "d06c353a-8c50-8608-b8e1-32b8fe85b795"
uuid: "98905420-0efb-8242-bfa8-54d97aa17d42"
horo: 8
typography:
  partition: field
  bondDegree: 9
standards: []
bindings: []
signatures:
  computationUuid: "0dffeee5-b67d-87ba-be99-964c540782f3"
  stages:
    - stage: path
      stageUuid: "194bd4d9-a82f-89fc-b136-f7e2961e90a6"
    - stage: trinity
      stageUuid: "6284e2ea-b674-8825-b4a3-ce703530235b"
    - stage: boundary
      stageUuid: "2c20f5f3-320c-86d7-87b2-0a454385b444"
    - stage: links
      stageUuid: "c9dfd5fb-eecd-80f6-a5c5-2a7741a9a4e1"
    - stage: horo
      stageUuid: "68a3f776-3b0d-8ad0-8c78-a230473ecc2e"
    - stage: seal
      stageUuid: "ed9b5633-2aa2-8fa6-a4a4-7bc6492a43b1"
    - stage: uuid
      stageUuid: "288b1aa4-a095-8c53-aeb9-807f1e17f3c1"
version: 2
---
# field/relation — six sites, three answers, one input

A Payload relationship is one value with two shapes: the raw id when unpopulated, the whole
document when populated. A **polymorphic** one is a third shape — `{ relationTo, value }`.

Six call sites each wrote the reader. [[rules]]/copy hashed them into three groups, which is the
finding: they were not one function copied six times, they were **three different answers to the
same question**, and no call site could see the other two.

| variant | returns | on `{ relationTo, value: 3 }` |
| --- | --- | --- |
| `factory` · `invoices/…/recomputeItemInventory` | `string \| undefined` — stringifies a numeric id | `undefined` |
| `sale/fiscal/reference` · `sale/receipt-subscriber` | `string \| number \| undefined` | `undefined` |
| `tags/taggings/counter` · `vocabulary/tag/setTagList` | `string \| number \| null`, reads `.value` | `3` |

Two of the three are blind to the polymorphic shape and answer **undefined** for a relationship
that is plainly present. That is not a style difference — it is a silent zero in whatever the
caller was counting.

The fold keeps all three contracts, as three named exports of one atom, so the difference is now
something a reader **chooses** rather than something they inherit from whichever file they are in.
`relationIdString` exists because the stringifying variant's callers key maps on the result.

**Honest boundary.** This proves the six bodies reduced to three behaviours and preserves each. It
does not decide that any call site picked the right one — a site using `relationId` on a
polymorphic field is still wrong, and this atom makes that visible instead of fixing it.

**Law — [[law]]: the same question asked in six places gets six answers, and the disagreement is
invisible from inside any one of them. One atom, named variants, and the choice becomes explicit.**

Composes: [[field]] · [[rules]]/copy · [[law]].
