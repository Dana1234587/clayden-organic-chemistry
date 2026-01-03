'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DrugDockingSimulatorProps {
    onComplete?: () => void;
}

export default function DrugDockingSimulator({ onComplete }: DrugDockingSimulatorProps) {
    const [selectedDrug, setSelectedDrug] = useState<'cisplatin' | 'transplatin' | null>(null);
    const [isDocked, setIsDocked] = useState<boolean | null>(null);
    const [showExplanation, setShowExplanation] = useState(false);
    const [attempts, setAttempts] = useState({ cisplatin: false, transplatin: false });

    const handleDrugSelect = (drug: 'cisplatin' | 'transplatin') => {
        setSelectedDrug(drug);
        setIsDocked(null);
        setShowExplanation(false);
    };

    const handleDock = () => {
        if (!selectedDrug) return;

        const success = selectedDrug === 'cisplatin';
        setIsDocked(success);
        setAttempts(prev => ({ ...prev, [selectedDrug]: true }));

        setTimeout(() => {
            setShowExplanation(true);
            if (attempts.cisplatin && attempts.transplatin) {
                onComplete?.();
            }
        }, 1000);
    };

    const resetSimulation = () => {
        setSelectedDrug(null);
        setIsDocked(null);
        setShowExplanation(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
                background: 'var(--gradient-card)',
                borderRadius: '20px',
                border: '1px solid var(--neutral-800)',
                padding: '2rem',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* Header */}
            <div style={{
                textAlign: 'center',
                marginBottom: '2rem'
            }}>
                <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, var(--accent-emerald), var(--accent-cyan))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '0.5rem'
                }}>
                    🧬 DNA Docking Challenge
                </h3>
                <p style={{
                    color: 'var(--neutral-400)',
                    fontSize: '0.9rem'
                }}>
                    Discover why geometry is critical in cancer treatment
                </p>
            </div>

            {/* Drug Selection */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1rem',
                marginBottom: '2rem'
            }}>
                {/* Cisplatin Card */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleDrugSelect('cisplatin')}
                    style={{
                        padding: '1.5rem',
                        background: selectedDrug === 'cisplatin'
                            ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.3), rgba(6, 182, 212, 0.3))'
                            : 'var(--neutral-900)',
                        border: selectedDrug === 'cisplatin'
                            ? '2px solid var(--accent-emerald)'
                            : '1px solid var(--neutral-800)',
                        borderRadius: '16px',
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'all 0.3s'
                    }}
                >
                    <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>💚</div>
                    <h4 style={{
                        color: 'var(--accent-emerald)',
                        fontWeight: 700,
                        marginBottom: '0.25rem'
                    }}>
                        Cisplatin
                    </h4>
                    <p style={{
                        fontSize: '0.8rem',
                        color: 'var(--neutral-400)',
                        margin: 0
                    }}>
                        cis-[Pt(NH₃)₂Cl₂]
                    </p>
                    <div style={{
                        marginTop: '0.75rem',
                        padding: '0.5rem',
                        background: 'rgba(16, 185, 129, 0.1)',
                        borderRadius: '8px',
                        fontSize: '0.75rem',
                        color: 'var(--neutral-300)'
                    }}>
                        Cl atoms on <strong style={{ color: 'var(--accent-emerald)' }}>SAME side</strong>
                        <br />
                        Distance: ~3.3 Å
                    </div>
                    {attempts.cisplatin && (
                        <div style={{ marginTop: '0.5rem', color: 'var(--accent-emerald)' }}>✓ Tested</div>
                    )}
                </motion.button>

                {/* Transplatin Card */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleDrugSelect('transplatin')}
                    style={{
                        padding: '1.5rem',
                        background: selectedDrug === 'transplatin'
                            ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.3), rgba(249, 115, 22, 0.3))'
                            : 'var(--neutral-900)',
                        border: selectedDrug === 'transplatin'
                            ? '2px solid var(--accent-red)'
                            : '1px solid var(--neutral-800)',
                        borderRadius: '16px',
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'all 0.3s'
                    }}
                >
                    <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>❌</div>
                    <h4 style={{
                        color: 'var(--accent-red)',
                        fontWeight: 700,
                        marginBottom: '0.25rem'
                    }}>
                        Transplatin
                    </h4>
                    <p style={{
                        fontSize: '0.8rem',
                        color: 'var(--neutral-400)',
                        margin: 0
                    }}>
                        trans-[Pt(NH₃)₂Cl₂]
                    </p>
                    <div style={{
                        marginTop: '0.75rem',
                        padding: '0.5rem',
                        background: 'rgba(239, 68, 68, 0.1)',
                        borderRadius: '8px',
                        fontSize: '0.75rem',
                        color: 'var(--neutral-300)'
                    }}>
                        Cl atoms on <strong style={{ color: 'var(--accent-red)' }}>OPPOSITE sides</strong>
                        <br />
                        Distance: ~4.6 Å
                    </div>
                    {attempts.transplatin && (
                        <div style={{ marginTop: '0.5rem', color: 'var(--accent-red)' }}>✓ Tested</div>
                    )}
                </motion.button>
            </div>

            {/* DNA Visualization */}
            <div style={{
                position: 'relative',
                background: 'linear-gradient(135deg, var(--neutral-950), var(--neutral-900))',
                borderRadius: '16px',
                padding: '2rem',
                marginBottom: '1.5rem',
                minHeight: '200px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <svg viewBox="0 0 400 150" style={{ width: '100%', maxWidth: '400px' }}>
                    {/* DNA Double Helix Simplified */}
                    <defs>
                        <linearGradient id="dnaGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#8b5cf6" />
                            <stop offset="100%" stopColor="#06b6d4" />
                        </linearGradient>
                        <linearGradient id="dnaGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#f472b6" />
                            <stop offset="100%" stopColor="#fb923c" />
                        </linearGradient>
                    </defs>

                    {/* DNA Backbone 1 */}
                    <path
                        d="M 30 40 Q 100 10, 200 40 Q 300 70, 370 40"
                        fill="none"
                        stroke="url(#dnaGradient1)"
                        strokeWidth="8"
                        strokeLinecap="round"
                    />

                    {/* DNA Backbone 2 */}
                    <path
                        d="M 30 110 Q 100 140, 200 110 Q 300 80, 370 110"
                        fill="none"
                        stroke="url(#dnaGradient2)"
                        strokeWidth="8"
                        strokeLinecap="round"
                    />

                    {/* Base Pairs */}
                    {[60, 120, 180, 240, 300, 340].map((x, i) => (
                        <line
                            key={i}
                            x1={x}
                            y1={35 + Math.sin((x - 30) / 50) * 15}
                            x2={x}
                            y2={115 - Math.sin((x - 30) / 50) * 15}
                            stroke="var(--neutral-700)"
                            strokeWidth="2"
                            strokeDasharray="4,4"
                        />
                    ))}

                    {/* Binding Site Highlight */}
                    <rect
                        x="160"
                        y="30"
                        width="80"
                        height="90"
                        rx="10"
                        fill={isDocked === true ? "rgba(16, 185, 129, 0.3)" : isDocked === false ? "rgba(239, 68, 68, 0.2)" : "rgba(139, 92, 246, 0.1)"}
                        stroke={isDocked === true ? "var(--accent-emerald)" : isDocked === false ? "var(--accent-red)" : "var(--primary-500)"}
                        strokeWidth="2"
                        strokeDasharray={isDocked === null ? "8,4" : "none"}
                    />

                    <text x="200" y="80" textAnchor="middle" fill="var(--neutral-400)" fontSize="10">
                        {isDocked === null ? "Binding Site" : isDocked ? "BOUND!" : "REJECTED"}
                    </text>

                    {/* Drug Molecule Representation */}
                    {selectedDrug && (
                        <motion.g
                            initial={{ x: -50, opacity: 0 }}
                            animate={{
                                x: isDocked !== null ? 0 : 0,
                                opacity: 1,
                                scale: isDocked === false ? [1, 0.8, 1] : 1
                            }}
                            transition={{ duration: 0.5 }}
                        >
                            {selectedDrug === 'cisplatin' ? (
                                // Cisplatin - Cls on same side
                                <g transform="translate(180, 55)">
                                    <circle cx="20" cy="20" r="15" fill="#a855f7" opacity="0.9" />
                                    <text x="20" y="25" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Pt</text>
                                    <circle cx="0" cy="35" r="8" fill="#22c55e" />
                                    <text x="0" y="38" textAnchor="middle" fill="white" fontSize="6">Cl</text>
                                    <circle cx="40" cy="35" r="8" fill="#22c55e" />
                                    <text x="40" y="38" textAnchor="middle" fill="white" fontSize="6">Cl</text>
                                    <circle cx="0" cy="5" r="7" fill="#3b82f6" />
                                    <text x="0" y="8" textAnchor="middle" fill="white" fontSize="5">NH₃</text>
                                    <circle cx="40" cy="5" r="7" fill="#3b82f6" />
                                    <text x="40" y="8" textAnchor="middle" fill="white" fontSize="5">NH₃</text>
                                </g>
                            ) : (
                                // Transplatin - Cls on opposite sides
                                <g transform="translate(180, 55)">
                                    <circle cx="20" cy="20" r="15" fill="#a855f7" opacity="0.9" />
                                    <text x="20" y="25" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Pt</text>
                                    <circle cx="0" cy="20" r="8" fill="#ef4444" />
                                    <text x="0" y="23" textAnchor="middle" fill="white" fontSize="6">Cl</text>
                                    <circle cx="40" cy="20" r="8" fill="#ef4444" />
                                    <text x="40" y="23" textAnchor="middle" fill="white" fontSize="6">Cl</text>
                                    <circle cx="20" cy="0" r="7" fill="#3b82f6" />
                                    <text x="20" y="3" textAnchor="middle" fill="white" fontSize="5">NH₃</text>
                                    <circle cx="20" cy="40" r="7" fill="#3b82f6" />
                                    <text x="20" y="43" textAnchor="middle" fill="white" fontSize="5">NH₃</text>
                                </g>
                            )}
                        </motion.g>
                    )}
                </svg>
            </div>

            {/* Action Button */}
            {selectedDrug && isDocked === null && (
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleDock}
                    style={{
                        width: '100%',
                        padding: '1rem',
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        color: 'white',
                        background: 'linear-gradient(135deg, var(--primary-500), var(--primary-600))',
                        border: 'none',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        marginBottom: '1rem'
                    }}
                >
                    🧬 Attempt DNA Binding
                </motion.button>
            )}

            {/* Reset Button */}
            {isDocked !== null && (
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={resetSimulation}
                    style={{
                        width: '100%',
                        padding: '0.75rem',
                        fontSize: '1rem',
                        fontWeight: 500,
                        color: 'var(--neutral-300)',
                        background: 'var(--neutral-800)',
                        border: 'none',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        marginBottom: '1rem'
                    }}
                >
                    🔄 Try Another Drug
                </motion.button>
            )}

            {/* Explanation Panel */}
            <AnimatePresence>
                {showExplanation && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        style={{
                            padding: '1.5rem',
                            background: isDocked
                                ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(6, 182, 212, 0.15))'
                                : 'linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(249, 115, 22, 0.15))',
                            borderRadius: '16px',
                            border: `1px solid ${isDocked ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`
                        }}
                    >
                        <h4 style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            marginTop: 0,
                            color: isDocked ? 'var(--accent-emerald)' : 'var(--accent-red)'
                        }}>
                            {isDocked ? '✅ Binding Successful!' : '❌ Binding Failed!'}
                        </h4>

                        {isDocked ? (
                            <div style={{ color: 'var(--neutral-300)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                                <p><strong>Cisplatin binds successfully!</strong></p>
                                <p>
                                    The <strong style={{ color: 'var(--accent-emerald)' }}>cis configuration</strong> places
                                    both chloride ions on the <strong>same side</strong> of the platinum center
                                    (distance: ~3.3 Å). This allows them to bind to two adjacent guanine bases
                                    on the same DNA strand, creating a <strong>cross-link</strong> that:
                                </p>
                                <ul style={{ paddingLeft: '1.5rem', margin: '0.5rem 0' }}>
                                    <li>Bends the DNA helix</li>
                                    <li>Blocks DNA replication</li>
                                    <li>Triggers cancer cell death (apoptosis)</li>
                                </ul>
                                <p style={{
                                    padding: '0.75rem',
                                    background: 'rgba(16, 185, 129, 0.1)',
                                    borderRadius: '8px',
                                    marginBottom: 0
                                }}>
                                    💊 <strong>Clinical Impact:</strong> Cisplatin treats testicular, ovarian, bladder,
                                    and lung cancers with a cure rate of over 90% for testicular cancer!
                                </p>
                            </div>
                        ) : (
                            <div style={{ color: 'var(--neutral-300)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                                <p><strong>Transplatin cannot bind DNA effectively!</strong></p>
                                <p>
                                    The <strong style={{ color: 'var(--accent-red)' }}>trans configuration</strong> places
                                    the chloride ions on <strong>opposite sides</strong> of the platinum center
                                    (distance: ~4.6 Å). This geometry is incompatible with DNA binding because:
                                </p>
                                <ul style={{ paddingLeft: '1.5rem', margin: '0.5rem 0' }}>
                                    <li>The Cl atoms are too far apart to bind adjacent bases</li>
                                    <li>Cannot form stable cross-links</li>
                                    <li>Any bindings formed are quickly repaired by the cell</li>
                                </ul>
                                <p style={{
                                    padding: '0.75rem',
                                    background: 'rgba(239, 68, 68, 0.1)',
                                    borderRadius: '8px',
                                    marginBottom: 0
                                }}>
                                    🔑 <strong>Key Lesson:</strong> Same atoms, same formula, but different geometry =
                                    completely different biological activity. This is why stereochemistry matters in drug design!
                                </p>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Progress Indicator */}
            {(attempts.cisplatin || attempts.transplatin) && (
                <div style={{
                    marginTop: '1rem',
                    padding: '0.75rem',
                    background: 'var(--neutral-900)',
                    borderRadius: '8px',
                    textAlign: 'center',
                    fontSize: '0.85rem',
                    color: 'var(--neutral-400)'
                }}>
                    {attempts.cisplatin && attempts.transplatin ? (
                        <span style={{ color: 'var(--accent-emerald)' }}>
                            🎉 Challenge Complete! You understand why geometry matters in medicine.
                        </span>
                    ) : (
                        <span>
                            Try both drugs to complete the challenge!
                            {attempts.cisplatin && ' ✓ Cisplatin tested'}
                            {attempts.transplatin && ' ✓ Transplatin tested'}
                        </span>
                    )}
                </div>
            )}
        </motion.div>
    );
}
