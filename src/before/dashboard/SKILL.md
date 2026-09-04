# before/dashboard — the first-run prompt that must not be mistaken for an error

An empty admin panel is ambiguous: a first run and a broken connection look identical. This banner
resolves it — it appears above the dashboard on a fresh install and offers the seed action.

It is a **status**, not an alert. WAI-ARIA gives `role="status"` an implicit `aria-live="polite"`,
which announces the message when the user next pauses rather than interrupting them, and that is the
right register for "your database is empty and here is how to fill it". An alert would say something
went wrong; nothing has.

**Honest boundary.** This atom is the prompt and the copy. The action belongs to
[[before]]/dashboard/seed/button, and whether seeding is safe against existing data is that atom's
claim, not this one's.

**Law — [[law]]: an empty state is explained, and explained in the right register. Silence reads as
breakage, and an alert for a normal condition trains the user to dismiss alerts.**

## Standards

- **WAI-ARIA 1.2** — the `status` role and its polite live region.
- **WCAG 2.2 §1.4.3** — contrast minimum.
- **BCP 47** — language tags on the translated copy.

Composes: [[before]] · [[law]].
