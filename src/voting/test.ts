import { describe, it, expect, beforeEach } from 'vitest'
import {
  createBallot,
  castVote,
  getBallot,
  listVotes,
  computeAggregate,
  getAggregate,
  verifyAggregate,
  checkNoDoubleVoting,
  derivePseudoDid,
  exportBallotBundle,
  __resetVotingForTests,
} from '@/voting'

const TENANT = 'tenant-test-001'
const SUBJECT = 'subject-uuid-abc'
const PERIOD = 'period-uuid-001'

function makeBallot(kind = 'binary' as const) {
  return createBallot({
    tenantId: TENANT,
    subjectUuid: SUBJECT,
    periodUuid: PERIOD,
    kind,
    choices: [],
    opensAt: '2020-01-01T00:00:00Z',
    closesAt: '2099-12-31T23:59:59Z',
  })
}

describe('voting', () => {
  beforeEach(() => {
    __resetVotingForTests()
  })

  it('createBallot assigns a deterministic content-derived uuid', () => {
    const b1 = makeBallot()
    const b2 = makeBallot()
    expect(b1.uuid).toBe(b2.uuid)
    expect(typeof b1.uuid).toBe('string')
    expect(b1.uuid.length).toBeGreaterThan(0)
  })

  it('getBallot returns the created ballot by uuid', () => {
    const ballot = makeBallot()
    const found = getBallot(ballot.uuid)
    expect(found).toBeDefined()
    expect(found?.uuid).toBe(ballot.uuid)
    expect(found?.tenantId).toBe(TENANT)
  })

  it('castVote succeeds for an open ballot and returns a vote with correct fields', () => {
    const ballot = makeBallot()
    const result = castVote({
      ballotUuid: ballot.uuid,
      voterMasterDid: 'did:example:voter1',
      value: { kind: 'binary', vote: 'yes' },
      signature: 'sig-voter1',
      castAt: '2030-06-01T12:00:00Z',
    })
    expect(result.ok).toBe(true)
    expect(result.vote).toBeDefined()
    expect(result.vote?.ballotUuid).toBe(ballot.uuid)
    expect(result.vote?.tenantId).toBe(TENANT)
    expect(result.vote?.value).toEqual({ kind: 'binary', vote: 'yes' })
    expect(result.vote?.signature).toBe('sig-voter1')
  })

  it('castVote rejects a ballot that does not exist', () => {
    const result = castVote({
      ballotUuid: 'nonexistent-uuid',
      voterMasterDid: 'did:example:voter1',
      value: { kind: 'binary', vote: 'yes' },
      signature: 'sig',
      castAt: '2030-06-01T12:00:00Z',
    })
    expect(result.ok).toBe(false)
    expect(result.reason).toBe('ballot-not-found')
  })

  it('castVote rejects when castAt is outside the ballot window', () => {
    const ballot = makeBallot()
    const result = castVote({
      ballotUuid: ballot.uuid,
      voterMasterDid: 'did:example:voter1',
      value: { kind: 'binary', vote: 'yes' },
      signature: 'sig',
      castAt: '1999-01-01T00:00:00Z',
    })
    expect(result.ok).toBe(false)
    expect(result.reason).toBe('ballot-closed')
  })

  it('castVote rejects when value kind does not match the ballot kind', () => {
    const ballot = makeBallot('binary')
    const result = castVote({
      ballotUuid: ballot.uuid,
      voterMasterDid: 'did:example:voter1',
      value: { kind: 'rating-1to5', rating: 3 },
      signature: 'sig',
      castAt: '2030-06-01T12:00:00Z',
    })
    expect(result.ok).toBe(false)
    expect(result.reason).toBe('kind-mismatch')
  })

  it('castVote enforces Law 31 — duplicate vote is rejected (same voter, ballot, subject)', () => {
    const ballot = makeBallot()
    const first = castVote({
      ballotUuid: ballot.uuid,
      voterMasterDid: 'did:example:voter1',
      value: { kind: 'binary', vote: 'yes' },
      signature: 'sig',
      castAt: '2030-06-01T12:00:00Z',
    })
    expect(first.ok).toBe(true)
    const second = castVote({
      ballotUuid: ballot.uuid,
      voterMasterDid: 'did:example:voter1',
      value: { kind: 'binary', vote: 'yes' },
      signature: 'sig',
      castAt: '2030-06-01T12:00:00Z',
    })
    expect(second.ok).toBe(false)
    expect(second.reason).toBe('duplicate-vote')
  })

  it('derivePseudoDid produces a did:erpax:vote: prefixed string that is period-specific', () => {
    const did1 = derivePseudoDid('did:example:master', 'period-A')
    const did2 = derivePseudoDid('did:example:master', 'period-B')
    expect(did1.startsWith('did:erpax:vote:')).toBe(true)
    expect(did2.startsWith('did:erpax:vote:')).toBe(true)
    expect(did1).not.toBe(did2)
    // same inputs → same result (deterministic)
    expect(derivePseudoDid('did:example:master', 'period-A')).toBe(did1)
  })

  it('computeAggregate tallies binary votes correctly and sets a uuid', () => {
    const ballot = makeBallot()
    castVote({ ballotUuid: ballot.uuid, voterMasterDid: 'did:voter:1', value: { kind: 'binary', vote: 'yes' }, signature: 's1', castAt: '2030-06-01T10:00:00Z' })
    castVote({ ballotUuid: ballot.uuid, voterMasterDid: 'did:voter:2', value: { kind: 'binary', vote: 'no' }, signature: 's2', castAt: '2030-06-01T11:00:00Z' })
    castVote({ ballotUuid: ballot.uuid, voterMasterDid: 'did:voter:3', value: { kind: 'binary', vote: 'yes' }, signature: 's3', castAt: '2030-06-01T12:00:00Z' })
    const agg = computeAggregate(ballot.uuid)
    expect(agg.tally['yes']).toBe(2)
    expect(agg.tally['no']).toBe(1)
    expect(agg.leafUuids).toHaveLength(3)
    expect(typeof agg.uuid).toBe('string')
    expect(agg.uuid.length).toBeGreaterThan(0)
  })

  it('computeAggregate calculates weightedAverage for rating ballots', () => {
    const ballot = createBallot({
      tenantId: TENANT,
      subjectUuid: SUBJECT,
      periodUuid: 'period-rating',
      kind: 'rating-1to5',
      choices: [],
      opensAt: '2020-01-01T00:00:00Z',
      closesAt: '2099-12-31T23:59:59Z',
    })
    castVote({ ballotUuid: ballot.uuid, voterMasterDid: 'did:voter:1', value: { kind: 'rating-1to5', rating: 4 }, signature: 's1', castAt: '2030-06-01T10:00:00Z' })
    castVote({ ballotUuid: ballot.uuid, voterMasterDid: 'did:voter:2', value: { kind: 'rating-1to5', rating: 2 }, signature: 's2', castAt: '2030-06-01T11:00:00Z' })
    const agg = computeAggregate(ballot.uuid)
    expect(agg.weightedAverage).toBe(3)
  })

  it('verifyAggregate returns ok=true for a freshly computed aggregate (Law 30)', () => {
    const ballot = makeBallot()
    castVote({ ballotUuid: ballot.uuid, voterMasterDid: 'did:voter:1', value: { kind: 'binary', vote: 'yes' }, signature: 's1', castAt: '2030-06-01T10:00:00Z' })
    computeAggregate(ballot.uuid)
    const verification = verifyAggregate(ballot.uuid)
    expect(verification.ok).toBe(true)
    expect(verification.issues).toHaveLength(0)
    expect(verification.publishedUuid).toBe(verification.recomputedUuid)
  })

  it('verifyAggregate reports missing ballot and aggregate', () => {
    const result = verifyAggregate('no-such-ballot')
    expect(result.ok).toBe(false)
    expect(result.issues).toContain('ballot-not-found')
    expect(result.issues).toContain('aggregate-not-published')
  })

  it('checkNoDoubleVoting returns ok=true when there are no duplicates', () => {
    const ballot = makeBallot()
    castVote({ ballotUuid: ballot.uuid, voterMasterDid: 'did:voter:A', value: { kind: 'binary', vote: 'yes' }, signature: 'sA', castAt: '2030-06-01T10:00:00Z' })
    castVote({ ballotUuid: ballot.uuid, voterMasterDid: 'did:voter:B', value: { kind: 'binary', vote: 'no' }, signature: 'sB', castAt: '2030-06-01T11:00:00Z' })
    const result = checkNoDoubleVoting()
    expect(result.ok).toBe(true)
    expect(result.duplicates).toHaveLength(0)
  })

  it('listVotes returns only votes for the specified ballot', () => {
    const b1 = makeBallot()
    const b2 = createBallot({
      tenantId: TENANT,
      subjectUuid: 'other-subject',
      periodUuid: 'other-period',
      kind: 'binary',
      choices: [],
      opensAt: '2020-01-01T00:00:00Z',
      closesAt: '2099-12-31T23:59:59Z',
    })
    castVote({ ballotUuid: b1.uuid, voterMasterDid: 'did:voter:1', value: { kind: 'binary', vote: 'yes' }, signature: 's1', castAt: '2030-06-01T10:00:00Z' })
    castVote({ ballotUuid: b2.uuid, voterMasterDid: 'did:voter:2', value: { kind: 'binary', vote: 'no' }, signature: 's2', castAt: '2030-06-01T10:00:00Z' })
    const votes = listVotes(b1.uuid)
    expect(votes).toHaveLength(1)
    expect(votes[0]?.ballotUuid).toBe(b1.uuid)
  })

  it('exportBallotBundle returns a non-empty canonical JSON string for a ballot with votes', () => {
    const ballot = makeBallot()
    castVote({ ballotUuid: ballot.uuid, voterMasterDid: 'did:voter:1', value: { kind: 'binary', vote: 'yes' }, signature: 's1', castAt: '2030-06-01T10:00:00Z' })
    computeAggregate(ballot.uuid)
    const bundle = exportBallotBundle(ballot.uuid)
    expect(typeof bundle).toBe('string')
    expect(bundle.length).toBeGreaterThan(0)
    const parsed = JSON.parse(bundle)
    expect(parsed).toHaveProperty('ballot')
    expect(parsed).toHaveProperty('votes')
    expect(parsed).toHaveProperty('aggregate')
  })

  it('exportBallotBundle returns empty string for unknown ballot', () => {
    expect(exportBallotBundle('unknown-uuid')).toBe('')
  })

  it('getAggregate returns undefined before computeAggregate is called', () => {
    const ballot = makeBallot()
    expect(getAggregate(ballot.uuid)).toBeUndefined()
    computeAggregate(ballot.uuid)
    expect(getAggregate(ballot.uuid)).toBeDefined()
  })
})
