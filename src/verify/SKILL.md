# verify — the kernel is the only reader whose green means anything, and it does not run in a Worker

Every other gate in this corpus is a program this corpus wrote, checking a property this corpus
chose. `verify` is the one place where the checker is **not ours**: Lean's kernel accepts a proof or
refuses it, and it has refused mine twice — `Direction.within` is not closed on the message band,
and `Cost.lean`'s Grover halving contradicted what NIST actually publishes. A gate I can talk my way
around is not a gate; a kernel I cannot is the point of this atom.

| leg | what it is |
| --- | --- |
| [[verify]]/lean | the source of truth — `.lean` files the kernel compiles and `#print axioms` reports on |
| [[verify]]/inventory | the kernel's verdict, parsed from its own words and emitted as a record a Worker can serve |

## The one thing this atom must never do

**Read the `.lean` text to decide whether something is proved.** "no sorry" in a comment reads as a
proof; `theorem x : a = a` reads as a theorem. The verdict is taken from `#print axioms` output —
the kernel's sentence, "does not depend on any axioms" — and from nothing else. [[rules]]/prose and
[[rules]]/mirror each paid for the other habit separately.

The consequence is stated in the payload rather than trusted: the served record names the content
hash of the sources the kernel ran over, so a moved source makes the record stale **by
construction**. A reader is never told "this is proven"; they are told "a kernel run over these
exact bytes reported this".

**Honest boundary.** A green kernel proves the theorem as **stated**, never that the statement is
the one that matters — a true theorem about the wrong object is the failure mode no kernel catches,
and it is why each file's statements are written to be refutable by something outside them. The
served inventory is a RECORD, not a live run: there is no Lean in a Cloudflare Worker and there will
not be one.

**Law — [[law]]: a proof is what a kernel accepted, never what a file says about itself. Run the
kernel where it can run, emit what it reported, and address the emission by the hash of what it
read — so a stale claim is detectable instead of merely unlikely.**

## Standards

- **ISO 19011:2018 §6.4** — audit evidence: the citation must lead to the evidence.
- **ISO/IEC 25010:2023 §5.5** — testability.

Composes: [[verify]]/lean · [[verify]]/inventory · [[rules]]/refutable · [[rules]]/mirror · [[law]].
