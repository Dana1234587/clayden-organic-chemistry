'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Reagent {
    name: string;
    formula: string;
    type: 'mild' | 'strong';
    solvent: string;
    reducesAldehyde: boolean;
    reducesKetone: boolean;
    reducesEster: boolean;
    reducesAcid: boolean;
    reducesAmide: boolean;
    safety: string;
    icon: string;
}

const REAGENTS: Reagent[] = [
    {
        name: 'Sodium Borohydride',
        formula: 'NaBH₄',
        type: 'mild',
        solvent: 'Water, Alcohols',
        reducesAldehyde: true,
        reducesKetone: true,
        reducesEster: false,
        reducesAcid: false,
        reducesAmide: false,
        safety: 'Safe, easy to handle',
        icon: '🧪'
    },
    {
        name: 'Lithium Aluminum Hydride',
        formula: 'LiAlH₄',
        type: 'strong',
        solvent: 'Dry Ether ONLY',
        reducesAldehyde: true,
        reducesKetone: true,
        reducesEster: true,
        reducesAcid: true,
        reducesAmide: true,
        safety: '⚠️ Flammable! Reacts with water!',
        icon: '🔥'
    }
];

export default function ReagentComparisonTool() {
    const [selectedReagent, setSelectedReagent] = useState<Reagent | null>(null);
    const [testMode, setTestMode] = useState(false);
    const [testCompound, setTestCompound] = useState('');
    const [testResult, setTestResult] = useState<{ nabh4: boolean; lialh4: boolean } | null>(null);

    const compounds = [
        { name: 'Aldehyde', key: 'reducesAldehyde' },
        { name: 'Ketone', key: 'reducesKetone' },
        { name: 'Ester', key: 'reducesEster' },
        { name: 'Carboxylic Acid', key: 'reducesAcid' },
        { name: 'Amide', key: 'reducesAmide' }
    ];

    const runTest = (compound: string) => {
        setTestCompound(compound);
        const compoundKey = compound.toLowerCase().replace(' ', '') as keyof Reagent;
        setTestResult({
            nabh4: REAGENTS[0][`reduces${compound.replace(' ', '')}` as keyof Reagent] as boolean,
            lialh4: REAGENTS[1][`reduces${compound.replace(' ', '')}` as keyof Reagent] as boolean
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
                background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.98))',
                borderRadius: '20px',
                padding: '24px',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                marginBottom: '24px'
            }}
        >
            <h3 style={{
                margin: '0 0 20px',
                color: '#60a5fa',
                fontSize: '1.3rem',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
            }}>
                <span style={{ fontSize: '1.5rem' }}>⚖️</span>
                NaBH₄ vs LiAlH₄ Comparison Tool
            </h3>

            {/* Toggle Mode */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
                <button
                    onClick={() => setTestMode(false)}
                    style={{
                        flex: 1,
                        padding: '10px',
                        borderRadius: '10px',
                        border: 'none',
                        background: !testMode ? 'linear-gradient(135deg, #3b82f6, #1d4ed8)' : 'rgba(255,255,255,0.05)',
                        color: 'white',
                        fontWeight: 600,
                        cursor: 'pointer'
                    }}
                >
                    📊 Compare
                </button>
                <button
                    onClick={() => setTestMode(true)}
                    style={{
                        flex: 1,
                        padding: '10px',
                        borderRadius: '10px',
                        border: 'none',
                        background: testMode ? 'linear-gradient(135deg, #8b5cf6, #6d28d9)' : 'rgba(255,255,255,0.05)',
                        color: 'white',
                        fontWeight: 600,
                        cursor: 'pointer'
                    }}
                >
                    🧪 Test Compound
                </button>
            </div>

            {!testMode ? (
                /* Comparison View */
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    {REAGENTS.map(r => (
                        <motion.div
                            key={r.formula}
                            whileHover={{ scale: 1.02 }}
                            style={{
                                background: r.type === 'mild'
                                    ? 'rgba(34, 197, 94, 0.1)'
                                    : 'rgba(239, 68, 68, 0.1)',
                                border: `1px solid ${r.type === 'mild' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                                borderRadius: '16px',
                                padding: '20px'
                            }}
                        >
                            <div style={{
                                fontSize: '2rem',
                                marginBottom: '8px',
                                textAlign: 'center'
                            }}>
                                {r.icon}
                            </div>
                            <h4 style={{
                                margin: '0 0 4px',
                                color: r.type === 'mild' ? '#86efac' : '#fca5a5',
                                textAlign: 'center',
                                fontSize: '1.3rem'
                            }}>
                                {r.formula}
                            </h4>
                            <p style={{
                                margin: '0 0 12px',
                                color: '#94a3b8',
                                fontSize: '0.85rem',
                                textAlign: 'center'
                            }}>
                                {r.name}
                            </p>

                            <div style={{
                                background: 'rgba(0,0,0,0.2)',
                                borderRadius: '10px',
                                padding: '12px',
                                marginBottom: '12px'
                            }}>
                                <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginBottom: '4px' }}>Solvent</div>
                                <div style={{ color: '#e2e8f0', fontWeight: 600 }}>{r.solvent}</div>
                            </div>

                            <div style={{ fontSize: '0.85rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                    <span style={{ color: '#94a3b8' }}>Aldehydes</span>
                                    <span style={{ color: r.reducesAldehyde ? '#22c55e' : '#ef4444' }}>
                                        {r.reducesAldehyde ? '✓' : '✗'}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                    <span style={{ color: '#94a3b8' }}>Ketones</span>
                                    <span style={{ color: r.reducesKetone ? '#22c55e' : '#ef4444' }}>
                                        {r.reducesKetone ? '✓' : '✗'}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                    <span style={{ color: '#94a3b8' }}>Esters</span>
                                    <span style={{ color: r.reducesEster ? '#22c55e' : '#ef4444' }}>
                                        {r.reducesEster ? '✓' : '✗'}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                    <span style={{ color: '#94a3b8' }}>Carboxylic Acids</span>
                                    <span style={{ color: r.reducesAcid ? '#22c55e' : '#ef4444' }}>
                                        {r.reducesAcid ? '✓' : '✗'}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: '#94a3b8' }}>Amides</span>
                                    <span style={{ color: r.reducesAmide ? '#22c55e' : '#ef4444' }}>
                                        {r.reducesAmide ? '✓' : '✗'}
                                    </span>
                                </div>
                            </div>

                            <div style={{
                                marginTop: '12px',
                                padding: '8px',
                                borderRadius: '8px',
                                background: r.type === 'mild' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                                fontSize: '0.8rem',
                                textAlign: 'center',
                                color: r.type === 'mild' ? '#86efac' : '#fca5a5'
                            }}>
                                {r.safety}
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                /* Test Mode */
                <div>
                    <p style={{ color: '#94a3b8', marginBottom: '16px', textAlign: 'center' }}>
                        Select a compound to see which reagent will reduce it:
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', marginBottom: '20px' }}>
                        {compounds.map(c => (
                            <button
                                key={c.name}
                                onClick={() => runTest(c.name)}
                                style={{
                                    padding: '10px 16px',
                                    borderRadius: '10px',
                                    border: testCompound === c.name ? '2px solid #8b5cf6' : '1px solid rgba(255,255,255,0.1)',
                                    background: testCompound === c.name ? 'rgba(139, 92, 246, 0.2)' : 'rgba(255,255,255,0.05)',
                                    color: testCompound === c.name ? '#c4b5fd' : '#94a3b8',
                                    cursor: 'pointer',
                                    fontWeight: 500
                                }}
                            >
                                {c.name}
                            </button>
                        ))}
                    </div>

                    {testResult && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}
                        >
                            <div style={{
                                padding: '20px',
                                borderRadius: '16px',
                                background: testResult.nabh4 ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                                border: `2px solid ${testResult.nabh4 ? '#22c55e' : '#ef4444'}`,
                                textAlign: 'center'
                            }}>
                                <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>
                                    {testResult.nabh4 ? '✓' : '✗'}
                                </div>
                                <div style={{ fontWeight: 700, fontSize: '1.2rem', color: testResult.nabh4 ? '#86efac' : '#fca5a5' }}>
                                    NaBH₄
                                </div>
                                <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '4px' }}>
                                    {testResult.nabh4 ? 'Will reduce!' : 'No reaction'}
                                </div>
                            </div>
                            <div style={{
                                padding: '20px',
                                borderRadius: '16px',
                                background: testResult.lialh4 ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                                border: `2px solid ${testResult.lialh4 ? '#22c55e' : '#ef4444'}`,
                                textAlign: 'center'
                            }}>
                                <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>
                                    {testResult.lialh4 ? '✓' : '✗'}
                                </div>
                                <div style={{ fontWeight: 700, fontSize: '1.2rem', color: testResult.lialh4 ? '#86efac' : '#fca5a5' }}>
                                    LiAlH₄
                                </div>
                                <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '4px' }}>
                                    {testResult.lialh4 ? 'Will reduce!' : 'No reaction'}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            )}
        </motion.div>
    );
}
