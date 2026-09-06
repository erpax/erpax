// @vitest-environment jsdom
import { cleanup, fireEvent, render } from '@testing-library/react'
import React from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { atomAddress } from '@/atom/address'

const push = vi.fn()
vi.mock('next/navigation', () => ({ useRouter: () => ({ push }) }))

const useClickableCard = (await import('./index')).default

/** A card with a real inner link, which is where the accessible name and keyboard behaviour live. */
const Card: React.FC<{ external?: boolean }> = ({ external }) => {
  const { card, link } = useClickableCard<HTMLDivElement>({ external })
  return (
    // react-hooks/refs matches the property NAME. `card.ref` and `link.ref` are RefObjects being
    // passed to `ref=`, never dereferenced — no `.current` is read here, which is what the rule
    // exists to forbid. The hook wraps its refs as `{ ref }`, and that shape is the whole trigger.
    /* eslint-disable react-hooks/refs */
    <div ref={card.ref} data-testid="card">
      <a ref={link.ref} href="https://erpax.test/post">
        Title
      </a>
      <a href="https://erpax.test/other" data-testid="nested">
        Nested
      </a>
      {/* eslint-enable react-hooks/refs */}
      <span data-testid="plain">body</span>
    </div>
  )
}

/** A press: down on `from`, up on the card, `ms` apart. Timing is what separates click from drag. */
const press = (
  card: HTMLElement,
  from: Element,
  opts: { ms?: number; button?: number; ctrlKey?: boolean } = {},
) => {
  const { ms = 50, button = 0, ctrlKey = false } = opts
  let now = 1_000_000
  const spy = vi.spyOn(Date.prototype, 'valueOf').mockImplementation(() => now)
  fireEvent.mouseDown(from, { button, bubbles: true })
  now += ms
  fireEvent.mouseUp(card, { button, ctrlKey, bubbles: true })
  spy.mockRestore()
}

describe('use/clickable/card', () => {
  afterEach(() => {
    cleanup()
    push.mockClear()
  })

  it('lives where its name says', () => {
    expect(atomAddress(import.meta.url).path).toBe('use/clickable/card')
  })

  it('a quick press anywhere on the card follows the inner link', () => {
    const { getByTestId } = render(<Card />)
    press(getByTestId('card'), getByTestId('plain'))
    expect(push).toHaveBeenCalledWith('https://erpax.test/post', { scroll: true })
  })

  it('a SLOW press does not navigate — selecting text across a card is a drag', () => {
    const { getByTestId } = render(<Card />)
    press(getByTestId('card'), getByTestId('plain'), { ms: 400 })
    expect(push).not.toHaveBeenCalled()
  })

  it('a press starting inside a NESTED link leaves that link its own destination', () => {
    const { getByTestId } = render(<Card />)
    press(getByTestId('card'), getByTestId('nested'))
    expect(push).not.toHaveBeenCalled()
  })

  it('a non-primary button does not navigate — middle-click paste and the context menu survive', () => {
    const { getByTestId } = render(<Card />)
    press(getByTestId('card'), getByTestId('plain'), { button: 1 })
    expect(push).not.toHaveBeenCalled()
  })

  it('CTRL-click does not route — the user asked for a new tab', () => {
    const { getByTestId } = render(<Card />)
    press(getByTestId('card'), getByTestId('plain'), { ctrlKey: true })
    expect(push).not.toHaveBeenCalled()
  })

  it('an EXTERNAL card opens a window instead of routing', () => {
    const open = vi.spyOn(window, 'open').mockImplementation(() => null)
    const { getByTestId } = render(<Card external />)
    press(getByTestId('card'), getByTestId('plain'))
    expect(open).toHaveBeenCalledWith('https://erpax.test/post', '_self')
    expect(push).not.toHaveBeenCalled()
    open.mockRestore()
  })
})
