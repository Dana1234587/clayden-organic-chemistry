'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

interface MoleculeExample {
    name: string;
    symbol: string;
    totalElectrons: number;
    bondingElectrons: number;
    antibondingElectrons: number;
    exists: boolean;
    note: string;
}

const moleculeExamples: MoleculeExample[] = [
    { name: 'Hydrogen ion', symbol: 'H₂⁺', totalElectrons: 1, bondingElectrons: 1, antibondingElectrons: 0, exists: true, note: 'Weakest known bond' },
    { name: 'Hydrogen', symbol: 'H₂', totalElectrons: 2, bondingElectrons: 2, antibondingElectrons: 0, exists: true, note: 'Strong single bond' },
    { name: 'Helium ion', symbol: 'He₂⁺', totalElectrons: 3, bondingElectrons: 2, antibondingElectrons: 1, exists: true, note: 'Bond order = 0.5' },
    { name: 'Helium', symbol: 'He₂', totalElectrons: 4, bondingElectrons: 2, antibondingElectrons: 2, exists: false, note: 'Does not exist!' },
];

export default function BondOrderCalculator() {
    const [bondingElectrons, setBondingElectrons] = useState(2);
    const [antibondingElectrons, setAntibondingElectrons] = useState(0);
    const [selectedExample, setSelectedExample] = useState<MoleculeExample | null>(null);

    const bondOrder = useMemo(() => {
        return (bondingElectrons - antibondingElectrons) / 2;
    }, [bondingElectrons, antibondingElectrons]);

    const isStable = bondOrder > 0;
    const bondStrength = bondOrder >= 3 ? 'Very Strong (Triple)'
        : bondOrder >= 2 ? 'Strong (Double)'
            : bondOrder >= 1 ? 'Moderate (Single)'
                : bondOrder > 0 ? 'Weak'
                    : 'No Bond';

    const selectExample = (example: MoleculeExample) => {
        setSelectedExample(example);
        setBondingElectrons(example.bondingElectrons);
        setAntibondingElectrons(example.antibondingElectrons);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
                background: 'linear-gradient(135deg, rgba(25, 20, 40, 0.95), rgba(40, 30, 55, 0.9))',
                borderRadius: 20,
                padding: '1.5rem',
                border: `2px solid ${isStable ? '#22c55e40' : '#ef444440'}`,
                maxWidth: '100%',
            }}
        >
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ margin: 0, color: 'white', fontSize: '1.3rem' }}>
                    🧮 Bond Order Calculator
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', margin: '0.5rem 0 0' }}>
                    Bond Order = ½(bonding − antibonding) electrons
                </p>
            </div>

            {/* MO Diagram */}
            <div style={{
                background: 'rgba(0,0,0,0.3)',
                borderRadius: 16,
                padding: '1rem',
                marginBottom: '1rem',
            }}>
                <svg width="100%" height="200" viewBox="0 0 300 200" preserveAspectRatio="xMidYMid meet">
                    {/* Energy arrow */}
                    <line x1="30" y1="180" x2="30" y2="20" stroke="rgba(255,255,255,0.3)" strokeWidth="2" markerEnd="url(#arrowhead)" />
                    <text x="15" y="100" fill="rgba(255,255,255,0.5)" fontSize="10" transform="rotate(-90, 15, 100)">Energy</text>

                    {/* Antibonding orbital (σ*) */}
                    <rect x="100" y="30" width="100" height="40" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2" rx="8" />
                    <text x="150" y="55" textAnchor="middle" fill="#ef4444" fontSize="14" fontWeight="bold">σ*</text>

                    {/* Electrons in antibonding */}
                    {Array.from({ length: Math.min(antibondingElectrons, 2) }).map((_, i) => (
                        <motion.circle
                            key={`anti-${i}`}
                            cx={130 + i * 40}
                            cy={50}
                            r={8}
                            fill="#ef4444"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                        />
                    ))}

                    {/* Atomic orbital lines */}
                    <line x1="50" y1="110" x2="90" y2="110" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeDasharray="4" />
                    <line x1="210" y1="110" x2="250" y2="110" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeDasharray="4" />
                    <text x="55" y="125" fill="rgba(255,255,255,0.5)" fontSize="10">1s</text>
                    <text x="235" y="125" fill="rgba(255,255,255,0.5)" fontSize="10">1s</text>

                    {/* Bonding orbital (σ) */}
                    <rect x="100" y="140" width="100" height="40" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2" rx="8" />
                    <text x="150" y="165" textAnchor="middle" fill="#3b82f6" fontSize="14" fontWeight="bold">σ</text>

                    {/* Electrons in bonding */}
                    {Array.from({ length: Math.min(bondingElectrons, 2) }).map((_, i) => (
                        <motion.circle
                            key={`bond-${i}`}
                            cx={130 + i * 40}
                            cy={160}
                            r={8}
                            fill="#3b82f6"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                        />
                    ))}

                    {/* Arrowhead marker */}
                    <defs>
                        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="rgba(255,255,255,0.3)" />
                        </marker>
                    </defs>
                </svg>
            </div>

            {/* Controls */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                marginBottom: '1rem'
            }}>
                <div style={controlBoxStyle('#3b82f6')}>
                    <label style={{ color: '#3b82f6', fontSize: '0.8rem', display: 'block', marginBottom: 8 }}>
                        σ (Bonding) Electrons
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                        <button onClick={() => setBondingElectrons(Math.max(0, bondingElectrons - 1))} style={buttonStyle}>−</button>
                        <span style={{ fontSize: '2rem', fontWeight: 700, color: '#3b82f6', minWidth: 40, textAlign: 'center' }}>
                            {bondingElectrons}
                        </span>
                        <button onClick={() => setBondingElectrons(Math.min(2, bondingElectrons + 1))} style={buttonStyle}>+</button>
                    </div>
                </div>

                <div style={controlBoxStyle('#ef4444')}>
                    <label style={{ color: '#ef4444', fontSize: '0.8rem', display: 'block', marginBottom: 8 }}>
                        σ* (Antibonding) Electrons
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                        <button onClick={() => setAntibondingElectrons(Math.max(0, antibondingElectrons - 1))} style={buttonStyle}>−</button>
                        <span style={{ fontSize: '2rem', fontWeight: 700, color: '#ef4444', minWidth: 40, textAlign: 'center' }}>
                            {antibondingElectrons}
                        </span>
                        <button onClick={() => setAntibondingElectrons(Math.min(2, antibondingElectrons + 1))} style={buttonStyle}>+</button>
                    </div>
                </div>
            </div>

            {/* Result */}
            <div style={{
                background: isStable ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                borderRadius: 16,
                padding: '1.25rem',
                border: `2px solid ${isStable ? '#22c55e' : '#ef4444'}60`,
                textAlign: 'center',
                marginBottom: '1rem',
            }}>
                <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>
                    Bond Order = ½({bondingElectrons} − {antibondingElectrons})
                </div>
                <div style={{ fontSize: '3rem', fontWeight: 800, color: isStable ? '#22c55e' : '#ef4444' }}>
                    {bondOrder}
                </div>
                <div style={{
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: isStable ? '#22c55e' : '#ef4444',
                    marginTop: 4
                }}>
                    {isStable ? '✓ Stable' : '✗ Unstable'} • {bondStrength}
                </div>
            </div>

            {/* Examples */}
            <div>
                <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>
                    Try these examples:
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {moleculeExamples.map((ex) => (
                        <motion.button
                            key={ex.symbol}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => selectExample(ex)}
                            style={{
                                padding: '0.5rem 1rem',
                                background: selectedExample?.symbol === ex.symbol
                                    ? (ex.exists ? '#22c55e' : '#ef4444')
                                    : 'rgba(255,255,255,0.1)',
                                border: `1px solid ${ex.exists ? '#22c55e' : '#ef4444'}60`,
                                borderRadius: 8,
                                color: 'white',
                                fontWeight: 600,
                                fontSize: '0.9rem',
                                cursor: 'pointer',
                            }}
                        >
                            {ex.symbol}
                        </motion.button>
                    ))}
                </div>
                {selectedExample && (
                    <div style={{
                        marginTop: '0.75rem',
                        fontSize: '0.85rem',
                        color: 'rgba(255,255,255,0.7)',
                        fontStyle: 'italic'
                    }}>
                        💡 {selectedExample.note}
                    </div>
                )}
            </div>
        </motion.div>
    );
}

const controlBoxStyle = (color: string): React.CSSProperties => ({
    background: `${color}10`,
    borderRadius: 12,
    padding: '1rem',
    textAlign: 'center',
    border: `1px solid ${color}30`,
});

const buttonStyle: React.CSSProperties = {
    width: 36,
    height: 36,
    borderRadius: '50%',
    border: 'none',
    background: 'rgba(255,255,255,0.15)',
    color: 'white',
    fontSize: '1.25rem',
    fontWeight: 700,
    cursor: 'pointer',
};
