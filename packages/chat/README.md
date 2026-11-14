# @erpax/chat

Chat — rooms, messages, connections. One erpax app, delivered as one Payload plugin.

```bash
pnpm add @erpax/chat
```

```ts
import { buildConfig } from 'payload'
import chat from '@erpax/chat'

export default buildConfig({
  plugins: [chat()],
})
```

The package is generated from `src/packages/chat`. The collections it brings are computed from the relationship graph; `collections` lists them and `app` names the anchors that define the app.
