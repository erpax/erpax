import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import { importsOf } from '@/rules/cycle'

/**
 * The claim this atom makes is about an IMPORT, so the proof reads the import — parsed, not
 * matched, because a comment naming `@/css` is prose about the rule and not a use of it.
 *
 * `importsOf` returns RESOLVED targets rather than specifiers, which is the stronger statement:
 * it proves where the edge actually lands. `@/css` would land on `src/css/index.ts` — the barrel
 * that also exports `computeCssDiamond` — and that is the edge this atom exists to not have.
 */
const FILE = 'src/provider/index.tsx'
const BARREL = 'src/css/index.ts'

describe('provider', () => {
  it('resolves the computed-CSS provider to its own module, never to the @/css barrel', () => {
    const targets = importsOf(join(process.cwd(), FILE)).map((p) => relative(process.cwd(), p))
    expect(targets).toContain('src/css/ComputedCssProvider.tsx')
    expect(targets).not.toContain(BARREL)
  })

  it('mounts exactly one provider tree', () => {
    const text = readFileSync(join(process.cwd(), FILE), 'utf8')
    expect(text.match(/export const Providers/g) ?? []).toHaveLength(1)
  })
})
