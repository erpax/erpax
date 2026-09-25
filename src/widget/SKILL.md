# widget — a dashboard tile renders a view-model; it never fetches one

Every widget here is `React.FC<{ data: VM | null }>` over an [[analytics]] view-model. The tile
receives what it draws and computes nothing about where it came from — the fetch belongs to
[[dashboard]]/spec, which owns the DataSource and hands the answer down.

That split is what makes a statement tile testable at all: a balance sheet is a pure function of its
view-model, so a fixture is a whole test and no boot is needed. It is also why the null case is a
render rather than a throw — `data: null` is *not loaded yet*, a state the tile must draw.

## The barrel is the address

`@/widget`, never `@/widget/TrialBalanceWidget` ([[convention]]/import). The deep path is an
internal spelling; the index is the contract, and the panels that are not re-exported here are not
part of it.

**Honest boundary.** These tiles are proven against view-models, never against the ledger — a
balance sheet that renders a wrong-but-well-formed VM passes. The arithmetic is [[analytics]]'s to
prove, and the posting behind it is [[accounting]]'s.

**Law — [[law]]: a tile draws its argument. The moment a widget fetches, its proof needs a
database, and the tile stops being a function.**

## Standards

- **WCAG 2.2 §1.3.1** — info and relationships: a section heading names the rows it owns.
- **ISO/IEC 25010:2023 §5.5** — testability: a pure render is provable from a fixture.

Composes: [[widget]]/section · [[analytics]] · [[dashboard]] · [[convention]]/import · [[law]].
