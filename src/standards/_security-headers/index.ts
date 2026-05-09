/**
 * Public surface of the `_security-headers` composite standards module.
 *
 * @rfc 6797 hsts
 * @standard W3C CSP-3
 * @standard W3C Permissions-Policy
 */
export {
  defaultSecurityHeaders,
  buildSecurityHeaders,
  applySecurityHeaders,
  type SecurityHeadersConfig,
} from './headers'
