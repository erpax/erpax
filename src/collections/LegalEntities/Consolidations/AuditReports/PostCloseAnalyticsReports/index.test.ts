import { describe, it, expect } from 'vitest'
import { PostCloseAnalyticsReports } from './index'

// Unified-node invariant test for the `post-close-analytics-reports` collection.
describe('post-close-analytics-reports collection node', () => {
  it('exports a valid collection config', () => {
    expect(PostCloseAnalyticsReports.slug).toBe('post-close-analytics-reports')
    expect(Array.isArray(PostCloseAnalyticsReports.fields)).toBe(true)
    expect(PostCloseAnalyticsReports.fields.length).toBeGreaterThan(0)
  })
})
