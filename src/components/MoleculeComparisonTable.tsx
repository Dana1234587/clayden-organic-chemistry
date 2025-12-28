'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MoleculeViewer from './MoleculeViewer';

interface MoleculeEntry {
    name: string;
    description: string;
    level?: number;
    formula?: string;
}

interface Props {
    title: string;
    molecules: MoleculeEntry[];
    showLevels?: boolean;
}

const EMOJIS: Record<string, string> = {
    'serotonin': '😊', 'caffeine': '☕', 'ethanol': '🍺', 'acetone': '💅',
    'benzene': '💍', 'aspirin': '💊', 'vanillin': '🍦', 'menthol': '🌿',
    'limonene': '🍋', 'ethane': '⛽', 'methane': '🔥', 'cholesterol': '🥚',
    'formaldehyde': '🧪', 'acetaldehyde': '🍎', 'acetic acid': '🫒',
    'toluene': '🎨', 'phenol': '🧴', 'cyclohexane': '⭕', 'propane': '🔵',
    'pentane': '⛓️',
};

const FORMULAS: Record<string, string> = {
    'ethanol': 'C₂H₆O', 'acetone': 'C₃H₆O', 'benzene': 'C₆H₆', 'ethane': 'C₂H₆',
    'methane': 'CH₄', 'cholesterol': 'C₂₇H₄₆O', 'formaldehyde': 'CH₂O',
    'acetaldehyde': 'C₂H₄O', 'acetic acid': 'C₂H₄O₂', 'toluene': 'C₇H₈',
    'phenol': 'C₆H₆O', 'cyclohexane': 'C₆H₁₂', 'propane': 'C₃H₈', 'pentane': 'C₅H₁₂',
};

const GROUPS: Record<string, string[]> = {
    'ethanol': ['Hydroxyl'], 'acetone': ['Ketone'], 'benzene': ['Aromatic'],
    'cholesterol': ['Steroid', 'Hydroxyl'], 'formaldehyde': ['Aldehyde'],
    'acetic acid': ['Carboxylic acid'], 'toluene': ['Aromatic', 'Methyl'],
    'phenol': ['Aromatic', 'Hydroxyl'], 'cyclohexane': ['Cycloalkane'],
    'propane': ['Alkane'], 'pentane': ['Alkane'],
};

const LEVEL_STYLES: Record<number, { bg: string; border: string; accent: string }> = {
    0: { bg: 'rgba(34, 197, 94, 0.08)', border: '#22c55e', accent: '#22c55e' },
    1: { bg: 'rgba(59, 130, 246, 0.08)', border: '#3b82f6', accent: '#3b82f6' },
    2: { bg: 'rgba(251, 191, 36, 0.08)', border: '#fbbf24', accent: '#fbbf24' },
    3: { bg: 'rgba(239, 68, 68, 0.08)', border: '#ef4444', accent: '#ef4444' },
    4: { bg: 'rgba(168, 85, 247, 0.08)', border: '#a855f7', accent: '#a855f7' },
};

const CARD_HEIGHT = 380;

export default function MoleculeComparisonTable({ title, molecules, showLevels = false }: Props) {
    const [viewing3D, setViewing3D] = useState<string | null>(null);

    return (
        <div style={{ margin: '2rem 0' }}>
            {/* Title */}
            <h4 style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                margin: '0 0 1.25rem', fontSize: '1.1rem', color: 'var(--neutral-100)',
            }}>
                <span>🧬</span> {title}
            </h4>

            {/* Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '1.25rem',
            }}>
                {molecules.map((mol) => {
                    const emoji = EMOJIS[mol.name.toLowerCase()] || '🔬';
                    const formula = mol.formula || FORMULAS[mol.name.toLowerCase()] || '';
                    const groups = GROUPS[mol.name.toLowerCase()] || [];
                    const style = mol.level !== undefined ? LEVEL_STYLES[mol.level] : null;
                    const is3D = viewing3D === mol.name;

                    return (
                        <motion.div
                            key={mol.name}
                            style={{
                                height: CARD_HEIGHT,
                                background: style?.bg || 'rgba(20, 20, 30, 0.9)',
                                border: `1.5px solid ${style?.border || 'rgba(139, 92, 246, 0.3)'}`,
                                borderRadius: 20,
                                overflow: 'hidden',
                                position: 'relative',
                            }}
                            whileHover={{ scale: 1.02, boxShadow: '0 12px 32px rgba(0,0,0,0.4)' }}
                        >
                            <AnimatePresence mode="wait">
                                {is3D ? (
                                    /* ========== 3D VIEW ========== */
                                    <motion.div
                                        key="3d"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        style={{
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                        }}
                                    >
                                        {/* Header */}
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            padding: '0.75rem 1rem',
                                            background: 'rgba(0,0,0,0.4)',
                                            borderBottom: '1px solid rgba(255,255,255,0.1)',
                                        }}>
                                            <span style={{
                                                display: 'flex', alignItems: 'center', gap: '0.4rem',
                                                color: 'white', fontSize: '0.9rem', fontWeight: 600,
                                            }}>
                                                {emoji} {mol.name}
                                            </span>
                                            <button
                                                onClick={() => setViewing3D(null)}
                                                style={{
                                                    padding: '0.35rem 0.75rem',
                                                    background: 'rgba(239, 68, 68, 0.8)',
                                                    border: 'none',
                                                    borderRadius: 8,
                                                    color: 'white',
                                                    fontSize: '0.75rem',
                                                    fontWeight: 600,
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                ✕ Close
                                            </button>
                                        </div>
                                        {/* 3D Viewer */}
                                        <div style={{ flex: 1 }}>
                                            <MoleculeViewer
                                                moleculeName={mol.name}
                                                description=""
                                                height={CARD_HEIGHT - 50}
                                            />
                                        </div>
                                    </motion.div>
                                ) : (
                                    /* ========== INFO VIEW ========== */
                                    <motion.div
                                        key="info"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        style={{
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            padding: '1.25rem',
                                        }}
                                    >
                                        {/* Level Badge */}
                                        {showLevels && mol.level !== undefined && (
                                            <div style={{
                                                position: 'absolute',
                                                top: 12, right: 12,
                                                padding: '3px 10px',
                                                background: style?.bg,
                                                border: `1px solid ${style?.border}`,
                                                borderRadius: 12,
                                                fontSize: '0.7rem',
                                                fontWeight: 700,
                                                color: style?.accent,
                                            }}>
                                                Level {mol.level}
                                            </div>
                                        )}

                                        {/* Emoji */}
                                        <div style={{
                                            fontSize: '3rem',
                                            marginBottom: '0.75rem',
                                        }}>
                                            {emoji}
                                        </div>

                                        {/* Name */}
                                        <h3 style={{
                                            margin: 0,
                                            fontSize: '1.25rem',
                                            fontWeight: 700,
                                            color: 'white',
                                        }}>
                                            {mol.name}
                                        </h3>

                                        {/* Formula */}
                                        {formula && (
                                            <div style={{
                                                fontSize: '0.95rem',
                                                fontFamily: 'monospace',
                                                color: style?.accent || '#fbbf24',
                                                marginTop: '0.25rem',
                                            }}>
                                                {formula}
                                            </div>
                                        )}

                                        {/* Description */}
                                        <p style={{
                                            margin: '0.75rem 0',
                                            fontSize: '0.85rem',
                                            color: 'rgba(255,255,255,0.6)',
                                            lineHeight: 1.5,
                                            flex: 1,
                                        }}>
                                            {mol.description}
                                        </p>

                                        {/* Tags */}
                                        {groups.length > 0 && (
                                            <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                                                {groups.map((g, i) => (
                                                    <span key={i} style={{
                                                        padding: '3px 10px',
                                                        background: 'rgba(255,255,255,0.08)',
                                                        border: '1px solid rgba(255,255,255,0.15)',
                                                        borderRadius: 12,
                                                        fontSize: '0.7rem',
                                                        color: 'rgba(255,255,255,0.7)',
                                                    }}>
                                                        {g}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        {/* Button */}
                                        <button
                                            onClick={() => setViewing3D(mol.name)}
                                            style={{
                                                width: '100%',
                                                padding: '0.75rem',
                                                background: style?.accent
                                                    ? `linear-gradient(135deg, ${style.accent}, ${style.accent}cc)`
                                                    : 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                                                border: 'none',
                                                borderRadius: 12,
                                                color: 'white',
                                                fontSize: '0.9rem',
                                                fontWeight: 600,
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '0.4rem',
                                            }}
                                        >
                                            🔬 View 3D Model
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
