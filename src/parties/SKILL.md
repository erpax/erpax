---
name: parties
description: "Use when working with customers or vendors — they are one collection, parties, with a roles field; the Customers and Vendors lists are saved query presets over it, a party can hold both roles, and a role-specific field shows only for the role it belongs to."
---

# parties — one master; customer and vendor are roles

`customers` and `vendors` were the only two collections the shape measurement could prove were one
table ([[rules]]/collapse): they differed by a single field group, `bank`. They were the same thing
seen from two sides, and frequently the same counterparty — a firm you both buy from and sell to
had to be entered twice, with two codes and two VAT numbers that could disagree.

Now there is one collection with a `roles` field. A party that is both carries both.

## The two lists are saved filters

What an operator loses when two collections merge is the two lists. A query preset gives them back
without a table: a preset is a row holding a title, a filter and the visible columns over one
collection. `partyPresets()` returns two — Customers and Vendors — each filtering by `whereRole()`
and showing the columns that side cares about. They are seed rows, loaded by `loadPartyPresets()`,
which creates only the presets that are not there yet.

## The form is still the customer form or the vendor form

A role-specific field carries a condition on the party's roles, so a customer shows credit limit,
billing address and receivable account; a vendor shows bank details, remit-to address and payable
account; a party that is both shows both. Nothing was dropped: every field either collection had
is here, and the legal form is one field, `identity.type`, with the union of the two option lists.

## What the old names are now

`customers` and `vendors` are still atoms, because the sale side and the purchase side are still
real: contracts, quotes, sales orders and KYC sit under the first, vendor quotes and scorecards
under the second. Each now exports its view — the role filter and its preset — and every
relationship that pointed at either collection points at `parties`.

**Honest boundary.** A relationship to `parties` no longer says which side it wants: a purchase
requisition's preferred vendor can be set to a party that is only a customer, and nothing here
refuses that yet — the role is a filter in the lists, not a constraint on the references. A preset
is the admin's list view; an API caller filters by `roles` itself. The code is unique across all
parties, so a customer and a vendor can no longer share a code. And existing rows are not migrated
by this change: data in the two old tables has to be copied across with its role.

**Law — [[law]]: two collections that are one thing seen from two sides are one collection with a
role, and the two lists are saved filters. A table is for a different shape, never for a different
point of view.**

## Standards

- **EN 16931:2017 §BG-4 / §BG-7** — seller and buyer are both a party.
- **ISO/IEC 25010:2023 §5.6** — maintainability: one definition of a counterparty.

Composes: [[party]] · [[rules]]/collapse · [[perspective]] · [[law]].
