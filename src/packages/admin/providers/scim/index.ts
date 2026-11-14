/**
 * SCIM 2.0 — the provisioning protocol most directories speak (Slack, Atlassian, AWS, Apple
 * Business Manager and others provision through it), mapped onto Payload's collections.
 *
 * It is the provider-neutral baseline: where Payload has no field of its own, a field takes its
 * SCIM name (`givenName`, `familyName`, `active`, `phoneNumbers`, `externalIds`). `schema.json`
 * lists the attributes of RFC 7643 by hand — the RFC publishes no machine-readable document.
 *
 * @standard RFC-7643 §3.1 common attributes · §4.1 User · §4.2 Group · §4.3 Enterprise User
 * @see ../index.ts (coverage) · ../types.ts
 */
import schema from '@/packages/admin/providers/scim/schema.json'
import { na, type Provider } from '@/packages/admin/providers/types'

export const scim: Provider = {
  slug: 'scim',
  title: 'SCIM 2.0',
  source: schema.source,
  schemas: schema.schemas,
  resources: [
    {
      schema: 'User',
      fields: {
        id: 'users.id',
        externalId: 'users.externalIds',
        meta: 'users.updatedAt',
        userName: 'users.email',
        password: 'users.password',
        name: 'users.name',
        displayName: 'users.name',
        nickName: 'users.nickname',
        profileUrl: 'users.photo',
        photos: 'users.photo',
        title: 'employees.jobTitle',
        preferredLanguage: 'users.config.localization.defaultLocale',
        locale: 'users.config.localization.defaultLocale',
        timezone: 'users.timezone',
        active: 'users.active',
        emails: 'users.emails',
        phoneNumbers: 'users.phoneNumbers',
        addresses: 'users.addresses',
        groups: 'groups.members.member',
        roles: 'users.roleAssignments',
        entitlements: 'users.roles',
        ...na('the user has no type; what it is follows from its roles', 'userType'),
        ...na('erpax carries no instant-messaging addresses or client certificates', 'ims', 'x509Certificates'),
      },
    },
    {
      schema: 'Name',
      fields: { formatted: 'users.name', givenName: 'users.givenName', familyName: 'users.familyName', middleName: 'users.middleName', honorificPrefix: 'addresses.title', ...na('no field for a name suffix', 'honorificSuffix') },
    },
    {
      schema: 'Address',
      fields: { streetAddress: 'addresses.addressLine1', locality: 'addresses.city', region: 'addresses.state', postalCode: 'addresses.postalCode', country: 'addresses.country', ...na('computed from the parts', 'formatted'), ...na('an address is one document; it has no kind or rank', 'type', 'primary') },
    },
    {
      schema: 'EnterpriseUser',
      fields: { employeeNumber: 'employees.employeeNumber', costCenter: 'employees.department', organization: 'addresses.company', division: 'employees.department', department: 'employees.department', manager: 'employees.manager' },
    },
    { schema: 'Group', fields: { id: 'groups.id', externalId: 'groups.externalIds', meta: 'groups.updatedAt', displayName: 'groups.name', members: 'groups.members' } },
    { schema: 'Member', fields: { value: 'groups.members.member', $ref: 'groups.members.member', type: 'groups.members.member', display: 'groups.members.email' } },
  ],
}
