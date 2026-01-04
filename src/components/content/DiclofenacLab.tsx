'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ============================================================================
// TYPES
// ============================================================================

interface Molecule {
    name: string;
    stage: string;
    pubchemCid: number;
    functionalGroups: {
        name: string;
        role: string;
        benefit: string;
        color: string;
    }[];
}

// ============================================================================
// MOLECULE DATA
// ============================================================================

const MOLECULES: Molecule[] = [
    {
        name: 'Phenylacetic Acid',
        stage: 'Lead Compound',
        pubchemCid: 30,
        functionalGroups: [
            { name: 'Carboxylic Acid (-COOH)', role: 'COX binding site', benefit: 'Provides basic anti-inflammatory activity', color: '#ef4444' },
            { name: 'Phenyl Ring', role: 'Hydrophobic scaffold', benefit: 'Initial binding to enzyme pocket', color: '#3b82f6' }
        ]
    },
    {
        name: 'Diclofenac Acid',
        stage: 'Optimized Lead',
        pubchemCid: 3033,
        functionalGroups: [
            { name: 'Carboxylic Acid (-COOH)', role: 'COX-2 selective binding', benefit: 'Enhanced potency + selectivity', color: '#ef4444' },
            { name: '2,6-Dichloro Groups', role: 'Conformational lock', benefit: 'Forces 80° twist for perfect COX-2 fit', color: '#22c55e' },
            { name: 'Secondary Amine (-NH-)', role: 'H-bond donor', benefit: 'Locks rings in optimal geometry', color: '#f59e0b' },
            { name: 'Phenyl Rings (2)', role: 'Non-planar scaffold', benefit: 'Fills hydrophobic pocket of COX-2', color: '#3b82f6' }
        ]
    },
    {
        name: 'Diclofenac Sodium',
        stage: 'Voltaren® (Sustained)',
        pubchemCid: 5018304,
        functionalGroups: [
            { name: 'Carboxylate (-COO⁻)', role: 'Ionic form', benefit: 'Water soluble, slow dissolution', color: '#ef4444' },
            { name: 'Na⁺ Counter-ion', role: 'Salt former', benefit: 'High lattice energy → slow release', color: '#8b5cf6' },
            { name: '2,6-Dichloro Groups', role: 'Conformational lock', benefit: 'Maintains COX-2 selectivity', color: '#22c55e' }
        ]
    },
    {
        name: 'Diclofenac Potassium',
        stage: 'Cataflam® (Rapid)',
        pubchemCid: 3243,
        functionalGroups: [
            { name: 'Carboxylate (-COO⁻)', role: 'Ionic form', benefit: 'Water soluble, FAST dissolution', color: '#ef4444' },
            { name: 'K⁺ Counter-ion', role: 'Salt former', benefit: 'Lower lattice energy → rapid release', color: '#10b981' },
            { name: '2,6-Dichloro Groups', role: 'Conformational lock', benefit: 'Maintains COX-2 selectivity', color: '#22c55e' }
        ]
    }
];

// ============================================================================
// PHASE 1: THE CHEMIST - Chlorine Placement Simulator
// ============================================================================

function Phase1Chemist({ onComplete }: { onComplete: () => void }) {
    const [clPlaced, setClPlaced] = useState<{ position1: boolean; position2: boolean }>({ position1: false, position2: false });
    const [showSuccess, setShowSuccess] = useState(false);
    const [wrongPlacement, setWrongPlacement] = useState(false);

    const handlePositionClick = (position: 'position1' | 'position2' | 'wrong') => {
        if (position === 'wrong') {
            setWrongPlacement(true);
            setTimeout(() => setWrongPlacement(false), 2000);
            return;
        }

        setClPlaced(prev => ({ ...prev, [position]: true }));

        // Check if both placed
        const newState = { ...clPlaced, [position]: true };
        if (newState.position1 && newState.position2) {
            setTimeout(() => {
                setShowSuccess(true);
                setTimeout(onComplete, 1500);
            }, 500);
        }
    };

    const bothPlaced = clPlaced.position1 && clPlaced.position2;

    return (
        <div style={{ padding: '1.5rem' }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1.5rem'
            }}>
                <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 700
                }}>1</div>
                <div>
                    <h4 style={{ color: '#e2e8f0', margin: 0 }}>The Chemist: Lead Optimization</h4>
                    <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.85rem' }}>
                        Add chlorine atoms to the ortho positions (2,6) for COX-2 selectivity
                    </p>
                </div>
            </div>

            {/* Molecule Visualization */}
            <div style={{
                background: 'rgba(0, 0, 0, 0.4)',
                borderRadius: '16px',
                padding: '2rem',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.5rem',
                position: 'relative'
            }}>
                {/* Wrong Placement Warning */}
                <AnimatePresence>
                    {wrongPlacement && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            style={{
                                position: 'absolute',
                                top: '1rem',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                padding: '0.75rem 1.5rem',
                                background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                                borderRadius: '12px',
                                color: 'white',
                                fontWeight: 600,
                                fontSize: '0.9rem',
                                zIndex: 10
                            }}
                        >
                            ⚠️ Wrong Position! Low Binding Affinity—Wrong Geometry
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Success Message */}
                <AnimatePresence>
                    {showSuccess && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                padding: '1.5rem 3rem',
                                background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                                borderRadius: '16px',
                                color: 'white',
                                fontWeight: 700,
                                fontSize: '1.2rem',
                                zIndex: 10,
                                textAlign: 'center'
                            }}
                        >
                            ✅ Perfect! Non-planar conformation achieved!
                            <div style={{ fontSize: '0.9rem', fontWeight: 400, marginTop: '0.5rem' }}>
                                Dihedral angle: 80° → Optimal COX-2 fit
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* SVG Molecule Representation */}
                <svg width="400" height="200" viewBox="0 0 400 200">
                    {/* Ring 1 (Phenylacetate - left) */}
                    <g transform="translate(100, 100)">
                        <polygon
                            points="0,-40 35,-20 35,20 0,40 -35,20 -35,-20"
                            fill="none"
                            stroke="#64748b"
                            strokeWidth="2"
                        />
                        <circle cx="0" cy="0" r="15" fill="#64748b" opacity="0.3" />

                        {/* Carboxylic acid */}
                        <line x1="0" y1="40" x2="0" y2="70" stroke="#ef4444" strokeWidth="3" />
                        <text x="0" y="85" fill="#ef4444" fontSize="12" textAnchor="middle" fontWeight="600">COOH</text>
                    </g>

                    {/* NH Bridge */}
                    <line x1="135" y1="100" x2="165" y2="100" stroke="#f59e0b" strokeWidth="3" />
                    <text x="150" y="90" fill="#f59e0b" fontSize="14" textAnchor="middle" fontWeight="600">NH</text>

                    {/* Ring 2 (Dichlorophenyl - right) */}
                    <g transform="translate(250, 100)">
                        <polygon
                            points="0,-40 35,-20 35,20 0,40 -35,20 -35,-20"
                            fill="none"
                            stroke="#64748b"
                            strokeWidth="2"
                        />
                        <circle cx="0" cy="0" r="15" fill="#64748b" opacity="0.3" />

                        {/* Ortho position 1 (2-position) - Top Left */}
                        <motion.g
                            whileHover={!clPlaced.position1 ? { scale: 1.3 } : {}}
                            style={{ cursor: !clPlaced.position1 ? 'pointer' : 'default' }}
                            onClick={() => !clPlaced.position1 && handlePositionClick('position1')}
                        >
                            {clPlaced.position1 ? (
                                <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                    <circle cx="-35" cy="-20" r="12" fill="#22c55e" />
                                    <text x="-35" y="-16" fill="white" fontSize="10" textAnchor="middle" fontWeight="700">Cl</text>
                                </motion.g>
                            ) : (
                                <g>
                                    <circle cx="-35" cy="-20" r="12" fill="#22c55e" opacity="0.3" stroke="#22c55e" strokeWidth="2" strokeDasharray="4" />
                                    <text x="-35" y="-16" fill="#22c55e" fontSize="10" textAnchor="middle" fontWeight="600">2</text>
                                </g>
                            )}
                        </motion.g>

                        {/* Ortho position 2 (6-position) - Bottom Left */}
                        <motion.g
                            whileHover={!clPlaced.position2 ? { scale: 1.3 } : {}}
                            style={{ cursor: !clPlaced.position2 ? 'pointer' : 'default' }}
                            onClick={() => !clPlaced.position2 && handlePositionClick('position2')}
                        >
                            {clPlaced.position2 ? (
                                <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                    <circle cx="-35" cy="20" r="12" fill="#22c55e" />
                                    <text x="-35" y="24" fill="white" fontSize="10" textAnchor="middle" fontWeight="700">Cl</text>
                                </motion.g>
                            ) : (
                                <g>
                                    <circle cx="-35" cy="20" r="12" fill="#22c55e" opacity="0.3" stroke="#22c55e" strokeWidth="2" strokeDasharray="4" />
                                    <text x="-35" y="24" fill="#22c55e" fontSize="10" textAnchor="middle" fontWeight="600">6</text>
                                </g>
                            )}
                        </motion.g>

                        {/* Wrong positions (meta and para) */}
                        <motion.g
                            whileHover={{ scale: 1.2 }}
                            style={{ cursor: 'pointer', opacity: 0.3 }}
                            onClick={() => handlePositionClick('wrong')}
                        >
                            <circle cx="35" cy="-20" r="8" fill="#ef4444" opacity="0.5" />
                            <text x="35" y="-17" fill="#ef4444" fontSize="8" textAnchor="middle">3</text>
                        </motion.g>

                        <motion.g
                            whileHover={{ scale: 1.2 }}
                            style={{ cursor: 'pointer', opacity: 0.3 }}
                            onClick={() => handlePositionClick('wrong')}
                        >
                            <circle cx="35" cy="20" r="8" fill="#ef4444" opacity="0.5" />
                            <text x="35" y="23" fill="#ef4444" fontSize="8" textAnchor="middle">5</text>
                        </motion.g>

                        <motion.g
                            whileHover={{ scale: 1.2 }}
                            style={{ cursor: 'pointer', opacity: 0.3 }}
                            onClick={() => handlePositionClick('wrong')}
                        >
                            <circle cx="0" cy="-40" r="8" fill="#ef4444" opacity="0.5" />
                            <text x="0" y="-37" fill="#ef4444" fontSize="8" textAnchor="middle">4</text>
                        </motion.g>
                    </g>

                    {/* Rotation indicator when both Cl placed */}
                    {bothPlaced && (
                        <motion.g
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, rotate: [0, 15, 0, -15, 0] }}
                            transition={{ rotate: { duration: 1, repeat: Infinity, repeatDelay: 2 } }}
                        >
                            <text x="250" y="160" fill="#a78bfa" fontSize="12" textAnchor="middle">
                                ↻ 80° Twist
                            </text>
                        </motion.g>
                    )}
                </svg>

                {/* Instructions */}
                <div style={{
                    padding: '1rem',
                    background: 'rgba(139, 92, 246, 0.1)',
                    borderRadius: '12px',
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                    textAlign: 'center',
                    width: '100%'
                }}>
                    <div style={{ color: '#a78bfa', fontWeight: 600, marginBottom: '0.5rem' }}>
                        🎯 Your Mission
                    </div>
                    <div style={{ color: '#e2e8f0', fontSize: '0.9rem' }}>
                        Click on positions <strong style={{ color: '#22c55e' }}>2</strong> and <strong style={{ color: '#22c55e' }}>6</strong> to add chlorine atoms.
                        <br />
                        <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>
                            The ortho-dichloro pattern is essential for COX-2 selectivity!
                        </span>
                    </div>
                </div>
            </div>

            {/* SAR Explanation */}
            <div style={{
                marginTop: '1.5rem',
                padding: '1.5rem',
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1))',
                borderRadius: '16px',
                border: '1px solid rgba(139, 92, 246, 0.3)'
            }}>
                <div style={{ color: '#a78bfa', fontWeight: 600, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span>🔬</span> Structure-Activity Relationship (SAR)
                </div>
                <div style={{ color: '#e2e8f0', fontSize: '0.9rem', lineHeight: 1.7 }}>
                    <strong style={{ color: '#22c55e' }}>Why 2,6-dichloro?</strong>
                    <ul style={{ margin: '0.5rem 0', paddingLeft: '1.25rem' }}>
                        <li>Forces two rings into <strong>non-planar conformation</strong> (80° dihedral)</li>
                        <li>Essential geometry for fitting <strong>COX-2 hydrophobic pocket</strong></li>
                        <li>Increases potency <strong>100-fold</strong> vs phenylacetic acid</li>
                        <li>Improves <strong>COX-2 selectivity</strong> (fewer GI side effects)</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

// ============================================================================
// PHASE 2: THE FORMULATOR - Solubility Problem
// ============================================================================

function Phase2Formulator({ onComplete }: { onComplete: () => void }) {
    const [showProblem, setShowProblem] = useState(false);

    useEffect(() => {
        setTimeout(() => setShowProblem(true), 500);
    }, []);

    return (
        <div style={{ padding: '1.5rem' }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1.5rem'
            }}>
                <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 700
                }}>2</div>
                <div>
                    <h4 style={{ color: '#e2e8f0', margin: 0 }}>The Formulator: Houston, We Have a Problem</h4>
                    <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.85rem' }}>
                        Diclofenac Acid is potent but won&apos;t dissolve... how will patients absorb it?
                    </p>
                </div>
            </div>

            {/* Problem Visualization */}
            <div style={{
                background: 'rgba(0, 0, 0, 0.4)',
                borderRadius: '16px',
                padding: '2rem',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.5rem'
            }}>
                {/* Stomach Visualization */}
                <svg width="300" height="200" viewBox="0 0 300 200">
                    {/* Stomach outline */}
                    <ellipse cx="150" cy="100" rx="120" ry="80" fill="#fef3c7" stroke="#f59e0b" strokeWidth="3" />

                    {/* Liquid */}
                    <ellipse cx="150" cy="110" rx="100" ry="50" fill="#fcd34d" opacity="0.5" />

                    {/* "Water" label */}
                    <text x="150" y="140" fill="#78350f" fontSize="12" textAnchor="middle">Gastric Fluid (aqueous)</text>

                    {/* Diclofenac particles not dissolving */}
                    <AnimatePresence>
                        {showProblem && (
                            <>
                                <motion.circle
                                    initial={{ y: -50 }}
                                    animate={{ y: 0 }}
                                    cx="100" cy="90" r="8" fill="#ef4444"
                                />
                                <motion.circle
                                    initial={{ y: -50 }}
                                    animate={{ y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    cx="150" cy="85" r="10" fill="#ef4444"
                                />
                                <motion.circle
                                    initial={{ y: -50 }}
                                    animate={{ y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    cx="200" cy="95" r="7" fill="#ef4444"
                                />
                                <motion.text
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1 }}
                                    x="150" y="60" fill="#ef4444" fontSize="14" textAnchor="middle" fontWeight="700"
                                >
                                    ❌ NOT DISSOLVING
                                </motion.text>
                            </>
                        )}
                    </AnimatePresence>
                </svg>

                {/* Problem Explanation */}
                <div style={{
                    padding: '1.5rem',
                    background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(234, 88, 12, 0.1))',
                    borderRadius: '16px',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    width: '100%'
                }}>
                    <div style={{ color: '#ef4444', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span>⚠️</span> The Bioavailability Problem
                    </div>
                    <div style={{ color: '#e2e8f0', fontSize: '0.9rem', lineHeight: 1.7 }}>
                        <strong>Diclofenac Acid (pKa ≈ 4)</strong> is mostly in the <strong>protonated, neutral form</strong> in the acidic stomach.
                        <ul style={{ margin: '0.5rem 0', paddingLeft: '1.25rem', color: '#94a3b8' }}>
                            <li>Neutral molecules are <strong>lipophilic</strong> (fat-loving)</li>
                            <li>Gastric fluid is <strong>aqueous</strong> (water-based)</li>
                            <li>Result: <strong>Very low solubility</strong> → Poor absorption</li>
                        </ul>
                    </div>
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onComplete}
                    style={{
                        padding: '1rem 2rem',
                        background: 'linear-gradient(135deg, #10b981, #059669)',
                        border: 'none',
                        borderRadius: '12px',
                        color: 'white',
                        fontWeight: 700,
                        fontSize: '1rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}
                >
                    💡 Proceed to Salt Screening →
                </motion.button>
            </div>
        </div>
    );
}

// ============================================================================
// PHASE 3: SALT SELECTION - PK Curves
// ============================================================================

function Phase3Salt() {
    const [selectedSalt, setSelectedSalt] = useState<'none' | 'Na' | 'K' | 'Ca'>('none');
    const [showCurve, setShowCurve] = useState(false);

    useEffect(() => {
        if (selectedSalt !== 'none') {
            setShowCurve(false);
            setTimeout(() => setShowCurve(true), 300);
        }
    }, [selectedSalt]);

    const salts = [
        { id: 'Na' as const, symbol: 'Na⁺', name: 'Sodium', product: 'Voltaren®', use: 'Chronic (Osteoarthritis)', color: '#8b5cf6', speed: 'slow' },
        { id: 'K' as const, symbol: 'K⁺', name: 'Potassium', product: 'Cataflam®', use: 'Acute (Migraine)', color: '#10b981', speed: 'fast' },
        { id: 'Ca' as const, symbol: 'Ca²⁺', name: 'Calcium', product: 'Not used', use: 'Poor dissolution', color: '#6b7280', speed: 'slowest' }
    ];

    return (
        <div style={{ padding: '1.5rem' }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1.5rem'
            }}>
                <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 700
                }}>3</div>
                <div>
                    <h4 style={{ color: '#e2e8f0', margin: 0 }}>Salt Selection: Match Drug to Clinical Need</h4>
                    <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.85rem' }}>
                        Choose the counter-ion and watch how it affects the pharmacokinetic profile
                    </p>
                </div>
            </div>

            {/* Salt Selection Buttons */}
            <div style={{
                display: 'flex',
                gap: '1rem',
                marginBottom: '1.5rem',
                flexWrap: 'wrap'
            }}>
                {salts.map(salt => (
                    <motion.button
                        key={salt.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedSalt(salt.id)}
                        style={{
                            flex: 1,
                            minWidth: '140px',
                            padding: '1.25rem',
                            background: selectedSalt === salt.id
                                ? `linear-gradient(135deg, ${salt.color}, ${salt.color}dd)`
                                : 'rgba(255, 255, 255, 0.05)',
                            border: selectedSalt === salt.id
                                ? 'none'
                                : `2px solid ${salt.color}40`,
                            borderRadius: '16px',
                            cursor: 'pointer',
                            textAlign: 'center'
                        }}
                    >
                        <div style={{
                            fontSize: '1.75rem',
                            fontWeight: 700,
                            color: selectedSalt === salt.id ? 'white' : salt.color
                        }}>
                            {salt.symbol}
                        </div>
                        <div style={{
                            color: selectedSalt === salt.id ? 'white' : '#94a3b8',
                            fontSize: '0.85rem',
                            marginTop: '0.25rem'
                        }}>
                            {salt.name}
                        </div>
                    </motion.button>
                ))}
            </div>

            {/* PK Curve Visualization */}
            <div style={{
                background: 'rgba(0, 0, 0, 0.4)',
                borderRadius: '16px',
                padding: '1.5rem',
                border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
                <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginBottom: '0.75rem' }}>
                    📈 PHARMACOKINETIC CURVE (Plasma Concentration vs Time)
                </div>

                <svg width="100%" height="200" viewBox="0 0 400 200" style={{ overflow: 'visible' }}>
                    {/* Grid */}
                    <line x1="50" y1="20" x2="50" y2="170" stroke="#334155" strokeWidth="1" />
                    <line x1="50" y1="170" x2="380" y2="170" stroke="#334155" strokeWidth="1" />

                    {/* Y-axis label */}
                    <text x="20" y="100" fill="#94a3b8" fontSize="10" transform="rotate(-90, 20, 100)">Plasma [Drug]</text>

                    {/* X-axis label */}
                    <text x="215" y="195" fill="#94a3b8" fontSize="10" textAnchor="middle">Time (hours)</text>

                    {/* Grid lines */}
                    {[1, 2, 3, 4].map(i => (
                        <line key={i} x1="50" y1={170 - i * 35} x2="380" y2={170 - i * 35} stroke="#334155" strokeWidth="0.5" strokeDasharray="4" />
                    ))}

                    {/* PK Curves */}
                    <AnimatePresence>
                        {showCurve && selectedSalt === 'K' && (
                            <motion.path
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 1.5 }}
                                d="M 50 170 Q 100 30 180 60 T 280 90 T 380 140"
                                fill="none"
                                stroke="#10b981"
                                strokeWidth="3"
                            />
                        )}
                        {showCurve && selectedSalt === 'Na' && (
                            <motion.path
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 1.5 }}
                                d="M 50 170 Q 120 120 180 100 T 280 90 T 380 100"
                                fill="none"
                                stroke="#8b5cf6"
                                strokeWidth="3"
                            />
                        )}
                        {showCurve && selectedSalt === 'Ca' && (
                            <motion.path
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 1.5 }}
                                d="M 50 170 Q 150 160 200 150 T 380 140"
                                fill="none"
                                stroke="#6b7280"
                                strokeWidth="3"
                                strokeDasharray="5"
                            />
                        )}
                    </AnimatePresence>

                    {/* Therapeutic window */}
                    <rect x="50" y="60" width="330" height="60" fill="#22c55e" opacity="0.1" />
                    <text x="380" y="75" fill="#22c55e" fontSize="9" textAnchor="end">Therapeutic</text>
                    <text x="380" y="85" fill="#22c55e" fontSize="9" textAnchor="end">Window</text>
                </svg>

                {/* Result Panel */}
                <AnimatePresence>
                    {selectedSalt !== 'none' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            style={{
                                marginTop: '1rem',
                                padding: '1rem',
                                background: selectedSalt === 'Ca'
                                    ? 'rgba(239, 68, 68, 0.1)'
                                    : 'rgba(16, 185, 129, 0.1)',
                                borderRadius: '12px',
                                border: `1px solid ${selectedSalt === 'Ca' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(16, 185, 129, 0.3)'}`
                            }}
                        >
                            {selectedSalt === 'K' && (
                                <div>
                                    <div style={{ color: '#10b981', fontWeight: 700, marginBottom: '0.5rem' }}>
                                        ✅ Diclofenac Potassium → Cataflam®
                                    </div>
                                    <div style={{ color: '#e2e8f0', fontSize: '0.9rem' }}>
                                        <strong>Rapid onset</strong> (15-30 min) due to lower lattice energy.
                                        Ideal for <strong>acute pain</strong>: migraines, dental pain, sports injuries.
                                    </div>
                                </div>
                            )}
                            {selectedSalt === 'Na' && (
                                <div>
                                    <div style={{ color: '#8b5cf6', fontWeight: 700, marginBottom: '0.5rem' }}>
                                        ✅ Diclofenac Sodium → Voltaren®
                                    </div>
                                    <div style={{ color: '#e2e8f0', fontSize: '0.9rem' }}>
                                        <strong>Sustained release</strong> with stable plasma levels.
                                        Ideal for <strong>chronic conditions</strong>: osteoarthritis, rheumatoid arthritis.
                                    </div>
                                </div>
                            )}
                            {selectedSalt === 'Ca' && (
                                <div>
                                    <div style={{ color: '#ef4444', fontWeight: 700, marginBottom: '0.5rem' }}>
                                        ❌ Diclofenac Calcium → Not Marketed
                                    </div>
                                    <div style={{ color: '#e2e8f0', fontSize: '0.9rem' }}>
                                        Divalent Ca²⁺ creates <strong>very high lattice energy</strong>.
                                        Result: Too slow dissolution, poor bioavailability.
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Summary Table */}
            <div style={{
                marginTop: '1.5rem',
                background: 'rgba(0, 0, 0, 0.3)',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: 'rgba(139, 92, 246, 0.2)' }}>
                            <th style={{ padding: '0.75rem', textAlign: 'left', color: '#a78bfa', fontSize: '0.8rem' }}>Development Phase</th>
                            <th style={{ padding: '0.75rem', textAlign: 'left', color: '#a78bfa', fontSize: '0.8rem' }}>Feature</th>
                            <th style={{ padding: '0.75rem', textAlign: 'left', color: '#a78bfa', fontSize: '0.8rem' }}>Result</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
                            <td style={{ padding: '0.75rem', color: '#e2e8f0', fontSize: '0.85rem' }}>Lead Discovery</td>
                            <td style={{ padding: '0.75rem', color: '#94a3b8', fontSize: '0.85rem' }}>Phenylacetic acid scaffold</td>
                            <td style={{ padding: '0.75rem', color: '#94a3b8', fontSize: '0.85rem' }}>Raw biological activity</td>
                        </tr>
                        <tr style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
                            <td style={{ padding: '0.75rem', color: '#e2e8f0', fontSize: '0.85rem' }}>Lead Optimization</td>
                            <td style={{ padding: '0.75rem', color: '#22c55e', fontSize: '0.85rem' }}>2,6-dichloro addition</td>
                            <td style={{ padding: '0.75rem', color: '#94a3b8', fontSize: '0.85rem' }}>Enhanced COX-2 potency</td>
                        </tr>
                        <tr style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
                            <td style={{ padding: '0.75rem', color: '#e2e8f0', fontSize: '0.85rem' }}>Salt Engineering (Na⁺)</td>
                            <td style={{ padding: '0.75rem', color: '#8b5cf6', fontSize: '0.85rem' }}>Slow ionic dissociation</td>
                            <td style={{ padding: '0.75rem', color: '#94a3b8', fontSize: '0.85rem' }}>Voltaren® (Chronic)</td>
                        </tr>
                        <tr style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
                            <td style={{ padding: '0.75rem', color: '#e2e8f0', fontSize: '0.85rem' }}>Salt Engineering (K⁺)</td>
                            <td style={{ padding: '0.75rem', color: '#10b981', fontSize: '0.85rem' }}>Rapid ionic dissociation</td>
                            <td style={{ padding: '0.75rem', color: '#94a3b8', fontSize: '0.85rem' }}>Cataflam® (Acute)</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// ============================================================================
// STRUCTURE-FUNCTION VIEWER FOR MOLECULES
// ============================================================================

function MoleculeStructureViewer({ molecule }: { molecule: Molecule }) {
    const [selectedGroup, setSelectedGroup] = useState<typeof molecule.functionalGroups[0] | null>(null);

    return (
        <div style={{
            background: 'rgba(0, 0, 0, 0.3)',
            borderRadius: '16px',
            padding: '1.5rem',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            marginBottom: '1rem'
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1rem'
            }}>
                <div style={{
                    padding: '0.25rem 0.75rem',
                    background: 'rgba(139, 92, 246, 0.2)',
                    borderRadius: '20px',
                    color: '#a78bfa',
                    fontSize: '0.75rem',
                    fontWeight: 600
                }}>
                    {molecule.stage}
                </div>
                <h4 style={{ color: '#e2e8f0', margin: 0, fontSize: '1rem' }}>{molecule.name}</h4>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem'
            }}>
                {/* 2D Structure */}
                <div style={{
                    background: 'white',
                    borderRadius: '12px',
                    padding: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <img
                        src={`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${molecule.pubchemCid}/PNG?image_size=200x200`}
                        alt={`2D structure of ${molecule.name}`}
                        style={{ maxWidth: '100%', maxHeight: '150px' }}
                    />
                </div>

                {/* Functional Groups */}
                <div>
                    <div style={{ color: '#94a3b8', fontSize: '0.7rem', marginBottom: '0.5rem' }}>
                        FUNCTIONAL GROUPS
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                        {molecule.functionalGroups.map((fg, i) => (
                            <motion.button
                                key={i}
                                whileHover={{ scale: 1.02 }}
                                onClick={() => setSelectedGroup(selectedGroup === fg ? null : fg)}
                                style={{
                                    padding: '0.5rem',
                                    background: selectedGroup === fg ? `${fg.color}20` : 'rgba(255, 255, 255, 0.03)',
                                    border: `1px solid ${selectedGroup === fg ? fg.color : 'rgba(255, 255, 255, 0.1)'}`,
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    textAlign: 'left',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                <div style={{
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '50%',
                                    background: fg.color
                                }} />
                                <span style={{ color: '#e2e8f0', fontSize: '0.75rem' }}>{fg.name}</span>
                            </motion.button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Selected Group Detail */}
            <AnimatePresence>
                {selectedGroup && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{
                            marginTop: '1rem',
                            padding: '0.75rem',
                            background: `${selectedGroup.color}10`,
                            borderRadius: '8px',
                            border: `1px solid ${selectedGroup.color}30`
                        }}
                    >
                        <div style={{ color: selectedGroup.color, fontWeight: 600, fontSize: '0.85rem' }}>
                            {selectedGroup.name}
                        </div>
                        <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                            <strong style={{ color: '#e2e8f0' }}>Role:</strong> {selectedGroup.role}
                        </div>
                        <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>
                            <strong style={{ color: '#e2e8f0' }}>Benefit:</strong> {selectedGroup.benefit}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function DiclofenacLab() {
    const [activePhase, setActivePhase] = useState<1 | 2 | 3>(1);
    const [phase1Complete, setPhase1Complete] = useState(false);
    const [phase2Complete, setPhase2Complete] = useState(false);

    const phases = [
        { id: 1 as const, icon: '🧪', label: 'The Chemist', subtitle: 'Lead Optimization', color: '#8b5cf6' },
        { id: 2 as const, icon: '💊', label: 'The Formulator', subtitle: 'Solubility Problem', color: '#f59e0b' },
        { id: 3 as const, icon: '⚗️', label: 'Salt Selection', subtitle: 'PK Engineering', color: '#10b981' }
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
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '1.75rem' }}>🔬</span>
                    <div>
                        <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'white', margin: 0 }}>
                            Lead-to-Salt Laboratory: The Diclofenac Story
                        </h3>
                        <p style={{ color: 'var(--neutral-400)', margin: '0.25rem 0 0', fontSize: '0.9rem' }}>
                            PhD-Level Case Study • Lead Optimization → Salt Screening → Clinical Customization
                        </p>
                    </div>
                </div>
            </div>

            {/* Phase Navigation */}
            <div style={{
                display: 'flex',
                gap: '0.5rem',
                padding: '1rem 2rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                overflowX: 'auto'
            }}>
                {phases.map((phase, i) => {
                    const isAccessible = phase.id === 1 || (phase.id === 2 && phase1Complete) || (phase.id === 3 && phase2Complete);
                    const isComplete = (phase.id === 1 && phase1Complete) || (phase.id === 2 && phase2Complete);

                    return (
                        <motion.button
                            key={phase.id}
                            whileHover={isAccessible ? { scale: 1.02 } : {}}
                            whileTap={isAccessible ? { scale: 0.98 } : {}}
                            onClick={() => isAccessible && setActivePhase(phase.id)}
                            disabled={!isAccessible}
                            style={{
                                flex: 1,
                                padding: '0.75rem 1rem',
                                background: activePhase === phase.id
                                    ? `linear-gradient(135deg, ${phase.color}, ${phase.color}99)`
                                    : isComplete
                                        ? `${phase.color}20`
                                        : 'rgba(255, 255, 255, 0.05)',
                                border: activePhase === phase.id ? 'none' : isComplete ? `1px solid ${phase.color}40` : '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '12px',
                                cursor: isAccessible ? 'pointer' : 'not-allowed',
                                opacity: isAccessible ? 1 : 0.5,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                minWidth: '150px'
                            }}
                        >
                            <span style={{ fontSize: '1.25rem' }}>
                                {isComplete ? '✅' : phase.icon}
                            </span>
                            <div style={{ textAlign: 'left' }}>
                                <div style={{
                                    color: activePhase === phase.id ? 'white' : isAccessible ? '#e2e8f0' : '#64748b',
                                    fontSize: '0.85rem',
                                    fontWeight: 600
                                }}>
                                    {phase.label}
                                </div>
                                <div style={{
                                    color: activePhase === phase.id ? 'rgba(255,255,255,0.8)' : '#94a3b8',
                                    fontSize: '0.7rem'
                                }}>
                                    {phase.subtitle}
                                </div>
                            </div>
                        </motion.button>
                    );
                })}
            </div>

            {/* Phase Content */}
            <AnimatePresence mode="wait">
                {activePhase === 1 && (
                    <motion.div
                        key="phase1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                    >
                        <Phase1Chemist onComplete={() => {
                            setPhase1Complete(true);
                            setTimeout(() => setActivePhase(2), 500);
                        }} />
                    </motion.div>
                )}

                {activePhase === 2 && (
                    <motion.div
                        key="phase2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                    >
                        <Phase2Formulator onComplete={() => {
                            setPhase2Complete(true);
                            setTimeout(() => setActivePhase(3), 500);
                        }} />
                    </motion.div>
                )}

                {activePhase === 3 && (
                    <motion.div
                        key="phase3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                    >
                        <Phase3Salt />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Featured Molecules Section */}
            <div style={{
                padding: '1.5rem 2rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                background: 'rgba(0, 0, 0, 0.2)'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '1rem'
                }}>
                    <span style={{ fontSize: '1.25rem' }}>🧬</span>
                    <h4 style={{ color: '#e2e8f0', margin: 0, fontSize: '1rem' }}>
                        Featured Molecules: Structure-Function Analysis
                    </h4>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                    gap: '1rem'
                }}>
                    {MOLECULES.map((mol, i) => (
                        <MoleculeStructureViewer key={i} molecule={mol} />
                    ))}
                </div>
            </div>
        </div>
    );
}
