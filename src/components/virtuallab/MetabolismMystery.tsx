'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MetabolismMysteryProps {
    onComplete: () => void;
    onNext: () => void;
}

type Step = 'intro' | 'petridish' | 'failed' | 'liver' | 'success' | 'complete';

export default function MetabolismMystery({ onComplete, onNext }: MetabolismMysteryProps) {
    const [step, setStep] = useState<Step>('intro');
    const [bacteriaAlive, setBacteriaAlive] = useState(true);
    const [showProntosil, setShowProntosil] = useState(false);
    const [showEnzyme, setShowEnzyme] = useState(false);
    const [prontosilSplit, setProntosilSplit] = useState(false);
    const [showInsight, setShowInsight] = useState(false);

    const applyProntosil = () => {
        setShowProntosil(true);
        setStep('petridish');

        setTimeout(() => {
            setStep('failed');
        }, 2000);
    };

    const addEnzyme = () => {
        setShowEnzyme(true);

        setTimeout(() => {
            setProntosilSplit(true);
            setStep('liver');

            setTimeout(() => {
                setBacteriaAlive(false);
                setStep('success');
                setShowInsight(true);
            }, 2000);
        }, 2000);
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
                {['Petri Dish Test', 'Bio-Activation', 'Complete'].map((s, idx) => (
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
                                (idx === 0 && ['petridish', 'failed', 'liver', 'success', 'complete'].includes(step)) ||
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
                        <span style={{
                            color: 'var(--neutral-400)',
                            fontSize: '0.8rem'
                        }}>
                            {s} {idx < 2 ? '→' : ''}
                        </span>
                    </div>
                ))}
            </div>

            {/* Main Content */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '2rem',
                marginBottom: '2rem'
            }}>
                {/* Left: Petri Dish */}
                <div style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    borderRadius: '20px',
                    padding: '1.5rem',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    textAlign: 'center'
                }}>
                    <h4 style={{
                        color: bacteriaAlive ? '#ef4444' : '#10b981',
                        marginBottom: '1rem',
                        fontSize: '1rem'
                    }}>
                        🧫 Petri Dish: Streptococcus Colony
                    </h4>

                    {/* Petri Dish Visualization */}
                    <div style={{
                        width: '200px',
                        height: '200px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #f5f5dc 0%, #e6e6cd 100%)',
                        border: '4px solid #888',
                        margin: '0 auto 1rem',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        {/* Bacteria */}
                        <AnimatePresence>
                            {bacteriaAlive && (
                                <>
                                    {[...Array(15)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ scale: 0 }}
                                            animate={{
                                                scale: [1, 1.1, 1],
                                                x: [0, 5, -5, 0],
                                                y: [0, -5, 5, 0]
                                            }}
                                            exit={{ scale: 0, opacity: 0 }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                delay: i * 0.1
                                            }}
                                            style={{
                                                position: 'absolute',
                                                left: `${20 + (i % 5) * 35}px`,
                                                top: `${20 + Math.floor(i / 5) * 50}px`,
                                                width: '20px',
                                                height: '10px',
                                                borderRadius: '50%',
                                                background: '#10b981',
                                                boxShadow: '0 0 4px #10b981'
                                            }}
                                        />
                                    ))}
                                </>
                            )}
                        </AnimatePresence>

                        {/* Dead bacteria */}
                        {!bacteriaAlive && (
                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                fontSize: '3rem'
                            }}>
                                💀
                            </div>
                        )}

                        {/* Prontosil Application */}
                        {showProntosil && !prontosilSplit && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    width: '80px',
                                    height: '80px',
                                    borderRadius: '50%',
                                    background: 'rgba(220, 38, 38, 0.4)',
                                    border: '3px solid #dc2626'
                                }}
                            />
                        )}
                    </div>

                    {/* Status */}
                    <div style={{
                        padding: '0.75rem 1rem',
                        background: bacteriaAlive ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                        border: `1px solid ${bacteriaAlive ? '#ef4444' : '#10b981'}`,
                        borderRadius: '12px',
                        color: bacteriaAlive ? '#ef4444' : '#10b981',
                        fontWeight: 600
                    }}>
                        {bacteriaAlive ? '🦠 Bacteria: ALIVE & Growing' : '☠️ Bacteria: DEAD'}
                    </div>

                    {/* Apply Prontosil Button */}
                    {step === 'intro' && (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={applyProntosil}
                            style={{
                                marginTop: '1rem',
                                padding: '0.75rem 1.5rem',
                                background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                                border: 'none',
                                borderRadius: '12px',
                                color: 'white',
                                fontWeight: 600,
                                cursor: 'pointer'
                            }}
                        >
                            🔴 Apply Prontosil (In Vitro Test)
                        </motion.button>
                    )}

                    {/* Failed Message */}
                    {step === 'failed' && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{
                                marginTop: '1rem',
                                padding: '1rem',
                                background: 'rgba(239, 68, 68, 0.1)',
                                borderRadius: '12px',
                                border: '1px solid #ef4444'
                            }}
                        >
                            <div style={{ color: '#ef4444', fontWeight: 700, marginBottom: '0.5rem' }}>
                                ❌ Prontosil FAILED!
                            </div>
                            <div style={{ color: 'var(--neutral-300)', fontSize: '0.9rem' }}>
                                The bacteria are completely unaffected! The red dye does nothing in a test tube.
                                <br /><br />
                                <em style={{ color: '#f59e0b' }}>
                                    &quot;In 1932, Gerhard Domagk was puzzled too. Why does it cure patients but fail in vitro?&quot;
                                </em>
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Right: Liver Simulation */}
                <div style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    borderRadius: '20px',
                    padding: '1.5rem',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    textAlign: 'center'
                }}>
                    <h4 style={{
                        color: '#8b5cf6',
                        marginBottom: '1rem',
                        fontSize: '1rem'
                    }}>
                        🔬 Liver Simulation: Bio-Activation
                    </h4>

                    {/* Liver Viz */}
                    <div style={{
                        width: '200px',
                        height: '200px',
                        borderRadius: '20px',
                        background: 'linear-gradient(135deg, #7f1d1d 0%, #991b1b 100%)',
                        border: '4px solid #b91c1c',
                        margin: '0 auto 1rem',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden'
                    }}>
                        {/* Liver SVG */}
                        <svg viewBox="0 0 100 80" style={{ width: '80px', height: '60px', opacity: 0.4 }}>
                            <path d="M15 40 Q10 20 25 15 Q45 5 65 15 Q85 25 90 45 Q92 60 80 70 Q60 80 40 75 Q20 70 15 55 Z" fill="#b91c1c" stroke="#991b1b" strokeWidth="2" />
                            <text x="50" y="45" textAnchor="middle" fill="#fecaca" fontSize="10" fontWeight="bold">LIVER</text>
                        </svg>

                        {/* Enzyme Animation */}
                        <AnimatePresence>
                            {showEnzyme && !prontosilSplit && (
                                <motion.div
                                    initial={{ scale: 0, rotate: 0 }}
                                    animate={{ scale: 1, rotate: 360 }}
                                    exit={{ scale: 0 }}
                                    transition={{ duration: 1.5 }}
                                    style={{
                                        position: 'absolute',
                                        fontSize: '3rem'
                                    }}
                                >
                                    ⚡
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Molecule Split Animation */}
                        {prontosilSplit && (
                            <div style={{ position: 'absolute' }}>
                                <motion.div
                                    initial={{ x: 0, opacity: 1 }}
                                    animate={{ x: -40, opacity: 1 }}
                                    style={{
                                        position: 'absolute',
                                        top: -30,
                                        padding: '0.5rem',
                                        background: '#dc2626',
                                        borderRadius: '8px',
                                        fontSize: '0.7rem',
                                        color: 'white',
                                        fontWeight: 600
                                    }}
                                >
                                    Triamine
                                </motion.div>
                                <motion.div
                                    initial={{ x: 0, opacity: 1 }}
                                    animate={{ x: 40, opacity: 1 }}
                                    style={{
                                        position: 'absolute',
                                        top: -30,
                                        padding: '0.5rem',
                                        background: '#10b981',
                                        borderRadius: '8px',
                                        fontSize: '0.7rem',
                                        color: 'white',
                                        fontWeight: 600
                                    }}
                                >
                                    Sulfanilamide ✓
                                </motion.div>
                            </div>
                        )}
                    </div>

                    {/* Enzyme Info */}
                    <div style={{
                        padding: '0.75rem 1rem',
                        background: 'rgba(139, 92, 246, 0.1)',
                        border: '1px solid #8b5cf6',
                        borderRadius: '12px',
                        color: '#8b5cf6',
                        fontWeight: 600,
                        marginBottom: '1rem'
                    }}>
                        🧬 Azoreductase Enzyme {showEnzyme ? '(Active!)' : '(Dormant)'}
                    </div>

                    {/* Add Enzyme Button */}
                    {step === 'failed' && !showEnzyme && (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={addEnzyme}
                            style={{
                                padding: '0.75rem 1.5rem',
                                background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                                border: 'none',
                                borderRadius: '12px',
                                color: 'white',
                                fontWeight: 600,
                                cursor: 'pointer'
                            }}
                        >
                            ⚡ Add Liver Enzymes (Azoreductase)
                        </motion.button>
                    )}

                    {/* Success Message */}
                    {step === 'success' && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{
                                padding: '1rem',
                                background: 'rgba(16, 185, 129, 0.1)',
                                borderRadius: '12px',
                                border: '1px solid #10b981'
                            }}
                        >
                            <div style={{ color: '#10b981', fontWeight: 700, marginBottom: '0.5rem' }}>
                                ✅ Bio-Activation Successful!
                            </div>
                            <div style={{ color: 'var(--neutral-300)', fontSize: '0.9rem' }}>
                                The N=N bond was cleaved, releasing <strong style={{ color: '#10b981' }}>Sulfanilamide</strong> -
                                the TRUE antibiotic!
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* The Big Revelation */}
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
                                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)',
                                borderRadius: '24px',
                                padding: '2rem',
                                maxWidth: '600px',
                                border: '2px solid #10b981'
                            }}
                            onClick={e => e.stopPropagation()}
                        >
                            <div style={{ fontSize: '4rem', textAlign: 'center', marginBottom: '1rem' }}>
                                💊
                            </div>
                            <h3 style={{
                                color: '#10b981',
                                textAlign: 'center',
                                fontSize: '1.5rem',
                                marginBottom: '1rem'
                            }}>
                                The Prodrug Revelation!
                            </h3>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '1rem',
                                marginBottom: '1.5rem'
                            }}>
                                <div style={{
                                    padding: '0.75rem 1rem',
                                    background: '#dc262620',
                                    borderRadius: '12px',
                                    border: '2px solid #dc2626',
                                    textAlign: 'center'
                                }}>
                                    <div style={{ color: '#dc2626', fontWeight: 700 }}>Prontosil</div>
                                    <div style={{ color: 'var(--neutral-400)', fontSize: '0.8rem' }}>Inactive Prodrug</div>
                                </div>
                                <span style={{ fontSize: '2rem' }}>→</span>
                                <div style={{
                                    padding: '0.5rem',
                                    background: '#8b5cf620',
                                    borderRadius: '8px',
                                    border: '2px solid #8b5cf6',
                                    fontSize: '0.8rem',
                                    color: '#8b5cf6'
                                }}>
                                    Liver<br />Enzymes
                                </div>
                                <span style={{ fontSize: '2rem' }}>→</span>
                                <div style={{
                                    padding: '0.75rem 1rem',
                                    background: '#10b98120',
                                    borderRadius: '12px',
                                    border: '2px solid #10b981',
                                    textAlign: 'center'
                                }}>
                                    <div style={{ color: '#10b981', fontWeight: 700 }}>Sulfanilamide</div>
                                    <div style={{ color: 'var(--neutral-400)', fontSize: '0.8rem' }}>Active Drug!</div>
                                </div>
                            </div>
                            <p style={{
                                color: 'var(--neutral-300)',
                                lineHeight: 1.8,
                                textAlign: 'center',
                                marginBottom: '1.5rem'
                            }}>
                                <strong style={{ color: '#f59e0b' }}>Prontosil is a PRODRUG</strong> -
                                biologically inactive until the body metabolizes it. This discovery taught us
                                that a drug&apos;s activity is not just about its structure, but about how the body
                                <strong style={{ color: '#8b5cf6' }}> transforms </strong> that structure!
                            </p>
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
                                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                    border: 'none',
                                    borderRadius: '12px',
                                    color: 'white',
                                    fontWeight: 600,
                                    cursor: 'pointer'
                                }}
                            >
                                🔐 Continue to Phase 3: Molecular Lock →
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
                    style={{ textAlign: 'center', marginTop: '2rem' }}
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onNext}
                        style={{
                            padding: '1rem 2rem',
                            background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                            border: 'none',
                            borderRadius: '16px',
                            color: 'white',
                            fontWeight: 700,
                            fontSize: '1.1rem',
                            cursor: 'pointer'
                        }}
                    >
                        🔐 Continue to Phase 3: Molecular Lock →
                    </motion.button>
                </motion.div>
            )}
        </div>
    );
}
