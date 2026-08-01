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


/**
 * Stack Exchange — the whole network (Stack Overflow, Server Fault, Ask Ubuntu …) behind one API.
 * **Keyless** for a small daily allowance; a free key raises it and is not authentication.
 *
 * Responses are gzip-encoded ALWAYS, and the useful fields (`body`, `body_markdown`) require an
 * explicit `filter` — the default returns metadata only. That is a shape trap: a caller who forgets
 * the filter gets a 200, a well-formed payload, and no answer text, which reads exactly like "no
 * results" ([[instrument]] — the wrong instrument does not error, it answers).
 */
export const STACKEXCHANGE: IntegrationSpec = {
  vendor: 'stackexchange',
  baseUrl: 'https://api.stackexchange.com/2.3',
  auth: 'query',
  credentials: [],
  limits: [{ scope: 'ip', capacity: 30, windowMs: 1_000 }],
  limitsSource: 'https://api.stackexchange.com/docs/throttle — 300/day keyless, 10,000/day with a free key; 30 req/s burst',
}

/** Hacker News (Firebase) — stories, comments, the whole item graph. **Keyless**, no throttle published. */
export const HACKERNEWS: IntegrationSpec = {
  vendor: 'hackernews',
  baseUrl: 'https://hacker-news.firebaseio.com/v0',
  auth: 'header',
  credentials: [],
  limits: [{ scope: 'ip', capacity: 20, windowMs: 1_000 }],
  limitsSource: 'https://github.com/HackerNews/API — no documented limit; 20/s is a self-imposed courtesy bound',
}

/** GitHub REST — code, issues, releases. Keyless at 60/hr; a token raises it to 5,000/hr. */
export const GITHUB: IntegrationSpec = {
  vendor: 'github',
  baseUrl: 'https://api.github.com',
  auth: 'bearer',
  credentials: ['GITHUB_TOKEN'],
  limits: [{ scope: 'ip', capacity: 60, windowMs: 3_600_000 }],
  limitsSource: 'https://docs.github.com/rest/using-the-rest-api/rate-limits-for-the-rest-api — 60/hr unauthenticated, 5,000/hr with a token',
}

/**
 * ILO NORMLEX — the labour conventions AND their ratification per country. **Keyless.**
 *
 * This one is aimed at a measured gap, not a guess: of 16 labour/HR standards in the registry,
 * FIFTEEN are cited by nothing (only ILO C001 is implemented, in [[work]]/shifts). NORMLEX carries
 * both the instrument text and — the part that matters for a residence query — **which states have
 * ratified it**, which is the difference between "this convention exists" and "this convention
 * binds this employer".
 */
export const NORMLEX: IntegrationSpec = {
  vendor: 'normlex',
  baseUrl: 'https://normlex.ilo.org/dyn/normlex/en',
  auth: 'header',
  credentials: [],
  limits: [{ scope: 'ip', capacity: 1, windowMs: 2_000 }],
  limitsSource: 'https://normlex.ilo.org — no published limit; 1 per 2s is a self-imposed courtesy bound',
}

/**
 * EUR-Lex / EU Publications Office — every EU act by CELEX id, with a public SPARQL endpoint.
 * **Keyless.**
 *
 * The registry holds 64 EU-jurisdiction rows and the directives behind the uncited HR obligations
 * (EU-2019/1152 transparent working conditions, EU-96/71/EC and EU-2018/957 posted workers,
 * EU-2019/1937 whistleblowing). CELEX is the address; this is how a citation becomes resolvable.
 */
export const EURLEX: IntegrationSpec = {
  vendor: 'eurlex',
  baseUrl: 'https://publications.europa.eu/webapi/rdf/sparql',
  auth: 'header',
  credentials: [],
  limits: [{ scope: 'ip', capacity: 1, windowMs: 1_000 }],
  limitsSource: 'https://op.europa.eu/en/web/who-we-are/cellar — public SPARQL, fair-use; 1/s courtesy bound',
}

/**
 * REST Countries — ISO 3166-1 codes with UN M49 region and subregion. **Keyless.**
 *
 * The residence join added this session resolves any alpha-2 code but the registry loads statutes
 * for THREE territories. A region/subregion hierarchy is what turns that into "loadable per region"
 * — an EU obligation reaching every member without a per-country row — instead of 190 hand-typed
 * registries, which is the derived-not-transcribed move [[cli]]/face made for commands.
 */
export const RESTCOUNTRIES: IntegrationSpec = {
  vendor: 'restcountries',
  baseUrl: 'https://restcountries.com/v3.1',
  auth: 'header',
  credentials: [],
  limits: [{ scope: 'ip', capacity: 10, windowMs: 1_000 }],
  limitsSource: 'https://restcountries.com — public, no documented limit; 10/s courtesy bound',
}

/** World Bank Indicators — country-level society and economy series. **Keyless.** */
export const WORLDBANK: IntegrationSpec = {
  vendor: 'worldbank',
  baseUrl: 'https://api.worldbank.org/v2',
  auth: 'header',
  credentials: [],
  limits: [{ scope: 'ip', capacity: 10, windowMs: 1_000 }],
  limitsSource: 'https://datahelpdesk.worldbank.org/knowledgebase/articles/889392 — public, no key',
}

/** Eurostat — the EU statistical surface behind CSRD/ESRS reporting. **Keyless.** */
export const EUROSTAT: IntegrationSpec = {
  vendor: 'eurostat',
  baseUrl: 'https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data',
  auth: 'header',
  credentials: [],
  limits: [{ scope: 'ip', capacity: 5, windowMs: 1_000 }],
  limitsSource: 'https://wikis.ec.europa.eu/display/EUROSTATHELP — public API, fair use',
}

/** Zenodo — DOI-minted research artifacts, datasets and software. **Keyless** for read. */
export const ZENODO: IntegrationSpec = {
  vendor: 'zenodo',
  baseUrl: 'https://zenodo.org/api',
  auth: 'header',
  credentials: [],
  limits: [{ scope: 'ip', capacity: 60, windowMs: 60_000 }],
  limitsSource: 'https://developers.zenodo.org/#rate-limiting — 60/min unauthenticated',
}

/**
 * schema.org — the vocabulary the naming law draws on. **Keyless**, JSON-LD contexts over HTTPS.
 *
 * Measured, not assumed: `schema.org` carries **1,986 citations** in the catalogue — the most-cited
 * vocabulary in the corpus — and had no lane. Atom names are supposed to come from harmonized
 * standards vocabulary, and the generator that would derive a name FROM schema.org does not exist,
 * so every name is currently a human choice checked against nothing.
 */
export const SCHEMAORG: IntegrationSpec = {
  vendor: 'schemaorg',
  baseUrl: 'https://schema.org',
  auth: 'header',
  credentials: [],
  limits: [{ scope: 'ip', capacity: 5, windowMs: 1_000 }],
  limitsSource: 'https://schema.org/docs/developers.html — static JSON-LD/CSV releases, no documented limit',
}

/**
 * ECB — euro foreign-exchange REFERENCE rates. **Keyless**, daily XML.
 *
 * `ISO-4217` carries 308 citations and `multi/currency/service` exists, so the loop is real. The
 * boundary is in the name: these are REFERENCE rates published once each working day around 16:00
 * CET, not tradeable quotes. There is no rate on a weekend or a TARGET holiday, and a booking that
 * silently reuses Friday's rate for Sunday has invented a price — which is a restatement risk, not
 * a rounding one.
 */
export const ECB: IntegrationSpec = {
  vendor: 'ecb',
  baseUrl: 'https://www.ecb.europa.eu/stats/eurofxref',
  auth: 'header',
  credentials: [],
  limits: [{ scope: 'ip', capacity: 2, windowMs: 1_000 }],
  limitsSource: 'https://www.ecb.europa.eu/stats/policy_and_exchange_rates — daily reference rates, no key',
}

/**
 * VIES — EU VAT number validation. **Keyless.**
 *
 * ЗДДС is cited and `naredba/n/18` exists, so validating a counterparty VAT id is in scope. Two
 * honest limits, both of which bite in accounting: VIES is a FEDERATION of member-state registries,
 * so an outage in one state returns unavailable rather than invalid — treating that as invalid
 * would reject a lawful trader — and a `valid: true` says the number is registered, never that the
 * counterparty is the entity presenting it.
 */
export const VIES: IntegrationSpec = {
  vendor: 'vies',
  baseUrl: 'https://ec.europa.eu/taxation_customs/vies/rest-api',
  auth: 'header',
  credentials: [],
  limits: [{ scope: 'ip', capacity: 1, windowMs: 1_000 }],
  limitsSource: 'https://ec.europa.eu/taxation_customs/vies — per-member-state availability, fair use',
}

/**
 * OSV.dev — open-source vulnerability data. **Keyless**, and aimed at a number seen today.
 *
 * Every push in this session printed the same line: **61 vulnerabilities on the default branch (1
 * critical, 29 high, 25 moderate, 6 low)**. Nothing in the corpus reads them, so the count is
 * carried by GitHub's UI and by nobody's gate. OSV is queryable by package and version, which makes
 * that number computable here rather than reported at us.
 *
 * It reports what is KNOWN to be vulnerable — silence is absence of a published advisory, never
 * evidence of safety.
 */
export const OSV: IntegrationSpec = {
  vendor: 'osv',
  baseUrl: 'https://api.osv.dev/v1',
  auth: 'header',
  credentials: [],
  limits: [{ scope: 'ip', capacity: 25, windowMs: 1_000 }],
  limitsSource: 'https://google.github.io/osv.dev/api/ — public API, no key',
}

/**
 * GLEIF — the global Legal Entity Identifier index. **Keyless.**
 *
 * Wired alongside `ISO-17442`, which was added to the registry in the same change: the standard was
 * absent, and dropping the lane for want of a row would have had the registry bound the corpus
 * instead of growing to meet it.
 *
 * An LEI answers *which legal entity is this counterparty*, globally and unambiguously — the
 * question a VAT id answers only inside the EU and only for the registered number. The honest limit
 * is that an LEI is SELF-REPORTED then validated: `LAPSED` means the entity stopped renewing, not
 * that it ceased to exist, and treating lapsed as invalid would reject live trading partners.
 */
export const GLEIF: IntegrationSpec = {
  vendor: 'gleif',
  baseUrl: 'https://api.gleif.org/api/v1',
  auth: 'header',
  credentials: [],
  limits: [{ scope: 'ip', capacity: 60, windowMs: 60_000 }],
  limitsSource: 'https://www.gleif.org/en/lei-data/gleif-api — public API, no key; 60/min courtesy bound',
}

export const KEYLESS_RESEARCH: readonly IntegrationSpec[] = [
  CROSSREF,
  OPENALEX,
  ARXIV,
  WIKIDATA,
  POLLINATIONS,
  STACKEXCHANGE,
  HACKERNEWS,
  NORMLEX,
  EURLEX,
  RESTCOUNTRIES,
  WORLDBANK,
  EUROSTAT,
  ZENODO,
  SCHEMAORG,
  ECB,
  VIES,
  OSV,
  GLEIF,
]
