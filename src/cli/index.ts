/**
 * cli — minimal operational surface: `pnpm erpax <domain> [action] [args…]`
 */
import { runDoctor } from './doctor'
import { runBuildGate, runLintSrc, runLocal, runTestWaves, runTypecheckWaves, runVerifyTypes } from './local'
import { printHelp, printUnknownHint, suggestNearestAction } from './help'
import { runGate, runGatePackages, runPayloadApproval, runShell } from './gate'
import { runRulesCheck } from './rules-check'
import { CLI_REGISTRY, LEGACY_ALIASES, resolveAction } from './registry'

/**
 * `erpax verify <atom…>` — the quantum verify lane: run only the named atoms' tests
 * with PAYLOAD_TEST_SKIP_MIGRATE=1 (skips the ~30s DB boot pure atoms never need).
 * Replaces the ad-hoc tsx harness rewritten 6× in the 2026-07-15 session — save the
 * pair once, reuse it. Use for pure atoms (rodin, signal, factory…); integration
 * atoms still go through `pnpm check`.
 */
function runVerify(atoms: readonly string[]): number {
  if (atoms.length === 0) {
    console.error('usage: erpax verify <atom> [atom…]   — targeted, skips DB boot (pure atoms)')
    return 1
  }
  const filters = atoms.map((a) => `src/${a.replace(/^src\//, '').replace(/\/$/, '')}`)
  const cmd =
    'cross-env NODE_OPTIONS="--no-deprecation --max-old-space-size=8000" ' +
    'PAYLOAD_TEST_SKIP_MIGRATE=1 vitest run --config ./vitest.config.mts'
  return runShell(cmd, filters)
}

/**
 * `erpax fold [family]` — the fold execution planner (Wave 6). Computes the safe foldable
 * families via foldPlan (the fold algebra on names) and prints each with a ready-to-run
 * `git rm` batch. READ-ONLY: it never deletes — the deletion is human-confirmed (the
 * auto-mode classifier requires named targets), then verified with typecheck + doctor corpus.
 * Folds the throwaway research scripts of 2026-07-15 into one reused command.
 */
/**
 * `erpax gaps` — run the always-present gap scanner, instead of re-deriving it in a throwaway. The scanner is
 * self/improve.sendQuantumWaves + leftover.attraction, which have lived in the tree unused; this is their
 * standing caller, so the gap-finder is present AND used (and its own unfolded status is thereby closed).
 * Ends by emitting THE next tip (audit → trinity) so the chat self-feed has fuel.
 */
async function runGaps(): Promise<number> {
  const { sendQuantumWaves } = await import('@/self/improve')
  const { attraction } = await import('@/leftover')
  const cwd = process.cwd()
  const q = sendQuantumWaves(cwd)
  console.log('gaps — the always-present scanner, run (not re-derived):\n')
  console.log(`  ${q.sites} surgical sites across ${q.states} fields, held as one coherent wave`)
  console.log(`  root ${q.root}\n  heaviest fields (one proof settles the most):`)
  for (const c of attraction(cwd).slice(0, 8)) console.log(`    ${String(c.pull).padStart(4)}  ${c.group}`)
  console.log('\n  the scanner is present AND used — `pnpm erpax gaps`; do not re-derive it in a throwaway.\n')
  return runTipEmit(cwd)
}

/**
 * `erpax tip` — audit live gaps → score unblock/(cost×risk) → precise form·code·proof.
 * Lean scanners by default (cheap Math count; leftover/attraction; admin TTFB residual).
 */
async function runTip(): Promise<number> {
  return runTipEmit(process.cwd())
}

/**
 * Lean tip Math score — DRY with algebra/host (codeOf strips comments · JSDoc · strings).
 * Raw `rg '\\bMath\\.'` is NOT the feed: it false-tips prose like `no host Math.*`.
 */
async function cheapMathSites(cwd: string): Promise<{ count: number; file: string | null }> {
  const { hostMathTipSite } = await import('@/algebra/host')
  return hostMathTipSite(cwd)
}

async function runTipEmit(cwd: string): Promise<number> {
  const { auditSelfDevGaps, emitNextTip, formatNextTip, secretNamesPresent } = await import('@/self/improve')
  const math = await cheapMathSites(cwd)
  const secrets = secretNamesPresent(cwd)
  const audit = auditSelfDevGaps({
    cwd,
    lean: true,
    mathCount: math.count,
    mathFile: math.file,
    purifyHits: 0,
    mcpFuseReady: secrets.any,
    dryProofOk: false, // Law 44 — local process unpublished until publishDryProofBundle
  })
  const tip = emitNextTip({
    cwd,
    lean: true,
    mathCount: audit.mathCount,
    mathFile: math.file,
    purifyHits: audit.purifyHits,
    mcpFuseReady: audit.mcpFuseReady,
    dryProofOk: audit.dryProofOk,
    adminTtfbMs: audit.adminTtfbMs,
  })
  console.log(formatNextTip(tip, audit))
  return tip.accepted ? 0 : 1
}

async function runFold(family?: string): Promise<number> {
  const { foldPlan } = await import('@/readme/compute')
  const families = foldPlan(process.cwd())
  const shown = family ? families.filter((f) => f.parent === family) : families
  if (shown.length === 0) {
    console.log(family ? `fold — no safe foldable family '${family}'.` : 'fold — none; the lexical fold is exhausted (remainder needs the semantic decode).')
    return 0
  }
  console.log(`fold plan — ${shown.length} safe ${shown.length === 1 ? 'family' : 'families'}. Each = parent⊕suffix, orphaned; knowledge preserved in the parent/components.\n`)
  for (const f of shown) {
    console.log(`# ${f.parent}⊕ (${f.kind}) — ${f.members.length} members`)
    console.log(`git rm -r ${f.members.map((m) => `src/**/${m}`).join(' ')}   # then: pnpm erpax lint typecheck && pnpm erpax doctor corpus\n`)
  }
  console.log('Review each family (reject real words / real schema.org terms), confirm the named targets, then run the printed batch.')
  return 0
}

function resolveLegacyColon(domain: string, action?: string): { modern: string; argv: string[] } | undefined {
  const key = action ? `${domain}:${action}` : domain
  const modern = LEGACY_ALIASES[key] ?? (domain.includes(':') ? LEGACY_ALIASES[domain] : undefined)
  if (!modern) return undefined
  const parts = modern.replace(/^erpax\s+/, '').split(/\s+/)
  return { modern, argv: parts }
}

export function runCli(argv: readonly string[]): number | Promise<number> {
  const wantsHelp = argv.includes('--help') || argv.includes('-h')
  const [rawDomain, action, ...rest] = argv.filter((a) => a !== '--help' && a !== '-h')

  if (!rawDomain || rawDomain === 'help' || wantsHelp) {
    printHelp(wantsHelp && rawDomain && rawDomain !== 'help' ? rawDomain : undefined)
    return rawDomain && rawDomain !== 'help' && !CLI_REGISTRY[rawDomain] ? 1 : 0
  }

  if (rawDomain === 'aliases') {
    for (const [legacy, modern] of Object.entries(LEGACY_ALIASES).sort()) {
      console.log(`${legacy} → pnpm ${modern}`)
    }
    return 0
  }

  if (rawDomain === 'doctor' || rawDomain === 'status') {
    return runDoctor(process.cwd(), action)
  }

  if (rawDomain === 'verify') {
    return runVerify([action, ...rest].filter((a): a is string => Boolean(a)))
  }

  if (rawDomain === 'fold') {
    return runFold(action)
  }

  if (rawDomain === 'gaps') {
    return runGaps()
  }

  if (rawDomain === 'tip') {
    return runTip()
  }

  if (rawDomain === 'local') {
    return runLocal()
  }

  // int / bare / waves: receipt-split batches bound themselves (never the 5-min shell rung).
  if (rawDomain === 'test' && (!action || action === 'waves' || action === 'int')) {
    return runTestWaves(rest)
  }

  // the build is a verdict like any other — cited when its content address already built green.
  if (rawDomain === 'test' && action === 'build') {
    return runBuildGate(rest)
  }

  // verify-types is a verdict too — cited when the config already generates these types.
  if (rawDomain === 'payload' && action === 'verify-types') {
    return runVerifyTypes(rest)
  }

  // the strict src lint is a verdict too — same bytes as the typecheck, a different question.
  if (rawDomain === 'lint' && action === 'src') {
    return runLintSrc(rest)
  }

  // typecheck waves — quantum substrate first (FTL only in quantum); full project is wave 1.
  if (rawDomain === 'lint' && action === 'typecheck') {
    return runTypecheckWaves(rest)
  }

  if (rawDomain === 'approve') {
    if (action === 'packages') return runGatePackages(rest)
    return runPayloadApproval()
  }

  const legacy = resolveLegacyColon(rawDomain, action)
  if (legacy) {
    console.error(`Deprecated: erpax ${rawDomain}${action ? ' ' + action : ''} → use pnpm ${legacy.modern}`)
    const [domain, ...acts] = legacy.argv
    const resolved = resolveAction(domain!, acts[0])
    if (!resolved) return 1
    if (resolved.cmd === '__gate__') return runGate([...acts.slice(1), ...rest])
    if (resolved.cmd === '__gate_packages__') return runGatePackages([...acts.slice(1), ...rest])
    if (resolved.cmd === '__payload_approve__') return runPayloadApproval()
    if (resolved.cmd === '__rules_check__') return runRulesCheck()
    return runShell(resolved.cmd, [...acts.slice(1), ...rest], `erpax ${domain}${acts[0] ? ' ' + acts[0] : ''}`)
  }

  const resolved = resolveAction(rawDomain, action)
  if (!resolved) {
    console.error(`Unknown: erpax ${rawDomain}${action ? ' ' + action : ''}`)
    if (!CLI_REGISTRY[rawDomain]) printUnknownHint(rawDomain, action)
    else if (action) {
      const near = suggestNearestAction(rawDomain, action)
      if (near) console.error(`Did you mean: pnpm erpax ${rawDomain} ${near}?`)
    }
    printHelp(CLI_REGISTRY[rawDomain] ? rawDomain : undefined)
    return 1
  }

  if (resolved.cmd === '__gate__') return runGate(rest)
  if (resolved.cmd === '__gate_packages__') return runGatePackages(rest)
  if (resolved.cmd === '__payload_approve__') return runPayloadApproval()
  if (resolved.cmd === '__rules_check__') return runRulesCheck()
  // Every command carries a stable label so it earns its computed rung from its OWN history
  // (samplesMsOf → timeoutOf) and shows a progress heartbeat — the same self-pacing the gate
  // lanes use. A heavy command (readme/corpus regen) with no label was pinned to the flat 5-min
  // default forever, could never record a success sample, and so could never grow past it: the
  // command that cannot complete is the leak that forces a human to hand-run and babysit it.
  return runShell(resolved.cmd, rest, `erpax ${rawDomain}${action ? ' ' + action : ''}`)
}

if (import.meta.url === `file://${process.argv[1]}`) {
  // Await async subcommands (doctor corpus) before exit — a sync process.exit here
  // would kill the process before the promise resolves (the bug that made doctor
  // corpus silently no-op: it returned 0 without ever running).
  void Promise.resolve(runCli(process.argv.slice(2))).then((code) => process.exit(code))
}

export { GATE_LANES, agentWorkApproved, packageApprovalMatrix } from './gate'
export { CLI_REGISTRY, LEGACY_ALIASES, AURA_SCAN_PATH } from './registry'
export { printHelp, suggestNearestDomain } from './help'
export { runDoctor, runDoctorStalls, collectDoctorReport } from './doctor'
export { runRulesCheck, topFailedAxes, AXIS_FIX_HINTS } from './rules-check'
