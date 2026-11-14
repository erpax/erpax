'use client'
/**
 * chats/Component — the UI realtime chat, fused to all APIs, gated to the standards.
 *
 * PURE PRESENTATION by design: the server computes the reachable tool names
 * (accessibleByStandard over erpaxMcpTools — the DRY standards-gate) and handles
 * invocation (chatInvoke → the in-process MCP client — the api fusion), so NO sealing
 * crypto or heavy engine imports leak into the client bundle. Realtime arrives via
 * `subscribe` (fed at runtime by chatBroadcastAfterChange on the `chat` collection).
 *
 * @see ../quantum/chat (the engine: chatInvoke · accessibleByStandard · thread)
 * @see ../agent/sync/chat-broadcast (chatBroadcastAfterChange — the realtime source)
 *
 * The standards-gate lives in the SERVER (accessibleByStandard cites ISO/IEC 27001
 * A.5.15); this component only renders the already-gated `reachableTools`.
 */
import React, { useEffect, useState } from 'react'

export interface ChatUiMessage {
  readonly from: string
  readonly text: string
}

export interface ChatProps {
  /** initial thread (server-rendered); realtime appends via `subscribe`. */
  readonly messages: readonly ChatUiMessage[]
  /** tool names the party MAY invoke — already standards-gated server-side (accessibleByStandard). */
  readonly reachableTools: readonly string[]
  readonly onSend?: (text: string) => void
  /** invoke a fused API tool (server routes it through chatInvoke → the MCP client). */
  readonly onInvoke?: (tool: string) => void
  /** realtime source: register a listener, get an unsubscribe (chatBroadcast / SSE). */
  readonly subscribe?: (onMessage: (m: ChatUiMessage) => void) => () => void
}

export function Chat(props: ChatProps): React.JSX.Element {
  const { subscribe } = props // destructure so the effect depends on the specific prop, not all of props
  const [live, setLive] = useState<readonly ChatUiMessage[]>(props.messages)
  const [draft, setDraft] = useState('')

  useEffect(() => {
    if (!subscribe) return
    return subscribe((m) => setLive((prev) => [...prev, m])) // realtime fuse
  }, [subscribe])

  return (
    <div className="erpax-chat">
      <ul className="erpax-chat-thread" aria-label="chat thread">
        {live.map((m, i) => (
          <li key={i}>
            <b>{m.from}</b>: {m.text}
          </li>
        ))}
      </ul>
      {props.reachableTools.length > 0 && (
        <div className="erpax-chat-tools" aria-label="reachable tools">
          {props.reachableTools.map((name) => (
            <button key={name} type="button" onClick={() => props.onInvoke?.(name)}>
              {name}
            </button>
          ))}
        </div>
      )}
      <form
        className="erpax-chat-compose"
        onSubmit={(e) => {
          e.preventDefault()
          if (draft.trim()) {
            props.onSend?.(draft.trim())
            setDraft('')
          }
        }}
      >
        <input aria-label="message" value={draft} onChange={(e) => setDraft(e.target.value)} />
        <button type="submit">send</button>
      </form>
    </div>
  )
}
