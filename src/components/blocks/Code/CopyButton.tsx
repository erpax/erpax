'use client'
import { Button } from '@/components/ui/button'
import { CopyIcon } from '@payloadcms/ui/icons/Copy'
import { useState } from 'react'

export function CopyButton({ code }: { code: string }) {
  const [text, setText] = useState('Copy')

  function updateCopyStatus() {
    if (text === 'Copy') {
      setText(() => 'Copied!')
      setTimeout(() => {
        setText(() => 'Copy')
      }, 1000)
    }
  }

  return (
    <div className="flex justify-end align-middle">
      <Button
        className="flex gap-1"
        variant={'secondary'}
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(code)
            updateCopyStatus()
          } catch {
            // navigator.clipboard.writeText rejects with NotAllowedError when the
            // page lacks clipboard-write permission or transient user-activation
            // (e.g. the document isn't focused, or an embedded/insecure context).
            // A copy button must never throw — swallow it.
          }
        }}
      >
        <p>{text}</p>
        <CopyIcon />
      </Button>
    </div>
  )
}
