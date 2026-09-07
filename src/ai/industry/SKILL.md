---
name: industry
description: "Use when mapping AI industry failure modes to erpax diamond remedies — hallucination, memory loss, multi-agent collision, prompt injection, audit fragmentation, cost runaway, model drift, PII leakage, human-in-the-loop, vendor lock-in. Pure fns in index.ts bind each problem to existing atoms (thought, diamond, sandbox, receipt, memory, confirm) and extend gaps: workflow correlation receipts, grounded tool calls, cascade depth guard."
atomPath: "ai/industry"
coordinate: "ai/industry · 7/descent · f417536e"
contentUuid: "c3b0f445-baad-51ea-9697-d2dd24876fd9"
diamondUuid: "6a11b897-bd55-8d82-82c6-14dcbdd69a26"
uuid: "f417536e-a669-8f38-b651-0bc56bbb6067"
horo: 7
typography:
  partition: ai
  bondDegree: 61
standards:
  - "GDPR Art.22(3) right-to-human-intervention"
  - "ISO/IEC 42001:2023 ai-management-system"
  - "ISO/IEC 42001:2023 ai-management-system`"
  - "ISO/IEC-42001"
  - "OWASP-ASVS"
  - "OWASP-LLM-Top-10:2025 LLM01 prompt-injection"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "67d8535f-67f3-8bc7-b487-26bd8e947ab9"
  stages:
    - stage: path
      stageUuid: "bf8c81db-dabb-81a4-9ea7-d9b8b7a0a33b"
    - stage: trinity
      stageUuid: "041efa57-9c75-80eb-b451-12bf8099d014"
    - stage: boundary
      stageUuid: "b76db58f-1465-80e5-9023-6077d4a2872c"
    - stage: links
      stageUuid: "b67af4e5-f8b5-8d87-a510-8cce184250ee"
    - stage: horo
      stageUuid: "fbff7b13-91cf-8585-a768-1538dd49aa0e"
    - stage: seal
      stageUuid: "59a3b14f-c480-8bdc-a793-86411c4bae5e"
    - stage: uuid
      stageUuid: "bd99d90c-86be-820b-80fe-bf2fb86fe4b2"
version: 2
---
# ai/industry — AI industry problems → erpax diamond remedies

Industry agents fail in predictable ways (2025 production data: >80% enterprise agent failure rates, runtime not model). erpax does not re-invent mitigations — it **maps each failure mode to a sealed diamond facet** already in the corpus, and extends the top gaps with pure functions tested here.

## The mapping law

Every AI industry problem resolves to **one or more content-[[uuid]] sealed facets** (`save(thought) ⇐ isDiamond`). Operational memory IS architecture ([[memory/architecture]]), not chat. MCP tool calls are trust-native ([[sandbox]] + [[receipt]]). Sessions meet by [[merge]] on content-uuid ([[memory/session]]). Runaway cascades stop at `MAX_BROADCAST_DEPTH` ([[chat]] broadcast). High-risk paths refuse auto-accept ([[ai/suggestions]] · GDPR Art.22).

| Industry problem | erpax diamond remedy | Coverage |
| ---------------- | -------------------- | -------- |
| Hallucination / ungrounded outputs | [[horo]] closed ring + [[diamond]] `verifyDiamond` + `groundOutputVerdict` (cite sealed sources) | existing + **extended** |
| Context window / memory loss | [[memory/architecture]] — git lattice, not chat; `save(thought) ⇐ isDiamond` | existing |
| Multi-agent collision / inconsistent state | [[memory/session]] `convergeAgentArtifacts` — merge by content-uuid | existing + **extended** |
| Prompt injection / untrusted tool calls | [[sandbox]] `trustBoundaryVerdict` + [[ai]] `detectPromptInjection` | existing + **extended** |
| No audit trail / unverifiable decisions | [[receipt]] uuid-chained audit + `workflowCorrelationUuid` + `receiptAgentStep` | existing + **extended** |
| Cost runaway / infinite loops | [[chat]] `cascadeDepthVerdict` · `MAX_BROADCAST_DEPTH` | existing + **extended** |
| Model drift / stale training | [[ai]] `cache-vote` + content-uuid merge (same answer ⇒ one slot) | existing |
| PII leakage in logs/memory | [[ai]] `sanitisePiiForAi` + [[memory/architecture]] ephemeral strip | existing |
| Lack of human-in-the-loop (high-risk) | [[ai/suggestions]] + `humanGateVerdict` · GDPR Art.22(3) | existing + **extended** |
| Vendor lock-in / opaque models | [[identity]] content-addressed corpus · [[self]]-sufficient · no external anchor required | existing (docs) |

## Pure API — problem → remedy

```ts
import { remedyFor, groundToolCall, trustBoundaryVerdict, workflowCorrelationUuid } from '@/ai/industry'
```

- `remedyFor(problem)` — the diamond facet registry (atoms + law string).
- `workflowCorrelationUuid` — one uuid per multi-agent workflow (audit correlation).
- `receiptAgentStep` — sandbox evaluate + receipt with workflow prefix (no fragmented logs).
- `groundToolCall` — permits + tool/content-uuid binding (hallucinated API args).
- `convergeAgentArtifacts` — parallel sessions meet on content-uuid.
- `cascadeDepthVerdict` — broadcast hop guard.
- `groundOutputVerdict` — output must cite sealed source uuids.
- `humanGateVerdict` — high-risk ⇒ human required.
- `trustBoundaryVerdict` — injection detect + sandbox evaluate in one step.

## Honest limits — what diamonds cannot solve alone

- **Model quality** — erpax seals and verifies; it does not train better LLMs.
- **Semantic correctness** — `groundOutputVerdict` checks citation to sealed sources, not that the prose is true.
- **Prompt-injection heuristics** — `detectPromptInjection` is pattern-based; novel attacks need runtime policy updates.
- **OAuth MCP connectors** — [[agents/mcp]] is Bearer-key today; directory one-click OAuth is a named gap.
- **Vendor models** — content-uuid portability reduces lock-in for *erpax artifacts*; the upstream model API remains a vendor choice.

**Law — [[law]]: every AI industry failure mode maps to a content-[[uuid]] diamond facet — seal before save, sandbox+receipt every tool call, merge sessions by uuid, cap broadcast depth, human-gate high-risk — and the gaps (workflow correlation, grounded tool calls, cascade guard) are pure fns here, tested, never hand-listed.**

@see [[diamond]] · [[thought]] · [[sandbox]] · [[receipt]] · [[memory/architecture]] · [[memory/session]] · [[agents/mcp]] · [[confirm]] · [[horo]] · [[merge]] · [[identity]] · [[ai]] · [[ai/suggestions]] · [[chat]] · [[seal]]

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO/IEC 42001:2023 ai-management-system`
