/**
 * Item GL Posting Hook — superseded by event-driven inventory posting.
 *
 * Inventory accounting flows are already covered by canonical events:
 *   • `inventory:purchased`  fired from bill activation → glPostingService
 *                            posts Dr Inventory / Cr AP.
 *   • `inventory:sold`       fired from invoice activation (when line
 *                            `costAmount > 0`) → posts Dr COGS / Cr Inventory.
 *
 * Stand-alone inventory adjustments (writedowns, transfers, count
 * variances) belong in a dedicated `InventoryMovements` write-path with
 * its own event (e.g., `inventory:adjusted`) — that's a follow-up slice.
 *
 * The previous body called the phantom `glPostingService.postItem(...)`
 * method that doesn't exist on `GLPostingService`; the wrapping try/catch
 * silently swallowed the resulting TypeError so JEs were never posted.
 *
 * @accounting IFRS IAS-2 inventories
 * @accounting US-GAAP ASC-330 inventory cost-flow
 * @audit ISO-19011:2018 audit-trail
 * @compliance SOX §404 internal-controls
 * @see src/services/gl-posting.service.ts postInventoryPurchased / postInventorySold
 * @see docs/adr/0001-event-driven-gl-posting.md
 */

import type { CollectionAfterChangeHook } from 'payload'

/**
 * @deprecated Inventory accounting fires from invoice/bill activation events;
 * stand-alone inventory adjustments will get their own canonical event in a
 * follow-up slice.
 */
export const itemAccountingHook: CollectionAfterChangeHook = ({ doc }) => doc
