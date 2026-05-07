import { resendAdapter } from '@payloadcms/email-resend'
import { APIError } from 'payload'

import type { EmailAdapter } from 'payload'

import {
  resolveResendApiKeyForMessage,
  resolveResendDefaultsForMessage,
} from '@/utilities/tenantRemoteSecrets'

/**
 * Resend adapter: API key and default From address/name come from the tenant linked to the recipient user(s).
 * Development: falls back to `RESEND_API_KEY` / `EMAIL_DEFAULT_*` when no tenant key matches.
 */
export const tenantAwareResendEmailAdapter: EmailAdapter = ({ payload }) => ({
  name: 'tenant-resend',
  defaultFromAddress: process.env.EMAIL_DEFAULT_FROM_ADDRESS || 'onboarding@resend.dev',
  defaultFromName: process.env.EMAIL_DEFAULT_FROM_NAME || 'erpax',
  sendEmail: async (message) => {
    const apiKey = await resolveResendApiKeyForMessage(payload, message)
    if (!apiKey) {
      throw new APIError(
        'No Resend API key: configure the recipient user’s tenant (Tenants → Resend API key), or set RESEND_API_KEY for local development.',
        400,
      )
    }
    const defaults = await resolveResendDefaultsForMessage(payload, message)
    const inner = resendAdapter({
      apiKey,
      defaultFromAddress: defaults.address,
      defaultFromName: defaults.name,
    })({ payload })
    return inner.sendEmail(message)
  },
})
