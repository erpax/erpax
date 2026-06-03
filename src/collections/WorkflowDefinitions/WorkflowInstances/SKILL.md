---
name: workflow-instances
description: The workflow-instances collection — Workflow Instances — running execution of a `workflow-definition` against
---

# workflow-instances

Workflow Instances — running execution of a [[workflow-definitions]] against a specific document.

Slice HHHH (2026-05-10): one instance per (definition × document). The instance walks the steps; each step decision is appended to `stepHistory`; on completion the underlying document is approved / rejected / posted as the workflow dictates.

Pairs with [[audit-events]] — every step transition emits an audit event for ISO 19011 §6.4.6 evidence.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

Composes [[workflow-definitions]] · [[audit-events]] · [[users]] · [[hooks]] · [[access]] · [[fields]] · [[approved]].

## Standards
- ISO/IEC 19510:2013 BPMN-2.0
- ISO-8601-1:2019 date-time
- ISO-19011:2018 §6.4.6 audit-evidence-workflow
- SOX §404 internal-controls workflow-execution
- ISO-27001 A.5.23 cloud-service-tenant-isolation
