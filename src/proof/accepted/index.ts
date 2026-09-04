import { execFileSync } from 'node:child_process'
import { existsSync, readdirSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'

/**
 * proof/accepted — a `.lean` file is what the kernel accepts, or it is scaffolding wearing the word.
 *
 * @see ./SKILL.md
 */

export interface KernelVerdict {
  readonly file: string
  /** Did the kernel accept the file at all? */
  readonly accepted: boolean
  /** Declarations the compiler itself reports as using `sorry` — counted from its output, not grepped. */
  readonly sorries: number
  /** The first error, when rejected — so a reader is not sent to run it themselves. */
  readonly error: string | null
}

/** Where a kernel might be. Absence is reported, never treated as a pass. */
const LEAN = ['/opt/homebrew/bin/lean', '/usr/local/bin/lean', '/usr/bin/lean']

export const kernelPath = (): string | null => LEAN.find(existsSync) ?? null

/** Every `.lean` under `src`, excluding build output. */
export function leanFiles(cwd: string = process.cwd()): string[] {
  const out: string[] = []
  const walk = (d: string): void => {
    let entries: import('node:fs').Dirent[]
    try {
      entries = readdirSync(d, { withFileTypes: true })
    } catch {
      return
    }
    for (const e of entries) {
      if (e.name.startsWith('.') || e.name === 'node_modules') continue
      const p = join(d, e.name)
      if (e.isDirectory()) walk(p)
      else if (e.name.endsWith('.lean')) out.push(p)
    }
  }
  walk(join(cwd, 'src'))
  return out.sort()
}

/**
 * Ask the kernel, and read its own report.
 *
 * `sorry` is counted from the compiler's `declaration uses 'sorry'` warnings rather than by grepping
 * the source, because a comment saying "no sorry" contains the word — the false positive three
 * sibling repos each paid for separately in one day ([[rules]]/forge learned it too).
 */
export function kernelVerdict(file: string, cwd: string = process.cwd()): KernelVerdict {
  const lean = kernelPath()
  if (lean === null) throw new Error('✖ no Lean kernel on this machine — a verification gate with no verifier cannot report green')
  const rel = relative(cwd, file)
  let output = ''
  let accepted = true
  try {
    output = execFileSync(lean, [file.slice(file.lastIndexOf('/') + 1)], {
      cwd: dirname(file),
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
      timeout: 120_000,
    })
  } catch (e) {
    accepted = false
    const err = e as { stdout?: string; stderr?: string; message?: string }
    output = `${err.stdout ?? ''}${err.stderr ?? ''}` || String(err.message ?? '')
  }
  const sorries = (output.match(/declaration uses ['`]sorry['`]/g) ?? []).length
  const error = accepted ? null : (output.split('\n').find((l) => l.includes('error')) ?? output.split('\n')[0] ?? null)
  return { file: rel, accepted, sorries, error }
}

/**
 * Files that are not proofs: rejected by the kernel, or carrying `sorry`.
 *
 * A file accepted WITH sorry warnings is still not a proof — the kernel compiled it and told you the
 * declarations are unproven, which is the case most likely to be read as success.
 */
export function unacceptedProofs(cwd: string = process.cwd()): KernelVerdict[] {
  return leanFiles(cwd)
    .map((f) => kernelVerdict(f, cwd))
    .filter((v) => !v.accepted || v.sorries > 0)
}

/**
 * Fails closed on getting worse — and fails closed when it cannot run at all.
 *
 * A verification gate with no verifier reporting green is the exact defect this corpus spent a day
 * on: a check that cannot fire reads as a check that passed.
 */
export function assertProofsAccepted(cwd: string = process.cwd(), ceiling: number): void {
  if (kernelPath() === null) {
    throw new Error('✖ proof/accepted — no Lean kernel: this gate cannot run, so it must not pass')
  }
  const bad = unacceptedProofs(cwd)
  if (bad.length <= ceiling) return
  throw new Error(
    `✖ proof/accepted — ${bad.length} .lean file(s) the kernel does not accept as proof (ceiling ${ceiling}):\n` +
      bad
        .map((v) => `  ${v.file}  ${v.accepted ? `accepted, but ${v.sorries} declaration(s) use sorry` : `REJECTED — ${v.error}`}`)
        .join('\n'),
  )
}

if (import.meta.url === `file://${process.argv[1]}`) {
  if (kernelPath() === null) {
    console.log('proof/accepted — NO KERNEL on this machine; the gate cannot run and does not pass')
    process.exitCode = 1
  } else {
    const all = leanFiles().map((f) => kernelVerdict(f))
    const bad = all.filter((v) => !v.accepted || v.sorries > 0)
    console.log(`proof/accepted — ${bad.length} of ${all.length} .lean file(s) are not proofs`)
    for (const v of all) {
      const state = !v.accepted ? `REJECTED — ${v.error}` : v.sorries > 0 ? `${v.sorries} declaration(s) use sorry` : 'accepted, sorry-free'
      console.log(`  ${v.file.padEnd(30)} ${state}`)
    }
  }
}
