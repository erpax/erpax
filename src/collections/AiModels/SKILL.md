---
name: ai-models
description: Use when registering, routing, or auditing the AI model fallback catalog — provider/capability/tier per model, EU AI Act risk class, EU-hostable flag for data-residency, feature-guarded dispatch. The admin-editable expert-catalog the router dispatches over when the deterministic core cannot decide alone.
---

# ai-models

AI Models — the model catalog as erpax DATA (collections host any AI model).

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- EU AI Act 2024 risk-classification + transparency
- RFC-4122 §4.3 uuid (content-addressed model identity)
- GDPR data-residency (`euHostable` — EU PoPs for EU tenants)
- ISO-19011:2018 audit-trail model-catalogue-changes
- SOX §404 internal-controls
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[AiSuggestions]] · [[access]] · [[hooks]] · [[fields]] · [[standard]] · [[identity]].
