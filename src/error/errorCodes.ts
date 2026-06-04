/**
 * Error codes use a five-character mask **`ABCDE`**.
 *
 * Maps to RFC 7807 problem-details `type` URI fragments and RFC 9110 §15
 * status codes via `registry.ts`.
 *
 * @rfc 7807 problem-details-for-http-apis type-fragment
 * @rfc 9110 §15 status-codes
 * @standard OWASP-ASVS V7 error-handling-and-logging
 * @see ./registry.ts
 *
 * Mask layout:
 *
 * - **`A`** — primary group (domain); always a **letter** → see {@link GROUP_A}.
 * - **`B`** — secondary group (operation / area within `A`); always a **letter** → see {@link GROUP_B}.
 * - **`CDE`** — three **digits** (001–999), sequence within the `(A,B)` pair.
 *
 * Any **letter** in the mask denotes a **group**; the trailing digits distinguish concrete errors in that
 * group. Full code regex: **`/^[A-Z]{2}\d{3}$/`**.
 *
 * Examples: `AC001` = Authentication + Credentials + #001; `PS001` = Payment + Stripe/config + #001.
 */

/** Position **A**: primary domain (first letter of the code). */
export const GROUP_A = {
  /** Authentication & session */
  A: 'Authentication & session',
  /** Tenant & access control */
  T: 'Tenant & access control',
  /** Validation & field rules */
  V: 'Validation & field rules',
  /** Roles & assignments */
  R: 'Roles & assignments',
  /** Email / messaging */
  M: 'Email / messaging',
  /** Payments & commerce */
  P: 'Payments & commerce',
  /** Preview & drafts */
  X: 'Preview & drafts',
  /** Seed & privileged operations */
  S: 'Seed & privileged operations',
  /** Webhooks */
  W: 'Webhooks',
  /** Internal infrastructure */
  I: 'Internal infrastructure',
} as const

/** Position **B**: subgroup (second letter; combine with `A` for full context). */
export const GROUP_B = {
  /** Credentials / required input */
  C: 'Credentials / required input',
  /** Rate limiting */
  R: 'Rate limiting',
  /** Login / session */
  L: 'Login / session',
  /** Access / forbidden */
  A: 'Access / forbidden',
  /** User identity field */
  U: 'User identity field',
  /** Slug / URL segment */
  S: 'Slug / URL segment',
  /** Duplicate conflict */
  D: 'Duplicate conflict',
  /** Binding / role definition */
  B: 'Binding / role definition',
  /** Configuration (provider, keys) */
  G: 'Configuration',
  /** Checkout / cart payload */
  K: 'Checkout / cart payload',
  /** Payment initiation */
  I: 'Payment initiation',
  /** Transaction lookup */
  T: 'Transaction lookup',
  /** Payment completion / confirm */
  N: 'Payment completion state',
  /** Stripe / processor wiring */
  F: 'Stripe / processor',
  /** Inventory / stock */
  Y: 'Inventory / stock',
  /** Preview secret / token */
  Q: 'Preview secret',
  /** Path / URL parameter */
  P: 'Path / URL parameter',
  /** Preview auth */
  Z: 'Preview auth',
  /** Seed execution */
  E: 'Seed execution',
  /** Webhook transport */
  H: 'Webhook handler',
  /** Outbound / remote fetch */
  O: 'Outbound / remote fetch',
  /** Rich text / rendering */
  W: 'Rich text / rendering',
} as const

export type GroupALetter = keyof typeof GROUP_A
export type GroupBLetter = keyof typeof GROUP_B

const CODE_RE = /^([A-Z])([A-Z])(\d{3})$/

/**
 * Build a five-character code: `[A][B]` letters + three-digit sequence (positions C–E).
 */
export function composeErrorCode(groupA: GroupALetter, groupB: GroupBLetter, seq: number): string {
  if (!Number.isInteger(seq) || seq < 1 || seq > 999) {
    throw new RangeError(`Sequence CDE must be an integer 001–999, got ${seq}`)
  }
  return `${groupA}${groupB}${String(seq).padStart(3, '0')}`
}

export type ParsedErrorCode = {
  /** Primary group letter (mask position A). */
  groupA: GroupALetter
  /** Secondary group letter (mask position B). */
  groupB: GroupBLetter
  /** Numeric suffix (positions C–E). */
  seq: number
}

/** Parse a five-character code into group letters and sequence. */
export function parseErrorCode(code: string): ParsedErrorCode {
  const m = CODE_RE.exec(code.toUpperCase())
  if (!m) {
    throw new RangeError(`Invalid error code mask (expected ABCDE = LLDDD): ${code}`)
  }
  const groupA = m[1] as GroupALetter
  const groupB = m[2] as GroupBLetter
  const seq = Number(m[3])
  if (!(groupA in GROUP_A) || !(groupB in GROUP_B)) {
    throw new RangeError(`Unknown group letters in code: ${code}`)
  }
  return { groupA, groupB, seq }
}

export const ERR = {
  AUTH_CREDENTIALS_REQUIRED: composeErrorCode('A', 'C', 1),
  AUTH_RATE_LIMITED: composeErrorCode('A', 'R', 1),
  AUTH_LOGIN_FAILED: composeErrorCode('A', 'L', 1),
  TENANT_DOCUMENT_FORBIDDEN: composeErrorCode('T', 'A', 1),
  VAL_USERNAME_DUPLICATE: composeErrorCode('V', 'U', 1),
  VAL_SLUG_DUPLICATE: composeErrorCode('V', 'S', 1),
  ROLE_DUPLICATE_ASSIGNMENT: composeErrorCode('R', 'D', 1),
  ROLE_SCOPE_COLLECTION_INVALID: composeErrorCode('R', 'B', 1),
  ROLE_DOCUMENT_REQUIRED: composeErrorCode('R', 'B', 2),
  ROLE_BINDING_INVALID: composeErrorCode('R', 'B', 3),
  EMAIL_SEND_CONFIG: composeErrorCode('M', 'G', 1),
  PAY_PAYMENT_INTENT_REQUIRED: composeErrorCode('P', 'I', 1),
  PAY_TRANSACTION_NOT_FOUND: composeErrorCode('P', 'T', 1),
  PAY_STRIPE_SECRET_MISSING: composeErrorCode('P', 'F', 1),
  PAY_NOT_COMPLETED: composeErrorCode('P', 'N', 1),
  PAY_CART_METADATA_MISSING: composeErrorCode('P', 'K', 1),
  PAY_CART_SNAPSHOT_INVALID: composeErrorCode('P', 'K', 2),
  PAY_INIT_STRIPE_SECRET_MISSING: composeErrorCode('P', 'I', 2),
  PAY_INIT_NOT_CONFIGURED: composeErrorCode('P', 'I', 3),
  PAY_CONFIRM_FAILED: composeErrorCode('P', 'N', 2),
  PAY_INSUFFICIENT_STOCK: composeErrorCode('P', 'Y', 1),
  PREVIEW_SECRET_INVALID: composeErrorCode('X', 'Q', 1),
  PREVIEW_PATH_MISSING: composeErrorCode('X', 'P', 1),
  PREVIEW_PATH_INVALID: composeErrorCode('X', 'P', 2),
  PREVIEW_AUTH_FAILED: composeErrorCode('X', 'Z', 1),
  SEED_FORBIDDEN: composeErrorCode('S', 'A', 1),
  SEED_FAILED: composeErrorCode('S', 'E', 1),
  WEBHOOK_STRIPE_BAD_REQUEST: composeErrorCode('W', 'H', 1),
  INTERNAL_REMOTE_FETCH: composeErrorCode('I', 'O', 1),
  INTERNAL_SEED_REMOTE_FETCH: composeErrorCode('I', 'O', 2),
  INTERNAL_RICHTEXT_VALUE: composeErrorCode('I', 'W', 1),
} as const

export type AppErrorCode = (typeof ERR)[keyof typeof ERR]
