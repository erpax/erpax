/**
 * skill/frontmatter — pre-push gate for SKILL.md frontmatter & atom-naming law.
 *
 *   tsx src/skill/frontmatter.ts
 *
 * @standard ISO 19011:2018 §6.4 audit-evidence (the gate is the immune system)
 */
import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { basename, dirname } from 'node:path'

export const NAME_FOLDER_EXCEPTIONS = new Set([
  'src/fiscal/periods/earnings/per/shares/SKILL.md',
])

export const HYPHENATED_FOLDER_GRANDFATHER = new Set([
  'audit-right',
  'data-protection',
  'dispute-resolution',
  'force-majeure',
  'governing-law',
  'lead-score',
])

export interface FrontmatterGateResult {
  ok: boolean
  files: number
  badYaml: string[]
  badName: string[]
  badFolder: string[]
}

export function scanSkillMdPaths(cwd: string = process.cwd()): string[] {
  return execSync('find src -name SKILL.md', { cwd, encoding: 'utf8' }).trim().split('\n').filter(Boolean)
}

export function checkSkillFrontmatter(cwd: string = process.cwd()): FrontmatterGateResult {
  let files: string[]
  try {
    files = scanSkillMdPaths(cwd)
  } catch (e) {
    throw new Error('failed to scan src for SKILL.md — ' + ((e as Error).message ?? 'cannot run'))
  }

  const badYaml: string[] = []
  const badName: string[] = []
  const badFolder: string[] = []

  for (const f of files) {
    let lines: string[]
    try {
      lines = readFileSync(f, 'utf8').split('\n')
    } catch (e) {
      throw new Error('failed to read ' + f + ' — ' + ((e as Error).message ?? 'cannot run'))
    }
    const dir = dirname(f)
    const base = basename(dir)

    const di = lines.findIndex((l) => /^description:/.test(l))
    if (di >= 0) {
      const v = lines[di]!.replace(/^description:\s*/, '')
      const quoted = /^["']/.test(v)
      if (!quoted && /:\s/.test(v)) badYaml.push(f)
    }

    const ni = lines.findIndex((l) => /^name:/.test(l))
    if (ni >= 0) {
      const name = lines[ni]!
        .replace(/^name:\s*/, '')
        .replace(/^["']|["']\s*$/g, '')
        .trim()
      if (name && name !== base && !name.endsWith('-' + base) && !NAME_FOLDER_EXCEPTIONS.has(f)) {
        badName.push(f + '  (folder ' + base + ' ⊕ name ' + name + ')')
      }
    }

    if (base.includes('-') && !HYPHENATED_FOLDER_GRANDFATHER.has(base)) {
      badFolder.push(f + '  (folder ' + base + ')')
    }
  }

  return {
    ok: badYaml.length === 0 && badName.length === 0 && badFolder.length === 0,
    files: files.length,
    badYaml,
    badName,
    badFolder,
  }
}

export function runSkillFrontmatterGate(cwd: string = process.cwd()): void {
  const result = checkSkillFrontmatter(cwd)
  let failed = false
  if (result.badYaml.length) {
    failed = true
    console.error(
      `✖ skill frontmatter: ${result.badYaml.length} unquoted description(s) contain ": " (YAML parse break) — wrap in double quotes:`,
    )
    for (const f of result.badYaml) console.error(`   ${f}`)
  }
  if (result.badName.length) {
    failed = true
    console.error(
      `✖ atom-name law: ${result.badName.length} SKILL.md name(s) do not match the folder (name must equal the folder or end with "-<folder>"):`,
    )
    for (const f of result.badName) console.error(`   ${f}`)
  }
  if (result.badFolder.length) {
    failed = true
    console.error(
      `✖ atom-naming law: ${result.badFolder.length} hyphenated atom folder(s) — one concept = one word = one folder (split into a path, or grandfather in HYPHENATED_FOLDER_GRANDFATHER with a rename plan):`,
    )
    for (const f of result.badFolder) console.error(`   ${f}`)
  }
  if (failed) process.exit(1)
  console.log(
    `skill frontmatter ok — ${result.files} SKILL.md: no unquoted ": " descriptions, names match folders ` +
      `(${NAME_FOLDER_EXCEPTIONS.size} grandfathered), no new hyphenated atom folders (${HYPHENATED_FOLDER_GRANDFATHER.size} grandfathered)`,
  )
}

if (import.meta.url === `file://${process.argv[1]}`) {
  runSkillFrontmatterGate()
}
