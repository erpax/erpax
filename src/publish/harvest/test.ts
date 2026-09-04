import { describe, expect, it } from 'vitest'
import {
  type Fetcher,
  doiForPurpose,
  doiOfHarvest,
  getRecordUrl,
  isHarvested,
  oaiIdentifier,
  rateLimitPerMinute,
  resolveDoi,
  zenodoRecordId,
} from '@/publish/harvest'

const reply = (body: string, ok = true, status = 200): ReturnType<Fetcher> =>
  Promise.resolve({ ok, status, text: () => Promise.resolve(body) })

/** Zenodo's real shape: asking about the CONCEPT doi answers with the latest VERSION record. */
const zenodo = (): Fetcher => (url) =>
  url.includes('/api/records/')
    ? reply(
        JSON.stringify({
          id: 22288360,
          doi: '10.5281/zenodo.22288360',
          conceptdoi: '10.5281/zenodo.22237698',
          conceptrecid: '22237698',
          metadata: { title: 'erpax — a zero-entropy, content-addressed ERP corpus' },
        }),
      )
    : reply(`<OAI-PMH><identifier>${oaiIdentifier('22288360')}</identifier></OAI-PMH>`)

describe('publish/harvest — a DOI is verified against the registry', () => {
  it('builds the documented identifier and GetRecord URL', () => {
    expect(oaiIdentifier('22288360')).toBe('oai:zenodo.org:22288360')
    expect(getRecordUrl('22288360')).toBe(
      'https://zenodo.org/oai2d?verb=GetRecord&metadataPrefix=oai_datacite&identifier=oai:zenodo.org:22288360',
    )
    expect(rateLimitPerMinute()).toBe(30) // the documented harvesting ceiling
  })

  it('reads the record id out of a Zenodo DOI, and refuses a foreign one', () => {
    expect(zenodoRecordId('10.5281/zenodo.22288360')).toBe('22288360')
    expect(zenodoRecordId('10.1000/xyz123')).toBeNull()
    expect(zenodoRecordId('not a doi')).toBeNull()
  })

  it('tells a CONCEPT doi from a VERSION doi — the distinction that decides reproducibility', async () => {
    const concept = await resolveDoi('10.5281/zenodo.22237698', zenodo())
    expect(concept.kind).toBe('concept')
    expect(concept.versionDoi).toBe('10.5281/zenodo.22288360')
    expect(concept.harvestable).toBe(false) // a concept record is not an OAI record

    const version = await resolveDoi('10.5281/zenodo.22288360', zenodo())
    expect(version.kind).toBe('version')
    expect(version.harvestable).toBe(true)
  })

  it('REFUSES when it cannot ask — silence is not confirmation', async () => {
    const dead: Fetcher = () => reply('', false, 503)
    await expect(resolveDoi('10.5281/zenodo.22288360', dead)).rejects.toThrow(/could not ask the registry/)
    await expect(isHarvested('22288360', dead)).rejects.toThrow(/silence is not confirmation/)
  })

  it('confirms the harvest from the registry, and denies it when the id is absent', async () => {
    expect(await isHarvested('22288360', zenodo())).toBe(true)
    const missing: Fetcher = () => reply('<OAI-PMH><error code="idDoesNotExist">No matching identifier</error></OAI-PMH>')
    expect(await isHarvested('22237698', missing)).toBe(false)
  })

  it('reads the DOI the registry states, rather than assuming the one asked for', () => {
    expect(doiOfHarvest('<identifier identifierType="DOI">10.5281/zenodo.22288360</identifier>')).toBe(
      '10.5281/zenodo.22288360',
    )
    expect(doiOfHarvest('<titles><title>x</title></titles>')).toBeNull()
  })

  it('cite the software with a concept doi; cite a RESULT with a version doi', () => {
    // a concept doi resolves to whatever is newest, so a result pinned to one can change meaning
    // after it is cited — ISO 19011 §6.4: the citation must lead to THE evidence
    expect(doiForPurpose('software')).toBe('concept')
    expect(doiForPurpose('result')).toBe('version')
  })
})
