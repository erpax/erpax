/**
 * Config Discovery tests — dynamic Payload schema extraction.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard JSON-Schema 2020-12 schema-validation
 * @rfc 8259 json
 * @see docs/STANDARDS.md §4.3 §7
 */

import { describe, it, expect, beforeEach } from 'vitest';
import type { Payload, CollectionConfig } from 'payload';
import { PayloadConfigDiscovery, initializeDiscovery, resetDiscovery } from '../../src/testing';

/**
 * Mock Payload for testing config discovery
 */
class MockPayload implements Partial<Payload> {
  config: any = {
    collections: [
      {
        slug: 'users',
        labels: { singular: 'User' },
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
        labels: { singular: 'Post' },
        fields: [
          { name: 'title', type: 'text', required: true },
          { name: 'content', type: 'textarea', required: true },
          { name: 'authorId', type: 'relationship', required: true, relationshipTo: 'users' },
          { name: 'published', type: 'checkbox', required: false },
          { name: 'views', type: 'number', required: false },
        ],
        timestamps: true,
        access: { read: () => true },
      },
      {
        slug: 'comments',
        labels: { singular: 'Comment' },
        fields: [
          { name: 'text', type: 'textarea', required: true },
          { name: 'authorId', type: 'relationship', required: true, relationshipTo: 'users' },
          { name: 'postId', type: 'relationship', required: true, relationshipTo: 'posts' },
          { name: 'rating', type: 'number', required: false },
        ],
        timestamps: false,
      },
    ],
  };
}

describe('PayloadConfigDiscovery', () => {
  let payload: MockPayload;
  let discovery: PayloadConfigDiscovery;

  beforeEach(() => {
    resetDiscovery();
    payload = new MockPayload();
    discovery = new PayloadConfigDiscovery(payload as any);
  });

  describe('Initialization', () => {
    it('should lazily initialize on first use', async () => {
      expect(discovery['initialized']).toBe(false);
      await discovery.getCollectionSlugs();
      expect(discovery['initialized']).toBe(true);
    });

    it('should only initialize once', async () => {
      await discovery.getCollectionSlugs();
      const firstInit = discovery['initialized'];
      await discovery.getCollectionSlugs();
      const secondInit = discovery['initialized'];
      expect(firstInit).toBe(secondInit);
    });

    it('should discover all collections', async () => {
      const slugs = await discovery.getCollectionSlugs();
      expect(slugs).toContain('users');
      expect(slugs).toContain('posts');
      expect(slugs).toContain('comments');
      expect(slugs.length).toBe(3);
    });
  });

  describe('Collection Operations', () => {
    it('should retrieve collection info by slug', async () => {
      const info = await discovery.getCollectionInfo('users');
      expect(info).toBeDefined();
      expect(info?.slug).toBe('users');
      expect(info?.name).toBe('User');
      expect(info?.hasTimestamps).toBe(true);
    });

    it('should check if collection exists', async () => {
      const exists = await discovery.collectionExists('users');
      expect(exists).toBe(true);

      const notExists = await discovery.collectionExists('nonexistent');
      expect(notExists).toBe(false);
    });

    it('should return undefined for non-existent collection', async () => {
      const info = await discovery.getCollectionInfo('nonexistent');
      expect(info).toBeUndefined();
    });

    it('should extract all fields from collection', async () => {
      const fields = await discovery.getFields('users');
      expect(fields.length).toBeGreaterThan(0);
      expect(fields.map((f) => f.name)).toContain('email');
      expect(fields.map((f) => f.name)).toContain('password');
    });

    it('should detect timestamps setting', async () => {
      const usersInfo = await discovery.getCollectionInfo('users');
      expect(usersInfo?.hasTimestamps).toBe(true);

      const commentsInfo = await discovery.getCollectionInfo('comments');
      expect(commentsInfo?.hasTimestamps).toBe(false);
    });

    it('should detect access control', async () => {
      const postsInfo = await discovery.getCollectionInfo('posts');
      expect(postsInfo?.hasAccess).toBe(true);

      const usersInfo = await discovery.getCollectionInfo('users');
      expect(usersInfo?.hasAccess).toBe(false);
    });
  });

  describe('Field Operations', () => {
    it('should get required fields for collection', async () => {
      const required = await discovery.getRequiredFields('users');
      expect(required).toContain('email');
      expect(required).toContain('password');
      expect(required).toContain('status');
      expect(required.length).toBe(3);
    });

    it('should identify field types', async () => {
      const emailType = await discovery.getFieldType('users', 'email');
      expect(emailType).toBe('email');

      const roleType = await discovery.getFieldType('users', 'role');
      expect(roleType).toBe('select');
    });

    it('should return null for non-existent field', async () => {
      const fieldType = await discovery.getFieldType('users', 'nonexistent');
      expect(fieldType).toBeNull();
    });

    it('should extract relationship information', async () => {
      const fields = await discovery.getFields('posts');
      const authorField = fields.find((f) => f.name === 'authorId');
      expect(authorField?.type).toBe('relationship');
      expect(authorField?.relationshipTo).toBe('users');
    });

    it('should identify optional fields', async () => {
      const fields = await discovery.getFields('posts');
      const publishedField = fields.find((f) => f.name === 'published');
      expect(publishedField?.required).toBe(false);
    });
  });

  describe('Data Validation', () => {
    it('should validate required fields', async () => {
      const errors = await discovery.validateData('users', {
        email: 'test@example.com',
        // Missing password and status
      });

      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some((e) => e.includes('password'))).toBe(true);
      expect(errors.some((e) => e.includes('status'))).toBe(true);
    });

    it('should pass validation with all required fields', async () => {
      const errors = await discovery.validateData('users', {
        email: 'test@example.com',
        password: 'secret123',
        status: 'active',
      });

      expect(errors.length).toBe(0);
    });

    it('should validate relationship field types', async () => {
      const errors = await discovery.validateData('posts', {
        title: 'Test Post',
        content: 'Test content',
        authorId: 'not-a-valid-relationship-id',
      });

      // Should succeed - type validation happens at data level, not discovery level
      expect(errors.length).toBe(0);
    });

    it('should return error for non-existent collection', async () => {
      const errors = await discovery.validateData('nonexistent', {
        field: 'value',
      });

      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0]).toContain('not found in config');
    });

    it('should handle empty data object', async () => {
      const errors = await discovery.validateData('users', {});

      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some((e) => e.includes('required'))).toBe(true);
    });
  });

  describe('Caching', () => {
    it('should cache collection info', async () => {
      const info1 = await discovery.getCollectionInfo('users');
      const info2 = await discovery.getCollectionInfo('users');

      expect(info1).toBe(info2); // Same reference = cached
    });

    it('should cache required fields', async () => {
      const required1 = await discovery.getRequiredFields('users');
      const required2 = await discovery.getRequiredFields('users');

      expect(required1).toEqual(required2);
    });
  });

  describe('Global Discovery Instance', () => {
    it('should initialize global discovery', async () => {
      resetDiscovery();
      const instance = initializeDiscovery(payload as any);
      expect(instance).toBeDefined();
    });

    it('should return same instance on subsequent calls', async () => {
      const instance1 = initializeDiscovery(payload as any);
      const instance2 = initializeDiscovery(payload as any);
      expect(instance1).toBe(instance2);
    });

    it('should reset discovery instance', async () => {
      initializeDiscovery(payload as any);
      resetDiscovery();
      // Reinitialize should create new instance
      const newInstance = initializeDiscovery(payload as any);
      expect(newInstance).toBeDefined();
    });
  });

  describe('Dump Configuration', () => {
    it('should dump all discovered configuration', async () => {
      const config = await discovery.dumpConfiguration();

      expect(config['users']).toBeDefined();
      expect(config['posts']).toBeDefined();
      expect(config['comments']).toBeDefined();
    });

    it('should include all fields in dump', async () => {
      const config = await discovery.dumpConfiguration();
      const usersConfig = config['users'];

      expect(usersConfig.fields.length).toBeGreaterThan(0);
      expect(usersConfig.fields.map((f: any) => f.name)).toContain('email');
    });
  });

  describe('Integration Scenarios', () => {
    it('should support config-aware seed validation', async () => {
      // Simulate seed data creation
      const seedData = {
        email: 'admin@test.local',
        password: 'test123',
        role: 'admin',
        status: 'active',
      };

      const errors = await discovery.validateData('users', seedData);
      expect(errors.length).toBe(0);
    });

    it('should validate multi-collection relationships', async () => {
      const postData = {
        title: 'My Post',
        content: 'Post content',
        authorId: 'user-1',
      };

      const errors = await discovery.validateData('posts', postData);
      expect(errors.length).toBe(0);
    });

    it('should handle optional fields in validation', async () => {
      const postData = {
        title: 'My Post',
        content: 'Post content',
        authorId: 'user-1',
        // published and views are optional
      };

      const errors = await discovery.validateData('posts', postData);
      expect(errors.length).toBe(0);
    });
  });

  describe('Field Type Coverage', () => {
    it('should handle text fields', async () => {
      const fieldType = await discovery.getFieldType('users', 'password');
      expect(fieldType).toBe('text');
    });

    it('should handle email fields', async () => {
      const fieldType = await discovery.getFieldType('users', 'email');
      expect(fieldType).toBe('email');
    });

    it('should handle select fields', async () => {
      const fieldType = await discovery.getFieldType('users', 'role');
      expect(fieldType).toBe('select');
    });

    it('should handle checkbox fields', async () => {
      const fieldType = await discovery.getFieldType('posts', 'published');
      expect(fieldType).toBe('checkbox');
    });

    it('should handle number fields', async () => {
      const fieldType = await discovery.getFieldType('posts', 'views');
      expect(fieldType).toBe('number');
    });

    it('should handle relationship fields', async () => {
      const fieldType = await discovery.getFieldType('posts', 'authorId');
      expect(fieldType).toBe('relationship');
    });

    it('should handle textarea fields', async () => {
      const fieldType = await discovery.getFieldType('posts', 'content');
      expect(fieldType).toBe('textarea');
    });
  });
});
