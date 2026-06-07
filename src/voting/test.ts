import { describe, it, expect, beforeEach } from 'vitest'
import {
  createBallot,
  castVote,
  computeAggregate,
  verifyAggregate,
  checkNoDoubleVoting,
  derivePseudoDid,
  getBallot,
  listVotes,
  exportBallotBundle,
  __resetVotingForTests,
  type Ballot,
} from '@/voting'

// voting — a vote is its own content-uuid, so every way to game a ballot
// becomes a recomputable mismatch a stranger can catch (./index.ts).
// FORM: cast (content-uuid + double-vote guard) · pseudonymise · tally (Law 30/31).

const OPEN = '2026-01-01T00:00:00.000Z'
const NOW = '2026-06-07T00:00:00.000Z'
const CLOSE = '2026-12-31T00:00:00.000Z'

const ratingBallot = (): Ballot =>
  createBallot({
    tenantId: 't1',
    subjectUuid: 'subject-1',
    periodUuid: 'period-1',
    kind: 'rating-1to5',
    choices: [],
    opensAt: OPEN,
    closesAt: CLOSE,
  })

describe('voting — the unforgeable cast and the honest tally', () => {
  beforeEach(() => {
    __resetVotingForTests()
  })

  it('cast — a vote is content-addressed and recorded against its ballot', () => {
    const ballot = ratingBallot()
    expect(getBallot(ballot.uuid)).toBe(ballot)

    const r = castVote({
      ballotUuid: ballot.uuid,
      voterMasterDid: 'did:alice',
      value: { kind: 'rating-1to5', rating: 4 },
      signature: 'sig',
      castAt: NOW,
    })
    expect(r.ok).toBe(true)
    expect(r.vote?.uuid).toBeTruthy()
    expect(listVotes(ballot.uuid)).toHaveLength(1)
  })

  it('double-vote guard — an identical second cast collides with the first (Law 31)', () => {
    const ballot = ratingBallot()
    const cast = () =>
      castVote({
        ballotUuid: ballot.uuid,
        voterMasterDid: 'did:alice',
        value: { kind: 'rating-1to5', rating: 4 },
        signature: 'sig',
        castAt: NOW,
      })
    expect(cast().ok).toBe(true)
    const second = cast()
    expect(second.ok).toBe(false)
    expect(second.reason).toBe('duplicate-vote')
    expect(checkNoDoubleVoting().ok).toBe(true) // dup never stored ⇒ no double-vote in the set
  })

  it('castAt/signature are outside the uuid content — different voters still differ', () => {
    const ballot = ratingBallot()
    const a = castVote({
      ballotUuid: ballot.uuid,
      voterMasterDid: 'did:alice',
      value: { kind: 'rating-1to5', rating: 4 },
      signature: 'sig-a',
      castAt: NOW,
    })
    const b = castVote({
      ballotUuid: ballot.uuid,
      voterMasterDid: 'did:bob',
      value: { kind: 'rating-1to5', rating: 4 },
      signature: 'sig-b',
      castAt: CLOSE,
    })
    expect(a.vote?.uuid).not.toBe(b.vote?.uuid)
  })

  it('cast rejects a closed ballot and a kind mismatch', () => {
    const ballot = ratingBallot()
    const closed = castVote({
      ballotUuid: ballot.uuid,
      voterMasterDid: 'did:alice',
      value: { kind: 'rating-1to5', rating: 4 },
      signature: 'sig',
      castAt: '2025-01-01T00:00:00.000Z', // before opensAt
    })
    expect(closed.reason).toBe('ballot-closed')

    const wrongKind = castVote({
      ballotUuid: ballot.uuid,
      voterMasterDid: 'did:alice',
      value: { kind: 'binary', vote: 'yes' },
      signature: 'sig',
      castAt: NOW,
    })
    expect(wrongKind.reason).toBe('kind-mismatch')

    const noBallot = castVote({
      ballotUuid: 'nope',
      voterMasterDid: 'did:alice',
      value: { kind: 'rating-1to5', rating: 4 },
      signature: 'sig',
      castAt: NOW,
    })
    expect(noBallot.reason).toBe('ballot-not-found')
  })

  it('pseudonymise — same master DID, different periods ⇒ unlinkable pseudo-DIDs', () => {
    const p1 = derivePseudoDid('did:alice', 'period-1')
    const p2 = derivePseudoDid('did:alice', 'period-2')
    expect(p1).toMatch(/^did:erpax:vote:[0-9a-f]{32}$/)
    expect(p1).not.toBe(p2)
    // deterministic — same inputs ⇒ same pseudo-DID
    expect(derivePseudoDid('did:alice', 'period-1')).toBe(p1)
  })

  it('tally — aggregate uuid recomputes and verifies (Law 30)', () => {
    const ballot = ratingBallot()
    castVote({
      ballotUuid: ballot.uuid,
      voterMasterDid: 'did:alice',
      value: { kind: 'rating-1to5', rating: 4 },
      signature: 's1',
      castAt: NOW,
    })
    castVote({
      ballotUuid: ballot.uuid,
      voterMasterDid: 'did:bob',
      value: { kind: 'rating-1to5', rating: 2 },
      signature: 's2',
      castAt: NOW,
    })
    const agg = computeAggregate(ballot.uuid)
    expect(agg.weightedAverage).toBe(3) // (4 + 2) / 2
    expect(agg.tally['4']).toBe(1)
    expect(agg.tally['2']).toBe(1)
    // leaf uuids are sorted ascending for determinism
    expect([...agg.leafUuids]).toEqual([...agg.leafUuids].sort())

    const v = verifyAggregate(ballot.uuid)
    expect(v.ok).toBe(true)
    expect(v.publishedUuid).toBe(v.recomputedUuid)
    expect(v.issues).toHaveLength(0)
  })

  it('tally — verifyAggregate fails when nothing is published', () => {
    const ballot = ratingBallot()
    const v = verifyAggregate(ballot.uuid)
    expect(v.ok).toBe(false)
    expect(v.issues).toContain('aggregate-not-published')
  })

  it('exportBallotBundle is a deterministic canonical string of the ballot', () => {
    const ballot = ratingBallot()
    castVote({
      ballotUuid: ballot.uuid,
      voterMasterDid: 'did:alice',
      value: { kind: 'rating-1to5', rating: 5 },
      signature: 's1',
      castAt: NOW,
    })
    const bundle = exportBallotBundle(ballot.uuid)
    expect(bundle).toContain(ballot.uuid)
    expect(exportBallotBundle(ballot.uuid)).toBe(bundle)
    expect(exportBallotBundle('unknown')).toBe('')
  })
})
