/**
 * InvoiceLines `beforeValidate` chain — composes the canonical generic
 * hooks the collection needs (currently just tenant auto-population).
 *
 * Per the canonical convention: every collection that uses `beforeValidate`
 * exposes its chain from `<Collection>/hooks/beforeValidate.ts` so the
 * collection's `index.ts` only ever imports its own local file. New
 * line-specific hooks (e.g. line-total recompute) are added here.
 *
 * @standard EN-16931:2017 §BG-25 invoice-line
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @audit ISO-19011:2018 audit-trail
 * @see docs/STANDARDS.md §3
 */

import { autoPopulateTenant } from '../../../../hooks/autoPopulateTenant'

export const invoiceLinesBeforeValidate = [autoPopulateTenant]
