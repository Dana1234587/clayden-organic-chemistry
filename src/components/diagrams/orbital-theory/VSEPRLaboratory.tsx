'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

interface GeometryInfo {
    name: string;
    angle: string;
    description: string;
    example: string;
    color: string;
}

const geometryTable: Record<string, GeometryInfo> = {
    '2-0': { name: 'Linear', angle: '180°', description: 'Two bonds point in opposite directions', example: 'CO₂, BeCl₂', color: '#3b82f6' },
    '3-0': { name: 'Trigonal Planar', angle: '120°', description: 'Three bonds in a flat triangle', example: 'BF₃, CO₃²⁻', color: '#8b5cf6' },
    '2-1': { name: 'Bent', angle: '~117°', description: 'Lone pair pushes bonds together', example: 'SO₂, O₃', color: '#f59e0b' },
    '4-0': { name: 'Tetrahedral', angle: '109.5°', description: 'Four bonds pointing to tetrahedron corners', example: 'CH₄, CCl₄', color: '#22c55e' },
    '3-1': { name: 'Trigonal Pyramidal', angle: '~107°', description: 'One lone pair on top of pyramid', example: 'NH₃, PH₃', color: '#06b6d4' },
    '2-2': { name: 'Bent', angle: '~104.5°', description: 'Two lone pairs compress the angle', example: 'H₂O, H₂S', color: '#ef4444' },
    '5-0': { name: 'Trigonal Bipyramidal', angle: '90°/120°', description: 'Five bonds in two environments', example: 'PCl₅', color: '#ec4899' },
    '4-1': { name: 'See-saw', angle: '~117°/~90°', description: 'One equatorial lone pair', example: 'SF₄', color: '#14b8a6' },
    '3-2': { name: 'T-shaped', angle: '~90°', description: 'Two equatorial lone pairs', example: 'ClF₃', color: '#6366f1' },
    '2-3': { name: 'Linear', angle: '180°', description: 'Three equatorial lone pairs', example: 'XeF₂, I₃⁻', color: '#a855f7' },
};

export default function VSEPRLaboratory() {
    const [bondingPairs, setBondingPairs] = useState(4);
    const [lonePairs, setLonePairs] = useState(0);

    const totalPairs = bondingPairs + lonePairs;
    const key = `${bondingPairs}-${lonePairs}`;
    const geometry = geometryTable[key];

    // Calculate positions for visualization
    const positions = useMemo(() => {
        const centerX = 150;
        const centerY = 120;
        const radius = 70;
        const total = bondingPairs + lonePairs;
        const result: { x: number; y: number; isLone: boolean; angle: number }[] = [];

        if (total === 2) {
            result.push({ x: centerX - radius, y: centerY, isLone: false, angle: 180 });
            result.push({ x: centerX + radius, y: centerY, isLone: lonePairs > 0, angle: 0 });
        } else if (total === 3) {
            for (let i = 0; i < 3; i++) {
                const angle = (i * 120 - 90) * Math.PI / 180;
                result.push({
                    x: centerX + Math.cos(angle) * radius,
                    y: centerY + Math.sin(angle) * radius,
                    isLone: i >= bondingPairs,
                    angle: i * 120 - 90
                });
            }
        } else if (total === 4) {
            // Tetrahedral projection
            const angles = [-45, 45, 180, 225];
            const yOffsets = [-30, -30, 30, 30];
            for (let i = 0; i < 4; i++) {
                const angle = angles[i] * Math.PI / 180;
                result.push({
                    x: centerX + Math.cos(angle) * radius * 0.7,
                    y: centerY + yOffsets[i] + Math.sin(angle) * radius * 0.3,
                    isLone: i >= bondingPairs,
                    angle: angles[i]
                });
            }
        } else if (total === 5) {
            // Trigonal bipyramidal
            // Axial positions
            result.push({ x: centerX, y: centerY - radius, isLone: bondingPairs < 5, angle: -90 });
            result.push({ x: centerX, y: centerY + radius, isLone: bondingPairs < 4, angle: 90 });
            // Equatorial positions
            for (let i = 0; i < 3; i++) {
                const angle = (i * 120) * Math.PI / 180;
                result.push({
                    x: centerX + Math.cos(angle) * radius * 0.8,
                    y: centerY + Math.sin(angle) * radius * 0.4,
                    isLone: i + 2 >= bondingPairs,
                    angle: i * 120
                });
            }
        }

        return result;
    }, [bondingPairs, lonePairs]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
                background: 'linear-gradient(135deg, rgba(20, 25, 40, 0.95), rgba(30, 35, 55, 0.9))',
                borderRadius: 20,
                padding: '1.5rem',
                border: geometry ? `2px solid ${geometry.color}40` : '2px solid rgba(255,255,255,0.1)',
                maxWidth: '100%',
            }}
        >
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ margin: 0, color: 'white', fontSize: '1.3rem' }}>
                    🔬 VSEPR Laboratory
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', margin: '0.5rem 0 0' }}>
                    Predict molecular geometry from electron pairs
                </p>
            </div>

            {/* Controls */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                marginBottom: '1.5rem'
            }}>
                {/* Bonding Pairs Slider */}
                <div style={controlBoxStyle}>
                    <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', display: 'block', marginBottom: 8 }}>
                        Bonding Pairs
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <button
                            onClick={() => setBondingPairs(Math.max(2, bondingPairs - 1))}
                            style={buttonStyle}
                        >−</button>
                        <span style={{ fontSize: '2rem', fontWeight: 700, color: '#3b82f6', minWidth: 40, textAlign: 'center' }}>
                            {bondingPairs}
                        </span>
                        <button
                            onClick={() => setBondingPairs(Math.min(5, bondingPairs + 1))}
                            style={buttonStyle}
                        >+</button>
                    </div>
                </div>

                {/* Lone Pairs Slider */}
                <div style={controlBoxStyle}>
                    <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', display: 'block', marginBottom: 8 }}>
                        Lone Pairs
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <button
                            onClick={() => setLonePairs(Math.max(0, lonePairs - 1))}
                            style={buttonStyle}
                        >−</button>
                        <span style={{ fontSize: '2rem', fontWeight: 700, color: '#22c55e', minWidth: 40, textAlign: 'center' }}>
                            {lonePairs}
                        </span>
                        <button
                            onClick={() => setLonePairs(Math.min(3, lonePairs + 1))}
                            style={buttonStyle}
                        >+</button>
                    </div>
                </div>
            </div>

            {/* Visualization */}
            <div style={{
                background: 'rgba(0,0,0,0.3)',
                borderRadius: 16,
                padding: '1rem',
                marginBottom: '1rem',
            }}>
                <svg width="100%" height="240" viewBox="0 0 300 240" preserveAspectRatio="xMidYMid meet">
                    {/* Central atom */}
                    <circle cx="150" cy="120" r="25" fill={geometry?.color || '#6b7280'} />
                    <text x="150" y="127" textAnchor="middle" fill="white" fontWeight="bold" fontSize="16">
                        A
                    </text>

                    {/* Electron pairs */}
                    {positions.map((pos, i) => (
                        <g key={i}>
                            {/* Bond line */}
                            <motion.line
                                x1={150}
                                y1={120}
                                x2={pos.x}
                                y2={pos.y}
                                stroke={pos.isLone ? '#22c55e' : '#3b82f6'}
                                strokeWidth={pos.isLone ? 4 : 6}
                                strokeDasharray={pos.isLone ? '8 4' : '0'}
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.4, delay: i * 0.1 }}
                            />

                            {/* Atom or lone pair */}
                            <motion.circle
                                cx={pos.x}
                                cy={pos.y}
                                r={pos.isLone ? 12 : 18}
                                fill={pos.isLone ? '#22c55e' : '#3b82f6'}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: i * 0.1 + 0.2 }}
                            />
                            <text
                                x={pos.x}
                                y={pos.y + 5}
                                textAnchor="middle"
                                fill="white"
                                fontSize={pos.isLone ? 10 : 14}
                                fontWeight="bold"
                            >
                                {pos.isLone ? 'LP' : 'X'}
                            </text>
                        </g>
                    ))}

                    {/* Total pairs info */}
                    <text x="150" y="230" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="12">
                        Total electron pairs: {totalPairs}
                    </text>
                </svg>
            </div>

            {/* Result */}
            {geometry ? (
                <motion.div
                    key={key}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{
                        background: `linear-gradient(135deg, ${geometry.color}20, ${geometry.color}10)`,
                        borderRadius: 16,
                        padding: '1.25rem',
                        border: `2px solid ${geometry.color}60`,
                        textAlign: 'center',
                    }}
                >
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: geometry.color, marginBottom: 8 }}>
                        {geometry.name}
                    </div>
                    <div style={{ fontSize: '2rem', fontWeight: 800, color: 'white', marginBottom: 8 }}>
                        {geometry.angle}
                    </div>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', margin: '0 0 0.75rem' }}>
                        {geometry.description}
                    </p>
                    <div style={{
                        background: 'rgba(0,0,0,0.3)',
                        borderRadius: 8,
                        padding: '0.5rem 1rem',
                        display: 'inline-block'
                    }}>
                        <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem' }}>Examples: </span>
                        <span style={{ color: 'white', fontWeight: 600 }}>{geometry.example}</span>
                    </div>
                </motion.div>
            ) : (
                <div style={{
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: 16,
                    padding: '1.25rem',
                    textAlign: 'center',
                    color: 'rgba(255,255,255,0.5)'
                }}>
                    This combination is not common. Try different values!
                </div>
            )}

            {/* Legend */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '2rem',
                marginTop: '1rem',
                fontSize: '0.75rem'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 16, height: 16, borderRadius: '50%', background: '#3b82f6' }} />
                    <span style={{ color: 'rgba(255,255,255,0.7)' }}>Bonding Pair (X)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#22c55e' }} />
                    <span style={{ color: 'rgba(255,255,255,0.7)' }}>Lone Pair (LP)</span>
                </div>
            </div>
        </motion.div>
    );
}

const controlBoxStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    padding: '1rem',
    textAlign: 'center',
};

const buttonStyle: React.CSSProperties = {
    width: 36,
    height: 36,
    borderRadius: '50%',
    border: 'none',
    background: 'rgba(255,255,255,0.1)',
    color: 'white',
    fontSize: '1.25rem',
    fontWeight: 700,
    cursor: 'pointer',
    transition: 'background 0.2s',
};
