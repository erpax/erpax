/**
 * self/improve/tip — feed-scanner: audit gaps → score → precise trinity tip.
 *
 * HARD LAW: agents doubt prose; FTL compute is the seal. Every tip must call
 * or prove under `src/quantum/ftl` (or a sibling compute). Prose-only gaps are
 * refused / fail-closed to `quantumise` when `physicalFtl()` cannot hold true.
 *
 * Reasoning: score = unblock / (cost × risk). Highest wins. Forks dissolve
 * (one tip per kind). Vague “continue improving” is refused — not a tip.
 *
 * Precision: FORM = one executable sentence · CODE = exact file(s)/command(s) ·
 * PROOF = exact green signal. Chat self-feed: `pnpm erpax tip` · ends `erpax gaps`.
 *
 * DRY with leftover · algebra/host · quantum/ftl · quantum/ftl/purify · proof/dry-proof · doctor.
 *
 *   tsx src/self/improve/tip.ts
 *   pnpm erpax tip
 *
 * @see ./index · ../../leftover · ../../wave/feed · ../../quantum/ftl · ../../quantum/ftl/purify · ../../proof
 */
import { createRequire } from 'node:module'
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { exactMax, exactDivFloor } from '@/algebra'
import { attraction, leftoverSites, waves, type Attraction, type Wave } from '@/leftover'
import { shouldContinue, type Continuation } from './index'

export const atomPath = 'self/improve/tip' as const

const require = createRequire(import.meta.url)

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
  /** physicalFtl()===false — quantumise under quantum/ftl until holds flips true. */
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
  /** Live substrate FTL boolean from physicalFtl() — false ⇒ quantumise tip. */
  readonly physicalFtl: boolean
  readonly physicalFtlWhy: string | null
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
   * Inject physicalFtl() result. Omit + lean ⇒ true (no quantumise tip).
   * false ⇒ scored tip kind `quantumise`.
   */
  readonly physicalFtl?: boolean
  /** Precise break reason when physicalFtl is false (crack / amortize / reuse). */
  readonly physicalFtlWhy?: string | null
  /** Force-skip physicalFtl / quantumise tip (fixtures). */
  readonly skipPhysicalFtl?: boolean
}

/** Phrases that are NOT tips — vibes / noise. */
export const VAGUE_TIP_RE =
  /\b(continue improving|keep going|do better|self-?improve|polish|somehow|maybe|various|etc\.?)\b/i

/** CODE must name a concrete path or pnpm/tsx command. */
export const CONCRETE_CODE_RE =
  /(?:src\/[\w./-]+|pnpm\s+erpax\s+\w+|tsx\s+src\/|hostMathViolations|buildDryProofBundle|checkDryProofPublished|fuse-mcp|adminBoot|physicalFtl|curl\s+-)/

/** PROOF must name an exact green signal (=== / exit / length / ok). */
export const CONCRETE_PROOF_RE =
  /(?:===?\s*(?:0|true|false|ok)|\.length\s*===?\s*0|\.ok\s*===?\s*true|exit\s*0|residual\s+drops|holds\s*=\s*true|physicalFtl\(\)\s*===?\s*true|TTFB\s*[<≤]\s*\d+)/i

function safeLoad<T>(id: string): T | null {
  try {
    return require(id) as T
  } catch {
    return null
  }
}

/** score = unblock / (cost × risk); integer via floor for stable ranking. */
export function scoreGap(f: GapScore): number {
  const denom = exactMax(1, f.cost) * exactMax(1, f.risk)
  // Scale ×100 so small unblock still ranks above zero noise.
  return exactDivFloor(f.unblock * 100, denom)
}

/**
 * Secret *names* present in .env — never returns values.
 * MCP fuse tip is gated on these; absent ⇒ tip omitted (not a vibes tip).
 */
export function secretNamesPresent(cwd: string = process.cwd()): {
  readonly payloadSecret: boolean
  readonly fusePassword: boolean
  readonly any: boolean
} {
  try {
    const text = readFileSync(join(cwd, '.env'), 'utf8')
    const payloadSecret = /^PAYLOAD_SECRET=.+/m.test(text)
    const fusePassword = /^ERPAX_FUSE_PASSWORD=.+/m.test(text)
    return { payloadSecret, fusePassword, any: payloadSecret || fusePassword }
  } catch {
    return { payloadSecret: false, fusePassword: false, any: false }
  }
}

function makeGap(
  kind: GapKind,
  factors: GapScore,
  where: string,
  prose: string,
  research: string,
  file: string | null = null,
  secretGated = false,
): SelfDevGap {
  return {
    kind,
    factors,
    score: scoreGap(factors),
    where,
    file,
    prose,
    research,
    secretGated,
  }
}

/**
 * Audit live self-dev gaps. One gap per kind (fork dissolved). Scored by
 * unblock/(cost×risk). Optional scanners via createRequire for lean fixtures.
 */
export function auditSelfDevGaps(opts: TipEmitOpts = {}): SelfDevAudit {
  const cwd = opts.cwd ?? process.cwd()
  const byKind = new Map<GapKind, SelfDevGap>()

  const put = (g: SelfDevGap) => {
    const prev = byKind.get(g.kind)
    if (!prev || g.score > prev.score) byKind.set(g.kind, g)
  }

  let leftoverPull = opts.leftoverPull ?? 0
  let leftoverFile = opts.leftoverFile ?? null
  let leftoverGroup = opts.leftoverGroup ?? null
  const w: readonly Wave[] = opts.lean && opts.leftoverPull != null ? [] : waves(cwd)

  if (opts.leftoverPull == null) {
    const clusters: readonly Attraction[] = attraction(cwd)
    leftoverPull = clusters.reduce((n, c) => n + c.pull, 0)
    if (clusters[0]) {
      leftoverGroup = clusters[0].group
      leftoverFile = clusters[0].members[0] ?? null
      const sites = leftoverSites(cwd).filter((s) => s.group === clusters[0]!.group)
      const site = sites[0]
      if (site) leftoverFile = `${site.bit}:${site.line}:${site.column}`
    }
  }

  if (leftoverPull > 0 && leftoverGroup) {
    put(
      makeGap(
        'leftover',
        { unblock: leftoverPull * 10, cost: 3, risk: 1 },
        `src/${leftoverGroup}`,
        `${leftoverPull} unproven claim(s) in field '${leftoverGroup}'`,
        `deriveLeftoverProof or chatHealLeftoverWave on ${leftoverFile ?? `src/${leftoverGroup}`}`,
        leftoverFile,
      ),
    )
  }

  let mathCount = opts.mathCount ?? 0
  let mathFile = opts.mathFile ?? null
  if (opts.mathCount == null && !opts.lean) {
    const host = safeLoad<typeof import('@/algebra/host')>('@/algebra/host')
    if (host) {
      const v = host.hostMathViolations(cwd)
      mathCount = v.length
      mathFile = v[0] ? `${v[0].file}:${v[0].line}` : null
    }
  }
  if (mathCount > 0) {
    put(
      makeGap(
        'math',
        { unblock: mathCount, cost: 2, risk: 1 },
        mathFile ?? 'src/** (host Math.*)',
        `${mathCount} host Math.* site(s) dissolve seals`,
        `replace Math.* at ${mathFile ?? 'first hostMathViolations() hit'} with @/algebra exact*`,
        mathFile,
      ),
    )
  }

  let purifyHits = opts.purifyHits ?? 0
  let purifyFile = opts.purifyFile ?? null
  if (opts.purifyHits == null && !opts.lean) {
    const purify = safeLoad<typeof import('@/quantum/ftl/purify')>('@/quantum/ftl/purify')
    if (purify) {
      const fuel = purify.proseFuel(purify.scanProseNames({ root: join(cwd, 'src'), limit: 200 }))
      purifyHits = fuel.length
      purifyFile = fuel[0] ? `${fuel[0].file}:${fuel[0].line}` : null
    }
  }
  if (purifyHits > 0) {
    put(
      makeGap(
        'purify',
        { unblock: purifyHits * 3, cost: 2, risk: 1 },
        purifyFile ?? 'src/quantum/ftl/purify',
        `${purifyHits} prose-laden RENAME residual(s)`,
        `endlessPurify land ${purifyFile ?? 'first proseFuel hit'} under quantum/ftl only`,
        purifyFile,
      ),
    )
  }

  let dryProofOk = opts.dryProofOk ?? true
  if (opts.dryProofOk == null) {
    const dry = safeLoad<typeof import('@/proof/dry-proof')>('@/proof/dry-proof')
    if (dry) {
      const r = dry.checkDryProofPublished(process.env.ERPAX_ORIGIN ?? 'https://erpax.ceci.workers.dev')
      dryProofOk = r.ok
      if (!r.ok) {
        put(
          makeGap(
            'dry-proof',
            { unblock: 40, cost: 4, risk: 2 },
            'src/proof/dry-proof.ts',
            `dry-proof gap: ${r.reasons[0] ?? 'unpublished'}`,
            'buildDryProofBundle → publishDryProofBundle → checkDryProofPublished (Law 44)',
            'src/proof/dry-proof.ts',
          ),
        )
      }
    } else {
      dryProofOk = false
      put(
        makeGap(
          'dry-proof',
          { unblock: 20, cost: 5, risk: 2 },
          'src/proof/dry-proof.ts',
          'dry-proof checker unavailable',
          'wire @/proof/dry-proof into tip path',
          'src/proof/dry-proof.ts',
        ),
      )
    }
  } else if (!opts.dryProofOk) {
    put(
      makeGap(
        'dry-proof',
        { unblock: 40, cost: 4, risk: 2 },
        'src/proof/dry-proof.ts',
        'dry-proof not published (fixture)',
        'buildDryProofBundle → publishDryProofBundle → checkDryProofPublished',
        'src/proof/dry-proof.ts',
      ),
    )
  }

  let doctorFails = 0
  if (!opts.lean) {
    const doctor = safeLoad<typeof import('@/cli/doctor')>('@/cli/doctor')
    if (doctor) {
      const report = doctor.collectDoctorReport(cwd)
      if (!report.strayTs.ok) {
        const over = exactMax(0, report.strayTs.count - report.strayTs.baseline)
        doctorFails += over
        put(
          makeGap(
            'doctor',
            { unblock: 20 + over, cost: 3, risk: 1 },
            'stray-ts',
            `stray-ts ${report.strayTs.count} > baseline ${report.strayTs.baseline}`,
            'fold or prove stray .ts until pnpm erpax doctor stray-ts ok',
            null,
          ),
        )
      }
      if (!report.phraseWithoutDiamond.ok) {
        doctorFails += 1
        put(
          makeGap(
            'doctor',
            { unblock: 15, cost: 3, risk: 1 },
            'phrase-without-diamond',
            `phrase-without-diamond ${report.phraseWithoutDiamond.count} > baseline`,
            'seal diamond for phrase folders or fold them',
            null,
          ),
        )
      }
    }
  }

  const secrets = opts.mcpFuseReady != null
    ? { any: opts.mcpFuseReady, payloadSecret: opts.mcpFuseReady, fusePassword: opts.mcpFuseReady }
    : secretNamesPresent(cwd)
  const mcpFuseReady = secrets.any
  // Only emit mcp-fuse when secrets exist — otherwise skip (not a vibes tip to "get secrets").
  if (mcpFuseReady) {
    const fuseScript = existsSync(join(cwd, 'src/run/dev/fuse-mcp-key.ts'))
      ? 'src/run/dev/fuse-mcp-key.ts'
      : 'scripts'
    put(
      makeGap(
        'mcp-fuse',
        { unblock: 35, cost: 2, risk: 2 },
        fuseScript,
        'MCP fuse secret names present — wire approved tools',
        `tsx ${fuseScript} then curl /api/mcp tools/list (Bearer); never print secret values`,
        fuseScript,
        true,
      ),
    )
  }

  // Admin client stubs won (~5 MiB assets). Next ROI = SSR/cold Worker TTFB, not more chunk shaving.
  let adminTtfbMs = opts.adminTtfbMs ?? 0
  if (opts.adminTtfbMs == null && !opts.skipAdminBoot) {
    const envMs = Number(process.env.ERPAX_ADMIN_TTFB_MS)
    if (Number.isFinite(envMs) && envMs > 0) adminTtfbMs = envMs
    else if (existsSync(join(cwd, 'src/quantum/ftl/admin.ts'))) {
      // Stubs shipped; live residual until remeasured (sibling 53d3805b: ~4.9s).
      adminTtfbMs = ADMIN_TTFB_MS_RESIDUAL
    }
  }
  if (!opts.skipAdminBoot && adminTtfbMs > ADMIN_TTFB_MS_OK) {
    // Profile-first is cheap (cost=2). Full SSR rewrite is NOT this tip — scanner refuses scope creep.
    put(
      makeGap(
        'admin-boot',
        { unblock: exactMax(40, exactDivFloor(adminTtfbMs, 100)), cost: 2, risk: 1 },
        'src/quantum/ftl/admin.ts',
        `/admin HTML TTFB ~${adminTtfbMs}ms after client stubs — profile SSR/cold Worker boot (chunk shaving low ROI)`,
        'profile adminBootShell / Payload config import graph / Worker cold start; fix hottest span only',
        'src/quantum/ftl/admin.ts',
      ),
    )
  }

  // physicalFtl() — substrate boolean on QPU=CPU/GPU. Agents doubt prose; FTL compute is the seal.
  // Fail-closed: cannot compute ⇒ false ⇒ quantumise tip (never document hope).
  let physicalFtlHolds = opts.physicalFtl ?? true
  let physicalFtlWhy = opts.physicalFtlWhy ?? null
  if (opts.physicalFtl == null && !opts.lean && !opts.skipPhysicalFtl) {
    const ftlMod = safeLoad<typeof import('@/quantum/ftl')>('@/quantum/ftl')
    if (ftlMod) {
      const report = ftlMod.physicalFtlReport()
      physicalFtlHolds = report.holds
      physicalFtlWhy = report.holds ? null : report.why
    } else {
      physicalFtlHolds = false
      physicalFtlWhy = 'physicalFtlReport unavailable — agents doubt prose; FTL compute is the seal'
    }
  }
  if (!opts.skipPhysicalFtl && physicalFtlHolds === false) {
    const why = physicalFtlWhy ?? 'ftl.holds=false'
    put(
      makeGap(
        'quantumise',
        { unblock: 55, cost: 2, risk: 1 },
        'src/quantum/ftl',
        `physicalFtl()===false — ${why}`,
        `quantumise under src/quantum/ftl: clear crack / precompute / amortize tokens→0 until physicalFtl()===true (${why})`,
        'src/quantum/ftl/index.ts',
      ),
    )
  }

  // Purify without FTL seal is prose-only illusion — downgrade: drop purify when physicalFtl is false
  // (quantumise already tips). When physicalFtl holds, purify residuals stay as land-RENAME work.
  if (physicalFtlHolds === false) {
    byKind.delete('purify')
  }

  const gaps = [...byKind.values()].sort((a, b) => b.score - a.score || a.kind.localeCompare(b.kind))
  return {
    gaps,
    heaviest: gaps[0] ?? null,
    leftoverPull,
    mathCount,
    purifyHits: physicalFtlHolds === false ? 0 : purifyHits,
    dryProofOk,
    doctorFails,
    waveCount: w.length || (leftoverPull > 0 ? 1 : 0),
    mcpFuseReady,
    adminTtfbMs,
    physicalFtl: physicalFtlHolds,
    physicalFtlWhy,
  }
}

/** Plan form · code · proof — concrete paths/commands/signals only. */
export function planTrinity(gap: SelfDevGap): Omit<TrinityTip, 'continuation' | 'accepted' | 'refuseReason'> {
  const file = gap.file
  const nextAsks = [gap.research, `prove ${gap.kind} green at ${gap.where}`, `re-run pnpm erpax tip after ${gap.kind}`]

  switch (gap.kind) {
    case 'leftover':
      return {
        form: `Settle leftover field '${gap.where.replace(/^src\//, '')}' starting at ${file ?? gap.where}.`,
        code: `pnpm erpax tip; edit/prove ${file ?? gap.where} via leftover.deriveLeftoverProof; pnpm erpax verify leftover`,
        proof: `proofLedger residual drops for ${gap.where}; tip re-ranks away from leftover`,
        gap,
        nextAsks,
      }
    case 'math':
      return {
        form: `Replace host Math.* at ${file ?? 'first violation'} with @/algebra exact* ops.`,
        code: `rg -n '\\bMath\\.' ${file?.split(':')[0] ?? 'src'} ; replace; PAYLOAD_TEST_SKIP_MIGRATE=1 pnpm erpax verify algebra/host`,
        proof: `hostMathViolations().length === 0`,
        gap,
        nextAsks,
      }
    case 'purify':
      return {
        form: `Land RENAME residual at ${file ?? 'src/quantum/ftl'} under quantum/ftl only — agents doubt prose; FTL compute seals.`,
        code: `tsx src/quantum/ftl/purify/index.ts ; develop ${file ?? 'first proseFuel hit'} → RENAME token ; prove physicalFtl()`,
        proof: `physicalFtl() === true && proseFuel(scanProseNames()).length === 0`,
        gap,
        nextAsks,
      }
    case 'dry-proof':
      return {
        form: `Publish a fresh dry-proof bundle (Law 44) from src/proof/dry-proof.ts.`,
        code: `tsx -e "import { buildDryProofBundle, publishDryProofBundle, checkDryProofPublished } from '@/proof/dry-proof'" ; pnpm erpax doctor dry-proof`,
        proof: `checkDryProofPublished(origin).ok === true`,
        gap,
        nextAsks,
      }
    case 'doctor':
      return {
        form: `Heal doctor axis '${gap.where}' until quick doctor marks it ok.`,
        code: `pnpm erpax doctor ; fix ${gap.where} ; pnpm erpax doctor`,
        proof: `collectDoctorReport().${gap.where === 'stray-ts' ? 'strayTs.ok' : 'phraseWithoutDiamond.ok'} === true`,
        gap,
        nextAsks,
      }
    case 'mcp-fuse':
      return {
        form: `Fuse MCP with existing secret names (PAYLOAD_SECRET or ERPAX_FUSE_PASSWORD) — do not print values.`,
        code: `tsx ${file ?? 'src/run/dev/fuse-mcp-key.ts'} ; curl -sS -o /dev/null -w '%{http_code}' https://erpax.ceci.workers.dev/api/mcp`,
        proof: `/api/mcp responds (not hang); tools/list exit 0 with Bearer`,
        gap,
        nextAsks,
      }
    case 'admin-boot':
      return {
        form: `Profile /admin SSR and cold Worker boot (TTFB ~${gap.prose.match(/\d+/)?.[0] ?? ADMIN_TTFB_MS_RESIDUAL}ms) — do not shave client chunks further.`,
        code: `tsx -e "import { adminBootShell } from '@/quantum/ftl/admin'; console.log(adminBootShell({ reuses: 100 }))" ; curl -sS -o /dev/null -w 'TTFB:%{time_starttransfer}\\n' https://erpax.ceci.workers.dev/admin ; trace src/quantum/ftl/admin.ts + Payload config import graph`,
        proof: `TTFB ≤ ${ADMIN_TTFB_MS_OK} or adminBootShell().holds === true with identified hottest server span fixed`,
        gap,
        nextAsks,
      }
    case 'quantumise':
      return {
        form: `Quantumise under src/quantum/ftl until physicalFtl() flips true (${gap.prose.replace(/^physicalFtl\(\)===false — /, '')}).`,
        code: `tsx -e "import { physicalFtlReport } from '@/quantum/ftl'; console.log(physicalFtlReport())" ; clear crack/precompute/amortize in src/quantum/ftl only`,
        proof: `physicalFtl() === true`,
        gap,
        nextAsks,
      }
  }
}

/**
 * Precision gate — refuses vague / non-concrete tips.
 * Empty form/code/proof, vibe phrases, or missing concrete code/proof ⇒ refuse.
 */
export function isPreciseTip(tip: Pick<TrinityTip, 'form' | 'code' | 'proof'>): {
  readonly ok: boolean
  readonly reasons: readonly string[]
} {
  const reasons: string[] = []
  if (!tip.form.trim() || tip.form.trim().split(/\s+/).length < 5) reasons.push('form too short')
  if (tip.form.includes('\n')) reasons.push('form must be one sentence')
  if (VAGUE_TIP_RE.test(tip.form) || VAGUE_TIP_RE.test(tip.code)) reasons.push('vague phrase refused')
  if (!CONCRETE_CODE_RE.test(tip.code)) reasons.push('code lacks concrete path/command')
  if (!CONCRETE_PROOF_RE.test(tip.proof)) reasons.push('proof lacks exact green signal')
  if (/continue improving|keep going/i.test(`${tip.form} ${tip.code} ${tip.proof}`)) {
    reasons.push('non-tip: continue improving')
  }
  return { ok: reasons.length === 0, reasons }
}

/**
 * Emit THE next tip: audit → score → plan → precision gate.
 * Score-0 / empty / imprecise ⇒ accepted=false (scanner refuses noise).
 */
export function emitNextTip(opts: TipEmitOpts = {}): TrinityTip {
  const audit = auditSelfDevGaps(opts)
  const residual = exactMax(
    audit.leftoverPull,
    audit.mathCount,
    audit.purifyHits,
    audit.doctorFails,
    audit.dryProofOk ? 0 : 1,
    audit.mcpFuseReady ? 1 : 0,
    audit.adminTtfbMs > ADMIN_TTFB_MS_OK ? 1 : 0,
    audit.physicalFtl ? 0 : 1,
  )
  const continuation = shouldContinue(opts.seedFraction ?? 0.05, residual, opts.stopped === true)

  if (!audit.heaviest || audit.heaviest.score <= 0) {
    return {
      form: 'No scored gap — scanner refuses empty noise.',
      code: 'pnpm erpax tip',
      proof: 'audit.gaps.length === 0',
      gap: makeGap('leftover', { unblock: 0, cost: 1, risk: 1 }, 'corpus', 'empty', 'none'),
      nextAsks: ['re-scan after new leftovers land'],
      continuation,
      accepted: false,
      refuseReason: 'no scored gap (empty noise)',
    }
  }

  const planned = planTrinity(audit.heaviest)
  const precision = isPreciseTip(planned)
  if (!precision.ok) {
    return {
      ...planned,
      continuation,
      accepted: false,
      refuseReason: `imprecise tip: ${precision.reasons.join('; ')}`,
    }
  }

  return { ...planned, continuation, accepted: true, refuseReason: null }
}

/** Format tip for CLI / chat — one screen, copy-pasteable. */
export function formatNextTip(tip: TrinityTip, audit?: SelfDevAudit): string {
  const lines = [
    tip.accepted
      ? 'tip — next self-dev trinity (scored unblock/(cost×risk))'
      : `tip — REFUSED (${tip.refuseReason ?? 'imprecise'})`,
    '',
    `  FORM   ${tip.form}`,
    `  CODE   ${tip.code}`,
    `  PROOF  ${tip.proof}`,
    '',
    `  gap    ${tip.gap.kind} · score=${tip.gap.score} · unblock=${tip.gap.factors.unblock} cost=${tip.gap.factors.cost} risk=${tip.gap.factors.risk}`,
    `  where  ${tip.gap.where}${tip.gap.file ? ` · file=${tip.gap.file}` : ''}`,
    `  prose  ${tip.gap.prose}`,
    `  accepted=${tip.accepted} · continue=${tip.continuation.continue}`,
  ]
  if (audit) {
    lines.push(
      '',
      `  audit  leftover=${audit.leftoverPull} math=${audit.mathCount} purify=${audit.purifyHits} dryProof=${audit.dryProofOk ? 'ok' : 'gap'} doctorFails=${audit.doctorFails} mcpFuse=${audit.mcpFuseReady ? 'ready' : 'skip'} adminTtfb=${audit.adminTtfbMs}ms physicalFtl=${audit.physicalFtl} waves=${audit.waveCount}`,
    )
    for (const g of audit.gaps.slice(0, 6)) {
      lines.push(
        `    · [${g.score}] ${g.kind} u=${g.factors.unblock}/c=${g.factors.cost}/r=${g.factors.risk} @ ${g.file ?? g.where}`,
      )
    }
  }
  if (tip.accepted) {
    lines.push('', '  nextAsks:')
    for (const a of tip.nextAsks) lines.push(`    - ${a}`)
  }
  return lines.join('\n')
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const audit = auditSelfDevGaps()
  const tip = emitNextTip({
    mathCount: audit.mathCount,
    purifyHits: audit.purifyHits,
    mcpFuseReady: audit.mcpFuseReady,
  })
  console.log(formatNextTip(tip, audit))
  if (!tip.accepted) process.exitCode = 1
}
