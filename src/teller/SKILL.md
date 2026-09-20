# teller — the branch counter, mounted on [[float]]

Everything structural — the derived total, the signed variance, the void-on-illegal-count rule —
lives in [[float]], because a chip tray, an armoury and a public till obey the same law. What is
teller's **own** is the unit set the euro issues and the branch's two thresholds.

That split is the point: when the reconciliation law changes it changes **once**, and no case can
drift from it.

## A preserved name is not a preserved meaning

This atom used to hold the reconciliation itself. Moving it out and re-exporting the names kept
every caller compiling — and **silently changed one of them**. `needsDualControl(amount)` took the
branch threshold as a default; the core's version requires it, so every amount compared against
`undefined` and returned `false`. A four-eyes check answering *no* to everything, with the face
intact and the build green.

A test caught it, and it is exactly the boundary [[rules]]/face states about itself: that gate
proves a name is still **offered**, never that it still **means** what it did. So `needsDualControl`
is wrapped here with the branch's default rather than re-exported, and the case is pinned.

**Honest boundary.** A balanced drawer proves the count agrees with the movements recorded. It does
not prove the movements are complete: a transaction never entered leaves both sides consistent.
That is what dual control and an independent counter are for, and neither is a function.

**Law — [[law]]: a case mounts the law, it does not restate it. And when matter moves out from
under a name, check what the name MEANT — the compiler only checks that it still exists.**

## Standards

- **ISO 4217** — EUR, minor units.
- **ECB** — euro legal tender denominations.
- **ISA 501** — physical count as audit evidence.

Composes: [[float]] · [[rules]]/face · [[law]].
