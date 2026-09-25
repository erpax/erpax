# widget/section — the six sections that were one

`rules/copy` content-addressed the widget tree and found the same 48-node body **three times in
`BalanceSheetWidget`** and **three times in `IncomeStatementWidget`** — a heading, a mapped list of
account rows, and a total. Six copies of one section.

The only thing that genuinely differed was the heading's **tint** (`bg-primary/20` ·
`bg-orange-100` · `bg-green-100`) and the density the income statement uses. Both are parameters,
so the difference is passed in rather than duplicated — the shape `rules/copy` prescribes after the
AR/AP fold: **share the mechanism, parameterise what differs.**

**Honest boundary.** This proves six bodies were the same TEXT and that their closures matched;
it does not claim the two statements mean the same thing. A balance sheet section and an income
statement section are different accounting objects that happen to render identically, and if one
needs a different row later it takes a prop, not a second copy.

**Law — [[law]]: a section rendered six times is one component and five decoys. Content-address the
body, check what it closes over, and pass the difference in.**

## Standards

- **IFRS IAS-1 §54** — statement of financial position line items.
- **WCAG 2.2 §1.3.1** — info and relationships: the heading names the rows it owns.

Composes: [[widget]] · [[format]] · [[rules]]/copy · [[law]].
