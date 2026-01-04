'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface DockingLigand {
    id: string;
    name: string;
    smiles: string;
    stereochemistry: 'R' | 'S';
    bindingScore: number;
    fits: boolean;
    color: string;
    smell: string;
}

interface SmellChallenge {
    id: string;
    name: string;
    functionalGroups: string[];
    correctSmell: string;
    options: { id: string; label: string; emoji: string }[];
    explanation: string;
}

interface BreathMarker {
    name: string;
    value: number;
    normal: [number, number];
    unit: string;
}

interface PatientCase {
    id: string;
    markers: BreathMarker[];
    correctDiagnosis: string;
    options: string[];
    explanation: string;
}

// ============================================================================
// DATA
// ============================================================================

const DOCKING_LIGANDS: DockingLigand[] = [
    {
        id: 'r-limonene',
        name: '(R)-Limonene',
        smiles: 'CC1=CCC(CC1)C(=C)C',
        stereochemistry: 'R',
        bindingScore: -8.4,
        fits: true,
        color: '#f97316',
        smell: 'Orange 🍊'
    },
    {
        id: 's-limonene',
        name: '(S)-Limonene',
        smiles: 'CC1=CCC(CC1)C(=C)C',
        stereochemistry: 'S',
        bindingScore: -3.2,
        fits: false,
        color: '#eab308',
        smell: 'Lemon 🍋'
    }
];

const SMELL_CHALLENGES: SmellChallenge[] = [
    {
        id: 'thiol',
        name: 'Mystery Molecule 1',
        functionalGroups: ['-SH (Thiol)', 'Alkyl chain'],
        correctSmell: 'rotten',
        options: [
            { id: 'floral', label: 'Floral', emoji: '🌹' },
            { id: 'citrus', label: 'Citrus', emoji: '🍋' },
            { id: 'rotten', label: 'Rotten Eggs', emoji: '🥚' },
            { id: 'pine', label: 'Pine', emoji: '🌲' }
        ],
        explanation: 'Thiol groups (-SH) are notorious for their pungent, sulfurous smell resembling rotten eggs. This is why natural gas companies add thiols for leak detection!'
    },
    {
        id: 'ester',
        name: 'Mystery Molecule 2',
        functionalGroups: ['-COO- (Ester)', 'Aromatic ring'],
        correctSmell: 'fruity',
        options: [
            { id: 'fruity', label: 'Fruity', emoji: '🍓' },
            { id: 'burnt', label: 'Burnt', emoji: '🔥' },
            { id: 'fishy', label: 'Fishy', emoji: '🐟' },
            { id: 'minty', label: 'Minty', emoji: '🌿' }
        ],
        explanation: 'Esters are responsible for many fruity aromas. Ethyl butyrate smells like pineapple, methyl salicylate like wintergreen!'
    },
    {
        id: 'amine',
        name: 'Mystery Molecule 3',
        functionalGroups: ['-NH₂ (Amine)', 'Low molecular weight'],
        correctSmell: 'fishy',
        options: [
            { id: 'sweet', label: 'Sweet', emoji: '🍬' },
            { id: 'fishy', label: 'Fishy', emoji: '🐟' },
            { id: 'floral', label: 'Floral', emoji: '🌸' },
            { id: 'spicy', label: 'Spicy', emoji: '🌶️' }
        ],
        explanation: 'Low molecular weight amines have a characteristic fishy smell. Trimethylamine (TMA) is the compound responsible for the smell of rotting fish!'
    }
];

const PATIENT_CASES: PatientCase[] = [
    {
        id: 'dka',
        markers: [
            { name: 'Acetone', value: 850, normal: [10, 100], unit: 'ppb' },
            { name: 'Ethanol', value: 15, normal: [5, 50], unit: 'ppb' },
            { name: 'Isoprene', value: 120, normal: [50, 200], unit: 'ppb' }
        ],
        correctDiagnosis: 'Diabetic Ketoacidosis',
        options: ['Diabetic Ketoacidosis', 'Lung Cancer', 'Liver Disease', 'Healthy'],
        explanation: 'Extremely high acetone levels (8.5x normal) indicate ketone body accumulation, classic for diabetic ketoacidosis. Patients often have "fruity breath".'
    },
    {
        id: 'lung',
        markers: [
            { name: 'Acetaldehyde', value: 45, normal: [1, 10], unit: 'ppb' },
            { name: '1-Butanol', value: 28, normal: [2, 8], unit: 'ppb' },
            { name: 'Isoprene', value: 380, normal: [50, 200], unit: 'ppb' }
        ],
        correctDiagnosis: 'Lung Cancer',
        options: ['Diabetic Ketoacidosis', 'Lung Cancer', 'Liver Disease', 'Healthy'],
        explanation: 'Elevated acetaldehyde, 1-butanol, and isoprene are biomarkers associated with lung cancer. E-nose devices can detect these VOC patterns with 85%+ accuracy.'
    }
];

// ============================================================================
// MOLECULAR DOCKING SIMULATOR
// ============================================================================

function MolecularDockingSimulator() {
    const [selectedLigand, setSelectedLigand] = useState<DockingLigand | null>(null);
    const [isDocking, setIsDocking] = useState(false);
    const [dockingComplete, setDockingComplete] = useState(false);

    const handleDock = (ligand: DockingLigand) => {
        setSelectedLigand(ligand);
        setIsDocking(true);
        setDockingComplete(false);

        setTimeout(() => {
            setIsDocking(false);
            setDockingComplete(true);
        }, 2000);
    };

    const resetDocking = () => {
        setSelectedLigand(null);
        setDockingComplete(false);
    };

    return (
        <div style={{ padding: '1.5rem' }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1.5rem'
            }}>
                <span style={{ fontSize: '1.5rem' }}>🎯</span>
                <div>
                    <h4 style={{ color: '#e2e8f0', margin: 0 }}>GPCR Molecular Docking</h4>
                    <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.85rem' }}>
                        Simulate ligand-receptor binding for olfactory GPCRs
                    </p>
                </div>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.5rem'
            }}>
                {/* Receptor Visualization */}
                <div style={{
                    background: 'rgba(0, 0, 0, 0.4)',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                    <h5 style={{ color: '#e2e8f0', marginBottom: '1rem' }}>Olfactory Receptor (GPCR)</h5>

                    {/* SVG Receptor Pocket */}
                    <svg viewBox="0 0 300 200" style={{ width: '100%', height: '180px' }}>
                        <defs>
                            <linearGradient id="pocketGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#1e40af" />
                                <stop offset="100%" stopColor="#7c3aed" />
                            </linearGradient>
                            <filter id="dockGlow">
                                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                <feMerge>
                                    <feMergeNode in="coloredBlur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>

                        {/* Receptor pocket */}
                        <path
                            d="M50 150 Q80 180 150 180 Q220 180 250 150 L250 80 Q220 30 150 30 Q80 30 50 80 Z"
                            fill="url(#pocketGrad)"
                            stroke="#3b82f6"
                            strokeWidth="2"
                            opacity="0.7"
                        />

                        {/* Binding site */}
                        <ellipse cx="150" cy="110" rx="50" ry="40" fill="rgba(0,0,0,0.5)" stroke="#64748b" strokeWidth="1" strokeDasharray="4,2" />
                        <text x="150" y="115" textAnchor="middle" fill="#94a3b8" fontSize="12">Binding Pocket</text>

                        {/* Ligand visualization */}
                        {selectedLigand && (
                            <motion.g
                                initial={{ x: -50, opacity: 0 }}
                                animate={{
                                    x: isDocking ? 0 : (dockingComplete && selectedLigand.fits ? 0 : 20),
                                    opacity: 1,
                                    scale: isDocking ? [1, 1.1, 1] : 1
                                }}
                                transition={{ duration: isDocking ? 2 : 0.5 }}
                            >
                                <circle
                                    cx="150"
                                    cy="110"
                                    r="30"
                                    fill={selectedLigand.color}
                                    opacity={0.8}
                                    filter={dockingComplete && selectedLigand.fits ? "url(#dockGlow)" : "none"}
                                />
                                <text x="150" y="115" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
                                    {selectedLigand.stereochemistry}
                                </text>
                            </motion.g>
                        )}

                        {/* Status indicator */}
                        {dockingComplete && (
                            <motion.text
                                x="150"
                                y="190"
                                textAnchor="middle"
                                fill={selectedLigand?.fits ? '#10b981' : '#ef4444'}
                                fontSize="14"
                                fontWeight="bold"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                {selectedLigand?.fits ? '✓ FITS - Strong Binding' : '✗ CLASH - Poor Binding'}
                            </motion.text>
                        )}
                    </svg>

                    {/* Docking results */}
                    {dockingComplete && selectedLigand && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{
                                marginTop: '1rem',
                                padding: '1rem',
                                background: selectedLigand.fits ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                                borderRadius: '12px',
                                border: `1px solid ${selectedLigand.fits ? '#10b981' : '#ef4444'}`
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <span style={{ color: '#94a3b8' }}>Binding Score:</span>
                                <span style={{ color: selectedLigand.fits ? '#10b981' : '#ef4444', fontWeight: 700 }}>
                                    {selectedLigand.bindingScore} kcal/mol
                                </span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#94a3b8' }}>Perceived Smell:</span>
                                <span style={{ color: selectedLigand.color, fontWeight: 600 }}>{selectedLigand.smell}</span>
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Ligand Selection */}
                <div style={{
                    background: 'rgba(0, 0, 0, 0.4)',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                    <h5 style={{ color: '#e2e8f0', marginBottom: '1rem' }}>Select Ligand (Enantiomers)</h5>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {DOCKING_LIGANDS.map(ligand => (
                            <motion.button
                                key={ligand.id}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleDock(ligand)}
                                disabled={isDocking}
                                style={{
                                    padding: '1rem',
                                    background: selectedLigand?.id === ligand.id
                                        ? `${ligand.color}30`
                                        : 'rgba(255, 255, 255, 0.05)',
                                    border: `2px solid ${selectedLigand?.id === ligand.id ? ligand.color : 'rgba(255, 255, 255, 0.1)'}`,
                                    borderRadius: '12px',
                                    cursor: isDocking ? 'wait' : 'pointer',
                                    textAlign: 'left'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div>
                                        <div style={{ color: ligand.color, fontWeight: 700, fontSize: '1rem' }}>
                                            {ligand.name}
                                        </div>
                                        <div style={{ color: '#64748b', fontSize: '0.8rem' }}>
                                            Smells like: {ligand.smell}
                                        </div>
                                    </div>
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        background: `${ligand.color}40`,
                                        border: `2px solid ${ligand.color}`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: ligand.color,
                                        fontWeight: 700
                                    }}>
                                        {ligand.stereochemistry}
                                    </div>
                                </div>
                            </motion.button>
                        ))}
                    </div>

                    {dockingComplete && (
                        <button
                            onClick={resetDocking}
                            style={{
                                marginTop: '1rem',
                                width: '100%',
                                padding: '0.75rem',
                                background: 'rgba(255, 255, 255, 0.1)',
                                border: 'none',
                                borderRadius: '8px',
                                color: '#94a3b8',
                                cursor: 'pointer'
                            }}
                        >
                            🔄 Reset Docking
                        </button>
                    )}

                    {/* Explanation */}
                    <div style={{
                        marginTop: '1rem',
                        padding: '1rem',
                        background: 'rgba(139, 92, 246, 0.1)',
                        borderRadius: '12px',
                        border: '1px solid rgba(139, 92, 246, 0.3)'
                    }}>
                        <div style={{ color: '#a78bfa', fontWeight: 600, marginBottom: '0.5rem' }}>
                            💡 Key Insight
                        </div>
                        <div style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.5 }}>
                            Same molecular formula, different 3D shape = different smell! The receptor pocket is chiral,
                            so it distinguishes between R and S enantiomers. This is why ~40% of drugs target GPCRs.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ============================================================================
// SMELL PREDICTION CHALLENGE
// ============================================================================

function SmellPredictionChallenge() {
    const [currentChallenge, setCurrentChallenge] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);

    const challenge = SMELL_CHALLENGES[currentChallenge];

    const handleAnswer = (answerId: string) => {
        setSelectedAnswer(answerId);
        setShowResult(true);
        if (answerId === challenge.correctSmell) {
            setScore(prev => prev + 1);
        }
    };

    const nextChallenge = () => {
        if (currentChallenge < SMELL_CHALLENGES.length - 1) {
            setCurrentChallenge(prev => prev + 1);
            setSelectedAnswer(null);
            setShowResult(false);
        }
    };

    const resetChallenge = () => {
        setCurrentChallenge(0);
        setSelectedAnswer(null);
        setShowResult(false);
        setScore(0);
    };

    return (
        <div style={{ padding: '1.5rem' }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1.5rem',
                flexWrap: 'wrap',
                gap: '1rem'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>🔮</span>
                    <div>
                        <h4 style={{ color: '#e2e8f0', margin: 0 }}>AI Smell Prediction</h4>
                        <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.85rem' }}>
                            Predict odors from functional groups
                        </p>
                    </div>
                </div>
                <div style={{
                    padding: '0.5rem 1rem',
                    background: 'rgba(16, 185, 129, 0.2)',
                    borderRadius: '20px',
                    color: '#10b981',
                    fontWeight: 600
                }}>
                    Score: {score}/{SMELL_CHALLENGES.length}
                </div>
            </div>

            <div style={{
                background: 'rgba(0, 0, 0, 0.4)',
                borderRadius: '16px',
                padding: '1.5rem',
                border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
                {/* Progress */}
                <div style={{
                    display: 'flex',
                    gap: '0.5rem',
                    marginBottom: '1.5rem'
                }}>
                    {SMELL_CHALLENGES.map((_, idx) => (
                        <div
                            key={idx}
                            style={{
                                flex: 1,
                                height: '4px',
                                borderRadius: '2px',
                                background: idx <= currentChallenge ? '#8b5cf6' : 'rgba(255,255,255,0.1)'
                            }}
                        />
                    ))}
                </div>

                {/* Challenge */}
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    <h5 style={{ color: '#e2e8f0', marginBottom: '0.5rem' }}>{challenge.name}</h5>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '0.75rem',
                        flexWrap: 'wrap',
                        marginBottom: '1rem'
                    }}>
                        {challenge.functionalGroups.map((group, idx) => (
                            <span
                                key={idx}
                                style={{
                                    padding: '0.5rem 1rem',
                                    background: 'rgba(139, 92, 246, 0.2)',
                                    border: '1px solid #8b5cf6',
                                    borderRadius: '8px',
                                    color: '#a78bfa',
                                    fontSize: '0.9rem',
                                    fontFamily: 'monospace'
                                }}
                            >
                                {group}
                            </span>
                        ))}
                    </div>
                    <p style={{ color: '#94a3b8', fontSize: '1rem' }}>
                        Based on these functional groups, what does this molecule smell like?
                    </p>
                </div>

                {/* Options */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '0.75rem',
                    marginBottom: '1.5rem'
                }}>
                    {challenge.options.map(option => {
                        const isCorrect = option.id === challenge.correctSmell;
                        const isSelected = selectedAnswer === option.id;

                        return (
                            <motion.button
                                key={option.id}
                                whileHover={!showResult ? { scale: 1.02 } : {}}
                                whileTap={!showResult ? { scale: 0.98 } : {}}
                                onClick={() => !showResult && handleAnswer(option.id)}
                                disabled={showResult}
                                style={{
                                    padding: '1rem',
                                    background: showResult
                                        ? isCorrect
                                            ? 'rgba(16, 185, 129, 0.2)'
                                            : isSelected
                                                ? 'rgba(239, 68, 68, 0.2)'
                                                : 'rgba(255, 255, 255, 0.05)'
                                        : 'rgba(255, 255, 255, 0.05)',
                                    border: `2px solid ${showResult
                                            ? isCorrect
                                                ? '#10b981'
                                                : isSelected
                                                    ? '#ef4444'
                                                    : 'rgba(255,255,255,0.1)'
                                            : 'rgba(255,255,255,0.1)'
                                        }`,
                                    borderRadius: '12px',
                                    cursor: showResult ? 'default' : 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                <span style={{ fontSize: '1.5rem' }}>{option.emoji}</span>
                                <span style={{
                                    color: showResult && isCorrect ? '#10b981' : '#e2e8f0',
                                    fontWeight: showResult && isCorrect ? 700 : 500
                                }}>
                                    {option.label}
                                </span>
                                {showResult && isCorrect && <span>✓</span>}
                            </motion.button>
                        );
                    })}
                </div>

                {/* Result */}
                <AnimatePresence>
                    {showResult && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{
                                padding: '1rem',
                                background: selectedAnswer === challenge.correctSmell
                                    ? 'rgba(16, 185, 129, 0.15)'
                                    : 'rgba(239, 68, 68, 0.15)',
                                borderRadius: '12px',
                                marginBottom: '1rem'
                            }}
                        >
                            <div style={{
                                color: selectedAnswer === challenge.correctSmell ? '#10b981' : '#ef4444',
                                fontWeight: 700,
                                marginBottom: '0.5rem'
                            }}>
                                {selectedAnswer === challenge.correctSmell ? '✓ Correct!' : '✗ Not quite!'}
                            </div>
                            <div style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.5 }}>
                                {challenge.explanation}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Navigation */}
                {showResult && (
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                        {currentChallenge < SMELL_CHALLENGES.length - 1 ? (
                            <button
                                onClick={nextChallenge}
                                style={{
                                    padding: '0.75rem 2rem',
                                    background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
                                    border: 'none',
                                    borderRadius: '12px',
                                    color: 'white',
                                    fontWeight: 600,
                                    cursor: 'pointer'
                                }}
                            >
                                Next Challenge →
                            </button>
                        ) : (
                            <button
                                onClick={resetChallenge}
                                style={{
                                    padding: '0.75rem 2rem',
                                    background: 'linear-gradient(135deg, #10b981, #059669)',
                                    border: 'none',
                                    borderRadius: '12px',
                                    color: 'white',
                                    fontWeight: 600,
                                    cursor: 'pointer'
                                }}
                            >
                                🔄 Play Again
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

// ============================================================================
// E-NOSE DIAGNOSIS
// ============================================================================

function ENoseDiagnosis() {
    const [currentCase, setCurrentCase] = useState(0);
    const [selectedDiagnosis, setSelectedDiagnosis] = useState<string | null>(null);
    const [showResult, setShowResult] = useState(false);

    const patientCase = PATIENT_CASES[currentCase];

    const handleDiagnose = (diagnosis: string) => {
        setSelectedDiagnosis(diagnosis);
        setShowResult(true);
    };

    const nextCase = () => {
        if (currentCase < PATIENT_CASES.length - 1) {
            setCurrentCase(prev => prev + 1);
            setSelectedDiagnosis(null);
            setShowResult(false);
        }
    };

    const getMarkerStatus = (marker: BreathMarker) => {
        if (marker.value < marker.normal[0]) return 'low';
        if (marker.value > marker.normal[1]) return 'high';
        return 'normal';
    };

    return (
        <div style={{ padding: '1.5rem' }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1.5rem'
            }}>
                <span style={{ fontSize: '1.5rem' }}>👃</span>
                <div>
                    <h4 style={{ color: '#e2e8f0', margin: 0 }}>E-Nose Disease Diagnosis</h4>
                    <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.85rem' }}>
                        Analyze breath VOCs to diagnose patients
                    </p>
                </div>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1.5rem'
            }}>
                {/* Breath Analysis */}
                <div style={{
                    background: 'rgba(0, 0, 0, 0.4)',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                    <h5 style={{ color: '#e2e8f0', marginBottom: '1rem' }}>
                        Patient Breath Analysis
                    </h5>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {patientCase.markers.map(marker => {
                            const status = getMarkerStatus(marker);
                            const percentage = Math.min(100, (marker.value / (marker.normal[1] * 1.5)) * 100);

                            return (
                                <div key={marker.name}>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        marginBottom: '0.25rem'
                                    }}>
                                        <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                                            {marker.name}
                                        </span>
                                        <span style={{
                                            color: status === 'high' ? '#ef4444' : status === 'low' ? '#3b82f6' : '#10b981',
                                            fontWeight: 600,
                                            fontSize: '0.9rem'
                                        }}>
                                            {marker.value} {marker.unit}
                                            {status === 'high' && ' ⚠️ HIGH'}
                                            {status === 'low' && ' LOW'}
                                        </span>
                                    </div>
                                    <div style={{
                                        height: '8px',
                                        background: 'rgba(255,255,255,0.1)',
                                        borderRadius: '4px',
                                        overflow: 'hidden',
                                        position: 'relative'
                                    }}>
                                        {/* Normal range indicator */}
                                        <div style={{
                                            position: 'absolute',
                                            left: `${(marker.normal[0] / (marker.normal[1] * 1.5)) * 100}%`,
                                            width: `${((marker.normal[1] - marker.normal[0]) / (marker.normal[1] * 1.5)) * 100}%`,
                                            height: '100%',
                                            background: 'rgba(16, 185, 129, 0.3)'
                                        }} />
                                        {/* Actual value */}
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${percentage}%` }}
                                            style={{
                                                position: 'absolute',
                                                left: 0,
                                                height: '100%',
                                                background: status === 'high' ? '#ef4444' : status === 'low' ? '#3b82f6' : '#10b981',
                                                borderRadius: '4px'
                                            }}
                                        />
                                    </div>
                                    <div style={{
                                        fontSize: '0.7rem',
                                        color: '#64748b',
                                        marginTop: '0.25rem'
                                    }}>
                                        Normal: {marker.normal[0]}-{marker.normal[1]} {marker.unit}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Diagnosis */}
                <div style={{
                    background: 'rgba(0, 0, 0, 0.4)',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                    <h5 style={{ color: '#e2e8f0', marginBottom: '1rem' }}>
                        Your Diagnosis
                    </h5>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {patientCase.options.map(option => {
                            const isCorrect = option === patientCase.correctDiagnosis;
                            const isSelected = selectedDiagnosis === option;

                            return (
                                <motion.button
                                    key={option}
                                    whileHover={!showResult ? { scale: 1.02 } : {}}
                                    whileTap={!showResult ? { scale: 0.98 } : {}}
                                    onClick={() => !showResult && handleDiagnose(option)}
                                    disabled={showResult}
                                    style={{
                                        padding: '1rem',
                                        background: showResult
                                            ? isCorrect
                                                ? 'rgba(16, 185, 129, 0.2)'
                                                : isSelected
                                                    ? 'rgba(239, 68, 68, 0.2)'
                                                    : 'rgba(255, 255, 255, 0.05)'
                                            : 'rgba(255, 255, 255, 0.05)',
                                        border: `2px solid ${showResult
                                                ? isCorrect
                                                    ? '#10b981'
                                                    : isSelected
                                                        ? '#ef4444'
                                                        : 'rgba(255,255,255,0.1)'
                                                : 'rgba(255,255,255,0.1)'
                                            }`,
                                        borderRadius: '12px',
                                        cursor: showResult ? 'default' : 'pointer',
                                        color: showResult && isCorrect ? '#10b981' : '#e2e8f0',
                                        fontWeight: showResult && isCorrect ? 700 : 500,
                                        textAlign: 'left'
                                    }}
                                >
                                    {option}
                                    {showResult && isCorrect && ' ✓'}
                                </motion.button>
                            );
                        })}
                    </div>

                    {/* Result */}
                    {showResult && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{
                                marginTop: '1rem',
                                padding: '1rem',
                                background: selectedDiagnosis === patientCase.correctDiagnosis
                                    ? 'rgba(16, 185, 129, 0.15)'
                                    : 'rgba(239, 68, 68, 0.15)',
                                borderRadius: '12px'
                            }}
                        >
                            <div style={{
                                color: selectedDiagnosis === patientCase.correctDiagnosis ? '#10b981' : '#ef4444',
                                fontWeight: 700,
                                marginBottom: '0.5rem'
                            }}>
                                {selectedDiagnosis === patientCase.correctDiagnosis ? '✓ Correct Diagnosis!' : '✗ Incorrect'}
                            </div>
                            <div style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.5 }}>
                                {patientCase.explanation}
                            </div>
                        </motion.div>
                    )}

                    {showResult && currentCase < PATIENT_CASES.length - 1 && (
                        <button
                            onClick={nextCase}
                            style={{
                                marginTop: '1rem',
                                width: '100%',
                                padding: '0.75rem',
                                background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
                                border: 'none',
                                borderRadius: '12px',
                                color: 'white',
                                fontWeight: 600,
                                cursor: 'pointer'
                            }}
                        >
                            Next Patient →
                        </button>
                    )}
                </div>
            </div>

            {/* Info box */}
            <div style={{
                marginTop: '1.5rem',
                padding: '1rem',
                background: 'rgba(59, 130, 246, 0.1)',
                borderRadius: '12px',
                border: '1px solid rgba(59, 130, 246, 0.3)'
            }}>
                <div style={{ color: '#60a5fa', fontWeight: 600, marginBottom: '0.5rem' }}>
                    🔬 Research Application
                </div>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.5 }}>
                    Electronic nose (E-Nose) devices can detect volatile organic compounds (VOCs) in breath
                    with 85%+ accuracy for certain diseases. This non-invasive diagnostic tool is being
                    developed for early cancer detection, diabetes monitoring, and infectious disease screening.
                </div>
            </div>
        </div>
    );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function AdvancedDrugDiscoveryLab() {
    const [activeTab, setActiveTab] = useState<'docking' | 'smell' | 'enose' | 'nz'>('docking');

    const tabs = [
        { id: 'docking', label: 'Molecular Docking', icon: '🎯' },
        { id: 'smell', label: 'AI Smell Predictor', icon: '🔮' },
        { id: 'enose', label: 'E-Nose Lab', icon: '👃' },
        { id: 'nz', label: 'NZ Natural Products', icon: '🌿' }
    ];

    return (
        <div style={{
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.98) 100%)',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            overflow: 'hidden'
        }}>
            {/* Header */}
            <div style={{
                padding: '1.5rem 2rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(59, 130, 246, 0.15) 100%)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '1.75rem' }}>🧬</span>
                    <div>
                        <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'white', margin: 0 }}>
                            Advanced Drug Discovery Lab
                        </h3>
                        <p style={{ color: 'var(--neutral-400)', margin: '0.25rem 0 0', fontSize: '0.9rem' }}>
                            PhD-level research simulations • From receptors to clinical diagnostics
                        </p>
                    </div>
                </div>
            </div>

            {/* Tab Navigation */}
            <div style={{
                display: 'flex',
                gap: '0.5rem',
                padding: '1rem 2rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                overflowX: 'auto'
            }}>
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as typeof activeTab)}
                        style={{
                            padding: '0.75rem 1.25rem',
                            background: activeTab === tab.id
                                ? 'linear-gradient(135deg, #8b5cf6, #6366f1)'
                                : 'rgba(255, 255, 255, 0.05)',
                            border: activeTab === tab.id ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '12px',
                            color: activeTab === tab.id ? 'white' : 'var(--neutral-400)',
                            fontSize: '0.9rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        <span>{tab.icon}</span>
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content */}
            <AnimatePresence mode="wait">
                {activeTab === 'docking' && (
                    <motion.div
                        key="docking"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <MolecularDockingSimulator />
                    </motion.div>
                )}

                {activeTab === 'smell' && (
                    <motion.div
                        key="smell"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <SmellPredictionChallenge />
                    </motion.div>
                )}

                {activeTab === 'enose' && (
                    <motion.div
                        key="enose"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <ENoseDiagnosis />
                    </motion.div>
                )}

                {activeTab === 'nz' && (
                    <motion.div
                        key="nz"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        style={{ padding: '1.5rem' }}
                    >
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            marginBottom: '1.5rem'
                        }}>
                            <span style={{ fontSize: '1.5rem' }}>🌿</span>
                            <div>
                                <h4 style={{ color: '#e2e8f0', margin: 0 }}>NZ Natural Products</h4>
                                <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.85rem' }}>
                                    Victoria University research focus
                                </p>
                            </div>
                        </div>

                        <div style={{
                            background: 'rgba(0, 0, 0, 0.4)',
                            borderRadius: '16px',
                            padding: '1.5rem',
                            border: '1px solid rgba(255, 255, 255, 0.1)'
                        }}>
                            <h5 style={{ color: '#10b981', marginBottom: '1rem' }}>
                                🍯 Manuka Honey Compounds
                            </h5>
                            <p style={{ color: '#94a3b8', lineHeight: 1.6, marginBottom: '1rem' }}>
                                New Zealand&apos;s Manuka honey contains unique bioactive compounds not found
                                elsewhere. The key compound, <strong style={{ color: '#10b981' }}>Methylglyoxal (MGO)</strong>,
                                has potent antibacterial properties being studied for wound healing and
                                anti-infective drug development.
                            </p>

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                gap: '1rem',
                                marginBottom: '1rem'
                            }}>
                                {[
                                    { name: 'Methylglyoxal', use: 'Antibacterial', color: '#10b981' },
                                    { name: 'Leptosperin', use: 'Authenticity marker', color: '#8b5cf6' },
                                    { name: 'DHA (Precursor)', use: 'MGO synthesis', color: '#f97316' }
                                ].map(compound => (
                                    <div
                                        key={compound.name}
                                        style={{
                                            padding: '1rem',
                                            background: `${compound.color}15`,
                                            borderRadius: '12px',
                                            border: `1px solid ${compound.color}40`
                                        }}
                                    >
                                        <div style={{ color: compound.color, fontWeight: 700 }}>{compound.name}</div>
                                        <div style={{ color: '#64748b', fontSize: '0.8rem' }}>{compound.use}</div>
                                    </div>
                                ))}
                            </div>

                            <div style={{
                                padding: '1rem',
                                background: 'rgba(59, 130, 246, 0.1)',
                                borderRadius: '12px',
                                border: '1px solid rgba(59, 130, 246, 0.3)'
                            }}>
                                <div style={{ color: '#60a5fa', fontWeight: 600, marginBottom: '0.5rem' }}>
                                    🎓 Research at Victoria University
                                </div>
                                <div style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.5 }}>
                                    VUW&apos;s Ferrier Research Institute focuses on carbohydrate chemistry and
                                    natural products. Their drug discovery programs explore New Zealand&apos;s
                                    unique biodiversity for novel therapeutic compounds.
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
