'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

// Dynamic import for MoleculeViewer
const MoleculeViewer = dynamic(() => import('../MoleculeViewer'), {
    ssr: false,
    loading: () => (
        <div style={{
            height: '280px',
            background: 'linear-gradient(135deg, #1e293b, #0f172a)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#64748b'
        }}>
            <div className="animate-pulse">Loading 3D viewer...</div>
        </div>
    )
});

// PubChem 2D Image URL Generator
const getPubChem2DImage = (cid: number, size: number = 280) =>
    `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/PNG?image_size=${size}x${size}`;

// Element Color Legend
const ELEMENT_COLORS = [
    { element: 'Carbon', color: '#666666' },
    { element: 'Oxygen', color: '#ef4444' },
    { element: 'Nitrogen', color: '#3b82f6' },
    { element: 'Hydrogen', color: '#e5e7eb' },
    { element: 'Chlorine', color: '#22c55e' },
    { element: 'Sulfur', color: '#eab308' }
];

interface MoleculeData {
    name: string;
    stage: string;
    pubchemCid: number;
    pdbId?: string;
    description: string;
    color: string;
    emoji: string;
    formula: string;
    functionalGroups: string[];
}

const DICLOFENAC_MOLECULES: MoleculeData[] = [
    {
        name: '2-Anilinophenylacetic Acid',
        stage: 'Lead Compound',
        pubchemCid: 12560,
        emoji: '🔬',
        formula: 'C₁₄H₁₃NO₂',
        description: 'Initial hit from screening. Low potency, poor selectivity.',
        color: '#3b82f6',
        functionalGroups: ['Carboxylic Acid', 'Secondary Amine', 'Phenyl Ring']
    },
    {
        name: 'Diclofenac Acid',
        stage: 'Optimized Lead',
        pubchemCid: 3033,
        pdbId: '1PGE',
        emoji: '🧪',
        formula: 'C₁₄H₁₁Cl₂NO₂',
        description: 'Addition of 2,6-dichloro groups creates 80° twist for COX-2 selectivity.',
        color: '#8b5cf6',
        functionalGroups: ['Carboxylic Acid', '2,6-Dichloro', 'Secondary Amine', 'Diphenyl Scaffold']
    },
    {
        name: 'Diclofenac Sodium',
        stage: 'Voltaren® (Sustained)',
        pubchemCid: 5018304,
        pdbId: '1PGE',
        emoji: '💊',
        formula: 'C₁₄H₁₀Cl₂NNaO₂',
        description: 'High lattice energy salt. Slow dissolution for chronic conditions.',
        color: '#6366f1',
        functionalGroups: ['Carboxylate Ion', 'Na⁺ Counter-ion', '2,6-Dichloro']
    },
    {
        name: 'Diclofenac Potassium',
        stage: 'Cataflam® (Rapid)',
        pubchemCid: 3243,
        pdbId: '1PGE',
        emoji: '⚡',
        formula: 'C₁₄H₁₀Cl₂KNO₂',
        description: 'Low lattice energy salt. Fast dissolution for acute pain relief.',
        color: '#10b981',
        functionalGroups: ['Carboxylate Ion', 'K⁺ Counter-ion', '2,6-Dichloro']
    }
];

// INLINE Molecule Card Component (like R-Limonene style - NO MODAL)
function MoleculeCard({ molecule, isExpanded, onToggle }: {
    molecule: MoleculeData;
    isExpanded: boolean;
    onToggle: () => void;
}) {
    const [viewMode, setViewMode] = useState<'3d' | '2d'>('3d');
    const [viewStyle, setViewStyle] = useState<'stick' | 'sphere' | 'line'>('stick');
    const [isRotating, setIsRotating] = useState(true);

    return (
        <motion.div
            layout
            style={{
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.95))',
                borderRadius: '16px',
                border: isExpanded ? `2px solid ${molecule.color}` : '1px solid rgba(255,255,255,0.1)',
                overflow: 'hidden'
            }}
        >
            {/* Card Header - Always Visible */}
            <div
                onClick={onToggle}
                style={{
                    padding: '1rem',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    borderBottom: isExpanded ? '1px solid rgba(255,255,255,0.1)' : 'none'
                }}
            >
                <div>
                    <div style={{
                        display: 'inline-block',
                        padding: '0.25rem 0.6rem',
                        background: `${molecule.color}25`,
                        borderRadius: '12px',
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        color: molecule.color,
                        marginBottom: '0.5rem'
                    }}>
                        {molecule.stage}
                    </div>
                    <h3 style={{
                        color: '#e2e8f0',
                        fontSize: '1rem',
                        fontWeight: 700,
                        margin: 0,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem'
                    }}>
                        {molecule.emoji} {molecule.name}
                    </h3>
                    <div style={{ color: '#64748b', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                        {molecule.formula}
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                        style={{
                            padding: '0.4rem 0.8rem',
                            background: isExpanded ? molecule.color : 'rgba(255,255,255,0.1)',
                            border: 'none',
                            borderRadius: '6px',
                            color: 'white',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            cursor: 'pointer'
                        }}
                    >
                        {isExpanded ? '3D Interactive' : 'View'}
                    </button>
                    {isExpanded && (
                        <button
                            onClick={(e) => { e.stopPropagation(); onToggle(); }}
                            style={{
                                padding: '0.4rem 0.8rem',
                                background: 'rgba(255,255,255,0.1)',
                                border: 'none',
                                borderRadius: '6px',
                                color: 'white',
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                cursor: 'pointer'
                            }}
                        >
                            ✕ Close
                        </button>
                    )}
                </div>
            </div>

            {/* Expanded Content - INLINE (not modal) */}
            {isExpanded && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                >
                    <p style={{ color: '#94a3b8', fontSize: '0.85rem', padding: '0 1rem', margin: '0.5rem 0' }}>
                        {molecule.description}
                    </p>

                    {/* Viewer Area */}
                    <div style={{
                        height: '300px',
                        background: viewMode === '2d' ? 'white' : '#0f172a',
                        margin: '0 1rem',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {viewMode === '2d' ? (
                            <img
                                src={getPubChem2DImage(molecule.pubchemCid, 260)}
                                alt={molecule.name}
                                style={{ maxWidth: '90%', maxHeight: '90%' }}
                            />
                        ) : (
                            <MoleculeViewer
                                moleculeName={molecule.name}
                                cid={molecule.pubchemCid}
                                autoRotate={isRotating}
                            />
                        )}
                    </div>

                    {/* Element Color Legend */}
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: '0.6rem',
                        padding: '0.75rem 1rem'
                    }}>
                        {ELEMENT_COLORS.map(el => (
                            <div key={el.element} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                <div style={{
                                    width: '12px',
                                    height: '12px',
                                    borderRadius: '50%',
                                    background: el.color,
                                    border: el.element === 'Hydrogen' ? '1px solid #94a3b8' : 'none'
                                }} />
                                <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>{el.element}</span>
                            </div>
                        ))}
                    </div>

                    {/* 3D/2D Toggle */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}>
                        <button
                            onClick={() => setViewMode('3d')}
                            style={{
                                padding: '0.5rem 1rem',
                                background: viewMode === '3d' ? molecule.color : 'rgba(255,255,255,0.1)',
                                border: 'none',
                                borderRadius: '8px',
                                color: 'white',
                                fontWeight: 600,
                                cursor: 'pointer',
                                fontSize: '0.85rem'
                            }}
                        >
                            🧬 3D Model
                        </button>
                        <button
                            onClick={() => setViewMode('2d')}
                            style={{
                                padding: '0.5rem 1rem',
                                background: viewMode === '2d' ? molecule.color : 'rgba(255,255,255,0.1)',
                                border: 'none',
                                borderRadius: '8px',
                                color: 'white',
                                fontWeight: 600,
                                cursor: 'pointer',
                                fontSize: '0.85rem'
                            }}
                        >
                            📐 2D Skeletal
                        </button>
                    </div>

                    {/* Style Controls (only for 3D) */}
                    {viewMode === '3d' && (
                        <div style={{ padding: '0.5rem 1rem 1rem' }}>
                            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                                {(['stick', 'sphere', 'line'] as const).map(style => (
                                    <button
                                        key={style}
                                        onClick={() => setViewStyle(style)}
                                        style={{
                                            padding: '0.4rem 0.75rem',
                                            background: viewStyle === style ? molecule.color : 'rgba(255,255,255,0.1)',
                                            border: 'none',
                                            borderRadius: '6px',
                                            color: 'white',
                                            fontWeight: 600,
                                            cursor: 'pointer',
                                            fontSize: '0.8rem',
                                            textTransform: 'capitalize'
                                        }}
                                    >
                                        {style}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setIsRotating(!isRotating)}
                                    style={{
                                        padding: '0.4rem 0.75rem',
                                        background: 'rgba(255,255,255,0.1)',
                                        border: 'none',
                                        borderRadius: '6px',
                                        color: 'white',
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                        fontSize: '0.8rem'
                                    }}
                                >
                                    {isRotating ? '⏸ Pause' : '▶ Play'}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Functional Groups */}
                    <div style={{ padding: '0.5rem 1rem 1rem' }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                            {molecule.functionalGroups.map(fg => (
                                <span
                                    key={fg}
                                    style={{
                                        padding: '0.3rem 0.6rem',
                                        background: 'rgba(255,255,255,0.08)',
                                        borderRadius: '6px',
                                        fontSize: '0.75rem',
                                        color: '#cbd5e1'
                                    }}
                                >
                                    {fg}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
}

export default function DiclofenacFeaturedMolecules() {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    return (
        <div style={{ padding: '1.5rem' }}>
            {/* Header */}
            <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                <h2 style={{ color: '#e2e8f0', fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                    Featured Molecules: Diclofenac Pipeline
                </h2>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                    Click any card to explore the structure in 3D
                </p>
            </div>

            {/* Molecule Cards - INLINE expansion (like R-Limonene) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {DICLOFENAC_MOLECULES.map((mol, idx) => (
                    <MoleculeCard
                        key={mol.name}
                        molecule={mol}
                        isExpanded={expandedIndex === idx}
                        onToggle={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
                    />
                ))}
            </div>
        </div>
    );
}
