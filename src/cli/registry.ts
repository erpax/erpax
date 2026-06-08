/**
 * cli/registry — domain → action → shell command (matter stays in src atoms).
 */
export interface CliAction {
  readonly desc: string
  readonly cmd: string
}

export type CliDomain = Record<string, CliAction>

const TSX = 'cross-env NODE_OPTIONS="--no-deprecation --import=tsx/esm" tsx'
const NODE_TSX = 'cross-env NODE_OPTIONS="--no-deprecation --import=tsx/esm" node'
const ESLINT =
  'cross-env NODE_OPTIONS="--no-deprecation --max-old-space-size=8000" eslint'
const VITEST =
  'cross-env NODE_OPTIONS="--no-deprecation --max-old-space-size=8000" vitest run --config ./vitest.config.mts'

/** Canonical on-disk aura scanner (hooks + package surface must agree). */
export const AURA_SCAN_PATH = 'src/aura/scan.mjs'

export const CLI_REGISTRY: Record<string, CliDomain> = {
  readme: {
    default: { desc: 'Regenerate README + computed faces', cmd: `${TSX} src/readme/index.ts` },
    waves: { desc: 'Regenerate in horo waves (OOM-safe)', cmd: `${TSX} src/readme/index.ts --waves` },
    check: { desc: 'Verify readme + faces (waves)', cmd: `${TSX} src/readme/index.ts --verify --waves` },
    'check-full': { desc: 'Verify full corpus readme + faces', cmd: `${TSX} src/readme/index.ts --verify` },
    regen: { desc: 'Focused face regen for atom path(s)', cmd: `${TSX} src/readme/regen.ts` },
  },
  lint: {
    default: { desc: 'ESLint whole repo', cmd: `${ESLINT} .` },
    src: {
      desc: 'ESLint src/**/* (zero warnings)',
      cmd: `${ESLINT} "src/**/*.{ts,tsx}" --ignore-pattern "src/migrations/*_*.ts" --max-warnings 0`,
    },
    imports: { desc: 'Import-convention ratchet gate', cmd: `${NODE_TSX} src/convention/import/gate.mjs` },
    folders: { desc: 'Folder-shape law gate', cmd: 'cross-env NODE_OPTIONS="--no-deprecation" tsx src/law/folder/index.ts --check' },
    fix: { desc: 'ESLint --fix whole repo', cmd: `${ESLINT} . --fix` },
    typecheck: { desc: 'tsc --noEmit (typecheck project)', cmd: 'tsc --noEmit -p tsconfig.typecheck.json' },
    'typecheck-all': { desc: 'tsc --noEmit (full project)', cmd: 'tsc --noEmit -p tsconfig.json' },
  },
  test: {
    default: { desc: 'Vitest integration suite', cmd: VITEST },
    int: { desc: 'Vitest integration suite', cmd: VITEST },
    fast: {
      desc: 'Vitest integration (skip migrate)',
      cmd: 'cross-env NODE_OPTIONS="--no-deprecation --max-old-space-size=8000" PAYLOAD_TEST_SKIP_MIGRATE=1 vitest run --config ./vitest.config.mts',
    },
    e2e: {
      desc: 'Playwright e2e',
      cmd: 'cross-env NODE_OPTIONS="--no-deprecation --import=tsx/esm" SKIP_E2E_WEBSERVER=1 playwright test --config=playwright.config.ts',
    },
  },
  rules: {
    default: { desc: 'Rules ratchet check (+ failure summary)', cmd: '__rules_check__' },
    check: { desc: 'Rules ratchet check (+ failure summary)', cmd: '__rules_check__' },
    ratchet: { desc: 'Emit law/folder ratchet.generated.ts', cmd: `${TSX} src/law/folder/emit-ratchet.ts` },
    accounting: { desc: 'Accounting structure rules only', cmd: `${TSX} src/rules/index.ts --accounting-only` },
  },
  monitor: {
    default: { desc: 'Watch violations loop', cmd: `${TSX} src/monitor/violations/index.ts --watch` },
    violations: { desc: 'Watch violations', cmd: `${TSX} src/monitor/violations/index.ts --watch` },
    improve: { desc: 'Improve watch loop', cmd: `${TSX} src/monitor/violations/loop.ts --watch` },
  },
  confirm: {
    default: { desc: 'Scoped confirm (payload ⊕ vitepress)', cmd: `${TSX} src/confirm/matter.ts` },
    full: { desc: 'Full corpus confirm (= gate superset)', cmd: `${TSX} src/confirm/matter.ts --full` },
    uuid: { desc: 'Uuid-pure gate stack (no Payload typegen)', cmd: `${TSX} src/confirm/index.ts` },
  },
  apply: {
    default: { desc: 'Session apply pass', cmd: `${TSX} src/apply/index.ts` },
    session: { desc: 'Session apply pass', cmd: `${TSX} src/apply/index.ts` },
    efficiency: { desc: 'Emit efficiency ledger', cmd: `${TSX} src/apply/emit-efficiency.ts` },
    clean: {
      desc: 'Coordinated dry-clean cycle (dry-run default)',
      cmd: `${TSX} src/apply/clean.ts`,
    },
  },
  clean: {
    default: {
      desc: 'Coordinated dry-clean cycle (dry-run default; --apply for safe fixes)',
      cmd: `${TSX} src/apply/clean.ts`,
    },
    cycle: {
      desc: 'Coordinated dry-clean cycle',
      cmd: `${TSX} src/apply/clean.ts`,
    },
  },
  standards: {
    default: {
      desc: 'Standards banners + catalogue verify',
      cmd: 'bash scripts/standards-citation-index.sh --check && bash scripts/standards-citation-index.sh --required && cross-env NODE_OPTIONS="--no-deprecation --import=tsx/esm" tsx src/standards/emit.ts --verify',
    },
    check: {
      desc: 'Standards banners + catalogue verify',
      cmd: 'bash scripts/standards-citation-index.sh --check && bash scripts/standards-citation-index.sh --required && cross-env NODE_OPTIONS="--no-deprecation --import=tsx/esm" tsx src/standards/emit.ts --verify',
    },
    catalogue: { desc: 'Emit standards catalogue.ts + SKILL index', cmd: `${TSX} src/standards/emit.ts` },
  },
  corpus: {
    default: {
      desc: 'Full corpus regen (atoms + matrix + skill + readme)',
      cmd: 'pnpm erpax corpus atoms && pnpm erpax corpus matrix && pnpm erpax corpus skill && pnpm erpax readme',
    },
    generate: {
      desc: 'Full corpus regen (atoms + matrix + skill + readme)',
      cmd: 'pnpm erpax corpus atoms && pnpm erpax corpus matrix && pnpm erpax corpus skill && pnpm erpax readme',
    },
    atoms: { desc: 'Atom catalogue emit', cmd: 'node src/atom/catalogue.mjs' },
    matrix: { desc: 'Uuid matrix collide emit', cmd: 'node src/uuid/matrix/collide.mjs --emit' },
    skill: { desc: 'Skill router index emit', cmd: `${TSX} src/skill/router/build/index.ts` },
    upgrade: { desc: 'Skill upgrade sync', cmd: `${TSX} src/skill/router/upgrade/index.ts --sync` },
    'upgrade-check': { desc: 'Skill upgrade verify', cmd: `${TSX} src/skill/router/upgrade/index.ts --verify` },
    mint: { desc: 'Mint new atoms', cmd: 'node src/generate/mint.mjs' },
    words: { desc: 'Literary-word audit (top 50 + use-case scores)', cmd: `${TSX} src/corpus/words.ts` },
  },
  aura: {
    default: { desc: 'Aura [[link]] scan', cmd: `node ${AURA_SCAN_PATH}` },
    scan: { desc: 'Aura [[link]] scan', cmd: `node ${AURA_SCAN_PATH}` },
  },
  harmony: {
    default: { desc: 'Harmony scan', cmd: `${TSX} src/harmony/scan.ts` },
    scan: { desc: 'Harmony scan', cmd: `${TSX} src/harmony/scan.ts` },
  },
  build: {
    uuid: { desc: 'Uuid build lane', cmd: `${TSX} src/build/index.ts` },
  },
  translations: {
    default: { desc: 'Verify translation catalogue', cmd: `${TSX} src/translations/collect/index.ts --verify` },
    collect: { desc: 'Collect translations', cmd: `${TSX} src/translations/collect/index.ts` },
    verify: { desc: 'Verify translation catalogue', cmd: `${TSX} src/translations/collect/index.ts --verify` },
  },
  spec: {
    gen: { desc: 'Spec generator', cmd: `${TSX} src/spec/gen.ts` },
  },
  payload: {
    'verify-types': { desc: 'Verify payload-types.ts fresh', cmd: 'bash scripts/payload-verify-types.sh' },
    jobs: {
      desc: 'Run Payload job queues',
      cmd: 'cross-env NODE_OPTIONS="--no-deprecation --max-old-space-size=8000 --import=./src/css/load-hook.mjs" payload jobs:run --all-queues --limit 50',
    },
  },
  deploy: {
    db: {
      desc: 'Migrate remote D1 + optimize',
      cmd: 'cross-env NODE_ENV=production PAYLOAD_SECRET=ignore NODE_OPTIONS="--no-deprecation --import=./src/css/load-hook.mjs" payload migrate && wrangler d1 execute D1 --command \'PRAGMA optimize\' --env=$CLOUDFLARE_ENV --remote',
    },
    app: {
      desc: 'Build + deploy app to Cloudflare',
      cmd: 'opennextjs-cloudflare build --env=$CLOUDFLARE_ENV && opennextjs-cloudflare deploy --env=$CLOUDFLARE_ENV',
    },
  },
  plugin: {
    claude: { desc: 'Emit Claude Code plugin manifests', cmd: `${TSX} src/plugins/emit.ts` },
  },
  db: {
    regenerate: { desc: 'Regenerate database artefacts', cmd: 'bash scripts/db-regenerate.sh' },
    audit: { desc: 'D1 column audit', cmd: 'node src/database/d1-column-audit.mjs' },
  },
  import: {
    blogger: { desc: 'Blogger → JSON', cmd: 'tsx src/services/ingest/blogger-to-json.ts' },
    'blogger-payload': { desc: 'Blogger → Payload import', cmd: 'tsx src/services/ingest/blogger-import.ts' },
  },
  mcp: {
    test: { desc: 'List MCP tools', cmd: 'node src/agents/mcp/tools-list.mjs' },
  },
  codemod: {
    default: { desc: 'Payload codemod', cmd: 'bash scripts/payload-codemod.sh' },
  },
  seeds: {
    coverage: { desc: 'Spec seed coverage', cmd: 'node src/spec/coverage.mjs' },
  },
  path: {
    hooks: { desc: 'Emit path hooks registry', cmd: 'node src/path/hooks.registry.mjs --emit' },
  },
  gate: {
    default: { desc: 'Full CI gate (standards · lint · typecheck · test)', cmd: '__gate__' },
  },
  doctor: {
    default: { desc: 'Quick health: stray-ts, efficiency, entry skill', cmd: '__doctor__' },
  },
}

/** Legacy pnpm script name → erpax invocation (documented in scripts/SKILL.md). */
export const LEGACY_ALIASES: Record<string, string> = {
  readme: 'erpax readme',
  'readme:waves': 'erpax readme waves',
  'readme:check': 'erpax readme check',
  'readme:check:full': 'erpax readme check-full',
  'readme:check:waves': 'erpax readme check',
  'readme:regen': 'erpax readme regen',
  'computed:check': 'erpax readme check-full',
  'lint:src': 'erpax lint src',
  'lint:imports': 'erpax lint imports',
  'lint:folders': 'erpax lint folders',
  'lint:fix': 'erpax lint fix',
  typecheck: 'erpax lint typecheck',
  'typecheck:all': 'erpax lint typecheck-all',
  'test:int': 'erpax test int',
  'test:int:fast': 'erpax test fast',
  'test:e2e': 'erpax test e2e',
  'rules:check': 'erpax rules check',
  'rules:ratchet': 'erpax rules ratchet',
  'lint:accounting-structure': 'erpax rules accounting',
  'violations:watch': 'erpax monitor violations',
  'improve:watch': 'erpax monitor improve',
  confirm: 'erpax confirm',
  'confirm:full': 'erpax confirm full',
  'confirm:uuid': 'erpax confirm uuid',
  'apply:efficiency-emit': 'erpax apply efficiency',
  'session:apply': 'erpax apply session',
  clean: 'erpax clean',
  'apply:clean': 'erpax apply clean',
  standards: 'erpax standards',
  'standards:catalogue': 'erpax standards catalogue',
  'standards:check': 'erpax standards check',
  translations: 'erpax translations verify',
  'translations:collect': 'erpax translations collect',
  'spec:gen': 'erpax spec gen',
  'build:uuid': 'erpax build uuid',
  'aura:scan': 'erpax aura scan',
  harmony: 'erpax harmony scan',
  'atoms:catalogue': 'erpax corpus atoms',
  'claude:plugin': 'erpax plugin claude',
  'matrix:generate': 'erpax corpus matrix',
  'path:hooks': 'erpax path hooks',
  'skill:index': 'erpax corpus skill',
  'skill:upgrade': 'erpax corpus upgrade',
  'skill:upgrade:check': 'erpax corpus upgrade-check',
  'corpus:generate': 'erpax corpus generate',
  'mint:atoms': 'erpax corpus mint',
  'd1:audit': 'erpax db audit',
  'db:regenerate': 'erpax db regenerate',
  'payload:verify-types': 'erpax payload verify-types',
  'jobs:run': 'erpax payload jobs',
  'deploy:db': 'erpax deploy db',
  'deploy:app': 'erpax deploy app',
  'migrate:production': 'erpax deploy db',
  'import:blogger': 'erpax import blogger',
  'import:blogger:payload': 'erpax import blogger-payload',
  'seeds:coverage': 'erpax seeds coverage',
  'mcp:test': 'erpax mcp test',
  codemod: 'erpax codemod',
  check: 'erpax gate',
}

export function resolveAction(domain: string, action?: string): CliAction | undefined {
  const d = CLI_REGISTRY[domain]
  if (!d) return undefined
  if (action) return d[action]
  if (d.default) return d.default
  return undefined
}

export function listDomains(): string[] {
  return Object.keys(CLI_REGISTRY).sort()
}
