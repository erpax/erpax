#!/usr/bin/env node
/**
 * release-corpus — the CORPUS version is its content address.
 *
 * uuidna's speed is not a fast hash: the address IS the answer, so minting is free and
 * only forging costs. Versioning is the same shape. A release is warranted exactly when
 * the CONTENT changed — never because a human felt it was time — so the corpus is folded
 * to one uuid and compared to the fold that was last released.
 *
 *   unchanged fold ⇒ no release   (there is nothing to ship, and a DOI minted over
 *                                  identical content is a second name for one thing)
 *   changed fold   ⇒ patch bump   + the `v<version>` tag the publish workflow fires on
 *
 * This is `packages/release.mjs` pointed at erpax itself. That one versions the built
 * @erpax/* dists; this one versions the corpus a citation resolves to.
 *
 * WHY IT MATTERS HERE: Zenodo mints a DOI from a GitHub RELEASE. No release, no DOI —
 * v0.1.0 and v1.0.0 were tagged and nothing was ever cut, so erpax has never had one.
 *
 *   node scripts/release-corpus.mjs           # print the plan
 *   node scripts/release-corpus.mjs --write   # bump package.json + CITATION.cff + manifest
 *   node scripts/release-corpus.mjs --check   # CI: the manifest matches the content
 *   node scripts/release-corpus.mjs --tag     # print the tag to push (nothing else)
 *
 * HONEST BOUNDARY: the fold covers the TRACKED source a release ships — it is blind to
 * anything git ignores, which is deliberate (a computed face is derivable, so it cannot
 * be what makes a release necessary). It answers "did the shipped content move", never
 * "is the change worth a release": a patch bump is the floor, and a human still decides
 * when a change deserves a minor or a major.
 */
import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

/** v8 content-uuid — the corpus's address primitive (RFC 9562 §5.8), same as packages/release.mjs. */
const toUuid = (buf) => {
  const b = Buffer.from(createHash('sha256').update(buf).digest().subarray(0, 16))
  b[6] = (b[6] & 0x0f) | 0x80
  b[8] = (b[8] & 0x3f) | 0x80
  const x = b.toString('hex')
  return `${x.slice(0, 8)}-${x.slice(8, 12)}-${x.slice(12, 16)}-${x.slice(16, 20)}-${x.slice(20)}`
}

/**
 * The corpus fold: every TRACKED file's path ⊗ blob hash, XOR-folded.
 *
 * XOR so the address is ORDER-INVARIANT — a different checkout order, a different
 * filesystem, another machine, all fold to the same 128 bits. The path is bound with the
 * bytes because a MOVE is a real change to what ships even when no byte differs.
 * `git ls-files -s` reads git's INDEX, so the fold is of what a clone would GET.
 *
 * The version STAMP is not part of what changed — it is the name given to the change.
 *
 * Folding it in makes the address unreachable: writing the manifest changes the tree,
 * which changes the fold, which the manifest no longer addresses. So `released.json` is
 * excluded outright (it is DERIVED from the fold), and the `version` line is normalised
 * out of the two files that carry it. Everything else is folded exactly as it ships.
 */
const STAMP_ONLY = new Set(['released.json'])
const VERSION_BEARING = new Set(['package.json', 'CITATION.cff'])

const stampFreeDigest = (cwd, path) => {
  let text = ''
  try {
    text = execFileSync('git', ['show', `:${path}`], { cwd, encoding: 'utf8', maxBuffer: 1 << 26 })
  } catch {
    try {
      text = readFileSync(join(cwd, path), 'utf8')
    } catch {
      return null
    }
  }
  const stripped = text
    .replace(/^(\s*"version":\s*)"[^"]*"/m, '$1"—"')
    .replace(/^version:.*$/m, 'version: —')
  return createHash('sha256').update(stripped).digest('hex')
}

export function corpusFold(cwd = root) {
  const out = execFileSync('git', ['ls-files', '-s'], { cwd, encoding: 'utf8', maxBuffer: 1 << 28 })
  const fold = Buffer.alloc(32)
  let files = 0
  for (const line of out.split('\n')) {
    if (!line) continue
    // <mode> <blobsha> <stage>\t<path>
    const tab = line.indexOf('\t')
    if (tab < 0) continue
    const path = line.slice(tab + 1)
    if (STAMP_ONLY.has(path)) continue
    const blob = VERSION_BEARING.has(path)
      ? stampFreeDigest(cwd, path)
      : line.slice(0, tab).split(' ')[1]
    if (!blob) continue
    const d = createHash('sha256').update(path).update(' ').update(blob).digest()
    for (let i = 0; i < 32; i++) fold[i] ^= d[i]
    files++
  }
  return { uuid: toUuid(fold), files }
}

const bumpPatch = (v) => {
  const [maj, min, pat] = String(v).split('.').map((n) => Number.parseInt(n, 10) || 0)
  return `${maj}.${min}.${pat + 1}`
}

const readJson = (p, fallback) => {
  try {
    return JSON.parse(readFileSync(p, 'utf8'))
  } catch {
    return fallback
  }
}

export function releasePlan(cwd = root) {
  const pkg = readJson(join(cwd, 'package.json'), {})
  const manifest = readJson(join(cwd, 'released.json'), {})
  const { uuid, files } = corpusFold(cwd)
  const prior = manifest.erpax ?? null
  const changed = !prior || prior.contentUuid !== uuid
  const version = changed && prior ? bumpPatch(prior.version) : pkg.version
  return { uuid, files, prior, changed, version, current: pkg.version }
}

const writeRelease = (plan, cwd = root) => {
  const pjPath = join(cwd, 'package.json')
  const pj = readFileSync(pjPath, 'utf8')
  const pkg = JSON.parse(pj)
  if (pkg.version !== plan.version) {
    writeFileSync(pjPath, pj.replace(`"version": "${pkg.version}"`, `"version": "${plan.version}"`))
  }
  const cffPath = join(cwd, 'CITATION.cff')
  const cff = readFileSync(cffPath, 'utf8')
  writeFileSync(cffPath, cff.replace(/^version:.*$/m, `version: ${plan.version}`))
  writeFileSync(
    join(cwd, 'released.json'),
    `${JSON.stringify({ erpax: { version: plan.version, contentUuid: plan.uuid } }, null, 2)}\n`,
  )
}

const plan = releasePlan()
const mode = process.argv.includes('--write')
  ? 'write'
  : process.argv.includes('--check')
    ? 'check'
    : process.argv.includes('--tag')
      ? 'tag'
      : 'plan'

if (mode === 'tag') {
  console.log(`v${plan.version}`)
  process.exit(0)
}

if (mode === 'check') {
  // A manifest that does not address the content it claims to have released is the one
  // thing a content-addressed version may not be: a name that resolves to something else.
  if (plan.changed) {
    console.error(
      `✖ released.json is behind the corpus — content ${plan.uuid} was never released.\n` +
        `  Run: node scripts/release-corpus.mjs --write`,
    )
    process.exit(1)
  }
  console.log(`✔ released v${plan.version} addresses the corpus (${plan.uuid} · ${plan.files} files)`)
  process.exit(0)
}

console.log(`corpus fold  ${plan.uuid}  (${plan.files} tracked files)`)
console.log(`released     ${plan.prior ? `v${plan.prior.version} · ${plan.prior.contentUuid}` : '— never'}`)
if (!plan.changed) {
  console.log(`\n✔ unchanged — nothing to release. A DOI over identical content is a second name for one thing.`)
  process.exit(0)
}
console.log(`\n→ release v${plan.version}  (was v${plan.current})`)
if (mode === 'write') {
  writeRelease(plan)
  console.log(`   wrote package.json · CITATION.cff · released.json`)
  console.log(`\n   git commit -am 'release: v${plan.version}' && git push`)
  console.log(`   git tag v${plan.version} && git push origin v${plan.version}   # cuts the Release → Zenodo mints the DOI`)
} else {
  console.log(`   node scripts/release-corpus.mjs --write   # to take it`)
}
