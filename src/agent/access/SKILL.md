---
name: access
description: "Use when reasoning about how an agent acts — it does everything both through the MCP gateway (trust-native, sandboxed and receipted) and through the filesystem (direct), the two equivalent because content-addressed, the modality the choice of trust not of truth."
atomPath: "agent/access"
coordinate: "agent/access · 6/6 · 3ecb1ad0"
contentUuid: "9e90d98a-15a0-538e-8e29-13bb7deb3d5d"
diamondUuid: "68863b00-7e01-81e3-8aa8-7a342547f26d"
uuid: "3ecb1ad0-0eb7-86e8-a3a2-25594644fc6f"
horo: 6
typography:
  partition: agent
  bondDegree: 436
standards:
  - MCP
  - "RFC-9562"
  - "the official @payloadcms/plugin-mcp gateway · content-addressed identity (RFC 9562) · trust-native sandbox+receipt"
bindings: []
signatures:
  computationUuid: "bafd7dd8-fb4d-8f5d-88a5-7b89622cc087"
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
      stageUuid: "3cc65222-84d9-8260-84e2-1dda1d8b9bc3"
    - stage: seal
      stageUuid: "8fa2b28a-5feb-84cf-b496-50504bdaff63"
    - stage: uuid
      stageUuid: "4f6bd49f-f4f3-89d3-8ce2-83584a076c4e"
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
