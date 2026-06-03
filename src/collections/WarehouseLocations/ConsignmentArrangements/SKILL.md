---
name: consignment-arrangements
description: The consignment-arrangements collection — Consignment Arrangements — IFRS-15 §B77-B78 / ASC 606-10-55-79 master
---

@standard EN-16931:2017 §BG-15 deliver-to-information
@standard INCOTERMS 2020 (CPT / CIP / DDP control-transfer points)
@standard ISO-3166-1:2020 country-codes
@standard ISO-4217:2015 currency-codes
@accounting IFRS IFRS-15 §B77-B78 consignment-arrangements
@accounting IFRS IFRS-15 §38 point-in-time-control-transfer
@accounting US-GAAP ASC-606-10-55-79 consignment-indicators
@accounting US-GAAP ASC-606-10-55-80 consignment-control
@accounting IFRS IAS-2 §6 inventory-held-at-other-location
@audit ISO-19011:2018 audit-trail consignment-arrangement-evidence
@compliance SOX §404 internal-controls revenue-deferral TOM-AR-04
@security ISO-27001 A.5.23 cloud-service-tenant-isolation

## Overview

Consignment Arrangements — IFRS-15 §B77-B78 / ASC 606-10-55-79 master. When entity A (consignor / tenant) ships goods to entity B (consignee) for storage and onward sale, control does **not** transfer until the consignee sells to an end-customer. Per IFRS-15 §B78 the consignor recognises inventory at the consignee's location AND keeps revenue deferred until the §B77 indicators (control passed, no return-right, etc.) resolve.

## Composition

- [[ConsignmentInventory]] — per-SKU running balance at the consignee's location
- [[ConsignmentSales]] — sale events that trigger IFRS-15 §38 point-in-time revenue recognition
- [[accounting]] — [[transaction]] accounting records, [[entry]] generation, [[balance]] tracking
- [[proof]] — evidence attestation and audit trail anchors
- [[identity]] — consignee party identification and relationship tracking

## Schema

Master agreement fields define:
- **reference** — sequential arrangement identifier (e.g. `CONS-2026-001`)
- **consignee** — counterparty holding goods on behalf of consignor
- **effectiveFrom / effectiveTo** — arrangement term
- **controlTransferTrigger** — IFRS-15 §B77 event that resolves consignment indicators (sale, acceptance, time-out, manual)
- **returnRights** — IFRS-15 §B77(c) return-right indicator (unrestricted, window, none)
- **incoterm** — INCOTERMS 2020 (CPT / CIP / DAP / DPU / DDP / EXW / FCA); note: physical-delivery incoterm does NOT transfer accounting control under consignment
- **maxValue** — on-hand value limit at consignee location
- **commissionRatePercent** — consignee earnings on sale (0–100%)
- **evidenceAttestation** — signed PDF agreement (eIDAS PAdES) — auditor walk-through anchor
- **status** — draft → active → suspended → terminated
