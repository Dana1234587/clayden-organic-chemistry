'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ============================================================================
// MOLECULAR INTERACTOR: Force Field Simulator
// Understanding Intermolecular Forces in Drug-Receptor Binding
// ============================================================================

interface BondType {
    name: string;
    strength: string;
    color: string;
    lineStyle: 'solid' | 'dashed';
    description: string;
    clinical: string;
}

const BOND_TYPES: Record<string, BondType> = {
    covalent: {
        name: 'Covalent Bond',
        strength: '40-110 kcal/mol',
        color: '#ef4444',
        lineStyle: 'solid',
        description: 'Permanent sharing of electrons between atoms',
        clinical: 'Irreversible inhibitors (e.g., Ibrutinib). Long duration but risk of toxicity if off-target.'
    },
    ionic: {
        name: 'Ionic (Electrostatic)',
        strength: '5-10 kcal/mol',
        color: '#3b82f6',
        lineStyle: 'solid',
        description: 'Attraction between opposite charges (COO⁻ & NH₃⁺)',
        clinical: 'Initial "long-range" recognition between drug and receptor (e.g., Diclofenac & COX Arg120).'
    },
    hydrogen: {
        name: 'Hydrogen Bond',
        strength: '2-5 kcal/mol',
        color: '#f59e0b',
        lineStyle: 'dashed',
        description: 'H attached to electronegative atom interacting with another',
        clinical: 'The "Directional Key" for specificity. Small changes can cause 100x difference in potency.'
    },
    vdw: {
        name: 'Van der Waals',
        strength: '0.5-1 kcal/mol',
        color: '#64748b',
        lineStyle: 'dashed',
        description: 'Weak attractions between non-polar surfaces',
        clinical: 'Surface fit and hydrophobic packing. Key for LogP and lipophilicity (Lipinski Rule 5).'
    }
};

// Receptor pocket residues
const POCKET_RESIDUES = [
    { id: 'arg120', label: 'Arg120', charge: '+', x: 80, y: 60, color: '#3b82f6' },
    { id: 'tyr355', label: 'Tyr355', charge: 'H', x: 220, y: 50, color: '#f59e0b' },
    { id: 'val349', label: 'Val349', charge: 'vdW', x: 280, y: 120, color: '#64748b' },
    { id: 'leu352', label: 'Leu352', charge: 'vdW', x: 250, y: 180, color: '#64748b' },
    { id: 'ser530', label: 'Ser530', charge: 'H', x: 100, y: 180, color: '#f59e0b' }
];

// Drug functional groups
const DRUG_GROUPS = [
    { id: 'cooh', label: 'COO⁻', type: 'negative', x: 0, y: 0 },
    { id: 'nh', label: 'N-H', type: 'h-donor', x: 40, y: 10 },
    { id: 'ring1', label: '⬡', type: 'hydrophobic', x: 20, y: -20 },
    { id: 'ring2', label: '⬡', type: 'hydrophobic', x: 60, y: -10 }
];

export default function MolecularForceSimulator() {
    const [activeTab, setActiveTab] = useState<'learn' | 'simulate'>('learn');
    const [drugPosition, setDrugPosition] = useState({ x: 400, y: 120 });
    const [isDragging, setIsDragging] = useState(false);
    const [detectedBonds, setDetectedBonds] = useState<string[]>([]);
    const [bindingEnergy, setBindingEnergy] = useState(0);

    // Calculate bonds based on drug position
    const calculateBonds = (pos: { x: number; y: number }) => {
        const bonds: string[] = [];
        let energy = 0;

        // Check proximity to each residue
        POCKET_RESIDUES.forEach(residue => {
            const distance = Math.sqrt(
                Math.pow(pos.x - residue.x - 80, 2) +
                Math.pow(pos.y - residue.y, 2)
            );

            if (distance < 80) {
                if (residue.charge === '+') {
                    bonds.push(`ionic-${residue.id}`);
                    energy -= 7; // kcal/mol
                } else if (residue.charge === 'H') {
                    bonds.push(`hbond-${residue.id}`);
                    energy -= 3;
                } else if (residue.charge === 'vdW') {
                    bonds.push(`vdw-${residue.id}`);
                    energy -= 0.8;
                }
            }
        });

        setDetectedBonds(bonds);
        setBindingEnergy(energy);
    };

    return (
        <div style={{ padding: '1.5rem' }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{
                    display: 'inline-block',
                    padding: '0.5rem 1rem',
                    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: '#60a5fa',
                    marginBottom: '1rem',
                    border: '1px solid rgba(59, 130, 246, 0.3)'
                }}>
                    MOLECULAR MECHANICS
                </div>
                <h2 style={{
                    color: '#e2e8f0',
                    fontSize: '1.75rem',
                    fontWeight: 800,
                    marginBottom: '0.5rem'
                }}>
                    The Molecular Interactor: Force Field Simulator
                </h2>
                <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
                    Understanding intermolecular forces in drug-receptor binding
                </p>
            </div>

            {/* Tab Navigation */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '0.75rem',
                marginBottom: '2rem'
            }}>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setActiveTab('learn')}
                    style={{
                        padding: '0.75rem 1.5rem',
                        background: activeTab === 'learn' ? 'linear-gradient(135deg, #8b5cf6, #6366f1)' : 'rgba(255,255,255,0.1)',
                        border: 'none',
                        borderRadius: '12px',
                        color: 'white',
                        fontWeight: 600,
                        cursor: 'pointer'
                    }}
                >
                    📚 Learn Bond Types
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setActiveTab('simulate')}
                    style={{
                        padding: '0.75rem 1.5rem',
                        background: activeTab === 'simulate' ? 'linear-gradient(135deg, #8b5cf6, #6366f1)' : 'rgba(255,255,255,0.1)',
                        border: 'none',
                        borderRadius: '12px',
                        color: 'white',
                        fontWeight: 600,
                        cursor: 'pointer'
                    }}
                >
                    🎮 Interactive Simulator
                </motion.button>
            </div>

            <AnimatePresence mode="wait">
                {/* LEARN TAB */}
                {activeTab === 'learn' && (
                    <motion.div
                        key="learn"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        {/* Bond Types Table */}
                        <div style={{
                            background: 'rgba(0,0,0,0.4)',
                            borderRadius: '16px',
                            overflow: 'hidden',
                            marginBottom: '2rem'
                        }}>
                            <div style={{
                                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                                padding: '1rem',
                                textAlign: 'center'
                            }}>
                                <h4 style={{ color: 'white', margin: 0 }}>
                                    Intermolecular Forces in Drug-Receptor Interaction
                                </h4>
                            </div>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ background: 'rgba(255,255,255,0.05)' }}>
                                        <th style={{ padding: '1rem', color: '#94a3b8', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Bond Type</th>
                                        <th style={{ padding: '1rem', color: '#94a3b8', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Strength</th>
                                        <th style={{ padding: '1rem', color: '#94a3b8', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Visual</th>
                                        <th style={{ padding: '1rem', color: '#94a3b8', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Clinical Significance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.values(BOND_TYPES).map((bond, i) => (
                                        <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                            <td style={{ padding: '1rem', color: bond.color, fontWeight: 600 }}>
                                                {bond.name}
                                            </td>
                                            <td style={{ padding: '1rem', color: '#e2e8f0', textAlign: 'center' }}>
                                                {bond.strength}
                                            </td>
                                            <td style={{ padding: '1rem' }}>
                                                <svg width="60" height="20">
                                                    <line
                                                        x1="5" y1="10" x2="55" y2="10"
                                                        stroke={bond.color}
                                                        strokeWidth="3"
                                                        strokeDasharray={bond.lineStyle === 'dashed' ? '5,3' : 'none'}
                                                    />
                                                </svg>
                                            </td>
                                            <td style={{ padding: '1rem', color: '#94a3b8', fontSize: '0.85rem' }}>
                                                {bond.clinical}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
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
                                The Balance Principle in Drug Design
                            </div>
                            <div style={{ color: '#94a3b8', lineHeight: 1.6 }}>
                                <strong>Covalent bonds</strong> = powerful but potentially toxic (off-target).
                                <br />
                                <strong>Weak bonds (H-bond, VdW)</strong> = "intelligent" selectivity - the drug "finds" its receptor.
                                <br />
                                The best drugs achieve <strong>high affinity through multiple weak interactions</strong>, not one strong one.
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* SIMULATE TAB */}
                {activeTab === 'simulate' && (
                    <motion.div
                        key="simulate"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '1.5rem' }}>
                            {/* Simulation Canvas */}
                            <div style={{
                                background: 'rgba(15, 23, 42, 0.9)',
                                borderRadius: '16px',
                                border: '1px solid rgba(255,255,255,0.1)',
                                padding: '1rem',
                                position: 'relative',
                                height: '400px',
                                overflow: 'hidden'
                            }}>
                                <div style={{
                                    position: 'absolute',
                                    top: '0.5rem',
                                    left: '0.5rem',
                                    background: 'rgba(0,0,0,0.5)',
                                    padding: '0.5rem 1rem',
                                    borderRadius: '8px',
                                    zIndex: 10
                                }}>
                                    <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>
                                        Drag the drug molecule into the receptor pocket
                                    </span>
                                </div>

                                {/* SVG Background (static) */}
                                <svg
                                    viewBox="0 0 500 300"
                                    style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
                                >
                                    {/* Receptor Pocket */}
                                    <ellipse
                                        cx="180" cy="150" rx="150" ry="100"
                                        fill="rgba(139, 92, 246, 0.1)"
                                        stroke="#8b5cf6"
                                        strokeWidth="2"
                                        strokeDasharray="5"
                                    />
                                    <text x="180" y="40" fill="#8b5cf6" fontSize="12" textAnchor="middle" fontWeight="600">
                                        Receptor Binding Pocket
                                    </text>

                                    {/* Pocket Residues */}
                                    {POCKET_RESIDUES.map(res => (
                                        <g key={res.id}>
                                            <circle cx={res.x} cy={res.y + 30} r="20" fill={res.color} opacity="0.3" />
                                            <circle cx={res.x} cy={res.y + 30} r="15" fill={res.color} />
                                            <text x={res.x} y={res.y + 34} fill="white" fontSize="8" textAnchor="middle" fontWeight="600">
                                                {res.label}
                                            </text>
                                            <text x={res.x} y={res.y + 55} fill={res.color} fontSize="9" textAnchor="middle">
                                                {res.charge === '+' ? '(+)' : res.charge === 'H' ? '(H-bond)' : '(VdW)'}
                                            </text>
                                        </g>
                                    ))}

                                    {/* Detected Bonds - Lines */}
                                    {detectedBonds.map((bond, i) => {
                                        const resId = bond.split('-')[1];
                                        const residue = POCKET_RESIDUES.find(r => r.id === resId);
                                        if (!residue) return null;

                                        const bondType = bond.includes('ionic') ? BOND_TYPES.ionic
                                            : bond.includes('hbond') ? BOND_TYPES.hydrogen
                                                : BOND_TYPES.vdw;

                                        // Calculate line endpoint based on drugPosition (scaled to SVG coords)
                                        const drugSvgX = (drugPosition.x / 100) * 60 + 50;
                                        const drugSvgY = (drugPosition.y / 100) * 75 + 50;

                                        return (
                                            <motion.line
                                                key={i}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                x1={drugSvgX}
                                                y1={drugSvgY}
                                                x2={residue.x}
                                                y2={residue.y + 30}
                                                stroke={bondType.color}
                                                strokeWidth="3"
                                                strokeDasharray={bondType.lineStyle === 'dashed' ? '8,4' : 'none'}
                                            />
                                        );
                                    })}
                                </svg>

                                {/* Draggable Drug (HTML div) */}
                                <motion.div
                                    drag
                                    dragConstraints={{
                                        left: 20,
                                        right: 500,
                                        top: 20,
                                        bottom: 320
                                    }}
                                    dragElastic={0.1}
                                    dragMomentum={false}
                                    onDrag={(e, info) => {
                                        const newPos = { x: info.point.x, y: info.point.y };
                                        setDrugPosition(newPos);
                                        calculateBonds(newPos);
                                    }}
                                    style={{
                                        position: 'absolute',
                                        right: '80px',
                                        top: '150px',
                                        width: '100px',
                                        height: '50px',
                                        background: detectedBonds.length > 2
                                            ? 'linear-gradient(135deg, #22c55e, #16a34a)'
                                            : 'linear-gradient(135deg, #a855f7, #7c3aed)',
                                        borderRadius: '12px',
                                        border: '2px solid white',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'grab',
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                                        zIndex: 20
                                    }}
                                    whileDrag={{ cursor: 'grabbing', scale: 1.05 }}
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <div style={{
                                            width: '16px',
                                            height: '16px',
                                            borderRadius: '50%',
                                            background: '#3b82f6',
                                            fontSize: '10px',
                                            color: 'white',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>−</div>
                                        <span style={{ color: 'white', fontWeight: 700, fontSize: '12px' }}>Drug</span>
                                    </div>
                                    <div style={{ display: 'flex', gap: '4px', marginTop: '4px' }}>
                                        <div style={{
                                            width: '20px',
                                            height: '20px',
                                            border: '2px solid #64748b',
                                            borderRadius: '50%'
                                        }} />
                                        <div style={{
                                            width: '20px',
                                            height: '20px',
                                            border: '2px solid #64748b',
                                            borderRadius: '50%'
                                        }} />
                                    </div>
                                </motion.div>
                            </div>

                            {/* Controls Panel */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {/* Energy Meter */}
                                <div style={{
                                    background: 'rgba(0,0,0,0.4)',
                                    borderRadius: '16px',
                                    padding: '1.25rem'
                                }}>
                                    <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.5rem', fontWeight: 600 }}>
                                        ⚡ Binding Energy (ΔG)
                                    </div>
                                    <div style={{
                                        fontSize: '2rem',
                                        fontWeight: 800,
                                        color: bindingEnergy < -5 ? '#22c55e' : bindingEnergy < -2 ? '#f59e0b' : '#ef4444'
                                    }}>
                                        {bindingEnergy.toFixed(1)} kcal/mol
                                    </div>
                                    <div style={{
                                        marginTop: '0.75rem',
                                        height: '8px',
                                        background: '#1e293b',
                                        borderRadius: '4px',
                                        overflow: 'hidden'
                                    }}>
                                        <motion.div
                                            animate={{ width: `${Math.min(Math.abs(bindingEnergy) * 5, 100)}%` }}
                                            style={{
                                                height: '100%',
                                                background: bindingEnergy < -5 ? '#22c55e' : bindingEnergy < -2 ? '#f59e0b' : '#ef4444'
                                            }}
                                        />
                                    </div>
                                    <div style={{ color: '#64748b', fontSize: '0.75rem', marginTop: '0.5rem' }}>
                                        {bindingEnergy < -5 ? '✓ High Affinity' : bindingEnergy < -2 ? '⚠ Moderate' : '✗ Low Affinity'}
                                    </div>
                                </div>

                                {/* Detected Bonds */}
                                <div style={{
                                    background: 'rgba(0,0,0,0.4)',
                                    borderRadius: '16px',
                                    padding: '1.25rem'
                                }}>
                                    <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.75rem', fontWeight: 600 }}>
                                        🔗 Detected Interactions
                                    </div>
                                    {detectedBonds.length > 0 ? (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                            {detectedBonds.map((bond, i) => {
                                                const bondType = bond.includes('ionic') ? 'Ionic'
                                                    : bond.includes('hbond') ? 'H-Bond'
                                                        : 'Van der Waals';
                                                const color = bond.includes('ionic') ? '#3b82f6'
                                                    : bond.includes('hbond') ? '#f59e0b'
                                                        : '#64748b';
                                                const resId = bond.split('-')[1];
                                                const residue = POCKET_RESIDUES.find(r => r.id === resId);

                                                return (
                                                    <div key={i} style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.5rem',
                                                        padding: '0.4rem 0.6rem',
                                                        background: `${color}20`,
                                                        borderRadius: '6px',
                                                        border: `1px solid ${color}40`
                                                    }}>
                                                        <div style={{
                                                            width: '8px',
                                                            height: '8px',
                                                            borderRadius: '50%',
                                                            background: color
                                                        }} />
                                                        <span style={{ color: '#e2e8f0', fontSize: '0.8rem' }}>
                                                            {bondType} → {residue?.label}
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        <div style={{ color: '#64748b', fontSize: '0.85rem' }}>
                                            Drag drug closer to residues...
                                        </div>
                                    )}
                                </div>

                                {/* Legend */}
                                <div style={{
                                    background: 'rgba(0,0,0,0.4)',
                                    borderRadius: '16px',
                                    padding: '1rem'
                                }}>
                                    <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginBottom: '0.5rem', fontWeight: 600 }}>
                                        Legend
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                        {Object.values(BOND_TYPES).slice(1).map(bond => (
                                            <div key={bond.name} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <svg width="24" height="10">
                                                    <line
                                                        x1="2" y1="5" x2="22" y2="5"
                                                        stroke={bond.color}
                                                        strokeWidth="2"
                                                        strokeDasharray={bond.lineStyle === 'dashed' ? '4,2' : 'none'}
                                                    />
                                                </svg>
                                                <span style={{ color: '#94a3b8', fontSize: '0.7rem' }}>{bond.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
