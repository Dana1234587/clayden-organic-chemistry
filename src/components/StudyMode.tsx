'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

interface StudyModeProps {
    onFocusChange?: (isFocused: boolean) => void;
}

type TimerMode = 'pomodoro' | 'shortBreak' | 'longBreak';

interface SessionStats {
    pomodorosCompleted: number;
    totalFocusTime: number;
    currentStreak: number;
}

const TIMER_DURATIONS = {
    pomodoro: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
};

const modeColors = {
    pomodoro: { primary: '#ef4444', secondary: 'rgba(239, 68, 68, 0.2)', gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' },
    shortBreak: { primary: '#10b981', secondary: 'rgba(16, 185, 129, 0.2)', gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' },
    longBreak: { primary: '#3b82f6', secondary: 'rgba(59, 130, 246, 0.2)', gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' },
};

export default function StudyMode({ onFocusChange }: StudyModeProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [timerMode, setTimerMode] = useState<TimerMode>('pomodoro');
    const [timeLeft, setTimeLeft] = useState(TIMER_DURATIONS.pomodoro);
    const [isRunning, setIsRunning] = useState(false);
    const [isFocusMode, setIsFocusMode] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [stats, setStats] = useState<SessionStats>({
        pomodorosCompleted: 0,
        totalFocusTime: 0,
        currentStreak: 0,
    });

    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        setMounted(true);
        audioRef.current = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdH2Onp+ckHxsU1Fjf5mmp5+TgGxZT1lxipyipZ2RelNSX3WNn6OkmI53X1Jhd46dp6GYiXNeVl1zipes');
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    useEffect(() => {
        if (isRunning && timeLeft > 0) {
            intervalRef.current = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        setIsRunning(false);
                        handleTimerComplete();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isRunning, timeLeft]);

    useEffect(() => {
        if (isRunning && timerMode === 'pomodoro') {
            const interval = setInterval(() => {
                setStats(prev => ({
                    ...prev,
                    totalFocusTime: prev.totalFocusTime + 1
                }));
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [isRunning, timerMode]);

    const handleTimerComplete = useCallback(() => {
        if (audioRef.current) {
            audioRef.current.play().catch(() => { });
        }
        if (timerMode === 'pomodoro') {
            setStats(prev => ({
                ...prev,
                pomodorosCompleted: prev.pomodorosCompleted + 1,
                currentStreak: prev.currentStreak + 1,
            }));
            const newMode = stats.pomodorosCompleted > 0 && (stats.pomodorosCompleted + 1) % 4 === 0 ? 'longBreak' : 'shortBreak';
            setTimerMode(newMode);
            setTimeLeft(TIMER_DURATIONS[newMode]);
        } else {
            setTimerMode('pomodoro');
            setTimeLeft(TIMER_DURATIONS.pomodoro);
        }
    }, [timerMode, stats.pomodorosCompleted]);

    const toggleTimer = () => setIsRunning(!isRunning);
    const resetTimer = () => { setIsRunning(false); setTimeLeft(TIMER_DURATIONS[timerMode]); };
    const switchMode = (mode: TimerMode) => { setTimerMode(mode); setTimeLeft(TIMER_DURATIONS[mode]); setIsRunning(false); };

    const toggleFocusMode = () => {
        const newFocusState = !isFocusMode;
        setIsFocusMode(newFocusState);
        onFocusChange?.(newFocusState);
        if (newFocusState) {
            document.body.classList.add('focus-mode-active');
        } else {
            document.body.classList.remove('focus-mode-active');
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const formatTotalTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
    };

    const progress = ((TIMER_DURATIONS[timerMode] - timeLeft) / TIMER_DURATIONS[timerMode]) * 100;

    if (!mounted) return null;

    const content = (
        <AnimatePresence mode="wait">
            {!isOpen ? (
                <motion.button
                    key="fab"
                    onClick={() => setIsOpen(true)}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                        position: 'fixed',
                        bottom: '24px',
                        left: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '14px 20px',
                        background: modeColors[timerMode].gradient,
                        border: 'none',
                        borderRadius: '50px',
                        color: 'white',
                        fontSize: '1rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        boxShadow: `0 8px 30px ${modeColors[timerMode].secondary}`,
                        zIndex: 9999,
                    }}
                >
                    <span style={{ fontSize: '1.3rem' }}>⏱️</span>
                    {isRunning && (
                        <span style={{ fontFamily: "'SF Mono', 'Fira Code', monospace", fontSize: '0.95rem' }}>
                            {formatTime(timeLeft)}
                        </span>
                    )}
                </motion.button>
            ) : (
                <motion.div
                    key="panel"
                    initial={{ opacity: 0, y: 100, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 100, scale: 0.9 }}
                    style={{
                        position: 'fixed',
                        bottom: '24px',
                        left: '24px',
                        width: '340px',
                        background: 'rgba(30, 30, 46, 0.98)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '24px',
                        padding: '20px',
                        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)',
                        backdropFilter: 'blur(20px)',
                        zIndex: 9999,
                    }}
                >
                    {/* Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <h4 style={{ margin: 0, color: '#f4f4f7', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span>🎯</span> Study Mode
                        </h4>
                        <button
                            onClick={() => setIsOpen(false)}
                            style={{
                                width: '32px', height: '32px', border: 'none', borderRadius: '10px',
                                background: 'rgba(255, 255, 255, 0.1)', color: '#c4c4d0', cursor: 'pointer'
                            }}
                        >✕</button>
                    </div>

                    {/* Mode Selector */}
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                        {(['pomodoro', 'shortBreak', 'longBreak'] as TimerMode[]).map((mode) => (
                            <button
                                key={mode}
                                onClick={() => switchMode(mode)}
                                style={{
                                    flex: 1, padding: '8px', fontSize: '0.75rem', cursor: 'pointer',
                                    border: `1px solid ${timerMode === mode ? modeColors[mode].primary : 'rgba(255,255,255,0.1)'}`,
                                    borderRadius: '12px',
                                    background: timerMode === mode ? modeColors[mode].secondary : 'rgba(255,255,255,0.05)',
                                    color: timerMode === mode ? modeColors[mode].primary : '#9898a8',
                                }}
                            >
                                {mode === 'pomodoro' ? '🍅 Focus' : mode === 'shortBreak' ? '☕ Short' : '🌴 Long'}
                            </button>
                        ))}
                    </div>

                    {/* Timer Display */}
                    <div style={{ position: 'relative', width: '180px', height: '180px', margin: '0 auto 20px' }}>
                        <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                            <circle cx="50" cy="50" r="45" fill="none" strokeWidth="8" stroke="rgba(255,255,255,0.1)" />
                            <circle
                                cx="50" cy="50" r="45" fill="none" strokeWidth="8"
                                stroke={modeColors[timerMode].primary}
                                strokeLinecap="round"
                                strokeDasharray={`${2 * Math.PI * 45}`}
                                strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                                style={{ transition: 'stroke-dashoffset 0.5s ease' }}
                            />
                        </svg>
                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                            <span style={{ fontFamily: "'SF Mono', 'Fira Code', monospace", fontSize: '2.5rem', fontWeight: 700, color: '#f4f4f7', display: 'block' }}>
                                {formatTime(timeLeft)}
                            </span>
                            <span style={{ fontSize: '0.85rem', color: '#9898a8' }}>
                                {timerMode === 'pomodoro' ? 'Focus Time' : timerMode === 'shortBreak' ? 'Short Break' : 'Long Break'}
                            </span>
                        </div>
                    </div>

                    {/* Controls */}
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                        <button onClick={resetTimer} style={{ flex: 1, padding: '12px', border: 'none', borderRadius: '12px', background: 'rgba(255,255,255,0.1)', color: '#c4c4d0', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer' }}>
                            🔄 Reset
                        </button>
                        <button
                            onClick={toggleTimer}
                            style={{
                                flex: 1, padding: '12px', border: 'none', borderRadius: '12px',
                                background: isRunning ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' : modeColors[timerMode].gradient,
                                color: 'white', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer',
                                boxShadow: `0 4px 15px ${modeColors[timerMode].secondary}`
                            }}
                        >
                            {isRunning ? '⏸️ Pause' : '▶️ Start'}
                        </button>
                    </div>

                    {/* Stats */}
                    <div style={{ display: 'flex', justifyContent: 'space-around', padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', marginBottom: '16px' }}>
                        {[
                            { icon: '🍅', value: stats.pomodorosCompleted, label: 'Pomodoros' },
                            { icon: '⏱️', value: formatTotalTime(stats.totalFocusTime), label: 'Focus Time' },
                            { icon: '🔥', value: stats.currentStreak, label: 'Streak' },
                        ].map((stat, i) => (
                            <div key={i} style={{ textAlign: 'center' }}>
                                <span style={{ fontSize: '1.2rem', display: 'block', marginBottom: '4px' }}>{stat.icon}</span>
                                <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f4f4f7', display: 'block' }}>{stat.value}</span>
                                <span style={{ fontSize: '0.7rem', color: '#6b6b7b' }}>{stat.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* Focus Toggle */}
                    <button
                        onClick={toggleFocusMode}
                        style={{
                            width: '100%', padding: '12px',
                            background: isFocusMode ? 'rgba(139, 92, 246, 0.3)' : 'rgba(139, 92, 246, 0.15)',
                            border: `1px solid ${isFocusMode ? 'rgba(139, 92, 246, 0.5)' : 'rgba(139, 92, 246, 0.3)'}`,
                            borderRadius: '12px', color: '#c4b5fd', fontSize: '0.9rem', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                        }}
                    >
                        <span>{isFocusMode ? '🌙' : '👁️'}</span>
                        <span>{isFocusMode ? 'Exit Focus Mode' : 'Enter Focus Mode'}</span>
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );

    return createPortal(content, document.body);
}
