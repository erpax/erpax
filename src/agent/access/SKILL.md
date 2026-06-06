---
name: access
description: Use when reasoning about how an agent acts — it does everything both through the MCP gateway (trust-native, sandboxed and receipted) and through the filesystem (direct), the two equivalent because content-addressed, the modality the choice of trust not of truth.
---

# agent/access — both doors: MCP and fs

A trained agent does everything **both ways**. Through the [[mcp]] gateway — the official Payload MCP, where every collection is a find/create/update/delete tool — and through the filesystem directly. The two are **equivalent**: `reachVia(content, 'mcp')` and `reachVia(content, 'fs')` return the *same* content-[[uuid]], because both are content-addressed. The modality is the **path, not the identity** — same content, same truth, two doors.

They differ only in **trust**. MCP is **trust-native**: every call passes the [[sandbox]] (capability + allowlist + credential-broker) and emits a [[receipt]] (a uuid-chained audit entry). The filesystem is **direct** — no broker, no receipt, just the bytes. So the agent chooses by trust, not by truth: the gateway when the act must be scoped and audited (remote, multi-tenant, on another's behalf), the filesystem when it is its own local work.

To *train* an agent is therefore to give it both doors and the law between them — never force the gateway where fs suffices, never skip the gateway where the act crosses a trust boundary. `trustNative(m)` marks which door carries the receipt.

Matter-twin: `src/agent/access/index.ts` (`Modality` · `MODALITIES` · `reachVia` · `equivalent` · `trustNative`). Composes [[mcp]] · [[sandbox]] · [[receipt]] · [[uuid]].

**Law — [[law]]: an agent does everything both ways — via the MCP gateway and via the filesystem — and the two are equivalent: the same content reaches the same content-uuid regardless of modality (the path, not the identity). MCP is trust-native (every call passes the sandbox and emits a receipt); fs is direct. The modality is the choice of trust, not of truth.**

@audit reachVia is content-addressed (modality-free); trustNative marks the MCP door (sandbox + receipt) only
@standard the official @payloadcms/plugin-mcp gateway · content-addressed identity (RFC 9562) · trust-native sandbox+receipt
