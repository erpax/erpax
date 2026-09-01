export const atomPath = 'quantum/ftl' as const
export const ORIGIN = 'https://ceccec.psg.bg' as const
export const LANE = 'https://text.pollinations.ai/openai' as const
export const PROXY = `${ORIGIN}/api/ai` as const

export interface Boundary {
  readonly scan: number
  readonly rederive: number
  readonly spend: number
  readonly qpu: number
  readonly spacetime: number
  readonly empty: boolean
}

export const BOUNDARY: Boundary = {
  scan: 0,
  rederive: 0,
  spend: 0,
  qpu: 0,
  spacetime: 0,
  empty: true,
}

export const PHYSICAL_FTL_DEFAULTS = {
  query: 'possibility:erpax',
  spaceSize: 3105,
  answers: 1,
  tokens: 0,
  reuses: 0,
} as const

/** @index-cross.foldback child=quantum/ftl/constants parent=quantum/ftl — this cross folds back into its parent. */
