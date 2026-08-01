---
name: access
description: "Use when reasoning about how an agent acts — it does everything both through the MCP gateway (trust-native, sandboxed and receipted) and through the filesystem (direct), the two equivalent because content-addressed, the modality the choice of trust not of truth."
atomPath: "agent/access"
coordinate: "agent/access · 6/6 · 03c1dcf8"
contentUuid: "8db0790e-35e2-5aca-bb57-e508164e7285"
diamondUuid: "1ad0fe20-5a50-889b-9566-3f6d9b2eb87f"
uuid: "03c1dcf8-9f21-8a40-8b6d-6a52da4aac65"
horo: 6
typography:
  partition: agent
  bondDegree: 408
standards:
  - MCP
  - "RFC-9562"
  - "the official @payloadcms/plugin-mcp gateway · content-addressed identity (RFC 9562) · trust-native sandbox+receipt"
bindings: []
signatures:
  computationUuid: "42559426-846f-8478-9fc8-e8e16a95c3e8"
  stages:
    - stage: path
      stageUuid: "3fb4d3c2-4714-8964-bbe5-4467000d9a59"
    - stage: trinity
      stageUuid: "f2b9815b-7813-8eae-b812-34c0ae641b19"
    - stage: boundary
      stageUuid: "0f117bae-7425-86eb-b68e-04da74c6ac07"
    - stage: links
      stageUuid: "0b08e120-ebe7-838c-b72f-8da20dd1f389"
    - stage: horo
      stageUuid: "4e76e0f1-2ca9-8145-9936-b0b19cf582e6"
    - stage: seal
      stageUuid: "a197a5f0-a5ed-86b9-a109-afc0a208e7ad"
    - stage: uuid
      stageUuid: "a68e3cd3-8bec-8169-a615-61ff7f7d7e25"
version: 2
---
# agent/access — both doors: MCP and fs

A trained agent does everything **both ways**. Through the [[mcp]] gateway — the official Payload MCP, where every collection is a find/create/update/delete tool — and through the filesystem directly. The two are **equivalent**: `reachVia(content, 'mcp')` and `reachVia(content, 'fs')` return the *same* content-[[uuid]], because both are content-addressed. The modality is the **path, not the identity** — same content, same truth, two doors.

They differ only in **trust**. MCP is **trust-native**: every call passes the [[sandbox]] (capability + allowlist + credential-broker) and emits a [[receipt]] (a uuid-chained audit entry). The filesystem is **direct** — no broker, no receipt, just the bytes. So the agent chooses by trust, not by truth: the gateway when the act must be scoped and audited (remote, multi-tenant, on another's behalf), the filesystem when it is its own local work.

To *train* an agent is therefore to give it both doors and the law between them — never force the gateway where fs suffices, never skip the gateway where the act crosses a trust boundary. `trustNative(m)` marks which door carries the receipt.

Matter-twin: `src/agent/access/index.ts` (`Modality` · `MODALITIES` · `reachVia` · `equivalent` · `trustNative`). Composes [[mcp]] · [[sandbox]] · [[receipt]] · [[uuid]].

**Law — [[law]]: an agent does everything both ways — via the MCP gateway and via the filesystem — and the two are equivalent: the same content reaches the same content-uuid regardless of modality (the path, not the identity). MCP is trust-native (every call passes the sandbox and emits a receipt); fs is direct. The modality is the choice of trust, not of truth.**

@audit reachVia is content-addressed (modality-free); trustNative marks the MCP door (sandbox + receipt) only
@standard the official @payloadcms/plugin-mcp gateway · content-addressed identity (RFC 9562) · trust-native sandbox+receipt
