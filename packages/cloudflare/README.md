# @erpax/cloudflare

erpax **cloudflare** — sequence **7·5 (surface)**: edge runtime, bindings, agents/MCP, deploy.

Built from [`src/cloudflare`](https://github.com/erpax/erpax/tree/main/src/cloudflare) by `packages/build.mjs`; the runtime closure is bundled, bare imports stay external (computed into dependencies), and the closure ratchet (`erpax.closureCeiling`) fails the build closed if entanglement grows.

Licence: CC-BY-NC-ND-4.0 (or commercial via license@erpax.com). Free core math lives in `@erpax/algebra` (MIT).
