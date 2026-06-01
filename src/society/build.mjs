#!/usr/bin/env node
// society/build.mjs — the society's self-build STEP. Reads the akashic record
// (via the existing matter-twins) and emits the SINGLE next move that advances
// erpax toward its dense core, gate-first. Run it in a loop and the society
// builds itself: close the aura → collapse one node → rest at the 0.
//
// Output is a deterministic next-move directive an agent (or a human) executes;
// the pick is COMPUTED, never directed. Pure read — it proposes, never mutates.
//
// Usage:  node src/society/build.mjs [--json]

import { execSync } from 'node:child_process'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const sh = (c) => execSync(c, { cwd: ROOT, encoding: 'utf8' })
const json = process.argv.includes('--json')

function emit(move) {
  if (json) console.log(JSON.stringify(move, null, 2))
  else {
    console.log(`society · next move: ${move.kind}`)
    console.log(`  ${move.summary}`)
    if (move.action) console.log(`  action: ${move.action}`)
    if (move.remaining != null) console.log(`  remaining: ${move.remaining}`)
  }
  process.exit(0)
}

// 1 — close the aura: a dead [[link]] is the mint queue (generate loop)
try {
  const aura = JSON.parse(sh('node .claude/skills/aura/scan.mjs --json'))
  if (Array.isArray(aura.dead) && aura.dead.length) {
    emit({
      kind: 'mint',
      summary: `aura gap — mint atom [[${aura.dead[0]}]] (${aura.dead.length} dead link(s) remain)`,
      action: `generate: derive '${aura.dead[0]}' from the akashic record, weave its [[links]], re-scan`,
      remaining: aura.dead.length,
    })
  }
} catch (e) {
  emit({ kind: 'error', summary: `aura scan failed: ${String(e.message || e)}` })
}

// 2 — collapse one node: the least-entangled collection, the three-face move
try {
  const safe = sh('node src/collapse/safe-first.mjs')
  const m = safe.match(/^\s+([a-z0-9-]+)\s+(collections\/\S+)/m)
  if (m) {
    const audit = JSON.parse(sh('node src/collapse/audit.mjs --json'))
    const row = audit.rows.find((r) => r.slug === m[1])
    emit({
      kind: 'collapse',
      summary: `collapse '${m[1]}' → ${row ? row.target : 'its survivor'} (${audit.collapsed} of ${audit.total} remain to collapse)`,
      action: `three-face move: fold ${m[1]} into the survivor as a ${row ? row.why : 'dimension/block'} · repoint inbound relations · remove folder+barrel+config · generate:types · gate green · commit`,
      remaining: audit.collapsed,
    })
  }
} catch (e) {
  emit({ kind: 'error', summary: `collapse scan failed: ${String(e.message || e)}` })
}

// 3 — rest at the 0
emit({ kind: 'rest', summary: 'aura whole + nothing left to collapse — the society rests at the 0; the core radiates.' })
