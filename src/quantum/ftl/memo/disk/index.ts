/**
 * quantum/ftl/memo/disk — the verdict sealed across processes, keyed on the content git already holds.
 *
 * The in-process memo takes a re-ask to zero WITHIN one run. A fresh process — every CI job, every
 * pre-push — still pays the first ask in full, and this is what makes that free too. See ./SKILL.md.
 *
 * @standard ISO/IEC 25010:2023 §5.6 — maintainability: one truth, one address
 */
import { spawnSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

/** Bump to invalidate every sealed verdict when the cache's own shape changes. */
const FORMAT = 'v2'

/** The surface most gates read. A gate reading wider must SAY so — see {@link contentKey}. */
const DEFAULT_SURFACE = ['src'] as const

/**
 * The address, cached per (cwd, surface) for this process.
 *
 * Measured at 224–290 ms a call, and `sealed` pays it per LABEL: six sealed gates spent ~1.5 s
 * computing the same address six times, which is more than two of them spend computing their answer.
 * The memo is what makes sealing a cheap gate a saving instead of a pessimisation.
 *
 * The contract it buys is explicit: a process that rewrites the tree and re-asks must call
 * {@link forgetContentKeys}. Nothing in this repo does — the auto-heal regens run as separate
 * processes, and the generated faces they write are gitignored, so they never moved this address
 * anyway — and a test that edits a fixture calls it.
 */
const addresses = new Map<string, string | null>()

/**
 * Where a verdict is sealed. Under `node_modules`, so it is gitignored by construction and a fresh
 * install wipes it — which is the conservative direction: a dependency change may change what a
 * parse-based gate sees, and losing the cache costs time while keeping a stale one costs correctness.
 */
const cacheDir = (cwd: string): string => join(cwd, 'node_modules/.cache/erpax-memo')

const git = (cwd: string, args: readonly string[]): string => {
  const r = spawnSync('git', [...args], { cwd, encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 })
  return r.status === 0 && typeof r.stdout === 'string' ? r.stdout : ''
}

/**
 * The content address of the `src` surface, from what git already knows — **null when it cannot be
 * established**.
 *
 * Git stores a hash per tracked blob, so this needs no file reads: `ls-files -s` is the committed and
 * staged content, `diff` is every working-tree change, and `ls-files --others` plus a hash is the
 * untracked file that neither of the first two can see. ~267 ms for the whole surface, against the
 * ~7.4 s the gates spend parsing it. `pnpm-lock.yaml` is included because these gates parse with
 * `typescript`, so the installed compiler is an input to their verdict.
 *
 * Returning **null** rather than a constant is the load-bearing part: in a tarball with no `.git`,
 * every git call yields nothing, and a key that cannot see its inputs would seal one verdict forever.
 * `scripts/payload-input-key.sh` states the same law for `migrate:status` — never memoise on a key
 * that cannot see what the answer depends on.
 *
 * @invariant a tree with no git metadata yields null, never a shared constant
 */
export function contentKey(cwd: string = process.cwd(), surface: readonly string[] = DEFAULT_SURFACE): string | null {
  const memoKey = `${cwd}\u0000${surface.join(',')}`
  const hit = addresses.get(memoKey)
  if (hit !== undefined) return hit
  const value = computeContentKey(cwd, surface)
  addresses.set(memoKey, value)
  return value
}

/** Drop every cached address — a process that CHANGES the tree and re-asks must call this. */
export function forgetContentKeys(): void {
  addresses.clear()
}

function computeContentKey(cwd: string, surface: readonly string[]): string | null {
  const spec = [...surface]
  const tracked = git(cwd, ['ls-files', '-s', '--', ...spec])
  if (tracked.trim() === '') return null // no git, or an empty surface — the address is unknowable
  const h = createHash('sha256')
  h.update(FORMAT)
  // The surface is part of the address: two gates reading different trees must never collide on one
  // key, and a widened surface must invalidate what a narrower one sealed.
  h.update(spec.join(','))
  h.update(tracked)
  h.update(git(cwd, ['diff', '--', ...spec]))
  for (const f of git(cwd, ['ls-files', '--others', '--exclude-standard', '--', ...spec]).split('\n')) {
    const rel = f.trim()
    if (rel === '') continue
    h.update(rel)
    try {
      h.update(readFileSync(join(cwd, rel)))
    } catch {
      h.update('::unreadable')
    }
  }
  try {
    h.update(readFileSync(join(cwd, 'pnpm-lock.yaml')))
  } catch {
    h.update('::no-lock')
  }
  return h.digest('hex').slice(0, 32)
}

const fileFor = (label: string, cwd: string): string =>
  join(cacheDir(cwd), `${label.replace(/[^A-Za-z0-9._-]/g, '_')}.json`)

/**
 * The verdict sealed at this address, or `undefined` for a miss.
 *
 * Every failure mode of the cache is a MISS, never a wrong answer or a throw: absent, unreadable,
 * malformed, or written under an older `FORMAT`.
 *
 * @invariant a null key never touches the disk
 * @invariant a malformed cache file is a miss, never an exception
 */
export function readSealed<T>(label: string, key: string | null, cwd: string = process.cwd()): T | undefined {
  if (key === null) return undefined
  try {
    const s = JSON.parse(readFileSync(fileFor(label, cwd), 'utf8')) as {
      format?: string
      key?: string
      value?: T
    }
    return s.format === FORMAT && s.key === key ? s.value : undefined
  } catch {
    return undefined
  }
}

/**
 * Seal a verdict at this address. An unwritable cache costs time, never correctness.
 *
 * @invariant a null key never writes
 */
export function writeSealed(label: string, key: string | null, value: unknown, cwd: string = process.cwd()): void {
  if (key === null) return
  try {
    mkdirSync(cacheDir(cwd), { recursive: true })
    writeFileSync(fileFor(label, cwd), JSON.stringify({ format: FORMAT, key, value }))
  } catch {
    // an unwritable cache is not a failure of the gate
  }
}

/** True when a verdict for this label is sealed at this address. For tests and for a receipt. */
export function isSealed(label: string, key: string | null, cwd: string = process.cwd()): boolean {
  if (key === null) return false
  try {
    const f = fileFor(label, cwd)
    if (!existsSync(f)) return false
    const s = JSON.parse(readFileSync(f, 'utf8')) as { format?: string; key?: string }
    return s.format === FORMAT && s.key === key
  } catch {
    return false
  }
}
