---
name: research
description: "Use when an actor must find where its own identity (an email) is used across the corpus and secure those accounts — self-research over the COMPUTED Payload MCP find-surface, scoped to the caller's own access so there is no bypass, with each reset/recover sandbox-gated and receipted. Agnostic — collections and services live in the DB, never hardcoded."
atomPath: self/research
coordinate: self/research · 2/share · aec41c5c
contentUuid: "266b8634-3e9c-5bfc-81b3-1a7eadbfe4eb"
diamondUuid: "ba506f69-1556-8c9f-a6cf-2c9deefef33d"
uuid: "aec41c5c-f27d-81b1-ba89-1692a0a3785e"
horo: 2
bonds:
  in:
    - accounting
    - akashic
    - anchor
    - angel
    - breath
    - civilization
    - collapse
    - consultant
    - consulting
    - design
    - development
    - drone
    - feedback
    - history
    - interview
    - law
    - literature
    - localize
    - merge
    - oid
    - organization
    - profane
    - project
    - proof
    - research
    - sacred
    - science
    - self
    - uuid
    - zeropoint
  out:
    - accounting
    - akashic
    - anchor
    - angel
    - breath
    - civilization
    - collapse
    - consultant
    - consulting
    - design
    - development
    - drone
    - feedback
    - history
    - interview
    - law
    - literature
    - localize
    - merge
    - oid
    - organization
    - profane
    - project
    - proof
    - research
    - sacred
    - science
    - uuid
    - zeropoint
typography:
  partition: self
  bondDegree: 149
  neighbors:
    - agent
standards:
  - "NIST SP 800-162 ABAC — the access scope is the ownership boundary"
  - "NIST SP 800-63B §6.1.3 — owner-authorized credential recovery"
  - "NIST-SP-800-162"
  - "OWASP ASVS V5 — least-privilege / IDOR-prevention (no cross-actor read)"
  - "OWASP-ASVS"
bindings: []
neighbors:
  wikilink:
    - accept
    - access
    - account
    - broker
    - collapse
    - cost
    - email
    - entropy
    - entry
    - gate
    - harmony
    - identity
    - law
    - mcp
    - plugins
    - proof
    - receipt
    - recover
    - research
    - reset
    - sandbox
    - security
    - self
    - tamper
    - zeropoint
  matrix:
    - accounting
    - akashic
    - anchor
    - angel
    - breath
    - civilization
    - collapse
    - consultant
    - consulting
    - design
    - development
    - drone
    - feedback
    - history
    - interview
    - law
    - literature
    - localize
    - merge
    - oid
    - organization
    - profane
    - project
    - proof
    - research
    - sacred
    - science
    - uuid
    - zeropoint
  backlinks:
    - accounting
    - akashic
    - anchor
    - angel
    - breath
    - civilization
    - collapse
    - consultant
    - consulting
    - design
    - development
    - drone
    - feedback
    - history
    - interview
    - law
    - literature
    - localize
    - merge
    - oid
    - organization
    - profane
    - project
    - proof
    - research
    - sacred
    - science
    - uuid
    - zeropoint
signatures:
  computationUuid: "a6185544-5788-8ec5-b41a-7169c95a382b"
  stages:
    - stage: path
      stageUuid: "81cc84ac-f2f5-85e2-b9ed-0e66364b833b"
    - stage: trinity
      stageUuid: "9ed414e6-e71f-8850-b1c5-0c9e8c874528"
    - stage: boundary
      stageUuid: "cce8a619-53ab-8d0b-8db5-9f4d05825fc0"
    - stage: links
      stageUuid: "beb763c0-e731-870a-943d-a5491b766541"
    - stage: horo
      stageUuid: "12f5288f-46fc-8933-a368-cb3651979d58"
    - stage: seal
      stageUuid: "12b22568-903a-881f-8644-479291fef1d8"
    - stage: uuid
      stageUuid: "a15527c8-0dcb-8e00-a759-d3f6a62939c9"
version: 2
---
# self-research — find where your identity is used, and secure it (under [[self]])

**Name — the [[law]].** Per *the atom & the word* (the first canonical law, from which the rest emerges): a concept is one TRUE word, and **the compound IS the entanglement**. So `self-research` is the entanglement of the single-word atoms [[self]] ⊗ [[research]] — the path `self/research` is the composition, the dash is its visible entanglement. Collapsing it to one word (`selfresearch`, like the forbidden `creativework`) would be the multiword-disguise violation; the camelCase [[mcp]] verb `selfResearch` is only the `erpax.<area>.<verb>` tool-namespace form, never the atom name.

FORM: **self-research is the EMERGENT capability of the already-computed MCP surface — not a new endpoint.** `payload.config` registers one `find/create/update/delete` tool per collection, computed from `Object.values(allCollections)` (never hand-listed — [[collapse]] sink #1, the [[plugins]] gateway, [[mcp]]). Every handler runs in the caller's `PayloadRequest`, which **inherits the key owner's [[access]] + tenant scope**, so fanning the find-tools across the corpus assembles the footprint of the CALLER'S OWN [[identity]] (an [[email]]) — and structurally cannot reach another actor's rows. **The access scope IS the ownership boundary; there is no bypass of the gateway.**

Two verbs, both through the SAME gateway, both [[receipt]]ed:

- **Research** (`erpax.platform.selfResearch`, read-only) — `planSelfResearch` fans the caller's REACHABLE find-tools across every collection that binds an identity, each query `where`-PINNED to the caller's identity value (`isSelfScoped` — the kernel cannot emit a cross-actor query). The reachable tools come from the registry (computed); the identity-binding field per collection comes from the DB. Result: the footprint — where this email is used — assembled, never scanned.
- **Secure** (`erpax.platform.selfSecure`, owner-initiated) — for a chosen subset of the footprint, `secureFootprint` runs each [[account]]'s [[reset]] / [[recover]] as a computed `update` call, exposed-first. The securing grant's allowlist IS the footprint (`securingGrant`), so the [[sandbox]] BLOCKS — and [[receipt]]s — any update aimed at a row self-research did not return. The recovery secret rides by [[broker]] handle, never in scope.

Why this is securing, not takeover: the find runs in the owner's request, so the footprint can only ever be the owner's own; without ownership the row is never returned, and the securing allowlist (= your footprint) blocks the attempt. Account takeover is structurally unreachable.

Matter-twin: `src/self/research/index.ts` — `planSelfResearch` / `isSelfScoped` (self-scope) · `securingGrant` / `gateSecuring` / `secureFootprint` (no-bypass securing over [[sandbox]] + [[receipt]]) · `bindings.ts` — `computeIdentityBindings` (the identity-binding registry, computed from the schema: every `email` field + every relationship to `users`) · `test.ts` (the proof — a self-scoped plan, and a receipt chain where a foreign target is blocked and any forged verdict is caught at its seq). Wired LIVE as the [[mcp]] tools `erpax.platform.selfResearch` (read-only) + `erpax.platform.selfSecure` (owner-initiated) in `src/agents/mcp/tool-defs.ts`, where `deriveSelfFootprint` runs each find under `overrideAccess:false`.
Composes: [[law]] · [[zeropoint]] · [[entropy]] · [[tamper]] · [[harmony]] · [[accept]] · [[entry]] · [[proof]] · [[self]] · [[research]] · [[mcp]] · [[access]] · [[identity]] · [[email]] · [[account]] · [[reset]] · [[recover]] · [[sandbox]] · [[receipt]] · [[broker]] · [[security]] · [[plugins]] · [[collapse]].

## Standards
- NIST SP 800-162 ABAC — the access scope is the ownership boundary
- OWASP ASVS V5 — least-privilege / IDOR-prevention (no cross-actor read)
- NIST SP 800-63B §6.1.3 — owner-authorized credential recovery

## Common mistakes
- Adding a privileged "find everywhere this email is used" scan — that is exactly the bypass this forbids. Research runs in the caller's `PayloadRequest`; the [[access]] cross is the gate, so the footprint can only ever be the caller's OWN.
- Hand-listing the collections to search — the find-surface is COMPUTED from `allCollections` (like every other part of payload/vitepress); pass the reachable registry + DB-declared identity-bindings, hardcode nothing.
- Auto-resetting the whole footprint — securing is owner-initiated and per-account, each verdict [[receipt]]ed; never an unattended sweep.
- Resetting a third party's account — without ownership the find never returns the row, and the securing allowlist (= your footprint) blocks + receipts the attempt.

**Law — the one law ([[zeropoint]] ⇒ [[tamper]]-[[cost]], through [[gate]]).** Self-research is the main law in miniature: it ACCEPTS any caller and any input, then VERIFIES it in harmony with the whole — the [[access]] cross ⊕ the uuid-chained [[receipt]] are the double-[[entry]] ledger (debit the accepted action, credit its verification). Zero [[entropy]] — the find-surface ([[mcp]]) and the [[identity]]-bindings are COMPUTED from config, no computational gap, nothing hand-set. Infinitely-expanding forge cost — a forged verdict, or a target outside the footprint, must re-harmonise with the whole chain and is caught at its seq ([[proof]]). Nothing is rejected at the door; the disharmony is what is caught.
