import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamic import for MoleculeViewer
const MoleculeViewer = dynamic(() => import('../MoleculeViewer'), {
    ssr: false,
    loading: () => <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>Loading 3D...</div>
});

interface ColorExample {
    name: string;
    description: string;
    color: string;
    type: 'liquid' | 'solid' | 'gas' | 'crystal';
    structure2d?: string;
    pdbId?: string;
}

interface ColorMoleculesGridProps {
    examples: ColorExample[];
}

export default function ColorMoleculesGrid({ examples }: ColorMoleculesGridProps) {
    // Track which view mode is active for each card: 'info' | '2d' | '3d'
    // Default to 'info' to keep it clean initially
    const [viewModes, setViewModes] = useState<Record<string, 'info' | '2d' | '3d'>>({});

    const toggleView = (name: string, mode: 'info' | '2d' | '3d') => {
        setViewModes(prev => ({ ...prev, [name]: mode }));
    };

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.5rem',
            marginTop: '2rem',
            marginBottom: '2rem'
        }}>
            {examples.map((example, index) => {
                const activeMode = viewModes[example.name] || 'info';

                return (
                    <motion.div
                        key={example.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        style={{
                            background: 'rgba(255, 255, 255, 0.03)',
                            borderRadius: '24px',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            position: 'relative',
                            minHeight: '400px' // Ensure consistency
                        }}
                    >
                        {/* Header with Color Glow */}
                        <div style={{
                            padding: '1.25rem',
                            background: `linear-gradient(180deg, ${example.color}20 0%, transparent 100%)`,
                            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            zIndex: 10
                        }}>
                            <h3 style={{
                                margin: 0,
                                fontSize: '1.2rem',
                                fontWeight: 700,
                                color: 'white',
                                textShadow: `0 0 20px ${example.color}80`
                            }}>
                                {example.name}
                            </h3>

                            <span style={{
                                fontSize: '0.7rem',
                                padding: '4px 10px',
                                borderRadius: '12px',
                                background: 'rgba(0,0,0,0.4)',
                                color: 'rgba(255,255,255,0.7)',
                                textTransform: 'uppercase',
                                fontWeight: 600,
                                border: `1px solid ${example.color}40`
                            }}>
                                {example.type}
                            </span>
                        </div>

                        {/* Control Tabs */}
                        <div style={{
                            display: 'flex',
                            gap: '0.5rem',
                            padding: '0.75rem 1.25rem',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                            background: 'rgba(0,0,0,0.2)'
                        }}>
                            {[
                                { id: 'info', label: '📖 Info' },
                                { id: '2d', label: '📝 Structure' },
                                { id: '3d', label: '🧊 3D' }
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => toggleView(example.name, tab.id as any)}
                                    style={{
                                        flex: 1,
                                        padding: '0.4rem',
                                        background: activeMode === tab.id ? 'rgba(255,255,255,0.1)' : 'transparent',
                                        border: activeMode === tab.id ? '1px solid rgba(255,255,255,0.2)' : '1px solid transparent',
                                        borderRadius: '8px',
                                        color: activeMode === tab.id ? 'white' : 'rgba(255,255,255,0.5)',
                                        fontSize: '0.8rem',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Content Area */}
                        <div style={{ flex: 1, position: 'relative', minHeight: '250px' }}>
                            <AnimatePresence mode="wait">
                                {/* INFO MODE */}
                                {activeMode === 'info' && (
                                    <motion.div
                                        key="info"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        style={{ padding: '1.5rem' }}
                                    >
                                        <p style={{
                                            color: '#cbd5e1',
                                            margin: 0,
                                            lineHeight: 1.6,
                                            fontSize: '0.95rem'
                                        }}>
                                            {example.description}
                                        </p>

                                        <div style={{
                                            marginTop: '2rem',
                                            padding: '1rem',
                                            background: `${example.color}10`,
                                            borderRadius: '12px',
                                            border: `1px solid ${example.color}30`
                                        }}>
                                            <strong style={{ color: example.color, display: 'block', marginBottom: '0.25rem', fontSize: '0.8rem' }}>
                                                Why this color?
                                            </strong>
                                            <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                                                {/* Logic to explain color based on conjugation could go here dynamically 
                                                    or be part of description. For now using generic helpful text */}
                                                Specific electron transitions in the conjugated system absorb complementary light.
                                            </span>
                                        </div>
                                    </motion.div>
                                )}

                                {/* 2D STRUCTURE MODE */}
                                {activeMode === '2d' && (
                                    <motion.div
                                        key="2d"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        style={{
                                            height: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            background: 'white',
                                            padding: '1rem'
                                        }}
                                    >
                                        {/* Placeholder for 2D structure - would link to SVG/Image in real app */}
                                        <div style={{ textAlign: 'center', color: '#334155' }}>
                                            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⬡</div>
                                            <div style={{ fontWeight: 600 }}>2D Structure</div>
                                            <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>
                                                Conjugated system highlighted
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* 3D MODE */}
                                {activeMode === '3d' && (
                                    <motion.div
                                        key="3d"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        style={{ height: '300px' }} // Fixed height for 3D viewer
                                    >
                                        {example.pdbId ? (
                                            <MoleculeViewer
                                                moleculeName={example.pdbId} // Using ID as name proxy for now
                                                height={300}
                                                description={example.description}
                                            />
                                        ) : (
                                            <div style={{
                                                height: '100%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: 'var(--neutral-500)'
                                            }}>
                                                3D Model Loading...
                                            </div>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Decorative Bottom Line */}
                        <div style={{
                            height: '3px',
                            background: `linear-gradient(90deg, transparent, ${example.color}, transparent)`,
                            opacity: 0.8
                        }} />
                    </motion.div>
                );
            })}
        </div>
    );
}
