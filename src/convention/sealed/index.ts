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
 * REGROUNDED ([[grounded]]): the scan sources from SEALED content — the committed git tree at HEAD,
 * addressed by SHA — via one `git grep` query, never `readFileSync`/`readdirSync` over the mutable
 * `process.cwd()` tree. So the seal coverage is itself computed from sealed inputs: a check that is
 * trustworthy about its own source, and cheap (one sealed query, not a per-file re-derivation — the
 * reuse that IS the measured speedup). This atom obeys its own law: `sealedCount` PROPAGATES a real
 * git failure and treats only exit-1 (zero matches — a result, not an error) as 0.
 *
 *   tsx src/convention/sealed/index.ts
 *
 * @audit catches + leaks scanned live from the SEALED git tree; coverage = (catches − leaks)/catches
 * @see ../../default -- ../../collider -- ../../entropy -- ../../grounded -- ./SKILL.md
 */
import { execFileSync } from 'node:child_process'

/**
 * Count matches of a pattern across the SEALED committed source (git HEAD, SHA-addressed) in one
 * query. git grep exits 1 on zero matches (a result, not an error) ⇒ 0; any other failure PROPAGATES
 * (this atom does not swallow — the very leak it measures).
 */
function sealedCount(pattern: string): number {
  try {
    const out = execFileSync(
      'git',
      ['grep', '-ohP', '-e', pattern, 'HEAD', '--', 'src', ':(exclude,glob)src/**/*.d.ts'],
      { encoding: 'utf8', maxBuffer: 1 << 28, stdio: ['ignore', 'pipe', 'ignore'] },
    )
    return out.length === 0 ? 0 : out.split('\n').filter((l) => l.length > 0).length
  } catch (err) {
    if ((err as { status?: number }).status === 1) return 0
    throw err
  }
}

/** Catches, and the detectable entropy-LEAK patterns (swallowed / defaulted), from sealed content. */
function scan(): { catches: number; leaks: number } {
  const catches = sealedCount('\\bcatch\\b')
  const empty = sealedCount('catch\\s*(\\([^)]*\\))?\\s*\\{\\s*\\}') // empty catch — swallow
  const defaulted = sealedCount('\\.catch\\(\\s*\\(\\s*\\)\\s*=>') // .catch(() => …) — swallow/default
  return { catches, leaks: empty + defaulted }
}

/** Coverage — the seal: the fraction of catches that propagate (do not leak entropy). Upper bound. */
export function coverage(): number {
  const { catches, leaks } = scan()
  return catches === 0 ? 1 : (catches - leaks) / catches
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const { catches, leaks } = scan()
  console.log('convention/sealed — entropy leaves through error handling (from the sealed git tree):')
  console.log('  ' + catches + ' catches · ' + leaks + ' detectable leaks (swallow/default)')
  console.log('  seal coverage = ' + (100 * coverage()).toFixed(2) + '% (upper bound — real leaks ≥ detected)')
}
