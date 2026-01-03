'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

// Dynamic import for MoleculeViewer
const MoleculeViewer = dynamic(() => import('../MoleculeViewer'), {
    ssr: false,
    loading: () => (
        <div style={{
            height: '250px',
            background: 'var(--neutral-900)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--neutral-400)'
        }}>
            Loading 3D structure...
        </div>
    )
});

// Dynamic import for MolstarDockingSimulator
const MolstarDockingSimulator = dynamic(() => import('./MolstarDockingSimulator'), {
    ssr: false,
    loading: () => (
        <div style={{
            height: '600px',
            background: 'var(--neutral-900)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--neutral-400)'
        }}>
            Loading Molecular Docking Simulation...
        </div>
    )
});

// Dynamic import for InteractiveDockingViz (SVG animation for Comparison tab)
const InteractiveDockingViz = dynamic(() => import('./InteractiveDockingViz'), {
    ssr: false,
    loading: () => (
        <div style={{
            height: '350px',
            background: 'var(--neutral-900)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--neutral-400)'
        }}>
            Loading Docking Animation...
        </div>
    )
});

interface DrugDiscoveryPanelProps {
    sectionId: string; // To know which lesson we're in
}

// Drug discovery data for different lessons
const drugDiscoveryData = {
    'organic-chemistry-and-you': {
        title: 'Cisplatin vs Transplatin: Geometry in Cancer Treatment',
        subtitle: 'How a 1.3 Å difference saves millions of lives',
        content: {
            introduction: `The same molecular formula can produce completely different therapeutic outcomes. 
            Cisplatin and Transplatin share identical atoms: Pt(NH₃)₂Cl₂. Yet Cisplatin is one of the most 
            successful anticancer drugs ever developed, while Transplatin is therapeutically useless.`,
            mechanism: {
                title: 'Molecular Mechanism of Action',
                cisplatin: {
                    name: 'Cisplatin (cis-diamminedichloroplatinum(II))',
                    formula: 'cis-[Pt(NH₃)₂Cl₂]',
                    clDistance: '3.3 Å',
                    action: 'Forms 1,2-intrastrand cross-links on DNA between adjacent guanine bases (GG) or adenine-guanine (AG)',
                    result: 'DNA helix bends ~35-40°, blocks replication fork progression, triggers p53-mediated apoptosis',
                    efficacy: '90%+ cure rate for testicular cancer, effective for ovarian, bladder, head/neck cancers'
                },
                transplatin: {
                    name: 'Transplatin (trans-diamminedichloroplatinum(II))',
                    formula: 'trans-[Pt(NH₃)₂Cl₂]',
                    clDistance: '4.6 Å',
                    action: 'Cannot form 1,2-intrastrand cross-links; forms interstrand cross-links instead',
                    result: 'Interstrand lesions are efficiently repaired by nucleotide excision repair (NER)',
                    efficacy: 'No significant anticancer activity in clinical settings'
                }
            },
            keyDifference: {
                title: 'Critical Distance Difference',
                explanation: `In Cisplatin, the two chloride ligands are positioned cis (same side), 
                allowing simultaneous coordination to two adjacent purine bases on the same DNA strand. 
                The N7 atoms of adjacent guanines are ~3.4 Å apart—perfectly matching Cisplatin's Cl-Cl distance.
                
                In Transplatin, the trans geometry places chlorides ~4.6 Å apart, making it geometrically 
                impossible to bridge adjacent bases. This seemingly small difference (1.3 Å ≈ 1/10th the width 
                of a hydrogen atom) determines whether a patient lives or dies.`
            },
            bindingSteps: [
                { step: 1, title: 'Cellular Uptake', description: 'Drug enters cell via copper transporters (CTR1) or passive diffusion' },
                { step: 2, title: 'Aquation', description: 'Chloride ligands are displaced by water in the low-Cl⁻ cytoplasm: [Pt(NH₃)₂Cl₂] → [Pt(NH₃)₂(H₂O)₂]²⁺' },
                { step: 3, title: 'DNA Binding', description: 'Aquated species binds to N7 of guanine, forming mono-adduct, then cross-link' },
                { step: 4, title: 'Structural Distortion', description: 'Cross-link bends DNA helix, disrupts base pairing' },
                { step: 5, title: 'Cellular Response', description: 'HMGB1 proteins recognize damage, p53 pathway activated, apoptosis initiated' }
            ]
        },
        molecules: [
            { name: 'Cisplatin', key: 'cisplatin' },
            { name: 'Transplatin', key: 'transplatin' }
        ],
        references: [
            'Rosenberg, B. et al. (1969). Nature, 222, 385-386',
            'Kelland, L. (2007). Nature Reviews Cancer, 7, 573-584',
            'Wang, D. & Lippard, S.J. (2005). Nature Reviews Drug Discovery, 4, 307-320'
        ]
    }
};

export default function DrugDiscoveryPanel({ sectionId }: DrugDiscoveryPanelProps) {
    const [activeView, setActiveView] = useState<'overview' | 'mechanism' | 'comparison' | '3d' | 'simulation'>('overview');
    const [selectedDrug, setSelectedDrug] = useState<'cisplatin' | 'transplatin'>('cisplatin');
    const [bindingStep, setBindingStep] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const data = drugDiscoveryData['organic-chemistry-and-you'];

    const startBindingAnimation = () => {
        setIsAnimating(true);
        setBindingStep(0);

        const interval = setInterval(() => {
            setBindingStep(prev => {
                if (prev >= 4) {
                    clearInterval(interval);
                    setIsAnimating(false);
                    return prev;
                }
                return prev + 1;
            });
        }, 2000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
                background: 'var(--gradient-card)',
                borderRadius: '20px',
                border: '1px solid var(--neutral-800)',
                overflow: 'hidden'
            }}
        >
            {/* Header */}
            <div style={{
                padding: '1.5rem 2rem',
                borderBottom: '1px solid var(--neutral-800)',
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(6, 182, 212, 0.1))'
            }}>
                <h3 style={{
                    fontSize: '1.4rem',
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, var(--primary-400), var(--accent-cyan))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '0.5rem'
                }}>
                    💊 {data.title}
                </h3>
                <p style={{
                    color: 'var(--neutral-400)',
                    fontSize: '0.9rem',
                    margin: 0
                }}>
                    {data.subtitle}
                </p>
            </div>

            {/* Navigation Tabs */}
            <div style={{
                display: 'flex',
                borderBottom: '1px solid var(--neutral-800)',
                padding: '0 1rem',
                gap: '0.5rem',
                overflowX: 'auto'
            }}>
                {[
                    { id: 'overview', label: 'Overview', icon: '📋' },
                    { id: 'mechanism', label: 'Mechanism', icon: '⚙️' },
                    { id: 'comparison', label: 'Comparison', icon: '⚖️' },
                    { id: '3d', label: '3D Structures', icon: '🔬' },
                    { id: 'simulation', label: 'Simulation', icon: '🧬' }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveView(tab.id as typeof activeView)}
                        style={{
                            padding: '1rem 1.25rem',
                            background: 'none',
                            border: 'none',
                            borderBottom: activeView === tab.id ? '2px solid var(--primary-500)' : '2px solid transparent',
                            color: activeView === tab.id ? 'var(--primary-400)' : 'var(--neutral-400)',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            fontWeight: activeView === tab.id ? 600 : 500,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            whiteSpace: 'nowrap',
                            transition: 'all 0.2s'
                        }}
                    >
                        <span>{tab.icon}</span>
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div style={{ padding: '2rem' }}>
                <AnimatePresence mode="wait">
                    {/* Overview Tab */}
                    {activeView === 'overview' && (
                        <motion.div
                            key="overview"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <p style={{
                                color: 'var(--neutral-300)',
                                lineHeight: 1.8,
                                fontSize: '1rem',
                                marginBottom: '2rem'
                            }}>
                                {data.content.introduction}
                            </p>

                            {/* Key Difference Box */}
                            <div style={{
                                padding: '1.5rem',
                                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(6, 182, 212, 0.05))',
                                borderRadius: '16px',
                                border: '1px solid rgba(139, 92, 246, 0.2)',
                                marginBottom: '2rem'
                            }}>
                                <h4 style={{
                                    color: 'var(--primary-400)',
                                    marginTop: 0,
                                    marginBottom: '1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}>
                                    🎯 {data.content.keyDifference.title}
                                </h4>
                                <p style={{
                                    color: 'var(--neutral-300)',
                                    lineHeight: 1.8,
                                    margin: 0,
                                    fontSize: '0.95rem',
                                    whiteSpace: 'pre-line'
                                }}>
                                    {data.content.keyDifference.explanation}
                                </p>
                            </div>

                            {/* References */}
                            <div style={{
                                padding: '1rem',
                                background: 'var(--neutral-900)',
                                borderRadius: '12px',
                                border: '1px solid var(--neutral-800)'
                            }}>
                                <h5 style={{ color: 'var(--neutral-400)', marginTop: 0, marginBottom: '0.75rem', fontSize: '0.85rem' }}>
                                    📚 Key References
                                </h5>
                                <ul style={{ margin: 0, paddingLeft: '1.25rem', color: 'var(--neutral-500)', fontSize: '0.8rem', lineHeight: 1.8 }}>
                                    {data.references.map((ref, idx) => (
                                        <li key={idx}>{ref}</li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    )}

                    {/* Mechanism Tab */}
                    {activeView === 'mechanism' && (
                        <motion.div
                            key="mechanism"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <h4 style={{ color: 'var(--neutral-200)', marginTop: 0, marginBottom: '1.5rem' }}>
                                DNA Binding Mechanism: Step-by-Step
                            </h4>

                            {/* Binding Steps Timeline */}
                            <div style={{ position: 'relative', marginBottom: '2rem' }}>
                                {data.content.bindingSteps.map((step, idx) => (
                                    <motion.div
                                        key={step.step}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        style={{
                                            display: 'flex',
                                            gap: '1.25rem',
                                            marginBottom: idx < data.content.bindingSteps.length - 1 ? '1.5rem' : 0,
                                            opacity: isAnimating && bindingStep < idx ? 0.3 : 1,
                                            transition: 'opacity 0.3s'
                                        }}
                                    >
                                        {/* Step Number */}
                                        <div style={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            background: isAnimating && bindingStep === idx
                                                ? 'linear-gradient(135deg, var(--accent-emerald), var(--accent-cyan))'
                                                : bindingStep > idx || !isAnimating
                                                    ? 'linear-gradient(135deg, var(--primary-500), var(--primary-600))'
                                                    : 'var(--neutral-800)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 700,
                                            color: 'white',
                                            fontSize: '0.9rem',
                                            flexShrink: 0,
                                            boxShadow: isAnimating && bindingStep === idx
                                                ? '0 0 20px rgba(16, 185, 129, 0.5)'
                                                : 'none',
                                            transition: 'all 0.3s'
                                        }}>
                                            {step.step}
                                        </div>

                                        {/* Step Content */}
                                        <div style={{ flex: 1 }}>
                                            <h5 style={{
                                                color: isAnimating && bindingStep === idx ? 'var(--accent-emerald)' : 'var(--neutral-200)',
                                                marginTop: 0,
                                                marginBottom: '0.5rem',
                                                fontSize: '1rem',
                                                transition: 'color 0.3s'
                                            }}>
                                                {step.title}
                                            </h5>
                                            <p style={{
                                                color: 'var(--neutral-400)',
                                                margin: 0,
                                                fontSize: '0.9rem',
                                                lineHeight: 1.6
                                            }}>
                                                {step.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Animation Control */}
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={startBindingAnimation}
                                disabled={isAnimating}
                                style={{
                                    padding: '1rem 2rem',
                                    background: isAnimating
                                        ? 'var(--neutral-700)'
                                        : 'linear-gradient(135deg, var(--primary-500), var(--primary-600))',
                                    border: 'none',
                                    borderRadius: '12px',
                                    color: 'white',
                                    fontWeight: 600,
                                    cursor: isAnimating ? 'not-allowed' : 'pointer',
                                    width: '100%'
                                }}
                            >
                                {isAnimating ? `Step ${bindingStep + 1} of 5: ${data.content.bindingSteps[bindingStep].title}...` : '▶️ Animate Binding Process'}
                            </motion.button>
                        </motion.div>
                    )}

                    {/* Comparison Tab */}
                    {activeView === 'comparison' && (
                        <motion.div
                            key="comparison"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, 1fr)',
                                gap: '1.5rem'
                            }}>
                                {/* Cisplatin Card */}
                                <div style={{
                                    padding: '1.5rem',
                                    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05))',
                                    borderRadius: '16px',
                                    border: '1px solid rgba(16, 185, 129, 0.3)'
                                }}>
                                    <h4 style={{
                                        color: 'var(--accent-emerald)',
                                        marginTop: 0,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }}>
                                        ✅ Cisplatin
                                    </h4>
                                    <table style={{ width: '100%', fontSize: '0.85rem', color: 'var(--neutral-300)' }}>
                                        <tbody>
                                            <tr>
                                                <td style={{ padding: '0.5rem 0', color: 'var(--neutral-400)' }}>Formula:</td>
                                                <td style={{ padding: '0.5rem 0' }}>{data.content.mechanism.cisplatin.formula}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ padding: '0.5rem 0', color: 'var(--neutral-400)' }}>Cl-Cl Distance:</td>
                                                <td style={{ padding: '0.5rem 0', fontWeight: 700, color: 'var(--accent-emerald)' }}>
                                                    {data.content.mechanism.cisplatin.clDistance}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ padding: '0.5rem 0', color: 'var(--neutral-400)' }}>Binding:</td>
                                                <td style={{ padding: '0.5rem 0' }}>{data.content.mechanism.cisplatin.action}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ padding: '0.5rem 0', color: 'var(--neutral-400)' }}>Result:</td>
                                                <td style={{ padding: '0.5rem 0' }}>{data.content.mechanism.cisplatin.result}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ padding: '0.5rem 0', color: 'var(--neutral-400)' }}>Efficacy:</td>
                                                <td style={{ padding: '0.5rem 0', fontWeight: 600, color: 'var(--accent-emerald)' }}>
                                                    {data.content.mechanism.cisplatin.efficacy}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                {/* Transplatin Card */}
                                <div style={{
                                    padding: '1.5rem',
                                    background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(239, 68, 68, 0.05))',
                                    borderRadius: '16px',
                                    border: '1px solid rgba(239, 68, 68, 0.3)'
                                }}>
                                    <h4 style={{
                                        color: 'var(--accent-red)',
                                        marginTop: 0,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }}>
                                        ❌ Transplatin
                                    </h4>
                                    <table style={{ width: '100%', fontSize: '0.85rem', color: 'var(--neutral-300)' }}>
                                        <tbody>
                                            <tr>
                                                <td style={{ padding: '0.5rem 0', color: 'var(--neutral-400)' }}>Formula:</td>
                                                <td style={{ padding: '0.5rem 0' }}>{data.content.mechanism.transplatin.formula}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ padding: '0.5rem 0', color: 'var(--neutral-400)' }}>Cl-Cl Distance:</td>
                                                <td style={{ padding: '0.5rem 0', fontWeight: 700, color: 'var(--accent-red)' }}>
                                                    {data.content.mechanism.transplatin.clDistance}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ padding: '0.5rem 0', color: 'var(--neutral-400)' }}>Binding:</td>
                                                <td style={{ padding: '0.5rem 0' }}>{data.content.mechanism.transplatin.action}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ padding: '0.5rem 0', color: 'var(--neutral-400)' }}>Result:</td>
                                                <td style={{ padding: '0.5rem 0' }}>{data.content.mechanism.transplatin.result}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ padding: '0.5rem 0', color: 'var(--neutral-400)' }}>Efficacy:</td>
                                                <td style={{ padding: '0.5rem 0', fontWeight: 600, color: 'var(--accent-red)' }}>
                                                    {data.content.mechanism.transplatin.efficacy}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Interactive Docking Animation */}
                            <InteractiveDockingViz drug={selectedDrug} />
                        </motion.div>
                    )}

                    {/* 3D Structures Tab */}
                    {activeView === '3d' && (
                        <motion.div
                            key="3d"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            {/* Drug Selector */}
                            <div style={{
                                display: 'flex',
                                gap: '1rem',
                                marginBottom: '1.5rem'
                            }}>
                                <button
                                    onClick={() => setSelectedDrug('cisplatin')}
                                    style={{
                                        flex: 1,
                                        padding: '1rem',
                                        background: selectedDrug === 'cisplatin'
                                            ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(6, 182, 212, 0.2))'
                                            : 'var(--neutral-800)',
                                        border: selectedDrug === 'cisplatin'
                                            ? '2px solid var(--accent-emerald)'
                                            : '1px solid var(--neutral-700)',
                                        borderRadius: '12px',
                                        color: selectedDrug === 'cisplatin' ? 'var(--accent-emerald)' : 'var(--neutral-400)',
                                        fontWeight: 600,
                                        cursor: 'pointer'
                                    }}
                                >
                                    💚 Cisplatin (Active)
                                </button>
                                <button
                                    onClick={() => setSelectedDrug('transplatin')}
                                    style={{
                                        flex: 1,
                                        padding: '1rem',
                                        background: selectedDrug === 'transplatin'
                                            ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(249, 115, 22, 0.2))'
                                            : 'var(--neutral-800)',
                                        border: selectedDrug === 'transplatin'
                                            ? '2px solid var(--accent-red)'
                                            : '1px solid var(--neutral-700)',
                                        borderRadius: '12px',
                                        color: selectedDrug === 'transplatin' ? 'var(--accent-red)' : 'var(--neutral-400)',
                                        fontWeight: 600,
                                        cursor: 'pointer'
                                    }}
                                >
                                    ❌ Transplatin (Inactive)
                                </button>
                            </div>

                            {/* 3D Viewer */}
                            <div style={{
                                background: 'var(--neutral-900)',
                                borderRadius: '16px',
                                border: '1px solid var(--neutral-800)',
                                overflow: 'hidden'
                            }}>
                                <MoleculeViewer
                                    moleculeName={selectedDrug === 'cisplatin' ? 'Cisplatin' : 'Transplatin'}
                                    description={selectedDrug === 'cisplatin'
                                        ? 'Cl atoms on SAME side - can bind adjacent DNA bases'
                                        : 'Cl atoms on OPPOSITE sides - cannot bind adjacent bases'
                                    }
                                    height={350}
                                />
                            </div>

                            {/* Info Box */}
                            <div style={{
                                marginTop: '1.5rem',
                                padding: '1rem',
                                background: selectedDrug === 'cisplatin'
                                    ? 'rgba(16, 185, 129, 0.1)'
                                    : 'rgba(239, 68, 68, 0.1)',
                                borderRadius: '12px',
                                border: `1px solid ${selectedDrug === 'cisplatin' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`
                            }}>
                                <p style={{
                                    margin: 0,
                                    color: 'var(--neutral-300)',
                                    fontSize: '0.9rem',
                                    lineHeight: 1.6
                                }}>
                                    {selectedDrug === 'cisplatin' ? (
                                        <>
                                            <strong style={{ color: 'var(--accent-emerald)' }}>Clinical Use:</strong> Cisplatin is a first-line
                                            chemotherapeutic agent used in combination regimens for testicular, ovarian, bladder, lung, and head/neck cancers.
                                            Its discovery in 1965 by Barnett Rosenberg revolutionized cancer treatment.
                                        </>
                                    ) : (
                                        <>
                                            <strong style={{ color: 'var(--accent-red)' }}>Research Note:</strong> Despite extensive study,
                                            Transplatin has never achieved clinical approval. Its inability to form stable intrastrand cross-links
                                            renders it therapeutically useless. However, it remains valuable for studying platinum-DNA interactions.
                                        </>
                                    )}
                                </p>
                            </div>
                        </motion.div>
                    )}

                    {/* Simulation Tab */}
                    {activeView === 'simulation' && (
                        <motion.div
                            key="simulation"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <MolstarDockingSimulator />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
