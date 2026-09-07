#!/usr/bin/env node
/**
 * ensure-tracked-imports — committed matter must be self-contained.
 *
 * THE FAILURE THIS EXISTS FOR: a committed file importing an atom that is only on
 * the author's disk. It builds locally (the files are there) and dies in CI with
 *
 *   Error [ERR_MODULE_NOT_FOUND]: Cannot find package '@/exact'
 *   imported from /opt/buildhome/repo/src/wave/index.ts
 *
 * — which is exactly how the Cloudflare production build broke: src/wave/index.ts
 * was committed while src/exact/ stayed untracked in-flight work. The local tree is
 * NOT the shipped tree; only what git tracks reaches the clone.
 *
 * The gate: every `@/<atom>` imported by a TRACKED source file must itself be
 * tracked. Fail closed — a red here means the push would break the build.
 *
 * Runs on the tracked tree (git ls-files), so it measures what CI will actually see.
 *
 *   node scripts/ensure-tracked-imports.mjs
 */
import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import ts from 'typescript'

const root = process.cwd()
const git = (...args) =>
  execFileSync('git', args, { cwd: root, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 })

/** Every tracked TS/TSX source under src. */
const trackedSources = git('ls-files', 'src')
  .split('\n')
  .filter((f) => /\.(ts|tsx|mts)$/.test(f) && !f.endsWith('.d.ts'))

/** Is `src/<atom>` tracked by git (i.e. present in a fresh clone)? */
const trackedAtoms = new Set(
  git('ls-files', 'src')
    .split('\n')
    .map((f) => f.replace(/^src\//, '').split('/')[0])
    .filter(Boolean),
)

/**
 * Real module specifiers, PARSED — never matched. A test fixture holds fake source
 * in a template literal (`from '@/a'` inside a string), and a regex counts it as an
 * import: the first run of this gate reported 44 offenders, ~all of them hermetic
 * fixtures in rules/cycle/test.ts and readme/regen.test.ts. The grammar knows the
 * difference — only a real ImportDeclaration/ExportDeclaration (or `import()`) has a
 * module specifier ([[rules]]: a regex over TypeScript is a guess; the parser is the
 * theorem). Same lesson this corpus has paid for in prose · reference · cycle.
 */
function importedAtoms(rel, text) {
  // setParentNodes=false: this visitor never walks upward, and the flag costs ~31% of the parse
  // (measured over 7,553 files: 4,724ms -> 3,235ms). It is a pre-push step; the time is a person's.
  const sf = ts.createSourceFile(rel, text, ts.ScriptTarget.Latest, false)
  const out = []
  const take = (spec) => {
    if (!spec || !ts.isStringLiteral(spec)) return
    const m = /^@\/([a-z][a-z0-9]*)(?:\/|$)/.exec(spec.text)
    if (m) out.push(m[1])
  }
  const visit = (n) => {
    if (ts.isImportDeclaration(n) || ts.isExportDeclaration(n)) take(n.moduleSpecifier)
    else if (ts.isCallExpression(n) && n.expression.kind === ts.SyntaxKind.ImportKeyword) take(n.arguments[0])
    ts.forEachChild(n, visit)
  }
  visit(sf)
  return out
}

const offenders = []
for (const rel of trackedSources) {
  let text
  try {
    text = readFileSync(join(root, rel), 'utf8')
  } catch {
    continue
  }
  for (const atom of importedAtoms(rel, text)) {
    if (trackedAtoms.has(atom)) continue
    // On disk but untracked ⇒ the CI landmine. Absent entirely ⇒ a dead import
    // (a different law's problem: [[rules]]/reference), but still unbuildable.
    const onDisk = existsSync(join(root, 'src', atom))
    offenders.push({ rel, atom, onDisk })
  }
}

if (offenders.length > 0) {
  console.error('[ensure-tracked-imports] ✗ committed code imports matter that is NOT tracked:\n')
  for (const { rel, atom, onDisk } of offenders) {
    console.error(
      `   ${rel}\n     → @/${atom} ${onDisk ? '(on your disk, UNTRACKED — CI clone will not have it)' : '(absent entirely)'}`,
    )
  }
  console.error(
    `\n  ${offenders.length} unbuildable import(s). Fix: \`git add src/<atom>\` for in-flight matter the` +
      `\n  committed code needs, or drop the import. The local tree is not the shipped tree.`,
  )
  process.exit(1)
}

console.log(
  `[ensure-tracked-imports] ✓ ${trackedSources.length} tracked source(s) — every @/<atom> import is tracked`,
)
