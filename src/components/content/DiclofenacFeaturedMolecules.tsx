'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

// Dynamic import for MoleculeViewer (same as LessonViewer uses)
const MoleculeViewer = dynamic(() => import('../MoleculeViewer'), {
    ssr: false,
    loading: () => (
        <div style={{
            height: '220px',
            background: 'var(--gradient-card)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--neutral-400)'
        }}>
            Loading 3D viewer...
        </div>
    )
});

// Diclofenac development pipeline molecules
const DICLOFENAC_MOLECULES = [
    {
        name: '2-Anilinophenylacetic Acid',
        description: 'Lead Compound: Initial hit from screening. Low potency, poor selectivity.',
        cid: 12560
    },
    {
        name: 'Diclofenac Acid',
        description: 'Optimized Lead: 2,6-dichloro addition creates 80° twist for COX-2 selectivity.',
        cid: 3033
    },
    {
        name: 'Diclofenac Sodium',
        description: 'Voltaren®: High lattice energy salt for sustained release in chronic conditions.',
        cid: 5018304
    },
    {
        name: 'Diclofenac Potassium',
        description: 'Cataflam®: Low lattice energy salt for rapid dissolution in acute pain.',
        cid: 3243
    }
];

export default function DiclofenacFeaturedMolecules() {
    return (
        <div>
            {/* Header - same style as LessonViewer Molecules tab */}
            <div style={{
                textAlign: 'center',
                marginBottom: '2rem'
            }}>
                <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>💊</div>
                <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: 'var(--neutral-100)',
                    marginBottom: '0.5rem'
                }}>
                    Diclofenac Development Pipeline
                </h3>
                <p style={{
                    color: 'var(--neutral-400)',
                    fontSize: '0.95rem'
                }}>
                    From lead compound to marketed drug forms
                </p>
            </div>

            {/* Grid layout - EXACT same style as LessonViewer Molecules tab */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.5rem'
            }}>
                {DICLOFENAC_MOLECULES.map((mol, idx) => (
                    <motion.div
                        key={mol.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        style={{
                            background: 'var(--neutral-900)',
                            borderRadius: '16px',
                            border: '1px solid var(--neutral-800)',
                            overflow: 'hidden'
                        }}
                    >
                        <MoleculeViewer
                            moleculeName={mol.name}
                            description={mol.description}
                            cid={mol.cid}
                            height={220}
                        />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
