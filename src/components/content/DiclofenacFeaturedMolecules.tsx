'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

// Dynamic import for MoleculeViewer
const MoleculeViewer = dynamic(() => import('../MoleculeViewer'), {
    ssr: false,
    loading: () => (
        <div style={{
            height: '240px',
            background: 'rgba(0, 0, 0, 0.4)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#94a3b8'
        }}>
            Loading 3D viewer...
        </div>
    )
});

// ============================================================================
// TYPES
// ============================================================================

interface MoleculeData {
    name: string;
    formula: string;
    description: string;
    cid: number;
    atoms: AtomInfo[];
    info?: string[];
}

interface AtomInfo {
    name: string;
    color: string;
    count?: number;
}

// ============================================================================
// FEATURED MOLECULES DATA
// ============================================================================

const FEATURED_MOLECULES: MoleculeData[] = [
    {
        name: 'Ibrutinib',
        formula: 'C₂₅H₂₄N₆O₂',
        description: 'Covalent BTK inhibitor with acrylamide warhead (Michael Addition)',
        cid: 6918474,
        atoms: [
            { name: 'Carbon', color: '#6b7280', count: 25 },
            { name: 'Hydrogen', color: '#ffffff', count: 24 },
            { name: 'Nitrogen', color: '#3b82f6', count: 6 },
            { name: 'Oxygen', color: '#ef4444', count: 2 }
        ],
        info: [
            'First-in-class BTK inhibitor',
            'Forms irreversible C-S bond with Cys481',
            'Used for CLL, MCL, and other B-cell cancers',
            'Mechanism: Michael Addition reaction'
        ]
    },
    {
        name: 'Pirtobrutinib',
        formula: 'C₂₃H₂₂F₂N₆O₂',
        description: 'Non-covalent BTK inhibitor - overcomes ibrutinib resistance',
        cid: 135564947,
        atoms: [
            { name: 'Carbon', color: '#6b7280', count: 23 },
            { name: 'Hydrogen', color: '#ffffff', count: 22 },
            { name: 'Fluorine', color: '#22c55e', count: 2 },
            { name: 'Nitrogen', color: '#3b82f6', count: 6 },
            { name: 'Oxygen', color: '#ef4444', count: 2 }
        ],
        info: [
            'Reversible (non-covalent) BTK inhibitor',
            'Works against Cys481S mutant resistance',
            'Higher selectivity than covalent inhibitors',
            'Distributed H-bond network for binding'
        ]
    },
    {
        name: 'Diclofenac',
        formula: 'C₁₄H₁₁Cl₂NO₂',
        description: 'NSAID with COX-2 selectivity via 2,6-dichloro steric twist',
        cid: 3033,
        atoms: [
            { name: 'Carbon', color: '#6b7280', count: 14 },
            { name: 'Hydrogen', color: '#ffffff', count: 11 },
            { name: 'Chlorine', color: '#22c55e', count: 2 },
            { name: 'Nitrogen', color: '#3b82f6', count: 1 },
            { name: 'Oxygen', color: '#ef4444', count: 2 }
        ],
        info: [
            'Potent NSAID (IC50 = 0.05 μM)',
            '80° ring twist enables COX-2 selectivity',
            'Carboxylic acid for target binding',
            'Salt forms: sodium, potassium, epolamine'
        ]
    },
    {
        name: 'Aspirin',
        formula: 'C₉H₈O₄',
        description: 'Classic NSAID - acetylates COX enzyme irreversibly',
        cid: 2244,
        atoms: [
            { name: 'Carbon', color: '#6b7280', count: 9 },
            { name: 'Hydrogen', color: '#ffffff', count: 8 },
            { name: 'Oxygen', color: '#ef4444', count: 4 }
        ],
        info: [
            'Acetylsalicylic acid',
            'Irreversible COX inhibitor via acetylation',
            'Anti-platelet effect at low doses',
            'From willow bark (salicin) - 1897'
        ]
    }
];

// ============================================================================
// ELEGANT MOLECULE CARD COMPONENT
// ============================================================================

function ElegantMoleculeCard({ molecule, isSelected, onSelect }: {
    molecule: MoleculeData;
    isSelected: boolean;
    onSelect: () => void;
}) {
    const [viewMode, setViewMode] = useState<'3d' | '2d'>('3d');
    const [modelStyle, setModelStyle] = useState<'stick' | 'sphere' | 'line'>('stick');
    const [isRotating, setIsRotating] = useState(true);
    const [showInfo, setShowInfo] = useState(false);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
                background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.98), rgba(15, 23, 42, 0.99))',
                borderRadius: '20px',
                border: isSelected ? '2px solid #8b5cf6' : '1px solid rgba(255,255,255,0.1)',
                overflow: 'hidden',
                boxShadow: isSelected ? '0 0 30px rgba(139, 92, 246, 0.3)' : '0 8px 32px rgba(0,0,0,0.3)'
            }}
        >
            {/* Header */}
            <div style={{
                padding: '1rem 1.25rem',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                        width: '36px',
                        height: '36px',
                        background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.1rem'
                    }}>
                        ⚛️
                    </div>
                    <div>
                        <h4 style={{ color: '#e2e8f0', fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>
                            {molecule.name}
                        </h4>
                        <span style={{ color: '#f59e0b', fontSize: '0.85rem', fontWeight: 600 }}>
                            {molecule.formula}
                        </span>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowInfo(!showInfo)}
                        style={{
                            padding: '0.5rem 0.75rem',
                            background: showInfo ? '#8b5cf6' : 'rgba(139, 92, 246, 0.2)',
                            border: '1px solid rgba(139, 92, 246, 0.3)',
                            borderRadius: '8px',
                            color: 'white',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.3rem'
                        }}
                    >
                        ℹ️ Info
                    </motion.button>
                </div>
            </div>

            {/* Description */}
            <div style={{ padding: '0.75rem 1.25rem', background: 'rgba(0,0,0,0.2)' }}>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0, lineHeight: 1.5 }}>
                    {molecule.description}
                </p>
            </div>

            {/* 3D/2D Toggle */}
            <div style={{
                display: 'flex',
                padding: '0.75rem 1.25rem',
                gap: '0.5rem'
            }}>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setViewMode('3d')}
                    style={{
                        flex: 1,
                        padding: '0.6rem 1rem',
                        background: viewMode === '3d'
                            ? 'linear-gradient(135deg, #8b5cf6, #6366f1)'
                            : 'rgba(255,255,255,0.05)',
                        border: viewMode === '3d' ? 'none' : '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '10px',
                        color: 'white',
                        fontWeight: 600,
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.4rem'
                    }}
                >
                    🧬 3D Model
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setViewMode('2d')}
                    style={{
                        flex: 1,
                        padding: '0.6rem 1rem',
                        background: viewMode === '2d'
                            ? 'linear-gradient(135deg, #8b5cf6, #6366f1)'
                            : 'rgba(255,255,255,0.05)',
                        border: viewMode === '2d' ? 'none' : '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '10px',
                        color: 'white',
                        fontWeight: 600,
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.4rem'
                    }}
                >
                    📄 2D Skeletal
                </motion.button>
            </div>

            {/* Molecule Viewer */}
            <div style={{
                margin: '0 1.25rem',
                borderRadius: '12px',
                overflow: 'hidden',
                background: 'rgba(0, 0, 0, 0.6)',
                border: '1px solid rgba(255,255,255,0.05)'
            }}>
                <AnimatePresence mode="wait">
                    {viewMode === '3d' ? (
                        <motion.div
                            key="3d"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{ height: '240px' }}
                        >
                            <MoleculeViewer
                                moleculeName={molecule.name}
                                cid={molecule.cid}
                                height={240}
                                autoRotate={isRotating}
                            />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="2d"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{
                                height: '240px',
                                background: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <img
                                src={`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${molecule.cid}/PNG?image_size=300x300`}
                                alt={`2D structure of ${molecule.name}`}
                                style={{ maxWidth: '90%', maxHeight: '220px' }}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Atoms Legend */}
            <div style={{
                padding: '0.75rem 1.25rem',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '0.75rem'
            }}>
                {molecule.atoms.map(atom => (
                    <div key={atom.name} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        fontSize: '0.8rem',
                        color: '#94a3b8'
                    }}>
                        <div style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            background: atom.color,
                            border: atom.color === '#ffffff' ? '1px solid #64748b' : 'none'
                        }} />
                        <span>{atom.name}</span>
                    </div>
                ))}
            </div>

            {/* View Options (only for 3D) */}
            {viewMode === '3d' && (
                <div style={{
                    padding: '0.5rem 1.25rem',
                    display: 'flex',
                    gap: '0.5rem',
                    flexWrap: 'wrap'
                }}>
                    {(['stick', 'sphere', 'line'] as const).map(style => (
                        <motion.button
                            key={style}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setModelStyle(style)}
                            style={{
                                padding: '0.4rem 0.8rem',
                                background: modelStyle === style
                                    ? '#8b5cf6'
                                    : 'rgba(255,255,255,0.08)',
                                border: modelStyle === style ? 'none' : '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '8px',
                                color: 'white',
                                fontSize: '0.8rem',
                                fontWeight: 500,
                                cursor: 'pointer',
                                textTransform: 'capitalize'
                            }}
                        >
                            {style}
                        </motion.button>
                    ))}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIsRotating(!isRotating)}
                        style={{
                            padding: '0.4rem 0.8rem',
                            background: 'rgba(255,255,255,0.08)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '8px',
                            color: 'white',
                            fontSize: '0.8rem',
                            fontWeight: 500,
                            cursor: 'pointer',
                            marginLeft: 'auto'
                        }}
                    >
                        {isRotating ? '⏸ Pause' : '▶ Rotate'}
                    </motion.button>
                </div>
            )}

            {/* Info Panel */}
            <AnimatePresence>
                {showInfo && molecule.info && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        style={{
                            margin: '0 1.25rem 1rem',
                            background: 'rgba(139, 92, 246, 0.1)',
                            borderRadius: '12px',
                            border: '1px solid rgba(139, 92, 246, 0.2)',
                            overflow: 'hidden'
                        }}
                    >
                        <div style={{ padding: '1rem' }}>
                            <div style={{
                                color: '#a78bfa',
                                fontWeight: 700,
                                marginBottom: '0.5rem',
                                fontSize: '0.9rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}>
                                📋 Key Information
                            </div>
                            <ul style={{
                                margin: 0,
                                paddingLeft: '1.25rem',
                                color: '#e2e8f0',
                                fontSize: '0.85rem',
                                lineHeight: 1.7
                            }}>
                                {molecule.info.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Bottom padding */}
            <div style={{ height: '0.75rem' }} />
        </motion.div>
    );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function DiclofenacFeaturedMolecules() {
    const [selectedMolecule, setSelectedMolecule] = useState<string | null>(null);

    return (
        <div style={{ padding: '1.5rem' }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🧬</div>
                <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: 'var(--neutral-100)',
                    marginBottom: '0.5rem'
                }}>
                    Featured Molecules
                </h3>
                <p style={{ color: 'var(--neutral-400)', fontSize: '0.9rem' }}>
                    Interactive 3D structures of key drug molecules
                </p>
            </div>

            {/* Molecule Cards Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                gap: '1.5rem'
            }}>
                {FEATURED_MOLECULES.map((mol) => (
                    <ElegantMoleculeCard
                        key={mol.name}
                        molecule={mol}
                        isSelected={selectedMolecule === mol.name}
                        onSelect={() => setSelectedMolecule(mol.name)}
                    />
                ))}
            </div>

            {/* Michael Addition Link */}
            <div style={{
                marginTop: '2rem',
                padding: '1rem 1.5rem',
                background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(168, 85, 247, 0.1))',
                borderRadius: '16px',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                textAlign: 'center'
            }}>
                <p style={{ color: '#e2e8f0', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
                    Ibrutinib uses <strong style={{ color: '#f87171' }}>Michael Addition</strong> to form a covalent bond with BTK.
                </p>
                <a
                    href="/reactions#michael-addition"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem 1rem',
                        background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                        borderRadius: '8px',
                        color: 'white',
                        fontWeight: 600,
                        fontSize: '0.85rem',
                        textDecoration: 'none'
                    }}
                >
                    Learn Michael Addition →
                </a>
            </div>
        </div>
    );
}
