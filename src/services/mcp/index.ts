/**
 * MCP Plugin — Slice DDDDDDDDD (2026-05-11).
 *
 * Per user "refactor mcp as a payload app with the ui components".
 * The MCP layer is now a first-class Payload plugin:
 *
 *   - **Plugin factory** `mcpPlugin(opts)` — returns a Payload `Plugin`
 *     that injects MCP-related collections, globals, custom views,
 *     custom endpoints, and admin nav links.
 *
 *   - **Collections** owned by this plugin:
 *       - `mcp-tool-metadata`  (was Slice ZZZZZZZZ in accounting; re-
 *         exported here so the MCP plugin owns its own surface)
 *       - `translations`      (Slice AAAAAAAAA — actually stays in
 *         accounting because tenants use it for non-MCP translations
 *         too; the plugin reads from it).
 *
 *   - **Global** `mcp-settings`  — platform-wide MCP config (default
 *     locale, per-area enable flags, request-rate ceilings).
 *
 *   - **Admin UI components** (React) under `./components/`:
 *       - `<ToolBrowser />`      — list-by-area + search + localized
 *                                  description preview
 *       - `<ToolInvoker />`      — form-validated zod params + JSON
 *                                  result panel
 *       - `<TranslationsEditor/>`— per-tool localized description edit
 *                                  (admin-facing wrapper around the
 *                                  `translations` collection)
 *       - `<ConsistencyStatus/>` — live dashboard of drift entropy +
 *                                  recent applies + emerging gaps
 *
 *   - **Custom endpoints** under `/api/mcp/*`:
 *       - `POST /api/mcp/invoke/:toolName`  — call an MCP tool from
 *         the admin UI with the active session's tenant + locale
 *       - `GET  /api/mcp/catalog`           — return the tool catalog
 *         localized for the requesting user
 *
 * @standard MCP 0.6 (Model Context Protocol)
 * @standard W3C HTTP Content-Language (RFC 7231)
 * @standard ISO/IEC 25010:2023 §5.3 operability (admin UI)
 * @audit Conservation Law 38 mcp-tool-standardization
 * @see ./collections/McpSettingsGlobal.ts
 * @see ./components/ToolBrowser.tsx
 * @see ./endpoints/index.ts
 */
import type { Plugin } from 'payload'
import { mcpEndpoints } from './endpoints'
import { McpSettingsGlobal } from './globals/McpSettingsGlobal'

export interface McpPluginOptions {
  /** Default UI locale when the request has no Accept-Language. */
  readonly defaultLocale?: string
  /** When false, the plugin is registered but its admin UI is hidden. */
  readonly enableAdminUi?: boolean
  /** When false, the catalog endpoint requires authentication. */
  readonly allowAnonymousCatalog?: boolean
}

export const mcpPlugin = (opts: McpPluginOptions = {}): Plugin => {
  const enableAdminUi = opts.enableAdminUi !== false
  return (incomingConfig) => {
    // Add globals.
    const globals = [...(incomingConfig.globals ?? []), McpSettingsGlobal]
    // Add custom endpoints.
    const endpoints = [...(incomingConfig.endpoints ?? []), ...mcpEndpoints(opts)]
    // Slice DDDDDDDDD — register the MCP admin nav group + custom views.
    // Payload's admin config accepts `views` and `components.beforeNavLinks`;
    // we add a top-level "MCP" group with sub-views to ToolBrowser /
    // ToolInvoker / ConsistencyStatus / TranslationsEditor.
    const admin = enableAdminUi
      ? {
          ...incomingConfig.admin,
          components: {
            ...(incomingConfig.admin?.components ?? {}),
            // Slice DDDDDDDDD — admin nav additions via dynamic import
            // paths (the React files must be in client-component
            // friendly locations; payload v3 supports server / client
            // components alongside).
            beforeNavLinks: [
              ...(incomingConfig.admin?.components?.beforeNavLinks ?? []),
              '@/components/mcp/McpNavLinks#McpNavLinks',
            ],
            // Slice FFFFFFFFF-cut4 (2026-05-11) — register the four MCP
            // admin surfaces as custom views. Payload v3 routes each
            // `path` under /admin (e.g. path '/mcp/tools' → URL
            // /admin/mcp/tools). All components are 'use client' React
            // and are imported by string path so they render server-
            // side rendered then hydrated.
            views: {
              ...(incomingConfig.admin?.components?.views ?? {}),
              mcpToolBrowser: {
                Component: '@/components/mcp/ToolBrowser#ToolBrowser',
                path: '/mcp/tools',
              },
              mcpToolInvoker: {
                Component: '@/components/mcp/ToolInvoker#ToolInvoker',
                path: '/mcp/invoke',
              },
              mcpConsistencyStatus: {
                Component: '@/components/mcp/ConsistencyStatus#ConsistencyStatus',
                path: '/mcp/status',
              },
              mcpTranslationsEditor: {
                Component: '@/components/mcp/TranslationsEditor#TranslationsEditor',
                path: '/mcp/translations',
              },
            },
          },
        }
      : incomingConfig.admin
    return {
      ...incomingConfig,
      admin,
      globals,
      endpoints,
    }
  }
}

export { McpSettingsGlobal } from './globals/McpSettingsGlobal'
