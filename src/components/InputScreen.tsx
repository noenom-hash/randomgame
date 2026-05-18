import { useState } from 'react'
import './InputScreen.css'

interface InputScreenProps {
  onStart: (names: string[]) => void
  onViewHistory: () => void
}

export function InputScreen({ onStart, onViewHistory }: InputScreenProps) {
  const [names, setNames] = useState<string[]>(['', ''])
  const [error, setError] = useState<string>('')

  const handleNameChange = (index: number, value: string) => {
    const updated = [...names]
    updated[index] = value
    setNames(updated)
    setError('')
  }

  const handleAddParticipant = () => {
    if (names.length < 10) {
      setNames([...names, ''])
    }
  }

  const handleRemoveParticipant = (index: number) => {
    if (names.length > 2) {
      setNames(names.filter((_, i) => i !== index))
    }
  }

  const handleStart = () => {
    // Validate
    const nonEmptyNames = names
      .map(n => n.trim())
      .filter(n => n.length > 0)

    if (nonEmptyNames.length < 2) {
      setError('최소 2명 이상의 참여자가 필요합니다')
      return
    }

    if (nonEmptyNames.length > 10) {
      setError('최대 10명까지만 참여 가능합니다')
      return
    }

    // Check for duplicates (case-insensitive)
    const normalized = nonEmptyNames.map(n => n.toLowerCase().trim())
    const uniqueCount = new Set(normalized).size
    if (uniqueCount !== normalized.length) {
      setError('중복된 이름이 있습니다')
      return
    }

    onStart(nonEmptyNames)
  }

  const validCount = names.filter(n => n.trim().length > 0).length

  return (
    <div className="input-screen">
      <div className="screen-header">
        <h1>🎲 랜덤 복불복</h1>
        <p>참여자 이름을 입력하세요</p>
      </div>

      <div className="input-container">
        <div className="participants-list">
          {names.map((name, index) => (
            <div key={index} className="participant-input-group">
              <input
                type="text"
                placeholder={`참여자 ${index + 1}`}
                value={name}
                onChange={e => handleNameChange(index, e.target.value)}
                maxLength={15}
              />
              {names.length > 2 && (
                <button
                  className="remove-btn"
                  onClick={() => handleRemoveParticipant(index)}
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="participant-count">
          {validCount}/10 참여자
        </div>

        {names.length < 10 && (
          <button className="add-participant-btn" onClick={handleAddParticipant}>
            + 참여자 추가
          </button>
        )}

        {error && <div className="error-message">{error}</div>}
      </div>

      <div className="button-group">
        <button className="start-btn" onClick={handleStart}>
          결정하기
        </button>
        <button className="history-btn" onClick={onViewHistory}>
          📊 히스토리
        </button>
      </div>
    </div>
  )
}
