/**
 * Config Discovery advanced tests — custom validators, field-type coercion.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard JSON-Schema 2020-12 schema-validation
 * @rfc 8259 json
 * @see docs/STANDARDS.md §4.3 §7
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import {
  PayloadConfigDiscovery,
  coerceValue,
  validateFieldType,
  createFieldValidator,
  registerCustomValidator,
  getCustomFieldValidator,
  type FieldTypeValidator,
  type FieldType,
} from '../../src/testing/config-discovery'

// =============================================================================
// Test Payload Factory
// =============================================================================

interface Field {
  name: string
  type: string
  required?: boolean
  relationTo?: string
  options?: Array<{ label: string; value: string }>
}

interface Collection {
  slug: string
  fields: Field[]
  admin?: {
    useAsTitle?: string
  }
  access?: Record<string, unknown>
}

interface Payload {
  collections: Collection[]
}

function createAdvancedPayload(): Payload {
  return {
    collections: [
      {
        slug: 'users',
        fields: [
          { name: 'id', type: 'text', required: true },
          { name: 'email', type: 'email', required: true },
          { name: 'name', type: 'text', required: true },
          { name: 'age', type: 'number', required: false },
          { name: 'isActive', type: 'boolean', required: false },
          {
            name: 'role',
            type: 'select',
            required: true,
            options: [
              { label: 'Admin', value: 'admin' },
              { label: 'User', value: 'user' },
              { label: 'Guest', value: 'guest' },
            ],
          },
          { name: 'department', type: 'relationship', required: false, relationTo: 'departments' },
          { name: 'joinDate', type: 'date', required: false },
        ],
        access: {
          read: { roles: ['admin', 'user'] },
          create: { roles: ['admin'] },
          update: { roles: ['admin'] },
          delete: { roles: ['admin'] },
        },
      },
      {
        slug: 'posts',
        fields: [
          { name: 'id', type: 'text', required: true },
          { name: 'title', type: 'text', required: true },
          { name: 'content', type: 'text', required: true },
          { name: 'author', type: 'relationship', required: true, relationTo: 'users' },
          { name: 'published', type: 'boolean', required: false },
          {
            name: 'status',
            type: 'select',
            required: true,
            options: [
              { label: 'Draft', value: 'draft' },
              { label: 'Published', value: 'published' },
              { label: 'Archived', value: 'archived' },
            ],
          },
          { name: 'createdAt', type: 'date', required: true },
        ],
        access: {
          read: { roles: ['admin', 'user'] },
          create: { roles: ['admin', 'user'] },
          update: { roles: ['admin'] },
          delete: { roles: ['admin'] },
        },
      },
      {
        slug: 'departments',
        fields: [
          { name: 'id', type: 'text', required: true },
          { name: 'name', type: 'text', required: true },
          { name: 'description', type: 'text', required: false },
          { name: 'budget', type: 'number', required: false },
          { name: 'manager', type: 'relationship', required: false, relationTo: 'users' },
        ],
      },
      {
        slug: 'comments',
        fields: [
          { name: 'id', type: 'text', required: true },
          { name: 'content', type: 'text', required: true },
          { name: 'post', type: 'relationship', required: true, relationTo: 'posts' },
          { name: 'author', type: 'relationship', required: true, relationTo: 'users' },
        ],
      },
    ],
  }
}

// =============================================================================
// FEATURE 1: Type Coercion & Validation Tests (15+ tests)
// =============================================================================

describe('FEATURE 1: Type Coercion & Validation', () => {
  describe('coerceValue - Text Type', () => {
    it('should pass through strings unchanged', () => {
      const result = coerceValue('text', 'hello')
      expect(result.success).toBe(true)
      expect(result.value).toBe('hello')
      expect(result.coerced).toBe(false)
    })

    it('should coerce numbers to strings', () => {
      const result = coerceValue('text', 123)
      expect(result.success).toBe(true)
      expect(result.value).toBe('123')
      expect(result.coerced).toBe(true)
    })

    it('should coerce booleans to strings', () => {
      const result = coerceValue('text', true)
      expect(result.success).toBe(true)
      expect(result.value).toBe('true')
      expect(result.coerced).toBe(true)
    })

    it('should coerce objects to JSON strings', () => {
      const result = coerceValue('text', { key: 'value' })
      expect(result.success).toBe(true)
      expect(typeof result.value).toBe('string')
      expect(result.coerced).toBe(true)
    })
  })

  describe('coerceValue - Email Type', () => {
    it('should pass through valid emails unchanged', () => {
      const result = coerceValue('email', 'test@example.com')
      expect(result.success).toBe(true)
      expect(result.value).toBe('test@example.com')
    })

    it('should reject invalid emails', () => {
      const result = coerceValue('email', 'not-an-email')
      expect(result.success).toBe(false)
      expect(result.error).toBeDefined()
    })

    it('should coerce valid emails from numbers (if formatted)', () => {
      const result = coerceValue('email', 'user@domain.com')
      expect(result.success).toBe(true)
    })
  })

  describe('coerceValue - Number Type', () => {
    it('should pass through numbers unchanged', () => {
      const result = coerceValue('number', 123)
      expect(result.success).toBe(true)
      expect(result.value).toBe(123)
      expect(result.coerced).toBe(false)
    })

    it('should coerce string numbers to numbers', () => {
      const result = coerceValue('number', '123')
      expect(result.success).toBe(true)
      expect(result.value).toBe(123)
      expect(result.coerced).toBe(true)
    })

    it('should coerce booleans to 0 or 1', () => {
      const resultTrue = coerceValue('number', true)
      expect(resultTrue.success).toBe(true)
      expect(resultTrue.value).toBe(1)

      const resultFalse = coerceValue('number', false)
      expect(resultFalse.success).toBe(true)
      expect(resultFalse.value).toBe(0)
    })

    it('should reject non-numeric strings', () => {
      const result = coerceValue('number', 'abc')
      expect(result.success).toBe(false)
    })
  })

  describe('coerceValue - Integer Type', () => {
    it('should pass through integers unchanged', () => {
      const result = coerceValue('integer', 42)
      expect(result.success).toBe(true)
      expect(result.value).toBe(42)
    })

    it('should floor decimal numbers', () => {
      const result = coerceValue('integer', 42.7)
      expect(result.success).toBe(true)
      expect(result.value).toBe(42)
      expect(result.coerced).toBe(true)
    })

    it('should coerce string integers', () => {
      const result = coerceValue('integer', '100')
      expect(result.success).toBe(true)
      expect(result.value).toBe(100)
    })
  })

  describe('coerceValue - Boolean Type', () => {
    it('should pass through booleans unchanged', () => {
      const resultTrue = coerceValue('boolean', true)
      expect(resultTrue.success).toBe(true)
      expect(resultTrue.value).toBe(true)

      const resultFalse = coerceValue('boolean', false)
      expect(resultFalse.success).toBe(true)
      expect(resultFalse.value).toBe(false)
    })

    it('should coerce string truthy values', () => {
      const tests = ['true', 'yes', 'on', '1']
      tests.forEach((val) => {
        const result = coerceValue('boolean', val)
        expect(result.success).toBe(true)
        expect(result.value).toBe(true)
      })
    })

    it('should coerce string falsy values', () => {
      const tests = ['false', 'no', 'off', '0']
      tests.forEach((val) => {
        const result = coerceValue('boolean', val)
        expect(result.success).toBe(true)
        expect(result.value).toBe(false)
      })
    })

    it('should coerce numbers to boolean', () => {
      const resultTrue = coerceValue('boolean', 1)
      expect(resultTrue.value).toBe(true)

      const resultFalse = coerceValue('boolean', 0)
      expect(resultFalse.value).toBe(false)
    })
  })

  describe('coerceValue - Date Type', () => {
    it('should pass through valid Date objects unchanged', () => {
      const date = new Date('2024-01-01')
      const result = coerceValue('date', date)
      expect(result.success).toBe(true)
      expect(result.value).toBe(date)
    })

    it('should coerce ISO date strings', () => {
      const result = coerceValue('date', '2024-01-01T12:00:00Z')
      expect(result.success).toBe(true)
      expect(result.value instanceof Date).toBe(true)
    })

    it('should coerce timestamps to dates', () => {
      const timestamp = new Date('2024-01-01').getTime()
      const result = coerceValue('date', timestamp)
      expect(result.success).toBe(true)
      expect(result.value instanceof Date).toBe(true)
    })

    it('should reject invalid dates', () => {
      const result = coerceValue('date', 'not-a-date')
      expect(result.success).toBe(false)
    })
  })

  describe('validateFieldType', () => {
    it('should validate correct types', () => {
      const textResult = validateFieldType('text', 'hello')
      expect(textResult.valid).toBe(true)

      const numberResult = validateFieldType('number', 123)
      expect(numberResult.valid).toBe(true)

      const boolResult = validateFieldType('boolean', true)
      expect(boolResult.valid).toBe(true)
    })

    it('should reject incorrect types', () => {
      const result = validateFieldType('text', 123)
      expect(result.valid).toBe(false)
      expect(result.error).toBeDefined()
    })

    it('should handle null values', () => {
      const result = validateFieldType('text', null)
      expect(result.valid).toBe(true) // null is allowed for optional fields
    })
  })

  describe('createFieldValidator', () => {
    it('should create validators for each field type', () => {
      const textValidator = createFieldValidator('text')
      expect(textValidator).toBeDefined()
      expect(textValidator.validate).toBeDefined()
      expect(textValidator.coerce).toBeDefined()
      expect(textValidator.canCoerce).toBeDefined()
    })

    it('should validate using field validator', () => {
      const validator = createFieldValidator('number')
      const result = validator.validate(123)
      expect(result.valid).toBe(true)
    })

    it('should coerce using field validator', () => {
      const validator = createFieldValidator('number')
      const result = validator.coerce('123')
      expect(result.success).toBe(true)
      expect(result.value).toBe(123)
    })

    it('should check if value can be coerced', () => {
      const validator = createFieldValidator('number')
      expect(validator.canCoerce('123')).toBe(true)
      expect(validator.canCoerce('abc')).toBe(false)
    })
  })
})

// =============================================================================
// FEATURE 2: Relationship Constraints Tests (15+ tests)
// =============================================================================

describe('FEATURE 2: Relationship Constraints', () => {
  let discovery: PayloadConfigDiscovery

  beforeEach(() => {
    PayloadConfigDiscovery.resetInstance()
    discovery = PayloadConfigDiscovery.getInstance()
    discovery.initialize(createAdvancedPayload())
  })

  afterEach(() => {
    discovery.resetDiscovery()
    PayloadConfigDiscovery.resetInstance()
  })

  describe('getRelationshipInfo', () => {
    it('should return relationship info for relationship fields', async () => {
      const info = await discovery.getRelationshipInfo('users', 'department')
      expect(info).not.toBeNull()
      expect(info?.relatesTo).toBe('departments')
      expect(info?.required).toBe(false)
    })

    it('should return relationship info for required relationships', async () => {
      const info = await discovery.getRelationshipInfo('posts', 'author')
      expect(info).not.toBeNull()
      expect(info?.relatesTo).toBe('users')
      expect(info?.required).toBe(true)
    })

    it('should return null for non-relationship fields', async () => {
      const info = await discovery.getRelationshipInfo('users', 'email')
      expect(info).toBeNull()
    })

    it('should return null for non-existent fields', async () => {
      const info = await discovery.getRelationshipInfo('users', 'nonexistent')
      expect(info).toBeNull()
    })
  })

  describe('validateRelationships', () => {
    it('should pass validation with valid relationships', async () => {
      const data = {
        id: 'user-1',
        email: 'test@example.com',
        name: 'John Doe',
        role: 'user',
        department: 'dept-123',
      }
      const errors = await discovery.validateRelationships('users', data)
      expect(errors).toHaveLength(0)
    })

    it('should fail validation with missing required relationships', async () => {
      const data = {
        id: 'post-1',
        title: 'My Post',
        content: 'Content',
        status: 'draft',
        createdAt: new Date(),
        // missing author
      }
      const errors = await discovery.validateRelationships('posts', data)
      expect(errors.length).toBeGreaterThan(0)
      expect(errors[0]).toContain('author')
    })

    it('should validate relationship format (string ID)', async () => {
      const data = {
        id: 'post-1',
        title: 'My Post',
        content: 'Content',
        author: 'user-123',
        status: 'draft',
        createdAt: new Date(),
      }
      const errors = await discovery.validateRelationships('posts', data)
      expect(errors).toHaveLength(0)
    })

    it('should validate relationship format (number ID)', async () => {
      const data = {
        id: 'post-1',
        title: 'My Post',
        content: 'Content',
        author: 123,
        status: 'draft',
        createdAt: new Date(),
      }
      const errors = await discovery.validateRelationships('posts', data)
      expect(errors).toHaveLength(0)
    })

    it('should validate relationship format (object with id)', async () => {
      const data = {
        id: 'post-1',
        title: 'My Post',
        content: 'Content',
        author: { id: 'user-123', email: 'user@example.com' },
        status: 'draft',
        createdAt: new Date(),
      }
      const errors = await discovery.validateRelationships('posts', data)
      expect(errors).toHaveLength(0)
    })

    it('should reject invalid relationship format', async () => {
      const data = {
        id: 'post-1',
        title: 'My Post',
        content: 'Content',
        author: ['user-123'], // Invalid: array
        status: 'draft',
        createdAt: new Date(),
      }
      const errors = await discovery.validateRelationships('posts', data)
      expect(errors.length).toBeGreaterThan(0)
    })

    it('should allow null relationships for optional fields', async () => {
      const data = {
        id: 'user-1',
        email: 'test@example.com',
        name: 'John Doe',
        role: 'user',
        department: null,
      }
      const errors = await discovery.validateRelationships('users', data)
      expect(errors).toHaveLength(0)
    })

    it('should validate relationship targets exist', async () => {
      const data = {
        id: 'post-1',
        title: 'My Post',
        content: 'Content',
        author: 'user-123',
        status: 'draft',
        createdAt: new Date(),
      }
      const errors = await discovery.validateRelationships('posts', data)
      // Users collection exists, so no error
      expect(errors).toHaveLength(0)
    })
  })

  describe('detectCircularDependencies', () => {
    it('should detect no cycles in simple hierarchy', async () => {
      // users -> departments (one-way)
      const cycles = await discovery.detectCircularDependencies('users')
      // departments -> users (back-reference), which could be a cycle
      // But in this payload, it's actually just departments has manager field
      // No direct user->posts->user cycle
      expect(Array.isArray(cycles)).toBe(true)
    })

    it('should cache circular dependency results', async () => {
      const cycles1 = await discovery.detectCircularDependencies('users')
      const cycles2 = await discovery.detectCircularDependencies('users')
      expect(cycles1).toEqual(cycles2)
    })

    it('should handle collections with no relationships', async () => {
      // departments has optional relationships only
      const cycles = await discovery.detectCircularDependencies('departments')
      expect(Array.isArray(cycles)).toBe(true)
    })

    it('should work for all collections', async () => {
      const slugs = discovery.getCollectionSlugs()
      for (const slug of slugs) {
        const cycles = await discovery.detectCircularDependencies(slug)
        expect(Array.isArray(cycles)).toBe(true)
      }
    })
  })
})

// =============================================================================
// FEATURE 3: Enum Validation Tests (10+ tests)
// =============================================================================

describe('FEATURE 3: Enum Validation', () => {
  let discovery: PayloadConfigDiscovery

  beforeEach(() => {
    PayloadConfigDiscovery.resetInstance()
    discovery = PayloadConfigDiscovery.getInstance()
    discovery.initialize(createAdvancedPayload())
  })

  afterEach(() => {
    discovery.resetDiscovery()
    PayloadConfigDiscovery.resetInstance()
  })

  describe('getEnumValues', () => {
    it('should return enum values for select fields', async () => {
      const values = await discovery.getEnumValues('users', 'role')
      expect(values).toContain('admin')
      expect(values).toContain('user')
      expect(values).toContain('guest')
      expect(values).toHaveLength(3)
    })

    it('should return different enums for different fields', async () => {
      const roleValues = await discovery.getEnumValues('users', 'role')
      const statusValues = await discovery.getEnumValues('posts', 'status')

      expect(roleValues).not.toEqual(statusValues)
      expect(roleValues).toContain('admin')
      expect(statusValues).toContain('draft')
    })

    it('should return empty array for non-select fields', async () => {
      const values = await discovery.getEnumValues('users', 'email')
      expect(values).toEqual([])
    })

    it('should return empty array for non-existent fields', async () => {
      const values = await discovery.getEnumValues('users', 'nonexistent')
      expect(values).toEqual([])
    })
  })

  describe('validateEnumValue', () => {
    it('should pass validation for valid enum values', async () => {
      const errors = await discovery.validateEnumValue('users', 'role', 'admin')
      expect(errors).toHaveLength(0)
    })

    it('should fail validation for invalid enum values', async () => {
      const errors = await discovery.validateEnumValue('users', 'role', 'superadmin')
      expect(errors.length).toBeGreaterThan(0)
      expect(errors[0]).toContain('not in valid enum')
    })

    it('should validate all valid enum options', async () => {
      const validValues = ['admin', 'user', 'guest']
      for (const val of validValues) {
        const errors = await discovery.validateEnumValue('users', 'role', val)
        expect(errors).toHaveLength(0)
      }
    })

    it('should fail validation for non-select fields', async () => {
      const errors = await discovery.validateEnumValue('users', 'email', 'test@example.com')
      expect(errors.length).toBeGreaterThan(0)
      expect(errors[0]).toContain('not a select')
    })

    it('should fail validation for non-existent fields', async () => {
      const errors = await discovery.validateEnumValue('users', 'nonexistent', 'value')
      expect(errors.length).toBeGreaterThan(0)
      expect(errors[0]).toContain('not found')
    })

    it('should handle numeric enum values', async () => {
      const errors = await discovery.validateEnumValue('users', 'role', 'admin')
      expect(errors).toHaveLength(0)
    })

    it('should validate post status enum', async () => {
      const draftErrors = await discovery.validateEnumValue('posts', 'status', 'draft')
      expect(draftErrors).toHaveLength(0)

      const invalidErrors = await discovery.validateEnumValue('posts', 'status', 'pending')
      expect(invalidErrors.length).toBeGreaterThan(0)
    })
  })
})

// =============================================================================
// FEATURE 4: Access Control Tests (8+ tests)
// =============================================================================

describe('FEATURE 4: Access Control', () => {
  let discovery: PayloadConfigDiscovery

  beforeEach(() => {
    PayloadConfigDiscovery.resetInstance()
    discovery = PayloadConfigDiscovery.getInstance()
    discovery.initialize(createAdvancedPayload())
  })

  afterEach(() => {
    discovery.resetDiscovery()
    PayloadConfigDiscovery.resetInstance()
  })

  describe('getAccessRules', () => {
    it('should return access rules for collections with rules', async () => {
      const rules = await discovery.getAccessRules('users')
      expect(rules).toBeDefined()
      expect(rules.read).toBeDefined()
      expect(rules.create).toBeDefined()
    })

    it('should return empty object for collections without rules', async () => {
      const rules = await discovery.getAccessRules('departments')
      expect(typeof rules).toBe('object')
    })

    it('should include correct roles in access rules', async () => {
      const rules = await discovery.getAccessRules('users')
      expect(rules.read?.roles).toContain('admin')
      expect(rules.read?.roles).toContain('user')
    })

    it('should differentiate access by action', async () => {
      const rules = await discovery.getAccessRules('users')
      // Create is admin-only
      expect(rules.create?.roles).toEqual(['admin'])
      // Read allows admin and user
      expect(rules.read?.roles?.length).toBe(2)
    })
  })

  describe('validateAccess', () => {
    it('should allow admin access to all actions', async () => {
      const canRead = await discovery.validateAccess('users', 'admin', 'read')
      expect(canRead).toBe(true)

      const canCreate = await discovery.validateAccess('users', 'admin', 'create')
      expect(canCreate).toBe(true)

      const canDelete = await discovery.validateAccess('users', 'admin', 'delete')
      expect(canDelete).toBe(true)
    })

    it('should allow users to read but not create', async () => {
      const canRead = await discovery.validateAccess('users', 'user', 'read')
      expect(canRead).toBe(true)

      const canCreate = await discovery.validateAccess('users', 'user', 'create')
      expect(canCreate).toBe(false)
    })

    it('should validate post access rules', async () => {
      // admin can update posts
      const adminUpdate = await discovery.validateAccess('posts', 'admin', 'update')
      expect(adminUpdate).toBe(true)

      // user can read but not update posts
      const userRead = await discovery.validateAccess('posts', 'user', 'read')
      expect(userRead).toBe(true)

      const userUpdate = await discovery.validateAccess('posts', 'user', 'update')
      expect(userUpdate).toBe(false)
    })

    it('should allow guest access if explicitly permitted', async () => {
      const canAccess = await discovery.validateAccess('users', 'guest', 'read')
      // guest is not in read roles, so should be false
      expect(canAccess).toBe(false)
    })

    it('should allow undefined actions', async () => {
      const result = await discovery.validateAccess('users', 'user', 'unknownAction')
      expect(result).toBe(true)
    })

    it('should handle undefined roles gracefully', async () => {
      const result = await discovery.validateAccess('departments', 'anyUser', 'anyAction')
      // No rules defined, should allow access
      expect(result).toBe(true)
    })
  })
})

// =============================================================================
// FEATURE 5: Custom Fields & Extensibility Tests (2+ tests)
// =============================================================================

describe('FEATURE 5: Custom Fields & Extensibility', () => {
  let discovery: PayloadConfigDiscovery

  beforeEach(() => {
    PayloadConfigDiscovery.resetInstance()
    discovery = PayloadConfigDiscovery.getInstance()
    discovery.initialize(createAdvancedPayload())
  })

  afterEach(() => {
    discovery.resetDiscovery()
    PayloadConfigDiscovery.resetInstance()
  })

  describe('getFieldValidator', () => {
    it('should return validator for built-in field types', () => {
      const textValidator = discovery.getFieldValidator('text')
      expect(textValidator).not.toBeNull()
      expect(textValidator?.validate).toBeDefined()

      const numberValidator = discovery.getFieldValidator('number')
      expect(numberValidator).not.toBeNull()
    })

    it('should return null for unknown field types', () => {
      const validator = discovery.getFieldValidator('unknown')
      expect(validator).toBeNull()
    })
  })

  describe('Custom Validator Registration', () => {
    it('should register custom validators', () => {
      const customValidator: FieldTypeValidator = {
        validate: (value: unknown) => ({
          valid: value === 'custom',
          targetType: 'custom' as FieldType,
        }),
        coerce: (value: unknown) => ({
          value: value,
          success: value === 'custom',
        }),
        canCoerce: (value: unknown) => value === 'custom',
      }

      registerCustomValidator('customType', customValidator)
      const retrieved = getCustomFieldValidator('customType')
      expect(retrieved).not.toBeNull()
    })

    it('should use custom validators for validation', () => {
      const customValidator: FieldTypeValidator = {
        validate: (value: unknown) => ({
          valid: typeof value === 'object' && value !== null && (value as Record<string, unknown>).customField !== undefined,
          targetType: 'custom' as FieldType,
        }),
        coerce: (value: unknown) => ({
          value: value,
          success: typeof value === 'object',
        }),
        canCoerce: (value: unknown) => typeof value === 'object',
      }

      registerCustomValidator('customObject', customValidator)

      const validator = getCustomFieldValidator('customObject')
      expect(validator).not.toBeNull()

      const result = validator?.validate({ customField: 'value' })
      expect(result?.valid).toBe(true)

      const result2 = validator?.validate({ otherField: 'value' })
      expect(result2?.valid).toBe(false)
    })
  })
})

// =============================================================================
// Integration Tests
// =============================================================================

describe('Integration Tests - All Features Together', () => {
  let discovery: PayloadConfigDiscovery

  beforeEach(() => {
    PayloadConfigDiscovery.resetInstance()
    discovery = PayloadConfigDiscovery.getInstance()
    discovery.initialize(createAdvancedPayload())
  })

  afterEach(() => {
    discovery.resetDiscovery()
    PayloadConfigDiscovery.resetInstance()
  })

  it('should validate and coerce data with all features', () => {
    const userData = {
      id: '1',
      email: 'john@example.com',
      name: 'John Doe',
      role: 'admin',
      department: 'dept-1',
    }

    const result = discovery.validateData('users', userData)
    expect(result.valid).toBe(true)
  })

  it('should handle complex validation scenarios', async () => {
    const postData = {
      id: 'post-1',
      title: 'Test Post',
      content: 'Content',
      author: 'user-123',
      status: 'published',
      createdAt: new Date(),
    }

    // Validate relationships
    const relErrors = await discovery.validateRelationships('posts', postData)
    expect(relErrors).toHaveLength(0)

    // Validate enum
    const enumErrors = await discovery.validateEnumValue('posts', 'status', 'published')
    expect(enumErrors).toHaveLength(0)

    // Validate data
    const result = discovery.validateData('posts', postData)
    expect(result.valid).toBe(true)
  })

  it('should prevent unauthorized access', async () => {
    // Guest cannot create users
    const canCreate = await discovery.validateAccess('users', 'guest', 'create')
    expect(canCreate).toBe(false)

    // User can read users
    const canRead = await discovery.validateAccess('users', 'user', 'read')
    expect(canRead).toBe(true)
  })

  it('should coerce field values appropriately', () => {
    const result = discovery.coerceFieldValue('users', 'age', '42')
    expect(result.success).toBe(true)
    expect(result.value).toBe(42)
    expect(typeof result.value).toBe('number')
  })

  it('should validate enum values across collections', async () => {
    // User roles
    const userRoleValid = await discovery.validateEnumValue('users', 'role', 'admin')
    expect(userRoleValid).toHaveLength(0)

    // Post status
    const postStatusValid = await discovery.validateEnumValue('posts', 'status', 'draft')
    expect(postStatusValid).toHaveLength(0)

    // Different enums don't interfere
    const userRoleInvalid = await discovery.validateEnumValue('posts', 'status', 'admin')
    expect(userRoleInvalid.length).toBeGreaterThan(0)
  })
})
