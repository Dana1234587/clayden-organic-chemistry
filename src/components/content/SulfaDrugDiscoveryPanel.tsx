'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Functional group data for each molecule
interface FunctionalGroup {
    id: string;
    name: string;
    symbol: string;
    color: string;
    role: string;
    drugEffect: string;
}

interface SulfaMolecule {
    id: string;
    name: string;
    formula: string;
    mw: number;
    color: string;
    role: string;
    discoverer: string;
    year: string;
    functionalGroups: FunctionalGroup[];
}

const SULFA_MOLECULES: SulfaMolecule[] = [
    {
        id: 'prontosil',
        name: 'Prontosil',
        formula: 'C₁₂H₁₃N₅O₂S',
        mw: 291.33,
        color: '#dc2626',
        role: 'First commercially available antibacterial drug',
        discoverer: 'Gerhard Domagk',
        year: '1935',
        functionalGroups: [
            {
                id: 'azo',
                name: 'Azo Group',
                symbol: '-N=N-',
                color: '#f97316',
                role: 'Chromophore - Gives red color',
                drugEffect: 'Metabolized in the body, releasing the active drug Sulfanilamide'
            },
            {
                id: 'sulfonamide',
                name: 'Sulfonamide',
                symbol: '-SO₂NH₂',
                color: '#10b981',
                role: 'Active antibacterial group',
                drugEffect: 'Inhibits bacterial dihydropteroate synthase enzyme'
            },
            {
                id: 'amine1',
                name: 'Primary Amine',
                symbol: '-NH₂',
                color: '#3b82f6',
                role: 'Aromatic amine from dye chemistry',
                drugEffect: 'Essential for enzyme binding and selectivity'
            },
            {
                id: 'amine2',
                name: 'Diamine Group',
                symbol: '-NH₂ (triazene)',
                color: '#8b5cf6',
                role: 'Auxochrome - enhances color',
                drugEffect: 'Increases water solubility for injection'
            }
        ]
    },
    {
        id: 'sulfanilamide',
        name: 'Sulfanilamide',
        formula: 'C₆H₈N₂O₂S',
        mw: 172.20,
        color: '#10b981',
        role: 'The TRUE antibiotic - active metabolite of Prontosil',
        discoverer: 'Jacques & Thérèse Tréfouël',
        year: '1935',
        functionalGroups: [
            {
                id: 'sulfonamide',
                name: 'Sulfonamide',
                symbol: '-SO₂NH₂',
                color: '#10b981',
                role: 'Active antibacterial group',
                drugEffect: 'Competitively inhibits bacterial dihydropteroate synthase'
            },
            {
                id: 'para-amino',
                name: 'Para-Amino',
                symbol: 'p-NH₂',
                color: '#3b82f6',
                role: 'Mimics PABA structure',
                drugEffect: 'Tricks bacteria into incorporating drug instead of PABA'
            },
            {
                id: 'benzene',
                name: 'Benzene Ring',
                symbol: 'C₆H₄',
                color: '#8b5cf6',
                role: 'Aromatic core scaffold',
                drugEffect: 'Provides rigidity and proper spacing for enzyme binding'
            }
        ]
    }
];

// Interactive SVG for Prontosil
function ProntosilSVG({ hoveredGroup, onHover }: { hoveredGroup: string | null; onHover: (id: string | null) => void }) {
    return (
        <svg viewBox="0 0 400 200" style={{ width: '100%', height: '100%', maxHeight: '280px' }}>
            <defs>
                <linearGradient id="prontosilBg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1e293b" />
                    <stop offset="100%" stopColor="#0f172a" />
                </linearGradient>
            </defs>

            {/* Background */}
            <rect x="0" y="0" width="400" height="200" fill="url(#prontosilBg)" rx="12" />

            {/* Left benzene ring with diamine */}
            <g
                style={{ cursor: 'pointer' }}
                onClick={() => onHover(hoveredGroup === 'amine2' ? null : 'amine2')}
            >
                <polygon
                    points="60,100 80,85 110,85 130,100 110,115 80,115"
                    fill={hoveredGroup === 'amine2' ? '#8b5cf620' : 'transparent'}
                    stroke={hoveredGroup === 'amine2' ? '#8b5cf6' : '#64748b'}
                    strokeWidth="2"
                />
                {/* NH2 groups */}
                <text x="45" y="90" fill={hoveredGroup === 'amine2' ? '#8b5cf6' : '#94a3b8'} fontSize="12" fontWeight="bold">H₂N</text>
                <text x="45" y="120" fill={hoveredGroup === 'amine2' ? '#8b5cf6' : '#94a3b8'} fontSize="12" fontWeight="bold">H₂N</text>
                <line x1="60" y1="85" x2="70" y2="90" stroke={hoveredGroup === 'amine2' ? '#8b5cf6' : '#64748b'} strokeWidth="2" />
                <line x1="60" y1="115" x2="70" y2="110" stroke={hoveredGroup === 'amine2' ? '#8b5cf6' : '#64748b'} strokeWidth="2" />
            </g>

            {/* Azo linkage N=N */}
            <g
                style={{ cursor: 'pointer' }}
                onClick={() => onHover(hoveredGroup === 'azo' ? null : 'azo')}
            >
                <rect
                    x="140" y="85" width="50" height="30"
                    fill={hoveredGroup === 'azo' ? '#f9731620' : 'transparent'}
                    stroke={hoveredGroup === 'azo' ? '#f97316' : 'transparent'}
                    strokeWidth="2"
                    rx="4"
                />
                <text x="152" y="105" fill={hoveredGroup === 'azo' ? '#f97316' : '#f97316'} fontSize="16" fontWeight="bold">N=N</text>
                <line x1="130" y1="100" x2="145" y2="100" stroke={hoveredGroup === 'azo' ? '#f97316' : '#64748b'} strokeWidth="2" />
                <line x1="185" y1="100" x2="200" y2="100" stroke={hoveredGroup === 'azo' ? '#f97316' : '#64748b'} strokeWidth="2" />
            </g>

            {/* Right benzene ring */}
            <g
                style={{ cursor: 'pointer' }}
                onClick={() => onHover(hoveredGroup === 'amine1' ? null : 'amine1')}
            >
                <polygon
                    points="200,100 220,85 250,85 270,100 250,115 220,115"
                    fill={hoveredGroup === 'amine1' ? '#3b82f620' : 'transparent'}
                    stroke={hoveredGroup === 'amine1' ? '#3b82f6' : '#64748b'}
                    strokeWidth="2"
                />
            </g>

            {/* Sulfonamide group */}
            <g
                style={{ cursor: 'pointer' }}
                onClick={() => onHover(hoveredGroup === 'sulfonamide' ? null : 'sulfonamide')}
            >
                <rect
                    x="280" y="75" width="100" height="50"
                    fill={hoveredGroup === 'sulfonamide' ? '#10b98120' : 'transparent'}
                    stroke={hoveredGroup === 'sulfonamide' ? '#10b981' : 'transparent'}
                    strokeWidth="2"
                    rx="6"
                />
                <line x1="270" y1="100" x2="290" y2="100" stroke={hoveredGroup === 'sulfonamide' ? '#10b981' : '#64748b'} strokeWidth="2" />
                <text x="295" y="90" fill={hoveredGroup === 'sulfonamide' ? '#10b981' : '#94a3b8'} fontSize="14" fontWeight="bold">SO₂</text>
                <text x="295" y="115" fill={hoveredGroup === 'sulfonamide' ? '#10b981' : '#94a3b8'} fontSize="14" fontWeight="bold">NH₂</text>
            </g>

            {/* Labels */}
            <text x="200" y="25" textAnchor="middle" fill="#dc2626" fontSize="16" fontWeight="bold">Prontosil</text>
            <text x="200" y="180" textAnchor="middle" fill="#64748b" fontSize="11">Click on any group to highlight</text>
        </svg>
    );
}

// Interactive SVG for Sulfanilamide
function SulfanilamideSVG({ hoveredGroup, onHover }: { hoveredGroup: string | null; onHover: (id: string | null) => void }) {
    return (
        <svg viewBox="0 0 300 200" style={{ width: '100%', height: '100%', maxHeight: '280px' }}>
            <defs>
                <linearGradient id="sulfaBg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1e293b" />
                    <stop offset="100%" stopColor="#0f172a" />
                </linearGradient>
            </defs>

            {/* Background */}
            <rect x="0" y="0" width="300" height="200" fill="url(#sulfaBg)" rx="12" />

            {/* Para-amino group (top) */}
            <g
                style={{ cursor: 'pointer' }}
                onClick={() => onHover(hoveredGroup === 'para-amino' ? null : 'para-amino')}
            >
                <rect
                    x="110" y="25" width="50" height="30"
                    fill={hoveredGroup === 'para-amino' ? '#3b82f620' : 'transparent'}
                    stroke={hoveredGroup === 'para-amino' ? '#3b82f6' : 'transparent'}
                    strokeWidth="2"
                    rx="4"
                />
                <text x="120" y="45" fill={hoveredGroup === 'para-amino' ? '#3b82f6' : '#3b82f6'} fontSize="14" fontWeight="bold">H₂N</text>
                <line x1="135" y1="55" x2="135" y2="70" stroke={hoveredGroup === 'para-amino' ? '#3b82f6' : '#64748b'} strokeWidth="2" />
            </g>

            {/* Benzene ring */}
            <g
                style={{ cursor: 'pointer' }}
                onClick={() => onHover(hoveredGroup === 'benzene' ? null : 'benzene')}
            >
                <polygon
                    points="135,70 165,85 165,115 135,130 105,115 105,85"
                    fill={hoveredGroup === 'benzene' ? '#8b5cf620' : 'transparent'}
                    stroke={hoveredGroup === 'benzene' ? '#8b5cf6' : '#64748b'}
                    strokeWidth="2"
                />
                {/* Inner circle for aromaticity */}
                <circle cx="135" cy="100" r="20" fill="none" stroke={hoveredGroup === 'benzene' ? '#8b5cf6' : '#64748b'} strokeWidth="1" strokeDasharray="4,2" />
            </g>

            {/* Sulfonamide group (bottom) */}
            <g
                style={{ cursor: 'pointer' }}
                onClick={() => onHover(hoveredGroup === 'sulfonamide' ? null : 'sulfonamide')}
            >
                <line x1="135" y1="130" x2="135" y2="145" stroke={hoveredGroup === 'sulfonamide' ? '#10b981' : '#64748b'} strokeWidth="2" />
                <rect
                    x="100" y="145" width="70" height="45"
                    fill={hoveredGroup === 'sulfonamide' ? '#10b98120' : 'transparent'}
                    stroke={hoveredGroup === 'sulfonamide' ? '#10b981' : 'transparent'}
                    strokeWidth="2"
                    rx="6"
                />
                <text x="110" y="165" fill={hoveredGroup === 'sulfonamide' ? '#10b981' : '#10b981'} fontSize="14" fontWeight="bold">SO₂NH₂</text>
            </g>

            {/* Labels */}
            <text x="150" y="18" textAnchor="middle" fill="#10b981" fontSize="16" fontWeight="bold">Sulfanilamide</text>

            {/* Annotation arrows */}
            <text x="215" y="100" fill="#64748b" fontSize="10">← Benzene</text>
            <text x="190" y="170" fill="#64748b" fontSize="10">Sulfonamide</text>
        </svg>
    );
}

export default function SulfaDrugDiscoveryPanel() {
    const [selectedMolecule, setSelectedMolecule] = useState<SulfaMolecule>(SULFA_MOLECULES[0]);
    const [hoveredGroup, setHoveredGroup] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'structure' | 'mechanism' | 'history'>('structure');

    const selectedGroup = selectedMolecule.functionalGroups.find(g => g.id === hoveredGroup);

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
                background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <span style={{ fontSize: '1.75rem' }}>🧬</span>
                            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'white', margin: 0 }}>
                                Sulfa Drug Discovery
                            </h3>
                        </div>
                        <p style={{ color: 'var(--neutral-400)', margin: '0.25rem 0 0 2.5rem', fontSize: '0.9rem' }}>
                            Click on functional groups in the structure to explore
                        </p>
                    </div>
                    <div style={{
                        display: 'flex',
                        gap: '0.5rem',
                        padding: '0.25rem',
                        background: 'rgba(0, 0, 0, 0.3)',
                        borderRadius: '12px'
                    }}>
                        {['structure', 'mechanism', 'history'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab as any)}
                                style={{
                                    padding: '0.5rem 1rem',
                                    background: activeTab === tab ? 'var(--primary-500)' : 'transparent',
                                    border: 'none',
                                    borderRadius: '8px',
                                    color: activeTab === tab ? 'white' : 'var(--neutral-400)',
                                    fontSize: '0.85rem',
                                    fontWeight: 500,
                                    cursor: 'pointer',
                                    textTransform: 'capitalize'
                                }}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Molecule Selector */}
            <div style={{
                display: 'flex',
                gap: '1rem',
                padding: '1rem 2rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
            }}>
                {SULFA_MOLECULES.map(mol => (
                    <motion.button
                        key={mol.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                            setSelectedMolecule(mol);
                            setHoveredGroup(null);
                        }}
                        style={{
                            flex: 1,
                            padding: '1rem 1.5rem',
                            background: selectedMolecule.id === mol.id
                                ? `linear-gradient(135deg, ${mol.color}20 0%, ${mol.color}10 100%)`
                                : 'rgba(255, 255, 255, 0.02)',
                            border: selectedMolecule.id === mol.id
                                ? `2px solid ${mol.color}`
                                : '2px solid rgba(255, 255, 255, 0.05)',
                            borderRadius: '16px',
                            cursor: 'pointer',
                            textAlign: 'left'
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{
                                width: 48,
                                height: 48,
                                borderRadius: '12px',
                                background: `${mol.color}20`,
                                border: `2px solid ${mol.color}`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.5rem'
                            }}>
                                {mol.id === 'prontosil' ? '🔴' : '💊'}
                            </div>
                            <div>
                                <div style={{
                                    color: selectedMolecule.id === mol.id ? mol.color : 'var(--neutral-200)',
                                    fontWeight: 700,
                                    fontSize: '1.1rem'
                                }}>
                                    {mol.name}
                                </div>
                                <div style={{
                                    color: 'var(--neutral-500)',
                                    fontSize: '0.85rem',
                                    marginTop: '0.15rem'
                                }}>
                                    {mol.formula} • {mol.mw} g/mol
                                </div>
                            </div>
                        </div>
                    </motion.button>
                ))}
            </div>

            {/* Main Content */}
            <div style={{ padding: '1.5rem 2rem' }}>
                {activeTab === 'structure' && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem' }}>
                        {/* Interactive 2D Structure */}
                        <div>
                            <h4 style={{
                                color: 'var(--neutral-300)',
                                marginBottom: '1rem',
                                fontSize: '0.95rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}>
                                📐 Interactive 2D Structure
                                <span style={{
                                    fontSize: '0.75rem',
                                    color: 'var(--neutral-500)',
                                    fontWeight: 400
                                }}>
                                    (click groups to highlight)
                                </span>
                            </h4>

                            <div style={{
                                background: 'rgba(0, 0, 0, 0.3)',
                                borderRadius: '16px',
                                padding: '1rem',
                                border: `2px solid ${selectedMolecule.color}30`
                            }}>
                                {selectedMolecule.id === 'prontosil' ? (
                                    <ProntosilSVG
                                        hoveredGroup={hoveredGroup}
                                        onHover={setHoveredGroup}
                                    />
                                ) : (
                                    <SulfanilamideSVG
                                        hoveredGroup={hoveredGroup}
                                        onHover={setHoveredGroup}
                                    />
                                )}
                            </div>

                            {/* Selected Group Info */}
                            <AnimatePresence mode="wait">
                                {selectedGroup && (
                                    <motion.div
                                        key={selectedGroup.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        style={{
                                            marginTop: '1rem',
                                            padding: '1.25rem',
                                            background: `${selectedGroup.color}15`,
                                            borderRadius: '16px',
                                            border: `2px solid ${selectedGroup.color}50`
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                                            <div style={{
                                                padding: '0.5rem 1rem',
                                                background: selectedGroup.color,
                                                borderRadius: '8px',
                                                color: 'white',
                                                fontWeight: 700,
                                                fontSize: '0.9rem'
                                            }}>
                                                {selectedGroup.symbol}
                                            </div>
                                            <div style={{ color: 'white', fontWeight: 600, fontSize: '1.1rem' }}>
                                                {selectedGroup.name}
                                            </div>
                                        </div>
                                        <p style={{
                                            color: 'var(--neutral-300)',
                                            margin: '0 0 0.5rem',
                                            fontSize: '0.9rem',
                                            lineHeight: 1.6
                                        }}>
                                            <strong style={{ color: selectedGroup.color }}>Role:</strong> {selectedGroup.role}
                                        </p>
                                        <p style={{
                                            color: 'var(--neutral-300)',
                                            margin: 0,
                                            fontSize: '0.9rem',
                                            lineHeight: 1.6
                                        }}>
                                            <strong style={{ color: selectedGroup.color }}>Drug Effect:</strong> {selectedGroup.drugEffect}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Functional Groups List */}
                        <div>
                            <h4 style={{
                                color: 'var(--neutral-300)',
                                marginBottom: '1rem',
                                fontSize: '0.95rem'
                            }}>
                                🔬 Functional Groups
                            </h4>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {selectedMolecule.functionalGroups.map((group, idx) => (
                                    <motion.div
                                        key={group.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        onClick={() => setHoveredGroup(hoveredGroup === group.id ? null : group.id)}
                                        style={{
                                            padding: '1rem',
                                            background: hoveredGroup === group.id
                                                ? `${group.color}15`
                                                : 'rgba(255, 255, 255, 0.03)',
                                            borderRadius: '12px',
                                            border: `2px solid ${hoveredGroup === group.id ? group.color : 'rgba(255, 255, 255, 0.05)'}`,
                                            cursor: 'pointer',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <div style={{
                                                width: 40,
                                                height: 40,
                                                borderRadius: '10px',
                                                background: `${group.color}30`,
                                                border: `2px solid ${group.color}`,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontWeight: 700,
                                                fontSize: '0.7rem',
                                                color: group.color
                                            }}>
                                                {group.symbol.slice(0, 4)}
                                            </div>
                                            <div>
                                                <div style={{ color: hoveredGroup === group.id ? group.color : 'white', fontWeight: 600 }}>
                                                    {group.name}
                                                </div>
                                                <div style={{ color: 'var(--neutral-500)', fontSize: '0.8rem' }}>
                                                    {group.role.slice(0, 40)}...
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Molecule Info Card */}
                            <div style={{
                                marginTop: '1.5rem',
                                padding: '1.25rem',
                                background: 'rgba(0, 0, 0, 0.3)',
                                borderRadius: '16px',
                                border: '1px solid rgba(255, 255, 255, 0.1)'
                            }}>
                                <div style={{
                                    color: selectedMolecule.color,
                                    fontWeight: 600,
                                    fontSize: '0.85rem',
                                    marginBottom: '0.5rem'
                                }}>
                                    💡 Key Insight
                                </div>
                                <p style={{
                                    color: 'var(--neutral-300)',
                                    fontSize: '0.85rem',
                                    lineHeight: 1.6,
                                    margin: 0
                                }}>
                                    {selectedMolecule.role}
                                </p>
                                <div style={{
                                    marginTop: '0.75rem',
                                    paddingTop: '0.75rem',
                                    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    fontSize: '0.8rem',
                                    color: 'var(--neutral-500)'
                                }}>
                                    <span>Discovered: {selectedMolecule.year}</span>
                                    <span>By: {selectedMolecule.discoverer}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'mechanism' && (
                    <div style={{
                        padding: '2rem',
                        background: 'rgba(0, 0, 0, 0.2)',
                        borderRadius: '16px',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚗️</div>
                        <h4 style={{ color: 'white', marginBottom: '1rem' }}>Mechanism of Action</h4>
                        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '1rem',
                                marginBottom: '1.5rem'
                            }}>
                                <div style={{ padding: '1rem', background: '#dc262620', borderRadius: '12px', border: '2px solid #dc2626' }}>
                                    <div style={{ color: '#dc2626', fontWeight: 700 }}>Prontosil</div>
                                    <div style={{ color: 'var(--neutral-400)', fontSize: '0.8rem' }}>Inactive Prodrug</div>
                                </div>
                                <div style={{ color: '#f97316', fontSize: '1.5rem' }}>→</div>
                                <div style={{ padding: '1rem', background: '#10b98120', borderRadius: '12px', border: '2px solid #10b981' }}>
                                    <div style={{ color: '#10b981', fontWeight: 700 }}>Sulfanilamide</div>
                                    <div style={{ color: 'var(--neutral-400)', fontSize: '0.8rem' }}>Active Drug</div>
                                </div>
                            </div>
                            <p style={{ color: 'var(--neutral-300)', lineHeight: 1.7 }}>
                                In the body, the <strong style={{ color: '#f97316' }}>Azo bond (N=N)</strong> is cleaved by
                                intestinal bacteria, releasing <strong style={{ color: '#10b981' }}>Sulfanilamide</strong> —
                                which mimics PABA and inhibits bacterial folic acid synthesis.
                            </p>
                        </div>
                    </div>
                )}

                {activeTab === 'history' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {[
                            { year: '1850s', title: 'Dye Industry Boom', desc: 'German companies like Bayer start producing synthetic dyes from coal tar' },
                            { year: '1900s', title: 'Magic Bullet Theory', desc: 'Paul Ehrlich proposes that chemicals can selectively target pathogens' },
                            { year: '1932', title: 'Prontosil Discovery', desc: 'Gerhard Domagk tests red azo dye on mice with bacterial infections' },
                            { year: '1935', title: 'Clinical Success', desc: 'Prontosil saves lives, including Domagk\'s own daughter from streptococcal infection' },
                            { year: '1935', title: 'Active Metabolite Found', desc: 'French scientists discover Sulfanilamide is the true active compound' }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                style={{
                                    display: 'flex',
                                    gap: '1rem',
                                    padding: '1rem',
                                    background: 'rgba(0, 0, 0, 0.2)',
                                    borderRadius: '12px',
                                    border: '1px solid rgba(255, 255, 255, 0.05)'
                                }}
                            >
                                <div style={{
                                    minWidth: '70px',
                                    padding: '0.5rem',
                                    background: 'var(--primary-500)',
                                    borderRadius: '8px',
                                    textAlign: 'center',
                                    color: 'white',
                                    fontWeight: 700,
                                    fontSize: '0.9rem'
                                }}>
                                    {item.year}
                                </div>
                                <div>
                                    <div style={{ color: 'white', fontWeight: 600 }}>{item.title}</div>
                                    <div style={{ color: 'var(--neutral-400)', fontSize: '0.9rem' }}>{item.desc}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
