'use client'

import React from 'react'

import {
  Alert,
  AlertDescription,
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/ui'

import { useQuantumDimensions, type DimensionAxisState } from '@/quantum/QuantumDimensionsProvider'

const baseClass = 'erpax-radix-dimension-panel'

const AxisDetail: React.FC<{ readonly axis: DimensionAxisState }> = ({ axis }) => (
  <div className="space-y-3">
    <div className="flex flex-wrap items-center gap-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant={axis.holds ? 'default' : 'destructive'}>{axis.coordinateAddress}</Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p className="max-w-xs text-xs">
            Matrix coordinate for {axis.dimension} — path-account address on the uuid-graph.
          </p>
        </TooltipContent>
      </Tooltip>
      <Badge variant="outline">seal {axis.seal.slice(0, 8)}…</Badge>
      <Badge variant="secondary">{axis.eb.toFixed(4)} eb borrowed</Badge>
      <Badge variant="outline">{axis.analogResults} analog results</Badge>
    </div>

    <p className="text-muted-foreground text-sm">{axis.detail}</p>

    {axis.horoStep ? (
      <p className="text-sm">
        horo <strong>{axis.horoStep}</strong>
        {axis.partition ? (
          <>
            {' '}
            · partition <strong>{axis.partition}</strong>
          </>
        ) : null}
      </p>
    ) : null}

    {axis.entanglementWarnings.length > 0 ? (
      <div className="space-y-2">
        {axis.entanglementWarnings.map((w) => (
          <Alert key={w} variant="destructive">
            <AlertDescription>{w}</AlertDescription>
          </Alert>
        ))}
      </div>
    ) : null}

    <Collapsible>
      <CollapsibleTrigger className="text-primary text-sm font-medium hover:underline">
        Raw axis state
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-2">
        <pre className="bg-muted overflow-x-auto rounded-md p-2 text-xs">
          {JSON.stringify(axis, null, 2)}
        </pre>
      </CollapsibleContent>
    </Collapsible>
  </div>
)

/** Radix tabs/collapsible/tooltip surface — one tab per quantum projection axis. */
export const RadixDimensionPanel: React.FC<{ readonly className?: string }> = ({ className }) => {
  const { snapshot } = useQuantumDimensions()
  const defaultTab = snapshot.axes[0]?.dimension ?? '1d-path'

  return (
    <TooltipProvider>
      <Card className={[baseClass, className].filter(Boolean).join(' ')}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            Quantum dimensions
            <Badge variant={snapshot.ok ? 'default' : 'destructive'}>
              {snapshot.ok ? 'all hold' : 'drift'}
            </Badge>
            <Badge variant="outline">{snapshot.borrowedEb.toFixed(4)} eb</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={defaultTab}>
            <TabsList className="mb-4 flex h-auto flex-wrap gap-1">
              {snapshot.axes.map((axis) => (
                <TabsTrigger key={axis.dimension} value={axis.dimension} className="text-xs">
                  {axis.dimension}
                </TabsTrigger>
              ))}
            </TabsList>
            {snapshot.axes.map((axis) => (
              <TabsContent key={axis.dimension} value={axis.dimension}>
                <AxisDetail axis={axis} />
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </TooltipProvider>
  )
}

export default RadixDimensionPanel
