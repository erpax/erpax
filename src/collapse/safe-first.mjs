#!/usr/bin/env node
// collapse/safe-first.mjs — find the safest first node to migrate: a LEAF
// collection (no child collections) with ZERO inbound relationTo (nothing
// relates to it) — so removing it cannot dangle a relation. Pure JS.
import { readFile, readdir, stat } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const SRC = join(dirname(fileURLToPath(import.meta.url)), '..')
const COLL = join(SRC, 'collections')

async function walk(dir) {
  const out = []
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name)
    if (e.isDirectory()) out.push(...(await walk(p)))
    // skip GENERATED mirrors — payload-types.ts (relationTo to every slug via the
    // search collection) and the skill-router index are reflections, not sources.
    else if (/\.tsx?$/.test(e.name) && !e.name.endsWith('.d.ts') && e.name !== 'payload-types.ts' && e.name !== 'skills.index.ts') out.push(p)
  }
  return out
}

// slug -> folder, by reading each collection index.ts
async function collFolders(dir) {
  const out = []
  for (const e of await readdir(dir, { withFileTypes: true })) {
    if (!e.isDirectory()) continue
    const folder = join(dir, e.name)
    const idx = join(folder, 'index.ts')
    let slug = null
    try {
      const t = await readFile(idx, 'utf8')
      slug = (t.match(/\bslug:\s*'([a-z0-9-]+)'/) || [])[1] || null
    } catch {}
    // child collections = subfolders that themselves have an index.ts with a slug
    let children = 0
    for (const c of await readdir(folder, { withFileTypes: true })) {
      if (c.isDirectory()) {
        try { await stat(join(folder, c.name, 'index.ts')); children++ } catch {}
      }
    }
    if (slug) out.push({ slug, folder: folder.replace(SRC + '/', ''), children })
    out.push(...(await collFolders(folder)))
  }
  return out
}

const docs = await Promise.all((await walk(SRC)).map(async (f) => ({ f, t: await readFile(f, 'utf8') })))
const folders = await collFolders(COLL)

// audit's collapse set (re-derive: anything not a survivor — import the audit's verdict)
const { execSync } = await import('node:child_process')
const audit = JSON.parse(execSync(`node ${join(SRC, 'collapse', 'audit.mjs')} --json`).toString())
const collapsing = new Set(audit.rows.filter((r) => r.sink && r.sink >= 1).map((r) => r.slug))

function inboundRelations(slug) {
  const needle = `relationTo: '${slug}'`
  const needle2 = `relationTo:'${slug}'`
  const hits = []
  for (const { f, t } of docs) {
    if (t.includes(needle) || t.includes(needle2)) hits.push(f.replace(SRC + '/', ''))
  }
  return hits
}

// code coupling: any file (outside the slug's own folder + generated mirrors)
// that names the slug — these break if the collection is removed (the gate sees it).
function codeCoupling(slug, folder) {
  const n1 = `'${slug}'`
  const n2 = `"${slug}"`
  let files = 0
  for (const { f, t } of docs) {
    if (f.includes(folder + '/')) continue
    if (t.includes(n1) || t.includes(n2)) files++
  }
  return files
}

const rows = folders
  .filter((r) => collapsing.has(r.slug))
  .map((r) => ({ ...r, inbound: inboundRelations(r.slug) }))
  .map((r) => ({ ...r, inboundN: r.inbound.filter((f) => !f.includes(r.folder)).length, code: codeCoupling(r.slug, r.folder) }))
  .sort((a, b) => a.children - b.children || a.inboundN + a.code - (b.inboundN + b.code))

console.log('SAFEST FIRST NODES — leaf (0 children) + 0 inbound relationTo + 0 code coupling:\n')
const safe = rows.filter((r) => r.children === 0 && r.inboundN === 0 && r.code === 0)
for (const r of safe.slice(0, 25)) console.log(`  ${r.slug.padEnd(30)} ${r.folder}`)
console.log(`\n(${safe.length} TRULY-clean nodes — removable with no code/relation rewiring)`)
console.log('\nleast-coupled if none clean (rel+code):')
for (const r of rows.filter((r) => r.children === 0).slice(0, 8)) console.log(`  rel=${r.inboundN} code=${String(r.code).padStart(2)}  ${r.slug}`)
