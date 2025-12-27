'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MiniQuizQuestion {
    question: string;
    options: string[];
    correctIndex: number;
    hint: string;
}

interface MiniQuizProps {
    questions: MiniQuizQuestion[];
    onComplete?: () => void;
}

export default function MiniQuiz({ questions, onComplete }: MiniQuizProps) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showHint, setShowHint] = useState(false);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [streak, setStreak] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    const question = questions[currentQuestion];

    const handleAnswer = (index: number) => {
        if (selectedAnswer !== null) return;

        setSelectedAnswer(index);
        const correct = index === question.correctIndex;
        setIsCorrect(correct);

        if (correct) {
            setStreak(prev => prev + 1);
        } else {
            setStreak(0);
        }
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
            setSelectedAnswer(null);
            setIsCorrect(null);
            setShowHint(false);
        } else {
            setIsComplete(true);
            onComplete?.();
        }
    };

    const labels = ['A', 'B', 'C', 'D'];

    if (isComplete) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    borderRadius: '16px',
                    padding: '2rem',
                    textAlign: 'center',
                    margin: '2rem 0'
                }}
            >
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
                <h4 style={{
                    margin: '0 0 0.5rem',
                    color: 'var(--accent-emerald)',
                    fontSize: '1.25rem'
                }}>
                    Check Complete!
                </h4>
                <p style={{ color: 'var(--neutral-300)', margin: 0 }}>
                    Great job! You're ready to continue.
                </p>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
                background: 'var(--gradient-card)',
                border: '1px solid var(--card-border)',
                borderRadius: '20px',
                padding: '1.5rem',
                margin: '2rem 0',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* Decorative gradient */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'var(--gradient-primary)'
            }} />

            {/* Header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1.25rem'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                }}>
                    <span style={{ fontSize: '1.5rem' }}>🧠</span>
                    <div>
                        <h4 style={{
                            margin: 0,
                            fontSize: '1rem',
                            color: 'var(--neutral-100)'
                        }}>
                            Quick Check
                        </h4>
                        <span style={{
                            fontSize: '0.8rem',
                            color: 'var(--neutral-400)'
                        }}>
                            Question {currentQuestion + 1} of {questions.length}
                        </span>
                    </div>
                </div>
                {streak > 0 && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        style={{
                            padding: '0.35rem 0.75rem',
                            background: 'rgba(245, 158, 11, 0.2)',
                            border: '1px solid rgba(245, 158, 11, 0.4)',
                            borderRadius: '20px',
                            fontSize: '0.8rem',
                            color: '#f59e0b',
                            fontWeight: 600
                        }}
                    >
                        🔥 {streak} streak
                    </motion.div>
                )}
            </div>

            {/* Question */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentQuestion}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                >
                    <p style={{
                        fontSize: '1.1rem',
                        color: 'var(--neutral-100)',
                        fontWeight: 500,
                        marginBottom: '1.25rem',
                        lineHeight: 1.5
                    }}>
                        {question.question}
                    </p>

                    {/* Options */}
                    <div style={{
                        display: 'grid',
                        gap: '0.75rem',
                        marginBottom: '1rem'
                    }}>
                        {question.options.map((option, index) => {
                            const isSelected = selectedAnswer === index;
                            const isCorrectOption = index === question.correctIndex;
                            const showResult = selectedAnswer !== null;

                            let borderColor = 'var(--neutral-700)';
                            let bgColor = 'rgba(255,255,255,0.02)';

                            if (showResult) {
                                if (isCorrectOption) {
                                    borderColor = 'var(--accent-emerald)';
                                    bgColor = 'rgba(16, 185, 129, 0.1)';
                                } else if (isSelected && !isCorrect) {
                                    borderColor = 'var(--accent-rose)';
                                    bgColor = 'rgba(244, 63, 94, 0.1)';
                                }
                            }

                            return (
                                <motion.button
                                    key={index}
                                    whileHover={{ scale: selectedAnswer === null ? 1.01 : 1 }}
                                    whileTap={{ scale: selectedAnswer === null ? 0.99 : 1 }}
                                    onClick={() => handleAnswer(index)}
                                    disabled={selectedAnswer !== null}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        padding: '0.875rem 1rem',
                                        background: bgColor,
                                        border: `1px solid ${borderColor}`,
                                        borderRadius: '12px',
                                        cursor: selectedAnswer === null ? 'pointer' : 'default',
                                        transition: 'all 0.2s',
                                        textAlign: 'left'
                                    }}
                                >
                                    <span style={{
                                        width: '28px',
                                        height: '28px',
                                        borderRadius: '8px',
                                        background: showResult && isCorrectOption
                                            ? 'var(--accent-emerald)'
                                            : showResult && isSelected && !isCorrect
                                                ? 'var(--accent-rose)'
                                                : 'var(--neutral-800)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '0.8rem',
                                        fontWeight: 600,
                                        color: 'white',
                                        flexShrink: 0
                                    }}>
                                        {showResult && isCorrectOption ? '✓' :
                                            showResult && isSelected && !isCorrect ? '✗' :
                                                labels[index]}
                                    </span>
                                    <span style={{
                                        color: 'var(--neutral-200)',
                                        fontSize: '0.95rem'
                                    }}>
                                        {option}
                                    </span>
                                </motion.button>
                            );
                        })}
                    </div>

                    {/* Hint */}
                    {selectedAnswer === null && (
                        <button
                            onClick={() => setShowHint(!showHint)}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--primary-400)',
                                fontSize: '0.85rem',
                                cursor: 'pointer',
                                padding: '0.5rem 0',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            💭 {showHint ? 'Hide hint' : 'Need a hint?'}
                        </button>
                    )}

                    <AnimatePresence>
                        {showHint && selectedAnswer === null && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                style={{
                                    padding: '0.75rem 1rem',
                                    background: 'rgba(139, 92, 246, 0.1)',
                                    border: '1px solid rgba(139, 92, 246, 0.3)',
                                    borderRadius: '10px',
                                    color: 'var(--neutral-300)',
                                    fontSize: '0.9rem',
                                    fontStyle: 'italic'
                                }}
                            >
                                {question.hint}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Result & Next */}
                    <AnimatePresence>
                        {selectedAnswer !== null && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginTop: '1rem',
                                    paddingTop: '1rem',
                                    borderTop: '1px solid var(--neutral-800)'
                                }}
                            >
                                <span style={{
                                    color: isCorrect ? 'var(--accent-emerald)' : 'var(--accent-rose)',
                                    fontWeight: 600,
                                    fontSize: '0.95rem'
                                }}>
                                    {isCorrect ? '✓ Correct!' : '✗ Not quite'}
                                </span>
                                <button
                                    onClick={handleNext}
                                    className="btn-primary"
                                    style={{ padding: '0.6rem 1.25rem' }}
                                >
                                    {currentQuestion < questions.length - 1 ? 'Next →' : 'Complete ✓'}
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </AnimatePresence>
        </motion.div>
    );
}
