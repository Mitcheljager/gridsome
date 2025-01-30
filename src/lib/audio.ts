export async function playAudio(src: string, volume: number = 1, pitchRange = [1, 1]): Promise<void> {
  const element = document.createElement("audio")
  element.volume = volume
  element.src = src

  const [pitchMin, pitchMax] = pitchRange
  element.playbackRate = Math.random() * (pitchMax - pitchMin) + pitchMin

  await new Promise(res => setTimeout(res))

  element.play()

  element.addEventListener("ended", () => element.remove(), { once: true })
}
