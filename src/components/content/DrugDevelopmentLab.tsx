'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface FunctionalGroup {
    id: string;
    name: string;
    nameAr: string;
    symbol: string;
    color: string;
    pkaDelta: number;
    logPDelta: number;
    duration: string;
    durationHours: number;
    clinicalUse: string;
    clinicalUseAr: string;
    position: 'N1' | 'N4' | 'ring';
    description: string;
}

interface SulfaDrug {
    id: string;
    name: string;
    class: string;
    classAr: string;
    modification: string;
    duration: string;
    durationHours: string;
    clinicalUse: string;
    clinicalUseAr: string;
    color: string;
    icon: string;
}

// ============================================================================
// DATA
// ============================================================================

const SULFA_FAMILY: SulfaDrug[] = [
    {
        id: 'sulfisoxazole',
        name: 'Sulfisoxazole',
        class: 'Short-Acting',
        classAr: 'قصيرة المفعول',
        modification: 'Isoxazole ring',
        duration: '~6 hours',
        durationHours: '6h',
        clinicalUse: 'Acute urinary tract infections',
        clinicalUseAr: 'التهابات المسالك البولية الحادة',
        color: '#3b82f6',
        icon: '⚡'
    },
    {
        id: 'sulfamethoxazole',
        name: 'Sulfamethoxazole',
        class: 'Medium-Acting',
        classAr: 'متوسطة المفعول',
        modification: 'Methyl-isoxazole',
        duration: '~12 hours',
        durationHours: '12h',
        clinicalUse: 'The "Joker" - Combined with Trimethoprim (Bactrim)',
        clinicalUseAr: '"الجوكر" - يُستخدم مع التريميثوبريم (Bactrim)',
        color: '#10b981',
        icon: '🃏'
    },
    {
        id: 'sulfadoxine',
        name: 'Sulfadoxine',
        class: 'Long-Acting',
        classAr: 'طويلة المفعول',
        modification: 'Methoxy-pyrimidine',
        duration: '100+ hours',
        durationHours: '100h+',
        clinicalUse: 'Malaria prevention (Fansidar)',
        clinicalUseAr: 'الوقاية من الملاريا (Fansidar)',
        color: '#8b5cf6',
        icon: '🦟'
    },
    {
        id: 'silver-sulfadiazine',
        name: 'Silver Sulfadiazine',
        class: 'Topical',
        classAr: 'موضعية',
        modification: 'Silver atom / Polar groups',
        duration: 'Surface action',
        durationHours: 'Topical',
        clinicalUse: 'Burn wound infection prevention',
        clinicalUseAr: 'كريمات الحروق لمنع العدوى الجلدية',
        color: '#94a3b8',
        icon: '🔥'
    },
    {
        id: 'sulfasalazine',
        name: 'Sulfasalazine',
        class: 'Gut-Acting (Prodrug)',
        classAr: 'معوية (طليعة دواء)',
        modification: 'Azo-link (N=N)',
        duration: 'Gut-specific',
        durationHours: 'GI',
        clinicalUse: 'Ulcerative Colitis treatment',
        clinicalUseAr: 'علاج مرض القولون التقرحي',
        color: '#f97316',
        icon: '🎯'
    }
];

const FUNCTIONAL_GROUPS: FunctionalGroup[] = [
    {
        id: 'isoxazole',
        name: 'Isoxazole Ring',
        nameAr: 'حلقة إيزوكسازول',
        symbol: 'Isoxazole',
        color: '#3b82f6',
        pkaDelta: -0.8,
        logPDelta: 0.3,
        duration: 'Short (6h)',
        durationHours: 6,
        clinicalUse: 'UTI Treatment',
        clinicalUseAr: 'علاج التهابات المسالك',
        position: 'N1',
        description: 'Increases water solubility, rapid excretion'
    },
    {
        id: 'methyl-isoxazole',
        name: 'Methyl-Isoxazole',
        nameAr: 'ميثيل-إيزوكسازول',
        symbol: 'Me-Isoxazole',
        color: '#10b981',
        pkaDelta: -0.5,
        logPDelta: 0.6,
        duration: 'Medium (12h)',
        durationHours: 12,
        clinicalUse: 'Systemic Infections',
        clinicalUseAr: 'عدوى جهازية',
        position: 'N1',
        description: 'Balanced solubility and half-life'
    },
    {
        id: 'methoxy-pyrimidine',
        name: 'Methoxy-Pyrimidine',
        nameAr: 'ميثوكسي-بيريميدين',
        symbol: 'OMe-Pyr',
        color: '#8b5cf6',
        pkaDelta: 0.3,
        logPDelta: 1.2,
        duration: 'Long (100h+)',
        durationHours: 100,
        clinicalUse: 'Malaria Prevention',
        clinicalUseAr: 'الوقاية من الملاريا',
        position: 'N1',
        description: 'High lipophilicity, slow metabolism'
    },
    {
        id: 'silver',
        name: 'Silver Atom',
        nameAr: 'ذرة الفضة',
        symbol: 'Ag⁺',
        color: '#94a3b8',
        pkaDelta: 0,
        logPDelta: -2.0,
        duration: 'Topical',
        durationHours: 0,
        clinicalUse: 'Burn Cream',
        clinicalUseAr: 'كريم الحروق',
        position: 'N1',
        description: 'No systemic absorption, local antimicrobial'
    },
    {
        id: 'azo-link',
        name: 'Azo Linkage',
        nameAr: 'رابطة آزو',
        symbol: 'N=N',
        color: '#f97316',
        pkaDelta: 0,
        logPDelta: 0.8,
        duration: 'Gut-specific',
        durationHours: 0,
        clinicalUse: 'Colon Delivery',
        clinicalUseAr: 'توصيل للقولون',
        position: 'N4',
        description: 'Prodrug - cleaved by gut bacteria'
    }
];

// ============================================================================
// SULFANILAMIDE CORE SVG
// ============================================================================

function SulfanilamideCore({
    selectedGroup,
    onGroupSelect,
    highlightN1
}: {
    selectedGroup: FunctionalGroup | null;
    onGroupSelect: (group: FunctionalGroup | null) => void;
    highlightN1: boolean;
}) {
    return (
        <svg viewBox="0 0 400 300" style={{ width: '100%', height: '100%', maxHeight: '300px' }}>
            <defs>
                <linearGradient id="coreBg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1e293b" />
                    <stop offset="100%" stopColor="#0f172a" />
                </linearGradient>
                <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* Background */}
            <rect x="0" y="0" width="400" height="300" fill="url(#coreBg)" rx="16" />

            {/* Title */}
            <text x="200" y="30" textAnchor="middle" fill="#e2e8f0" fontSize="16" fontWeight="bold">
                Sulfanilamide Core Structure
            </text>

            {/* N4 - Para amino group (top) */}
            <g>
                <text x="200" y="70" textAnchor="middle" fill="#3b82f6" fontSize="14" fontWeight="bold">
                    H₂N — (N⁴)
                </text>
                <line x1="200" y1="75" x2="200" y2="95" stroke="#64748b" strokeWidth="2" />
            </g>

            {/* Benzene ring */}
            <polygon
                points="200,95 235,115 235,155 200,175 165,155 165,115"
                fill="transparent"
                stroke="#64748b"
                strokeWidth="2"
            />
            <circle cx="200" cy="135" r="25" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="4,2" />

            {/* Bond to sulfonamide */}
            <line x1="200" y1="175" x2="200" y2="195" stroke="#64748b" strokeWidth="2" />

            {/* Sulfonamide group */}
            <g>
                <text x="200" y="215" textAnchor="middle" fill="#10b981" fontSize="14" fontWeight="bold">
                    SO₂
                </text>
                <line x1="200" y1="220" x2="200" y2="235" stroke="#64748b" strokeWidth="2" />
            </g>

            {/* N1 position - HIGHLIGHT for modification */}
            <g
                style={{ cursor: 'pointer' }}
                onClick={() => onGroupSelect(null)}
            >
                <circle
                    cx="200"
                    cy="255"
                    r="20"
                    fill={highlightN1 ? '#f97316' + '30' : 'transparent'}
                    stroke={highlightN1 ? '#f97316' : selectedGroup ? selectedGroup.color : '#f97316'}
                    strokeWidth="2"
                    strokeDasharray={highlightN1 && !selectedGroup ? "5,3" : "0"}
                    filter={highlightN1 ? "url(#glow)" : "none"}
                />
                <text
                    x="200"
                    y="260"
                    textAnchor="middle"
                    fill={selectedGroup ? selectedGroup.color : '#f97316'}
                    fontSize="12"
                    fontWeight="bold"
                >
                    {selectedGroup ? selectedGroup.symbol : 'N¹H₂'}
                </text>
            </g>

            {/* Labels */}
            <text x="280" y="135" fill="#64748b" fontSize="11">← Benzene Ring</text>
            <text x="280" y="215" fill="#10b981" fontSize="11">← Sulfonamide</text>
            <text x="280" y="255" fill="#f97316" fontSize="11">← N¹ Position</text>
            <text x="45" y="255" textAnchor="end" fill="#f97316" fontSize="10">(Modify here!)</text>

            {/* Instruction */}
            <text x="200" y="290" textAnchor="middle" fill="#94a3b8" fontSize="11">
                Select a functional group to modify N¹ position
            </text>
        </svg>
    );
}

// ============================================================================
// PROPERTIES PANEL
// ============================================================================

function PropertiesPanel({
    baseValues,
    selectedGroup
}: {
    baseValues: { pKa: number; logP: number };
    selectedGroup: FunctionalGroup | null;
}) {
    const newPka = selectedGroup ? baseValues.pKa + selectedGroup.pkaDelta : baseValues.pKa;
    const newLogP = selectedGroup ? baseValues.logP + selectedGroup.logPDelta : baseValues.logP;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
                background: 'rgba(0, 0, 0, 0.4)',
                borderRadius: '16px',
                padding: '1.25rem',
                border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
        >
            <h4 style={{
                color: '#e2e8f0',
                marginBottom: '1rem',
                fontSize: '0.95rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
            }}>
                📊 Real-Time Properties
            </h4>

            {/* pKa */}
            <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>pKₐ (Acidity)</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ color: '#64748b', fontSize: '0.8rem' }}>{baseValues.pKa.toFixed(1)}</span>
                        {selectedGroup && (
                            <>
                                <span style={{ color: '#f97316' }}>→</span>
                                <motion.span
                                    key={newPka}
                                    initial={{ scale: 1.2 }}
                                    animate={{ scale: 1 }}
                                    style={{
                                        color: selectedGroup.pkaDelta < 0 ? '#3b82f6' : '#ef4444',
                                        fontWeight: 700
                                    }}
                                >
                                    {newPka.toFixed(1)} {selectedGroup.pkaDelta < 0 ? '▼' : '▲'}
                                </motion.span>
                            </>
                        )}
                    </div>
                </div>
                <div style={{
                    height: '8px',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '4px',
                    overflow: 'hidden'
                }}>
                    <motion.div
                        animate={{ width: `${((newPka - 4) / 4) * 100}%` }}
                        style={{
                            height: '100%',
                            background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
                            borderRadius: '4px'
                        }}
                    />
                </div>
            </div>

            {/* LogP */}
            <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>LogP (Lipophilicity)</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ color: '#64748b', fontSize: '0.8rem' }}>{baseValues.logP.toFixed(1)}</span>
                        {selectedGroup && (
                            <>
                                <span style={{ color: '#f97316' }}>→</span>
                                <motion.span
                                    key={newLogP}
                                    initial={{ scale: 1.2 }}
                                    animate={{ scale: 1 }}
                                    style={{
                                        color: selectedGroup.logPDelta > 0 ? '#10b981' : '#3b82f6',
                                        fontWeight: 700
                                    }}
                                >
                                    {newLogP.toFixed(1)} {selectedGroup.logPDelta > 0 ? '▲' : '▼'}
                                </motion.span>
                            </>
                        )}
                    </div>
                </div>
                <div style={{
                    height: '8px',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '4px',
                    overflow: 'hidden'
                }}>
                    <motion.div
                        animate={{ width: `${((newLogP + 2) / 4) * 100}%` }}
                        style={{
                            height: '100%',
                            background: 'linear-gradient(90deg, #10b981, #f97316)',
                            borderRadius: '4px'
                        }}
                    />
                </div>
            </div>

            {/* Duration & Use */}
            {selectedGroup && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    style={{
                        padding: '1rem',
                        background: `${selectedGroup.color}15`,
                        borderRadius: '12px',
                        border: `1px solid ${selectedGroup.color}40`
                    }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Duration</span>
                        <span style={{ color: selectedGroup.color, fontWeight: 600 }}>{selectedGroup.duration}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Clinical Use</span>
                        <span style={{ color: selectedGroup.color, fontWeight: 600, fontSize: '0.85rem' }}>{selectedGroup.clinicalUse}</span>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
}

// ============================================================================
// SYNERGY DIAGRAM
// ============================================================================

function SynergyDiagram() {
    const [step, setStep] = useState(0);

    return (
        <div style={{ padding: '1.5rem' }}>
            <h4 style={{
                color: '#e2e8f0',
                marginBottom: '1.5rem',
                textAlign: 'center',
                fontSize: '1.1rem'
            }}>
                ⚡ Sequential Blockade: The Masterstroke
            </h4>

            {/* Pathway visualization */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                marginBottom: '2rem',
                flexWrap: 'wrap'
            }}>
                {/* PABA */}
                <motion.div
                    animate={{ opacity: step >= 0 ? 1 : 0.3 }}
                    style={{
                        padding: '0.75rem 1rem',
                        background: 'rgba(59, 130, 246, 0.2)',
                        borderRadius: '12px',
                        border: '2px solid #3b82f6',
                        textAlign: 'center'
                    }}
                >
                    <div style={{ color: '#3b82f6', fontWeight: 700, fontSize: '0.9rem' }}>PABA</div>
                    <div style={{ color: '#64748b', fontSize: '0.7rem' }}>Substrate</div>
                </motion.div>

                <motion.div animate={{ opacity: step >= 1 ? 1 : 0.3 }} style={{ color: '#64748b', fontSize: '1.5rem' }}>→</motion.div>

                {/* Step 1 - Dihydropteroate Synthase */}
                <motion.div
                    animate={{
                        opacity: step >= 1 ? 1 : 0.3,
                        scale: step === 1 ? 1.05 : 1
                    }}
                    style={{
                        padding: '0.75rem 1rem',
                        background: step >= 1 ? 'rgba(220, 38, 38, 0.2)' : 'rgba(255,255,255,0.05)',
                        borderRadius: '12px',
                        border: `2px solid ${step >= 1 ? '#dc2626' : '#64748b'}`,
                        textAlign: 'center',
                        position: 'relative'
                    }}
                >
                    <div style={{ color: step >= 1 ? '#dc2626' : '#94a3b8', fontWeight: 700, fontSize: '0.85rem' }}>Step 1</div>
                    <div style={{ color: '#64748b', fontSize: '0.7rem' }}>DHPS Enzyme</div>
                    {step >= 1 && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{
                                position: 'absolute',
                                top: '-25px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                background: '#dc2626',
                                color: 'white',
                                padding: '2px 8px',
                                borderRadius: '6px',
                                fontSize: '0.7rem',
                                fontWeight: 600,
                                whiteSpace: 'nowrap'
                            }}
                        >
                            🚫 Sulfonamide Block
                        </motion.div>
                    )}
                </motion.div>

                <motion.div animate={{ opacity: step >= 2 ? 1 : 0.3 }} style={{ color: '#64748b', fontSize: '1.5rem' }}>→</motion.div>

                {/* Step 2 - DHFR */}
                <motion.div
                    animate={{
                        opacity: step >= 2 ? 1 : 0.3,
                        scale: step === 2 ? 1.05 : 1
                    }}
                    style={{
                        padding: '0.75rem 1rem',
                        background: step >= 2 ? 'rgba(139, 92, 246, 0.2)' : 'rgba(255,255,255,0.05)',
                        borderRadius: '12px',
                        border: `2px solid ${step >= 2 ? '#8b5cf6' : '#64748b'}`,
                        textAlign: 'center',
                        position: 'relative'
                    }}
                >
                    <div style={{ color: step >= 2 ? '#8b5cf6' : '#94a3b8', fontWeight: 700, fontSize: '0.85rem' }}>Step 2</div>
                    <div style={{ color: '#64748b', fontSize: '0.7rem' }}>DHFR Enzyme</div>
                    {step >= 2 && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{
                                position: 'absolute',
                                top: '-25px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                background: '#8b5cf6',
                                color: 'white',
                                padding: '2px 8px',
                                borderRadius: '6px',
                                fontSize: '0.7rem',
                                fontWeight: 600,
                                whiteSpace: 'nowrap'
                            }}
                        >
                            🚫 Trimethoprim Block
                        </motion.div>
                    )}
                </motion.div>

                <motion.div animate={{ opacity: step >= 3 ? 1 : 0.3 }} style={{ color: '#64748b', fontSize: '1.5rem' }}>→</motion.div>

                {/* Folic Acid */}
                <motion.div
                    animate={{
                        opacity: step >= 3 ? 0.3 : step >= 0 ? 1 : 0.3,
                        scale: step >= 3 ? 0.9 : 1
                    }}
                    style={{
                        padding: '0.75rem 1rem',
                        background: step >= 3 ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.2)',
                        borderRadius: '12px',
                        border: `2px solid ${step >= 3 ? '#ef4444' : '#10b981'}`,
                        textAlign: 'center'
                    }}
                >
                    <div style={{
                        color: step >= 3 ? '#ef4444' : '#10b981',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        textDecoration: step >= 3 ? 'line-through' : 'none'
                    }}>
                        Folic Acid
                    </div>
                    <div style={{ color: '#64748b', fontSize: '0.7rem' }}>
                        {step >= 3 ? '❌ Blocked!' : 'DNA Synthesis'}
                    </div>
                </motion.div>
            </div>

            {/* Step controls */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                {[0, 1, 2, 3].map(s => (
                    <button
                        key={s}
                        onClick={() => setStep(s)}
                        style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            border: `2px solid ${step === s ? '#f97316' : '#64748b'}`,
                            background: step === s ? '#f97316' : 'transparent',
                            color: step === s ? 'white' : '#94a3b8',
                            fontWeight: 700,
                            cursor: 'pointer'
                        }}
                    >
                        {s}
                    </button>
                ))}
            </div>

            {/* Equation */}
            {step === 3 && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{
                        padding: '1.5rem',
                        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(139, 92, 246, 0.2))',
                        borderRadius: '16px',
                        textAlign: 'center',
                        border: '2px solid rgba(16, 185, 129, 0.5)'
                    }}
                >
                    <div style={{ color: '#e2e8f0', fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                        The Equation of Success:
                    </div>
                    <div style={{
                        color: '#10b981',
                        fontSize: '1.3rem',
                        fontWeight: 700,
                        fontFamily: 'monospace'
                    }}>
                        Sulfonamide + Trimethoprim = 100% Bacterial Death
                    </div>
                </motion.div>
            )}
        </div>
    );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function DrugDevelopmentLab() {
    const [activeTab, setActiveTab] = useState<'portfolio' | 'build' | 'pkpd' | 'synergy'>('portfolio');
    const [selectedGroup, setSelectedGroup] = useState<FunctionalGroup | null>(null);

    const baseValues = { pKa: 6.5, logP: 0.9 }; // Sulfanilamide base values

    const tabs = [
        { id: 'portfolio', label: 'Sulfa Portfolio', icon: '📊' },
        { id: 'build', label: 'Build-a-Sulfa', icon: '🎮' },
        { id: 'pkpd', label: 'PK/PD Basics', icon: '💊' },
        { id: 'synergy', label: 'Synergy Lab', icon: '⚡' }
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
                background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <span style={{ fontSize: '1.75rem' }}>🧪</span>
                            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'white', margin: 0 }}>
                                The Molecular Upgrade Lab
                            </h3>
                        </div>
                        <p style={{ color: 'var(--neutral-400)', margin: '0.25rem 0 0 2.5rem', fontSize: '0.9rem' }}>
                            Master drug development through functional group engineering
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
                        onClick={() => setActiveTab(tab.id as any)}
                        style={{
                            padding: '0.75rem 1.25rem',
                            background: activeTab === tab.id
                                ? 'linear-gradient(135deg, #f97316, #ea580c)'
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
            <div style={{ padding: '1.5rem 2rem' }}>
                <AnimatePresence mode="wait">
                    {/* PORTFOLIO TAB */}
                    {activeTab === 'portfolio' && (
                        <motion.div
                            key="portfolio"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <h4 style={{ color: '#e2e8f0', marginBottom: '1rem' }}>
                                📋 Classification of the Sulfa Family
                            </h4>
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{
                                    width: '100%',
                                    borderCollapse: 'collapse',
                                    minWidth: '700px'
                                }}>
                                    <thead>
                                        <tr style={{ borderBottom: '2px solid rgba(255,255,255,0.1)' }}>
                                            <th style={{ padding: '1rem', textAlign: 'left', color: '#94a3b8', fontSize: '0.85rem' }}>Class</th>
                                            <th style={{ padding: '1rem', textAlign: 'left', color: '#94a3b8', fontSize: '0.85rem' }}>N¹ Modification</th>
                                            <th style={{ padding: '1rem', textAlign: 'left', color: '#94a3b8', fontSize: '0.85rem' }}>Drug</th>
                                            <th style={{ padding: '1rem', textAlign: 'left', color: '#94a3b8', fontSize: '0.85rem' }}>Duration</th>
                                            <th style={{ padding: '1rem', textAlign: 'left', color: '#94a3b8', fontSize: '0.85rem' }}>Clinical Use</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {SULFA_FAMILY.map((drug, idx) => (
                                            <motion.tr
                                                key={drug.id}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: idx * 0.1 }}
                                                style={{
                                                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                                                    background: idx % 2 === 0 ? 'rgba(0,0,0,0.2)' : 'transparent'
                                                }}
                                            >
                                                <td style={{ padding: '1rem' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                        <span style={{ fontSize: '1.2rem' }}>{drug.icon}</span>
                                                        <div>
                                                            <div style={{ color: drug.color, fontWeight: 600 }}>{drug.class}</div>
                                                            <div style={{ color: '#64748b', fontSize: '0.75rem' }}>{drug.classAr}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td style={{ padding: '1rem', color: '#e2e8f0', fontSize: '0.9rem' }}>
                                                    <code style={{
                                                        background: 'rgba(255,255,255,0.1)',
                                                        padding: '0.25rem 0.5rem',
                                                        borderRadius: '4px',
                                                        fontSize: '0.8rem'
                                                    }}>
                                                        {drug.modification}
                                                    </code>
                                                </td>
                                                <td style={{ padding: '1rem', color: drug.color, fontWeight: 600 }}>
                                                    {drug.name}
                                                </td>
                                                <td style={{ padding: '1rem' }}>
                                                    <span style={{
                                                        padding: '0.25rem 0.75rem',
                                                        background: `${drug.color}20`,
                                                        border: `1px solid ${drug.color}`,
                                                        borderRadius: '20px',
                                                        color: drug.color,
                                                        fontSize: '0.8rem',
                                                        fontWeight: 600
                                                    }}>
                                                        {drug.durationHours}
                                                    </span>
                                                </td>
                                                <td style={{ padding: '1rem', color: '#94a3b8', fontSize: '0.85rem' }}>
                                                    {drug.clinicalUse}
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    )}

                    {/* BUILD-A-SULFA TAB */}
                    {activeTab === 'build' && (
                        <motion.div
                            key="build"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                {/* Left: Molecule */}
                                <div>
                                    <h4 style={{ color: '#e2e8f0', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        🧬 Core Structure
                                    </h4>
                                    <SulfanilamideCore
                                        selectedGroup={selectedGroup}
                                        onGroupSelect={setSelectedGroup}
                                        highlightN1={!selectedGroup}
                                    />

                                    <PropertiesPanel baseValues={baseValues} selectedGroup={selectedGroup} />
                                </div>

                                {/* Right: Functional Groups */}
                                <div>
                                    <h4 style={{ color: '#e2e8f0', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        ☁️ Functional Group Cloud
                                        <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 400 }}>
                                            (Select one to modify N¹)
                                        </span>
                                    </h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                        {FUNCTIONAL_GROUPS.map((group, idx) => (
                                            <motion.button
                                                key={group.id}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: idx * 0.05 }}
                                                onClick={() => setSelectedGroup(selectedGroup?.id === group.id ? null : group)}
                                                style={{
                                                    padding: '1rem',
                                                    background: selectedGroup?.id === group.id
                                                        ? `${group.color}20`
                                                        : 'rgba(255, 255, 255, 0.03)',
                                                    border: `2px solid ${selectedGroup?.id === group.id ? group.color : 'rgba(255, 255, 255, 0.1)'}`,
                                                    borderRadius: '12px',
                                                    cursor: 'pointer',
                                                    textAlign: 'left',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '1rem'
                                                }}
                                            >
                                                <div style={{
                                                    width: 50,
                                                    height: 50,
                                                    borderRadius: '12px',
                                                    background: `${group.color}30`,
                                                    border: `2px solid ${group.color}`,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontWeight: 700,
                                                    fontSize: '0.75rem',
                                                    color: group.color
                                                }}>
                                                    {group.symbol}
                                                </div>
                                                <div style={{ flex: 1 }}>
                                                    <div style={{
                                                        color: selectedGroup?.id === group.id ? group.color : '#e2e8f0',
                                                        fontWeight: 600,
                                                        marginBottom: '0.25rem'
                                                    }}>
                                                        {group.name}
                                                    </div>
                                                    <div style={{ color: '#64748b', fontSize: '0.8rem' }}>
                                                        {group.description}
                                                    </div>
                                                </div>
                                                <div style={{
                                                    padding: '0.25rem 0.5rem',
                                                    background: `${group.color}20`,
                                                    borderRadius: '6px',
                                                    color: group.color,
                                                    fontSize: '0.75rem',
                                                    fontWeight: 600
                                                }}>
                                                    {group.duration}
                                                </div>
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* PK/PD TAB */}
                    {activeTab === 'pkpd' && (
                        <motion.div
                            key="pkpd"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                {/* PK */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 }}
                                    style={{
                                        padding: '2rem',
                                        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(59, 130, 246, 0.05))',
                                        borderRadius: '20px',
                                        border: '2px solid rgba(59, 130, 246, 0.3)'
                                    }}
                                >
                                    <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>💉</div>
                                    <h4 style={{ color: '#3b82f6', fontSize: '1.3rem', marginBottom: '0.5rem' }}>
                                        Pharmacokinetics (PK)
                                    </h4>
                                    <p style={{ color: '#e2e8f0', fontSize: '1.1rem', fontStyle: 'italic', marginBottom: '1.5rem' }}>
                                        "What the BODY does to the DRUG"
                                    </p>
                                    <div style={{ color: '#94a3b8', lineHeight: 1.8 }}>
                                        <div style={{ marginBottom: '0.75rem' }}>
                                            <strong style={{ color: '#3b82f6' }}>A</strong>bsorption - How drug enters the body
                                        </div>
                                        <div style={{ marginBottom: '0.75rem' }}>
                                            <strong style={{ color: '#3b82f6' }}>D</strong>istribution - Where drug goes in the body
                                        </div>
                                        <div style={{ marginBottom: '0.75rem' }}>
                                            <strong style={{ color: '#3b82f6' }}>M</strong>etabolism - How drug is processed
                                        </div>
                                        <div>
                                            <strong style={{ color: '#3b82f6' }}>E</strong>xcretion - How drug leaves the body
                                        </div>
                                    </div>
                                </motion.div>

                                {/* PD */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                    style={{
                                        padding: '2rem',
                                        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05))',
                                        borderRadius: '20px',
                                        border: '2px solid rgba(16, 185, 129, 0.3)'
                                    }}
                                >
                                    <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🎯</div>
                                    <h4 style={{ color: '#10b981', fontSize: '1.3rem', marginBottom: '0.5rem' }}>
                                        Pharmacodynamics (PD)
                                    </h4>
                                    <p style={{ color: '#e2e8f0', fontSize: '1.1rem', fontStyle: 'italic', marginBottom: '1.5rem' }}>
                                        "What the DRUG does to the BODY"
                                    </p>
                                    <div style={{ color: '#94a3b8', lineHeight: 1.8 }}>
                                        <div style={{ marginBottom: '0.75rem' }}>
                                            <strong style={{ color: '#10b981' }}>•</strong> Drug-receptor interactions
                                        </div>
                                        <div style={{ marginBottom: '0.75rem' }}>
                                            <strong style={{ color: '#10b981' }}>•</strong> Signal transduction pathways
                                        </div>
                                        <div style={{ marginBottom: '0.75rem' }}>
                                            <strong style={{ color: '#10b981' }}>•</strong> Therapeutic effects
                                        </div>
                                        <div>
                                            <strong style={{ color: '#10b981' }}>•</strong> Side effects & toxicity
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Connection to Functional Groups */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                style={{
                                    marginTop: '1.5rem',
                                    padding: '1.5rem',
                                    background: 'rgba(249, 115, 22, 0.1)',
                                    borderRadius: '16px',
                                    border: '1px solid rgba(249, 115, 22, 0.3)'
                                }}
                            >
                                <h5 style={{ color: '#f97316', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    🔗 How Functional Groups Affect PK/PD
                                </h5>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                                    <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '12px' }}>
                                        <div style={{ color: '#3b82f6', fontWeight: 600, marginBottom: '0.5rem' }}>pKa ↓</div>
                                        <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>More ionized → Better water solubility → Faster excretion</div>
                                    </div>
                                    <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '12px' }}>
                                        <div style={{ color: '#10b981', fontWeight: 600, marginBottom: '0.5rem' }}>LogP ↑</div>
                                        <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>More lipophilic → Better membrane permeability → Longer duration</div>
                                    </div>
                                    <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '12px' }}>
                                        <div style={{ color: '#f97316', fontWeight: 600, marginBottom: '0.5rem' }}>Ring Size</div>
                                        <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Heterocyclic rings → Alter protein binding → Change half-life</div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}

                    {/* SYNERGY TAB */}
                    {activeTab === 'synergy' && (
                        <motion.div
                            key="synergy"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <SynergyDiagram />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
