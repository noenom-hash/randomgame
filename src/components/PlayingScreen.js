import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import './PlayingScreen.css';
export function PlayingScreen({ participants, onResult }) {
    const [displayIndex, setDisplayIndex] = useState(0);
    const intervalRef = useRef(null);
    const onResultRef = useRef(onResult);
    onResultRef.current = onResult;
    useEffect(() => {
        const run = (speed) => {
            if (intervalRef.current)
                clearInterval(intervalRef.current);
            intervalRef.current = setInterval(() => {
                setDisplayIndex(i => (i + 1) % participants.length);
            }, speed);
        };
        // Fast spin for 1.5s
        run(100);
        const slowTimer = setTimeout(() => {
            run(320);
        }, 1500);
        // Stop and resolve winner after 1.5 + 2s = 3.5s total
        const doneTimer = setTimeout(() => {
            if (intervalRef.current)
                clearInterval(intervalRef.current);
            const finalIndex = Math.floor(Math.random() * participants.length);
            setDisplayIndex(finalIndex);
            setTimeout(() => {
                onResultRef.current(participants[finalIndex]);
            }, 400);
        }, 3500);
        return () => {
            clearTimeout(slowTimer);
            clearTimeout(doneTimer);
            if (intervalRef.current)
                clearInterval(intervalRef.current);
        };
    }, [participants]);
    return (_jsxs("div", { className: "playing-screen", children: [_jsx("div", { className: "playing-header", children: _jsx("h2", { children: "\uD83C\uDFB2 \uACB0\uC815 \uC911..." }) }), _jsx("div", { className: "card-display", children: _jsx("div", { className: "card", children: _jsxs("div", { className: "card-content", children: [_jsxs("span", { className: "card-number", children: ["#", displayIndex + 1] }), _jsx("span", { className: "card-name", children: participants[displayIndex] })] }) }, displayIndex) }), _jsx("div", { className: "animation-indicator", children: participants.map((_, i) => (_jsx("span", { className: `dot ${i === displayIndex ? 'filled' : ''}` }, i))) })] }));
}
