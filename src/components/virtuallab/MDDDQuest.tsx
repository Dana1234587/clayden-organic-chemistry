'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MDDDQuestProps {
    onComplete: () => void;
}

type ChallengeType = 'kinetics' | 'sar' | 'pharmacokinetics';
type ChallengeState = 'menu' | 'active' | 'complete';

// SAR Data for Drug Optimization Challenge
const SAR_COMPOUNDS = [
    { id: 1, name: 'Sulfanilamide', structure: 'p-NH₂-C₆H₄-SO₂NH₂', mic: 100, toxicity: 'Low', score: 85 },
    { id: 2, name: 'Sulfathiazole', structure: 'p-NH₂-C₆H₄-SO₂NH-Thiazole', mic: 8, toxicity: 'Low', score: 92 },
    { id: 3, name: 'Sulfapyridine', structure: 'p-NH₂-C₆H₄-SO₂NH-Pyridine', mic: 25, toxicity: 'Medium', score: 78 },
    { id: 4, name: 'Sulfamethoxazole', structure: 'p-NH₂-C₆H₄-SO₂NH-5-Me-Isoxazole', mic: 4, toxicity: 'Low', score: 95 },
    { id: 5, name: 'N-Acetyl Derivative', structure: 'p-AcNH-C₆H₄-SO₂NH₂', mic: '>1000', toxicity: 'Low', score: 20 },
];

// Kinetics Data
const KINETICS_DATA = {
    substrate: 'PABA',
    inhibitor: 'Sulfanilamide',
    km: 50, // μM
    vmax: 100,
    ki: 25, // μM
};

export default function MDDDQuest({ onComplete }: MDDDQuestProps) {
    const [currentChallenge, setCurrentChallenge] = useState<ChallengeType | null>(null);
    const [completedChallenges, setCompletedChallenges] = useState<ChallengeType[]>([]);

    const handleChallengeComplete = (challenge: ChallengeType) => {
        if (!completedChallenges.includes(challenge)) {
            setCompletedChallenges(prev => [...prev, challenge]);
        }
        setCurrentChallenge(null);

        if (completedChallenges.length >= 2) {
            onComplete();
        }
    };

    return (
        <div>
            {!currentChallenge && (
                <>
                    {/* Header */}
                    <div style={{
                        textAlign: 'center',
                        marginBottom: '2rem'
                    }}>
                        <h3 style={{ color: '#f59e0b', marginBottom: '0.5rem', fontSize: '1.3rem' }}>
                            🧬 Medicinal Chemistry Research Challenges
                        </h3>
                        <p style={{ color: 'var(--neutral-400)', fontSize: '0.9rem' }}>
                            Apply your knowledge in these real-world drug discovery scenarios
                        </p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '1.5rem'
                    }}>
                        {/* Challenge 1: Enzyme Kinetics */}
                        <motion.button
                            whileHover={{ scale: 1.02, y: -5 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setCurrentChallenge('kinetics')}
                            style={{
                                padding: '1.5rem',
                                background: completedChallenges.includes('kinetics')
                                    ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(5, 150, 105, 0.2) 100%)'
                                    : 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.1) 100%)',
                                border: completedChallenges.includes('kinetics')
                                    ? '2px solid #10b981'
                                    : '2px solid #3b82f6',
                                borderRadius: '20px',
                                cursor: 'pointer',
                                textAlign: 'left'
                            }}
                        >
                            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>📊</div>
                            <div style={{
                                color: completedChallenges.includes('kinetics') ? '#10b981' : '#3b82f6',
                                fontWeight: 700,
                                marginBottom: '0.5rem',
                                fontSize: '1.1rem'
                            }}>
                                Enzyme Kinetics Analysis
                            </div>
                            <div style={{ color: 'var(--neutral-400)', fontSize: '0.85rem', lineHeight: 1.5 }}>
                                Analyze Lineweaver-Burk plots to determine if sulfanilamide is a competitive or non-competitive inhibitor
                            </div>
                            {completedChallenges.includes('kinetics') && (
                                <div style={{
                                    marginTop: '0.75rem',
                                    color: '#10b981',
                                    fontWeight: 600
                                }}>
                                    ✓ Completed
                                </div>
                            )}
                        </motion.button>

                        {/* Challenge 2: SAR Analysis */}
                        <motion.button
                            whileHover={{ scale: 1.02, y: -5 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setCurrentChallenge('sar')}
                            style={{
                                padding: '1.5rem',
                                background: completedChallenges.includes('sar')
                                    ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(5, 150, 105, 0.2) 100%)'
                                    : 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%)',
                                border: completedChallenges.includes('sar')
                                    ? '2px solid #10b981'
                                    : '2px solid #8b5cf6',
                                borderRadius: '20px',
                                cursor: 'pointer',
                                textAlign: 'left'
                            }}
                        >
                            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🔬</div>
                            <div style={{
                                color: completedChallenges.includes('sar') ? '#10b981' : '#8b5cf6',
                                fontWeight: 700,
                                marginBottom: '0.5rem',
                                fontSize: '1.1rem'
                            }}>
                                SAR Optimization
                            </div>
                            <div style={{ color: 'var(--neutral-400)', fontSize: '0.85rem', lineHeight: 1.5 }}>
                                Design the optimal sulfa drug by analyzing structure-activity relationships
                            </div>
                            {completedChallenges.includes('sar') && (
                                <div style={{
                                    marginTop: '0.75rem',
                                    color: '#10b981',
                                    fontWeight: 600
                                }}>
                                    ✓ Completed
                                </div>
                            )}
                        </motion.button>

                        {/* Challenge 3: PK Simulation */}
                        <motion.button
                            whileHover={{ scale: 1.02, y: -5 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setCurrentChallenge('pharmacokinetics')}
                            style={{
                                padding: '1.5rem',
                                background: completedChallenges.includes('pharmacokinetics')
                                    ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(5, 150, 105, 0.2) 100%)'
                                    : 'linear-gradient(135deg, rgba(220, 38, 38, 0.1) 0%, rgba(185, 28, 28, 0.1) 100%)',
                                border: completedChallenges.includes('pharmacokinetics')
                                    ? '2px solid #10b981'
                                    : '2px solid #dc2626',
                                borderRadius: '20px',
                                cursor: 'pointer',
                                textAlign: 'left'
                            }}
                        >
                            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>📈</div>
                            <div style={{
                                color: completedChallenges.includes('pharmacokinetics') ? '#10b981' : '#dc2626',
                                fontWeight: 700,
                                marginBottom: '0.5rem',
                                fontSize: '1.1rem'
                            }}>
                                PK/PD Simulation
                            </div>
                            <div style={{ color: 'var(--neutral-400)', fontSize: '0.85rem', lineHeight: 1.5 }}>
                                Calculate dosing regimen to maintain therapeutic concentrations
                            </div>
                            {completedChallenges.includes('pharmacokinetics') && (
                                <div style={{
                                    marginTop: '0.75rem',
                                    color: '#10b981',
                                    fontWeight: 600
                                }}>
                                    ✓ Completed
                                </div>
                            )}
                        </motion.button>
                    </div>

                    {/* Progress */}
                    <div style={{
                        marginTop: '2rem',
                        textAlign: 'center',
                        padding: '1rem',
                        background: 'rgba(0, 0, 0, 0.3)',
                        borderRadius: '16px'
                    }}>
                        <div style={{ color: 'var(--neutral-400)', marginBottom: '0.5rem' }}>
                            Challenges Completed: {completedChallenges.length}/3
                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '0.5rem'
                        }}>
                            {[0, 1, 2].map(i => (
                                <div key={i} style={{
                                    width: 40,
                                    height: 8,
                                    borderRadius: 4,
                                    background: i < completedChallenges.length ? '#10b981' : 'rgba(255,255,255,0.1)'
                                }} />
                            ))}
                        </div>
                    </div>
                </>
            )}

            {/* Challenge Components */}
            <AnimatePresence mode="wait">
                {currentChallenge === 'kinetics' && (
                    <motion.div
                        key="kinetics"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                    >
                        <EnzymeKineticsChallenge
                            onComplete={() => handleChallengeComplete('kinetics')}
                            onBack={() => setCurrentChallenge(null)}
                        />
                    </motion.div>
                )}

                {currentChallenge === 'sar' && (
                    <motion.div
                        key="sar"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                    >
                        <SAROptimizationChallenge
                            onComplete={() => handleChallengeComplete('sar')}
                            onBack={() => setCurrentChallenge(null)}
                        />
                    </motion.div>
                )}

                {currentChallenge === 'pharmacokinetics' && (
                    <motion.div
                        key="pk"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                    >
                        <PKSimulationChallenge
                            onComplete={() => handleChallengeComplete('pharmacokinetics')}
                            onBack={() => setCurrentChallenge(null)}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// ========================================
// CHALLENGE 1: Enzyme Kinetics Analysis
// ========================================
function EnzymeKineticsChallenge({ onComplete, onBack }: { onComplete: () => void; onBack: () => void }) {
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [showResult, setShowResult] = useState(false);

    const handleSubmit = () => {
        setShowResult(true);
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <button
                    onClick={onBack}
                    style={{
                        padding: '0.5rem 1rem',
                        background: 'rgba(255,255,255,0.1)',
                        border: 'none',
                        borderRadius: '8px',
                        color: 'var(--neutral-400)',
                        cursor: 'pointer'
                    }}
                >
                    ← Back
                </button>
                <h3 style={{ color: '#3b82f6', margin: 0 }}>📊 Enzyme Kinetics Analysis</h3>
                <div />
            </div>

            {/* Scenario */}
            <div style={{
                padding: '1.5rem',
                background: 'rgba(59, 130, 246, 0.1)',
                borderRadius: '16px',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                marginBottom: '1.5rem'
            }}>
                <h4 style={{ color: '#3b82f6', marginBottom: '0.75rem' }}>Research Scenario</h4>
                <p style={{ color: 'var(--neutral-300)', lineHeight: 1.7, fontSize: '0.95rem' }}>
                    You are investigating the mechanism of <strong style={{ color: '#10b981' }}>Dihydropteroate Synthase (DHPS)</strong> inhibition
                    by Sulfanilamide. Based on the Lineweaver-Burk plot data below, determine the type of inhibition.
                </p>
            </div>

            {/* Kinetics Data Table */}
            <div style={{
                background: 'rgba(0, 0, 0, 0.4)',
                borderRadius: '16px',
                padding: '1.5rem',
                marginBottom: '1.5rem'
            }}>
                <h4 style={{ color: 'var(--neutral-300)', marginBottom: '1rem' }}>Kinetic Parameters</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', textAlign: 'center' }}>
                    <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                        <div style={{ color: 'var(--neutral-500)', fontSize: '0.8rem' }}>Without Inhibitor</div>
                        <div style={{ color: '#10b981', fontWeight: 700, marginTop: '0.5rem' }}>
                            K<sub>m</sub> = 50 μM<br />V<sub>max</sub> = 100 μmol/min
                        </div>
                    </div>
                    <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                        <div style={{ color: 'var(--neutral-500)', fontSize: '0.8rem' }}>With Sulfanilamide</div>
                        <div style={{ color: '#ef4444', fontWeight: 700, marginTop: '0.5rem' }}>
                            K<sub>m</sub>&apos; = 150 μM<br />V<sub>max</sub>&apos; = 100 μmol/min
                        </div>
                    </div>
                    <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                        <div style={{ color: 'var(--neutral-500)', fontSize: '0.8rem' }}>K<sub>i</sub> (Inhibitor)</div>
                        <div style={{ color: '#8b5cf6', fontWeight: 700, marginTop: '0.5rem' }}>
                            25 μM
                        </div>
                    </div>
                </div>

                {/* Lineweaver-Burk Plot Visualization */}
                <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                    <svg width="350" height="200" viewBox="0 0 350 200">
                        {/* Axes */}
                        <line x1="50" y1="150" x2="320" y2="150" stroke="#666" strokeWidth="2" />
                        <line x1="50" y1="20" x2="50" y2="150" stroke="#666" strokeWidth="2" />

                        {/* Labels */}
                        <text x="185" y="185" textAnchor="middle" fill="#999" fontSize="12">1/[S] (μM⁻¹)</text>
                        <text x="20" y="85" textAnchor="middle" fill="#999" fontSize="12" transform="rotate(-90, 20, 85)">1/V</text>

                        {/* Without Inhibitor Line */}
                        <line x1="50" y1="130" x2="280" y2="50" stroke="#10b981" strokeWidth="3" />
                        <text x="290" y="55" fill="#10b981" fontSize="11">No Inhibitor</text>

                        {/* With Inhibitor Line - Competitive shows same Y-intercept, different X-intercept */}
                        <line x1="50" y1="130" x2="320" y2="30" stroke="#ef4444" strokeWidth="3" />
                        <text x="295" y="25" fill="#ef4444" fontSize="11">+ Sulfanilamide</text>

                        {/* Y-intercept indicator */}
                        <circle cx="50" cy="130" r="5" fill="#f59e0b" />
                        <text x="65" y="145" fill="#f59e0b" fontSize="10">Same y-intercept!</text>
                    </svg>
                </div>
            </div>

            {/* Answer Options */}
            {!showResult && (
                <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{ color: 'var(--neutral-300)', marginBottom: '1rem' }}>What type of inhibition does this represent?</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {[
                            { id: 'competitive', label: 'Competitive Inhibition', desc: 'Km increases, Vmax unchanged' },
                            { id: 'noncompetitive', label: 'Non-competitive Inhibition', desc: 'Km unchanged, Vmax decreases' },
                            { id: 'uncompetitive', label: 'Uncompetitive Inhibition', desc: 'Both Km and Vmax decrease' },
                            { id: 'mixed', label: 'Mixed Inhibition', desc: 'Both Km may increase, Vmax decreases' },
                        ].map(option => (
                            <motion.button
                                key={option.id}
                                whileHover={{ scale: 1.01 }}
                                onClick={() => setSelectedAnswer(option.id)}
                                style={{
                                    padding: '1rem',
                                    background: selectedAnswer === option.id
                                        ? 'rgba(139, 92, 246, 0.2)'
                                        : 'rgba(0, 0, 0, 0.3)',
                                    border: selectedAnswer === option.id
                                        ? '2px solid #8b5cf6'
                                        : '2px solid rgba(255,255,255,0.1)',
                                    borderRadius: '12px',
                                    cursor: 'pointer',
                                    textAlign: 'left'
                                }}
                            >
                                <div style={{ color: 'white', fontWeight: 600 }}>{option.label}</div>
                                <div style={{ color: 'var(--neutral-500)', fontSize: '0.85rem', marginTop: '0.25rem' }}>{option.desc}</div>
                            </motion.button>
                        ))}
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSubmit}
                        disabled={!selectedAnswer}
                        style={{
                            marginTop: '1.5rem',
                            width: '100%',
                            padding: '1rem',
                            background: selectedAnswer
                                ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
                                : 'rgba(255,255,255,0.1)',
                            border: 'none',
                            borderRadius: '12px',
                            color: 'white',
                            fontWeight: 600,
                            cursor: selectedAnswer ? 'pointer' : 'not-allowed'
                        }}
                    >
                        Submit Analysis
                    </motion.button>
                </div>
            )}

            {/* Result */}
            {showResult && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                        padding: '1.5rem',
                        background: selectedAnswer === 'competitive'
                            ? 'rgba(16, 185, 129, 0.15)'
                            : 'rgba(239, 68, 68, 0.15)',
                        borderRadius: '16px',
                        border: `2px solid ${selectedAnswer === 'competitive' ? '#10b981' : '#ef4444'}`
                    }}
                >
                    {selectedAnswer === 'competitive' ? (
                        <>
                            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>✅ Excellent Analysis!</div>
                            <p style={{ color: 'var(--neutral-300)', lineHeight: 1.7 }}>
                                <strong style={{ color: '#10b981' }}>Correct!</strong> Sulfanilamide is a <strong>competitive inhibitor</strong>.
                                The Lineweaver-Burk plot shows that V<sub>max</sub> remains constant while K<sub>m</sub> increases.
                                This is because Sulfanilamide competes with PABA for the active site, but can be overcome by
                                excess substrate.
                            </p>
                        </>
                    ) : (
                        <>
                            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>❌ Not quite right</div>
                            <p style={{ color: 'var(--neutral-300)', lineHeight: 1.7 }}>
                                The correct answer is <strong style={{ color: '#10b981' }}>Competitive Inhibition</strong>.
                                Notice that V<sub>max</sub> remains unchanged (same y-intercept) while K<sub>m</sub> increases.
                                Sulfanilamide structurally mimics PABA and competes for the active site.
                            </p>
                        </>
                    )}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={onComplete}
                        style={{
                            marginTop: '1rem',
                            width: '100%',
                            padding: '1rem',
                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                            border: 'none',
                            borderRadius: '12px',
                            color: 'white',
                            fontWeight: 600,
                            cursor: 'pointer'
                        }}
                    >
                        Complete Challenge
                    </motion.button>
                </motion.div>
            )}
        </div>
    );
}

// ========================================
// CHALLENGE 2: SAR Optimization
// ========================================
function SAROptimizationChallenge({ onComplete, onBack }: { onComplete: () => void; onBack: () => void }) {
    const [selectedCompound, setSelectedCompound] = useState<number | null>(null);
    const [showResult, setShowResult] = useState(false);

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <button
                    onClick={onBack}
                    style={{
                        padding: '0.5rem 1rem',
                        background: 'rgba(255,255,255,0.1)',
                        border: 'none',
                        borderRadius: '8px',
                        color: 'var(--neutral-400)',
                        cursor: 'pointer'
                    }}
                >
                    ← Back
                </button>
                <h3 style={{ color: '#8b5cf6', margin: 0 }}>🔬 Structure-Activity Relationship Analysis</h3>
                <div />
            </div>

            {/* Scenario */}
            <div style={{
                padding: '1.5rem',
                background: 'rgba(139, 92, 246, 0.1)',
                borderRadius: '16px',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                marginBottom: '1.5rem'
            }}>
                <h4 style={{ color: '#8b5cf6', marginBottom: '0.75rem' }}>Lead Optimization Task</h4>
                <p style={{ color: 'var(--neutral-300)', lineHeight: 1.7, fontSize: '0.95rem' }}>
                    Your team has synthesized several sulfonamide derivatives. Analyze the data and select the compound
                    with the best balance of <strong style={{ color: '#10b981' }}>potency (lowest MIC)</strong> and
                    <strong style={{ color: '#f59e0b' }}> safety profile</strong>.
                </p>
            </div>

            {/* SAR Data Table */}
            <div style={{
                background: 'rgba(0, 0, 0, 0.4)',
                borderRadius: '16px',
                padding: '1.5rem',
                marginBottom: '1.5rem',
                overflowX: 'auto'
            }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid rgba(255,255,255,0.2)' }}>
                            <th style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--neutral-300)' }}>Select</th>
                            <th style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--neutral-300)' }}>Compound</th>
                            <th style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--neutral-300)' }}>R-Group</th>
                            <th style={{ padding: '0.75rem', textAlign: 'center', color: 'var(--neutral-300)' }}>MIC (μg/mL)</th>
                            <th style={{ padding: '0.75rem', textAlign: 'center', color: 'var(--neutral-300)' }}>Toxicity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {SAR_COMPOUNDS.map(compound => (
                            <tr
                                key={compound.id}
                                onClick={() => !showResult && setSelectedCompound(compound.id)}
                                style={{
                                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                                    cursor: showResult ? 'default' : 'pointer',
                                    background: selectedCompound === compound.id
                                        ? 'rgba(139, 92, 246, 0.2)'
                                        : 'transparent'
                                }}
                            >
                                <td style={{ padding: '0.75rem' }}>
                                    <input
                                        type="radio"
                                        checked={selectedCompound === compound.id}
                                        onChange={() => setSelectedCompound(compound.id)}
                                        disabled={showResult}
                                    />
                                </td>
                                <td style={{ padding: '0.75rem', color: 'white', fontWeight: 600 }}>{compound.name}</td>
                                <td style={{ padding: '0.75rem', color: 'var(--neutral-400)', fontSize: '0.85rem' }}>{compound.structure}</td>
                                <td style={{ padding: '0.75rem', textAlign: 'center', color: typeof compound.mic === 'number' && compound.mic < 10 ? '#10b981' : '#ef4444', fontWeight: 600 }}>
                                    {compound.mic}
                                </td>
                                <td style={{
                                    padding: '0.75rem',
                                    textAlign: 'center',
                                    color: compound.toxicity === 'Low' ? '#10b981' : '#f59e0b'
                                }}>
                                    {compound.toxicity}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Submit */}
            {!showResult && (
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => selectedCompound && setShowResult(true)}
                    disabled={!selectedCompound}
                    style={{
                        width: '100%',
                        padding: '1rem',
                        background: selectedCompound
                            ? 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)'
                            : 'rgba(255,255,255,0.1)',
                        border: 'none',
                        borderRadius: '12px',
                        color: 'white',
                        fontWeight: 600,
                        cursor: selectedCompound ? 'pointer' : 'not-allowed'
                    }}
                >
                    Select Lead Compound
                </motion.button>
            )}

            {/* Result */}
            {showResult && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                        padding: '1.5rem',
                        background: selectedCompound === 4
                            ? 'rgba(16, 185, 129, 0.15)'
                            : 'rgba(139, 92, 246, 0.15)',
                        borderRadius: '16px',
                        border: `2px solid ${selectedCompound === 4 ? '#10b981' : '#8b5cf6'}`
                    }}
                >
                    {selectedCompound === 4 ? (
                        <>
                            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🏆 Outstanding SAR Analysis!</div>
                            <p style={{ color: 'var(--neutral-300)', lineHeight: 1.7 }}>
                                <strong style={{ color: '#10b981' }}>Sulfamethoxazole</strong> is indeed the optimal choice!
                                It has the lowest MIC (4 μg/mL), indicating excellent potency, combined with a low toxicity profile.
                                The 5-methylisoxazole ring provides optimal electronic and steric properties.
                            </p>
                        </>
                    ) : (
                        <>
                            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>📊 Good Analysis!</div>
                            <p style={{ color: 'var(--neutral-300)', lineHeight: 1.7 }}>
                                Your selection of <strong>{SAR_COMPOUNDS.find(c => c.id === selectedCompound)?.name}</strong> shows
                                thoughtful consideration. However, <strong style={{ color: '#10b981' }}>Sulfamethoxazole</strong> would
                                be the optimal lead with MIC of 4 μg/mL and low toxicity. In drug development, we seek the best
                                balance between potency and safety!
                            </p>
                        </>
                    )}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={onComplete}
                        style={{
                            marginTop: '1rem',
                            width: '100%',
                            padding: '1rem',
                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                            border: 'none',
                            borderRadius: '12px',
                            color: 'white',
                            fontWeight: 600,
                            cursor: 'pointer'
                        }}
                    >
                        Complete Challenge
                    </motion.button>
                </motion.div>
            )}
        </div>
    );
}

// ========================================
// CHALLENGE 3: PK/PD Simulation
// ========================================
function PKSimulationChallenge({ onComplete, onBack }: { onComplete: () => void; onBack: () => void }) {
    const [dose, setDose] = useState(500);
    const [interval, setInterval] = useState(12);
    const [showResult, setShowResult] = useState(false);

    // PK Parameters (simplified one-compartment model)
    const halfLife = 10; // hours
    const vd = 0.2; // L/kg (volume of distribution)
    const bioavailability = 0.85;
    const bodyWeight = 70; // kg
    const mic = 20; // μg/mL therapeutic target
    const toxicThreshold = 200; // μg/mL

    // Calculate peak and trough concentrations
    const calculateConcentrations = () => {
        const ke = 0.693 / halfLife;
        const totalVd = vd * bodyWeight;
        const cMax = (dose * bioavailability) / totalVd;
        const cTrough = cMax * Math.exp(-ke * interval);
        return { cMax, cTrough };
    };

    const { cMax, cTrough } = calculateConcentrations();
    const isTherapeutic = cTrough >= mic && cMax < toxicThreshold;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <button
                    onClick={onBack}
                    style={{
                        padding: '0.5rem 1rem',
                        background: 'rgba(255,255,255,0.1)',
                        border: 'none',
                        borderRadius: '8px',
                        color: 'var(--neutral-400)',
                        cursor: 'pointer'
                    }}
                >
                    ← Back
                </button>
                <h3 style={{ color: '#dc2626', margin: 0 }}>📈 Pharmacokinetic Dosing Simulation</h3>
                <div />
            </div>

            {/* Clinical Scenario */}
            <div style={{
                padding: '1.5rem',
                background: 'rgba(220, 38, 38, 0.1)',
                borderRadius: '16px',
                border: '1px solid rgba(220, 38, 38, 0.3)',
                marginBottom: '1.5rem'
            }}>
                <h4 style={{ color: '#dc2626', marginBottom: '0.75rem' }}>Clinical Scenario</h4>
                <p style={{ color: 'var(--neutral-300)', lineHeight: 1.7, fontSize: '0.95rem' }}>
                    A 70 kg patient requires Sulfamethoxazole therapy. Design a dosing regimen that maintains
                    plasma concentrations above the <strong style={{ color: '#10b981' }}>MIC (20 μg/mL)</strong> while
                    staying below the <strong style={{ color: '#ef4444' }}>toxic threshold (200 μg/mL)</strong>.
                </p>
                <div style={{
                    marginTop: '1rem',
                    padding: '0.75rem',
                    background: 'rgba(0,0,0,0.3)',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    color: 'var(--neutral-400)'
                }}>
                    t<sub>1/2</sub> = {halfLife}h | V<sub>d</sub> = {vd} L/kg | F = {bioavailability * 100}%
                </div>
            </div>

            {/* Dosing Controls */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1.5rem',
                marginBottom: '1.5rem'
            }}>
                <div style={{
                    padding: '1.5rem',
                    background: 'rgba(0, 0, 0, 0.4)',
                    borderRadius: '16px'
                }}>
                    <label style={{ color: 'var(--neutral-300)', display: 'block', marginBottom: '0.75rem' }}>
                        Dose (mg)
                    </label>
                    <input
                        type="range"
                        min={100}
                        max={1000}
                        step={100}
                        value={dose}
                        onChange={(e) => setDose(Number(e.target.value))}
                        disabled={showResult}
                        style={{ width: '100%' }}
                    />
                    <div style={{ textAlign: 'center', color: '#3b82f6', fontWeight: 700, fontSize: '1.5rem', marginTop: '0.5rem' }}>
                        {dose} mg
                    </div>
                </div>

                <div style={{
                    padding: '1.5rem',
                    background: 'rgba(0, 0, 0, 0.4)',
                    borderRadius: '16px'
                }}>
                    <label style={{ color: 'var(--neutral-300)', display: 'block', marginBottom: '0.75rem' }}>
                        Dosing Interval (hours)
                    </label>
                    <input
                        type="range"
                        min={4}
                        max={24}
                        step={2}
                        value={interval}
                        onChange={(e) => setInterval(Number(e.target.value))}
                        disabled={showResult}
                        style={{ width: '100%' }}
                    />
                    <div style={{ textAlign: 'center', color: '#8b5cf6', fontWeight: 700, fontSize: '1.5rem', marginTop: '0.5rem' }}>
                        q{interval}h
                    </div>
                </div>
            </div>

            {/* Predicted Concentrations */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1rem',
                marginBottom: '1.5rem'
            }}>
                <div style={{
                    padding: '1rem',
                    background: cMax < toxicThreshold ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                    borderRadius: '12px',
                    border: `2px solid ${cMax < toxicThreshold ? '#10b981' : '#ef4444'}`,
                    textAlign: 'center'
                }}>
                    <div style={{ color: 'var(--neutral-400)', fontSize: '0.85rem' }}>Peak (C<sub>max</sub>)</div>
                    <div style={{
                        color: cMax < toxicThreshold ? '#10b981' : '#ef4444',
                        fontWeight: 700,
                        fontSize: '1.5rem',
                        marginTop: '0.25rem'
                    }}>
                        {cMax.toFixed(1)} μg/mL
                    </div>
                    <div style={{ color: 'var(--neutral-500)', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                        {cMax < toxicThreshold ? '✓ Below toxic threshold' : '⚠️ Toxic!'}
                    </div>
                </div>

                <div style={{
                    padding: '1rem',
                    background: cTrough >= mic ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                    borderRadius: '12px',
                    border: `2px solid ${cTrough >= mic ? '#10b981' : '#ef4444'}`,
                    textAlign: 'center'
                }}>
                    <div style={{ color: 'var(--neutral-400)', fontSize: '0.85rem' }}>Trough (C<sub>min</sub>)</div>
                    <div style={{
                        color: cTrough >= mic ? '#10b981' : '#ef4444',
                        fontWeight: 700,
                        fontSize: '1.5rem',
                        marginTop: '0.25rem'
                    }}>
                        {cTrough.toFixed(1)} μg/mL
                    </div>
                    <div style={{ color: 'var(--neutral-500)', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                        {cTrough >= mic ? '✓ Above MIC' : '⚠️ Below MIC!'}
                    </div>
                </div>
            </div>

            {/* Submit */}
            {!showResult && (
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowResult(true)}
                    style={{
                        width: '100%',
                        padding: '1rem',
                        background: isTherapeutic
                            ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                            : 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                        border: 'none',
                        borderRadius: '12px',
                        color: 'white',
                        fontWeight: 600,
                        cursor: 'pointer'
                    }}
                >
                    {isTherapeutic ? '✓ Submit Therapeutic Regimen' : 'Submit Current Regimen'}
                </motion.button>
            )}

            {/* Result */}
            {showResult && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                        padding: '1.5rem',
                        background: isTherapeutic
                            ? 'rgba(16, 185, 129, 0.15)'
                            : 'rgba(239, 68, 68, 0.15)',
                        borderRadius: '16px',
                        border: `2px solid ${isTherapeutic ? '#10b981' : '#ef4444'}`
                    }}
                >
                    {isTherapeutic ? (
                        <>
                            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🎯 Optimal Dosing Achieved!</div>
                            <p style={{ color: 'var(--neutral-300)', lineHeight: 1.7 }}>
                                Your regimen of <strong style={{ color: '#3b82f6' }}>{dose} mg q{interval}h</strong> maintains
                                therapeutic concentrations throughout the dosing interval while avoiding toxicity.
                                This demonstrates excellent understanding of PK/PD principles!
                            </p>
                        </>
                    ) : (
                        <>
                            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>⚠️ Suboptimal Regimen</div>
                            <p style={{ color: 'var(--neutral-300)', lineHeight: 1.7 }}>
                                Your regimen needs adjustment. {cMax >= toxicThreshold && 'Peak concentration exceeds toxic threshold. '}
                                {cTrough < mic && 'Trough concentration falls below MIC. '}
                                Try adjusting the dose and/or interval to achieve therapeutic levels.
                            </p>
                        </>
                    )}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={onComplete}
                        style={{
                            marginTop: '1rem',
                            width: '100%',
                            padding: '1rem',
                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                            border: 'none',
                            borderRadius: '12px',
                            color: 'white',
                            fontWeight: 600,
                            cursor: 'pointer'
                        }}
                    >
                        Complete Challenge
                    </motion.button>
                </motion.div>
            )}
        </div>
    );
}
