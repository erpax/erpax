/**
 * P0 pass runner — baseline · top50 sealed-near materialize · improve cycle · after metrics.
 * One-shot; no commit. Coordinate b4c0d5f6 no-gaps P0.
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const cwd = process.cwd()
const SRC = join(cwd, 'src')

const walkSkills = (dir, rel = '') => {
  const out = []
  for (const e of readdirSync(dir).sort()) {
    if (e.startsWith('.') || e === 'node_modules') continue
    const p = join(dir, e)
    if (!statSync(p).isDirectory()) continue
    if (!rel && (e === 'app' || e === 'migrations')) continue
    const child = rel ? `${rel}/${e}` : e
    if (existsSync(join(p, 'SKILL.md'))) out.push(child)
    out.push(...walkSkills(p, child))
  }
  return out
}

const atomPaths = walkSkills(SRC)

const trinityOf = (p) => ({
  form: existsSync(join(SRC, p, 'SKILL.md')),
  code: existsSync(join(SRC, p, 'index.ts')),
  proof: existsSync(join(SRC, p, 'test.ts')),
})

const sealedOf = (p) => {
  const readme = join(SRC, p, 'README.md')
  if (!existsSync(readme)) return false
  return readFileSync(readme, 'utf8').includes('`sealed`')
}

const metrics = () => {
  let sealed = 0
  let unsealed = 0
  let trinity = 0
  const sealedNear = []
  for (const p of atomPaths) {
    const t = trinityOf(p)
    const s = sealedOf(p)
    if (s) sealed++
    else unsealed++
    if (t.form && t.code && t.proof) trinity++
    if (!s) {
      const score = (t.form ? 1 : 0) + (t.code ? 1 : 0) + (t.proof ? 1 : 0)
      if (score > 0) sealedNear.push({ path: p, score })
    }
  }
  sealedNear.sort((a, b) => b.score - a.score || a.path.localeCompare(b.path))
  const total = atomPaths.length
  return {
    total,
    sealed,
    unsealed,
    sealedPct: total ? Math.round((sealed / total) * 1000) / 10 : 0,
    trinity,
    trinityPct: total ? Math.round((trinity / total) * 1000) / 10 : 0,
    formOnly: total - trinity,
    top50: sealedNear.slice(0, 50).map((x) => x.path),
  }
}

const rootReadme = existsSync(join(cwd, 'README.md'))
  ? readFileSync(join(cwd, 'README.md'), 'utf8')
  : ''
const netEbMatch = rootReadme.match(/net residual `(-?[\d.]+)` eb/)
const netEb = netEbMatch ? Number(netEbMatch[1]) : null

const phase = process.argv[2] ?? 'baseline'

if (phase === 'baseline') {
  const m = metrics()
  console.log(
    JSON.stringify({
      phase: 'baseline',
      ...m,
      netEb,
      netEbNote: 'from root README.md corpus entropy section',
    }),
  )
} else if (phase === 'after') {
  const m = metrics()
  console.log(
    JSON.stringify({
      phase: 'after',
      ...m,
      netEb,
    }),
  )
} else if (phase === 'top50-paths') {
  const m = metrics()
  console.log(m.top50.join(','))
}
