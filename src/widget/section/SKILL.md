---
name: section
description: "Use when reasoning about section — content-addressed the widget tree and found the same 48-node body **three times in ** and **three times in ** — a heading, a mapped list of account rows, and a total."
atomPath: "widget/section"
coordinate: "widget/section · 4/weave · 007f2f6b"
contentUuid: "e1b14fb8-e330-5558-b93d-20807d85094a"
diamondUuid: "221af711-d77b-8ae0-8c45-d7d80dc8d6b2"
uuid: "007f2f6b-47e1-843f-826c-883e8ec3f17c"
horo: 4
typography:
  partition: widget
  bondDegree: 41
standards:
  - "IFRS IAS-1 §54 statement-of-financial-position"
  - "WCAG 2.2 §1.3.1 info-and-relationships"
bindings: []
signatures:
  computationUuid: "715c8548-5c9a-844a-b5b3-79868904c465"
  stages:
    - stage: path
      stageUuid: "3e42a724-05a4-8c0a-8ce0-f536cdf68f6c"
    - stage: trinity
      stageUuid: "6563b37a-a5ff-89c2-8d49-25539092e127"
    - stage: boundary
      stageUuid: "dc4abac0-3466-84f8-972b-dccc6fd964d7"
    - stage: links
      stageUuid: "42be79b6-a93f-872f-b416-03ad313b5e10"
    - stage: horo
      stageUuid: "a616f8ed-df26-8706-a8d5-db9cfa4577ed"
    - stage: seal
      stageUuid: "b858698d-0539-8f8e-9b16-32255da1717f"
    - stage: uuid
      stageUuid: "9b9e2afa-8120-862f-9e55-953785f47d1b"
version: 2
---
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
