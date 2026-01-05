'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

// Dynamic import for MoleculeViewer to avoid SSR issues with 3D libraries
const MoleculeViewer = dynamic(() => import('../MoleculeViewer'), {
    ssr: false,
    loading: () => <div className="h-48 w-full bg-slate-800 animate-pulse rounded-xl flex items-center justify-center text-slate-500">Loading 3D Viewer...</div>
});

// ============================================================================
// TYPES
// ============================================================================

interface FunctionalGroupInfo {
    name: string;
    role: string;
    benefit: string;
    color: string;
    targetId?: string;
}

interface Molecule {
    name: string;
    stage: string;
    pubchemCid: number;
    pdbId?: string; // For COX-2 binding visualization
    description?: string;
    functionalGroups: FunctionalGroupInfo[];
}

// ============================================================================
// MOLECULE DATA (with PDB 1PGE for COX-2 binding)
// ============================================================================

const MOLECULES: Molecule[] = [
    {
        name: '2-Anilinophenylacetic Acid',
        stage: 'Lead Compound',
        pubchemCid: 854057,
        description: 'The starting point: A derivative of phenylacetic acid with some anti-inflammatory activity but significant toxicity.',
        functionalGroups: [
            { name: 'Carboxylic Acid (-COOH)', role: 'COX binding', benefit: 'Basic anti-inflammatory activity', color: '#ef4444', targetId: 'cooh' },
            { name: 'Phenyl Ring (Core)', role: 'Scaffold', benefit: 'Fit for active site', color: '#3b82f6', targetId: 'ring1' },
            { name: 'Secondary Amine', role: 'Linker', benefit: 'Flexibility', color: '#f59e0b', targetId: 'nh' }
        ]
    },
    {
        name: 'Diclofenac Acid',
        stage: 'Optimized Lead',
        pubchemCid: 3033,
        pdbId: '1PGE', // COX-2 complex!
        description: 'The result of lead optimization: Addition of chlorine atoms twists the rings, improving fit and selectivity.',
        functionalGroups: [
            { name: 'Carboxylic Acid (-COOH)', role: 'COX-2 selective binding', benefit: 'Enhanced potency + selectivity', color: '#ef4444', targetId: 'cooh' },
            { name: '2,6-Dichloro Groups', role: 'Conformational lock', benefit: 'Forces 80° twist for perfect COX-2 fit', color: '#22c55e', targetId: 'cl' },
            { name: 'Secondary Amine (-NH-)', role: 'H-bond donor', benefit: 'Locks rings in optimal geometry', color: '#f59e0b', targetId: 'nh' },
            { name: 'Phenyl Rings (2)', role: 'Non-planar scaffold', benefit: 'Fills hydrophobic pocket of COX-2', color: '#3b82f6', targetId: 'rings' }
        ]
    },
    {
        name: 'Diclofenac Sodium',
        stage: 'Voltaren® (Sustained)',
        pubchemCid: 5018304,
        pdbId: '1PGE',
        description: 'The standard salt form: High lattice energy provides sustained release for chronic conditions.',
        functionalGroups: [
            { name: 'Carboxylate (-COO⁻)', role: 'Ionic form', benefit: 'Water soluble, slow dissolution', color: '#ef4444', targetId: 'cooh' },
            { name: 'Na⁺ Counter-ion', role: 'Salt former', benefit: 'High lattice energy → slow release', color: '#8b5cf6', targetId: 'salt' },
            { name: '2,6-Dichloro Groups', role: 'Conformational lock', benefit: 'Maintains COX-2 selectivity', color: '#22c55e', targetId: 'cl' }
        ]
    },
    {
        name: 'Diclofenac Potassium',
        stage: 'Cataflam® (Rapid)',
        pubchemCid: 3243,
        pdbId: '1PGE',
        description: 'The rapid-onset salt form: Lower lattice energy allows faster dissolution for acute pain.',
        functionalGroups: [
            { name: 'Carboxylate (-COO⁻)', role: 'Ionic form', benefit: 'Water soluble, FAST dissolution', color: '#ef4444', targetId: 'cooh' },
            { name: 'K⁺ Counter-ion', role: 'Salt former', benefit: 'Lower lattice energy → rapid release', color: '#10b981', targetId: 'salt' },
            { name: '2,6-Dichloro Groups', role: 'Conformational lock', benefit: 'Maintains COX-2 selectivity', color: '#22c55e', targetId: 'cl' }
        ]
    }
];

// PubChem 2D Image URL Generator
const getPubChem2DImage = (cid: number, size: number = 300) =>
    `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/PNG?image_size=${size}x${size}`;

// ============================================================================
// PHASE 0: THE EXPLORER - Lead Discovery (with 2D structure)
// ============================================================================

function Phase0LeadDiscovery({ onComplete }: { onComplete: () => void }) {
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
                    background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 700
                }}>0</div>
                <div>
                    <h4 style={{ color: '#e2e8f0', margin: 0 }}>The Explorer: Lead Discovery</h4>
                    <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.85rem' }}>
                        Identifying a promising starting point
                    </p>
                </div>
            </div>

            <div style={{
                background: 'rgba(0, 0, 0, 0.4)',
                borderRadius: '16px',
                padding: '2rem',
                border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'center' }}>
                    {/* Left: 2D Structure from PubChem */}
                    <div style={{
                        background: 'white',
                        borderRadius: '12px',
                        padding: '1rem',
                        textAlign: 'center'
                    }}>
                        <img
                            src={getPubChem2DImage(854057, 250)}
                            alt="Lead Compound: 2-Anilinophenylacetic Acid"
                            style={{ maxWidth: '100%', height: 'auto' }}
                        />
                        <div style={{ color: '#1e293b', fontSize: '0.85rem', marginTop: '0.5rem', fontWeight: 600 }}>
                            2-Anilinophenylacetic Acid (Lead)
                        </div>
                    </div>

                    {/* Right: Problem Description */}
                    <div>
                        <h3 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>
                            The "Phenylacetic Acid" Hit
                        </h3>
                        <p style={{ color: '#e2e8f0', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                            Screening reveals that derivatives of <strong>phenylacetic acid</strong> have anti-inflammatory properties.
                            However, the initial <strong>Lead Compound</strong> has problems:
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                            <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                                <div style={{ color: '#ef4444', fontWeight: 700 }}>⚠️ Problem 1: Low Potency</div>
                                <div style={{ color: '#fca5a5', fontSize: '0.9rem' }}>IC50 &gt; 10 μM (too weak)</div>
                            </div>
                            <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                                <div style={{ color: '#ef4444', fontWeight: 700 }}>⚠️ Problem 2: Poor Selectivity</div>
                                <div style={{ color: '#fca5a5', fontSize: '0.9rem' }}>Inhibits COX-1 equally → GI bleeding risk</div>
                            </div>
                        </div>

                        <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                            We need to OPTIMIZE this lead to improve its fit with the COX-2 enzyme.
                        </p>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onComplete}
                            style={{
                                padding: '1rem 2rem',
                                background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                                border: 'none',
                                borderRadius: '12px',
                                color: 'white',
                                fontWeight: 700,
                                cursor: 'pointer',
                                fontSize: '1rem',
                                boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)'
                            }}
                        >
                            Start Lead Optimization 🚀
                        </motion.button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ============================================================================
// PHASE 1: THE CHEMIST - Chlorine Placement GAME
// ============================================================================

type ChlorinePosition = 2 | 3 | 4 | 5 | 6 | null;

function Phase1Chemist({ onComplete }: { onComplete: () => void }) {
    const [placedPositions, setPlacedPositions] = useState<ChlorinePosition[]>([]);
    const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
    const [gameComplete, setGameComplete] = useState(false);

    const POSITION_INFO: Record<number, { x: number; y: number; label: string; isCorrect: boolean; feedback: string }> = {
        // Right ring center at (248, 150), flat-topped hexagon vertices:
        // Position 1: Left (-48, 0) = (200, 150) - where NH connects, not clickable
        // Position 2: Top-left (-24, -42) = (224, 108) - ORTHO to NH ✓
        2: { x: 224, y: 108, label: '2', isCorrect: true, feedback: '✅ Position 2 (ortho): Creates steric clash with NH bridge! The Cl atom forces the rings to twist.' },
        // Position 3: Top-right (24, -42) = (272, 108) - META
        3: { x: 272, y: 108, label: '3', isCorrect: false, feedback: '❌ Position 3 (meta): Too far from NH. No steric hindrance between the rings.' },
        // Position 4: Right (48, 0) = (296, 150) - PARA
        4: { x: 296, y: 150, label: '4', isCorrect: false, feedback: '❌ Position 4 (para): Opposite to NH connection. No twist effect on the rings.' },
        // Position 5: Bottom-right (24, 42) = (272, 192) - META
        5: { x: 272, y: 192, label: '5', isCorrect: false, feedback: '❌ Position 5 (meta): Too far from NH. No steric hindrance between the rings.' },
        // Position 6: Bottom-left (-24, 42) = (224, 192) - ORTHO to NH ✓
        6: { x: 224, y: 192, label: '6', isCorrect: true, feedback: '✅ Position 6 (ortho): Creates steric clash with NH bridge! The Cl atom forces the rings to twist.' }
    };

    const handlePositionClick = (pos: ChlorinePosition) => {
        if (pos === null || placedPositions.includes(pos) || gameComplete) return;

        const info = POSITION_INFO[pos];
        setFeedback({ message: info.feedback, type: info.isCorrect ? 'success' : 'error' });

        if (info.isCorrect) {
            const newPositions = [...placedPositions, pos];
            setPlacedPositions(newPositions);

            // Check if both ortho positions are placed
            if (newPositions.includes(2) && newPositions.includes(6)) {
                setTimeout(() => {
                    setGameComplete(true);
                    setFeedback({
                        message: '🎉 Perfect! The 2,6-dichloro substitution forces the rings 80° apart, creating a perfect fit for the COX-2 hydrophobic pocket!',
                        type: 'success'
                    });
                    // Don't auto-advance - show Next button instead
                }, 1000);
            }
        }
    };

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
                    <h4 style={{ color: '#e2e8f0', margin: 0 }}>The Chemist: Chlorine Placement Challenge</h4>
                    <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.85rem' }}>
                        Click on 2 positions to add Chlorine atoms to the right ring
                    </p>
                </div>
            </div>

            <div style={{
                background: 'rgba(0, 0, 0, 0.4)',
                borderRadius: '16px',
                padding: '2rem',
                border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
                {/* Feedback Box */}
                <AnimatePresence>
                    {feedback && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            style={{
                                padding: '1rem',
                                marginBottom: '1.5rem',
                                borderRadius: '12px',
                                background: feedback.type === 'success' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                                border: `1px solid ${feedback.type === 'success' ? '#22c55e' : '#ef4444'}`,
                                color: feedback.type === 'success' ? '#86efac' : '#fca5a5',
                                fontWeight: 600,
                                textAlign: 'center'
                            }}
                        >
                            {feedback.message}
                        </motion.div>
                    )}
                </AnimatePresence>

                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>
                    {/* Interactive Molecule */}
                    <div style={{
                        background: 'white',
                        borderRadius: '12px',
                        padding: '1rem',
                        position: 'relative',
                        minHeight: '350px'
                    }}>
                        <svg viewBox="0 0 400 300" style={{ width: '100%', height: '100%' }}>
                            {/* Left Ring (Phenylacetic acid) + COOH */}
                            <g transform="translate(100, 150)">
                                {/* Flat-topped hexagon */}
                                <polygon
                                    points="-48,0 -24,-42 24,-42 48,0 24,42 -24,42"
                                    fill="none"
                                    stroke="#1e293b"
                                    strokeWidth="2"
                                />
                                {/* Circle for aromaticity */}
                                <circle cx="0" cy="0" r="22" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="3" />
                                {/* CH2 linkage going up */}
                                <line x1="24" y1="-42" x2="50" y2="-70" stroke="#1e293b" strokeWidth="2" />
                                {/* COOH */}
                                <text x="58" y="-75" fill="#ef4444" fontSize="12" fontWeight="700">COOH</text>
                            </g>

                            {/* NH Bridge connecting the rings */}
                            <line x1="148" y1="150" x2="200" y2="150" stroke="#f59e0b" strokeWidth="3" />
                            <text x="174" y="138" fill="#f59e0b" fontSize="14" textAnchor="middle" fontWeight="700">NH</text>

                            {/* Right Ring (Dichlorophenyl - where Cl goes) */}
                            <g transform="translate(248, 150)">
                                {/* Flat-topped hexagon - position 1 at left vertex (-48, 0) */}
                                <polygon
                                    points="-48,0 -24,-42 24,-42 48,0 24,42 -24,42"
                                    fill="none"
                                    stroke="#1e293b"
                                    strokeWidth="2"
                                />
                                {/* Circle for aromaticity */}
                                <circle cx="0" cy="0" r="22" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="3" />

                                {/* Position 1 marker (where NH connects - not clickable) */}
                                <text x="-65" y="5" fill="#94a3b8" fontSize="10">1</text>
                            </g>

                            {/* Clickable Positions */}
                            {Object.entries(POSITION_INFO).map(([pos, info]) => {
                                const posNum = parseInt(pos) as ChlorinePosition;
                                const isPlaced = placedPositions.includes(posNum);

                                return (
                                    <motion.g
                                        key={pos}
                                        whileHover={!isPlaced && !gameComplete ? { scale: 1.3 } : {}}
                                        style={{ cursor: !isPlaced && !gameComplete ? 'pointer' : 'default' }}
                                        onClick={() => handlePositionClick(posNum)}
                                    >
                                        {isPlaced ? (
                                            // Placed Chlorine - green after placement
                                            <g>
                                                <circle cx={info.x} cy={info.y} r="18" fill="#22c55e" />
                                                <text x={info.x} y={info.y + 5} fill="white" fontSize="12" textAnchor="middle" fontWeight="700">Cl</text>
                                            </g>
                                        ) : (
                                            // Empty Position - ALL same gray to not give hints!
                                            <g>
                                                <circle
                                                    cx={info.x}
                                                    cy={info.y}
                                                    r="14"
                                                    fill="transparent"
                                                    stroke="#94a3b8"
                                                    strokeWidth="2"
                                                    strokeDasharray="4"
                                                />
                                                <text x={info.x} y={info.y + 4} fill="#64748b" fontSize="11" textAnchor="middle" fontWeight="600">{info.label}</text>
                                            </g>
                                        )}
                                    </motion.g>
                                );
                            })}
                        </svg>
                    </div>

                    {/* Instructions Panel */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ padding: '1rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '12px', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
                            <div style={{ color: '#60a5fa', fontWeight: 700, marginBottom: '0.5rem' }}>🎯 Your Goal</div>
                            <div style={{ color: '#e2e8f0', fontSize: '0.9rem' }}>
                                Add 2 Chlorine atoms to force a steric twist between the two rings. This will improve COX-2 selectivity.
                            </div>
                        </div>

                        <div style={{ padding: '1rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px' }}>
                            <div style={{ color: '#94a3b8', fontWeight: 600, marginBottom: '0.5rem' }}>💡 Hint</div>
                            <div style={{ color: '#cbd5e1', fontSize: '0.85rem' }}>
                                Think about which positions would create <em>steric clash</em> with the NH bridge. The clash forces the rings to twist out of plane.
                            </div>
                        </div>

                        <div style={{ padding: '1rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px' }}>
                            <div style={{ color: '#94a3b8', fontWeight: 600, marginBottom: '0.5rem' }}>📊 Progress</div>
                            <div style={{ color: '#e2e8f0' }}>
                                Chlorines placed: <strong>{placedPositions.length}</strong> / 2
                            </div>
                        </div>

                        {/* Next Step Button - shows after game complete */}
                        {gameComplete && (
                            <motion.button
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={onComplete}
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    background: 'linear-gradient(135deg, #10b981, #059669)',
                                    border: 'none',
                                    borderRadius: '12px',
                                    color: 'white',
                                    fontWeight: 700,
                                    fontSize: '1rem',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                Next Step: Solubility Challenge →
                            </motion.button>
                        )}
                    </div>
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
                    <h4 style={{ color: '#e2e8f0', margin: 0 }}>The Formulator: Solubility Crisis</h4>
                    <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.85rem' }}>
                        Diclofenac Acid is a potent drug but has poor water solubility (pKa ~4)
                    </p>
                </div>
            </div>

            <div style={{
                background: 'rgba(0, 0, 0, 0.4)',
                borderRadius: '16px',
                padding: '2rem',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '2rem'
            }}>
                {/* Left: 2D Structure */}
                <div style={{
                    background: 'white',
                    borderRadius: '12px',
                    padding: '1rem',
                    textAlign: 'center'
                }}>
                    <img
                        src={getPubChem2DImage(3033, 250)}
                        alt="Diclofenac Acid"
                        style={{ maxWidth: '100%', height: 'auto' }}
                    />
                    <div style={{ color: '#1e293b', fontSize: '0.85rem', marginTop: '0.5rem', fontWeight: 600 }}>
                        Diclofenac Acid (Optimized Lead)
                    </div>
                </div>

                {/* Right: Problem & Solution */}
                <div>
                    <div style={{ position: 'relative', width: '100%', height: '180px', background: '#1e293b', borderRadius: '12px', overflow: 'hidden', marginBottom: '1.5rem' }}>
                        <div style={{ position: 'absolute', top: 10, left: 15, color: '#64748b', fontSize: '0.8rem' }}>Stomach (pH 2)</div>
                        <div style={{ position: 'absolute', bottom: 0, width: '100%', height: '70%', background: 'linear-gradient(to bottom, #334155, #1e293b)', opacity: 0.5 }} />

                        <AnimatePresence>
                            {showProblem && [1, 2, 3, 4, 5].map(i => (
                                <motion.div
                                    key={i}
                                    initial={{ y: -50, opacity: 0 }}
                                    animate={{ y: 130 + Math.random() * 20, opacity: 1 }}
                                    transition={{ duration: 2, delay: i * 0.2 }}
                                    style={{
                                        position: 'absolute',
                                        left: 30 + i * 40,
                                        width: '16px',
                                        height: '16px',
                                        borderRadius: '50%',
                                        background: 'white',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '8px',
                                        color: '#1e293b',
                                        fontWeight: 700
                                    }}
                                >
                                    H
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.3)', marginBottom: '1rem' }}>
                        <div style={{ color: '#ef4444', fontWeight: 700 }}>pH 2 (Stomach) &lt; pKa 4 (Diclofenac)</div>
                        <div style={{ color: '#fca5a5', fontSize: '0.9rem' }}>
                            The molecule is protonated (neutral) → insoluble → precipitates like a stone!
                        </div>
                    </div>

                    <div style={{ padding: '1rem', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '12px', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
                        <div style={{ color: '#22c55e', fontWeight: 700 }}>💡 Solution: Salt Formation</div>
                        <div style={{ color: '#86efac', fontSize: '0.9rem' }}>
                            Convert -COOH to -COO⁻ by forming a salt with Na⁺ or K⁺
                        </div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onComplete}
                        style={{
                            width: '100%',
                            marginTop: '1.5rem',
                            padding: '1rem',
                            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                            border: 'none',
                            borderRadius: '12px',
                            color: 'white',
                            fontWeight: 600,
                            cursor: 'pointer'
                        }}
                    >
                        Proceed to Salt Screening ➔
                    </motion.button>
                </div>
            </div>
        </div>
    );
}

// ============================================================================
// PHASE 3: SALT SELECTION ENGINEERING (PhD-Level PK Curves)
// ============================================================================

function Phase3Salt({ onComplete }: { onComplete: () => void }) {
    const [selectedSalt, setSelectedSalt] = useState<string | null>(null);
    const [showCOX2, setShowCOX2] = useState(false);

    const salts = [
        {
            id: 'K',
            name: 'Potassium',
            brand: 'Cataflam®',
            color: '#10b981',
            onset: '15-30 min',
            peak: '1 hr',
            duration: '4-6 hr',
            latticeEnergy: 'Low',
            useCase: 'Acute Pain (migraine, toothache)',
            pkPath: 'M 40 220 Q 60 220, 80 80 Q 100 40, 120 60 Q 180 100, 260 200 Q 300 220, 360 220',
            explanation: 'K⁺ is a larger ion (1.38 Å) → weaker electrostatic attraction → lower lattice energy → faster crystal dissolution → rapid drug release!'
        },
        {
            id: 'Na',
            name: 'Sodium',
            brand: 'Voltaren®',
            color: '#8b5cf6',
            onset: '30-60 min',
            peak: '2-3 hr',
            duration: '8-12 hr',
            latticeEnergy: 'High',
            useCase: 'Chronic Pain (arthritis, back pain)',
            pkPath: 'M 40 220 Q 80 220, 120 120 Q 160 80, 200 100 Q 280 140, 360 200',
            explanation: 'Na⁺ is a smaller ion (1.02 Å) → stronger electrostatic attraction → higher lattice energy → slower crystal dissolution → sustained drug release!'
        },
        {
            id: 'Ca',
            name: 'Calcium',
            brand: 'FAILED',
            color: '#64748b',
            onset: 'N/A',
            peak: 'N/A',
            duration: 'N/A',
            latticeEnergy: 'Very High',
            useCase: 'Not used (too insoluble)',
            pkPath: 'M 40 220 Q 100 215, 200 210 Q 300 205, 360 200',
            explanation: 'Ca²⁺ is divalent (+2 charge) → very strong electrostatic attraction → extremely high lattice energy → practically insoluble in GI fluids!'
        }
    ];

    const selectedSaltData = salts.find(s => s.id === selectedSalt);

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
                    <h4 style={{ color: '#e2e8f0', margin: 0 }}>Salt Selection Engineering</h4>
                    <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.85rem' }}>
                        Choose a counter-ion to optimize pharmacokinetic profile
                    </p>
                </div>
            </div>

            <div style={{
                background: 'rgba(0, 0, 0, 0.4)',
                borderRadius: '16px',
                padding: '2rem',
                border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
                <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '2rem' }}>
                    {/* Left: Salt Selector */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {salts.map(salt => (
                            <motion.button
                                key={salt.id}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setSelectedSalt(salt.id)}
                                style={{
                                    padding: '1rem',
                                    background: selectedSalt === salt.id ? `${salt.color}30` : 'rgba(255,255,255,0.05)',
                                    border: `2px solid ${selectedSalt === salt.id ? salt.color : 'rgba(255,255,255,0.1)'}`,
                                    borderRadius: '12px',
                                    textAlign: 'left',
                                    cursor: 'pointer'
                                }}
                            >
                                <div style={{ fontWeight: 700, color: salt.color, fontSize: '1.1rem' }}>{salt.name} Salt</div>
                                <div style={{ color: '#e2e8f0', fontSize: '0.9rem' }}>{salt.brand}</div>
                                <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Lattice Energy: {salt.latticeEnergy}</div>
                            </motion.button>
                        ))}
                    </div>

                    {/* Right: PK Curve Visualization */}
                    <div style={{
                        background: 'rgba(0,0,0,0.3)',
                        borderRadius: '16px',
                        padding: '1.5rem',
                        border: '1px solid rgba(255,255,255,0.1)'
                    }}>
                        {!selectedSalt ? (
                            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📈</div>
                                Select a salt to view pharmacokinetic profile
                            </div>
                        ) : (
                            <motion.div
                                key={selectedSalt}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <h4 style={{ textAlign: 'center', color: '#e2e8f0', marginBottom: '0.5rem' }}>
                                    Plasma Concentration vs. Time
                                </h4>

                                {/* Professional PK Graph */}
                                <svg viewBox="0 0 400 280" style={{ width: '100%' }}>
                                    {/* Grid lines */}
                                    {[80, 120, 160, 200].map(y => (
                                        <line key={y} x1="40" y1={y} x2="360" y2={y} stroke="#334155" strokeWidth="1" strokeDasharray="4" />
                                    ))}

                                    {/* MEC Line (Minimum Effective Concentration) */}
                                    <line x1="40" y1="160" x2="360" y2="160" stroke="#ef4444" strokeWidth="2" strokeDasharray="8" />
                                    <text x="365" y="164" fill="#ef4444" fontSize="10" fontWeight="600">MEC</text>

                                    {/* Axes */}
                                    <line x1="40" y1="220" x2="360" y2="220" stroke="#64748b" strokeWidth="2" />
                                    <line x1="40" y1="220" x2="40" y2="40" stroke="#64748b" strokeWidth="2" />

                                    {/* Axis Labels */}
                                    <text x="200" y="250" fill="#94a3b8" fontSize="12" textAnchor="middle">Time (hours)</text>
                                    <text x="15" y="130" fill="#94a3b8" fontSize="12" textAnchor="middle" transform="rotate(-90 15,130)">Plasma [Drug]</text>

                                    {/* Time markers */}
                                    {[0, 2, 4, 6, 8, 10, 12].map((t, i) => (
                                        <text key={t} x={40 + i * 53} y="235" fill="#64748b" fontSize="10" textAnchor="middle">{t}</text>
                                    ))}

                                    {/* PK Curve */}
                                    <motion.path
                                        d={selectedSaltData?.pkPath}
                                        fill="none"
                                        stroke={selectedSaltData?.color}
                                        strokeWidth="3"
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{ duration: 1.5 }}
                                    />

                                    {/* Annotations for K salt */}
                                    {selectedSalt === 'K' && (
                                        <>
                                            {/* Onset */}
                                            <line x1="60" y1="180" x2="60" y2="225" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3" />
                                            <text x="60" y="265" fill="#f59e0b" fontSize="9" textAnchor="middle">Onset</text>

                                            {/* Peak (Cmax) */}
                                            <circle cx="100" cy="55" r="5" fill={selectedSaltData?.color} />
                                            <text x="100" y="35" fill="#e2e8f0" fontSize="10" textAnchor="middle" fontWeight="600">Cmax</text>

                                            {/* Duration */}
                                            <line x1="60" y1="165" x2="200" y2="165" stroke="#22c55e" strokeWidth="2" />
                                            <text x="130" y="180" fill="#22c55e" fontSize="9" textAnchor="middle">Duration</text>
                                        </>
                                    )}

                                    {/* Annotations for Na salt */}
                                    {selectedSalt === 'Na' && (
                                        <>
                                            <line x1="100" y1="180" x2="100" y2="225" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3" />
                                            <text x="100" y="265" fill="#f59e0b" fontSize="9" textAnchor="middle">Onset</text>

                                            <circle cx="180" cy="85" r="5" fill={selectedSaltData?.color} />
                                            <text x="180" y="70" fill="#e2e8f0" fontSize="10" textAnchor="middle" fontWeight="600">Cmax</text>

                                            <line x1="100" y1="155" x2="320" y2="155" stroke="#22c55e" strokeWidth="2" />
                                            <text x="210" y="145" fill="#22c55e" fontSize="9" textAnchor="middle">Duration</text>
                                        </>
                                    )}
                                </svg>

                                {/* Salt Details Card */}
                                <div style={{
                                    marginTop: '1rem',
                                    padding: '1rem',
                                    background: `${selectedSaltData?.color}15`,
                                    borderRadius: '12px',
                                    border: `1px solid ${selectedSaltData?.color}40`
                                }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', textAlign: 'center' }}>
                                        <div>
                                            <div style={{ color: '#f59e0b', fontWeight: 700, fontSize: '1.1rem' }}>{selectedSaltData?.onset}</div>
                                            <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Onset</div>
                                        </div>
                                        <div>
                                            <div style={{ color: selectedSaltData?.color, fontWeight: 700, fontSize: '1.1rem' }}>{selectedSaltData?.peak}</div>
                                            <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Peak (Tmax)</div>
                                        </div>
                                        <div>
                                            <div style={{ color: '#22c55e', fontWeight: 700, fontSize: '1.1rem' }}>{selectedSaltData?.duration}</div>
                                            <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Duration</div>
                                        </div>
                                    </div>
                                    <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
                                        <div style={{ color: '#e2e8f0', fontSize: '0.9rem' }}>
                                            <strong>Clinical Use:</strong> {selectedSaltData?.useCase}
                                        </div>
                                    </div>
                                    {/* WHY Explanation */}
                                    <div style={{
                                        marginTop: '0.75rem',
                                        padding: '0.75rem',
                                        background: 'rgba(59, 130, 246, 0.1)',
                                        borderRadius: '8px',
                                        border: '1px solid rgba(59, 130, 246, 0.3)'
                                    }}>
                                        <div style={{ color: '#60a5fa', fontWeight: 600, fontSize: '0.8rem', marginBottom: '0.25rem' }}>💡 WHY?</div>
                                        <div style={{ color: '#e2e8f0', fontSize: '0.85rem', lineHeight: 1.4 }}>
                                            {selectedSaltData?.explanation}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* COX-2 Binding Visualization Button */}
                <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowCOX2(!showCOX2)}
                        style={{
                            padding: '1rem 2rem',
                            background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                            border: 'none',
                            borderRadius: '12px',
                            color: 'white',
                            fontWeight: 600,
                            cursor: 'pointer',
                            marginRight: '1rem'
                        }}
                    >
                        {showCOX2 ? 'Hide' : 'View'} COX-2 Enzyme Binding (PDB: 1PGE) 🔬
                    </motion.button>
                </div>

                {/* COX-2 3D Viewer */}
                <AnimatePresence>
                    {showCOX2 && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            style={{ marginTop: '1.5rem', overflow: 'hidden' }}
                        >
                            <div style={{
                                background: 'rgba(0,0,0,0.5)',
                                borderRadius: '16px',
                                padding: '1.5rem',
                                border: '1px solid rgba(99, 102, 241, 0.3)'
                            }}>
                                <h4 style={{ color: '#e2e8f0', marginBottom: '1rem', textAlign: 'center' }}>
                                    Diclofenac in COX-2 Active Site (PDB: 1PGE)
                                </h4>
                                <p style={{ color: '#94a3b8', fontSize: '0.9rem', textAlign: 'center', marginBottom: '1rem' }}>
                                    See how the Chlorine atoms you placed create the perfect 3D fit in the hydrophobic pocket!
                                </p>
                                <div style={{ height: '400px', borderRadius: '12px', overflow: 'hidden' }}>
                                    <MoleculeViewer
                                        moleculeName="Diclofenac-COX2"
                                        rcsbLigandId="FLP"
                                        pdbId="1PGE"
                                        showControls={true}
                                        autoRotate={true}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                {/* Next to Phase 4: Clinical Challenge */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onComplete}
                    style={{
                        width: '100%',
                        marginTop: '2rem',
                        padding: '1rem',
                        background: 'linear-gradient(135deg, #10b981, #059669)',
                        border: 'none',
                        borderRadius: '12px',
                        color: 'white',
                        fontWeight: 700,
                        fontSize: '1rem',
                        cursor: 'pointer'
                    }}
                >
                    Next: Clinical Challenge 🩺 →
                </motion.button>
            </div>
        </div>
    );
}

// ============================================================================
// PHASE 4: CLINICAL CHALLENGE (PK Curve Guessing + Clinical Cases)
// ============================================================================

function Phase4ClinicalChallenge({ onComplete }: { onComplete: () => void }) {
    const [pkGuess, setPkGuess] = useState<string | null>(null);
    const [case1Answer, setCase1Answer] = useState<string | null>(null);
    const [case2Answer, setCase2Answer] = useState<string | null>(null);
    const [showPkResult, setShowPkResult] = useState(false);
    const [showCaseResults, setShowCaseResults] = useState(false);
    const [currentChallenge, setCurrentChallenge] = useState<'pk' | 'cases'>('pk');

    const pkCorrect = pkGuess === 'K';
    const case1Correct = case1Answer === 'K';
    const case2Correct = case2Answer === 'Na';
    const allCasesCorrect = case1Correct && case2Correct;

    return (
        <div style={{ padding: '1.5rem' }}>
            {/* Phase Header */}
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
                }}>4</div>
                <div>
                    <h4 style={{ color: '#e2e8f0', margin: 0 }}>Clinical Decision Challenge</h4>
                    <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.85rem' }}>
                        Apply your pharmacokinetic knowledge
                    </p>
                </div>
            </div>

            {/* Challenge 1: PK Curve Identification */}
            {currentChallenge === 'pk' && (
                <div style={{
                    background: 'rgba(0, 0, 0, 0.4)',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                    <h5 style={{ color: '#f59e0b', marginBottom: '1rem' }}>📈 Challenge 1: Identify the Salt</h5>
                    <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1rem' }}>
                        Look at this plasma concentration vs. time curve. Which salt form does it represent?
                    </p>

                    {/* PK Curve SVG (showing K+ pattern - fast rise, fast fall) */}
                    <div style={{
                        background: 'rgba(15, 23, 42, 0.8)',
                        borderRadius: '12px',
                        padding: '1rem',
                        marginBottom: '1rem'
                    }}>
                        <svg viewBox="0 0 400 200" style={{ width: '100%', maxWidth: '400px' }}>
                            {/* Grid */}
                            {[50, 100, 150].map(y => (
                                <line key={y} x1="40" y1={y} x2="360" y2={y} stroke="#334155" strokeWidth="1" strokeDasharray="4" />
                            ))}

                            {/* MEC Line */}
                            <line x1="40" y1="120" x2="360" y2="120" stroke="#ef4444" strokeWidth="2" strokeDasharray="6" />
                            <text x="365" y="124" fill="#ef4444" fontSize="10">MEC</text>

                            {/* Axes */}
                            <line x1="40" y1="170" x2="360" y2="170" stroke="#64748b" strokeWidth="2" />
                            <line x1="40" y1="170" x2="40" y2="30" stroke="#64748b" strokeWidth="2" />

                            {/* Labels */}
                            <text x="200" y="195" fill="#94a3b8" fontSize="10" textAnchor="middle">Time (hours)</text>

                            {/* K+ Pattern: Fast peak, sharp decline (MYSTERY CURVE) */}
                            <motion.path
                                d="M 40 170 Q 60 170, 80 50 Q 100 30, 120 50 Q 180 100, 260 160 Q 320 170, 360 170"
                                fill="none"
                                stroke="#8b5cf6"
                                strokeWidth="3"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 1.5 }}
                            />

                            {/* Peak marker */}
                            <circle cx="100" cy="35" r="5" fill="#8b5cf6" />
                            <text x="100" y="20" fill="#8b5cf6" fontSize="9" textAnchor="middle">Peak</text>
                        </svg>
                    </div>

                    {/* Answer Options */}
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                        {['K', 'Na'].map(salt => (
                            <motion.button
                                key={salt}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => setPkGuess(salt)}
                                disabled={showPkResult}
                                style={{
                                    flex: 1,
                                    padding: '1rem',
                                    background: pkGuess === salt
                                        ? (showPkResult ? (salt === 'K' ? '#22c55e' : '#ef4444') : '#8b5cf6')
                                        : 'rgba(255,255,255,0.1)',
                                    border: `2px solid ${pkGuess === salt
                                        ? (showPkResult ? (salt === 'K' ? '#22c55e' : '#ef4444') : '#8b5cf6')
                                        : 'rgba(255,255,255,0.2)'}`,
                                    borderRadius: '12px',
                                    color: 'white',
                                    fontWeight: 600,
                                    cursor: showPkResult ? 'default' : 'pointer'
                                }}
                            >
                                {salt === 'K' ? '⚡ Potassium Salt (Cataflam®)' : '💊 Sodium Salt (Voltaren®)'}
                            </motion.button>
                        ))}
                    </div>

                    {/* Check Button */}
                    {pkGuess && !showPkResult && (
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            whileHover={{ scale: 1.02 }}
                            onClick={() => setShowPkResult(true)}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
                                border: 'none',
                                borderRadius: '10px',
                                color: 'white',
                                fontWeight: 600,
                                cursor: 'pointer'
                            }}
                        >
                            Check Answer
                        </motion.button>
                    )}

                    {/* Result */}
                    {showPkResult && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{
                                padding: '1rem',
                                background: pkCorrect ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                                borderRadius: '12px',
                                border: `1px solid ${pkCorrect ? '#22c55e' : '#ef4444'}`,
                                marginBottom: '1rem'
                            }}
                        >
                            <div style={{ color: pkCorrect ? '#86efac' : '#fca5a5', fontWeight: 600 }}>
                                {pkCorrect ? '✅ Correct!' : '❌ Not quite!'}
                            </div>
                            <div style={{ color: '#e2e8f0', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                                This is <strong>Potassium salt</strong>: Fast Tmax (1 hr), high peak, short duration.
                                K⁺ has lower lattice energy → faster dissolution → rapid absorption!
                            </div>
                        </motion.div>
                    )}

                    {/* Next Button */}
                    {showPkResult && (
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            whileHover={{ scale: 1.02 }}
                            onClick={() => setCurrentChallenge('cases')}
                            style={{
                                width: '100%',
                                padding: '1rem',
                                background: 'linear-gradient(135deg, #10b981, #059669)',
                                border: 'none',
                                borderRadius: '10px',
                                color: 'white',
                                fontWeight: 700,
                                cursor: 'pointer'
                            }}
                        >
                            Next: Clinical Cases →
                        </motion.button>
                    )}
                </div>
            )}

            {/* Challenge 2: Clinical Cases */}
            {currentChallenge === 'cases' && (
                <div style={{
                    background: 'rgba(139, 92, 246, 0.1)',
                    borderRadius: '16px',
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                    padding: '1.5rem'
                }}>
                    <h5 style={{ color: '#8b5cf6', marginBottom: '1rem' }}>🩺 Challenge 2: Prescribe the Right Salt</h5>
                    <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                        Which salt would you prescribe for each patient?
                    </p>

                    {/* Case 1: Acute */}
                    <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '12px', padding: '1rem', marginBottom: '1rem' }}>
                        <div style={{ color: '#f59e0b', fontWeight: 600, marginBottom: '0.5rem' }}>Case 1: Acute Migraine</div>
                        <div style={{ color: '#e2e8f0', fontSize: '0.9rem', marginBottom: '1rem' }}>
                            32-year-old needs <strong>fast pain relief</strong> to return to work.
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                            {['K', 'Na'].map(salt => (
                                <motion.button
                                    key={salt}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => setCase1Answer(salt)}
                                    disabled={showCaseResults}
                                    style={{
                                        flex: 1,
                                        padding: '0.75rem',
                                        background: case1Answer === salt
                                            ? (showCaseResults ? (salt === 'K' ? '#22c55e' : '#ef4444') : '#8b5cf6')
                                            : 'rgba(255,255,255,0.1)',
                                        border: 'none',
                                        borderRadius: '8px',
                                        color: 'white',
                                        fontWeight: 600,
                                        cursor: showCaseResults ? 'default' : 'pointer'
                                    }}
                                >
                                    {salt === 'K' ? '⚡ Potassium' : '💊 Sodium'}
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Case 2: Chronic */}
                    <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '12px', padding: '1rem', marginBottom: '1rem' }}>
                        <div style={{ color: '#8b5cf6', fontWeight: 600, marginBottom: '0.5rem' }}>Case 2: Chronic Arthritis</div>
                        <div style={{ color: '#e2e8f0', fontSize: '0.9rem', marginBottom: '1rem' }}>
                            65-year-old needs <strong>all-day pain control</strong> without frequent dosing.
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                            {['K', 'Na'].map(salt => (
                                <motion.button
                                    key={salt}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => setCase2Answer(salt)}
                                    disabled={showCaseResults}
                                    style={{
                                        flex: 1,
                                        padding: '0.75rem',
                                        background: case2Answer === salt
                                            ? (showCaseResults ? (salt === 'Na' ? '#22c55e' : '#ef4444') : '#8b5cf6')
                                            : 'rgba(255,255,255,0.1)',
                                        border: 'none',
                                        borderRadius: '8px',
                                        color: 'white',
                                        fontWeight: 600,
                                        cursor: showCaseResults ? 'default' : 'pointer'
                                    }}
                                >
                                    {salt === 'K' ? '⚡ Potassium' : '💊 Sodium'}
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Check Button */}
                    {case1Answer && case2Answer && !showCaseResults && (
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            whileHover={{ scale: 1.02 }}
                            onClick={() => setShowCaseResults(true)}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
                                border: 'none',
                                borderRadius: '10px',
                                color: 'white',
                                fontWeight: 600,
                                cursor: 'pointer'
                            }}
                        >
                            Check My Answers
                        </motion.button>
                    )}

                    {/* Results */}
                    {showCaseResults && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{
                                padding: '1rem',
                                background: allCasesCorrect ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                                borderRadius: '10px',
                                border: `1px solid ${allCasesCorrect ? '#22c55e' : '#ef4444'}`,
                                textAlign: 'center',
                                marginBottom: '1rem'
                            }}
                        >
                            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{allCasesCorrect ? '🎉' : '🔄'}</div>
                            <div style={{ color: allCasesCorrect ? '#86efac' : '#fca5a5', fontWeight: 600, marginBottom: '0.5rem' }}>
                                {allCasesCorrect ? 'Perfect! You understand salt selection!' : `${(case1Correct ? 1 : 0) + (case2Correct ? 1 : 0)}/2 Correct`}
                            </div>
                            {!allCasesCorrect && (
                                <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
                                    {!case1Correct && 'Case 1: K⁺ for acute (fast onset). '}
                                    {!case2Correct && 'Case 2: Na⁺ for chronic (sustained).'}
                                </div>
                            )}
                        </motion.div>
                    )}

                    {/* Complete Button */}
                    {showCaseResults && allCasesCorrect && (
                        <motion.button
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onComplete}
                            style={{
                                width: '100%',
                                padding: '1rem',
                                background: 'linear-gradient(135deg, #10b981, #059669)',
                                border: 'none',
                                borderRadius: '12px',
                                color: 'white',
                                fontWeight: 700,
                                cursor: 'pointer'
                            }}
                        >
                            Complete Diclofenac Lab 🎓 ✓
                        </motion.button>
                    )}
                </div>
            )}
        </div>
    );
}


// ============================================================================
// INTERACTIVE 2D STRUCTURE VIEWER (Professional with Clickable Zones)
// ============================================================================

function Interactive2DStructure({ molecule }: { molecule: Molecule }) {
    const [selectedGroup, setSelectedGroup] = useState<FunctionalGroupInfo | null>(null);

    // Define clickable zones for Diclofenac Sodium (based on 280x280 PubChem image)
    // Image shows: Na+ and COO- at top, phenyl rings in middle/left, Cl atoms on lower ring
    const CLICKABLE_ZONES: Record<string, { x: number; y: number; width: number; height: number }> = {
        // Na+ counter-ion at top right
        'salt': { x: 155, y: 15, width: 45, height: 35 },
        // Carboxylate (-COO-) at top center
        'cooh': { x: 90, y: 25, width: 65, height: 50 },
        // NH bridge between rings (middle area)
        'nh': { x: 95, y: 100, width: 40, height: 35 },
        // Upper phenyl ring (phenylacetic acid part)
        'ring1': { x: 70, y: 60, width: 75, height: 70 },
        // Lower phenyl ring (dichlorophenyl)
        'rings': { x: 85, y: 140, width: 80, height: 80 },
        // 2,6-Dichloro groups on lower ring
        'cl': { x: 60, y: 175, width: 120, height: 45 }
    };

    return (
        <div style={{
            background: 'rgba(15, 23, 42, 0.8)',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.1)',
            overflow: 'hidden'
        }}>
            <div style={{ padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <h4 style={{ color: '#e2e8f0', margin: 0 }}>Interactive 2D Structure</h4>
                <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.85rem' }}>Click on functional groups to learn their role</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px' }}>
                {/* Left: Structure Image with Clickable Overlays */}
                <div style={{
                    position: 'relative',
                    background: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1rem'
                }}>
                    <img
                        src={getPubChem2DImage(molecule.pubchemCid, 280)}
                        alt={molecule.name}
                        style={{ maxWidth: '100%', height: 'auto' }}
                    />

                    {/* Clickable Overlay Zones */}
                    {molecule.functionalGroups.map(fg => {
                        const zone = CLICKABLE_ZONES[fg.targetId || ''];
                        if (!zone) return null;

                        return (
                            <motion.div
                                key={fg.targetId}
                                whileHover={{ scale: 1.05 }}
                                onClick={() => setSelectedGroup(selectedGroup === fg ? null : fg)}
                                style={{
                                    position: 'absolute',
                                    left: zone.x,
                                    top: zone.y,
                                    width: zone.width,
                                    height: zone.height,
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    background: selectedGroup === fg ? `${fg.color}40` : 'transparent',
                                    border: selectedGroup === fg ? `2px solid ${fg.color}` : '2px solid transparent',
                                    transition: 'all 0.2s'
                                }}
                            />
                        );
                    })}
                </div>

                {/* Right: Functional Group List & Details */}
                <div style={{
                    background: 'rgba(0,0,0,0.3)',
                    padding: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem'
                }}>
                    <div style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' }}>
                        Functional Groups
                    </div>

                    {molecule.functionalGroups.map(fg => (
                        <motion.button
                            key={fg.name}
                            whileHover={{ x: 5 }}
                            onClick={() => setSelectedGroup(selectedGroup === fg ? null : fg)}
                            style={{
                                padding: '0.75rem',
                                background: selectedGroup === fg ? `${fg.color}20` : 'rgba(255,255,255,0.05)',
                                border: `1px solid ${selectedGroup === fg ? fg.color : 'rgba(255,255,255,0.1)'}`,
                                borderRadius: '8px',
                                textAlign: 'left',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem'
                            }}
                        >
                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: fg.color, flexShrink: 0 }} />
                            <div style={{ flex: 1 }}>
                                <div style={{ color: '#e2e8f0', fontSize: '0.9rem', fontWeight: 600 }}>{fg.name}</div>
                            </div>
                        </motion.button>
                    ))}

                    {/* Detail Card when selected */}
                    <AnimatePresence>
                        {selectedGroup && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                style={{
                                    marginTop: '0.5rem',
                                    padding: '1rem',
                                    background: `${selectedGroup.color}15`,
                                    borderRadius: '12px',
                                    border: `1px solid ${selectedGroup.color}40`
                                }}
                            >
                                <div style={{ color: selectedGroup.color, fontWeight: 700, marginBottom: '0.5rem' }}>
                                    {selectedGroup.name}
                                </div>
                                <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
                                    <strong>Role:</strong> {selectedGroup.role}
                                </div>
                                <div style={{ color: '#e2e8f0', fontSize: '0.85rem' }}>
                                    <strong>Benefit:</strong> {selectedGroup.benefit}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function DiclofenacLab() {
    const [phase, setPhase] = useState<0 | 1 | 2 | 3 | 4 | 5>(0);
    const [completedPhases, setCompletedPhases] = useState<number[]>([]);

    const handlePhaseComplete = (phaseNum: number) => {
        if (!completedPhases.includes(phaseNum)) {
            setCompletedPhases([...completedPhases, phaseNum]);
        }
        if (phaseNum < 4) {
            setPhase((phaseNum + 1) as any);
        } else {
            setPhase(5); // Final state - show completion
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            {/* Progress Stepper */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '2rem 2rem 0',
                maxWidth: '1000px',
                margin: '0 auto',
                width: '100%',
                position: 'relative'
            }}>
                {['Discovery', 'Optimization', 'Solubility', 'Salt Eng.', 'Clinical'].map((step, i) => (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', position: 'relative', zIndex: 1 }}>
                        <motion.div
                            animate={{
                                scale: phase === i ? 1.2 : 1,
                                backgroundColor: i <= phase ? '#8b5cf6' : '#1e293b',
                                borderColor: i <= phase ? '#8b5cf6' : '#475569'
                            }}
                            style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '50%',
                                border: '2px solid',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: 600,
                                fontSize: '0.9rem'
                            }}
                        >
                            {completedPhases.includes(i) ? '✓' : i}
                        </motion.div>
                        <div style={{
                            fontSize: '0.85rem',
                            color: i <= phase ? 'white' : '#64748b',
                            fontWeight: i === phase ? 600 : 400
                        }}>
                            {step}
                        </div>
                    </div>
                ))}
                {/* Progress Bar Line */}
                <div style={{
                    position: 'absolute',
                    top: '2.9rem',
                    left: '10%',
                    width: '80%',
                    height: '2px',
                    background: '#334155',
                    zIndex: 0
                }}>
                    <motion.div
                        animate={{ width: `${(phase / 4) * 100}%` }}
                        style={{ height: '100%', background: '#8b5cf6' }}
                    />
                </div>
            </div>

            {/* Main Lab Area */}
            <div style={{ minHeight: '600px' }}>
                <AnimatePresence mode="wait">
                    {phase === 0 && (
                        <motion.div key="phase0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <Phase0LeadDiscovery onComplete={() => handlePhaseComplete(0)} />
                        </motion.div>
                    )}
                    {phase === 1 && (
                        <motion.div key="phase1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <Phase1Chemist onComplete={() => handlePhaseComplete(1)} />
                        </motion.div>
                    )}
                    {phase === 2 && (
                        <motion.div key="phase2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <Phase2Formulator onComplete={() => handlePhaseComplete(2)} />
                        </motion.div>
                    )}
                    {phase === 3 && (
                        <motion.div key="phase3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <Phase3Salt onComplete={() => handlePhaseComplete(3)} />
                        </motion.div>
                    )}
                    {phase === 4 && (
                        <motion.div key="phase4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <Phase4ClinicalChallenge onComplete={() => handlePhaseComplete(4)} />
                        </motion.div>
                    )}
                    {phase === 5 && (
                        <motion.div key="phase5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} style={{ padding: '1.5rem' }}>
                            <div style={{
                                textAlign: 'center',
                                padding: '2rem',
                                background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(16, 185, 129, 0.1))',
                                borderRadius: '16px',
                                border: '1px solid rgba(34, 197, 94, 0.3)',
                                marginBottom: '2rem'
                            }}>
                                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎓</div>
                                <h3 style={{ color: '#22c55e', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                                    Congratulations! Lab Complete
                                </h3>
                                <p style={{ color: '#e2e8f0' }}>
                                    You've successfully completed the Diclofenac Lead-to-Salt journey.
                                </p>
                            </div>

                            {/* Interactive 2D Structure for Diclofenac Sodium */}
                            <Interactive2DStructure molecule={MOLECULES[2]} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
