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

interface Molecule {
    name: string;
    stage: string;
    pubchemCid: number;
    description?: string;
    functionalGroups: {
        name: string;
        role: string;
        benefit: string;
        color: string;
        targetId?: string; // ID for SVG targeting
    }[];
}

// ============================================================================
// MOLECULE DATA
// ============================================================================

const MOLECULES: Molecule[] = [
    {
        name: '2-Anilinophenylacetic Acid',
        stage: 'Lead Compound',
        pubchemCid: 12560, // Approximate CID for similar structure
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
        description: 'The rapid-onset salt form: Lower lattice energy allows faster dissolution for acute pain.',
        functionalGroups: [
            { name: 'Carboxylate (-COO⁻)', role: 'Ionic form', benefit: 'Water soluble, FAST dissolution', color: '#ef4444', targetId: 'cooh' },
            { name: 'K⁺ Counter-ion', role: 'Salt former', benefit: 'Lower lattice energy → rapid release', color: '#10b981', targetId: 'salt' },
            { name: '2,6-Dichloro Groups', role: 'Conformational lock', benefit: 'Maintains COX-2 selectivity', color: '#22c55e', targetId: 'cl' }
        ]
    }
];

// ============================================================================
// PHASE 0: THE EXPLORER - Lead Discovery
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
                border: '1px solid rgba(255, 255, 255, 0.1)',
                textAlign: 'center'
            }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📜</div>
                <h3 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>
                    The "Phenylacetic Acid" Hit
                </h3>
                <p style={{ color: '#e2e8f0', maxWidth: '600px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
                    Screening reveals that derivatives of <strong>phenylacetic acid</strong> have anti-inflammatory properties.
                    However, the initial <strong>Lead Compound</strong> has problems:
                </p>

                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '2rem',
                    marginBottom: '2rem'
                }}>
                    <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                        <div style={{ color: '#ef4444', fontWeight: 700 }}>⚠️ Problem 1</div>
                        <div style={{ color: '#fca5a5', fontSize: '0.9rem' }}>Low Potency</div>
                    </div>
                    <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                        <div style={{ color: '#ef4444', fontWeight: 700 }}>⚠️ Problem 2</div>
                        <div style={{ color: '#fca5a5', fontSize: '0.9rem' }}>High Toxicity (Ulcers)</div>
                    </div>
                </div>

                <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '2rem' }}>
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
    );
}

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
                setTimeout(onComplete, 2000);
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
                        Modify the lead to improve potency and selectivity
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
                            ⚠️ Wrong Position! Low Binding Affinity
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
                                textAlign: 'center',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                            }}
                        >
                            ✅ Steric Twist Achieved!
                            <div style={{ fontSize: '0.9rem', fontWeight: 400, marginTop: '0.5rem' }}>
                                The 2,6-dichloro substitution forces the rings 80° apart.
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* SVG Molecule Representation */}
                <svg width="400" height="250" viewBox="0 0 400 250">
                    <defs>
                        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="3" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>

                    {/* Ring 1 (Phenylacetate - left) */}
                    <g transform="translate(100, 120)">
                        <polygon
                            points="0,-40 35,-20 35,20 0,40 -35,20 -35,-20"
                            fill="none"
                            stroke="#94a3b8"
                            strokeWidth="3"
                        />
                        <circle cx="0" cy="0" r="15" fill="#94a3b8" opacity="0.2" />

                        {/* Carboxylic acid */}
                        <line x1="0" y1="40" x2="0" y2="70" stroke="#ef4444" strokeWidth="3" />
                        <text x="0" y="85" fill="#ef4444" fontSize="14" textAnchor="middle" fontWeight="700">COOH</text>
                    </g>

                    {/* NH Bridge */}
                    <line x1="135" y1="120" x2="165" y2="120" stroke="#f59e0b" strokeWidth="3" />
                    <text x="150" y="110" fill="#f59e0b" fontSize="14" textAnchor="middle" fontWeight="700">NH</text>

                    {/* Ring 2 (Dichlorophenyl - right) */}
                    <g transform="translate(250, 120)">
                        <polygon
                            points="0,-40 35,-20 35,20 0,40 -35,20 -35,-20"
                            fill="none"
                            stroke="#94a3b8"
                            strokeWidth="3"
                        />
                        <circle cx="0" cy="0" r="15" fill="#94a3b8" opacity="0.2" />

                        {/* Interactive Position 2 (Top Left) */}
                        <motion.g
                            whileHover={!clPlaced.position1 ? { scale: 1.2 } : {}}
                            style={{ cursor: !clPlaced.position1 ? 'pointer' : 'default' }}
                            onClick={() => !clPlaced.position1 && handlePositionClick('position1')}
                        >
                            {clPlaced.position1 ? (
                                <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                    <line x1="-15" y1="-30" x2="-35" y2="-50" stroke="#22c55e" strokeWidth="3" />
                                    <circle cx="-45" cy="-60" r="15" fill="#22c55e" />
                                    <text x="-45" y="-55" fill="white" fontSize="12" textAnchor="middle" fontWeight="700">Cl</text>
                                </motion.g>
                            ) : (
                                <g>
                                    <circle cx="-35" cy="-20" r="12" fill="transparent" stroke="#22c55e" strokeWidth="2" strokeDasharray="4" />
                                    <text x="-35" y="-16" fill="#22c55e" fontSize="10" textAnchor="middle" fontWeight="600">Site 2</text>
                                </g>
                            )}
                        </motion.g>

                        {/* Interactive Position 6 (Bottom Left) */}
                        <motion.g
                            whileHover={!clPlaced.position2 ? { scale: 1.2 } : {}}
                            style={{ cursor: !clPlaced.position2 ? 'pointer' : 'default' }}
                            onClick={() => !clPlaced.position2 && handlePositionClick('position2')}
                        >
                            {clPlaced.position2 ? (
                                <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                    <line x1="-15" y1="30" x2="-35" y2="50" stroke="#22c55e" strokeWidth="3" />
                                    <circle cx="-45" cy="60" r="15" fill="#22c55e" />
                                    <text x="-45" y="65" fill="white" fontSize="12" textAnchor="middle" fontWeight="700">Cl</text>
                                </motion.g>
                            ) : (
                                <g>
                                    <circle cx="-35" cy="20" r="12" fill="transparent" stroke="#22c55e" strokeWidth="2" strokeDasharray="4" />
                                    <text x="-35" y="24" fill="#22c55e" fontSize="10" textAnchor="middle" fontWeight="600">Site 6</text>
                                </g>
                            )}
                        </motion.g>

                        {/* Decay/Wrong Positions */}
                        {[3, 4, 5].map((pos, i) => {
                            const coords = i === 0 ? [35, -20] : i === 1 ? [0, 40] : [35, 20]; // approx
                            return (
                                <motion.g
                                    key={pos}
                                    whileHover={{ scale: 1.2 }}
                                    style={{ cursor: 'pointer', opacity: 0.2 }}
                                    onClick={() => handlePositionClick('wrong')}
                                >
                                    <circle cx={coords[0] as number + (i === 1 ? 0 : 10)} cy={coords[1] as number} r="8" fill="#ef4444" />
                                </motion.g>
                            );
                        })}
                    </g>

                    {/* Text hint */}
                    {!bothPlaced && (
                        <text x="200" y="230" fill="#94a3b8" fontSize="12" textAnchor="middle">
                            Click on the ortho positions to enhance stereochemical locking
                        </text>
                    )}
                </svg>
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
                        Diclofenac Acid has poor water solubility (pKa ~4)
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
                <div style={{ position: 'relative', width: '300px', height: '200px', background: '#1e293b', borderRadius: '12px', overflow: 'hidden' }}>
                    {/* Stomach Acid Background */}
                    <div style={{ position: 'absolute', bottom: 0, width: '100%', height: '80%', background: 'linear-gradient(to bottom, #334155, #1e293b)', opacity: 0.5 }} />
                    <text x="10" y="20" fill="#64748b" style={{ position: 'absolute', top: 10, left: 10 }}>Stomach (pH 2)</text>

                    {/* Precipitating Particles */}
                    <AnimatePresence>
                        {showProblem && [1, 2, 3, 4, 5].map(i => (
                            <motion.div
                                key={i}
                                initial={{ y: -50, opacity: 0 }}
                                animate={{ y: 150 + Math.random() * 20, opacity: 1 }}
                                transition={{ duration: 2, delay: i * 0.2 }}
                                style={{
                                    position: 'absolute',
                                    left: 50 + i * 40,
                                    width: '12px',
                                    height: '12px',
                                    borderRadius: '50%',
                                    background: 'white',
                                    boxShadow: '0 0 10px rgba(255,255,255,0.5)'
                                }}
                            >
                                <div style={{ fontSize: '8px', color: '#1e293b', textAlign: 'center', lineHeight: '12px' }}>H</div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                <div style={{ textAlign: 'center', maxWidth: '500px' }}>
                    <p style={{ color: '#ef4444', fontWeight: 600 }}>Problem: pH 2 (Stomach) &lt; pKa 4 (Diclofenac)</p>
                    <p style={{ color: '#e2e8f0', fontSize: '0.9rem' }}>
                        The molecule is protonated (neutral), making it insoluble in water. It acts like a stone!
                    </p>
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onComplete}
                    style={{
                        padding: '0.75rem 1.5rem',
                        background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                        border: 'none',
                        borderRadius: '12px',
                        color: 'white',
                        fontWeight: 600,
                        cursor: 'pointer'
                    }}
                >
                    Solve with Salt Screening ➔
                </motion.button>
            </div>
        </div>
    );
}

// ============================================================================
// PHASE 3: SALT SCREENING
// ============================================================================

function Phase3Salt({ onComplete }: { onComplete: () => void }) {
    const [selectedSalt, setSelectedSalt] = useState<string | null>(null);

    const salts = [
        { id: 'Na', name: 'Sodium', color: '#8b5cf6', type: 'Voltaren®', desc: 'Sustained Release', recommended: true },
        { id: 'K', name: 'Potassium', color: '#10b981', type: 'Cataflam®', desc: 'Rapid Onset', recommended: true },
        { id: 'Ca', name: 'Calcium', color: '#64748b', type: 'Failed', desc: 'Insoluble', recommended: false }
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
                    <h4 style={{ color: '#e2e8f0', margin: 0 }}>Salt Selection Engineering</h4>
                    <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.85rem' }}>
                        Choose a counter-ion to optimize dissolution properties
                    </p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
                {/* Salt Selector */}
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
                                border: `1px solid ${selectedSalt === salt.id ? salt.color : 'rgba(255,255,255,0.1)'}`,
                                borderRadius: '12px',
                                textAlign: 'left',
                                cursor: 'pointer'
                            }}
                        >
                            <div style={{ fontWeight: 700, color: salt.color, fontSize: '1.1rem' }}>{salt.name} Salt</div>
                            <div style={{ color: '#e2e8f0', fontSize: '0.9rem' }}>{salt.type}</div>
                            <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{salt.desc}</div>
                        </motion.button>
                    ))}
                </div>

                {/* PK Curve Visualization */}
                <div style={{
                    background: 'rgba(0,0,0,0.3)',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    border: '1px solid rgba(255,255,255,0.1)',
                    minHeight: '300px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    {!selectedSalt ? (
                        <div style={{ color: '#64748b', textAlign: 'center' }}>
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📉</div>
                            Select a salt to simulate pharmacokinetic profile
                        </div>
                    ) : (
                        <motion.div
                            key={selectedSalt}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={{ width: '100%', height: '100%', position: 'relative' }}
                        >
                            <h4 style={{ textAlign: 'center', color: '#e2e8f0', marginBottom: '1rem' }}>
                                Plasma Concentration vs. Time
                            </h4>
                            <svg viewBox="0 0 300 150" style={{ width: '100%', overflow: 'visible' }}>
                                {/* Axes */}
                                <line x1="20" y1="130" x2="280" y2="130" stroke="#475569" strokeWidth="2" />
                                <line x1="20" y1="130" x2="20" y2="20" stroke="#475569" strokeWidth="2" />
                                <text x="280" y="145" fill="#94a3b8" fontSize="10" textAnchor="end">Time (h)</text>
                                <text x="15" y="20" fill="#94a3b8" fontSize="10" textAnchor="end" transform="rotate(-90 15,20)">Conc.</text>

                                {/* Curve */}
                                <motion.path
                                    d={selectedSalt === 'K'
                                        ? "M 20 130 C 40 130, 40 20, 80 20 S 150 130, 280 130" // Potassium spike
                                        : selectedSalt === 'Na'
                                            ? "M 20 130 C 60 130, 80 50, 120 50 S 200 130, 280 130" // Sodium delayed
                                            : "M 20 130 C 50 130, 100 120, 280 125" // Calcium flat
                                    }
                                    fill="none"
                                    stroke={salts.find(s => s.id === selectedSalt)?.color}
                                    strokeWidth="3"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 1.5 }}
                                />
                            </svg>
                            <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                                <div style={{ color: salts.find(s => s.id === selectedSalt)?.color, fontWeight: 700 }}>
                                    Clinical Outcome:
                                </div>
                                <div style={{ color: '#e2e8f0', fontSize: '0.9rem' }}>
                                    {selectedSalt === 'K' && "Excellent for acute pain (e.g., toothache). Rapid Cmax."}
                                    {selectedSalt === 'Na' && "Preferred for chronic arthritis. Lower Cmax, longer Tmax."}
                                    {selectedSalt === 'Ca' && "Development halted. Bioavailability too low."}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>

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
                    cursor: 'pointer'
                }}
            >
                Complete Laboratory Workflow
            </motion.button>
        </div>
    );
}

// ============================================================================
// MOLECULE STRUCTURE VIEWER (INTERACTIVE)
// ============================================================================

function InteractiveStructureViewer({ molecule }: { molecule: Molecule }) {
    const [selectedGroup, setSelectedGroup] = useState<Molecule['functionalGroups'][0] | null>(null);

    return (
        <div style={{
            background: 'var(--card-bg)',
            borderRadius: '16px',
            border: '1px solid var(--border-color)',
            overflow: 'hidden',
            display: 'grid',
            gridTemplateColumns: '1fr 300px',
            minHeight: '400px'
        }}>
            {/* Left: Interactive 2D Structure */}
            <div style={{
                background: 'white',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem'
            }}>
                <svg width="400" height="300" viewBox="0 0 400 300">
                    <defs>
                        <filter id="glow-highlight" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="4" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>

                    {/* BASE STRUCTURE SCAFFOLD (Diclofenac) */}
                    {/* Ring 1 (Left Phenyl) */}
                    <g transform="translate(120, 150)">
                        <polygon
                            points="0,-40 35,-20 35,20 0,40 -35,20 -35,-20"
                            fill={selectedGroup?.targetId?.includes('ring') ? `${selectedGroup.color}20` : 'none'}
                            stroke={selectedGroup?.targetId?.includes('ring') ? selectedGroup.color : '#334155'}
                            strokeWidth="3"
                            opacity={selectedGroup && !selectedGroup.targetId?.includes('ring') ? 0.3 : 1}
                        />
                        <circle cx="0" cy="0" r="15" fill="none" stroke="#334155" strokeWidth="1" opacity="0.5" />

                        {/* COOH Group */}
                        <g opacity={selectedGroup && !selectedGroup.targetId?.includes('cooh') ? 0.3 : 1}>
                            <line x1="0" y1="40" x2="0" y2="70" stroke={selectedGroup?.targetId === 'cooh' ? selectedGroup.color : '#ef4444'} strokeWidth="3" />
                            <text x="0" y="85" fill={selectedGroup?.targetId === 'cooh' ? selectedGroup.color : '#ef4444'} fontSize="14" textAnchor="middle" fontWeight="700">COOH</text>
                        </g>
                    </g>

                    {/* NH Bridge */}
                    <g opacity={selectedGroup && !selectedGroup.targetId?.includes('nh') ? 0.3 : 1}>
                        <line x1="155" y1="150" x2="185" y2="150" stroke={selectedGroup?.targetId === 'nh' ? selectedGroup.color : '#f59e0b'} strokeWidth="3" />
                        <text x="170" y="140" fill={selectedGroup?.targetId === 'nh' ? selectedGroup.color : '#f59e0b'} fontSize="14" textAnchor="middle" fontWeight="700">NH</text>
                    </g>

                    {/* Ring 2 (Right Dichlorophenyl) */}
                    <g transform="translate(270, 150)">
                        <polygon
                            points="0,-40 35,-20 35,20 0,40 -35,20 -35,-20"
                            fill={selectedGroup?.targetId?.includes('rings') ? `${selectedGroup.color}20` : 'none'}
                            stroke={selectedGroup?.targetId?.includes('rings') ? selectedGroup.color : '#334155'}
                            strokeWidth="3"
                            opacity={selectedGroup && !selectedGroup.targetId?.includes('rings') ? 0.3 : 1}
                        />
                        <circle cx="0" cy="0" r="15" fill="none" stroke="#334155" strokeWidth="1" opacity="0.5" />

                        {/* Chlorines */}
                        {molecule.name.includes('Diclofenac') && (
                            <g opacity={selectedGroup && !selectedGroup.targetId?.includes('cl') ? 0.3 : 1}>
                                {/* Cl Top */}
                                <line x1="-15" y1="-30" x2="-35" y2="-50" stroke={selectedGroup?.targetId === 'cl' ? selectedGroup.color : '#22c55e'} strokeWidth="3" />
                                <circle cx="-45" cy="-60" r="14" fill="white" stroke={selectedGroup?.targetId === 'cl' ? selectedGroup.color : '#22c55e'} strokeWidth="2" />
                                <text x="-45" y="-55" fill={selectedGroup?.targetId === 'cl' ? selectedGroup.color : '#22c55e'} fontSize="10" textAnchor="middle" fontWeight="700">Cl</text>

                                {/* Cl Bottom */}
                                <line x1="-15" y1="30" x2="-35" y2="50" stroke={selectedGroup?.targetId === 'cl' ? selectedGroup.color : '#22c55e'} strokeWidth="3" />
                                <circle cx="-45" cy="60" r="14" fill="white" stroke={selectedGroup?.targetId === 'cl' ? selectedGroup.color : '#22c55e'} strokeWidth="2" />
                                <text x="-45" y="65" fill={selectedGroup?.targetId === 'cl' ? selectedGroup.color : '#22c55e'} fontSize="10" textAnchor="middle" fontWeight="700">Cl</text>
                            </g>
                        )}
                    </g>

                    {/* Salt Counter Ion */}
                    {molecule.name.includes('Sodium') && (
                        <g transform="translate(90, 230)">
                            <circle cx="0" cy="0" r="18" fill="#8b5cf6" />
                            <text x="0" y="5" fill="white" fontSize="14" textAnchor="middle" fontWeight="700">Na⁺</text>
                        </g>
                    )}
                    {molecule.name.includes('Potassium') && (
                        <g transform="translate(90, 230)">
                            <circle cx="0" cy="0" r="18" fill="#10b981" />
                            <text x="0" y="5" fill="white" fontSize="14" textAnchor="middle" fontWeight="700">K⁺</text>
                        </g>
                    )}

                </svg>

                <div style={{ position: 'absolute', top: '1rem', right: '1rem', color: '#94a3b8', fontSize: '0.8rem' }}>
                    Interactive 2D View
                </div>
            </div>

            {/* Right: Functional Groups & Info */}
            <div style={{
                background: 'rgba(15, 23, 42, 0.5)',
                padding: '1.5rem',
                borderLeft: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
            }}>
                <div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>Featured Molecule</div>
                    <h3 style={{ color: 'white', fontSize: '1.5rem', fontWeight: 700, margin: '0 0 0.5rem' }}>{molecule.name}</h3>
                    <span style={{
                        padding: '0.25rem 0.75rem',
                        background: 'rgba(255,255,255,0.1)',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        color: '#e2e8f0'
                    }}>
                        {molecule.stage}
                    </span>
                </div>

                <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.5 }}>
                    {molecule.description}
                </p>

                <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '0.5rem 0' }} />

                <div style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 600 }}>FUNCTIONAL GROUPS (Click to Highlight)</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', overflowY: 'auto' }}>
                    {molecule.functionalGroups.map((fg, i) => (
                        <motion.button
                            key={i}
                            whileHover={{ x: 5 }}
                            onClick={() => setSelectedGroup(selectedGroup === fg ? null : fg)}
                            style={{
                                padding: '0.75rem',
                                background: selectedGroup === fg ? `${fg.color}20` : 'transparent',
                                border: `1px solid ${selectedGroup === fg ? fg.color : 'rgba(255,255,255,0.1)'}`,
                                borderRadius: '8px',
                                textAlign: 'left',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem'
                            }}
                        >
                            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: fg.color }} />
                            <div>
                                <div style={{ color: 'white', fontSize: '0.9rem', fontWeight: 600 }}>{fg.name}</div>
                                <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{fg.benefit}</div>
                            </div>
                        </motion.button>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ============================================================================
// FEATURED MOLECULES GRID (3D)
// ============================================================================

function FeaturedMolecules3D() {
    return (
        <div style={{ marginTop: '4rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.8rem', fontWeight: 700, color: 'white' }}>Featured Molecules Collection</h3>
                <p style={{ color: '#94a3b8' }}>Explore the 3D structures of the development pipeline</p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem'
            }}>
                {MOLECULES.map(mol => (
                    <div key={mol.name} style={{
                        background: 'var(--card-bg)',
                        borderRadius: '16px',
                        border: '1px solid var(--border-color)',
                        overflow: 'hidden'
                    }}>
                        <div style={{ height: '250px', background: 'black', position: 'relative' }}>
                            <MoleculeViewer
                                cid={mol.pubchemCid}
                                showControls={false}
                                autoRotate={true}
                            />
                        </div>
                        <div style={{ padding: '1.5rem' }}>
                            <div style={{ color: '#94a3b8', fontSize: '0.8rem', textTransform: 'uppercase' }}>{mol.stage}</div>
                            <h4 style={{ color: 'white', fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem' }}>{mol.name}</h4>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {mol.functionalGroups.map(fg => (
                                    <span key={fg.name} style={{
                                        fontSize: '0.7rem',
                                        padding: '0.2rem 0.5rem',
                                        borderRadius: '4px',
                                        background: `${fg.color}20`,
                                        color: fg.color,
                                        border: `1px solid ${fg.color}40`
                                    }}>
                                        {fg.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}


// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function DiclofenacLab() {
    const [phase, setPhase] = useState<0 | 1 | 2 | 3>(0);
    const [completedPhases, setCompletedPhases] = useState<number[]>([]);

    const handlePhaseComplete = (phaseNum: number) => {
        if (!completedPhases.includes(phaseNum)) {
            setCompletedPhases([...completedPhases, phaseNum]);
        }
        if (phaseNum < 3) {
            setPhase((phaseNum + 1) as any);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            {/* Progress Stepper */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '2rem 2rem 0',
                maxWidth: '800px',
                margin: '0 auto',
                width: '100%'
            }}>
                {['Discovery', 'Optimization', 'Solubility', 'Salt Eng.'].map((step, i) => (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', position: 'relative', zIndex: 1 }}>
                        <motion.div
                            animate={{
                                scale: phase === i ? 1.2 : 1,
                                backgroundColor: i <= phase ? '#8b5cf6' : '#1e293b',
                                borderColor: i <= phase ? '#8b5cf6' : '#475569'
                            }}
                            style={{
                                width: '32px',
                                height: '32px',
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
                            {i < phase ? '✓' : i}
                        </motion.div>
                        <div style={{
                            fontSize: '0.8rem',
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
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 'calc(100% - 100px)',
                    height: '2px',
                    background: '#334155',
                    zIndex: 0,
                    maxWidth: '700px'
                }}>
                    <motion.div
                        animate={{ width: `${(phase / 3) * 100}%` }}
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
                            <Phase3Salt onComplete={() => { }} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Featured Molecules Section (Always Visible or at bottom) */}
            <div style={{ padding: '0 2rem 2rem' }}>
                <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '2rem 0' }} />

                <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ color: 'white', marginBottom: '1rem' }}>Structure-Function Analysis</h3>
                    {/* Show interactive viewer for current molecule based on phase */}
                    <InteractiveStructureViewer
                        molecule={phase === 0 ? MOLECULES[0] : phase === 1 ? MOLECULES[1] : phase === 2 ? MOLECULES[1] : MOLECULES.find(m => m.name.includes('Sodium')) || MOLECULES[2]}
                    />
                </div>

                <FeaturedMolecules3D />
            </div>
        </div>
    );
}
