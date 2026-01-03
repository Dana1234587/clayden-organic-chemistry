'use client';

import { useState, } from 'react';
import { motion } from 'framer-motion';

interface QuizQuestion {
    type: 'drag-order' | 'drag-match' | 'fill-equation';
    question: string;
    items?: { id: string; label: string; icon?: string }[];
    correctOrder?: string[];
    pairs?: { left: string; right: string }[];
    equation?: { parts: string[]; blanks: number[]; answers: string[] };
}

const quizQuestions: QuizQuestion[] = [
    {
        type: 'drag-order',
        question: 'Arrange the synthesis steps in correct order:',
        items: [
            { id: 'heat', label: 'Heat to 85°C', icon: '🔥' },
            { id: 'mix', label: 'Mix reagents', icon: '🧪' },
            { id: 'filter', label: 'Filter crystals', icon: '⚗️' },
            { id: 'ice', label: 'Ice bath', icon: '🧊' },
            { id: 'water', label: 'Add cold water', icon: '💧' }
        ],
        correctOrder: ['mix', 'heat', 'water', 'ice', 'filter']
    },
    {
        type: 'drag-order',
        question: 'Order the molecules from natural source to final drug:',
        items: [
            { id: 'aspirin', label: 'Aspirin', icon: '💊' },
            { id: 'salicin', label: 'Salicin', icon: '🌿' },
            { id: 'salicylic', label: 'Salicylic Acid', icon: '⚗️' }
        ],
        correctOrder: ['salicin', 'salicylic', 'aspirin']
    },
    {
        type: 'drag-match',
        question: 'Match the functional group to its effect:',
        pairs: [
            { left: '-OH (Phenolic)', right: '⚠️ Stomach irritation' },
            { left: '-OCOCH₃ (Ester)', right: '✅ Protects stomach' },
            { left: '-COOH (Acid)', right: '💊 Drug activity' }
        ]
    },
    {
        type: 'fill-equation',
        question: 'Complete the Aspirin synthesis equation:',
        equation: {
            parts: ['Salicylic Acid', '+', '___', '→', 'Aspirin', '+', '___'],
            blanks: [2, 6],
            answers: ['Acetic Anhydride', 'Acetic Acid']
        }
    }
];

export default function InteractiveLabQuiz() {
    const [currentQ, setCurrentQ] = useState(0);
    const [draggedItem, setDraggedItem] = useState<string | null>(null);
    const [userOrder, setUserOrder] = useState<string[]>([]);
    const [matches, setMatches] = useState<Record<string, string>>({});
    const [blanks, setBlanks] = useState<string[]>(['', '']);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [completed, setCompleted] = useState(false);

    const q = quizQuestions[currentQ];
    const availableItems = q.items?.filter(i => !userOrder.includes(i.id)) || [];

    const handleDragStart = (id: string) => setDraggedItem(id);

    const handleDropToOrder = () => {
        if (draggedItem && !userOrder.includes(draggedItem)) {
            setUserOrder([...userOrder, draggedItem]);
        }
        setDraggedItem(null);
    };

    const removeFromOrder = (id: string) => {
        setUserOrder(userOrder.filter(i => i !== id));
    };

    const checkAnswer = () => {
        let correct = false;
        if (q.type === 'drag-order' && q.correctOrder) {
            correct = JSON.stringify(userOrder) === JSON.stringify(q.correctOrder);
        } else if (q.type === 'drag-match' && q.pairs) {
            correct = q.pairs.every(p => matches[p.left] === p.right);
        } else if (q.type === 'fill-equation' && q.equation) {
            correct = blanks.every((b, i) => b.toLowerCase().includes(q.equation!.answers[i].toLowerCase().slice(0, 5)));
        }
        if (correct) setScore(s => s + 1);
        setShowResult(true);
    };

    const nextQuestion = () => {
        if (currentQ < quizQuestions.length - 1) {
            setCurrentQ(c => c + 1);
            setUserOrder([]);
            setMatches({});
            setBlanks(['', '']);
            setShowResult(false);
        } else {
            setCompleted(true);
        }
    };

    const restart = () => {
        setCurrentQ(0);
        setUserOrder([]);
        setMatches({});
        setBlanks(['', '']);
        setShowResult(false);
        setScore(0);
        setCompleted(false);
    };

    if (completed) {
        return (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
                <div style={{ fontSize: '4rem' }}>{score === quizQuestions.length ? '🏆' : '⭐'}</div>
                <h3 style={{ color: '#22c55e', margin: '1rem 0' }}>Quiz Complete!</h3>
                <p style={{ color: '#94a3b8' }}>Score: {score}/{quizQuestions.length}</p>
                <button onClick={restart} style={{ marginTop: '1rem', padding: '0.75rem 1.5rem', background: 'linear-gradient(135deg, #f97316, #ea580c)', border: 'none', borderRadius: '10px', color: 'white', fontWeight: 600, cursor: 'pointer' }}>
                    🔄 Try Again
                </button>
            </div>
        );
    }

    return (
        <div>
            {/* Progress */}
            <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Challenge {currentQ + 1}/{quizQuestions.length}</span>
                    <span style={{ fontSize: '0.75rem', color: '#f97316' }}>Score: {score}</span>
                </div>
                <div style={{ height: '4px', background: 'rgba(30,41,59,0.8)', borderRadius: '2px' }}>
                    <div style={{ width: `${((currentQ + 1) / quizQuestions.length) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #f97316, #eab308)', borderRadius: '2px' }} />
                </div>
            </div>

            <h4 style={{ color: '#fbbf24', marginBottom: '1.25rem', fontSize: '1rem' }}>{q.question}</h4>

            {/* DRAG ORDER */}
            {q.type === 'drag-order' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    {/* Available Items */}
                    <div>
                        <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.5rem' }}>Drag items:</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {availableItems.map(item => (
                                <motion.div
                                    key={item.id}
                                    draggable
                                    onDragStart={() => handleDragStart(item.id)}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    style={{
                                        padding: '0.75rem',
                                        background: 'rgba(59,130,246,0.15)',
                                        border: '1px dashed #3b82f6',
                                        borderRadius: '10px',
                                        cursor: 'grab',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }}
                                >
                                    <span>{item.icon}</span>
                                    <span style={{ color: '#e2e8f0', fontSize: '0.85rem' }}>{item.label}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Drop Zone */}
                    <div
                        onDragOver={e => e.preventDefault()}
                        onDrop={handleDropToOrder}
                        style={{
                            padding: '1rem',
                            background: 'rgba(34,197,94,0.1)',
                            border: '2px dashed #22c55e',
                            borderRadius: '12px',
                            minHeight: '200px'
                        }}
                    >
                        <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.5rem' }}>Drop here in order:</p>
                        {userOrder.length === 0 && (
                            <p style={{ color: '#64748b', textAlign: 'center', marginTop: '2rem', fontSize: '0.8rem' }}>Drop items here...</p>
                        )}
                        {userOrder.map((id, idx) => {
                            const item = q.items?.find(i => i.id === id);
                            return (
                                <motion.div
                                    key={id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    onClick={() => !showResult && removeFromOrder(id)}
                                    style={{
                                        padding: '0.6rem',
                                        background: showResult
                                            ? q.correctOrder?.[idx] === id ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'
                                            : 'rgba(30,41,59,0.6)',
                                        borderRadius: '8px',
                                        marginBottom: '0.4rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        cursor: showResult ? 'default' : 'pointer'
                                    }}
                                >
                                    <span style={{ color: '#94a3b8', fontSize: '0.75rem', width: '20px' }}>{idx + 1}.</span>
                                    <span>{item?.icon}</span>
                                    <span style={{ color: '#e2e8f0', fontSize: '0.8rem' }}>{item?.label}</span>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* FILL EQUATION */}
            {q.type === 'fill-equation' && q.equation && (
                <div style={{ padding: '1.5rem', background: 'rgba(139,92,246,0.1)', borderRadius: '16px', border: '1px solid rgba(139,92,246,0.3)' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                        {q.equation.parts.map((part, idx) => {
                            const blankIdx = q.equation!.blanks.indexOf(idx);
                            if (blankIdx !== -1) {
                                return (
                                    <input
                                        key={idx}
                                        value={blanks[blankIdx]}
                                        onChange={e => {
                                            const newBlanks = [...blanks];
                                            newBlanks[blankIdx] = e.target.value;
                                            setBlanks(newBlanks);
                                        }}
                                        disabled={showResult}
                                        placeholder="?"
                                        style={{
                                            width: '140px',
                                            padding: '0.5rem',
                                            background: showResult
                                                ? blanks[blankIdx].toLowerCase().includes(q.equation!.answers[blankIdx].toLowerCase().slice(0, 5))
                                                    ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'
                                                : 'rgba(30,41,59,0.8)',
                                            border: '1px solid #8b5cf6',
                                            borderRadius: '8px',
                                            color: '#e2e8f0',
                                            textAlign: 'center',
                                            fontSize: '0.85rem'
                                        }}
                                    />
                                );
                            }
                            return (
                                <span key={idx} style={{ color: part === '+' || part === '→' ? '#f59e0b' : '#e2e8f0', fontSize: part === '→' ? '1.5rem' : '0.9rem', fontWeight: 500 }}>
                                    {part}
                                </span>
                            );
                        })}
                    </div>
                    {showResult && (
                        <div style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.85rem', color: '#a78bfa' }}>
                            Answer: {q.equation.answers.join(' & ')}
                        </div>
                    )}
                </div>
            )}

            {/* DRAG MATCH */}
            {q.type === 'drag-match' && q.pairs && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    <div>
                        <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.5rem' }}>Functional Groups:</p>
                        {q.pairs.map((p, idx) => (
                            <div key={idx} style={{ padding: '0.75rem', background: 'rgba(59,130,246,0.15)', borderRadius: '10px', marginBottom: '0.5rem' }}>
                                <span style={{ color: '#60a5fa', fontWeight: 600, fontSize: '0.9rem' }}>{p.left}</span>
                                {matches[p.left] && (
                                    <div style={{ marginTop: '0.5rem', padding: '0.4rem', background: showResult ? (matches[p.left] === p.right ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)') : 'rgba(30,41,59,0.6)', borderRadius: '6px', fontSize: '0.8rem', color: '#e2e8f0' }}>
                                        → {matches[p.left]}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <div>
                        <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.5rem' }}>Effects (click to match):</p>
                        {q.pairs.map((p, idx) => {
                            const isUsed = Object.values(matches).includes(p.right);
                            return (
                                <motion.div
                                    key={idx}
                                    whileHover={!isUsed && !showResult ? { scale: 1.02 } : {}}
                                    onClick={() => {
                                        if (!showResult && !isUsed) {
                                            const unmatched = q.pairs!.find(pair => !matches[pair.left]);
                                            if (unmatched) setMatches({ ...matches, [unmatched.left]: p.right });
                                        }
                                    }}
                                    style={{
                                        padding: '0.75rem',
                                        background: isUsed ? 'rgba(30,41,59,0.3)' : 'rgba(34,197,94,0.15)',
                                        borderRadius: '10px',
                                        marginBottom: '0.5rem',
                                        cursor: isUsed || showResult ? 'default' : 'pointer',
                                        opacity: isUsed ? 0.5 : 1
                                    }}
                                >
                                    <span style={{ color: '#4ade80', fontSize: '0.85rem' }}>{p.right}</span>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Check / Next buttons */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem', gap: '1rem' }}>
                {!showResult ? (
                    <button onClick={checkAnswer} style={{ padding: '0.75rem 1.5rem', background: 'linear-gradient(135deg, #f97316, #ea580c)', border: 'none', borderRadius: '10px', color: 'white', fontWeight: 600, cursor: 'pointer' }}>
                        Check Answer ✓
                    </button>
                ) : (
                    <button onClick={nextQuestion} style={{ padding: '0.75rem 1.5rem', background: 'linear-gradient(135deg, #22c55e, #16a34a)', border: 'none', borderRadius: '10px', color: 'white', fontWeight: 600, cursor: 'pointer' }}>
                        {currentQ < quizQuestions.length - 1 ? 'Next Challenge →' : 'See Results'}
                    </button>
                )}
            </div>
        </div>
    );
}
