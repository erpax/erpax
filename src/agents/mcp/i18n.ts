/**
 * MCP localization layer — Slice ZZZZZZZZ (2026-05-11).
 *
 * Per user "localization is missing in mcp as well as the ui". Every
 * MCP tool description (and error message returned from a handler)
 * should be localizable per the request's `Accept-Language` header
 * (or the calling user's preferred locale).
 *
 * Pattern:
 *
 *   const t = makeToolI18n('consistency.scan')
 *   {
 *     name: 'erpax.consistency.scan',
 *     description: t.desc({
 *       en: 'Run the architecture-invariant suite focused on...',
 *       bg: 'Изпълнява архитектурната проверка...',
 *       de: 'Führt die Architektur-Invariantenprüfung aus...',
 *     }),
 *     // ...
 *   }
 *
 * The MCP catalog emits the requested locale on tools/list responses;
 * unknown locales fall back to `en`. Persistent locale storage lives
 * per-user (Slice MMMMMM open-tenant-role-registry's role.locale).
 *
 * Note on coverage: filling translations for all 31 supportedLocales
 * for 188 tools is a parallel slice (the `erpax.i18n.translateBatch`
 * tool auto-fills via Workers AI — Slice WWW). This slice ships the
 * INFRASTRUCTURE; the translation backfill runs as a separate
 * autonomous job through ConsistencyAgent.
 *
 * @standard W3C HTTP Content-Language (RFC 7231 §3.1.3.2)
 * @standard ECMA-402 internationalization-api
 * @standard BCP-47 language tags
 * @standard EU 1958/1 official-languages-of-the-european-union
 * @audit ISO 19011:2018 §6.4.6 (audit-evidence available in user's locale)
 */
import type { SupportedLocale } from '@/i18n/localization'

/** A localized string is a record of locale → translation. */
export type LocalizedString = Partial<Record<SupportedLocale, string>>

/** Resolve a LocalizedString against a requested locale, falling back to `en`. */
export function resolveLocalized(loc: LocalizedString, requested?: string): string {
  if (!loc) return ''
  // Accept BCP-47 like "en-US" / "bg-BG" — drop region suffix.
  const root = (requested ?? 'en').split(/[-_]/)[0]!.toLowerCase() as SupportedLocale
  return loc[root] ?? loc.en ?? Object.values(loc)[0] ?? ''
}

/**
 * Helper for tool authors. Bind a tool key once; the returned object
 * exposes `desc(localized)` + `err(localized)` that mark up the strings
 * for the i18n-audit invariant. At runtime, `desc` returns the resolved
 * string for the catalog (or the localized record itself for the
 * over-the-wire MCP catalog which preserves the full map).
 */
export function makeToolI18n(toolKey: string): {
  desc: (loc: LocalizedString) => string
  err:  (loc: LocalizedString, requestedLocale?: string) => string
  /** Returns the raw LocalizedString — used by the i18n-audit tool. */
  raw:  (loc: LocalizedString) => LocalizedString
  toolKey: string
} {
  return {
    toolKey,
    desc: (loc) => {
      // For now, return the English description (catalog clients receive
      // a single string per MCP 0.6 tools/list spec). Once MCP 0.7 ships
      // a multilingual catalog field, replace with the full LocalizedString.
      return resolveLocalized(loc, 'en')
    },
    err: (loc, requestedLocale) => resolveLocalized(loc, requestedLocale),
    raw: (loc) => loc,
  }
}

/**
 * Slice ZZZZZZZZ — invariant data source. The i18n-audit tool reads
 * this to compute "which tools have ≥ N translations?". For now,
 * tools register their LocalizedString here via `registerToolI18n`.
 * In a later cut, build-time codegen scans every tool file and
 * harvests automatically.
 */
const TOOL_I18N_REGISTRY = new Map<string, LocalizedString>()

export function registerToolI18n(toolKey: string, loc: LocalizedString): void {
  TOOL_I18N_REGISTRY.set(toolKey, loc)
}

export function listToolI18n(): ReadonlyMap<string, LocalizedString> {
  return TOOL_I18N_REGISTRY
}

/**
 * Slice AAAAAAAAA-cont (2026-05-11) — per user "all translations come
 * from translations collection". ONE source of truth — the
 * `translations` Payload collection. Both platform defaults and
 * tenant overrides live there, differentiated by the row's `tenant`
 * field:
 *
 *   - `tenant = 'platform'`  → platform-default translation
 *   - `tenant = <tenantId>`  → per-tenant override
 *
 * Resolution order (highest → lowest priority):
 *
 *   1. row with `tenant = <currentTenantId>` (override)
 *   2. row with `tenant = 'platform'`        (platform default)
 *   3. `staticDefault`                       (in-code fallback;
 *                                              should be backfilled
 *                                              into a `platform` row
 *                                              by the i18n harvester)
 *
 * Every row uses Payload's `localized: true` field — `Accept-Language`
 * selects the right locale. No code rebuild for new translations.
 *
 * Platform-default rows are seeded by `applyI18nHarvest` (Slice
 * AAAAAAAAA-cont, a sibling apply transform) which scans every
 * static `LocalizedString` in the source tree and writes rows with
 * `tenant = 'platform'`. The next admin UI translator session adds
 * missing locales.
 */
export const PLATFORM_TENANT_KEY = 'platform'

export async function resolveTranslation(args: {
  payload?: { find(args: { collection: string; where?: Record<string, unknown>; locale?: string; limit?: number }): Promise<{ docs: Array<Record<string, unknown>> }> }
  scope: 'mcp-tool' | 'ui-surface' | 'event-label' | 'notification-template' | 'standard-citation' | 'chain-step' | 'other'
  key: string
  staticDefault: string
  locale?: string
  tenantId?: string
}): Promise<string> {
  const { payload, scope, key, staticDefault, locale, tenantId } = args
  if (!payload) return staticDefault
  // Build the tenant lookup priority list:
  //   1. the request tenant (if set)
  //   2. the platform tenant (universal default)
  const tenants = tenantId && tenantId !== PLATFORM_TENANT_KEY
    ? [tenantId, PLATFORM_TENANT_KEY]
    : [PLATFORM_TENANT_KEY]
  for (const t of tenants) {
    try {
      const res = await payload.find({
        collection: 'translations',
        where: {
          tenant: { equals: t },
          scope: { equals: scope },
          key: { equals: key },
          status: { equals: 'enabled' },
        },
        locale: locale ?? 'en',
        limit: 1,
      })
      const doc = res.docs?.[0] as { value?: string } | undefined
      const val = doc?.value
      if (typeof val === 'string' && val.trim().length > 0) return val
    } catch {
      /* fall through to next tenant */
    }
  }
  return staticDefault
}

/**
 * Slice AAAAAAAAA-cont — MCP-tool description shortcut. Wraps
 * `resolveTranslation({ scope: 'mcp-tool', key: toolName, ... })`.
 * Used by the catalog builder to overlay descriptions at request time.
 *
 * @deprecated The McpToolMetadata.description field (Slice ZZZZZZZZ)
 *   is now superseded — keep that collection for non-localized metadata
 *   (area, tags, enabled flag, documentationUrl); descriptions live in
 *   `translations` with scope='mcp-tool'. Existing description rows
 *   should be migrated by `applyI18nHarvest`.
 */
export async function overlayLocalizedFromPayload(
  payload: {
    find(args: { collection: string; where?: Record<string, unknown>; locale?: string; limit?: number }): Promise<{ docs: Array<Record<string, unknown>> }>
  } | undefined,
  toolName: string,
  staticDefault: string,
  locale?: string,
  tenantId?: string,
): Promise<string> {
  return resolveTranslation({
    payload, scope: 'mcp-tool', key: toolName, staticDefault, locale, tenantId,
  })
}

/** Coverage report — for each tool, which locales have translations. */
export function toolI18nCoverage(): {
  totalTools: number
  byLocale: Record<string, number>
  unlocalized: ReadonlyArray<string>
} {
  const byLocale: Record<string, number> = {}
  const unlocalized: string[] = []
  for (const [key, loc] of TOOL_I18N_REGISTRY) {
    const locales = Object.keys(loc).filter((k) => (loc as Record<string, string>)[k]!.length > 0)
    if (locales.length <= 1) unlocalized.push(key)
    for (const l of locales) byLocale[l] = (byLocale[l] ?? 0) + 1
  }
  return { totalTools: TOOL_I18N_REGISTRY.size, byLocale, unlocalized }
}
