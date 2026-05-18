import { useState } from 'react'
import { InputScreen } from './components/InputScreen'
import { PlayingScreen } from './components/PlayingScreen'
import { ResultScreen } from './components/ResultScreen'
import { HistoryScreen } from './components/HistoryScreen'
import { useGameState } from './hooks/useGameState'
import { useGameHistory } from './hooks/useGameHistory'
import './App.css'

type GameState = 'input' | 'playing' | 'result' | 'history'

function App() {
  const [currentScreen, setCurrentScreen] = useState<GameState>('input')
  const [participants, setParticipants] = useState<string[]>([])
  const [winner, setWinner] = useState<string | null>(null)
  const { stats, addResult, getDailyStats, getAllTimeStats } = useGameHistory()
  const { isFirstTime } = useGameState()
  const [showOnboarding, setShowOnboarding] = useState(isFirstTime)

  const handleStartGame = (names: string[]) => {
    setParticipants(names)
    setCurrentScreen('playing')
  }

  const handleGameResult = (selectedWinner: string) => {
    setWinner(selectedWinner)
    addResult(selectedWinner)
    setCurrentScreen('result')
  }

  const handleReset = () => {
    setCurrentScreen('input')
    setWinner(null)
    setParticipants([])
  }

  const handleReplaySameList = () => {
    setWinner(null)
    setCurrentScreen('playing')
  }

  const handleViewHistory = () => {
    setCurrentScreen('history')
  }

  const handleBackFromHistory = () => {
    setCurrentScreen('input')
  }

  const screenProps = {
    onStart: handleStartGame,
    onResult: handleGameResult,
    onReset: handleReset,
    onReplaySameList: handleReplaySameList,
    onViewHistory: handleViewHistory,
    onBack: handleBackFromHistory,
    participants,
    winner,
    stats,
    dailyStats: getDailyStats(),
    allTimeStats: getAllTimeStats(),
  }

  return (
    <div className="app-container">
      {showOnboarding && (
        <div className="onboarding-overlay">
          <div className="onboarding-content">
            <h1>🎲 랜덤 복불복</h1>
            <p>친구들과 함께 밥/커피 결정을 위한 간단한 게임입니다</p>
            <ol>
              <li>참여자 이름을 입력하세요 (2-10명)</li>
              <li>"결정하기" 버튼을 누르세요</li>
              <li>결과를 확인하고 다시 하세요!</li>
            </ol>
            <button onClick={() => setShowOnboarding(false)}>시작하기</button>
          </div>
        </div>
      )}

      {!showOnboarding && (
        <>
          {currentScreen === 'input' && <InputScreen {...screenProps} />}
          {currentScreen === 'playing' && <PlayingScreen {...screenProps} />}
          {currentScreen === 'result' && <ResultScreen {...screenProps} />}
          {currentScreen === 'history' && <HistoryScreen {...screenProps} />}
        </>
      )}
    </div>
  )
}

export default App
