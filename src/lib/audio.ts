export async function playAudio(src: string, volume: number = 1, pitchRange = [1, 1]): Promise<void> {
  const audioContext = new AudioContext()
  const response = await fetch(src)
  const arrayBuffer = await response.arrayBuffer()
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)
  const source = audioContext.createBufferSource()
  const gainNode = audioContext.createGain()

  gainNode.gain.value = volume

  const [minPitch, maxPitch] = pitchRange
  source.playbackRate.value = Math.random() * (maxPitch - minPitch) + minPitch

  source.buffer = audioBuffer
  source.connect(gainNode)
  gainNode.connect(audioContext.destination)

  source.start()
}
