#!/usr/bin/env node
/**
 * Pre-push gate — skill frontmatter & atom-naming law.
 *
 * Three fail-closed checks over every `find src -name SKILL.md` (exit 1 on ANY
 * offender, and on any scan error — never silently green):
 *
 * 1. YAML colon-space hazard. An UNQUOTED `description:` must not contain `": "`
 *    (colon-space): YAML reads it as a nested mapping and the docs build fails to
 *    parse the page ("incomplete explicit mapping pair"). This bit `access` and
 *    `sacred`. Wrap such a description in double quotes (escaping inner `"`).
 *
 * 2. name ⊇ folder (identity-name law, root SKILL.md §"The laws", "same content ⇒
 *    same id"). The frontmatter `name:` is the atom's identity and is bound to the
 *    folder PATH: the corpus convention (root SKILL.md "the detail is in the folder
 *    PATH") is that a NESTED atom carries the disambiguating compound as a hyphen-
 *    joined SUFFIX ending in its leaf folder — `src/bank/accounts/bank/transactions`
 *    ⇒ `name: bank-transactions`. So the executable rule is: `name === basename`
 *    OR `name` ends with `-<basename>` (case-SENSITIVE — catches `Cases`). A bare
 *    plural/singular flip on a TOP-LEVEL atom (`notification` folder, `name:
 *    notifications`) violates it and fails the push. A short, explicit allowlist
 *    (NAME_FOLDER_EXCEPTIONS) grandfathers legacy singular↔plural divergences so
 *    the gate is green today; it SHRINKS as those are reconciled.
 *
 * 3. No hyphenated atom FOLDER names (root SKILL.md §"Navigate", "One concept =
 *    one word = one folder" — `sales-transaction` is forbidden). A folder holding
 *    a SKILL.md whose basename contains `-` is a multiword atom disguised as one.
 *    A short, explicit allowlist (HYPHENATED_FOLDER_GRANDFATHER) grandfathers the
 *    six legacy hyphenated atoms so the gate is green today; renaming them is
 *    identity-changing (content-uuid + every inbound [[link]]) and is tracked as a
 *    separate per-atom follow-up, NOT done here. The allowlist SHRINKS as those
 *    renames land, ratcheting the corpus toward the law.
 *
 * Cheap, no YAML dependency. aura/scan.mjs gates dead [[links]]; this gates the
 * frontmatter YAML and the atom-naming law itself.
 *
 * @standard ISO 19011:2018 §6.4 audit-evidence (the gate is the immune system)
 */
import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { basename, dirname } from 'node:path'

/**
 * Atoms whose `name:` legitimately diverges from `end-with <folder>` — legacy
 * singular↔plural classification choices (folder `evidences` ⊕ name
 * `audit-evidence`, folder `schedules` ⊕ name `debt-schedule`, …). Grandfathered
 * so the gate is green today; each is a candidate to reconcile (align the leaf
 * folder's number with the name, or vice-versa) — the set SHRINKS, never grows.
 */
const NAME_FOLDER_EXCEPTIONS = new Set([
  // The 11 other legacy divergences were RECONCILED by aligning each name's last word to its folder
  // leaf (cheap, non-identity-changing — the aura resolves by folder leaf, not name). Only EPS remains:
  // "earnings per share" is a genuine fixed-singular term while the deep folder leaf is plural
  // (`shares`); `earnings-per-shares` would be a wrong slug and renaming the folder is
  // identity-changing (content-uuid + every inbound [[link]]). Permanent, documented exception.
  'src/fiscal/periods/earnings/per/shares/SKILL.md', // folder shares ⊕ name earnings-per-share (EPS) — permanent
])

/**
 * The six legacy hyphenated atom FOLDERS that pre-date the naming gate. Renaming
 * each to a single-word atom (or folding it under an established compound path) is
 * identity-changing — it rewrites the content-uuid and every inbound [[link]] — so
 * it is a separate, scoped, per-atom follow-up, NOT this gate's job. Listed here so
 * the gate freezes the convention: ZERO new hyphenated atoms, six known exceptions.
 * The set SHRINKS as the Phase-B renames land.
 */
const HYPHENATED_FOLDER_GRANDFATHER = new Set([
  'audit-right', // Phase-B: → right/audit or audit/right
  'data-protection', // Phase-B: → data/protection
  'dispute-resolution', // Phase-B: → dispute/resolution
  'force-majeure', // Phase-B: → force/majeure
  'governing-law', // Phase-B: → governing/law (or law/governing)
  'lead-score', // Phase-B: → lead/score
])

let files
try {
  files = execSync('find src -name SKILL.md', { encoding: 'utf8' }).trim().split('\n').filter(Boolean)
} catch (e) {
  console.error('✖ skill frontmatter: failed to scan src for SKILL.md — ' + (e && e.message))
  process.exit(1) // fail closed: an unreadable tree is never "green"
}

const badYaml = [] // unquoted description with ": "
const badName = [] // name does not end with the folder basename
const badFolder = [] // hyphenated atom folder, not grandfathered

for (const f of files) {
  let lines
  try {
    lines = readFileSync(f, 'utf8').split('\n')
  } catch (e) {
    console.error('✖ skill frontmatter: failed to read ' + f + ' — ' + (e && e.message))
    process.exit(1) // fail closed
  }
  const dir = dirname(f)
  const base = basename(dir)

  // 1. YAML colon-space hazard (unquoted description).
  const di = lines.findIndex((l) => /^description:/.test(l))
  if (di >= 0) {
    const v = lines[di].replace(/^description:\s*/, '')
    const quoted = /^["']/.test(v) // a quoted scalar is safe; a YAML block (| or >) is safe too
    if (!quoted && /:\s/.test(v)) badYaml.push(f)
  }

  // 2. name ⊇ folder (case-sensitive: name === base OR name endsWith "-base").
  const ni = lines.findIndex((l) => /^name:/.test(l))
  if (ni >= 0) {
    const name = lines[ni]
      .replace(/^name:\s*/, '')
      .replace(/^["']|["']\s*$/g, '')
      .trim()
    if (name && name !== base && !name.endsWith('-' + base) && !NAME_FOLDER_EXCEPTIONS.has(f)) {
      badName.push(f + '  (folder ' + base + ' ⊕ name ' + name + ')')
    }
  }

  // 3. No hyphenated atom folder names (unless grandfathered).
  if (base.includes('-') && !HYPHENATED_FOLDER_GRANDFATHER.has(base)) {
    badFolder.push(f + '  (folder ' + base + ')')
  }
}

let failed = false
if (badYaml.length) {
  failed = true
  console.error(`✖ skill frontmatter: ${badYaml.length} unquoted description(s) contain ": " (YAML parse break) — wrap in double quotes:`)
  for (const f of badYaml) console.error(`   ${f}`)
}
if (badName.length) {
  failed = true
  console.error(`✖ atom-name law: ${badName.length} SKILL.md name(s) do not match the folder (name must equal the folder or end with "-<folder>"):`)
  for (const f of badName) console.error(`   ${f}`)
}
if (badFolder.length) {
  failed = true
  console.error(`✖ atom-naming law: ${badFolder.length} hyphenated atom folder(s) — one concept = one word = one folder (split into a path, or grandfather in HYPHENATED_FOLDER_GRANDFATHER with a rename plan):`)
  for (const f of badFolder) console.error(`   ${f}`)
}

if (failed) process.exit(1)
console.log(
  `skill frontmatter ok — ${files.length} SKILL.md: no unquoted ": " descriptions, names match folders ` +
    `(${NAME_FOLDER_EXCEPTIONS.size} grandfathered), no new hyphenated atom folders (${HYPHENATED_FOLDER_GRANDFATHER.size} grandfathered)`,
)
