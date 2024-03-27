"use client"

import { useCallback, useEffect, useState } from "react"

import Tone, { Sampler } from "tone"

import unmute from "./unmute"

const loadSampler = (soundSourceUrl: string, index: number): Promise<Sampler> =>
  new Promise((resolve, reject) => {
    try {
      let allowBackgroundPlayback = false // default false, recommended false
      let forceIOSBehavior = false // default false, recommended false

      const sampler = new Sampler(
        {
          C4: `${index}.wav`,
        },
        {
          release: 1,
          baseUrl: soundSourceUrl,
          onload: () => {
            resolve(sampler)
            const rawContext = sampler.context.rawContext
            if (rawContext) {
              // If you need to be able to disable unmute at a later time, you can use the returned handle's dispose() method
              // if you don't need to do that (most folks won't) then you can simply ignore the return value
              unmute(rawContext, allowBackgroundPlayback, forceIOSBehavior)
            }
          },
        },
      ).toDestination()
      resolve(sampler)
    } catch (error) {
      reject(error)
    }
  })

const loadSamplers = (soundSourceUrl: string): Promise<Sampler[]> => {
  const samplerPromises = Array.from({ length: 16 }, (_, i) =>
    loadSampler(soundSourceUrl, i + 1),
  )
  return Promise.all(samplerPromises)
}

/* Load a sampler and play a note */
const useSampler = ({ soundSourceUrl, bpm }) => {
  const [samplers, setSamplers] = useState<Sampler[]>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!samplers && soundSourceUrl) {
      loadSamplers(soundSourceUrl)
        .then((samplers) => setSamplers(samplers))
        .catch((error) => setError(error))
        .finally(() => setLoading(false))
    }
  }, [samplers, soundSourceUrl])

  // 0 indexed
  const play = useCallback(
    (notes: number[]) => {
      if (!samplers) return
      notes.forEach((note) => {
        samplers[note].triggerAttackRelease("C4", 0.01)
      })
    },
    [samplers],
  )

  return { play, loading, error }
}

export default useSampler
