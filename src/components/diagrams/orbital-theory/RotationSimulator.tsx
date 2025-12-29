'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function RotationSimulator() {
    const [rotationAngle, setRotationAngle] = useState(0);
    const [selectedMolecule, setSelectedMolecule] = useState<'ethane' | 'ethene'>('ethane');

    const isEthane = selectedMolecule === 'ethane';
    const maxRotation = isEthane ? 360 : 90;
    const energyBarrier = isEthane ? 12 : 250;
    const stress = isEthane
        ? Math.abs(Math.sin(rotationAngle * Math.PI / 60) * 12)
        : rotationAngle * (250 / 90);
    const piOverlapPercent = isEthane ? 100 : Math.max(0, 100 - (rotationAngle * 100 / 90));

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
                background: 'linear-gradient(135deg, rgba(20, 25, 35, 0.95), rgba(30, 35, 50, 0.9))',
                borderRadius: 20,
                padding: '1.5rem',
                border: '2px solid rgba(139, 92, 246, 0.3)',
                maxWidth: '100%',
            }}
        >
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ margin: 0, color: 'white', fontSize: '1.3rem' }}>
                    🔄 Bond Rotation Simulator
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', margin: '0.5rem 0 0' }}>
                    Compare rotation in single vs double bonds
                </p>
            </div>

            {/* Molecule Selector */}
            <div style={{
                display: 'flex',
                gap: '1rem',
                marginBottom: '1.5rem',
                justifyContent: 'center'
            }}>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => { setSelectedMolecule('ethane'); setRotationAngle(0); }}
                    style={{
                        padding: '0.75rem 1.5rem',
                        background: isEthane ? 'linear-gradient(135deg, #22c55e, #16a34a)' : 'rgba(255,255,255,0.1)',
                        border: '2px solid #22c55e',
                        borderRadius: 12,
                        color: 'white',
                        fontWeight: 700,
                        fontSize: '1rem',
                        cursor: 'pointer',
                    }}
                >
                    Ethane (C₂H₆)
                    <div style={{ fontSize: '0.7rem', opacity: 0.8 }}>Single Bond</div>
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => { setSelectedMolecule('ethene'); setRotationAngle(0); }}
                    style={{
                        padding: '0.75rem 1.5rem',
                        background: !isEthane ? 'linear-gradient(135deg, #8b5cf6, #7c3aed)' : 'rgba(255,255,255,0.1)',
                        border: '2px solid #8b5cf6',
                        borderRadius: 12,
                        color: 'white',
                        fontWeight: 700,
                        fontSize: '1rem',
                        cursor: 'pointer',
                    }}
                >
                    Ethene (C₂H₄)
                    <div style={{ fontSize: '0.7rem', opacity: 0.8 }}>Double Bond</div>
                </motion.button>
            </div>

            {/* Visualization */}
            <div style={{
                background: 'rgba(0,0,0,0.3)',
                borderRadius: 16,
                padding: '1rem',
                marginBottom: '1rem',
            }}>
                <svg width="100%" height="200" viewBox="0 0 350 200" preserveAspectRatio="xMidYMid meet">
                    {/* Left carbon */}
                    <circle cx="120" cy="100" r="25" fill={isEthane ? '#22c55e' : '#8b5cf6'} />
                    <text x="120" y="105" textAnchor="middle" fill="white" fontWeight="bold" fontSize="14">C</text>

                    {/* Bond */}
                    <line x1="145" y1="100" x2="205" y2="100" stroke="white" strokeWidth="6" />
                    {!isEthane && (
                        <>
                            {/* Pi bond visualization */}
                            <motion.ellipse
                                cx="175"
                                cy="70"
                                rx={40}
                                ry={12}
                                fill={`rgba(139, 92, 246, ${piOverlapPercent / 100 * 0.5})`}
                                stroke="#8b5cf6"
                                strokeWidth="2"
                                animate={{
                                    ry: 12 * (piOverlapPercent / 100),
                                    opacity: piOverlapPercent / 100
                                }}
                            />
                            <motion.ellipse
                                cx="175"
                                cy="130"
                                rx={40}
                                ry={12}
                                fill={`rgba(139, 92, 246, ${piOverlapPercent / 100 * 0.5})`}
                                stroke="#8b5cf6"
                                strokeWidth="2"
                                animate={{
                                    ry: 12 * (piOverlapPercent / 100),
                                    opacity: piOverlapPercent / 100
                                }}
                            />
                        </>
                    )}

                    {/* Right carbon */}
                    <circle cx="230" cy="100" r="25" fill={isEthane ? '#22c55e' : '#8b5cf6'} />
                    <text x="230" y="105" textAnchor="middle" fill="white" fontWeight="bold" fontSize="14">C</text>

                    {/* Left hydrogens (fixed) */}
                    <g>
                        <line x1="120" y1="75" x2="120" y2="40" stroke="rgba(255,255,255,0.6)" strokeWidth="3" />
                        <circle cx="120" cy="35" r="12" fill="#3b82f6" />
                        <text x="120" y="39" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">H</text>

                        <line x1="100" y1="115" x2="75" y2="140" stroke="rgba(255,255,255,0.6)" strokeWidth="3" />
                        <circle cx="70" cy="145" r="12" fill="#3b82f6" />
                        <text x="70" y="149" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">H</text>

                        {isEthane && (
                            <>
                                <line x1="100" y1="85" x2="75" y2="60" stroke="rgba(255,255,255,0.6)" strokeWidth="3" />
                                <circle cx="70" cy="55" r="12" fill="#3b82f6" />
                                <text x="70" y="59" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">H</text>
                            </>
                        )}
                    </g>

                    {/* Right hydrogens (rotating) */}
                    <motion.g
                        animate={{ rotate: rotationAngle }}
                        style={{ transformOrigin: '230px 100px' }}
                    >
                        <line x1="230" y1="75" x2="230" y2="40" stroke="rgba(255,255,255,0.6)" strokeWidth="3" />
                        <circle cx="230" cy="35" r="12" fill="#f59e0b" />
                        <text x="230" y="39" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">H</text>

                        <line x1="250" y1="115" x2="275" y2="140" stroke="rgba(255,255,255,0.6)" strokeWidth="3" />
                        <circle cx="280" cy="145" r="12" fill="#f59e0b" />
                        <text x="280" y="149" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">H</text>

                        {isEthane && (
                            <>
                                <line x1="250" y1="85" x2="275" y2="60" stroke="rgba(255,255,255,0.6)" strokeWidth="3" />
                                <circle cx="280" cy="55" r="12" fill="#f59e0b" />
                                <text x="280" y="59" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">H</text>
                            </>
                        )}
                    </motion.g>

                    {/* Rotation indicator */}
                    <text x="175" y="185" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="12">
                        Rotation: {Math.round(rotationAngle)}°
                    </text>
                </svg>
            </div>

            {/* Rotation Slider */}
            <div style={{ marginBottom: '1.5rem' }}>
                <input
                    type="range"
                    min="0"
                    max={maxRotation}
                    value={rotationAngle}
                    onChange={(e) => setRotationAngle(Number(e.target.value))}
                    style={{
                        width: '100%',
                        height: 8,
                        borderRadius: 4,
                        background: `linear-gradient(to right, #22c55e, ${stress > 100 ? '#ef4444' : '#f59e0b'})`,
                        appearance: 'none',
                        cursor: 'pointer',
                    }}
                />
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.75rem',
                    color: 'rgba(255,255,255,0.5)',
                    marginTop: 4
                }}>
                    <span>0°</span>
                    <span>Drag to rotate →</span>
                    <span>{maxRotation}°</span>
                </div>
            </div>

            {/* Energy Meter */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
            }}>
                <div style={{
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: 12,
                    padding: '1rem',
                    textAlign: 'center',
                }}>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>
                        Energy Cost
                    </div>
                    <div style={{
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        color: stress > 100 ? '#ef4444' : stress > 50 ? '#f59e0b' : '#22c55e'
                    }}>
                        {Math.round(stress)} kJ/mol
                    </div>
                    <div style={{
                        height: 8,
                        background: 'rgba(255,255,255,0.1)',
                        borderRadius: 4,
                        marginTop: 8,
                        overflow: 'hidden'
                    }}>
                        <motion.div
                            animate={{ width: `${Math.min(100, stress / energyBarrier * 100)}%` }}
                            style={{
                                height: '100%',
                                background: stress > 100 ? '#ef4444' : stress > 50 ? '#f59e0b' : '#22c55e',
                                borderRadius: 4,
                            }}
                        />
                    </div>
                </div>

                <div style={{
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: 12,
                    padding: '1rem',
                    textAlign: 'center',
                }}>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>
                        {isEthane ? 'Conformation' : 'π Bond Overlap'}
                    </div>
                    {isEthane ? (
                        <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'white' }}>
                            {rotationAngle % 60 < 15 || rotationAngle % 60 > 45 ? 'Staggered ✓' : 'Eclipsed ⚠️'}
                        </div>
                    ) : (
                        <div style={{
                            fontSize: '1.5rem',
                            fontWeight: 700,
                            color: piOverlapPercent > 50 ? '#8b5cf6' : '#ef4444'
                        }}>
                            {Math.round(piOverlapPercent)}%
                        </div>
                    )}
                </div>
            </div>

            {/* Warning message for ethene */}
            {!isEthane && rotationAngle > 45 && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                        background: 'rgba(239, 68, 68, 0.2)',
                        border: '1px solid #ef4444',
                        borderRadius: 12,
                        padding: '1rem',
                        marginTop: '1rem',
                        textAlign: 'center',
                    }}
                >
                    <div style={{ color: '#ef4444', fontWeight: 700, fontSize: '1rem' }}>
                        ⚠️ π Bond Breaking!
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', marginTop: 4 }}>
                        This requires ~250 kJ/mol - the π bond is destroyed
                    </div>
                </motion.div>
            )}

            {/* Key insight */}
            <div style={{
                marginTop: '1rem',
                padding: '0.75rem',
                background: 'rgba(139, 92, 246, 0.1)',
                borderRadius: 8,
                fontSize: '0.8rem',
                color: 'rgba(255,255,255,0.7)',
                textAlign: 'center',
            }}>
                💡 {isEthane
                    ? 'Single bonds rotate freely (~12 kJ/mol barrier). At room temperature, rotation is rapid!'
                    : 'Double bonds cannot rotate because it would break the π bond overlap (250 kJ/mol barrier).'}
            </div>
        </motion.div>
    );
}
