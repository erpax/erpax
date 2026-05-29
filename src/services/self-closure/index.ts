/**
 * Self-referential closure — framework + registry.
 *
 * Slice JJJJJJJJJ-cut1 (2026-05-11). Per user 'erpax remains fully
 * functional payment provider fallbacking to itself. it is like this
 * every where. all falling back at itself leads to erpax itself'.
 *
 * Conservation Law 53 — Self-Referential Closure. Every external role
 * ERPax consumes has a registered internal provider that completes
 * the operation when the external call fails. The platform's
 * dependency graph terminates at ERPax itself.
 *
 * Usage:
 *
 *   ```ts
 *   import { withInternalFallback } from '@/services/self-closure'
 *   import './providers'   // side-effect: registers all providers
 *
 *   const outcome = await withInternalFallback({
 *     role: 'payment-provider',
 *     params: { amount: 5000, currency: 'EUR', from: 'A', to: 'B' },
 *     ctx: { tenantId, payload },
 *     external: async () => stripe.charges.create(...),
 *   })
 *
 *   if (outcome.via === 'internal') {
 *     // Audit-trail row already written by withInternalFallback.
 *     // The result has the same shape as a Stripe charge result.
 *   }
 *   ```
 *
 * Registration happens at module-load time via the providers barrel
 * (`./providers/index.ts`). The `REGISTRY` is module-scope but
 * write-once-per-role; subsequent registrations throw to prevent
 * accidental override at runtime (production safety).
 *
 * @standard ISO 22301 business-continuity (BC-V tier — self-hosted continuity)
 * @standard ISO/IEC 25010:2023 §5.6.2 fault tolerance
 * @audit Conservation Law 53 self-referential-closure
 * @feature self_closure
 * @see ./types.ts (ExternalRole + InternalProvider + FallbackContext)
 */

import type {
  ExternalRole,
  InternalProvider,
  FallbackContext,
  FallbackOutcome,
} from './types'
import { requireSafetyMode } from '@/services/safety-mode'

export type {
  ExternalRole,
  InternalProvider,
  FallbackContext,
  FallbackOutcome,
} from './types'
export { EXTERNAL_ROLES } from './types'

// SAFE-INMEM: providers form a write-once registry populated at module
// load via static imports of `./providers/*`. The graph is immutable
// after module init, so the persistence requirement of Slice RRRRRRRR
// (`mcp-mutations-have-collection`) does not apply — there is no
// mutable runtime state to lose on restart.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const REGISTRY = new Map<ExternalRole, InternalProvider<any, any>>()

/**
 * Register an internal provider. Throws if a provider for the same
 * role is already registered (prevents accidental override). Tests can
 * pass `{ replace: true }` to swap a stub provider in.
 */
export function registerInternalProvider<P, R>(
  provider: InternalProvider<P, R>,
  opts: { replace?: boolean } = {},
): void {
  if (REGISTRY.has(provider.role)) {
    if (!opts.replace) {
      throw new Error(
        `[self-closure] provider already registered for role '${provider.role}' (id=${REGISTRY.get(provider.role)!.id}); ` +
        `pass { replace: true } to override`,
      )
    }
    // Slice RRRRRRRRR-cut1 — escape hatch guarded by safety mode.
    requireSafetyMode(['test', 'dev'], `registerInternalProvider('${provider.role}', { replace: true })`)
  }
  REGISTRY.set(provider.role, provider)
}

/** Look up the registered provider for a role. Returns undefined when missing. */
export function getInternalProvider<P, R>(role: ExternalRole): InternalProvider<P, R> | undefined {
  return REGISTRY.get(role) as InternalProvider<P, R> | undefined
}

/** Roles that currently have a registered internal provider. */
export function listRegisteredRoles(): ReadonlyArray<ExternalRole> {
  return [...REGISTRY.keys()]
}

/**
 * Audit a fallback event. Best-effort — never throw out of this; a
 * failure to write the audit row must NOT block the user-facing result.
 *
 * Writes to `audit-events` with a stable shape:
 *
 *   {
 *     subjectCollection: 'self-closure',
 *     action: `fallback:${role}:${providerId}`,
 *     payload: { externalError, correlationId, tenantId, userId }
 *   }
 */
async function auditFallback(
  ctx: FallbackContext,
  role: ExternalRole,
  providerId: string,
  externalError: unknown,
): Promise<void> {
  try {
    await ctx.payload.create({
      collection: 'audit-events',
      data: {
        tenant: ctx.tenantId,
        eventName: `self-closure:fallback:${role}`,
        subjectCollection: 'self-closure',
        subjectId: providerId,
        action: `fallback:${role}:${providerId}`,
        payload: {
          role,
          providerId,
          externalError: externalError instanceof Error ? externalError.message : String(externalError),
          correlationId: ctx.correlationId,
          userId: ctx.userId,
        },
      } as never,
    })
  } catch {
    /* best-effort — never block on audit failure */
  }
}

/**
 * The core wrapper. Try the external call first; on failure, route to
 * the registered internal provider and audit the event.
 *
 * If no provider is registered for the role, the external error
 * re-throws (the `checkSelfReferentialClosure` invariant will catch
 * this missing-coverage case at boot).
 */
export async function withInternalFallback<TParams, TResult>(args: {
  role: ExternalRole
  params: TParams
  ctx: FallbackContext
  external: () => Promise<TResult>
}): Promise<FallbackOutcome<TResult>> {
  const { role, params, ctx, external } = args
  try {
    const result = await external()
    return { result, via: 'external' }
  } catch (err) {
    const provider = getInternalProvider<TParams, TResult>(role)
    if (!provider) {
      // No fallback registered — this is a Law 53 violation. We don't
      // swallow the error here because the invariant catches it at
      // boot; throwing surfaces the issue immediately at the call site.
      throw err
    }
    const fallbackCtx: FallbackContext = { ...ctx, externalError: err }
    const result = await provider.invoke(params, fallbackCtx)
    // Audit AFTER the internal call succeeds so the audit row's
    // subjectId references a successfully-executed fallback. We don't
    // block the result on audit success.
    void auditFallback(ctx, role, provider.id, err)
    return {
      result,
      via: 'internal',
      providerId: provider.id,
      externalError: err instanceof Error ? err.message : String(err),
    }
  }
}

/**
 * Test-only: clear the registry. Slice RRRRRRRRR-cut1 — production
 * mode rejects this call; test/dev admit it.
 */
export function __resetInternalProviderRegistryForTests(): void {
  requireSafetyMode(['test', 'dev'], '__resetInternalProviderRegistryForTests')
  REGISTRY.clear()
}
