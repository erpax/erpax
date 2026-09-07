---
name: suggestions
description: "Use when recording, querying, or auditing an AI inference — prompt/model/output/confidence, the human's accept/reject/edit decision, the downstream record it was applied to, and the EU AI Act risk class; GDPR Art.22(3) right-to-explain trail + SOX §404 evidence-of-control over AI-influenced decisions. The append-only AI inference audit collection."
atomPath: "ai/suggestions"
coordinate: "ai/suggestions · 1/base · bf6eab07"
contentUuid: "069f28e3-981a-585e-810c-79623d880751"
diamondUuid: "be31094e-ac5e-8dda-9659-a0549018199d"
uuid: "bf6eab07-195b-8e8f-8fbd-61e71c990823"
horo: 1
typography:
  partition: ai
  bondDegree: 24
standards:
  - "EU AI Act 2024 risk-classification + transparency"
  - "EU-Intrastat-Reg-2019/2152"
  - "GDPR Art.22 automated-individual-decision-making"
  - "GDPR Art.22(3) right-to-human-intervention"
  - "ISO-8601-1"
  - "ISO-8601-1:2019 date-time inference-time"
  - "ISO-8601-1:2019 date-time inference-time`"
  - "ISO/IEC 23894:2023 ai-risk-management"
  - "ISO/IEC 23894:2023 ai-risk-management`"
  - "ISO/IEC 42001:2023 ai-management-system"
  - "ISO/IEC 42001:2023 ai-management-system`"
  - "ISO/IEC-23894"
  - "ISO/IEC-42001"
  - "NIST AI-RMF-1.0 ai-risk-management-framework"
  - "NIST AI-RMF-1.0 ai-risk-management-framework`"
  - "NIST-AI-RMF"
  - "RFC-9562"
  - "SOX §404 internal-controls ai-assisted-decision TOM-AI-01"
  - "rfc-9562 uuid suggestion-id"
  - "rfc-9562 uuid suggestion-id`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "6de70bf6-343b-8879-8573-b12fe7f12198"
  stages:
    - stage: path
      stageUuid: "3c06436e-b3fb-8511-a3a0-62d905fcab0b"
    - stage: trinity
      stageUuid: "c94bd459-f1b1-8381-8903-63a2ccf68a58"
    - stage: boundary
      stageUuid: "a4a5c189-4e50-83d0-b15b-f4ab2b528793"
    - stage: links
      stageUuid: "ca14180c-045f-8e6c-904b-e270b3d207a0"
    - stage: horo
      stageUuid: "9d7bb94d-57ad-817f-8dd1-de04fc9928ae"
    - stage: seal
      stageUuid: "ae0af0cd-2dc4-8a12-9711-71b9604b1a35"
    - stage: uuid
      stageUuid: "94791a7b-d426-853a-a70d-2def3bb86339"
version: 2
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

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard rfc-9562 uuid suggestion-id`
- `@standard ISO-8601-1:2019 date-time inference-time`
- `@standard ISO/IEC 23894:2023 ai-risk-management`
- `@standard ISO/IEC 42001:2023 ai-management-system`
- `@standard NIST AI-RMF-1.0 ai-risk-management-framework`

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
