'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import Link from 'next/link';

interface FloatingToolbarProps {
    progress: number;
    currentSection: string;
    sections: { id: string; title: string }[];
    onSectionClick: (sectionId: string) => void;
    onToggleSidebar: () => void;
}

export default function FloatingToolbar({
    progress,
    currentSection,
    sections,
    onSectionClick,
    onToggleSidebar,
}: FloatingToolbarProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [activePanel, setActivePanel] = useState<'none' | 'progress' | 'timer' | 'toc'>('none');
    const [isMobile, setIsMobile] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Timer state
    const [timerSeconds, setTimerSeconds] = useState(25 * 60);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [timerMode, setTimerMode] = useState<'focus' | 'break'>('focus');

    useEffect(() => {
        setMounted(true);
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (!isTimerRunning) return;
        const interval = setInterval(() => {
            setTimerSeconds(prev => {
                if (prev <= 1) {
                    setIsTimerRunning(false);
                    // Switch mode on complete
                    if (timerMode === 'focus') {
                        setTimerMode('break');
                        return 5 * 60;
                    } else {
                        setTimerMode('focus');
                        return 25 * 60;
                    }
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [isTimerRunning, timerMode]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const togglePanel = (panel: 'progress' | 'timer' | 'toc') => {
        if (activePanel === panel) {
            setActivePanel('none');
        } else {
            setActivePanel(panel);
        }
    };

    if (!mounted) return null;

    const toolbarContent = (
        <motion.div
            className="floating-toolbar"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
                position: 'fixed',
                ...(isMobile ? {
                    bottom: 0,
                    left: 0,
                    right: 0,
                    borderRadius: '20px 20px 0 0',
                } : {
                    bottom: '24px',
                    right: '24px',
                    borderRadius: '16px',
                }),
                background: 'rgba(20, 20, 30, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
                zIndex: 1000,
                overflow: 'hidden',
            }}
        >
            {/* Main Bar */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: isMobile ? '0' : '8px',
                padding: isMobile ? '12px 8px' : '10px 14px',
                justifyContent: isMobile ? 'space-around' : 'flex-start',
            }}>
                {/* Progress Button */}
                <ToolbarButton
                    icon={
                        <div style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            background: `conic-gradient(#8b5cf6 ${progress * 3.6}deg, rgba(139, 92, 246, 0.2) 0deg)`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.6rem',
                            fontWeight: 700,
                            color: '#fff',
                        }}>
                            {Math.round(progress)}%
                        </div>
                    }
                    label="Progress"
                    isActive={activePanel === 'progress'}
                    onClick={() => togglePanel('progress')}
                    isMobile={isMobile}
                />

                {/* Timer Button */}
                <ToolbarButton
                    icon={
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            color: timerMode === 'focus' ? '#ef4444' : '#10b981',
                        }}>
                            <span style={{ fontSize: '1rem' }}>{isTimerRunning ? '⏱️' : '⏸️'}</span>
                            {!isMobile && (
                                <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>
                                    {formatTime(timerSeconds)}
                                </span>
                            )}
                        </div>
                    }
                    label="Timer"
                    isActive={activePanel === 'timer'}
                    onClick={() => togglePanel('timer')}
                    isMobile={isMobile}
                />

                {/* TOC Button */}
                <ToolbarButton
                    icon={<span style={{ fontSize: '1.1rem' }}>📑</span>}
                    label="Contents"
                    isActive={activePanel === 'toc'}
                    onClick={() => togglePanel('toc')}
                    isMobile={isMobile}
                />

                {/* Games Button */}
                <Link href="/games" style={{ textDecoration: 'none' }}>
                    <ToolbarButton
                        icon={<span style={{ fontSize: '1.1rem' }}>🎮</span>}
                        label="Games"
                        onClick={() => { }}
                        isMobile={isMobile}
                    />
                </Link>

                {/* Chapters Button */}
                <ToolbarButton
                    icon={<span style={{ fontSize: '1.1rem' }}>📚</span>}
                    label="Chapters"
                    onClick={onToggleSidebar}
                    isMobile={isMobile}
                />
            </div>

            {/* Expandable Panels */}
            <AnimatePresence>
                {activePanel === 'progress' && (
                    <ExpandablePanel title="Chapter Progress">
                        <div style={{ padding: '12px 16px' }}>
                            {/* Progress Bar */}
                            <div style={{
                                height: '8px',
                                background: 'rgba(139, 92, 246, 0.2)',
                                borderRadius: '4px',
                                overflow: 'hidden',
                                marginBottom: '16px',
                            }}>
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    style={{
                                        height: '100%',
                                        background: 'linear-gradient(90deg, #8b5cf6, #a78bfa)',
                                        borderRadius: '4px',
                                    }}
                                />
                            </div>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                fontSize: '0.8rem',
                                color: 'var(--neutral-400)',
                            }}>
                                <span>{Math.round(progress)}% Complete</span>
                                <span>{sections.length} sections</span>
                            </div>
                        </div>
                    </ExpandablePanel>
                )}

                {activePanel === 'timer' && (
                    <ExpandablePanel title={timerMode === 'focus' ? '🍅 Focus Time' : '☕ Break Time'}>
                        <div style={{ padding: '16px', textAlign: 'center' }}>
                            <div style={{
                                fontSize: '2.5rem',
                                fontWeight: 700,
                                color: timerMode === 'focus' ? '#ef4444' : '#10b981',
                                fontFamily: 'monospace',
                                marginBottom: '16px',
                            }}>
                                {formatTime(timerSeconds)}
                            </div>
                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                                <button
                                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                                    style={{
                                        padding: '10px 24px',
                                        background: isTimerRunning
                                            ? 'rgba(255, 255, 255, 0.1)'
                                            : 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                                        border: 'none',
                                        borderRadius: '10px',
                                        color: '#fff',
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                    }}
                                >
                                    {isTimerRunning ? '⏸ Pause' : '▶ Start'}
                                </button>
                                <button
                                    onClick={() => {
                                        setIsTimerRunning(false);
                                        setTimerSeconds(timerMode === 'focus' ? 25 * 60 : 5 * 60);
                                    }}
                                    style={{
                                        padding: '10px 16px',
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        border: 'none',
                                        borderRadius: '10px',
                                        color: 'var(--neutral-300)',
                                        cursor: 'pointer',
                                    }}
                                >
                                    ↻ Reset
                                </button>
                            </div>
                        </div>
                    </ExpandablePanel>
                )}

                {activePanel === 'toc' && (
                    <ExpandablePanel title="Table of Contents">
                        <div style={{
                            maxHeight: '300px',
                            overflowY: 'auto',
                            padding: '8px',
                        }}>
                            {sections.map((section, index) => (
                                <button
                                    key={section.id}
                                    onClick={() => {
                                        onSectionClick(section.id);
                                        setActivePanel('none');
                                    }}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        width: '100%',
                                        padding: '10px 12px',
                                        background: currentSection === section.id
                                            ? 'rgba(139, 92, 246, 0.2)'
                                            : 'transparent',
                                        border: 'none',
                                        borderRadius: '8px',
                                        color: currentSection === section.id
                                            ? '#a78bfa'
                                            : 'var(--neutral-300)',
                                        textAlign: 'left',
                                        cursor: 'pointer',
                                        fontSize: '0.85rem',
                                        transition: 'all 0.2s',
                                    }}
                                >
                                    <span style={{
                                        width: '24px',
                                        height: '24px',
                                        borderRadius: '50%',
                                        background: currentSection === section.id
                                            ? '#8b5cf6'
                                            : 'rgba(255, 255, 255, 0.1)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '0.7rem',
                                        fontWeight: 600,
                                        flexShrink: 0,
                                    }}>
                                        {index + 1}
                                    </span>
                                    <span style={{
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                    }}>
                                        {section.title}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </ExpandablePanel>
                )}
            </AnimatePresence>
        </motion.div>
    );

    return createPortal(toolbarContent, document.body);
}

// Toolbar Button Component
function ToolbarButton({
    icon,
    label,
    isActive,
    onClick,
    isMobile,
}: {
    icon: React.ReactNode;
    label: string;
    isActive?: boolean;
    onClick: () => void;
    isMobile: boolean;
}) {
    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                alignItems: 'center',
                gap: isMobile ? '4px' : '8px',
                padding: isMobile ? '8px 16px' : '8px 12px',
                background: isActive ? 'rgba(139, 92, 246, 0.2)' : 'transparent',
                border: 'none',
                borderRadius: '10px',
                color: isActive ? '#a78bfa' : 'var(--neutral-300)',
                cursor: 'pointer',
                transition: 'all 0.2s',
            }}
        >
            {icon}
            {isMobile && (
                <span style={{ fontSize: '0.65rem', fontWeight: 500 }}>{label}</span>
            )}
        </motion.button>
    );
}

// Expandable Panel Component
function ExpandablePanel({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ overflow: 'hidden' }}
        >
            <div style={{
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            }}>
                <div style={{
                    padding: '12px 16px 8px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: 'var(--neutral-400)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                }}>
                    {title}
                </div>
                {children}
            </div>
        </motion.div>
    );
}
