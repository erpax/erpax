/**
 * cli/registry — domain → action → shell command (matter stays in src atoms).
 */
export interface CliAction {
  readonly desc: string
  readonly cmd: string
}

export type CliDomain = Record<string, CliAction>

const TSX = 'cross-env NODE_OPTIONS="--no-deprecation --import=tsx/esm" tsx'
// Corpus-scale tsx — the full-tree regen/verify walks 3168 atoms + the fold-root
// digest; the default heap OOM-thrashes into GC (observed 2026-07-15, 3GB+ climb),
// so these carry the same --max-old-space-size=8000 as lint/vitest/build.
const HEAVY_TSX = 'cross-env NODE_OPTIONS="--no-deprecation --max-old-space-size=8000 --import=tsx/esm" tsx'
const NODE_TSX = 'cross-env NODE_OPTIONS="--no-deprecation --import=tsx/esm" node'
const ESLINT =
  'cross-env NODE_OPTIONS="--no-deprecation --max-old-space-size=8000" eslint'
const VITEST =
  'cross-env NODE_OPTIONS="--no-deprecation --max-old-space-size=8000 --import=./src/css/load-hook.mjs" vitest run --config ./vitest.config.mts'

import { derivedCliFaces, mergeDerivedFaces } from './face'

/** Canonical on-disk aura scanner (hooks + package surface must agree). */
export const AURA_SCAN_PATH = 'src/aura/scan.mjs'

export const CLI_REGISTRY: Record<string, CliDomain> = {
  seal: {
    default: { desc: 'The 4-seal gate — fail closed unless every atom is signed by its 4-key bind', cmd: `${TSX} src/uuid/matrix/gate.ts` },
  },
  readme: {
    default: { desc: 'Regenerate README + computed faces', cmd: `${HEAVY_TSX} src/readme/index.ts` },
    root: { desc: 'Regenerate the front-page README.md only (faces are gitignored)', cmd: `${HEAVY_TSX} src/readme/index.ts --root` },
    waves: { desc: 'Regenerate in horo waves (OOM-safe)', cmd: `${HEAVY_TSX} src/readme/index.ts --waves` },
    check: { desc: 'Verify readme + faces (waves)', cmd: `${HEAVY_TSX} src/readme/index.ts --verify --waves` },
    'check-full': { desc: 'Verify full corpus readme + faces', cmd: `${HEAVY_TSX} src/readme/index.ts --verify` },
    regen: { desc: 'Focused face regen for atom path(s)', cmd: `${TSX} src/readme/regen/index.ts` },
    paths: {
      desc: 'Explicit atom paths only (--paths a,b · also: erpax readme --paths)',
      cmd: `${TSX} src/readme/index.ts --paths`,
    },
    drift: {
      desc: 'Hand-maintained drift on session paths (--drift · --fix regen)',
      cmd: `${TSX} src/readme/index.ts --drift`,
    },
  },
  lint: {
    /*
     * Everything OUTSIDE src. `lint src` covers src strictly (zero warnings, and a 64MB V8 stack
     * the type-aware pass needs), so linting src here too was every src file read and rule-checked
     * twice for a verdict the strict pass already gives. One file, one pass.
     */
    default: { desc: 'ESLint outside src (src is the strict pass)', cmd: `${ESLINT} . --ignore-pattern "src/**"` },
    // Dispatched in cli/index.ts to runLintSrc — a CITED verdict. The command it runs is the
    // same one this entry used to hold verbatim (64MB V8 stack for the type-aware pass on deep
    // Payload types), plus a content address so an unchanged tree is not re-linted for 95s.
    src: { desc: 'ESLint src (zero warnings) — cited by content address', cmd: '__lint_src__' },
    imports: { desc: 'Import-convention ratchet gate', cmd: `${NODE_TSX} src/convention/import/gate.mjs` },
    folders: { desc: 'Folder-shape law gate', cmd: 'cross-env NODE_OPTIONS="--no-deprecation" tsx src/law/folder/index.ts --check' },
    fix: { desc: 'ESLint --fix whole repo', cmd: `${ESLINT} . --fix` },
    typecheck: {
      desc: 'tsc waves — uuid substrate then full (quantum FTL; never raise stack)',
      cmd: '__typecheck_waves__',
    },
    'typecheck-all': {
      desc: 'tsc --noEmit (full project)',
      cmd: 'cross-env NODE_OPTIONS="--no-deprecation --max-old-space-size=8000" tsc --noEmit -p tsconfig.json',
    },
  },
  test: {
    default: { desc: 'Vitest integration (waves / receipts)', cmd: VITEST },
    int: { desc: 'Vitest integration (waves / receipts)', cmd: VITEST },
    waves: { desc: 'Vitest integration in receipt-split batches', cmd: '__test_waves__' },
    build: { desc: 'Production build as a CITED verdict (receipt-addressed)', cmd: '__build_gate__' },
    fast: {
      desc: 'Vitest integration (skip migrate)',
      cmd: 'cross-env NODE_OPTIONS="--no-deprecation --max-old-space-size=8000 --import=./src/css/load-hook.mjs" PAYLOAD_TEST_SKIP_MIGRATE=1 vitest run --config ./vitest.config.mts',
    },
    e2e: {
      desc: 'Playwright e2e (starts pnpm dev unless SKIP_E2E_WEBSERVER=1)',
      cmd: 'cross-env NODE_OPTIONS="--no-deprecation --import=tsx/esm" playwright test --config=playwright.config.ts',
    },
    'e2e-smoke': {
      desc: 'UI smoke only (frontend+admin) — set PLAYWRIGHT_BASE_URL for deployed target',
      cmd: 'cross-env NODE_OPTIONS="--no-deprecation --import=tsx/esm" playwright test --config=playwright.config.ts tests/e2e/smoke.e2e.spec.ts',
    },
  },
  accounting: {
    gaps: { desc: 'Wave-batch entropy gap scan', cmd: `${TSX} src/accounting/gaps/cli.ts` },
    'gaps-fix': { desc: 'P0 accounting gap fixes + regen', cmd: `${TSX} src/accounting/gaps/cli.ts --fix` },
  },
  outward: {
    default: { desc: 'Check the four pan-EU authorities against their receipts', cmd: `${TSX} src/outward/eu/cli.ts` },
    eu: { desc: 'Check the four pan-EU authorities (VIES · ECB · Peppol · sanctions)', cmd: `${TSX} src/outward/eu/cli.ts` },
    write: { desc: 'Record the current authority addresses into outward-receipts.json', cmd: `${TSX} src/outward/eu/cli.ts --write` },
    contract: { desc: 'Check the LIVE authorities against the same contract the gate checks offline', cmd: `${TSX} src/outward/eu/cli.ts --contract` },
    coverage: { desc: 'Which external rails erpax claims to speak vs can prove (pure, no network)', cmd: `${TSX} src/outward/eu/cli.ts --coverage` },
    bg: { desc: 'Check the two BG rails (БНБ fixing · Търговски Регистър дело) offline, or --online', cmd: `${TSX} src/outward/bg/index.ts` },
    world: { desc: 'Check the public world rails (brreg · OFAC · SEC · FX · OFF) offline, or --online', cmd: `${TSX} src/outward/world/index.ts` },
    gate: { desc: 'Every OFFLINE contract, fail-closed — what CI and pre-push run (no network)', cmd: `${TSX} src/outward/gate/index.ts` },
  },
  memory: {
    default: { desc: 'Agent-memory index vs files — a memory off MEMORY.md is never loaded', cmd: `${TSX} src/memory/drift/index.ts` },
    drift: { desc: 'Agent-memory index vs files — fails closed on orphans and dead entries', cmd: `${TSX} src/memory/drift/index.ts` },
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
    inventory: {
      desc: 'Watch task inventory (push on stale · poll fallback)',
      cmd: `${TSX} src/agent/inventory/monitor.ts`,
    },
  },
  agent: {
    default: {
      desc: 'Subagent task inventory (oldest→newest)',
      cmd: `${TSX} src/agent/inventory/cli.ts`,
    },
    inventory: {
      desc: 'Full coordinator inventory report',
      cmd: `${TSX} src/agent/inventory/cli.ts`,
    },
    improve: {
      desc: 'Self-improve intelligence cycle (measure · fold · seal · balance)',
      cmd: `${TSX} src/agent/intelligence/index.ts`,
    },
    realtime: {
      desc: 'Active realtime channels · subscribers · last event age',
      cmd: `${TSX} src/agent/communication/realtime-cli.ts`,
    },
  },
  intelligence: {
    default: {
      desc: 'Self-improve intelligence cycle (measure · fold · seal · balance)',
      cmd: `${TSX} src/agent/intelligence/index.ts`,
    },
    cycle: {
      desc: 'One intelligence improvement wave (--batch 10 · --apply)',
      cmd: `${TSX} src/agent/intelligence/index.ts`,
    },
  },
  confirm: {
    default: { desc: 'Scoped confirm (payload ⊕ vitepress)', cmd: `${TSX} src/confirm/matter/index.ts` },
    full: { desc: 'Full corpus confirm (= gate superset)', cmd: `${TSX} src/confirm/matter/index.ts --full` },
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
  automate: {
    default: {
      desc: 'Orchestration pass: inventory → clean → measure → ratchet',
      cmd: `${TSX} src/apply/automate/index.ts`,
    },
    watch: {
      desc: 'Watch loop (replaces improve+violations+inventory ad-hoc)',
      cmd: `${TSX} src/apply/automate/index.ts watch`,
    },
  },
  wave: {
    default: { desc: 'Coordinated self-balancing wave (--batch 30 · --apply)', cmd: `${TSX} src/apply/wave.ts run` },
    run: { desc: 'Coordinated self-balancing wave', cmd: `${TSX} src/apply/wave.ts run` },
    status: { desc: 'Wave lock + stall hints (--full scans axis debt)', cmd: `${TSX} src/apply/wave.ts status` },
    watch: { desc: 'Realtime wave queue reorganizer', cmd: `${TSX} src/apply/wave.ts watch` },
  },
  workflow: {
    default: { desc: 'Seal workflow as trinity atom', cmd: `${TSX} src/workflow/seal.ts seal` },
    seal: { desc: 'Seal workflow definition', cmd: `${TSX} src/workflow/seal.ts seal` },
  },
  load: {
    default: {
      desc: 'Does the app BOOT? payload.config loads, every collection registers',
      cmd: `${TSX} src/run/load/index.ts`,
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
    skill: { desc: 'Skill router index emit (full; use skill-stub in CI)', cmd: `${TSX} src/skill/router/build/index.ts` },
    'skill-stub': {
      // Straight at the child atom: the full emitter imports [[aura]], [[navigation]] and the
      // upgrade seal at top level, and ESM evaluates them whether the stub path needs them or
      // not — 6.3s per CI job to write 265 fixed bytes. ./build/stub imports node:fs and
      // node:path and nothing else.
      desc: 'Empty skills.index for CI/deploy (fits Worker 3MB; skips 80MB emit)',
      cmd: `cross-env ERPAX_SKILL_INDEX=stub ${TSX} src/skill/router/build/stub/index.ts`,
    },
    upgrade: { desc: 'Skill upgrade sync', cmd: `${TSX} src/skill/router/upgrade/index.ts --sync` },
    'upgrade-check': { desc: 'Skill upgrade verify', cmd: `${TSX} src/skill/router/upgrade/index.ts --verify` },
    mint: { desc: 'Mint new atoms', cmd: 'node src/generate/mint.mjs' },
    words: { desc: 'Literary-word audit (top 50 + use-case scores)', cmd: `${TSX} src/corpus/words.ts` },
    book: {
      desc: 'Interactive book spread (--index harmony · optional --open)',
      cmd: `${TSX} src/book/cli.ts`,
    },
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
  integrity: {
    default: {
      desc: 'Security-claim integrity — every claim a measured verdict or an owned compass; fails closed on a verdict whose own proof is red',
      cmd: `${TSX} src/convention/discern/corpus/index.ts`,
    },
  },
  deploy: {
    pipeline: { desc: 'Deploy/release workflow ORDER — green CI, build before migrate, gates before ship', cmd: `${TSX} src/deploy/pipeline/index.ts` },
    fold: { desc: 'Production module folds still match their matter + the built Worker fits the 10 MiB ceiling', cmd: `${TSX} src/deploy/fold/index.ts` },
    db: {
      desc: 'Migrate remote D1 + optimize',
      cmd: 'cross-env NODE_ENV=production PAYLOAD_SECRET=ignore NODE_OPTIONS="--no-deprecation --import=./src/css/load-hook.mjs" payload migrate && wrangler d1 execute D1 --command \'PRAGMA optimize\' --remote',
    },
    app: {
      desc: 'Build + deploy app to Cloudflare (OpenNext; lean build:next via open-next.config)',
      cmd: 'opennextjs-cloudflare build && opennextjs-cloudflare deploy',
    },
  },
  plugin: {
    claude: { desc: 'Emit Claude Code plugin manifests', cmd: `${TSX} src/plugins/emit/index.ts` },
  },
  db: {
    regenerate: { desc: 'Regenerate database artefacts', cmd: 'bash scripts/db-regenerate.sh' },
    audit: { desc: 'D1 column audit', cmd: 'node src/database/d1-column-audit.mjs' },
    seed: {
      desc: 'Seed the local D1 so the payload.config suites run',
      cmd: 'cross-env PAYLOAD_DEV_PUSH=true NODE_OPTIONS="--no-deprecation --max-old-space-size=8000 --import=./src/css/load-hook.mjs" vitest run src/payload.config.api.test.ts --config ./vitest.config.mts',
    },
    reset: {
      desc: 'Drop local D1 + the push/migrate sentinels (greenfield)',
      cmd: 'rm -rf .wrangler/state/v3/d1 node_modules/.cache/erpax/schema.pushed node_modules/.cache/erpax/migrate.sentinel',
    },
  },
  // The @erpax/* package lanes. These were four package.json scripts; the registry is
  // the one surface, so a script that merely re-spells a lane is duplication.
  // VitePress lanes — three package.json scripts folded into the one surface.
  docs: {
    dev: { desc: 'VitePress docs — dev', cmd: "vitepress dev" },
    build: { desc: 'VitePress docs — build', cmd: "cross-env NODE_OPTIONS=\"--no-deprecation --max-old-space-size=24000\" vitepress build" },
    preview: { desc: 'VitePress docs — preview', cmd: "vitepress preview" },
  },
  packages: {
    build: { desc: 'Build every @erpax/* package (esbuild + types + closure ratchet)', cmd: 'node packages/build.mjs all' },
    release: { desc: 'Content-addressed version manifest (dry-run)', cmd: 'node packages/release.mjs' },
    write: { desc: 'Write the version manifest', cmd: 'node packages/release.mjs --write' },
    check: { desc: 'Assert the manifest matches built content — no drift', cmd: 'node packages/release.mjs --check' },
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
  approve: {
    default: {
      desc: 'Agent work approval — full package matrix (payload commands first)',
      cmd: '__gate_packages__',
    },
    payload: { desc: 'Payload approval only (types · importmap · migrate:status)', cmd: '__payload_approve__' },
    packages: { desc: 'Package approval matrix (--list · --smoke)', cmd: '__gate_packages__' },
  },
  gate: {
    default: { desc: 'Full CI gate (package matrix · standards · lint · test)', cmd: '__gate__' },
    packages: {
      desc: 'Package approval matrix (payload first · --list · --smoke)',
      cmd: '__gate_packages__',
    },
    payload: { desc: 'Payload approval only (types · importmap · migrate:status)', cmd: '__payload_approve__' },
  },
  doctor: {
    default: { desc: 'Quick health: stray-ts, efficiency, corpus entry', cmd: '__doctor__' },
  },
  github: {
    inventory: {
      desc: 'src/ top-level count + fold candidates',
      cmd: `${TSX} src/navigation/github-browse.ts --inventory`,
    },
    fold: {
      desc: 'Shard form-only vocabulary under vocabulary/ (--apply)',
      cmd: `${TSX} src/navigation/github-browse.ts --apply`,
    },
  },
  quantum: {
    default: { desc: 'Quantum status — superposition, collapse, reciprocity', cmd: `${TSX} src/quantum/status/index.ts` },
    status: { desc: 'Superposition pending paths, last collapse, bond reciprocity', cmd: `${TSX} src/quantum/status/index.ts` },
    seal: { desc: 'Seal linear gaps (entanglement priority)', cmd: `${TSX} src/quantum/fold/index.ts --seal` },
    fold: {
      desc: 'Fold linear segments into quantum surfaces (--linear · --apply)',
      cmd: `${TSX} src/quantum/fold/index.ts --linear`,
    },
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
  'readme:paths': 'erpax readme paths',
  'readme:drift': 'erpax readme drift',
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
  'automate:watch': 'erpax automate watch',
  automate: 'erpax automate',
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

/**
 * Faces DERIVED from the tree, computed once per process.
 *
 * The hand-written map above is the EXPLICIT surface — aliases, flags, non-default runners. This is
 * the implicit one: every atom whose `index.ts` carries a CLI guard is a command at its own atom
 * path, found by parsing rather than by remembering. 336 atoms already carried a guard while four
 * were registered, which is the measurement that made this necessary: hand-registration does not
 * fail loudly, it just leaves things unreachable.
 *
 * Lazily computed and cached — the walk parses every index.ts, and a CLI must not pay that twice.
 *
 * @invariant an explicitly registered domain always wins; derivation only fills a gap
 */
let derivedCache: Record<string, CliDomain> | undefined

export function derivedDomains(cwd: string = process.cwd()): Record<string, CliDomain> {
  if (derivedCache) return derivedCache
  const faces = derivedCliFaces(cwd)
  const make = (face: { atomPath: string; file: string; desc: string }): CliDomain => ({
    default: {
      desc: face.desc || `Run the ${face.atomPath} atom`,
      cmd: `${TSX} ${face.file}`,
    },
  })
  const byPath = mergeDerivedFaces<CliDomain>({}, faces, make)

  // LEAF ALIASES — `erpax receipt` for `agent/receipt`, the way a search resolves a unique hit.
  // Registered ONLY when the leaf is unambiguous across the whole tree and no explicit domain
  // already owns the word. An ambiguous leaf gets no alias at all: guessing between two atoms is
  // exactly the judgment-without-measurement the constitution forbids, and the full path always
  // works, so the cost of refusing is one extra segment rather than a wrong command.
  const leafCount = new Map<string, number>()
  for (const face of faces) {
    const leaf = face.atomPath.split('/').at(-1) ?? face.atomPath
    leafCount.set(leaf, (leafCount.get(leaf) ?? 0) + 1)
  }
  for (const face of faces) {
    const leaf = face.atomPath.split('/').at(-1) ?? face.atomPath
    if (leaf === face.atomPath) continue // already registered under its own name
    if (leafCount.get(leaf) !== 1) continue // ambiguous — refuse rather than pick
    if (CLI_REGISTRY[leaf] !== undefined || byPath[leaf] !== undefined) continue // explicit wins
    byPath[leaf] = make(face)
  }

  derivedCache = byPath
  return derivedCache
}

/** Every atom path a leaf resolves to — what an ambiguous word would have to choose between. */
export function leafCandidates(leaf: string, cwd: string = process.cwd()): readonly string[] {
  return derivedCliFaces(cwd)
    .map((f) => f.atomPath)
    .filter((p) => (p.split('/').at(-1) ?? p) === leaf)
    .sort()
}

export function resolveAction(domain: string, action?: string): CliAction | undefined {
  const d = CLI_REGISTRY[domain] ?? derivedDomains()[domain]
  if (!d) return undefined
  if (action) {
    const key = action.startsWith('--') ? action.slice(2) : action
    return d[key] ?? d[action]
  }
  if (d.default) return d.default
  return undefined
}

export function listDomains(): string[] {
  return Object.keys(CLI_REGISTRY).sort()
}

/** Every command that exists — hand-written and derived, the surface a user can actually reach. */
export function listAllDomains(cwd: string = process.cwd()): string[] {
  return [...new Set([...Object.keys(CLI_REGISTRY), ...Object.keys(derivedDomains(cwd))])].sort()
}
