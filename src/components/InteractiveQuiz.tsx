'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface QuizQuestion {
    id: number;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
}

interface InteractiveQuizProps {
    title: string;
    questions: QuizQuestion[];
}

export default function InteractiveQuiz({ title, questions }: InteractiveQuizProps) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());

    // Handle empty questions array
    if (!questions || questions.length === 0) {
        return (
            <div className="quiz-container">
                <h3 style={{ color: 'var(--neutral-400)' }}>{title}</h3>
                <p style={{ color: 'var(--neutral-500)' }}>No quiz questions available yet.</p>
            </div>
        );
    }

    const question = questions[currentQuestion];
    const isAnswered = answeredQuestions.has(currentQuestion);
    const isCorrect = selectedAnswer === question?.correctIndex;
    const isComplete = answeredQuestions.size === questions.length;

    // Safety check if question is undefined (can happen during fast refresh or state issues)
    if (!question) {
        return <div className="p-4 text-center text-neutral-400">Loading question...</div>;
    }

    const handleAnswerSelect = (index: number) => {
        if (isAnswered) return;

        setSelectedAnswer(index);
        setShowResult(true);
        setAnsweredQuestions(prev => new Set(prev).add(currentQuestion));

        if (index === question.correctIndex) {
            setScore(prev => prev + 1);
        }
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
            setSelectedAnswer(null);
            setShowResult(false);
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(prev => prev - 1);
            setSelectedAnswer(null);
            setShowResult(false);
        }
    };

    const handleRestart = () => {
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setShowResult(false);
        setScore(0);
        setAnsweredQuestions(new Set());
    };

    const getOptionClass = (index: number) => {
        if (!isAnswered) return 'quiz-option';
        if (index === question?.correctIndex) return 'quiz-option correct';
        if (index === selectedAnswer && !isCorrect) return 'quiz-option incorrect';
        return 'quiz-option';
    };

    const labels = ['A', 'B', 'C', 'D', 'E', 'F'];

    return (
        <div className="quiz-container">
            {/* Header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1.5rem',
                paddingBottom: '1rem',
                borderBottom: '1px solid var(--neutral-700)'
            }}>
                <div>
                    <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--neutral-100)' }}>
                        {title}
                    </h3>
                    <p style={{ margin: '0.25rem 0 0', fontSize: '0.875rem', color: 'var(--neutral-400)' }}>
                        Question {currentQuestion + 1} of {questions.length}
                    </p>
                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                }}>
                    <div style={{
                        padding: '0.5rem 1rem',
                        background: 'var(--neutral-800)',
                        borderRadius: '8px',
                        fontSize: '0.875rem',
                        color: 'var(--neutral-300)'
                    }}>
                        Score: <span style={{ color: 'var(--accent-emerald)', fontWeight: 600 }}>{score}</span>/{questions.length}
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div style={{
                height: '4px',
                background: 'var(--neutral-800)',
                borderRadius: '2px',
                marginBottom: '2rem',
                overflow: 'hidden'
            }}>
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                    style={{
                        height: '100%',
                        background: 'var(--gradient-primary)',
                        borderRadius: '2px'
                    }}
                />
            </div>

            {/* Question */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentQuestion}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="quiz-question">
                        {question.question}
                    </div>

                    {/* Options */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        {question.options.map((option, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: isAnswered ? 1 : 1.01 }}
                                whileTap={{ scale: isAnswered ? 1 : 0.99 }}
                            >
                                <div
                                    className={getOptionClass(index)}
                                    onClick={() => handleAnswerSelect(index)}
                                    style={{ cursor: isAnswered ? 'default' : 'pointer' }}
                                >
                                    <span className="quiz-option-label">{labels[index]}</span>
                                    <span style={{ flex: 1, color: 'var(--neutral-200)' }}>{option}</span>
                                    {isAnswered && index === question.correctIndex && (
                                        <span style={{ color: 'var(--accent-emerald)', fontSize: '1.25rem' }}>✓</span>
                                    )}
                                    {isAnswered && index === selectedAnswer && !isCorrect && (
                                        <span style={{ color: 'var(--accent-rose)', fontSize: '1.25rem' }}>✗</span>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Explanation */}
                    <AnimatePresence>
                        {showResult && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                style={{
                                    padding: '1rem 1.25rem',
                                    background: isCorrect
                                        ? 'rgba(16, 185, 129, 0.1)'
                                        : 'rgba(244, 63, 94, 0.1)',
                                    border: `1px solid ${isCorrect ? 'var(--accent-emerald)' : 'var(--accent-rose)'}`,
                                    borderRadius: '12px',
                                    marginBottom: '1.5rem'
                                }}
                            >
                                <div style={{
                                    fontWeight: 600,
                                    color: isCorrect ? 'var(--accent-emerald)' : 'var(--accent-rose)',
                                    marginBottom: '0.5rem'
                                }}>
                                    {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
                                </div>
                                <p style={{ margin: 0, color: 'var(--neutral-300)', fontSize: '0.95rem' }}>
                                    {question.explanation}
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '1rem'
            }}>
                <button
                    onClick={handlePrevious}
                    disabled={currentQuestion === 0}
                    style={{
                        padding: '0.75rem 1.5rem',
                        background: 'var(--neutral-800)',
                        color: currentQuestion === 0 ? 'var(--neutral-600)' : 'var(--neutral-200)',
                        border: '1px solid var(--neutral-700)',
                        borderRadius: '10px',
                        cursor: currentQuestion === 0 ? 'not-allowed' : 'pointer',
                        transition: 'all 0.2s'
                    }}
                >
                    ← Previous
                </button>

                {isComplete ? (
                    <button
                        onClick={handleRestart}
                        className="btn-primary"
                    >
                        🔄 Restart Quiz
                    </button>
                ) : (
                    <button
                        onClick={handleNext}
                        disabled={currentQuestion === questions.length - 1}
                        className="btn-primary"
                        style={{
                            opacity: currentQuestion === questions.length - 1 ? 0.5 : 1
                        }}
                    >
                        Next →
                    </button>
                )}
            </div>

            {/* Completion Message */}
            {isComplete && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                        marginTop: '2rem',
                        padding: '1.5rem',
                        background: 'var(--gradient-card)',
                        border: '1px solid var(--accent-emerald)',
                        borderRadius: '16px',
                        textAlign: 'center'
                    }}
                >
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎉</div>
                    <h4 style={{ margin: '0 0 0.5rem', color: 'var(--neutral-100)' }}>Quiz Complete!</h4>
                    <p style={{ margin: 0, color: 'var(--neutral-300)' }}>
                        You scored <strong style={{ color: 'var(--accent-emerald)' }}>{score}</strong> out of <strong>{questions.length}</strong>
                        {score === questions.length && ' - Perfect score! 🌟'}
                    </p>
                </motion.div>
            )}
        </div>
    );
}
