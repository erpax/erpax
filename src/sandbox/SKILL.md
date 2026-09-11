---
name: sandbox
description: "Use when running an UNTRUSTED, agent-built tool safely — erpax encodes capability-scoping, credential-protection, endpoint-allowlisting and a receipted audit NATIVELY (content-uuid tool identity + the receipt + the gate), depending on nothing external. The tool's identity is its content-uuid; its grant is {capabilities, allowedHosts, credentialHandles}; every action is policy-evaluated and receipted; the WASM/worker isolation is the runtime boundary the pure policy rides on."
atomPath: sandbox
coordinate: "sandbox · 5/round · 1dc7d0a8"
contentUuid: "5f546819-4ae6-50b4-95ac-3aac9e00761c"
diamondUuid: "61b44816-fc90-8288-a04b-3852b2709940"
uuid: "1dc7d0a8-c539-8322-8867-6e2a196cf04e"
horo: 5
typography:
  partition: sandbox
  bondDegree: 82
standards:
  - "NIST SP-800-162 ABAC (capability-scoped authorization)"
  - "NIST SP-800-162 ABAC (capability-scoped authorization)`"
  - "NIST-SP-800-162"
  - "OWASP-ASVS"
  - "OWASP-ASVS V5 untrusted-input / least-privilege"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "89ae111b-dc9e-88ed-80d4-1b2877cf2210"
  stages:
    - stage: path
      stageUuid: "5f4d1904-144d-859d-8226-20252d2ad276"
    - stage: trinity
      stageUuid: "32c9b744-31f9-8eee-8fb9-1392754644f9"
    - stage: boundary
      stageUuid: "0dce485d-68f7-8af6-93b2-f1d3251b98e2"
    - stage: links
      stageUuid: "03ec28a6-9039-872a-bf72-75d8459f08b7"
    - stage: horo
      stageUuid: "9eccc55b-899d-8e1b-8ec5-b7dadacc2ee1"
    - stage: seal
      stageUuid: "496330d1-17cd-8f0d-9e13-29f5bd554ef9"
    - stage: uuid
      stageUuid: "30b2e5be-60b8-863f-9271-c2ae788f577e"
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
