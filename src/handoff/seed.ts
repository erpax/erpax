/**
 * handoff/seed — the erpax development handoff, transcribed once, with its line numbers.
 *
 * Every requirement below carries the line of `erpax-development-handoff.md` it came from, so the
 * transcription can be checked against the source in seconds. That is the whole reason the line is
 * stored: a transcription nobody can check is an unrefutable claim about what the document says.
 *
 * The document is not vendored into the corpus — a stray `.md` at an atom root violates the folder
 * law, and a copy is a second source that can drift from the first. The line numbers point at the
 * original.
 *
 * @invariant every requirement cites a line in [1, 93] — the document's real extent
 * @see ./index.ts -- ./SKILL.md
 */
import type { Deviation, Requirement, Spec } from './index'

const CONSTITUTION = 'src/constitution/index.ts'
const TRELLO = 'src/trello/index.ts'
const ANCHOR = 'src/anchor/index.ts'
const ENV_FILES = ['.env.example', 'erpax-env.d.ts'] as const

/** Atom 1 — constitution (handoff §"Atom 1", lines 33–44). */
const CONSTITUTION_REQS: readonly Requirement[] = [
  { id: 'constitution/atom', line: 34, asks: 'src/constitution/{index.ts, SKILL.md, test.ts}', satisfiedBy: { kind: 'atom', path: 'constitution' } },
  { id: 'constitution/noExpectation', line: 35, asks: 'noExpectation(change) — an asserted-but-unproven quantity fails', satisfiedBy: { kind: 'symbol', file: CONSTITUTION, name: 'noExpectation' } },
  { id: 'constitution/noJudgment', line: 37, asks: 'noJudgment(change) — an unmeasured rejection fails', satisfiedBy: { kind: 'symbol', file: CONSTITUTION, name: 'noJudgment' } },
  { id: 'constitution/laws', line: 39, asks: 'the prior nine laws kept as lemmas, each reducing to one of the two rules', satisfiedBy: { kind: 'symbol', file: CONSTITUTION, name: 'LAWS' } },
  { id: 'constitution/prepend', line: 42, asks: 'prependToAgentPrompt() loads the two sentences as the head of any erpax agent prompt', satisfiedBy: { kind: 'symbol', file: CONSTITUTION, name: 'prependToAgentPrompt' } },
  { id: 'constitution/judge', line: 43, asks: 'invariant: over-claim fails noExpectation; unmeasured rejection fails noJudgment', satisfiedBy: { kind: 'symbol', file: CONSTITUTION, name: 'judge' } },
]

/** Atom 2 — trello (handoff §"Atom 2", lines 46–55). */
const TRELLO_REQS: readonly Requirement[] = [
  { id: 'trello/atom', line: 47, asks: 'src/trello/{index.ts, SKILL.md, test.ts}', satisfiedBy: { kind: 'atom', path: 'trello' } },
  { id: 'trello/base', line: 48, asks: 'base https://api.trello.com/1', satisfiedBy: { kind: 'text', file: TRELLO, needle: 'https://api.trello.com/1' } },
  { id: 'trello/client', line: 48, asks: 'typed REST client via fetch, auth key+token from env', satisfiedBy: { kind: 'symbol', file: TRELLO, name: 'createTrelloClient' } },
  ...(['getBoards', 'getLists', 'createCard', 'updateCard', 'moveCard', 'addComment'] as const).map(
    (m): Requirement => ({ id: `trello/${m}`, line: 49, asks: `method ${m}`, satisfiedBy: { kind: 'text', file: TRELLO, needle: `${m}(` } }),
  ),
  { id: 'trello/limiter', line: 50, asks: 'token-bucket limiter: 300 req/10s per key, 100 req/10s per token; bursts queue', satisfiedBy: { kind: 'symbol', file: TRELLO, name: 'TrelloRateLimiter' } },
  { id: 'trello/bucket', line: 50, asks: 'token bucket', satisfiedBy: { kind: 'symbol', file: TRELLO, name: 'TokenBucket' } },
  { id: 'trello/plugin', line: 51, asks: 'trelloPlugin on Payload afterChange/afterDelete', satisfiedBy: { kind: 'symbol', file: 'src/trello/plugin/index.ts', name: 'trelloPlugin' } },
  { id: 'trello/idempotent', line: 52, asks: 'store cardId for idempotent upsert', satisfiedBy: { kind: 'text', file: 'src/trello/plugin/index.ts', needle: 'cardId' } },
  { id: 'trello/error', line: 55, asks: 'a 4xx/5xx surfaces/re-throws — no swallowed catch', satisfiedBy: { kind: 'symbol', file: TRELLO, name: 'TrelloError' } },
]

/** Atom 3 — anchor (handoff §"Atom 3", lines 57–69). */
const ANCHOR_REQS: readonly Requirement[] = [
  { id: 'anchor/atom', line: 58, asks: 'src/anchor/{index.ts, SKILL.md, test.ts}', satisfiedBy: { kind: 'atom', path: 'anchor' } },
  { id: 'anchor/slh-dsa', line: 59, asks: 'FIPS 205 SLH-DSA — primary root signature', satisfiedBy: { kind: 'text', file: ANCHOR, needle: 'slh-dsa-fips205' } },
  { id: 'anchor/ml-dsa', line: 61, asks: 'FIPS 204 ML-DSA — lattice hybrid, its distinct assumption documented', satisfiedBy: { kind: 'text', file: ANCHOR, needle: 'ml-dsa-fips204' } },
  { id: 'anchor/ml-kem', line: 62, asks: 'FIPS 203 ML-KEM — mandatory on every channel that exchanges/syncs/entangles', satisfiedBy: { kind: 'text', file: 'src/anchor/surface/index.ts', needle: 'ML-KEM' } },
  { id: 'anchor/surface', line: 64, asks: 'surface manifest: every reachable surface registered sealed or open', satisfiedBy: { kind: 'atom', path: 'anchor/surface' } },
  { id: 'anchor/gaps', line: 68, asks: 'undeclared reachable surface → fail; bare status → fail', satisfiedBy: { kind: 'symbol', file: 'src/anchor/surface/index.ts', name: 'manifestGaps' } },
  { id: 'anchor/channel-unsealed', line: 69, asks: 'transport without ML-KEM → channel-unsealed', satisfiedBy: { kind: 'text', file: 'src/anchor/surface/index.ts', needle: 'channel-unsealed' } },
  { id: 'anchor/root-unsealed', line: 69, asks: 'root without SLH-DSA/ML-DSA → root-unsealed', satisfiedBy: { kind: 'text', file: 'src/anchor/surface/index.ts', needle: 'root-unsealed' } },
]

/** Config (handoff §"Config", lines 73–78). */
const CONFIG_REQS: readonly Requirement[] = [
  ...(['TRELLO_API_KEY', 'TRELLO_TOKEN', 'TRELLO_BOARD_ID', 'TRELLO_MCP_ENABLED'] as const).map(
    (k): Requirement => ({ id: `config/${k}`, line: 75, asks: `${k} in .env.example + the env type face`, satisfiedBy: { kind: 'env', key: k, files: ENV_FILES } }),
  ),
  ...(['PQC_ROOT_PROVIDER', 'PQC_KEM_PROVIDER', 'PQC_STORAGE_PROVIDER'] as const).map(
    (k): Requirement => ({ id: `config/${k}`, line: 76, asks: `PQC library binding ${k}`, satisfiedBy: { kind: 'env', key: k, files: ENV_FILES } }),
  ),
  { id: 'config/fips', line: 76, asks: 'normative anchors FIPS 203/204/205 cited alongside the existing set', satisfiedBy: { kind: 'text', file: ANCHOR, needle: 'FIPS 205' } },
  { id: 'measure/check', line: 88, asks: 'Confirmation = pnpm check', satisfiedBy: { kind: 'text', file: 'package.json', needle: '"check":' } },
]

/**
 * Where the build departs from the document, on purpose.
 *
 * Both departures are the corpus's own folder law overriding the document's literal spelling: an
 * atom root may hold no stray `.ts` sibling, so what the document writes as `plugin.ts` and
 * `surface.ts` were built as child atoms with their own trinity. The document's requirement is met;
 * its file layout is not, and saying so is cheaper than letting "implemented" quietly mean
 * "implemented differently".
 */
export const HANDOFF_DEVIATIONS: readonly Deviation[] = [
  { line: 47, specified: 'trello/plugin.ts', built: 'trello/plugin/{index,test,SKILL}', because: 'law/folder — no stray .ts at an atom root' },
  { line: 58, specified: 'anchor/surface.ts', built: 'anchor/surface/{index,test,SKILL}', because: 'law/folder — no stray .ts at an atom root' },
]

export const HANDOFF_SPEC: Spec = {
  id: 'erpax-development-handoff',
  source: '~/Downloads/erpax-development-handoff/erpax-development-handoff.md',
  requirements: [...CONSTITUTION_REQS, ...TRELLO_REQS, ...ANCHOR_REQS, ...CONFIG_REQS],
  deviations: HANDOFF_DEVIATIONS,
}
