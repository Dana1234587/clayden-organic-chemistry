'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MoleculeViewer from './MoleculeViewer';

interface MoleculeEntry {
    name: string;
    description: string;
    level?: number; // For oxidation levels
    formula?: string;
    color?: string;
}

interface MoleculeComparisonTableProps {
    title: string;
    molecules: MoleculeEntry[];
    showLevels?: boolean;
    columns?: ('2d' | '3d' | 'description' | 'formula')[];
}

// Emoji mapping for molecules
const moleculeEmojis: Record<string, string> = {
    'serotonin': '😊',
    'caffeine': '☕',
    'ethanol': '🍺',
    'methanol': '⚗️',
    'acetone': '💅',
    'benzene': '💍',
    'aspirin': '💊',
    'vanillin': '🍦',
    'menthol': '🌿',
    'limonene': '🍋',
    'ethane': '⛽',
    'methane': '🔥',
    'cholesterol': '🥚',
    'formaldehyde': '🧪',
    'acetaldehyde': '🍎',
    'acetic acid': '🫒',
    'toluene': '🎨',
    'phenol': '🧴',
    'aniline': '🔵',
    'pyridine': '💎',
    'cyclohexane': '⭕',
    'propane': '🔵',
    'pentane': '📏',
    'hexane': '📐',
    'formic acid': '🐜',
};

// Chemical formulas for molecules
const moleculeFormulas: Record<string, string> = {
    'serotonin': 'C₁₀H₁₂N₂O',
    'caffeine': 'C₈H₁₀N₄O₂',
    'ethanol': 'C₂H₆O',
    'methanol': 'CH₄O',
    'acetone': 'C₃H₆O',
    'benzene': 'C₆H₆',
    'aspirin': 'C₉H₈O₄',
    'vanillin': 'C₈H₈O₃',
    'menthol': 'C₁₀H₂₀O',
    'limonene': 'C₁₀H₁₆',
    'ethane': 'C₂H₆',
    'methane': 'CH₄',
    'cholesterol': 'C₂₇H₄₆O',
    'formaldehyde': 'CH₂O',
    'acetaldehyde': 'C₂H₄O',
    'acetic acid': 'C₂H₄O₂',
    'toluene': 'C₇H₈',
    'phenol': 'C₆H₆O',
    'aniline': 'C₆H₇N',
    'pyridine': 'C₅H₅N',
    'cyclohexane': 'C₆H₁₂',
    'propane': 'C₃H₈',
    'pentane': 'C₅H₁₂',
    'hexane': 'C₆H₁₄',
    'formic acid': 'CH₂O₂',
};

// Functional groups for molecules
const moleculeFunctionalGroups: Record<string, string[]> = {
    'serotonin': ['Amine (-NH₂)', 'Hydroxyl (-OH)', 'Aromatic ring'],
    'caffeine': ['Carbonyl (C=O)', 'Methyl groups (-CH₃)', 'Heterocyclic N'],
    'ethanol': ['Hydroxyl (-OH)'],
    'acetone': ['Carbonyl (C=O)'],
    'benzene': ['Aromatic ring'],
    'vanillin': ['Aldehyde (-CHO)', 'Ether (-OCH₃)', 'Phenol (-OH)'],
    'menthol': ['Hydroxyl (-OH)'],
    'limonene': ['Alkene (C=C)'],
    'cholesterol': ['Hydroxyl (-OH)', 'Alkene (C=C)'],
    'formaldehyde': ['Aldehyde (-CHO)'],
    'acetaldehyde': ['Aldehyde (-CHO)'],
    'acetic acid': ['Carboxylic acid (-COOH)'],
    'toluene': ['Aromatic ring', 'Methyl (-CH₃)'],
    'phenol': ['Aromatic ring', 'Hydroxyl (-OH)'],
    'cyclohexane': ['Saturated ring'],
    'propane': ['Alkane'],
    'pentane': ['Alkane'],
};

// Skeletal structure descriptions
const skeletalDescriptions: Record<string, string> = {
    'serotonin': 'Indole ring with ethylamine side chain',
    'caffeine': 'Fused purine ring system (imidazole + pyrimidine)',
    'ethanol': '2-carbon chain with terminal -OH',
    'benzene': 'A perfect hexagonal aromatic ring',
    'vanillin': 'Benzaldehyde with methoxy and hydroxy substituents',
    'menthol': 'Cyclohexane ring with isopropyl and methyl groups',
    'limonene': 'Cyclic monoterpene with isopropenyl group',
    'cholesterol': 'Four fused rings: 3 cyclohexane + 1 cyclopentane',
    'formaldehyde': 'Simplest aldehyde - just H-CHO',
    'acetaldehyde': 'Two-carbon aldehyde',
    'acetic acid': 'Two-carbon carboxylic acid (vinegar)',
    'cyclohexane': '6-membered saturated ring - chair conformation',
    'propane': '3-carbon straight chain alkane',
    'pentane': '5-carbon straight chain alkane',
    'acetone': '3-carbon ketone (C=O in middle)',
    'toluene': 'Benzene ring with one methyl group',
    'phenol': 'Benzene ring with hydroxyl group',
};

// Level colors for oxidation levels
const levelColors: Record<number, { bg: string; border: string; text: string; buttonBg: string }> = {
    0: { bg: 'rgba(34, 197, 94, 0.15)', border: '#22c55e', text: '#22c55e', buttonBg: 'linear-gradient(135deg, #22c55e, #16a34a)' },
    1: { bg: 'rgba(59, 130, 246, 0.15)', border: '#3b82f6', text: '#3b82f6', buttonBg: 'linear-gradient(135deg, #3b82f6, #2563eb)' },
    2: { bg: 'rgba(251, 191, 36, 0.15)', border: '#fbbf24', text: '#fbbf24', buttonBg: 'linear-gradient(135deg, #fbbf24, #f59e0b)' },
    3: { bg: 'rgba(239, 68, 68, 0.15)', border: '#ef4444', text: '#ef4444', buttonBg: 'linear-gradient(135deg, #ef4444, #dc2626)' },
    4: { bg: 'rgba(168, 85, 247, 0.15)', border: '#a855f7', text: '#a855f7', buttonBg: 'linear-gradient(135deg, #a855f7, #9333ea)' },
};

// Default button gradient
const defaultButtonGradient = 'linear-gradient(135deg, #8b5cf6, #7c3aed)';

export default function MoleculeComparisonTable({
    title,
    molecules,
    showLevels = false,
}: MoleculeComparisonTableProps) {
    const [expandedMolecule, setExpandedMolecule] = useState<string | null>(null);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
                margin: '2rem 0',
            }}
        >
            {/* Header */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1.5rem',
            }}>
                <span style={{ fontSize: '1.5rem' }}>🧬</span>
                <h4 style={{
                    margin: 0,
                    fontSize: '1.2rem',
                    color: 'var(--neutral-100)',
                    fontWeight: 600,
                }}>
                    {title}
                </h4>
            </div>

            {/* Cards Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.5rem',
            }}>
                {molecules.map((mol, index) => {
                    const emoji = moleculeEmojis[mol.name.toLowerCase()] || '🔬';
                    const formula = mol.formula || moleculeFormulas[mol.name.toLowerCase()] || '';
                    const functionalGroups = moleculeFunctionalGroups[mol.name.toLowerCase()] || [];
                    const skeletal = skeletalDescriptions[mol.name.toLowerCase()] || mol.description;
                    const levelColor = mol.level !== undefined ? levelColors[mol.level] : null;
                    const buttonBg = levelColor?.buttonBg || defaultButtonGradient;
                    const isExpanded = expandedMolecule === mol.name;

                    return (
                        <motion.div
                            key={mol.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            style={{
                                background: 'linear-gradient(145deg, rgba(22, 22, 30, 0.95) 0%, rgba(28, 28, 40, 0.9) 100%)',
                                border: `1px solid ${levelColor?.border || 'rgba(139, 92, 246, 0.2)'}`,
                                borderRadius: 24,
                                padding: '1.5rem',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                                position: 'relative',
                                overflow: 'hidden',
                            }}
                            whileHover={{
                                scale: 1.02,
                                boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                            }}
                        >
                            {/* Level Badge (if showing levels) */}
                            {showLevels && mol.level !== undefined && (
                                <div style={{
                                    position: 'absolute',
                                    top: 12,
                                    left: 12,
                                    background: levelColor?.bg,
                                    border: `1px solid ${levelColor?.border}`,
                                    borderRadius: 8,
                                    padding: '4px 10px',
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                    color: levelColor?.text,
                                }}>
                                    Level {mol.level}
                                </div>
                            )}

                            {/* Large Emoji */}
                            <div style={{
                                fontSize: '3.5rem',
                                marginBottom: '1rem',
                                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
                            }}>
                                {emoji}
                            </div>

                            {/* Molecule Name */}
                            <h3 style={{
                                margin: 0,
                                fontSize: '1.3rem',
                                fontWeight: 700,
                                color: 'var(--neutral-100)',
                            }}>
                                {mol.name}
                            </h3>

                            {/* Chemical Formula */}
                            {formula && (
                                <div style={{
                                    fontSize: '1rem',
                                    color: levelColor?.text || '#fbbf24',
                                    fontFamily: 'monospace',
                                    marginTop: '0.25rem',
                                    fontWeight: 500,
                                }}>
                                    {formula}
                                </div>
                            )}

                            {/* Skeletal Description */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '0.4rem',
                                marginTop: '0.75rem',
                                fontSize: '0.85rem',
                                color: 'var(--neutral-400)',
                                lineHeight: 1.4,
                            }}>
                                <span>🔍</span>
                                <span>{skeletal}</span>
                            </div>

                            {/* Functional Group Tags */}
                            {functionalGroups.length > 0 && (
                                <div style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: '0.4rem',
                                    justifyContent: 'center',
                                    marginTop: '0.75rem',
                                }}>
                                    {functionalGroups.map((group, idx) => (
                                        <span
                                            key={idx}
                                            style={{
                                                padding: '4px 10px',
                                                background: 'rgba(255,255,255,0.08)',
                                                border: '1px solid rgba(255,255,255,0.15)',
                                                borderRadius: 20,
                                                fontSize: '0.7rem',
                                                color: 'var(--neutral-300)',
                                            }}
                                        >
                                            {group}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* Description */}
                            <p style={{
                                margin: '0.75rem 0 1rem',
                                fontSize: '0.85rem',
                                color: 'var(--neutral-400)',
                                lineHeight: 1.5,
                            }}>
                                {mol.description}
                            </p>

                            {/* View 3D Button */}
                            <button
                                onClick={() => setExpandedMolecule(isExpanded ? null : mol.name)}
                                style={{
                                    padding: '0.65rem 1.5rem',
                                    background: buttonBg,
                                    border: 'none',
                                    borderRadius: 12,
                                    color: 'white',
                                    fontSize: '0.9rem',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    transition: 'all 0.2s ease',
                                    boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(139, 92, 246, 0.4)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.3)';
                                }}
                            >
                                <span>🔬</span>
                                {isExpanded ? 'Hide 3D Model' : 'View 3D Model'}
                            </button>
                        </motion.div>
                    );
                })}
            </div>

            {/* Expanded 3D Viewer */}
            <AnimatePresence>
                {expandedMolecule && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{
                            marginTop: '2rem',
                            background: 'linear-gradient(145deg, rgba(22, 22, 30, 0.95) 0%, rgba(28, 28, 40, 0.9) 100%)',
                            border: '1px solid rgba(139, 92, 246, 0.3)',
                            borderRadius: 24,
                            padding: '1.5rem',
                            overflow: 'hidden',
                        }}
                    >
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '1rem',
                        }}>
                            <h4 style={{
                                margin: 0,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                color: 'var(--neutral-100)',
                            }}>
                                <span>{moleculeEmojis[expandedMolecule.toLowerCase()] || '🔬'}</span>
                                {expandedMolecule} - 3D Model
                            </h4>
                            <button
                                onClick={() => setExpandedMolecule(null)}
                                style={{
                                    padding: '0.5rem 1rem',
                                    background: 'rgba(255,255,255,0.1)',
                                    border: 'none',
                                    borderRadius: 8,
                                    color: 'var(--neutral-300)',
                                    cursor: 'pointer',
                                    fontSize: '0.85rem',
                                }}
                            >
                                ✕ Close
                            </button>
                        </div>
                        <MoleculeViewer
                            moleculeName={expandedMolecule}
                            description={molecules.find(m => m.name === expandedMolecule)?.description || ''}
                            height={400}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
