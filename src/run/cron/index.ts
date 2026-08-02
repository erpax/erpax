/**
 * run/cron — the scheduled sweep, and the trigger that fired into nothing.
 *
 * `wrangler.jsonc` declares two cron triggers, and its own comment stated that "the `scheduled()`
 * handler in `.open-next/worker.js` POSTs to `/api/payload-jobs/run`". It does not — that artifact
 * contains no `scheduled` at all, and neither did the Worker entry. So Cloudflare invoked every 15
 * minutes and at 01:00 UTC, found no handler, and did nothing: the dunning-cycle sweep and the BNB
 * rates sync never ran. **Wrangler emits no warning for a declared trigger with no handler** — the
 * failure is silent by construction, which is why it survived.
 *
 * The logic lives here rather than in `worker.ts` because that file imports a BUILD ARTIFACT
 * (`.open-next/worker.js`), so it cannot be loaded in a test on a clean checkout. An atom can.
 *
 * **The token is derived, not stored.** `jobs.access.run` accepts a Bearer token that is
 * `deriveSecretFromPayloadSecret(cron)`. A Worker receives its secrets in `env`, never in
 * `process.env`, so this calls the explicit-master form — the SAME construction the endpoint checks,
 * not a second one that could drift (NIST SP 800-108, src/nist/sp/800/108/kdf.ts).
 *
 * @law a declared trigger must reach a handler. Cloudflare does not warn when it does not, so the
 *      absence is invisible until someone notices the job never ran.
 * @invariant an unset PAYLOAD_SECRET refuses the call rather than sending an unauthenticated one
 * @invariant an unbound WORKER_SELF_REFERENCE refuses rather than reaching the public internet
 * @invariant a non-2xx response is reported; a cron that fails quietly is the defect being closed
 * @standard RFC 6750 §2.1 — Bearer token in the Authorization header
 * @see ./SKILL.md -- ../../nist/sp/800/108/kdf.ts
 */
import { deriveSecretFrom, internalSecretPurpose } from '@/nist/sp/800/108'

/** The slice of the Worker env this needs. Declared narrowly so a test can supply it exactly. */
export interface CronEnv {
  readonly PAYLOAD_SECRET?: string
  readonly WORKER_SELF_REFERENCE?: { fetch(input: string, init?: RequestInit): Promise<Response> }
}

export type CronOutcome =
  | { readonly ran: false; readonly reason: 'no-secret' | 'no-binding' }
  | { readonly ran: true; readonly status: number; readonly ok: boolean }

/** The endpoint the sweep POSTs to. Internal host — the service binding never leaves Cloudflare. */
export const JOBS_RUN_URL = 'https://erpax.internal/api/payload-jobs/run'

/**
 * Run the scheduled jobs sweep. Returns what happened instead of throwing, so the caller can decide
 * whether a refusal is fatal — and so a test can assert the refusal rather than a thrown string.
 */
export async function runScheduledJobs(env: CronEnv, log: (m: string) => void = console.error): Promise<CronOutcome> {
  const secret = deriveSecretFrom(env.PAYLOAD_SECRET, internalSecretPurpose.cron)
  if (!secret) {
    log('[cron] PAYLOAD_SECRET is unset — refusing to call the jobs endpoint unauthenticated')
    return { ran: false, reason: 'no-secret' }
  }
  if (!env.WORKER_SELF_REFERENCE) {
    log('[cron] WORKER_SELF_REFERENCE is not bound — the jobs sweep cannot be dispatched')
    return { ran: false, reason: 'no-binding' }
  }
  const res = await env.WORKER_SELF_REFERENCE.fetch(JOBS_RUN_URL, {
    method: 'POST',
    headers: { authorization: `Bearer ${secret}`, 'content-type': 'application/json' },
  })
  if (!res.ok) log(`[cron] payload-jobs/run responded ${res.status} ${res.statusText}`)
  return { ran: true, status: res.status, ok: res.ok }
}
