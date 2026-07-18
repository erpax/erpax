---
name: timeout
description: "Use when bounding any command's wall time — the reasonable timeout is computed from measured samples onto the 1·2·3·5-minute ladder, never guessed."
atomPath: timeout
---

# timeout — the reasonable timeout is computed, never guessed

The standing cap ("max 3 minutes per task") lived as prose in memory — read every session, enforced never. This atom makes it a rung on a ladder: **1 · 2 · 3 · 5 minutes, 5 is the max**.

`timeoutOf(samplesMs)` picks the smallest rung that fits **2× the worst measured run** — the safety doubling over real evidence, not a guess. No samples ⇒ rung 3 (the standing cap). Needing past rung 5 ⇒ `exceeds: true` — **the command is the defect, not the ladder**: split it ([[rules]]: a flag is an audit of the spend, not a licence to raise the cap).

Wired where src spawns: the gate lanes and the rules ratchet run under the ceiling, so a runaway lane fails visibly instead of hanging forever.

**Honest boundary.** A rung proves a command *was bounded*, never that the bound is *right* — a lane that legitimately grows past its rung earns the next one from its own measured samples, in a deliberate diff.

**Law — [[law]]: every command carries a computed timeout from the 1·2·3·5 ladder; past 5 minutes the command is split, never the ceiling raised.**

Composes: [[rules]] · [[confirm]] · [[law]].
