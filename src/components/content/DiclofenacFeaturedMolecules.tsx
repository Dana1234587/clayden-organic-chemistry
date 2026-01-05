'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

// Dynamic import for MoleculeViewer
const MoleculeViewer = dynamic(() => import('../MoleculeViewer'), {
    ssr: false,
    loading: () => (
        <div style={{
            height: '300px',
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
const getPubChem2DImage = (cid: number, size: number = 300) =>
    `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/PNG?image_size=${size}x${size}`;

// Element Color Legend
const ELEMENT_COLORS = [
    { element: 'Carbon', color: '#909090', symbol: 'C' },
    { element: 'Oxygen', color: '#FF0D0D', symbol: 'O' },
    { element: 'Nitrogen', color: '#3050F8', symbol: 'N' },
    { element: 'Hydrogen', color: '#FFFFFF', symbol: 'H' },
    { element: 'Sulfur', color: '#FFFF30', symbol: 'S' },
    { element: 'Chlorine', color: '#1FF01F', symbol: 'Cl' }
];

interface MoleculeData {
    name: string;
    formula: string;
    description: string;
    cid: number;
    icon: string;
    tags: string[];
    sarNote?: string;
}

// Diclofenac development pipeline molecules
const DICLOFENAC_MOLECULES: MoleculeData[] = [
    {
        name: '2-Anilinophenylacetic Acid',
        formula: 'C₁₄H₁₃NO₂',
        description: '(Lead) Initial screening hit with basic NSAID activity - low potency, poor selectivity',
        cid: 854057,
        icon: '🔬',
        tags: ['Carboxylic Acid', 'Secondary Amine', 'Diphenyl'],
        sarNote: 'IC50 > 10 μM (weak) | Non-selective (inhibits COX-1 & COX-2)'
    },
    {
        name: 'Diclofenac Acid',
        formula: 'C₁₄H₁₁Cl₂NO₂',
        description: '(Optimized) 2,6-dichloro addition creates 80° ring twist for COX-2 selective binding',
        cid: 3033,
        icon: '💊',
        tags: ['Carboxylic Acid', '2,6-Dichloro', 'Steric Twist'],
        sarNote: 'IC50 = 0.05 μM | 10x more potent | COX-2 selective (ΔG = -8.2 kcal/mol)'
    }
];

// Professional Molecule Card Component (R-Limonene Style)
function MoleculeCard({ molecule }: { molecule: MoleculeData }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [viewMode, setViewMode] = useState<'3d' | '2d'>('3d');
    const [modelStyle, setModelStyle] = useState<'stick' | 'sphere' | 'line'>('stick');
    const [isRotating, setIsRotating] = useState(true);

    return (
        <>
            {/* Collapsed Card */}
            <motion.div
                layout
                whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
                style={{
                    background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.98))',
                    borderRadius: '20px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    overflow: 'hidden',
                    cursor: isExpanded ? 'default' : 'pointer'
                }}
            >
                {/* Card Header with Icon */}
                <div style={{ padding: '1.5rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{molecule.icon}</div>

                    <h4 style={{
                        color: '#e2e8f0',
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        marginBottom: '0.25rem'
                    }}>
                        {molecule.name}
                    </h4>

                    <div style={{
                        color: '#f59e0b',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        marginBottom: '0.75rem'
                    }}>
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

                    {/* Functional Group Tags */}
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.4rem',
                        justifyContent: 'center',
                        marginBottom: '1rem'
                    }}>
                        {molecule.tags.map(tag => (
                            <span
                                key={tag}
                                style={{
                                    padding: '0.3rem 0.6rem',
                                    background: 'rgba(139, 92, 246, 0.2)',
                                    borderRadius: '12px',
                                    fontSize: '0.7rem',
                                    color: '#a78bfa',
                                    border: '1px solid rgba(139, 92, 246, 0.3)'
                                }}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* SAR Note */}
                    {molecule.sarNote && (
                        <div style={{
                            padding: '0.5rem 0.75rem',
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '8px',
                            fontSize: '0.75rem',
                            color: '#94a3b8',
                            marginBottom: '1rem'
                        }}>
                            SAR: {molecule.sarNote}
                        </div>
                    )}

                    {/* View 3D Model Button */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsExpanded(!isExpanded)}
                        style={{
                            padding: '0.75rem 1.5rem',
                            background: isExpanded ? '#ef4444' : 'linear-gradient(135deg, #f59e0b, #d97706)',
                            border: 'none',
                            borderRadius: '12px',
                            color: 'white',
                            fontWeight: 600,
                            fontSize: '0.9rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            width: '100%'
                        }}
                    >
                        {isExpanded ? '✕ Close' : '🧬 View 3D Model'}
                    </motion.button>
                </div>
            </motion.div>

            {/* Expanded View - Full Width */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{
                            gridColumn: '1 / -1',
                            background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.98), rgba(15, 23, 42, 0.98))',
                            borderRadius: '20px',
                            border: '1px solid rgba(139, 92, 246, 0.3)',
                            overflow: 'hidden',
                            marginTop: '1rem'
                        }}
                    >
                        {/* Header Bar */}
                        <div style={{
                            padding: '1rem 1.5rem',
                            background: 'rgba(0,0,0,0.3)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            gap: '1rem'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <span style={{ fontSize: '1.5rem' }}>{molecule.icon}</span>
                                <div>
                                    <div style={{ color: '#e2e8f0', fontWeight: 700 }}>{molecule.name}</div>
                                    <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{molecule.description}</div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button
                                    onClick={() => setViewMode('3d')}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        background: viewMode === '3d' ? '#8b5cf6' : 'rgba(255,255,255,0.1)',
                                        border: 'none',
                                        borderRadius: '8px',
                                        color: 'white',
                                        fontWeight: 600,
                                        cursor: 'pointer'
                                    }}
                                >
                                    3D Interactive
                                </button>
                                <button
                                    onClick={() => setViewMode('2d')}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        background: viewMode === '2d' ? '#8b5cf6' : 'rgba(255,255,255,0.1)',
                                        border: 'none',
                                        borderRadius: '8px',
                                        color: 'white',
                                        fontWeight: 600,
                                        cursor: 'pointer'
                                    }}
                                >
                                    ◢ 2D Skeletal
                                </button>
                                <button
                                    onClick={() => setIsExpanded(false)}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        background: '#ef4444',
                                        border: 'none',
                                        borderRadius: '8px',
                                        color: 'white',
                                        fontWeight: 600,
                                        cursor: 'pointer'
                                    }}
                                >
                                    ✕ Close
                                </button>
                            </div>
                        </div>

                        {/* Viewer Area */}
                        <div style={{ display: 'flex', gap: '1rem', padding: '1.5rem' }}>
                            {/* 3D/2D Viewer */}
                            <div style={{
                                flex: 1,
                                minHeight: '350px',
                                background: viewMode === '2d' ? 'white' : 'rgba(0,0,0,0.3)',
                                borderRadius: '12px',
                                overflow: 'hidden',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                {viewMode === '3d' ? (
                                    <div style={{ width: '100%', height: '350px' }}>
                                        <MoleculeViewer
                                            moleculeName={molecule.name}
                                            cid={molecule.cid}
                                            autoRotate={isRotating}
                                            height={350}
                                        />
                                    </div>
                                ) : (
                                    <img
                                        src={getPubChem2DImage(molecule.cid, 350)}
                                        alt={molecule.name}
                                        style={{ maxWidth: '100%', maxHeight: '350px' }}
                                    />
                                )}
                            </div>

                            {/* Controls Panel (only for 3D) */}
                            {viewMode === '3d' && (
                                <div style={{
                                    width: '200px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '1rem'
                                }}>
                                    {/* Element Colors */}
                                    <div style={{
                                        background: 'rgba(0,0,0,0.3)',
                                        borderRadius: '12px',
                                        padding: '1rem'
                                    }}>
                                        <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginBottom: '0.75rem', fontWeight: 600 }}>
                                            Element Colors
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                            {ELEMENT_COLORS.map(el => (
                                                <div key={el.element} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                    <div style={{
                                                        width: '14px',
                                                        height: '14px',
                                                        borderRadius: '50%',
                                                        background: el.color,
                                                        border: el.element === 'Hydrogen' ? '1px solid #64748b' : 'none'
                                                    }} />
                                                    <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>{el.symbol} {el.element}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Style Controls */}
                                    <div style={{
                                        background: 'rgba(0,0,0,0.3)',
                                        borderRadius: '12px',
                                        padding: '1rem'
                                    }}>
                                        <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginBottom: '0.75rem', fontWeight: 600 }}>
                                            View Style
                                        </div>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                                            {['Stick', 'Sphere', 'Line'].map(style => (
                                                <button
                                                    key={style}
                                                    onClick={() => setModelStyle(style.toLowerCase() as any)}
                                                    style={{
                                                        padding: '0.4rem 0.75rem',
                                                        background: modelStyle === style.toLowerCase() ? '#8b5cf6' : 'rgba(255,255,255,0.1)',
                                                        border: 'none',
                                                        borderRadius: '6px',
                                                        color: 'white',
                                                        fontSize: '0.75rem',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    {style}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Rotation Control */}
                                    <button
                                        onClick={() => setIsRotating(!isRotating)}
                                        style={{
                                            padding: '0.75rem',
                                            background: isRotating ? 'rgba(139, 92, 246, 0.3)' : 'rgba(255,255,255,0.1)',
                                            border: '1px solid rgba(139, 92, 246, 0.5)',
                                            borderRadius: '12px',
                                            color: 'white',
                                            fontSize: '0.85rem',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '0.5rem'
                                        }}
                                    >
                                        {isRotating ? '⏸ Pause' : '▶ Play'} Rotation
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
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
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.5rem'
            }}>
                {DICLOFENAC_MOLECULES.map((mol, idx) => (
                    <MoleculeCard key={mol.name} molecule={mol} />
                ))}
            </div>
        </div>
    );
}
