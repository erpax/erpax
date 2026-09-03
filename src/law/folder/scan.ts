/**
 * law/folder/scan — live tree scans (no seal · readme imports).
 *
 * Ratchet live-counts require() this module to avoid circular init through
 * law/folder/index → seal → readme/entropy → pivot → law/folder.
 */
import { readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { ALPHANUMERIC_NAME, CODE_MARKERS, ONE_WORD, TRINITY } from './constants'

const SRC = join(process.cwd(), 'src')

/** Trinity / computed faces — stems exempt from alphanumeric file-stem law. */
const ALPHANUMERIC_FACE_STEMS = new Set(['skill', 'readme', 'llm', 'diamond'])
/** Cycle-breaking leaf stems — init-isolation modules under law/folder · readme, not atom matter. */
const ALPHANUMERIC_LEAF_STEMS = new Set([
  'baseline-types',
  'emit-ratchet',
  'live-counts',
  'ratchet-compute',
  'ratchet-math',
  'ratchet.generated',
  'entropy-unit',
])
const COLOCATED_TEST_STEM = /\.test$/i
const SCAN_FILE_EXT =
  /\.(tsx?|jsx?|mjs|cjs|scss|css|json|jsonld|yaml|yml|svg|png|jpe?g|gif|webp|woff2?|ttf|eot|map|js)$/i

/** Structural segments whose names are NOT atom names (exempt from the one-word rule). */
const isFrameworkSegment = (name: string): boolean =>
  /^\([^)]*\)$/.test(name) ||
  /^\[.*\]$/.test(name) ||
  name.startsWith('@') ||
  /^[0-9]+$/.test(name)

/** Generated / framework trees: names are URLs or disposable output — not atoms. */
const SKIP_TREES = new Set(['app', 'migrations'])

const isDir = (p: string): boolean => {
  try {
    return statSync(p).isDirectory()
  } catch {
    return false
  }
}

export interface NameViolation {
  readonly folder: string
  readonly law: 'one-word'
}
export interface TrinityViolation {
  readonly folder: string
  readonly missing: readonly string[]
  readonly law: 'trinity'
}
export interface FolderViolations {
  readonly name: NameViolation[]
  readonly trinity: TrinityViolation[]
  readonly total: number
}

/** Compute every folder-shape violation in the live src tree — the single source of truth. */
export function folderViolations(root: string = SRC): FolderViolations {
  const name: NameViolation[] = []
  const trinity: TrinityViolation[] = []
  const walk = (dir: string, rel: string): void => {
    let entries: string[]
    try {
      entries = readdirSync(dir).sort()
    } catch {
      return
    }
    const files = new Set(entries.filter((e) => !isDir(join(dir, e))))
    if (CODE_MARKERS.some((m) => files.has(m))) {
      // A React atom's barrel is `index.tsx`, and the bundler resolves `@/atom` to it exactly as it
      // resolves `index.ts` — so demanding the `.ts` spelling from a folder that HAS a barrel is a
      // false positive, measured at 6. It is not licence for the other direction: a `.tsx`-only
      // folder still fails to be a CODE_MARKERS atom, and 29 of those escape this law entirely.
      // That hole is real and named in [[law]]/folder's SKILL; closing it changes what counts as an
      // atom (most are framework-shaped `blocks/form/*`), which is a decision, not a bug fix.
      const missing = TRINITY.filter((f) => !files.has(f) && !(f === 'index.ts' && files.has('index.tsx')))
      if (missing.length) trinity.push({ folder: rel || '.', missing, law: 'trinity' })
    }
    for (const e of entries) {
      if (e.startsWith('.') || e === 'node_modules') continue
      const p = join(dir, e)
      if (!isDir(p)) continue
      if (!rel && SKIP_TREES.has(e)) continue
      const childRel = rel ? rel + '/' + e : e
      if (!isFrameworkSegment(e) && !ONE_WORD.test(e)) name.push({ folder: childRel, law: 'one-word' })
      walk(p, childRel)
    }
  }
  walk(root, '')
  return { name, trinity, total: name.length + trinity.length }
}

export interface AlphanumericNameViolation {
  readonly kind: 'folder' | 'file'
  readonly path: string
  readonly stem: string
  readonly law: 'alphanumeric-name'
  readonly reason: string
}

/** Word stem checked by alphanumeric law (handles co-located `*.test.ts`). */
export function alphanumericFileStem(basename: string): string | null {
  if (basename.startsWith('.')) return null
  if (!SCAN_FILE_EXT.test(basename)) return null
  const extMatch = basename.match(/\.[^.]+$/)
  if (!extMatch) return null
  let stem = basename.slice(0, -extMatch[0].length)
  if (COLOCATED_TEST_STEM.test(stem) && /\.(tsx?|jsx?)$/i.test(basename)) {
    stem = stem.replace(COLOCATED_TEST_STEM, '')
  }
  return stem.toLowerCase()
}

export function isAlphanumericStem(stem: string): boolean {
  return ALPHANUMERIC_NAME.test(stem)
}

/** Every folder segment and file stem under src/ that violates `[a-z0-9]+` (framework trees skipped). */
export function alphanumericNameViolations(cwd: string = process.cwd()): AlphanumericNameViolation[] {
  const root = join(cwd, 'src')
  const out: AlphanumericNameViolation[] = []

  const pushFolder = (rel: string, stem: string): void => {
    out.push({
      kind: 'folder',
      path: rel,
      stem,
      law: 'alphanumeric-name',
      reason: `folder segment "${stem}" — only [a-z0-9]+ allowed; nest as one-word child atom`,
    })
  }

  const pushFile = (rel: string, stem: string): void => {
    out.push({
      kind: 'file',
      path: rel,
      stem,
      law: 'alphanumeric-name',
      reason: `file stem "${stem}" — only [a-z0-9]+ allowed; rename or nest under one-word atom folder`,
    })
  }

  const walk = (dir: string, rel: string): void => {
    let entries: string[]
    try {
      entries = readdirSync(dir).sort()
    } catch {
      return
    }
    for (const e of entries) {
      if (e.startsWith('.') || e === 'node_modules') continue
      const p = join(dir, e)
      const childRel = rel ? `${rel}/${e}` : e
      let dirFlag = false
      try {
        dirFlag = statSync(p).isDirectory()
      } catch {
        continue
      }
      if (dirFlag) {
        if (!rel && SKIP_TREES.has(e)) continue
        if (!isFrameworkSegment(e) && !ALPHANUMERIC_NAME.test(e)) pushFolder(childRel, e)
        walk(p, childRel)
      } else {
        const stem = alphanumericFileStem(e)
        if (stem === null) continue
        if (ALPHANUMERIC_FACE_STEMS.has(stem)) continue
        if (ALPHANUMERIC_LEAF_STEMS.has(stem)) continue
        if (!ALPHANUMERIC_NAME.test(stem)) pushFile(childRel, stem)
      }
    }
  }
  walk(root, '')
  return out
}

// `seed.ts` is LAWFUL, not stray. The trinity-filename law names the set {index, test, SKILL} + seed,
// and 208 atoms carry one — 193 of them since 2026-06-04. Counting it applied the same defect the
// comment below already argues against for generated files: it is one-per-atom BY CONSTRUCTION, so
// counting it makes the down-only ratchet grow with the corpus, which is the opposite of its intent.
// Two laws disagreed and the ratchet silently accumulated the difference; this is the realisation
// that tightens the gate rather than a relaxation of it.
const PERMITTED_TS = new Set(['index.ts', 'test.ts', 'seed.ts'])
// Generated derivations (AUTO-GENERATED, regenerated on demand) — never agent-authored strays:
// `*.generated.ts`, the per-atom translations projection, the translations catalogue aggregate,
// and the skills index bundle. They are one-per-atom by construction, so counting them as strays
// makes the down-only ratchet grow with the corpus — the opposite of its intent.
const GENERATED_TS = /^(translations|catalogue|skills\.index)\.ts$|\.generated\.ts$/i
const NON_TS_PROGRAMMING_EXT = /\.(js|mjs|cjs|jsx|tsx|vue|py|sh|rs|mts)$/i

export interface StrayTsViolation {
  readonly atomPath: string
  readonly file: string
  readonly law: 'stray-ts'
  readonly reason: string
}

export interface TsOnlyViolation {
  readonly relPath: string
  readonly file: string
  readonly ext: string
  readonly law: 'ts-only'
  readonly reason: string
}

/**
 * Every non-.ts programming-language file under src/ — except the framework's namespace.
 * Next.js REQUIRES page.tsx/layout.tsx under `app/` ([[rules]]/echo learned this: a gate
 * that flags a framework convention demands a refactoring the framework forbids), so the
 * `app/` and `migrations/` trees are outside this axis, exactly as strayTsViolations skips them.
 */
export function nonTsLanguageViolations(cwd: string = process.cwd()): TsOnlyViolation[] {
  const root = join(cwd, 'src')
  const out: TsOnlyViolation[] = []
  const walk = (dir: string, rel: string): void => {
    let entries: string[]
    try {
      entries = readdirSync(dir).sort()
    } catch {
      return
    }
    for (const e of entries) {
      if (e.startsWith('.') || e === 'node_modules') continue
      const p = join(dir, e)
      const childRel = rel ? `${rel}/${e}` : e
      if (isDir(p)) {
        if (!rel && SKIP_TREES.has(e)) continue
        walk(p, childRel)
        continue
      }
      const m = e.match(NON_TS_PROGRAMMING_EXT)
      if (!m) continue
      out.push({
        relPath: childRel,
        file: e,
        ext: m[1]!.toLowerCase(),
        law: 'ts-only',
        reason: `non-TypeScript source ${e} — corpus allows only .ts named index.ts or test.ts`,
      })
    }
  }
  walk(root, '')
  return out
}

/**
 * Every non-permitted `.ts` sibling under `src/` — full tree walk.
 * Framework trees `app/` · `migrations/` skipped. Emit `*.generated.ts` exempt.
 */
export function strayTsViolations(cwd: string = process.cwd()): StrayTsViolation[] {
  const root = join(cwd, 'src')
  const out: StrayTsViolation[] = []
  const walk = (dir: string, rel: string): void => {
    let entries: string[]
    try {
      entries = readdirSync(dir).sort()
    } catch {
      return
    }
    for (const e of entries) {
      if (e.startsWith('.') || e === 'node_modules') continue
      const p = join(dir, e)
      if (isDir(p)) {
        if (!rel && SKIP_TREES.has(e)) continue
        walk(p, rel ? `${rel}/${e}` : e)
        continue
      }
      if (!e.endsWith('.ts')) continue
      if (PERMITTED_TS.has(e)) continue
      if (GENERATED_TS.test(e)) continue
      out.push({
        atomPath: rel || '.',
        file: e,
        law: 'stray-ts',
        reason: 'stray .ts sibling — only index.ts, test.ts and seed.ts permitted; nest child atom or fold into index.ts',
      })
    }
  }
  walk(root, '')
  return out
}
