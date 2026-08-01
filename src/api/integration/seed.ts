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

/**
 * YouTube Data API v3 — the metadata surface. Keyed, and the key is a real quota, not a formality.
 *
 * The quota is per DAY and it is spent per CALL, not per request-second: a `search.list` costs 100
 * units of a 10,000-unit daily allowance, so **a hundred searches exhausts a day**. Modelling that
 * as a rate limit would be a lie of shape — `limits` here is the burst guard, and the daily quota
 * is the constraint that actually binds. Prefer `playlistItems.list` (1 unit) over `search.list`
 * (100 units) wherever a playlist id is known.
 *
 * **What it does NOT give you: captions.** `captions.download` requires OAuth as the video's OWNER;
 * an API key cannot read another channel's transcript. The metadata is titles, ids and descriptions
 * — which is a real signal and a thin one, and calling it "video content" would be the fabrication
 * [[instrument]] row 5 is about.
 */
export const YOUTUBE: IntegrationSpec = {
  vendor: 'youtube',
  baseUrl: 'https://www.googleapis.com/youtube/v3',
  auth: 'query',
  credentials: ['YOUTUBE_API_KEY'],
  authNames: ['key'],
  limits: [{ scope: 'key', capacity: 60, windowMs: 60_000 }],
  limitsSource: 'https://developers.google.com/youtube/v3/getting-started#quota — 10,000 units/day; search.list = 100 units, playlistItems.list = 1',
}

/**
 * Crossref — every DOI-registered work. **Keyless.**
 *
 * The polite pool is the free tier and it asks for a contact address in the User-Agent; supplying
 * one is not authentication, it is courtesy that buys a better lane. `credentials` is empty because
 * nothing is required — the honest description of a public endpoint, as with Pollinations.
 */
export const CROSSREF: IntegrationSpec = {
  vendor: 'crossref',
  baseUrl: 'https://api.crossref.org',
  auth: 'header',
  credentials: [],
  limits: [{ scope: 'ip', capacity: 50, windowMs: 1_000 }],
  limitsSource: 'https://api.crossref.org/swagger-ui/index.html — polite pool, ~50 req/s with a mailto User-Agent',
}

/** OpenAlex — the open scholarly graph: works, authors, institutions, concepts. **Keyless.** */
export const OPENALEX: IntegrationSpec = {
  vendor: 'openalex',
  baseUrl: 'https://api.openalex.org',
  auth: 'header',
  credentials: [],
  limits: [{ scope: 'ip', capacity: 10, windowMs: 1_000 }],
  limitsSource: 'https://docs.openalex.org/how-to-use-the-api/rate-limits-and-authentication — 100,000/day, 10/s',
}

/** arXiv — preprint metadata and abstracts, Atom XML. **Keyless**, and it asks for 3s between calls. */
export const ARXIV: IntegrationSpec = {
  vendor: 'arxiv',
  baseUrl: 'https://export.arxiv.org/api',
  auth: 'header',
  credentials: [],
  limits: [{ scope: 'ip', capacity: 1, windowMs: 3_000 }],
  limitsSource: 'https://info.arxiv.org/help/api/tou.html — one request per three seconds',
}

/** Wikidata — the structured claim graph behind Wikipedia. **Keyless**; SPARQL and REST. */
export const WIKIDATA: IntegrationSpec = {
  vendor: 'wikidata',
  baseUrl: 'https://www.wikidata.org/w/api.php',
  auth: 'header',
  credentials: [],
  limits: [{ scope: 'ip', capacity: 5, windowMs: 1_000 }],
  limitsSource: 'https://www.mediawiki.org/wiki/API:Etiquette — serial requests, identifying User-Agent',
}

/**
 * The research lanes that cost NOTHING — the set an agent can use without a credential.
 *
 * This is the answer to "extend research capability using local tools": four of the six specs above
 * need no key at all, so the capability is available on a clean checkout with no secret ceremony.
 * YouTube is the outlier and is marked as such by carrying a credential.
 */
export const KEYLESS_RESEARCH: readonly IntegrationSpec[] = [CROSSREF, OPENALEX, ARXIV, WIKIDATA, POLLINATIONS]
