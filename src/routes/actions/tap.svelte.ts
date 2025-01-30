import { playAudio } from "$lib/audio"

export function tap(node: Node, { src }: { src: string } = { src: "/audio/tap-dull.mp3" }): void {
  async function play(): Promise<void> {
    playAudio(src, 0.15, [0.5, 3])
  }

  $effect(() => {
    node.addEventListener("touchstart", play)

    return (): void => {
      node.removeEventListener("touchstart", play)
    }
  })
}
