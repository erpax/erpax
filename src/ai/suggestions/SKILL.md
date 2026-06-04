---
name: ai-suggestions
description: Use when recording, querying, or auditing an AI inference — prompt/model/output/confidence, the human's accept/reject/edit decision, the downstream record it was applied to, and the EU AI Act risk class; GDPR Art.22(3) right-to-explain trail + SOX §404 evidence-of-control over AI-influenced decisions. The append-only AI inference audit collection.
---

# ai-suggestions

AI Suggestions — durable audit row per Cloudflare Workers AI inference.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

Why durable, not derived: every inference on tenant data MUST leave the GDPR
Art.22(3) right-to-explain trail (prompt · model · output · the human's
accept/reject/edit decision · the downstream record it was applied to) and the
SOX §404 evidence-of-control over AI-influenced decisions. Append-only on the AI
side; the human adds `humanDecision` + `appliedTo` via the admin UI. High-risk
class never auto-decides. Inference entry-points: `@see src/services/ai/`.

## Standards
- rfc-9562 uuid suggestion-id
- ISO-8601-1:2019 date-time inference-time
- ISO/IEC 23894:2023 ai-risk-management
- ISO/IEC 42001:2023 ai-management-system
- NIST AI-RMF-1.0 ai-risk-management-framework
- GDPR Art.22 automated-individual-decision-making
- GDPR Art.22(3) right-to-human-intervention
- EU AI Act 2024 risk-classification + transparency
- SOX §404 internal-controls ai-assisted-decision TOM-AI-01
- ISO-19011:2018 §6.4.6 audit-evidence ai-inference-trail
- ISO-27001 A.5.23 cloud-service-tenant-isolation
- ISO-27001 A.5.34 privacy-and-protection-of-pii
- ISO-27002 §5.34 ai-output-validation

Composes: [[uuid]] suggestion-id · the human decision-maker is a [[Users]] · metered AI billing links a [[subscription/plans/subscriptions/usage/records]] · the inference trail IS the [[proof]] / SOX-evidence row · the banners realise the [[standard]] form.
