/**
 * GET /next/exit-preview — disable draft mode.
 *
 * @rfc 9110 http-semantics
 * @rfc 6265 cookies draft-mode-cookie
 * @see src/app/README.md
 */

import { draftMode } from 'next/headers'

export async function GET(): Promise<Response> {
  const draft = await draftMode()
  draft.disable()
  return new Response('Draft mode is disabled')
}
