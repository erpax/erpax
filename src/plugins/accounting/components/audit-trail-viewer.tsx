/**
 * Audit Trail Viewer Component — Display transaction history with filtering.
 *
 * Usage: Shows all changes to GL Postings, Journal Entries, and GL Accounts with user context,
 * timestamps, and change details. Supports filtering by user, date range, and change type.
 *
 * @standard SAF-T:2.0 audit-trail
 * @standard ISO-19011:2018 internal-audit
 * @accounting OECD SAF-T §3 transactions
 * @compliance SOX §404 internal-controls
 */

'use client'

import React, { useMemo, useState } from 'react'
import { format } from 'date-fns'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export interface AuditRecord {
  id: string
  timestamp: Date
  userId: string
  userName: string
  action: 'create' | 'update' | 'delete' | 'post' | 'reverse'
  collection: 'gl-accounts' | 'journal-entries' | 'gl-postings'
  documentId: string
  changesSummary: string
  changes: Record<string, { before: unknown; after: unknown }>
  ipAddress?: string
  userAgent?: string
}

export interface AuditTrailViewerProps {
  records: AuditRecord[]
}

const getActionColor = (action: string) => {
  switch (action) {
    case 'create':
      return 'bg-blue-100 text-blue-800'
    case 'update':
      return 'bg-yellow-100 text-yellow-800'
    case 'delete':
      return 'bg-red-100 text-red-800'
    case 'post':
      return 'bg-green-100 text-green-800'
    case 'reverse':
      return 'bg-purple-100 text-purple-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getCollectionColor = (collection: string) => {
  switch (collection) {
    case 'gl-accounts':
      return 'bg-indigo-100 text-indigo-800'
    case 'journal-entries':
      return 'bg-cyan-100 text-cyan-800'
    case 'gl-postings':
      return 'bg-emerald-100 text-emerald-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export const AuditTrailViewer: React.FC<AuditTrailViewerProps> = ({ records }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [filterUser, setFilterUser] = useState<string>('')
  const [filterAction, setFilterAction] = useState<string>('')
  const [filterCollection, setFilterCollection] = useState<string>('')
  const [searchText, setSearchText] = useState<string>('')

  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      const matchUser = !filterUser || record.userId === filterUser
      const matchAction = !filterAction || record.action === filterAction
      const matchCollection = !filterCollection || record.collection === filterCollection
      const matchSearch =
        !searchText ||
        record.documentId.toLowerCase().includes(searchText.toLowerCase()) ||
        record.changesSummary.toLowerCase().includes(searchText.toLowerCase())

      return matchUser && matchAction && matchCollection && matchSearch
    })
  }, [records, filterUser, filterAction, filterCollection, searchText])

  const uniqueUsers = useMemo(() => [...new Set(records.map((r) => r.userId))], [records])
  const uniqueActions = useMemo(() => [...new Set(records.map((r) => r.action))], [records])
  const uniqueCollections = useMemo(() => [...new Set(records.map((r) => r.collection))], [records])

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Audit Trail</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-4 gap-4">
            <Input
              placeholder="Search document ID or summary..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />

            <Select value={filterUser} onValueChange={setFilterUser}>
              <SelectTrigger>
                <SelectValue placeholder="All Users" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Users</SelectItem>
                {uniqueUsers.map((userId) => (
                  <SelectItem key={userId} value={userId}>
                    {userId}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filterAction} onValueChange={setFilterAction}>
              <SelectTrigger>
                <SelectValue placeholder="All Actions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Actions</SelectItem>
                {uniqueActions.map((action) => (
                  <SelectItem key={action} value={action}>
                    {action.charAt(0).toUpperCase() + action.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filterCollection} onValueChange={setFilterCollection}>
              <SelectTrigger>
                <SelectValue placeholder="All Collections" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Collections</SelectItem>
                {uniqueCollections.map((collection) => (
                  <SelectItem key={collection} value={collection}>
                    {collection.replace('-', ' ')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Audit Trail Table */}
      <Card>
        <CardHeader>
          <CardTitle>Audit Trail</CardTitle>
          <CardDescription>
            Showing {filteredRecords.length} of {records.length} records
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Collection</TableHead>
                <TableHead>Document ID</TableHead>
                <TableHead>Summary</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((record) => (
                <React.Fragment key={record.id}>
                  <TableRow
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => setExpandedId(expandedId === record.id ? null : record.id)}
                  >
                    <TableCell className="font-mono text-sm">
                      {format(record.timestamp, 'yyyy-MM-dd HH:mm:ss')}
                    </TableCell>
                    <TableCell className="text-sm">{record.userName}</TableCell>
                    <TableCell>
                      <Badge className={getActionColor(record.action)}>
                        {record.action.charAt(0).toUpperCase() + record.action.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getCollectionColor(record.collection)}>
                        {record.collection.replace('-', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{record.documentId}</TableCell>
                    <TableCell className="text-sm max-w-md truncate">{record.changesSummary}</TableCell>
                    <TableCell>
                      {expandedId === record.id ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </TableCell>
                  </TableRow>

                  {/* Expanded Details */}
                  {expandedId === record.id && (
                    <TableRow>
                      <TableCell colSpan={7} className="bg-gray-50 p-4">
                        <div className="space-y-4">
                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <p className="text-sm font-semibold">Timestamp</p>
                              <p className="text-sm text-muted-foreground">
                                {format(record.timestamp, 'PPpp')}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-semibold">User</p>
                              <p className="text-sm text-muted-foreground">{record.userName}</p>
                            </div>
                            {record.ipAddress && (
                              <div>
                                <p className="text-sm font-semibold">IP Address</p>
                                <p className="text-sm text-muted-foreground font-mono">{record.ipAddress}</p>
                              </div>
                            )}
                          </div>

                          {/* Changes Detail */}
                          {Object.keys(record.changes).length > 0 && (
                            <div>
                              <p className="text-sm font-semibold mb-2">Changes</p>
                              <div className="space-y-2">
                                {Object.entries(record.changes).map(([field, change]) => (
                                  <div key={field} className="text-sm font-mono bg-white p-2 rounded border">
                                    <p className="font-semibold text-gray-700">{field}</p>
                                    <p className="text-red-600">
                                      - {JSON.stringify(change.before)}
                                    </p>
                                    <p className="text-green-600">
                                      + {JSON.stringify(change.after)}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default AuditTrailViewer
