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
