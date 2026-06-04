/**
 * Google Workspace API registry — the computed catalogue of the Workspace
 * services erpax fuses with to fill its office/productivity gaps (the business
 * core models accounting/manufacturing/commerce/HR; Workspace supplies email,
 * calendar, drive, docs, sheets, directory).
 *
 * Mirrors the country-API registry (`src/config/country-apis`): ONE declarative
 * array, helpers derive everything (scopes, gap-map) — computed-not-hardcoded.
 * Each entry names the OAuth scopes, the REST base, the Google-native id that
 * anchors a resource's identity, and the erpax collection (`fills`) the service
 * closes the gap of. Like country-apis, this is the CATALOGUE — credentials are
 * never here: a tenant's OAuth client/refresh token lives in the per-tenant
 * config sandbox (`tenant.config.integrations.googleWorkspace.auth.*`), encrypted
 * and resolved at call time, exactly as `tenant.config.countryApis[code].auth.*`.
 *
 * @standard IETF RFC 6749 OAuth 2.0 authorization-framework
 * @standard OpenID Connect Core 1.0 (Google as the OIDC provider)
 * @standard Google API Discovery Service (the live machine-readable surface)
 * @see src/config/country-apis/index.ts — the sibling external-API registry
 * @see ./fusion.ts — the content-uuid bridge that merges a fetched resource into the mesh
 */

/** The Workspace services erpax knows how to fuse. */
export type WorkspaceServiceId =
  | 'gmail'
  | 'calendar'
  | 'drive'
  | 'docs'
  | 'sheets'
  | 'people'
  | 'admin-directory'

/** One Workspace API in the catalogue — the same shape family as `CountryApi`. */
export interface WorkspaceApi {
  readonly service: WorkspaceServiceId
  readonly name: string
  /** OAuth 2.0 read scopes (the least-privilege set for ingest). */
  readonly readScopes: ReadonlyArray<string>
  /** OAuth 2.0 write scopes (only requested for write-back). */
  readonly writeScopes: ReadonlyArray<string>
  /** REST base URL (versioned). */
  readonly baseUrl: string
  /** Google API Discovery document — the live, machine-readable surface. */
  readonly discoveryUrl: string
  /** the Google-native id field that anchors a resource's identity (the externalRef key). */
  readonly nativeIdField: string
  /** the erpax collection slug this service fills the gap of. */
  readonly fills: string
  readonly description: string
  /** `true` once `./clients/<service>.ts` ships a working client; catalogue-only otherwise. */
  readonly clientImplemented: boolean
}

const SCOPE = 'https://www.googleapis.com/auth/'

/**
 * The catalogue. Ordered office → records: the comms/scheduling/files surface,
 * then the documents that fuse to accounting, then the directory that fuses to actors.
 */
export const GOOGLE_WORKSPACE_APIS: ReadonlyArray<WorkspaceApi> = [
  {
    service: 'gmail',
    name: 'Gmail API',
    readScopes: [`${SCOPE}gmail.readonly`],
    writeScopes: [`${SCOPE}gmail.modify`],
    baseUrl: 'https://gmail.googleapis.com/gmail/v1',
    discoveryUrl: 'https://gmail.googleapis.com/$discovery/rest?version=v1',
    nativeIdField: 'id',
    fills: 'messages',
    description: 'Email threads/messages → messages (subject/body/parties), threaded by the RFC822 message id.',
    clientImplemented: false,
  },
  {
    service: 'calendar',
    name: 'Google Calendar API',
    readScopes: [`${SCOPE}calendar.readonly`],
    writeScopes: [`${SCOPE}calendar.events`],
    baseUrl: 'https://www.googleapis.com/calendar/v3',
    discoveryUrl: 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
    nativeIdField: 'iCalUID',
    fills: 'bookings',
    description: 'Events → bookings (start/end/attendees, RFC 5545 rrule), keyed by the cross-system iCalUID.',
    clientImplemented: false,
  },
  {
    service: 'drive',
    name: 'Google Drive API',
    readScopes: [`${SCOPE}drive.readonly`],
    writeScopes: [`${SCOPE}drive.file`],
    baseUrl: 'https://www.googleapis.com/drive/v3',
    discoveryUrl: 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest',
    nativeIdField: 'id',
    fills: 'media',
    description: 'Files → media (content-addressed, so the same file dedups against an R2 upload of identical bytes).',
    clientImplemented: false,
  },
  {
    service: 'docs',
    name: 'Google Docs API',
    readScopes: [`${SCOPE}documents.readonly`],
    writeScopes: [`${SCOPE}documents`],
    baseUrl: 'https://docs.googleapis.com/v1',
    discoveryUrl: 'https://docs.googleapis.com/$discovery/rest?version=v1',
    nativeIdField: 'documentId',
    fills: 'media',
    description: 'Documents → media (the file) + Lexical (the body), keyed by documentId.',
    clientImplemented: false,
  },
  {
    service: 'sheets',
    name: 'Google Sheets API',
    readScopes: [`${SCOPE}spreadsheets.readonly`],
    writeScopes: [`${SCOPE}spreadsheets`],
    baseUrl: 'https://sheets.googleapis.com/v4',
    discoveryUrl: 'https://sheets.googleapis.com/$discovery/rest?version=v4',
    nativeIdField: 'spreadsheetId',
    fills: 'journal-entries',
    description: 'A transaction sheet → journal-entries (each row a balanced debit/credit pair, the accounting fusion).',
    clientImplemented: false,
  },
  {
    service: 'people',
    name: 'Google People API',
    readScopes: [`${SCOPE}contacts.readonly`],
    writeScopes: [`${SCOPE}contacts`],
    baseUrl: 'https://people.googleapis.com/v1',
    discoveryUrl: 'https://people.googleapis.com/$discovery/rest?version=v1',
    nativeIdField: 'resourceName',
    fills: 'users',
    description: 'Contacts/profiles → users (the actor-merge: one party across user=employee=agent), keyed by resourceName.',
    clientImplemented: false,
  },
  {
    service: 'admin-directory',
    name: 'Google Admin SDK Directory API',
    readScopes: [`${SCOPE}admin.directory.user.readonly`],
    writeScopes: [`${SCOPE}admin.directory.user`],
    baseUrl: 'https://admin.googleapis.com/admin/directory/v1',
    discoveryUrl: 'https://admin.googleapis.com/$discovery/rest?version=directory_v1',
    nativeIdField: 'id',
    fills: 'users',
    description: 'Workspace directory users → users (org provisioning), keyed by the directory user id.',
    clientImplemented: false,
  },
]

/** Resolve a single Workspace API by its service id. */
export function workspaceApi(service: WorkspaceServiceId): WorkspaceApi | undefined {
  return GOOGLE_WORKSPACE_APIS.find((a) => a.service === service)
}

/** Which Workspace services fill the gap of a given erpax collection (computed, not hand-listed). */
export function workspaceApisForGap(collectionSlug: string): ReadonlyArray<WorkspaceApi> {
  return GOOGLE_WORKSPACE_APIS.filter((a) => a.fills === collectionSlug)
}

/** The deduped union of every scope to request for a mode — what the OAuth consent screen asks for. */
export function allWorkspaceScopes(mode: 'read' | 'write'): string[] {
  const scopes = GOOGLE_WORKSPACE_APIS.flatMap((a) => (mode === 'read' ? a.readScopes : a.writeScopes))
  return [...new Set(scopes)].sort()
}

/** Every service id in the catalogue. */
export const WORKSPACE_SERVICES: ReadonlyArray<WorkspaceServiceId> = GOOGLE_WORKSPACE_APIS.map((a) => a.service)
