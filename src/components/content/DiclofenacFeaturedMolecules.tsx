'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

// Dynamic import for MoleculeViewer
const MoleculeViewer = dynamic(() => import('../MoleculeViewer'), {
    ssr: false,
    loading: () => (
        <div style={{
            height: '250px',
            background: 'linear-gradient(135deg, #1e293b, #0f172a)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#64748b'
        }}>
            Loading 3D viewer...
        </div>
    )
});

// PubChem 2D Image URL Generator
const getPubChem2DImage = (cid: number, size: number = 250) =>
    `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/PNG?image_size=${size}x${size}`;

interface MoleculeData {
    name: string;
    stage: string;
    pubchemCid: number;
    pdbId?: string;
    description: string;
    color: string;
    functionalGroups: string[];
}

const DICLOFENAC_MOLECULES: MoleculeData[] = [
    {
        name: '2-Anilinophenylacetic Acid',
        stage: 'Lead Compound',
        pubchemCid: 12560,
        description: 'Initial hit from screening. Low potency, poor selectivity.',
        color: '#3b82f6',
        functionalGroups: ['Carboxylic Acid', 'Secondary Amine', 'Phenyl Ring']
    },
    {
        name: 'Diclofenac Acid',
        stage: 'Optimized Lead',
        pubchemCid: 3033,
        pdbId: '1PGE',
        description: 'Addition of 2,6-dichloro groups creates 80° twist for COX-2 selectivity.',
        color: '#8b5cf6',
        functionalGroups: ['Carboxylic Acid', '2,6-Dichloro', 'Secondary Amine', 'Diphenyl Scaffold']
    },
    {
        name: 'Diclofenac Sodium',
        stage: 'Voltaren® (Sustained)',
        pubchemCid: 5018304,
        pdbId: '1PGE',
        description: 'High lattice energy salt. Slow dissolution for chronic conditions.',
        color: '#6366f1',
        functionalGroups: ['Carboxylate Ion', 'Na⁺ Counter-ion', '2,6-Dichloro']
    },
    {
        name: 'Diclofenac Potassium',
        stage: 'Cataflam® (Rapid)',
        pubchemCid: 3243,
        pdbId: '1PGE',
        description: 'Low lattice energy salt. Fast dissolution for acute pain relief.',
        color: '#10b981',
        functionalGroups: ['Carboxylate Ion', 'K⁺ Counter-ion', '2,6-Dichloro']
    }
];

export default function DiclofenacFeaturedMolecules() {
    const [selectedMolecule, setSelectedMolecule] = useState<MoleculeData | null>(null);
    const [viewMode, setViewMode] = useState<'2D' | '3D'>('2D');

    return (
        <div style={{ padding: '1.5rem' }}>
            {/* Header */}
            <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                <h2 style={{ color: '#e2e8f0', fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                    Featured Molecules: Diclofenac Development Pipeline
                </h2>
                <p style={{ color: '#94a3b8', maxWidth: '600px', margin: '0 auto' }}>
                    Explore the structural evolution from lead compound to marketed drug forms
                </p>
            </div>

            {/* View Mode Toggle */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
                <button
                    onClick={() => setViewMode('2D')}
                    style={{
                        padding: '0.5rem 1.5rem',
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
                        padding: '0.5rem 1.5rem',
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
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.5rem'
            }}>
                {DICLOFENAC_MOLECULES.map(mol => (
                    <motion.div
                        key={mol.name}
                        whileHover={{ y: -5 }}
                        onClick={() => setSelectedMolecule(mol)}
                        style={{
                            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.9))',
                            borderRadius: '16px',
                            border: selectedMolecule === mol ? `2px solid ${mol.color}` : '1px solid rgba(255,255,255,0.1)',
                            overflow: 'hidden',
                            cursor: 'pointer',
                            transition: 'border 0.2s'
                        }}
                    >
                        {/* Structure View */}
                        <div style={{
                            height: '200px',
                            background: viewMode === '2D' ? 'white' : '#0f172a',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            {viewMode === '2D' ? (
                                <img
                                    src={getPubChem2DImage(mol.pubchemCid, 180)}
                                    alt={mol.name}
                                    style={{ maxWidth: '90%', maxHeight: '90%' }}
                                />
                            ) : (
                                <MoleculeViewer
                                    moleculeName={mol.name}
                                    cid={mol.pubchemCid}
                                    showControls={false}
                                    autoRotate={true}
                                />
                            )}
                        </div>

                        {/* Card Info */}
                        <div style={{ padding: '1rem' }}>
                            <div style={{
                                display: 'inline-block',
                                padding: '0.25rem 0.75rem',
                                background: `${mol.color}20`,
                                borderRadius: '20px',
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                color: mol.color,
                                marginBottom: '0.5rem'
                            }}>
                                {mol.stage}
                            </div>
                            <h3 style={{ color: '#e2e8f0', fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                                {mol.name}
                            </h3>
                            <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                                {mol.description}
                            </p>

                            {/* Functional Groups Tags */}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                                {mol.functionalGroups.map(fg => (
                                    <span
                                        key={fg}
                                        style={{
                                            padding: '0.2rem 0.5rem',
                                            background: 'rgba(255,255,255,0.05)',
                                            borderRadius: '4px',
                                            fontSize: '0.7rem',
                                            color: '#94a3b8'
                                        }}
                                    >
                                        {fg}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Detail Modal for Selected Molecule */}
            {selectedMolecule && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        background: 'rgba(0,0,0,0.8)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000,
                        padding: '2rem'
                    }}
                    onClick={() => setSelectedMolecule(null)}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        onClick={e => e.stopPropagation()}
                        style={{
                            background: 'linear-gradient(135deg, #1e293b, #0f172a)',
                            borderRadius: '20px',
                            maxWidth: '900px',
                            width: '100%',
                            maxHeight: '90vh',
                            overflow: 'auto',
                            border: `2px solid ${selectedMolecule.color}`
                        }}
                    >
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '500px' }}>
                            {/* Left: 3D Viewer */}
                            <div style={{ background: '#0f172a', position: 'relative' }}>
                                <MoleculeViewer
                                    moleculeName={selectedMolecule.name}
                                    cid={selectedMolecule.pubchemCid}
                                    pdbId={selectedMolecule.pdbId}
                                    showControls={true}
                                    autoRotate={true}
                                />
                                {selectedMolecule.pdbId && (
                                    <div style={{
                                        position: 'absolute',
                                        bottom: '1rem',
                                        left: '1rem',
                                        padding: '0.5rem 1rem',
                                        background: 'rgba(99, 102, 241, 0.8)',
                                        borderRadius: '8px',
                                        fontSize: '0.8rem',
                                        color: 'white',
                                        fontWeight: 600
                                    }}>
                                        PDB: {selectedMolecule.pdbId} (COX-2 Complex)
                                    </div>
                                )}
                            </div>

                            {/* Right: Details */}
                            <div style={{ padding: '2rem' }}>
                                <div style={{
                                    display: 'inline-block',
                                    padding: '0.35rem 1rem',
                                    background: `${selectedMolecule.color}20`,
                                    borderRadius: '20px',
                                    fontSize: '0.85rem',
                                    fontWeight: 600,
                                    color: selectedMolecule.color,
                                    marginBottom: '1rem'
                                }}>
                                    {selectedMolecule.stage}
                                </div>

                                <h2 style={{ color: '#e2e8f0', fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>
                                    {selectedMolecule.name}
                                </h2>

                                <p style={{ color: '#cbd5e1', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                                    {selectedMolecule.description}
                                </p>

                                <div style={{ marginBottom: '1.5rem' }}>
                                    <h4 style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
                                        Key Functional Groups
                                    </h4>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                        {selectedMolecule.functionalGroups.map(fg => (
                                            <span
                                                key={fg}
                                                style={{
                                                    padding: '0.35rem 0.75rem',
                                                    background: `${selectedMolecule.color}15`,
                                                    border: `1px solid ${selectedMolecule.color}40`,
                                                    borderRadius: '6px',
                                                    fontSize: '0.85rem',
                                                    color: '#e2e8f0'
                                                }}
                                            >
                                                {fg}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* 2D Structure */}
                                <div style={{
                                    background: 'white',
                                    borderRadius: '12px',
                                    padding: '1rem',
                                    textAlign: 'center'
                                }}>
                                    <img
                                        src={getPubChem2DImage(selectedMolecule.pubchemCid, 200)}
                                        alt={`${selectedMolecule.name} 2D structure`}
                                        style={{ maxWidth: '100%' }}
                                    />
                                    <div style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '0.5rem' }}>
                                        2D Structure (PubChem CID: {selectedMolecule.pubchemCid})
                                    </div>
                                </div>

                                <button
                                    onClick={() => setSelectedMolecule(null)}
                                    style={{
                                        marginTop: '1.5rem',
                                        width: '100%',
                                        padding: '0.75rem',
                                        background: 'rgba(255,255,255,0.1)',
                                        border: 'none',
                                        borderRadius: '8px',
                                        color: '#e2e8f0',
                                        fontWeight: 600,
                                        cursor: 'pointer'
                                    }}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
}
