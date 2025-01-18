import { cleanup } from "@testing-library/svelte"
import { afterEach, beforeAll, vi } from "vitest"

const mockAnimations = (): void => {
  Element.prototype.animate ??= vi.fn().mockReturnValue({
    finished: Promise.resolve(),
    cancel: vi.fn(),
    startTime: null,
    currentTime: null
  })
}

beforeAll(() => {
  mockAnimations()
})

afterEach(() => {
  cleanup()
})
