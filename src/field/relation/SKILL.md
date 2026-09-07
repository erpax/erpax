---
name: relation
description: "Use when reasoning about relation — A Payload relationship is one value with two shapes: the raw id when unpopulated, the whole document when populated. A **polymorphic** one is a third shape — ."
atomPath: "field/relation"
coordinate: "field/relation · 8/crest · 1288fef9"
contentUuid: "c5704b35-94d1-5309-8b10-134c5523952c"
diamondUuid: "7e2e4a78-9e90-894e-be5a-7c1e89138078"
uuid: "1288fef9-993d-84df-9530-38fbc228843d"
horo: 8
typography:
  partition: field
  bondDegree: 9
standards: []
bindings: []
signatures:
  computationUuid: "31b715ad-0640-8c67-a512-a1cdd067c45f"
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
      stageUuid: "c9bfdab7-63ff-8778-acbe-b3ddf8b5ba6b"
    - stage: seal
      stageUuid: "ed9b5633-2aa2-8fa6-a4a4-7bc6492a43b1"
    - stage: uuid
      stageUuid: "ab1062bc-a834-8721-8917-dbe4524b61e9"
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
