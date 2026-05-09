import { resendAdapter } from '@payloadcms/email-resend'

import type { EmailAdapter } from 'payload'

import {
  resolveResendApiKeyForMessage,
  resolveResendDefaultsForMessage,
} from '@/utilities/tenantRemoteSecrets'
import { apiErr, ERR } from '@/utilities/errors'

/**
 * Tenant-aware Resend email adapter — per-tenant API key + From address.
 *
 * API key and default From address/name come from the tenant linked to the
 * recipient user(s); falls back to `RESEND_API_KEY` / `EMAIL_DEFAULT_*` when
 * no tenant key matches (e.g. first admin signup before any tenant exists).
 *
 * @rfc 5321 smtp envelope
 * @rfc 5322 internet-message-format header-fields
 * @rfc 6532 internationalized-email-addresses
 * @rfc 6376 dkim domain-keys-identified-mail (delivered via Resend)
 * @rfc 7208 spf sender-policy-framework (delivered via Resend)
 * @rfc 7489 dmarc (delivered via Resend)
 * @standard BCP-47 language-tag email-locale
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation per-tenant-key
 * @security ISO-27002 §5.17 authentication-information secret-management
 * @compliance GDPR Art.32 security-of-processing
 * @compliance CAN-SPAM US-15-USC-7701
 * @see docs/STANDARDS.md §6
 */
export const tenantAwareResendEmailAdapter: EmailAdapter = ({ payload }) => ({
  name: 'tenant-resend',
  defaultFromAddress: process.env.EMAIL_DEFAULT_FROM_ADDRESS || 'onboarding@resend.dev',
  defaultFromName: process.env.EMAIL_DEFAULT_FROM_NAME || 'site',
  sendEmail: async (message) => {
    const apiKey = await resolveResendApiKeyForMessage(payload, message)
    if (!apiKey) {
      payload.logger.warn({
        msg: 'No Resend API key for tenant-aware email',
      })
      throw apiErr(ERR.EMAIL_SEND_CONFIG)
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
