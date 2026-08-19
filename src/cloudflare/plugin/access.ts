/**
 * Typed per-plugin access surfaces — a plugin declares `PluginAccess<K>` and receives
 * ONLY the bindings it names, instead of the full mediator. Why that matters, and what
 * a plugin may and may not reach, is in ./SKILL.md.
 */
import type { PayloadRequest } from 'payload'
import { erpaxMediator } from './mediator'
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
