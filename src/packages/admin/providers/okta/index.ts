/**
 * Okta — the Admin Management API's directory resources, mapped onto Payload's collections.
 *
 * `schema.json` holds the property names from Okta's published OpenAPI document; the mapping
 * below is the only hand-written part.
 *
 * @see https://developer.okta.com/docs/api/
 * @see ../index.ts (coverage) · ../types.ts
 */
import schema from '@/packages/admin/providers/okta/schema.json'
import { na, type Provider } from '@/packages/admin/providers/types'

export const okta: Provider = {
  slug: 'okta',
  title: 'Okta',
  source: schema.source,
  schemas: schema.schemas,
  resources: [
    {
      schema: 'User',
      fields: {
        id: 'users.id',
        created: 'users.createdAt',
        lastUpdated: 'users.updatedAt',
        status: 'users.active',
        credentials: 'users.password',
        lastLogin: 'users.lastLogin',
        passwordChanged: 'users.passwordChangedAt',
        profile: 'users.name',
        ...na('`active` records the state; when it changed is in the version history', 'activated', 'statusChanged', 'transitioningToStatus'),
        ...na('the user has no type; what it is follows from its roles', 'type'),
        ...na('a tenant is the realm', 'realmId'),
      },
    },
    {
      schema: 'UserProfile',
      fields: {
        login: 'users.email',
        email: 'users.email',
        secondEmail: 'users.recoveryEmail',
        displayName: 'users.name',
        firstName: 'users.givenName',
        lastName: 'users.familyName',
        middleName: 'users.middleName',
        nickName: 'users.nickname',
        primaryPhone: 'users.phoneNumbers',
        mobilePhone: 'users.phoneNumbers',
        locale: 'users.config.localization.defaultLocale',
        preferredLanguage: 'users.config.localization.defaultLocale',
        timezone: 'users.timezone',
        profileUrl: 'users.photo',
        streetAddress: 'addresses.addressLine1',
        city: 'addresses.city',
        state: 'addresses.state',
        zipCode: 'addresses.postalCode',
        countryCode: 'addresses.country',
        postalAddress: 'addresses.addressLine1',
        organization: 'addresses.company',
        title: 'employees.jobTitle',
        department: 'employees.department',
        division: 'employees.department',
        costCenter: 'employees.department',
        employeeNumber: 'employees.employeeNumber',
        manager: 'employees.manager',
        managerId: 'employees.manager',
        honorificPrefix: 'addresses.title',
        ...na('the user has no type; what it is follows from its roles', 'userType'),
      },
    },
    {
      schema: 'Group',
      fields: { id: 'groups.id', created: 'groups.createdAt', lastUpdated: 'groups.updatedAt', lastMembershipUpdated: 'groups.updatedAt', profile: 'groups.name', type: 'groups.kind', ...na('the provider\'s own class marker', 'objectClass') },
    },
    { schema: 'OktaUserGroupProfile', fields: { name: 'groups.name', description: 'groups.description' } },
    {
      schema: 'Role',
      fields: { id: 'roles.id', label: 'roles.name', description: 'roles.description', type: 'roles.capability', assignmentType: 'roles.binding', created: 'roles.createdAt', lastUpdated: 'roles.updatedAt', status: 'roles.system' },
    },
    {
      schema: 'OrgSetting',
      fields: {
        id: 'tenants.id',
        companyName: 'tenants.name',
        subdomain: 'tenants.slug',
        website: 'tenants.publicSiteUrl',
        phoneNumber: 'tenants.contact.phone',
        supportPhoneNumber: 'tenants.contact.phone',
        country: 'tenants.config.identity.country',
        created: 'tenants.createdAt',
        lastUpdated: 'tenants.updatedAt',
        status: 'tenants.active',
      },
    },
    { schema: 'DomainResponse', fields: { domain: 'tenants.domain', validationStatus: 'tenants.domains.verified', id: 'tenants.domains' } },
  ],
}
