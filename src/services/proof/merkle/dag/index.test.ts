/**
 * Empirical proof leg — erpax's OWN chain. Git history is a content-addressed
 * Merkle DAG (each commit's SHA covers its content AND its parent's SHA), so the
 * akashic record is itself a blockchain. `git fsck --full --strict` recomputes
 * every object hash and every parent link in O(N) — the "decode the whole chain
 * for free on 64-bit hardware" proof — while forging the past means re-hashing all
 * descendants on every replica. This module is the PURE summarizer over facts the
 * build-time git collector captures where git exists;
 * `buildDryProofBundle` runs at the edge where it does not. @see ../../dry-proof.ts
 */
import { describe, it, expect } from 'vitest'
import { summarizeMerkleDag, isFsckClean } from './index'

describe('merkle-dag: erpax akashic record as a verifiable content-addressed chain', () => {
  it('summarizes build-time git facts into a peer-recomputable Merkle-DAG proof', () => {
    const p = summarizeMerkleDag({
      head: 'c3f73f35b165787f7adc4376925c5f68a3066152',
      commits: 771,
      objects: 13655,
      onDiskBytes: 35_500_000,
      fsckClean: true,
    })
    expect(p.chain).toBe('git-merkle-dag')
    expect(p.head).toBe('c3f73f35b165787f7adc4376925c5f68a3066152')
    expect(p.commits).toBe(771)
    expect(p.objects).toBe(13655)
    expect(p.onDiskBytes).toBe(35_500_000)
    expect(p.fsckClean).toBe(true)
    expect(p.verifyTool).toBe('git fsck --full --strict')
    expect(p.verifyComplexity).toBe('O(N)')
    // the forge model is parameterized by the real chain length and the replica axis
    expect(p.forgeModel).toMatch(/replica/i)
    expect(p.forgeModel).toContain('771')
  })

  it('reports a non-clean fsck honestly — never launders a corrupt DAG', () => {
    const p = summarizeMerkleDag({
      head: 'deadbeef',
      commits: 1,
      objects: 1,
      onDiskBytes: 1,
      fsckClean: false,
    })
    expect(p.fsckClean).toBe(false)
    expect(p.note).toMatch(/not verified|corrupt|failed/i)
  })
})

describe('merkle-dag: isFsckClean distinguishes real corruption from harmless notices', () => {
  it('is clean at exit 0 with only dangling (unreachable) or warning notices', () => {
    expect(isFsckClean(0, '')).toBe(true)
    expect(isFsckClean(0, 'dangling commit 309ee4f\ndangling blob abc123')).toBe(true)
    // strict promotes some lint codes to warnings (badTimezone, missingTaggerEntry) — not corruption
    expect(isFsckClean(0, 'warning in commit abc: badTimezone: invalid author/committer line')).toBe(true)
  })
  it('is NOT clean on a real fault, regardless of exit code', () => {
    expect(isFsckClean(0, 'missing blob 1234567890')).toBe(false)
    expect(isFsckClean(0, 'broken link from tree aaa to blob bbb')).toBe(false)
    expect(isFsckClean(0, 'error: bad sha1 file')).toBe(false)
    expect(isFsckClean(1, 'dangling commit abc')).toBe(false) // non-zero exit ⇒ not clean
  })
})
