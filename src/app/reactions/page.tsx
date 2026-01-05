'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// ============================================================================
// MICHAEL ADDITION - Comprehensive Learning Page
// ============================================================================

type PhaseType = 'mechanism' | 'examples' | 'simulation' | 'clinical' | 'quiz';

interface QuizQuestion {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
}

// Donor and Acceptor Examples
const DONORS = [
    { name: 'Malonate Ester', structure: 'CH₂(CO₂R)₂', pKa: '~13', note: 'Classic active methylene' },
    { name: 'Nitroalkane', structure: 'R-CH₂-NO₂', pKa: '~10', note: 'Highly acidic α-H' },
    { name: 'β-Ketoester', structure: 'R-CO-CH₂-CO₂R', pKa: '~11', note: 'Acetoacetate type' },
    { name: '1,3-Diketone', structure: 'R-CO-CH₂-CO-R', pKa: '~9', note: 'Most acidic' },
    { name: 'Cyanoacetate', structure: 'NC-CH₂-CO₂R', pKa: '~9', note: 'Strong EWG stabilization' }
];

const ACCEPTORS = [
    { name: 'α,β-Unsaturated Ketone', structure: 'R-CO-CH=CH-R', example: 'Chalcone, MVK' },
    { name: 'α,β-Unsaturated Ester', structure: 'RO₂C-CH=CH-R', example: 'Methyl acrylate' },
    { name: 'α,β-Unsaturated Nitrile', structure: 'NC-CH=CH-R', example: 'Acrylonitrile' },
    { name: 'Nitroalkene', structure: 'R-CH=CH-NO₂', example: 'Nitrostyrene' },
    { name: 'Acrylamide', structure: 'H₂N-CO-CH=CH₂', example: 'Drug warheads (Ibrutinib!)' }
];

const QUIZ_QUESTIONS: QuizQuestion[] = [
    {
        question: 'In Michael Addition, the nucleophile attacks which carbon of the α,β-unsaturated system?',
        options: ['α-carbon (carbonyl carbon)', 'β-carbon (conjugated position)', 'Carbonyl oxygen', 'Any carbon in resonance'],
        correctIndex: 1,
        explanation: 'Michael Addition is 1,4-addition where the nucleophile attacks the β-carbon, which is electrophilic due to resonance withdrawal by the carbonyl.'
    },
    {
        question: 'Why is Ibrutinib classified as a Michael Acceptor drug?',
        options: [
            'It contains a carboxylic acid group',
            'Its acrylamide group reacts with Cys481 thiol via 1,4-addition',
            'It forms hydrogen bonds with the receptor',
            'It inhibits the enzyme reversibly'
        ],
        correctIndex: 1,
        explanation: 'Ibrutinib\'s acrylamide warhead (CH₂=CH-CO-NH-) accepts nucleophilic attack from the Cys481 thiol (-SH) via Michael Addition, forming an irreversible C-S bond.'
    },
    {
        question: 'Which condition favors Michael Addition over direct 1,2-addition to the carbonyl?',
        options: [
            'Strong, hard nucleophiles and low temperature',
            'Soft nucleophiles and thermodynamic control',
            'Protic solvents only',
            'High concentration of substrate'
        ],
        correctIndex: 1,
        explanation: 'Michael Addition is thermodynamically controlled and favored by soft nucleophiles (like carbanions and thiols) that prefer attacking the softer β-carbon.'
    },
    {
        question: 'What makes malonates excellent Michael donors?',
        options: [
            'They are strong acids',
            'The α-proton is acidic due to two flanking carbonyl groups',
            'They contain multiple hydroxyl groups',
            'They are highly lipophilic'
        ],
        correctIndex: 1,
        explanation: 'Malonates have pKa ~13 because the α-proton is flanked by two electron-withdrawing carbonyl groups, stabilizing the resulting carbanion through resonance.'
    },
    {
        question: 'In the mechanism of Michael Addition, what is the first intermediate formed?',
        options: [
            'Tetrahedral intermediate',
            'Enolate anion attacking β-carbon → resonance-stabilized enolate',
            'Carbocation',
            'Radical species'
        ],
        correctIndex: 1,
        explanation: 'The nucleophile (enolate) attacks the β-carbon, generating an enolate intermediate that is stabilized by resonance with the carbonyl group.'
    }
];

// Mechanism Step Data
const MECHANISM_STEPS = [
    {
        step: 1,
        title: 'Deprotonation',
        description: 'Base removes acidic α-proton from active methylene compound',
        visual: 'donor',
        arrow: 'Resonance-stabilized carbanion (enolate) forms'
    },
    {
        step: 2,
        title: '1,4-Attack',
        description: 'Nucleophilic carbanion attacks electrophilic β-carbon',
        visual: 'attack',
        arrow: 'C-C bond formation at β-position'
    },
    {
        step: 3,
        title: 'Enolate Intermediate',
        description: 'New enolate intermediate is stabilized by carbonyl',
        visual: 'intermediate',
        arrow: 'Negative charge delocalized to oxygen'
    },
    {
        step: 4,
        title: 'Protonation',
        description: 'Enolate is protonated to give final product',
        visual: 'product',
        arrow: 'Michael adduct formed!'
    }
];

export default function ReactionsPage() {
    const [activePhase, setActivePhase] = useState<PhaseType>('mechanism');
    const [mechanismStep, setMechanismStep] = useState(0);
    const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
    const [showQuizResults, setShowQuizResults] = useState(false);
    const [simulationStep, setSimulationStep] = useState(0);

    const phases = [
        { id: 'mechanism' as const, label: 'Mechanism', icon: '⚙️' },
        { id: 'examples' as const, label: 'Donors & Acceptors', icon: '🧪' },
        { id: 'simulation' as const, label: 'Simulation', icon: '🎮' },
        { id: 'clinical' as const, label: 'Clinical Application', icon: '💊' },
        { id: 'quiz' as const, label: 'Quiz', icon: '✅' }
    ];

    const calculateScore = () => {
        let correct = 0;
        QUIZ_QUESTIONS.forEach((q, i) => {
            if (quizAnswers[i] === q.correctIndex) correct++;
        });
        return correct;
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
            padding: '2rem'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                {/* Header */}
                <div style={{ marginBottom: '2rem' }}>
                    <Link
                        href="/chapter/1"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            color: '#a78bfa',
                            textDecoration: 'none',
                            marginBottom: '1rem',
                            fontSize: '0.9rem'
                        }}
                    >
                        ← Back to Chapter 1
                    </Link>

                    <div style={{ textAlign: 'center' }}>
                        <div style={{
                            display: 'inline-block',
                            padding: '0.5rem 1rem',
                            background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(168, 85, 247, 0.2))',
                            borderRadius: '20px',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            color: '#f87171',
                            marginBottom: '1rem',
                            border: '1px solid rgba(239, 68, 68, 0.3)'
                        }}>
                            ORGANIC REACTION MECHANISMS
                        </div>
                        <h1 style={{
                            fontSize: '2.5rem',
                            fontWeight: 800,
                            color: '#e2e8f0',
                            marginBottom: '0.5rem'
                        }} id="michael-addition">
                            The Michael Addition
                        </h1>
                        <p style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto' }}>
                            1,4-Conjugate Addition of Resonance-Stabilized Carbanions to α,β-Unsaturated Carbonyl Compounds
                        </p>
                    </div>
                </div>

                {/* Phase Navigation */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '0.75rem',
                    marginBottom: '2rem',
                    flexWrap: 'wrap'
                }}>
                    {phases.map(phase => (
                        <motion.button
                            key={phase.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setActivePhase(phase.id)}
                            style={{
                                padding: '0.75rem 1.5rem',
                                background: activePhase === phase.id
                                    ? 'linear-gradient(135deg, #ef4444, #dc2626)'
                                    : 'rgba(255,255,255,0.1)',
                                border: activePhase === phase.id ? 'none' : '1px solid rgba(255,255,255,0.2)',
                                borderRadius: '12px',
                                color: 'white',
                                fontWeight: 600,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            <span>{phase.icon}</span>
                            {phase.label}
                        </motion.button>
                    ))}
                </div>

                {/* Content Area */}
                <AnimatePresence mode="wait">
                    {/* MECHANISM PHASE */}
                    {activePhase === 'mechanism' && (
                        <motion.div
                            key="mechanism"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <div style={{
                                background: 'rgba(0,0,0,0.4)',
                                borderRadius: '24px',
                                border: '1px solid rgba(255,255,255,0.1)',
                                padding: '2rem',
                                marginBottom: '1.5rem'
                            }}>
                                <h3 style={{ color: '#e2e8f0', marginBottom: '1rem' }}>
                                    Step-by-Step Mechanism
                                </h3>

                                {/* Step Indicators */}
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    gap: '1rem',
                                    marginBottom: '2rem'
                                }}>
                                    {MECHANISM_STEPS.map((step, i) => (
                                        <motion.button
                                            key={i}
                                            whileHover={{ scale: 1.05 }}
                                            onClick={() => setMechanismStep(i)}
                                            style={{
                                                width: '50px',
                                                height: '50px',
                                                borderRadius: '50%',
                                                background: mechanismStep === i
                                                    ? 'linear-gradient(135deg, #ef4444, #dc2626)'
                                                    : mechanismStep > i
                                                        ? '#22c55e'
                                                        : 'rgba(255,255,255,0.1)',
                                                border: 'none',
                                                color: 'white',
                                                fontWeight: 700,
                                                fontSize: '1.25rem',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            {step.step}
                                        </motion.button>
                                    ))}
                                </div>

                                {/* Current Step Display */}
                                <div style={{
                                    background: 'rgba(239, 68, 68, 0.1)',
                                    borderRadius: '16px',
                                    padding: '2rem',
                                    border: '1px solid rgba(239, 68, 68, 0.3)',
                                    textAlign: 'center'
                                }}>
                                    <div style={{ color: '#f87171', fontWeight: 700, fontSize: '1.25rem', marginBottom: '0.5rem' }}>
                                        Step {MECHANISM_STEPS[mechanismStep].step}: {MECHANISM_STEPS[mechanismStep].title}
                                    </div>
                                    <p style={{ color: '#e2e8f0', fontSize: '1rem', marginBottom: '1rem' }}>
                                        {MECHANISM_STEPS[mechanismStep].description}
                                    </p>

                                    {/* Visual Representation */}
                                    <div style={{
                                        background: 'white',
                                        borderRadius: '12px',
                                        padding: '2rem',
                                        marginBottom: '1rem',
                                        minHeight: '150px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <svg viewBox="0 0 400 100" style={{ width: '100%', maxWidth: '400px' }}>
                                            {mechanismStep === 0 && (
                                                <>
                                                    <text x="50" y="30" fontSize="14" fill="#1e293b">CH₂(CO₂Et)₂</text>
                                                    <text x="130" y="30" fontSize="14" fill="#ef4444">+ Base</text>
                                                    <path d="M 180 25 L 220 25" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow)" />
                                                    <text x="240" y="30" fontSize="14" fill="#3b82f6">⁻CH(CO₂Et)₂</text>
                                                    <text x="50" y="70" fontSize="12" fill="#64748b">Active Methylene</text>
                                                    <text x="240" y="70" fontSize="12" fill="#64748b">Stabilized Enolate</text>
                                                    <defs>
                                                        <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                                                            <path d="M0,0 L0,6 L9,3 z" fill="#ef4444" />
                                                        </marker>
                                                    </defs>
                                                </>
                                            )}
                                            {mechanismStep === 1 && (
                                                <>
                                                    <text x="30" y="30" fontSize="14" fill="#3b82f6">⁻CH(CO₂Et)₂</text>
                                                    <text x="180" y="30" fontSize="14" fill="#1e293b">CH₂=CH-CO-R</text>
                                                    <circle cx="245" cy="25" r="10" fill="none" stroke="#ef4444" strokeWidth="2" />
                                                    <text x="250" y="70" fontSize="12" fill="#ef4444">β-carbon (target)</text>
                                                    <path d="M 120 35 Q 180 60 235 35" stroke="#22c55e" strokeWidth="2" fill="none" strokeDasharray="5,3" />
                                                </>
                                            )}
                                            {mechanismStep === 2 && (
                                                <>
                                                    <text x="50" y="40" fontSize="14" fill="#1e293b">(EtO₂C)₂CH-CH₂-CH=C(O⁻)-R</text>
                                                    <text x="100" y="75" fontSize="12" fill="#f59e0b">Enolate Intermediate (resonance stabilized)</text>
                                                </>
                                            )}
                                            {mechanismStep === 3 && (
                                                <>
                                                    <text x="80" y="40" fontSize="14" fill="#22c55e">(EtO₂C)₂CH-CH₂-CH₂-CO-R</text>
                                                    <text x="120" y="75" fontSize="12" fill="#22c55e">Michael Adduct ✓</text>
                                                </>
                                            )}
                                        </svg>
                                    </div>

                                    <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                                        {MECHANISM_STEPS[mechanismStep].arrow}
                                    </div>
                                </div>

                                {/* Navigation */}
                                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1.5rem' }}>
                                    <button
                                        onClick={() => setMechanismStep(Math.max(0, mechanismStep - 1))}
                                        disabled={mechanismStep === 0}
                                        style={{
                                            padding: '0.75rem 1.5rem',
                                            background: mechanismStep === 0 ? '#334155' : 'rgba(255,255,255,0.1)',
                                            border: 'none',
                                            borderRadius: '8px',
                                            color: 'white',
                                            fontWeight: 600,
                                            cursor: mechanismStep === 0 ? 'not-allowed' : 'pointer'
                                        }}
                                    >
                                        ← Previous
                                    </button>
                                    <button
                                        onClick={() => setMechanismStep(Math.min(3, mechanismStep + 1))}
                                        disabled={mechanismStep === 3}
                                        style={{
                                            padding: '0.75rem 1.5rem',
                                            background: mechanismStep === 3 ? '#334155' : 'linear-gradient(135deg, #ef4444, #dc2626)',
                                            border: 'none',
                                            borderRadius: '8px',
                                            color: 'white',
                                            fontWeight: 600,
                                            cursor: mechanismStep === 3 ? 'not-allowed' : 'pointer'
                                        }}
                                    >
                                        Next →
                                    </button>
                                </div>
                            </div>

                            {/* Key Insight */}
                            <div style={{
                                background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(15, 23, 42, 0.95))',
                                borderRadius: '16px',
                                border: '1px solid rgba(34, 197, 94, 0.3)',
                                padding: '1.5rem',
                                textAlign: 'center'
                            }}>
                                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>💡</div>
                                <div style={{ color: '#22c55e', fontWeight: 700, marginBottom: '0.5rem' }}>
                                    Why 1,4 and not 1,2?
                                </div>
                                <div style={{ color: '#94a3b8', lineHeight: 1.6 }}>
                                    Soft nucleophiles (carbanions) prefer attacking the softer β-carbon.
                                    <br />
                                    The reaction is <strong>thermodynamically controlled</strong> - the 1,4-adduct is more stable!
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* EXAMPLES PHASE */}
                    {activePhase === 'examples' && (
                        <motion.div
                            key="examples"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                {/* Donors */}
                                <div style={{
                                    background: 'rgba(59, 130, 246, 0.1)',
                                    borderRadius: '20px',
                                    border: '1px solid rgba(59, 130, 246, 0.3)',
                                    padding: '1.5rem'
                                }}>
                                    <h3 style={{ color: '#3b82f6', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        🔵 Michael Donors (Nucleophiles)
                                    </h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                        {DONORS.map((d, i) => (
                                            <div key={i} style={{
                                                padding: '0.75rem',
                                                background: 'rgba(0,0,0,0.3)',
                                                borderRadius: '10px',
                                                border: '1px solid rgba(59, 130, 246, 0.2)'
                                            }}>
                                                <div style={{ color: '#e2e8f0', fontWeight: 600 }}>{d.name}</div>
                                                <div style={{ color: '#60a5fa', fontFamily: 'monospace', fontSize: '0.9rem' }}>{d.structure}</div>
                                                <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>pKa: {d.pKa} • {d.note}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Acceptors */}
                                <div style={{
                                    background: 'rgba(239, 68, 68, 0.1)',
                                    borderRadius: '20px',
                                    border: '1px solid rgba(239, 68, 68, 0.3)',
                                    padding: '1.5rem'
                                }}>
                                    <h3 style={{ color: '#ef4444', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        🔴 Michael Acceptors (Electrophiles)
                                    </h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                        {ACCEPTORS.map((a, i) => (
                                            <div key={i} style={{
                                                padding: '0.75rem',
                                                background: 'rgba(0,0,0,0.3)',
                                                borderRadius: '10px',
                                                border: a.example.includes('Ibrutinib')
                                                    ? '2px solid #f87171'
                                                    : '1px solid rgba(239, 68, 68, 0.2)'
                                            }}>
                                                <div style={{ color: '#e2e8f0', fontWeight: 600 }}>{a.name}</div>
                                                <div style={{ color: '#fca5a5', fontFamily: 'monospace', fontSize: '0.9rem' }}>{a.structure}</div>
                                                <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Example: {a.example}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* SIMULATION PHASE */}
                    {activePhase === 'simulation' && (
                        <motion.div
                            key="simulation"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <div style={{
                                background: 'rgba(0,0,0,0.4)',
                                borderRadius: '24px',
                                border: '1px solid rgba(255,255,255,0.1)',
                                padding: '2rem',
                                textAlign: 'center'
                            }}>
                                <h3 style={{ color: '#e2e8f0', marginBottom: '1rem' }}>
                                    🎮 Interactive Michael Addition Simulation
                                </h3>

                                <div style={{
                                    background: 'white',
                                    borderRadius: '16px',
                                    padding: '2rem',
                                    marginBottom: '1.5rem',
                                    minHeight: '300px'
                                }}>
                                    <svg viewBox="0 0 500 250" style={{ width: '100%' }}>
                                        {/* Acceptor (fixed) */}
                                        <g>
                                            <rect x="280" y="80" width="120" height="60" rx="10" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" />
                                            <text x="340" y="115" fontSize="14" fill="#1e293b" textAnchor="middle" fontWeight="600">
                                                CH₂=CH-CO-R
                                            </text>
                                            <text x="340" y="135" fontSize="10" fill="#ef4444" textAnchor="middle">Michael Acceptor</text>
                                            {/* β-carbon highlight */}
                                            <circle cx="305" cy="105" r="12" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="4" />
                                            <text x="305" y="160" fontSize="9" fill="#ef4444" textAnchor="middle">β-carbon</text>
                                        </g>

                                        {/* Donor (animated) */}
                                        <motion.g
                                            animate={{
                                                x: simulationStep >= 1 ? 100 : 0,
                                                opacity: 1
                                            }}
                                            transition={{ duration: 0.8 }}
                                        >
                                            <rect x="80" y="80" width="100" height="60" rx="10" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
                                            <text x="130" y="115" fontSize="14" fill="#1e293b" textAnchor="middle" fontWeight="600">
                                                ⁻CH(CO₂Et)₂
                                            </text>
                                            <text x="130" y="135" fontSize="10" fill="#3b82f6" textAnchor="middle">Enolate</text>
                                        </motion.g>

                                        {/* Bond formation */}
                                        {simulationStep >= 2 && (
                                            <motion.line
                                                initial={{ pathLength: 0 }}
                                                animate={{ pathLength: 1 }}
                                                x1="230" y1="110" x2="295" y2="110"
                                                stroke="#22c55e" strokeWidth="4"
                                            />
                                        )}

                                        {/* Product */}
                                        {simulationStep >= 3 && (
                                            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                                <rect x="180" y="180" width="200" height="50" rx="10" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" />
                                                <text x="280" y="210" fontSize="12" fill="#1e293b" textAnchor="middle" fontWeight="600">
                                                    (EtO₂C)₂CH-CH₂-CH₂-CO-R
                                                </text>
                                            </motion.g>
                                        )}

                                        {/* Labels */}
                                        <text x="250" y="30" fontSize="16" fill="#64748b" textAnchor="middle" fontWeight="600">
                                            {simulationStep === 0 && 'Click "Start" to begin'}
                                            {simulationStep === 1 && 'Nucleophile approaching β-carbon...'}
                                            {simulationStep === 2 && 'C-C Bond forming!'}
                                            {simulationStep === 3 && '✓ Michael Adduct Complete!'}
                                        </text>
                                    </svg>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                                    <button
                                        onClick={() => setSimulationStep(0)}
                                        style={{
                                            padding: '0.75rem 1.5rem',
                                            background: 'rgba(255,255,255,0.1)',
                                            border: 'none',
                                            borderRadius: '8px',
                                            color: 'white',
                                            fontWeight: 600,
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Reset
                                    </button>
                                    <button
                                        onClick={() => setSimulationStep(Math.min(3, simulationStep + 1))}
                                        disabled={simulationStep === 3}
                                        style={{
                                            padding: '0.75rem 2rem',
                                            background: simulationStep === 3 ? '#22c55e' : 'linear-gradient(135deg, #ef4444, #dc2626)',
                                            border: 'none',
                                            borderRadius: '8px',
                                            color: 'white',
                                            fontWeight: 600,
                                            cursor: simulationStep === 3 ? 'default' : 'pointer'
                                        }}
                                    >
                                        {simulationStep === 0 ? 'Start →' : simulationStep === 3 ? '✓ Complete' : 'Next Step →'}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* CLINICAL PHASE */}
                    {activePhase === 'clinical' && (
                        <motion.div
                            key="clinical"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <div style={{
                                background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(168, 85, 247, 0.1))',
                                borderRadius: '24px',
                                border: '1px solid rgba(239, 68, 68, 0.3)',
                                padding: '2rem'
                            }}>
                                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                                    <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>💊</div>
                                    <h3 style={{ color: '#e2e8f0', marginBottom: '0.5rem' }}>
                                        Clinical Application: Covalent Kinase Inhibitors
                                    </h3>
                                    <p style={{ color: '#94a3b8' }}>
                                        How Michael Addition powers targeted cancer therapy
                                    </p>
                                </div>

                                <div style={{
                                    background: 'rgba(0,0,0,0.3)',
                                    borderRadius: '16px',
                                    padding: '1.5rem',
                                    marginBottom: '1.5rem'
                                }}>
                                    <h4 style={{ color: '#f87171', marginBottom: '1rem' }}>⚔️ Ibrutinib's Mechanism of Action</h4>
                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(3, 1fr)',
                                        gap: '1rem'
                                    }}>
                                        <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '12px' }}>
                                            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>1️⃣</div>
                                            <div style={{ color: '#e2e8f0', fontWeight: 600, marginBottom: '0.25rem' }}>Drug Binding</div>
                                            <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Ibrutinib enters BTK ATP pocket</div>
                                        </div>
                                        <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '12px' }}>
                                            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>2️⃣</div>
                                            <div style={{ color: '#e2e8f0', fontWeight: 600, marginBottom: '0.25rem' }}>Michael Addition</div>
                                            <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Cys481 -SH attacks acrylamide</div>
                                        </div>
                                        <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '12px' }}>
                                            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>3️⃣</div>
                                            <div style={{ color: '#e2e8f0', fontWeight: 600, marginBottom: '0.25rem' }}>Irreversible Inhibition</div>
                                            <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>C-S covalent bond formed</div>
                                        </div>
                                    </div>
                                </div>

                                <div style={{
                                    background: 'rgba(139, 92, 246, 0.1)',
                                    borderRadius: '12px',
                                    padding: '1.25rem',
                                    border: '1px solid rgba(139, 92, 246, 0.3)'
                                }}>
                                    <div style={{ color: '#a78bfa', fontWeight: 700, marginBottom: '0.5rem' }}>
                                        🎯 Why This Matters in Drug Design
                                    </div>
                                    <ul style={{ color: '#e2e8f0', fontSize: '0.9rem', margin: 0, paddingLeft: '1.25rem', lineHeight: 1.8 }}>
                                        <li><strong>Targeted Covalent Inhibitors (TCIs)</strong> use Michael Addition for selectivity</li>
                                        <li>The <strong>acrylamide warhead</strong> reacts specifically with nucleophilic cysteine residues</li>
                                        <li><strong>Duration of action</strong>: Effect lasts until new protein is synthesized</li>
                                        <li><strong>Resistance risk</strong>: Cys→Ser mutations can cause drug failure (Pirtobrutinib solves this!)</li>
                                    </ul>
                                </div>

                                <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                                    <Link
                                        href="/chapter/1"
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            padding: '0.75rem 1.5rem',
                                            background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
                                            borderRadius: '10px',
                                            color: 'white',
                                            fontWeight: 600,
                                            textDecoration: 'none'
                                        }}
                                    >
                                        Explore BTK Masterclass in Lesson 8 →
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* QUIZ PHASE */}
                    {activePhase === 'quiz' && (
                        <motion.div
                            key="quiz"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <div style={{
                                background: 'rgba(0,0,0,0.4)',
                                borderRadius: '24px',
                                border: '1px solid rgba(255,255,255,0.1)',
                                padding: '2rem'
                            }}>
                                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                                    <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>✅</div>
                                    <h3 style={{ color: '#e2e8f0' }}>Michael Addition Quiz</h3>
                                    <p style={{ color: '#94a3b8' }}>Test your understanding</p>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '700px', margin: '0 auto' }}>
                                    {QUIZ_QUESTIONS.map((q, qIdx) => {
                                        const answered = quizAnswers[qIdx] !== undefined;
                                        const isCorrect = showQuizResults && quizAnswers[qIdx] === q.correctIndex;

                                        return (
                                            <div key={qIdx} style={{
                                                padding: '1.5rem',
                                                background: showQuizResults
                                                    ? isCorrect ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)'
                                                    : 'rgba(255,255,255,0.05)',
                                                borderRadius: '16px',
                                                border: showQuizResults
                                                    ? isCorrect ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)'
                                                    : '1px solid rgba(255,255,255,0.1)'
                                            }}>
                                                <div style={{ color: '#e2e8f0', fontWeight: 600, marginBottom: '1rem' }}>
                                                    {qIdx + 1}. {q.question}
                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                                    {q.options.map((opt, oIdx) => (
                                                        <button
                                                            key={oIdx}
                                                            onClick={() => !showQuizResults && setQuizAnswers({ ...quizAnswers, [qIdx]: oIdx })}
                                                            disabled={showQuizResults}
                                                            style={{
                                                                padding: '0.75rem 1rem',
                                                                background: quizAnswers[qIdx] === oIdx
                                                                    ? showQuizResults
                                                                        ? oIdx === q.correctIndex ? '#22c55e' : '#ef4444'
                                                                        : '#8b5cf6'
                                                                    : showQuizResults && oIdx === q.correctIndex
                                                                        ? '#22c55e'
                                                                        : 'rgba(255,255,255,0.05)',
                                                                border: 'none',
                                                                borderRadius: '8px',
                                                                color: 'white',
                                                                textAlign: 'left',
                                                                cursor: showQuizResults ? 'default' : 'pointer',
                                                                fontSize: '0.9rem'
                                                            }}
                                                        >
                                                            {['A', 'B', 'C', 'D'][oIdx]}. {opt}
                                                        </button>
                                                    ))}
                                                </div>
                                                {showQuizResults && (
                                                    <div style={{
                                                        marginTop: '0.75rem',
                                                        padding: '0.75rem',
                                                        background: 'rgba(0,0,0,0.2)',
                                                        borderRadius: '8px',
                                                        color: '#94a3b8',
                                                        fontSize: '0.85rem'
                                                    }}>
                                                        💡 {q.explanation}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>

                                {Object.keys(quizAnswers).length === QUIZ_QUESTIONS.length && !showQuizResults && (
                                    <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                                        <button
                                            onClick={() => setShowQuizResults(true)}
                                            style={{
                                                padding: '1rem 2rem',
                                                background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
                                                border: 'none',
                                                borderRadius: '12px',
                                                color: 'white',
                                                fontWeight: 700,
                                                cursor: 'pointer',
                                                fontSize: '1rem'
                                            }}
                                        >
                                            Check Answers
                                        </button>
                                    </div>
                                )}

                                {showQuizResults && (
                                    <div style={{
                                        marginTop: '2rem',
                                        padding: '1.5rem',
                                        background: calculateScore() === QUIZ_QUESTIONS.length
                                            ? 'rgba(34, 197, 94, 0.2)'
                                            : 'rgba(245, 158, 11, 0.2)',
                                        borderRadius: '16px',
                                        textAlign: 'center'
                                    }}>
                                        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>
                                            {calculateScore() === QUIZ_QUESTIONS.length ? '🎉' : '📚'}
                                        </div>
                                        <div style={{ color: '#e2e8f0', fontSize: '1.25rem', fontWeight: 700 }}>
                                            Score: {calculateScore()}/{QUIZ_QUESTIONS.length}
                                        </div>
                                        <p style={{ color: '#94a3b8' }}>
                                            {calculateScore() === QUIZ_QUESTIONS.length
                                                ? 'Perfect! You mastered Michael Addition!'
                                                : 'Good effort! Review the mechanisms and try again.'}
                                        </p>
                                        <button
                                            onClick={() => {
                                                setQuizAnswers({});
                                                setShowQuizResults(false);
                                            }}
                                            style={{
                                                marginTop: '1rem',
                                                padding: '0.75rem 1.5rem',
                                                background: 'rgba(255,255,255,0.1)',
                                                border: 'none',
                                                borderRadius: '8px',
                                                color: 'white',
                                                fontWeight: 600,
                                                cursor: 'pointer'
                                            }}
                                        >
                                            Try Again
                                        </button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
