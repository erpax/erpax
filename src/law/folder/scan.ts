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
      const missing = TRINITY.filter((f) => !files.has(f))
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
        if (!ALPHANUMERIC_NAME.test(stem)) pushFile(childRel, stem)
      }
    }
  }
  walk(root, '')
  return out
}
