'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface PatientCase {
    id: number;
    patientInfo: string;
    symptom: string;
    urineColor: string;
    urineColorHex: string;
    correctDrug: string;
    drugs: {
        name: string;
        structure: string;
        chromophore: string;
        isCorrect: boolean;
    }[];
    explanation: string;
}

const CASES: PatientCase[] = [
    {
        id: 1,
        patientInfo: 'A 45-year-old patient on TB treatment',
        symptom: 'Reports alarming red-orange coloring in urine, tears, and sweat',
        urineColor: 'Red-Orange',
        urineColorHex: '#dc2626',
        correctDrug: 'Rifampicin',
        drugs: [
            {
                name: 'Rifampicin',
                structure: '🔴 Naphthoquinone System',
                chromophore: 'Extended conjugated aromatic rings',
                isCorrect: true
            },
            {
                name: 'Isoniazid',
                structure: '⚪ Pyridine Ring',
                chromophore: 'Small aromatic system - colorless',
                isCorrect: false
            },
            {
                name: 'Ethambutol',
                structure: '⚪ No Aromatic Rings',
                chromophore: 'Aliphatic structure - no color',
                isCorrect: false
            }
        ],
        explanation: 'Rifampicin has a massive naphthoquinone conjugated system that absorbs blue-green light, making all body fluids appear red-orange. This is used clinically as a compliance marker!'
    },
    {
        id: 2,
        patientInfo: 'A 28-year-old female with UTI symptoms',
        symptom: 'Started new medication and noticed bright neon orange urine',
        urineColor: 'Neon Orange',
        urineColorHex: '#ea580c',
        correctDrug: 'Phenazopyridine',
        drugs: [
            {
                name: 'Nitrofurantoin',
                structure: '🟤 Nitrofuran Ring',
                chromophore: 'Yellow tint, not bright orange',
                isCorrect: false
            },
            {
                name: 'Phenazopyridine',
                structure: '🟠 Azo Group (N=N)',
                chromophore: 'Extended π-system through N=N bond',
                isCorrect: true
            },
            {
                name: 'Trimethoprim',
                structure: '⚪ Pyrimidine Ring',
                chromophore: 'Minimal conjugation - colorless',
                isCorrect: false
            }
        ],
        explanation: 'Phenazopyridine is essentially an azo dye! The N=N bond bridges aromatic rings, creating an extended electron pathway that produces that distinctive "neon" orange color.'
    },
    {
        id: 3,
        patientInfo: 'A health-conscious 35-year-old taking supplements',
        symptom: 'Noticed fluorescent yellow urine that seems to glow',
        urineColor: 'Fluorescent Yellow',
        urineColorHex: '#eab308',
        correctDrug: 'Riboflavin (Vitamin B2)',
        drugs: [
            {
                name: 'Vitamin C',
                structure: '⚪ Lactone Ring',
                chromophore: 'Small molecule - colorless',
                isCorrect: false
            },
            {
                name: 'Riboflavin (B2)',
                structure: '🟡 Isoalloxazine System',
                chromophore: 'Tricyclic aromatic - fluorescent!',
                isCorrect: true
            },
            {
                name: 'Vitamin B12',
                structure: '🔴 Corrin Ring + Cobalt',
                chromophore: 'Red but not fluorescent',
                isCorrect: false
            }
        ],
        explanation: 'Riboflavin has a conjugated isoalloxazine ring system that exhibits FLUORESCENCE - it absorbs invisible UV light and re-emits it as visible yellow light, creating that glowing effect!'
    }
];

export default function ClinicalDetectiveGame() {
    const [currentCase, setCurrentCase] = useState(0);
    const [selectedDrug, setSelectedDrug] = useState<string | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [gameComplete, setGameComplete] = useState(false);

    const activeCase = CASES[currentCase];

    const handleDrugSelect = (drugName: string) => {
        setSelectedDrug(drugName);
    };

    const handleSubmit = () => {
        if (!selectedDrug) return;

        const isCorrect = activeCase.drugs.find(d => d.name === selectedDrug)?.isCorrect;
        if (isCorrect) {
            setScore(score + 1);
        }
        setShowResult(true);
    };

    const handleNext = () => {
        if (currentCase < CASES.length - 1) {
            setCurrentCase(currentCase + 1);
            setSelectedDrug(null);
            setShowResult(false);
        } else {
            setGameComplete(true);
        }
    };

    const handleRestart = () => {
        setCurrentCase(0);
        setSelectedDrug(null);
        setShowResult(false);
        setScore(0);
        setGameComplete(false);
    };

    if (gameComplete) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                    padding: '3rem',
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)',
                    borderRadius: '24px',
                    border: '1px solid rgba(34, 197, 94, 0.3)'
                }}
            >
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🏆</div>
                <h2 style={{ color: '#22c55e', fontSize: '2rem', margin: '0 0 0.5rem' }}>
                    Investigation Complete!
                </h2>
                <p style={{ color: '#94a3b8', fontSize: '1.2rem', marginBottom: '1.5rem' }}>
                    You solved <strong style={{ color: '#22c55e' }}>{score}/{CASES.length}</strong> cases correctly
                </p>

                {score === CASES.length ? (
                    <p style={{ color: '#fbbf24', fontSize: '1rem' }}>
                        ⭐ Perfect Score! You're a Clinical Color Expert! ⭐
                    </p>
                ) : score >= CASES.length / 2 ? (
                    <p style={{ color: '#60a5fa', fontSize: '1rem' }}>
                        Great job! Keep studying those chromophores!
                    </p>
                ) : (
                    <p style={{ color: '#f87171', fontSize: '1rem' }}>
                        Review the drug structures and try again!
                    </p>
                )}

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleRestart}
                    style={{
                        marginTop: '1.5rem',
                        padding: '0.75rem 2rem',
                        background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
                        border: 'none',
                        borderRadius: '12px',
                        color: 'white',
                        fontSize: '1rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                    }}
                >
                    🔄 Play Again
                </motion.button>
            </motion.div>
        );
    }

    return (
        <div style={{ padding: '1rem 0' }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{
                    fontSize: '1.6rem',
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #f472b6 0%, #818cf8 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '0.25rem'
                }}>
                    🔬 The Clinical Detective
                </h2>
                <p style={{ color: '#64748b', fontSize: '0.85rem' }}>
                    Case {currentCase + 1} of {CASES.length} | Score: {score}
                </p>
            </div>

            {/* Patient Case Card */}
            <motion.div
                key={activeCase.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: '16px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    padding: '1.5rem',
                    marginBottom: '1.5rem'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '12px',
                        background: `linear-gradient(135deg, ${activeCase.urineColorHex}40 0%, ${activeCase.urineColorHex}10 100%)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem',
                        flexShrink: 0
                    }}>
                        🧪
                    </div>
                    <div style={{ flex: 1 }}>
                        <h3 style={{ margin: '0 0 0.5rem', color: 'white', fontSize: '1rem' }}>
                            Patient Case
                        </h3>
                        <p style={{ margin: '0 0 0.75rem', color: '#cbd5e1', fontSize: '0.9rem' }}>
                            {activeCase.patientInfo}
                        </p>
                        <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.85rem' }}>
                            <strong>Symptom:</strong> {activeCase.symptom}
                        </p>
                    </div>
                </div>

                {/* Urine Sample */}
                <div style={{
                    marginTop: '1rem',
                    padding: '1rem',
                    background: 'rgba(0,0,0,0.3)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                }}>
                    <div style={{
                        width: '40px',
                        height: '60px',
                        background: `linear-gradient(180deg, ${activeCase.urineColorHex} 0%, ${activeCase.urineColorHex}80 100%)`,
                        borderRadius: '8px 8px 20px 20px',
                        boxShadow: `0 0 20px ${activeCase.urineColorHex}50`
                    }} />
                    <div>
                        <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase' }}>
                            Observed Urine Color
                        </div>
                        <div style={{ fontSize: '1.1rem', color: activeCase.urineColorHex, fontWeight: 700 }}>
                            {activeCase.urineColor}
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Drug Choices */}
            <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.75rem' }}>
                    🔍 Which drug is causing this color change?
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {activeCase.drugs.map((drug) => (
                        <motion.button
                            key={drug.name}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => !showResult && handleDrugSelect(drug.name)}
                            disabled={showResult}
                            style={{
                                padding: '1rem',
                                background: selectedDrug === drug.name
                                    ? 'rgba(139, 92, 246, 0.2)'
                                    : 'rgba(255, 255, 255, 0.03)',
                                border: selectedDrug === drug.name
                                    ? '2px solid #8b5cf6'
                                    : '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '12px',
                                cursor: showResult ? 'default' : 'pointer',
                                textAlign: 'left',
                                transition: 'all 0.2s',
                                ...(showResult && drug.isCorrect && {
                                    background: 'rgba(34, 197, 94, 0.2)',
                                    borderColor: '#22c55e'
                                }),
                                ...(showResult && selectedDrug === drug.name && !drug.isCorrect && {
                                    background: 'rgba(239, 68, 68, 0.2)',
                                    borderColor: '#ef4444'
                                })
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <div style={{ color: 'white', fontWeight: 600, fontSize: '0.95rem' }}>
                                        {drug.name}
                                    </div>
                                    <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginTop: '2px' }}>
                                        {drug.structure}
                                    </div>
                                </div>
                                {showResult && (
                                    <span style={{ fontSize: '1.2rem' }}>
                                        {drug.isCorrect ? '✅' : (selectedDrug === drug.name ? '❌' : '')}
                                    </span>
                                )}
                            </div>
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Result Explanation */}
            <AnimatePresence>
                {showResult && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{
                            padding: '1.25rem',
                            background: activeCase.drugs.find(d => d.name === selectedDrug)?.isCorrect
                                ? 'rgba(34, 197, 94, 0.1)'
                                : 'rgba(239, 68, 68, 0.1)',
                            borderRadius: '12px',
                            border: `1px solid ${activeCase.drugs.find(d => d.name === selectedDrug)?.isCorrect ? '#22c55e' : '#ef4444'}30`,
                            marginBottom: '1.5rem'
                        }}
                    >
                        <h4 style={{
                            margin: '0 0 0.5rem',
                            color: activeCase.drugs.find(d => d.name === selectedDrug)?.isCorrect ? '#22c55e' : '#ef4444'
                        }}>
                            {activeCase.drugs.find(d => d.name === selectedDrug)?.isCorrect ? '✅ Correct!' : '❌ Not quite!'}
                        </h4>
                        <p style={{ margin: 0, color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.6 }}>
                            {activeCase.explanation}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
                {!showResult ? (
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSubmit}
                        disabled={!selectedDrug}
                        style={{
                            flex: 1,
                            padding: '0.75rem',
                            background: selectedDrug
                                ? 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)'
                                : 'rgba(255,255,255,0.1)',
                            border: 'none',
                            borderRadius: '12px',
                            color: selectedDrug ? 'white' : '#64748b',
                            fontSize: '0.95rem',
                            fontWeight: 600,
                            cursor: selectedDrug ? 'pointer' : 'not-allowed'
                        }}
                    >
                        Submit Answer
                    </motion.button>
                ) : (
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleNext}
                        style={{
                            flex: 1,
                            padding: '0.75rem',
                            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                            border: 'none',
                            borderRadius: '12px',
                            color: 'white',
                            fontSize: '0.95rem',
                            fontWeight: 600,
                            cursor: 'pointer'
                        }}
                    >
                        {currentCase < CASES.length - 1 ? 'Next Case →' : 'See Results 🏆'}
                    </motion.button>
                )}
            </div>
        </div>
    );
}
