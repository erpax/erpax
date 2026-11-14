import { describe, it, expect } from 'vitest'
import { accepts, canonical, dataOf, diff, isStream, send } from '@/utilities/uuid/stream'

const a = { id: '1', uuid: 'A', createdAt: 'x', updatedAt: 'x', title: 'One', tags: ['x', 'y'], note: 'keep', gone: 'soon', box: { p: 1, q: 2 } }
const b = { id: '1', uuid: 'B', createdAt: 'x', updatedAt: 'y', title: 'Two', tags: ['x', 'y'], note: 'keep', gone: null, box: { q: 2, p: 1 }, added: true, handle: 'h' }

describe('stream — what changed between two contents', () => {
  it('compares values whatever the order of their keys', () => {
    expect(canonical({ p: 1, q: [1, { b: 2, a: 1 }] })).toBe(canonical({ q: [1, { a: 1, b: 2 }], p: 1 }))
    expect(canonical(undefined)).toBe(canonical(null))
  })
  it('an incremental stream sets what changed, clears what went, and leaves the rest out', () => {
    expect(diff(a, b)).toEqual({ set: { title: 'Two', added: true }, unset: ['gone'] })
  })
  it('never carries what is not content: ids, timestamps, the content uuid, the handle, virtual fields', () => {
    const { set } = diff(undefined, { ...b, memberCount: 3 }, new Set(['memberCount']))
    expect(Object.keys(set).sort()).toEqual(['added', 'box', 'note', 'tags', 'title'])
  })
  it('a full stream carries everything and names no base', () => {
    const stream = send({ collection: 'notes', id: '1', target: b })
    expect(stream.from).toBe(undefined)
    expect(stream.to).toBe('B')
    expect(stream.set).toMatchObject({ title: 'Two', note: 'keep' })
  })
  it('an incremental stream names both ends', () => {
    expect(send({ collection: 'notes', id: '1', base: a, target: b })).toEqual({ collection: 'notes', id: '1', from: 'A', to: 'B', set: { title: 'Two', added: true }, unset: ['gone'] })
  })
  it('a stream from a content to itself changes nothing', () => {
    expect(diff(a, a)).toEqual({ set: {}, unset: [] })
  })
})

describe('accepts — the receive rule', () => {
  const full = send({ collection: 'notes', id: '1', target: b })
  const incremental = send({ collection: 'notes', id: '1', base: a, target: b })
  it('a full stream creates, and is refused where the document already exists', () => {
    expect(accepts(full, undefined)).toEqual({ accept: true, action: 'create' })
    expect(accepts(full, 'A')).toEqual({ accept: false, reason: 'exists' })
  })
  it('an incremental stream applies only onto the content it starts from', () => {
    expect(accepts(incremental, 'A')).toEqual({ accept: true, action: 'update' })
    expect(accepts(incremental, 'Z')).toEqual({ accept: false, reason: 'diverged' })
    expect(accepts(incremental, undefined)).toEqual({ accept: false, reason: 'missing' })
  })
  it('a destination that already holds the end content has nothing to do — sending twice is safe', () => {
    expect(accepts(incremental, 'B')).toEqual({ accept: true, action: 'none' })
    expect(accepts(full, 'B')).toEqual({ accept: true, action: 'none' })
  })
  it('the data to write sets the changed fields and nulls the cleared ones', () => {
    expect(dataOf(incremental)).toEqual({ title: 'Two', added: true, gone: null })
  })
  it('recognises a well-formed stream', () => {
    expect(isStream(incremental)).toBe(true)
    for (const bad of [null, {}, { ...incremental, set: [] }, { ...incremental, unset: [1] }, { ...incremental, to: 5 }]) expect(isStream(bad)).toBe(false)
  })
})
