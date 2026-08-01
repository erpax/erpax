/**
 * api/integration/seed — every external system the repo actually touches, as specs.
 *
 * DISCOVERED, never invented: each spec below is derived from something already in the repo — a
 * package.json dependency, a `.env.example` credential, a wrangler binding or cron, a `.mcp.json`
 * server, or an atom that already calls the lane. A vendor nobody depends on is not an integration,
 * it is a wish, and it does not belong in a seed ([[seed]]: a seed is a function of its source).
 *
 * Every limit carries `limitsSource` — the vendor's own published page. That is the recompute path
 * ([[constitution]] Law 5): a number here is checkable against its origin, not asserted.
 *
 * @invariant every spec's credentials appear in .env.example or a wrangler binding — none invented
 * @invariant every spec carries at least one published limit and the source that documents it
 * @see ./index.ts -- ../../trello -- ../../seed/row
 */
import type { IntegrationSpec } from './index'

/** Trello — the worked example, now data. The machinery it proved lives in `./index.ts`. */
export const TRELLO: IntegrationSpec = {
  vendor: 'trello',
  baseUrl: 'https://api.trello.com/1',
  auth: 'query',
  credentials: ['TRELLO_API_KEY', 'TRELLO_TOKEN'],
  authNames: ['key', 'token'],
  limits: [
    { scope: 'key', capacity: 300, windowMs: 10_000 },
    { scope: 'token', capacity: 100, windowMs: 10_000 },
  ],
  limitsSource: 'https://developer.atlassian.com/cloud/trello/guides/rest-api/rate-limits/',
}

/**
 * Pollinations — the FREE AI lane [[quantum]]/ftl already calls (`LANE`). No credential at all,
 * which is why the seed carries an empty `credentials`: the honest description of a public endpoint,
 * not a missing key. It is the lane that makes an agent free.
 */
export const POLLINATIONS: IntegrationSpec = {
  vendor: 'pollinations',
  baseUrl: 'https://text.pollinations.ai',
  auth: 'header',
  credentials: [],
  limits: [{ scope: 'ip', capacity: 1, windowMs: 3_000 }],
  limitsSource: 'https://github.com/pollinations/pollinations — anonymous tier, 1 concurrent / ~3s',
}

/** Stripe — a package.json dependency and STRIPE_SECRET_KEY in .env.example. */
export const STRIPE: IntegrationSpec = {
  vendor: 'stripe',
  baseUrl: 'https://api.stripe.com/v1',
  auth: 'bearer',
  credentials: ['STRIPE_SECRET_KEY'],
  limits: [{ scope: 'account', capacity: 100, windowMs: 1_000 }],
  limitsSource: 'https://docs.stripe.com/rate-limits — 100 read/write ops per second in live mode',
}

/** Resend — the Payload email adapter's API; RESEND_API_KEY in .env.example. */
export const RESEND: IntegrationSpec = {
  vendor: 'resend',
  baseUrl: 'https://api.resend.com',
  auth: 'bearer',
  credentials: ['RESEND_API_KEY'],
  limits: [{ scope: 'account', capacity: 2, windowMs: 1_000 }],
  limitsSource: 'https://resend.com/docs/api-reference/introduction#rate-limit — 2 requests/second',
}

/** Every discovered spec — the registry the seed and the tests both read. */
export const SPECS: readonly IntegrationSpec[] = [TRELLO, POLLINATIONS, STRIPE, RESEND]

/** One spec by vendor slug — refused rather than guessed when the vendor is unknown. */
export function specOf(vendor: string): IntegrationSpec | undefined {
  return SPECS.find((s) => s.vendor === vendor)
}
