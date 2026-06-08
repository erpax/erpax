/**
 * cli — minimal operational surface: `pnpm erpax <domain> [action] [args…]`
 *
 * Matter lives in src atoms; package.json keeps lifecycle scripts + this router.
 */
import { runDoctor } from './doctor'
import { printHelp, printUnknownHint, suggestNearestAction } from './help'
import { runGate, runShell } from './gate'
import { runRulesCheck } from './rules-check'
import { CLI_REGISTRY, LEGACY_ALIASES, resolveAction } from './registry'

function resolveLegacyColon(domain: string, action?: string): { modern: string; argv: string[] } | undefined {
  const key = action ? `${domain}:${action}` : domain
  const modern = LEGACY_ALIASES[key] ?? (domain.includes(':') ? LEGACY_ALIASES[domain] : undefined)
  if (!modern) return undefined
  const parts = modern.replace(/^erpax\s+/, '').split(/\s+/)
  return { modern, argv: parts }
}

export function runCli(argv: readonly string[]): number {
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

  const legacy = resolveLegacyColon(rawDomain, action)
  if (legacy) {
    console.error(`Deprecated: erpax ${rawDomain}${action ? ' ' + action : ''} → use pnpm ${legacy.modern}`)
    const [domain, ...acts] = legacy.argv
    const resolved = resolveAction(domain!, acts[0])
    if (!resolved) return 1
    if (resolved.cmd === '__gate__') return runGate()
    if (resolved.cmd === '__rules_check__') return runRulesCheck()
    return runShell(resolved.cmd, [...acts.slice(1), ...rest])
  }

  const resolved = resolveAction(rawDomain, action)
  if (!resolved) {
    console.error(`Unknown: erpax ${rawDomain}${action ? ' ' + action : ''}`)
    if (!CLI_REGISTRY[rawDomain]) {
      printUnknownHint(rawDomain, action)
    } else if (action) {
      const near = suggestNearestAction(rawDomain, action)
      if (near) console.error(`Did you mean: pnpm erpax ${rawDomain} ${near}?`)
    }
    printHelp(CLI_REGISTRY[rawDomain] ? rawDomain : undefined)
    return 1
  }

  if (resolved.cmd === '__gate__') return runGate()
  if (resolved.cmd === '__rules_check__') return runRulesCheck()
  return runShell(resolved.cmd, rest)
}

if (import.meta.url === `file://${process.argv[1]}`) {
  process.exit(runCli(process.argv.slice(2)))
}

export { GATE_LANES } from './gate'
export { CLI_REGISTRY, LEGACY_ALIASES, AURA_SCAN_PATH } from './registry'
export { printHelp, suggestNearestDomain } from './help'
export { runDoctor, runDoctorStalls, collectDoctorReport } from './doctor'
export { runRulesCheck, topFailedAxes, AXIS_FIX_HINTS } from './rules-check'
