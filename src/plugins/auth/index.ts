/**
 * @erpax/auth — multi-tenant + role-based access control.
 *
 * Master citation index for every file in this folder (`access`, `types`).
 * Inner files inherit these standards.
 *
 * @standard NIST INCITS-359-2012 role-based-access-control
 * @standard NIST SP-800-162 attribute-based-access-control
 * @rfc 9700 oauth-2.1 best-current-practice
 * @rfc 7519 jwt
 * @rfc 6749 oauth-2.0 historic-base
 * @rfc 6750 bearer-token-usage
 * @rfc 7636 pkce
 * @rfc 6265 cookies
 * @security ISO-27001 A.5.15 access-control
 * @security ISO-27001 A.5.16 identity-management
 * @security ISO-27001 A.5.17 authentication-information
 * @security ISO-27001 A.5.18 access-rights
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @security ISO-27002 §5.4 segregation-of-duties
 * @security ISO-27002 §8.5 secure-authentication
 * @standard OWASP-ASVS V2 authentication
 * @standard OWASP-ASVS V4 access-control
 * @compliance GDPR Art.32 security-of-processing
 * @compliance SOC-2 CC6.1 logical-access-controls
 * @compliance SOC-2 CC6.2 access-provisioning
 * @compliance SOC-2 CC6.3 access-removal
 * @see docs/STANDARDS.md §4.4
 */

export * from './types'
export * from './access'
