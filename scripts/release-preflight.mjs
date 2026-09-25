#!/usr/bin/env node
/**
 * release-preflight — run every gate the TAG lane runs, BEFORE the tag exists.
 *
 * A tag is a fact you cannot take back cleanly: the corpus tag fires a Zenodo DOI, and a package tag
 * burns a version number. Today the gates run in the tagged workflow, so the only way to learn a tag
 * was invalid is to watch it fail and delete the tag — which is exactly what the history shows:
 *
 *   v1.0.1        failure, tag gone
 *   v1.0.4        failure ×2, tag gone — "released.json is behind the corpus"
 *   erpax-v0.1.0  failure ×4 — npm ENEEDAUTH (trusted publishing not in place)
 *
 * Cut on green only. This runs the same scripts, in the same order, against HEAD.
 *
 *   node scripts/release-preflight.mjs v1.0.7
 *   node scripts/release-preflight.mjs accounting-v2.1.0 --skip-ci
 */
import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'

const tag = process.argv[2]
const skipCi = process.argv.includes('--skip-ci')
if (!tag) {
  console.error('usage: node scripts/release-preflight.mjs <tag> [--skip-ci]')
  process.exit(2)
}

/** The workflow's own `route` job, mirrored — a tag that matches no kind is refused there too. */
function route(t) {
  if (t.startsWith('algebra-v')) return { kind: 'algebra', dir: 'packages/algebra' }
  if (/^(erpax|access|accounting|cloudflare|commerce|identity)-v/.test(t))
    return { kind: 'package', dir: `packages/${t.replace(/-v.*$/, '')}` }
  if (/^v/.test(t)) return { kind: 'corpus', dir: '.' }
  return null
}

const r = route(tag)
if (!r) {
  console.error(`✖ tag '${tag}' matches no release kind — the publish lane would refuse it too`)
  process.exit(1)
}
if (!existsSync(r.dir)) {
  console.error(`✖ ${r.dir} does not exist — '${tag}' names a package this repo does not ship`)
  process.exit(1)
}
console.log(`preflight — ${tag} → ${r.kind} (${r.dir})\n`)

const sh = (cmd, args) => spawnSync(cmd, args, { encoding: 'utf8', env: { ...process.env, TAG: tag } })

/** CI's own conclusion on THIS commit. `none` is an unasked question, never a pass. */
function ciGreen() {
  const sha = sh('git', ['rev-parse', 'HEAD']).stdout?.trim()
  const out = sh('gh', [
    'api',
    `repos/erpax/erpax/actions/workflows/ci.yml/runs?head_sha=${sha}&per_page=1`,
    '--jq',
    '.workflow_runs[0].conclusion // "none"',
  ])
  if (out.status !== 0) return { ok: false, detail: 'could not ask GitHub (gh not authed?) — UNVERIFIED, not green' }
  const c = out.stdout.trim()
  return { ok: c === 'success', detail: `ci.yml on ${sha?.slice(0, 10)} → ${c}` }
}

const gates = []
if (!skipCi) gates.push({ name: 'CI is green on this commit', run: ciGreen })

const node = (script, ...args) => () => {
  const out = sh('node', [script, ...args])
  return { ok: out.status === 0, detail: (out.stdout + out.stderr).trim().split('\n').slice(-3).join('\n') }
}

gates.push({ name: 'tag names the version it releases', run: node('scripts/assert-tag-version.mjs', tag, r.dir) })
gates.push({ name: 'every imported atom is tracked', run: node('scripts/ensure-tracked-imports.mjs') })

if (r.kind === 'corpus') {
  gates.push({ name: 'citation metadata agrees', run: node('scripts/citation-consistent.mjs') })
  gates.push({ name: 'released.json addresses this corpus', run: node('scripts/release-corpus.mjs', '--check') })
} else {
  gates.push({ name: 'root stays private', run: node('scripts/assert-root-private.mjs') })
  gates.push({ name: 'packages are consumable', run: node('scripts/packages-consumable.mjs') })
  gates.push({ name: 'this version is unpublished', run: node('scripts/assert-version-unpublished.mjs', r.dir) })
}

let failed = 0
for (const g of gates) {
  const v = g.run()
  console.log(`${v.ok ? '✓' : '✖'} ${g.name}`)
  if (!v.ok) {
    failed++
    if (v.detail) console.log(v.detail.replace(/^/gm, '    '))
  }
}

console.log(
  `\npreflight — ${gates.length - failed}/${gates.length} green. ` +
    (failed === 0
      ? `Safe to cut:\n  git tag ${tag} && git push origin ${tag}`
      : `REFUSED: do not cut ${tag}. A tag that fails the lane is deleted and re-cut, and a corpus tag fires a DOI first.`),
)
process.exit(failed === 0 ? 0 : 1)
