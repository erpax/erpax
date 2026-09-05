# admin/bar — the edit affordance the CMS owes an authenticated reader

`AdminBar` renders the strip a logged-in editor sees over public pages: the collection and
document being viewed, and the link back into the admin panel that edits it. It reads the
Payload auth state, so an anonymous reader is served the same page with nothing rendered.

It is a React barrel — `index.tsx`, never `index.ts`, because JSX cannot parse from one — and
its own stylesheet sits beside it rather than in a global sheet, so the strip cannot leak
styling onto the page it overlays.

Composes: [[law]].
