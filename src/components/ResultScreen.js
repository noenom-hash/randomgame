import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './ResultScreen.css';
export function ResultScreen({ winner, participants, onReset, onReplaySameList, dailyStats, allTimeStats, }) {
    if (!winner)
        return null;
    return (_jsxs("div", { className: "result-screen", children: [_jsx("div", { className: "result-header", children: _jsx("h1", { children: "\uD83C\uDF89 \uACB0\uC815\uB418\uC5C8\uC2B5\uB2C8\uB2E4!" }) }), _jsxs("div", { className: "result-card", children: [_jsx("div", { className: "confetti-ring" }), _jsxs("div", { className: "winner-display", children: [_jsx("span", { className: "winner-name", children: winner }), _jsx("span", { className: "winner-emoji", children: "\uD83C\uDFAF" })] }), _jsx("div", { className: "result-message", children: "\uC624\uB298 \uBC25/\uCEE4\uD53C\uB294 \uC774 \uBD84\uC774!" })] }), _jsxs("div", { className: "stats-container", children: [_jsxs("div", { className: "stats-section", children: [_jsx("h3", { children: "\uD83D\uDCC5 \uC624\uB298 \uAE30\uB85D" }), _jsx("div", { className: "stats-list", children: participants.length > 0 ? (participants.map(p => {
                                    const count = dailyStats[p.toLowerCase().trim()] || 0;
                                    const isWinner = p.toLowerCase().trim() === winner.toLowerCase().trim();
                                    return (_jsxs("div", { className: `stat-item ${isWinner ? 'stat-item--winner' : ''}`, children: [_jsxs("span", { className: "stat-name", children: [p, " ", isWinner && '👑'] }), _jsxs("span", { className: "stat-count", children: [count, "\uD68C"] })] }, p));
                                })) : (_jsx("p", { className: "no-data", children: "\uAE30\uB85D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4" })) })] }), _jsxs("div", { className: "stats-section", children: [_jsx("h3", { children: "\uD83C\uDFC6 \uC804\uCCB4 \uAE30\uB85D" }), _jsx("div", { className: "stats-list", children: Object.entries(allTimeStats)
                                    .sort(([, a], [, b]) => b - a)
                                    .slice(0, 8)
                                    .map(([name, count]) => (_jsxs("div", { className: "stat-item", children: [_jsx("span", { className: "stat-name", children: name }), _jsxs("span", { className: "stat-count", children: [count, "\uD68C"] })] }, name))) })] })] }), _jsxs("div", { className: "button-group", children: [_jsx("button", { className: "replay-btn", onClick: onReplaySameList, children: "\uD83D\uDD04 \uAC19\uC740 \uBA64\uBC84\uB85C \uB2E4\uC2DC" }), _jsx("button", { className: "reset-btn", onClick: onReset, children: "\uBA64\uBC84 \uBCC0\uACBD" })] })] }));
}
