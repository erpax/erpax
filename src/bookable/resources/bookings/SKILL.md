---
name: bookings
description: "Use when recording or querying reservation events — hotel check-in/out, vehicle rental, equipment hire, meeting-room holds, field-service slots — against a bookable-resource; IFRS-15 over-time / point-in-time revenue recognition, cancellation policy, deposit, invoice linkage, multi-channel (direct/OTA/GDS). The canonical reservation primitive."
atomPath: "bookable/resources/bookings"
coordinate: "bookable/resources/bookings · 8/crest · e20e7873"
contentUuid: "cd0b2bd2-f9d7-5605-81d3-816c7d77b60d"
diamondUuid: "54774567-5629-87d3-8831-b9678e05d9b6"
uuid: "e20e7873-4c3a-8f47-bee4-e71e0d0deab3"
horo: 8
bonds:
  in:
    - accounting
    - customers
    - employees
    - entries
    - invoices
    - law
    - resources
    - schedule
  out:
    - accounting
    - customers
    - employees
    - entries
    - invoices
    - law
    - resources
    - schedule
typography:
  partition: bookable
  bondDegree: 26
  neighbors: []
standards:
  - "COSO-ERM-2017"
  - "EU-2017/1132"
  - "EU-2017/828"
  - "GDPR Art.6(1)(b) lawful-basis-contract guest-data"
  - "HTNG-2017 hotel-technology-next-generation"
  - "IFRS IFRS-15 §35 over-time-recognition (multi-night stay)"
  - "IFRS IFRS-15 §38 point-in-time-recognition (single-use)"
  - "IFRS IFRS-15 §B20-B27 right-of-return cancellation-policy"
  - "ISO-18513:2021 tourism-services-vocabulary check-in check-out"
  - "ISO-18513:2021 tourism-services-vocabulary check-in check-out`"
  - "ISO-4217:2015 currency-codes pricing"
  - "ISO-4217:2015 currency-codes pricing`"
  - "ISO-8601-1:2019 date-time start-end-windows"
  - "ISO-8601-1:2019 date-time start-end-windows`"
  - "OpenTravel Alliance reservation-message"
  - "RFC-5545"
  - "SOX §404 internal-controls revenue-completeness TOM-RES-01"
  - "US-CTA-2021"
  - "US-GAAP ASC-606-10-25-27 over-time-criteria"
  - "rfc-5545 icalendar-rrule recurring-bookings"
  - "rfc-5545 icalendar-rrule recurring-bookings`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
neighbors:
  wikilink:
    - accounting
    - customers
    - employees
    - entries
    - invoices
    - law
    - resources
  matrix:
    - accounting
    - customers
    - employees
    - entries
    - invoices
    - law
    - resources
    - schedule
  backlinks:
    - accounting
    - customers
    - employees
    - entries
    - invoices
    - law
    - resources
    - schedule
signatures:
  computationUuid: "5e9e302c-ef39-8446-90dd-e2b9638b0e22"
  stages:
    - stage: path
      stageUuid: "6405ba5a-73fd-84c1-ac74-c283390d3803"
    - stage: trinity
      stageUuid: "92282478-e452-8b24-80e2-6eef90962da0"
    - stage: boundary
      stageUuid: "5b6603e5-c489-8e7e-953f-5b5850b14e80"
    - stage: links
      stageUuid: "6aebc6e6-cb9d-8ffe-afac-dcbe690a58dc"
    - stage: horo
      stageUuid: "da4f9cc3-670a-8b84-a9a2-47474db6a026"
    - stage: seal
      stageUuid: "e8318bfb-c6b2-883a-bc4e-13718f0a7ba9"
    - stage: uuid
      stageUuid: "e42d5162-54c7-8932-86d9-293d08bd81b0"
version: 2
---
# bookings

Bookings — reservation events against bookable-resources.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-18513:2021 tourism-services-vocabulary check-in check-out`
- `@standard ISO-8601-1:2019 date-time start-end-windows`
- `@standard ISO-4217:2015 currency-codes pricing`
- `@standard rfc-5545 icalendar-rrule recurring-bookings`

- ISO-18513:2021 tourism-services-vocabulary check-in check-out
- ISO-8601-1:2019 date-time start-end-windows
- ISO-4217:2015 currency-codes pricing
- rfc-5545 icalendar-rrule recurring-bookings
- HTNG-2017 hotel-technology-next-generation
- OpenTravel Alliance reservation-message
- IFRS IFRS-15 §35 over-time-recognition (multi-night stay)
- IFRS IFRS-15 §38 point-in-time-recognition (single-use)
- IFRS IFRS-15 §B20-B27 right-of-return cancellation-policy
- US-GAAP ASC-606-10-25-27 over-time-criteria
- ISO-19011:2018 audit-trail booking-lifecycle
- SOX §404 internal-controls revenue-completeness TOM-RES-01
- GDPR Art.6(1)(b) lawful-basis-contract guest-data
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[bookable/resources]] · [[accounting]] · [[Invoices]] · [[journal/entries]] · [[Customers]] · [[Employees]].

**Law — [[law]]: a booking is the canonical reservation event against a [[bookable/resources]] — IFRS-15 over-time / point-in-time revenue recognition decided by the resource's use, accountable OUT to [[accounting]].**
