---
name: bookings
description: "Use when recording or querying reservation events — hotel check-in/out, vehicle rental, equipment hire, meeting-room holds, field-service slots — against a bookable-resource; IFRS-15 over-time / point-in-time revenue recognition, cancellation policy, deposit, invoice linkage, multi-channel (direct/OTA/GDS). The canonical reservation primitive."
atomPath: "bookable/resources/bookings"
coordinate: "bookable/resources/bookings · 1/base · 80c97899"
contentUuid: "d41a15d1-a307-51c0-bc66-c5fedb431bcd"
diamondUuid: "e42b3a73-a36f-8c86-83ae-5844470da5a6"
uuid: "80c97899-2794-8f5c-9d4e-9fa913bf3243"
horo: 1
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
  computationUuid: "38d04be7-673b-81d3-86e7-b2e9417d95b9"
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
      stageUuid: "c9506e05-cc78-85ea-affb-1db6eefe3f65"
    - stage: seal
      stageUuid: "e8318bfb-c6b2-883a-bc4e-13718f0a7ba9"
    - stage: uuid
      stageUuid: "b26cda73-468d-8eb0-8bf2-c0fce1091ac7"
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
