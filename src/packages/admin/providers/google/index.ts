/**
 * Google Workspace — the Admin SDK (Directory, Reports, Data Transfer), Licensing and Groups
 * Settings, mapped onto Payload's collections.
 *
 * `schema.json` is a trimmed copy of Google's own published discovery documents; the mapping
 * below is the only hand-written part. Re-vendor the schema to see what a new revision adds: a
 * new property shows up as "undecided" until someone maps it.
 *
 * @see https://developers.google.com/workspace/admin/directory/reference/rest
 * @see ../index.ts (coverage) · ../types.ts
 */
import schema from '@/packages/admin/providers/google/schema.json'
import { na, type Provider } from '@/packages/admin/providers/types'

const MAIL = 'a mail-service setting; erpax carries no mailbox'
const DEVICES = 'erpax manages no end-user devices'
const AUTH = "Payload's own auth holds sessions, API keys and password hashing; a provider's grants, app passwords and backup codes have no counterpart"

export const google: Provider = {
  slug: 'google',
  title: 'Google Workspace',
  source: schema.source,
  schemas: schema.schemas,
  ignore: ['kind', 'etag', 'etags', 'selfLink'],
  resources: [
    {
      schema: 'User',
      fields: {
        id: 'users.id',
        primaryEmail: 'users.email',
        password: 'users.password',
        name: 'users.name',
        suspended: 'users.active',
        archived: 'users.active',
        suspensionReason: 'users.inactiveReason',
        orgUnitPath: 'users.orgUnit',
        aliases: 'users.aliases',
        emails: 'users.emails',
        phones: 'users.phoneNumbers',
        externalIds: 'users.externalIds',
        recoveryEmail: 'users.recoveryEmail',
        recoveryPhone: 'users.recoveryPhone',
        addresses: 'users.addresses',
        languages: 'users.config.localization.defaultLocale',
        organizations: 'employees.jobTitle',
        relations: 'employees.manager',
        isAdmin: 'users.roles',
        isDelegatedAdmin: 'users.roleAssignments',
        customerId: 'users.tenants',
        creationTime: 'users.createdAt',
        lastLoginTime: 'users.lastLogin',
        agreedToTerms: 'users.termsAcceptedAt',
        changePasswordAtNextLogin: 'users.mustChangePassword',
        thumbnailPhotoUrl: 'users.photo',
        deletionTime: 'users.deletedAt',
        ...na('the photo is one upload; its etag is transport', 'thumbnailPhotoEtag'),
        ...na(AUTH, 'hashFunction', 'isEnrolledIn2Sv', 'isEnforcedIn2Sv'),
        ...na(MAIL, 'isMailboxSetup', 'includeInGlobalAddressList', 'nonEditableAliases'),
        ...na('deprecated by the provider', 'ipWhitelisted'),
        ...na('erpax gives no shell accounts', 'posixAccounts', 'sshPublicKeys'),
        ...na('`active` records the state; when it changed is in the version history', 'suspensionTime', 'archivalTime'),
      },
    },
    { schema: 'UserName', fields: { givenName: 'users.givenName', familyName: 'users.familyName', fullName: 'users.name', displayName: 'users.name' } },
    {
      schema: 'Group',
      fields: {
        id: 'groups.id',
        email: 'groups.email',
        name: 'groups.name',
        description: 'groups.description',
        aliases: 'groups.aliases',
        adminCreated: 'groups.adminCreated',
        directMembersCount: 'groups.memberCount',
        externalIds: 'groups.externalIds',
        ...na(MAIL, 'nonEditableAliases'),
      },
    },
    {
      schema: 'Member',
      fields: { id: 'groups.members.member', type: 'groups.members.member', email: 'groups.members.email', role: 'groups.members.role', ...na(MAIL, 'delivery_settings', 'status') },
    },
    { schema: 'GroupSettings', na: 'mailing-list behaviour (who may post, moderation, archives); an erpax group carries no mailing list', fields: {} },
    {
      schema: 'OrgUnit',
      fields: {
        orgUnitId: 'org-units.id',
        name: 'org-units.name',
        description: 'org-units.description',
        blockInheritance: 'org-units.blockInheritance',
        parentOrgUnitId: 'org-units.parent',
        parentOrgUnitPath: 'org-units.breadcrumbs',
        orgUnitPath: 'org-units.breadcrumbs',
      },
    },
    {
      schema: 'Role',
      fields: { roleId: 'roles.id', roleName: 'roles.name', roleDescription: 'roles.description', rolePrivileges: 'roles.capability', isSuperAdminRole: 'roles.capability', isSystemRole: 'roles.system' },
    },
    {
      schema: 'RoleAssignment',
      fields: {
        roleId: 'users.roleAssignments',
        assignedTo: 'users.id',
        scopeType: 'roles.binding',
        orgUnitId: 'roles.resource',
        ...na('a role is assigned as a relationship on the user; the assignment has no id of its own', 'roleAssignmentId'),
        ...na('only users hold roles', 'assigneeType'),
      },
    },
    { schema: 'Privilege', fields: { privilegeName: 'roles.capability', serviceId: 'roles.scopedCollection', serviceName: 'roles.scopedCollection', isOuScopable: 'roles.binding' } },
    {
      schema: 'Customer',
      fields: {
        id: 'tenants.id',
        customerDomain: 'tenants.domain',
        language: 'tenants.config.localization.defaultLocale',
        alternateEmail: 'tenants.contact.email',
        phoneNumber: 'tenants.contact.phone',
        customerCreationTime: 'tenants.createdAt',
        postalAddress: 'tenants.config.identity.country',
      },
    },
    { schema: 'CustomerPostalAddress', fields: { countryCode: 'tenants.config.identity.country', organizationName: 'tenants.config.identity.legalName' } },
    { schema: 'Domains', fields: { domainName: 'tenants.domain', isPrimary: 'tenants.domain', creationTime: 'tenants.createdAt', verified: 'tenants.domains.verified', domainAliases: 'tenants.domains' } },
    { schema: 'DomainAlias', fields: { domainAliasName: 'tenants.domains.name', parentDomainName: 'tenants.domain', verified: 'tenants.domains.verified', creationTime: 'tenants.createdAt' } },
    { schema: 'Token', na: AUTH, fields: {} },
    { schema: 'Asp', na: AUTH, fields: {} },
    { schema: 'VerificationCode', na: AUTH, fields: {} },
    { schema: 'MobileDevice', na: DEVICES, fields: {} },
    { schema: 'ChromeOsDevice', na: DEVICES, fields: {} },
    {
      schema: 'Building',
      fields: { buildingId: 'properties.code', buildingName: 'properties.name', description: 'properties.description', address: 'properties.address', floorNames: 'properties.measurements.numberOfFloors' },
    },
    {
      schema: 'CalendarResource',
      fields: {
        resourceId: 'bookable-resources.code',
        resourceName: 'bookable-resources.name',
        resourceDescription: 'bookable-resources.description',
        userVisibleDescription: 'bookable-resources.description',
        resourceType: 'bookable-resources.kind',
        resourceCategory: 'bookable-resources.category',
        capacity: 'bookable-resources.capacity',
        buildingId: 'bookable-resources.space',
        featureInstances: 'bookable-resources.amenities',
        ...na('generated by the provider from the other fields', 'generatedResourceName'),
        ...na(MAIL, 'resourceEmail'),
      },
    },
    { schema: 'Feature', fields: { name: 'bookable-resources.amenities.tag' } },
    { schema: 'Activity', fields: { id: 'audit-events.eventId', actor: 'audit-events.user', events: 'audit-events.changes' } },
    { schema: 'UsageReport', fields: { date: 'usage-records.eventTime', entity: 'usage-records.sourceId', parameters: 'usage-records.quantity' } },
    { schema: 'LicenseAssignment', fields: { productId: 'subscriptions.plan', productName: 'subscriptions.plan', skuId: 'subscriptions.plan', skuName: 'subscriptions.plan' } },
  ],
}
