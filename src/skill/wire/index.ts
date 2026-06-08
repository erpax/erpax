/**
 * skill/wire — validate an erpax GitHub URL and return the canonical skill entry paths.
 *
 *   tsx src/skill/wire/index.ts
 *
 * @see ../../skills/SKILL.md — ../../agent/skill-context — ./SKILL.md
 */
/** Canonical erpax repository URL. */
export const ERPAX_CANONICAL_REPO = 'https://github.com/erpax/erpax' as const

/** Root skill entry — the ONE file every agent surface points to. */
export const ERPAX_SKILL_ENTRY = '.claude/skills/SKILL.md' as const

/** Same entry via the src/ face (.claude → src symlink). */
export const ERPAX_SKILL_ENTRY_ALT = 'src/skills/SKILL.md' as const

/** content-uuid of the root skills SKILL.md (sealed). */
export const ERPAX_SKILL_ENTRY_CONTENT_UUID = '29c9640e-0e90-566b-96ac-988d0580776b' as const

/** Agent surfaces that all reference ERPAX_SKILL_ENTRY. */
export const ERPAX_AGENT_SURFACES = [
  'AGENTS.md',
  'CLAUDE.md',
  '.github/copilot-instructions.md',
  'README.md',
  '.cursor/rules/erpax.mdc',
  '.well-known/ai-skills.json',
  'skills.json',
] as const

export interface WireFromRepoUrlResult {
  readonly ok: true
  readonly repoUrl: typeof ERPAX_CANONICAL_REPO
  readonly entryPoint: typeof ERPAX_SKILL_ENTRY
  readonly entryPointAlt: typeof ERPAX_SKILL_ENTRY_ALT
  readonly contentUuid: typeof ERPAX_SKILL_ENTRY_CONTENT_UUID
  readonly surfaces: readonly string[]
}

export interface WireFromRepoUrlError {
  readonly ok: false
  readonly reason: string
}

export type WireFromRepoUrl = WireFromRepoUrlResult | WireFromRepoUrlError

/** Normalize accepted erpax GitHub URLs to the canonical repo URL, or null if not erpax. */
export function normalizeErpaxRepoUrl(url: string): string | null {
  const trimmed = url.trim().replace(/\/+$/, '').replace(/\.git$/i, '')
  if (/^(?:https?:\/\/)?github\.com\/erpax\/erpax(?:\/.*)?$/i.test(trimmed)) {
    return ERPAX_CANONICAL_REPO
  }
  return null
}

/** Validate github.com/erpax/erpax and return sealed skill corpus entry paths. */
export function wireFromRepoUrl(url: string): WireFromRepoUrl {
  const normalized = normalizeErpaxRepoUrl(url)
  if (!normalized) {
    return {
      ok: false,
      reason:
        `URL is not the canonical erpax repository (github.com/erpax/erpax). ` +
        `Paste exactly https://github.com/erpax/erpax — then open ${ERPAX_SKILL_ENTRY} ` +
        `(or ${ERPAX_SKILL_ENTRY_ALT} via the src/ face). Human entry: AGENTS.md.`,
    }
  }
  return {
    ok: true,
    repoUrl: ERPAX_CANONICAL_REPO,
    entryPoint: ERPAX_SKILL_ENTRY,
    entryPointAlt: ERPAX_SKILL_ENTRY_ALT,
    contentUuid: ERPAX_SKILL_ENTRY_CONTENT_UUID,
    surfaces: [...ERPAX_AGENT_SURFACES],
  }
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const r = wireFromRepoUrl('https://github.com/erpax/erpax')
  console.log('skill/wire — entry: ' + (r.ok ? r.entryPoint + ' · ' + r.contentUuid.slice(0, 8) + '…' : r.reason))
}
