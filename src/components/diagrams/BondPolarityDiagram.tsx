'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface BondPolarityDiagramProps {
    type?: 'scale' | 'molecules' | 'comparison';
    showLabels?: boolean;
}

const COLORS = {
    electronegative: '#EF4444',  // Red for δ-
    electropositive: '#3B82F6',  // Blue for δ+
    bond: '#374151',
    text: '#1F2937',
    neutral: '#9CA3AF',
};

const BondPolarityDiagram: React.FC<BondPolarityDiagramProps> = ({
    type = 'scale',
    showLabels = true,
}) => {
    const [hoveredElement, setHoveredElement] = React.useState<string | null>(null);

    const elements = [
        { symbol: 'F', en: 4.0, name: 'Fluorine' },
        { symbol: 'O', en: 3.5, name: 'Oxygen' },
        { symbol: 'N', en: 3.0, name: 'Nitrogen' },
        { symbol: 'Cl', en: 3.0, name: 'Chlorine' },
        { symbol: 'Br', en: 2.8, name: 'Bromine' },
        { symbol: 'C', en: 2.5, name: 'Carbon' },
        { symbol: 'H', en: 2.1, name: 'Hydrogen' },
    ];

    const renderScale = () => (
        <svg width="100%" height="200" viewBox="0 0 400 200">
            {/* Title */}
            <text x="200" y="25" textAnchor="middle" fontSize="14" fontWeight="bold" fill={COLORS.text}>
                Electronegativity Scale (Pauling)
            </text>

            {/* Gradient bar */}
            <defs>
                <linearGradient id="enGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor={COLORS.electropositive} />
                    <stop offset="50%" stopColor="#A855F7" />
                    <stop offset="100%" stopColor={COLORS.electronegative} />
                </linearGradient>
            </defs>
            <rect x="40" y="45" width="320" height="20" rx="4" fill="url(#enGradient)" />

            {/* Scale labels */}
            <text x="40" y="80" fontSize="10" fill={COLORS.neutral}>2.0</text>
            <text x="200" y="80" textAnchor="middle" fontSize="10" fill={COLORS.neutral}>3.0</text>
            <text x="360" y="80" textAnchor="end" fontSize="10" fill={COLORS.neutral}>4.0</text>

            {/* Arrow */}
            <text x="40" y="95" fontSize="10" fill={COLORS.electropositive}>← Less EN</text>
            <text x="360" y="95" textAnchor="end" fontSize="10" fill={COLORS.electronegative}>More EN →</text>

            {/* Elements */}
            {elements.map((el, i) => {
                const x = 40 + ((el.en - 2.0) / 2.0) * 320;
                const isHovered = hoveredElement === el.symbol;
                return (
                    <g
                        key={el.symbol}
                        onMouseEnter={() => setHoveredElement(el.symbol)}
                        onMouseLeave={() => setHoveredElement(null)}
                        style={{ cursor: 'pointer' }}
                    >
                        <circle
                            cx={x}
                            cy="130"
                            r={isHovered ? 22 : 18}
                            fill={el.en > 3.0 ? `${COLORS.electronegative}${isHovered ? '' : '80'}` :
                                el.en < 2.5 ? `${COLORS.electropositive}${isHovered ? '' : '80'}` :
                                    `#A855F7${isHovered ? '' : '80'}`}
                            stroke={isHovered ? COLORS.text : 'none'}
                            strokeWidth={2}
                        />
                        <text
                            x={x}
                            y="135"
                            textAnchor="middle"
                            fontSize={isHovered ? 14 : 12}
                            fontWeight="bold"
                            fill="white"
                        >
                            {el.symbol}
                        </text>
                        <text
                            x={x}
                            y="160"
                            textAnchor="middle"
                            fontSize="9"
                            fill={COLORS.neutral}
                        >
                            {el.en}
                        </text>
                        {isHovered && (
                            <text x={x} y="180" textAnchor="middle" fontSize="10" fill={COLORS.text}>
                                {el.name}
                            </text>
                        )}
                    </g>
                );
            })}
        </svg>
    );

    const renderPolarBond = (atom1: string, atom2: string, x: number, y: number, label: string, polar: boolean) => (
        <g transform={`translate(${x}, ${y})`}>
            {/* Bond line */}
            <line x1="0" y1="0" x2="60" y2="0" stroke={COLORS.bond} strokeWidth="3" />

            {/* Atoms */}
            <circle cx="0" cy="0" r="15" fill={polar ? COLORS.electropositive : COLORS.neutral} />
            <text x="0" y="5" textAnchor="middle" fontSize="12" fontWeight="bold" fill="white">{atom1}</text>

            <circle cx="60" cy="0" r="15" fill={polar ? COLORS.electronegative : COLORS.neutral} />
            <text x="60" y="5" textAnchor="middle" fontSize="12" fontWeight="bold" fill="white">{atom2}</text>

            {/* Polarity indicators */}
            {polar && (
                <>
                    <text x="0" y="-22" textAnchor="middle" fontSize="11" fill={COLORS.electropositive}>δ+</text>
                    <text x="60" y="-22" textAnchor="middle" fontSize="11" fill={COLORS.electronegative}>δ−</text>
                    {/* Dipole arrow */}
                    <line x1="10" y1="22" x2="50" y2="22" stroke={COLORS.text} strokeWidth="1.5" markerEnd="url(#arrow)" />
                </>
            )}

            {/* Label */}
            <text x="30" y="45" textAnchor="middle" fontSize="10" fill={COLORS.text}>{label}</text>
        </g>
    );

    const renderMolecules = () => (
        <svg width="100%" height="220" viewBox="0 0 400 220">
            <defs>
                <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <path d="M0,0 L0,6 L6,3 z" fill={COLORS.text} />
                </marker>
            </defs>

            {/* Title */}
            <text x="200" y="25" textAnchor="middle" fontSize="14" fontWeight="bold" fill={COLORS.text}>
                Polar vs Nonpolar Bonds
            </text>

            {/* Polar bonds */}
            <text x="120" y="55" textAnchor="middle" fontSize="12" fill={COLORS.electronegative} fontWeight="600">
                POLAR
            </text>
            {renderPolarBond('C', 'O', 70, 90, 'C—O (ΔEN = 1.0)', true)}
            {renderPolarBond('O', 'H', 70, 160, 'O—H (ΔEN = 1.4)', true)}

            {/* Separator */}
            <line x1="200" y1="60" x2="200" y2="200" stroke="#E5E7EB" strokeWidth="2" strokeDasharray="4,4" />

            {/* Nonpolar bonds */}
            <text x="280" y="55" textAnchor="middle" fontSize="12" fill={COLORS.neutral} fontWeight="600">
                NONPOLAR
            </text>
            {renderPolarBond('C', 'C', 230, 90, 'C—C (ΔEN = 0)', false)}
            {renderPolarBond('C', 'H', 230, 160, 'C—H (ΔEN = 0.4)', false)}
        </svg>
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '16px',
                padding: '1rem',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                display: 'inline-block',
            }}
        >
            {type === 'scale' && renderScale()}
            {type === 'molecules' && renderMolecules()}
            {type === 'comparison' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {renderScale()}
                    <div style={{ height: '1px', background: '#E5E7EB', margin: '0.5rem 0' }} />
                    {renderMolecules()}
                </div>
            )}
        </motion.div>
    );
};

export default BondPolarityDiagram;
