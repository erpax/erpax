/**
 * convention/sealed — entropy leaves through error handling. A swallowed `catch {}` or a defaulted
 * `.catch(() => x)` HIDES the truth: the error (the entropy) escapes through the handler instead of
 * propagating, and a verifier can no longer see the real state. It is the same sin as a defined
 * [[default]] — an assumption that leaks entropy. The corpus is SEALED only when errors PROPAGATE.
 *
 * coverage = catches that propagate / total catches. The detectable leak patterns (empty catch,
 * `.catch(() => …)`) are a LOWER bound on the leak — so this coverage is an UPPER bound on the seal,
 * stated honestly. No default: the corpus has error-handling by architecture, so total > 0.
 *
 *   tsx src/convention/sealed/index.ts
 *
 * @audit catches + leaks scanned live from src; coverage = (catches − leaks)/catches, never assumed
 * @see ../../default -- ../../collider -- ../../entropy -- ./SKILL.md
 */
import { readdirSync, statSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const SRC = join(process.cwd(), 'src')

/** Scan src for catch handlers and the entropy-LEAK patterns (swallowed / defaulted errors). */
function scan(): { catches: number; leaks: number } {
  let catches = 0
  let leaks = 0
  const walk = (dir: string): void => {
    for (const e of readdirSync(dir)) {
      if (e === 'node_modules' || e.startsWith('.')) continue
      const p = join(dir, e)
      const st = statSync(p)
      if (st.isDirectory()) walk(p)
      else if (e.endsWith('.ts') && !e.endsWith('.d.ts')) {
        const t = readFileSync(p, 'utf8')
        catches += (t.match(/\bcatch\b/g) ?? []).length
        leaks += (t.match(/catch\s*(\([^)]*\))?\s*\{\s*\}/g) ?? []).length // empty catch — swallow
        leaks += (t.match(/\.catch\(\s*\(\s*\)\s*=>/g) ?? []).length // .catch(() => …) — swallow/default
      }
    }
  }
  walk(SRC)
  return { catches, leaks }
}

/** Coverage — the seal: the fraction of catches that propagate (do not leak entropy). Upper bound. */
export function coverage(): number {
  const { catches, leaks } = scan()
  return (catches - leaks) / catches // total > 0 by architecture (the corpus has error-handling)
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const { catches, leaks } = scan()
  console.log('convention/sealed — entropy leaves through error handling:')
  console.log('  ' + catches + ' catches · ' + leaks + ' detectable leaks (swallow/default)')
  console.log('  seal coverage = ' + (100 * coverage()).toFixed(2) + '% (upper bound — real leaks ≥ detected)')
}
