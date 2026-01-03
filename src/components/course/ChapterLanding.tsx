'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChapterData } from '@/data/types';

type ViewMode = 'selection' | 'reading' | 'course';

interface ChapterLandingProps {
    chapter: ChapterData;
    onModeSelect: (mode: 'reading' | 'course') => void;
}

export default function ChapterLanding({ chapter, onModeSelect }: ChapterLandingProps) {
    const [hoveredMode, setHoveredMode] = useState<'reading' | 'course' | null>(null);

    return (
        <div style={{
            minHeight: '100vh',
            background: 'var(--background)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
        }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                    maxWidth: '900px',
                    width: '100%',
                    textAlign: 'center'
                }}
            >
                {/* Chapter Header */}
                <div style={{ marginBottom: '3rem' }}>
                    <div style={{
                        display: 'inline-block',
                        padding: '0.5rem 1.5rem',
                        background: 'var(--gradient-primary)',
                        borderRadius: '30px',
                        marginBottom: '1.5rem'
                    }}>
                        <span style={{
                            fontSize: '0.9rem',
                            fontWeight: 600,
                            color: 'white'
                        }}>
                            Chapter {chapter.id}
                        </span>
                    </div>

                    <h1 style={{
                        fontSize: '2.5rem',
                        fontWeight: 700,
                        color: 'var(--neutral-100)',
                        marginBottom: '1rem',
                        lineHeight: 1.3
                    }}>
                        {chapter.title}
                    </h1>

                    <p style={{
                        fontSize: '1.1rem',
                        color: 'var(--neutral-400)',
                        maxWidth: '600px',
                        margin: '0 auto',
                        lineHeight: 1.6
                    }}>
                        Choose your preferred learning style
                    </p>
                </div>

                {/* Mode Selection Cards */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '2rem',
                    marginBottom: '3rem'
                }}>
                    {/* Reading Mode */}
                    <motion.button
                        whileHover={{ scale: 1.02, y: -5 }}
                        whileTap={{ scale: 0.98 }}
                        onHoverStart={() => setHoveredMode('reading')}
                        onHoverEnd={() => setHoveredMode(null)}
                        onClick={() => onModeSelect('reading')}
                        style={{
                            background: hoveredMode === 'reading'
                                ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(99, 102, 241, 0.1))'
                                : 'var(--gradient-card)',
                            border: hoveredMode === 'reading'
                                ? '2px solid var(--primary-500)'
                                : '1px solid var(--neutral-800)',
                            borderRadius: '24px',
                            padding: '2.5rem',
                            cursor: 'pointer',
                            textAlign: 'left',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        <div style={{
                            fontSize: '3.5rem',
                            marginBottom: '1.5rem'
                        }}>
                            📖
                        </div>

                        <h2 style={{
                            fontSize: '1.5rem',
                            fontWeight: 700,
                            color: 'var(--neutral-100)',
                            marginBottom: '0.75rem'
                        }}>
                            Reading Mode
                        </h2>

                        <p style={{
                            fontSize: '0.95rem',
                            color: 'var(--neutral-400)',
                            lineHeight: 1.6,
                            marginBottom: '1.5rem'
                        }}>
                            View the entire chapter on one scrollable page. Perfect for
                            <strong style={{ color: 'var(--neutral-300)' }}> continuous reading </strong>
                            and getting an overview of all topics.
                        </p>

                        <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '0.5rem'
                        }}>
                            {['📄 Single Page', '🔍 Easy Navigation', '📚 Traditional Style'].map((tag, i) => (
                                <span
                                    key={i}
                                    style={{
                                        padding: '0.4rem 0.75rem',
                                        background: 'rgba(139, 92, 246, 0.15)',
                                        borderRadius: '8px',
                                        fontSize: '0.8rem',
                                        color: 'var(--primary-400)'
                                    }}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </motion.button>

                    {/* Course Mode */}
                    <motion.button
                        whileHover={{ scale: 1.02, y: -5 }}
                        whileTap={{ scale: 0.98 }}
                        onHoverStart={() => setHoveredMode('course')}
                        onHoverEnd={() => setHoveredMode(null)}
                        onClick={() => onModeSelect('course')}
                        style={{
                            position: 'relative',
                            background: hoveredMode === 'course'
                                ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(6, 182, 212, 0.1))'
                                : 'var(--gradient-card)',
                            border: hoveredMode === 'course'
                                ? '2px solid var(--accent-emerald)'
                                : '1px solid var(--neutral-800)',
                            borderRadius: '24px',
                            padding: '2.5rem',
                            cursor: 'pointer',
                            textAlign: 'left',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        <div style={{
                            fontSize: '3.5rem',
                            marginBottom: '1.5rem'
                        }}>
                            🎓
                        </div>

                        <h2 style={{
                            fontSize: '1.5rem',
                            fontWeight: 700,
                            color: 'var(--neutral-100)',
                            marginBottom: '0.75rem'
                        }}>
                            Course Mode
                        </h2>

                        <p style={{
                            fontSize: '0.95rem',
                            color: 'var(--neutral-400)',
                            lineHeight: 1.6,
                            marginBottom: '1.5rem'
                        }}>
                            Interactive lessons with quizzes and activities.
                            <strong style={{ color: 'var(--neutral-300)' }}> Coursera-style learning </strong>
                            with progress tracking and 3D molecules.
                        </p>

                        <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '0.5rem'
                        }}>
                            {['🎯 Structured', '🧪 Interactive', '📊 Progress Tracking'].map((tag, i) => (
                                <span
                                    key={i}
                                    style={{
                                        padding: '0.4rem 0.75rem',
                                        background: 'rgba(16, 185, 129, 0.15)',
                                        borderRadius: '8px',
                                        fontSize: '0.8rem',
                                        color: 'var(--accent-emerald)'
                                    }}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Recommended Badge */}
                        <div style={{
                            position: 'absolute',
                            top: '-10px',
                            right: '20px',
                            padding: '0.4rem 1rem',
                            background: 'linear-gradient(135deg, #10b981, #059669)',
                            borderRadius: '20px',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            color: 'white',
                            boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)'
                        }}>
                            ⭐ Recommended
                        </div>
                    </motion.button>
                </div>

                {/* Chapter Stats */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '2rem',
                    flexWrap: 'wrap'
                }}>
                    <div style={{
                        textAlign: 'center',
                        padding: '1rem 1.5rem',
                        background: 'rgba(255, 255, 255, 0.03)',
                        borderRadius: '12px'
                    }}>
                        <div style={{
                            fontSize: '1.5rem',
                            fontWeight: 700,
                            color: 'var(--primary-400)'
                        }}>
                            {chapter.sections.length}
                        </div>
                        <div style={{
                            fontSize: '0.85rem',
                            color: 'var(--neutral-500)'
                        }}>
                            Sections
                        </div>
                    </div>

                    <div style={{
                        textAlign: 'center',
                        padding: '1rem 1.5rem',
                        background: 'rgba(255, 255, 255, 0.03)',
                        borderRadius: '12px'
                    }}>
                        <div style={{
                            fontSize: '1.5rem',
                            fontWeight: 700,
                            color: 'var(--accent-emerald)'
                        }}>
                            {chapter.flashcards?.length || 0}
                        </div>
                        <div style={{
                            fontSize: '0.85rem',
                            color: 'var(--neutral-500)'
                        }}>
                            Flashcards
                        </div>
                    </div>

                    <div style={{
                        textAlign: 'center',
                        padding: '1rem 1.5rem',
                        background: 'rgba(255, 255, 255, 0.03)',
                        borderRadius: '12px'
                    }}>
                        <div style={{
                            fontSize: '1.5rem',
                            fontWeight: 700,
                            color: 'var(--accent-amber)'
                        }}>
                            {chapter.quiz?.length || 0}
                        </div>
                        <div style={{
                            fontSize: '0.85rem',
                            color: 'var(--neutral-500)'
                        }}>
                            Quiz Questions
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
