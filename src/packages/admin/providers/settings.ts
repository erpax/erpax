/**
 * Provider settings — where a provider is switched on, at two levels.
 *
 *   installation   the `providers` global: which providers this erpax offers at all, and the
 *                  app registration it holds with each (the client an app store listing uses)
 *   tenant         `tenants.providers`: a tenant's own connection — its account at the provider,
 *                  its domain, and its own app registration when it brings one
 *
 * `effective` puts the two together: a provider serves a tenant only when the installation offers
 * it AND the tenant has switched it on; the tenant's own registration wins over the
 * installation's. Both lists are plain Payload arrays built here, so the two levels cannot drift.
 *
 * @standard RFC-6749 OAuth 2.0 client registration (client id and secret)
 * @security ISO-27001 A.5.17 authentication-information — secrets are readable by super-admins only
 * @see ./index.ts (PROVIDERS) · src/globals/providers/config.ts · src/collections/tenants
 */
import type { ArrayField, Field, FieldAccess } from 'payload'

export interface ProviderOption {
  readonly slug: string
  readonly title: string
}

export interface ProviderSetting {
  provider?: string | null
  enabled?: boolean | null
  clientId?: string | null
  clientSecret?: string | null
  /** Tenant level: the tenant's id at the provider (a customer id, a directory id, an org URL). */
  account?: string | null
  /** Tenant level: the domain the tenant owns at the provider. */
  domain?: string | null
  /** Tenant level: keep users, groups and org units in step with the provider. */
  directory?: boolean | null
}

export interface SecretAccess {
  readonly create: FieldAccess
  readonly read: FieldAccess
  readonly update: FieldAccess
}

const registration = (secret: SecretAccess): Field[] => [
  { name: 'clientId', type: 'text', admin: { description: 'The app registration: its client id at the provider.' } },
  { name: 'clientSecret', type: 'text', access: secret, admin: { description: 'The app registration: its secret. Readable by super-admins only.' } },
]

const choice = (providers: readonly ProviderOption[]): Field => ({
  name: 'provider',
  type: 'select',
  required: true,
  options: providers.map((provider) => ({ label: provider.title, value: provider.slug })),
})

/** The installation's list: one row per provider erpax offers. */
export const installationProviders = (providers: readonly ProviderOption[], secret: SecretAccess): ArrayField => ({
  name: 'providers',
  type: 'array',
  admin: { description: 'The providers this installation offers. A tenant can switch on only what is listed and enabled here.' },
  fields: [choice(providers), { name: 'enabled', type: 'checkbox', defaultValue: true }, ...registration(secret)],
})

/** A tenant's list: one row per provider the tenant has connected. */
export const tenantProviders = (providers: readonly ProviderOption[], secret: SecretAccess): ArrayField => ({
  name: 'providers',
  type: 'array',
  admin: { description: "This tenant's connections to outside directories." },
  fields: [
    choice(providers),
    { name: 'enabled', type: 'checkbox', defaultValue: true },
    { name: 'account', type: 'text', admin: { description: "The tenant's id at the provider: a customer id, a directory id, an organisation URL." } },
    { name: 'domain', type: 'text', admin: { description: 'The domain the tenant owns at the provider.' } },
    { name: 'directory', type: 'checkbox', defaultValue: false, admin: { description: 'Keep users, groups and org units in step with the provider.' } },
    ...registration(secret),
  ],
})

export interface Effective {
  readonly provider: string
  readonly clientId?: string
  readonly clientSecret?: string
  readonly account?: string
  readonly domain?: string
  readonly directory: boolean
  /** Whose app registration is used. */
  readonly registration: 'tenant' | 'installation' | 'none'
}

const row = (rows: readonly ProviderSetting[] | null | undefined, provider: string): ProviderSetting | undefined => (rows ?? []).find((candidate) => candidate.provider === provider)
const text = (value: string | null | undefined): string | undefined => (typeof value === 'string' && value.trim() !== '' ? value : undefined)

/**
 * The settings a provider runs with for one tenant, or `undefined` when it does not serve that
 * tenant: the installation must offer it and the tenant must have switched it on.
 */
export const effective = (
  installation: { providers?: readonly ProviderSetting[] | null } | null | undefined,
  tenant: { providers?: readonly ProviderSetting[] | null } | null | undefined,
  provider: string,
): Effective | undefined => {
  const offered = row(installation?.providers, provider)
  const connected = row(tenant?.providers, provider)
  if (!offered || offered.enabled === false || !connected || connected.enabled === false) return undefined
  const own = text(connected.clientId) !== undefined
  const clientId = own ? text(connected.clientId) : text(offered.clientId)
  const clientSecret = own ? text(connected.clientSecret) : text(offered.clientSecret)
  return {
    provider,
    ...(clientId !== undefined ? { clientId } : {}),
    ...(clientSecret !== undefined ? { clientSecret } : {}),
    ...(text(connected.account) !== undefined ? { account: text(connected.account) } : {}),
    ...(text(connected.domain) !== undefined ? { domain: text(connected.domain) } : {}),
    directory: connected.directory === true,
    registration: own ? 'tenant' : clientId !== undefined ? 'installation' : 'none',
  }
}

/** The providers that serve a tenant. */
export const serving = (
  installation: { providers?: readonly ProviderSetting[] | null } | null | undefined,
  tenant: { providers?: readonly ProviderSetting[] | null } | null | undefined,
): Effective[] => [...new Set((tenant?.providers ?? []).map((setting) => setting.provider).filter((slug): slug is string => typeof slug === 'string'))].flatMap((slug) => effective(installation, tenant, slug) ?? [])
