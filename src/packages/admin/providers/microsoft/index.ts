/**
 * Microsoft Entra ID — Microsoft Graph's directory resources, mapped onto Payload's collections.
 *
 * `schema.json` holds the entity types' own properties from Graph's published metadata; the
 * mapping below is the only hand-written part.
 *
 * @see https://learn.microsoft.com/graph/api/resources/users
 * @see ../index.ts (coverage) · ../types.ts
 */
import schema from '@/packages/admin/providers/microsoft/schema.json'
import { na, type Provider } from '@/packages/admin/providers/types'

const ON_PREMISES = 'a mirror of an on-premises directory; erpax has none'
const LICENSING = "the provider's own product licensing"
const MAIL = 'a mail-service setting; erpax carries no mailbox'
const PROFILE = 'a free-text profile page; not directory data'

export const microsoft: Provider = {
  slug: 'microsoft',
  title: 'Microsoft Entra ID',
  source: schema.source,
  schemas: schema.schemas,
  resources: [
    {
      schema: 'user',
      fields: {
        userPrincipalName: 'users.email',
        mail: 'users.email',
        passwordProfile: 'users.password',
        displayName: 'users.name',
        givenName: 'users.givenName',
        surname: 'users.familyName',
        preferredName: 'users.nickname',
        accountEnabled: 'users.active',
        otherMails: 'users.emails',
        proxyAddresses: 'users.aliases',
        mailNickname: 'users.aliases',
        businessPhones: 'users.phoneNumbers',
        mobilePhone: 'users.phoneNumbers',
        faxNumber: 'users.phoneNumbers',
        identities: 'users.externalIds',
        preferredLanguage: 'users.config.localization.defaultLocale',
        createdDateTime: 'users.createdAt',
        signInActivity: 'users.lastLogin',
        lastPasswordChangeDateTime: 'users.passwordChangedAt',
        streetAddress: 'addresses.addressLine1',
        city: 'addresses.city',
        state: 'addresses.state',
        postalCode: 'addresses.postalCode',
        country: 'addresses.country',
        companyName: 'addresses.company',
        jobTitle: 'employees.jobTitle',
        department: 'employees.department',
        employeeId: 'employees.employeeNumber',
        employeeHireDate: 'employees.hireDate',
        hireDate: 'employees.hireDate',
        employeeLeaveDateTime: 'employees.terminationDate',
        employeeType: 'employees.employmentType',
        employeeOrgData: 'employees.department',
        officeLocation: 'employees.workCountry',
        manager: 'employees.manager',
        directReports: 'employees.manager',
        memberOf: 'groups.members.member',
        appRoleAssignments: 'users.roleAssignments',
        ...na('the user has no type; what it is follows from its roles', 'userType', 'creationType', 'isResourceAccount'),
        ...na(ON_PREMISES, 'onPremisesDistinguishedName', 'onPremisesDomainName', 'onPremisesExtensionAttributes', 'onPremisesImmutableId', 'onPremisesLastSyncDateTime', 'onPremisesProvisioningErrors', 'onPremisesSamAccountName', 'onPremisesSecurityIdentifier', 'onPremisesSyncEnabled', 'onPremisesUserPrincipalName', 'securityIdentifier'),
        ...na(LICENSING, 'assignedLicenses', 'assignedPlans', 'licenseAssignmentStates', 'provisionedPlans', 'serviceProvisioningErrors', 'usageLocation', 'preferredDataLocation'),
        ...na(MAIL, 'mailboxSettings', 'showInAddressList', 'imAddresses'),
        ...na(PROFILE, 'aboutMe', 'birthday', 'interests', 'mySite', 'pastProjects', 'responsibilities', 'schools', 'skills'),
        ...na("Payload's own auth holds password policy and sessions", 'passwordPolicies', 'signInSessionsValidFromDateTime', 'authorizationInfo'),
        ...na('age and consent classification of a consumer account', 'ageGroup', 'consentProvidedForMinor', 'legalAgeGroupClassification'),
        ...na('the state of a guest invitation', 'externalUserState', 'externalUserStateChangeDateTime'),
        ...na('erpax manages no end-user devices or printers', 'deviceEnrollmentLimit', 'print'),
      },
    },
    {
      schema: 'group',
      fields: {
        displayName: 'groups.name',
        description: 'groups.description',
        mail: 'groups.email',
        proxyAddresses: 'groups.aliases',
        mailNickname: 'groups.aliases',
        members: 'groups.members',
        owners: 'groups.members.role',
        memberOf: 'groups.members.member',
        createdDateTime: 'groups.createdAt',
        visibility: 'groups.visibility',
        groupTypes: 'groups.kind',
        securityEnabled: 'groups.kind',
        mailEnabled: 'groups.kind',
        membershipRule: 'groups.membershipRule',
        isAssignableToRole: 'roles.resource',
        appRoleAssignments: 'roles.resource',
        ...na(ON_PREMISES, 'onPremisesDomainName', 'onPremisesExtensionAttributes', 'onPremisesLastSyncDateTime', 'onPremisesNetBiosName', 'onPremisesProvisioningErrors', 'onPremisesSamAccountName', 'onPremisesSecurityIdentifier', 'onPremisesSyncEnabled', 'securityIdentifier'),
        ...na(LICENSING, 'assignedLicenses', 'hasMembersWithLicenseErrors', 'licenseProcessingState', 'serviceProvisioningErrors', 'preferredDataLocation'),
        ...na(MAIL, 'allowExternalSenders', 'autoSubscribeNewMembers', 'hideFromAddressLists', 'hideFromOutlookClients', 'isFavorite', 'isSubscribedByMail', 'unseenConversationsCount', 'unseenCount', 'unseenMessagesCount', 'welcomeMessageEnabled', 'isArchived', 'theme', 'resourceBehaviorOptions', 'resourceProvisioningOptions'),
      },
    },
    {
      schema: 'administrativeUnit',
      fields: { displayName: 'org-units.name', description: 'org-units.description', members: 'users.orgUnit', scopedRoleMembers: 'roles.resource' },
    },
    { schema: 'directoryRole', fields: { displayName: 'roles.name', description: 'roles.description', members: 'users.roleAssignments', roleTemplateId: 'roles.id' } },
    {
      schema: 'unifiedRoleDefinition',
      fields: { displayName: 'roles.name', description: 'roles.description', rolePermissions: 'roles.capability', resourceScopes: 'roles.scopedCollection', isBuiltIn: 'roles.system', isPrivileged: 'roles.capability', templateId: 'roles.id' },
    },
    {
      schema: 'unifiedRoleAssignment',
      fields: { roleDefinitionId: 'users.roleAssignments', principalId: 'users.id', directoryScopeId: 'roles.resource', appScopeId: 'roles.scopedCollection', principalOrganizationId: 'users.tenants' },
    },
    {
      schema: 'organization',
      fields: {
        displayName: 'tenants.name',
        verifiedDomains: 'tenants.domain',
        businessPhones: 'tenants.contact.phone',
        technicalNotificationMails: 'tenants.contact.email',
        country: 'tenants.config.identity.country',
        countryLetterCode: 'tenants.config.identity.country',
        preferredLanguage: 'tenants.config.localization.defaultLocale',
        createdDateTime: 'tenants.createdAt',
        ...na(ON_PREMISES, 'onPremisesLastSyncDateTime', 'onPremisesSyncEnabled'),
        ...na(LICENSING, 'assignedPlans', 'provisionedPlans', 'defaultUsageLocation', 'partnerTenantType', 'tenantType'),
        ...na('erpax manages no end-user devices', 'mobileDeviceManagementAuthority'),
      },
    },
    {
      schema: 'domain',
      fields: { isDefault: 'tenants.domain', isVerified: 'tenants.domains.verified', isRoot: 'tenants.domains', ...na("Payload's own auth holds password policy and sessions", 'authenticationType', 'passwordNotificationWindowInDays', 'passwordValidityPeriodInDays'), ...na(MAIL, 'supportedServices') },
    },
  ],
}
