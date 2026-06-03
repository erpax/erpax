---
name: activities
description: The activities collection — Activities — calls / emails / meetings log per lead / opportunity / customer
---

# activities

Activities — calls / emails / meetings log per lead / opportunity / customer.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-8601-1:2019 date-time
- rfc-5545 icalendar
- GDPR Art.5(1)(c) data-minimisation
- GDPR Art.30 records-of-processing-activities
- ISO-19011:2018 audit-trail crm-activity
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[Leads]] · [[Opportunities]] · [[Customers]] · [[Vendors]] · [[Users]].
