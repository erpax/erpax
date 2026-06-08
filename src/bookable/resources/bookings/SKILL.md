---
name: bookings
description: "Use when recording or querying reservation events — hotel check-in/out, vehicle rental, equipment hire, meeting-room holds, field-service slots — against a bookable-resource; IFRS-15 over-time / point-in-time revenue recognition, cancellation policy, deposit, invoice linkage, multi-channel (direct/OTA/GDS). The canonical reservation primitive."
atomPath: bookable/resources/bookings
coordinate: bookable/resources/bookings · 2/share · 9e4e03ce
contentUuid: "445c63ee-03c4-523b-9f6b-4c58055192b3"
diamondUuid: "afc53a5e-3fd6-8e7e-b575-dd7b13d91087"
uuid: "9e4e03ce-cece-89a8-aee8-6e43ad1233f0"
horo: 2
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
  - "EU-2015/847"
  - "EU-2015/849"
  - "EU-2017/1132"
  - "EU-2017/828"
  - "EU-2019/1150"
  - "EU-2019/1152"
  - "EU-2019/1937"
  - "EU-2019/2161"
  - "EU-2019/770"
  - "EU-2019/771"
  - "EU-Intrastat-Reg-2019/2152"
  - "GDPR Art.6(1)(b) lawful-basis-contract guest-data"
  - "HTNG-2017 hotel-technology-next-generation"
  - "IFRS IFRS-15 §35 over-time-recognition (multi-night stay)"
  - "IFRS IFRS-15 §38 point-in-time-recognition (single-use)"
  - "IFRS IFRS-15 §B20-B27 right-of-return cancellation-policy"
  - "ISO-18513:2021 tourism-services-vocabulary check-in check-out"
  - "ISO-19011:2018 audit-trail booking-lifecycle"
  - "ISO-4217"
  - "ISO-4217:2015 currency-codes pricing"
  - "ISO-8601-1"
  - "ISO-8601-1:2019 date-time start-end-windows"
  - "OpenTravel Alliance reservation-message"
  - "RFC-5545"
  - "SOX §404 internal-controls revenue-completeness TOM-RES-01"
  - "US-CTA-2021"
  - "US-GAAP ASC-606-10-25-27 over-time-criteria"
  - "rfc-5545 icalendar-rrule recurring-bookings"
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
  computationUuid: "885f3a04-f511-89f2-b9ca-147aef5e0d0f"
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
      stageUuid: "9845f694-e2d7-8c85-8f16-58702e15e599"
    - stage: seal
      stageUuid: "e8318bfb-c6b2-883a-bc4e-13718f0a7ba9"
    - stage: uuid
      stageUuid: "6aaceb34-c1d6-8a63-a324-30561716dec4"
version: 2
---
# bookings

Bookings — reservation events against bookable-resources.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
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
