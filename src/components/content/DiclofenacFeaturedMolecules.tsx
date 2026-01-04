'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    { element: 'Carbon', color: '#666666', symbol: 'C' },
    { element: 'Oxygen', color: '#ef4444', symbol: 'O' },
    { element: 'Nitrogen', color: '#3b82f6', symbol: 'N' },
    { element: 'Hydrogen', color: '#e5e7eb', symbol: 'H' },
    { element: 'Chlorine', color: '#22c55e', symbol: 'Cl' },
    { element: 'Sulfur', color: '#eab308', symbol: 'S' }
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

// Interactive Molecule Card Component
function MoleculeCard({ molecule }: { molecule: MoleculeData }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [viewMode, setViewMode] = useState<'3d' | '2d'>('3d');
    const [viewStyle, setViewStyle] = useState<'stick' | 'sphere' | 'line'>('stick');
    const [isRotating, setIsRotating] = useState(true);

    return (
        <>
            {/* Card */}
            <motion.div
                whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
                onClick={() => setIsExpanded(true)}
                style={{
                    background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.95))',
                    borderRadius: '16px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                }}
            >
                {/* 2D Structure Preview (always 2D in card) */}
                <div style={{
                    height: '200px',
                    background: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1rem'
                }}>
                    <img
                        src={getPubChem2DImage(molecule.pubchemCid, 180)}
                        alt={molecule.name}
                        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                    />
                </div>

                {/* Card Info */}
                <div style={{ padding: '1.25rem' }}>
                    <div style={{
                        display: 'inline-block',
                        padding: '0.3rem 0.8rem',
                        background: `${molecule.color}25`,
                        borderRadius: '20px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        color: molecule.color,
                        marginBottom: '0.75rem'
                    }}>
                        {molecule.stage}
                    </div>

                    <h3 style={{
                        color: '#e2e8f0',
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        marginBottom: '0.25rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}>
                        {molecule.emoji} {molecule.name}
                    </h3>

                    <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.75rem' }}>
                        {molecule.formula}
                    </div>

                    <p style={{
                        color: '#94a3b8',
                        fontSize: '0.85rem',
                        lineHeight: 1.5,
                        marginBottom: '1rem'
                    }}>
                        {molecule.description}
                    </p>

                    {/* Functional Groups Tags */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                        {molecule.functionalGroups.map(fg => (
                            <span
                                key={fg}
                                style={{
                                    padding: '0.25rem 0.6rem',
                                    background: 'rgba(255,255,255,0.08)',
                                    borderRadius: '6px',
                                    fontSize: '0.7rem',
                                    color: '#cbd5e1'
                                }}
                            >
                                {fg}
                            </span>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Expanded Modal with Interactive Controls */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(0,0,0,0.85)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 1000,
                            padding: '1rem'
                        }}
                        onClick={() => setIsExpanded(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={e => e.stopPropagation()}
                            style={{
                                background: 'linear-gradient(135deg, #1e293b, #0f172a)',
                                borderRadius: '20px',
                                maxWidth: '600px',
                                width: '100%',
                                maxHeight: '90vh',
                                overflow: 'auto',
                                border: `2px solid ${molecule.color}`
                            }}
                        >
                            {/* Header */}
                            <div style={{
                                padding: '1.25rem',
                                borderBottom: '1px solid rgba(255,255,255,0.1)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start'
                            }}>
                                <div>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        marginBottom: '0.25rem'
                                    }}>
                                        <span style={{ fontSize: '1.5rem' }}>{molecule.emoji}</span>
                                        <h2 style={{ color: '#e2e8f0', fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>
                                            {molecule.name}
                                        </h2>
                                        <span style={{ color: '#64748b', fontSize: '0.9rem' }}>{molecule.formula}</span>
                                    </div>
                                    <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0 }}>
                                        {molecule.description}
                                    </p>
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button
                                        onClick={() => setIsExpanded(false)}
                                        style={{
                                            padding: '0.5rem 1rem',
                                            background: 'rgba(255,255,255,0.1)',
                                            border: 'none',
                                            borderRadius: '8px',
                                            color: '#e2e8f0',
                                            cursor: 'pointer',
                                            fontWeight: 600
                                        }}
                                    >
                                        ✕ Close
                                    </button>
                                </div>
                            </div>

                            {/* 3D/2D Toggle */}
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                gap: '0.5rem',
                                padding: '1rem'
                            }}>
                                <button
                                    onClick={() => setViewMode('3d')}
                                    style={{
                                        padding: '0.6rem 1.25rem',
                                        background: viewMode === '3d' ? `linear-gradient(135deg, ${molecule.color}, ${molecule.color}cc)` : 'rgba(255,255,255,0.05)',
                                        border: 'none',
                                        borderRadius: '8px',
                                        color: 'white',
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }}
                                >
                                    🧬 3D Model
                                </button>
                                <button
                                    onClick={() => setViewMode('2d')}
                                    style={{
                                        padding: '0.6rem 1.25rem',
                                        background: viewMode === '2d' ? `linear-gradient(135deg, ${molecule.color}, ${molecule.color}cc)` : 'rgba(255,255,255,0.05)',
                                        border: 'none',
                                        borderRadius: '8px',
                                        color: 'white',
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }}
                                >
                                    📐 2D Skeletal
                                </button>
                            </div>

                            {/* Viewer Area */}
                            <div style={{
                                height: '350px',
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
                                        src={getPubChem2DImage(molecule.pubchemCid, 300)}
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
                                gap: '0.75rem',
                                padding: '1rem',
                                borderBottom: '1px solid rgba(255,255,255,0.1)'
                            }}>
                                {ELEMENT_COLORS.map(el => (
                                    <div key={el.element} style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.35rem'
                                    }}>
                                        <div style={{
                                            width: '14px',
                                            height: '14px',
                                            borderRadius: '50%',
                                            background: el.color,
                                            border: el.element === 'Hydrogen' ? '1px solid #94a3b8' : 'none'
                                        }} />
                                        <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{el.element}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Controls (only for 3D) */}
                            {viewMode === '3d' && (
                                <div style={{ padding: '1rem' }}>
                                    {/* Style Controls */}
                                    <div style={{
                                        display: 'flex',
                                        gap: '0.5rem',
                                        marginBottom: '0.75rem',
                                        flexWrap: 'wrap'
                                    }}>
                                        {(['stick', 'sphere', 'line'] as const).map(style => (
                                            <button
                                                key={style}
                                                onClick={() => setViewStyle(style)}
                                                style={{
                                                    padding: '0.5rem 1rem',
                                                    background: viewStyle === style ? molecule.color : 'rgba(255,255,255,0.1)',
                                                    border: 'none',
                                                    borderRadius: '8px',
                                                    color: 'white',
                                                    fontWeight: 600,
                                                    cursor: 'pointer',
                                                    textTransform: 'capitalize'
                                                }}
                                            >
                                                {style}
                                            </button>
                                        ))}
                                        <button
                                            style={{
                                                padding: '0.5rem 1rem',
                                                background: 'rgba(255,255,255,0.1)',
                                                border: 'none',
                                                borderRadius: '8px',
                                                color: 'white',
                                                fontWeight: 600,
                                                cursor: 'pointer'
                                            }}
                                        >
                                            Colored
                                        </button>
                                    </div>

                                    {/* Pause/Play */}
                                    <button
                                        onClick={() => setIsRotating(!isRotating)}
                                        style={{
                                            padding: '0.5rem 1.25rem',
                                            background: 'rgba(255,255,255,0.1)',
                                            border: 'none',
                                            borderRadius: '8px',
                                            color: 'white',
                                            fontWeight: 600,
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem'
                                        }}
                                    >
                                        {isRotating ? '⏸ Pause' : '▶ Play'}
                                    </button>
                                </div>
                            )}

                            {/* PDB Badge if available */}
                            {molecule.pdbId && (
                                <div style={{
                                    padding: '1rem',
                                    borderTop: '1px solid rgba(255,255,255,0.1)',
                                    textAlign: 'center'
                                }}>
                                    <span style={{
                                        padding: '0.5rem 1rem',
                                        background: 'rgba(99, 102, 241, 0.2)',
                                        border: '1px solid rgba(99, 102, 241, 0.4)',
                                        borderRadius: '8px',
                                        fontSize: '0.85rem',
                                        color: '#a5b4fc'
                                    }}>
                                        🔬 PDB: {molecule.pdbId} (COX-2 Enzyme Complex Available)
                                    </span>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export default function DiclofenacFeaturedMolecules() {
    const [viewMode, setViewMode] = useState<'2D' | '3D'>('2D');

    return (
        <div style={{ padding: '1.5rem' }}>
            {/* Header */}
            <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                <h2 style={{
                    color: '#e2e8f0',
                    fontSize: '1.75rem',
                    fontWeight: 700,
                    marginBottom: '0.5rem'
                }}>
                    Featured Molecules: Diclofenac Development Pipeline
                </h2>
                <p style={{ color: '#94a3b8', maxWidth: '600px', margin: '0 auto' }}>
                    Explore the structural evolution from lead compound to marketed drug forms
                </p>
            </div>

            {/* Global View Mode Toggle */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '0.5rem',
                marginBottom: '2rem'
            }}>
                <button
                    onClick={() => setViewMode('2D')}
                    style={{
                        padding: '0.6rem 1.5rem',
                        background: viewMode === '2D' ? 'linear-gradient(135deg, #8b5cf6, #6366f1)' : 'rgba(255,255,255,0.05)',
                        border: 'none',
                        borderRadius: '8px',
                        color: 'white',
                        fontWeight: 600,
                        cursor: 'pointer'
                    }}
                >
                    2D Structures
                </button>
                <button
                    onClick={() => setViewMode('3D')}
                    style={{
                        padding: '0.6rem 1.5rem',
                        background: viewMode === '3D' ? 'linear-gradient(135deg, #8b5cf6, #6366f1)' : 'rgba(255,255,255,0.05)',
                        border: 'none',
                        borderRadius: '8px',
                        color: 'white',
                        fontWeight: 600,
                        cursor: 'pointer'
                    }}
                >
                    3D Models
                </button>
            </div>

            {/* Molecule Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1.5rem'
            }}>
                {DICLOFENAC_MOLECULES.map(mol => (
                    <MoleculeCard key={mol.name} molecule={mol} />
                ))}
            </div>
        </div>
    );
}
