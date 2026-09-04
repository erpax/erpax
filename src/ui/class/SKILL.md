# ui/class — one place merges class names, and it is not called `utils`

`cn(...)` merges Tailwind class lists so a later utility wins over an earlier one — `clsx` for the
conditional shapes, `tailwind-merge` for the conflict resolution. Six modules use it.

It lived at `ui/utils.ts`. A stem like `utils`, `helpers` or `common` is a **bucket**, and a bucket
has no law: nothing can be true or false about a file named for the absence of a subject, so nothing
gates it and anything may be added to it ([[rules]] `word-matter`). The path is the message
([[path]]), and this file's message is *class*.

**Honest boundary.** This atom asserts where the merge lives and that one function performs it. It
does not verify Tailwind's own precedence rules — `tailwind-merge` owns those, and re-testing a
dependency's semantics here would be [[rules]]/canonical's defect in reverse.

**Law — [[law]]: a file named for a bucket cannot be reasoned about. Name it for what it is, and the
name becomes checkable — `class` merges classes, and a second merger would now be visible.**

Composes: [[ui]] · [[path]] · [[rules]] · [[law]].
