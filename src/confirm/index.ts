/**
 * confirm/uuid — the uuid-pure gate stack (substrate-independent).
 *
 * Law: **all is passed with uuids without payload** — seal, verify, and pass gates
 * using content-uuids alone. No `payload generate:types`, no D1, no `@payloadcms/ui`
 * CSS chain. [[payload]] is one deployment face (plugin dimension); the uuid layer
 * is substrate-independent and must pass first.
 *
 * Gates (fail-closed AND — each is a [[guardian]] axis crossed into one [[seal]]):
 *   aura · folders · imports · typecheck (uuid subset) · readme:check · boundary digest
 *   · diamond verify · cloudflare:ai · typography
 *
 *   pnpm confirm:uuid
 *
 * @standard ISO/IEC 25010:2023 §5.5 testability — gate decisions are pure fns + shell only where unavoidable
 * @see ./SKILL.md — ../seal — ../integrity — ../purity — ../quantum/uuid — ../../scripts/pre-push-uuid.sh
 */
import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { guardian, type GuardianVerdict } from '@/guardian'
import { seal, type SealVerdict } from '@/seal'
import { folderViolations, folderGuardians } from '@/law/folder'
import { nonIndexImports } from '@/tamper/import'
import { boundaryDigest } from '@/quantum/boundary'
import {
  generateReadme,
  verifyFolderReadmes,
  listAtomPaths,
  buildReadmeTypographyGraph,
  loadSkillPages,
} from '@/readme'
import { deriveDiamond, verifyDiamond, diamondUuid } from '@/diamond'
import {
  formViolations,
  typographyGuardian,
  TYPOGRAPHY_BASELINE,
  buildIndex,
} from '@/typography'
import { verifyAiBindingDiamonds } from '@/cloudflare/ai'

/** Aligned with src/convention/import/gate.mjs — ratchet ceiling on deep `@/` imports. */
export const IMPORT_PURITY_BASELINE = 0

/** Uuid-pure law atoms whose diamonds must verify sealed on every uuid-only pass. */
export const DIAMOND_LAW_ATOMS = ['integrity', 'typography'] as const

export interface UuidGateResult {
  readonly axis: string
  readonly ok: boolean
  readonly reason: string
}

export interface UuidConfirmResult {
  readonly sealed: boolean
  readonly gates: readonly UuidGateResult[]
  readonly seal: SealVerdict
  readonly reason: string
}

/** Aura gap=0 — dead [[link]]s forbidden (speech twin, no Payload). */
export function gateAura(cwd: string = process.cwd()): UuidGateResult {
  try {
    const out = execSync('node src/aura/scan.mjs', { cwd, stdio: ['ignore', 'pipe', 'pipe'] }).toString()
    const m = /gap = (\d+)/.exec(out)
    const gap = m ? Number(m[1]) : Number.NaN
    const ok = gap === 0
    return {
      axis: 'aura',
      ok,
      reason: Number.isFinite(gap)
        ? ok
          ? 'aura gap=0 — every [[link]] resolves'
          : `aura gap=${gap} — dead [[link]](s); run: pnpm aura:scan`
        : 'aura scan output missing gap score — cannot run (DENY)',
    }
  } catch (e) {
    return {
      axis: 'aura',
      ok: false,
      reason: 'aura scan failed — ' + ((e as Error).message?.split('\n')[0] ?? 'cannot run (DENY)'),
    }
  }
}

/** Folder-shape law — NAME + TRINITY guardians (ratchet, no Payload). */
export function gateFolders(): UuidGateResult {
  const v = folderViolations()
  const verdict = folderGuardians(v)
  return {
    axis: 'folders',
    ok: verdict.sealed,
    reason: verdict.sealed ? verdict.reason : verdict.reason.split('\n')[0] ?? 'folder law UNSEALED',
  }
}

/** Import-purity ratchet — index-only `@/` entanglements (no Payload). */
export function gateImports(): UuidGateResult {
  try {
    const violations = nonIndexImports().length
    const g = guardian({ axis: 'imports', violations, baseline: IMPORT_PURITY_BASELINE })
    return { axis: 'imports', ok: g.ok, reason: g.reason }
  } catch (e) {
    return {
      axis: 'imports',
      ok: false,
      reason: 'import scan failed — ' + ((e as Error).message?.split('\n')[0] ?? 'cannot run (DENY)'),
    }
  }
}

/** Typecheck the uuid substrate — compile-load confirm; no `payload generate:types`. */
export function gateTypecheck(cwd: string = process.cwd()): UuidGateResult {
  try {
    execSync('pnpm exec tsx -e "import \'./src/confirm/gates.ts\'"', {
      cwd,
      stdio: ['ignore', 'pipe', 'pipe'],
    })
    return {
      axis: 'typecheck',
      ok: true,
      reason: 'uuid-substrate compile-load green (src/confirm — no Payload typegen)',
    }
  } catch (e) {
    const err =
      (e as { stdout?: Buffer; stderr?: Buffer }).stdout?.toString() ||
      (e as { stderr?: Buffer }).stderr?.toString() ||
      (e as Error).message
    return {
      axis: 'typecheck',
      ok: false,
      reason: 'uuid-substrate compile-load FAIL — ' + err.trim().split('\n').slice(-3).join(' / '),
    }
  }
}

/** Readme accounting — root + folder READMEs ≡ regenerated (content-uuid drift gate). */
export function gateReadme(cwd: string = process.cwd()): UuidGateResult {
  const expectedRoot = generateReadme(cwd)
  let failed = false
  const reasons: string[] = []
  try {
    const actualRoot = readFileSync(join(cwd, 'README.md'), 'utf8')
    if (actualRoot !== expectedRoot) {
      failed = true
      reasons.push('root README drift')
    }
  } catch {
    failed = true
    reasons.push('root README missing')
  }
  const { ok, drift } = verifyFolderReadmes(cwd)
  if (!ok) {
    failed = true
    reasons.push(`${drift.length} folder README(s) drift`)
  }
  return {
    axis: 'readme:check',
    ok: !failed,
    reason: failed
      ? reasons.join('; ') + ' — run: pnpm readme'
      : `readme:check green — root + ${listAtomPaths(cwd).length} folder READMEs ≡ regenerated`,
  }
}

/** Boundary digest — corpus-wide escape count held at import baseline (computed uuid layer). */
export function gateBoundary(cwd: string = process.cwd()): UuidGateResult {
  try {
    const d = boundaryDigest(join(cwd, 'src'))
    const g = guardian({ axis: 'boundary', violations: d.escapes, baseline: IMPORT_PURITY_BASELINE })
    return {
      axis: 'boundary',
      ok: g.ok,
      reason: g.ok
        ? `boundary digest — ${d.files} files · ${d.escapes} escapes · ${d.uniqueBarrels} barrels`
        : g.reason,
    }
  } catch (e) {
    return {
      axis: 'boundary',
      ok: false,
      reason: 'boundary digest failed — ' + ((e as Error).message?.split('\n')[0] ?? 'cannot run (DENY)'),
    }
  }
}

/** Diamond verify — unified graph root is stable; law atoms pass verifyDiamond (no Payload). */
export function gateDiamond(cwd: string = process.cwd()): UuidGateResult {
  try {
    const graphA = buildReadmeTypographyGraph(cwd)
    const graphB = buildReadmeTypographyGraph(cwd)
    if (!graphA.root || !/^[0-9a-f-]{36}$/.test(graphA.root)) {
      return { axis: 'diamond', ok: false, reason: 'typography graph root missing or invalid — diamond unsealed' }
    }
    if (graphA.root !== graphB.root) {
      return { axis: 'diamond', ok: false, reason: 'typography graph root not deterministic — diamond drift' }
    }
    const broken: string[] = []
    for (const atom of DIAMOND_LAW_ATOMS) {
      const v = verifyDiamond(deriveDiamond(atom, cwd))
      if (!v.sealed) broken.push(`${atom}: ${v.impurities.join(', ') || 'unsealed'}`)
    }
    return {
      axis: 'diamond',
      ok: broken.length === 0,
      reason:
        broken.length === 0
          ? `diamond verify — ${DIAMOND_LAW_ATOMS.join(' · ')} sealed · graph root ${graphA.root}`
          : 'diamond impurities — ' + broken.join('; '),
    }
  } catch (e) {
    return {
      axis: 'diamond',
      ok: false,
      reason: 'diamond verify failed — ' + ((e as Error).message?.split('\n')[0] ?? 'cannot run (DENY)'),
    }
  }
}

/** Typography — index root deterministic + form guardian ratchet (no Payload). */
export function gateTypography(cwd: string = process.cwd()): UuidGateResult {
  try {
    const pages = loadSkillPages(cwd)
    const idxA = buildIndex(pages)
    const idxB = buildIndex(pages)
    if (idxA.root !== idxB.root) {
      return { axis: 'typography', ok: false, reason: 'typography index root not deterministic — drift' }
    }
    const pathset = new Set<string>()
    const leaf = new Set<string>()
    for (const sk of pages) {
      pathset.add(sk.path.toLowerCase())
      leaf.add((sk.path.split('/').pop() ?? sk.path).toLowerCase())
    }
    const resolves = (target: string): boolean => {
      const t = target.trim().toLowerCase()
      return t.includes('/') ? pathset.has(t) : leaf.has(t)
    }
    const formOnly = formViolations(pages, resolves).filter((v) =>
      v.reasons.some((r) => r !== 'no-frontmatter' && !r.startsWith('dead-link:')),
    )
    const verdict = typographyGuardian(formOnly.length, TYPOGRAPHY_BASELINE)
    const sample = deriveDiamond('typography', cwd)
    return {
      axis: 'typography',
      ok: verdict.sealed && !!idxA.root,
      reason: verdict.sealed
        ? `typography sealed — index root ${idxA.root} · diamond ${diamondUuid(sample)}`
        : verdict.reason,
    }
  } catch (e) {
    return {
      axis: 'typography',
      ok: false,
      reason: 'typography gate failed — ' + ((e as Error).message?.split('\n')[0] ?? 'cannot run (DENY)'),
    }
  }
}

/** Cloudflare AI bindings — wrangler ai/vectorize/RAG stack diamonds seal without Payload. */
export function gateCloudflareAi(cwd: string = process.cwd()): UuidGateResult {
  try {
    const text = readFileSync(join(cwd, 'wrangler.jsonc'), 'utf8')
    const verdict = verifyAiBindingDiamonds(text)
    return {
      axis: 'cloudflare:ai',
      ok: verdict.ok,
      reason: verdict.ok
        ? `cloudflare:ai sealed — ${verdict.count} AI-stack binding diamond(s)`
        : `cloudflare:ai FAIL — ${verdict.broken} broken diamond(s)`,
    }
  } catch (e) {
    return {
      axis: 'cloudflare:ai',
      ok: false,
      reason: 'cloudflare:ai gate failed — ' + ((e as Error).message?.split('\n')[0] ?? 'wrangler.jsonc missing'),
    }
  }
}

/** Run every uuid-pure gate; default order is cheapest-first where practical. */
export function uuidGates(cwd: string = process.cwd()): readonly UuidGateResult[] {
  return [
    gateAura(cwd),
    gateFolders(),
    gateImports(),
    gateTypecheck(cwd),
    gateReadme(cwd),
    gateBoundary(),
    gateDiamond(cwd),
    gateCloudflareAi(cwd),
    gateTypography(cwd),
  ]
}

/** Cross uuid gates into one seal verdict — fail-closed on empty. */
export function uuidConfirm(cwd: string = process.cwd()): UuidConfirmResult {
  const gates = uuidGates(cwd)
  const guardians: GuardianVerdict[] = gates.map((g) =>
    guardian({ axis: g.axis, violations: g.ok ? 0 : 1, baseline: 0 }),
  )
  const sealVerdict = seal(guardians)
  return {
    sealed: sealVerdict.sealed,
    gates,
    seal: sealVerdict,
    reason: sealVerdict.reason,
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const cwd = process.cwd()
  const { sealed, gates } = uuidConfirm(cwd)
  console.log('confirm:uuid — substrate-independent seal (no Payload typegen)\n')
  for (const g of gates) {
    const mark = g.ok ? '✓' : '✗'
    console.log(`  ${mark} ${g.axis.padEnd(14)} ${g.reason}`)
  }
  console.log(
    sealed
      ? '\n✓ confirmed:uuid — all gates green (content-uuid layer; Payload optional)'
      : '\n✗ NOT confirmed:uuid — fix the failing gate(s) above',
  )
  process.exit(sealed ? 0 : 1)
}
