/**
 * quotes — the offer stage of `sales-orders`.
 *
 * A quote used to be its own collection, converted into an order when accepted. It shared half its
 * fields with the order and described the same thing earlier in its life: goods, quantities and a
 * price, offered to a customer. So it is now a stage of the sales order — pending approval, sent,
 * accepted, rejected or expired — and what remains here is the VIEW: the filter that selects the
 * documents still at the quote stage, and the saved list an operator opens.
 *
 * @accounting IFRS IFRS-15 §10 contract-with-customer (acceptance is contract inception)
 * @see ../sales/orders/index.ts
 */
import { orderPresets, quoteStages } from '@/customers/sales/orders'

/** The filter that selects quotes among the sales orders. */
export const quotesWhere = () => ({ status: { in: quoteStages() } })

/** The saved list that stands where the Quotes collection stood. */
export const quotesPreset = () => orderPresets().find((p) => p.title === 'Quotes')!
