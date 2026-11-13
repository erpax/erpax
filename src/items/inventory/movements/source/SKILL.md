---
name: source
description: "Use when stock movements should follow from the documents that cause them — a goods receipt, a shipment and a return are not kinds of movement but its sources, so a hook writes one draft movement per line when the document reaches the state in which stock has moved, once."
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
