/**
 * Config Discovery tests — dynamic Payload schema extraction.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard JSON-Schema 2020-12 schema-validation
 * @rfc 8259 json
 * @see docs/STANDARDS.md §4.3 §7
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { getDiscovery, initializeDiscovery, resetDiscovery } from '../../src/testing';

/** The field shape the discovery helper reads (a subset of Payload's Field union). */
type TestField = { name: string; type: string; required?: boolean; relationTo?: string };

/** The exact payload type the discovery helper's `initialize` expects (avoids base-vs-augmented drift). */
type DiscoveryPayload = Parameters<ReturnType<typeof getDiscovery>['initialize']>[0];

/**
 * Mock Payload for testing config discovery. The helper reads `payload.collections`
 * (an array of `{ slug, fields, access }`), so the mock exposes that surface directly.
 */
function mockPayload(): DiscoveryPayload {
  const collections = [
    {
      slug: 'users',
      fields: [
        { name: 'email', type: 'email', required: true },
        { name: 'password', type: 'text', required: true },
        { name: 'role', type: 'select', required: false },
        { name: 'status', type: 'text', required: true },
      ],
      timestamps: true,
    },
    {
      slug: 'posts',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'content', type: 'textarea', required: true },
        { name: 'authorId', type: 'relationship', required: true, relationTo: 'users' },
        { name: 'published', type: 'checkbox', required: false },
        { name: 'views', type: 'number', required: false },
      ],
      timestamps: true,
      access: { read: () => true },
    },
    {
      slug: 'comments',
      fields: [
        { name: 'text', type: 'textarea', required: true },
        { name: 'authorId', type: 'relationship', required: true, relationTo: 'users' },
        { name: 'postId', type: 'relationship', required: true, relationTo: 'posts' },
        { name: 'rating', type: 'number', required: false },
      ],
      timestamps: false,
    },
  ];
  return { collections } as unknown as DiscoveryPayload;
}

const fieldsOf = (discovery: ReturnType<typeof getDiscovery>, slug: string): TestField[] =>
  discovery.getCollectionInfo(slug).fields as unknown as TestField[];

describe('PayloadConfigDiscovery', () => {
  let discovery: ReturnType<typeof getDiscovery>;

  beforeEach(() => {
    resetDiscovery();
    discovery = initializeDiscovery(mockPayload());
  });

  describe('Initialization', () => {
    it('should report not initialized before initialize, initialized after', () => {
      resetDiscovery();
      const fresh = getDiscovery();
      expect(fresh.isInitialized()).toBe(false);
      fresh.initialize(mockPayload());
      expect(fresh.isInitialized()).toBe(true);
    });

    it('should stay initialized across re-initialize (idempotent)', () => {
      expect(discovery.isInitialized()).toBe(true);
      discovery.initialize(mockPayload());
      expect(discovery.isInitialized()).toBe(true);
    });

    it('should discover all collections', () => {
      const slugs = discovery.getCollectionSlugs();
      expect(slugs).toContain('users');
      expect(slugs).toContain('posts');
      expect(slugs).toContain('comments');
      expect(slugs.length).toBe(3);
    });
  });

  describe('Collection Operations', () => {
    it('should retrieve collection info by slug', () => {
      const info = discovery.getCollectionInfo('users');
      expect(info).toBeDefined();
      expect(info.slug).toBe('users');
      expect(info.requiredFields).toContain('email');
    });

    it('should check if collection exists', () => {
      expect(discovery.collectionExists('users')).toBe(true);
      expect(discovery.collectionExists('nonexistent')).toBe(false);
    });

    it('should throw for non-existent collection', () => {
      expect(() => discovery.getCollectionInfo('nonexistent')).toThrow();
    });

    it('should extract all fields from collection', () => {
      const fields = fieldsOf(discovery, 'users');
      expect(fields.length).toBeGreaterThan(0);
      expect(fields.map((f) => f.name)).toContain('email');
      expect(fields.map((f) => f.name)).toContain('password');
    });

    it('should expose required fields on the metadata', () => {
      expect(discovery.getCollectionInfo('users').requiredFields).toContain('status');
      expect(discovery.getCollectionInfo('comments').requiredFields).toContain('text');
    });

    it('should capture access config when present', () => {
      expect(discovery.getCollectionInfo('posts').accessRules).toBeDefined();
      expect(discovery.getCollectionInfo('users').accessRules).toBeUndefined();
    });
  });

  describe('Field Operations', () => {
    it('should get required fields for collection', () => {
      const required = discovery.getRequiredFields('users');
      expect(required).toContain('email');
      expect(required).toContain('password');
      expect(required).toContain('status');
      expect(required.length).toBe(3);
    });

    it('should identify field types', () => {
      expect(discovery.getFieldType('users', 'email')).toBe('email');
      expect(discovery.getFieldType('users', 'role')).toBe('select');
    });

    it('should return null for non-existent field', () => {
      expect(discovery.getFieldType('users', 'nonexistent')).toBeNull();
    });

    it('should extract relationship information', () => {
      const authorField = fieldsOf(discovery, 'posts').find((f) => f.name === 'authorId');
      expect(authorField?.type).toBe('relationship');
      expect(authorField?.relationTo).toBe('users');
    });

    it('should identify optional fields', () => {
      const publishedField = fieldsOf(discovery, 'posts').find((f) => f.name === 'published');
      expect(publishedField?.required ?? false).toBe(false);
    });
  });

  describe('Data Validation', () => {
    it('should report missing required fields', () => {
      const result = discovery.validateData('users', {
        email: 'test@example.com',
        // Missing password and status
      });

      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors.some((e) => e.message.includes('password'))).toBe(true);
      expect(result.errors.some((e) => e.message.includes('status'))).toBe(true);
    });

    it('should pass validation with all required fields', () => {
      const result = discovery.validateData('users', {
        email: 'test@example.com',
        password: 'secret123',
        status: 'active',
      });

      expect(result.valid).toBe(true);
      expect(result.errors.length).toBe(0);
    });

    it('should accept a string relationship id at discovery level', () => {
      const result = discovery.validateData('posts', {
        title: 'Test Post',
        content: 'Test content',
        authorId: 'not-a-valid-relationship-id',
      });

      // Type validation happens at data level, not discovery level.
      expect(result.errors.length).toBe(0);
    });

    it('should return error for non-existent collection', () => {
      const result = discovery.validateData('nonexistent', { field: 'value' });

      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors[0].message).toContain('not found in config');
    });

    it('should handle empty data object', () => {
      const result = discovery.validateData('users', {});

      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors.some((e) => e.message.includes('missing'))).toBe(true);
    });
  });

  describe('Caching', () => {
    it('should cache collection info', () => {
      const info1 = discovery.getCollectionInfo('users');
      const info2 = discovery.getCollectionInfo('users');
      expect(info1).toBe(info2); // Same reference = cached
    });

    it('should return required fields consistently', () => {
      expect(discovery.getRequiredFields('users')).toEqual(discovery.getRequiredFields('users'));
    });
  });

  describe('Global Discovery Instance', () => {
    it('should initialize global discovery', () => {
      resetDiscovery();
      const instance = initializeDiscovery(mockPayload());
      expect(instance).toBeDefined();
    });

    it('should return same instance on subsequent calls', () => {
      const instance1 = initializeDiscovery(mockPayload());
      const instance2 = initializeDiscovery(mockPayload());
      expect(instance1).toBe(instance2);
    });

    it('should reset discovery instance', () => {
      initializeDiscovery(mockPayload());
      resetDiscovery();
      const newInstance = initializeDiscovery(mockPayload());
      expect(newInstance).toBeDefined();
    });
  });

  describe('Enumeration', () => {
    it('should expose every discovered collection with its fields', () => {
      for (const slug of discovery.getCollectionSlugs()) {
        const info = discovery.getCollectionInfo(slug);
        expect(info.slug).toBe(slug);
        expect(info.fields.length).toBeGreaterThan(0);
      }
    });
  });

  describe('Integration Scenarios', () => {
    it('should support config-aware seed validation', () => {
      const result = discovery.validateData('users', {
        email: 'admin@test.local',
        password: 'test123',
        role: 'admin',
        status: 'active',
      });
      expect(result.errors.length).toBe(0);
    });

    it('should validate multi-collection relationships', () => {
      const result = discovery.validateData('posts', {
        title: 'My Post',
        content: 'Post content',
        authorId: 'user-1',
      });
      expect(result.errors.length).toBe(0);
    });

    it('should handle optional fields in validation', () => {
      const result = discovery.validateData('posts', {
        title: 'My Post',
        content: 'Post content',
        authorId: 'user-1',
        // published and views are optional
      });
      expect(result.errors.length).toBe(0);
    });
  });

  describe('Field Type Coverage', () => {
    it('should handle text fields', () => {
      expect(discovery.getFieldType('users', 'password')).toBe('text');
    });

    it('should handle email fields', () => {
      expect(discovery.getFieldType('users', 'email')).toBe('email');
    });

    it('should handle select fields', () => {
      expect(discovery.getFieldType('users', 'role')).toBe('select');
    });

    it('should handle checkbox fields', () => {
      expect(discovery.getFieldType('posts', 'published')).toBe('checkbox');
    });

    it('should handle number fields', () => {
      expect(discovery.getFieldType('posts', 'views')).toBe('number');
    });

    it('should handle relationship fields', () => {
      expect(discovery.getFieldType('posts', 'authorId')).toBe('relationship');
    });

    it('should handle textarea fields', () => {
      expect(discovery.getFieldType('posts', 'content')).toBe('textarea');
    });
  });
});
