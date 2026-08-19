---
name: automate
description: Quantum automation primitives for iterative problem-solving loops
metadata:
  type: form
---

# automate — automate quantum computation with feedback loops and refinement

Automation primitives that enable iterative quantum computation: task spawning, result collection, failure handling, refinement loops, and convergence detection.

## when

Use when running closed-loop quantum computation: spawn tasks, collect results, analyze convergence, refine hypotheses, and repeat until proof or divergence is clear.

## code

entry `@/automate` · sealed `1` · trinity `1·1·1`
exports AutomationLoop, LoopState, runLoop, refineHypothesis, detectDivergence
imports @/orchestrate, @/quantum/computer

---

<sub>Automation · feedback loops · convergence detection</sub>
