/**
 * rules/inject — the agent-facing surface is an instruction channel, and it is writable. See SKILL.md.
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
