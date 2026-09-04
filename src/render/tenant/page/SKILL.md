# render/tenant/page — one composition, so a tenant page is the same page everywhere

A public tenant page is a hero followed by its layout blocks, inside an `<article>`. That is the
whole atom, and its value is that it exists **once**: the same composition served from the tenant
route and the main `[slug]` route means a page cannot render differently depending on how it was
reached.

The `<article>` element is the part worth stating. A page's main content is a self-contained
composition, and marking it as such is what lets a reader-mode, a crawler, and a screen reader's
landmark navigation each find the content rather than the chrome around it. A `<div>` would look
identical and carry none of that.

**Honest boundary.** This is composition only. The hero's dispatch is [[hero]]/render's — including
its handling of a type this build does not know — and each block's rendering belongs to its own atom.
An empty layout renders an empty article, which is correct: a page with no blocks yet is not an
error.

**Law — [[law]]: one route composition, used by every route that shows the same thing. Two
compositions of one page drift, and the drift is discovered by whoever reached the page the less
common way.**

## Standards

- **W3C HTML5** — the `article` element for self-contained content.
- **WCAG 2.2 §1.3.1** — info and relationships.

Composes: [[hero]]/render · `block` · [[law]].
