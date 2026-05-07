import type { ProductsValidation } from '@payloadcms/plugin-ecommerce/types'

/** Blocks checkout when inventory is tracked and quantity exceeds stock. */
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
    throw new Error(`Insufficient stock (${stock} available).`)
  }
}
