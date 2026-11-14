import type { Field } from 'payload'

/** The НАП fiscal-QR payload string carried on an electronic receipt. */
export const fiscalQrField = (): Field => ({
  name: 'qrData',
  type: 'text',
  admin: { readOnly: true, description: 'НАП fiscal-QR payload (device*УНП*date*time*sum).' },
})
