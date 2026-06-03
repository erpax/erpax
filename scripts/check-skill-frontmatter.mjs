#!/usr/bin/env node
/**
 * Pre-push gate — skill frontmatter YAML safety.
 *
 * Every SKILL.md `description:` that is UNQUOTED must not contain `": "`
 * (colon-space): YAML reads it as a nested mapping and the docs build fails to
 * parse the page ("incomplete explicit mapping pair"). This bit `access` and
 * `sacred` this build — wrap such a description in double quotes (escaping inner
 * `"` as `\"`). aura/scan.mjs gates dead [[links]]; this gates the YAML itself.
 *
 * Cheap, no YAML dependency. Exit 1 (fail the push) on any offender.
 *
 * @standard ISO 19011:2018 §6.4 audit-evidence (the gate is the immune system)
 */
import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'

const files = execSync('find src -name SKILL.md', { encoding: 'utf8' }).trim().split('\n').filter(Boolean)
const bad = []
for (const f of files) {
  const lines = readFileSync(f, 'utf8').split('\n')
  const i = lines.findIndex((l) => /^description:/.test(l))
  if (i < 0) continue
  const v = lines[i].replace(/^description:\s*/, '')
  const quoted = /^["']/.test(v) // a quoted scalar is safe; a YAML block (| or >) is safe too
  if (!quoted && /:\s/.test(v)) bad.push(f)
}

if (bad.length) {
  console.error(`✖ skill frontmatter: ${bad.length} unquoted description(s) contain ": " (YAML parse break) — wrap in double quotes:`)
  for (const f of bad) console.error(`   ${f}`)
  process.exit(1)
}
console.log(`skill frontmatter ok — ${files.length} SKILL.md, no unquoted ": " descriptions`)
