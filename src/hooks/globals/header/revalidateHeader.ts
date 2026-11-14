import type { GlobalAfterChangeHook } from 'payload'

export const revalidateHeader: GlobalAfterChangeHook = async ({ doc, req: { payload, context } }) => {
  const { revalidateTag } = await import('next/cache')
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating header`)

    revalidateTag('global_header', 'max')
  }

  return doc
}
