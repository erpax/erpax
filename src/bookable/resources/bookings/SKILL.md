---
name: bookings
description: "Use when recording or querying reservation events — hotel check-in/out, vehicle rental, equipment hire, meeting-room holds, field-service slots — against a bookable-resource; IFRS-15 over-time / point-in-time revenue recognition, cancellation policy, deposit, invoice linkage, multi-channel (direct/OTA/GDS). The canonical reservation primitive."
atomPath: "bookable/resources/bookings"
coordinate: "bookable/resources/bookings · 4/weave · ac9cc13c"
contentUuid: "f3fd2f49-299d-5d6d-b7d6-f2789af60f73"
diamondUuid: "eba70bc6-5c2c-8c4c-83d1-638cb1f5932b"
uuid: "ac9cc13c-4178-8371-8126-adc6d28bbeb7"
horo: 4
typography:
  partition: bookable
  bondDegree: 26
standards:
  - "COSO-ERM-2017"
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
signatures:
  computationUuid: "a6120a3f-8f33-8b74-8a52-a9e500dfe53e"
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
      stageUuid: "d5f24494-d88e-8fbc-9629-5bc0cf8e9570"
    - stage: seal
      stageUuid: "e8318bfb-c6b2-883a-bc4e-13718f0a7ba9"
    - stage: uuid
      stageUuid: "0bf09eb1-4800-8f9f-ab33-5c6ff46d5ef2"
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
