---
name: bookable-resources
description: Use when cataloguing or querying reservable assets — rooms, vehicles, equipment, beds, machinery, parking, co-working desks, time slots — across hospitality, fleet, facility management or field-service; rate ladders, availability windows, yield management, GL/tax linkage. The agnostic resource-booking master — pairs with bookings.
---

# bookable-resources

Bookable Resources — catalog of anything reservable (rooms, vehicles,.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-18513:2021 tourism-services-vocabulary (when kind=hotel_room)
- ISO-3166-1:2020 country-codes resource-country
- ISO-4217:2015 currency-codes pricing
- ISO-8601-1:2019 date-time availability-windows
- ISO-55000:2014 asset-management resource-as-asset
- ISO-41001:2018 facility-management bookable-spaces
- ISO-19011:2018 audit-trail resource-master-changes
- SOX §404 internal-controls revenue-completeness
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[Bookings]] · [[accounting]] · [[commerce]] · [[currency]] · [[identity]] · [[proof]].
