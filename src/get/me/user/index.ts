/**
 * Resolve the currently-authenticated user from request cookies.
 *
 * @rfc 6265 cookies session-cookie
 * @rfc 7519 jwt session-token
 * @rfc 5322 internet-message-format email-field
 * @security ISO-27001 A.5.16 identity-management
 * @security ISO-27001 A.5.17 authentication-information
 * @security ISO-27002 §8.5 secure-authentication
 * @compliance GDPR Art.6(1)(b) lawful-basis-contract
 * @compliance SOC-2 CC6.1 logical-access-controls
 */

import { PayloadSDKError } from '@payloadcms/sdk'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import type { User } from '@/types'
import { getPayloadSdk } from '@/payload/sdk'
