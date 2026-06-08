'use client'
/**
 * Live-preview listener — subscribes to Payload preview WebSocket and
 * refreshes the route on save.
 *
 * @rfc 6455 the-websocket-protocol
 * @rfc 9110 http-semantics
 * @see src/components/README.md
 */
import { getClientSideURL } from '@/rfc/3986'
import { RefreshRouteOnSave as PayloadLivePreview } from '@payloadcms/live-preview-react'
import { useRouter } from 'next/navigation'
import React from 'react'

export const LivePreviewListener: React.FC = () => {
  const router = useRouter()
  return <PayloadLivePreview refresh={router.refresh} serverURL={getClientSideURL()} />
}
