/**
 * Plugin typed access surfaces — Slice EEEEEEEEE (2026-05-11).
 *
 * Per user "all plugins have access specific types". Instead of every
 * plugin importing the full `erpaxMediator(req)` (16 methods, every
 * CF binding), each plugin declares a `PluginAccess<K>` type listing
 * the bindings it needs. The returned object exposes ONLY those
 * methods — narrower TypeScript surface, principle of least
 * privilege enforced at compile time (NOT just runtime RBAC).
 *
 * Pattern:
 *
 *   // Plugin declares its capability set:
 *   export type MarketingPluginAccess = PluginAccess<'emailSend' | 'browserRender' | 'analyticsWrite'>
 *
 *   // Plugin's mediator factory:
 *   import { pluginMediator } from './plugin-access'
 *
 *   export function marketingMediator(req: PayloadRequest): MarketingPluginAccess {
 *     return pluginMediator(req, ['emailSend', 'browserRender', 'analyticsWrite'])
 *   }
 *
 *   // Plugin code now CANNOT call m.aiRun() / m.r2Put() / etc. — TS errors.
 *
 * The runtime side enforces the same: methods outside the declared
 * set throw at construction. Auditors (and the static invariant
 * `checkPluginsDeclareAccess`) verify each plugin's actual usage
 * matches its declared type set.
 *
 * Canonical per-plugin maps (Slice EEEEEEEEE seed):
 *
 *   accounting → 'queueSendNamed' | 'auditChainAppendLinked' | 'r2Put' | 'r2Get'
 *   marketing  → 'emailSend' | 'browserRender' | 'analyticsWrite' | 'aiRun'
 *   auth       → 'kvGet' | 'kvPut' | 'auditChainAppendLinked'
 *   ai         → 'aiRun' | 'vectorizeQuery' | 'vectorizeInsert' | 'analyticsWrite'
 *   mcp        → ALL (the MCP plugin is the catalog itself — narrowest is hard)
 *
 * Plugin authors extend the per-plugin type at the top of their plugin
 * directory; the static invariant flags drift.
 *
 * @standard ISO 27001 A.5.15 access-control
 * @standard ISO 27002 §5.4 segregation-of-duties (TypeScript-enforced)
 * @audit Conservation Law 38 mcp-tool-standardization
 * @see ./plugin-helper.ts erpaxMediator (full surface)
 * @see ./index.ts makeMediator
 */
import type { PayloadRequest } from 'payload'
import { erpaxMediator } from './plugin-helper'
import type { ErpaxCfEnv } from '@/cloudflare'

/** The complete mediator surface — derived from `makeMediator`'s return shape. */
export type ErpaxMediatorFull = ReturnType<typeof erpaxMediator>

/** Every binding-wrapper method the mediator exposes. */
export type ErpaxMediatorKey = keyof ErpaxMediatorFull

/**
 * `PluginAccess<K>` is a TypeScript Pick of the full mediator surface
 * narrowed to only the keys `K`. Plugins import this with their own
 * key set; calling out-of-set methods is a compile error.
 */
export type PluginAccess<K extends ErpaxMediatorKey> = Pick<ErpaxMediatorFull, K>

/**
 * Build a narrowed mediator exposing only the named methods. Methods
 * outside `allowedKeys` are removed at runtime too — calling them
 * throws (defensive: even if a caller `as any`-casts past the type
 * check, the runtime guard catches it).
 */
export function pluginMediator<K extends ErpaxMediatorKey>(
  req: PayloadRequest,
  allowedKeys: ReadonlyArray<K>,
  opts?: {
    authorize?: (op: { binding: keyof ErpaxCfEnv; action: string; tenantId: string; user?: { id: string; role?: string } }) => void | Promise<void>
  },
): PluginAccess<K> {
  const full = erpaxMediator(req, opts) as Record<string, unknown>
  const narrowed: Record<string, unknown> = {}
  const allowed = new Set<string>(allowedKeys as ReadonlyArray<string>)
  for (const k of allowedKeys) {
    if (!(k in full)) continue
    narrowed[k as string] = (full as Record<string, unknown>)[k as string]
  }
  // Defensive runtime guard — any out-of-set property access on the
  // narrowed object throws with a clear message naming the offender.
  return new Proxy(narrowed as PluginAccess<K>, {
    get(target, prop) {
      if (typeof prop === 'symbol') return Reflect.get(target, prop)
      if (prop === 'then') return undefined  // not a Promise — avoid await coercion
      if (allowed.has(String(prop))) {
        return (target as Record<string, unknown>)[String(prop)]
      }
      throw new Error(
        `[pluginMediator] '${String(prop)}' not in declared access set (allowed: ${[...allowed].join(', ')}). ` +
        `Update the plugin's PluginAccess<K> type to include it, or stop calling it.`,
      )
    },
  })
}

/**
 * Canonical per-plugin access declarations. Each plugin's mediator
 * factory references its entry here. Adding a new plugin = adding a
 * new entry. Invariant `checkPluginsDeclareAccess` (Slice EEEEEEEEE)
 * fails when a plugin's directory contains binding calls beyond what
 * its declaration grants.
 */
export const PLUGIN_ACCESS_MAP: Readonly<Record<string, ReadonlyArray<ErpaxMediatorKey>>> = {
  // Slice EEEEEEEEE seed — extend as new plugins land.
  // HHHHHHHHH-cut2 / KKKKKKKKK-cut2 — sign/verify + envelope + runQuery
  // route through the same Mediator for tenant-scoped RBAC + audit.
  accounting: [
    'queueSendNamed', 'auditChainAppendLinked', 'r2Put', 'r2Get',
    'signUuid', 'verifyUuid', 'encryptEnvelope', 'decryptEnvelope',
    'runQuery',
  ] as const,
  marketing:  ['emailSend', 'browserRender', 'analyticsWrite', 'aiRun'] as const,
  auth:       [
    'kvGet', 'kvPut', 'auditChainAppendLinked',
    'signUuid', 'verifyUuid',
  ] as const,
  ai:         ['aiRun', 'vectorizeQuery', 'vectorizeInsert', 'analyticsWrite'] as const,
  // mcp plugin is the catalog itself; needs the full surface to invoke
  // any tool. Declared explicitly so the invariant doesn't flag it.
  mcp: [
    'kvGet', 'kvPut', 'r2Put', 'r2Get', 'aiRun', 'queueSend', 'queueSendNamed',
    'analyticsWrite', 'auditChainAppend', 'auditChainAppendLinked',
    'auditChainVerify', 'vectorizeQuery', 'vectorizeInsert',
    'browserRender', 'emailSend', 'workflowsCreate',
    'signUuid', 'verifyUuid', 'encryptEnvelope', 'decryptEnvelope',
    'runQuery',
  ] as const,
}

/**
 * Build the typed mediator for a named plugin in one call:
 *
 *   const m = forPlugin(req, 'marketing')
 *   await m.emailSend(...)         // ✓ allowed
 *   await m.r2Put(...)             // ✗ TS error AND runtime throw
 *
 * Each plugin's directory uses this with its own slug.
 */
export function forPlugin<P extends keyof typeof PLUGIN_ACCESS_MAP>(
  req: PayloadRequest,
  pluginSlug: P,
  opts?: Parameters<typeof pluginMediator>[2],
): PluginAccess<(typeof PLUGIN_ACCESS_MAP)[P][number]> {
  const keys = PLUGIN_ACCESS_MAP[pluginSlug] as ReadonlyArray<(typeof PLUGIN_ACCESS_MAP)[P][number]>
  return pluginMediator(req, keys, opts)
}
