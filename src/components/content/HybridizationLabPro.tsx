'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

// Dynamically import Hybridization3D for 3D visualization
const Hybridization3D = dynamic(() => import('../Hybridization3D'), {
    ssr: false,
    loading: () => (
        <div style={{
            height: '400px',
            background: 'rgba(0, 0, 0, 0.4)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--neutral-400)'
        }}>
            Loading 3D Visualization...
        </div>
    )
});

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface HybridizationData {
    id: 'sp3' | 'sp2' | 'sp';
    name: string;
    geometry: string;
    angle: number;
    groups: number;
    unhybridizedP: number;
    color: string;
    drugImpact: string;
    example: string;
    drugExample: string;
}

// ============================================================================
// DATA
// ============================================================================

const HYBRIDIZATION_DATA: HybridizationData[] = [
    {
        id: 'sp3',
        name: 'sp³',
        geometry: 'Tetrahedral',
        angle: 109.5,
        groups: 4,
        unhybridizedP: 0,
        color: '#3b82f6',
        drugImpact: 'Creates 3D "bulky" drugs that fill deep binding pockets',
        example: 'Methane (CH₄)',
        drugExample: 'Morphine'
    },
    {
        id: 'sp2',
        name: 'sp²',
        geometry: 'Trigonal Planar',
        angle: 120,
        groups: 3,
        unhybridizedP: 1,
        color: '#8b5cf6',
        drugImpact: 'Provides rigidity and π-π stacking interactions',
        example: 'Ethene (C₂H₄)',
        drugExample: 'Aspirin / Ibrutinib'
    },
    {
        id: 'sp',
        name: 'sp',
        geometry: 'Linear',
        angle: 180,
        groups: 2,
        unhybridizedP: 2,
        color: '#f59e0b',
        drugImpact: 'Creates rod-like structures for deep narrow pockets',
        example: 'Ethyne (C₂H₂)',
        drugExample: 'Erlotinib (EGFR inhibitor)'
    }
];

// ============================================================================
// GEOMETRY TOGGLE SIMULATION
// ============================================================================

function GeometryToggleSimulation() {
    const [bondCount, setBondCount] = useState(4);
    const [showAnimation, setShowAnimation] = useState(false);

    const getHybridization = () => {
        if (bondCount >= 4) return HYBRIDIZATION_DATA[0]; // sp³
        if (bondCount === 3) return HYBRIDIZATION_DATA[1]; // sp²
        return HYBRIDIZATION_DATA[2]; // sp
    };

    const current = getHybridization();

    const handleToggle = (newCount: number) => {
        setShowAnimation(true);
        setTimeout(() => {
            setBondCount(newCount);
            setShowAnimation(false);
        }, 300);
    };

    // Molecule visualizations as professional chemistry diagrams
    const renderMolecule = () => {
        // sp³ - Methane (CH₄) - Tetrahedral
        if (bondCount >= 4) {
            return (
                <svg viewBox="0 0 260 260" style={{ width: '100%', maxWidth: '280px' }}>
                    {/* Title */}
                    <text x="130" y="20" fill="#e2e8f0" fontSize="14" textAnchor="middle" fontWeight="700">
                        Methane (CH₄) - Tetrahedral
                    </text>

                    {/* Central Carbon */}
                    <circle cx="130" cy="130" r="24" fill="#3b82f6" />
                    <text x="130" y="137" fill="white" fontSize="16" textAnchor="middle" fontWeight="700">C</text>

                    {/* 4 Single bonds to H atoms in tetrahedral arrangement */}
                    {/* H1 - Top right */}
                    <line x1="148" y1="115" x2="190" y2="75" stroke="#64748b" strokeWidth="3" />
                    <circle cx="200" cy="65" r="14" fill="#94a3b8" />
                    <text x="200" y="70" fill="white" fontSize="12" textAnchor="middle" fontWeight="700">H</text>

                    {/* H2 - Top left */}
                    <line x1="112" y1="115" x2="70" y2="75" stroke="#64748b" strokeWidth="3" />
                    <circle cx="60" cy="65" r="14" fill="#94a3b8" />
                    <text x="60" y="70" fill="white" fontSize="12" textAnchor="middle" fontWeight="700">H</text>

                    {/* H3 - Bottom right */}
                    <line x1="148" y1="145" x2="190" y2="185" stroke="#64748b" strokeWidth="3" />
                    <circle cx="200" cy="195" r="14" fill="#94a3b8" />
                    <text x="200" y="200" fill="white" fontSize="12" textAnchor="middle" fontWeight="700">H</text>

                    {/* H4 - Bottom left */}
                    <line x1="112" y1="145" x2="70" y2="185" stroke="#64748b" strokeWidth="3" />
                    <circle cx="60" cy="195" r="14" fill="#94a3b8" />
                    <text x="60" y="200" fill="white" fontSize="12" textAnchor="middle" fontWeight="700">H</text>

                    {/* Bond angle indicator */}
                    <path d="M 130 130 L 170 110 A 20 20 0 0 0 150 100" stroke="#3b82f6" strokeWidth="2" fill="none" strokeDasharray="3" />
                    <text x="175" y="95" fill="#3b82f6" fontSize="11" fontWeight="600">109.5°</text>

                    {/* Info */}
                    <text x="130" y="245" fill="#3b82f6" fontSize="13" textAnchor="middle" fontWeight="700">
                        sp³ Hybridization • 4 σ bonds
                    </text>
                </svg>
            );
        }

        // sp² - Ethene (C₂H₄) - Trigonal Planar with Double Bond
        if (bondCount === 3) {
            return (
                <svg viewBox="0 0 300 260" style={{ width: '100%', maxWidth: '320px' }}>
                    {/* Title */}
                    <text x="150" y="20" fill="#e2e8f0" fontSize="14" textAnchor="middle" fontWeight="700">
                        Ethene (C₂H₄) - Double Bond
                    </text>

                    {/* Left Carbon */}
                    <circle cx="100" cy="130" r="22" fill="#8b5cf6" />
                    <text x="100" y="137" fill="white" fontSize="15" textAnchor="middle" fontWeight="700">C</text>

                    {/* Right Carbon */}
                    <circle cx="200" cy="130" r="22" fill="#8b5cf6" />
                    <text x="200" y="137" fill="white" fontSize="15" textAnchor="middle" fontWeight="700">C</text>

                    {/* C=C Double Bond (σ + π) */}
                    <line x1="122" y1="125" x2="178" y2="125" stroke="#e2e8f0" strokeWidth="4" />
                    <line x1="122" y1="135" x2="178" y2="135" stroke="#a78bfa" strokeWidth="4" />

                    {/* σ and π labels */}
                    <text x="150" y="118" fill="#e2e8f0" fontSize="10" textAnchor="middle" fontWeight="600">σ</text>
                    <text x="150" y="148" fill="#a78bfa" fontSize="10" textAnchor="middle" fontWeight="600">π</text>

                    {/* Left H atoms (2 H on left C) */}
                    <line x1="82" y1="115" x2="50" y2="80" stroke="#64748b" strokeWidth="2.5" />
                    <circle cx="42" cy="72" r="12" fill="#94a3b8" />
                    <text x="42" y="77" fill="white" fontSize="10" textAnchor="middle" fontWeight="700">H</text>

                    <line x1="82" y1="145" x2="50" y2="180" stroke="#64748b" strokeWidth="2.5" />
                    <circle cx="42" cy="188" r="12" fill="#94a3b8" />
                    <text x="42" y="193" fill="white" fontSize="10" textAnchor="middle" fontWeight="700">H</text>

                    {/* Right H atoms (2 H on right C) */}
                    <line x1="218" y1="115" x2="250" y2="80" stroke="#64748b" strokeWidth="2.5" />
                    <circle cx="258" cy="72" r="12" fill="#94a3b8" />
                    <text x="258" y="77" fill="white" fontSize="10" textAnchor="middle" fontWeight="700">H</text>

                    <line x1="218" y1="145" x2="250" y2="180" stroke="#64748b" strokeWidth="2.5" />
                    <circle cx="258" cy="188" r="12" fill="#94a3b8" />
                    <text x="258" y="193" fill="white" fontSize="10" textAnchor="middle" fontWeight="700">H</text>

                    {/* Bond angle indicator */}
                    <path d="M 100 130 L 80 100" stroke="#8b5cf6" strokeWidth="1.5" fill="none" strokeDasharray="3" />
                    <text x="55" y="108" fill="#8b5cf6" fontSize="11" fontWeight="600">120°</text>

                    {/* Planar indicator */}
                    <rect x="30" y="125" width="240" height="10" fill="rgba(139, 92, 246, 0.1)" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="3" rx="2" />
                    <text x="150" y="162" fill="#8b5cf6" fontSize="9" textAnchor="middle" opacity="0.8">planar molecule</text>

                    {/* Info */}
                    <text x="150" y="230" fill="#8b5cf6" fontSize="13" textAnchor="middle" fontWeight="700">
                        sp² Hybridization • 1σ + 1π (Double Bond)
                    </text>
                    <text x="150" y="248" fill="#94a3b8" fontSize="11" textAnchor="middle">
                        3 σ bonds per carbon + 1 unhybridized p orbital
                    </text>
                </svg>
            );
        }

        // sp - Ethyne (C₂H₂) - Linear with Triple Bond
        return (
            <svg viewBox="0 0 320 200" style={{ width: '100%', maxWidth: '340px' }}>
                {/* Title */}
                <text x="160" y="20" fill="#e2e8f0" fontSize="14" textAnchor="middle" fontWeight="700">
                    Ethyne / Acetylene (C₂H₂) - Triple Bond
                </text>

                {/* Left H */}
                <circle cx="40" cy="100" r="14" fill="#94a3b8" />
                <text x="40" y="105" fill="white" fontSize="12" textAnchor="middle" fontWeight="700">H</text>

                {/* H-C single bond */}
                <line x1="54" y1="100" x2="85" y2="100" stroke="#64748b" strokeWidth="3" />

                {/* Left Carbon */}
                <circle cx="105" cy="100" r="20" fill="#f59e0b" />
                <text x="105" y="107" fill="white" fontSize="14" textAnchor="middle" fontWeight="700">C</text>

                {/* C≡C Triple Bond (1σ + 2π) */}
                <line x1="125" y1="93" x2="175" y2="93" stroke="#e2e8f0" strokeWidth="3" />
                <line x1="125" y1="100" x2="175" y2="100" stroke="#fbbf24" strokeWidth="3" />
                <line x1="125" y1="107" x2="175" y2="107" stroke="#fbbf24" strokeWidth="3" />

                {/* Bond labels */}
                <text x="150" y="82" fill="#e2e8f0" fontSize="9" textAnchor="middle" fontWeight="600">σ</text>
                <text x="150" y="120" fill="#fbbf24" fontSize="9" textAnchor="middle" fontWeight="600">2π</text>

                {/* Right Carbon */}
                <circle cx="195" cy="100" r="20" fill="#f59e0b" />
                <text x="195" y="107" fill="white" fontSize="14" textAnchor="middle" fontWeight="700">C</text>

                {/* C-H single bond */}
                <line x1="215" y1="100" x2="246" y2="100" stroke="#64748b" strokeWidth="3" />

                {/* Right H */}
                <circle cx="260" cy="100" r="14" fill="#94a3b8" />
                <text x="260" y="105" fill="white" fontSize="12" textAnchor="middle" fontWeight="700">H</text>

                {/* Linear indicator (180°) */}
                <line x1="30" y1="100" x2="270" y2="100" stroke="#f59e0b" strokeWidth="1" strokeDasharray="5" opacity="0.5" />
                <text x="160" y="145" fill="#f59e0b" fontSize="11" textAnchor="middle" fontWeight="600">
                    180° (Linear)
                </text>

                {/* Info */}
                <text x="160" y="175" fill="#f59e0b" fontSize="13" textAnchor="middle" fontWeight="700">
                    sp Hybridization • 1σ + 2π (Triple Bond)
                </text>
                <text x="160" y="192" fill="#94a3b8" fontSize="11" textAnchor="middle">
                    2 σ bonds per carbon + 2 unhybridized p orbitals
                </text>
            </svg>
        );
    };

    return (
        <div style={{ padding: '1.5rem' }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1.5rem'
            }}>
                <span style={{ fontSize: '1.5rem' }}>🔄</span>
                <div>
                    <h4 style={{ color: '#e2e8f0', margin: 0 }}>Geometry Toggle Simulation</h4>
                    <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.85rem' }}>
                        Select hybridization to see the actual molecular structure with correct bond types
                    </p>
                </div>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1.2fr',
                gap: '2rem'
            }}>
                {/* Controls */}
                <div style={{
                    background: 'rgba(0, 0, 0, 0.4)',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                            Number of Groups Around Carbon:
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                            {[2, 3, 4].map(count => (
                                <motion.button
                                    key={count}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleToggle(count)}
                                    style={{
                                        flex: 1,
                                        padding: '1rem',
                                        background: bondCount === count
                                            ? `linear-gradient(135deg, ${current.color}, ${current.color}80)`
                                            : 'rgba(255, 255, 255, 0.05)',
                                        border: `2px solid ${bondCount === count ? current.color : 'rgba(255, 255, 255, 0.1)'}`,
                                        borderRadius: '12px',
                                        color: 'white',
                                        fontSize: '1.5rem',
                                        fontWeight: 700,
                                        cursor: 'pointer'
                                    }}
                                >
                                    {count}
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Current Hybridization Display */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            style={{
                                padding: '1.5rem',
                                background: `${current.color}15`,
                                borderRadius: '16px',
                                border: `2px solid ${current.color}40`
                            }}
                        >
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                marginBottom: '1rem'
                            }}>
                                <div style={{
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '50%',
                                    background: current.color,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontSize: '1.25rem',
                                    fontWeight: 700
                                }}>
                                    {current.name}
                                </div>
                                <div>
                                    <div style={{ color: '#e2e8f0', fontWeight: 700, fontSize: '1.2rem' }}>
                                        {current.geometry}
                                    </div>
                                    <div style={{ color: current.color, fontWeight: 600 }}>
                                        {current.angle}° Bond Angle
                                    </div>
                                </div>
                            </div>

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '0.75rem'
                            }}>
                                <div style={{
                                    padding: '0.75rem',
                                    background: 'rgba(0, 0, 0, 0.3)',
                                    borderRadius: '8px'
                                }}>
                                    <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>EXAMPLE</div>
                                    <div style={{ color: '#e2e8f0', fontWeight: 600 }}>{current.example}</div>
                                </div>
                                <div style={{
                                    padding: '0.75rem',
                                    background: 'rgba(0, 0, 0, 0.3)',
                                    borderRadius: '8px'
                                }}>
                                    <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>DRUG EXAMPLE</div>
                                    <div style={{ color: current.color, fontWeight: 600 }}>{current.drugExample}</div>
                                </div>
                            </div>

                            {/* Bond information */}
                            <div style={{
                                marginTop: '1rem',
                                padding: '0.75rem',
                                background: 'rgba(0, 0, 0, 0.3)',
                                borderRadius: '8px',
                                textAlign: 'center'
                            }}>
                                <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>BOND TYPES</div>
                                <div style={{ color: '#e2e8f0', fontWeight: 600, fontSize: '0.9rem' }}>
                                    {bondCount === 4 && 'All Single Bonds (σ only)'}
                                    {bondCount === 3 && 'Double Bond (1σ + 1π)'}
                                    {bondCount === 2 && 'Triple Bond (1σ + 2π)'}
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Visual Representation */}
                <div style={{
                    background: 'rgba(0, 0, 0, 0.4)',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={bondCount}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                        >
                            {renderMolecule()}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

// ============================================================================
// ADVANCED COMPARISON TABLE
// ============================================================================

function AdvancedComparisonTable() {
    const [selectedRow, setSelectedRow] = useState<string | null>(null);

    return (
        <div style={{ padding: '1.5rem' }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1.5rem'
            }}>
                <span style={{ fontSize: '1.5rem' }}>📊</span>
                <div>
                    <h4 style={{ color: '#e2e8f0', margin: 0 }}>Hybridization in Drug Discovery</h4>
                    <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.85rem' }}>
                        How molecular geometry affects drug design
                    </p>
                </div>
            </div>

            <div style={{
                background: 'rgba(0, 0, 0, 0.4)',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
                {/* Table Header */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '100px 150px 100px 1fr 150px',
                    padding: '1rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    gap: '0.5rem'
                }}>
                    <div style={{ color: '#94a3b8', fontWeight: 600, fontSize: '0.8rem' }}>HYBRID</div>
                    <div style={{ color: '#94a3b8', fontWeight: 600, fontSize: '0.8rem' }}>GEOMETRY</div>
                    <div style={{ color: '#94a3b8', fontWeight: 600, fontSize: '0.8rem' }}>ANGLE</div>
                    <div style={{ color: '#94a3b8', fontWeight: 600, fontSize: '0.8rem' }}>DRUG IMPACT</div>
                    <div style={{ color: '#94a3b8', fontWeight: 600, fontSize: '0.8rem' }}>EXAMPLE</div>
                </div>

                {/* Table Rows */}
                {HYBRIDIZATION_DATA.map((h, i) => (
                    <motion.div
                        key={h.id}
                        onClick={() => setSelectedRow(selectedRow === h.id ? null : h.id)}
                        whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '100px 150px 100px 1fr 150px',
                            padding: '1rem',
                            borderBottom: i < HYBRIDIZATION_DATA.length - 1 ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
                            cursor: 'pointer',
                            gap: '0.5rem',
                            background: selectedRow === h.id ? `${h.color}15` : 'transparent'
                        }}
                    >
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            <div style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                background: h.color,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontSize: '0.8rem',
                                fontWeight: 700
                            }}>
                                {h.name}
                            </div>
                        </div>
                        <div style={{ color: '#e2e8f0', display: 'flex', alignItems: 'center' }}>
                            {h.geometry}
                        </div>
                        <div style={{ color: h.color, fontWeight: 700, display: 'flex', alignItems: 'center' }}>
                            {h.angle}°
                        </div>
                        <div style={{ color: '#cbd5e1', fontSize: '0.9rem', display: 'flex', alignItems: 'center' }}>
                            {h.drugImpact}
                        </div>
                        <div style={{ color: h.color, fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                            {h.drugExample}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Educational Note */}
            <div style={{
                marginTop: '1.5rem',
                padding: '1rem',
                background: 'rgba(59, 130, 246, 0.1)',
                borderRadius: '12px',
                border: '1px solid rgba(59, 130, 246, 0.3)'
            }}>
                <div style={{ color: '#60a5fa', fontWeight: 600, marginBottom: '0.5rem' }}>
                    💡 Why Geometry Matters
                </div>
                <div style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    Drug-receptor binding is like a <strong style={{ color: '#e2e8f0' }}>lock and key</strong>.
                    The drug&apos;s 3D shape (determined by hybridization) must precisely match the receptor&apos;s binding pocket.
                    A <strong style={{ color: '#3b82f6' }}>sp³</strong> carbon creates a tetrahedral "bulge" that can fill deep pockets,
                    while <strong style={{ color: '#8b5cf6' }}>sp²</strong> creates flat structures that can stack with aromatic amino acids.
                </div>
            </div>
        </div>
    );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function HybridizationLabPro() {
    const [activeTab, setActiveTab] = useState<'3d' | 'toggle' | 'table'>('3d');

    const tabs = [
        { id: '3d', label: '3D Orbitals', icon: '🔮' },
        { id: 'toggle', label: 'Geometry Toggle', icon: '🔄' },
        { id: 'table', label: 'Drug Impact', icon: '📊' }
    ];

    return (
        <div style={{
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.98) 100%)',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            overflow: 'hidden'
        }}>
            {/* Header */}
            <div style={{
                padding: '1.5rem 2rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '1.75rem' }}>🔬</span>
                    <div>
                        <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'white', margin: 0 }}>
                            Interactive Hybridization Laboratory
                        </h3>
                        <p style={{ color: 'var(--neutral-400)', margin: '0.25rem 0 0', fontSize: '0.9rem' }}>
                            Explore orbital mixing, molecular geometry, and drug design connections
                        </p>
                    </div>
                </div>
            </div>

            {/* Tab Navigation */}
            <div style={{
                display: 'flex',
                gap: '0.5rem',
                padding: '1rem 2rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                overflowX: 'auto'
            }}>
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as typeof activeTab)}
                        style={{
                            padding: '0.75rem 1.25rem',
                            background: activeTab === tab.id
                                ? 'linear-gradient(135deg, #3b82f6, #8b5cf6)'
                                : 'rgba(255, 255, 255, 0.05)',
                            border: activeTab === tab.id ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '12px',
                            color: activeTab === tab.id ? 'white' : 'var(--neutral-400)',
                            fontSize: '0.9rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        <span>{tab.icon}</span>
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content */}
            <AnimatePresence mode="wait">
                {activeTab === '3d' && (
                    <motion.div
                        key="3d"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        style={{ padding: '1.5rem' }}
                    >
                        <Hybridization3D title="Orbital Hybridization Explorer" />
                    </motion.div>
                )}

                {activeTab === 'toggle' && (
                    <motion.div
                        key="toggle"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <GeometryToggleSimulation />
                    </motion.div>
                )}

                {activeTab === 'table' && (
                    <motion.div
                        key="table"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <AdvancedComparisonTable />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
