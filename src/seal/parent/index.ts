/**
 * seal/parent — the ancestor of an atom path, in a module that depends on nothing.
 *
 * `parentAtomPath` is three lines of string arithmetic. It lived in `@/seal`, whose barrel sits
 * inside the corpus's import component — so [[path]], which takes this one function, inherited the
 * component with it ([[rules]]/cycle).
 *
 * The atom exists for the same reason [[agent]]/sync/depth does: a function that depends on nothing
 * must be reachable without depending on anything. `@/seal` re-exports it, so no existing reader
 * changed.
 *
 * @law a pure function of its arguments belongs where importing it costs nothing
 * @invariant this module has zero imports — the property that makes it a cut point
 * @invariant a root path has no parent, and the result is never the empty string
 * @see ./SKILL.md -- ../index.ts
 */

/** The atom path one level up, or null at a root. `a/b/c` → `a/b`; `a` → null. */
export function parentAtomPath(atomPath: string): string | null {
  const i = atomPath.lastIndexOf('/')
  return i > 0 ? atomPath.slice(0, i) : null
}

/** Every ancestor, nearest first — the chain a seal propagates along. */
export function ancestorPaths(atomPath: string): readonly string[] {
  const out: string[] = []
  for (let p = parentAtomPath(atomPath); p; p = parentAtomPath(p)) out.push(p)
  return out
}

/** @index-cross.foldback child=seal/parent parent=seal — this cross folds back into its parent. */
