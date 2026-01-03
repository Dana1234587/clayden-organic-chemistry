'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

// Dynamic import for CisplatinDockingSim (3Dmol.js)
const CisplatinDockingSim = dynamic(() => import('./CisplatinDockingSim'), {
    ssr: false,
    loading: () => (
        <div style={{
            height: '500px', background: '#0f0f1a', borderRadius: '16px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8'
        }}>
            Loading 3D Molecular Viewer...
        </div>
    )
});

// Dynamic import for InteractiveDockingViz (SVG Cartoon)
const InteractiveDockingViz = dynamic(() => import('./InteractiveDockingViz'), {
    ssr: false,
    loading: () => (
        <div style={{
            height: '350px', background: 'var(--neutral-900)', borderRadius: '16px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--neutral-400)'
        }}>
            Loading Cartoon Simulation...
        </div>
    )
});

type SimMode = '3d-docking' | 'cartoon';
type DrugType = 'cisplatin' | 'transplatin';

export default function MolstarDockingSimulator() {
    const [simMode, setSimMode] = useState<SimMode>('3d-docking');
    const [selectedDrug, setSelectedDrug] = useState<DrugType>('cisplatin');

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Header with Mode Selection */}
            <div style={{
                padding: '1rem',
                background: 'linear-gradient(135deg, rgba(139,92,246,0.1), rgba(16,185,129,0.05))',
                borderRadius: '12px',
                border: '1px solid rgba(139,92,246,0.2)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                    <div>
                        <h3 style={{ margin: 0, color: 'var(--primary-400)', fontSize: '1.1rem', fontWeight: 700 }}>
                            🧬 Molecular Docking Simulations
                        </h3>
                        <p style={{ margin: '0.25rem 0 0', color: 'var(--neutral-500)', fontSize: '0.75rem' }}>
                            Choose simulation type and drug to test
                        </p>
                    </div>

                    {/* Mode Toggle */}
                    <div style={{ display: 'flex', gap: '0.5rem', background: 'var(--neutral-900)', padding: '4px', borderRadius: '10px' }}>
                        <button
                            onClick={() => setSimMode('3d-docking')}
                            style={{
                                padding: '0.6rem 1rem',
                                background: simMode === '3d-docking' ? 'var(--primary-500)' : 'transparent',
                                border: 'none',
                                borderRadius: '8px',
                                color: simMode === '3d-docking' ? 'white' : 'var(--neutral-400)',
                                fontWeight: 600,
                                fontSize: '0.8rem',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.4rem'
                            }}
                        >
                            🔬 3D PDB Docking
                        </button>
                        <button
                            onClick={() => setSimMode('cartoon')}
                            style={{
                                padding: '0.6rem 1rem',
                                background: simMode === 'cartoon' ? 'var(--accent-emerald)' : 'transparent',
                                border: 'none',
                                borderRadius: '8px',
                                color: simMode === 'cartoon' ? 'white' : 'var(--neutral-400)',
                                fontWeight: 600,
                                fontSize: '0.8rem',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.4rem'
                            }}
                        >
                            🎨 Cartoon Simulation
                        </button>
                    </div>
                </div>
            </div>

            {/* Drug Selection (only for Cartoon mode) */}
            {simMode === 'cartoon' && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ display: 'flex', gap: '1rem' }}
                >
                    <button
                        onClick={() => setSelectedDrug('cisplatin')}
                        style={{
                            flex: 1,
                            padding: '1rem',
                            background: selectedDrug === 'cisplatin'
                                ? 'linear-gradient(135deg, rgba(16,185,129,0.2), rgba(6,182,212,0.1))'
                                : 'var(--neutral-900)',
                            border: selectedDrug === 'cisplatin'
                                ? '2px solid var(--accent-emerald)'
                                : '1px solid var(--neutral-800)',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            textAlign: 'left' as const
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <span style={{ fontSize: '1.5rem' }}>💚</span>
                            <div>
                                <p style={{ margin: 0, color: selectedDrug === 'cisplatin' ? 'var(--accent-emerald)' : 'var(--neutral-300)', fontWeight: 700, fontSize: '1rem' }}>
                                    Cisplatin
                                </p>
                                <p style={{ margin: '0.2rem 0 0', color: 'var(--neutral-500)', fontSize: '0.75rem' }}>
                                    Cl-Cl: 3.3 Å • Active Drug
                                </p>
                            </div>
                        </div>
                    </button>

                    <button
                        onClick={() => setSelectedDrug('transplatin')}
                        style={{
                            flex: 1,
                            padding: '1rem',
                            background: selectedDrug === 'transplatin'
                                ? 'linear-gradient(135deg, rgba(239,68,68,0.2), rgba(249,115,22,0.1))'
                                : 'var(--neutral-900)',
                            border: selectedDrug === 'transplatin'
                                ? '2px solid var(--accent-red)'
                                : '1px solid var(--neutral-800)',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            textAlign: 'left' as const
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <span style={{ fontSize: '1.5rem' }}>❌</span>
                            <div>
                                <p style={{ margin: 0, color: selectedDrug === 'transplatin' ? 'var(--accent-red)' : 'var(--neutral-300)', fontWeight: 700, fontSize: '1rem' }}>
                                    Transplatin
                                </p>
                                <p style={{ margin: '0.2rem 0 0', color: 'var(--neutral-500)', fontSize: '0.75rem' }}>
                                    Cl-Cl: 4.66 Å • Inactive
                                </p>
                            </div>
                        </div>
                    </button>
                </motion.div>
            )}

            {/* Simulation Display */}
            <AnimatePresence mode="wait">
                {simMode === '3d-docking' ? (
                    <motion.div
                        key="3d"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                    >
                        <CisplatinDockingSim />
                    </motion.div>
                ) : (
                    <motion.div
                        key="cartoon"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                    >
                        {/* Key for re-render on drug change */}
                        <InteractiveDockingViz key={selectedDrug} drug={selectedDrug} />

                        {/* Educational Note */}
                        <div style={{
                            marginTop: '1rem',
                            padding: '1rem',
                            background: selectedDrug === 'cisplatin'
                                ? 'rgba(16,185,129,0.1)'
                                : 'rgba(239,68,68,0.1)',
                            borderRadius: '12px',
                            border: `1px solid ${selectedDrug === 'cisplatin' ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`
                        }}>
                            <p style={{ margin: 0, color: 'var(--neutral-300)', fontSize: '0.85rem', lineHeight: 1.6 }}>
                                {selectedDrug === 'cisplatin' ? (
                                    <>
                                        <strong style={{ color: 'var(--accent-emerald)' }}>✅ Cisplatin:</strong> The cis configuration positions both Cl atoms 3.3 Å apart,
                                        perfectly matching the N7-N7 distance (3.4 Å) on adjacent Guanine bases. This allows formation of a stable
                                        1,2-d(GpG) cross-link, bending DNA ~35° and blocking replication.
                                    </>
                                ) : (
                                    <>
                                        <strong style={{ color: 'var(--accent-red)' }}>❌ Transplatin:</strong> The trans configuration places Cl atoms 4.66 Å apart -
                                        too far to bridge adjacent Guanine bases (N7-N7 = 3.4 Å). The geometric mismatch causes steric clash
                                        and prevents stable DNA binding, rendering it therapeutically inactive.
                                    </>
                                )}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mode Description */}
            <div style={{
                padding: '0.75rem 1rem',
                background: 'var(--neutral-900)',
                borderRadius: '8px',
                fontSize: '0.75rem',
                color: 'var(--neutral-500)'
            }}>
                {simMode === '3d-docking'
                    ? '🔬 3D PDB Docking: Uses 3Dmol.js to load real crystal structures (PDB: 1BNA → 1AIO) and simulate Cisplatin binding.'
                    : '🎨 Cartoon: Simplified 2D visualization comparing Cisplatin (successful binding) vs Transplatin (steric clash).'}
            </div>
        </div>
    );
}
