/**
 * readme/assumption-literals — banned hand-prose scan (no compute import).
 */
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

export const BANNED_HAND_PROSE = [
  'erpax IS a diamond',
  'No separate agent setup',
  'the K₁₃ lattice',
  'Reading it is reading the crystal',
  'Every per-folder README carries structured analytics',
  '## the horo ring',
  '## the trinity — every atom told three ways',
] as const

export function computeProseLiterals(cwd = process.cwd()): readonly string[] {
  const src = readFileSync(join(cwd, 'src/readme/compute.ts'), 'utf8')
  return BANNED_HAND_PROSE.filter((p) => src.includes(p))
}
