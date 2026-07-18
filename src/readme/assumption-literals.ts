/**
 * readme/assumption-literals — banned hand-prose scan (no compute import).
 */
import { existsSync, readFileSync } from 'node:fs'
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
  // A hermetic-fixture cwd may not include src/readme/compute.ts — an absent file holds no banned prose, so the
  // scan is empty, never a crash (this ENOENT failed all 4 scanCleanAxes tests via the folder-law count path).
  const path = join(cwd, 'src/readme/compute.ts')
  if (!existsSync(path)) return []
  return BANNED_HAND_PROSE.filter((p) => readFileSync(path, 'utf8').includes(p))
}
