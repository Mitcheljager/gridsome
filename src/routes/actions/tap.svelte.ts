import { playAudio } from "$lib/audio"
import { isUsingDisableAudio } from "$lib/settings"

export function tap(node: Node, { src }: { src: string } = { src: "/audio/tap-dull.mp3" }): void {
  async function play(): Promise<void> {
    if (await isUsingDisableAudio()) return
    playAudio(src, 0.15, [0.5, 3])
  }

  $effect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches
    const eventName = isTouch ? "touchstart" : "mousedown"

    node.addEventListener(eventName, play)

    return (): void => {
      node.removeEventListener(eventName, play)
    }
  })
}
