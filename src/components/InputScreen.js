import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import './InputScreen.css';
export function InputScreen({ onStart, onViewHistory }) {
    const [names, setNames] = useState(['', '']);
    const [error, setError] = useState('');
    const handleNameChange = (index, value) => {
        const updated = [...names];
        updated[index] = value;
        setNames(updated);
        setError('');
    };
    const handleAddParticipant = () => {
        if (names.length < 10) {
            setNames([...names, '']);
        }
    };
    const handleRemoveParticipant = (index) => {
        if (names.length > 2) {
            setNames(names.filter((_, i) => i !== index));
        }
    };
    const handleStart = () => {
        // Validate
        const nonEmptyNames = names
            .map(n => n.trim())
            .filter(n => n.length > 0);
        if (nonEmptyNames.length < 2) {
            setError('최소 2명 이상의 참여자가 필요합니다');
            return;
        }
        if (nonEmptyNames.length > 10) {
            setError('최대 10명까지만 참여 가능합니다');
            return;
        }
        // Check for duplicates (case-insensitive)
        const normalized = nonEmptyNames.map(n => n.toLowerCase().trim());
        const uniqueCount = new Set(normalized).size;
        if (uniqueCount !== normalized.length) {
            setError('중복된 이름이 있습니다');
            return;
        }
        onStart(nonEmptyNames);
    };
    const validCount = names.filter(n => n.trim().length > 0).length;
    return (_jsxs("div", { className: "input-screen", children: [_jsxs("div", { className: "screen-header", children: [_jsx("h1", { children: "\uD83C\uDFB2 \uB79C\uB364 \uBCF5\uBD88\uBCF5" }), _jsx("p", { children: "\uCC38\uC5EC\uC790 \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694" })] }), _jsxs("div", { className: "input-container", children: [_jsx("div", { className: "participants-list", children: names.map((name, index) => (_jsxs("div", { className: "participant-input-group", children: [_jsx("input", { type: "text", placeholder: `참여자 ${index + 1}`, value: name, onChange: e => handleNameChange(index, e.target.value), maxLength: 15 }), names.length > 2 && (_jsx("button", { className: "remove-btn", onClick: () => handleRemoveParticipant(index), children: "\u2715" }))] }, index))) }), _jsxs("div", { className: "participant-count", children: [validCount, "/10 \uCC38\uC5EC\uC790"] }), names.length < 10 && (_jsx("button", { className: "add-participant-btn", onClick: handleAddParticipant, children: "+ \uCC38\uC5EC\uC790 \uCD94\uAC00" })), error && _jsx("div", { className: "error-message", children: error })] }), _jsxs("div", { className: "button-group", children: [_jsx("button", { className: "start-btn", onClick: handleStart, children: "\uACB0\uC815\uD558\uAE30" }), _jsx("button", { className: "history-btn", onClick: onViewHistory, children: "\uD83D\uDCCA \uD788\uC2A4\uD1A0\uB9AC" })] })] }));
}
