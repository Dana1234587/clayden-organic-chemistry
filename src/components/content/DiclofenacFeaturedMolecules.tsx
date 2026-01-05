'use client';

import { motion } from 'framer-motion';

// PubChem 2D Image URL
const getPubChem2DImage = (cid: number, size: number = 250) =>
    `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/PNG?image_size=${size}x${size}`;

// Only molecules that work reliably - removed Sodium/Potassium (loading issues)
const DICLOFENAC_MOLECULES = [
    {
        name: 'Diclofenac Acid',
        stage: 'Optimized Lead',
        description: '2,6-dichloro addition creates 80° twist for COX-2 selectivity',
        cid: 3033,
        color: '#8b5cf6'
    }
];

export default function DiclofenacFeaturedMolecules() {
    return (
        <div style={{ padding: '1rem' }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>💊</div>
                <h3 style={{
                    fontSize: '1.4rem',
                    fontWeight: 700,
                    color: 'var(--neutral-100)',
                    marginBottom: '0.5rem'
                }}>
                    Featured Molecule: Diclofenac
                </h3>
                <p style={{ color: 'var(--neutral-400)', fontSize: '0.9rem' }}>
                    The optimized COX-2 selective NSAID
                </p>
            </div>

            {/* Single Professional Card */}
            {DICLOFENAC_MOLECULES.map((mol, idx) => (
                <motion.div
                    key={mol.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    style={{
                        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.95))',
                        borderRadius: '20px',
                        border: `1px solid ${mol.color}40`,
                        overflow: 'hidden',
                        maxWidth: '500px',
                        margin: '0 auto'
                    }}
                >
                    {/* 2D Structure - White Background */}
                    <div style={{
                        background: 'white',
                        padding: '2rem',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <img
                            src={getPubChem2DImage(mol.cid, 280)}
                            alt={mol.name}
                            style={{ maxWidth: '100%', height: 'auto' }}
                        />
                    </div>

                    {/* Info Section */}
                    <div style={{ padding: '1.5rem' }}>
                        {/* Stage Badge */}
                        <div style={{
                            display: 'inline-block',
                            padding: '0.35rem 0.85rem',
                            background: `${mol.color}25`,
                            borderRadius: '20px',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            color: mol.color,
                            marginBottom: '0.75rem'
                        }}>
                            {mol.stage}
                        </div>

                        <h4 style={{
                            color: 'var(--neutral-100)',
                            fontSize: '1.2rem',
                            fontWeight: 700,
                            marginBottom: '0.5rem'
                        }}>
                            {mol.name}
                        </h4>

                        <p style={{
                            color: 'var(--neutral-400)',
                            fontSize: '0.9rem',
                            lineHeight: 1.5,
                            marginBottom: '1rem'
                        }}>
                            {mol.description}
                        </p>

                        {/* Functional Groups Tags */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                            {['Carboxylic Acid', '2,6-Dichloro', 'Secondary Amine', 'Diphenyl Scaffold'].map(fg => (
                                <span
                                    key={fg}
                                    style={{
                                        padding: '0.3rem 0.7rem',
                                        background: 'rgba(255,255,255,0.08)',
                                        borderRadius: '8px',
                                        fontSize: '0.75rem',
                                        color: 'var(--neutral-300)'
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
    );
}
