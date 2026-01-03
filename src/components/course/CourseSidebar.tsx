'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChapterSection } from '@/data/types';

interface CourseSidebarProps {
    sections: ChapterSection[];
    activeSectionId: string;
    completedSections: Set<string>;
    onSectionSelect: (sectionId: string) => void;
    onActivitySelect: (activity: 'flashcards' | 'games' | 'quiz') => void;
    activeActivity: 'flashcards' | 'games' | 'quiz' | null;
    flashcardsCount: number;
    quizCount: number;
    progress: number;
    onModeSwitch?: () => void;
}

export default function CourseSidebar({
    sections,
    activeSectionId,
    completedSections,
    onSectionSelect,
    onActivitySelect,
    activeActivity,
    flashcardsCount,
    quizCount,
    progress,
    onModeSwitch
}: CourseSidebarProps) {
    const [isLessonsExpanded, setIsLessonsExpanded] = useState(true);
    const [isActivitiesExpanded, setIsActivitiesExpanded] = useState(true);

    const activities = [
        { id: 'flashcards' as const, icon: '🎴', label: 'Flashcards', count: flashcardsCount },
        { id: 'games' as const, icon: '🎮', label: 'Games', count: 4 },
        { id: 'quiz' as const, icon: '📝', label: 'Chapter Quiz', count: quizCount }
    ];

    return (
        <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            style={{
                width: '300px',
                minWidth: '300px',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                height: 'fit-content',
                maxHeight: 'calc(100vh - 120px)',
                overflowY: 'auto',
                position: 'sticky',
                top: '100px',
                paddingBottom: '1rem'
            }}
        >
            {/* Progress & Mode Toggle Card */}
            <div style={{
                background: 'var(--gradient-card)',
                borderRadius: '16px',
                border: '1px solid var(--neutral-800)',
                padding: '1.25rem'
            }}>
                {/* Progress Bar */}
                <div style={{ marginBottom: '1rem' }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '0.5rem'
                    }}>
                        <span style={{
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            color: 'var(--neutral-300)'
                        }}>
                            Course Progress
                        </span>
                        <span style={{
                            fontSize: '0.85rem',
                            fontWeight: 700,
                            color: 'var(--accent-emerald)'
                        }}>
                            {Math.round(progress)}%
                        </span>
                    </div>
                    <div style={{
                        height: '8px',
                        background: 'var(--neutral-800)',
                        borderRadius: '4px',
                        overflow: 'hidden'
                    }}>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.5 }}
                            style={{
                                height: '100%',
                                background: 'var(--gradient-primary)',
                                borderRadius: '4px'
                            }}
                        />
                    </div>
                </div>

                {/* Mode Switch Button */}
                {onModeSwitch && (
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={onModeSwitch}
                        style={{
                            width: '100%',
                            padding: '0.75rem 1rem',
                            background: 'rgba(139, 92, 246, 0.15)',
                            border: '1px solid rgba(139, 92, 246, 0.3)',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            color: 'var(--primary-400)',
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            transition: 'all 0.2s'
                        }}
                    >
                        <span>📖</span>
                        Switch to Reading Mode
                    </motion.button>
                )}
            </div>

            {/* Lessons Card */}
            <div style={{
                background: 'var(--gradient-card)',
                borderRadius: '16px',
                border: '1px solid var(--neutral-800)',
                padding: '1rem',
                maxHeight: '400px',
                overflowY: 'auto'
            }}>
                <button
                    onClick={() => setIsLessonsExpanded(!isLessonsExpanded)}
                    style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.5rem 0',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                >
                    <span style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        color: 'var(--neutral-200)'
                    }}>
                        📚 Lessons
                        <span style={{
                            fontSize: '0.75rem',
                            color: 'var(--neutral-500)',
                            fontWeight: 400
                        }}>
                            ({completedSections.size}/{sections.length})
                        </span>
                    </span>
                    <motion.span
                        animate={{ rotate: isLessonsExpanded ? 180 : 0 }}
                        style={{ color: 'var(--neutral-500)' }}
                    >
                        ▼
                    </motion.span>
                </button>

                <AnimatePresence>
                    {isLessonsExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            style={{ overflow: 'hidden' }}
                        >
                            <div style={{ paddingTop: '0.5rem' }}>
                                {sections.map((section, index) => {
                                    const isActive = section.id === activeSectionId && !activeActivity;
                                    const isCompleted = completedSections.has(section.id);

                                    return (
                                        <motion.button
                                            key={section.id}
                                            whileHover={{ x: 4 }}
                                            onClick={() => onSectionSelect(section.id)}
                                            style={{
                                                width: '100%',
                                                display: 'flex',
                                                alignItems: 'flex-start',
                                                gap: '0.75rem',
                                                padding: '0.75rem',
                                                background: isActive
                                                    ? 'rgba(139, 92, 246, 0.15)'
                                                    : 'transparent',
                                                border: 'none',
                                                borderRadius: '10px',
                                                cursor: 'pointer',
                                                textAlign: 'left',
                                                marginBottom: '0.25rem',
                                                transition: 'background 0.2s'
                                            }}
                                        >
                                            {/* Status indicator */}
                                            <div style={{
                                                width: '24px',
                                                height: '24px',
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '0.75rem',
                                                fontWeight: 600,
                                                flexShrink: 0,
                                                background: isCompleted
                                                    ? 'var(--accent-emerald)'
                                                    : isActive
                                                        ? 'var(--primary-500)'
                                                        : 'var(--neutral-800)',
                                                color: isCompleted || isActive
                                                    ? 'white'
                                                    : 'var(--neutral-400)'
                                            }}>
                                                {isCompleted ? '✓' : index + 1}
                                            </div>

                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <div style={{
                                                    fontSize: '0.85rem',
                                                    fontWeight: isActive ? 600 : 500,
                                                    color: isActive
                                                        ? 'var(--primary-400)'
                                                        : isCompleted
                                                            ? 'var(--neutral-300)'
                                                            : 'var(--neutral-400)',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis'
                                                }}>
                                                    {section.title}
                                                </div>
                                                {section.video?.duration && (
                                                    <div style={{
                                                        fontSize: '0.75rem',
                                                        color: 'var(--neutral-600)',
                                                        marginTop: '0.25rem',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.25rem'
                                                    }}>
                                                        🎬 {section.video.duration}
                                                    </div>
                                                )}
                                            </div>
                                        </motion.button>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Activities Card */}
            <div style={{
                background: 'var(--gradient-card)',
                borderRadius: '16px',
                border: '1px solid var(--neutral-800)',
                padding: '1rem'
            }}>
                <button
                    onClick={() => setIsActivitiesExpanded(!isActivitiesExpanded)}
                    style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.5rem 0',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                >
                    <span style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        color: 'var(--neutral-200)'
                    }}>
                        🎯 Chapter Activities
                    </span>
                    <motion.span
                        animate={{ rotate: isActivitiesExpanded ? 180 : 0 }}
                        style={{ color: 'var(--neutral-500)' }}
                    >
                        ▼
                    </motion.span>
                </button>

                <AnimatePresence>
                    {isActivitiesExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            style={{ overflow: 'hidden' }}
                        >
                            <div style={{ paddingTop: '0.5rem' }}>
                                {activities.map((activity) => {
                                    const isActive = activeActivity === activity.id;

                                    return (
                                        <motion.button
                                            key={activity.id}
                                            whileHover={{ x: 4 }}
                                            onClick={() => onActivitySelect(activity.id)}
                                            style={{
                                                width: '100%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.75rem',
                                                padding: '0.75rem',
                                                background: isActive
                                                    ? 'rgba(139, 92, 246, 0.15)'
                                                    : 'transparent',
                                                border: 'none',
                                                borderRadius: '10px',
                                                cursor: 'pointer',
                                                textAlign: 'left',
                                                marginBottom: '0.25rem',
                                                transition: 'background 0.2s'
                                            }}
                                        >
                                            <span style={{ fontSize: '1.25rem' }}>
                                                {activity.icon}
                                            </span>
                                            <span style={{
                                                fontSize: '0.85rem',
                                                fontWeight: isActive ? 600 : 500,
                                                color: isActive
                                                    ? 'var(--primary-400)'
                                                    : 'var(--neutral-400)'
                                            }}>
                                                {activity.label}
                                            </span>
                                            <span style={{
                                                marginLeft: 'auto',
                                                fontSize: '0.75rem',
                                                color: 'var(--neutral-600)',
                                                background: 'var(--neutral-800)',
                                                padding: '0.25rem 0.5rem',
                                                borderRadius: '10px'
                                            }}>
                                                {activity.count}
                                            </span>
                                        </motion.button>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.aside>
    );
}
