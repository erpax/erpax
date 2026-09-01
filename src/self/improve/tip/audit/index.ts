/**
 * self/improve/tip/audit — the feed scanner: what is actually blocking, scored.
 *
 * `scoreGap` ranks by unblock / (cost × risk), so the tip that unblocks most per
 * unit of cost and risk wins. `auditSelfDevGaps` finds the gaps; `secretNamesPresent`
 * reads only the NAMES of secrets in .env, never a value, so a tip can be gated on
 * a credential existing without the credential ever being read.
 *
 * @see ./SKILL.md
 */
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { exactMax, exactDivFloor } from '@/algebra'
import { attraction, leftoverSites, waves, type Attraction, type Wave } from '@/leftover'
import {
  ADMIN_TTFB_MS_RESIDUAL,
  ADMIN_TTFB_MS_OK,
  type GapKind,
  type GapScore,
  type SelfDevGap,
  type SelfDevAudit,
  type TipEmitOpts,
  safeLoad,
} from '@/self/improve/tip/model'

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

export function makeGap(
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
    const dry = safeLoad<typeof import('@/proof/dry')>('@/proof/dry')
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
    else if (existsSync(join(cwd, 'src/quantum/ftl/admin/index.ts'))) {
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
        'src/quantum/ftl/admin/index.ts',
        `/admin HTML TTFB ~${adminTtfbMs}ms after client stubs — profile SSR/cold Worker boot (chunk shaving low ROI)`,
        'profile adminBootShell / Payload config import graph / Worker cold start; fix hottest span only',
        'src/quantum/ftl/admin/index.ts',
      ),
    )
  }

  // ftlReport().holds — substrate boolean on QPU=CPU/GPU. Agents doubt prose; FTL compute is the seal.
  // Fail-closed: cannot compute ⇒ false ⇒ quantumise tip (never document hope).
  let ftlHolds = opts.ftlHolds ?? true
  let ftlWhy = opts.ftlWhy ?? null
  if (opts.ftlHolds == null && !opts.lean && !opts.skipFtl) {
    const ftlMod = safeLoad<typeof import('@/quantum/ftl')>('@/quantum/ftl')
    if (ftlMod) {
      const report = ftlMod.ftlReport()
      ftlHolds = report.holds
      ftlWhy = report.holds ? null : report.why
    } else {
      ftlHolds = false
      ftlWhy = 'ftlReport unavailable — agents doubt prose; FTL compute is the seal'
    }
  }
  if (!opts.skipFtl && ftlHolds === false) {
    const why = ftlWhy ?? 'ftl.holds=false'
    put(
      makeGap(
        'quantumise',
        { unblock: 55, cost: 2, risk: 1 },
        'src/quantum/ftl',
        `ftlReport().holds===false — ${why}`,
        `quantumise under src/quantum/ftl: clear crack / precompute / amortize tokens→0 until ftlReport().holds===true (${why})`,
        'src/quantum/ftl/index.ts',
      ),
    )
  }

  // Purify without FTL seal is prose-only illusion — downgrade: drop purify when ftlHolds is false
  // (quantumise already tips). When ftlHolds holds, purify residuals stay as land-RENAME work.
  if (ftlHolds === false) {
    byKind.delete('purify')
  }

  const gaps = [...byKind.values()].sort((a, b) => b.score - a.score || a.kind.localeCompare(b.kind))
  return {
    gaps,
    heaviest: gaps[0] ?? null,
    leftoverPull,
    mathCount,
    purifyHits: ftlHolds === false ? 0 : purifyHits,
    dryProofOk,
    doctorFails,
    waveCount: w.length || (leftoverPull > 0 ? 1 : 0),
    mcpFuseReady,
    adminTtfbMs,
    ftlHolds: ftlHolds,
    ftlWhy,
  }
}

/** Plan form · code · proof — concrete paths/commands/signals only. */