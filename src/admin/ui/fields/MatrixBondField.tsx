'use client'

import { bidirectionalCrossOf } from '@/uuid/matrix'
import { Card, CardContent, CardHeader, CardTitle } from '@/ui'
import { RelationshipField } from '@payloadcms/ui'
import type { RelationshipFieldClientComponent } from 'payload'
import React, { useMemo } from 'react'

const baseClass = 'erpax-matrix-bond'

const MatrixBondField: RelationshipFieldClientComponent = ({ field, path }) => {
  const atomPath =
    typeof field.admin?.custom === 'object' &&
    field.admin?.custom !== null &&
    'atomPath' in field.admin.custom &&
    typeof (field.admin.custom as { atomPath?: unknown }).atomPath === 'string'
      ? (field.admin.custom as { atomPath: string }).atomPath
      : field.name

  const cross = useMemo(() => bidirectionalCrossOf(atomPath), [atomPath])

  return (
    <div className={baseClass}>
      <RelationshipField field={field} path={path} />
      {cross ? (
        <Card className="mt-2">
          <CardHeader className="py-3">
            <CardTitle className="text-sm">matrix bonds</CardTitle>
          </CardHeader>
          <CardContent className="text-xs">
            <ul className="list-disc space-y-1 pl-4">
              <li>parent: {cross.parent?.path ?? '∅'}</li>
              <li>children: {cross.children.map((c) => c.path).join(', ') || '∅'}</li>
              <li>
                prev → next: {cross.prev?.path ?? '∅'} → {cross.next?.path ?? '∅'}
              </li>
              <li>neighbors: {cross.neighbors.map((n) => n.path).join(', ') || '∅'}</li>
              <li>backlinks: {cross.backlinks.map((b) => b.path).join(', ') || '∅'}</li>
            </ul>
          </CardContent>
        </Card>
      ) : null}
    </div>
  )
}

export default MatrixBondField
