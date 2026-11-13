---
name: source
description: "Use when stock movements should follow from the documents that cause them — a goods receipt, a shipment and a return are not kinds of movement but its sources, so a hook writes one draft movement per line when the document reaches the state in which stock has moved, once."
atomPath: "items/inventory/movements/source"
coordinate: "items/inventory/movements/source · 1/base · 8e924197"
contentUuid: "149905d1-76d2-53ee-a1e8-0580b6d97f63"
diamondUuid: "0c328a1e-d397-8399-b9f6-834f82307a62"
uuid: "8e924197-7d88-8a6e-92fb-ebd0790409dd"
horo: 1
typography:
  partition: items
  bondDegree: 71
standards: []
bindings: []
signatures:
  computationUuid: "fba3926f-1a02-8901-8063-8ce3b50ff0d6"
  stages:
    - stage: path
      stageUuid: "7709a727-91f0-8d5c-a9f7-8e3c342ee397"
    - stage: trinity
      stageUuid: "6851b626-c385-8a7c-9a9f-f672e646a685"
    - stage: boundary
      stageUuid: "a863be5e-c40b-8dca-9183-7fe92778d65c"
    - stage: links
      stageUuid: "a4769b61-8233-825e-9d9f-4b869823e31a"
    - stage: horo
      stageUuid: "8822085c-7cb1-8a55-86ee-ffb8a8ae4e70"
    - stage: seal
      stageUuid: "8ae9fec6-7a62-8402-811c-47b4418b6686"
    - stage: uuid
      stageUuid: "3a921ae0-2da7-8667-92cf-165df3a54584"
version: 2
---
# movements/source — a stock movement is the consequence of a document

The names suggested a merge: a goods receipt, a shipment and a return each appear as an option of
the movement's `sourceDocumentType`, so they looked like kinds of movement that one collection and
a saved filter could hold. **The shapes refuse it.** Their field overlap with `inventory-movements`
is 0.00, 0.00 and 0.00 — a receipt has a purchase order and an inspection, a shipment has a carrier
and a tracking number, a return has an RMA and a reason. They are not movements. They are what
causes one.

So the relation is derivation, not sameness. Nothing wrote `inventory-movements` at all: the
collection was filled in by hand, restating a document that already held every fact but the cost.

| document | stock has moved when | movement |
| --- | --- | --- |
| goods receipt | accepted or partially accepted | `fromGoodsReceipt()` — received minus damaged, inbound |
| shipment | shipped | `fromShipment()` — the line quantity, outbound (negative) |
| return | restocked | `fromReturn()` — only the lines marked for restocking, inbound |

`deriveMovements()` is the hook each of the three collections carries. It acts when the document
ENTERS a moved state, asks which movements already exist for that document, and creates the rest —
one per line, identified by the document and the line, so saving again writes nothing.

**Drafts on purpose.** A document knows the quantity and not the cost. A draft movement is a row
waiting for the one thing the system cannot compute; posting it to the ledger stays a separate step.

**Honest boundary.** This proves a moved document has a movement per usable line, never that the
quantities are right. The movements carry no location: none of the three documents records a
warehouse location, so `fromLocation` and `toLocation` are left empty for a person to set.
Production receipts are not derived here — they already point at their movement, and the movement
has no source type that names them. A document edited AFTER stock moved does not rewrite its
movements, and reversing a document does not reverse them. And the map of which states count as
moved is declared, per document, in the open.

**Law — [[law]]: a row that is the consequence of another row is written by it. A name that matches
is not a shape that matches — measure before merging, and where the shapes differ, derive.**

## Standards

- **ISO/IEC 25010:2023 §5.2** — functional correctness: every moved line has its movement, by construction.
- **ISO 19011:2018 §6.4** — audit evidence: a movement traces to the document line that caused it.

Composes: [[items]] · [[journal]] · [[rules]]/collapse · [[rules]]/ask · [[law]].
