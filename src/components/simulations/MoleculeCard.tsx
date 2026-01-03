'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

// Dynamic import for MoleculeViewer to avoid SSR issues with 3D libraries
const MoleculeViewer = dynamic(() => import('@/components/MoleculeViewer'), {
    ssr: false,
    loading: () => (
        <div style={{
            height: '100%',
            width: '100%',
            background: 'var(--neutral-900)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--neutral-400)'
        }}>
            <span className="animate-pulse">Loading 3D Viewer...</span>
        </div>
    )
});

interface FunctionalGroup {
    name: string;
    symbol: string;
    atoms: string;
    effect: string;
    color: string;
}

interface MoleculeCardProps {
    name: string;
    formula: string;
    cid: number;
    mw: number;
    icon: string;
    color: string;
    functionalGroups: FunctionalGroup[];
    warning?: string;
    highlight?: string;
}

// Improved 2D SVG Component with clean skeletal structures
function Molecule2D({ name, highlightedFG, onFGClick, fgs }: { name: string; highlightedFG: number | null; onFGClick: (idx: number) => void; fgs: FunctionalGroup[] }) {
    const isHighlighted = (fgIdx: number) => highlightedFG === fgIdx;

    // Helper for interactive groups
    const Group = ({ idx, children }: { idx: number; children: React.ReactNode }) => (
        <g
            onClick={() => onFGClick(idx)}
            style={{ cursor: 'pointer', transition: 'all 0.2s' }}
            opacity={highlightedFG === null || isHighlighted(idx) ? 1 : 0.3}
        >
            {children}
            {/* Highlight Indicator */}
            {isHighlighted(idx) && (
                <motion.circle
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.2 }}
                    r="25"
                    cx={
                        name === 'Salicin' ? (idx === 0 ? 140 : idx === 1 ? 50 : idx === 2 ? 140 : 50) :
                            name === 'Salicylic Acid' ? (idx === 0 ? 140 : idx === 1 ? 95 : 50) :
                                (idx === 0 ? 150 : idx === 1 ? 55 : 100)
                    }
                    cy={
                        name === 'Salicin' ? (idx === 0 ? 60 : idx === 1 ? 30 : idx === 2 ? 60 : 60) :
                            name === 'Salicylic Acid' ? (idx === 0 ? 40 : idx === 1 ? 90 : 60) :
                                (idx === 0 ? 40 : idx === 1 ? 90 : 60)
                    }
                    fill={fgs[idx]?.color || 'currentColor'}
                    pointerEvents="none"
                />
            )}
        </g>
    );

    if (name === 'Salicin') {
        return (
            <svg viewBox="0 0 200 120" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                <defs>
                    <filter id="glow-salicin" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="2" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                {/* 1. Glucose Ring (Right) */}
                <Group idx={2}>
                    <path d="M 130 50 L 150 40 L 170 50 L 170 70 L 150 80 L 130 70 Z"
                        fill="none" stroke={isHighlighted(2) ? fgs[2].color : "#cbd5e1"} strokeWidth="2.5" />
                    <line x1="170" y1="50" x2="180" y2="40" stroke={isHighlighted(2) ? fgs[2].color : "#cbd5e1"} strokeWidth="2" strokeLinecap="round" /> {/* CH2OH */}
                    <text x="182" y="38" fontSize="8" fill={isHighlighted(2) ? fgs[2].color : "#94a3b8"}>OH</text>
                    <text x="145" y="65" fontSize="8" fill="#64748b" textAnchor="middle">Glucose</text>
                </Group>

                {/* 2. Glycosidic Bond (Center) - Connects Ring to O-Glucose */}
                <Group idx={0}>
                    <line x1="90" y1="40" x2="110" y2="40" stroke={isHighlighted(0) ? fgs[0].color : "#cbd5e1"} strokeWidth="2.5" /> {/* CH2 linker */}
                    <text x="115" y="44" fontSize="10" fill={isHighlighted(0) ? fgs[0].color : "#cbd5e1"} fontWeight="bold">O</text>
                    <line x1="124" y1="42" x2="130" y2="50" stroke={isHighlighted(0) ? fgs[0].color : "#cbd5e1"} strokeWidth="2.5" />
                </Group>

                {/* 3. Benzene RIng (Left) */}
                <Group idx={3}>
                    <path d="M 30 50 L 50 40 L 70 50 L 70 70 L 50 80 L 30 70 Z"
                        fill="none" stroke={isHighlighted(3) ? fgs[3].color : "#cbd5e1"} strokeWidth="2.5" />
                    <circle cx="50" cy="60" r="12" fill="none" stroke={isHighlighted(3) ? fgs[3].color : "#cbd5e1"} strokeWidth="1.5" opacity="0.6" />
                </Group>

                {/* 4. Phenolic OH (Top of Benzene) - Actually CH2OH in Salicin is ortho, Phenolic O is linked */}
                {/* Let's adjust to be simpler schematic: Benzene - CH2OH (ortho) and -O-Glucose (attached to ring) */}
                <Group idx={1}>
                    <line x1="70" y1="50" x2="90" y2="40" stroke="#cbd5e1" strokeWidth="2.5" /> {/* Link to CH2OH */}
                    <text x="92" y="38" fontSize="9" fill={isHighlighted(1) ? fgs[1].color : "#ef4444"}>CH₂OH</text>
                </Group>
            </svg>
        );
    }

    if (name === 'Salicylic Acid') {
        return (
            <svg viewBox="0 0 200 120" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                {/* 1. Benzene Ring */}
                <Group idx={2}>
                    <path d="M 40 50 L 65 35 L 90 50 L 90 80 L 65 95 L 40 80 Z"
                        fill="none" stroke={isHighlighted(2) ? fgs[2].color : "#cbd5e1"} strokeWidth="3" />
                    <circle cx="65" cy="65" r="16" fill="none" stroke={isHighlighted(2) ? fgs[2].color : "#cbd5e1"} strokeWidth="2" opacity="0.6" />
                </Group>

                {/* 2. Carboxylic Acid (-COOH) at top right */}
                <Group idx={0}>
                    <line x1="90" y1="50" x2="115" y2="35" stroke={isHighlighted(0) ? fgs[0].color : "#cbd5e1"} strokeWidth="3" />
                    <line x1="115" y1="35" x2="115" y2="15" stroke={isHighlighted(0) ? fgs[0].color : "#ef4444"} strokeWidth="3" /> {/* =O */}
                    <text x="112" y="10" fontSize="10" fill={isHighlighted(0) ? fgs[0].color : "#ef4444"} fontWeight="bold">O</text>
                    <line x1="115" y1="35" x2="135" y2="45" stroke={isHighlighted(0) ? fgs[0].color : "#cbd5e1"} strokeWidth="3" /> {/* -OH */}
                    <text x="138" y="52" fontSize="10" fill={isHighlighted(0) ? fgs[0].color : "#ef4444"} fontWeight="bold">OH</text>
                </Group>

                {/* 3. Phenolic OH (-OH) at bottom right - PROBLEM GROUP */}
                <Group idx={1}>
                    <line x1="90" y1="80" x2="110" y2="92" stroke={isHighlighted(1) ? fgs[1].color : "#cbd5e1"} strokeWidth="3" />
                    <text x="112" y="100" fontSize="10" fill={isHighlighted(1) ? fgs[1].color : "#ef4444"} fontWeight="bold">OH</text>
                    {isHighlighted(1) && (
                        <motion.text
                            initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                            x="135" y="100" fontSize="10" fill="#ef4444" fontWeight="bold">
                            ⚠️ Causes Ulcers!
                        </motion.text>
                    )}
                </Group>
            </svg>
        );
    }

    // Aspirin (Acetylsalicylic Acid)
    return (
        <svg viewBox="0 0 200 120" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
            {/* 1. Benzene Ring */}
            <Group idx={2}>
                <path d="M 40 50 L 65 35 L 90 50 L 90 80 L 65 95 L 40 80 Z"
                    fill="none" stroke={isHighlighted(2) ? fgs[2].color : "#cbd5e1"} strokeWidth="3" />
                <circle cx="65" cy="65" r="16" fill="none" stroke={isHighlighted(2) ? fgs[2].color : "#cbd5e1"} strokeWidth="2" opacity="0.6" />
            </Group>

            {/* 2. Carboxylic Acid (-COOH) at top right */}
            <Group idx={0}>
                <line x1="90" y1="50" x2="115" y2="35" stroke={isHighlighted(0) ? fgs[0].color : "#cbd5e1"} strokeWidth="3" />
                <line x1="115" y1="35" x2="115" y2="15" stroke={isHighlighted(0) ? fgs[0].color : "#ef4444"} strokeWidth="3" /> {/* =O */}
                <text x="112" y="10" fontSize="10" fill={isHighlighted(0) ? fgs[0].color : "#ef4444"} fontWeight="bold">O</text>
                <line x1="115" y1="35" x2="135" y2="45" stroke={isHighlighted(0) ? fgs[0].color : "#cbd5e1"} strokeWidth="3" /> {/* -OH */}
                <text x="138" y="52" fontSize="10" fill={isHighlighted(0) ? fgs[0].color : "#ef4444"} fontWeight="bold">OH</text>
            </Group>

            {/* 3. Acetyl Group (-OCOCH3) - SOLUTION GROUP */}
            <Group idx={1}>
                <line x1="90" y1="80" x2="110" y2="92" stroke={isHighlighted(1) ? fgs[1].color : "#cbd5e1"} strokeWidth="3" /> {/* Ring-O */}
                <text x="110" y="100" fontSize="10" fill={isHighlighted(1) ? fgs[1].color : "#ef4444"} fontWeight="bold">O</text>

                <line x1="118" y1="98" x2="135" y2="98" stroke={isHighlighted(1) ? fgs[1].color : "#cbd5e1"} strokeWidth="3" /> {/* O-C */}
                <text x="133" y="115" fontSize="10" fill={isHighlighted(1) ? fgs[1].color : "#ef4444"} fontWeight="bold">O</text> {/* C=O */}
                <line x1="138" y1="95" x2="138" y2="105" stroke={isHighlighted(1) ? fgs[1].color : "#ef4444"} strokeWidth="2" /> {/* Double bond vertical visually */}

                <line x1="138" y1="98" x2="155" y2="88" stroke={isHighlighted(1) ? fgs[1].color : "#cbd5e1"} strokeWidth="3" /> {/* C-CH3 */}
                <text x="157" y="90" fontSize="10" fill={isHighlighted(1) ? fgs[1].color : "#cbd5e1"} fontWeight="bold">CH₃</text>

                {isHighlighted(1) && (
                    <motion.text
                        initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }}
                        x="130" y="130" fontSize="10" fill="#22c55e" fontWeight="bold">
                        ✅ Protected!
                    </motion.text>
                )}
            </Group>
        </svg>
    );
}

export default function MoleculeCard({
    name,
    formula,
    cid,
    mw,
    icon,
    color,
    functionalGroups,
    warning,
    highlight
}: MoleculeCardProps) {
    const [view, setView] = useState<'2d' | '3d'>('3d'); // Default to 3D for "Wow" factor
    const [selectedFG, setSelectedFG] = useState<number | null>(null);

    const handleFGClick = (idx: number) => {
        setSelectedFG(selectedFG === idx ? null : idx);
    };

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(300px, 1fr) 350px',
            gap: '2rem',
            background: 'rgba(15, 23, 42, 0.6)',
            borderRadius: '24px',
            overflow: 'hidden',
            border: `1px solid ${color}40`,
            boxShadow: `0 0 40px ${color}10`
        }}>
            {/* Left: Info & Functional Groups */}
            <div style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{
                        width: '60px',
                        height: '60px',
                        background: `${color}20`,
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2rem',
                        border: `1px solid ${color}40`
                    }}>
                        {icon}
                    </div>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '2rem', color: '#f8fafc', fontWeight: 700 }}>{name}</h2>
                        <div style={{ display: 'flex', gap: '1rem', marginTop: '0.25rem', color: '#94a3b8', fontFamily: 'monospace' }}>
                            <span>{formula}</span>
                            <span>MW: {mw}</span>
                        </div>
                    </div>
                </div>

                {warning && (
                    <div style={{
                        padding: '1rem',
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                        borderRadius: '12px',
                        color: '#fca5a5',
                        marginBottom: '1.5rem',
                        display: 'flex',
                        gap: '0.75rem',
                        alignItems: 'center'
                    }}>
                        <span style={{ fontSize: '1.25rem' }}>⚠️</span>
                        {warning}
                    </div>
                )}

                {highlight && (
                    <div style={{
                        padding: '1rem',
                        background: 'rgba(34, 197, 94, 0.1)',
                        border: '1px solid rgba(34, 197, 94, 0.2)',
                        borderRadius: '12px',
                        color: '#86efac',
                        marginBottom: '1.5rem',
                        display: 'flex',
                        gap: '0.75rem',
                        alignItems: 'center'
                    }}>
                        <span style={{ fontSize: '1.25rem' }}>✅</span>
                        {highlight}
                    </div>
                )}

                <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748b', marginBottom: '1rem' }}>
                    Functional Groups
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {functionalGroups.map((fg, idx) => (
                        <motion.button
                            key={idx}
                            whileHover={{ scale: 1.02, x: 5 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleFGClick(idx)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '0.75rem 1rem',
                                background: selectedFG === idx ? `${fg.color}20` : 'rgba(30, 41, 59, 0.5)',
                                border: selectedFG === idx ? `1px solid ${fg.color}` : '1px solid rgba(51, 65, 85, 0.5)',
                                borderRadius: '12px',
                                cursor: 'pointer',
                                textAlign: 'left',
                                transition: 'all 0.2s',
                                width: '100%'
                            }}
                        >
                            <div style={{
                                width: '32px',
                                height: '32px',
                                background: idx === 0 ? '#3b82f6' : idx === 1 ? '#ef4444' : '#f59e0b',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginRight: '1rem',
                                fontSize: '0.8rem',
                                color: 'white',
                                fontWeight: 600
                            }}>
                                {idx + 1}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ color: '#e2e8f0', fontWeight: 600 }}>{fg.name}</div>
                                <div style={{ fontSize: '0.8rem', color: fg.color }}>{fg.effect}</div>
                            </div>
                            <div style={{
                                padding: '2px 8px',
                                background: 'rgba(0,0,0,0.2)',
                                borderRadius: '4px',
                                fontFamily: 'monospace',
                                fontSize: '0.75rem',
                                color: '#94a3b8'
                            }}>
                                {fg.symbol}
                            </div>
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Right: Visualization (2D/3D) */}
            <div style={{
                background: 'linear-gradient(180deg, #020617 0%, #0f172a 100%)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {/* View Toggle */}
                <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    zIndex: 10,
                    display: 'flex',
                    background: 'rgba(15, 23, 42, 0.8)',
                    backdropFilter: 'blur(8px)',
                    padding: '4px',
                    borderRadius: '10px',
                    border: '1px solid rgba(255,255,255,0.1)'
                }}>
                    <button
                        onClick={() => setView('2d')}
                        style={{
                            padding: '6px 12px',
                            background: view === '2d' ? 'white' : 'transparent',
                            color: view === '2d' ? 'black' : '#94a3b8',
                            borderRadius: '8px',
                            border: 'none',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            pointerEvents: 'auto'
                        }}
                    >
                        2D
                    </button>
                    <button
                        onClick={() => setView('3d')}
                        style={{
                            padding: '6px 12px',
                            background: view === '3d' ? 'white' : 'transparent',
                            color: view === '3d' ? 'black' : '#94a3b8',
                            borderRadius: '8px',
                            border: 'none',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            pointerEvents: 'auto'
                        }}
                    >
                        3D
                    </button>
                </div>

                {/* Content */}
                <div style={{ flex: 1, position: 'relative' }}>
                    <AnimatePresence mode="wait">
                        {view === '3d' ? (
                            <motion.div
                                key="3d"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                style={{ width: '100%', height: '100%' }}
                            >
                                <MoleculeViewer
                                    moleculeName={name}
                                    height={400}
                                    description={formula}
                                />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="2d"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    padding: '2rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: '#ffffff'
                                }}
                            >
                                <Molecule2D
                                    name={name}
                                    highlightedFG={selectedFG}
                                    onFGClick={handleFGClick}
                                    fgs={functionalGroups}
                                />
                                <div style={{
                                    position: 'absolute',
                                    bottom: '1rem',
                                    left: '0',
                                    right: '0',
                                    textAlign: 'center',
                                    fontSize: '0.8rem',
                                    color: '#64748b',
                                    pointerEvents: 'none'
                                }}>
                                    👆 Click structure to highlight groups
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
