'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface DrugEnantiomer {
    id: string;
    name: string;
    config: 'R' | 'S';
    role: 'eutomer' | 'distomer';
    activity: string;
    ic50: number;
    color: string;
}

interface ChiralSwitchDrug {
    original: string;
    switched: string;
    year: number;
    benefit: string;
    eutomerConfig: 'R' | 'S';
}

interface RacemizationState {
    rPercentage: number;
    sPercentage: number;
    time: number;
    isRunning: boolean;
    pH: number;
}

// ============================================================================
// DATA
// ============================================================================

const THALIDOMIDE: DrugEnantiomer[] = [
    {
        id: 'r-thalidomide',
        name: '(R)-Thalidomide',
        config: 'R',
        role: 'eutomer',
        activity: 'Sedative / Anti-nausea',
        ic50: 0.5,
        color: '#10b981'
    },
    {
        id: 's-thalidomide',
        name: '(S)-Thalidomide',
        config: 'S',
        role: 'distomer',
        activity: 'Teratogenic (Birth Defects)',
        ic50: 50,
        color: '#ef4444'
    }
];

const CHIRAL_SWITCHES: ChiralSwitchDrug[] = [
    {
        original: 'Citalopram (racemic)',
        switched: 'Escitalopram (S)',
        year: 2002,
        benefit: '2x potent SSRI, fewer side effects',
        eutomerConfig: 'S'
    },
    {
        original: 'Omeprazole (racemic)',
        switched: 'Esomeprazole (S)',
        year: 2001,
        benefit: 'Better bioavailability, longer action',
        eutomerConfig: 'S'
    },
    {
        original: 'Methylphenidate (racemic)',
        switched: 'Dexmethylphenidate (R)',
        year: 2001,
        benefit: 'Same efficacy at half the dose',
        eutomerConfig: 'R'
    },
    {
        original: 'Ibuprofen (racemic)',
        switched: '(S)-Ibuprofen',
        year: 1994,
        benefit: '100x more potent COX inhibitor',
        eutomerConfig: 'S'
    }
];

// ============================================================================
// MIRROR DIMENSION SIMULATION (Thalidomide Racemization)
// ============================================================================

function MirrorDimensionSim() {
    const [racemization, setRacemization] = useState<RacemizationState>({
        rPercentage: 100,
        sPercentage: 0,
        time: 0,
        isRunning: false,
        pH: 7.4
    });
    const [showWarning, setShowWarning] = useState(false);
    const [vdwClashes, setVdwClashes] = useState(0);

    // Simulate racemization
    useEffect(() => {
        if (!racemization.isRunning) return;

        const interval = setInterval(() => {
            setRacemization(prev => {
                // Racemization rate depends on pH
                const rate = 0.02 * (1 + Math.abs(prev.pH - 7.4) * 2);
                const equilibrium = 50; // Racemic equilibrium

                const newR = prev.rPercentage - (prev.rPercentage - equilibrium) * rate;
                const newS = 100 - newR;
                const newTime = prev.time + 0.5;

                // Show warning when S reaches dangerous levels
                if (newS > 10 && !showWarning) {
                    setShowWarning(true);
                }

                // Count VdW clashes as S-form increases
                setVdwClashes(Math.floor(newS / 5));

                // Stop at equilibrium
                if (Math.abs(newR - equilibrium) < 0.5) {
                    return { ...prev, rPercentage: equilibrium, sPercentage: equilibrium, time: newTime, isRunning: false };
                }

                return { ...prev, rPercentage: newR, sPercentage: newS, time: newTime };
            });
        }, 100);

        return () => clearInterval(interval);
    }, [racemization.isRunning, showWarning]);

    const startRacemization = () => {
        setRacemization(prev => ({ ...prev, isRunning: true }));
    };

    const resetSimulation = () => {
        setRacemization({
            rPercentage: 100,
            sPercentage: 0,
            time: 0,
            isRunning: false,
            pH: 7.4
        });
        setShowWarning(false);
        setVdwClashes(0);
    };

    const eudysmicRatio = Math.round((100 - racemization.sPercentage) / Math.max(racemization.sPercentage, 0.1));

    return (
        <div style={{ padding: '1.5rem' }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1.5rem'
            }}>
                <span style={{ fontSize: '1.5rem' }}>🪞</span>
                <div>
                    <h4 style={{ color: '#e2e8f0', margin: 0 }}>The Mirror Dimension: Thalidomide Racemization</h4>
                    <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.85rem' }}>
                        Watch how a pure (R)-enantiomer converts to its toxic mirror image in vivo
                    </p>
                </div>
            </div>

            {/* Main Simulation Area */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.5rem',
                marginBottom: '1.5rem'
            }}>
                {/* Patient Body Visualization */}
                <div style={{
                    background: 'rgba(0, 0, 0, 0.4)',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <h5 style={{ color: '#e2e8f0', marginBottom: '1rem', textAlign: 'center' }}>
                        Blood Environment (pH {racemization.pH})
                    </h5>

                    {/* Molecule Visualization */}
                    <div style={{
                        height: '200px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative'
                    }}>
                        {/* R-Thalidomide (Eutomer) */}
                        <motion.div
                            animate={{
                                scale: racemization.isRunning ? [1, 1.05, 1] : 1,
                                opacity: racemization.rPercentage / 100
                            }}
                            transition={{ repeat: racemization.isRunning ? Infinity : 0, duration: 0.5 }}
                            style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                background: `linear-gradient(135deg, #10b981 ${racemization.rPercentage}%, #1f2937 ${racemization.rPercentage}%)`,
                                border: '3px solid #10b981',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: 700,
                                fontSize: '1.2rem',
                                marginRight: '-20px',
                                zIndex: 2
                            }}
                        >
                            R
                        </motion.div>

                        {/* Racemization Arrow */}
                        {racemization.isRunning && (
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.5rem',
                                    zIndex: 3
                                }}
                            >
                                ⚡
                            </motion.div>
                        )}

                        {/* S-Thalidomide (Distomer) */}
                        <motion.div
                            animate={{
                                scale: racemization.isRunning ? [1, 1.05, 1] : 1,
                                opacity: Math.max(0.2, racemization.sPercentage / 100)
                            }}
                            transition={{ repeat: racemization.isRunning ? Infinity : 0, duration: 0.5, delay: 0.25 }}
                            style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                background: `linear-gradient(135deg, #ef4444 ${racemization.sPercentage}%, #1f2937 ${racemization.sPercentage}%)`,
                                border: '3px solid #ef4444',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: 700,
                                fontSize: '1.2rem',
                                marginLeft: '-20px',
                                zIndex: 1
                            }}
                        >
                            S
                        </motion.div>
                    </div>

                    {/* Percentage Bars */}
                    <div style={{ marginTop: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                            <span style={{ color: '#10b981', fontWeight: 600, fontSize: '0.85rem' }}>
                                (R) Eutomer: {racemization.rPercentage.toFixed(1)}%
                            </span>
                            <span style={{ color: '#ef4444', fontWeight: 600, fontSize: '0.85rem' }}>
                                (S) Distomer: {racemization.sPercentage.toFixed(1)}%
                            </span>
                        </div>
                        <div style={{
                            height: '12px',
                            background: 'rgba(255,255,255,0.1)',
                            borderRadius: '6px',
                            overflow: 'hidden',
                            display: 'flex'
                        }}>
                            <motion.div
                                animate={{ width: `${racemization.rPercentage}%` }}
                                style={{
                                    height: '100%',
                                    background: 'linear-gradient(90deg, #10b981, #059669)',
                                    borderRadius: '6px 0 0 6px'
                                }}
                            />
                            <motion.div
                                animate={{ width: `${racemization.sPercentage}%` }}
                                style={{
                                    height: '100%',
                                    background: 'linear-gradient(90deg, #dc2626, #ef4444)',
                                    borderRadius: '0 6px 6px 0'
                                }}
                            />
                        </div>
                    </div>

                    {/* Time Display */}
                    <div style={{
                        marginTop: '1rem',
                        textAlign: 'center',
                        color: '#94a3b8',
                        fontSize: '0.9rem'
                    }}>
                        Simulated Time: <strong>{racemization.time.toFixed(1)}h</strong>
                    </div>
                </div>

                {/* MDDD Dashboard */}
                <div style={{
                    background: 'rgba(0, 0, 0, 0.4)',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                    <h5 style={{ color: '#e2e8f0', marginBottom: '1rem' }}>📊 MDDD Research Dashboard</h5>

                    {/* Metrics */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <div style={{
                            padding: '0.75rem',
                            background: 'rgba(16, 185, 129, 0.15)',
                            borderRadius: '8px',
                            border: '1px solid rgba(16, 185, 129, 0.3)'
                        }}>
                            <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>EUTOMER (R)</div>
                            <div style={{ color: '#10b981', fontWeight: 700 }}>Anti-nausea / Sedative ✓</div>
                            <div style={{ color: '#64748b', fontSize: '0.75rem' }}>IC₅₀ = 0.5 µM</div>
                        </div>

                        <div style={{
                            padding: '0.75rem',
                            background: 'rgba(239, 68, 68, 0.15)',
                            borderRadius: '8px',
                            border: '1px solid rgba(239, 68, 68, 0.3)'
                        }}>
                            <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>DISTOMER (S)</div>
                            <div style={{ color: '#ef4444', fontWeight: 700 }}>Teratogenic (Birth Defects) ⚠️</div>
                            <div style={{ color: '#64748b', fontSize: '0.75rem' }}>IC₅₀ = 50 µM (100x weaker)</div>
                        </div>

                        <div style={{
                            padding: '0.75rem',
                            background: 'rgba(139, 92, 246, 0.15)',
                            borderRadius: '8px',
                            border: '1px solid rgba(139, 92, 246, 0.3)'
                        }}>
                            <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>EUDYSMIC RATIO</div>
                            <div style={{ color: '#a78bfa', fontWeight: 700, fontSize: '1.2rem' }}>
                                {isFinite(eudysmicRatio) ? `${eudysmicRatio}:1` : '∞:1'}
                            </div>
                        </div>

                        <div style={{
                            padding: '0.75rem',
                            background: vdwClashes > 5 ? 'rgba(239, 68, 68, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                            borderRadius: '8px',
                            border: `1px solid ${vdwClashes > 5 ? 'rgba(239, 68, 68, 0.3)' : 'rgba(255, 255, 255, 0.1)'}`
                        }}>
                            <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>VAN DER WAALS CLASHES</div>
                            <div style={{
                                color: vdwClashes > 5 ? '#ef4444' : '#e2e8f0',
                                fontWeight: 700,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}>
                                {vdwClashes}
                                {vdwClashes > 5 && <span style={{ color: '#ef4444' }}>⚠️ STERIC CLASH</span>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Warning Message */}
            <AnimatePresence>
                {showWarning && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        style={{
                            padding: '1rem',
                            background: 'rgba(239, 68, 68, 0.2)',
                            borderRadius: '12px',
                            border: '2px solid #ef4444',
                            marginBottom: '1rem'
                        }}
                    >
                        <div style={{ color: '#ef4444', fontWeight: 700, marginBottom: '0.5rem' }}>
                            ⚠️ CLINICAL DANGER DETECTED
                        </div>
                        <div style={{ color: '#fca5a5', fontSize: '0.9rem', lineHeight: 1.5 }}>
                            Even with pure (R)-synthesis, the blood&apos;s pH environment caused <strong>in vivo racemization</strong>.
                            The toxic (S)-enantiomer is now forming. This drug is <strong>unstable for clinical use in pregnancy</strong>.
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Controls */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button
                    onClick={startRacemization}
                    disabled={racemization.isRunning || racemization.time > 0}
                    style={{
                        padding: '0.75rem 1.5rem',
                        background: racemization.isRunning ? 'rgba(255,255,255,0.1)' : 'linear-gradient(135deg, #8b5cf6, #6366f1)',
                        border: 'none',
                        borderRadius: '12px',
                        color: 'white',
                        fontWeight: 600,
                        cursor: racemization.isRunning ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}
                >
                    {racemization.isRunning ? '⏳ Simulating...' : '🧪 Start Racemization'}
                </button>

                <button
                    onClick={resetSimulation}
                    style={{
                        padding: '0.75rem 1.5rem',
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: 'none',
                        borderRadius: '12px',
                        color: 'white',
                        fontWeight: 600,
                        cursor: 'pointer'
                    }}
                >
                    🔄 Reset
                </button>
            </div>

            {/* Educational Note */}
            <div style={{
                marginTop: '1.5rem',
                padding: '1rem',
                background: 'rgba(59, 130, 246, 0.1)',
                borderRadius: '12px',
                border: '1px solid rgba(59, 130, 246, 0.3)'
            }}>
                <div style={{ color: '#60a5fa', fontWeight: 600, marginBottom: '0.5rem' }}>
                    💡 Research Insight: In Vivo Racemization
                </div>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6 }}>
                    Thalidomide has an acidic proton at the chiral center (α to the carbonyl).
                    At physiological pH (7.4), this proton can be abstracted and re-added from either face,
                    leading to racemization with t½ ≈ 4-8 hours. This is why administering pure (R)-thalidomide
                    cannot prevent teratogenicity — the body converts it to a racemic mixture.
                </div>
            </div>
        </div>
    );
}

// ============================================================================
// CHIRAL SWITCH EXPLORER
// ============================================================================

function ChiralSwitchExplorer() {
    const [selectedDrug, setSelectedDrug] = useState<ChiralSwitchDrug>(CHIRAL_SWITCHES[0]);

    return (
        <div style={{ padding: '1.5rem' }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1.5rem'
            }}>
                <span style={{ fontSize: '1.5rem' }}>💊</span>
                <div>
                    <h4 style={{ color: '#e2e8f0', margin: 0 }}>Chiral Switch Strategy</h4>
                    <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.85rem' }}>
                        How pharma companies convert racemic drugs to pure enantiomers
                    </p>
                </div>
            </div>

            {/* Drug Selection */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '0.75rem',
                marginBottom: '1.5rem'
            }}>
                {CHIRAL_SWITCHES.map(drug => (
                    <motion.button
                        key={drug.original}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedDrug(drug)}
                        style={{
                            padding: '1rem',
                            background: selectedDrug === drug
                                ? 'rgba(139, 92, 246, 0.2)'
                                : 'rgba(255, 255, 255, 0.05)',
                            border: `2px solid ${selectedDrug === drug ? '#8b5cf6' : 'rgba(255,255,255,0.1)'}`,
                            borderRadius: '12px',
                            cursor: 'pointer',
                            textAlign: 'left'
                        }}
                    >
                        <div style={{ color: '#e2e8f0', fontWeight: 600, fontSize: '0.9rem' }}>
                            {drug.switched}
                        </div>
                        <div style={{ color: '#64748b', fontSize: '0.75rem' }}>
                            {drug.year}
                        </div>
                    </motion.button>
                ))}
            </div>

            {/* Selected Drug Details */}
            <div style={{
                background: 'rgba(0, 0, 0, 0.4)',
                borderRadius: '16px',
                padding: '1.5rem',
                border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '1rem'
                }}>
                    <div style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        background: 'rgba(239, 68, 68, 0.2)',
                        border: '2px solid #ef4444',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ef4444',
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        textAlign: 'center'
                    }}>
                        RACEMIC<br />MIXTURE
                    </div>
                    <motion.div
                        animate={{ x: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        style={{ fontSize: '2rem' }}
                    >
                        →
                    </motion.div>
                    <div style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        background: 'rgba(16, 185, 129, 0.2)',
                        border: '2px solid #10b981',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#10b981',
                        fontSize: '1.2rem',
                        fontWeight: 700
                    }}>
                        {selectedDrug.eutomerConfig}
                    </div>
                </div>

                <h5 style={{ color: '#e2e8f0', marginBottom: '0.5rem' }}>
                    {selectedDrug.original} → {selectedDrug.switched}
                </h5>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '1rem',
                    marginTop: '1rem'
                }}>
                    <div style={{
                        padding: '0.75rem',
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '8px'
                    }}>
                        <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>YEAR</div>
                        <div style={{ color: '#e2e8f0', fontWeight: 600 }}>{selectedDrug.year}</div>
                    </div>
                    <div style={{
                        padding: '0.75rem',
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '8px'
                    }}>
                        <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>EUTOMER CONFIG</div>
                        <div style={{ color: '#10b981', fontWeight: 600 }}>({selectedDrug.eutomerConfig})-enantiomer</div>
                    </div>
                </div>

                <div style={{
                    marginTop: '1rem',
                    padding: '0.75rem',
                    background: 'rgba(16, 185, 129, 0.1)',
                    borderRadius: '8px',
                    border: '1px solid rgba(16, 185, 129, 0.3)'
                }}>
                    <div style={{ color: '#10b981', fontSize: '0.75rem', marginBottom: '0.25rem' }}>CLINICAL BENEFIT</div>
                    <div style={{ color: '#e2e8f0', fontSize: '0.9rem' }}>{selectedDrug.benefit}</div>
                </div>
            </div>

            {/* Strategy Explanation */}
            <div style={{
                marginTop: '1.5rem',
                padding: '1rem',
                background: 'rgba(139, 92, 246, 0.1)',
                borderRadius: '12px',
                border: '1px solid rgba(139, 92, 246, 0.3)'
            }}>
                <div style={{ color: '#a78bfa', fontWeight: 600, marginBottom: '0.5rem' }}>
                    💡 Why Chiral Switch?
                </div>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6 }}>
                    <strong>Patent Extension:</strong> When a racemic drug&apos;s patent expires, companies can patent the pure eutomer.
                    <br /><br />
                    <strong>Pharmacological Advantage:</strong> The eutomer provides full therapeutic effect at half the dose,
                    reducing side effects from the distomer.
                    <br /><br />
                    <strong>CYP450 Considerations:</strong> Pure enantiomers often have more predictable metabolism,
                    reducing drug-drug interactions.
                </div>
            </div>
        </div>
    );
}

// ============================================================================
// EUDYSMIC CALCULATOR
// ============================================================================

function EudysmicCalculator() {
    const [eutomerIC50, setEutomerIC50] = useState<string>('0.5');
    const [distomerIC50, setDistomerIC50] = useState<string>('50');

    const eutomerValue = parseFloat(eutomerIC50) || 0;
    const distomerValue = parseFloat(distomerIC50) || 0;
    const ratio = distomerValue > 0 && eutomerValue > 0 ? distomerValue / eutomerValue : 0;

    const getImplication = () => {
        if (ratio >= 100) return { text: 'Excellent enantioselectivity. Chiral switch highly recommended.', color: '#10b981' };
        if (ratio >= 10) return { text: 'Good enantioselectivity. Consider chiral switch for improved safety.', color: '#eab308' };
        if (ratio >= 2) return { text: 'Moderate difference. Racemic formulation may be acceptable.', color: '#f97316' };
        return { text: 'Low enantioselectivity. Both enantiomers contribute to activity.', color: '#ef4444' };
    };

    const implication = getImplication();

    return (
        <div style={{ padding: '1.5rem' }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1.5rem'
            }}>
                <span style={{ fontSize: '1.5rem' }}>📊</span>
                <div>
                    <h4 style={{ color: '#e2e8f0', margin: 0 }}>Eudysmic Ratio Calculator</h4>
                    <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.85rem' }}>
                        Calculate potency difference between enantiomers
                    </p>
                </div>
            </div>

            <div style={{
                background: 'rgba(0, 0, 0, 0.4)',
                borderRadius: '16px',
                padding: '1.5rem',
                border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
                {/* Input Fields */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '1rem',
                    marginBottom: '1.5rem'
                }}>
                    <div>
                        <label style={{ color: '#10b981', fontSize: '0.85rem', display: 'block', marginBottom: '0.5rem' }}>
                            Eutomer IC₅₀ (nM)
                        </label>
                        <input
                            type="number"
                            value={eutomerIC50}
                            onChange={e => setEutomerIC50(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                background: 'rgba(16, 185, 129, 0.1)',
                                border: '2px solid #10b981',
                                borderRadius: '8px',
                                color: '#10b981',
                                fontSize: '1.1rem',
                                fontWeight: 600
                            }}
                        />
                    </div>
                    <div>
                        <label style={{ color: '#ef4444', fontSize: '0.85rem', display: 'block', marginBottom: '0.5rem' }}>
                            Distomer IC₅₀ (nM)
                        </label>
                        <input
                            type="number"
                            value={distomerIC50}
                            onChange={e => setDistomerIC50(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                background: 'rgba(239, 68, 68, 0.1)',
                                border: '2px solid #ef4444',
                                borderRadius: '8px',
                                color: '#ef4444',
                                fontSize: '1.1rem',
                                fontWeight: 600
                            }}
                        />
                    </div>
                </div>

                {/* Result */}
                <div style={{
                    textAlign: 'center',
                    padding: '1.5rem',
                    background: 'rgba(139, 92, 246, 0.15)',
                    borderRadius: '12px',
                    border: '1px solid #8b5cf6'
                }}>
                    <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                        EUDYSMIC RATIO
                    </div>
                    <div style={{ color: '#a78bfa', fontSize: '3rem', fontWeight: 700 }}>
                        {ratio > 0 ? `${ratio.toFixed(1)}:1` : '—'}
                    </div>
                    <div style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '0.5rem' }}>
                        Distomer IC₅₀ / Eutomer IC₅₀
                    </div>
                </div>

                {/* Clinical Implication */}
                <div style={{
                    marginTop: '1rem',
                    padding: '1rem',
                    background: `${implication.color}15`,
                    borderRadius: '12px',
                    border: `1px solid ${implication.color}40`
                }}>
                    <div style={{ color: implication.color, fontWeight: 600, marginBottom: '0.25rem' }}>
                        Clinical Implication
                    </div>
                    <div style={{ color: '#e2e8f0', fontSize: '0.9rem' }}>
                        {implication.text}
                    </div>
                </div>
            </div>

            {/* Formula Explanation */}
            <div style={{
                marginTop: '1.5rem',
                padding: '1rem',
                background: 'rgba(59, 130, 246, 0.1)',
                borderRadius: '12px',
                border: '1px solid rgba(59, 130, 246, 0.3)'
            }}>
                <div style={{ color: '#60a5fa', fontWeight: 600, marginBottom: '0.5rem' }}>
                    📐 Formula
                </div>
                <div style={{
                    color: '#e2e8f0',
                    fontSize: '1rem',
                    fontFamily: 'monospace',
                    textAlign: 'center',
                    padding: '0.5rem'
                }}>
                    Eudysmic Ratio = IC₅₀(Distomer) / IC₅₀(Eutomer)
                </div>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '0.5rem', lineHeight: 1.5 }}>
                    A higher ratio indicates greater enantioselectivity. Ratios &gt;100:1 suggest
                    the distomer contributes minimally to therapeutic effect and may only cause side effects.
                </div>
            </div>
        </div>
    );
}

// ============================================================================
// CRYO-EM DOCKING
// ============================================================================

function CryoEMDocking() {
    const [selectedEnantiomer, setSelectedEnantiomer] = useState<'R' | 'S'>('R');
    const [showBindingEnergy, setShowBindingEnergy] = useState(false);

    const bindingData = {
        R: { deltaG: -9.2, clashes: 0, fit: 'optimal' },
        S: { deltaG: -4.8, clashes: 7, fit: 'poor' }
    };

    const data = bindingData[selectedEnantiomer];

    return (
        <div style={{ padding: '1.5rem' }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1.5rem'
            }}>
                <span style={{ fontSize: '1.5rem' }}>🔬</span>
                <div>
                    <h4 style={{ color: '#e2e8f0', margin: 0 }}>Cryo-EM Chiral Recognition</h4>
                    <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.85rem' }}>
                        Visualize how enantiomers fit into the chiral binding pocket
                    </p>
                </div>
            </div>

            {/* Enantiomer Selection */}
            <div style={{
                display: 'flex',
                gap: '0.75rem',
                marginBottom: '1.5rem'
            }}>
                {(['R', 'S'] as const).map(config => (
                    <button
                        key={config}
                        onClick={() => {
                            setSelectedEnantiomer(config);
                            setShowBindingEnergy(false);
                        }}
                        style={{
                            flex: 1,
                            padding: '1rem',
                            background: selectedEnantiomer === config
                                ? config === 'R' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'
                                : 'rgba(255, 255, 255, 0.05)',
                            border: `2px solid ${selectedEnantiomer === config
                                ? config === 'R' ? '#10b981' : '#ef4444'
                                : 'rgba(255,255,255,0.1)'}`,
                            borderRadius: '12px',
                            color: config === 'R' ? '#10b981' : '#ef4444',
                            fontWeight: 700,
                            fontSize: '1.1rem',
                            cursor: 'pointer'
                        }}
                    >
                        ({config})-Enantiomer
                    </button>
                ))}
            </div>

            {/* Binding Pocket Visualization */}
            <div style={{
                background: 'rgba(0, 0, 0, 0.4)',
                borderRadius: '16px',
                padding: '1.5rem',
                border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
                <svg viewBox="0 0 400 250" style={{ width: '100%', height: '250px' }}>
                    <defs>
                        <linearGradient id="pocketGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#1e40af" />
                            <stop offset="100%" stopColor="#7c3aed" />
                        </linearGradient>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* Protein Binding Pocket */}
                    <path
                        d="M50 200 Q80 230 150 230 Q220 230 250 200 L270 120 Q280 60 200 40 Q120 20 100 80 Z"
                        fill="url(#pocketGradient)"
                        stroke="#3b82f6"
                        strokeWidth="2"
                        opacity="0.8"
                    />

                    {/* Chiral Pocket Label */}
                    <text x="160" y="150" fill="#94a3b8" fontSize="12" textAnchor="middle">
                        Chiral Binding Pocket
                    </text>

                    {/* Ligand */}
                    <motion.g
                        animate={{
                            x: selectedEnantiomer === 'R' ? 0 : 20,
                            y: selectedEnantiomer === 'R' ? 0 : -10
                        }}
                    >
                        <circle
                            cx="180"
                            cy="110"
                            r="35"
                            fill={selectedEnantiomer === 'R' ? '#10b98140' : '#ef444440'}
                            stroke={selectedEnantiomer === 'R' ? '#10b981' : '#ef4444'}
                            strokeWidth="3"
                            filter={selectedEnantiomer === 'R' ? 'url(#glow)' : 'none'}
                        />
                        <text
                            x="180"
                            y="115"
                            fill={selectedEnantiomer === 'R' ? '#10b981' : '#ef4444'}
                            fontSize="20"
                            fontWeight="bold"
                            textAnchor="middle"
                        >
                            {selectedEnantiomer}
                        </text>
                    </motion.g>

                    {/* Clash Indicators for S */}
                    {selectedEnantiomer === 'S' && (
                        <>
                            {[...Array(7)].map((_, i) => (
                                <motion.circle
                                    key={i}
                                    cx={160 + (i % 3) * 25}
                                    cy={90 + Math.floor(i / 3) * 30}
                                    r="5"
                                    fill="#ef4444"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: [0, 1.2, 1] }}
                                    transition={{ delay: i * 0.1 }}
                                />
                            ))}
                            <text x="300" y="100" fill="#ef4444" fontSize="11" fontWeight="600">
                                ⚠️ VdW Clashes
                            </text>
                        </>
                    )}

                    {/* Fit Indicator */}
                    <text
                        x="300"
                        y="200"
                        fill={selectedEnantiomer === 'R' ? '#10b981' : '#ef4444'}
                        fontSize="14"
                        fontWeight="bold"
                    >
                        {selectedEnantiomer === 'R' ? '✓ OPTIMAL FIT' : '✗ POOR FIT'}
                    </text>

                    {/* Distance Indicator */}
                    <line x1="145" y1="110" x2="215" y2="110" stroke="#64748b" strokeWidth="1" strokeDasharray="4,2" />
                    <text x="180" y="75" fill="#94a3b8" fontSize="10" textAnchor="middle">
                        {selectedEnantiomer === 'R' ? '2.8 Å' : '4.2 Å'}
                    </text>
                </svg>

                {/* Dock Button */}
                <button
                    onClick={() => setShowBindingEnergy(true)}
                    style={{
                        width: '100%',
                        padding: '0.75rem',
                        background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
                        border: 'none',
                        borderRadius: '12px',
                        color: 'white',
                        fontWeight: 600,
                        cursor: 'pointer',
                        marginTop: '1rem'
                    }}
                >
                    🧪 Calculate Binding Energy
                </button>

                {/* Binding Energy Result */}
                <AnimatePresence>
                    {showBindingEnergy && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{
                                marginTop: '1rem',
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr 1fr',
                                gap: '0.75rem'
                            }}
                        >
                            <div style={{
                                padding: '0.75rem',
                                background: 'rgba(255, 255, 255, 0.05)',
                                borderRadius: '8px',
                                textAlign: 'center'
                            }}>
                                <div style={{ color: '#94a3b8', fontSize: '0.7rem' }}>ΔG (kcal/mol)</div>
                                <div style={{
                                    color: selectedEnantiomer === 'R' ? '#10b981' : '#ef4444',
                                    fontWeight: 700,
                                    fontSize: '1.1rem'
                                }}>
                                    {data.deltaG}
                                </div>
                            </div>
                            <div style={{
                                padding: '0.75rem',
                                background: 'rgba(255, 255, 255, 0.05)',
                                borderRadius: '8px',
                                textAlign: 'center'
                            }}>
                                <div style={{ color: '#94a3b8', fontSize: '0.7rem' }}>VdW Clashes</div>
                                <div style={{
                                    color: data.clashes > 0 ? '#ef4444' : '#10b981',
                                    fontWeight: 700,
                                    fontSize: '1.1rem'
                                }}>
                                    {data.clashes}
                                </div>
                            </div>
                            <div style={{
                                padding: '0.75rem',
                                background: 'rgba(255, 255, 255, 0.05)',
                                borderRadius: '8px',
                                textAlign: 'center'
                            }}>
                                <div style={{ color: '#94a3b8', fontSize: '0.7rem' }}>FIT QUALITY</div>
                                <div style={{
                                    color: data.fit === 'optimal' ? '#10b981' : '#ef4444',
                                    fontWeight: 700,
                                    fontSize: '0.9rem',
                                    textTransform: 'uppercase'
                                }}>
                                    {data.fit}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

// ============================================================================
// TERMINOLOGY QUIZ (Interactive Flashcards + Quiz Mode)
// ============================================================================

interface TermCard {
    term: string;
    definition: string;
    example: string;
    icon: string;
}

const TERMINOLOGY: TermCard[] = [
    {
        term: 'Eutomer',
        definition: 'The enantiomer with the desired pharmacological activity (therapeutic effect).',
        example: '(R)-Thalidomide is the eutomer (sedative), while (S) is teratogenic.',
        icon: '✅'
    },
    {
        term: 'Distomer',
        definition: 'The enantiomer with reduced, no, or toxic activity.',
        example: '(S)-Thalidomide is the distomer — causes birth defects.',
        icon: '⚠️'
    },
    {
        term: 'Eudysmic Ratio',
        definition: 'Potency ratio between eutomer and distomer (IC₅₀ Distomer / IC₅₀ Eutomer).',
        example: 'Thalidomide: 50/0.5 = 100:1 — high enantioselectivity.',
        icon: '📊'
    },
    {
        term: 'Chiral Switch',
        definition: 'Pharmaceutical strategy to remarket a racemic drug as its pure eutomer for patent extension.',
        example: 'Citalopram → Escitalopram (2002), Omeprazole → Esomeprazole (2001).',
        icon: '💊'
    },
    {
        term: 'In Vivo Racemization',
        definition: 'Interconversion between enantiomers inside the body due to pH, enzymes, or temperature.',
        example: 'Thalidomide racemizes with t½ ≈ 4-8h at physiological pH.',
        icon: '🔄'
    },
    {
        term: 'Enantioselective Metabolism',
        definition: 'CYP450 enzymes metabolize enantiomers at different rates.',
        example: 'CYP2C19 metabolizes (S)-omeprazole faster than (R)-omeprazole.',
        icon: '⚗️'
    }
];

interface QuizQuestion {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
    {
        question: 'What is the Eutomer?',
        options: ['The cheaper enantiomer', 'The enantiomer with desired therapeutic activity', 'The racemic mixture', 'The metabolite'],
        correctIndex: 1,
        explanation: 'Eutomer = therapeutically active enantiomer. It provides the desired pharmacological effect.'
    },
    {
        question: 'The Distomer is characterized by:',
        options: ['Higher activity than eutomer', 'No activity or toxic activity', 'Better bioavailability', 'Faster metabolism'],
        correctIndex: 1,
        explanation: 'Distomer = inactive or toxic enantiomer. It may cause side effects without therapeutic benefit.'
    },
    {
        question: 'Chiral Switch strategy allows pharma companies to:',
        options: ['Make drugs cheaper', 'Extend patents by marketing pure eutomer', 'Convert natural to synthetic', 'Remove all side effects'],
        correctIndex: 1,
        explanation: 'When a racemic drug\'s patent expires, companies can patent the pure eutomer for extended exclusivity.'
    },
    {
        question: 'Which enzyme family is responsible for enantioselective metabolism?',
        options: ['DNA Polymerase', 'Cytochrome P450 (CYP450)', 'ATP Synthase', 'Ribosome'],
        correctIndex: 1,
        explanation: 'CYP450 enzymes are chiral — they metabolize R and S enantiomers at different rates.'
    },
    {
        question: 'In vivo racemization of Thalidomide means:',
        options: ['The drug is destroyed', 'Pure R converts to R+S mixture in the body', 'The drug becomes more potent', 'It crosses the blood-brain barrier'],
        correctIndex: 1,
        explanation: 'Even with pure (R)-Thalidomide synthesis, the body\'s pH environment converts it to a racemic mixture.'
    }
];

function TerminologyQuiz() {
    const [mode, setMode] = useState<'cards' | 'quiz'>('cards');
    const [currentCard, setCurrentCard] = useState(0);
    const [flipped, setFlipped] = useState(false);
    const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
    const [showResults, setShowResults] = useState(false);

    const handleAnswer = (questionIdx: number, answerIdx: number) => {
        setQuizAnswers(prev => ({ ...prev, [questionIdx]: answerIdx }));
    };

    const calculateScore = () => {
        let correct = 0;
        QUIZ_QUESTIONS.forEach((q, idx) => {
            if (quizAnswers[idx] === q.correctIndex) correct++;
        });
        return correct;
    };

    const resetQuiz = () => {
        setQuizAnswers({});
        setShowResults(false);
    };

    return (
        <div style={{ padding: '1.5rem' }}>
            {/* Mode Toggle */}
            <div style={{
                display: 'flex',
                gap: '0.5rem',
                marginBottom: '1.5rem'
            }}>
                <button
                    onClick={() => setMode('cards')}
                    style={{
                        flex: 1,
                        padding: '0.75rem',
                        background: mode === 'cards' ? 'linear-gradient(135deg, #8b5cf6, #6366f1)' : 'rgba(255,255,255,0.05)',
                        border: 'none',
                        borderRadius: '12px',
                        color: 'white',
                        fontWeight: 600,
                        cursor: 'pointer'
                    }}
                >
                    📚 Flashcards
                </button>
                <button
                    onClick={() => setMode('quiz')}
                    style={{
                        flex: 1,
                        padding: '0.75rem',
                        background: mode === 'quiz' ? 'linear-gradient(135deg, #10b981, #059669)' : 'rgba(255,255,255,0.05)',
                        border: 'none',
                        borderRadius: '12px',
                        color: 'white',
                        fontWeight: 600,
                        cursor: 'pointer'
                    }}
                >
                    🎯 Quiz Mode
                </button>
            </div>

            {mode === 'cards' && (
                <>
                    {/* Flashcard */}
                    <motion.div
                        onClick={() => setFlipped(!flipped)}
                        style={{
                            minHeight: '250px',
                            background: flipped ? 'rgba(16, 185, 129, 0.1)' : 'rgba(139, 92, 246, 0.1)',
                            borderRadius: '16px',
                            border: `2px solid ${flipped ? '#10b981' : '#8b5cf6'}`,
                            padding: '1.5rem',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center'
                        }}
                        animate={{ rotateY: flipped ? 180 : 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <AnimatePresence mode="wait">
                            {!flipped ? (
                                <motion.div
                                    key="front"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <span style={{ fontSize: '2.5rem' }}>{TERMINOLOGY[currentCard].icon}</span>
                                    <h3 style={{ color: '#e2e8f0', fontSize: '1.8rem', marginTop: '1rem' }}>
                                        {TERMINOLOGY[currentCard].term}
                                    </h3>
                                    <p style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                                        Click to reveal definition
                                    </p>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="back"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    style={{ transform: 'rotateY(180deg)' }}
                                >
                                    <div style={{ color: '#10b981', fontWeight: 600, marginBottom: '0.5rem' }}>
                                        Definition:
                                    </div>
                                    <p style={{ color: '#e2e8f0', fontSize: '1rem', lineHeight: 1.6 }}>
                                        {TERMINOLOGY[currentCard].definition}
                                    </p>
                                    <div style={{
                                        marginTop: '1rem',
                                        padding: '0.75rem',
                                        background: 'rgba(0,0,0,0.3)',
                                        borderRadius: '8px'
                                    }}>
                                        <div style={{ color: '#60a5fa', fontSize: '0.75rem' }}>EXAMPLE</div>
                                        <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
                                            {TERMINOLOGY[currentCard].example}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Navigation */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: '1rem'
                    }}>
                        <button
                            onClick={() => { setCurrentCard(prev => Math.max(0, prev - 1)); setFlipped(false); }}
                            disabled={currentCard === 0}
                            style={{
                                padding: '0.5rem 1rem',
                                background: currentCard === 0 ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.1)',
                                border: 'none',
                                borderRadius: '8px',
                                color: 'white',
                                cursor: currentCard === 0 ? 'not-allowed' : 'pointer'
                            }}
                        >
                            ← Previous
                        </button>
                        <span style={{ color: '#64748b' }}>
                            {currentCard + 1} / {TERMINOLOGY.length}
                        </span>
                        <button
                            onClick={() => { setCurrentCard(prev => Math.min(TERMINOLOGY.length - 1, prev + 1)); setFlipped(false); }}
                            disabled={currentCard === TERMINOLOGY.length - 1}
                            style={{
                                padding: '0.5rem 1rem',
                                background: currentCard === TERMINOLOGY.length - 1 ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.1)',
                                border: 'none',
                                borderRadius: '8px',
                                color: 'white',
                                cursor: currentCard === TERMINOLOGY.length - 1 ? 'not-allowed' : 'pointer'
                            }}
                        >
                            Next →
                        </button>
                    </div>
                </>
            )}

            {mode === 'quiz' && (
                <>
                    {!showResults ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {QUIZ_QUESTIONS.map((q, qIdx) => (
                                <div key={qIdx} style={{
                                    background: 'rgba(0,0,0,0.3)',
                                    borderRadius: '12px',
                                    padding: '1rem',
                                    border: quizAnswers[qIdx] !== undefined
                                        ? quizAnswers[qIdx] === q.correctIndex
                                            ? '2px solid #10b981'
                                            : '2px solid #ef4444'
                                        : '1px solid rgba(255,255,255,0.1)'
                                }}>
                                    <div style={{ color: '#e2e8f0', fontWeight: 600, marginBottom: '0.75rem' }}>
                                        {qIdx + 1}. {q.question}
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        {q.options.map((opt, optIdx) => (
                                            <button
                                                key={optIdx}
                                                onClick={() => handleAnswer(qIdx, optIdx)}
                                                style={{
                                                    padding: '0.75rem',
                                                    background: quizAnswers[qIdx] === optIdx
                                                        ? optIdx === q.correctIndex ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'
                                                        : 'rgba(255,255,255,0.05)',
                                                    border: quizAnswers[qIdx] === optIdx
                                                        ? `2px solid ${optIdx === q.correctIndex ? '#10b981' : '#ef4444'}`
                                                        : '1px solid rgba(255,255,255,0.1)',
                                                    borderRadius: '8px',
                                                    color: '#e2e8f0',
                                                    textAlign: 'left',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                {['A', 'B', 'C', 'D'][optIdx]}. {opt}
                                            </button>
                                        ))}
                                    </div>
                                    {quizAnswers[qIdx] !== undefined && (
                                        <div style={{
                                            marginTop: '0.75rem',
                                            padding: '0.75rem',
                                            background: 'rgba(59, 130, 246, 0.1)',
                                            borderRadius: '8px',
                                            color: '#60a5fa',
                                            fontSize: '0.85rem'
                                        }}>
                                            💡 {q.explanation}
                                        </div>
                                    )}
                                </div>
                            ))}

                            <button
                                onClick={() => setShowResults(true)}
                                disabled={Object.keys(quizAnswers).length < QUIZ_QUESTIONS.length}
                                style={{
                                    padding: '1rem',
                                    background: Object.keys(quizAnswers).length < QUIZ_QUESTIONS.length
                                        ? 'rgba(255,255,255,0.1)'
                                        : 'linear-gradient(135deg, #8b5cf6, #6366f1)',
                                    border: 'none',
                                    borderRadius: '12px',
                                    color: 'white',
                                    fontWeight: 600,
                                    cursor: Object.keys(quizAnswers).length < QUIZ_QUESTIONS.length ? 'not-allowed' : 'pointer'
                                }}
                            >
                                Submit Answers
                            </button>
                        </div>
                    ) : (
                        <div style={{
                            textAlign: 'center',
                            padding: '2rem',
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '16px'
                        }}>
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                                {calculateScore() === QUIZ_QUESTIONS.length ? '🎉' : calculateScore() >= 3 ? '👍' : '📚'}
                            </div>
                            <h3 style={{ color: '#e2e8f0', marginBottom: '0.5rem' }}>
                                Score: {calculateScore()} / {QUIZ_QUESTIONS.length}
                            </h3>
                            <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>
                                {calculateScore() === QUIZ_QUESTIONS.length
                                    ? 'Perfect! You\'ve mastered MDDD terminology!'
                                    : calculateScore() >= 3
                                        ? 'Good job! Review the flashcards for terms you missed.'
                                        : 'Keep studying! Review the flashcards and try again.'}
                            </p>
                            <button
                                onClick={resetQuiz}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
                                    border: 'none',
                                    borderRadius: '12px',
                                    color: 'white',
                                    fontWeight: 600,
                                    cursor: 'pointer'
                                }}
                            >
                                Try Again
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

// ============================================================================
// CYP450 & CRYO-EM EDUCATION
// ============================================================================

function CYP450CryoEMEducation() {
    const [activeSection, setActiveSection] = useState<'cyp450' | 'cryoem'>('cyp450');

    return (
        <div style={{ padding: '1.5rem' }}>
            {/* Section Toggle */}
            <div style={{
                display: 'flex',
                gap: '0.5rem',
                marginBottom: '1.5rem'
            }}>
                <button
                    onClick={() => setActiveSection('cyp450')}
                    style={{
                        flex: 1,
                        padding: '0.75rem',
                        background: activeSection === 'cyp450' ? 'linear-gradient(135deg, #f59e0b, #d97706)' : 'rgba(255,255,255,0.05)',
                        border: 'none',
                        borderRadius: '12px',
                        color: 'white',
                        fontWeight: 600,
                        cursor: 'pointer'
                    }}
                >
                    ⚗️ Cytochrome P450
                </button>
                <button
                    onClick={() => setActiveSection('cryoem')}
                    style={{
                        flex: 1,
                        padding: '0.75rem',
                        background: activeSection === 'cryoem' ? 'linear-gradient(135deg, #06b6d4, #0891b2)' : 'rgba(255,255,255,0.05)',
                        border: 'none',
                        borderRadius: '12px',
                        color: 'white',
                        fontWeight: 600,
                        cursor: 'pointer'
                    }}
                >
                    🔬 Cryo-EM Explained
                </button>
            </div>

            <AnimatePresence mode="wait">
                {activeSection === 'cyp450' && (
                    <motion.div
                        key="cyp450"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        {/* CYP450 Content */}
                        <div style={{
                            background: 'rgba(245, 158, 11, 0.1)',
                            borderRadius: '16px',
                            padding: '1.5rem',
                            border: '1px solid rgba(245, 158, 11, 0.3)'
                        }}>
                            <h4 style={{ color: '#fbbf24', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                ⚗️ Cytochrome P450: The Body&apos;s Master Chemist
                            </h4>

                            <div style={{ color: '#e2e8f0', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                                <p><strong>What is CYP450?</strong></p>
                                <p style={{ color: '#94a3b8' }}>
                                    Cytochrome P450 is a superfamily of <strong>heme-containing enzymes</strong> found primarily in the liver.
                                    They are responsible for <strong>metabolizing ~75% of all drugs</strong> we take.
                                </p>
                            </div>

                            {/* Key CYP Isoforms */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                                gap: '0.75rem',
                                marginBottom: '1.5rem'
                            }}>
                                {[
                                    { name: 'CYP3A4', percent: '50%', drugs: 'Statins, Macrolides' },
                                    { name: 'CYP2D6', percent: '25%', drugs: 'Codeine, SSRIs' },
                                    { name: 'CYP2C19', percent: '15%', drugs: 'PPIs, Clopidogrel' },
                                    { name: 'CYP2C9', percent: '10%', drugs: 'Warfarin, NSAIDs' }
                                ].map(cyp => (
                                    <div key={cyp.name} style={{
                                        padding: '0.75rem',
                                        background: 'rgba(0,0,0,0.3)',
                                        borderRadius: '8px',
                                        textAlign: 'center'
                                    }}>
                                        <div style={{ color: '#fbbf24', fontWeight: 700 }}>{cyp.name}</div>
                                        <div style={{ color: '#e2e8f0', fontSize: '1.2rem', fontWeight: 600 }}>{cyp.percent}</div>
                                        <div style={{ color: '#64748b', fontSize: '0.7rem' }}>{cyp.drugs}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Why it matters for chirality */}
                            <div style={{
                                padding: '1rem',
                                background: 'rgba(139, 92, 246, 0.1)',
                                borderRadius: '12px',
                                border: '1px solid rgba(139, 92, 246, 0.3)'
                            }}>
                                <h5 style={{ color: '#a78bfa', margin: '0 0 0.5rem 0' }}>
                                    🎯 Why CYP450 Matters for Chiral Drugs
                                </h5>
                                <ul style={{ color: '#94a3b8', margin: 0, paddingLeft: '1.25rem', lineHeight: 1.8 }}>
                                    <li><strong>Enantioselective binding:</strong> CYP450 active sites are chiral — they bind R and S enantiomers differently</li>
                                    <li><strong>Different metabolic rates:</strong> (S)-omeprazole is metabolized faster than (R)-omeprazole, affecting half-life</li>
                                    <li><strong>Drug-drug interactions:</strong> CYP inhibitors/inducers affect enantiomers differently</li>
                                    <li><strong>Pharmacogenomics:</strong> Genetic polymorphisms (e.g., CYP2D6 poor metabolizers) affect drug response</li>
                                </ul>
                            </div>

                            {/* Interactive Visualization */}
                            <div style={{ marginTop: '1.5rem' }}>
                                <h5 style={{ color: '#e2e8f0', marginBottom: '0.75rem' }}>CYP450 Active Site (Simplified)</h5>
                                <svg viewBox="0 0 400 200" style={{ width: '100%', height: '180px' }}>
                                    <defs>
                                        <linearGradient id="hemeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#dc2626" />
                                            <stop offset="100%" stopColor="#991b1b" />
                                        </linearGradient>
                                    </defs>
                                    {/* Protein envelope */}
                                    <ellipse cx="200" cy="100" rx="150" ry="80" fill="rgba(139,92,246,0.2)" stroke="#8b5cf6" strokeWidth="2" />
                                    {/* Heme center */}
                                    <circle cx="200" cy="100" r="35" fill="url(#hemeGradient)" opacity="0.8" />
                                    <text x="200" y="105" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Fe³⁺</text>
                                    {/* Binding pocket */}
                                    <path d="M120 80 Q155 60 190 80 L190 120 Q155 140 120 120 Z" fill="rgba(16,185,129,0.2)" stroke="#10b981" strokeWidth="1" />
                                    <text x="155" y="100" textAnchor="middle" fill="#10b981" fontSize="8">R-site</text>
                                    {/* Other pocket */}
                                    <path d="M210 80 Q245 60 280 80 L280 120 Q245 140 210 120 Z" fill="rgba(239,68,68,0.2)" stroke="#ef4444" strokeWidth="1" />
                                    <text x="245" y="100" textAnchor="middle" fill="#ef4444" fontSize="8">S-site</text>
                                    {/* Labels */}
                                    <text x="200" y="25" textAnchor="middle" fill="#64748b" fontSize="10">CYP450 Chiral Active Site</text>
                                    <text x="200" y="185" textAnchor="middle" fill="#64748b" fontSize="9">Enantiomers bind to different subsites → different metabolic rates</text>
                                </svg>
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeSection === 'cryoem' && (
                    <motion.div
                        key="cryoem"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        {/* Cryo-EM Content */}
                        <div style={{
                            background: 'rgba(6, 182, 212, 0.1)',
                            borderRadius: '16px',
                            padding: '1.5rem',
                            border: '1px solid rgba(6, 182, 212, 0.3)'
                        }}>
                            <h4 style={{ color: '#22d3ee', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                🔬 Cryo-Electron Microscopy: Seeing Molecules in 3D
                            </h4>

                            <div style={{ color: '#e2e8f0', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                                <p><strong>What is Cryo-EM?</strong></p>
                                <p style={{ color: '#94a3b8' }}>
                                    Cryo-EM is a Nobel Prize-winning technique (2017) that flash-freezes biological samples
                                    and images them with electron beams to determine <strong>3D structures at near-atomic resolution</strong> (2-3 Å).
                                </p>
                            </div>

                            {/* How it works - Step by step */}
                            <div style={{ marginBottom: '1.5rem' }}>
                                <h5 style={{ color: '#e2e8f0', marginBottom: '0.75rem' }}>How Cryo-EM Works:</h5>
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                                    gap: '0.75rem'
                                }}>
                                    {[
                                        { step: 1, title: 'Sample Preparation', desc: 'Protein in buffer, applied to EM grid', icon: '💧' },
                                        { step: 2, title: 'Vitrification', desc: 'Flash-frozen in liquid ethane (-180°C)', icon: '❄️' },
                                        { step: 3, title: 'Imaging', desc: 'Electron beam captures 2D projections', icon: '📷' },
                                        { step: 4, title: '3D Reconstruction', desc: 'Software combines millions of images', icon: '🧊' }
                                    ].map(s => (
                                        <div key={s.step} style={{
                                            padding: '1rem',
                                            background: 'rgba(0,0,0,0.3)',
                                            borderRadius: '12px',
                                            textAlign: 'center'
                                        }}>
                                            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{s.icon}</div>
                                            <div style={{ color: '#22d3ee', fontWeight: 600, fontSize: '0.9rem' }}>
                                                Step {s.step}: {s.title}
                                            </div>
                                            <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                                                {s.desc}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Why it matters for drug discovery */}
                            <div style={{
                                padding: '1rem',
                                background: 'rgba(139, 92, 246, 0.1)',
                                borderRadius: '12px',
                                border: '1px solid rgba(139, 92, 246, 0.3)'
                            }}>
                                <h5 style={{ color: '#a78bfa', margin: '0 0 0.5rem 0' }}>
                                    🎯 Cryo-EM in Chiral Drug Discovery
                                </h5>
                                <ul style={{ color: '#94a3b8', margin: 0, paddingLeft: '1.25rem', lineHeight: 1.8 }}>
                                    <li><strong>Chiral pocket visualization:</strong> See exactly how R vs S enantiomers fit into the binding site</li>
                                    <li><strong>Interatomic distances:</strong> Measure drug-receptor distances in Ångströms (Å)</li>
                                    <li><strong>Binding energy prediction:</strong> Structural data enables ΔG calculations</li>
                                    <li><strong>GPCRs & membrane proteins:</strong> Cryo-EM solved structures previously impossible with X-ray</li>
                                </ul>
                            </div>

                            {/* Resolution comparison */}
                            <div style={{
                                marginTop: '1.5rem',
                                padding: '1rem',
                                background: 'rgba(0,0,0,0.3)',
                                borderRadius: '12px'
                            }}>
                                <h5 style={{ color: '#e2e8f0', marginBottom: '0.75rem' }}>Resolution Comparison</h5>
                                <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
                                    <div>
                                        <div style={{ color: '#ef4444', fontSize: '1.5rem', fontWeight: 700 }}>10-20 Å</div>
                                        <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>Early Cryo-EM</div>
                                    </div>
                                    <div>
                                        <div style={{ color: '#eab308', fontSize: '1.5rem', fontWeight: 700 }}>3-5 Å</div>
                                        <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>Standard Cryo-EM</div>
                                    </div>
                                    <div>
                                        <div style={{ color: '#10b981', fontSize: '1.5rem', fontWeight: 700 }}>&lt;2 Å</div>
                                        <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>Atomic Resolution</div>
                                    </div>
                                </div>
                                <p style={{ color: '#64748b', fontSize: '0.8rem', textAlign: 'center', marginTop: '0.75rem' }}>
                                    At 2Å resolution, individual atoms and hydrogen bonds become visible
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function ChiralDrugDiscoveryLab() {
    const [activeTab, setActiveTab] = useState<'mirror' | 'switch' | 'calculator' | 'cryoem' | 'terminology' | 'education'>('mirror');

    const tabs = [
        { id: 'mirror', label: 'Mirror Dimension', icon: '🪞' },
        { id: 'switch', label: 'Chiral Switch', icon: '💊' },
        { id: 'calculator', label: 'Eudysmic Calculator', icon: '📊' },
        { id: 'cryoem', label: 'Cryo-EM Docking', icon: '🔬' },
        { id: 'terminology', label: 'Terminology Quiz', icon: '📚' },
        { id: 'education', label: 'CYP450 & Cryo-EM', icon: '🧬' }
    ];

    return (
        <div style={{
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.98) 100%)',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            overflow: 'hidden'
        }}>
            {/* Header */}
            <div style={{
                padding: '1.5rem 2rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(139, 92, 246, 0.15) 100%)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '1.75rem' }}>🧪</span>
                    <div>
                        <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'white', margin: 0 }}>
                            Chiral Drug Discovery Lab
                        </h3>
                        <p style={{ color: 'var(--neutral-400)', margin: '0.25rem 0 0', fontSize: '0.9rem' }}>
                            PhD-level simulations • Eutomer/Distomer • Racemization • Cryo-EM
                        </p>
                    </div>
                </div>
            </div>

            {/* Tab Navigation */}
            <div style={{
                display: 'flex',
                gap: '0.5rem',
                padding: '1rem 2rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                overflowX: 'auto'
            }}>
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as typeof activeTab)}
                        style={{
                            padding: '0.75rem 1.25rem',
                            background: activeTab === tab.id
                                ? 'linear-gradient(135deg, #8b5cf6, #6366f1)'
                                : 'rgba(255, 255, 255, 0.05)',
                            border: activeTab === tab.id ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '12px',
                            color: activeTab === tab.id ? 'white' : 'var(--neutral-400)',
                            fontSize: '0.9rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        <span>{tab.icon}</span>
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content */}
            <AnimatePresence mode="wait">
                {activeTab === 'mirror' && (
                    <motion.div
                        key="mirror"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <MirrorDimensionSim />
                    </motion.div>
                )}

                {activeTab === 'switch' && (
                    <motion.div
                        key="switch"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <ChiralSwitchExplorer />
                    </motion.div>
                )}

                {activeTab === 'calculator' && (
                    <motion.div
                        key="calculator"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <EudysmicCalculator />
                    </motion.div>
                )}


                {activeTab === 'cryoem' && (
                    <motion.div
                        key="cryoem"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <CryoEMDocking />
                    </motion.div>
                )}

                {activeTab === 'terminology' && (
                    <motion.div
                        key="terminology"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <TerminologyQuiz />
                    </motion.div>
                )}

                {activeTab === 'education' && (
                    <motion.div
                        key="education"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <CYP450CryoEMEducation />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
