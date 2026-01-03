'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FlashcardData } from '@/data/types';

interface FlashcardModeProps {
    flashcards: FlashcardData[];
    title: string;
}

export default function FlashcardMode({ flashcards, title }: FlashcardModeProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [studiedCards, setStudiedCards] = useState<Set<string>>(new Set());
    const [shuffled, setShuffled] = useState(false);
    const [cards, setCards] = useState(flashcards);

    const currentCard = cards[currentIndex];
    const progress = (studiedCards.size / cards.length) * 100;

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const goNext = () => {
        if (currentIndex < cards.length - 1) {
            setStudiedCards(prev => new Set(prev).add(currentCard.id));
            setIsFlipped(false);
            setTimeout(() => setCurrentIndex(currentIndex + 1), 100);
        }
    };

    const goPrev = () => {
        if (currentIndex > 0) {
            setIsFlipped(false);
            setTimeout(() => setCurrentIndex(currentIndex - 1), 100);
        }
    };

    const handleShuffle = () => {
        const shuffledCards = [...cards].sort(() => Math.random() - 0.5);
        setCards(shuffledCards);
        setCurrentIndex(0);
        setIsFlipped(false);
        setShuffled(true);
    };

    const handleReset = () => {
        setCards(flashcards);
        setCurrentIndex(0);
        setIsFlipped(false);
        setStudiedCards(new Set());
        setShuffled(false);
    };

    // Get unique categories
    const categories = [...new Set(flashcards.map(f => f.category).filter(Boolean))];

    return (
        <div>
            {/* Header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1.5rem',
                flexWrap: 'wrap',
                gap: '1rem'
            }}>
                <div>
                    <h3 style={{
                        margin: 0,
                        fontSize: '1.5rem',
                        color: 'var(--neutral-100)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}>
                        🎴 {title}
                    </h3>
                    <p style={{
                        margin: '0.5rem 0 0',
                        color: 'var(--neutral-400)',
                        fontSize: '0.9rem'
                    }}>
                        Click card to flip • {cards.length} cards total
                    </p>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                        onClick={handleShuffle}
                        style={{
                            padding: '0.5rem 1rem',
                            background: shuffled ? 'rgba(245, 158, 11, 0.2)' : 'var(--neutral-800)',
                            border: shuffled ? '1px solid var(--accent-amber)' : '1px solid var(--neutral-700)',
                            borderRadius: '10px',
                            color: shuffled ? 'var(--accent-amber)' : 'var(--neutral-300)',
                            cursor: 'pointer',
                            fontSize: '0.85rem'
                        }}
                    >
                        🔀 Shuffle
                    </button>
                    <button
                        onClick={handleReset}
                        style={{
                            padding: '0.5rem 1rem',
                            background: 'var(--neutral-800)',
                            border: '1px solid var(--neutral-700)',
                            borderRadius: '10px',
                            color: 'var(--neutral-300)',
                            cursor: 'pointer',
                            fontSize: '0.85rem'
                        }}
                    >
                        🔄 Reset
                    </button>
                </div>
            </div>

            {/* Progress */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '2rem'
            }}>
                <div style={{
                    flex: 1,
                    height: '6px',
                    background: 'var(--neutral-800)',
                    borderRadius: '3px',
                    overflow: 'hidden'
                }}>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        style={{
                            height: '100%',
                            background: 'var(--accent-amber)',
                            borderRadius: '3px'
                        }}
                    />
                </div>
                <span style={{
                    fontSize: '0.85rem',
                    color: 'var(--neutral-400)'
                }}>
                    {studiedCards.size}/{cards.length} studied
                </span>
            </div>

            {/* Card Display */}
            <div style={{
                perspective: '1000px',
                marginBottom: '2rem'
            }}>
                <motion.div
                    onClick={handleFlip}
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
                    style={{
                        width: '100%',
                        minHeight: '300px',
                        cursor: 'pointer',
                        transformStyle: 'preserve-3d',
                        position: 'relative'
                    }}
                >
                    {/* Front */}
                    <div style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backfaceVisibility: 'hidden',
                        background: 'linear-gradient(135deg, var(--neutral-900) 0%, var(--neutral-850) 100%)',
                        border: '2px solid var(--primary-500)',
                        borderRadius: '24px',
                        padding: '2.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center'
                    }}>
                        {currentCard?.category && (
                            <span style={{
                                position: 'absolute',
                                top: '1.5rem',
                                left: '1.5rem',
                                padding: '0.35rem 0.75rem',
                                background: 'var(--primary-500)',
                                borderRadius: '20px',
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                color: 'white'
                            }}>
                                {currentCard.category}
                            </span>
                        )}
                        <div style={{
                            fontSize: '1.25rem',
                            fontWeight: 500,
                            color: 'var(--neutral-100)',
                            lineHeight: 1.6
                        }}>
                            {currentCard?.front}
                        </div>
                        <div style={{
                            position: 'absolute',
                            bottom: '1.5rem',
                            color: 'var(--neutral-500)',
                            fontSize: '0.85rem'
                        }}>
                            Click to reveal answer
                        </div>
                    </div>

                    {/* Back */}
                    <div style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, var(--neutral-900) 100%)',
                        border: '2px solid var(--accent-emerald)',
                        borderRadius: '24px',
                        padding: '2.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center'
                    }}>
                        <div style={{
                            position: 'absolute',
                            top: '1.5rem',
                            right: '1.5rem',
                            fontSize: '1.5rem'
                        }}>
                            ✓
                        </div>
                        <div style={{
                            fontSize: '1.25rem',
                            fontWeight: 500,
                            color: 'var(--accent-emerald)',
                            lineHeight: 1.6
                        }}>
                            {currentCard?.back}
                        </div>
                        <div style={{
                            position: 'absolute',
                            bottom: '1.5rem',
                            color: 'var(--neutral-500)',
                            fontSize: '0.85rem'
                        }}>
                            Click to flip back
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Navigation */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <button
                    onClick={goPrev}
                    disabled={currentIndex === 0}
                    style={{
                        padding: '0.75rem 1.5rem',
                        background: currentIndex === 0 ? 'var(--neutral-900)' : 'var(--neutral-800)',
                        border: '1px solid var(--neutral-700)',
                        borderRadius: '12px',
                        color: currentIndex === 0 ? 'var(--neutral-600)' : 'var(--neutral-200)',
                        cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
                        fontSize: '0.95rem'
                    }}
                >
                    ← Previous
                </button>

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}>
                    {cards.map((_, idx) => (
                        <div
                            key={idx}
                            onClick={() => {
                                setIsFlipped(false);
                                setTimeout(() => setCurrentIndex(idx), 100);
                            }}
                            style={{
                                width: idx === currentIndex ? '24px' : '8px',
                                height: '8px',
                                borderRadius: '4px',
                                background: idx === currentIndex
                                    ? 'var(--primary-500)'
                                    : studiedCards.has(cards[idx].id)
                                        ? 'var(--accent-emerald)'
                                        : 'var(--neutral-700)',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                            }}
                        />
                    ))}
                </div>

                <button
                    onClick={goNext}
                    disabled={currentIndex === cards.length - 1}
                    className="btn-primary"
                    style={{
                        opacity: currentIndex === cards.length - 1 ? 0.5 : 1,
                        cursor: currentIndex === cards.length - 1 ? 'not-allowed' : 'pointer'
                    }}
                >
                    Next →
                </button>
            </div>
        </div>
    );
}
