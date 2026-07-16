/**
 * Product validation — block checkout if quantity exceeds tracked inventory.
 *
 * @accounting IFRS IAS-2 inventories quantity-tracking
 * @accounting US-GAAP ASC-330 inventory
 * @standard GS1 GTIN global-trade-item-number
 * @standard schema.org Product
 * @audit ISO-19011:2018 audit-trail
 * @see docs/STANDARDS.md §3 §4.2
 */

import type { ProductsValidation } from '@payloadcms/plugin-ecommerce/types'

import { apiErr, ERR } from '@/error'
export const validateProductCheckout: ProductsValidation = async ({
  product,
  quantity,
  variant,
}) => {
  const variantDoc =
    variant && typeof variant === 'object' && 'inventory' in variant ? variant : undefined

  const stock =
    variantDoc?.inventory != null
      ? variantDoc.inventory
      : product && typeof product === 'object' && 'inventory' in product
        ? product.inventory
        : null

  if (stock != null && stock < quantity) {
    throw apiErr(ERR.PAY_INSUFFICIENT_STOCK)
  }
}
