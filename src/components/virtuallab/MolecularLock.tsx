'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MolecularLockProps {
    onComplete: () => void;
    onNext: () => void;
}

type Step = 'intro' | 'compare' | 'docking' | 'success' | 'complete';

export default function MolecularLock({ onComplete, onNext }: MolecularLockProps) {
    const [step, setStep] = useState<Step>('intro');
    const [isDocked, setIsDocked] = useState(false);
    const [showInsight, setShowInsight] = useState(false);
    const [hoveredMolecule, setHoveredMolecule] = useState<'paba' | 'sulfa' | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleDock = () => {
        setIsDocked(true);
        setStep('success');
        setTimeout(() => setShowInsight(true), 1000);
    };

    const completePhase = () => {
        setStep('complete');
        onComplete();
    };

    return (
        <div>
            {/* Step Indicator */}
            <div style={{
                display: 'flex',
                gap: '0.5rem',
                marginBottom: '1.5rem',
                justifyContent: 'center'
            }}>
                {['Compare Structures', 'Enzyme Docking', 'Complete'].map((s, idx) => (
                    <div key={s} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}>
                        <div style={{
                            width: 28,
                            height: 28,
                            borderRadius: '50%',
                            background:
                                (idx === 0 && ['compare', 'docking', 'success', 'complete'].includes(step)) ||
                                    (idx === 1 && ['success', 'complete'].includes(step)) ||
                                    (idx === 2 && step === 'complete')
                                    ? '#10b981'
                                    : 'rgba(255, 255, 255, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '0.75rem',
                            fontWeight: 600
                        }}>
                            {idx + 1}
                        </div>
                        <span style={{ color: 'var(--neutral-400)', fontSize: '0.8rem' }}>
                            {s} {idx < 2 ? '→' : ''}
                        </span>
                    </div>
                ))}
            </div>

            {/* Introduction */}
            {step === 'intro' && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                        textAlign: 'center',
                        padding: '2rem',
                        background: 'rgba(139, 92, 246, 0.1)',
                        borderRadius: '20px',
                        border: '1px solid rgba(139, 92, 246, 0.3)',
                        marginBottom: '2rem'
                    }}
                >
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔐</div>
                    <h3 style={{ color: '#8b5cf6', marginBottom: '1rem' }}>
                        The Molecular Lock: Enzyme Docking Challenge
                    </h3>
                    <p style={{ color: 'var(--neutral-300)', lineHeight: 1.8, maxWidth: '600px', margin: '0 auto 1.5rem' }}>
                        Bacteria need <strong style={{ color: '#f59e0b' }}>PABA (para-aminobenzoic acid)</strong> to make
                        Folic Acid for survival. Sulfanilamide is a <strong style={{ color: '#10b981' }}>Bioisostere</strong> -
                        it has the SAME shape and size! Can you trick the bacterial enzyme?
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setStep('compare')}
                        style={{
                            padding: '1rem 2rem',
                            background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                            border: 'none',
                            borderRadius: '12px',
                            color: 'white',
                            fontWeight: 600,
                            cursor: 'pointer'
                        }}
                    >
                        🔬 Compare Structures
                    </motion.button>
                </motion.div>
            )}

            {/* Structure Comparison */}
            {(step === 'compare' || step === 'docking' || step === 'success') && (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 100px 1fr',
                    gap: '1rem',
                    marginBottom: '2rem',
                    alignItems: 'center'
                }}>
                    {/* PABA */}
                    <motion.div
                        onHoverStart={() => setHoveredMolecule('paba')}
                        onHoverEnd={() => setHoveredMolecule(null)}
                        style={{
                            background: hoveredMolecule === 'paba'
                                ? 'rgba(249, 115, 22, 0.15)'
                                : 'rgba(0, 0, 0, 0.3)',
                            borderRadius: '20px',
                            padding: '1.5rem',
                            border: hoveredMolecule === 'paba'
                                ? '2px solid #f97316'
                                : '1px solid rgba(255, 255, 255, 0.1)',
                            textAlign: 'center',
                            transition: 'all 0.3s'
                        }}
                    >
                        <div style={{
                            color: '#f97316',
                            fontWeight: 700,
                            marginBottom: '1rem',
                            fontSize: '1.1rem'
                        }}>
                            🍎 PABA (Natural)
                        </div>

                        {/* PABA Structure SVG */}
                        <svg width="150" height="120" viewBox="0 0 150 120" style={{ margin: '0 auto' }}>
                            {/* Benzene ring */}
                            <polygon
                                points="75,20 105,40 105,80 75,100 45,80 45,40"
                                fill="none"
                                stroke={hoveredMolecule === 'paba' ? '#f97316' : '#666'}
                                strokeWidth="2"
                            />
                            <circle cx="75" cy="60" r="15" fill="none" stroke={hoveredMolecule === 'paba' ? '#f97316' : '#666'} strokeWidth="1" strokeDasharray="3,2" />

                            {/* NH2 group (top) */}
                            <text x="75" y="12" textAnchor="middle" fill="#3b82f6" fontSize="12" fontWeight="bold">NH₂</text>

                            {/* COOH group (bottom) */}
                            <text x="75" y="118" textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="bold">COOH</text>
                        </svg>

                        <div style={{
                            marginTop: '1rem',
                            padding: '0.5rem',
                            background: 'rgba(249, 115, 22, 0.1)',
                            borderRadius: '8px',
                            fontSize: '0.8rem',
                            color: 'var(--neutral-400)'
                        }}>
                            p-Aminobenzoic Acid<br />
                            <span style={{ color: '#f97316' }}>Bacteria&apos;s Food ✓</span>
                        </div>
                    </motion.div>

                    {/* VS */}
                    <div style={{ textAlign: 'center' }}>
                        <div style={{
                            fontSize: '2rem',
                            color: 'var(--neutral-500)',
                            fontWeight: 700
                        }}>
                            VS
                        </div>
                        <div style={{
                            fontSize: '0.8rem',
                            color: 'var(--neutral-600)',
                            marginTop: '0.5rem'
                        }}>
                            Same Shape?
                        </div>
                    </div>

                    {/* Sulfanilamide */}
                    <motion.div
                        onHoverStart={() => setHoveredMolecule('sulfa')}
                        onHoverEnd={() => setHoveredMolecule(null)}
                        style={{
                            background: hoveredMolecule === 'sulfa'
                                ? 'rgba(16, 185, 129, 0.15)'
                                : 'rgba(0, 0, 0, 0.3)',
                            borderRadius: '20px',
                            padding: '1.5rem',
                            border: hoveredMolecule === 'sulfa'
                                ? '2px solid #10b981'
                                : '1px solid rgba(255, 255, 255, 0.1)',
                            textAlign: 'center',
                            transition: 'all 0.3s'
                        }}
                    >
                        <div style={{
                            color: '#10b981',
                            fontWeight: 700,
                            marginBottom: '1rem',
                            fontSize: '1.1rem'
                        }}>
                            💊 Sulfanilamide (Drug)
                        </div>

                        {/* Sulfanilamide Structure SVG */}
                        <svg width="150" height="120" viewBox="0 0 150 120" style={{ margin: '0 auto' }}>
                            {/* Benzene ring */}
                            <polygon
                                points="75,20 105,40 105,80 75,100 45,80 45,40"
                                fill="none"
                                stroke={hoveredMolecule === 'sulfa' ? '#10b981' : '#666'}
                                strokeWidth="2"
                            />
                            <circle cx="75" cy="60" r="15" fill="none" stroke={hoveredMolecule === 'sulfa' ? '#10b981' : '#666'} strokeWidth="1" strokeDasharray="3,2" />

                            {/* NH2 group (top) */}
                            <text x="75" y="12" textAnchor="middle" fill="#3b82f6" fontSize="12" fontWeight="bold">NH₂</text>

                            {/* SO2NH2 group (bottom) */}
                            <text x="75" y="118" textAnchor="middle" fill="#10b981" fontSize="10" fontWeight="bold">SO₂NH₂</text>
                        </svg>

                        <div style={{
                            marginTop: '1rem',
                            padding: '0.5rem',
                            background: 'rgba(16, 185, 129, 0.1)',
                            borderRadius: '8px',
                            fontSize: '0.8rem',
                            color: 'var(--neutral-400)'
                        }}>
                            p-Aminobenzenesulfonamide<br />
                            <span style={{ color: '#10b981' }}>Bioisostere Mimic ✓</span>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Proceed to Docking */}
            {step === 'compare' && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ textAlign: 'center', marginBottom: '2rem' }}
                >
                    <p style={{ color: 'var(--neutral-300)', marginBottom: '1rem' }}>
                        Notice how similar they are! The <strong style={{ color: '#3b82f6' }}>NH₂</strong> tops are identical.
                        The bottoms differ only slightly (COOH vs SO₂NH₂) but have the same <em>size and shape</em>.
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setStep('docking')}
                        style={{
                            padding: '1rem 2rem',
                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                            border: 'none',
                            borderRadius: '12px',
                            color: 'white',
                            fontWeight: 600,
                            cursor: 'pointer'
                        }}
                    >
                        🎯 Try Enzyme Docking
                    </motion.button>
                </motion.div>
            )}

            {/* Enzyme Docking Challenge */}
            {(step === 'docking' || step === 'success') && (
                <div style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    borderRadius: '20px',
                    padding: '2rem',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    marginBottom: '2rem'
                }}>
                    <h4 style={{
                        color: '#8b5cf6',
                        textAlign: 'center',
                        marginBottom: '1.5rem'
                    }}>
                        🧬 DHPS Enzyme (Dihydropteroate Synthase)
                    </h4>

                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '2rem'
                    }}>
                        {/* Enzyme Active Site */}
                        <div style={{
                            width: '200px',
                            height: '200px',
                            borderRadius: '20px',
                            background: 'linear-gradient(135deg, #1e3a5f 0%, #0f2744 100%)',
                            border: isDocked ? '3px solid #10b981' : '3px dashed #8b5cf6',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative'
                        }}>
                            {/* Active site pocket */}
                            <div style={{
                                width: '80px',
                                height: '100px',
                                background: isDocked
                                    ? 'rgba(16, 185, 129, 0.3)'
                                    : 'rgba(139, 92, 246, 0.2)',
                                borderRadius: '10px 10px 40px 40px',
                                border: `2px dashed ${isDocked ? '#10b981' : '#8b5cf6'}`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                {isDocked ? (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        style={{ fontSize: '2rem' }}
                                    >
                                        💊
                                    </motion.div>
                                ) : (
                                    <span style={{
                                        color: '#8b5cf6',
                                        fontSize: '0.8rem',
                                        textAlign: 'center'
                                    }}>
                                        Active<br />Site
                                    </span>
                                )}
                            </div>

                            <div style={{
                                position: 'absolute',
                                bottom: -30,
                                color: 'var(--neutral-400)',
                                fontSize: '0.8rem'
                            }}>
                                Bacterial Enzyme
                            </div>
                        </div>

                        {/* Draggable Molecule */}
                        {!isDocked && (
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handleDock}
                                style={{
                                    padding: '1.5rem 2rem',
                                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                    border: 'none',
                                    borderRadius: '16px',
                                    color: 'white',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 20px rgba(16, 185, 129, 0.4)'
                                }}
                            >
                                💊 Dock Sulfanilamide →
                            </motion.button>
                        )}

                        {isDocked && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                style={{
                                    padding: '1.5rem',
                                    background: 'rgba(16, 185, 129, 0.1)',
                                    borderRadius: '16px',
                                    border: '2px solid #10b981',
                                    textAlign: 'center'
                                }}
                            >
                                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✅</div>
                                <div style={{ color: '#10b981', fontWeight: 700 }}>Perfect Fit!</div>
                                <div style={{ color: 'var(--neutral-400)', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                                    Enzyme is blocked!
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            )}

            {/* Success Insight Modal */}
            <AnimatePresence>
                {showInsight && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(0, 0, 0, 0.9)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 1000,
                            padding: '2rem'
                        }}
                        onClick={() => {
                            setShowInsight(false);
                            completePhase();
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.8, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            style={{
                                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(16, 185, 129, 0.2) 100%)',
                                borderRadius: '24px',
                                padding: '2rem',
                                maxWidth: '600px',
                                border: '2px solid #8b5cf6'
                            }}
                            onClick={e => e.stopPropagation()}
                        >
                            <div style={{ fontSize: '4rem', textAlign: 'center', marginBottom: '1rem' }}>
                                🎯
                            </div>
                            <h3 style={{
                                color: '#8b5cf6',
                                textAlign: 'center',
                                fontSize: '1.5rem',
                                marginBottom: '1rem'
                            }}>
                                Bioisosterism: The Art of Molecular Mimicry
                            </h3>
                            <p style={{
                                color: 'var(--neutral-300)',
                                lineHeight: 1.8,
                                textAlign: 'center',
                                marginBottom: '1.5rem'
                            }}>
                                Because Sulfanilamide is a <strong style={{ color: '#10b981' }}>Bioisostere</strong> of PABA,
                                it <strong style={{ color: '#ef4444' }}>tricks the bacteria</strong> into accepting it.
                                Once docked, it <strong style={{ color: '#f59e0b' }}>blocks Folic Acid synthesis</strong>,
                                effectively <strong style={{ color: '#ef4444' }}>starving the bacteria to death!</strong>
                            </p>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                gap: '0.5rem',
                                marginBottom: '1.5rem',
                                flexWrap: 'wrap'
                            }}>
                                <span style={{ padding: '0.5rem 1rem', background: '#f9731620', borderRadius: '8px', color: '#f97316' }}>PABA Blocked</span>
                                <span>→</span>
                                <span style={{ padding: '0.5rem 1rem', background: '#ef444420', borderRadius: '8px', color: '#ef4444' }}>No Folic Acid</span>
                                <span>→</span>
                                <span style={{ padding: '0.5rem 1rem', background: '#10b98120', borderRadius: '8px', color: '#10b981' }}>Bacteria Dies!</span>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                    setShowInsight(false);
                                    completePhase();
                                }}
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                                    border: 'none',
                                    borderRadius: '12px',
                                    color: 'white',
                                    fontWeight: 600,
                                    cursor: 'pointer'
                                }}
                            >
                                🎮 Play MDDD Quest Games! →
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Next Phase Button */}
            {step === 'complete' && !showInsight && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ textAlign: 'center' }}
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onNext}
                        style={{
                            padding: '1rem 2rem',
                            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                            border: 'none',
                            borderRadius: '16px',
                            color: 'white',
                            fontWeight: 700,
                            fontSize: '1.1rem',
                            cursor: 'pointer'
                        }}
                    >
                        🎮 Play MDDD Quest Games! →
                    </motion.button>
                </motion.div>
            )}
        </div>
    );
}
