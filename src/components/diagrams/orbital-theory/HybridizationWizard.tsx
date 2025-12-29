'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type HybridType = 'sp3' | 'sp2' | 'sp';

interface HybridizationData {
    name: string;
    mixing: string;
    geometry: string;
    angle: number;
    unhybridizedP: number;
    sigmaBonds: number;
    piBonds: number;
    example: string;
    formula: string;
    color: string;
}

const hybridizationData: Record<HybridType, HybridizationData> = {
    sp3: {
        name: 'sp³',
        mixing: '1 × 2s + 3 × 2p → 4 × sp³',
        geometry: 'Tetrahedral',
        angle: 109.5,
        unhybridizedP: 0,
        sigmaBonds: 4,
        piBonds: 0,
        example: 'Methane (CH₄)',
        formula: 'CH₄',
        color: '#22c55e'
    },
    sp2: {
        name: 'sp²',
        mixing: '1 × 2s + 2 × 2p → 3 × sp²',
        geometry: 'Trigonal Planar',
        angle: 120,
        unhybridizedP: 1,
        sigmaBonds: 3,
        piBonds: 1,
        example: 'Ethene (C₂H₄)',
        formula: 'H₂C=CH₂',
        color: '#8b5cf6'
    },
    sp: {
        name: 'sp',
        mixing: '1 × 2s + 1 × 2p → 2 × sp',
        geometry: 'Linear',
        angle: 180,
        unhybridizedP: 2,
        sigmaBonds: 2,
        piBonds: 2,
        example: 'Ethyne (C₂H₂)',
        formula: 'HC≡CH',
        color: '#f59e0b'
    }
};

export default function HybridizationWizard() {
    const [selectedType, setSelectedType] = useState<HybridType>('sp3');
    const [showAnimation, setShowAnimation] = useState(false);
    const data = hybridizationData[selectedType];

    const handleTypeChange = (type: HybridType) => {
        setShowAnimation(true);
        setTimeout(() => {
            setSelectedType(type);
            setTimeout(() => setShowAnimation(false), 100);
        }, 300);
    };

    // SVG Orbital visualization
    const renderOrbitals = () => {
        const centerX = 200;
        const centerY = 150;
        const radius = 80;

        if (selectedType === 'sp3') {
            // Tetrahedral - 4 lobes
            const angles = [0, 109.5, 219, 328.5];
            return angles.map((angle, i) => {
                const rad = (angle * Math.PI) / 180;
                const x = centerX + Math.cos(rad) * radius * 0.7;
                const y = centerY + Math.sin(rad) * radius * 0.5;
                return (
                    <motion.ellipse
                        key={i}
                        cx={x}
                        cy={y}
                        rx={35}
                        ry={20}
                        fill={data.color}
                        opacity={0.7}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.15, duration: 0.4 }}
                        style={{ transformOrigin: `${centerX}px ${centerY}px` }}
                        transform={`rotate(${angle}, ${x}, ${y})`}
                    />
                );
            });
        } else if (selectedType === 'sp2') {
            // Trigonal planar - 3 lobes + 1 p orbital
            const angles = [0, 120, 240];
            return (
                <>
                    {angles.map((angle, i) => {
                        const rad = (angle * Math.PI) / 180;
                        const x = centerX + Math.cos(rad) * radius * 0.6;
                        const y = centerY + Math.sin(rad) * radius * 0.5;
                        return (
                            <motion.ellipse
                                key={i}
                                cx={x}
                                cy={y}
                                rx={30}
                                ry={18}
                                fill={data.color}
                                opacity={0.7}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: i * 0.15, duration: 0.4 }}
                                transform={`rotate(${angle}, ${x}, ${y})`}
                            />
                        );
                    })}
                    {/* Unhybridized p orbital */}
                    <motion.ellipse
                        cx={centerX}
                        cy={centerY - 55}
                        rx={18}
                        ry={35}
                        fill="#3b82f6"
                        opacity={0.5}
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ delay: 0.5, duration: 0.3 }}
                    />
                    <motion.ellipse
                        cx={centerX}
                        cy={centerY + 55}
                        rx={18}
                        ry={35}
                        fill="#f97316"
                        opacity={0.5}
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ delay: 0.5, duration: 0.3 }}
                    />
                </>
            );
        } else {
            // Linear - 2 lobes + 2 p orbitals
            return (
                <>
                    {/* sp hybrid orbitals */}
                    <motion.ellipse
                        cx={centerX - 60}
                        cy={centerY}
                        rx={40}
                        ry={20}
                        fill={data.color}
                        opacity={0.7}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.4 }}
                    />
                    <motion.ellipse
                        cx={centerX + 60}
                        cy={centerY}
                        rx={40}
                        ry={20}
                        fill={data.color}
                        opacity={0.7}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                    />
                    {/* Unhybridized p orbitals (vertical) */}
                    <motion.ellipse
                        cx={centerX}
                        cy={centerY - 50}
                        rx={15}
                        ry={30}
                        fill="#3b82f6"
                        opacity={0.5}
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ delay: 0.4, duration: 0.3 }}
                    />
                    <motion.ellipse
                        cx={centerX}
                        cy={centerY + 50}
                        rx={15}
                        ry={30}
                        fill="#f97316"
                        opacity={0.5}
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ delay: 0.4, duration: 0.3 }}
                    />
                    {/* Second p orbital (horizontal perpendicular) */}
                    <motion.ellipse
                        cx={centerX - 35}
                        cy={centerY}
                        rx={12}
                        ry={25}
                        fill="#10b981"
                        opacity={0.4}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.6, duration: 0.3 }}
                        transform={`rotate(90, ${centerX - 35}, ${centerY})`}
                    />
                    <motion.ellipse
                        cx={centerX + 35}
                        cy={centerY}
                        rx={12}
                        ry={25}
                        fill="#ec4899"
                        opacity={0.4}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.6, duration: 0.3 }}
                        transform={`rotate(90, ${centerX + 35}, ${centerY})`}
                    />
                </>
            );
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
                background: 'linear-gradient(135deg, rgba(20, 20, 35, 0.95), rgba(30, 30, 50, 0.9))',
                borderRadius: 20,
                padding: '1.5rem',
                border: `2px solid ${data.color}40`,
                maxWidth: '100%',
            }}
        >
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{
                    margin: 0,
                    color: 'white',
                    fontSize: '1.3rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                }}>
                    🧙‍♂️ Hybridization Wizard
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', margin: '0.5rem 0 0' }}>
                    See how atomic orbitals combine to form hybrid orbitals
                </p>
            </div>

            {/* Type Selector */}
            <div style={{
                display: 'flex',
                gap: '0.75rem',
                marginBottom: '1.5rem',
                justifyContent: 'center',
                flexWrap: 'wrap'
            }}>
                {(['sp3', 'sp2', 'sp'] as HybridType[]).map(type => (
                    <motion.button
                        key={type}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleTypeChange(type)}
                        style={{
                            padding: '0.75rem 1.5rem',
                            background: selectedType === type
                                ? `linear-gradient(135deg, ${hybridizationData[type].color}, ${hybridizationData[type].color}80)`
                                : 'rgba(255,255,255,0.1)',
                            border: `2px solid ${hybridizationData[type].color}`,
                            borderRadius: 12,
                            color: 'white',
                            fontWeight: 700,
                            fontSize: '1.1rem',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                        }}
                    >
                        {hybridizationData[type].name}
                    </motion.button>
                ))}
            </div>

            {/* Visualization */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={selectedType}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                        background: 'rgba(0,0,0,0.3)',
                        borderRadius: 16,
                        padding: '1rem',
                        marginBottom: '1.5rem',
                    }}
                >
                    <svg width="100%" height="300" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet">
                        {/* Central atom */}
                        <circle cx="200" cy="150" r="20" fill={data.color} />
                        <text x="200" y="155" textAnchor="middle" fill="white" fontWeight="bold" fontSize="14">
                            C
                        </text>

                        {/* Orbitals */}
                        {renderOrbitals()}

                        {/* Angle indicator */}
                        <text x="200" y="280" textAnchor="middle" fill="white" fontSize="16" fontWeight="600">
                            Bond Angle: {data.angle}°
                        </text>

                        {/* Geometry label */}
                        <text x="200" y="30" textAnchor="middle" fill={data.color} fontSize="18" fontWeight="bold">
                            {data.geometry}
                        </text>
                    </svg>
                </motion.div>
            </AnimatePresence>

            {/* Info Cards */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '0.75rem',
                marginBottom: '1rem'
            }}>
                <div style={cardStyle}>
                    <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>MIXING</div>
                    <div style={{ fontSize: '0.8rem', color: 'white', fontWeight: 600 }}>{data.mixing}</div>
                </div>
                <div style={cardStyle}>
                    <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>σ BONDS</div>
                    <div style={{ fontSize: '1.5rem', color: '#3b82f6', fontWeight: 700 }}>{data.sigmaBonds}</div>
                </div>
                <div style={cardStyle}>
                    <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>π BONDS POSSIBLE</div>
                    <div style={{ fontSize: '1.5rem', color: '#8b5cf6', fontWeight: 700 }}>{data.piBonds}</div>
                </div>
                <div style={cardStyle}>
                    <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>UNHYBRIDIZED p</div>
                    <div style={{ fontSize: '1.5rem', color: '#f97316', fontWeight: 700 }}>{data.unhybridizedP}</div>
                </div>
            </div>

            {/* Example */}
            <div style={{
                background: `linear-gradient(135deg, ${data.color}20, ${data.color}10)`,
                borderRadius: 12,
                padding: '1rem',
                textAlign: 'center',
                border: `1px solid ${data.color}40`,
            }}>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>EXAMPLE MOLECULE</div>
                <div style={{ fontSize: '1.2rem', color: 'white', fontWeight: 700 }}>{data.example}</div>
                <div style={{ fontSize: '1.5rem', color: data.color, fontFamily: 'monospace', marginTop: 4 }}>
                    {data.formula}
                </div>
            </div>

            {/* Legend */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '1.5rem',
                marginTop: '1rem',
                fontSize: '0.7rem',
                flexWrap: 'wrap'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: data.color }} />
                    <span style={{ color: 'rgba(255,255,255,0.7)' }}>Hybrid orbital</span>
                </div>
                {data.unhybridizedP > 0 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#3b82f6' }} />
                        <span style={{ color: 'rgba(255,255,255,0.7)' }}>Unhybridized p</span>
                    </div>
                )}
            </div>
        </motion.div>
    );
}

const cardStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.05)',
    borderRadius: 10,
    padding: '0.75rem',
    textAlign: 'center',
};
