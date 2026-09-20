/**
 * GET /api/proof — the kernel's verdict, served.
 *
 * THE BLOCK THIS REMOVES: erpax proves its decisions in Lean, and until now the only way to see
 * that was to install Lean and run it. A reader met the claim as a SENTENCE, which is the shape
 * [[rules]]/refutable exists to refuse — and the corpus's own README states a strong claim
 * ("physical FTL on QPU=CPU/GPU") that had a number beside it and no theorem.
 *
 * A Worker cannot run the kernel, so it serves the RECORD of a kernel run: every theorem, the
 * axioms it rests on, and whether any is a `sorryAx` stub. `sourcesHash` is the content address of
 * the .lean files the run covered — if the sources change and the record is not re-emitted, the
 * hashes disagree and the staleness is visible rather than assumed.
 *
 * Read-only, unauthenticated and tenant-free ON PURPOSE: a proof that only its author may read is
 * not evidence to anyone else. Nothing here touches a collection, so [[rules]]/bypass does not
 * apply — there is no access control to disable.
 *
 * @rfc 9110 http-semantics
 * @audit ISO-19011:2018 audit-evidence the citation must lead to the evidence
 * @see src/verify/inventory/SKILL.md
 */
import { INVENTORY as inventory, proved, type ProofCensus } from '@/verify/inventory'

export const dynamic = 'force-static'

export function GET(): Response {
  const census = inventory.census as ProofCensus
  return Response.json(
    {
      '@context': 'https://schema.org',
      '@type': 'Dataset',
      name: 'erpax — machine-checked proof inventory',
      description:
        'Every theorem in src/verify/lean, the axioms the Lean kernel says it rests on, and whether any is a sorry stub. ' +
        'A record of a kernel run, not a live check: a Worker cannot run Lean.',
      sealedAt: inventory.sealedAt,
      lean: inventory.lean,
      sourcesHash: inventory.sourcesHash,
      census: { ...census, proved: proved(census) },
      boundary:
        'A theorem proves its DECISION, never the facts it is fed. No proof here makes a red build green, ' +
        'a forged digest verify, or a divergent computation convergent.',
      files: inventory.files,
    },
    { headers: { 'cache-control': 'public, max-age=300' } },
  )
}
