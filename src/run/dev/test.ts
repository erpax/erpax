import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { devCommands, missingDevCommands } from './index'

describe('run/dev — the command surface, as data', () => {
  it('names every script in the folder, and nothing else', () => {
    const names = devCommands().map((c) => c.name)
    expect(names.length).toBeGreaterThan(3)
    expect(names).not.toContain('index')
    expect(names).not.toContain('test')
    expect(names).not.toContain('translations')
  })

  // [[rules]]/command: a step that cannot run reports the same green as a step that passed.
  it('every path it names exists', () => {
    expect(missingDevCommands(process.cwd())).toEqual([])
  })

  it('reads each purpose from the script itself rather than restating it', () => {
    for (const c of devCommands()) {
      if (c.purpose === '') continue
      const head = readFileSync(join(process.cwd(), c.path), 'utf8').slice(0, 600)
      const firstWord = c.purpose.split(' ')[0]!
      expect(head, c.name).toContain(firstWord)
    }
  })

  // The reason this barrel is a MANIFEST and not a re-export: importing these scripts RUNS them.
  // `export {}` does not count — it is a bare module marker enabling top-level await under tsc
  // (TS1375), and my first predicate matched it and called the file safe.
  it('binds no symbol to re-export — every export is a bare module marker', () => {
    for (const c of devCommands()) {
      const text = readFileSync(join(process.cwd(), c.path), 'utf8')
      const real = [...text.matchAll(/^export\s+(.+)$/gm)].map((m) => m[1]!.trim()).filter((x) => x !== '{}' && !x.startsWith('{} '))
      expect(real, `${c.name} binds a symbol — a barrel could then re-export it safely`).toEqual([])
    }
  })

  // And the danger is not hypothetical: these end by exiting the process.
  it('runs at top level — at least one script exits the process on import', () => {
    const exiting = devCommands().filter((c) =>
      readFileSync(join(process.cwd(), c.path), 'utf8').includes('process.exit('),
    )
    expect(exiting.length).toBeGreaterThan(0)
  })
})
