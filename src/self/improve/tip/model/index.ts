/**
 * self/improve/tip/model — the tip loop's vocabulary: gap kinds, thresholds,
 * audit and tip shapes, and the patterns that refuse a vague tip. @see ./SKILL.md
 */
import { createRequire } from 'node:module'
import type { Continuation } from '@/self/improve'

const require = createRequire(import.meta.url)
export const atomPath = 'self/improve/tip' as const


/** Gap kinds the self-dev loop can settle — each maps to at most one tip (fork dissolved). */
export type GapKind =
  | 'leftover'
  | 'math'
  | 'purify'
  | 'dry-proof'
  | 'doctor'
  | 'mcp-fuse'
  /** Server/boot TTFB after client stubs won — profile SSR/cold Worker, not more chunk shaving. */
  | 'admin-boot'
  /** ftlReport().holds===false — quantumise under quantum/ftl until holds flips true. */
  | 'quantumise'

/** Live residual after FTL client stubs (assets ~5 MiB). Chunk shaving is low ROI; TTFB is next. */
export const ADMIN_TTFB_MS_RESIDUAL = 4900 as const
/** Below this, admin-boot tip is omitted (boot considered acceptable). */
export const ADMIN_TTFB_MS_OK = 1500 as const

/** Score factors — tip selection is unblock/(cost×risk), never vibes. */
export interface GapScore {
  /** How much the loop unblocks when this lands (sites settled · gates opened). */
  readonly unblock: number
  /** Relative effort (1 = cheap CLI/one-file; 10 = full publish/redeploy). */
  readonly cost: number
  /** Relative risk of thrash/secret/deploy conflict (1 = safe local; 5 = live deploy). */
  readonly risk: number
}

export interface SelfDevGap {
  readonly kind: GapKind
  readonly factors: GapScore
  /** Computed: unblock / (cost × risk) — higher first. */
  readonly score: number
  readonly where: string
  /** Exact primary file when known (surgical address). */
  readonly file: string | null
  readonly prose: string
  readonly research: string
  /** True when tip requires a secret name present — never prints values. */
  readonly secretGated: boolean
}

/** Form · code · proof — the trinity an agent executes next. */
export interface TrinityTip {
  readonly form: string
  readonly code: string
  readonly proof: string
  readonly gap: SelfDevGap
  /** Fuel for wave/feed — novel asks derived from this tip. */
  readonly nextAsks: readonly string[]
  readonly continuation: Continuation
  /** False when scanner refused to emit (noise / vague / blocked). */
  readonly accepted: boolean
  readonly refuseReason: string | null
}

export interface SelfDevAudit {
  readonly gaps: readonly SelfDevGap[]
  readonly heaviest: SelfDevGap | null
  readonly leftoverPull: number
  readonly mathCount: number
  readonly purifyHits: number
  readonly dryProofOk: boolean
  readonly doctorFails: number
  readonly waveCount: number
  readonly mcpFuseReady: boolean
  readonly adminTtfbMs: number
  /** Live substrate FTL boolean from ftlReport().holds — false ⇒ quantumise tip. */
  readonly ftlHolds: boolean
  readonly ftlWhy: string | null
}

export interface TipEmitOpts {
  readonly cwd?: string
  readonly mathCount?: number
  readonly mathFile?: string | null
  readonly purifyHits?: number
  readonly purifyFile?: string | null
  readonly leftoverFile?: string | null
  readonly leftoverGroup?: string | null
  readonly leftoverPull?: number
  readonly stopped?: boolean
  readonly seedFraction?: number
  /** Skip hostMath / purify / doctor scans (fixture-friendly). */
  readonly lean?: boolean
  /** Force dry-proof ok for fixtures. */
  readonly dryProofOk?: boolean
  /** Inject mcp-fuse readiness (secret names present). */
  readonly mcpFuseReady?: boolean
  /**
   * Measured /admin HTML TTFB ms. Env `ERPAX_ADMIN_TTFB_MS` or live residual default
   * when FTL admin stubs exist. Omit tip when ≤ ADMIN_TTFB_MS_OK.
   */
  readonly adminTtfbMs?: number
  /** Force-skip admin-boot tip (fixtures). */
  readonly skipAdminBoot?: boolean
  /**
   * Inject ftlReport().holds result. Omit + lean ⇒ true (no quantumise tip).
   * false ⇒ scored tip kind `quantumise`.
   */
  readonly ftlHolds?: boolean
  /** Precise break reason when ftlHolds is false (crack / amortize / reuse). */
  readonly ftlWhy?: string | null
  /** Force-skip ftlHolds / quantumise tip (fixtures). */
  readonly skipFtl?: boolean
}

/** Phrases that are NOT tips — vibes / noise. */
export const VAGUE_TIP_RE =
  /\b(continue improving|keep going|do better|self-?improve|polish|somehow|maybe|various|etc\.?)\b/i

/** CODE must name a concrete path or pnpm/tsx command. */
export const CONCRETE_CODE_RE =
  /(?:src\/[\w./-]+|pnpm\s+erpax\s+\w+|tsx\s+src\/|hostMathViolations|buildDryProofBundle|checkDryProofPublished|fuse-mcp|adminBoot|ftlHolds|curl\s+-)/

/** PROOF must name an exact green signal (=== / exit / length / ok). */
export const CONCRETE_PROOF_RE =
  /(?:===?\s*(?:0|true|false|ok)|\.length\s*===?\s*0|\.ok\s*===?\s*true|exit\s*0|residual\s+drops|holds\s*=\s*true|ftlReport\(\).holds\s*===?\s*true|TTFB\s*[<≤]\s*\d+)/i

export function safeLoad<T>(id: string): T | null {
  try {
    return require(id) as T
  } catch {
    return null
  }
}
