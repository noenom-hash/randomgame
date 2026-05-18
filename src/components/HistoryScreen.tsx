import './HistoryScreen.css'

interface Stats {
  [key: string]: number
}

interface HistoryScreenProps {
  onBack: () => void
  allTimeStats: Stats
}

export function HistoryScreen({ onBack, allTimeStats }: HistoryScreenProps) {
  const sortedStats = Object.entries(allTimeStats)
    .sort(([, a], [, b]) => b - a)

  const totalGames = Object.values(allTimeStats).reduce((sum, count) => sum + count, 0)

  return (
    <div className="history-screen">
      <div className="history-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>📊 전체 히스토리</h1>
        <div className="spacer" />
      </div>

      <div className="history-stats">
        <div className="stat-card">
          <span className="stat-label">총 라운드</span>
          <span className="stat-value">{totalGames}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">참여자</span>
          <span className="stat-value">{sortedStats.length}</span>
        </div>
      </div>

      <div className="ranking-list">
        <h2>🏆 랭킹</h2>
        {sortedStats.length > 0 ? (
          <div className="ranking-items">
            {sortedStats.map(([name, count], index) => (
              <div key={name} className="ranking-item">
                <div className="ranking-medal">
                  {index === 0 && '🥇'}
                  {index === 1 && '🥈'}
                  {index === 2 && '🥉'}
                  {index > 2 && <span className="ranking-number">{index + 1}</span>}
                </div>
                <div className="ranking-info">
                  <span className="ranking-name">{name}</span>
                  <span className="ranking-count">{count}회</span>
                </div>
                <div className="ranking-bar">
                  <div
                    className="ranking-fill"
                    style={{
                      width: `${(count / Math.max(...Object.values(allTimeStats))) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-data">아직 기록이 없습니다. 게임을 시작해보세요!</p>
        )}
      </div>

      <button className="back-full-btn" onClick={onBack}>
        돌아가기
      </button>
    </div>
  )
}
