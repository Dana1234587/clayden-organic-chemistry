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

// PubChem 2D Image URL
const getPubChem2DImage = (cid: number, size: number = 250) =>
    `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/PNG?image_size=${size}x${size}`;

// Element Color Legend
const ELEMENT_COLORS = [
    { element: 'Carbon', color: '#909090', symbol: 'C' },
    { element: 'Oxygen', color: '#FF0D0D', symbol: 'O' },
    { element: 'Nitrogen', color: '#3050F8', symbol: 'N' },
    { element: 'Hydrogen', color: '#FFFFFF', symbol: 'H' },
    { element: 'Chlorine', color: '#1FF01F', symbol: 'Cl' }
];

interface MoleculeData {
    name: string;
    stage: string;
    description: string;
    cid: number;
    color: string;
    formula: string;
}

// Only working molecules (correct CIDs)
const DICLOFENAC_MOLECULES: MoleculeData[] = [
    {
        name: '2-Anilinophenylacetic Acid',
        stage: 'Lead Compound',
        description: 'Initial screening hit with basic NSAID activity. Low potency, poor COX-2 selectivity.',
        cid: 854057, // CORRECT CID
        color: '#3b82f6',
        formula: 'C₁₄H₁₃NO₂'
    },
    {
        name: 'Diclofenac Acid',
        stage: 'Optimized Lead',
        description: '2,6-dichloro addition creates 80° ring twist for COX-2 selective binding.',
        cid: 3033,
        color: '#8b5cf6',
        formula: 'C₁₄H₁₁Cl₂NO₂'
    }
];

// Professional Molecule Card Component
function MoleculeCard({ molecule }: { molecule: MoleculeData }) {
    const [viewMode, setViewMode] = useState<'2d' | '3d'>('2d');
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
                background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.95))',
                borderRadius: '20px',
                border: `1px solid ${molecule.color}30`,
                overflow: 'hidden'
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
                        display: 'inline-block',
                        padding: '0.3rem 0.75rem',
                        background: `${molecule.color}25`,
                        borderRadius: '12px',
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        color: molecule.color,
                        marginBottom: '0.5rem'
                    }}>
                        {molecule.stage}
                    </div>
                    <h4 style={{ color: '#e2e8f0', fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>
                        {molecule.name}
                    </h4>
                    <div style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                        {molecule.formula}
                    </div>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsExpanded(!isExpanded)}
                    style={{
                        padding: '0.5rem 1rem',
                        background: isExpanded ? molecule.color : 'rgba(255,255,255,0.1)',
                        border: 'none',
                        borderRadius: '8px',
                        color: 'white',
                        fontWeight: 600,
                        fontSize: '0.8rem',
                        cursor: 'pointer'
                    }}
                >
                    {isExpanded ? '✕ Close' : '🧬 View 3D'}
                </motion.button>
            </div>

            {/* Description */}
            <div style={{ padding: '1rem 1.25rem', color: '#94a3b8', fontSize: '0.9rem' }}>
                {molecule.description}
            </div>

            {/* Expanded 3D/2D Viewer */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        style={{ overflow: 'hidden' }}
                    >
                        {/* 2D/3D Toggle */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            padding: '0.75rem',
                            background: 'rgba(0,0,0,0.2)'
                        }}>
                            <button
                                onClick={() => setViewMode('2d')}
                                style={{
                                    padding: '0.5rem 1.25rem',
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
                            <button
                                onClick={() => setViewMode('3d')}
                                style={{
                                    padding: '0.5rem 1.25rem',
                                    background: viewMode === '3d' ? molecule.color : 'rgba(255,255,255,0.1)',
                                    border: 'none',
                                    borderRadius: '8px',
                                    color: 'white',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    fontSize: '0.85rem'
                                }}
                            >
                                🧬 3D Interactive
                            </button>
                        </div>

                        {/* Viewer Area */}
                        <div style={{
                            height: viewMode === '3d' ? '320px' : 'auto',
                            background: viewMode === '2d' ? 'white' : 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: viewMode === '2d' ? '1.5rem' : 0
                        }}>
                            {viewMode === '2d' ? (
                                <img
                                    src={getPubChem2DImage(molecule.cid, 280)}
                                    alt={molecule.name}
                                    style={{ maxWidth: '100%', maxHeight: '250px' }}
                                />
                            ) : (
                                <div style={{ width: '100%', height: '100%' }}>
                                    <MoleculeViewer
                                        moleculeName={molecule.name}
                                        cid={molecule.cid}
                                        autoRotate={true}
                                        height={320}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Element Color Legend (only for 3D) */}
                        {viewMode === '3d' && (
                            <div style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                justifyContent: 'center',
                                gap: '0.75rem',
                                padding: '1rem',
                                background: 'rgba(0,0,0,0.3)'
                            }}>
                                {ELEMENT_COLORS.map(el => (
                                    <div key={el.element} style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.4rem'
                                    }}>
                                        <div style={{
                                            width: '14px',
                                            height: '14px',
                                            borderRadius: '50%',
                                            background: el.color,
                                            border: el.element === 'Hydrogen' ? '1px solid #64748b' : 'none'
                                        }} />
                                        <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>
                                            {el.symbol} {el.element}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default function DiclofenacFeaturedMolecules() {
    return (
        <div style={{ padding: '1.5rem' }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>💊</div>
                <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: 'var(--neutral-100)',
                    marginBottom: '0.5rem'
                }}>
                    Diclofenac Development Pipeline
                </h3>
                <p style={{ color: 'var(--neutral-400)', fontSize: '0.9rem' }}>
                    From lead discovery to optimized drug candidate
                </p>
            </div>

            {/* Molecule Cards Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                gap: '1.5rem'
            }}>
                {DICLOFENAC_MOLECULES.map((mol, idx) => (
                    <motion.div
                        key={mol.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.15 }}
                    >
                        <MoleculeCard molecule={mol} />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
