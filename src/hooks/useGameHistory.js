import { useState, useEffect } from 'react';
const STORAGE_KEY = 'toss_random_game_history';
function getNormalizedName(name) {
    return name.trim().toLowerCase();
}
function getTodayDate() {
    const now = new Date();
    return now.toISOString().split('T')[0];
}
export function useGameHistory() {
    const [stats, setStats] = useState([]);
    // Load from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                setStats(parsed);
            }
            catch (e) {
                console.error('Failed to load history:', e);
                setStats([]);
            }
        }
    }, []);
    const addResult = (winner) => {
        const normalizedWinner = getNormalizedName(winner);
        const newEntry = {
            winner: normalizedWinner,
            timestamp: Date.now(),
            date: getTodayDate(),
        };
        const updated = [newEntry, ...stats];
        setStats(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    };
    const getDailyStats = () => {
        const today = getTodayDate();
        const dailyEntries = stats.filter(entry => entry.date === today);
        const counts = {};
        dailyEntries.forEach(entry => {
            counts[entry.winner] = (counts[entry.winner] || 0) + 1;
        });
        return counts;
    };
    const getAllTimeStats = () => {
        const counts = {};
        stats.forEach(entry => {
            counts[entry.winner] = (counts[entry.winner] || 0) + 1;
        });
        return counts;
    };
    const getRecentResults = (limit = 5) => {
        return stats.slice(0, limit);
    };
    const clearHistory = () => {
        setStats([]);
        localStorage.removeItem(STORAGE_KEY);
    };
    return {
        stats,
        addResult,
        getDailyStats,
        getAllTimeStats,
        getRecentResults,
        clearHistory,
    };
}
