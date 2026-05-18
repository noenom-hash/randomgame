import { useState, useEffect } from 'react'

interface HistoryEntry {
  winner: string
  timestamp: number
  date: string
}

interface Stats {
  [key: string]: number
}

const STORAGE_KEY = 'toss_random_game_history'

function getNormalizedName(name: string): string {
  return name.trim().toLowerCase()
}

function getTodayDate(): string {
  const now = new Date()
  return now.toISOString().split('T')[0]
}

export function useGameHistory() {
  const [stats, setStats] = useState<HistoryEntry[]>([])

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setStats(parsed)
      } catch (e) {
        console.error('Failed to load history:', e)
        setStats([])
      }
    }
  }, [])

  const addResult = (winner: string) => {
    const normalizedWinner = getNormalizedName(winner)
    const newEntry: HistoryEntry = {
      winner: normalizedWinner,
      timestamp: Date.now(),
      date: getTodayDate(),
    }

    const updated = [newEntry, ...stats]
    setStats(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  }

  const getDailyStats = (): Stats => {
    const today = getTodayDate()
    const dailyEntries = stats.filter(entry => entry.date === today)

    const counts: Stats = {}
    dailyEntries.forEach(entry => {
      counts[entry.winner] = (counts[entry.winner] || 0) + 1
    })
    return counts
  }

  const getAllTimeStats = (): Stats => {
    const counts: Stats = {}
    stats.forEach(entry => {
      counts[entry.winner] = (counts[entry.winner] || 0) + 1
    })
    return counts
  }

  const getRecentResults = (limit: number = 5): HistoryEntry[] => {
    return stats.slice(0, limit)
  }

  const clearHistory = () => {
    setStats([])
    localStorage.removeItem(STORAGE_KEY)
  }

  return {
    stats,
    addResult,
    getDailyStats,
    getAllTimeStats,
    getRecentResults,
    clearHistory,
  }
}
