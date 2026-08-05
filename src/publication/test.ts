import { describe, it, expect } from 'vitest'
import { ZENODO_CONFIG, MILESTONE_V1_0_0, citationBibtex, publishWorkflow } from './index'

describe('publication', () => {
  it('Zenodo config is complete', () => {
    expect(ZENODO_CONFIG.title).toBeDefined()
    expect(ZENODO_CONFIG.version).toBe('1.0.0')
    expect(ZENODO_CONFIG.authors.length).toBeGreaterThan(0)
    expect(ZENODO_CONFIG.license).toBe('CC-BY-4.0')
  })

  it('v1.0.0 milestone lists all 6 security fixes', () => {
    expect(MILESTONE_V1_0_0.tag).toBe('v1.0.0')
    expect(MILESTONE_V1_0_0.securityFixes).toHaveLength(6)
  })

  it('Citation format is valid BibTeX', () => {
    const citation = citationBibtex('10.5281/zenodo.12345678')
    expect(citation.author).toBe('Rouschev, Tsvetan')
    expect(citation.doi).toBe('10.5281/zenodo.12345678')
    expect(citation.url).toContain('zenodo.org')
  })

  it('Publish workflow has all 6 steps', () => {
    const steps = publishWorkflow()
    expect(steps).toHaveLength(6)
    expect(steps[0]).toContain('Await')
    expect(steps[5]).toContain('Publication live')
  })
})
