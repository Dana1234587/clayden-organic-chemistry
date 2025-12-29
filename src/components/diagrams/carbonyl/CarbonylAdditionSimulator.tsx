'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CarbonylReaction {
    id: string;
    name: string;
    nucleophile: string;
    product: string;
    productType: string;
    description: string;
    steps: {
        title: string;
        description: string;
        arrowNote: string;
    }[];
}

const CARBONYL_REACTIONS: CarbonylReaction[] = [
    {
        id: 'cyanohydrin',
        name: 'Cyanohydrin Formation',
        nucleophile: 'CN⁻',
        product: 'R-C(OH)(CN)-R\'',
        productType: 'Cyanohydrin',
        description: 'Cyanide attacks carbonyl to form C-C bond. Product has -OH and -CN on same carbon.',
        steps: [
            {
                title: 'Nucleophilic Attack',
                description: 'The cyanide ion (CN⁻) attacks the electrophilic carbonyl carbon. The lone pair on carbon of CN⁻ forms a new σ bond.',
                arrowNote: 'Arrow: CN⁻ → C(δ⁺) of carbonyl'
            },
            {
                title: 'π Bond Breaks',
                description: 'As the CN attacks, the π electrons of C=O move to oxygen, creating an alkoxide (O⁻) intermediate.',
                arrowNote: 'Arrow: C=O π bond → O (gives O⁻)'
            },
            {
                title: 'Protonation',
                description: 'The alkoxide picks up H⁺ from HCN or solvent to give the neutral cyanohydrin product.',
                arrowNote: 'Arrow: Lone pair on O⁻ → H⁺'
            }
        ]
    },
    {
        id: 'nabh4',
        name: 'NaBH₄ Reduction',
        nucleophile: 'H⁻ (from BH₄⁻)',
        product: 'R-CH(OH)-R\'',
        productType: 'Alcohol',
        description: 'Hydride (H⁻) attacks carbonyl. Converts C=O to C-OH. Mild, works in water.',
        steps: [
            {
                title: 'Hydride Delivery',
                description: 'The B-H bond in BH₄⁻ delivers H⁻ to the carbonyl carbon. The metal coordinates to oxygen.',
                arrowNote: 'Arrow: B-H bond → C(δ⁺) of carbonyl'
            },
            {
                title: 'C=O Reduction',
                description: 'As H⁻ attacks, the π electrons move to oxygen, forming an alkoxide intermediate.',
                arrowNote: 'Arrow: C=O π bond → O'
            },
            {
                title: 'Work-up (Protonation)',
                description: 'Water or alcohol protonates the alkoxide to give the final alcohol product.',
                arrowNote: 'Arrow: O⁻ + H₂O → O-H + OH⁻'
            }
        ]
    },
    {
        id: 'grignard',
        name: 'Grignard Addition',
        nucleophile: 'R-MgBr (C⁻)',
        product: 'R-C(OH)(R\')-R\'\'',
        productType: 'Alcohol (2° or 3°)',
        description: 'Nucleophilic carbon attacks carbonyl, forming new C-C bond. Must be anhydrous!',
        steps: [
            {
                title: 'C-C Bond Formation',
                description: 'The nucleophilic carbon (δ⁻) of the Grignard attacks the electrophilic carbonyl carbon. A new C-C σ bond forms.',
                arrowNote: 'Arrow: C⁻ of RMgBr → C(δ⁺) of C=O'
            },
            {
                title: 'Alkoxide Formation',
                description: 'The π electrons of C=O move to oxygen as the carbon becomes sp³. Mg coordinates to O⁻.',
                arrowNote: 'Arrow: C=O π bond → O (gives -OMgBr)'
            },
            {
                title: 'Aqueous Work-up',
                description: 'Adding dilute acid or water protonates the alkoxide (-OMgBr → -OH) to give the alcohol.',
                arrowNote: 'Arrow: H₃O⁺ → O⁻ gives O-H'
            }
        ]
    },
    {
        id: 'hemiacetal',
        name: 'Hemiacetal Formation',
        nucleophile: 'ROH (alcohol)',
        product: 'R-C(OH)(OR\')-R\'\'',
        productType: 'Hemiacetal',
        description: 'Alcohol adds to carbonyl. Acid-catalyzed, reversible. Key step in sugar chemistry.',
        steps: [
            {
                title: 'Carbonyl Activation',
                description: 'Acid (H⁺) protonates the carbonyl oxygen, making the carbon even more electrophilic.',
                arrowNote: 'Arrow: H⁺ → O of C=O (gives C=O⁺H)'
            },
            {
                title: 'Nucleophilic Attack',
                description: 'The alcohol oxygen attacks the highly electrophilic protonated carbonyl carbon.',
                arrowNote: 'Arrow: ROH → C⁺'
            },
            {
                title: 'Proton Transfer',
                description: 'Deprotonation of the oxonium and protonation adjustments give the neutral hemiacetal.',
                arrowNote: 'Arrow: Loss of H⁺ from -OH⁺R group'
            }
        ]
    }
];

export default function CarbonylAdditionSimulator() {
    const [selectedReaction, setSelectedReaction] = useState(CARBONYL_REACTIONS[0]);
    const [currentStep, setCurrentStep] = useState(0);
    const [showMechanism, setShowMechanism] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.98))',
                borderRadius: '24px',
                padding: '28px',
                border: '1px solid rgba(251, 191, 36, 0.3)',
                marginBottom: '24px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
            }}
        >
            {/* Header */}
            <div style={{ marginBottom: '24px', textAlign: 'center' }}>
                <h3 style={{
                    margin: '0 0 8px',
                    color: '#fbbf24',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px'
                }}>
                    <span style={{ fontSize: '2rem' }}>⚗️</span>
                    Carbonyl Nucleophilic Addition Simulator
                </h3>
                <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.95rem' }}>
                    Interactive step-by-step mechanism visualization
                </p>
            </div>

            {/* Reaction Selector */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '12px',
                marginBottom: '24px'
            }}>
                {CARBONYL_REACTIONS.map(r => (
                    <motion.button
                        key={r.id}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => { setSelectedReaction(r); setCurrentStep(0); setShowMechanism(false); }}
                        style={{
                            padding: '14px 16px',
                            borderRadius: '14px',
                            border: selectedReaction.id === r.id
                                ? '2px solid #fbbf24'
                                : '1px solid rgba(255,255,255,0.1)',
                            background: selectedReaction.id === r.id
                                ? 'linear-gradient(135deg, rgba(251,191,36,0.2), rgba(245,158,11,0.1))'
                                : 'rgba(255,255,255,0.03)',
                            color: selectedReaction.id === r.id ? '#fde68a' : '#94a3b8',
                            cursor: 'pointer',
                            textAlign: 'left'
                        }}
                    >
                        <div style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '4px' }}>{r.name}</div>
                        <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Nu: {r.nucleophile}</div>
                    </motion.button>
                ))}
            </div>

            {/* Reaction Overview Card */}
            <motion.div
                key={selectedReaction.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                style={{
                    background: 'rgba(251, 191, 36, 0.08)',
                    border: '1px solid rgba(251, 191, 36, 0.2)',
                    borderRadius: '18px',
                    padding: '20px',
                    marginBottom: '20px'
                }}
            >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                    <div style={{
                        background: 'rgba(59, 130, 246, 0.15)',
                        borderRadius: '12px',
                        padding: '12px',
                        textAlign: 'center'
                    }}>
                        <div style={{ color: '#60a5fa', fontSize: '0.75rem', marginBottom: '4px' }}>🎯 Nucleophile</div>
                        <div style={{ color: '#93c5fd', fontWeight: 700, fontSize: '1.1rem' }}>{selectedReaction.nucleophile}</div>
                    </div>
                    <div style={{
                        background: 'rgba(251, 191, 36, 0.15)',
                        borderRadius: '12px',
                        padding: '12px',
                        textAlign: 'center'
                    }}>
                        <div style={{ color: '#fbbf24', fontSize: '0.75rem', marginBottom: '4px' }}>⚡ Electrophile</div>
                        <div style={{ color: '#fde68a', fontWeight: 700, fontSize: '1.1rem' }}>C=O</div>
                    </div>
                    <div style={{
                        background: 'rgba(34, 197, 94, 0.15)',
                        borderRadius: '12px',
                        padding: '12px',
                        textAlign: 'center'
                    }}>
                        <div style={{ color: '#22c55e', fontSize: '0.75rem', marginBottom: '4px' }}>✓ Product</div>
                        <div style={{ color: '#86efac', fontWeight: 700, fontSize: '0.95rem' }}>{selectedReaction.productType}</div>
                    </div>
                </div>
                <p style={{ color: '#e2e8f0', fontSize: '0.9rem', margin: 0, lineHeight: 1.6 }}>
                    {selectedReaction.description}
                </p>
            </motion.div>

            {/* Mechanism Toggle */}
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowMechanism(!showMechanism)}
                style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '12px',
                    border: 'none',
                    background: showMechanism
                        ? 'linear-gradient(135deg, #22c55e, #16a34a)'
                        : 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '1rem',
                    cursor: 'pointer',
                    marginBottom: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px'
                }}
            >
                {showMechanism ? '📖 Hide Mechanism' : '🔬 Show Step-by-Step Mechanism'}
            </motion.button>

            {/* Mechanism Steps */}
            <AnimatePresence>
                {showMechanism && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        {/* Step Progress */}
                        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                            {selectedReaction.steps.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentStep(i)}
                                    style={{
                                        flex: 1,
                                        padding: '12px',
                                        borderRadius: '10px',
                                        border: 'none',
                                        background: i === currentStep
                                            ? 'linear-gradient(135deg, #fbbf24, #f59e0b)'
                                            : i < currentStep
                                                ? '#22c55e'
                                                : 'rgba(255,255,255,0.1)',
                                        color: 'white',
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                        fontSize: '0.85rem'
                                    }}
                                >
                                    Step {i + 1}
                                </button>
                            ))}
                        </div>

                        {/* Current Step Details */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentStep}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                style={{
                                    background: 'rgba(0,0,0,0.4)',
                                    borderRadius: '16px',
                                    padding: '24px',
                                    border: '1px solid rgba(251,191,36,0.2)'
                                }}
                            >
                                <h4 style={{
                                    margin: '0 0 12px',
                                    color: '#fbbf24',
                                    fontSize: '1.15rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px'
                                }}>
                                    <span style={{
                                        background: '#fbbf24',
                                        color: '#1e293b',
                                        width: '28px',
                                        height: '28px',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: 700,
                                        fontSize: '0.9rem'
                                    }}>
                                        {currentStep + 1}
                                    </span>
                                    {selectedReaction.steps[currentStep].title}
                                </h4>

                                <p style={{ color: '#e2e8f0', fontSize: '0.95rem', lineHeight: 1.7, margin: '0 0 16px' }}>
                                    {selectedReaction.steps[currentStep].description}
                                </p>

                                {/* Arrow Notation Box */}
                                <div style={{
                                    background: 'rgba(139, 92, 246, 0.15)',
                                    border: '1px solid rgba(139, 92, 246, 0.3)',
                                    borderRadius: '10px',
                                    padding: '12px 16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px'
                                }}>
                                    <span style={{ fontSize: '1.3rem' }}>↪️</span>
                                    <span style={{ color: '#c4b5fd', fontSize: '0.9rem' }}>
                                        {selectedReaction.steps[currentStep].arrowNote}
                                    </span>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation */}
                        <div style={{ display: 'flex', gap: '12px', marginTop: '16px', justifyContent: 'center' }}>
                            <button
                                onClick={() => setCurrentStep(s => Math.max(0, s - 1))}
                                disabled={currentStep === 0}
                                style={{
                                    padding: '12px 24px',
                                    borderRadius: '10px',
                                    border: 'none',
                                    background: currentStep === 0 ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.1)',
                                    color: currentStep === 0 ? '#64748b' : '#e2e8f0',
                                    fontWeight: 600,
                                    cursor: currentStep === 0 ? 'not-allowed' : 'pointer'
                                }}
                            >
                                ← Previous
                            </button>
                            <button
                                onClick={() => setCurrentStep(s => Math.min(selectedReaction.steps.length - 1, s + 1))}
                                disabled={currentStep === selectedReaction.steps.length - 1}
                                style={{
                                    padding: '12px 28px',
                                    borderRadius: '10px',
                                    border: 'none',
                                    background: currentStep === selectedReaction.steps.length - 1
                                        ? 'rgba(255,255,255,0.05)'
                                        : 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                                    color: currentStep === selectedReaction.steps.length - 1 ? '#64748b' : '#1e293b',
                                    fontWeight: 700,
                                    cursor: currentStep === selectedReaction.steps.length - 1 ? 'not-allowed' : 'pointer'
                                }}
                            >
                                Next Step →
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
