/**
 * agent/chat — agents conversing: an ordered thread of content-uuid messages between agent ids. Each
 * message is a [[communication]] (the message IS its content-uuid); the thread is tamper-evident (the
 * [[quantum]]/chat facet folds it to a chain-uuid). Merges into [[chat]].
 * Composes [[agent]] · [[communication]] · [[chat]].
 *
 *   tsx src/agent/chat/index.ts
 *
 * @see ../../agent -- ../../communication -- ../../chat -- ./SKILL.md
 */
import { communicate, type Communication } from '@/communication'

export type AgentChat = readonly Communication[]

/** Append an agent message (content-uuid) to a chat thread (pure — returns a new thread). */
export const say = (chat: AgentChat, from: string, to: string, contentUuid: string): AgentChat => [
  ...chat,
  communicate(from, to, contentUuid),
]

/** The distinct agent ids participating in a chat. */
export const participants = (chat: AgentChat): string[] => [...new Set(chat.flatMap((m) => [m.from, m.to]))]

if (import.meta.url === 'file://' + process.argv[1]) {
  const c = say(say([], 'a', 'b', 'u1'), 'b', 'a', 'u2')
  console.log('agent/chat — ' + c.length + ' messages · participants ' + participants(c).join(','))
}
