---
name: sandbox
description: "Use when running an UNTRUSTED, agent-built tool safely — erpax encodes capability-scoping, credential-protection, endpoint-allowlisting and a receipted audit NATIVELY (content-uuid tool identity + the receipt + the gate), depending on nothing external. The tool's identity is its content-uuid; its grant is {capabilities, allowedHosts, credentialHandles}; every action is policy-evaluated and receipted; the WASM/worker isolation is the runtime boundary the pure policy rides on."
---

# sandbox — running untrusted tools, encoded natively (no external trust layer)

FORM: **an untrusted, agent-built tool runs under a content-addressed GRANT, and every action is policy-evaluated and receipted — erpax encodes this itself.** The tool's identity is its content-uuid ([[identity]]: the code IS the id, so a tool cannot lie about what it is). Its `ToolGrant` is `{ toolUuid, capabilities, allowedHosts, credentialHandles }` — what verbs it may use ([[access]]), which hosts it may reach (endpoint allowlist), which secrets it may touch (by handle, never value). `permits(grant, action)` decides allow/block; `brokerCredential` resolves a secret ONLY for a granted handle, so the tool gets it at the host boundary and never holds it in scope (credential-protection + leak-containment); `evaluate` emits a [[receipt]] for every action (the uuid-chained audit — no receipt, no proof).

**erpax encodes, and is completely independent.** Where an external trust layer provides capability-scoping via WASM, identity via a key hierarchy, and audit via signed receipts, erpax provides all three through its OWN primitives — content-uuid (tool + decision identity), the [[receipt]] (the audit chain), and the [[proof]] tamper-cost (the security) — importing NOTHING external. Independent peers may converge on the same shape ([[merge]]), but erpax stands alone, [[self]]-sufficient: it does not adopt a sandbox, it IS one. The actual WASM/worker ISOLATION is the runtime boundary the policy rides on (like any I/O edge); the policy — what is permitted, brokered, and audited — is pure erpax, encoded here and tested.

Matter-twin: `src/services/sandbox/index.ts` (`ToolGrant`·`ToolAction`·`permits`·`brokerCredential`·`evaluate`) over `services/receipt` + `index.test.ts`. Composes: [[receipt]] · [[access]] · [[identity]] · [[uuid]] · [[proof]] · [[peace]] · [[self]] · [[society]].

## Standards
- NIST SP-800-162 ABAC (capability-scoped authorization)
- OWASP-ASVS V5 untrusted-input / least-privilege

## Common mistakes
- Passing a secret to the untrusted tool — never; the tool names a `credentialHandle`, and `brokerCredential` injects the value at the host boundary ONLY if the grant permits it.
- Trusting the tool's claimed identity — the identity is its content-uuid ([[identity]]); recompute it, don't accept a label.
- Running the action and auditing later — `evaluate` decides AND receipts in one step; an un-receipted action has no proof it was permitted ([[receipt]]).
- Reaching for an external sandbox/trust SDK — the policy is encoded natively here; only the isolation primitive (WASM/worker) is a runtime boundary, swappable and dependency-free.
