'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface QuickCheckQuestion {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
}

interface QuickCheckProps {
    title?: string;
    questions: QuickCheckQuestion[];
}

const QuickCheck: React.FC<QuickCheckProps> = ({
    title = "🧪 Quick Check",
    questions
}) => {
    const [currentQ, setCurrentQ] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(
        new Array(questions.length).fill(null)
    );
    const [showExplanation, setShowExplanation] = useState(false);
    const [completed, setCompleted] = useState(false);

    const currentQuestion = questions[currentQ];
    const selectedAnswer = selectedAnswers[currentQ];
    const isCorrect = selectedAnswer === currentQuestion.correctIndex;
    const score = selectedAnswers.filter((a, i) => a === questions[i].correctIndex).length;

    const handleSelect = (index: number) => {
        if (selectedAnswer !== null) return;
        const newAnswers = [...selectedAnswers];
        newAnswers[currentQ] = index;
        setSelectedAnswers(newAnswers);
        setShowExplanation(true);
    };

    const handleNext = () => {
        setShowExplanation(false);
        if (currentQ < questions.length - 1) {
            setCurrentQ(currentQ + 1);
        } else {
            setCompleted(true);
        }
    };

    const handleReset = () => {
        setCurrentQ(0);
        setSelectedAnswers(new Array(questions.length).fill(null));
        setShowExplanation(false);
        setCompleted(false);
    };

    if (completed) {
        const percentage = Math.round((score / questions.length) * 100);
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                    background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(59, 130, 246, 0.1))',
                    borderRadius: '16px',
                    padding: '2rem',
                    marginTop: '1.5rem',
                    marginBottom: '1.5rem',
                    textAlign: 'center',
                }}
            >
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                    {percentage >= 80 ? '🎉' : percentage >= 50 ? '👍' : '📚'}
                </div>
                <h3 style={{ color: 'var(--neutral-100)', marginBottom: '0.5rem' }}>
                    Quick Check Complete!
                </h3>
                <p style={{ color: 'var(--neutral-300)', fontSize: '1.2rem', marginBottom: '1rem' }}>
                    Score: <strong style={{ color: percentage >= 80 ? '#22C55E' : percentage >= 50 ? '#EAB308' : '#EF4444' }}>
                        {score}/{questions.length} ({percentage}%)
                    </strong>
                </p>
                <p style={{ color: 'var(--neutral-400)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                    {percentage >= 80 ? "Excellent! You're ready to move on." :
                        percentage >= 50 ? "Good effort! Review the explanations above." :
                            "Take another look at this section before continuing."}
                </p>
                <button
                    onClick={handleReset}
                    style={{
                        background: 'var(--primary-500)',
                        color: 'white',
                        border: 'none',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: 600,
                    }}
                >
                    Try Again
                </button>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.05))',
                borderRadius: '16px',
                padding: '1.5rem',
                marginTop: '1.5rem',
                marginBottom: '1.5rem',
                border: '1px solid rgba(139, 92, 246, 0.2)',
            }}
        >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h4 style={{ color: 'var(--primary-300)', margin: 0, fontSize: '1rem' }}>
                    {title}
                </h4>
                <span style={{ color: 'var(--neutral-400)', fontSize: '0.85rem' }}>
                    {currentQ + 1} / {questions.length}
                </span>
            </div>

            {/* Progress bar */}
            <div style={{
                height: '4px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '2px',
                marginBottom: '1.5rem',
            }}>
                <div style={{
                    height: '100%',
                    width: `${((currentQ + (selectedAnswer !== null ? 1 : 0)) / questions.length) * 100}%`,
                    background: 'var(--primary-500)',
                    borderRadius: '2px',
                    transition: 'width 0.3s ease',
                }} />
            </div>

            {/* Question */}
            <p style={{ color: 'var(--neutral-100)', fontSize: '1.05rem', marginBottom: '1.25rem', lineHeight: 1.6 }}>
                {currentQuestion.question}
            </p>

            {/* Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {currentQuestion.options.map((option, index) => {
                    const isSelected = selectedAnswer === index;
                    const isCorrectOption = index === currentQuestion.correctIndex;
                    const showResult = selectedAnswer !== null;

                    let bgColor = 'rgba(255,255,255,0.05)';
                    let borderColor = 'rgba(255,255,255,0.1)';
                    if (showResult && isCorrectOption) {
                        bgColor = 'rgba(34, 197, 94, 0.2)';
                        borderColor = '#22C55E';
                    } else if (showResult && isSelected && !isCorrect) {
                        bgColor = 'rgba(239, 68, 68, 0.2)';
                        borderColor = '#EF4444';
                    }

                    return (
                        <button
                            key={index}
                            onClick={() => handleSelect(index)}
                            disabled={selectedAnswer !== null}
                            style={{
                                background: bgColor,
                                border: `2px solid ${borderColor}`,
                                borderRadius: '10px',
                                padding: '0.85rem 1rem',
                                textAlign: 'left',
                                color: 'var(--neutral-200)',
                                cursor: selectedAnswer !== null ? 'default' : 'pointer',
                                transition: 'all 0.2s ease',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                            }}
                        >
                            <span style={{
                                width: '24px',
                                height: '24px',
                                borderRadius: '50%',
                                background: showResult && isCorrectOption ? '#22C55E' :
                                    showResult && isSelected && !isCorrect ? '#EF4444' :
                                        'rgba(255,255,255,0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.75rem',
                                fontWeight: 600,
                            }}>
                                {showResult && isCorrectOption ? '✓' :
                                    showResult && isSelected && !isCorrect ? '✗' :
                                        String.fromCharCode(65 + index)}
                            </span>
                            {option}
                        </button>
                    );
                })}
            </div>

            {/* Explanation */}
            <AnimatePresence>
                {showExplanation && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{
                            marginTop: '1.25rem',
                            padding: '1rem',
                            background: isCorrect ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                            borderRadius: '10px',
                            borderLeft: `4px solid ${isCorrect ? '#22C55E' : '#EF4444'}`,
                        }}
                    >
                        <p style={{ color: isCorrect ? '#22C55E' : '#EF4444', fontWeight: 600, marginBottom: '0.5rem' }}>
                            {isCorrect ? '✓ Correct!' : '✗ Not quite!'}
                        </p>
                        <p style={{ color: 'var(--neutral-300)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                            {currentQuestion.explanation}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Next button */}
            {showExplanation && (
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={handleNext}
                    style={{
                        marginTop: '1.25rem',
                        width: '100%',
                        padding: '0.85rem',
                        background: 'var(--primary-500)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '10px',
                        fontWeight: 600,
                        cursor: 'pointer',
                    }}
                >
                    {currentQ < questions.length - 1 ? 'Next Question →' : 'See Results'}
                </motion.button>
            )}
        </motion.div>
    );
};

export default QuickCheck;
