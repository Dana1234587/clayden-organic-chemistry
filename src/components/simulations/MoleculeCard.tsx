'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FunctionalGroup {
    name: string;
    symbol: string;
    atoms: string;
    effect: string;
    color: string;
    svgPath?: string;
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

// 2D SVG structures with highlighted regions
function Molecule2D({ name, highlightedFG, onFGClick, fgs }: { name: string; highlightedFG: number | null; onFGClick: (idx: number) => void; fgs: FunctionalGroup[] }) {
    const isHighlighted = (fgIdx: number) => highlightedFG === fgIdx;

    if (name === 'Salicin') {
        return (
            <svg viewBox="0 0 200 120" style={{ width: '100%', height: '100%' }}>
                {/* Benzene ring - index 3 */}
                <g onClick={() => onFGClick(3)} style={{ cursor: 'pointer' }}>
                    <polygon points="50,30 80,15 110,30 110,60 80,75 50,60"
                        fill={isHighlighted(3) ? `${fgs[3]?.color}20` : 'none'}
                        stroke={isHighlighted(3) ? fgs[3]?.color : '#f97316'}
                        strokeWidth={isHighlighted(3) ? 3 : 2} />
                    <circle cx="80" cy="45" r="15" fill="none"
                        stroke={isHighlighted(3) ? fgs[3]?.color : '#f97316'}
                        strokeWidth="1" strokeDasharray="3,2" />
                    <text x="80" y="48" fontSize="7" fill={isHighlighted(3) ? fgs[3]?.color : '#94a3b8'} textAnchor="middle">Benzene</text>
                    {isHighlighted(3) && <text x="80" y="90" fontSize="8" fill="#f97316">🔶 Drug Core</text>}
                </g>
                {/* Glycosidic bond - O - index 0 */}
                <g onClick={() => onFGClick(0)} style={{ cursor: 'pointer' }}>
                    <line x1="110" y1="45" x2="130" y2="45"
                        stroke={isHighlighted(0) ? fgs[0]?.color : '#22c55e'}
                        strokeWidth={isHighlighted(0) ? 4 : 2} />
                    <text x="120" y="38" fontSize="12" fontWeight="bold"
                        fill={isHighlighted(0) ? fgs[0]?.color : '#22c55e'}>O</text>
                    {isHighlighted(0) && <text x="120" y="60" fontSize="7" fill="#22c55e">Bridge</text>}
                </g>
                {/* Glucose ring - index 2 */}
                <g onClick={() => onFGClick(2)} style={{ cursor: 'pointer' }}>
                    <polygon points="140,25 170,25 185,45 170,65 140,65 125,45"
                        fill={isHighlighted(2) ? `${fgs[2]?.color}20` : 'none'}
                        stroke={isHighlighted(2) ? fgs[2]?.color : '#8b5cf6'}
                        strokeWidth={isHighlighted(2) ? 3 : 2} />
                    <text x="155" y="48" fontSize="8" fill={isHighlighted(2) ? fgs[2]?.color : '#94a3b8'} textAnchor="middle">Glucose</text>
                    {isHighlighted(2) && <text x="155" y="80" fontSize="8" fill="#8b5cf6">💧 Soluble</text>}
                </g>
                {/* Phenolic OH - index 1 */}
                <g onClick={() => onFGClick(1)} style={{ cursor: 'pointer' }}>
                    <line x1="50" y1="45" x2="28" y2="45"
                        stroke={isHighlighted(1) ? fgs[1]?.color : '#3b82f6'}
                        strokeWidth={isHighlighted(1) ? 4 : 2} />
                    <text x="15" y="50" fontSize="14" fontWeight="bold"
                        fill={isHighlighted(1) ? fgs[1]?.color : '#3b82f6'}>OH</text>
                    {isHighlighted(1) && <text x="28" y="65" fontSize="7" fill="#3b82f6">Active!</text>}
                </g>
                {/* Labels */}
                <text x="100" y="105" fontSize="9" fill="#64748b" textAnchor="middle">👆 Click each part to learn its role</text>
            </svg>
        );
    }

    if (name === 'Salicylic Acid') {
        return (
            <svg viewBox="0 0 200 120" style={{ width: '100%', height: '100%' }}>
                {/* Benzene */}
                <g onClick={() => onFGClick(2)} style={{ cursor: 'pointer' }}>
                    <polygon points="70,25 100,10 130,25 130,55 100,70 70,55" fill="none" stroke={isHighlighted(2) ? fgs[2]?.color : '#64748b'} strokeWidth={isHighlighted(2) ? 3 : 2} />
                    <circle cx="100" cy="40" r="15" fill="none" stroke={isHighlighted(2) ? fgs[2]?.color : '#64748b'} strokeWidth="1" strokeDasharray="3,2" />
                </g>
                {/* -OH (Phenolic) - THE PROBLEM! */}
                <g onClick={() => onFGClick(1)} style={{ cursor: 'pointer' }}>
                    <line x1="70" y1="40" x2="45" y2="40" stroke={isHighlighted(1) ? fgs[1]?.color : '#ef4444'} strokeWidth={isHighlighted(1) ? 4 : 2} />
                    <text x="25" y="45" fontSize="14" fontWeight="bold" fill={isHighlighted(1) ? fgs[1]?.color : '#ef4444'}>OH</text>
                    {isHighlighted(1) && <text x="35" y="60" fontSize="8" fill="#ef4444">⚠️ Problem!</text>}
                </g>
                {/* -COOH */}
                <g onClick={() => onFGClick(0)} style={{ cursor: 'pointer' }}>
                    <line x1="130" y1="40" x2="155" y2="40" stroke={isHighlighted(0) ? fgs[0]?.color : '#f97316'} strokeWidth={isHighlighted(0) ? 3 : 2} />
                    <text x="165" y="35" fontSize="10" fill={isHighlighted(0) ? fgs[0]?.color : '#f97316'}>O</text>
                    <line x1="160" y1="35" x2="160" y2="25" stroke={isHighlighted(0) ? fgs[0]?.color : '#f97316'} strokeWidth="2" />
                    <text x="165" y="55" fontSize="10" fill={isHighlighted(0) ? fgs[0]?.color : '#f97316'}>OH</text>
                    <line x1="160" y1="45" x2="160" y2="50" stroke={isHighlighted(0) ? fgs[0]?.color : '#f97316'} strokeWidth="2" />
                </g>
                <text x="100" y="95" fontSize="10" fill="#94a3b8" textAnchor="middle">Click on functional groups!</text>
            </svg>
        );
    }

    // Aspirin
    return (
        <svg viewBox="0 0 200 120" style={{ width: '100%', height: '100%' }}>
            {/* Benzene */}
            <g onClick={() => onFGClick(2)} style={{ cursor: 'pointer' }}>
                <polygon points="60,25 90,10 120,25 120,55 90,70 60,55" fill="none" stroke={isHighlighted(2) ? fgs[2]?.color : '#64748b'} strokeWidth={isHighlighted(2) ? 3 : 2} />
                <circle cx="90" cy="40" r="15" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="3,2" />
            </g>
            {/* Acetyl Ester - THE SOLUTION! */}
            <g onClick={() => onFGClick(1)} style={{ cursor: 'pointer' }}>
                <line x1="60" y1="40" x2="35" y2="40" stroke={isHighlighted(1) ? fgs[1]?.color : '#22c55e'} strokeWidth={isHighlighted(1) ? 4 : 2} />
                <text x="30" y="35" fontSize="8" fill={isHighlighted(1) ? fgs[1]?.color : '#22c55e'}>O</text>
                <line x1="30" y1="40" x2="15" y2="40" stroke={isHighlighted(1) ? fgs[1]?.color : '#22c55e'} strokeWidth="2" />
                <line x1="25" y1="40" x2="25" y2="55" stroke={isHighlighted(1) ? fgs[1]?.color : '#22c55e'} strokeWidth="2" />
                <text x="25" y="65" fontSize="8" fill={isHighlighted(1) ? fgs[1]?.color : '#22c55e'}>C=O</text>
                <text x="8" y="45" fontSize="8" fill={isHighlighted(1) ? fgs[1]?.color : '#22c55e'}>CH₃</text>
                {isHighlighted(1) && <text x="25" y="80" fontSize="8" fill="#22c55e">✅ Acetyl!</text>}
            </g>
            {/* -COOH */}
            <g onClick={() => onFGClick(0)} style={{ cursor: 'pointer' }}>
                <line x1="120" y1="40" x2="145" y2="40" stroke={isHighlighted(0) ? fgs[0]?.color : '#60a5fa'} strokeWidth={isHighlighted(0) ? 3 : 2} />
                <text x="155" y="35" fontSize="10" fill={isHighlighted(0) ? fgs[0]?.color : '#60a5fa'}>O</text>
                <line x1="150" y1="35" x2="150" y2="25" stroke={isHighlighted(0) ? fgs[0]?.color : '#60a5fa'} strokeWidth="2" />
                <text x="155" y="55" fontSize="10" fill={isHighlighted(0) ? fgs[0]?.color : '#60a5fa'}>OH</text>
            </g>
            <text x="100" y="100" fontSize="10" fill="#94a3b8" textAnchor="middle">Click to highlight in 3D!</text>
        </svg>
    );
}

export default function MoleculeCard({ name, formula, cid, mw, icon, color, functionalGroups, warning, highlight }: MoleculeCardProps) {
    const [view, setView] = useState<'2d' | '3d'>('3d');
    const [selectedFG, setSelectedFG] = useState<number | null>(null);
    const [isRotating, setIsRotating] = useState(true);

    const handleFGClick = (idx: number) => {
        setSelectedFG(selectedFG === idx ? null : idx);
    };

    return (
        <div style={{
            background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
            borderRadius: '20px',
            overflow: 'hidden',
            border: `1px solid ${color}40`
        }}>
            {/* Header */}
            <div style={{
                padding: '1rem 1.25rem',
                background: `linear-gradient(135deg, ${color}20, transparent)`,
                borderBottom: '1px solid rgba(148,163,184,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '1.75rem' }}>{icon}</span>
                    <div>
                        <div style={{ fontWeight: 700, color, fontSize: '1.1rem' }}>{name}</div>
                        <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>{formula} • MW: {mw} g/mol</div>
                    </div>
                </div>
                {/* View Toggle */}
                <div style={{ display: 'flex', gap: '0.25rem', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', padding: '0.25rem' }}>
                    <button onClick={() => setView('2d')} style={{ padding: '0.4rem 0.75rem', background: view === '2d' ? color : 'transparent', border: 'none', borderRadius: '6px', color: view === '2d' ? 'white' : '#64748b', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}>2D</button>
                    <button onClick={() => setView('3d')} style={{ padding: '0.4rem 0.75rem', background: view === '3d' ? color : 'transparent', border: 'none', borderRadius: '6px', color: view === '3d' ? 'white' : '#64748b', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}>3D</button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1rem', padding: '1rem' }}>
                {/* Structure View */}
                <div style={{
                    height: '240px',
                    background: '#0a0a0f',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    position: 'relative',
                    border: selectedFG !== null ? `2px solid ${functionalGroups[selectedFG]?.color}` : '1px solid rgba(148,163,184,0.2)'
                }}>
                    {view === '3d' ? (
                        <>
                            <iframe
                                src={`https://embed.molview.org/v1/?mode=balls&cid=${cid}&bg=0a0a0f`}
                                style={{ width: '100%', height: '100%', border: 'none' }}
                                title={`${name} 3D`}
                            />
                            {/* Rotation control */}
                            <button
                                onClick={() => setIsRotating(!isRotating)}
                                style={{
                                    position: 'absolute',
                                    bottom: '0.5rem',
                                    right: '0.5rem',
                                    padding: '0.35rem 0.6rem',
                                    background: 'rgba(0,0,0,0.7)',
                                    border: 'none',
                                    borderRadius: '6px',
                                    color: '#94a3b8',
                                    fontSize: '0.7rem',
                                    cursor: 'pointer'
                                }}
                            >
                                {isRotating ? '⏸ Stop' : '▶ Rotate'}
                            </button>
                        </>
                    ) : (
                        <div style={{ padding: '1rem', height: '100%' }}>
                            <Molecule2D name={name} highlightedFG={selectedFG} onFGClick={handleFGClick} fgs={functionalGroups} />
                        </div>
                    )}

                    {/* FG Highlight overlay for 3D */}
                    {view === '3d' && selectedFG !== null && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{
                                position: 'absolute',
                                top: '0.5rem',
                                left: '0.5rem',
                                padding: '0.5rem 0.75rem',
                                background: `${functionalGroups[selectedFG].color}cc`,
                                borderRadius: '8px',
                                maxWidth: '150px'
                            }}
                        >
                            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'white' }}>{functionalGroups[selectedFG].symbol}</div>
                            <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.9)' }}>{functionalGroups[selectedFG].name}</div>
                        </motion.div>
                    )}
                </div>

                {/* Functional Groups Panel */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <h4 style={{ margin: 0, color: '#e2e8f0', fontSize: '0.85rem', marginBottom: '0.25rem' }}>⚛️ Functional Groups</h4>

                    {functionalGroups.map((fg, idx) => (
                        <motion.div
                            key={idx}
                            onClick={() => handleFGClick(idx)}
                            whileHover={{ scale: 1.02, x: 3 }}
                            style={{
                                padding: '0.6rem',
                                background: selectedFG === idx ? `${fg.color}25` : 'rgba(30,41,59,0.6)',
                                borderRadius: '10px',
                                border: selectedFG === idx ? `2px solid ${fg.color}` : '1px solid rgba(148,163,184,0.15)',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <div style={{
                                    padding: '0.25rem 0.5rem',
                                    background: `${fg.color}30`,
                                    borderRadius: '4px',
                                    fontFamily: 'monospace',
                                    fontSize: '0.75rem',
                                    fontWeight: 700,
                                    color: fg.color
                                }}>
                                    {fg.symbol}
                                </div>
                                <div style={{ fontSize: '0.8rem', color: '#e2e8f0', fontWeight: 500 }}>{fg.name}</div>
                            </div>

                            {/* Effect - shown when selected */}
                            <AnimatePresence>
                                {selectedFG === idx && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        style={{ marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: `1px solid ${fg.color}30` }}
                                    >
                                        <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginBottom: '0.25rem' }}>Effect:</div>
                                        <div style={{ fontSize: '0.8rem', color: fg.effect.includes('⚠️') ? '#f87171' : '#4ade80', fontWeight: 500 }}>
                                            {fg.effect}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}

                    {/* Warning/Highlight */}
                    {warning && (
                        <div style={{ padding: '0.5rem', background: 'rgba(239,68,68,0.15)', borderRadius: '8px', fontSize: '0.75rem', color: '#fca5a5' }}>
                            ⚠️ {warning}
                        </div>
                    )}
                    {highlight && (
                        <div style={{ padding: '0.5rem', background: 'rgba(34,197,94,0.15)', borderRadius: '8px', fontSize: '0.75rem', color: '#86efac' }}>
                            ✅ {highlight}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
