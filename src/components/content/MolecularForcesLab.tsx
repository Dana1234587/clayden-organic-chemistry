'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ============================================================================
// MOLECULAR FORCES LAB
// Understanding the Forces that Govern Drug-Receptor Interactions
// ============================================================================

// Import the existing components
import MolecularForceSimulator from './MolecularForceSimulator';

// ============================================================================
// BOND TYPE COMPARISON LAB (moved from AdvancedDrugLab)
// ============================================================================

function BondTypeLab() {
    const [selectedBondType, setSelectedBondType] = useState<'ionic' | 'covalent'>('covalent');

    return (
        <div style={{ padding: '1.5rem' }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1.5rem'
            }}>
                <span style={{ fontSize: '1.5rem' }}>⚗️</span>
                <div>
                    <h4 style={{ color: '#e2e8f0', margin: 0 }}>Bond Type Comparison Lab</h4>
                    <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.85rem' }}>
                        How bond type affects drug design
                    </p>
                </div>
            </div>

            {/* Bond Type Selector */}
            <div style={{
                display: 'flex',
                gap: '1rem',
                marginBottom: '1.5rem'
            }}>
                {(['ionic', 'covalent'] as const).map(type => (
                    <motion.button
                        key={type}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedBondType(type)}
                        style={{
                            flex: 1,
                            padding: '1.5rem',
                            background: selectedBondType === type
                                ? type === 'ionic'
                                    ? 'linear-gradient(135deg, #f59e0b, #d97706)'
                                    : 'linear-gradient(135deg, #3b82f6, #2563eb)'
                                : 'rgba(255, 255, 255, 0.05)',
                            border: 'none',
                            borderRadius: '16px',
                            cursor: 'pointer',
                            textAlign: 'center' as const
                        }}
                    >
                        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                            {type === 'ionic' ? '⚡' : '🔗'}
                        </div>
                        <div style={{ color: 'white', fontWeight: 700, textTransform: 'capitalize' as const }}>
                            {type} Bonding
                        </div>
                        <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                            {type === 'ionic' ? 'Electron transfer' : 'Electron sharing'}
                        </div>
                    </motion.button>
                ))}
            </div>

            {/* Bond Visualization */}
            <div style={{
                background: 'rgba(0, 0, 0, 0.4)',
                borderRadius: '16px',
                padding: '2rem',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '200px'
            }}>
                <AnimatePresence mode="wait">
                    {selectedBondType === 'ionic' ? (
                        <motion.div
                            key="ionic"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            style={{ textAlign: 'center' as const }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                                <div style={{
                                    width: '80px',
                                    height: '80px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontWeight: 700,
                                    fontSize: '1.5rem'
                                }}>
                                    Na⁺
                                </div>
                                <motion.div
                                    animate={{ x: [0, 10, 0] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                    style={{ fontSize: '2rem' }}
                                >
                                    ⚡
                                </motion.div>
                                <div style={{
                                    width: '80px',
                                    height: '80px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontWeight: 700,
                                    fontSize: '1.5rem'
                                }}>
                                    Cl⁻
                                </div>
                            </div>
                            <div style={{ color: '#f59e0b', marginTop: '1rem', fontWeight: 600 }}>
                                IONIC: Complete electron transfer
                            </div>
                            <div style={{ color: '#94a3b8', marginTop: '0.5rem', fontSize: '0.85rem' }}>
                                Example: Lithium salts (psychiatric drugs)
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="covalent"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            style={{ textAlign: 'center' as const }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <div style={{
                                    width: '80px',
                                    height: '80px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #6b7280, #4b5563)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontWeight: 700,
                                    fontSize: '1.5rem'
                                }}>
                                    C
                                </div>
                                <motion.div
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                    style={{
                                        width: '60px',
                                        height: '8px',
                                        background: 'linear-gradient(90deg, #6b7280, #ef4444, #6b7280)',
                                        borderRadius: '4px'
                                    }}
                                />
                                <div style={{
                                    width: '80px',
                                    height: '80px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontWeight: 700,
                                    fontSize: '1.5rem'
                                }}>
                                    O
                                </div>
                            </div>
                            <div style={{ color: '#3b82f6', marginTop: '1rem', fontWeight: 600 }}>
                                COVALENT: Electron sharing
                            </div>
                            <div style={{ color: '#94a3b8', marginTop: '0.5rem', fontSize: '0.85rem' }}>
                                Example: Aspirin (ester + carboxylic acid)
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Drug Impact Box */}
            <div style={{
                marginTop: '1.5rem',
                padding: '1rem',
                background: 'rgba(139, 92, 246, 0.1)',
                borderRadius: '12px',
                border: '1px solid rgba(139, 92, 246, 0.3)'
            }}>
                <div style={{ color: '#a78bfa', fontWeight: 600, marginBottom: '0.5rem' }}>
                    🎯 Drug Design Impact
                </div>
                <div style={{ color: '#e2e8f0', fontSize: '0.85rem', lineHeight: 1.6 }}>
                    {selectedBondType === 'ionic' ? (
                        <>
                            <strong>Ionic drugs</strong> (like Lithium) work by altering ion concentrations.
                            They&apos;re water-soluble but may have off-target effects.
                        </>
                    ) : (
                        <>
                            <strong>Covalent drugs</strong> (like Aspirin) form specific bonds with target proteins.
                            Most small-molecule drugs use covalent bonding within the molecule.
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

// ============================================================================
// VAN DER WAALS FORCES VISUALIZATION
// ============================================================================

function VanDerWaalsLab() {
    const [distance, setDistance] = useState(4);
    const [showForce, setShowForce] = useState(false);

    // Calculate VdW force (simplified)
    const calculateForce = () => {
        const sigma = 2.5; // Å
        const epsilon = 0.1; // kcal/mol
        const r = distance;
        return 4 * epsilon * ((sigma / r) ** 12 - (sigma / r) ** 6);
    };

    const force = calculateForce();
    const forceType = force > 0 ? 'repulsive' : 'attractive';
    const forceMagnitude = Math.abs(force);

    return (
        <div style={{ padding: '1.5rem' }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1.5rem'
            }}>
                <span style={{ fontSize: '1.5rem' }}>🔮</span>
                <div>
                    <h4 style={{ color: '#e2e8f0', margin: 0 }}>Van der Waals Forces</h4>
                    <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.85rem' }}>
                        Weak but essential for molecular recognition
                    </p>
                </div>
            </div>

            {/* Distance Control */}
            <div style={{
                background: 'rgba(0, 0, 0, 0.4)',
                borderRadius: '16px',
                padding: '1.5rem',
                marginBottom: '1.5rem',
                border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
                        Intermolecular Distance: <strong style={{ color: '#e2e8f0' }}>{distance.toFixed(1)} Å</strong>
                    </label>
                    <input
                        type="range"
                        min="2"
                        max="8"
                        step="0.1"
                        value={distance}
                        onChange={(e) => setDistance(parseFloat(e.target.value))}
                        style={{
                            width: '100%',
                            marginTop: '0.5rem',
                            accentColor: '#8b5cf6'
                        }}
                    />
                </div>

                {/* Visual Representation */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: `${distance * 15}px`,
                    minHeight: '120px',
                    transition: 'gap 0.3s ease'
                }}>
                    <motion.div
                        animate={{
                            scale: forceType === 'repulsive' ? [1, 1.1, 1] : 1,
                            boxShadow: forceType === 'repulsive'
                                ? '0 0 30px rgba(239, 68, 68, 0.5)'
                                : '0 0 30px rgba(34, 197, 94, 0.5)'
                        }}
                        transition={{ duration: 0.5, repeat: forceType === 'repulsive' ? Infinity : 0 }}
                        style={{
                            width: '70px',
                            height: '70px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: 700,
                            fontSize: '1.25rem'
                        }}
                    >
                        Drug
                    </motion.div>

                    <motion.div
                        animate={{
                            scale: forceType === 'repulsive' ? [1, 1.1, 1] : 1
                        }}
                        transition={{ duration: 0.5, repeat: forceType === 'repulsive' ? Infinity : 0 }}
                        style={{
                            width: '90px',
                            height: '90px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: 700,
                            fontSize: '1rem'
                        }}
                    >
                        Receptor
                    </motion.div>
                </div>

                {/* Force Display */}
                <div style={{
                    marginTop: '1rem',
                    padding: '1rem',
                    background: forceType === 'repulsive'
                        ? 'rgba(239, 68, 68, 0.1)'
                        : 'rgba(34, 197, 94, 0.1)',
                    borderRadius: '12px',
                    border: `1px solid ${forceType === 'repulsive' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(34, 197, 94, 0.3)'}`,
                    textAlign: 'center' as const
                }}>
                    <div style={{
                        color: forceType === 'repulsive' ? '#ef4444' : '#22c55e',
                        fontWeight: 700,
                        fontSize: '1.1rem'
                    }}>
                        {forceType === 'repulsive' ? '↔️ Repulsive Force' : '↔️ Attractive Force'}
                    </div>
                    <div style={{ color: '#e2e8f0', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                        Magnitude: {forceMagnitude.toFixed(3)} kcal/mol
                    </div>
                </div>
            </div>

            {/* Explanation */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1rem'
            }}>
                <div style={{
                    padding: '1rem',
                    background: 'rgba(239, 68, 68, 0.1)',
                    borderRadius: '12px',
                    border: '1px solid rgba(239, 68, 68, 0.3)'
                }}>
                    <div style={{ color: '#ef4444', fontWeight: 600, marginBottom: '0.5rem' }}>
                        ⚠️ Too Close (&lt;3Å)
                    </div>
                    <div style={{ color: '#e2e8f0', fontSize: '0.85rem' }}>
                        Electron clouds overlap → Strong repulsion prevents binding
                    </div>
                </div>
                <div style={{
                    padding: '1rem',
                    background: 'rgba(34, 197, 94, 0.1)',
                    borderRadius: '12px',
                    border: '1px solid rgba(34, 197, 94, 0.3)'
                }}>
                    <div style={{ color: '#22c55e', fontWeight: 600, marginBottom: '0.5rem' }}>
                        ✓ Optimal (3-4Å)
                    </div>
                    <div style={{ color: '#e2e8f0', fontSize: '0.85rem' }}>
                        Perfect balance → Maximum binding affinity (ΔG favorable)
                    </div>
                </div>
            </div>

            {/* Clinical Relevance */}
            <div style={{
                marginTop: '1.5rem',
                padding: '1rem',
                background: 'rgba(139, 92, 246, 0.1)',
                borderRadius: '12px',
                border: '1px solid rgba(139, 92, 246, 0.3)'
            }}>
                <div style={{ color: '#a78bfa', fontWeight: 600, marginBottom: '0.5rem' }}>
                    💊 Clinical Relevance
                </div>
                <div style={{ color: '#e2e8f0', fontSize: '0.85rem', lineHeight: 1.6 }}>
                    Van der Waals forces are critical for <strong>LogP optimization</strong> (Lipinski Rule 5).
                    Hydrophobic packing between drug and protein contributes ~0.5-1.5 kcal/mol per contact.
                    This adds up to significant binding affinity in deep enzyme pockets!
                </div>
            </div>
        </div>
    );
}

// ============================================================================
// HYDROGEN BONDING LAB
// ============================================================================

function HydrogenBondingLab() {
    const [showWater, setShowWater] = useState(false);
    const [bondStrength] = useState(5);

    return (
        <div style={{ padding: '1.5rem' }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1.5rem'
            }}>
                <span style={{ fontSize: '1.5rem' }}>💧</span>
                <div>
                    <h4 style={{ color: '#e2e8f0', margin: 0 }}>Hydrogen Bonding</h4>
                    <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.85rem' }}>
                        The key to drug specificity
                    </p>
                </div>
            </div>

            {/* H-Bond Visualization */}
            <div style={{
                background: 'rgba(0, 0, 0, 0.4)',
                borderRadius: '16px',
                padding: '2rem',
                marginBottom: '1.5rem',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                textAlign: 'center' as const
            }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                    {/* Donor */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                    }}>
                        <div style={{
                            width: '60px',
                            height: '60px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: 700
                        }}>
                            N
                        </div>
                        <div style={{ color: 'white', fontWeight: 700, fontSize: '1.25rem' }}>—</div>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #e2e8f0, #cbd5e1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#1e293b',
                            fontWeight: 700,
                            fontSize: '0.9rem'
                        }}>
                            H
                        </div>
                    </div>

                    {/* H-Bond */}
                    <motion.div
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        style={{
                            width: '60px',
                            borderTop: '3px dashed #22c55e',
                            margin: '0 0.5rem'
                        }}
                    />

                    {/* Acceptor */}
                    <div style={{
                        width: '70px',
                        height: '70px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 700,
                        fontSize: '1.25rem'
                    }}>
                        O
                    </div>
                </div>

                <div style={{ color: '#22c55e', marginTop: '1.5rem', fontWeight: 600 }}>
                    N-H ⋯ O=C Hydrogen Bond
                </div>
                <div style={{ color: '#94a3b8', marginTop: '0.5rem', fontSize: '0.85rem' }}>
                    Strength: ~{bondStrength} kcal/mol | Distance: 2.7-3.3 Å | Angle: 150-180°
                </div>
            </div>

            {/* H-Bond Types Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1rem',
                marginBottom: '1.5rem'
            }}>
                {[
                    { type: 'Strong', strength: '5-10', example: 'F-H⋯F⁻', color: '#ef4444' },
                    { type: 'Moderate', strength: '2-5', example: 'N-H⋯O=C', color: '#f59e0b' },
                    { type: 'Weak', strength: '0.5-2', example: 'C-H⋯O', color: '#22c55e' }
                ].map(bond => (
                    <div key={bond.type} style={{
                        padding: '1rem',
                        background: `${bond.color}15`,
                        borderRadius: '12px',
                        border: `1px solid ${bond.color}40`,
                        textAlign: 'center' as const
                    }}>
                        <div style={{ color: bond.color, fontWeight: 700, marginBottom: '0.25rem' }}>
                            {bond.type}
                        </div>
                        <div style={{ color: '#e2e8f0', fontSize: '0.85rem' }}>
                            {bond.strength} kcal/mol
                        </div>
                        <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginTop: '0.5rem' }}>
                            {bond.example}
                        </div>
                    </div>
                ))}
            </div>

            {/* Drug Design Impact */}
            <div style={{
                padding: '1rem',
                background: 'rgba(139, 92, 246, 0.1)',
                borderRadius: '12px',
                border: '1px solid rgba(139, 92, 246, 0.3)'
            }}>
                <div style={{ color: '#a78bfa', fontWeight: 600, marginBottom: '0.5rem' }}>
                    🎯 Drug Design: The H-Bond Count Rule
                </div>
                <div style={{ color: '#e2e8f0', fontSize: '0.85rem', lineHeight: 1.6 }}>
                    <strong>Lipinski&apos;s Rule of 5:</strong>
                    <ul style={{ margin: '0.5rem 0', paddingLeft: '1.25rem' }}>
                        <li>≤5 H-bond donors (OH, NH)</li>
                        <li>≤10 H-bond acceptors (O, N)</li>
                    </ul>
                    Too many H-bonds = poor membrane permeability = poor oral bioavailability!
                </div>
            </div>
        </div>
    );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function MolecularForcesLab() {
    const [activeTab, setActiveTab] = useState<'overview' | 'bonds' | 'hbonds' | 'vdw' | 'simulator'>('overview');

    const tabs = [
        { id: 'overview', label: 'Overview', icon: '📚' },
        { id: 'bonds', label: 'Bond Types', icon: '⚡' },
        { id: 'hbonds', label: 'H-Bonds', icon: '💧' },
        { id: 'vdw', label: 'Van der Waals', icon: '🔮' },
        { id: 'simulator', label: 'Force Simulator', icon: '🎮' }
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
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(16, 185, 129, 0.15) 100%)',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
            }}>
                <span style={{ fontSize: '2rem' }}>⚡</span>
                <div>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'white', margin: 0 }}>
                        Molecular Forces Laboratory
                    </h3>
                    <p style={{ color: 'var(--neutral-400)', margin: '0.25rem 0 0', fontSize: '0.9rem' }}>
                        Understanding the Forces that Govern Drug-Receptor Interactions
                    </p>
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
                    <motion.button
                        key={tab.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setActiveTab(tab.id as typeof activeTab)}
                        style={{
                            padding: '0.6rem 1.2rem',
                            background: activeTab === tab.id
                                ? 'linear-gradient(135deg, #8b5cf6, #10b981)'
                                : 'rgba(255,255,255,0.08)',
                            border: activeTab === tab.id ? 'none' : '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '10px',
                            color: 'white',
                            fontWeight: 600,
                            fontSize: '0.85rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            whiteSpace: 'nowrap' as const
                        }}
                    >
                        <span>{tab.icon}</span>
                        {tab.label}
                    </motion.button>
                ))}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
                {activeTab === 'overview' && (
                    <motion.div
                        key="overview"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ padding: '2rem' }}
                    >
                        <div style={{ textAlign: 'center' as const, marginBottom: '2rem' }}>
                            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>⚛️</div>
                            <h4 style={{ color: '#e2e8f0', fontSize: '1.25rem', margin: 0 }}>
                                The Four Pillars of Molecular Binding
                            </h4>
                            <p style={{ color: '#94a3b8', margin: '0.5rem 0 0' }}>
                                Understanding these forces is essential for rational drug design
                            </p>
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: '1.5rem'
                        }}>
                            {[
                                {
                                    icon: '⚡',
                                    title: 'Ionic & Covalent Bonds',
                                    strength: '40-110 kcal/mol',
                                    description: 'Strong bonds formed by electron transfer or sharing',
                                    color: '#ef4444'
                                },
                                {
                                    icon: '💧',
                                    title: 'Hydrogen Bonds',
                                    strength: '2-10 kcal/mol',
                                    description: 'Directional bonds between H-donors and acceptors',
                                    color: '#3b82f6'
                                },
                                {
                                    icon: '🔮',
                                    title: 'Van der Waals',
                                    strength: '0.5-1 kcal/mol',
                                    description: 'Weak but numerous - add up for surface fit',
                                    color: '#22c55e'
                                },
                                {
                                    icon: '🌊',
                                    title: 'Hydrophobic Effect',
                                    strength: 'Entropy-driven',
                                    description: 'Water exclusion drives binding in aqueous environment',
                                    color: '#f59e0b'
                                }
                            ].map(force => (
                                <motion.div
                                    key={force.title}
                                    whileHover={{ scale: 1.02, y: -5 }}
                                    style={{
                                        padding: '1.5rem',
                                        background: `${force.color}10`,
                                        borderRadius: '16px',
                                        border: `1px solid ${force.color}40`,
                                        cursor: 'pointer'
                                    }}
                                >
                                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{force.icon}</div>
                                    <div style={{ color: force.color, fontWeight: 700, marginBottom: '0.25rem' }}>
                                        {force.title}
                                    </div>
                                    <div style={{ color: '#e2e8f0', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                                        {force.description}
                                    </div>
                                    <div style={{
                                        color: '#94a3b8',
                                        fontSize: '0.75rem',
                                        padding: '0.25rem 0.5rem',
                                        background: 'rgba(255,255,255,0.05)',
                                        borderRadius: '4px',
                                        display: 'inline-block'
                                    }}>
                                        {force.strength}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Key Concept */}
                        <div style={{
                            marginTop: '2rem',
                            padding: '1.5rem',
                            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(16, 185, 129, 0.1))',
                            borderRadius: '16px',
                            border: '1px solid rgba(139, 92, 246, 0.3)'
                        }}>
                            <div style={{ color: '#a78bfa', fontWeight: 700, marginBottom: '0.5rem' }}>
                                🎓 Key Concept: ΔG = ΔH - TΔS
                            </div>
                            <div style={{ color: '#e2e8f0', fontSize: '0.9rem', lineHeight: 1.7 }}>
                                Drug binding is driven by <strong>Gibbs free energy</strong>. Each molecular force contributes
                                to ΔG. A typical drug might have IC₅₀ in nanomolar range, corresponding to ΔG ≈ -10 to -15 kcal/mol.
                                This is achieved by combining multiple weak interactions!
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'bonds' && (
                    <motion.div key="bonds" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <BondTypeLab />
                    </motion.div>
                )}

                {activeTab === 'hbonds' && (
                    <motion.div key="hbonds" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <HydrogenBondingLab />
                    </motion.div>
                )}

                {activeTab === 'vdw' && (
                    <motion.div key="vdw" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <VanDerWaalsLab />
                    </motion.div>
                )}

                {activeTab === 'simulator' && (
                    <motion.div key="simulator" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <MolecularForceSimulator />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
