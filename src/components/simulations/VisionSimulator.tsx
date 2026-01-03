'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface VisionSimulatorProps {
    onComplete?: () => void;
}

export default function VisionSimulator({ onComplete }: VisionSimulatorProps) {
    const [isTransformed, setIsTransformed] = useState(false);
    const [isFlashing, setIsFlashing] = useState(false);
    const [showSignal, setShowSignal] = useState(false);

    const handleLightClick = () => {
        if (isTransformed) {
            // Reset
            setIsTransformed(false);
            setShowSignal(false);
            return;
        }

        // Trigger flash effect
        setIsFlashing(true);

        setTimeout(() => {
            setIsFlashing(false);
            setIsTransformed(true);

            setTimeout(() => {
                setShowSignal(true);
                onComplete?.();
            }, 500);
        }, 300);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
                background: 'var(--gradient-card)',
                borderRadius: '20px',
                border: '1px solid var(--neutral-800)',
                padding: '2rem',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* Flash overlay */}
            <AnimatePresence>
                {isFlashing && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'radial-gradient(circle, rgba(255,255,200,0.9) 0%, rgba(255,200,100,0.5) 50%, transparent 100%)',
                            zIndex: 10,
                            pointerEvents: 'none'
                        }}
                    />
                )}
            </AnimatePresence>

            {/* Header */}
            <div style={{
                textAlign: 'center',
                marginBottom: '2rem'
            }}>
                <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, var(--primary-400), var(--accent-cyan))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '0.5rem'
                }}>
                    👁️ Vision Simulator
                </h3>
                <p style={{
                    color: 'var(--neutral-400)',
                    fontSize: '0.9rem'
                }}>
                    See how light triggers vision at the molecular level
                </p>
            </div>

            {/* Molecule Display */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '200px',
                marginBottom: '1.5rem',
                position: 'relative'
            }}>
                {/* Retinal Molecule SVG */}
                <motion.svg
                    viewBox="0 0 400 150"
                    style={{
                        width: '100%',
                        maxWidth: '400px',
                        height: 'auto'
                    }}
                >
                    {/* Background glow when transformed */}
                    {isTransformed && (
                        <motion.circle
                            cx="200"
                            cy="75"
                            r="100"
                            fill="url(#glowGradient)"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 0.3, scale: 1.2 }}
                        />
                    )}

                    <defs>
                        <linearGradient id="moleculeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor={isTransformed ? "#f97316" : "#3b82f6"} />
                            <stop offset="100%" stopColor={isTransformed ? "#fbbf24" : "#8b5cf6"} />
                        </linearGradient>
                        <radialGradient id="glowGradient">
                            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
                        </radialGradient>
                    </defs>

                    {/* Cyclohexene Ring */}
                    <motion.g
                        animate={{ x: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                        <polygon
                            points="30,75 45,50 75,50 90,75 75,100 45,100"
                            fill="none"
                            stroke="url(#moleculeGradient)"
                            strokeWidth="3"
                        />
                        {/* Methyl groups */}
                        <circle cx="30" cy="45" r="8" fill="url(#moleculeGradient)" opacity="0.7" />
                        <circle cx="30" cy="105" r="8" fill="url(#moleculeGradient)" opacity="0.7" />
                    </motion.g>

                    {/* Polyene Chain - The part that changes! */}
                    <motion.path
                        d={isTransformed
                            ? "M 90 75 L 120 60 L 150 75 L 180 60 L 210 75 L 240 60 L 270 75 L 300 60 L 330 75 L 360 60"
                            : "M 90 75 L 120 60 L 150 75 L 180 60 L 210 75 L 240 90 L 260 70 L 280 100 L 310 80 L 340 100"
                        }
                        fill="none"
                        stroke="url(#moleculeGradient)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        animate={{
                            d: isTransformed
                                ? "M 90 75 L 120 60 L 150 75 L 180 60 L 210 75 L 240 60 L 270 75 L 300 60 L 330 75 L 360 60"
                                : "M 90 75 L 120 60 L 150 75 L 180 60 L 210 75 L 240 90 L 260 70 L 280 100 L 310 80 L 340 100"
                        }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    />

                    {/* Carbon atoms along chain */}
                    {[90, 120, 150, 180, 210].map((x, i) => (
                        <motion.circle
                            key={i}
                            cx={x}
                            cy={i % 2 === 0 ? 75 : 60}
                            r="5"
                            fill="url(#moleculeGradient)"
                        />
                    ))}

                    {/* Aldehyde group at end */}
                    <motion.g
                        animate={{
                            x: isTransformed ? 0 : -20,
                            y: isTransformed ? 0 : 30
                        }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                        <circle
                            cx={isTransformed ? 370 : 350}
                            cy={isTransformed ? 55 : 95}
                            r="12"
                            fill="#ef4444"
                            opacity="0.8"
                        />
                        <text
                            x={isTransformed ? 370 : 350}
                            y={isTransformed ? 60 : 100}
                            textAnchor="middle"
                            fill="white"
                            fontSize="10"
                            fontWeight="bold"
                        >
                            O
                        </text>
                    </motion.g>

                    {/* Labels */}
                    <text x="60" y="130" textAnchor="middle" fill="var(--neutral-500)" fontSize="10">
                        β-ionone ring
                    </text>
                    <motion.text
                        x="230"
                        y="130"
                        textAnchor="middle"
                        fill={isTransformed ? "#f97316" : "#3b82f6"}
                        fontSize="11"
                        fontWeight="600"
                    >
                        {isTransformed ? "All-trans (straight)" : "11-cis (bent)"}
                    </motion.text>
                </motion.svg>
            </div>

            {/* Light Button */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '1.5rem'
            }}>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLightClick}
                    style={{
                        padding: '1rem 2rem',
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        color: isTransformed ? 'var(--neutral-900)' : 'white',
                        background: isTransformed
                            ? 'linear-gradient(135deg, #fbbf24, #f59e0b)'
                            : 'linear-gradient(135deg, var(--primary-500), var(--primary-600))',
                        border: 'none',
                        borderRadius: '50px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        boxShadow: isTransformed
                            ? '0 0 30px rgba(251, 191, 36, 0.5)'
                            : '0 4px 20px rgba(139, 92, 246, 0.3)',
                        transition: 'all 0.3s'
                    }}
                >
                    <span style={{ fontSize: '1.5rem' }}>
                        {isTransformed ? '🔄' : '☀️'}
                    </span>
                    {isTransformed ? 'Reset Molecule' : 'Flash Light!'}
                </motion.button>
            </div>

            {/* Signal Message */}
            <AnimatePresence>
                {showSignal && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20 }}
                        style={{
                            textAlign: 'center',
                            padding: '1.5rem',
                            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(6, 182, 212, 0.2))',
                            borderRadius: '16px',
                            border: '1px solid rgba(16, 185, 129, 0.3)'
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                            style={{ fontSize: '3rem', marginBottom: '0.5rem' }}
                        >
                            👁️✨
                        </motion.div>
                        <h4 style={{
                            fontSize: '1.2rem',
                            fontWeight: 700,
                            color: 'var(--accent-emerald)',
                            marginBottom: '0.5rem'
                        }}>
                            Shape Changed! Signal Sent to Brain!
                        </h4>
                        <p style={{
                            color: 'var(--neutral-400)',
                            fontSize: '0.9rem',
                            maxWidth: '400px',
                            margin: '0 auto'
                        }}>
                            The cis-to-trans isomerization triggers a cascade of signals
                            that your brain interprets as <strong style={{ color: 'var(--accent-cyan)' }}>VISION</strong>!
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Info Box */}
            <div style={{
                marginTop: '1.5rem',
                padding: '1rem',
                background: 'rgba(139, 92, 246, 0.1)',
                borderRadius: '12px',
                border: '1px solid rgba(139, 92, 246, 0.2)'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem'
                }}>
                    <span style={{ fontSize: '1.25rem' }}>💡</span>
                    <div>
                        <p style={{
                            fontSize: '0.85rem',
                            color: 'var(--neutral-300)',
                            margin: 0,
                            lineHeight: 1.6
                        }}>
                            <strong>Did you know?</strong> This tiny molecular shape change happens in
                            just <strong style={{ color: 'var(--primary-400)' }}>200 femtoseconds</strong> —
                            that's 0.0000000000002 seconds! It's one of the fastest chemical reactions known.
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
