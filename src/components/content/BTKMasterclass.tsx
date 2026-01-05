'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ============================================================================
// BTK MASTERCLASS: Overcoming Covalent Resistance
// From Ibrutinib to Pirtobrutinib (Advanced Case Study)
// ============================================================================

type Phase = 'context' | 'simulation' | 'analytics';
type SimPhase = 'covalent' | 'mutation' | 'rescue';

export default function BTKMasterclass() {
    const [activePhase, setActivePhase] = useState<Phase>('context');
    const [simPhase, setSimPhase] = useState<SimPhase>('covalent');
    const [showMutation, setShowMutation] = useState(false);
    const [drugApplied, setDrugApplied] = useState(false);
    const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
    const [showQuizResults, setShowQuizResults] = useState(false);

    const tabs = [
        { id: 'context', label: 'Scientific Context', icon: '📚' },
        { id: 'simulation', label: 'Resistance Protocol', icon: '🎮' },
        { id: 'analytics', label: 'Advanced Analytics', icon: '📊' }
    ];

    return (
        <div style={{ padding: '1.5rem' }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
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
                    ADVANCED CASE STUDY
                </div>
                <h2 style={{
                    color: '#e2e8f0',
                    fontSize: '1.75rem',
                    fontWeight: 800,
                    marginBottom: '0.5rem'
                }}>
                    The BTK Masterclass: Overcoming Covalent Resistance
                </h2>
                <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
                    From Ibrutinib to Pirtobrutinib: Understanding Drug Resistance & Rational Design
                </p>
            </div>

            {/* Tab Navigation */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '0.75rem',
                marginBottom: '2rem'
            }}>
                {tabs.map(tab => (
                    <motion.button
                        key={tab.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setActivePhase(tab.id as Phase)}
                        style={{
                            padding: '0.75rem 1.5rem',
                            background: activePhase === tab.id
                                ? 'linear-gradient(135deg, #8b5cf6, #6366f1)'
                                : 'rgba(255,255,255,0.1)',
                            border: activePhase === tab.id
                                ? 'none'
                                : '1px solid rgba(255,255,255,0.2)',
                            borderRadius: '12px',
                            color: 'white',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        <span>{tab.icon}</span>
                        {tab.label}
                    </motion.button>
                ))}
            </div>

            {/* Content Area */}
            <AnimatePresence mode="wait">
                {/* PHASE 1: Scientific Context */}
                {activePhase === 'context' && (
                    <motion.div
                        key="context"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                            gap: '1.5rem'
                        }}>
                            {/* The Covalent Era */}
                            <div style={{
                                background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(15, 23, 42, 0.95))',
                                borderRadius: '20px',
                                border: '1px solid rgba(239, 68, 68, 0.3)',
                                padding: '1.5rem'
                            }}>
                                <div style={{
                                    fontSize: '2rem',
                                    marginBottom: '0.75rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem'
                                }}>
                                    <span>⚔️</span>
                                    <span style={{ fontSize: '1.2rem', color: '#ef4444', fontWeight: 700 }}>
                                        The Covalent Era: Ibrutinib
                                    </span>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <InfoItem
                                        label="Target"
                                        value="BTK (Bruton's Tyrosine Kinase) - ATP-binding pocket"
                                        color="#ef4444"
                                    />
                                    <InfoItem
                                        label="Warhead"
                                        value="Acrylamide electrophile (Michael acceptor)"
                                        color="#f59e0b"
                                    />
                                    <InfoItem
                                        label="Reaction"
                                        value="Michael Addition: Cys481 thiol (-SH) attacks acrylamide → permanent C-S bond"
                                        color="#10b981"
                                    />

                                    <div style={{
                                        background: 'rgba(239, 68, 68, 0.15)',
                                        borderRadius: '12px',
                                        padding: '1rem',
                                        border: '1px solid rgba(239, 68, 68, 0.3)'
                                    }}>
                                        <div style={{ color: '#ef4444', fontWeight: 700, marginBottom: '0.5rem' }}>
                                            ⚠️ The Failure (Resistance)
                                        </div>
                                        <div style={{ color: '#fca5a5', fontSize: '0.9rem', lineHeight: 1.5 }}>
                                            Patients develop <strong>Cys481S mutation</strong>: Cysteine is replaced by Serine.
                                            Serine's hydroxyl (-OH) is a <em>much weaker nucleophile</em> than Cysteine's thiol (-SH).
                                            <br /><br />
                                            <strong>Result:</strong> Covalent bond formation becomes impossible → Ibrutinib fails.
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* The Non-Covalent Revolution */}
                            <div style={{
                                background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(15, 23, 42, 0.95))',
                                borderRadius: '20px',
                                border: '1px solid rgba(34, 197, 94, 0.3)',
                                padding: '1.5rem'
                            }}>
                                <div style={{
                                    fontSize: '2rem',
                                    marginBottom: '0.75rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem'
                                }}>
                                    <span>🎯</span>
                                    <span style={{ fontSize: '1.2rem', color: '#22c55e', fontWeight: 700 }}>
                                        Non-Covalent Revolution: Pirtobrutinib
                                    </span>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <InfoItem
                                        label="Strategy"
                                        value="Rational design of a Reversible Non-Covalent inhibitor"
                                        color="#22c55e"
                                    />
                                    <InfoItem
                                        label="Mechanism"
                                        value="Multiple H-bonds + π-π stacking interactions (ignores Cys481 site)"
                                        color="#10b981"
                                    />
                                    <InfoItem
                                        label="Advantage"
                                        value="Works regardless of Cys481 or Ser481 at position 481"
                                        color="#06b6d4"
                                    />

                                    <div style={{
                                        background: 'rgba(34, 197, 94, 0.15)',
                                        borderRadius: '12px',
                                        padding: '1rem',
                                        border: '1px solid rgba(34, 197, 94, 0.3)'
                                    }}>
                                        <div style={{ color: '#22c55e', fontWeight: 700, marginBottom: '0.5rem' }}>
                                            ✅ The Solution
                                        </div>
                                        <div style={{ color: '#86efac', fontSize: '0.9rem', lineHeight: 1.5 }}>
                                            Pirtobrutinib binds via a <strong>network of hydrogen bonds</strong> distributed
                                            across multiple residues in the pocket - not just one specific atom.
                                            <br /><br />
                                            <strong>Result:</strong> Effective against <em>both wild-type AND mutant BTK</em>.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Key Insight Box */}
                        <div style={{
                            marginTop: '1.5rem',
                            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1))',
                            borderRadius: '16px',
                            border: '1px solid rgba(139, 92, 246, 0.3)',
                            padding: '1.5rem',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>💡</div>
                            <div style={{ color: '#e2e8f0', fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                                Key Insight for Drug Discovery
                            </div>
                            <div style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6 }}>
                                <strong>Covalent inhibitors</strong> are powerful but vulnerable to point mutations at the nucleophilic residue.
                                <br />
                                <strong>Non-covalent inhibitors</strong> can be designed to overcome resistance by distributing binding interactions across multiple sites.
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setActivePhase('simulation')}
                            style={{
                                display: 'block',
                                margin: '2rem auto 0',
                                padding: '1rem 2rem',
                                background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
                                border: 'none',
                                borderRadius: '12px',
                                color: 'white',
                                fontWeight: 700,
                                fontSize: '1rem',
                                cursor: 'pointer'
                            }}
                        >
                            Start Simulation →
                        </motion.button>
                    </motion.div>
                )}

                {/* PHASE 2: Resistance Protocol Simulation */}
                {activePhase === 'simulation' && (
                    <motion.div
                        key="simulation"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        {/* Simulation Phase Stepper */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '2rem',
                            marginBottom: '2rem'
                        }}>
                            {[
                                { id: 'covalent', label: 'Covalent Strike', icon: '⚔️' },
                                { id: 'mutation', label: 'Mutation Crisis', icon: '🧬' },
                                { id: 'rescue', label: 'Rational Rescue', icon: '🎯' }
                            ].map((phase, i) => (
                                <div key={phase.id} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    opacity: simPhase === phase.id ? 1 : 0.5
                                }}>
                                    <div style={{
                                        width: '36px',
                                        height: '36px',
                                        borderRadius: '50%',
                                        background: simPhase === phase.id ? '#8b5cf6' : '#334155',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '1.2rem'
                                    }}>
                                        {phase.icon}
                                    </div>
                                    <span style={{ color: '#e2e8f0', fontWeight: 600 }}>{phase.label}</span>
                                </div>
                            ))}
                        </div>

                        {/* Simulation Content */}
                        <div style={{
                            background: 'rgba(0, 0, 0, 0.4)',
                            borderRadius: '20px',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            padding: '2rem',
                            minHeight: '400px'
                        }}>
                            {simPhase === 'covalent' && (
                                <div style={{ textAlign: 'center' }}>
                                    <h3 style={{ color: '#ef4444', marginBottom: '1rem' }}>
                                        Phase 1: The Covalent Strike (Ibrutinib)
                                    </h3>
                                    <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>
                                        Ibrutinib (PDB: 5P9J) uses an acrylamide warhead to form an irreversible C-S bond with Cys481.
                                    </p>

                                    {/* Simplified BTK Pocket Visualization */}
                                    <div style={{
                                        background: 'rgba(15, 23, 42, 0.8)',
                                        borderRadius: '16px',
                                        padding: '2rem',
                                        maxWidth: '500px',
                                        margin: '0 auto'
                                    }}>
                                        <svg viewBox="0 0 300 200" style={{ width: '100%' }}>
                                            {/* Pocket outline */}
                                            <ellipse cx="150" cy="100" rx="120" ry="80" fill="rgba(139, 92, 246, 0.1)" stroke="#8b5cf6" strokeWidth="2" />

                                            {/* Cys481 */}
                                            <circle cx="100" cy="100" r="15" fill="#FFFF30" stroke="#f59e0b" strokeWidth="2" />
                                            <text x="100" y="105" fill="#1e293b" fontSize="10" textAnchor="middle" fontWeight="600">Cys481</text>
                                            <text x="100" y="130" fill="#f59e0b" fontSize="9" textAnchor="middle">-SH (Sulfur)</text>

                                            {/* Ibrutinib */}
                                            <motion.g
                                                animate={drugApplied ? { x: -40 } : { x: 0 }}
                                                transition={{ duration: 0.5 }}
                                            >
                                                <rect x="180" y="85" width="50" height="30" rx="5" fill="#ef4444" />
                                                <text x="205" y="105" fill="white" fontSize="9" textAnchor="middle" fontWeight="600">Ibrutinib</text>
                                                <text x="205" y="130" fill="#fca5a5" fontSize="8" textAnchor="middle">Acrylamide</text>
                                            </motion.g>

                                            {/* Bond formation */}
                                            {drugApplied && (
                                                <motion.line
                                                    initial={{ pathLength: 0 }}
                                                    animate={{ pathLength: 1 }}
                                                    x1="115" y1="100" x2="140" y2="100"
                                                    stroke="#22c55e" strokeWidth="4"
                                                />
                                            )}
                                        </svg>

                                        {!drugApplied ? (
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => setDrugApplied(true)}
                                                style={{
                                                    margin: '1rem auto 0',
                                                    display: 'block',
                                                    padding: '0.75rem 1.5rem',
                                                    background: '#ef4444',
                                                    border: 'none',
                                                    borderRadius: '10px',
                                                    color: 'white',
                                                    fontWeight: 600,
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                Apply Ibrutinib →
                                            </motion.button>
                                        ) : (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                style={{
                                                    marginTop: '1rem',
                                                    padding: '1rem',
                                                    background: 'rgba(34, 197, 94, 0.2)',
                                                    borderRadius: '10px',
                                                    border: '1px solid #22c55e'
                                                }}
                                            >
                                                <div style={{ color: '#22c55e', fontWeight: 600 }}>✓ Covalent Bond Formed!</div>
                                                <div style={{ color: '#86efac', fontSize: '0.85rem' }}>
                                                    Michael Addition: Cys481(-SH) + Acrylamide → Irreversible C-S bond
                                                </div>
                                                <motion.button
                                                    whileHover={{ scale: 1.02 }}
                                                    onClick={() => {
                                                        setSimPhase('mutation');
                                                        setDrugApplied(false);
                                                    }}
                                                    style={{
                                                        marginTop: '1rem',
                                                        padding: '0.5rem 1rem',
                                                        background: '#8b5cf6',
                                                        border: 'none',
                                                        borderRadius: '8px',
                                                        color: 'white',
                                                        fontWeight: 600,
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    Next: See What Happens with Mutation →
                                                </motion.button>
                                            </motion.div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {simPhase === 'mutation' && (
                                <div style={{ textAlign: 'center' }}>
                                    <h3 style={{ color: '#f59e0b', marginBottom: '1rem' }}>
                                        Phase 2: The Mutation Crisis (Cys481S)
                                    </h3>

                                    {/* Mutation Alert */}
                                    <motion.div
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        style={{
                                            padding: '1rem',
                                            background: 'rgba(239, 68, 68, 0.2)',
                                            borderRadius: '12px',
                                            border: '1px solid #ef4444',
                                            marginBottom: '1.5rem',
                                            maxWidth: '500px',
                                            margin: '0 auto 1.5rem'
                                        }}
                                    >
                                        <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🧬 ⚠️</div>
                                        <div style={{ color: '#ef4444', fontWeight: 700 }}>Mutation Detected!</div>
                                        <div style={{ color: '#fca5a5' }}>Cys481 → Ser481</div>
                                    </motion.div>

                                    {/* Failed binding visualization */}
                                    <div style={{
                                        background: 'rgba(15, 23, 42, 0.8)',
                                        borderRadius: '16px',
                                        padding: '2rem',
                                        maxWidth: '500px',
                                        margin: '0 auto'
                                    }}>
                                        <svg viewBox="0 0 300 200" style={{ width: '100%' }}>
                                            <ellipse cx="150" cy="100" rx="120" ry="80" fill="rgba(239, 68, 68, 0.1)" stroke="#ef4444" strokeWidth="2" strokeDasharray="5" />

                                            {/* Ser481 (Mutant) */}
                                            <circle cx="100" cy="100" r="15" fill="#ef4444" stroke="#7f1d1d" strokeWidth="2" />
                                            <text x="100" y="105" fill="white" fontSize="10" textAnchor="middle" fontWeight="600">Ser481</text>
                                            <text x="100" y="130" fill="#fca5a5" fontSize="9" textAnchor="middle">-OH (Oxygen)</text>

                                            {/* Ibrutinib bouncing */}
                                            <motion.g
                                                animate={drugApplied ? { x: [0, -30, 20], opacity: [1, 0.5, 0.3] } : {}}
                                                transition={{ duration: 1 }}
                                            >
                                                <rect x="180" y="85" width="50" height="30" rx="5" fill="#ef4444" opacity="0.5" />
                                                <text x="205" y="105" fill="white" fontSize="9" textAnchor="middle" fontWeight="600">Ibrutinib</text>
                                            </motion.g>

                                            {/* X mark */}
                                            {drugApplied && (
                                                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                                    <line x1="130" y1="80" x2="170" y2="120" stroke="#ef4444" strokeWidth="4" />
                                                    <line x1="170" y1="80" x2="130" y2="120" stroke="#ef4444" strokeWidth="4" />
                                                </motion.g>
                                            )}
                                        </svg>

                                        {!drugApplied ? (
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => setDrugApplied(true)}
                                                style={{
                                                    margin: '1rem auto 0',
                                                    display: 'block',
                                                    padding: '0.75rem 1.5rem',
                                                    background: '#ef4444',
                                                    border: 'none',
                                                    borderRadius: '10px',
                                                    color: 'white',
                                                    fontWeight: 600,
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                Try Ibrutinib Again →
                                            </motion.button>
                                        ) : (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                style={{
                                                    marginTop: '1rem',
                                                    padding: '1rem',
                                                    background: 'rgba(239, 68, 68, 0.2)',
                                                    borderRadius: '10px',
                                                    border: '1px solid #ef4444'
                                                }}
                                            >
                                                <div style={{ color: '#ef4444', fontWeight: 600 }}>✗ Binding Failed!</div>
                                                <div style={{ color: '#fca5a5', fontSize: '0.85rem' }}>
                                                    Serine's -OH is a weak nucleophile. Cannot form stable covalent bond with acrylamide warhead.
                                                    <br /><strong>ΔG insufficient for binding.</strong>
                                                </div>
                                                <motion.button
                                                    whileHover={{ scale: 1.02 }}
                                                    onClick={() => {
                                                        setSimPhase('rescue');
                                                        setDrugApplied(false);
                                                    }}
                                                    style={{
                                                        marginTop: '1rem',
                                                        padding: '0.5rem 1rem',
                                                        background: '#22c55e',
                                                        border: 'none',
                                                        borderRadius: '8px',
                                                        color: 'white',
                                                        fontWeight: 600,
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    Try Non-Covalent Solution →
                                                </motion.button>
                                            </motion.div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {simPhase === 'rescue' && (
                                <div style={{ textAlign: 'center' }}>
                                    <h3 style={{ color: '#22c55e', marginBottom: '1rem' }}>
                                        Phase 3: The Rational Rescue (Pirtobrutinib)
                                    </h3>
                                    <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>
                                        Pirtobrutinib (PDB: 6X4P) uses a network of H-bonds - not a covalent warhead.
                                    </p>

                                    <div style={{
                                        background: 'rgba(15, 23, 42, 0.8)',
                                        borderRadius: '16px',
                                        padding: '2rem',
                                        maxWidth: '500px',
                                        margin: '0 auto'
                                    }}>
                                        <svg viewBox="0 0 300 200" style={{ width: '100%' }}>
                                            <ellipse cx="150" cy="100" rx="120" ry="80" fill="rgba(34, 197, 94, 0.1)" stroke="#22c55e" strokeWidth="2" />

                                            {/* Ser481 (doesn't matter now) */}
                                            <circle cx="80" cy="70" r="10" fill="#64748b" />
                                            <text x="80" y="90" fill="#64748b" fontSize="8" textAnchor="middle">Ser481</text>

                                            {/* Multiple H-bond residues */}
                                            <circle cx="150" cy="60" r="10" fill="#3b82f6" />
                                            <circle cx="200" cy="80" r="10" fill="#3b82f6" />
                                            <circle cx="180" cy="130" r="10" fill="#3b82f6" />
                                            <circle cx="120" cy="140" r="10" fill="#3b82f6" />

                                            {/* Pirtobrutinib in center */}
                                            <motion.g animate={drugApplied ? { scale: 1.1 } : {}}>
                                                <rect x="125" y="85" width="50" height="30" rx="8" fill="#22c55e" />
                                                <text x="150" y="105" fill="white" fontSize="8" textAnchor="middle" fontWeight="600">Pirtobrutinib</text>
                                            </motion.g>

                                            {/* H-bond network */}
                                            {drugApplied && (
                                                <>
                                                    <motion.line initial={{ opacity: 0 }} animate={{ opacity: 1 }} x1="150" y1="85" x2="150" y2="70" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4" />
                                                    <motion.line initial={{ opacity: 0 }} animate={{ opacity: 1 }} x1="175" y1="95" x2="190" y2="85" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4" />
                                                    <motion.line initial={{ opacity: 0 }} animate={{ opacity: 1 }} x1="160" y1="115" x2="175" y2="125" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4" />
                                                    <motion.line initial={{ opacity: 0 }} animate={{ opacity: 1 }} x1="130" y1="115" x2="125" y2="135" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4" />
                                                </>
                                            )}
                                        </svg>

                                        <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                                            <span style={{ color: '#f59e0b' }}>---</span> = Hydrogen Bonds |
                                            <span style={{ color: '#3b82f6' }}> ● </span> = H-bond acceptor residues
                                        </div>

                                        {!drugApplied ? (
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => setDrugApplied(true)}
                                                style={{
                                                    margin: '1rem auto 0',
                                                    display: 'block',
                                                    padding: '0.75rem 1.5rem',
                                                    background: '#22c55e',
                                                    border: 'none',
                                                    borderRadius: '10px',
                                                    color: 'white',
                                                    fontWeight: 600,
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                Apply Pirtobrutinib →
                                            </motion.button>
                                        ) : (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                style={{
                                                    marginTop: '1rem',
                                                    padding: '1rem',
                                                    background: 'rgba(34, 197, 94, 0.2)',
                                                    borderRadius: '10px',
                                                    border: '1px solid #22c55e'
                                                }}
                                            >
                                                <div style={{ color: '#22c55e', fontWeight: 600 }}>✓ Binding Successful!</div>
                                                <div style={{ color: '#86efac', fontSize: '0.85rem' }}>
                                                    4+ H-bonds formed with multiple residues. <br />
                                                    <strong>Mutation at Cys481 is IRRELEVANT!</strong>
                                                </div>
                                                <motion.button
                                                    whileHover={{ scale: 1.02 }}
                                                    onClick={() => setActivePhase('analytics')}
                                                    style={{
                                                        marginTop: '1rem',
                                                        padding: '0.5rem 1rem',
                                                        background: '#8b5cf6',
                                                        border: 'none',
                                                        borderRadius: '8px',
                                                        color: 'white',
                                                        fontWeight: 600,
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    View Comparative Analytics →
                                                </motion.button>
                                            </motion.div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}

                {/* PHASE 3: Advanced Analytics */}
                {activePhase === 'analytics' && (
                    <motion.div
                        key="analytics"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        {/* Comparison Table */}
                        <div style={{
                            background: 'rgba(0,0,0,0.4)',
                            borderRadius: '16px',
                            overflow: 'hidden',
                            marginBottom: '2rem'
                        }}>
                            <div style={{
                                background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
                                padding: '1rem',
                                textAlign: 'center'
                            }}>
                                <h4 style={{ color: 'white', margin: 0 }}>Comparative Analytics: Covalent vs Non-Covalent</h4>
                            </div>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ background: 'rgba(255,255,255,0.05)' }}>
                                        <th style={{ padding: '1rem', color: '#94a3b8', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Parameter</th>
                                        <th style={{ padding: '1rem', color: '#ef4444', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Ibrutinib (1st Gen)</th>
                                        <th style={{ padding: '1rem', color: '#22c55e', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Pirtobrutinib (Next Gen)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        ['Bonding Modality', 'Irreversible Covalent', 'Reversible Non-Covalent'],
                                        ['Reaction Type', 'Michael Addition (Nucleophilic)', 'Thermodynamic Equilibrium'],
                                        ['Binding Pocket', 'Anchored at Cys481', 'Multi-residue stabilization'],
                                        ['Off-target Risk', 'High (EGFR, ITK, TEC kinases)', 'Extremely Low (Highly Selective)'],
                                        ['Mutation Response', 'Resisted by Cys481S', 'Overcomes Cys481S resistance'],
                                        ['IC₅₀ Values', 'Low (nM potency)', 'Ultra-low (Picomolar potency)']
                                    ].map(([param, ibr, pir], i) => (
                                        <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                            <td style={{ padding: '0.75rem 1rem', color: '#e2e8f0', fontWeight: 600 }}>{param}</td>
                                            <td style={{ padding: '0.75rem 1rem', color: '#fca5a5', textAlign: 'center' }}>{ibr}</td>
                                            <td style={{ padding: '0.75rem 1rem', color: '#86efac', textAlign: 'center' }}>{pir}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Advanced Quiz */}
                        <div style={{
                            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(15, 23, 42, 0.95))',
                            borderRadius: '16px',
                            border: '1px solid rgba(139, 92, 246, 0.3)',
                            padding: '1.5rem'
                        }}>
                            <h4 style={{ color: '#e2e8f0', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                🎓 Advanced Challenge Questions
                            </h4>

                            {/* Question 1 */}
                            <QuizQuestion
                                num={1}
                                question="Why does the Cys481S mutation cause clinical resistance to Ibrutinib but not to Pirtobrutinib?"
                                options={[
                                    'Pirtobrutinib is a stronger drug',
                                    'Ibrutinib relies on reaction with Cys481 thiol; Pirtobrutinib uses distributed H-bonds',
                                    'Serine is smaller than Cysteine',
                                    'Pirtobrutinib has better bioavailability'
                                ]}
                                correctIndex={1}
                                selected={quizAnswers[1]}
                                onSelect={(ans) => setQuizAnswers({ ...quizAnswers, 1: ans })}
                                showResult={showQuizResults}
                            />

                            {/* Question 2 */}
                            <QuizQuestion
                                num={2}
                                question="How does the absence of a covalent warhead in Pirtobrutinib contribute to its reduced side-effect profile?"
                                options={[
                                    'It makes the drug cheaper to manufacture',
                                    'It eliminates indiscriminate Michael Addition with non-target nucleophilic residues (like EGFR)',
                                    'It increases water solubility',
                                    'It reduces metabolism in the liver'
                                ]}
                                correctIndex={1}
                                selected={quizAnswers[2]}
                                onSelect={(ans) => setQuizAnswers({ ...quizAnswers, 2: ans })}
                                showResult={showQuizResults}
                            />

                            {quizAnswers[1] && quizAnswers[2] && !showQuizResults && (
                                <motion.button
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    whileHover={{ scale: 1.02 }}
                                    onClick={() => setShowQuizResults(true)}
                                    style={{
                                        width: '100%',
                                        padding: '1rem',
                                        background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
                                        border: 'none',
                                        borderRadius: '12px',
                                        color: 'white',
                                        fontWeight: 700,
                                        cursor: 'pointer',
                                        marginTop: '1rem'
                                    }}
                                >
                                    Check My Answers
                                </motion.button>
                            )}

                            {showQuizResults && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    style={{
                                        marginTop: '1.5rem',
                                        padding: '1.5rem',
                                        background: quizAnswers[1] === '1' && quizAnswers[2] === '1'
                                            ? 'rgba(34, 197, 94, 0.2)'
                                            : 'rgba(239, 68, 68, 0.2)',
                                        borderRadius: '12px',
                                        textAlign: 'center'
                                    }}
                                >
                                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                                        {quizAnswers[1] === '1' && quizAnswers[2] === '1' ? '🎉' : '📚'}
                                    </div>
                                    <div style={{ color: '#e2e8f0', fontWeight: 600 }}>
                                        {quizAnswers[1] === '1' && quizAnswers[2] === '1'
                                            ? 'Excellent! You understand covalent vs non-covalent drug design!'
                                            : 'Review the material and try again!'}
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// Helper Components
function InfoItem({ label, value, color }: { label: string; value: string; color: string }) {
    return (
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: color,
                marginTop: '6px',
                flexShrink: 0
            }} />
            <div>
                <div style={{ color: color, fontWeight: 600, fontSize: '0.85rem' }}>{label}</div>
                <div style={{ color: '#e2e8f0', fontSize: '0.9rem' }}>{value}</div>
            </div>
        </div>
    );
}

function QuizQuestion({
    num,
    question,
    options,
    correctIndex,
    selected,
    onSelect,
    showResult
}: {
    num: number;
    question: string;
    options: string[];
    correctIndex: number;
    selected?: string;
    onSelect: (ans: string) => void;
    showResult: boolean;
}) {
    return (
        <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ color: '#e2e8f0', fontWeight: 600, marginBottom: '0.75rem' }}>
                Q{num}: {question}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {options.map((opt, i) => (
                    <motion.button
                        key={i}
                        whileHover={{ scale: showResult ? 1 : 1.01 }}
                        onClick={() => !showResult && onSelect(String(i))}
                        style={{
                            padding: '0.75rem 1rem',
                            background: selected === String(i)
                                ? (showResult ? (i === correctIndex ? '#22c55e' : '#ef4444') : '#8b5cf6')
                                : 'rgba(255,255,255,0.05)',
                            border: `1px solid ${selected === String(i) ? 'transparent' : 'rgba(255,255,255,0.1)'}`,
                            borderRadius: '8px',
                            color: 'white',
                            textAlign: 'left',
                            cursor: showResult ? 'default' : 'pointer',
                            fontSize: '0.9rem'
                        }}
                    >
                        {opt}
                    </motion.button>
                ))}
            </div>
        </div>
    );
}
