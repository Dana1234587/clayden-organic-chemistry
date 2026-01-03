'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChapterData } from '@/data/types';
import StudyMode from './hub/StudyMode';
import FlashcardMode from './hub/FlashcardMode';
import QuizMode from './hub/QuizMode';
import ProgressSidebar from './hub/ProgressSidebar';

type ViewMode = 'study' | 'flashcards' | 'quiz' | 'games';

interface ChapterHubProps {
    chapter: ChapterData;
}

export default function ChapterHub({ chapter }: ChapterHubProps) {
    const [viewMode, setViewMode] = useState<ViewMode>('study');
    const [completedSections, setCompletedSections] = useState<Set<string>>(new Set());
    const [quizScore, setQuizScore] = useState<number | null>(null);
    const [showSidebar, setShowSidebar] = useState(true);

    const progress = (completedSections.size / chapter.sections.length) * 100;

    const handleSectionComplete = (sectionId: string) => {
        setCompletedSections(prev => new Set(prev).add(sectionId));
    };

    const handleQuizComplete = (score: number) => {
        setQuizScore(score);
    };

    const modeCards = [
        {
            id: 'study' as ViewMode,
            icon: '📖',
            label: 'Lessons',
            count: chapter.sections.length,
            color: 'var(--primary-500)'
        },
        {
            id: 'flashcards' as ViewMode,
            icon: '🎴',
            label: 'Flashcards',
            count: chapter.flashcards.length,
            color: 'var(--accent-amber)'
        },
        {
            id: 'quiz' as ViewMode,
            icon: '📝',
            label: 'Quiz',
            count: chapter.quiz.length,
            color: 'var(--accent-emerald)'
        },
        {
            id: 'games' as ViewMode,
            icon: '🎮',
            label: 'Games',
            count: 4,
            color: 'var(--accent-rose)'
        }
    ];

    return (
        <div style={{
            minHeight: '100vh',
            background: 'var(--neutral-950)',
            padding: '2rem',
            position: 'relative'
        }}>
            {/* Back Button */}
            <motion.a
                href="/"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: 'var(--primary-400)',
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    padding: '0.5rem 1rem',
                    background: 'rgba(139, 92, 246, 0.1)',
                    borderRadius: '10px',
                    border: '1px solid rgba(139, 92, 246, 0.2)',
                    marginBottom: '1.5rem'
                }}
            >
                ← Back to Home
            </motion.a>

            {/* Hero Header */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                    background: 'var(--gradient-card)',
                    borderRadius: '24px',
                    padding: '2.5rem',
                    marginBottom: '2rem',
                    border: '1px solid var(--neutral-800)',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                {/* Background decoration */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '300px',
                    height: '300px',
                    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
                    pointerEvents: 'none'
                }} />

                <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{
                        display: 'inline-block',
                        padding: '0.5rem 1rem',
                        background: 'var(--gradient-primary)',
                        borderRadius: '20px',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        color: 'white',
                        marginBottom: '1rem'
                    }}>
                        Chapter {chapter.id}
                    </div>

                    <h1 style={{
                        fontSize: '2.5rem',
                        fontWeight: 700,
                        color: 'var(--neutral-100)',
                        marginBottom: '0.75rem',
                        lineHeight: 1.2
                    }}>
                        {chapter.title}
                    </h1>

                    <p style={{
                        fontSize: '1.1rem',
                        color: 'var(--neutral-400)',
                        maxWidth: '700px',
                        marginBottom: '2rem'
                    }}>
                        {chapter.subtitle}
                    </p>

                    {/* Mode Cards */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                        gap: '1rem',
                        marginBottom: '2rem'
                    }}>
                        {modeCards.map((card, index) => (
                            <motion.button
                                key={card.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + index * 0.05 }}
                                whileHover={{ scale: 1.03, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setViewMode(card.id)}
                                style={{
                                    padding: '1.25rem',
                                    background: viewMode === card.id
                                        ? `linear-gradient(135deg, ${card.color}20, ${card.color}10)`
                                        : 'var(--neutral-900)',
                                    border: viewMode === card.id
                                        ? `2px solid ${card.color}`
                                        : '1px solid var(--neutral-800)',
                                    borderRadius: '16px',
                                    cursor: 'pointer',
                                    textAlign: 'center',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                                    {card.icon}
                                </div>
                                <div style={{
                                    fontSize: '0.95rem',
                                    fontWeight: 600,
                                    color: viewMode === card.id ? card.color : 'var(--neutral-200)',
                                    marginBottom: '0.25rem'
                                }}>
                                    {card.label}
                                </div>
                                <div style={{
                                    fontSize: '0.8rem',
                                    color: 'var(--neutral-500)'
                                }}>
                                    {card.count} items
                                </div>
                            </motion.button>
                        ))}
                    </div>

                    {/* Progress Bar */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem'
                    }}>
                        <div style={{
                            flex: 1,
                            height: '8px',
                            background: 'var(--neutral-800)',
                            borderRadius: '4px',
                            overflow: 'hidden'
                        }}>
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.5, ease: 'easeOut' }}
                                style={{
                                    height: '100%',
                                    background: 'var(--gradient-primary)',
                                    borderRadius: '4px'
                                }}
                            />
                        </div>
                        <span style={{
                            fontSize: '0.9rem',
                            fontWeight: 600,
                            color: 'var(--accent-emerald)'
                        }}>
                            {Math.round(progress)}%
                        </span>
                    </div>
                </div>
            </motion.div>

            {/* Content Area */}
            <div style={{
                display: 'flex',
                gap: '2rem'
            }}>
                {/* Main Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                    <AnimatePresence mode="wait">
                        {viewMode === 'study' && (
                            <motion.div
                                key="study"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                            >
                                <StudyMode
                                    chapter={chapter}
                                    completedSections={completedSections}
                                    onSectionComplete={handleSectionComplete}
                                />
                            </motion.div>
                        )}

                        {viewMode === 'flashcards' && (
                            <motion.div
                                key="flashcards"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                            >
                                <FlashcardMode
                                    flashcards={chapter.flashcards}
                                    title={`Chapter ${chapter.id} Flashcards`}
                                />
                            </motion.div>
                        )}

                        {viewMode === 'quiz' && (
                            <motion.div
                                key="quiz"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                            >
                                <QuizMode
                                    questions={chapter.quiz}
                                    title={`Chapter ${chapter.id} Quiz`}
                                    onComplete={handleQuizComplete}
                                />
                            </motion.div>
                        )}

                        {viewMode === 'games' && (
                            <motion.div
                                key="games"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                style={{
                                    background: 'var(--gradient-card)',
                                    borderRadius: '20px',
                                    padding: '2rem',
                                    border: '1px solid var(--neutral-800)',
                                    textAlign: 'center'
                                }}
                            >
                                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎮</div>
                                <h3 style={{ color: 'var(--neutral-100)', marginBottom: '0.5rem' }}>
                                    Learning Games
                                </h3>
                                <p style={{ color: 'var(--neutral-400)', marginBottom: '1.5rem' }}>
                                    Memory Match, Speed Quiz, and more!
                                </p>
                                <a
                                    href="/games"
                                    className="btn-primary"
                                    style={{ display: 'inline-block' }}
                                >
                                    Open Game Center →
                                </a>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Progress Sidebar (Desktop only) */}
                {showSidebar && (
                    <ProgressSidebar
                        sections={chapter.sections}
                        completedSections={completedSections}
                        quizScore={quizScore}
                        totalQuestions={chapter.quiz.length}
                        progress={progress}
                    />
                )}
            </div>
        </div>
    );
}
