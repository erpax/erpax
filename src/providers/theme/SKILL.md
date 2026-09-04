# providers/theme — null means "follow the system", and that is not the same as light

Three states, not two. A theme can be **light**, **dark**, or **unset** — and unset does not mean a
default was chosen, it means *follow the operating system*. Collapsing the third into "light" is the
ordinary bug: a user on a dark desktop who has never touched the toggle gets a white page, and no
setting exists that they could change to fix it.

So `setTheme(null)` is a real operation with its own path: it **removes** the stored preference,
reads the implicit one from the platform, and applies that. `setTheme('dark')` stores and applies.
The distinction between *no preference* and *a preference that happens to be light* is the whole
design.

Three surfaces must agree, and each is written deliberately:

- `localStorage` — persistence across visits, and its absence is what "unset" means.
- `data-theme` on `<html>` — what CSS actually reads.
- React state — what components read.

Writing state without the attribute leaves the page un-styled while the app believes it is themed;
writing the attribute without storage forgets the choice on reload.

**Honest boundary.** The proof asserts the three-way behaviour and that each surface is written. It
does not test the flash-of-wrong-theme on first paint — that is `providers/theme/init/theme`'s
job, running before hydration — and it does not verify any particular colour.

**Law — [[law]]: an unset preference is a state, not a default. Storing "light" for a user who never
chose it is a decision made on their behalf, and it is invisible to them and unfixable by them.**

## Standards

- **CSS Media Queries Level 5** — `prefers-color-scheme` as the implicit preference.
- **WCAG 2.2 §1.4.3** — the contrast contract each theme carries.

Composes: `providers` · `can/use/dom` · [[law]].
