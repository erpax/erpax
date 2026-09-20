# rules/orphan — what a purge leaves behind, cut by the tree instead of by hand

Removing a dead export does not remove what it used. The imports it named and the inert locals it
read stay, referenced by nothing — and **nothing sees them**. `tsc` is content (they are still
well-typed), the unit waves are content (nothing imports them), and the zero-warning lint lane is
the only instrument that objects. It objected **115 times at once**.

| the cascade, measured 2026-09-20 | |
| --- | ---: |
| dead exports purged | 170 |
| symbols orphaned by that purge | 115 |
| rounds needed to reach a fixpoint | 3 |
| files left with no statements at all | 14 |

## The fixpoint is the point

Cutting imports orphans declarations. Cutting declarations orphans **their** imports. A single pass
hands the next cascade to whoever pushes next, so this sweeps until nothing moves.

## Three refusals, each paid for

- **An import clause is REWRITTEN from its survivors, never spliced.** Splicing two adjacent dead
  specifiers by offset leaves `{ a, , d }` — a **parse error**, not a warning. It reached
  `src/dashboard/index.tsx` and turned a cleanup into a red build.
- **A declaration whose initializer is a CALL is refused.** A call may do something when it runs;
  deleting it is a behaviour change wearing a cleanup's clothes.
- **A sweep that would empty a file is refused.** An empty file is not a module, so
  `export * from './x'` against it fails with *"is not a module"* — which no lint rule reports and
  no unit test reaches. Only `tsc` sees it, and only because an importer exists. A file swept to
  nothing is a **deletion**, and deleting capability is a human's decision.

## The linter decides, this atom only cuts

`orphansFrom` reads ESLint's own report. Its scope analysis is the authority; a regex over source
is the guess this corpus has paid for in every gate built on one ([[rules]]/cycle, [[rules]]/prose).
An exported symbol is never touched — that is a FACE, and [[rules]]/unfolded judges those with the
published-package boundary this atom does not know about.

**Honest boundary.** This proves a symbol is unreferenced **in the file the linter scanned**. A
symbol reached dynamically is invisible to it, exactly as it is to the linter — and the purge basis
that feeds it has been wrong three times in three ways: aliased imports name a different local,
re-export clauses name without using, and `export *` names nothing at all.

**Law — [[law]]: a cleanup that needs a person is a cleanup that will be skipped on the push that
needs it. Sweep to a fixpoint, refuse what changes behaviour, and never leave a file that is not a
module.**

Composes: [[rules]] · [[rules]]/unfolded · [[syntax]] · [[law]].
