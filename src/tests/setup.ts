import { defaultLanguage, setLanguage } from "$lib/language"
import { cleanup } from "@testing-library/svelte"
import { afterEach, beforeAll, vi } from "vitest"

beforeAll(() => {
  global.AudioContext = vi.fn().mockImplementation(() => ({
    createMediaStreamSource: vi.fn(),
    createMediaElementSource: vi.fn(),
    createBufferSource: vi.fn().mockImplementation(() => ({
      connect: vi.fn(),
      start: vi.fn(),
      stop: vi.fn(),
      loop: false,
      playbackRate: {
        value: 1
      }
    })),
    createGain: vi.fn().mockImplementation(() => ( {
      gain: { value: 1 },
      connect: vi.fn()
    })),
    decodeAudioData: vi.fn().mockImplementation((buffer, successCallback = vi.fn()) => {
      successCallback(buffer)
    }),
    destination: {}
  }))

  // @ts-expect-error It's just a mock
  global.fetch = vi.fn(async() => ({
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    arrayBuffer: async() => new ArrayBuffer(8)
  }))

  Element.prototype.animate ??= vi.fn().mockReturnValue({
    finished: Promise.resolve(),
    cancel: vi.fn(),
    startTime: null,
    currentTime: null
  })

  let store: Record<string, string> = {}

  ;(window as any).localStorage = {
    getItem: (key: string): string => store[key] ?? null,
    setItem: (key: string, value: string): void => {
      store[key] = value.toString()
    },
    removeItem: (key: string): void => {
      delete store[key]
    },
    clear: (): void => {
      store = {}
    }
  }
})

afterEach(() => {
  cleanup()
  setLanguage(defaultLanguage)
})
