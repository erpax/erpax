---
name: parties
description: "Use when working with customers or vendors — they are one collection, parties, with a roles field; the Customers and Vendors lists are saved query presets over it, a party can hold both roles, and a role-specific field shows only for the role it belongs to."
atomPath: parties
coordinate: "parties · 2/share · 11412665"
contentUuid: "f454732f-8793-5875-9859-dd9fbb408582"
diamondUuid: "5fd72015-d3ac-864c-94d4-d7b5445f15e3"
uuid: "11412665-ce61-8863-acd1-7e739665875e"
horo: 2
typography:
  partition: parties
  bondDegree: 16
standards:
  - "EN-16931:2017 §BG-4 seller §BG-7 buyer"
  - "GDPR Art.5 data-minimization"
  - "GDPR Art.6(1)(b) lawful-basis-contract"
  - "IFRS IFRS-9 financial-instruments accounts-receivable"
  - "ISO-13616-1:2020 iban"
  - "ISO-17442"
  - "ISO-17442-1"
  - "ISO-17442-1:2020 lei"
  - "ISO-20022 pain.001 customer-credit-transfer-initiation"
  - "ISO-20022 pain.008 customer-direct-debit-initiation"
  - "ISO-3166-1:2020 country-codes via-addresses"
  - "ISO-4217:2015 currency-codes"
  - "ISO-9362:2022 bic"
  - "US-GAAP ASC-310 receivables ASC-405 liabilities"
  - "US-IRS Form-1099 information-return"
bindings: []
signatures:
  computationUuid: "627904b7-a90a-87ac-960e-6b94341b7007"
  stages:
    - stage: path
      stageUuid: "da7428cb-6076-8e1b-8cae-fbed57e84930"
    - stage: trinity
      stageUuid: "7e2550b8-28d7-8dfb-a5d8-de03ecbfde8c"
    - stage: boundary
      stageUuid: "d39d7b9e-504f-883f-9d0f-bcda5cc14bcf"
    - stage: links
      stageUuid: "63dfb49b-713c-8350-b9e4-fa86579e6d22"
    - stage: horo
      stageUuid: "01550e26-e86e-8643-b0ac-c6b6a9ac9e12"
    - stage: seal
      stageUuid: "fea01e56-b765-8885-bb20-40a5effacaca"
    - stage: uuid
      stageUuid: "500d6ba9-8f1c-8106-b47b-f129dc1f6ca1"
version: 2
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
