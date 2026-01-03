'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChapterQuiz } from '@/data/types';

interface QuizModeProps {
    questions: ChapterQuiz[];
    title: string;
    onComplete?: (score: number) => void;
}

type QuizState = 'intro' | 'active' | 'review';

export default function QuizMode({ questions, title, onComplete }: QuizModeProps) {
    const [quizState, setQuizState] = useState<QuizState>('intro');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [timeRemaining, setTimeRemaining] = useState(0);
    const [totalTime, setTotalTime] = useState(0);

    // Calculate time based on questions (1 min per question)
    const timePerQuestion = 60; // seconds
    const totalQuizTime = questions.length * timePerQuestion;

    // Start quiz
    const startQuiz = useCallback(() => {
        setQuizState('active');
        setTimeRemaining(totalQuizTime);
        setTotalTime(totalQuizTime);
        setCurrentIndex(0);
        setAnswers({});
    }, [totalQuizTime]);

    // Timer effect
    useEffect(() => {
        if (quizState !== 'active' || timeRemaining <= 0) return;

        const timer = setInterval(() => {
            setTimeRemaining(prev => {
                if (prev <= 1) {
                    // Time's up - submit automatically
                    setQuizState('review');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [quizState, timeRemaining]);

    // Handle answer selection (no immediate feedback)
    const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
        setAnswers(prev => ({
            ...prev,
            [questionIndex]: answerIndex
        }));
    };

    // Submit quiz
    const submitQuiz = () => {
        setQuizState('review');
        // Calculate score
        const correctCount = questions.reduce((acc, q, idx) => {
            return acc + (answers[idx] === q.correctIndex ? 1 : 0);
        }, 0);
        const percentage = Math.round((correctCount / questions.length) * 100);
        onComplete?.(percentage);
    };

    // Restart quiz
    const restartQuiz = () => {
        setQuizState('intro');
        setAnswers({});
        setCurrentIndex(0);
        setTimeRemaining(0);
    };

    // Format time
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // Calculate score
    const calculateScore = () => {
        const correct = questions.reduce((acc, q, idx) => {
            return acc + (answers[idx] === q.correctIndex ? 1 : 0);
        }, 0);
        return { correct, total: questions.length, percentage: Math.round((correct / questions.length) * 100) };
    };

    const answeredCount = Object.keys(answers).length;
    const allAnswered = answeredCount === questions.length;
    const labels = ['A', 'B', 'C', 'D', 'E', 'F'];

    // ================== INTRO SCREEN ==================
    if (quizState === 'intro') {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                    background: 'var(--gradient-card)',
                    borderRadius: '24px',
                    padding: '3rem',
                    border: '1px solid var(--neutral-800)',
                    textAlign: 'center',
                    maxWidth: '600px',
                    margin: '0 auto'
                }}
            >
                <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>📝</div>

                <h2 style={{
                    color: 'var(--neutral-100)',
                    fontSize: '1.75rem',
                    marginBottom: '0.5rem'
                }}>
                    {title}
                </h2>

                <p style={{
                    color: 'var(--neutral-400)',
                    fontSize: '1rem',
                    marginBottom: '2rem'
                }}>
                    Test your understanding of this chapter
                </p>

                {/* Quiz Info Cards */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '1rem',
                    marginBottom: '2rem'
                }}>
                    <div style={{
                        background: 'rgba(139, 92, 246, 0.15)',
                        border: '1px solid rgba(139, 92, 246, 0.3)',
                        borderRadius: '16px',
                        padding: '1.25rem 1rem'
                    }}>
                        <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📊</div>
                        <div style={{ color: 'var(--primary-400)', fontSize: '1.5rem', fontWeight: 700 }}>
                            {questions.length}
                        </div>
                        <div style={{ color: 'var(--neutral-500)', fontSize: '0.8rem' }}>Questions</div>
                    </div>

                    <div style={{
                        background: 'rgba(16, 185, 129, 0.15)',
                        border: '1px solid rgba(16, 185, 129, 0.3)',
                        borderRadius: '16px',
                        padding: '1.25rem 1rem'
                    }}>
                        <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>⏱️</div>
                        <div style={{ color: 'var(--accent-emerald)', fontSize: '1.5rem', fontWeight: 700 }}>
                            {questions.length}
                        </div>
                        <div style={{ color: 'var(--neutral-500)', fontSize: '0.8rem' }}>Minutes</div>
                    </div>

                    <div style={{
                        background: 'rgba(245, 158, 11, 0.15)',
                        border: '1px solid rgba(245, 158, 11, 0.3)',
                        borderRadius: '16px',
                        padding: '1.25rem 1rem'
                    }}>
                        <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🎯</div>
                        <div style={{ color: 'var(--accent-amber)', fontSize: '1.5rem', fontWeight: 700 }}>
                            70%
                        </div>
                        <div style={{ color: 'var(--neutral-500)', fontSize: '0.8rem' }}>To Pass</div>
                    </div>
                </div>

                {/* Instructions */}
                <div style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    padding: '1.25rem',
                    marginBottom: '2rem',
                    textAlign: 'left'
                }}>
                    <h4 style={{ color: 'var(--neutral-300)', margin: '0 0 0.75rem', fontSize: '0.9rem' }}>
                        📋 Instructions
                    </h4>
                    <ul style={{
                        margin: 0,
                        paddingLeft: '1.25rem',
                        color: 'var(--neutral-400)',
                        fontSize: '0.85rem',
                        lineHeight: 1.7
                    }}>
                        <li>Answer all questions before submitting</li>
                        <li>You won't see correct answers until you submit</li>
                        <li>The timer will auto-submit if time runs out</li>
                        <li>You can navigate between questions</li>
                    </ul>
                </div>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={startQuiz}
                    style={{
                        padding: '1rem 3rem',
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        background: 'var(--gradient-primary)',
                        border: 'none',
                        borderRadius: '12px',
                        color: 'white',
                        cursor: 'pointer'
                    }}
                >
                    🚀 Start Quiz
                </motion.button>
            </motion.div>
        );
    }

    // ================== ACTIVE QUIZ ==================
    if (quizState === 'active') {
        const question = questions[currentIndex];
        const isAnswered = answers[currentIndex] !== undefined;
        const timerWarning = timeRemaining < 60;
        const timerCritical = timeRemaining < 30;

        return (
            <div style={{
                background: 'var(--gradient-card)',
                borderRadius: '20px',
                padding: '2rem',
                border: '1px solid var(--neutral-800)'
            }}>
                {/* Header with Timer */}
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
                            📝 {title}
                        </h3>
                        <p style={{ margin: '0.25rem 0 0', fontSize: '0.9rem', color: 'var(--neutral-400)' }}>
                            Question {currentIndex + 1} of {questions.length}
                        </p>
                    </div>

                    {/* Timer */}
                    <motion.div
                        animate={{
                            scale: timerCritical ? [1, 1.05, 1] : 1,
                            backgroundColor: timerCritical
                                ? 'rgba(239, 68, 94, 0.2)'
                                : timerWarning
                                    ? 'rgba(245, 158, 11, 0.2)'
                                    : 'rgba(16, 185, 129, 0.2)'
                        }}
                        transition={{ repeat: timerCritical ? Infinity : 0, duration: 0.5 }}
                        style={{
                            padding: '0.75rem 1.25rem',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            border: `1px solid ${timerCritical ? 'var(--accent-rose)' : timerWarning ? 'var(--accent-amber)' : 'var(--accent-emerald)'}`
                        }}
                    >
                        <span style={{ fontSize: '1.25rem' }}>⏱️</span>
                        <span style={{
                            fontSize: '1.25rem',
                            fontWeight: 700,
                            fontFamily: 'monospace',
                            color: timerCritical ? 'var(--accent-rose)' : timerWarning ? 'var(--accent-amber)' : 'var(--accent-emerald)'
                        }}>
                            {formatTime(timeRemaining)}
                        </span>
                    </motion.div>
                </div>

                {/* Progress Bar */}
                <div style={{
                    marginBottom: '1.5rem'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '0.5rem',
                        fontSize: '0.8rem',
                        color: 'var(--neutral-500)'
                    }}>
                        <span>Progress</span>
                        <span>{answeredCount}/{questions.length} answered</span>
                    </div>
                    <div style={{
                        height: '8px',
                        background: 'var(--neutral-800)',
                        borderRadius: '4px',
                        overflow: 'hidden'
                    }}>
                        <motion.div
                            animate={{ width: `${(answeredCount / questions.length) * 100}%` }}
                            style={{
                                height: '100%',
                                background: 'var(--gradient-primary)',
                                borderRadius: '4px'
                            }}
                        />
                    </div>
                </div>

                {/* Question Navigation Dots */}
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                    marginBottom: '2rem',
                    justifyContent: 'center'
                }}>
                    {questions.map((_, idx) => (
                        <motion.button
                            key={idx}
                            whileHover={{ scale: 1.1 }}
                            onClick={() => setCurrentIndex(idx)}
                            style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '50%',
                                border: idx === currentIndex
                                    ? '2px solid var(--primary-500)'
                                    : '1px solid var(--neutral-700)',
                                background: answers[idx] !== undefined
                                    ? 'var(--primary-500)'
                                    : idx === currentIndex
                                        ? 'rgba(139, 92, 246, 0.2)'
                                        : 'var(--neutral-900)',
                                color: answers[idx] !== undefined
                                    ? 'white'
                                    : 'var(--neutral-400)',
                                fontSize: '0.8rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            {idx + 1}
                        </motion.button>
                    ))}
                </div>

                {/* Question */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                    >
                        {/* Difficulty Badge */}
                        {question.difficulty && (
                            <span style={{
                                display: 'inline-block',
                                padding: '0.3rem 0.75rem',
                                background: question.difficulty === 'easy'
                                    ? 'rgba(16, 185, 129, 0.2)'
                                    : question.difficulty === 'hard'
                                        ? 'rgba(244, 63, 94, 0.2)'
                                        : 'rgba(245, 158, 11, 0.2)',
                                color: question.difficulty === 'easy'
                                    ? 'var(--accent-emerald)'
                                    : question.difficulty === 'hard'
                                        ? 'var(--accent-rose)'
                                        : 'var(--accent-amber)',
                                borderRadius: '20px',
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                textTransform: 'capitalize',
                                marginBottom: '1rem'
                            }}>
                                {question.difficulty}
                            </span>
                        )}

                        <div style={{
                            fontSize: '1.25rem',
                            fontWeight: 500,
                            color: 'var(--neutral-100)',
                            marginBottom: '1.5rem',
                            lineHeight: 1.5
                        }}>
                            {question.question}
                        </div>

                        {/* Options (No correct/incorrect shown) */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            {question.options.map((option, index) => {
                                const isSelected = answers[currentIndex] === index;

                                return (
                                    <motion.button
                                        key={index}
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                        onClick={() => handleAnswerSelect(currentIndex, index)}
                                        style={{
                                            width: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '1rem',
                                            padding: '1rem 1.25rem',
                                            marginBottom: '0.75rem',
                                            background: isSelected
                                                ? 'rgba(139, 92, 246, 0.2)'
                                                : 'var(--neutral-900)',
                                            border: isSelected
                                                ? '2px solid var(--primary-500)'
                                                : '1px solid var(--neutral-700)',
                                            borderRadius: '12px',
                                            cursor: 'pointer',
                                            textAlign: 'left',
                                            transition: 'all 0.2s ease'
                                        }}
                                    >
                                        <span style={{
                                            width: '32px',
                                            height: '32px',
                                            borderRadius: '50%',
                                            background: isSelected ? 'var(--primary-500)' : 'var(--neutral-800)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 600,
                                            fontSize: '0.9rem',
                                            color: isSelected ? 'white' : 'var(--neutral-400)'
                                        }}>
                                            {labels[index]}
                                        </span>
                                        <span style={{
                                            flex: 1,
                                            color: 'var(--neutral-200)',
                                            fontSize: '1rem'
                                        }}>
                                            {option}
                                        </span>
                                        {isSelected && (
                                            <span style={{ color: 'var(--primary-400)', fontSize: '1.25rem' }}>✓</span>
                                        )}
                                    </motion.button>
                                );
                            })}
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '1rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid var(--neutral-800)'
                }}>
                    <button
                        onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                        disabled={currentIndex === 0}
                        style={{
                            padding: '0.75rem 1.5rem',
                            background: 'var(--neutral-800)',
                            color: currentIndex === 0 ? 'var(--neutral-600)' : 'var(--neutral-200)',
                            border: '1px solid var(--neutral-700)',
                            borderRadius: '10px',
                            cursor: currentIndex === 0 ? 'not-allowed' : 'pointer'
                        }}
                    >
                        ← Previous
                    </button>

                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                        {currentIndex < questions.length - 1 ? (
                            <button
                                onClick={() => setCurrentIndex(prev => prev + 1)}
                                className="btn-primary"
                            >
                                Next →
                            </button>
                        ) : (
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={submitQuiz}
                                disabled={!allAnswered}
                                style={{
                                    padding: '0.75rem 2rem',
                                    background: allAnswered
                                        ? 'linear-gradient(135deg, #10b981, #059669)'
                                        : 'var(--neutral-700)',
                                    border: 'none',
                                    borderRadius: '10px',
                                    color: allAnswered ? 'white' : 'var(--neutral-500)',
                                    fontWeight: 600,
                                    cursor: allAnswered ? 'pointer' : 'not-allowed'
                                }}
                            >
                                ✓ Submit Quiz {!allAnswered && `(${answeredCount}/${questions.length})`}
                            </motion.button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // ================== REVIEW SCREEN ==================
    const score = calculateScore();
    const passed = score.percentage >= 70;

    return (
        <div style={{
            background: 'var(--gradient-card)',
            borderRadius: '24px',
            padding: '2rem',
            border: '1px solid var(--neutral-800)'
        }}>
            {/* Results Header */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: 'center', marginBottom: '2rem' }}
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    style={{ fontSize: '5rem', marginBottom: '1rem' }}
                >
                    {passed ? '🎉' : '📚'}
                </motion.div>

                <h2 style={{
                    color: 'var(--neutral-100)',
                    fontSize: '1.75rem',
                    marginBottom: '0.5rem'
                }}>
                    {passed ? 'Congratulations!' : 'Keep Learning!'}
                </h2>

                <p style={{ color: 'var(--neutral-400)', marginBottom: '1.5rem' }}>
                    {passed
                        ? 'You passed the quiz! Great job!'
                        : 'Review the material and try again.'}
                </p>

                {/* Score Ring */}
                <div style={{
                    width: '180px',
                    height: '180px',
                    margin: '0 auto 1.5rem',
                    position: 'relative'
                }}>
                    <svg width="180" height="180" style={{ transform: 'rotate(-90deg)' }}>
                        <circle
                            cx="90"
                            cy="90"
                            r="80"
                            fill="none"
                            stroke="var(--neutral-800)"
                            strokeWidth="12"
                        />
                        <motion.circle
                            cx="90"
                            cy="90"
                            r="80"
                            fill="none"
                            stroke={passed ? 'var(--accent-emerald)' : 'var(--accent-amber)'}
                            strokeWidth="12"
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: score.percentage / 100 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            style={{
                                strokeDasharray: '502',
                                strokeDashoffset: 0
                            }}
                        />
                    </svg>
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        textAlign: 'center'
                    }}>
                        <div style={{
                            fontSize: '2.5rem',
                            fontWeight: 700,
                            color: passed ? 'var(--accent-emerald)' : 'var(--accent-amber)'
                        }}>
                            {score.percentage}%
                        </div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--neutral-500)' }}>
                            {score.correct}/{score.total} correct
                        </div>
                    </div>
                </div>

                {/* Time spent */}
                <p style={{ color: 'var(--neutral-500)', fontSize: '0.9rem' }}>
                    Time spent: {formatTime(totalTime - timeRemaining)}
                </p>
            </motion.div>

            {/* Questions Review */}
            <div style={{ marginBottom: '2rem' }}>
                <h3 style={{
                    color: 'var(--neutral-200)',
                    fontSize: '1.1rem',
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}>
                    📋 Review Your Answers
                </h3>

                {questions.map((q, idx) => {
                    const userAnswer = answers[idx];
                    const isCorrect = userAnswer === q.correctIndex;
                    const wasAnswered = userAnswer !== undefined;

                    return (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            style={{
                                background: isCorrect
                                    ? 'rgba(16, 185, 129, 0.1)'
                                    : 'rgba(239, 68, 94, 0.1)',
                                border: `1px solid ${isCorrect ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 94, 0.3)'}`,
                                borderRadius: '12px',
                                padding: '1.25rem',
                                marginBottom: '1rem'
                            }}
                        >
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                                marginBottom: '0.75rem'
                            }}>
                                <span style={{
                                    fontSize: '0.8rem',
                                    fontWeight: 600,
                                    color: 'var(--neutral-500)'
                                }}>
                                    Question {idx + 1}
                                </span>
                                <span style={{
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '20px',
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                    background: isCorrect
                                        ? 'rgba(16, 185, 129, 0.2)'
                                        : 'rgba(239, 68, 94, 0.2)',
                                    color: isCorrect ? 'var(--accent-emerald)' : 'var(--accent-rose)'
                                }}>
                                    {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                                </span>
                            </div>

                            <p style={{
                                color: 'var(--neutral-200)',
                                fontSize: '0.95rem',
                                marginBottom: '0.75rem',
                                lineHeight: 1.5
                            }}>
                                {q.question}
                            </p>

                            <div style={{ fontSize: '0.85rem' }}>
                                {wasAnswered && !isCorrect && (
                                    <div style={{
                                        color: 'var(--accent-rose)',
                                        marginBottom: '0.5rem',
                                        display: 'flex',
                                        gap: '0.5rem'
                                    }}>
                                        <span>Your answer:</span>
                                        <span style={{ fontWeight: 500 }}>
                                            {labels[userAnswer]}. {q.options[userAnswer]}
                                        </span>
                                    </div>
                                )}
                                <div style={{
                                    color: 'var(--accent-emerald)',
                                    display: 'flex',
                                    gap: '0.5rem'
                                }}>
                                    <span>Correct answer:</span>
                                    <span style={{ fontWeight: 500 }}>
                                        {labels[q.correctIndex]}. {q.options[q.correctIndex]}
                                    </span>
                                </div>
                            </div>

                            {q.explanation && (
                                <div style={{
                                    marginTop: '0.75rem',
                                    paddingTop: '0.75rem',
                                    borderTop: '1px solid rgba(255,255,255,0.1)'
                                }}>
                                    <p style={{
                                        color: 'var(--neutral-400)',
                                        fontSize: '0.85rem',
                                        margin: 0,
                                        lineHeight: 1.6
                                    }}>
                                        💡 {q.explanation}
                                    </p>
                                </div>
                            )}
                        </motion.div>
                    );
                })}
            </div>

            {/* Actions */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '1rem'
            }}>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={restartQuiz}
                    style={{
                        padding: '1rem 2rem',
                        background: 'var(--gradient-primary)',
                        border: 'none',
                        borderRadius: '12px',
                        color: 'white',
                        fontWeight: 600,
                        cursor: 'pointer',
                        fontSize: '1rem'
                    }}
                >
                    🔄 Try Again
                </motion.button>
            </div>
        </div>
    );
}
