'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface ClinicalDrug {
    name: string;
    genericName: string;
    emoji: string;
    color: string;
    chromophore: string;
    clinicalEffect: string;
    urineColor: string;
    patientScenario: string;
    molecularBasis: string;
}

const CLINICAL_DRUGS: ClinicalDrug[] = [
    {
        name: 'Rifampicin',
        genericName: 'Rifampin',
        emoji: '🔴',
        color: '#dc2626',
        chromophore: 'Naphthoquinone conjugated system',
        clinicalEffect: 'Stains ALL body fluids red-orange (urine, tears, sweat)',
        urineColor: 'Bright Red-Orange',
        patientScenario: 'TB patient on rifampicin therapy - used as compliance marker',
        molecularBasis: 'Massive conjugated aromatic system absorbs blue-green light, reflecting red-orange'
    },
    {
        name: 'Phenazopyridine',
        genericName: 'Pyridium',
        emoji: '🟠',
        color: '#ea580c',
        chromophore: 'Azo group (N=N) bridging aromatic rings',
        clinicalEffect: 'Turns urine deep "neon" orange',
        urineColor: 'Neon Orange',
        patientScenario: 'UTI symptom relief - harmless but striking color change',
        molecularBasis: 'Extended π-electron pathway through N=N bond creates intense orange absorption'
    },
    {
        name: 'Riboflavin (B2)',
        genericName: 'Vitamin B2',
        emoji: '🟡',
        color: '#eab308',
        chromophore: 'Isoalloxazine ring system',
        clinicalEffect: 'Fluorescent yellow urine - absorbs UV, emits visible light',
        urineColor: 'Fluorescent Neon Yellow',
        patientScenario: 'Multivitamin supplementation - excess B2 excreted',
        molecularBasis: 'Conjugated tricyclic system exhibits fluorescence (absorbs UV → emits yellow)'
    },
    {
        name: 'Amitriptyline',
        genericName: 'Elavil',
        emoji: '🟢',
        color: '#22c55e',
        chromophore: 'Oxidized tricyclic metabolites',
        clinicalEffect: 'Green/blue urine from liver metabolites',
        urineColor: 'Green to Blue-Green',
        patientScenario: 'Antidepressant therapy - metabolite color indicates drug processing',
        molecularBasis: 'Hepatic oxidation extends conjugation, shifting absorption to red → green appearance'
    }
];

export default function ClinicalColorCases() {
    const [expandedDrug, setExpandedDrug] = useState<string | null>(null);

    return (
        <div style={{ padding: '1.5rem 0' }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2 style={{
                    fontSize: '1.8rem',
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #f472b6 0%, #818cf8 50%, #38bdf8 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '0.5rem'
                }}>
                    💊 The Pharmacist's Palette
                </h2>
                <p style={{ color: '#94a3b8', fontSize: '1rem', maxWidth: '600px', margin: '0 auto' }}>
                    How drug molecules create diagnostic color signals in clinical practice
                </p>
            </div>

            {/* Drug Cards Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1.5rem'
            }}>
                {CLINICAL_DRUGS.map((drug, index) => (
                    <motion.div
                        key={drug.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        style={{
                            background: 'rgba(255, 255, 255, 0.03)',
                            borderRadius: '20px',
                            border: `1px solid ${drug.color}30`,
                            overflow: 'hidden',
                            cursor: 'pointer'
                        }}
                        whileHover={{ scale: 1.02, y: -4 }}
                        onClick={() => setExpandedDrug(expandedDrug === drug.name ? null : drug.name)}
                    >
                        {/* Drug Header */}
                        <div style={{
                            padding: '1.25rem',
                            background: `linear-gradient(135deg, ${drug.color}15 0%, transparent 100%)`,
                            borderBottom: `1px solid ${drug.color}20`,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px'
                        }}>
                            <span style={{ fontSize: '2rem' }}>{drug.emoji}</span>
                            <div>
                                <h3 style={{
                                    margin: 0,
                                    fontSize: '1.2rem',
                                    fontWeight: 700,
                                    color: drug.color
                                }}>
                                    {drug.name}
                                </h3>
                                <span style={{
                                    fontSize: '0.75rem',
                                    color: '#94a3b8',
                                    fontStyle: 'italic'
                                }}>
                                    {drug.genericName}
                                </span>
                            </div>
                        </div>

                        {/* Urine Color Badge */}
                        <div style={{
                            padding: '0.75rem 1.25rem',
                            background: 'rgba(0,0,0,0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                        }}>
                            <div style={{
                                width: '24px',
                                height: '24px',
                                borderRadius: '6px',
                                background: drug.color,
                                boxShadow: `0 0 12px ${drug.color}60`
                            }} />
                            <div>
                                <div style={{ fontSize: '0.65rem', color: '#64748b', textTransform: 'uppercase' }}>
                                    Urine Color
                                </div>
                                <div style={{ fontSize: '0.85rem', color: 'white', fontWeight: 600 }}>
                                    {drug.urineColor}
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div style={{ padding: '1.25rem' }}>
                            <p style={{
                                margin: 0,
                                fontSize: '0.9rem',
                                color: '#cbd5e1',
                                lineHeight: 1.6
                            }}>
                                {drug.clinicalEffect}
                            </p>

                            {/* Chromophore Tag */}
                            <div style={{
                                marginTop: '1rem',
                                padding: '0.5rem 0.75rem',
                                background: `${drug.color}10`,
                                borderRadius: '8px',
                                border: `1px solid ${drug.color}25`
                            }}>
                                <div style={{ fontSize: '0.65rem', color: '#64748b', marginBottom: '2px' }}>
                                    🧬 CHROMOPHORE
                                </div>
                                <div style={{ fontSize: '0.8rem', color: drug.color, fontWeight: 500 }}>
                                    {drug.chromophore}
                                </div>
                            </div>
                        </div>

                        {/* Expand for Details */}
                        <AnimatePresence>
                            {expandedDrug === drug.name && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    style={{
                                        borderTop: '1px solid rgba(255,255,255,0.1)',
                                        overflow: 'hidden'
                                    }}
                                >
                                    <div style={{ padding: '1.25rem' }}>
                                        {/* Molecular Basis */}
                                        <div style={{ marginBottom: '1rem' }}>
                                            <div style={{ fontSize: '0.7rem', color: '#64748b', marginBottom: '4px' }}>
                                                ⚛️ Molecular Basis
                                            </div>
                                            <p style={{ margin: 0, fontSize: '0.85rem', color: '#94a3b8' }}>
                                                {drug.molecularBasis}
                                            </p>
                                        </div>

                                        {/* Clinical Scenario */}
                                        <div style={{
                                            padding: '0.75rem',
                                            background: 'rgba(255,255,255,0.05)',
                                            borderRadius: '8px',
                                            borderLeft: `3px solid ${drug.color}`
                                        }}>
                                            <div style={{ fontSize: '0.7rem', color: '#64748b', marginBottom: '4px' }}>
                                                🏥 Clinical Scenario
                                            </div>
                                            <p style={{ margin: 0, fontSize: '0.85rem', color: 'white' }}>
                                                {drug.patientScenario}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Click to expand indicator */}
                        <div style={{
                            padding: '0.5rem',
                            textAlign: 'center',
                            fontSize: '0.7rem',
                            color: '#64748b',
                            borderTop: '1px solid rgba(255,255,255,0.05)'
                        }}>
                            {expandedDrug === drug.name ? '▲ Collapse' : '▼ Click for details'}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Clinical Insight Box */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{
                    marginTop: '2rem',
                    padding: '1.5rem',
                    background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)',
                    borderRadius: '16px',
                    border: '1px solid rgba(139, 92, 246, 0.2)'
                }}
            >
                <h4 style={{ margin: '0 0 0.75rem', color: '#a78bfa', fontSize: '1rem' }}>
                    💡 Clinical Pearl
                </h4>
                <p style={{ margin: 0, color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    <strong>Patient Education is Key:</strong> Always warn patients about expected color changes
                    BEFORE starting therapy. Rifampicin patients may panic when they see red tears;
                    phenazopyridine users might think they're bleeding. A simple heads-up prevents
                    unnecessary ER visits and builds trust.
                </p>
            </motion.div>
        </div>
    );
}
