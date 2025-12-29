'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DrugReaction {
    id: string;
    name: string;
    description: string;
    importance: string;
    application: string;
    steps: {
        title: string;
        description: string;
        svg: React.ReactNode;
    }[];
}

const DRUG_REACTIONS: DrugReaction[] = [
    {
        id: 'amide-coupling',
        name: 'Amide Bond Formation',
        description: 'The most important reaction in drug discovery - forms the backbone of peptide drugs and many small molecules.',
        importance: 'Used in >25% of all pharmaceutical syntheses',
        application: 'Peptide drugs, HIV protease inhibitors, antibiotics',
        steps: [
            {
                title: 'Activation of Carboxylic Acid',
                description: 'The carboxylic acid is activated using a coupling reagent (e.g., EDC, HATU) to make the carbonyl more electrophilic.',
                svg: (
                    <g>
                        <text x="50" y="60" fill="#60a5fa" fontSize="14">R-COOH</text>
                        <text x="130" y="60" fill="#fbbf24" fontSize="14">+ Activator</text>
                        <motion.path d="M 200 55 L 250 55" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrow)" />
                        <text x="260" y="60" fill="#22c55e" fontSize="14">R-CO-X</text>
                        <text x="260" y="80" fill="#94a3b8" fontSize="10">(activated)</text>
                    </g>
                )
            },
            {
                title: 'Nucleophilic Attack by Amine',
                description: 'The amine nitrogen (nucleophile) attacks the activated carbonyl carbon (electrophile).',
                svg: (
                    <g>
                        <text x="50" y="60" fill="#22c55e" fontSize="14">R-CO-X</text>
                        <text x="140" y="60" fill="#8b5cf6" fontSize="14">+ R\'-NH₂</text>
                        <motion.path d="M 140 70 Q 160 50 180 55" stroke="#fbbf24" strokeWidth="2" strokeDasharray="4,2"
                            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, repeat: Infinity }} />
                        <text x="130" y="100" fill="#94a3b8" fontSize="10">Nu attacks C=O</text>
                    </g>
                )
            },
            {
                title: 'Amide Product Formation',
                description: 'The leaving group departs, forming the amide bond (-CO-NH-). This is the peptide bond!',
                svg: (
                    <g>
                        <text x="80" y="50" fill="#22c55e" fontSize="16" fontWeight="bold">R-CO-NH-R\'</text>
                        <text x="110" y="75" fill="#fbbf24" fontSize="12">Amide Bond</text>
                        <text x="80" y="100" fill="#94a3b8" fontSize="11">+ HX (leaving group)</text>
                        <motion.rect x="75" y="35" width="170" height="30" rx="8" fill="none" stroke="#22c55e" strokeWidth="2"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} />
                    </g>
                )
            }
        ]
    },
    {
        id: 'suzuki-coupling',
        name: 'Suzuki Cross-Coupling',
        description: 'Nobel Prize-winning reaction (2010) for forming C-C bonds between aryl/vinyl groups.',
        importance: 'Used to build complex drug scaffolds efficiently',
        application: 'Kinase inhibitors, anticancer drugs (e.g., Crizotinib)',
        steps: [
            {
                title: 'Oxidative Addition',
                description: 'Pd(0) inserts into the C-X bond of the aryl halide.',
                svg: (
                    <g>
                        <text x="40" y="55" fill="#ef4444" fontSize="14">Ar-Br</text>
                        <text x="110" y="55" fill="#94a3b8" fontSize="12">+</text>
                        <text x="130" y="55" fill="#fbbf24" fontSize="14">Pd(0)</text>
                        <motion.path d="M 180 50 L 220 50" stroke="#22c55e" strokeWidth="2" />
                        <text x="230" y="55" fill="#22c55e" fontSize="14">Ar-Pd-Br</text>
                    </g>
                )
            },
            {
                title: 'Transmetalation',
                description: 'The boronic acid transfers its aryl group to palladium.',
                svg: (
                    <g>
                        <text x="30" y="55" fill="#22c55e" fontSize="13">Ar-Pd-Br</text>
                        <text x="120" y="55" fill="#94a3b8" fontSize="12">+</text>
                        <text x="140" y="55" fill="#8b5cf6" fontSize="13">Ar\'-B(OH)₂</text>
                        <motion.path d="M 240 50 L 280 50" stroke="#fbbf24" strokeWidth="2" />
                        <text x="290" y="55" fill="#fbbf24" fontSize="13">Ar-Pd-Ar\'</text>
                    </g>
                )
            },
            {
                title: 'Reductive Elimination',
                description: 'Pd releases to form the biaryl product and regenerates Pd(0).',
                svg: (
                    <g>
                        <text x="50" y="50" fill="#22c55e" fontSize="16" fontWeight="bold">Ar-Ar\'</text>
                        <text x="50" y="75" fill="#94a3b8" fontSize="11">Biaryl Product</text>
                        <text x="150" y="60" fill="#fbbf24" fontSize="12">+ Pd(0)</text>
                        <text x="150" y="80" fill="#94a3b8" fontSize="10">(catalyst recycled)</text>
                    </g>
                )
            }
        ]
    },
    {
        id: 'aldol-condensation',
        name: 'Aldol Condensation',
        description: 'Creates C-C bonds with stereochemistry control - essential for building complex drug molecules.',
        importance: 'Key for introducing chirality and complexity',
        application: 'Statin synthesis (cholesterol-lowering drugs), natural product synthesis',
        steps: [
            {
                title: 'Enolate Formation',
                description: 'Base removes α-hydrogen to form nucleophilic enolate.',
                svg: (
                    <g>
                        <text x="40" y="55" fill="#60a5fa" fontSize="14">R-CH₂-CO-R\'</text>
                        <text x="170" y="55" fill="#fbbf24" fontSize="12">+ Base</text>
                        <motion.path d="M 230 50 L 270 50" stroke="#8b5cf6" strokeWidth="2" />
                        <text x="280" y="55" fill="#8b5cf6" fontSize="14">Enolate⁻</text>
                    </g>
                )
            },
            {
                title: 'Nucleophilic Addition',
                description: 'Enolate attacks aldehyde carbonyl (electrophile).',
                svg: (
                    <g>
                        <text x="50" y="55" fill="#8b5cf6" fontSize="13">Enolate⁻</text>
                        <text x="130" y="55" fill="#94a3b8" fontSize="12">+</text>
                        <text x="150" y="55" fill="#ef4444" fontSize="13">R-CHO</text>
                        <motion.path d="M 120 60 Q 135 45 155 50" stroke="#fbbf24" strokeWidth="2" strokeDasharray="4,2"
                            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, repeat: Infinity }} />
                    </g>
                )
            },
            {
                title: 'β-Hydroxy Ketone Product',
                description: 'New C-C bond formed with alcohol group - dehydration gives α,β-unsaturated product.',
                svg: (
                    <g>
                        <text x="60" y="50" fill="#22c55e" fontSize="14" fontWeight="bold">β-Hydroxy Ketone</text>
                        <text x="80" y="75" fill="#94a3b8" fontSize="11">New C-C + OH</text>
                        <motion.rect x="55" y="35" width="150" height="25" rx="6" fill="none" stroke="#22c55e" strokeWidth="2"
                            initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }} />
                    </g>
                )
            }
        ]
    }
];

export default function DrugDiscoveryReactions() {
    const [selectedReaction, setSelectedReaction] = useState(DRUG_REACTIONS[0]);
    const [currentStep, setCurrentStep] = useState(0);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
                background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.98))',
                borderRadius: '20px',
                padding: '24px',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                marginBottom: '24px'
            }}
        >
            {/* Header */}
            <div style={{ marginBottom: '20px' }}>
                <h3 style={{ margin: '0 0 8px', color: '#f4f4f7', fontSize: '1.3rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span>💊</span> Drug Discovery Reactions
                </h3>
                <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.9rem' }}>
                    Key reactions used in pharmaceutical research at Victoria University & Ferrier Research Institute
                </p>
            </div>

            {/* Reaction Selector */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
                {DRUG_REACTIONS.map(r => (
                    <button
                        key={r.id}
                        onClick={() => { setSelectedReaction(r); setCurrentStep(0); }}
                        style={{
                            padding: '10px 16px',
                            borderRadius: '12px',
                            border: selectedReaction.id === r.id ? '2px solid #8b5cf6' : '1px solid rgba(255,255,255,0.1)',
                            background: selectedReaction.id === r.id ? 'rgba(139,92,246,0.2)' : 'rgba(255,255,255,0.05)',
                            color: selectedReaction.id === r.id ? '#c4b5fd' : '#94a3b8',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            fontWeight: 500
                        }}
                    >
                        {r.name}
                    </button>
                ))}
            </div>

            {/* Reaction Info */}
            <div style={{
                background: 'rgba(139, 92, 246, 0.1)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                borderRadius: '14px',
                padding: '16px',
                marginBottom: '20px'
            }}>
                <h4 style={{ margin: '0 0 8px', color: '#c4b5fd', fontSize: '1.1rem' }}>{selectedReaction.name}</h4>
                <p style={{ margin: '0 0 12px', color: '#e2e8f0', fontSize: '0.9rem' }}>{selectedReaction.description}</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div style={{ background: 'rgba(34,197,94,0.1)', borderRadius: '10px', padding: '10px' }}>
                        <div style={{ color: '#86efac', fontSize: '0.75rem', marginBottom: '4px' }}>📊 Importance</div>
                        <div style={{ color: '#e2e8f0', fontSize: '0.85rem' }}>{selectedReaction.importance}</div>
                    </div>
                    <div style={{ background: 'rgba(59,130,246,0.1)', borderRadius: '10px', padding: '10px' }}>
                        <div style={{ color: '#93c5fd', fontSize: '0.75rem', marginBottom: '4px' }}>🎯 Applications</div>
                        <div style={{ color: '#e2e8f0', fontSize: '0.85rem' }}>{selectedReaction.application}</div>
                    </div>
                </div>
            </div>

            {/* Step Progress */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                {selectedReaction.steps.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentStep(i)}
                        style={{
                            flex: 1,
                            padding: '8px',
                            borderRadius: '8px',
                            border: 'none',
                            background: i === currentStep ? '#8b5cf6' : i < currentStep ? '#22c55e' : 'rgba(255,255,255,0.1)',
                            color: 'white',
                            fontWeight: 600,
                            cursor: 'pointer',
                            fontSize: '0.8rem'
                        }}
                    >
                        Step {i + 1}
                    </button>
                ))}
            </div>

            {/* Current Step */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    style={{
                        background: 'rgba(0,0,0,0.3)',
                        borderRadius: '16px',
                        padding: '20px'
                    }}
                >
                    <h5 style={{ margin: '0 0 8px', color: '#fbbf24', fontSize: '1rem' }}>
                        {selectedReaction.steps[currentStep].title}
                    </h5>
                    <p style={{ margin: '0 0 16px', color: '#cbd5e1', fontSize: '0.9rem' }}>
                        {selectedReaction.steps[currentStep].description}
                    </p>

                    {/* SVG Visualization */}
                    <div style={{
                        background: 'rgba(255,255,255,0.03)',
                        borderRadius: '12px',
                        padding: '16px',
                        display: 'flex',
                        justifyContent: 'center',
                        minHeight: '100px'
                    }}>
                        <svg width="100%" height="120" viewBox="0 0 350 120">
                            <defs>
                                <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                                    <path d="M0,0 L0,6 L9,3 z" fill="#22c55e" />
                                </marker>
                            </defs>
                            {selectedReaction.steps[currentStep].svg}
                        </svg>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '16px' }}>
                <button
                    onClick={() => setCurrentStep(s => Math.max(0, s - 1))}
                    disabled={currentStep === 0}
                    style={{
                        padding: '10px 20px',
                        borderRadius: '10px',
                        border: 'none',
                        background: currentStep === 0 ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.1)',
                        color: currentStep === 0 ? '#64748b' : '#e2e8f0',
                        cursor: currentStep === 0 ? 'not-allowed' : 'pointer',
                        fontWeight: 600
                    }}
                >
                    ← Previous
                </button>
                <button
                    onClick={() => setCurrentStep(s => Math.min(selectedReaction.steps.length - 1, s + 1))}
                    disabled={currentStep === selectedReaction.steps.length - 1}
                    style={{
                        padding: '10px 24px',
                        borderRadius: '10px',
                        border: 'none',
                        background: currentStep === selectedReaction.steps.length - 1 ? 'rgba(255,255,255,0.05)' : 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
                        color: currentStep === selectedReaction.steps.length - 1 ? '#64748b' : 'white',
                        cursor: currentStep === selectedReaction.steps.length - 1 ? 'not-allowed' : 'pointer',
                        fontWeight: 600
                    }}
                >
                    Next →
                </button>
            </div>
        </motion.div>
    );
}
