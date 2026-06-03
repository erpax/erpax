/**
 * ERPax implementation-gap detector — TypeScript.
 *
 * Slice CCCCCCCC (2026-05-11). Per user 'ensure only javascript/typescript'.
 * Replaces the prior Python sibling. The canonical detection lives in
 * `src/services/architecture-invariants/checks.ts` (run by the
 * ConsistencyAgent + the boot suite); this script is a thin CLI for
 * ad-hoc one-off scans.
 *
 * Usage (from repo root):
 *   pnpm exec tsx src/aura/find-gaps.ts
 *   pnpm exec tsx src/aura/find-gaps.ts --class I
 *   pnpm exec tsx src/aura/find-gaps.ts --json
 *
 * Categories scanned:
 *   A. DUPLICATE_FIELD_TOP_LEVEL — collection top-level field collides
 *      with an injection from auditFields/multiTenancyField/etc.
 *   B. COLLECTION_BOILERPLATE — inlines preamble instead of using factory.
 *   C. STALE_BAK — .bak / .orig / .fuse_hidden* residue.
 *   F. FACTORY_EMITS_NOT_HOOKED — `emits:` declared without runtime producer.
 *   H. TODO_FIXME — TODO/FIXME markers.
 *   I. RELATIONSHIP_TO_NONEXISTENT — relationTo: 'X' where X isn't a slug.
 *   J. CHAIN_EMIT_NOT_WIRED — BUSINESS_CHAINS emit with no producer.
 *
 * @standard ISO/IEC 25010:2023 §5.1 functional-completeness
 * @audit ISO 19011:2018 §6.4.6 audit-evidence
 */

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs'
import { join, relative, resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const ROOT = resolve(__dirname, '..', '..')
const SRC = join(ROOT, 'src')
const TESTS = join(ROOT, 'tests')

type Gap = {
  class: string
  file: string
  line: number
  detail: string
}

const HELPER_INJECTIONS: Record<string, string[]> = {
  auditFields: ['createdBy', 'approvedBy', 'approvedAt'],
  multiTenancyField: ['tenant'],
  currencyField: ['currency'],
  statusField: ['status'],
  notesField: ['notes'],
}

function* walkTs(roots: string[]): Generator<string> {
  for (const r of roots) {
    if (!existsSync(r)) continue
    const stack: string[] = [r]
    while (stack.length) {
      const d = stack.pop()!
      let entries: string[] = []
      try {
        entries = readdirSync(d)
      } catch {
        continue
      }
      for (const e of entries) {
        if (e === 'node_modules' || e === '.git' || e === '_attic') continue
        if (e.startsWith('.fuse_hidden')) continue
        const p = join(d, e)
        let s: { isDirectory: () => boolean; isFile: () => boolean }
        try {
          s = statSync(p)
        } catch {
          continue
        }
        if (s.isDirectory()) stack.push(p)
        else if (s.isFile() && (p.endsWith('.ts') || p.endsWith('.tsx'))) yield p
      }
    }
  }
}

function readSafe(p: string): string {
  try {
    return readFileSync(p, 'utf8')
  } catch {
    return ''
  }
}

function stripComments(src: string): string {
  let out = src.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '))
  out = out.replace(/\/\/[^\n]*/g, (m) => ' '.repeat(m.length))
  return out
}

// ─── Class A: duplicate top-level field ────────────────────────────
function classA(): Gap[] {
  const gaps: Gap[] = []
  const nameRe = /^(\s*)\{\s*name:\s*['"]([\w-]+)['"]/gm
  const callRe = /^(\s*)(\w+)\s*\(/gm
  for (const p of walkTs([join(SRC, 'plugins/accounting/collections'), join(SRC, 'collections')])) {
    if (p.includes('.fuse_hidden')) continue
    const text = readSafe(p)
    const lines = text.split('\n')
    const helperCalls = new Set<string>()
    for (const m of text.matchAll(callRe)) {
      if (HELPER_INJECTIONS[m[2]]) helperCalls.add(m[2])
    }
    if (helperCalls.size === 0) continue
    const injected = new Set<string>()
    for (const h of helperCalls) for (const f of HELPER_INJECTIONS[h]) injected.add(f)
    // top-level field declarations only. Slice GGGGGGGG-fix (2026-05-11):
    // tightened to indent ≤ 4 spaces. The prior heuristic (≤ 8) caught
    // nested array-subfields (BudgetPlanning's lineItems[].notes,
    // ConsolidationEliminations.subsidiaries[].tenant) as false positives.
    // Top-level fields are direct children of the collection's `fields:`
    // array, which lands at 4-space indent. Anything deeper is nested.
    for (let i = 0; i < lines.length; i++) {
      const m = nameRe.exec(lines[i])
      if (!m) continue
      const indent = m[1].length
      if (indent > 4) continue
      if (injected.has(m[2])) {
        gaps.push({
          class: 'A_DUPLICATE_FIELD_TOP_LEVEL',
          file: relative(ROOT, p),
          line: i + 1,
          detail: `top-level field '${m[2]}' collides with injection from one of: ${[...helperCalls].join(', ')}`,
        })
      }
    }
  }
  return gaps
}

// ─── Class B: collection boilerplate ───────────────────────────────
function classB(): Gap[] {
  const gaps: Gap[] = []
  for (const p of walkTs([join(SRC, 'plugins/accounting/collections')])) {
    if (p.includes('.fuse_hidden')) continue
    const text = readSafe(p)
    if (/createAccountingCollection\s*\(/.test(text)) continue
    // Heuristic: legacy collection if file is large enough + has both
    // an access block and a hooks block inlined.
    if (text.length < 1000) continue
    if (!/access:\s*\{/.test(text)) continue
    if (!/hooks:\s*\{/.test(text)) continue
    gaps.push({
      class: 'B_COLLECTION_BOILERPLATE',
      file: relative(ROOT, p),
      line: 1,
      detail: 'inlines access + hooks preamble; should use createAccountingCollection',
    })
  }
  return gaps
}

// ─── Class C: stale residue ────────────────────────────────────────
function classC(): Gap[] {
  const gaps: Gap[] = []
  const stack: string[] = [SRC, TESTS]
  while (stack.length) {
    const d = stack.pop()!
    if (!existsSync(d)) continue
    let entries: string[] = []
    try {
      entries = readdirSync(d)
    } catch {
      continue
    }
    for (const e of entries) {
      if (e === 'node_modules') continue
      const p = join(d, e)
      let s: { isDirectory: () => boolean; isFile: () => boolean }
      try {
        s = statSync(p)
      } catch {
        continue
      }
      if (s.isDirectory()) {
        if (e === '_attic' || e === '_old' || e === '_dead') {
          gaps.push({ class: 'C_STALE_BAK', file: relative(ROOT, p), line: 0, detail: `attic directory ${e}` })
        } else {
          stack.push(p)
        }
      } else if (s.isFile()) {
        if (e.endsWith('.bak') || e.endsWith('.old') || e.endsWith('.orig') || e.startsWith('.fuse_hidden')) {
          gaps.push({ class: 'C_STALE_BAK', file: relative(ROOT, p), line: 0, detail: 'residue from prior refactoring' })
        }
      }
    }
  }
  return gaps
}

// ─── Class F: factory emits not hooked ─────────────────────────────
function classF(): Gap[] {
  const fired = new Set<string>()
  const eventRe = /['"]([a-z]+:[a-z_]+)['"]/gi
  const emitCallRe = /emitDomainEvent\s*\([^)]*['"]([a-z]+:[a-z_]+)['"]/gi
  const chainEmitter = readSafe(join(SRC, 'hooks/chainEventEmitters.ts'))
  for (const m of chainEmitter.matchAll(
    /emit\w+\s*\(\s*[^,]+,\s*['"]([a-z]+:[a-z_]+)['"]/gi,
  )) fired.add(m[1])
  for (const f of walkTs([SRC])) {
    const t = stripComments(readSafe(f))
    for (const m of t.matchAll(emitCallRe)) fired.add(m[1])
  }
  const structuredRe =
    /\{\s*event:\s*['"]([a-z]+:[a-z_]+)['"][^}]*?(?:onCreate\s*:\s*true|onStatus\s*:\s*['"][^'"]+['"])[^}]*?aggregate\s*:\s*['"][^'"]+['"]/gi
  const emitsBlockRe = /emits:\s*\[([\s\S]*?)\]/g
  const gaps: Gap[] = []
  for (const f of walkTs([join(SRC, 'plugins/accounting/collections')])) {
    if (f.includes('.fuse_hidden')) continue
    const raw = readSafe(f)
    const stripped = stripComments(raw)
    if (/from\s+['"]@\/hooks\/chainEventEmitters['"]/.test(stripped)) continue
    for (const m of stripped.matchAll(emitsBlockRe)) {
      const block = m[1]
      const structured = new Set<string>([...block.matchAll(structuredRe)].map((s) => s[1]))
      const literals = [...block.matchAll(eventRe)].map((e) => e[1])
      for (const evt of literals) {
        if (fired.has(evt) || structured.has(evt)) continue
        const lineNo = raw.slice(0, raw.indexOf(m[0])).split('\n').length
        gaps.push({
          class: 'F_FACTORY_EMITS_NOT_HOOKED',
          file: relative(ROOT, f),
          line: lineNo,
          detail: `emits: '${evt}' declared but no emitDomainEvent / chainEventEmitter fires it`,
        })
      }
    }
  }
  return gaps
}

// ─── Class H: TODO/FIXME ───────────────────────────────────────────
function classH(): Gap[] {
  const gaps: Gap[] = []
  const re = /\b(TODO|FIXME|XXX)\b/i
  for (const p of walkTs([SRC])) {
    if (p.includes('.fuse_hidden')) continue
    const text = readSafe(p)
    const lines = text.split('\n')
    for (let i = 0; i < lines.length; i++) {
      if (re.test(lines[i])) {
        gaps.push({ class: 'H_TODO_FIXME', file: relative(ROOT, p), line: i + 1, detail: lines[i].trim() })
      }
    }
  }
  return gaps
}

// ─── Class I: relationTo to nonexistent slug ───────────────────────
function collectSlugs(): Set<string> {
  const slugs = new Set<string>([
    'users', 'media', 'tenants', 'pages', 'posts', 'products',
    'categories', 'forms', 'form-submissions', 'search', 'redirects',
    'header', 'footer',
    'addresses', 'carts', 'orders', 'transactions',
    'variants', 'variantTypes', 'variantOptions',
    'payload-mcp-api-keys',
  ])
  const slugRe = /slug:\s*['"]([\w-]+)['"]/g
  for (const f of walkTs([SRC])) {
    if (f.includes('.fuse_hidden')) continue
    const t = stripComments(readSafe(f))
    for (const m of t.matchAll(slugRe)) slugs.add(m[1])
  }
  return slugs
}

function classI(): Gap[] {
  const slugs = collectSlugs()
  const relRe = /relationTo:\s*['"]([\w-]+)['"]/g
  const gaps: Gap[] = []
  for (const f of walkTs([SRC])) {
    if (f.includes('.fuse_hidden')) continue
    if (f.endsWith('payload-types.ts')) continue
    const t = stripComments(readSafe(f))
    const lines = t.split('\n')
    for (let i = 0; i < lines.length; i++) {
      for (const m of lines[i].matchAll(relRe)) {
        if (slugs.has(m[1])) continue
        gaps.push({
          class: 'I_RELATIONSHIP_TO_NONEXISTENT',
          file: relative(ROOT, f),
          line: i + 1,
          detail: `relationTo: "${m[1]}" — no collection has this slug`,
        })
      }
    }
  }
  return gaps
}

// ─── Class J: chain emit not wired (after Slice BBBBBBBB) ──────────
function classJ(): Gap[] {
  const gaps: Gap[] = []
  const fired = new Set<string>()
  const evRe = /['"`]([a-z]+:[a-zA-Z_]+)['"`]/g
  for (const p of [
    join(SRC, 'types/events.ts'),
    join(SRC, 'hooks/chainEventEmitters.ts'),
    join(SRC, 'services/notifications/subscriber.ts'),
  ]) {
    const t = readSafe(p)
    for (const m of t.matchAll(evRe)) fired.add(m[1])
  }
  // Walk registry.ts step blocks: a step has producer: → wired.
  const regFile = join(SRC, 'services/business-chains/registry.ts')
  const reg = readSafe(regFile)
  // Match top-level step object literals (collection: … emits: 'x:y'…).
  // Tolerant of multi-line shape.
  const stepRe =
    /\{\s*collection:\s*'[\w-]+'[\s\S]*?emits:\s*'([a-z]+:[a-zA-Z_]+)'[\s\S]*?(?:\}\s*,|\}\s*\])/g
  for (const m of reg.matchAll(stepRe)) {
    const emit = m[1]
    if (m[0].includes('producer:')) continue
    if (fired.has(emit)) continue
    const lineNo = reg.slice(0, m.index ?? 0).split('\n').length
    gaps.push({
      class: 'J_CHAIN_EMIT_NOT_WIRED',
      file: relative(ROOT, regFile),
      line: lineNo,
      detail: `BUSINESS_CHAINS declares emit '${emit}' but no emitter fires it`,
    })
  }
  return gaps
}

// ─── Orchestration ─────────────────────────────────────────────────
const CLASSES: Record<string, [string, () => Gap[]]> = {
  A: ['A_DUPLICATE_FIELD_TOP_LEVEL', classA],
  B: ['B_COLLECTION_BOILERPLATE', classB],
  C: ['C_STALE_BAK', classC],
  F: ['F_FACTORY_EMITS_NOT_HOOKED', classF],
  H: ['H_TODO_FIXME', classH],
  I: ['I_RELATIONSHIP_TO_NONEXISTENT', classI],
  J: ['J_CHAIN_EMIT_NOT_WIRED', classJ],
}

function main(): void {
  const args = process.argv.slice(2)
  const onlyClass = args.includes('--class') ? args[args.indexOf('--class') + 1] : null
  const asJson = args.includes('--json')
  const summary = args.includes('--summary-only')
  const keys = onlyClass ? [onlyClass.toUpperCase()] : Object.keys(CLASSES).sort()
  const all: Gap[] = []
  for (const k of keys) {
    const entry = CLASSES[k]
    if (!entry) continue
    const [label, fn] = entry
    const gaps = fn()
    all.push(...gaps)
    if (!asJson) {
      console.log(`\n=== Class ${k} — ${label} (${gaps.length} gaps) ===`)
      if (!summary) {
        for (const g of gaps.slice(0, 50)) console.log(`  ${g.file}:${g.line}: ${g.detail}`)
        if (gaps.length > 50) console.log(`  ... ${gaps.length - 50} more`)
      }
    }
  }
  if (asJson) {
    for (const g of all) console.log(JSON.stringify(g))
  } else {
    console.log(`\n=== Total gaps across all classes: ${all.length} ===`)
    const perClass: Record<string, number> = {}
    for (const g of all) perClass[g.class] = (perClass[g.class] ?? 0) + 1
    for (const [c, n] of Object.entries(perClass).sort()) console.log(`  ${c}: ${n}`)
  }
}

main()
