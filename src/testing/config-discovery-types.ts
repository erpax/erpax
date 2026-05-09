/**
 * Type validation + coercion types for `config-discovery`.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard JSON-Schema 2020-12 schema-validation
 * @rfc 8259 json
 * @see docs/STANDARDS.md §7
 */

// =============================================================================
// Type Definitions
// =============================================================================

export type FieldType = 'text' | 'email' | 'number' | 'integer' | 'date' | 'boolean' | 'select' | 'relationship'

export interface CoercionResult {
  value: any
  success: boolean
  error?: string
  coerced?: boolean
}

export interface ValidationResult {
  valid: boolean
  error?: string
  originalType?: string
  targetType?: FieldType
}

export interface FieldTypeValidator {
  validate(value: any): ValidationResult
  coerce(value: any): CoercionResult
  canCoerce(value: any): boolean
}

export interface AccessConfig {
  [action: string]: {
    roles?: string[]
    permissions?: string[]
  }
}

export interface RelationshipInfo {
  relatesTo: string
  required: boolean
  relationshipType?: 'belongsTo' | 'hasMany' | 'hasOne'
}

// =============================================================================
// Type Coercion and Validation Implementations
// =============================================================================

/**
 * Coerce a value to the target field type with automatic type conversion
 * Supports compatible type conversions: "123" -> 123, "true" -> true, etc.
 */
export function coerceValue(fieldType: FieldType, value: any): CoercionResult {
  if (value === null || value === undefined) {
    return {
      value: value,
      success: true,
      coerced: false,
    }
  }

  switch (fieldType) {
    case 'text':
      return coerceText(value)
    case 'email':
      return coerceEmail(value)
    case 'number':
      return coerceNumber(value)
    case 'integer':
      return coerceInteger(value)
    case 'date':
      return coerceDate(value)
    case 'boolean':
      return coerceBoolean(value)
    case 'select':
      return coerceSelect(value)
    case 'relationship':
      return coerceRelationship(value)
    default:
      return {
        value: value,
        success: false,
        error: `Unknown field type: ${fieldType}`,
      }
  }
}

/**
 * Validate a value against a field type without coercion
 */
export function validateFieldType(fieldType: FieldType, value: any): ValidationResult {
  if (value === null || value === undefined) {
    return {
      valid: true,
      originalType: typeof value,
      targetType: fieldType,
    }
  }

  switch (fieldType) {
    case 'text':
      return validateText(value)
    case 'email':
      return validateEmail(value)
    case 'number':
      return validateNumber(value)
    case 'integer':
      return validateInteger(value)
    case 'date':
      return validateDate(value)
    case 'boolean':
      return validateBoolean(value)
    case 'select':
      return validateSelect(value)
    case 'relationship':
      return validateRelationship(value)
    default:
      return {
        valid: false,
        error: `Unknown field type: ${fieldType}`,
        targetType: fieldType,
      }
  }
}

// =============================================================================
// Text Field Validation & Coercion
// =============================================================================

function coerceText(value: any): CoercionResult {
  if (typeof value === 'string') {
    return { value, success: true, coerced: false }
  }

  if (typeof value === 'number' || typeof value === 'boolean') {
    return { value: String(value), success: true, coerced: true }
  }

  if (value instanceof Date) {
    return { value: value.toISOString(), success: true, coerced: true }
  }

  if (typeof value === 'object') {
    try {
      return { value: JSON.stringify(value), success: true, coerced: true }
    } catch {
      return { value, success: false, error: 'Cannot convert object to text' }
    }
  }

  return { value, success: false, error: `Cannot coerce ${typeof value} to text` }
}

function validateText(value: any): ValidationResult {
  return {
    valid: typeof value === 'string',
    error: typeof value !== 'string' ? 'Must be a string' : undefined,
    originalType: typeof value,
    targetType: 'text',
  }
}

// =============================================================================
// Email Field Validation & Coercion
// =============================================================================

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function coerceEmail(value: any): CoercionResult {
  if (typeof value === 'string') {
    if (EMAIL_REGEX.test(value)) {
      return { value, success: true, coerced: false }
    }
    return { value, success: false, error: 'Invalid email format' }
  }

  // Try to coerce from other types
  const textResult = coerceText(value)
  if (textResult.success && EMAIL_REGEX.test(textResult.value)) {
    return { value: textResult.value, success: true, coerced: true }
  }

  return { value, success: false, error: 'Cannot coerce to valid email' }
}

function validateEmail(value: any): ValidationResult {
  if (typeof value !== 'string') {
    return {
      valid: false,
      error: 'Email must be a string',
      originalType: typeof value,
      targetType: 'email',
    }
  }

  if (!EMAIL_REGEX.test(value)) {
    return {
      valid: false,
      error: 'Invalid email format',
      originalType: 'string',
      targetType: 'email',
    }
  }

  return {
    valid: true,
    originalType: 'string',
    targetType: 'email',
  }
}

// =============================================================================
// Number Field Validation & Coercion
// =============================================================================

function coerceNumber(value: any): CoercionResult {
  if (typeof value === 'number' && !isNaN(value)) {
    return { value, success: true, coerced: false }
  }

  if (typeof value === 'string' && value.trim() !== '') {
    const num = parseFloat(value)
    if (!isNaN(num)) {
      return { value: num, success: true, coerced: true }
    }
  }

  if (typeof value === 'boolean') {
    return { value: value ? 1 : 0, success: true, coerced: true }
  }

  return { value, success: false, error: `Cannot coerce ${typeof value} to number` }
}

function validateNumber(value: any): ValidationResult {
  const valid = typeof value === 'number' && !isNaN(value)
  return {
    valid,
    error: !valid ? 'Must be a valid number' : undefined,
    originalType: typeof value,
    targetType: 'number',
  }
}

// =============================================================================
// Integer Field Validation & Coercion
// =============================================================================

function coerceInteger(value: any): CoercionResult {
  const numberResult = coerceNumber(value)
  if (!numberResult.success) {
    return numberResult
  }

  const num = numberResult.value
  if (!Number.isInteger(num)) {
    return {
      value: Math.floor(num),
      success: true,
      coerced: true,
    }
  }

  return { value: num, success: true, coerced: numberResult.coerced }
}

function validateInteger(value: any): ValidationResult {
  if (typeof value !== 'number' || !Number.isInteger(value)) {
    return {
      valid: false,
      error: 'Must be an integer',
      originalType: typeof value,
      targetType: 'integer',
    }
  }

  return {
    valid: true,
    originalType: 'number',
    targetType: 'integer',
  }
}

// =============================================================================
// Date Field Validation & Coercion
// =============================================================================

function coerceDate(value: any): CoercionResult {
  if (value instanceof Date && !isNaN(value.getTime())) {
    return { value, success: true, coerced: false }
  }

  // Try string formats
  if (typeof value === 'string' && value.trim() !== '') {
    const date = new Date(value)
    if (!isNaN(date.getTime())) {
      return { value: date, success: true, coerced: true }
    }
  }

  // Try number (timestamp)
  if (typeof value === 'number' && value > 0) {
    const date = new Date(value)
    if (!isNaN(date.getTime())) {
      return { value: date, success: true, coerced: true }
    }
  }

  return { value, success: false, error: 'Cannot coerce to valid date' }
}

function validateDate(value: any): ValidationResult {
  const valid = value instanceof Date && !isNaN(value.getTime())
  return {
    valid,
    error: !valid ? 'Must be a valid Date' : undefined,
    originalType: typeof value,
    targetType: 'date',
  }
}

// =============================================================================
// Boolean Field Validation & Coercion
// =============================================================================

function coerceBoolean(value: any): CoercionResult {
  if (typeof value === 'boolean') {
    return { value, success: true, coerced: false }
  }

  if (typeof value === 'string') {
    const lower = value.toLowerCase().trim()
    if (lower === 'true' || lower === '1' || lower === 'yes' || lower === 'on') {
      return { value: true, success: true, coerced: true }
    }
    if (lower === 'false' || lower === '0' || lower === 'no' || lower === 'off') {
      return { value: false, success: true, coerced: true }
    }
  }

  if (typeof value === 'number') {
    return { value: value !== 0 && !isNaN(value), success: true, coerced: true }
  }

  return { value, success: false, error: `Cannot coerce ${typeof value} to boolean` }
}

function validateBoolean(value: any): ValidationResult {
  return {
    valid: typeof value === 'boolean',
    error: typeof value !== 'boolean' ? 'Must be a boolean' : undefined,
    originalType: typeof value,
    targetType: 'boolean',
  }
}

// =============================================================================
// Select/Enum Field Validation & Coercion
// =============================================================================

function coerceSelect(value: any): CoercionResult {
  // For select fields, we don't auto-coerce - the value must be exact
  // This is handled by the caller with knowledge of valid options
  return { value, success: true, coerced: false }
}

function validateSelect(value: any): ValidationResult {
  // Select validation depends on the options available
  // This is a basic check that the value is serializable
  if (typeof value === 'string' || typeof value === 'number') {
    return {
      valid: true,
      originalType: typeof value,
      targetType: 'select',
    }
  }

  return {
    valid: false,
    error: 'Select value must be string or number',
    originalType: typeof value,
    targetType: 'select',
  }
}

// =============================================================================
// Relationship Field Validation & Coercion
// =============================================================================

function coerceRelationship(value: any): CoercionResult {
  // Relationships can be IDs (string/number) or objects with id
  if (typeof value === 'string' || typeof value === 'number') {
    return { value, success: true, coerced: false }
  }

  if (typeof value === 'object' && value !== null && 'id' in value) {
    return { value, success: true, coerced: false }
  }

  return { value, success: false, error: 'Invalid relationship format' }
}

function validateRelationship(value: any): ValidationResult {
  if (typeof value === 'string' || typeof value === 'number') {
    return {
      valid: true,
      originalType: typeof value,
      targetType: 'relationship',
    }
  }

  if (typeof value === 'object' && value !== null && 'id' in value) {
    return {
      valid: true,
      originalType: 'object',
      targetType: 'relationship',
    }
  }

  return {
    valid: false,
    error: 'Relationship must be an ID or object with id property',
    originalType: typeof value,
    targetType: 'relationship',
  }
}

// =============================================================================
// Validator Factory
// =============================================================================

export function createFieldValidator(fieldType: FieldType): FieldTypeValidator {
  return {
    validate(value: any): ValidationResult {
      return validateFieldType(fieldType, value)
    },

    coerce(value: any): CoercionResult {
      return coerceValue(fieldType, value)
    },

    canCoerce(value: any): boolean {
      const result = coerceValue(fieldType, value)
      return result.success
    },
  }
}

// =============================================================================
// Custom Field Extension System
// =============================================================================

interface _CustomFieldValidator extends FieldTypeValidator {
  fieldType: string
}

const customValidators = new Map<string, FieldTypeValidator>()

/**
 * Register a custom field type validator for extensibility
 */
export function registerCustomValidator(
  fieldType: string,
  validator: FieldTypeValidator
): void {
  customValidators.set(fieldType, validator)
}

/**
 * Get a custom field validator by type
 */
export function getCustomFieldValidator(fieldType: string): FieldTypeValidator | null {
  return customValidators.get(fieldType) || null
}

/**
 * Get validator for any field type (built-in or custom)
 */
export function getFieldValidator(fieldType: string): FieldTypeValidator | null {
  // Check if it's a built-in type
  const builtInTypes: FieldType[] = [
    'text',
    'email',
    'number',
    'integer',
    'date',
    'boolean',
    'select',
    'relationship',
  ]

  if ((builtInTypes as string[]).includes(fieldType)) {
    return createFieldValidator(fieldType as FieldType)
  }

  // Check custom validators
  return getCustomFieldValidator(fieldType)
}
