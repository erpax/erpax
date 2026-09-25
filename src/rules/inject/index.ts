import { existsSync, readFileSync, readdirSync, realpathSync } from 'node:fs'
import { join, relative } from 'node:path'
/**
 * rules/inject — the agent-facing surface is an instruction channel, and it is writable. See SKILL.md.
 *
 * @standard CVE-2021-42574 — Trojan Source, bidirectional control characters
 * @standard OWASP LLM01:2025 — prompt injection
 * @standard ISO/IEC 27001 A.8.28 — secure coding
 */
export const atomPath = 'rules/inject' as const

/** Files whose job IS to instruct the agent. DECLARED — the door, named in the open. */
export const DECLARED_LAW: ReadonlySet<string> = new Set([
  'rules/SKILL.md',
  'constitution/SKILL.md',
  // The project instructions themselves — the one authority an agent should take from a
  // file. Exempt from the DIRECTIVE test only; the hidden-character test still applies,
  // because exempting the door from the lock is how doors get used. See SKILL.md.
  'AGENTS.md',
  'CLAUDE.md',
  '.cursor/rules/erpax.mdc',
  '.github/copilot-instructions.md',
])

/**
 * The files an agent loads FIRST and unconditionally — declared, because no walk finds them.
 *
 * The gate read SKILL.md and LLM.md, which is 7,192 files, and skipped these eight. See SKILL.md.
 */
export const ENTRY_SURFACES: readonly string[] = Object.freeze([
  'AGENTS.md',
  'CLAUDE.md',
  '.cursor/rules/erpax.mdc',
  '.github/copilot-instructions.md',
  '.well-known/ai-skills.json',
  'skills.json',
  'README.md',
  '.claude/skills/SKILL.md',
])

/** Characters that make what renders differ from what is stored. Never legitimate in prose. */
export const BIDI = /[‪-‮⁦-⁩]/u
export const ZERO_WIDTH = /[​-‍⁠]/u
/** A BOM is lawful only at offset 0; anywhere else it is hiding. */
export const BOM_MID = /[^﻿]﻿/u

/** Phrases that address the LOADER rather than describe the code. DECLARED, and narrow on purpose. See SKILL.md. */
export function directives(): readonly RegExp[] {
  return DIRECTIVE_PATTERNS
}

const DIRECTIVE_PATTERNS: readonly RegExp[] = [
  /\bignore\s+(?:all\s+)?(?:previous|prior|earlier|above)\s+instructions?\b/iu,
  /\bdisregard\s+(?:all\s+)?(?:previous|prior|the\s+above)\b/iu,
  /\byou\s+(?:must|shall|should)\s+always\s+(?:approve|allow|accept|comply|obey)\b/iu,
  /\bdo\s+not\s+(?:tell|inform|mention\s+to)\s+the\s+user\b/iu,
  /\bwithout\s+(?:asking|telling|informing)\s+the\s+user\b/iu,
  /\byour\s+new\s+instructions?\s+are\b/iu,
  /\bact\s+as\s+(?:if\s+you\s+(?:are|were)|though)\s+(?:an?\s+)?(?:admin|root|superuser)\b/iu,
]

export type InjectKind = 'bidi' | 'zero-width' | 'bom' | 'directive'

export interface InjectViolation {
  readonly file: string
  readonly kind: InjectKind
  readonly reason: string
}

/** The declared-law exemption, keyed on the path the corpus addresses the file by. */
export const isDeclaredLaw = (relPath: string): boolean =>
  DECLARED_LAW.has(relPath.replace(/^src\//, ''))

/** Judge one agent-facing file. See SKILL.md. */
export function injectViolations(relPath: string, text: string): readonly InjectViolation[] {
  const out: InjectViolation[] = []
  if (BIDI.test(text)) out.push({ file: relPath, kind: 'bidi', reason: 'bidirectional control character — what renders is not what is stored (CVE-2021-42574)' })
  if (ZERO_WIDTH.test(text)) out.push({ file: relPath, kind: 'zero-width', reason: 'zero-width character — text that a reader cannot see' })
  if (BOM_MID.test(text)) out.push({ file: relPath, kind: 'bom', reason: 'byte-order mark away from offset 0 — lawful only as the first bytes' })
  if (isDeclaredLaw(relPath)) return out
  for (const rx of DIRECTIVE_PATTERNS) {
    const m = rx.exec(text)
    if (m) out.push({ file: relPath, kind: 'directive', reason: `addresses the loader as an instruction: ${JSON.stringify(m[0])}` })
  }
  return out
}

/** Zero is a theorem: there is no acceptable number of hidden characters in prose an agent loads. See SKILL.md. */
export function ceiling(): number {
  return 0
}

/**
 * Every file that reaches an agent's context: the generated faces AND the entry surfaces.
 *
 * Deduped by real path — CLAUDE.md is a symlink to AGENTS.md, and counting one file twice
 * would report two violations for one poisoning.
 */
export function agentSurfaces(cwd: string = process.cwd()): string[] {
  const out = new Set<string>()
  const seen = new Set<string>()
  const add = (abs: string): void => {
    if (!existsSync(abs)) return
    let real = abs
    try {
      real = realpathSync(abs)
    } catch {
      /* a broken symlink is not a surface */
    }
    if (seen.has(real)) return
    seen.add(real)
    out.add(relative(cwd, abs))
  }
  for (const e of ENTRY_SURFACES) add(join(cwd, e))
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
      else if (e.name === 'SKILL.md' || e.name === 'LLM.md') add(p)
    }
  }
  walk(join(cwd, 'src'))
  return [...out].sort()
}

/** Judge every agent-facing surface. Zero is a theorem. See SKILL.md. */
export function scanInjection(cwd: string = process.cwd()): readonly InjectViolation[] {
  const out: InjectViolation[] = []
  for (const rel of agentSurfaces(cwd)) {
    let text: string
    try {
      text = readFileSync(join(cwd, rel), 'utf8')
    } catch {
      continue
    }
    out.push(...injectViolations(rel, text))
  }
  return out
}

/** Fails closed on any poisoned surface. See SKILL.md. */
export function assertNoInjection(cwd: string = process.cwd()): void {
  const v = scanInjection(cwd)
  if (v.length === 0) return
  throw new Error(
    `\u2716 rules/inject — ${v.length} poisoned agent surface(s):\n` +
      v.map((x) => `  ${x.file} — ${x.kind}: ${x.reason}`).join('\n'),
  )
}
