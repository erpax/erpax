/**
 * cli/help — grouped --help, domain blurbs, nearest-match suggestions.
 */
import { CLI_REGISTRY, LEGACY_ALIASES, listDomains } from './registry'

export interface DomainMeta {
  readonly summary: string
  readonly example: string
}

/** One-line domain blurbs + canonical example invocations. */
export const DOMAIN_META: Record<string, DomainMeta> = {
  readme: { summary: 'Regenerate README + computed faces', example: 'pnpm erpax readme waves' },
  lint: { summary: 'ESLint, typecheck, import/folder gates', example: 'pnpm erpax lint src' },
  test: { summary: 'Vitest integration + Playwright e2e', example: 'pnpm erpax test int' },
  rules: { summary: 'Tightened corpus law ratchet check', example: 'pnpm erpax rules check' },
  monitor: { summary: 'Realtime violation watch loops', example: 'pnpm erpax monitor violations' },
  confirm: { summary: 'Scoped / full / uuid-pure confirm', example: 'pnpm erpax confirm uuid' },
  apply: { summary: 'Session apply + efficiency ledger', example: 'pnpm erpax apply session' },
  automate: { summary: 'Orchestration loop (inventory → clean → ratchet)', example: 'pnpm erpax automate' },
  clean: { summary: 'Coordinated dry-clean cycle', example: 'pnpm erpax clean' },
  standards: { summary: 'Standards banners + catalogue', example: 'pnpm erpax standards check' },
  corpus: { summary: 'Atom/matrix/skill catalogue emit', example: 'pnpm erpax corpus skill' },
  aura: { summary: 'Dead [[wikilink]] scan', example: 'pnpm erpax aura scan' },
  harmony: { summary: 'Harmony scan', example: 'pnpm erpax harmony scan' },
  build: { summary: 'Uuid build lane', example: 'pnpm erpax build uuid' },
  translations: { summary: 'i18n catalogue collect/verify', example: 'pnpm erpax translations verify' },
  spec: { summary: 'Spec generator', example: 'pnpm erpax spec gen' },
  payload: { summary: 'Payload types verify + jobs', example: 'pnpm erpax payload verify-types' },
  deploy: { summary: 'D1 migrate + Cloudflare deploy', example: 'pnpm erpax deploy db' },
  plugin: { summary: 'Claude Code plugin manifests', example: 'pnpm erpax plugin claude' },
  db: { summary: 'Database regenerate + D1 audit', example: 'pnpm erpax db audit' },
  import: { summary: 'Blogger ingest pipelines', example: 'pnpm erpax import blogger' },
  mcp: { summary: 'MCP tool surface smoke', example: 'pnpm erpax mcp test' },
  codemod: { summary: 'Payload codemod', example: 'pnpm erpax codemod' },
  seeds: { summary: 'Spec seed coverage', example: 'pnpm erpax seeds coverage' },
  path: { summary: 'Path hooks registry emit', example: 'pnpm erpax path hooks' },
  gate: { summary: 'Full CI gate (standards · lint · test)', example: 'pnpm check' },
  doctor: { summary: 'Quick repo health snapshot', example: 'pnpm erpax doctor' },
  aliases: { summary: 'Legacy pnpm script → erpax map', example: 'pnpm erpax aliases' },
}

export const DOMAIN_GROUPS: readonly { readonly title: string; readonly domains: readonly string[] }[] = [
  { title: 'Corpus & docs', domains: ['readme', 'corpus', 'standards', 'translations', 'aura', 'harmony', 'plugin', 'spec'] },
  { title: 'Quality gates', domains: ['gate', 'doctor', 'lint', 'test', 'rules', 'confirm', 'monitor'] },
  { title: 'Session & apply', domains: ['apply', 'automate', 'clean', 'build', 'codemod', 'path'] },
  { title: 'Runtime & deploy', domains: ['payload', 'deploy', 'db', 'import', 'mcp', 'seeds'] },
  { title: 'Meta', domains: ['aliases'] },
]

function levenshtein(a: string, b: string): number {
  const m = a.length
  const n = b.length
  const dp = Array.from({ length: m + 1 }, () => new Array<number>(n + 1).fill(0))
  for (let i = 0; i <= m; i++) dp[i]![0] = i
  for (let j = 0; j <= n; j++) dp[0]![j] = j
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      dp[i]![j] = Math.min(dp[i - 1]![j]! + 1, dp[i]![j - 1]! + 1, dp[i - 1]![j - 1]! + cost)
    }
  }
  return dp[m]![n]!
}

/** Nearest domain name by edit distance (prefix wins). */
export function suggestNearestDomain(input: string, domains: readonly string[] = listDomains()): string | undefined {
  const q = input.toLowerCase()
  const prefix = domains.find((d) => d.startsWith(q) || q.startsWith(d))
  if (prefix) return prefix
  let best: string | undefined
  let bestDist = Infinity
  for (const d of domains) {
    const dist = levenshtein(q, d)
    if (dist < bestDist) {
      bestDist = dist
      best = d
    }
  }
  return bestDist <= Math.max(3, Math.floor(q.length / 2)) ? best : undefined
}

/** Nearest action within a domain. */
export function suggestNearestAction(domain: string, input?: string): string | undefined {
  const actions = CLI_REGISTRY[domain]
  if (!actions || !input) return undefined
  const keys = Object.keys(actions).filter((k) => k !== 'default')
  return suggestNearestDomain(input, keys)
}

export function formatDomainLine(domain: string): string {
  const meta = DOMAIN_META[domain]
  const actions = CLI_REGISTRY[domain]
  if (!actions) return `  ${domain}`
  const keys = Object.keys(actions).filter((k) => k !== 'default')
  const hint = keys.length ? keys.slice(0, 4).join(', ') + (keys.length > 4 ? '…' : '') : 'default'
  const summary = meta?.summary ?? actions.default?.desc ?? ''
  return `  ${domain.padEnd(12)} ${summary.padEnd(42)} [${hint}]`
}

export function printHelp(domain?: string): void {
  if (domain && CLI_REGISTRY[domain]) {
    const meta = DOMAIN_META[domain]
    const actions = CLI_REGISTRY[domain]!
    console.log(`erpax ${domain} — ${meta?.summary ?? ''}`)
    if (meta?.example) console.log(`  e.g. ${meta.example}`)
    console.log('')
    for (const [name, a] of Object.entries(actions)) {
      console.log(`  ${name === 'default' ? '(default)' : name.padEnd(14)} ${a.desc}`)
    }
    return
  }
  console.log('erpax — operational CLI (matter in src/)\n')
  console.log('Usage: pnpm erpax <domain> [action] [args…]\n')
  for (const group of DOMAIN_GROUPS) {
    console.log(`${group.title}:`)
    for (const d of group.domains) {
      if (CLI_REGISTRY[d] || d === 'aliases' || d === 'doctor') console.log(formatDomainLine(d))
    }
    console.log('')
  }
  console.log('Examples:')
  for (const ex of ['pnpm erpax readme waves', 'pnpm erpax rules check', 'pnpm erpax doctor', 'pnpm check']) {
    console.log(`  ${ex}`)
  }
  console.log('\nLegacy script names → pnpm erpax aliases')
  console.log('CI gate: pnpm check  (= pnpm erpax gate)')
}

export function printUnknownHint(domain: string, action?: string): void {
  const nearest = suggestNearestDomain(domain)
  if (nearest && nearest !== domain) {
    const meta = DOMAIN_META[nearest]
    console.error(`Did you mean: pnpm erpax ${nearest}${action ? ' …' : ''}?`)
    if (meta?.example) console.error(`  Try: ${meta.example}`)
  }
  const legacy = LEGACY_ALIASES[domain] ?? (action ? LEGACY_ALIASES[`${domain}:${action}`] : undefined)
  if (legacy) console.error(`Legacy name — use: pnpm ${legacy}`)
  console.error('Full legacy map: pnpm erpax aliases')
}
