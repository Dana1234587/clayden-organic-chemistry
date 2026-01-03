'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SynthesisBenchProps {
    onComplete: () => void;
    onNext: () => void;
}

// Reagent data
const REAGENTS = {
    sulfanilamide: { name: 'Sulfanilamide', formula: 'C₆H₈N₂O₂S', color: '#10b981', icon: '💊' },
    naNO2: { name: 'Sodium Nitrite', formula: 'NaNO₂', color: '#3b82f6', icon: '🧂' },
    hcl: { name: 'Hydrochloric Acid', formula: 'HCl', color: '#ef4444', icon: '⚗️' },
    mPhenylene: { name: 'm-Phenylenediamine', formula: 'C₆H₈N₂', color: '#8b5cf6', icon: '🔮' }
};

type Step = 'intro' | 'diazotization' | 'icebath' | 'coupling' | 'complete';

export default function SynthesisBench({ onComplete, onNext }: SynthesisBenchProps) {
    const [step, setStep] = useState<Step>('intro');
    const [flaskContents, setFlaskContents] = useState<string[]>([]);
    const [temperature, setTemperature] = useState(25);
    const [inIceBath, setInIceBath] = useState(false);
    const [isStirring, setIsStirring] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [solutionColor, setSolutionColor] = useState('rgba(200, 200, 200, 0.3)');
    const [showInsight, setShowInsight] = useState(false);

    // Temperature simulation
    useEffect(() => {
        const interval = setInterval(() => {
            if (step === 'diazotization' || step === 'icebath') {
                setTemperature(prev => {
                    if (inIceBath) {
                        return Math.max(0, prev - 2);
                    } else if (flaskContents.length > 0) {
                        return Math.min(30, prev + 1);
                    }
                    return prev;
                });
            }
        }, 500);
        return () => clearInterval(interval);
    }, [inIceBath, flaskContents, step]);

    // Check temperature
    useEffect(() => {
        if (temperature > 10 && flaskContents.includes('naNO2') && !inIceBath) {
            setShowAlert(true);
            setAlertMessage('⚠️ Warning! Temperature too high! The diazonium salt will decompose!');
        } else {
            setShowAlert(false);
        }
    }, [temperature, flaskContents, inIceBath]);

    const addReagent = (reagentId: string) => {
        if (!flaskContents.includes(reagentId)) {
            setFlaskContents(prev => [...prev, reagentId]);

            // Progress logic
            if (step === 'intro' && reagentId === 'sulfanilamide') {
                setStep('diazotization');
            }
        }
    };

    const placeInIceBath = () => {
        setInIceBath(true);
        if (step === 'diazotization' && flaskContents.includes('naNO2') && flaskContents.includes('hcl')) {
            setTimeout(() => {
                if (temperature <= 5) {
                    setStep('icebath');
                    setSolutionColor('rgba(255, 255, 255, 0.5)'); // Clear diazonium
                }
            }, 2000);
        }
    };

    const startCoupling = () => {
        if (step === 'icebath' && temperature <= 5) {
            addReagent('mPhenylene');
            setIsStirring(true);

            setTimeout(() => {
                setSolutionColor('#dc2626'); // Vibrant red!
                setStep('coupling');
                setIsStirring(false);
                setShowInsight(true);
            }, 3000);
        }
    };

    const completePhase = () => {
        setStep('complete');
        onComplete();
    };

    const getTemperatureColor = () => {
        if (temperature <= 5) return '#10b981';
        if (temperature <= 10) return '#f59e0b';
        return '#ef4444';
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
                {['Diazotization', 'Ice Bath', 'Azo Coupling', 'Complete'].map((s, idx) => (
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
                                (idx === 0 && ['diazotization', 'icebath', 'coupling', 'complete'].includes(step)) ||
                                    (idx === 1 && ['icebath', 'coupling', 'complete'].includes(step)) ||
                                    (idx === 2 && ['coupling', 'complete'].includes(step)) ||
                                    (idx === 3 && step === 'complete')
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
                            fontSize: '0.8rem',
                            display: idx < 3 ? 'block' : 'none'
                        }}>
                            {s} →
                        </span>
                        {idx === 3 && (
                            <span style={{ color: 'var(--neutral-400)', fontSize: '0.8rem' }}>{s}</span>
                        )}
                    </div>
                ))}
            </div>

            {/* Main Lab Area */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '200px 1fr 200px',
                gap: '1.5rem',
                minHeight: '400px'
            }}>
                {/* Reagent Shelf */}
                <div style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    borderRadius: '16px',
                    padding: '1rem',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                    <h4 style={{
                        color: 'var(--neutral-300)',
                        marginBottom: '1rem',
                        fontSize: '0.9rem',
                        textAlign: 'center'
                    }}>
                        🧪 Reagent Shelf
                    </h4>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {Object.entries(REAGENTS).map(([id, reagent]) => {
                            const isAdded = flaskContents.includes(id);
                            const canAdd =
                                (id === 'sulfanilamide') ||
                                (id === 'naNO2' && flaskContents.includes('sulfanilamide')) ||
                                (id === 'hcl' && flaskContents.includes('naNO2')) ||
                                (id === 'mPhenylene' && step === 'icebath');

                            return (
                                <motion.button
                                    key={id}
                                    whileHover={canAdd && !isAdded ? { scale: 1.05 } : {}}
                                    whileTap={canAdd && !isAdded ? { scale: 0.95 } : {}}
                                    onClick={() => canAdd && !isAdded && addReagent(id)}
                                    disabled={isAdded || !canAdd}
                                    style={{
                                        padding: '0.75rem',
                                        background: isAdded
                                            ? 'rgba(16, 185, 129, 0.2)'
                                            : canAdd
                                                ? `${reagent.color}20`
                                                : 'rgba(255, 255, 255, 0.02)',
                                        border: isAdded
                                            ? '2px solid #10b981'
                                            : `2px solid ${canAdd ? reagent.color : 'rgba(255, 255, 255, 0.05)'}`,
                                        borderRadius: '10px',
                                        cursor: canAdd && !isAdded ? 'pointer' : 'not-allowed',
                                        opacity: isAdded ? 0.6 : 1
                                    }}
                                >
                                    <div style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>
                                        {reagent.icon}
                                    </div>
                                    <div style={{
                                        color: isAdded ? '#10b981' : reagent.color,
                                        fontWeight: 600,
                                        fontSize: '0.8rem'
                                    }}>
                                        {reagent.name}
                                    </div>
                                    <div style={{
                                        color: 'var(--neutral-500)',
                                        fontSize: '0.7rem'
                                    }}>
                                        {reagent.formula}
                                    </div>
                                    {isAdded && (
                                        <div style={{
                                            color: '#10b981',
                                            fontSize: '0.7rem',
                                            marginTop: '0.25rem'
                                        }}>
                                            ✓ Added
                                        </div>
                                    )}
                                </motion.button>
                            );
                        })}
                    </div>
                </div>

                {/* Central Flask Area */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                }}>
                    {/* Alert Banner */}
                    <AnimatePresence>
                        {showAlert && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    padding: '1rem',
                                    background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(220, 38, 38, 0.2) 100%)',
                                    border: '2px solid #ef4444',
                                    borderRadius: '12px',
                                    color: '#ef4444',
                                    fontWeight: 600,
                                    textAlign: 'center'
                                }}
                            >
                                {alertMessage}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Flask */}
                    <motion.div
                        animate={isStirring ? { rotate: [0, 5, -5, 0] } : {}}
                        transition={{ duration: 0.3, repeat: isStirring ? Infinity : 0 }}
                        style={{
                            position: 'relative',
                            marginTop: showAlert ? '80px' : '0'
                        }}
                    >
                        {/* Flask SVG */}
                        <svg width="200" height="250" viewBox="0 0 200 250">
                            {/* Flask body */}
                            <path
                                d="M60 30 L60 100 L20 200 Q20 230 50 230 L150 230 Q180 230 180 200 L140 100 L140 30"
                                fill="none"
                                stroke="rgba(255, 255, 255, 0.3)"
                                strokeWidth="3"
                            />

                            {/* Flask neck */}
                            <rect x="60" y="10" width="80" height="20" fill="none" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="3" rx="2" />

                            {/* Solution */}
                            {flaskContents.length > 0 && (
                                <motion.path
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    d="M25 200 Q25 220 50 220 L150 220 Q175 220 175 200 L140 110 L60 110 Z"
                                    fill={solutionColor}
                                />
                            )}

                            {/* Bubbles when stirring */}
                            {isStirring && (
                                <>
                                    <motion.circle
                                        animate={{ y: [0, -30], opacity: [1, 0] }}
                                        transition={{ duration: 1, repeat: Infinity }}
                                        cx="80" cy="180" r="5" fill="rgba(255,255,255,0.5)"
                                    />
                                    <motion.circle
                                        animate={{ y: [0, -40], opacity: [1, 0] }}
                                        transition={{ duration: 1.2, repeat: Infinity, delay: 0.3 }}
                                        cx="120" cy="190" r="4" fill="rgba(255,255,255,0.5)"
                                    />
                                    <motion.circle
                                        animate={{ y: [0, -35], opacity: [1, 0] }}
                                        transition={{ duration: 0.8, repeat: Infinity, delay: 0.6 }}
                                        cx="100" cy="185" r="6" fill="rgba(255,255,255,0.5)"
                                    />
                                </>
                            )}
                        </svg>

                        {/* Ice Bath */}
                        {inIceBath && (
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                style={{
                                    position: 'absolute',
                                    bottom: -20,
                                    left: -30,
                                    right: -30,
                                    height: '100px',
                                    background: 'linear-gradient(180deg, rgba(96, 165, 250, 0.3) 0%, rgba(59, 130, 246, 0.4) 100%)',
                                    borderRadius: '12px',
                                    border: '2px solid #3b82f6',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '2rem'
                                }}
                            >
                                🧊❄️🧊
                            </motion.div>
                        )}
                    </motion.div>

                    {/* Action Buttons */}
                    <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                        {!inIceBath && flaskContents.includes('hcl') && step === 'diazotization' && (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={placeInIceBath}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                                    border: 'none',
                                    borderRadius: '12px',
                                    color: 'white',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                🧊 Place in Ice Bath
                            </motion.button>
                        )}

                        {step === 'icebath' && temperature <= 5 && !flaskContents.includes('mPhenylene') && (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={startCoupling}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                                    border: 'none',
                                    borderRadius: '12px',
                                    color: 'white',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                🔮 Add m-Phenylenediamine & Stir
                            </motion.button>
                        )}

                        {step === 'coupling' && (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={completePhase}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                    border: 'none',
                                    borderRadius: '12px',
                                    color: 'white',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                ✓ Complete Synthesis
                            </motion.button>
                        )}
                    </div>
                </div>

                {/* Temperature & Info Panel */}
                <div style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    borderRadius: '16px',
                    padding: '1rem',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                    {/* Temperature Gauge */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <h4 style={{
                            color: 'var(--neutral-300)',
                            marginBottom: '1rem',
                            fontSize: '0.9rem',
                            textAlign: 'center'
                        }}>
                            🌡️ Temperature
                        </h4>

                        <div style={{
                            height: '150px',
                            width: '40px',
                            margin: '0 auto',
                            background: 'rgba(255, 255, 255, 0.1)',
                            borderRadius: '20px',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <motion.div
                                animate={{ height: `${(temperature / 30) * 100}%` }}
                                style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    background: getTemperatureColor(),
                                    borderRadius: '20px'
                                }}
                            />

                            {/* Safe zone marker */}
                            <div style={{
                                position: 'absolute',
                                top: `${100 - (5 / 30) * 100}%`,
                                left: -10,
                                right: -10,
                                borderTop: '2px dashed #10b981',
                                fontSize: '0.6rem',
                                color: '#10b981'
                            }}>
                                5°C
                            </div>
                        </div>

                        <div style={{
                            textAlign: 'center',
                            marginTop: '0.75rem',
                            fontSize: '1.5rem',
                            fontWeight: 700,
                            color: getTemperatureColor()
                        }}>
                            {temperature}°C
                        </div>

                        <div style={{
                            textAlign: 'center',
                            fontSize: '0.75rem',
                            color: temperature <= 5 ? '#10b981' : '#f59e0b'
                        }}>
                            {temperature <= 5 ? '✓ Safe Zone' : '⚠️ Cool down!'}
                        </div>
                    </div>

                    {/* Instructions */}
                    <div style={{
                        padding: '1rem',
                        background: 'rgba(139, 92, 246, 0.1)',
                        borderRadius: '12px',
                        border: '1px solid rgba(139, 92, 246, 0.3)'
                    }}>
                        <div style={{
                            color: '#8b5cf6',
                            fontWeight: 600,
                            fontSize: '0.8rem',
                            marginBottom: '0.5rem'
                        }}>
                            📋 Instructions
                        </div>
                        <div style={{ color: 'var(--neutral-300)', fontSize: '0.8rem', lineHeight: 1.6 }}>
                            {step === 'intro' && 'Add Sulfanilamide to the flask to begin.'}
                            {step === 'diazotization' && 'Add NaNO₂ and HCl, then place flask in ice bath to keep temperature below 5°C.'}
                            {step === 'icebath' && temperature > 5 && 'Wait for temperature to drop below 5°C...'}
                            {step === 'icebath' && temperature <= 5 && 'Temperature is safe! Add m-Phenylenediamine to perform the azo coupling.'}
                            {step === 'coupling' && 'Excellent! You synthesized Prontosil!'}
                            {step === 'complete' && 'Phase 1 Complete! 🎉'}
                        </div>
                    </div>
                </div>
            </div>

            {/* Academic Insight Modal */}
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
                            background: 'rgba(0, 0, 0, 0.8)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 1000,
                            padding: '2rem'
                        }}
                        onClick={() => setShowInsight(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            style={{
                                background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)',
                                borderRadius: '24px',
                                padding: '2rem',
                                maxWidth: '500px',
                                border: '2px solid #dc2626'
                            }}
                            onClick={e => e.stopPropagation()}
                        >
                            <div style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '1rem' }}>
                                🎨
                            </div>
                            <h3 style={{
                                color: '#dc2626',
                                textAlign: 'center',
                                fontSize: '1.5rem',
                                marginBottom: '1rem'
                            }}>
                                The Color Burst!
                            </h3>
                            <p style={{
                                color: 'var(--neutral-300)',
                                lineHeight: 1.8,
                                textAlign: 'center',
                                marginBottom: '1.5rem'
                            }}>
                                You have just created a long system of <strong style={{ color: '#f97316' }}>Conjugated Double Bonds</strong>.
                                The <strong style={{ color: '#f97316' }}>N=N (Azo) bridge</strong> allows electrons to delocalize across
                                the rings, absorbing blue light and reflecting <strong style={{ color: '#dc2626' }}>vibrant red</strong>!
                            </p>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                gap: '1rem'
                            }}>
                                <span style={{ color: '#3b82f6' }}>Blue Light</span>
                                <span>→</span>
                                <span style={{ color: '#dc2626' }}>Absorbed</span>
                                <span>→</span>
                                <span style={{ color: '#dc2626', fontWeight: 700 }}>Reflects Red!</span>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setShowInsight(false)}
                                style={{
                                    width: '100%',
                                    marginTop: '1.5rem',
                                    padding: '1rem',
                                    background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                                    border: 'none',
                                    borderRadius: '12px',
                                    color: 'white',
                                    fontWeight: 600,
                                    cursor: 'pointer'
                                }}
                            >
                                Amazing! Continue →
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Complete Phase Button */}
            {step === 'complete' && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                        marginTop: '2rem',
                        textAlign: 'center'
                    }}
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onNext}
                        style={{
                            padding: '1rem 2rem',
                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                            border: 'none',
                            borderRadius: '16px',
                            color: 'white',
                            fontWeight: 700,
                            fontSize: '1.1rem',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.75rem'
                        }}
                    >
                        🧬 Continue to Phase 2: Metabolism Mystery →
                    </motion.button>
                </motion.div>
            )}
        </div>
    );
}
