/**
 * Items `beforeValidate` chain — tenant auto-population for inventory rows.
 *
 * Per the canonical convention: every collection that uses `beforeValidate`
 * exposes its chain from `<Collection>/hooks/beforeValidate.ts`. New
 * item-specific normalisations (SKU canonicalisation, GTIN check digit
 * recompute, etc.) are added here.
 *
 * @standard UN-CEFACT UNSPSC product-classification
 * @standard GS1 GTIN global-trade-item-number
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see docs/STANDARDS.md §3
 */

import { autoPopulateHost } from '@/hooks/autoPopulateHost'

export const itemsBeforeValidate = [autoPopulateHost]
