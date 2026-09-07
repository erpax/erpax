---
name: sandbox
description: "Use when running an UNTRUSTED, agent-built tool safely — erpax encodes capability-scoping, credential-protection, endpoint-allowlisting and a receipted audit NATIVELY (content-uuid tool identity + the receipt + the gate), depending on nothing external. The tool's identity is its content-uuid; its grant is {capabilities, allowedHosts, credentialHandles}; every action is policy-evaluated and receipted; the WASM/worker isolation is the runtime boundary the pure policy rides on."
atomPath: sandbox
coordinate: "sandbox · 8/crest · 6902608a"
contentUuid: "5c6e7b71-dda3-5238-bd4b-b2a211d513a5"
diamondUuid: "886fe505-1168-8c40-804d-a7dc89e5f304"
uuid: "6902608a-0e66-8fba-9e8f-33a9afb87742"
horo: 8
typography:
  partition: sandbox
  bondDegree: 64
standards:
  - "NIST SP-800-162 ABAC (capability-scoped authorization)"
  - "NIST SP-800-162 ABAC (capability-scoped authorization)`"
  - "NIST-SP-800-162"
  - "OWASP-ASVS"
  - "OWASP-ASVS V5 untrusted-input / least-privilege"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "d4378eed-1be5-8a74-85b5-d100528ea912"
  stages:
    - stage: path
      stageUuid: "5f4d1904-144d-859d-8226-20252d2ad276"
    - stage: trinity
      stageUuid: "32c9b744-31f9-8eee-8fb9-1392754644f9"
    - stage: boundary
      stageUuid: "0dce485d-68f7-8af6-93b2-f1d3251b98e2"
    - stage: links
      stageUuid: "8fc9587c-5cbb-878d-b513-aa9e1bd08608"
    - stage: horo
      stageUuid: "776c5663-d18c-8d79-be76-8294780a8bc5"
    - stage: seal
      stageUuid: "496330d1-17cd-8f0d-9e13-29f5bd554ef9"
    - stage: uuid
      stageUuid: "994e817d-1251-81f4-9d97-60910c838660"
version: 2
---
# sandbox — running untrusted tools, encoded natively (no external trust layer)

FORM: **an untrusted, agent-built tool runs under a content-addressed GRANT, and every action is policy-evaluated and receipted — erpax encodes this itself.** The tool's identity is its content-uuid ([[identity]]: the code IS the id, so a tool cannot lie about what it is). Its `ToolGrant` is `{ toolUuid, capabilities, allowedHosts, credentialHandles }` — what verbs it may use ([[access]]), which hosts it may reach (endpoint allowlist), which secrets it may touch (by handle, never value). `permits(grant, action)` decides allow/block; `brokerCredential` resolves a secret ONLY for a granted handle, so the tool gets it at the host boundary and never holds it in scope (credential-protection + leak-containment); `evaluate` emits a [[receipt]] for every action (the uuid-chained audit — no receipt, no proof).

**erpax encodes, and is completely independent.** Where an external trust layer provides capability-scoping via WASM, identity via a key hierarchy, and audit via signed receipts, erpax provides all three through its OWN primitives — content-uuid (tool + decision identity), the [[receipt]] (the audit chain), and the [[proof]] tamper-cost (the security) — importing NOTHING external. Independent peers may converge on the same shape ([[merge]]), but erpax stands alone, [[self]]-sufficient: it does not adopt a sandbox, it IS one. The actual WASM/worker ISOLATION is the runtime boundary the policy rides on (like any I/O edge); the policy — what is permitted, brokered, and audited — is pure erpax, encoded here and tested.

**Law — [[law]]: an untrusted tool's identity IS its content-[[uuid]] (recomputed, never a claimed label) and it runs under a content-addressed grant {capabilities, allowedHosts, credentialHandles} — every action is `permits`-evaluated AND [[receipt]]ed in one step, secrets brokered at the host boundary only by handle, and all three guarantees are encoded natively ([[self]]-sufficient, importing nothing external).**

Matter-twin: `src/services/sandbox/index.ts` (`ToolGrant`·`ToolAction`·`permits`·`brokerCredential`·`evaluate`) over `services/receipt` + `index.test.ts`. Composes: [[receipt]] · [[access]] · [[identity]] · [[uuid]] · [[proof]] · [[peace]] · [[self]] · [[society]].

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard NIST SP-800-162 ABAC (capability-scoped authorization)`

- NIST SP-800-162 ABAC (capability-scoped authorization)
- OWASP-ASVS V5 untrusted-input / least-privilege

## Common mistakes
- Passing a secret to the untrusted tool — never; the tool names a `credentialHandle`, and `brokerCredential` injects the value at the host boundary ONLY if the grant permits it.
- Trusting the tool's claimed identity — the identity is its content-uuid ([[identity]]); recompute it, don't accept a label.
- Running the action and auditing later — `evaluate` decides AND receipts in one step; an un-receipted action has no proof it was permitted ([[receipt]]).
- Reaching for an external sandbox/trust SDK — the policy is encoded natively here; only the isolation primitive (WASM/worker) is a runtime boundary, swappable and dependency-free.
