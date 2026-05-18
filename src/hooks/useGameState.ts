import { useState, useEffect } from 'react'

export function useGameState() {
  const [isFirstTime, setIsFirstTime] = useState(false)

  useEffect(() => {
    const hasVisited = localStorage.getItem('toss_random_game_visited')
    if (!hasVisited) {
      setIsFirstTime(true)
      localStorage.setItem('toss_random_game_visited', 'true')
    }
  }, [])

  return { isFirstTime }
}
