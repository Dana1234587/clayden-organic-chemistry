'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { ChapterData } from '@/data/types';
import CourseSidebar from './CourseSidebar';
import LessonViewer from './LessonViewer';
import Flashcards from '../Flashcards';
import QuizMode from '../hub/QuizMode';
import GameCenter from '../GameCenter';

// Dynamic import for MoleculeViewer (needs client-side only)
const MoleculeViewer = dynamic(() => import('../MoleculeViewer'), {
    ssr: false,
    loading: () => (
        <div style={{
            height: '300px',
            background: 'var(--gradient-card)',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--neutral-400)'
        }}>
            Loading 3D viewer...
        </div>
    )
});

type ActivityType = 'flashcards' | 'games' | 'quiz' | null;

interface CourseViewProps {
    chapter: ChapterData;
    onModeSwitch?: () => void;
}

export default function CourseView({ chapter, onModeSwitch }: CourseViewProps) {
    const [activeSectionId, setActiveSectionId] = useState(chapter.sections[0]?.id || '');
    const [activeActivity, setActiveActivity] = useState<ActivityType>(null);
    const [completedSections, setCompletedSections] = useState<Set<string>>(new Set());
    const [quizScore, setQuizScore] = useState<number | null>(null);

    // Load progress from localStorage
    useEffect(() => {
        const saved = localStorage.getItem(`chapter-${chapter.id}-progress`);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setCompletedSections(new Set(parsed.completedSections || []));
                setQuizScore(parsed.quizScore ?? null);
            } catch (e) {
                console.error('Failed to load progress:', e);
            }
        }
    }, [chapter.id]);

    // Save progress to localStorage
    useEffect(() => {
        localStorage.setItem(`chapter-${chapter.id}-progress`, JSON.stringify({
            completedSections: Array.from(completedSections),
            quizScore
        }));
    }, [completedSections, quizScore, chapter.id]);

    const activeSection = chapter.sections.find(s => s.id === activeSectionId);
    const activeSectionIndex = chapter.sections.findIndex(s => s.id === activeSectionId);
    const progress = (completedSections.size / chapter.sections.length) * 100;

    const handleSectionSelect = (sectionId: string) => {
        setActiveSectionId(sectionId);
        setActiveActivity(null);
    };

    const handleActivitySelect = (activity: ActivityType) => {
        setActiveActivity(activity === activeActivity ? null : activity);
    };

    const handleMarkComplete = () => {
        setCompletedSections(prev => {
            const next = new Set(prev);
            if (next.has(activeSectionId)) {
                next.delete(activeSectionId);
            } else {
                next.add(activeSectionId);
            }
            return next;
        });
    };

    const handleNavigate = (direction: 'prev' | 'next') => {
        const newIndex = direction === 'prev' ? activeSectionIndex - 1 : activeSectionIndex + 1;
        if (newIndex >= 0 && newIndex < chapter.sections.length) {
            setActiveSectionId(chapter.sections[newIndex].id);
            setActiveActivity(null);
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleQuizComplete = (score: number) => {
        setQuizScore(score);
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'var(--neutral-950)',
            padding: '1.5rem'
        }}>
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1.5rem',
                    flexWrap: 'wrap',
                    gap: '1rem'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <motion.a
                        href="/"
                        whileHover={{ scale: 1.02 }}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            color: 'var(--primary-400)',
                            textDecoration: 'none',
                            fontSize: '0.9rem',
                            fontWeight: 500,
                            padding: '0.5rem 1rem',
                            background: 'rgba(139, 92, 246, 0.1)',
                            borderRadius: '10px',
                            border: '1px solid rgba(139, 92, 246, 0.2)'
                        }}
                    >
                        ← Home
                    </motion.a>
                    <div>
                        <span style={{
                            fontSize: '0.8rem',
                            color: 'var(--neutral-500)',
                            fontWeight: 500
                        }}>
                            Chapter {chapter.id}
                        </span>
                        <h1 style={{
                            fontSize: '1.5rem',
                            fontWeight: 700,
                            color: 'var(--neutral-100)',
                            margin: 0
                        }}>
                            {chapter.title}
                        </h1>
                    </div>
                </div>

                {/* Quick Stats */}
                <div style={{
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'center'
                }}>
                    <div style={{
                        padding: '0.5rem 1rem',
                        background: 'var(--neutral-900)',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}>
                        <span style={{ fontSize: '1rem' }}>📚</span>
                        <span style={{ fontSize: '0.85rem', color: 'var(--neutral-400)' }}>
                            {completedSections.size}/{chapter.sections.length} lessons
                        </span>
                    </div>
                    {quizScore !== null && (
                        <div style={{
                            padding: '0.5rem 1rem',
                            background: 'rgba(16, 185, 129, 0.1)',
                            borderRadius: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            <span style={{ fontSize: '1rem' }}>🏆</span>
                            <span style={{ fontSize: '0.85rem', color: 'var(--accent-emerald)' }}>
                                Quiz: {quizScore}%
                            </span>
                        </div>
                    )}
                </div>
            </motion.div>

            {/* Main Content */}
            <div style={{
                display: 'flex',
                gap: '1.5rem',
                alignItems: 'flex-start'
            }}>
                {/* Sidebar */}
                <div className="course-sidebar-container" style={{
                    display: 'none' // Hidden on mobile
                }}>
                    <CourseSidebar
                        sections={chapter.sections}
                        activeSectionId={activeSectionId}
                        completedSections={completedSections}
                        onSectionSelect={handleSectionSelect}
                        onActivitySelect={handleActivitySelect}
                        activeActivity={activeActivity}
                        flashcardsCount={chapter.flashcards.length}
                        quizCount={chapter.quiz.length}
                        progress={progress}
                        onModeSwitch={onModeSwitch}
                    />
                </div>

                {/* Content Area */}
                <div style={{ flex: 1, minWidth: 0 }}>
                    <AnimatePresence mode="wait">
                        {!activeActivity && activeSection && (
                            <motion.div
                                key={activeSectionId}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                            >
                                <LessonViewer
                                    section={activeSection}
                                    sectionNumber={activeSectionIndex + 1}
                                    totalSections={chapter.sections.length}
                                    isCompleted={completedSections.has(activeSectionId)}
                                    onMarkComplete={handleMarkComplete}
                                    onNavigate={handleNavigate}
                                    hasPrev={activeSectionIndex > 0}
                                    hasNext={activeSectionIndex < chapter.sections.length - 1}
                                    sectionQuiz={activeSection.quickCheck?.map((q, i) => ({
                                        id: i,
                                        question: q.question,
                                        options: q.options,
                                        correctIndex: q.correctIndex,
                                        explanation: q.explanation
                                    })) || []}
                                />
                            </motion.div>
                        )}

                        {activeActivity === 'flashcards' && (
                            <motion.div
                                key="flashcards"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                            >
                                <div style={{
                                    background: 'var(--gradient-card)',
                                    borderRadius: '24px',
                                    padding: '1.5rem',
                                    border: '1px solid var(--neutral-800)'
                                }}>
                                    <Flashcards
                                        cards={chapter.flashcards.map((f, i) => ({
                                            id: f.id || String(i),
                                            front: f.front,
                                            back: f.back,
                                            category: f.category
                                        }))}
                                        title={`Chapter ${chapter.id} Flashcards`}
                                    />
                                </div>
                            </motion.div>
                        )}

                        {activeActivity === 'games' && (
                            <motion.div
                                key="games"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                style={{
                                    background: 'var(--gradient-card)',
                                    borderRadius: '24px',
                                    padding: '2rem',
                                    border: '1px solid var(--neutral-800)'
                                }}
                            >
                                <h2 style={{
                                    fontSize: '1.5rem',
                                    fontWeight: 700,
                                    color: 'var(--neutral-100)',
                                    marginBottom: '0.5rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}>
                                    🎮 Chapter {chapter.id} Games
                                </h2>
                                <p style={{
                                    fontSize: '0.95rem',
                                    color: 'var(--neutral-400)',
                                    marginBottom: '1.5rem'
                                }}>
                                    Test your knowledge with fun interactive games!
                                </p>
                                <GameCenter
                                    pairs={chapter.flashcards.map((card, i) => ({
                                        id: card.id || String(i + 1),
                                        term: card.front,
                                        definition: card.back
                                    }))}
                                    title={`Chapter ${chapter.id} Games`}
                                    chapterId={chapter.id}
                                />
                            </motion.div>
                        )}

                        {activeActivity === 'quiz' && (
                            <motion.div
                                key="quiz"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                            >
                                <QuizMode
                                    questions={chapter.quiz}
                                    title={`Chapter ${chapter.id} Final Quiz`}
                                    onComplete={handleQuizComplete}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Mobile Navigation */}
            <style jsx global>{`
                @media (min-width: 1024px) {
                    .course-sidebar-container {
                        display: block !important;
                    }
                }
                
                @media (max-width: 1023px) {
                    .course-mobile-nav {
                        position: fixed;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        background: var(--neutral-900);
                        border-top: 1px solid var(--neutral-800);
                        padding: 0.75rem;
                        display: flex;
                        justify-content: space-around;
                        z-index: 100;
                    }
                }
            `}</style>

            {/* Mobile Bottom Nav */}
            <div className="course-mobile-nav" style={{ display: 'none' }}>
                <button
                    onClick={() => setActiveActivity(null)}
                    style={{
                        background: !activeActivity ? 'var(--primary-500)' : 'transparent',
                        border: 'none',
                        borderRadius: '12px',
                        padding: '0.75rem 1rem',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.25rem'
                    }}
                >
                    <span style={{ fontSize: '1.25rem' }}>📚</span>
                    <span style={{
                        fontSize: '0.7rem',
                        color: !activeActivity ? 'white' : 'var(--neutral-400)'
                    }}>
                        Lessons
                    </span>
                </button>
                <button
                    onClick={() => handleActivitySelect('flashcards')}
                    style={{
                        background: activeActivity === 'flashcards' ? 'var(--primary-500)' : 'transparent',
                        border: 'none',
                        borderRadius: '12px',
                        padding: '0.75rem 1rem',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.25rem'
                    }}
                >
                    <span style={{ fontSize: '1.25rem' }}>🎴</span>
                    <span style={{
                        fontSize: '0.7rem',
                        color: activeActivity === 'flashcards' ? 'white' : 'var(--neutral-400)'
                    }}>
                        Cards
                    </span>
                </button>
                <button
                    onClick={() => handleActivitySelect('games')}
                    style={{
                        background: activeActivity === 'games' ? 'var(--primary-500)' : 'transparent',
                        border: 'none',
                        borderRadius: '12px',
                        padding: '0.75rem 1rem',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.25rem'
                    }}
                >
                    <span style={{ fontSize: '1.25rem' }}>🎮</span>
                    <span style={{
                        fontSize: '0.7rem',
                        color: activeActivity === 'games' ? 'white' : 'var(--neutral-400)'
                    }}>
                        Games
                    </span>
                </button>
                <button
                    onClick={() => handleActivitySelect('quiz')}
                    style={{
                        background: activeActivity === 'quiz' ? 'var(--primary-500)' : 'transparent',
                        border: 'none',
                        borderRadius: '12px',
                        padding: '0.75rem 1rem',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.25rem'
                    }}
                >
                    <span style={{ fontSize: '1.25rem' }}>📝</span>
                    <span style={{
                        fontSize: '0.7rem',
                        color: activeActivity === 'quiz' ? 'white' : 'var(--neutral-400)'
                    }}>
                        Quiz
                    </span>
                </button>
            </div>
        </div>
    );
}
