/**
 * rules/inject — the agent-facing surface is an instruction channel, and it is writable.
 *
 * 3,597 SKILL.md and 3,595 LLM.md files are loaded into an agent's context. LLM.md is GENERATED
 * from SKILL.md, so a line written once propagates into every future agent's context without
 * anybody writing it again. That is a supply chain, and it has no gate on it.
 *
 * THE THREAT IS NOT A KEYWORD. It is that corpus prose DESCRIBES and injected prose DIRECTS, and
 * the reader — an agent — cannot tell them apart by reading harder. So the gate measures the
 * distinguishable half: text addressed to the loader as an instruction, and characters that make
 * what renders differ from what is stored.
 *
 * HIDDEN CHARACTERS ARE THE SHARPER HALF. Trojan Source (CVE-2021-42574) uses bidirectional
 * controls to make a reviewer see one thing and the parser take another; zero-width characters hide
 * text entirely. Neither is ever legitimate in this corpus's prose, so zero is a theorem here and
 * not a ratchet — measured 2026-09-20 across 7,192 files: zero bidi, zero zero-width, zero mid-file
 * BOM.
 *
 * WHAT IT DELIBERATELY DOES NOT FLAG: the project's own laws. `src/rules/SKILL.md` says "this file
 * is in every agent's system prompt, so these bind the next agent as law" — and it is RIGHT to,
 * because a checked-in project instruction is the one authority an agent should take from a file.
 * The declared root is exempt for the same reason CLAUDE.md is: it is the door, not an intruder
 * through it.
 *
 * @standard CVE-2021-42574 — Trojan Source, bidirectional control characters
 * @standard OWASP LLM01:2025 — prompt injection
 * @standard ISO/IEC 27001 A.8.28 — secure coding
 */
export const atomPath = 'rules/inject' as const

/** Files whose job IS to instruct the agent. DECLARED — the door, named in the open. */
export const DECLARED_LAW: ReadonlySet<string> = new Set(['rules/SKILL.md', 'constitution/SKILL.md'])

/** Characters that make what renders differ from what is stored. Never legitimate in prose. */
export const BIDI = /[‪-‮⁦-⁩]/u
export const ZERO_WIDTH = /[​-‍⁠]/u
/** A BOM is lawful only at offset 0; anywhere else it is hiding. */
export const BOM_MID = /[^﻿]﻿/u

/**
 * Phrases that address the LOADER rather than describe the code.
 *
 * DECLARED, and narrow on purpose. A broad list flags the corpus describing its own defences —
 * "`--no-verify` was found on every push" is a finding, not an instruction — and a gate whose noise
 * floor sits above its signal is one nobody reads, which this corpus has paid for four times.
 */
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

/**
 * Judge one agent-facing file.
 *
 * Hidden characters are judged even in declared law — a project instruction has no more business
 * carrying a bidi override than any other file, and exempting the door from the lock is how doors
 * get used.
 */
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

/**
 * Zero is a theorem: there is no acceptable number of hidden characters in prose an agent loads.
 *
 * A function rather than a constant, for the reason [[matrix]] gives: an exported static is a value
 * a theorem could fold, and this one is folded here — there is nothing to configure, and a caller
 * that could read a different ceiling would imply one exists.
 */
export function ceiling(): number {
  return 0
}
