/**
 * Git Merkle DAG — erpax's own chain, as a published proof leg.
 *
 * Git history is a content-addressed Merkle DAG: a commit's SHA-1 is the hash of
 * its content INCLUDING its parent's SHA, exactly as an erpax row's content-uuid is
 * the SHA-256 of its canonical content (services/integrity/content-uuid). So the
 * akashic record ([[history]], [[akashic]]) is itself a blockchain, and the same
 * forge≫verify asymmetry ([[proof]]) holds:
 *   - VERIFY  = `git fsck --full --strict` recomputes every object hash + every
 *     parent link in O(N) — the whole DAG decoded for free on 64-bit hardware.
 *   - FORGE   = rewriting any past commit re-hashes all (N−d) descendants on EVERY
 *     replica, while one honest verifier detects the divergence in O(N).
 *
 * `buildDryProofBundle` runs at the Cloudflare edge, where there is no `git` and no
 * `.git` directory — so the actual `git fsck` runs at BUILD time in a git collector
 * (where git exists, also the CI gate), and this PURE
 * summarizer folds the captured facts into the content-uuid'd bundle. A peer
 * re-clones at the same HEAD and re-runs the same fsck to confirm — verify, do not
 * trust. Pure + deterministic given its input.
 *
 * @standard Git object model — SHA-1 over `"<type> <len>\0<content>"` (commits include parent)
 * @standard NIST FIPS 180-4 (the underlying hash); RFC 9562 §5.8 (the erpax content-uuid twin)
 * @audit Conservation Law 55 (tamper cost grows with history; audit stays O(N))
 * @see ../../dry-proof.ts ../../bitcoin/genesis
 */

/** Facts captured at build time by a git collector, where git exists. */
export interface MerkleDagFacts {
  /** HEAD commit SHA at build time */
  readonly head: string
  /** total commits across all refs (`git rev-list --count --all`) */
  readonly commits: number
  /** total reachable objects (`git rev-list --objects --all | wc -l`) */
  readonly objects: number
  /** object DB size on disk, bytes (`git count-objects -vH`) */
  readonly onDiskBytes: number
  /** `git fsck --full --strict` recomputed every object + link with no error */
  readonly fsckClean: boolean
  /** ISO 8601 timestamp the collector ran (optional) */
  readonly verifiedAt?: string
}

export interface MerkleDagProof {
  readonly chain: 'git-merkle-dag'
  readonly claim: string
  readonly head: string
  readonly commits: number
  readonly objects: number
  readonly onDiskBytes: number
  readonly fsckClean: boolean
  readonly verifyTool: 'git fsck --full --strict'
  readonly verifyComplexity: 'O(N)'
  readonly forgeModel: string
  readonly verifiedAt?: string
  readonly note: string
}

/**
 * Decide whether `git fsck --full --strict` verified the DAG with no corruption.
 * Clean ⇔ exit code 0 AND no error line — but `dangling` (unreachable object) and
 * `warning` (strict lint codes like badTimezone/missingTaggerEntry) notices are NOT
 * corruption, so they are excluded before scanning for the real fault words. Pure.
 */
export function isFsckClean(exitCode: number, output: string): boolean {
  if (exitCode !== 0) return false
  const faultLines = output
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.length > 0 && !/^dangling/i.test(l) && !/^warning/i.test(l))
  return !faultLines.some(
    (l) => /\b(missing|broken|corrupt)\b/i.test(l) || /^(error|fatal)\b/i.test(l) || /bad sha1|object corrupt/i.test(l),
  )
}

/** Fold build-time git facts into a peer-recomputable Merkle-DAG proof leg. */
export function summarizeMerkleDag(facts: MerkleDagFacts): MerkleDagProof {
  const forgeModel =
    `Rewriting any past commit at depth d re-hashes all (N−d) of the ${facts.commits} descendant commits ` +
    `(each commit's SHA covers its parent's SHA), and — git being content-addressed and distributed — must ` +
    `do so on every replica simultaneously to escape detection: cost (N−d)·R, unbounded in the replica count R. ` +
    `Any single honest verifier recomputes the whole DAG in O(N) and the forged hash will not match what every ` +
    `other replica advertises.`
  const note = facts.fsckClean
    ? `${facts.commits} commits / ${facts.objects} objects fully verified by recomputing every hash and parent link. forge ≫ verify.`
    : `git fsck did NOT verify clean — the DAG is corrupt or incomplete and this leg is not a valid proof. Investigate before publishing.`
  return {
    chain: 'git-merkle-dag',
    claim:
      'erpax own akashic record (git history) is a content-addressed Merkle DAG, fully verifiable in O(N) on commodity 64-bit hardware at zero trust.',
    head: facts.head,
    commits: facts.commits,
    objects: facts.objects,
    onDiskBytes: facts.onDiskBytes,
    fsckClean: facts.fsckClean,
    verifyTool: 'git fsck --full --strict',
    verifyComplexity: 'O(N)',
    forgeModel,
    ...(facts.verifiedAt ? { verifiedAt: facts.verifiedAt } : {}),
    note,
  }
}
