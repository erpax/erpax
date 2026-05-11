# MCP Plugin

**Slice DDDDDDDDD (2026-05-11)** — MCP refactored as a first-class Payload plugin with admin UI.

## Architecture

```
src/plugins/mcp/
├── index.ts                 # mcpPlugin() factory — Payload Plugin
├── globals/
│   └── McpSettingsGlobal.ts # platform-wide MCP config
├── endpoints/
│   └── index.ts             # /api/mcp/{catalog,invoke,status}
├── components/
│   ├── ToolBrowser.tsx          # list + search + group by area (/admin/mcp/tools)
│   ├── ToolInvoker.tsx          # event-driven drawer + JSON args (/admin/mcp/invoke)
│   ├── ConsistencyStatus.tsx    # live dashboard polling /api/mcp/status (/admin/mcp/status)
│   ├── TranslationsEditor.tsx   # side-by-side locale grid (/admin/mcp/translations)
│   └── McpNavLinks.tsx          # admin nav injection
└── README.md
```

## Wiring

```ts
// src/payload.config.ts
import { mcpPlugin } from '@/plugins/mcp'

export default buildConfig({
  // ...
  plugins: [
    // ...
    mcpPlugin({
      defaultLocale: 'en',
      enableAdminUi: true,
      allowAnonymousCatalog: false,
    }),
  ],
})
```

## What stays where

| Concern | Owner |
|---|---|
| Tool definitions (zod params, handlers) | `src/services/agents/mcp/tools/<area>.ts` |
| In-process MCP client (agent runtime) | `src/services/agents/mcp/in-process-client.ts` |
| Translations collection (canonical store) | `src/plugins/accounting/collections/Translations.ts` |
| MCP-specific localized overlay (tool descriptions) | `src/services/agents/mcp/i18n.ts` (`resolveTranslation`) |
| Admin UI surfaces | `src/plugins/mcp/components/` |
| Custom HTTP endpoints | `src/plugins/mcp/endpoints/` |
| Platform-wide MCP settings | `src/plugins/mcp/globals/McpSettingsGlobal.ts` |

## Endpoints

| Path | What |
|---|---|
| `GET /api/mcp/catalog` | Localized tool catalog. Locale from `Accept-Language` or user prefs; tenant from session. |
| `POST /api/mcp/invoke/:toolName` | Invoke a tool from admin UI. Authenticated. Body = zod params. Returns `{ ok, toolName, result }`. |
| `GET /api/mcp/status` | Mirror of `erpax.consistency.status`. Authenticated. |

## All plugins use only ERPax bindings

Per Slice DDDDDDDDD-cont (2026-05-11) — every plugin (this one and any
future one) must access Cloudflare bindings ONLY through the ERPax
mediator. Direct `req.env.<BINDING>` access is forbidden and caught
by the `checkMcpBindingsAreMediated` invariant (now scans `src/plugins/*`
in addition to the MCP handler surface).

The canonical pattern:

```ts
import { erpaxMediator } from '@/services/cloudflare/plugin-helper'

async function someHandler(req: PayloadRequest) {
  const m = erpaxMediator(req)
  // tenant-scoped, audit-trailed, RBAC-gated automatically
  const blob = await m.r2Get('reports/2026-Q1.pdf')
  await m.queueSendNamed('email-out', { to, subject, body })
  await m.auditChainAppendLinked({ event: 'plugin:action', detail })
}
```

The mediator binds:
- `tenantId` from the request user (`platform` fallback)
- `authorize` callback (default: require auth; plugin-specific RBAC layers on top)
- `payload` for audit-event writes
- The unified `ERPAX_DO` binding for all DO state types (counter / ratelimit / joblock / chain)

Annotate exceptional direct-access sites with `// SAFE-CF-DIRECT` to opt out.

## Admin surfaces (all four landed)

| Route | Component | What |
|---|---|---|
| `/admin/mcp/tools` | `<ToolBrowser/>` | Catalog browse — area groups, search, localized description preview. Fires `mcp:invoke` event when an item is clicked. |
| `/admin/mcp/invoke` | `<ToolInvoker/>` | Event-driven modal drawer. JSON args textarea, parse-validation, `POST /api/mcp/invoke/:toolName`, syntax-highlighted result panel. |
| `/admin/mcp/status` | `<ConsistencyStatus/>` | 30-s poll of `/api/mcp/status`. Readiness flag, pass/warn/fail counts, recent proposals with severity + auto-applied badges. |
| `/admin/mcp/translations` | `<TranslationsEditor/>` | Side-by-side locale grid. Per-cell save (`PATCH /api/translations/:id?locale=…`). Platform-default reference line under empty cells. |

The four routes are registered via `admin.components.views.*` in `mcpPlugin()` (Slice FFFFFFFFF-cut4, 2026-05-11). The MCP nav group is injected through `admin.components.beforeNavLinks` (`<McpNavLinks/>`).

## Future cuts

- **DDDDDDDDD-cut5** — Per-tool RBAC matrix (which roles can invoke which tools).
- **DDDDDDDDD-cut6** — Zod-schema-driven form in `<ToolInvoker/>` (replace the JSON textarea once `/api/mcp/catalog` exposes JSON-Schema-derived definitions).
