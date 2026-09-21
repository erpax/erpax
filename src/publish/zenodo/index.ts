/**
 * publish/zenodo — the deposit manifest, computed from the record it describes.
 *
 * `.zenodo.json` carried hand-typed counts and they drifted: it claimed 105 theorems across 12
 * files with 65 axiom-free and 4 `sorry` stubs, while the kernel reported 177 across 19 with 111
 * axiom-free and none stubbed. Four numbers, every one wrong, in the document a DOI is minted from.
 *
 * That is [[rules]]/drift exactly — prose may not restate a number the corpus computes — and it is
 * worse here than in a SKILL, because a Zenodo deposit is permanent and citable.
 *
 * So the narrative is a template and every quantity is a slot filled from the arbiter:
 * [[verify]]/inventory for the kernel census and the sources hash, package.json for the version,
 * the uuid matrix for the corpus size. The prose can be wrong about what a theorem MEANS; it can no
 * longer be wrong about how many there are.
 *
 * @standard ISO 26324 — DOI: assigned by a registration agency, never computed ([[rules]]/forge)
 * @standard ISO 19011:2018 §6.4 — audit evidence: the citation must lead to the evidence
 */
import { RATCHET_GENERATED } from '@/law/folder/ratchet.generated'
import { INVENTORY as inventory } from '@/verify/inventory'

export const atomPath = 'publish/zenodo' as const

/** Where the manifest lives — committed, because Zenodo reads it from the tagged tree. */
export const MANIFEST_PATH = '.zenodo.json' as const

export interface Census {
  readonly theorems: number
  readonly axiomFree: number
  readonly stubbed: number
  readonly files: number
  readonly sourcesHash: string
  readonly lean: string
  /** Down-only guardians in the sealed ratchet — the corpus's own enforcement surface. */
  readonly guardians: number
  /** Guardians whose ceiling is ZERO: a theorem, not a tolerance. */
  readonly theoremCeilings: number
  readonly ratchetUuid: string
  readonly ratchetSealed: string
  /** The zero-ceiling axes BY NAME — a deposit is permanent, so an example in it must be the real one. */
  readonly theoremAxes: readonly string[]
}

/** The kernel's own numbers, read from the emitted record. Never typed. */
export function census(): Census {
  const inv = inventory as unknown as {
    census: { theorems: number; axiomFree: number; stubbed: number }
    files: readonly unknown[]
    sourcesHash: string
    lean: string
  }
  const axes = Object.values(RATCHET_GENERATED.axes) as number[]
  return {
    theorems: inv.census.theorems,
    axiomFree: inv.census.axiomFree,
    stubbed: inv.census.stubbed,
    files: inv.files.length,
    sourcesHash: inv.sourcesHash,
    lean: inv.lean,
    guardians: axes.length,
    theoremCeilings: axes.filter((n) => n === 0).length,
    theoremAxes: Object.entries(RATCHET_GENERATED.axes)
      .filter(([, v]) => v === 0)
      .map(([k]) => k),
    ratchetUuid: RATCHET_GENERATED.contentUuid,
    ratchetSealed: RATCHET_GENERATED.sealedAt,
  }
}

/** Facts the corpus cannot derive about itself — an ORCID, a licence, an audience. Declared. */
export interface Declared {
  readonly version: string
  readonly creatorName: string
  readonly orcid: string
  readonly repo: string
  readonly atoms: number
  /**
   * The works this corpus stands on, as it writes them.
   *
   * Zenodo's `references` is free text by design (developers.zenodo.org: "List of references"), and
   * that is the only honest shape for these: a reference the corpus names as `Grassé, stigmergy`
   * has no DOI here, and minting one would be [[rules]]/forge exactly. See SKILL.md.
   */
  readonly references: readonly string[]
}

/**
 * The description, with every quantity interpolated.
 *
 * The one sentence this manifest must always carry is the boundary: a theorem proves its DECISION,
 * never the facts it is fed. A deposit is permanent, so an over-claim in it is permanent too.
 */
export function description(c: Census, d: Declared): string {
  const withAxioms = c.theorems - c.axiomFree
  const stubbedClause =
    c.stubbed === 0
      ? 'and <strong>none resting on <code>sorry</code></strong>'
      : `with <strong>${c.stubbed} still resting on <code>sorry</code></strong>`
  return [
    '<p>erpax is an ERP corpus in which every folder under <code>src/</code> is one irreducible atom told three ways (form &middot; code &middot; proof), wired through a single content-uuid. Its law is <em>zero entropy &rArr; infinite tamper-cost</em>: a claim is enforced by a gate that blocks its violation, never by prose that asks for compliance.</p>',
    `<p><strong>Machine-checked proof, as of v${d.version}.</strong> The decisions that carry consequences are defined in Lean and proved there, with the TypeScript as a checked twin. Each twin&rsquo;s test reads its <code>.lean</code> file for every theorem name it relies on, so a theorem cannot quietly disappear.</p>`,
    `<p><strong>The inventory, kernel-checked with Lean ${c.lean} and counted rather than asserted:</strong> ${c.theorems} theorems across ${c.files} files, every one accepted by the kernel ${stubbedClause}. ${c.axiomFree} depend on no axioms at all (closed by <code>decide</code> over a stated finite domain); ${withAxioms} rest on Lean&rsquo;s own <code>propext</code> and <code>Quot.sound</code>. None uses <code>native_decide</code>, which would trust the compiler instead of the kernel. The record is addressed by the content hash of the sources it ran over, <code>${c.sourcesHash}</code>, so a stale claim is detectable by construction.</p>`,
    `<p>The corpus holds ${d.atoms} content-addressed atoms.</p>`,
    `<p><strong>The enforcement surface, counted from the sealed record rather than asserted.</strong> ${c.guardians} down-only guardians hold the tree, each with a ceiling that can only FALL: a change that makes an axis worse fails the push, and a change that makes it better is sealed in the same commit that earns it. ${c.theoremCeilings} of those ceilings are ZERO &mdash; a theorem rather than a tolerance, where no acceptable number exists: <code>${c.theoremAxes.join('</code>, <code>')}</code>. The ceilings are addressed by <code>${c.ratchetUuid}</code>, sealed ${c.ratchetSealed}. <em>A guardian proves its own axis has not got worse &mdash; never that the corpus is correct.</em></p>`,
    '<p><strong>What is proved, and what is not.</strong> A theorem proves its DECISION, never the facts it is fed: no proof here makes a red build green, a forged digest verify, or a divergent computation convergent, and none of it claims a Millennium problem is solved.</p>',
    '<p>Licensed CC-BY-NC-ND-4.0 throughout, with commercial terms available separately.</p>',
  ].join('')
}

/** The manifest object. Key order is fixed so the emitted bytes are stable across runs. */
export function manifest(c: Census, d: Declared): Record<string, unknown> {
  return {
    upload_type: 'software',
    title: 'erpax — a zero-entropy, content-addressed ERP corpus',
    description: description(c, d),
    version: d.version,
    creators: [{ name: d.creatorName, orcid: d.orcid }],
    license: 'cc-by-nc-nd-4.0',
    access_right: 'open',
    keywords: [
      'ERP',
      'content-addressing',
      'double-entry accounting',
      'provenance',
      'tamper-evidence',
      'compliance-as-code',
      'formal verification',
      'Lean 4',
      'machine-checked proof',
      'theorem proving',
    ],
    related_identifiers: [{ identifier: d.repo, relation: 'isSupplementTo', scheme: 'url' }],
    references: [...d.references],
  }
}

/** The bytes, with a trailing newline — the shape a generated file is compared against. */
export function render(c: Census, d: Declared): string {
  return `${JSON.stringify(manifest(c, d), null, 2)}\n`
}

export interface Drift {
  readonly fresh: boolean
  /** Quantities the committed manifest states that the record contradicts. */
  readonly stale: readonly string[]
}

/**
 * Is the committed manifest still true?
 *
 * Compared on the QUANTITIES rather than byte-for-byte: a human may improve the prose, and refusing
 * that would make the gate something people route around. What may not drift is a number.
 */
export function drift(committed: string, c: Census = census()): Drift {
  const stale: string[] = []
  const says = (n: number | string): boolean => committed.includes(String(n))
  if (!says(c.theorems)) stale.push(`theorems ${c.theorems}`)
  if (!says(c.axiomFree)) stale.push(`axiom-free ${c.axiomFree}`)
  if (!says(c.files)) stale.push(`files ${c.files}`)
  if (!says(c.sourcesHash)) stale.push(`sources ${c.sourcesHash}`)
  if (c.stubbed === 0 && !/none resting on|0 (?:still )?resting/i.test(committed)) stale.push('stubbed 0')
  return { fresh: stale.length === 0, stale }
}

if (import.meta.url === `file://${process.argv[1]}`) void (async () => {
  const { readFileSync, writeFileSync } = await import('node:fs')
  const { UUID_MATRIX_NODES } = await import('@/uuid/matrix')
  const pkg = JSON.parse(readFileSync('package.json', 'utf8')) as { version: string }
  const declared: Declared = {
    version: pkg.version,
    creatorName: 'Rouschev, Tsvetan',
    orcid: '0009-0000-7312-9778',
    repo: 'https://github.com/erpax/erpax',
    atoms: UUID_MATRIX_NODES.length,
    // The corpus's own reference bucket — the citations no gate can ever discharge
    // ([[proof]]/replaceable), which is exactly what a reference IS.
    references: (await import('@/proof/replaceable')).splitQueue().references.map((r) => r.standard),
  }
  const c = census()
  if (process.argv.includes('--check')) {
    const d = drift(readFileSync(MANIFEST_PATH, 'utf8'), c)
    if (!d.fresh) {
      console.error(`publish/zenodo — ${MANIFEST_PATH} is stale: ${d.stale.join(' · ')}`)
      process.exitCode = 1
      return
    }
    console.log(`publish/zenodo — ${MANIFEST_PATH} is fresh (${c.theorems} theorems, sources ${c.sourcesHash})`)
    return
  }
  writeFileSync(MANIFEST_PATH, render(c, declared))
  console.log(
    `publish/zenodo — emitted ${MANIFEST_PATH}: v${declared.version} · ${c.theorems} theorems · ${c.axiomFree} axiom-free · ${c.stubbed} stubbed · ${declared.atoms} atoms · sources ${c.sourcesHash}`,
  )
})()
