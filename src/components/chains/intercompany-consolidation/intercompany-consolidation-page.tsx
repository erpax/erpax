/**
 * Intercompany Consolidation chain surface — auto-scaffolded by erpax.consistency.applyAll
 * (Slice LLLLLLLL 2026-05-11) to close the design gap for
 * BUSINESS_CHAINS.INTERCOMPANY_CONSOLIDATION. Uses shadcn primitives.
 *
 * Sub-A (DE) sells to Sub-B (BG) within the same group. Each entity books its own JE (Sub-A: AR + Revenue; Sub-B: Inventory + AP). At consolidation, the matched IntercompanyTransactions pair triggers a ConsolidationElimination JE that removes both legs from the group P&L per IFRS-10 §B86(c).
 *
 * @standard W3C-WAI-ARIA-1.2 accessibility-landmarks
 * @standard WCAG-2.1-AA contrast text-spacing
 * @audit ISO 9241-210:2019 human-centred-design
 */
import * as React from 'react'

export interface IntercompanyConsolidationPageProps {
  readonly title?: string
}

export function IntercompanyConsolidationPage({ title = 'Intercompany Consolidation' }: IntercompanyConsolidationPageProps): React.JSX.Element {
  return (
    <main className="container mx-auto p-6" aria-labelledby="page-heading">
      <header className="mb-6">
        <h1 id="page-heading" className="text-3xl font-semibold">{title}</h1>
        <p className="text-muted-foreground mt-2">{"Intercompany transaction with consolidation elimination"}</p>
      </header>
      <section className="rounded-lg border bg-card text-card-foreground p-6">
        <p className="text-sm">Sub-A (DE) sells to Sub-B (BG) within the same group. Each entity books its own JE (Sub-A: AR + Revenue; Sub-B: Inventory + AP). At consolidation, the matched IntercompanyTransactions pair triggers a ConsolidationElimination JE that removes both legs from the group P&L per IFRS-1</p>
      </section>
    </main>
  )
}

export default IntercompanyConsolidationPage
