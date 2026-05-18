import './ResultScreen.css'

interface Stats {
  [key: string]: number
}

interface ResultScreenProps {
  winner: string | null
  participants: string[]
  onReset: () => void
  onReplaySameList: () => void
  dailyStats: Stats
  allTimeStats: Stats
}

export function ResultScreen({
  winner,
  participants,
  onReset,
  onReplaySameList,
  dailyStats,
  allTimeStats,
}: ResultScreenProps) {
  if (!winner) return null

  return (
    <div className="result-screen">
      <div className="result-header">
        <h1>🎉 결정되었습니다!</h1>
      </div>

      <div className="result-card">
        <div className="confetti-ring" />
        <div className="winner-display">
          <span className="winner-name">{winner}</span>
          <span className="winner-emoji">🎯</span>
        </div>
        <div className="result-message">오늘 밥/커피는 이 분이!</div>
      </div>

      <div className="stats-container">
        <div className="stats-section">
          <h3>📅 오늘 기록</h3>
          <div className="stats-list">
            {participants.length > 0 ? (
              participants.map(p => {
                const count = dailyStats[p.toLowerCase().trim()] || 0
                const isWinner = p.toLowerCase().trim() === winner.toLowerCase().trim()
                return (
                  <div key={p} className={`stat-item ${isWinner ? 'stat-item--winner' : ''}`}>
                    <span className="stat-name">{p} {isWinner && '👑'}</span>
                    <span className="stat-count">{count}회</span>
                  </div>
                )
              })
            ) : (
              <p className="no-data">기록이 없습니다</p>
            )}
          </div>
        </div>

        <div className="stats-section">
          <h3>🏆 전체 기록</h3>
          <div className="stats-list">
            {Object.entries(allTimeStats)
              .sort(([, a], [, b]) => b - a)
              .slice(0, 8)
              .map(([name, count]) => (
                <div key={name} className="stat-item">
                  <span className="stat-name">{name}</span>
                  <span className="stat-count">{count}회</span>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="button-group">
        <button className="replay-btn" onClick={onReplaySameList}>
          🔄 같은 멤버로 다시
        </button>
        <button className="reset-btn" onClick={onReset}>
          멤버 변경
        </button>
      </div>
    </div>
  )
}
