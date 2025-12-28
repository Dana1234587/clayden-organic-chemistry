'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface HybridizationDiagramProps {
    type?: 'sp3' | 'sp2' | 'sp' | 'comparison';
    showLabels?: boolean;
    interactive?: boolean;
}

const COLORS = {
    sp3: '#22C55E',
    sp2: '#3B82F6',
    sp: '#A855F7',
    orbital: '#6366F1',
    bond: '#374151',
    text: '#1F2937',
    highlight: '#F59E0B',
};

const HybridizationDiagram: React.FC<HybridizationDiagramProps> = ({
    type = 'comparison',
    showLabels = true,
    interactive = true,
}) => {
    const [activeType, setActiveType] = React.useState<'sp3' | 'sp2' | 'sp' | null>(null);

    const renderSP3 = (x: number, y: number, scale: number = 1) => (
        <g transform={`translate(${x}, ${y}) scale(${scale})`}>
            {/* Tetrahedral arrangement - 4 lobes */}
            <ellipse cx="0" cy="-30" rx="12" ry="28" fill={`${COLORS.sp3}40`} stroke={COLORS.sp3} strokeWidth="2" transform="rotate(-15)" />
            <ellipse cx="-25" cy="15" rx="12" ry="28" fill={`${COLORS.sp3}40`} stroke={COLORS.sp3} strokeWidth="2" transform="rotate(105)" />
            <ellipse cx="25" cy="15" rx="12" ry="28" fill={`${COLORS.sp3}40`} stroke={COLORS.sp3} strokeWidth="2" transform="rotate(-105)" />
            <ellipse cx="0" cy="30" rx="12" ry="25" fill={`${COLORS.sp3}20`} stroke={COLORS.sp3} strokeWidth="2" strokeDasharray="4,2" />
            {/* Central atom */}
            <circle cx="0" cy="0" r="8" fill={COLORS.sp3} />
            <text x="0" y="4" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">C</text>
        </g>
    );

    const renderSP2 = (x: number, y: number, scale: number = 1) => (
        <g transform={`translate(${x}, ${y}) scale(${scale})`}>
            {/* Trigonal planar - 3 lobes at 120° */}
            <ellipse cx="0" cy="-30" rx="12" ry="28" fill={`${COLORS.sp2}40`} stroke={COLORS.sp2} strokeWidth="2" />
            <ellipse cx="-26" cy="15" rx="12" ry="28" fill={`${COLORS.sp2}40`} stroke={COLORS.sp2} strokeWidth="2" transform="rotate(120, -26, 15)" />
            <ellipse cx="26" cy="15" rx="12" ry="28" fill={`${COLORS.sp2}40`} stroke={COLORS.sp2} strokeWidth="2" transform="rotate(-120, 26, 15)" />
            {/* p orbital perpendicular */}
            <ellipse cx="0" cy="0" rx="6" ry="20" fill={`${COLORS.highlight}30`} stroke={COLORS.highlight} strokeWidth="1.5" strokeDasharray="3,2" transform="rotate(90)" />
            {/* Central atom */}
            <circle cx="0" cy="0" r="8" fill={COLORS.sp2} />
            <text x="0" y="4" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">C</text>
        </g>
    );

    const renderSP = (x: number, y: number, scale: number = 1) => (
        <g transform={`translate(${x}, ${y}) scale(${scale})`}>
            {/* Linear - 2 lobes at 180° */}
            <ellipse cx="0" cy="-30" rx="12" ry="28" fill={`${COLORS.sp}40`} stroke={COLORS.sp} strokeWidth="2" />
            <ellipse cx="0" cy="30" rx="12" ry="28" fill={`${COLORS.sp}40`} stroke={COLORS.sp} strokeWidth="2" />
            {/* 2 p orbitals perpendicular */}
            <ellipse cx="0" cy="0" rx="6" ry="18" fill={`${COLORS.highlight}30`} stroke={COLORS.highlight} strokeWidth="1.5" strokeDasharray="3,2" transform="rotate(90)" />
            <ellipse cx="0" cy="0" rx="6" ry="18" fill={`${COLORS.highlight}20`} stroke={COLORS.highlight} strokeWidth="1" strokeDasharray="3,2" />
            {/* Central atom */}
            <circle cx="0" cy="0" r="8" fill={COLORS.sp} />
            <text x="0" y="4" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">C</text>
        </g>
    );

    const renderComparison = () => (
        <svg width="100%" height="280" viewBox="0 0 450 280">
            {/* Title */}
            <text x="225" y="25" textAnchor="middle" fontSize="16" fontWeight="bold" fill={COLORS.text}>
                Carbon Hybridization States
            </text>

            {/* sp³ */}
            <g
                style={{ cursor: interactive ? 'pointer' : 'default' }}
                onClick={() => interactive && setActiveType(activeType === 'sp3' ? null : 'sp3')}
            >
                <rect x="20" y="45" width="120" height="180" rx="12"
                    fill={activeType === 'sp3' ? `${COLORS.sp3}15` : 'rgba(255,255,255,0.5)'}
                    stroke={activeType === 'sp3' ? COLORS.sp3 : '#E5E7EB'}
                    strokeWidth={activeType === 'sp3' ? 3 : 1}
                />
                <text x="80" y="70" textAnchor="middle" fontSize="14" fontWeight="bold" fill={COLORS.sp3}>sp³</text>
                {renderSP3(80, 140, 0.9)}
                <text x="80" y="200" textAnchor="middle" fontSize="11" fill={COLORS.text}>Tetrahedral</text>
                <text x="80" y="215" textAnchor="middle" fontSize="10" fill="#6B7280">109.5°</text>
            </g>

            {/* sp² */}
            <g
                style={{ cursor: interactive ? 'pointer' : 'default' }}
                onClick={() => interactive && setActiveType(activeType === 'sp2' ? null : 'sp2')}
            >
                <rect x="165" y="45" width="120" height="180" rx="12"
                    fill={activeType === 'sp2' ? `${COLORS.sp2}15` : 'rgba(255,255,255,0.5)'}
                    stroke={activeType === 'sp2' ? COLORS.sp2 : '#E5E7EB'}
                    strokeWidth={activeType === 'sp2' ? 3 : 1}
                />
                <text x="225" y="70" textAnchor="middle" fontSize="14" fontWeight="bold" fill={COLORS.sp2}>sp²</text>
                {renderSP2(225, 140, 0.9)}
                <text x="225" y="200" textAnchor="middle" fontSize="11" fill={COLORS.text}>Trigonal Planar</text>
                <text x="225" y="215" textAnchor="middle" fontSize="10" fill="#6B7280">120°</text>
            </g>

            {/* sp */}
            <g
                style={{ cursor: interactive ? 'pointer' : 'default' }}
                onClick={() => interactive && setActiveType(activeType === 'sp' ? null : 'sp')}
            >
                <rect x="310" y="45" width="120" height="180" rx="12"
                    fill={activeType === 'sp' ? `${COLORS.sp}15` : 'rgba(255,255,255,0.5)'}
                    stroke={activeType === 'sp' ? COLORS.sp : '#E5E7EB'}
                    strokeWidth={activeType === 'sp' ? 3 : 1}
                />
                <text x="370" y="70" textAnchor="middle" fontSize="14" fontWeight="bold" fill={COLORS.sp}>sp</text>
                {renderSP(370, 140, 0.9)}
                <text x="370" y="200" textAnchor="middle" fontSize="11" fill={COLORS.text}>Linear</text>
                <text x="370" y="215" textAnchor="middle" fontSize="10" fill="#6B7280">180°</text>
            </g>

            {/* Examples row */}
            <text x="80" y="245" textAnchor="middle" fontSize="10" fill="#6B7280">CH₄, C₂H₆</text>
            <text x="225" y="245" textAnchor="middle" fontSize="10" fill="#6B7280">C₂H₄, C₆H₆</text>
            <text x="370" y="245" textAnchor="middle" fontSize="10" fill="#6B7280">C₂H₂, CO₂</text>

            {/* Legend for p orbitals */}
            <g transform="translate(145, 260)">
                <rect x="0" y="0" width="160" height="18" rx="4" fill="rgba(245, 158, 11, 0.1)" stroke={COLORS.highlight} strokeWidth="1" />
                <text x="80" y="13" textAnchor="middle" fontSize="9" fill={COLORS.highlight}>
                    ⚡ Dashed = unhybridized p orbitals (for π bonds)
                </text>
            </g>
        </svg>
    );

    const renderSingle = (hybridType: 'sp3' | 'sp2' | 'sp') => {
        const config = {
            sp3: { render: renderSP3, color: COLORS.sp3, name: 'sp³ Hybridization', shape: 'Tetrahedral', angle: '109.5°', bonds: '4 σ bonds' },
            sp2: { render: renderSP2, color: COLORS.sp2, name: 'sp² Hybridization', shape: 'Trigonal Planar', angle: '120°', bonds: '3 σ + 1 π' },
            sp: { render: renderSP, color: COLORS.sp, name: 'sp Hybridization', shape: 'Linear', angle: '180°', bonds: '2 σ + 2 π' },
        };
        const c = config[hybridType];

        return (
            <svg width="200" height="200" viewBox="-50 -60 200 200">
                {c.render(50, 50, 1.2)}
                {showLabels && (
                    <>
                        <text x="50" y="120" textAnchor="middle" fontSize="14" fontWeight="bold" fill={c.color}>{c.name}</text>
                        <text x="50" y="138" textAnchor="middle" fontSize="11" fill={COLORS.text}>{c.shape} • {c.angle}</text>
                    </>
                )}
            </svg>
        );
    };

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
            {type === 'comparison' ? renderComparison() : renderSingle(type)}

            {/* Info box when active */}
            {activeType && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    style={{
                        marginTop: '0.75rem',
                        padding: '0.75rem',
                        background: activeType === 'sp3' ? `${COLORS.sp3}10` : activeType === 'sp2' ? `${COLORS.sp2}10` : `${COLORS.sp}10`,
                        borderRadius: '8px',
                        fontSize: '0.85rem',
                        color: COLORS.text,
                    }}
                >
                    {activeType === 'sp3' && '🔹 sp³: One s + three p orbitals → 4 equivalent orbitals. Found in single-bonded carbons like methane (CH₄).'}
                    {activeType === 'sp2' && '🔹 sp²: One s + two p orbitals → 3 equivalent orbitals + 1 p for π bonding. Found in alkenes like ethene (C₂H₄).'}
                    {activeType === 'sp' && '🔹 sp: One s + one p orbital → 2 equivalent orbitals + 2 p for π bonds. Found in alkynes like ethyne (C₂H₂).'}
                </motion.div>
            )}
        </motion.div>
    );
};

export default HybridizationDiagram;
