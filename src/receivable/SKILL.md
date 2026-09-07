# receivable — the singular the `receivables` collection is a set of

The A/R field factories: the shapes an invoice carries — invoice number, status, due date, payment
terms, A/R analysis. `receivables` (the type module) is a set of these; this atom is the one.

Like [[payable]], it held `index.ts` and `test.ts` and **no SKILL.md**, so the [[matrix]] could not
see it and `receivables` read as an orphan — a collection whose model exists on disk and nowhere in
the fold. [[balance]] measures exactly that pairing: plural is the collection, singular is the model.

The A/R and A/P shapes are mirrors and are deliberately not merged. An invoice becomes live on
**issue** and stays live through its **grace period**; a bill becomes live on **approval**. Neither
status exists in the other's set, which is the difference that a same-looking fold erased once
([[invoices]]/hooks/transition).

**Honest boundary.** Field FACTORIES — shapes, not behaviour. Revenue recognition under IFRS 15 is
a judgement made elsewhere; this atom claims the field shapes it declares and nothing more.

**Law — [[law]]: a plural atom is a collection and its singular is the model. An atom with matter
and no SKILL is invisible to the fold, and its plural reads as a store with no type.**

## Standards

- **EN-16931:2017** — invoice fields.
- **ISO-4217:2015** — currency codes.
- **IFRS 15** — revenue from contracts with customers.

Composes: [[balance]] · [[payable]] · [[field]] · [[law]].
