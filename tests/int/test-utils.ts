/**
 * Test Utilities and Mock Helpers — shared mocking patterns for integration
 * tests across the suite.
 *
 * @standard ISO/IEC-29119:2022 software-testing test-infrastructure
 * @see docs/STANDARDS.md §7
 */

import { afterEach, beforeEach, expect, vi } from 'vitest'

/**
 * Mock a Payload response for a document
 */
export function mockPayloadDocument<T extends Record<string, unknown>>(
  overrides?: Partial<T>,
): T {
  return {
    id: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...overrides,
  } as unknown as T
}

/**
 * Mock a Payload collection response
 */
export function mockPayloadCollection<T extends Record<string, unknown>>(
  docs: T[] = [],
  total = docs.length,
) {
  return {
    docs,
    totalDocs: total,
    limit: 10,
    totalPages: Math.ceil(total / 10),
    page: 1,
    pagingCounter: 1,
    hasPrevPage: false,
    hasNextPage: false,
    prevPage: null as number | null,
    nextPage: null as number | null,
  }
}

/**
 * Create a mock Payload instance
 */
export function createMockPayload() {
  return {
    find: vi.fn(async () => mockPayloadCollection()),
    findGlobal: vi.fn(async () => mockPayloadDocument()),
    findByID: vi.fn(async () => mockPayloadDocument()),
  }
}

/**
 * Create a mock request with headers
 */
export function createMockRequest(headers: Record<string, string> = {}) {
  const defaultHeaders = new Headers({
    'x-forwarded-host': 'localhost:3000',
    'x-forwarded-proto': 'http',
    ...headers,
  })
  return { headers: defaultHeaders }
}

/**
 * Create a mock PayloadRequest
 */
export function createMockPayloadRequest(locale = 'en') {
  return {
    locale,
    user: null as null,
    payloadAPI: 'REST',
    transactionID: 'test-txn-1',
  }
}

/**
 * Create a mock FormField error object
 */
export function createMockFieldError(fieldName: string, message = 'Field error') {
  return {
    [fieldName]: {
      type: 'required',
      message,
    },
  }
}

/**
 * Create a mock Locale object
 */
export function createMockLocale(code: string, label?: string) {
  return {
    code,
    label: label || code.toUpperCase(),
  }
}

/**
 * Mock environment variables for a test
 */
export function mockEnv(variables: Record<string, string>) {
  const originalEnv = process.env

  beforeEach(() => {
    Object.entries(variables).forEach(([key, value]) => {
      process.env[key] = value
    })
  })

  afterEach(() => {
    process.env = originalEnv
  })
}

/**
 * Assert that a URL is valid
 */
export function assertValidURL(url: string) {
  expect(() => new URL(url)).not.toThrow()
}

/**
 * Assert that a locale is valid
 */
export function assertValidLocale(locale: string, supportedLocales: string[]) {
  expect(supportedLocales).toContain(locale)
}

/**
 * Mock Next.js unstable_cache
 */
export function mockUnstableCache() {
  vi.mock('next/cache', () => ({
    unstable_cache: vi.fn((fetcher, keys, options) => fetcher),
  }))
}

/**
 * Create a mock Tenant object
 */
export function createMockTenant(overrides?: Record<string, unknown>) {
  return {
    id: '1',
    name: 'Test Tenant',
    publicSiteUrl: 'https://tenant.example.com',
    ...overrides,
  }
}

/**
 * Wait for async operation to complete
 */
export async function waitFor(callback: () => unknown, timeout = 1000) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now()
    const interval = setInterval(() => {
      try {
        const result = callback()
        if (result) {
          clearInterval(interval)
          resolve(result)
        }
      } catch (error) {
        if (Date.now() - startTime > timeout) {
          clearInterval(interval)
          reject(error)
        }
      }
    }, 50)
  })
}

/**
 * Cleanup mocks and reset state
 */
export function cleanupTest() {
  vi.clearAllMocks()
  vi.resetAllMocks()
}
