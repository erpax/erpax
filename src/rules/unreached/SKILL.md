# rules/unreached — 80 atoms of code that nothing reaches, from any entry this corpus has

The accounting wave's remaining 258 is not 258 separate defects. It is **80 leaves and their
ancestors**: an atom is charged `deployment: no materialised face`, and every folder above it is then
charged `path axis: ancestor chain unsealed` for the same absence. Pay the leaf and the chain pays
itself — the cascade [[diamond]]/membership already corrected once, one axis over.

## Five doors, tried before an atom is named

Each is a legitimate way to be reached, or a legitimate reason not to need reaching:

| door | what it admits |
| --- | --- |
| deployment face | the atom is reached from a worker · plugin · pwa entry |
| the gate registry | `src/rules/index.ts` imports it — it runs in CI |
| the CLI | `erpax` reaches it |
| a published package | it is a **public face**: `@erpax/*` ships it, so consumers reach it |
| a vocabulary word | its barrel exists only to name a schema.org word ([[seal]] fixed this once) |

**80 survive all five.** They are not gates, not CLI, not deployed, not shipped, and not words.

I expected the opposite. My first hypothesis was that the charge over-counts — that these are gate and
research atoms reached from the tooling entries and simply not from the worker. Measured: **3 of 83**
are reached from the gate or CLI. The premise was wrong and the charge is right.

## The door was checked, and never propagated — 78 to 64

`hasDeploymentFace` asked each atom whether IT carries a worker/plugin/pwa face. It never asked
whether something that does **imports it**. So an atom whose only door is "a deployed atom reaches
it" was charged as unreached.

`xml/escape` is the plain case: three exporters that all carry a face import it, and it was counted
anyway. Seeding the reachability walk with every face-bearing atom's barrel — the same walk the
tooling entries already get — took the count from **78 to 64**.

This is the [[rules]]/domain law turned on this axis: *a law reaches exactly the cases its checker
opens*. Fourteen atoms were neither passing nor failing; the question was never asked of them, and
an unasked question reports as a violation just as readily as it reports as green.

## What it is not

This is a **candidate list, never a purge list** — the same boundary [[rules]]/unfolded carries, and
for the same reason. An atom reached only DYNAMICALLY is invisible to a lexical import walk: a path
string in a config, an `importMap` entry, a `relationTo` slug. Payload reaches admin components
exactly that way, and `admin/ui/fields` is correctly NOT here because the generated importMap names
it — while `admin/ui/cells`, `admin/ui/dashboard` and `admin/ui/nav` are, because nothing names them.

So this proves nothing IMPORTS the atom. Whether that means *wire it* or *drop it* is a per-atom
product decision, and deleting 80 atoms because a lexical walk did not find them is exactly the blind
sweep this corpus refuses.

**Law — [[law]]: an atom of code earns its place by being reachable. Try every door — deployed,
gated, shipped, or a word — and what is left is code nothing runs. Name it, ratchet it, and decide
per atom; never sweep it.**

## Standards

- **ISO/IEC 25010:2023 §5.6** — maintainability: unreachable code is a cost with no counterpart.

Composes: [[rules]]/unfolded · [[rules]]/cycle · [[diamond]]/membership · [[law]].
