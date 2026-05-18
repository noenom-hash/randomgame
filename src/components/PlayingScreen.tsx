import { useState, useEffect, useRef } from 'react'
import './PlayingScreen.css'

interface PlayingScreenProps {
  participants: string[]
  onResult: (winner: string) => void
}

export function PlayingScreen({ participants, onResult }: PlayingScreenProps) {
  const [displayIndex, setDisplayIndex] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const onResultRef = useRef(onResult)
  onResultRef.current = onResult

  useEffect(() => {
    const run = (speed: number) => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      intervalRef.current = setInterval(() => {
        setDisplayIndex(i => (i + 1) % participants.length)
      }, speed)
    }

    // Fast spin for 1.5s
    run(100)

    const slowTimer = setTimeout(() => {
      run(320)
    }, 1500)

    // Stop and resolve winner after 1.5 + 2s = 3.5s total
    const doneTimer = setTimeout(() => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      const finalIndex = Math.floor(Math.random() * participants.length)
      setDisplayIndex(finalIndex)
      setTimeout(() => {
        onResultRef.current(participants[finalIndex])
      }, 400)
    }, 3500)

    return () => {
      clearTimeout(slowTimer)
      clearTimeout(doneTimer)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [participants])

  return (
    <div className="playing-screen">
      <div className="playing-header">
        <h2>🎲 결정 중...</h2>
      </div>

      <div className="card-display">
        <div className="card" key={displayIndex}>
          <div className="card-content">
            <span className="card-number">#{displayIndex + 1}</span>
            <span className="card-name">{participants[displayIndex]}</span>
          </div>
        </div>
      </div>

      <div className="animation-indicator">
        {participants.map((_, i) => (
          <span key={i} className={`dot ${i === displayIndex ? 'filled' : ''}`} />
        ))}
      </div>
    </div>
  )
}
