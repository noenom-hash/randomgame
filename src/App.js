import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { InputScreen } from './components/InputScreen';
import { PlayingScreen } from './components/PlayingScreen';
import { ResultScreen } from './components/ResultScreen';
import { HistoryScreen } from './components/HistoryScreen';
import { useGameState } from './hooks/useGameState';
import { useGameHistory } from './hooks/useGameHistory';
import './App.css';
function App() {
    const [currentScreen, setCurrentScreen] = useState('input');
    const [participants, setParticipants] = useState([]);
    const [winner, setWinner] = useState(null);
    const { stats, addResult, getDailyStats, getAllTimeStats } = useGameHistory();
    const { isFirstTime } = useGameState();
    const [showOnboarding, setShowOnboarding] = useState(isFirstTime);
    const handleStartGame = (names) => {
        setParticipants(names);
        setCurrentScreen('playing');
    };
    const handleGameResult = (selectedWinner) => {
        setWinner(selectedWinner);
        addResult(selectedWinner);
        setCurrentScreen('result');
    };
    const handleReset = () => {
        setCurrentScreen('input');
        setWinner(null);
        setParticipants([]);
    };
    const handleReplaySameList = () => {
        setWinner(null);
        setCurrentScreen('playing');
    };
    const handleViewHistory = () => {
        setCurrentScreen('history');
    };
    const handleBackFromHistory = () => {
        setCurrentScreen('input');
    };
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
    };
    return (_jsxs("div", { className: "app-container", children: [showOnboarding && (_jsx("div", { className: "onboarding-overlay", children: _jsxs("div", { className: "onboarding-content", children: [_jsx("h1", { children: "\uD83C\uDFB2 \uB79C\uB364 \uBCF5\uBD88\uBCF5" }), _jsx("p", { children: "\uCE5C\uAD6C\uB4E4\uACFC \uD568\uAED8 \uBC25/\uCEE4\uD53C \uACB0\uC815\uC744 \uC704\uD55C \uAC04\uB2E8\uD55C \uAC8C\uC784\uC785\uB2C8\uB2E4" }), _jsxs("ol", { children: [_jsx("li", { children: "\uCC38\uC5EC\uC790 \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694 (2-10\uBA85)" }), _jsx("li", { children: "\"\uACB0\uC815\uD558\uAE30\" \uBC84\uD2BC\uC744 \uB204\uB974\uC138\uC694" }), _jsx("li", { children: "\uACB0\uACFC\uB97C \uD655\uC778\uD558\uACE0 \uB2E4\uC2DC \uD558\uC138\uC694!" })] }), _jsx("button", { onClick: () => setShowOnboarding(false), children: "\uC2DC\uC791\uD558\uAE30" })] }) })), !showOnboarding && (_jsxs(_Fragment, { children: [currentScreen === 'input' && _jsx(InputScreen, { ...screenProps }), currentScreen === 'playing' && _jsx(PlayingScreen, { ...screenProps }), currentScreen === 'result' && _jsx(ResultScreen, { ...screenProps }), currentScreen === 'history' && _jsx(HistoryScreen, { ...screenProps })] }))] }));
}
export default App;
