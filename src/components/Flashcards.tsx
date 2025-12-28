'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface Flashcard {
    id: string;
    front: string;
    back: string;
    category?: string;
}

interface FlashcardsProps {
    cards: Flashcard[];
    title?: string;
    onComplete?: () => void;
}

export default function Flashcards({ cards, title = "Flashcards", onComplete }: FlashcardsProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [knownCards, setKnownCards] = useState<Set<string>>(new Set());
    const [reviewCards, setReviewCards] = useState<Set<string>>(new Set());
    const [isShuffled, setIsShuffled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    // Shuffle cards
    const shuffledCards = useMemo(() => {
        if (!isShuffled) return cards;
        return [...cards].sort(() => Math.random() - 0.5);
    }, [cards, isShuffled]);

    const currentCard = shuffledCards[currentIndex];
    const progress = ((currentIndex + 1) / shuffledCards.length) * 100;

    // Reset flip when changing cards
    useEffect(() => {
        setIsFlipped(false);
    }, [currentIndex]);

    const handleFlip = useCallback(() => {
        setIsFlipped(prev => !prev);
    }, []);

    const handleNext = useCallback(() => {
        if (currentIndex < shuffledCards.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else if (onComplete) {
            onComplete();
        }
    }, [currentIndex, shuffledCards.length, onComplete]);

    const handlePrev = useCallback(() => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    }, [currentIndex]);

    const markAsKnown = useCallback(() => {
        setKnownCards(prev => new Set(prev).add(currentCard.id));
        setReviewCards(prev => {
            const newSet = new Set(prev);
            newSet.delete(currentCard.id);
            return newSet;
        });
        handleNext();
    }, [currentCard, handleNext]);

    const markForReview = useCallback(() => {
        setReviewCards(prev => new Set(prev).add(currentCard.id));
        setKnownCards(prev => {
            const newSet = new Set(prev);
            newSet.delete(currentCard.id);
            return newSet;
        });
        handleNext();
    }, [currentCard, handleNext]);

    const resetProgress = useCallback(() => {
        setCurrentIndex(0);
        setKnownCards(new Set());
        setReviewCards(new Set());
        setIsFlipped(false);
    }, []);

    const toggleShuffle = useCallback(() => {
        setIsShuffled(prev => !prev);
        setCurrentIndex(0);
        setIsFlipped(false);
    }, []);

    if (!isOpen) {
        return (
            <motion.button
                className="flashcards-toggle-btn"
                onClick={() => setIsOpen(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <span className="flashcards-icon">🎴</span>
                <span>Practice with Flashcards</span>
                <span className="flashcards-count">{cards.length} cards</span>

                <style jsx>{`
                    .flashcards-toggle-btn {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        width: 100%;
                        padding: 16px 20px;
                        background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%);
                        border: 1px solid rgba(139, 92, 246, 0.3);
                        border-radius: 16px;
                        color: var(--neutral-100);
                        font-size: 1rem;
                        font-weight: 500;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        margin-top: 1.5rem;
                    }

                    .flashcards-toggle-btn:hover {
                        background: linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(168, 85, 247, 0.2) 100%);
                        border-color: rgba(139, 92, 246, 0.5);
                        transform: translateY(-2px);
                        box-shadow: 0 8px 25px rgba(139, 92, 246, 0.2);
                    }

                    .flashcards-icon {
                        font-size: 1.5rem;
                    }

                    .flashcards-count {
                        margin-left: auto;
                        padding: 4px 10px;
                        background: rgba(139, 92, 246, 0.2);
                        border-radius: 12px;
                        font-size: 0.85rem;
                        color: var(--primary-300);
                    }
                `}</style>
            </motion.button>
        );
    }

    return (
        <motion.div
            className="flashcards-container"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
        >
            {/* Header */}
            <div className="flashcards-header">
                <div className="header-left">
                    <h4>{title}</h4>
                    <div className="stats">
                        <span className="stat known">✓ {knownCards.size} Known</span>
                        <span className="stat review">⟳ {reviewCards.size} Review</span>
                    </div>
                </div>
                <div className="header-right">
                    <button
                        className={`shuffle-btn ${isShuffled ? 'active' : ''}`}
                        onClick={toggleShuffle}
                        title={isShuffled ? 'Using shuffled order' : 'Shuffle cards'}
                    >
                        🔀
                    </button>
                    <button className="close-btn" onClick={() => setIsOpen(false)}>✕</button>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="progress-container">
                <div className="progress-bar" style={{ width: `${progress}%` }} />
                <span className="progress-text">{currentIndex + 1} / {shuffledCards.length}</span>
            </div>

            {/* Card with 3D Flip */}
            <div className="card-wrapper">
                <motion.div
                    className="card-scene"
                    onClick={handleFlip}
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                >
                    {/* Front of Card */}
                    <div className="card-face card-front">
                        {currentCard.category && (
                            <span className="card-category">{currentCard.category}</span>
                        )}
                        <div className="card-label">❓ Question</div>
                        <div className="card-text">{currentCard.front}</div>
                        <div className="flip-hint">
                            <span className="flip-icon">↻</span> Click to flip
                        </div>
                    </div>

                    {/* Back of Card */}
                    <div className="card-face card-back">
                        {currentCard.category && (
                            <span className="card-category back-cat">{currentCard.category}</span>
                        )}
                        <div className="card-label back-label">✓ Answer</div>
                        <div className="card-text">{currentCard.back}</div>
                        <div className="flip-hint">
                            <span className="flip-icon">↻</span> Click to flip
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Controls */}
            <div className="controls">
                <div className="nav-controls">
                    <button
                        className="nav-btn"
                        onClick={handlePrev}
                        disabled={currentIndex === 0}
                    >
                        ← Previous
                    </button>
                    <button
                        className="nav-btn"
                        onClick={handleNext}
                        disabled={currentIndex === shuffledCards.length - 1}
                    >
                        Next →
                    </button>
                </div>

                <div className="action-controls">
                    <button
                        className="action-btn review-btn"
                        onClick={markForReview}
                        title="Mark for review"
                    >
                        🔄 Need Review
                    </button>
                    <button
                        className="action-btn known-btn"
                        onClick={markAsKnown}
                        title="Mark as known"
                    >
                        ✅ Got it!
                    </button>
                </div>

                {(knownCards.size > 0 || reviewCards.size > 0) && (
                    <button className="reset-btn" onClick={resetProgress}>
                        Reset Progress
                    </button>
                )}
            </div>

            <style jsx>{`
                .flashcards-container {
                    margin-top: 1.5rem;
                    padding: 1.5rem;
                    background: rgba(30, 30, 46, 0.8);
                    border: 1px solid rgba(139, 92, 246, 0.3);
                    border-radius: 20px;
                    backdrop-filter: blur(10px);
                }

                .flashcards-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 1rem;
                }

                .header-left h4 {
                    margin: 0 0 0.5rem;
                    color: var(--neutral-100);
                    font-size: 1.1rem;
                }

                .stats {
                    display: flex;
                    gap: 1rem;
                }

                .stat {
                    font-size: 0.85rem;
                    padding: 4px 10px;
                    border-radius: 8px;
                }

                .stat.known {
                    background: rgba(16, 185, 129, 0.2);
                    color: var(--accent-emerald);
                }

                .stat.review {
                    background: rgba(245, 158, 11, 0.2);
                    color: #f59e0b;
                }

                .header-right {
                    display: flex;
                    gap: 0.5rem;
                }

                .shuffle-btn, .close-btn {
                    width: 36px;
                    height: 36px;
                    border: none;
                    border-radius: 10px;
                    background: rgba(255, 255, 255, 0.1);
                    color: var(--neutral-300);
                    cursor: pointer;
                    font-size: 1rem;
                    transition: all 0.2s ease;
                }

                .shuffle-btn:hover, .close-btn:hover {
                    background: rgba(255, 255, 255, 0.15);
                    color: var(--neutral-100);
                }

                .shuffle-btn.active {
                    background: rgba(139, 92, 246, 0.3);
                    color: var(--primary-300);
                }

                .progress-container {
                    position: relative;
                    height: 6px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 3px;
                    margin-bottom: 1.5rem;
                    overflow: hidden;
                }

                .progress-bar {
                    height: 100%;
                    background: linear-gradient(90deg, var(--primary-500), var(--primary-400));
                    border-radius: 3px;
                    transition: width 0.3s ease;
                }

                .progress-text {
                    position: absolute;
                    right: 0;
                    top: 12px;
                    font-size: 0.75rem;
                    color: var(--neutral-400);
                }

                /* 3D Card Flip Container */
                .card-wrapper {
                    perspective: 1200px;
                    margin-bottom: 1.5rem;
                }

                .card-scene {
                    width: 100%;
                    min-height: 280px;
                    position: relative;
                    transform-style: preserve-3d;
                    cursor: pointer;
                }

                .card-face {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    min-height: 280px;
                    backface-visibility: hidden;
                    -webkit-backface-visibility: hidden;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 2rem;
                    border-radius: 20px;
                    text-align: center;
                    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
                }

                /* Front Face - Question */
                .card-front {
                    background: linear-gradient(145deg, #2a2a4a 0%, #1e1e3a 50%, #252545 100%);
                    border: 2px solid transparent;
                    background-clip: padding-box;
                    position: relative;
                }

                .card-front::before {
                    content: '';
                    position: absolute;
                    inset: -2px;
                    border-radius: 22px;
                    padding: 2px;
                    background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 50%, #a855f7 100%);
                    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                    -webkit-mask-composite: xor;
                    mask-composite: exclude;
                }

                /* Back Face - Answer */
                .card-back {
                    background: linear-gradient(145deg, #1a3a2a 0%, #0f2a1f 50%, #153025 100%);
                    border: 2px solid transparent;
                    transform: rotateY(180deg);
                    position: relative;
                }

                .card-back::before {
                    content: '';
                    position: absolute;
                    inset: -2px;
                    border-radius: 22px;
                    padding: 2px;
                    background: linear-gradient(135deg, #10b981 0%, #06b6d4 50%, #22c55e 100%);
                    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                    -webkit-mask-composite: xor;
                    mask-composite: exclude;
                }

                .card-label {
                    font-size: 0.85rem;
                    font-weight: 600;
                    color: var(--primary-300);
                    margin-bottom: 0.75rem;
                    letter-spacing: 1px;
                }

                .back-label {
                    color: var(--accent-emerald);
                }

                .card-category {
                    position: absolute;
                    top: 1rem;
                    left: 50%;
                    transform: translateX(-50%);
                    padding: 6px 14px;
                    background: rgba(139, 92, 246, 0.25);
                    border-radius: 20px;
                    font-size: 0.7rem;
                    font-weight: 500;
                    color: var(--primary-300);
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                .back-cat {
                    background: rgba(16, 185, 129, 0.25);
                    color: var(--accent-emerald);
                }

                .card-text {
                    font-size: 1.3rem;
                    color: var(--neutral-100);
                    line-height: 1.7;
                    max-width: 450px;
                    margin: 0 auto;
                    font-weight: 400;
                }

                .flip-hint {
                    position: absolute;
                    bottom: 1rem;
                    left: 50%;
                    transform: translateX(-50%);
                    font-size: 0.75rem;
                    color: var(--neutral-500);
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }

                .flip-icon {
                    font-size: 1rem;
                    animation: rotateHint 2s ease-in-out infinite;
                }

                @keyframes rotateHint {
                    0%, 100% { transform: rotate(0deg); }
                    50% { transform: rotate(20deg); }
                }

                .card-scene:hover .card-front,
                .card-scene:hover .card-back {
                    box-shadow: 0 20px 50px rgba(139, 92, 246, 0.25);
                }

                .controls {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .nav-controls {
                    display: flex;
                    justify-content: center;
                    gap: 1rem;
                }

                .nav-btn {
                    padding: 10px 20px;
                    background: rgba(255, 255, 255, 0.08);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 10px;
                    color: var(--neutral-300);
                    cursor: pointer;
                    font-size: 0.9rem;
                    transition: all 0.2s ease;
                }

                .nav-btn:hover:not(:disabled) {
                    background: rgba(255, 255, 255, 0.12);
                    color: var(--neutral-100);
                }

                .nav-btn:disabled {
                    opacity: 0.4;
                    cursor: not-allowed;
                }

                .action-controls {
                    display: flex;
                    justify-content: center;
                    gap: 1rem;
                }

                .action-btn {
                    padding: 12px 24px;
                    border: none;
                    border-radius: 12px;
                    font-size: 0.95rem;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    font-weight: 500;
                }

                .review-btn {
                    background: rgba(245, 158, 11, 0.2);
                    color: #f59e0b;
                    border: 1px solid rgba(245, 158, 11, 0.3);
                }

                .review-btn:hover {
                    background: rgba(245, 158, 11, 0.3);
                    transform: translateY(-2px);
                }

                .known-btn {
                    background: linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(6, 182, 212, 0.2) 100%);
                    color: var(--accent-emerald);
                    border: 1px solid rgba(16, 185, 129, 0.3);
                }

                .known-btn:hover {
                    background: linear-gradient(135deg, rgba(16, 185, 129, 0.3) 0%, rgba(6, 182, 212, 0.3) 100%);
                    transform: translateY(-2px);
                }

                .reset-btn {
                    align-self: center;
                    padding: 8px 16px;
                    background: transparent;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 8px;
                    color: var(--neutral-400);
                    font-size: 0.85rem;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .reset-btn:hover {
                    border-color: rgba(255, 255, 255, 0.2);
                    color: var(--neutral-300);
                }
            `}</style>
        </motion.div>
    );
}

// Helper function to generate flashcards from chapter content
export function generateFlashcardsFromChapter(sections: { id: string; title: string; keyPoints?: string[]; content?: string }[]): Flashcard[] {
    const flashcards: Flashcard[] = [];

    sections.forEach(section => {
        if (section.keyPoints) {
            section.keyPoints.forEach((point, index) => {
                // Create a question from the key point
                const question = point.includes(':')
                    ? point.split(':')[0] + '?'
                    : `What about: ${point.substring(0, 50)}...?`;

                flashcards.push({
                    id: `${section.id}-kp-${index}`,
                    front: question,
                    back: point,
                    category: section.title
                });
            });
        }
    });

    return flashcards;
}
