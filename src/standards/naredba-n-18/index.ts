/**
 * naredba-n-18 — barrel for the Bulgarian СУПТО (Наредба Н-18) fiscal-regime
 * atoms: fiscalization scope (which payment types must issue a fiscal
 * receipt), the УНП unique-sales-number, and the А/Б/В/Г VAT tax-groups.
 * Gives the folder the `index.ts` every `src/standards/<id>/` carries
 * (architecture-invariant `standards-folder-shape`).
 *
 * @standard BG Наредба-Н-18 §СУПТО retail-fiscal-regime
 * @standard BG ЗДДС §118 fiscal-receipt-obligation
 */
export * from './scope'
export * from './unp'
export * from './vat-groups'
