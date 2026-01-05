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
            background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#64748b'
        }}>
            <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem', animation: 'pulse 1.5s infinite' }}>⚛️</div>
                <div>Loading 3D Model...</div>
            </div>
        </div>
    )
});

// ============================================================================
// DATA
// ============================================================================

interface MoleculeData {
    name: string;
    formula: string;
    cid: number;
    description: string;
    atoms: { name: string; color: string; symbol: string }[];
    functionalGroups: string[];
    mechanism?: string;
    clinicalUse?: string;
}

const MOLECULES: MoleculeData[] = [
    {
        name: 'Ibrutinib',
        formula: 'C₂₅H₂₄N₆O₂',
        cid: 6918474,
        description: 'First-in-class covalent BTK inhibitor',
        atoms: [
            { name: 'Carbon', color: '#6b7280', symbol: 'C' },
            { name: 'Nitrogen', color: '#3b82f6', symbol: 'N' },
            { name: 'Oxygen', color: '#ef4444', symbol: 'O' },
            { name: 'Hydrogen', color: '#e2e8f0', symbol: 'H' }
        ],
        functionalGroups: ['Acrylamide (Michael Acceptor)', 'Pyrazolopyrimidine', 'Phenyl ether'],
        mechanism: 'Forms irreversible C-S bond with Cys481 via Michael Addition',
        clinicalUse: 'CLL, MCL, Waldenström\'s'
    },
    {
        name: 'Pirtobrutinib',
        formula: 'C₂₃H₂₂F₂N₆O₂',
        cid: 135564947,
        description: 'Non-covalent BTK inhibitor (overcomes resistance)',
        atoms: [
            { name: 'Carbon', color: '#6b7280', symbol: 'C' },
            { name: 'Fluorine', color: '#22c55e', symbol: 'F' },
            { name: 'Nitrogen', color: '#3b82f6', symbol: 'N' },
            { name: 'Oxygen', color: '#ef4444', symbol: 'O' }
        ],
        functionalGroups: ['Pyridine', 'Carbazole', 'Difluorophenyl'],
        mechanism: 'Reversible binding via distributed H-bond network',
        clinicalUse: 'Resistant CLL/MCL'
    },
    {
        name: 'Diclofenac',
        formula: 'C₁₄H₁₁Cl₂NO₂',
        cid: 3033,
        description: 'Potent NSAID with COX-2 selectivity',
        atoms: [
            { name: 'Carbon', color: '#6b7280', symbol: 'C' },
            { name: 'Chlorine', color: '#22c55e', symbol: 'Cl' },
            { name: 'Nitrogen', color: '#3b82f6', symbol: 'N' },
            { name: 'Oxygen', color: '#ef4444', symbol: 'O' }
        ],
        functionalGroups: ['Carboxylic Acid', '2,6-Dichlorophenyl', 'Secondary Amine'],
        mechanism: '80° ring twist enables selective COX-2 binding',
        clinicalUse: 'Pain, inflammation, arthritis'
    },
    {
        name: 'Aspirin',
        formula: 'C₉H₈O₄',
        cid: 2244,
        description: 'Classic NSAID - irreversible COX inhibitor',
        atoms: [
            { name: 'Carbon', color: '#6b7280', symbol: 'C' },
            { name: 'Oxygen', color: '#ef4444', symbol: 'O' },
            { name: 'Hydrogen', color: '#e2e8f0', symbol: 'H' }
        ],
        functionalGroups: ['Carboxylic Acid', 'Ester (Acetyl)', 'Benzene Ring'],
        mechanism: 'Acetylates COX enzyme Ser530 irreversibly',
        clinicalUse: 'Pain, fever, cardiovascular protection'
    }
];

// ============================================================================
// MOLECULE CARD - SIMPLE & ELEGANT
// ============================================================================

function MoleculeCard({ molecule }: { molecule: MoleculeData }) {
    const [viewMode, setViewMode] = useState<'3d' | '2d'>('3d');
    const [isRotating, setIsRotating] = useState(true);
    const [showInfo, setShowInfo] = useState(false);

    return (
        <div style={{
            background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.98), rgba(30, 41, 59, 0.95))',
            borderRadius: '20px',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            overflow: 'hidden',
            position: 'relative'
        }}>
            {/* Header - Name + Formula + Info Button */}
            <div style={{
                padding: '1rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid rgba(255,255,255,0.05)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>⚛️</span>
                    <div>
                        <h4 style={{
                            color: '#f1f5f9',
                            fontSize: '1.15rem',
                            fontWeight: 700,
                            margin: 0,
                            letterSpacing: '-0.02em'
                        }}>
                            {molecule.name}
                            <span style={{
                                color: '#f59e0b',
                                fontSize: '0.85rem',
                                fontWeight: 600,
                                marginLeft: '0.5rem'
                            }}>
                                {molecule.formula}
                            </span>
                        </h4>
                    </div>
                </div>

                {/* Info Button with Tooltip */}
                <div
                    style={{ position: 'relative' }}
                    onMouseEnter={() => setShowInfo(true)}
                    onMouseLeave={() => setShowInfo(false)}
                >
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: showInfo ? '#8b5cf6' : 'rgba(139, 92, 246, 0.2)',
                            border: '1px solid rgba(139, 92, 246, 0.4)',
                            color: 'white',
                            fontSize: '0.9rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        ℹ
                    </motion.button>

                    {/* Info Tooltip */}
                    <AnimatePresence>
                        {showInfo && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                style={{
                                    position: 'absolute',
                                    top: '100%',
                                    right: 0,
                                    marginTop: '0.5rem',
                                    width: '280px',
                                    background: 'linear-gradient(145deg, rgba(30, 41, 59, 0.98), rgba(15, 23, 42, 0.99))',
                                    borderRadius: '12px',
                                    border: '1px solid rgba(139, 92, 246, 0.3)',
                                    padding: '1rem',
                                    zIndex: 100,
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
                                }}
                            >
                                <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
                                    {molecule.description}
                                </div>

                                <div style={{ marginBottom: '0.75rem' }}>
                                    <div style={{ color: '#a78bfa', fontSize: '0.7rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                                        FUNCTIONAL GROUPS
                                    </div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                                        {molecule.functionalGroups.map(fg => (
                                            <span key={fg} style={{
                                                padding: '0.2rem 0.5rem',
                                                background: 'rgba(139, 92, 246, 0.15)',
                                                borderRadius: '6px',
                                                fontSize: '0.7rem',
                                                color: '#c4b5fd'
                                            }}>
                                                {fg}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {molecule.mechanism && (
                                    <div style={{ marginBottom: '0.5rem' }}>
                                        <div style={{ color: '#22c55e', fontSize: '0.7rem', fontWeight: 600 }}>
                                            ⚙️ {molecule.mechanism}
                                        </div>
                                    </div>
                                )}

                                {molecule.clinicalUse && (
                                    <div style={{ color: '#60a5fa', fontSize: '0.75rem' }}>
                                        💊 {molecule.clinicalUse}
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* 3D/2D Viewer - Always Visible */}
            <div style={{
                background: 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(10,10,20,0.8) 100%)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <AnimatePresence mode="wait">
                    {viewMode === '3d' ? (
                        <motion.div
                            key="3d-view"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <MoleculeViewer
                                moleculeName={molecule.name}
                                cid={molecule.cid}
                                height={280}
                                autoRotate={isRotating}
                                startExpanded={true}
                            />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="2d-view"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{
                                height: '280px',
                                background: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <img
                                src={`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${molecule.cid}/PNG?image_size=280x280`}
                                alt={`2D structure of ${molecule.name}`}
                                style={{ maxWidth: '95%', maxHeight: '260px' }}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Atoms Legend */}
            <div style={{
                padding: '0.75rem 1.25rem',
                display: 'flex',
                justifyContent: 'center',
                gap: '1rem',
                flexWrap: 'wrap',
                background: 'rgba(0,0,0,0.3)',
                borderTop: '1px solid rgba(255,255,255,0.05)'
            }}>
                {molecule.atoms.map(atom => (
                    <div key={atom.symbol} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem'
                    }}>
                        <div style={{
                            width: '14px',
                            height: '14px',
                            borderRadius: '50%',
                            background: atom.color,
                            border: atom.color === '#e2e8f0' ? '1px solid #64748b' : 'none',
                            boxShadow: `0 0 8px ${atom.color}40`
                        }} />
                        <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{atom.name}</span>
                    </div>
                ))}
            </div>

            {/* Controls */}
            <div style={{
                padding: '0.75rem 1.25rem',
                display: 'flex',
                gap: '0.5rem',
                justifyContent: 'center',
                flexWrap: 'wrap'
            }}>
                {/* 3D/2D Toggle */}
                <div style={{
                    display: 'flex',
                    background: 'rgba(0,0,0,0.4)',
                    borderRadius: '10px',
                    padding: '0.25rem',
                    border: '1px solid rgba(255,255,255,0.1)'
                }}>
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setViewMode('3d')}
                        style={{
                            padding: '0.5rem 1rem',
                            background: viewMode === '3d' ? 'linear-gradient(135deg, #8b5cf6, #6366f1)' : 'transparent',
                            border: 'none',
                            borderRadius: '8px',
                            color: 'white',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.3rem'
                        }}
                    >
                        🧬 3D
                    </motion.button>
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setViewMode('2d')}
                        style={{
                            padding: '0.5rem 1rem',
                            background: viewMode === '2d' ? 'linear-gradient(135deg, #8b5cf6, #6366f1)' : 'transparent',
                            border: 'none',
                            borderRadius: '8px',
                            color: 'white',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.3rem'
                        }}
                    >
                        📐 2D
                    </motion.button>
                </div>

                {/* Rotate Button (only for 3D) */}
                {viewMode === '3d' && (
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsRotating(!isRotating)}
                        style={{
                            padding: '0.5rem 1rem',
                            background: isRotating
                                ? 'linear-gradient(135deg, #22c55e, #16a34a)'
                                : 'rgba(255,255,255,0.1)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '10px',
                            color: 'white',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem'
                        }}
                    >
                        {isRotating ? '🔄 Rotating' : '⏸️ Paused'}
                    </motion.button>
                )}
            </div>
        </div>
    );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function DiclofenacFeaturedMolecules() {
    return (
        <div style={{ padding: '1rem' }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{
                    fontSize: '1.4rem',
                    fontWeight: 700,
                    color: '#f1f5f9',
                    marginBottom: '0.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                }}>
                    <span>🧬</span> Featured Molecules
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.85rem', margin: 0 }}>
                    Interactive 3D structures • Hover info button for details
                </p>
            </div>

            {/* Molecule Cards Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '1.25rem'
            }}>
                {MOLECULES.map(mol => (
                    <MoleculeCard key={mol.name} molecule={mol} />
                ))}
            </div>

            {/* Michael Addition Link */}
            <motion.a
                href="/reactions#michael-addition"
                whileHover={{ scale: 1.02 }}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    marginTop: '1.5rem',
                    padding: '0.75rem 1.5rem',
                    background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(168, 85, 247, 0.15))',
                    borderRadius: '12px',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    color: '#f1f5f9',
                    textDecoration: 'none',
                    fontSize: '0.9rem'
                }}
            >
                <span>⚗️</span>
                Ibrutinib uses <strong style={{ color: '#f87171', margin: '0 0.25rem' }}>Michael Addition</strong>
                to form covalent bonds
                <span style={{ marginLeft: '0.5rem' }}>→</span>
            </motion.a>
        </div>
    );
}
