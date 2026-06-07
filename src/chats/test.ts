import { describe, it, expect } from 'vitest'
import Chat from '@/chats'

describe('chats', () => {
  it('has the correct slug', () => {
    expect(Chat.slug).toBe('chat')
  })

  it('has correct singular and plural labels', () => {
    expect(Chat.labels?.singular).toBe('Chat message')
    expect(Chat.labels?.plural).toBe('Chat')
  })

  it('enables timestamps', () => {
    expect(Chat.timestamps).toBe(true)
  })

  it('uses event as admin title field', () => {
    expect(Chat.admin?.useAsTitle).toBe('event')
  })

  it('exports a non-empty fields array', () => {
    expect(Array.isArray(Chat.fields)).toBe(true)
    expect((Chat.fields as unknown[]).length).toBeGreaterThan(0)
  })

  it('declares required indexed text fields: event, eventUuid, agent', () => {
    const fields = Chat.fields as Array<Record<string, unknown>>
    const byName = Object.fromEntries(fields.map((f) => [f.name, f]))

    for (const name of ['event', 'eventUuid', 'agent']) {
      expect(byName[name]).toBeDefined()
      expect(byName[name].type).toBe('text')
      expect(byName[name].required).toBe(true)
      expect(byName[name].index).toBe(true)
    }
  })

  it('declares optional indexed text field: aggregateId', () => {
    const fields = Chat.fields as Array<Record<string, unknown>>
    const byName = Object.fromEntries(fields.map((f) => [f.name, f]))

    expect(byName['aggregateId']).toBeDefined()
    expect(byName['aggregateId'].type).toBe('text')
    expect(byName['aggregateId'].required).toBeFalsy()
    expect(byName['aggregateId'].index).toBe(true)
  })

  it('declares payload field as json type', () => {
    const fields = Chat.fields as Array<Record<string, unknown>>
    const byName = Object.fromEntries(fields.map((f) => [f.name, f]))

    expect(byName['payload']?.type).toBe('json')
  })

  it('declares depth field as number with default 0', () => {
    const fields = Chat.fields as Array<Record<string, unknown>>
    const byName = Object.fromEntries(fields.map((f) => [f.name, f]))

    expect(byName['depth']?.type).toBe('number')
    expect(byName['depth']?.defaultValue).toBe(0)
  })

  it('wires afterChange hooks', () => {
    expect(Chat.hooks?.afterChange).toBeDefined()
    expect((Chat.hooks?.afterChange as unknown[]).length).toBeGreaterThan(0)
  })
})
