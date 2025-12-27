'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

type DiagramType = 'hybridization' | 'bonding' | 'electronegativity';

interface ConceptDiagramProps {
    type: DiagramType;
    title?: string;
}

export default function ConceptDiagram({ type, title }: ConceptDiagramProps) {
    const [activeTab, setActiveTab] = useState(0);

    const renderHybridizationDiagram = () => {
        const hybridizations = [
            {
                name: 'sp³',
                shape: 'Tetrahedral',
                angle: '109.5°',
                example: 'Methane (CH₄)',
                description: '1s + 3p orbitals → 4 equivalent sp³ orbitals',
                color: '#8b5cf6'
            },
            {
                name: 'sp²',
                shape: 'Trigonal Planar',
                angle: '120°',
                example: 'Ethene (C₂H₄)',
                description: '1s + 2p orbitals → 3 equivalent sp² orbitals + 1 unhybridized p',
                color: '#06b6d4'
            },
            {
                name: 'sp',
                shape: 'Linear',
                angle: '180°',
                example: 'Ethyne (C₂H₂)',
                description: '1s + 1p orbital → 2 equivalent sp orbitals + 2 unhybridized p',
                color: '#f59e0b'
            }
        ];

        const current = hybridizations[activeTab];

        return (
            <>
                {/* Tabs */}
                <div style={{
                    display: 'flex',
                    gap: '0.5rem',
                    marginBottom: '1.5rem'
                }}>
                    {hybridizations.map((h, index) => (
                        <button
                            key={h.name}
                            onClick={() => setActiveTab(index)}
                            style={{
                                flex: 1,
                                padding: '0.75rem',
                                background: activeTab === index
                                    ? `linear-gradient(135deg, ${h.color}33 0%, ${h.color}11 100%)`
                                    : 'var(--neutral-800)',
                                border: activeTab === index
                                    ? `2px solid ${h.color}`
                                    : '1px solid var(--neutral-700)',
                                borderRadius: '12px',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                        >
                            <div style={{
                                fontSize: '1.25rem',
                                fontWeight: 700,
                                color: activeTab === index ? h.color : 'var(--neutral-400)'
                            }}>
                                {h.name}
                            </div>
                            <div style={{
                                fontSize: '0.75rem',
                                color: 'var(--neutral-400)'
                            }}>
                                {h.shape}
                            </div>
                        </button>
                    ))}
                </div>

                {/* 3D Visualization */}
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                        background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 100%)',
                        borderRadius: '16px',
                        padding: '2rem',
                        textAlign: 'center',
                        perspective: '800px'
                    }}
                >
                    {/* 3D Container */}
                    <motion.div
                        animate={{ rotateY: [0, 5, 0, -5, 0] }}
                        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                        style={{
                            transformStyle: 'preserve-3d',
                            width: '280px',
                            height: '220px',
                            margin: '0 auto',
                            position: 'relative'
                        }}
                    >
                        {activeTab === 0 && (
                            // 3D Tetrahedral sp³
                            <div style={{ transformStyle: 'preserve-3d', position: 'relative', width: '100%', height: '100%' }}>
                                {/* Central Carbon */}
                                <motion.div
                                    animate={{ scale: [1, 1.05, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    style={{
                                        position: 'absolute',
                                        left: '50%',
                                        top: '50%',
                                        transform: 'translate(-50%, -50%) translateZ(30px)',
                                        width: '50px',
                                        height: '50px',
                                        borderRadius: '50%',
                                        background: `radial-gradient(circle at 30% 30%, ${current.color}, ${current.color}88)`,
                                        boxShadow: `0 0 30px ${current.color}66, inset 0 -5px 15px rgba(0,0,0,0.3)`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '1.25rem',
                                        fontWeight: 'bold',
                                        color: 'white'
                                    }}
                                >
                                    C
                                </motion.div>

                                {/* Bonds and H atoms with 3D positioning */}
                                {[
                                    { x: -55, y: -55, z: 40, delay: 0 },
                                    { x: 55, y: -55, z: 40, delay: 0.1 },
                                    { x: -55, y: 55, z: -20, delay: 0.2 },
                                    { x: 55, y: 55, z: -20, delay: 0.3 }
                                ].map((pos, i) => (
                                    <div key={i}>
                                        {/* Bond line */}
                                        <div style={{
                                            position: 'absolute',
                                            left: '50%',
                                            top: '50%',
                                            width: '80px',
                                            height: '4px',
                                            background: `linear-gradient(90deg, ${current.color} 0%, ${current.color}44 100%)`,
                                            transformOrigin: '0 50%',
                                            transform: `rotate(${Math.atan2(pos.y, pos.x) * 180 / Math.PI}deg) translateZ(${pos.z / 2}px)`,
                                            borderRadius: '2px',
                                            boxShadow: `0 2px 8px ${current.color}44`
                                        }} />

                                        {/* H atom */}
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: pos.delay, duration: 0.3 }}
                                            style={{
                                                position: 'absolute',
                                                left: `calc(50% + ${pos.x}px)`,
                                                top: `calc(50% + ${pos.y}px)`,
                                                transform: `translate(-50%, -50%) translateZ(${pos.z}px)`,
                                                width: '36px',
                                                height: '36px',
                                                borderRadius: '50%',
                                                background: 'radial-gradient(circle at 30% 30%, #888, #555)',
                                                boxShadow: '0 4px 12px rgba(0,0,0,0.4), inset 0 -3px 10px rgba(0,0,0,0.3)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '0.9rem',
                                                fontWeight: 'bold',
                                                color: 'white'
                                            }}
                                        >
                                            H
                                        </motion.div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 1 && (
                            // 3D Trigonal Planar sp²
                            <div style={{ transformStyle: 'preserve-3d', position: 'relative', width: '100%', height: '100%' }}>
                                {/* Central Carbon */}
                                <motion.div
                                    animate={{ scale: [1, 1.05, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    style={{
                                        position: 'absolute',
                                        left: '50%',
                                        top: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        width: '50px',
                                        height: '50px',
                                        borderRadius: '50%',
                                        background: `radial-gradient(circle at 30% 30%, ${current.color}, ${current.color}88)`,
                                        boxShadow: `0 0 30px ${current.color}66, inset 0 -5px 15px rgba(0,0,0,0.3)`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '1.25rem',
                                        fontWeight: 'bold',
                                        color: 'white',
                                        zIndex: 10
                                    }}
                                >
                                    C
                                </motion.div>

                                {/* p orbital (vertical) */}
                                <motion.div
                                    animate={{ opacity: [0.4, 0.7, 0.4] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    style={{
                                        position: 'absolute',
                                        left: '50%',
                                        top: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        width: '20px',
                                        height: '80px',
                                        background: `linear-gradient(180deg, ${current.color}00 0%, ${current.color}66 50%, ${current.color}00 100%)`,
                                        borderRadius: '50%',
                                        border: `2px dashed ${current.color}88`,
                                        zIndex: 5
                                    }}
                                />

                                {/* 3 bonds at 120° */}
                                {[
                                    { angle: -90, label: 'H' },
                                    { angle: 30, label: 'H' },
                                    { angle: 150, label: 'C' }
                                ].map((item, i) => (
                                    <div key={i}>
                                        <div style={{
                                            position: 'absolute',
                                            left: '50%',
                                            top: '50%',
                                            width: '70px',
                                            height: '4px',
                                            background: `linear-gradient(90deg, ${current.color} 0%, ${current.color}44 100%)`,
                                            transformOrigin: '0 50%',
                                            transform: `rotate(${item.angle}deg)`,
                                            borderRadius: '2px',
                                            boxShadow: `0 2px 8px ${current.color}44`
                                        }} />
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: i * 0.1, duration: 0.3 }}
                                            style={{
                                                position: 'absolute',
                                                left: `calc(50% + ${Math.cos(item.angle * Math.PI / 180) * 75}px)`,
                                                top: `calc(50% + ${Math.sin(item.angle * Math.PI / 180) * 75}px)`,
                                                transform: 'translate(-50%, -50%)',
                                                width: '36px',
                                                height: '36px',
                                                borderRadius: '50%',
                                                background: item.label === 'C'
                                                    ? `radial-gradient(circle at 30% 30%, ${current.color}, ${current.color}88)`
                                                    : 'radial-gradient(circle at 30% 30%, #888, #555)',
                                                boxShadow: item.label === 'C'
                                                    ? `0 4px 12px ${current.color}44, inset 0 -3px 10px rgba(0,0,0,0.3)`
                                                    : '0 4px 12px rgba(0,0,0,0.4), inset 0 -3px 10px rgba(0,0,0,0.3)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '0.9rem',
                                                fontWeight: 'bold',
                                                color: 'white'
                                            }}
                                        >
                                            {item.label}
                                        </motion.div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 2 && (
                            // 3D Linear sp
                            <div style={{ transformStyle: 'preserve-3d', position: 'relative', width: '100%', height: '100%' }}>
                                {/* Central Carbon */}
                                <motion.div
                                    animate={{ scale: [1, 1.05, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    style={{
                                        position: 'absolute',
                                        left: '50%',
                                        top: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        width: '50px',
                                        height: '50px',
                                        borderRadius: '50%',
                                        background: `radial-gradient(circle at 30% 30%, ${current.color}, ${current.color}88)`,
                                        boxShadow: `0 0 30px ${current.color}66, inset 0 -5px 15px rgba(0,0,0,0.3)`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '1.25rem',
                                        fontWeight: 'bold',
                                        color: 'white',
                                        zIndex: 10
                                    }}
                                >
                                    C
                                </motion.div>

                                {/* p orbitals (vertical and horizontal) */}
                                <motion.div
                                    animate={{ opacity: [0.4, 0.7, 0.4] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    style={{
                                        position: 'absolute',
                                        left: '50%',
                                        top: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        width: '16px',
                                        height: '70px',
                                        background: `linear-gradient(180deg, ${current.color}00 0%, ${current.color}66 50%, ${current.color}00 100%)`,
                                        borderRadius: '50%',
                                        border: `2px dashed ${current.color}88`,
                                        zIndex: 5
                                    }}
                                />
                                <motion.div
                                    animate={{ opacity: [0.4, 0.7, 0.4] }}
                                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                                    style={{
                                        position: 'absolute',
                                        left: '50%',
                                        top: '50%',
                                        transform: 'translate(-50%, -50%) rotateX(90deg)',
                                        width: '16px',
                                        height: '70px',
                                        background: `linear-gradient(180deg, ${current.color}00 0%, ${current.color}44 50%, ${current.color}00 100%)`,
                                        borderRadius: '50%',
                                        border: `2px dashed ${current.color}66`,
                                        zIndex: 5
                                    }}
                                />

                                {/* Linear bonds */}
                                {[
                                    { side: 'left', label: 'H' },
                                    { side: 'right', label: 'C' }
                                ].map((item, i) => (
                                    <div key={i}>
                                        <div style={{
                                            position: 'absolute',
                                            left: item.side === 'left' ? 'calc(50% - 90px)' : '50%',
                                            top: '50%',
                                            width: '65px',
                                            height: '4px',
                                            background: `linear-gradient(90deg, ${item.side === 'left' ? current.color + '44' : current.color} 0%, ${item.side === 'left' ? current.color : current.color + '44'} 100%)`,
                                            transform: 'translateY(-50%)',
                                            borderRadius: '2px',
                                            boxShadow: `0 2px 8px ${current.color}44`
                                        }} />
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: i * 0.2, duration: 0.3 }}
                                            style={{
                                                position: 'absolute',
                                                left: item.side === 'left' ? 'calc(50% - 95px)' : 'calc(50% + 95px)',
                                                top: '50%',
                                                transform: 'translate(-50%, -50%)',
                                                width: '36px',
                                                height: '36px',
                                                borderRadius: '50%',
                                                background: item.label === 'C'
                                                    ? `radial-gradient(circle at 30% 30%, ${current.color}, ${current.color}88)`
                                                    : 'radial-gradient(circle at 30% 30%, #888, #555)',
                                                boxShadow: item.label === 'C'
                                                    ? `0 4px 12px ${current.color}44, inset 0 -3px 10px rgba(0,0,0,0.3)`
                                                    : '0 4px 12px rgba(0,0,0,0.4), inset 0 -3px 10px rgba(0,0,0,0.3)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '0.9rem',
                                                fontWeight: 'bold',
                                                color: 'white'
                                            }}
                                        >
                                            {item.label}
                                        </motion.div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.div>

                    {/* Info */}
                    <div style={{ marginTop: '1.5rem' }}>
                        <div style={{
                            display: 'inline-block',
                            padding: '0.5rem 1rem',
                            background: `${current.color}22`,
                            borderRadius: '20px',
                            marginBottom: '1rem'
                        }}>
                            <span style={{
                                fontSize: '1.5rem',
                                fontWeight: 700,
                                color: current.color
                            }}>
                                {current.angle}
                            </span>
                            <span style={{
                                color: 'var(--neutral-400)',
                                marginLeft: '0.5rem'
                            }}>
                                bond angle
                            </span>
                        </div>

                        <p style={{
                            color: 'var(--neutral-300)',
                            fontSize: '0.9rem',
                            margin: '0 0 0.5rem'
                        }}>
                            {current.description}
                        </p>

                        <p style={{
                            color: 'var(--neutral-400)',
                            fontSize: '0.85rem',
                            margin: 0
                        }}>
                            Example: <strong style={{ color: 'var(--neutral-200)' }}>{current.example}</strong>
                        </p>
                    </div>
                </motion.div>
            </>
        );
    };

    const renderBondingDiagram = () => (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem'
        }}>
            {[
                { type: 'Single', sigma: 1, pi: 0, example: 'C-C', symbol: '—' },
                { type: 'Double', sigma: 1, pi: 1, example: 'C=C', symbol: '=' },
                { type: 'Triple', sigma: 1, pi: 2, example: 'C≡C', symbol: '≡' }
            ].map((bond, index) => (
                <motion.div
                    key={bond.type}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    style={{
                        background: 'rgba(0,0,0,0.3)',
                        borderRadius: '12px',
                        padding: '1.25rem',
                        textAlign: 'center'
                    }}
                >
                    <div style={{
                        fontSize: '2rem',
                        fontWeight: 700,
                        color: 'var(--primary-400)',
                        marginBottom: '0.5rem'
                    }}>
                        {bond.example}
                    </div>
                    <div style={{
                        fontSize: '1rem',
                        fontWeight: 600,
                        color: 'var(--neutral-100)',
                        marginBottom: '0.75rem'
                    }}>
                        {bond.type} Bond
                    </div>
                    <div style={{
                        fontSize: '0.85rem',
                        color: 'var(--neutral-400)'
                    }}>
                        <span style={{ color: 'var(--accent-emerald)' }}>{bond.sigma}σ</span>
                        {bond.pi > 0 && (
                            <span style={{ color: 'var(--primary-400)' }}> + {bond.pi}π</span>
                        )}
                    </div>
                </motion.div>
            ))}
        </div>
    );

    const renderElectronegativityDiagram = () => (
        <div>
            <div style={{
                background: 'rgba(0,0,0,0.3)',
                borderRadius: '12px',
                padding: '1.5rem',
                marginBottom: '1rem'
            }}>
                {/* Labels row */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '2rem'
                }}>
                    <span style={{ color: 'var(--neutral-400)', fontSize: '0.85rem' }}>Less electronegative</span>
                    <span style={{ color: 'var(--neutral-400)', fontSize: '0.85rem' }}>More electronegative</span>
                </div>

                {/* Element symbols row - ABOVE the bar */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    marginBottom: '0.75rem',
                    padding: '0 0.5rem'
                }}>
                    {[
                        { symbol: 'H', value: 2.1 },
                        { symbol: 'C', value: 2.5 },
                        { symbol: 'N', value: 3.0 },
                        { symbol: 'O', value: 3.5 },
                        { symbol: 'F', value: 4.0 }
                    ].map(el => (
                        <div
                            key={el.symbol}
                            style={{
                                textAlign: 'center',
                                flex: 1
                            }}
                        >
                            <div style={{
                                width: '32px',
                                height: '32px',
                                background: 'var(--neutral-700)',
                                border: '2px solid var(--neutral-600)',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1rem',
                                fontWeight: 700,
                                color: 'white',
                                margin: '0 auto'
                            }}>
                                {el.symbol}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Gradient bar */}
                <div style={{
                    height: '50px',
                    background: 'linear-gradient(90deg, #3b82f6 0%, #6366f1 25%, #8b5cf6 50%, #d946ef 75%, #f43f5e 100%)',
                    borderRadius: '10px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0 0.5rem'
                }}>
                    {/* Values INSIDE the gradient bar */}
                    {[
                        { value: '2.1' },
                        { value: '2.5' },
                        { value: '3.0' },
                        { value: '3.5' },
                        { value: '4.0' }
                    ].map((el, i) => (
                        <div
                            key={i}
                            style={{
                                flex: 1,
                                textAlign: 'center',
                                fontSize: '0.9rem',
                                fontWeight: 600,
                                color: 'white',
                                textShadow: '0 1px 3px rgba(0,0,0,0.5)'
                            }}
                        >
                            {el.value}
                        </div>
                    ))}
                </div>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem'
            }}>
                <div style={{
                    background: 'rgba(244, 63, 94, 0.1)',
                    border: '1px solid rgba(244, 63, 94, 0.3)',
                    borderRadius: '12px',
                    padding: '1rem',
                    textAlign: 'center'
                }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>δ⁺ — δ⁻</div>
                    <div style={{ color: 'var(--neutral-300)', fontSize: '0.9rem' }}>Polar Bond</div>
                    <div style={{ color: 'var(--neutral-400)', fontSize: '0.8rem' }}>Δ EN {'>'} 0.4</div>
                </div>
                <div style={{
                    background: 'rgba(16, 185, 129, 0.1)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    borderRadius: '12px',
                    padding: '1rem',
                    textAlign: 'center'
                }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>— • —</div>
                    <div style={{ color: 'var(--neutral-300)', fontSize: '0.9rem' }}>Nonpolar Bond</div>
                    <div style={{ color: 'var(--neutral-400)', fontSize: '0.8rem' }}>Δ EN {'<'} 0.4</div>
                </div>
            </div>
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
                background: 'var(--gradient-card)',
                border: '1px solid var(--card-border)',
                borderRadius: '20px',
                padding: '1.5rem',
                margin: '2rem 0'
            }}
        >
            {/* Header */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1.5rem'
            }}>
                <span style={{ fontSize: '1.5rem' }}>🎨</span>
                <h4 style={{
                    margin: 0,
                    fontSize: '1.1rem',
                    color: 'var(--neutral-100)'
                }}>
                    {title || 'Interactive Diagram'}
                </h4>
                <span style={{
                    marginLeft: 'auto',
                    padding: '0.25rem 0.75rem',
                    background: 'var(--neutral-800)',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    color: 'var(--neutral-400)'
                }}>
                    Click to explore
                </span>
            </div>

            {/* Content */}
            {type === 'hybridization' && renderHybridizationDiagram()}
            {type === 'bonding' && renderBondingDiagram()}
            {type === 'electronegativity' && renderElectronegativityDiagram()}
        </motion.div>
    );
}
