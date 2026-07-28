/**
 * quantum/ftl/map — each name-token ↔ one fold; combinations compose tools.
 * Entanglements are declared here and verified against exports (not prose).
 */
export const TOKENS = [
  'address',
  'reuse',
  'search',
  'amortize',
  'crack',
  'cracks',
  'boundary',
  'seal',
  'chat',
  'chatLocal',
  'chatEscalate',
  'research',
  'researcher',
  'memo',
  'token',
  'fold',
  'ftl',
] as const

export type Token = (typeof TOKENS)[number]

/** Fractal: which tokens a fold composes. Leaves are CrackKind / fields. */
export const ENTANGLE = {
  ftl: ['reuse', 'amortize', 'cracks', 'boundary'] as const,
  chat: ['seal', 'address', 'token', 'boundary'] as const,
  chatLocal: ['seal', 'address', 'token', 'boundary'] as const,
  chatEscalate: ['address', 'token', 'boundary'] as const,
  research: ['seal', 'memo', 'address', 'amortize', 'boundary'] as const,
  researcher: ['seal', 'memo', 'address', 'token'] as const,
  boundary: ['crack'] as const,
  cracks: ['crack'] as const,
  reuse: ['address', 'fold', 'search'] as const,
  amortize: ['token'] as const,
  seal: ['address'] as const,
} as const

export type CrackKind = 'scan' | 'rederive' | 'spend' | 'qpu' | 'spacetime'

/** Pattern flags that discover a crack — same words as CrackKind / ops. */
export const CRACK_FLAGS = {
  scan: ['scans', 'address'] as const,
  rederive: ['rederives', 'memo'] as const,
  spend: ['spends', 'seal'] as const,
  qpu: ['qpu'] as const,
  spacetime: ['spacetime'] as const,
} as const satisfies Record<CrackKind, readonly string[]>

/** Export names that must exist for each Token (api surface). */
export const API = {
  address: 'reuse', // reuse().address
  reuse: 'reuse',
  search: 'reuse', // reuse().searchOps
  amortize: 'amortize',
  crack: 'crack',
  cracks: 'cracks',
  boundary: 'boundary',
  seal: 'seal',
  chat: 'chat',
  chatLocal: 'chatLocal',
  chatEscalate: 'chatEscalate',
  research: 'research',
  researcher: 'researcher',
  memo: 'researcher', // researcher().memo
  token: 'amortize', // amortize().tokens
  fold: 'reuse', // reuse().foldOps
  ftl: 'ftl',
} as const satisfies Record<Token, string>

/**
 * Old prose-laden identifiers → token API.
 * Chat waves scan src for keys; develop lands values.
 * Longer keys first when applying.
 */
export const RENAME = {
  physicalFtlClaim: 'spacetime',
  claimsPhysicalFtl: 'spacetime',
  'physical-ftl-claim': 'spacetime',
  qpuRequired: 'qpu',
  claimsQpu: 'qpu',
  'qpu-required-claim': 'qpu',
  HonestFtlBoundary: 'Boundary',
  honestBoundary: 'boundary',
  HONEST_FTL_BOUNDARY: 'BOUNDARY',
  ArchitecturalFtl: 'Ftl',
  architecturalFtl: 'ftl',
  amortizeOnReuse: 'amortize',
  reuseVsSearch: 'reuse',
  isFtlCrack: 'crack',
  ftlCracks: 'cracks',
  freeChatLocal: 'chatLocal',
  freeChatEscalate: 'chatEscalate',
  freeChatAnswer: 'chat',
  deepResearchAtNoCost: 'research',
  noCostResearcher: 'researcher',
  ARCHITECTURAL_FTL_BOOK: 'BOOK',
  NO_COST_RESEARCH_CORPUS: 'CORPUS',
  FREE_CHAT_ORIGIN: 'ORIGIN',
  FREE_LANE_ENDPOINT: 'LANE',
  FREE_PROXY_ENDPOINT: 'PROXY',
  DeepResearchAtNoCost: 'Research',
  SealedAnswerBook: 'SealBook',
  sealAnswerBook: 'seal',
  SealedStatement: 'Seal',
  FreeChatAnswer: 'Chat',
  FreeChatLane: 'ChatLane',
  quantumiseAtFtl: 'precomputed',
  scansLinearly: 'scans',
  addressAvailable: 'address',
  reDerives: 'rederives',
  memoHit: 'memo',
  spendsTokens: 'spends',
  sealedAnswerAvailable: 'seal',
  'local-sealed': 'seal',
  'free-lane': 'lane',
} as const

/** Prose syllables that never map to a Token fold — scan fuel. */
export const PROSE = [
  'physical',
  'honest',
  'claim',
  'architectural',
  'NoCost',
  'Required',
  'quantumise',
] as const
