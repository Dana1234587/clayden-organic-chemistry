'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// ============================================================================
// COMBRETASTATIN A-4: The Geometric Trap Case Study
// PhD-Level Drug Development Lab - Cis-Trans Isomerism
// ============================================================================

interface IsomerData {
    name: string;
    configuration: 'cis' | 'trans';
    geometry: string;
    ic50: string;
    potency: string;
    binds: boolean;
    color: string;
}

const ISOMERS: IsomerData[] = [
    {
        name: 'Combretastatin A-4 (Z)',
        configuration: 'cis',
        geometry: 'Bent / Curved',
        ic50: '1-10 nM',
        potency: 'High',
        binds: true,
        color: '#22c55e'
    },
    {
        name: 'trans-Combretastatin A-4 (E)',
        configuration: 'trans',
        geometry: 'Linear / Straight',
        ic50: '1-10 μM',
        potency: '1000× weaker',
        binds: false,
        color: '#ef4444'
    }
];

export default function CombretastatinCaseStudy() {
    const [selectedIsomer, setSelectedIsomer] = useState<'cis' | 'trans'>('cis');
    const [showMechanism, setShowMechanism] = useState(false);
    const [attemptedRotation, setAttemptedRotation] = useState(false);

    const currentIsomer = ISOMERS.find(i => i.configuration === selectedIsomer)!;

    return (
        <div style={{ padding: '1.5rem' }}>
            {/* Header */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1.5rem'
            }}>
                <span style={{ fontSize: '1.5rem' }}>🎯</span>
                <div>
                    <h4 style={{ color: '#e2e8f0', margin: 0 }}>
                        The Geometric Trap: Cis-Trans Drug Selectivity
                    </h4>
                    <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.85rem' }}>
                        How π bond rigidity determines if a drug heals or fails
                    </p>
                </div>
            </div>

            {/* Main Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1.2fr',
                gap: '1.5rem'
            }}>
                {/* Left: The Chemical Puzzle */}
                <div style={{
                    background: 'rgba(0, 0, 0, 0.4)',
                    borderRadius: '16px',
                    padding: '1.25rem',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                    <div style={{
                        padding: '1rem',
                        background: 'rgba(139, 92, 246, 0.1)',
                        borderRadius: '12px',
                        border: '1px solid rgba(139, 92, 246, 0.3)',
                        marginBottom: '1rem'
                    }}>
                        <div style={{ color: '#a78bfa', fontWeight: 700, marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                            🔬 The Chemical Puzzle
                        </div>
                        <div style={{ color: '#e2e8f0', fontSize: '0.85rem', lineHeight: 1.5 }}>
                            <strong>Combretastatin A-4</strong> targets <strong>Tubulin</strong> protein,
                            disrupting cancer cell division. The central <strong style={{ color: '#f59e0b' }}>C=C</strong> double
                            bond creates a <strong>geometric lock</strong> — the π bond prevents rotation!
                        </div>
                    </div>

                    <div style={{
                        padding: '1rem',
                        background: 'rgba(239, 68, 68, 0.1)',
                        borderRadius: '12px',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        marginBottom: '1rem'
                    }}>
                        <div style={{ color: '#f87171', fontWeight: 700, marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                            ⚠️ The Critical Discovery
                        </div>
                        <div style={{ color: '#e2e8f0', fontSize: '0.85rem', lineHeight: 1.5 }}>
                            The <strong style={{ color: '#22c55e' }}>cis-isomer</strong> is
                            <strong> 1000× more potent</strong> than the
                            <strong style={{ color: '#ef4444' }}> trans-isomer</strong>!
                            Same atoms, same bonds — but the <strong>geometry</strong> determines everything.
                        </div>
                    </div>

                    {/* Rotation Barrier Demo */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setAttemptedRotation(true)}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            background: attemptedRotation
                                ? 'linear-gradient(135deg, #ef4444, #dc2626)'
                                : 'rgba(255, 255, 255, 0.1)',
                            border: 'none',
                            borderRadius: '12px',
                            color: 'white',
                            fontWeight: 600,
                            cursor: 'pointer',
                            fontSize: '0.85rem'
                        }}
                    >
                        {attemptedRotation ? '❌ Rotation Blocked! π bond prevents it' : '🔄 Try to Rotate C=C Bond'}
                    </motion.button>

                    <AnimatePresence>
                        {attemptedRotation && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                style={{
                                    marginTop: '0.75rem',
                                    padding: '0.75rem',
                                    background: 'rgba(239, 68, 68, 0.2)',
                                    borderRadius: '8px',
                                    border: '1px solid rgba(239, 68, 68, 0.4)'
                                }}
                            >
                                <div style={{ color: '#fca5a5', fontSize: '0.75rem', fontWeight: 600 }}>
                                    ⚡ Energy Barrier: ~260 kJ/mol
                                </div>
                                <div style={{ color: '#e2e8f0', fontSize: '0.7rem', marginTop: '0.25rem' }}>
                                    You must <strong>break</strong> the π bond to rotate. This energy barrier
                                    locks the geometry — creating distinct cis and trans isomers.
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Right: Isomer Comparison */}
                <div style={{
                    background: 'white',
                    borderRadius: '16px',
                    padding: '1rem',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    {/* Isomer Selector */}
                    <div style={{
                        display: 'flex',
                        gap: '0.5rem',
                        marginBottom: '1rem'
                    }}>
                        {ISOMERS.map((isomer) => (
                            <motion.button
                                key={isomer.configuration}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setSelectedIsomer(isomer.configuration)}
                                style={{
                                    flex: 1,
                                    padding: '0.6rem',
                                    background: selectedIsomer === isomer.configuration
                                        ? isomer.color
                                        : '#f1f5f9',
                                    border: 'none',
                                    borderRadius: '8px',
                                    color: selectedIsomer === isomer.configuration ? 'white' : '#475569',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    fontSize: '0.8rem'
                                }}
                            >
                                {isomer.configuration === 'cis' ? '✓ Cis (Z) - Active' : '✗ Trans (E) - Inactive'}
                            </motion.button>
                        ))}
                    </div>

                    {/* Structure Visualization */}
                    <div style={{
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        background: '#f8fafc',
                        borderRadius: '12px',
                        padding: '1rem',
                        minHeight: '200px'
                    }}>
                        <svg viewBox="0 0 300 180" style={{ width: '100%', height: '180px' }}>
                            {selectedIsomer === 'cis' ? (
                                /* Cis-Combretastatin - Curved/Bent structure */
                                <g>
                                    <text x="150" y="15" fill="#1e293b" fontSize="11" textAnchor="middle" fontWeight="700">
                                        Cis-Combretastatin A-4 (Z-configuration)
                                    </text>

                                    {/* Left trimethoxyphenyl ring */}
                                    <circle cx="60" cy="90" r="30" fill="none" stroke="#475569" strokeWidth="2" />
                                    <text x="60" y="95" fill="#475569" fontSize="9" textAnchor="middle">OMe₃</text>

                                    {/* C=C double bond - angled */}
                                    <line x1="90" y1="90" x2="120" y2="70" stroke="#f59e0b" strokeWidth="3" />
                                    <line x1="93" y1="95" x2="123" y2="75" stroke="#f59e0b" strokeWidth="3" />

                                    {/* π bond label */}
                                    <text x="107" y="60" fill="#f59e0b" fontSize="8" textAnchor="middle" fontWeight="600">
                                        π bond
                                    </text>

                                    {/* Right hydroxyphenyl ring - bent UP (same side) */}
                                    <line x1="120" y1="70" x2="150" y2="50" stroke="#475569" strokeWidth="2" />
                                    <circle cx="180" cy="45" r="28" fill="none" stroke="#22c55e" strokeWidth="2" />
                                    <text x="180" y="50" fill="#22c55e" fontSize="9" textAnchor="middle">OH</text>
                                    <text x="180" y="62" fill="#22c55e" fontSize="8" textAnchor="middle">OMe</text>

                                    {/* Bent arrow showing geometry */}
                                    <path d="M 60 130 Q 120 110 180 80" stroke="#22c55e" strokeWidth="1.5" fill="none" strokeDasharray="4" />
                                    <text x="120" y="135" fill="#22c55e" fontSize="9" textAnchor="middle" fontWeight="600">
                                        Curved geometry → Fits receptor
                                    </text>

                                    {/* Binding indicator */}
                                    <rect x="220" y="30" width="70" height="50" rx="8" fill="#dcfce7" stroke="#22c55e" strokeWidth="1.5" />
                                    <text x="255" y="50" fill="#15803d" fontSize="8" textAnchor="middle" fontWeight="600">Tubulin</text>
                                    <text x="255" y="65" fill="#15803d" fontSize="8" textAnchor="middle" fontWeight="600">BINDS ✓</text>
                                </g>
                            ) : (
                                /* Trans-Combretastatin - Linear/Straight structure */
                                <g>
                                    <text x="150" y="15" fill="#1e293b" fontSize="11" textAnchor="middle" fontWeight="700">
                                        Trans-Combretastatin A-4 (E-configuration)
                                    </text>

                                    {/* Left trimethoxyphenyl ring */}
                                    <circle cx="50" cy="90" r="30" fill="none" stroke="#475569" strokeWidth="2" />
                                    <text x="50" y="95" fill="#475569" fontSize="9" textAnchor="middle">OMe₃</text>

                                    {/* C=C double bond - straight horizontal */}
                                    <line x1="80" y1="90" x2="130" y2="90" stroke="#f59e0b" strokeWidth="3" />
                                    <line x1="80" y1="85" x2="130" y2="85" stroke="#f59e0b" strokeWidth="3" />

                                    {/* π bond label */}
                                    <text x="105" y="75" fill="#f59e0b" fontSize="8" textAnchor="middle" fontWeight="600">
                                        π bond
                                    </text>

                                    {/* Right hydroxyphenyl ring - straight (opposite side) */}
                                    <line x1="130" y1="90" x2="170" y2="90" stroke="#475569" strokeWidth="2" />
                                    <circle cx="200" cy="90" r="28" fill="none" stroke="#ef4444" strokeWidth="2" />
                                    <text x="200" y="95" fill="#ef4444" fontSize="9" textAnchor="middle">OH</text>
                                    <text x="200" y="107" fill="#ef4444" fontSize="8" textAnchor="middle">OMe</text>

                                    {/* Straight line showing geometry */}
                                    <line x1="50" y1="130" x2="200" y2="130" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4" />
                                    <text x="125" y="145" fill="#ef4444" fontSize="9" textAnchor="middle" fontWeight="600">
                                        Linear geometry → Steric clash!
                                    </text>

                                    {/* Blocked binding indicator */}
                                    <rect x="230" y="70" width="60" height="45" rx="8" fill="#fef2f2" stroke="#ef4444" strokeWidth="1.5" />
                                    <text x="260" y="88" fill="#dc2626" fontSize="8" textAnchor="middle" fontWeight="600">Tubulin</text>
                                    <text x="260" y="103" fill="#dc2626" fontSize="8" textAnchor="middle" fontWeight="600">BLOCKED ✗</text>
                                </g>
                            )}
                        </svg>
                    </div>

                    {/* Binding Data */}
                    <div style={{
                        marginTop: '0.75rem',
                        padding: '0.75rem',
                        background: currentIsomer.binds ? '#f0fdf4' : '#fef2f2',
                        borderRadius: '8px',
                        border: `1px solid ${currentIsomer.binds ? '#22c55e' : '#ef4444'}`
                    }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', textAlign: 'center' }}>
                            <div>
                                <div style={{ color: '#64748b', fontSize: '0.65rem' }}>IC₅₀</div>
                                <div style={{ color: currentIsomer.color, fontWeight: 700, fontSize: '0.9rem' }}>
                                    {currentIsomer.ic50}
                                </div>
                            </div>
                            <div>
                                <div style={{ color: '#64748b', fontSize: '0.65rem' }}>Geometry</div>
                                <div style={{ color: currentIsomer.color, fontWeight: 700, fontSize: '0.9rem' }}>
                                    {currentIsomer.geometry}
                                </div>
                            </div>
                            <div>
                                <div style={{ color: '#64748b', fontSize: '0.65rem' }}>Tubulin Binding</div>
                                <div style={{ color: currentIsomer.color, fontWeight: 700, fontSize: '0.9rem' }}>
                                    {currentIsomer.binds ? '✓ Yes' : '✗ No'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Comparison Table */}
            <div style={{
                marginTop: '1.5rem',
                background: 'rgba(0, 0, 0, 0.4)',
                borderRadius: '16px',
                padding: '1.25rem',
                border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
                <div style={{ color: '#e2e8f0', fontWeight: 700, marginBottom: '1rem', fontSize: '0.95rem' }}>
                    📊 Isomer Comparison (Structure-Activity Relationship)
                </div>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1.5fr 1fr 1fr',
                    gap: '1px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    overflow: 'hidden'
                }}>
                    {/* Header */}
                    <div style={{ background: '#1e293b', padding: '0.75rem', color: '#94a3b8', fontWeight: 600, fontSize: '0.8rem' }}>
                        Property
                    </div>
                    <div style={{ background: '#1e293b', padding: '0.75rem', color: '#22c55e', fontWeight: 600, fontSize: '0.8rem', textAlign: 'center' }}>
                        Cis (Z) - Active
                    </div>
                    <div style={{ background: '#1e293b', padding: '0.75rem', color: '#ef4444', fontWeight: 600, fontSize: '0.8rem', textAlign: 'center' }}>
                        Trans (E) - Inactive
                    </div>

                    {/* Rows */}
                    {[
                        ['Geometry', 'Bent / Curved', 'Linear / Straight'],
                        ['π Bond State', 'Locked (Z-config)', 'Locked (E-config)'],
                        ['Target', 'Tubulin Colchicine Site', 'No specific binding'],
                        ['Potency (IC₅₀)', '1-10 nM', '1-10 μM (1000× weaker)'],
                        ['Clinical Use', 'Vascular Disrupting Agent', 'Metabolic byproduct']
                    ].map(([prop, cis, trans], idx) => (
                        <>
                            <div key={`p-${idx}`} style={{ background: idx % 2 === 0 ? '#0f172a' : '#1e293b', padding: '0.6rem', color: '#e2e8f0', fontSize: '0.75rem' }}>
                                {prop}
                            </div>
                            <div key={`c-${idx}`} style={{ background: idx % 2 === 0 ? '#0f172a' : '#1e293b', padding: '0.6rem', color: '#86efac', fontSize: '0.75rem', textAlign: 'center' }}>
                                {cis}
                            </div>
                            <div key={`t-${idx}`} style={{ background: idx % 2 === 0 ? '#0f172a' : '#1e293b', padding: '0.6rem', color: '#fca5a5', fontSize: '0.75rem', textAlign: 'center' }}>
                                {trans}
                            </div>
                        </>
                    ))}
                </div>
            </div>

            {/* Research Insight */}
            <div style={{
                marginTop: '1rem',
                padding: '1rem',
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))',
                borderRadius: '12px',
                border: '1px solid rgba(59, 130, 246, 0.3)'
            }}>
                <div style={{ color: '#93c5fd', fontWeight: 700, marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                    💡 Research Insight: Preventing Isomerization
                </div>
                <div style={{ color: '#e2e8f0', fontSize: '0.8rem', lineHeight: 1.5 }}>
                    In drug development, the active <strong style={{ color: '#22c55e' }}>cis-isomer</strong> can slowly
                    convert to the inactive <strong style={{ color: '#ef4444' }}>trans-form</strong> in the body (photoisomerization).
                    Medicinal chemists use strategies like <strong>Epoxide Formation</strong> (Prilezhaev Reaction) to
                    lock the geometry permanently, creating more stable drug analogs like <strong>CA-4 Phosphate</strong>.
                </div>
            </div>

            {/* Link to Featured Reaction */}
            <Link href="/reactions" style={{ textDecoration: 'none' }}>
                <motion.div
                    whileHover={{ scale: 1.01, y: -2 }}
                    style={{
                        marginTop: '1rem',
                        padding: '1rem',
                        background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer'
                    }}
                >
                    <div>
                        <div style={{ color: 'white', fontWeight: 700, fontSize: '0.9rem' }}>
                            ⚗️ Related Reaction: Michael Addition
                        </div>
                        <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.75rem' }}>
                            Learn how C=C bonds in α,β-unsaturated systems create targeted covalent inhibitors
                        </div>
                    </div>
                    <div style={{ color: 'white', fontSize: '1.5rem' }}>→</div>
                </motion.div>
            </Link>
        </div>
    );
}
