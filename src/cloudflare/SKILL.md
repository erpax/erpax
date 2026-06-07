---
name: cloudflare
description: Use when touching a Cloudflare binding from erpax — the typed ErpaxCfEnv surface, the fail-fast boot probe (checkCloudflareBindingsHealthy, OK iff D1 is bound, the rest degrade gracefully), or the tenant-scoped mediator wrappers (KV/R2/DO/AI/Queue/Vectorize/Browser/Email/Workflows) that gate every binding op fail-closed, tenant-namespace its keys, and audit-trail the call.
---

# cloudflare — the mediated edge surface (every binding access flows through erpax)

The typed Cloudflare runtime surface ERPax expects on Workers, plus the law that **no MCP handler touches `env.<BINDING>` directly**. `checkCloudflareBindingsHealthy` is the pure boot probe — partitioning the expected [[bindings]] into available vs missing and reporting OK **iff D1 is bound** (the rest degrade gracefully), called from `payload.onInit` so a misconfiguration surfaces at boot, not on first request. Every other access — `kvGet`, `r2Put`, `auditChainAppendLinked`, `counterIncrement`, `vectorizeQuery`, `browserRender`, … — routes through a mediator wrapper that (1) **tenant-scopes** the key (`t:<tenantId>/…`, so cross-tenant reads are impossible), (2) **fail-closed** [[access]] gates the op (no authorizer installed ⇒ DENIED, never the default), and (3) **[[audit]]-trails** the call to `audit-events` — a dropped receipt is surfaced, never silently swallowed. The [[uuid]]-linked [[chain]] mediators carry `prevLeafUuid` so any [[tamper]] on leaf K breaks every leaf from K+1 onward.

Matter-twin: `src/cloudflare/index.ts` (`checkCloudflareBindingsHealthy` ⊕ `makeMediator` over `ErpaxCfEnv`). Composes [[bindings]] · [[tenant]] · [[access]] · [[audit]] · [[integrity]] · [[uuid]] · [[chain]] · [[tamper]] · [[cost]].

**Law — [[law]]: every Cloudflare binding access flows through erpax — tenant-scoped, [[access]]-gated fail-closed, and [[audit]]-trailed — and the boot probe is OK iff D1 is bound (the rest degrade gracefully).**

@standard Cloudflare Workers Runtime API
@audit composed from the live ErpaxCfEnv probe + the mediator wrappers; binding access is never un-gated
