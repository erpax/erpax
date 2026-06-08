#!/usr/bin/env node
/**
 * entropy-pass-stubs — minimal trinity matter for vocabulary + accounting leaves.
 * One-shot for bounded entropy pass; idempotent.
 */
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const cwd = process.cwd()
const SRC = join(cwd, 'src')

const VOCAB_WORDS = [
  'accommodation',
  'action',
  'abstract',
  'abdomen',
  'acceleration',
  'accept',
  'acceptance',
  'accepted',
  'accepting',
  'accepts',
]

const rootIndexTs = (word) => `/**
 * ${word} — vocabulary atom matter face.
 */
export const ${word} = '${word}' as const
export const atomPath = '${word}' as const
`

const rootTestTs = (word) => `import { describe, it, expect } from 'vitest'
import { ${word}, atomPath } from '@/${word}'

describe('${word} — vocabulary atom', () => {
  it('names the canonical atom path', () => {
    expect(${word}).toBe('${word}')
    expect(atomPath).toBe('${word}')
  })
})
`

const accountingLeaves = [
  { leaf: 'analysis', desc: 'financial analysis engine — balance sheet, income statement, aging reports' },
  { leaf: 'coa', desc: 'chart of accounts — path IS the account code; accountCodeOf folds atom paths to GL codes' },
  { leaf: 'corpus', desc: 'corpus self-accounting — eb (entropy-bit) currency and path posting units' },
  { leaf: 'debit', desc: 'debit/credit logic — double-entry validation and journal lines' },
  { leaf: 'ledger', desc: 'token ledger — path-keyed postings and balance by path' },
  { leaf: 'margin', desc: 'margin analysis — gross margin and contribution calculations' },
  { leaf: 'money', desc: 'money fields — Payload money type fixes and currency handling' },
  { leaf: 'reports', desc: 'financial reports service — trial balance, statements, aging' },
]

const accountingSkillMd = (leaf, desc) => `---
name: ${leaf}
description: "Use when reasoning about accounting/${leaf} — ${desc}."
atomPath: accounting/${leaf}
---

# accounting/${leaf}

${desc.charAt(0).toUpperCase() + desc.slice(1)}.

**Law — [[law]]: accounting/${leaf} composes under [[accounting]] — path-keyed, content-addressed, no hand-maintained GL catalogue.**

Matter-twin: \`src/accounting/${leaf}/index.ts\`

Composes [[accounting]] · [[path]] · [[debit]] · [[balance]]
`

let wrote = 0

for (const word of VOCAB_WORDS) {
  const dir = join(SRC, word)
  if (!existsSync(dir)) continue
  const indexPath = join(dir, 'index.ts')
  const testPath = join(dir, 'test.ts')
  if (!existsSync(indexPath)) {
    writeFileSync(indexPath, rootIndexTs(word))
    wrote++
  }
  if (!existsSync(testPath)) {
    writeFileSync(testPath, rootTestTs(word))
    wrote++
  }
}

for (const { leaf, desc } of accountingLeaves) {
  const dir = join(SRC, 'accounting', leaf)
  if (!existsSync(dir)) continue
  const skillPath = join(dir, 'SKILL.md')
  if (!existsSync(skillPath)) {
    writeFileSync(skillPath, accountingSkillMd(leaf, desc))
    wrote++
  }
}

console.log(JSON.stringify({ wrote, vocab: VOCAB_WORDS.length, accountingLeaves: accountingLeaves.length }))
