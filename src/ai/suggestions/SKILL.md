---
name: suggestions
description: "Use when recording, querying, or auditing an AI inference — prompt/model/output/confidence, the human's accept/reject/edit decision, the downstream record it was applied to, and the EU AI Act risk class; GDPR Art.22(3) right-to-explain trail + SOX §404 evidence-of-control over AI-influenced decisions. The append-only AI inference audit collection."
atomPath: ai/suggestions
coordinate: ai/suggestions · 7/descent · af32093e
contentUuid: "b19d76d7-c8bb-59cf-8a8a-e30a7cd774d0"
diamondUuid: "ac92eef5-98d1-8a69-a07a-ffd24ae93381"
uuid: "af32093e-05c9-8651-adbb-68b9d34f7276"
horo: 7
bonds:
  in:
    - ai
    - industry
    - models
    - proof
    - records
    - standard
    - suggestion
    - users
    - uuid
  out:
    - industry
    - models
    - proof
    - records
    - standard
    - suggestion
    - users
    - uuid
typography:
  partition: ai
  bondDegree: 24
  neighbors: []
standards:
  - "EU AI Act 2024 risk-classification + transparency"
  - "EU-2019/1150"
  - "EU-2019/1152"
  - "EU-2019/1937"
  - "EU-2019/2161"
  - "EU-2019/770"
  - "EU-2019/771"
  - "EU-Intrastat-Reg-2019/2152"
  - "GDPR Art.22 automated-individual-decision-making"
  - "GDPR Art.22(3) right-to-human-intervention"
  - "ILO-C001"
  - "ISO-19011:2018 §6.4.6 audit-evidence ai-inference-trail"
  - "ISO-8601-1"
  - "ISO-8601-1:2019 date-time inference-time"
  - "ISO/IEC 23894:2023 ai-risk-management"
  - "ISO/IEC 42001:2023 ai-management-system"
  - "ISO/IEC-23894"
  - "ISO/IEC-42001"
  - "NIST AI-RMF-1.0 ai-risk-management-framework"
  - "NIST-AI-RMF"
  - "RFC-9562"
  - "SOX §404 internal-controls ai-assisted-decision TOM-AI-01"
  - "rfc-9562 uuid suggestion-id"
bindings: []
neighbors:
  wikilink:
    - proof
    - records
    - standard
    - users
    - uuid
  matrix:
    - industry
    - models
    - proof
    - records
    - standard
    - suggestion
    - users
    - uuid
  backlinks:
    - industry
    - models
    - proof
    - records
    - standard
    - suggestion
    - users
    - uuid
signatures:
  computationUuid: "9b4a44c4-b54e-85cf-b962-c45cf9e99b05"
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
      stageUuid: "90ec16ba-045f-8d30-8203-a3b1b77cf97c"
    - stage: seal
      stageUuid: "5da4655c-ce48-8701-9110-7d87fcc3f169"
    - stage: uuid
      stageUuid: "f6119fbc-4666-83b7-996e-bc61a5776c87"
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
