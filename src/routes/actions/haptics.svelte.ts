import { Haptics, ImpactStyle } from "@capacitor/haptics"

export function haptics(node: Node, { style = ImpactStyle.Light }: { style: ImpactStyle.Light | ImpactStyle.Heavy } = { style: ImpactStyle.Light }): void {
  async function impact(): Promise<void> {
    if (!navigator.vibrate) return

    return await Haptics.impact({ style })
  }

  $effect(() => {
    node.addEventListener("touchstart", impact)

    return (): void => {
      node.removeEventListener("touchstart", impact)
    }
  })
}
