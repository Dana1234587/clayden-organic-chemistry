'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface Drug {
    name: string;
    brand: string;
    pubchemCid: number;
    hybridization: 'sp3' | 'sp2' | 'sp';
    keyFeature: string;
    clinicalUse: string;
    color: string;
}

// ============================================================================
// DATA
// ============================================================================

const FEATURED_DRUGS: Drug[] = [
    {
        name: 'Ritonavir',
        brand: 'Norvir®',
        pubchemCid: 392622,
        hybridization: 'sp2',
        keyFeature: 'Multiple amide bonds create rigid backbone for HIV protease inhibition',
        clinicalUse: 'HIV/AIDS treatment, COVID-19 (with Nirmatrelvir as Paxlovid)',
        color: '#ef4444'
    },
    {
        name: 'Aspirin',
        brand: 'Acetylsalicylic Acid',
        pubchemCid: 2244,
        hybridization: 'sp2',
        keyFeature: 'Planar aromatic ring enables π-π stacking with COX active site',
        clinicalUse: 'Pain relief, anti-inflammatory, cardioprotection',
        color: '#8b5cf6'
    },
    {
        name: 'Morphine',
        brand: 'MS Contin®',
        pubchemCid: 5288826,
        hybridization: 'sp3',
        keyFeature: 'Tetrahedral sp³ carbons create 3D structure that fits opioid receptor',
        clinicalUse: 'Severe pain management',
        color: '#3b82f6'
    }
];

// PubChem 2D Image URL Generator
const getPubChem2DImage = (cid: number, size: number = 300) =>
    `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/PNG?image_size=${size}x${size}`;

// ============================================================================
// AMIDE BOND EXPLANATION
// ============================================================================

function AmideBondSection() {
    const [showResonance, setShowResonance] = useState(false);

    return (
        <div style={{ padding: '1.5rem' }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1.5rem'
            }}>
                <span style={{ fontSize: '1.5rem' }}>🔗</span>
                <div>
                    <h4 style={{ color: '#e2e8f0', margin: 0 }}>The Amide Bond: Key to Drug Rigidity</h4>
                    <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.85rem' }}>
                        Why nitrogen in amides behaves differently than expected
                    </p>
                </div>
            </div>

            {/* Main Content Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1.5fr',
                gap: '1.5rem'
            }}>
                {/* Left: The Puzzle + Button */}
                <div style={{
                    background: 'rgba(0, 0, 0, 0.4)',
                    borderRadius: '16px',
                    padding: '1.25rem',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                    <div style={{
                        padding: '1rem',
                        background: 'rgba(239, 68, 68, 0.1)',
                        borderRadius: '12px',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        marginBottom: '1rem'
                    }}>
                        <div style={{ color: '#ef4444', fontWeight: 700, marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                            🧩 The Puzzle
                        </div>
                        <div style={{ color: '#e2e8f0', fontSize: '0.85rem', lineHeight: 1.5 }}>
                            Nitrogen in an amide has <strong>3 bonds + 1 lone pair</strong>.
                            This should make it <strong style={{ color: '#3b82f6' }}>sp³</strong> (tetrahedral),
                            but it actually behaves as <strong style={{ color: '#8b5cf6' }}>sp²</strong> (planar)!
                        </div>
                    </div>

                    <div style={{
                        padding: '1rem',
                        background: 'rgba(34, 197, 94, 0.1)',
                        borderRadius: '12px',
                        border: '1px solid rgba(34, 197, 94, 0.3)'
                    }}>
                        <div style={{ color: '#22c55e', fontWeight: 700, marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                            💡 The Answer: Resonance
                        </div>
                        <div style={{ color: '#e2e8f0', fontSize: '0.85rem', lineHeight: 1.5 }}>
                            The nitrogen lone pair <strong>delocalizes</strong> into the C=O π system,
                            giving C-N bond <strong>partial double bond character</strong> → <strong style={{ color: '#8b5cf6' }}>sp² planar</strong>!
                        </div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowResonance(!showResonance)}
                        style={{
                            width: '100%',
                            marginTop: '1rem',
                            padding: '0.75rem',
                            background: showResonance
                                ? 'linear-gradient(135deg, #8b5cf6, #6366f1)'
                                : 'rgba(255, 255, 255, 0.1)',
                            border: 'none',
                            borderRadius: '12px',
                            color: 'white',
                            fontWeight: 600,
                            cursor: 'pointer'
                        }}
                    >
                        {showResonance ? '✓ Resonance Shown' : '🔄 Show Resonance'}
                    </motion.button>
                </div>

                {/* Right: Resonance Structures */}
                <div style={{
                    background: 'white',
                    borderRadius: '16px',
                    padding: '1rem',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    {/* Title */}
                    <div style={{
                        textAlign: 'center',
                        color: '#1e293b',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        marginBottom: '0.5rem'
                    }}>
                        Amide Resonance Mechanism
                    </div>

                    {/* Structures Container */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        flex: 1
                    }}>
                        {/* Structure I - Major Contributor */}
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '0.65rem', color: '#64748b', marginBottom: '0.2rem' }}>
                                Structure I (Major)
                            </div>
                            <svg viewBox="0 0 180 150" style={{ width: '155px', height: '130px' }}>
                                {/* R group */}
                                <text x="8" y="75" fill="#475569" fontSize="11" fontWeight="600">R</text>
                                <line x1="18" y1="70" x2="35" y2="70" stroke="#1e293b" strokeWidth="2" />

                                {/* Carbonyl Carbon */}
                                <circle cx="50" cy="70" r="13" fill="#475569" />
                                <text x="50" y="75" fill="white" fontSize="10" fontWeight="700" textAnchor="middle">C</text>

                                {/* C=O Double bond (up) - 2 lines for double bond */}
                                <line x1="47" y1="57" x2="47" y2="30" stroke="#1e293b" strokeWidth="2" />
                                <line x1="53" y1="57" x2="53" y2="30" stroke="#1e293b" strokeWidth="2" />

                                {/* Oxygen with 2 lone pairs */}
                                <circle cx="50" cy="18" r="12" fill="#ef4444" />
                                <text x="50" y="23" fill="white" fontSize="10" fontWeight="700" textAnchor="middle">O</text>
                                {/* 2 Lone pairs on O (4 dots) */}
                                <circle cx="35" cy="15" r="2" fill="#ef4444" />
                                <circle cx="35" cy="21" r="2" fill="#ef4444" />
                                <circle cx="65" cy="15" r="2" fill="#ef4444" />
                                <circle cx="65" cy="21" r="2" fill="#ef4444" />

                                {/* C-N Single bond */}
                                <line x1="63" y1="70" x2="90" y2="70" stroke="#1e293b" strokeWidth="2" />

                                {/* Nitrogen with 1 lone pair */}
                                <circle cx="105" cy="70" r="13" fill="#3b82f6" />
                                <text x="105" y="75" fill="white" fontSize="10" fontWeight="700" textAnchor="middle">N</text>
                                {/* 1 Lone pair on N (2 dots - THIS MOVES!) */}
                                <circle cx="98" cy="54" r="2.5" fill="#22c55e" />
                                <circle cx="104" cy="54" r="2.5" fill="#22c55e" />
                                {/* Highlight the lone pair */}
                                <ellipse cx="101" cy="54" rx="10" ry="6" fill="none" stroke="#22c55e" strokeWidth="1" strokeDasharray="2" />

                                {/* N-H */}
                                <line x1="116" y1="62" x2="132" y2="48" stroke="#1e293b" strokeWidth="1.5" />
                                <circle cx="140" cy="42" r="8" fill="#94a3b8" />
                                <text x="140" y="46" fill="white" fontSize="8" fontWeight="700" textAnchor="middle">H</text>

                                {/* N-R' */}
                                <line x1="116" y1="78" x2="132" y2="92" stroke="#1e293b" strokeWidth="1.5" />
                                <text x="142" y="98" fill="#475569" fontSize="10" fontWeight="600">R&apos;</text>

                                {/* Curved arrows showing electron movement */}
                                {showResonance && (
                                    <>
                                        {/* Arrow 1: N lone pair → forms C=N */}
                                        <motion.path
                                            d="M 100 55 Q 82 45 68 62"
                                            stroke="#22c55e"
                                            strokeWidth="2"
                                            fill="none"
                                            markerEnd="url(#greenArrow)"
                                            initial={{ pathLength: 0, opacity: 0 }}
                                            animate={{ pathLength: 1, opacity: 1 }}
                                            transition={{ duration: 0.5, delay: 0.3 }}
                                        />
                                        {/* Arrow 2: C=O π breaks → lone pair on O */}
                                        <motion.path
                                            d="M 55 35 Q 70 25 68 12"
                                            stroke="#ef4444"
                                            strokeWidth="2"
                                            fill="none"
                                            markerEnd="url(#redArrow)"
                                            initial={{ pathLength: 0, opacity: 0 }}
                                            animate={{ pathLength: 1, opacity: 1 }}
                                            transition={{ duration: 0.5, delay: 0 }}
                                        />
                                    </>
                                )}

                                {/* Labels */}
                                <text x="50" y="142" fill="#1e293b" fontSize="7" textAnchor="middle" fontWeight="600">
                                    C=O (double), C-N (single)
                                </text>

                                <defs>
                                    <marker id="greenArrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                                        <path d="M0,0 L6,3 L0,6 Z" fill="#22c55e" />
                                    </marker>
                                    <marker id="redArrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                                        <path d="M0,0 L6,3 L0,6 Z" fill="#ef4444" />
                                    </marker>
                                </defs>
                            </svg>
                        </div>

                        {/* Resonance Arrow */}
                        <AnimatePresence>
                            {showResonance && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        padding: '0 0.15rem'
                                    }}
                                >
                                    <div style={{ fontSize: '1.2rem' }}>⟷</div>
                                    <div style={{ fontSize: '0.55rem', color: '#64748b' }}>resonance</div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Structure II - Minor Contributor (Charge Separated) */}
                        <AnimatePresence>
                            {showResonance && (
                                <motion.div
                                    initial={{ opacity: 0, x: 15 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 15 }}
                                    transition={{ duration: 0.4 }}
                                    style={{ textAlign: 'center' }}
                                >
                                    <div style={{ fontSize: '0.65rem', color: '#64748b', marginBottom: '0.2rem' }}>
                                        Structure II (Minor)
                                    </div>
                                    <svg viewBox="0 0 180 150" style={{ width: '155px', height: '130px' }}>
                                        {/* R group */}
                                        <text x="8" y="75" fill="#475569" fontSize="11" fontWeight="600">R</text>
                                        <line x1="18" y1="70" x2="35" y2="70" stroke="#1e293b" strokeWidth="2" />

                                        {/* Carbonyl Carbon */}
                                        <circle cx="50" cy="70" r="13" fill="#475569" />
                                        <text x="50" y="75" fill="white" fontSize="10" fontWeight="700" textAnchor="middle">C</text>

                                        {/* C-O Single bond (π broke!) */}
                                        <line x1="50" y1="57" x2="50" y2="30" stroke="#1e293b" strokeWidth="2" />

                                        {/* Oxygen with 3 lone pairs (gained one!) + NEGATIVE */}
                                        <circle cx="50" cy="18" r="12" fill="#ef4444" />
                                        <text x="50" y="23" fill="white" fontSize="10" fontWeight="700" textAnchor="middle">O</text>
                                        {/* 3 Lone pairs on O⁻ (6 dots) */}
                                        <circle cx="35" cy="15" r="2" fill="#ef4444" />
                                        <circle cx="35" cy="21" r="2" fill="#ef4444" />
                                        <circle cx="65" cy="15" r="2" fill="#ef4444" />
                                        <circle cx="65" cy="21" r="2" fill="#ef4444" />
                                        {/* New lone pair from π bond */}
                                        <circle cx="50" cy="3" r="2" fill="#22c55e" />
                                        <circle cx="50" cy="-3" r="2" fill="#22c55e" />
                                        {/* Negative charge */}
                                        <circle cx="68" cy="6" r="7" fill="#fef2f2" stroke="#ef4444" strokeWidth="1.5" />
                                        <text x="68" y="10" fill="#ef4444" fontSize="11" fontWeight="700" textAnchor="middle">−</text>

                                        {/* C=N Double bond (NEW! from N lone pair) */}
                                        <line x1="63" y1="67" x2="90" y2="67" stroke="#1e293b" strokeWidth="2" />
                                        <line x1="63" y1="73" x2="90" y2="73" stroke="#22c55e" strokeWidth="2" />

                                        {/* Nitrogen - NO lone pair now! + POSITIVE */}
                                        <circle cx="105" cy="70" r="13" fill="#8b5cf6" />
                                        <text x="105" y="75" fill="white" fontSize="10" fontWeight="700" textAnchor="middle">N</text>
                                        {/* Positive charge */}
                                        <circle cx="120" cy="54" r="7" fill="#f5f3ff" stroke="#8b5cf6" strokeWidth="1.5" />
                                        <text x="120" y="58" fill="#8b5cf6" fontSize="11" fontWeight="700" textAnchor="middle">+</text>

                                        {/* N-H */}
                                        <line x1="116" y1="62" x2="132" y2="48" stroke="#1e293b" strokeWidth="1.5" />
                                        <circle cx="140" cy="42" r="8" fill="#94a3b8" />
                                        <text x="140" y="46" fill="white" fontSize="8" fontWeight="700" textAnchor="middle">H</text>

                                        {/* N-R' */}
                                        <line x1="116" y1="78" x2="132" y2="92" stroke="#1e293b" strokeWidth="1.5" />
                                        <text x="142" y="98" fill="#475569" fontSize="10" fontWeight="600">R&apos;</text>

                                        {/* Labels */}
                                        <text x="50" y="142" fill="#1e293b" fontSize="7" textAnchor="middle" fontWeight="600">
                                            C-O (single), C=N (double)
                                        </text>
                                    </svg>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Mechanism Explanation Box */}
                    <AnimatePresence>
                        {showResonance && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                style={{
                                    marginTop: '0.5rem',
                                    padding: '0.5rem',
                                    background: '#fefce8',
                                    borderRadius: '8px',
                                    border: '1px solid #eab308'
                                }}
                            >
                                <div style={{ color: '#854d0e', fontSize: '0.65rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                                    📚 Mechanism (Professor&apos;s Explanation):
                                </div>
                                <div style={{ color: '#713f12', fontSize: '0.6rem', lineHeight: 1.4 }}>
                                    <div><span style={{ color: '#ef4444' }}>1.</span> The C=O <strong>π bond breaks</strong> → O gains an extra lone pair (now 3 pairs) and becomes <strong style={{ color: '#ef4444' }}>O⁻</strong></div>
                                    <div><span style={{ color: '#22c55e' }}>2.</span> Simultaneously, N&apos;s <strong style={{ color: '#22c55e' }}>lone pair forms a π bond</strong> with C → C=N double bond</div>
                                    <div><span style={{ color: '#8b5cf6' }}>3.</span> N loses its lone pair → becomes <strong style={{ color: '#8b5cf6' }}>N⁺</strong> (but has 4 bonds = octet satisfied)</div>
                                    <div style={{ marginTop: '0.2rem', fontWeight: 600 }}>→ This partial double bond character forces N to be <strong>sp² planar!</strong></div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Key insight */}
                    <div style={{
                        marginTop: '0.4rem',
                        padding: '0.4rem',
                        background: '#f0fdf4',
                        borderRadius: '8px',
                        border: '1px solid #22c55e',
                        textAlign: 'center'
                    }}>
                        <span style={{ color: '#15803d', fontSize: '0.7rem', fontWeight: 600 }}>
                            {showResonance
                                ? '✓ C─N has ~40% double bond character → rotation barrier ~18 kcal/mol'
                                : 'Click "Show Resonance" to see the electron mechanism'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Drug Impact */}
            <div style={{
                marginTop: '1.5rem',
                padding: '1.5rem',
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1))',
                borderRadius: '16px',
                border: '1px solid rgba(139, 92, 246, 0.3)'
            }}>
                <div style={{ color: '#a78bfa', fontWeight: 700, marginBottom: '1rem', fontSize: '1.1rem' }}>
                    🎯 Why This Matters for Drug Design
                </div>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '1rem'
                }}>
                    <div style={{
                        padding: '1rem',
                        background: 'rgba(0, 0, 0, 0.3)',
                        borderRadius: '12px',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🔒</div>
                        <div style={{ color: '#e2e8f0', fontWeight: 600 }}>Rigidity</div>
                        <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>
                            Planar amides create rigid drug backbones
                        </div>
                    </div>
                    <div style={{
                        padding: '1rem',
                        background: 'rgba(0, 0, 0, 0.3)',
                        borderRadius: '12px',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🎯</div>
                        <div style={{ color: '#e2e8f0', fontWeight: 600 }}>Precision Fit</div>
                        <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>
                            Exact 120° angles match enzyme pockets
                        </div>
                    </div>
                    <div style={{
                        padding: '1rem',
                        background: 'rgba(0, 0, 0, 0.3)',
                        borderRadius: '12px',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🧬</div>
                        <div style={{ color: '#e2e8f0', fontWeight: 600 }}>H-Bonding</div>
                        <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>
                            NH donates, C=O accepts H-bonds
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
}

// ============================================================================
// RIGIDITY TEST SIMULATION
// ============================================================================

function RigidityTestSimulation() {
    const [rotationAngle, setRotationAngle] = useState(0);
    const [bondType, setBondType] = useState<'single' | 'amide'>('single');
    const [isRotating, setIsRotating] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isRotating && bondType === 'single') {
            interval = setInterval(() => {
                setRotationAngle(prev => (prev + 5) % 360);
            }, 50);
        }
        return () => clearInterval(interval);
    }, [isRotating, bondType]);

    const handleRotate = () => {
        if (bondType === 'amide') {
            // Show locked message - amide doesn't rotate
            setRotationAngle(0);
        } else {
            setIsRotating(!isRotating);
        }
    };

    return (
        <div style={{ padding: '1.5rem' }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1.5rem'
            }}>
                <span style={{ fontSize: '1.5rem' }}>🔄</span>
                <div>
                    <h4 style={{ color: '#e2e8f0', margin: 0 }}>Rigidity Test: Free Rotation vs Locked Amide</h4>
                    <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.85rem' }}>
                        Try to rotate bonds and see the difference!
                    </p>
                </div>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '2rem'
            }}>
                {/* Bond Type Selection */}
                <div style={{
                    background: 'rgba(0, 0, 0, 0.4)',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                    <div style={{ marginBottom: '1rem' }}>
                        <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                            Select Bond Type:
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => { setBondType('single'); setIsRotating(false); setRotationAngle(0); }}
                                style={{
                                    flex: 1,
                                    padding: '1rem',
                                    background: bondType === 'single'
                                        ? 'linear-gradient(135deg, #22c55e, #16a34a)'
                                        : 'rgba(255, 255, 255, 0.05)',
                                    border: `2px solid ${bondType === 'single' ? '#22c55e' : 'rgba(255, 255, 255, 0.1)'}`,
                                    borderRadius: '12px',
                                    color: 'white',
                                    fontWeight: 600,
                                    cursor: 'pointer'
                                }}
                            >
                                C-C Single Bond
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => { setBondType('amide'); setIsRotating(false); setRotationAngle(0); }}
                                style={{
                                    flex: 1,
                                    padding: '1rem',
                                    background: bondType === 'amide'
                                        ? 'linear-gradient(135deg, #ef4444, #dc2626)'
                                        : 'rgba(255, 255, 255, 0.05)',
                                    border: `2px solid ${bondType === 'amide' ? '#ef4444' : 'rgba(255, 255, 255, 0.1)'}`,
                                    borderRadius: '12px',
                                    color: 'white',
                                    fontWeight: 600,
                                    cursor: 'pointer'
                                }}
                            >
                                C-N Amide Bond
                            </motion.button>
                        </div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleRotate}
                        style={{
                            width: '100%',
                            padding: '1rem',
                            background: bondType === 'single'
                                ? 'linear-gradient(135deg, #3b82f6, #2563eb)'
                                : 'linear-gradient(135deg, #64748b, #475569)',
                            border: 'none',
                            borderRadius: '12px',
                            color: 'white',
                            fontWeight: 700,
                            cursor: 'pointer',
                            fontSize: '1rem'
                        }}
                    >
                        {bondType === 'single'
                            ? (isRotating ? '⏸️ Stop Rotation' : '🔄 Try to Rotate')
                            : '🔒 Try to Rotate (Locked!)'}
                    </motion.button>

                    {/* Feedback */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={bondType}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            style={{
                                marginTop: '1rem',
                                padding: '1rem',
                                background: bondType === 'single'
                                    ? 'rgba(34, 197, 94, 0.1)'
                                    : 'rgba(239, 68, 68, 0.1)',
                                borderRadius: '12px',
                                border: `1px solid ${bondType === 'single' ? '#22c55e' : '#ef4444'}`
                            }}
                        >
                            <div style={{
                                color: bondType === 'single' ? '#22c55e' : '#ef4444',
                                fontWeight: 700,
                                marginBottom: '0.5rem'
                            }}>
                                {bondType === 'single' ? '✅ Free Rotation!' : '🔒 Rotation Blocked!'}
                            </div>
                            <div style={{ color: '#e2e8f0', fontSize: '0.9rem' }}>
                                {bondType === 'single'
                                    ? 'Single bonds allow free rotation (~15 kJ/mol barrier). The molecule is flexible!'
                                    : 'Amide C-N bond has partial double bond character due to resonance. Rotation requires ~80 kJ/mol—essentially locked!'}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Visual */}
                <div style={{
                    background: 'rgba(0, 0, 0, 0.4)',
                    borderRadius: '16px',
                    padding: '1rem',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <svg viewBox="0 0 280 200" style={{ width: '100%', maxWidth: '280px' }}>
                        {/* Title */}
                        <text x="140" y="20" fill="#e2e8f0" fontSize="13" textAnchor="middle" fontWeight="700">
                            {bondType === 'single' ? 'Ethane-like (C-C)' : 'Amide Bond (C-N)'}
                        </text>

                        {/* Fixed Carbon with 3 H atoms */}
                        <g transform="translate(80, 100)">
                            {/* Central C */}
                            <circle cx="0" cy="0" r="18" fill={bondType === 'single' ? '#22c55e' : '#8b5cf6'} />
                            <text x="0" y="5" fill="white" fontSize="12" textAnchor="middle" fontWeight="700">
                                {bondType === 'single' ? 'C' : 'C'}
                            </text>

                            {/* H atoms on fixed carbon */}
                            {bondType === 'single' && (
                                <>
                                    <line x1="-15" y1="-10" x2="-35" y2="-30" stroke="#64748b" strokeWidth="2" />
                                    <circle cx="-42" cy="-35" r="10" fill="#94a3b8" />
                                    <text x="-42" y="-31" fill="white" fontSize="9" textAnchor="middle" fontWeight="700">H</text>

                                    <line x1="-15" y1="10" x2="-35" y2="30" stroke="#64748b" strokeWidth="2" />
                                    <circle cx="-42" cy="35" r="10" fill="#94a3b8" />
                                    <text x="-42" y="39" fill="white" fontSize="9" textAnchor="middle" fontWeight="700">H</text>

                                    <line x1="0" y1="18" x2="0" y2="45" stroke="#64748b" strokeWidth="2" />
                                    <circle cx="0" cy="52" r="10" fill="#94a3b8" />
                                    <text x="0" y="56" fill="white" fontSize="9" textAnchor="middle" fontWeight="700">H</text>
                                </>
                            )}

                            {/* For amide: show C=O */}
                            {bondType === 'amide' && (
                                <>
                                    <line x1="-12" y1="-12" x2="-30" y2="-35" stroke="#1e293b" strokeWidth="2" />
                                    <line x1="-8" y1="-16" x2="-26" y2="-39" stroke="#1e293b" strokeWidth="2" />
                                    <circle cx="-35" cy="-45" r="12" fill="#ef4444" />
                                    <text x="-35" y="-41" fill="white" fontSize="10" textAnchor="middle" fontWeight="700">O</text>

                                    <line x1="-15" y1="10" x2="-35" y2="30" stroke="#64748b" strokeWidth="2" />
                                    <text x="-45" y="35" fill="#64748b" fontSize="12" fontWeight="600">R</text>
                                </>
                            )}
                        </g>

                        {/* Bond */}
                        <line
                            x1="98" y1="100"
                            x2="142" y2="100"
                            stroke={bondType === 'single' ? '#22c55e' : '#ef4444'}
                            strokeWidth="4"
                        />
                        {bondType === 'amide' && (
                            <line x1="98" y1="94" x2="142" y2="94" stroke="#ef4444" strokeWidth="2" strokeDasharray="4" />
                        )}

                        {/* Rotating part */}
                        <motion.g
                            animate={{ rotate: bondType === 'single' ? rotationAngle : 0 }}
                            style={{ transformOrigin: '160px 100px' }}
                        >
                            {/* Second Carbon/Nitrogen */}
                            <circle cx="160" cy="100" r="18" fill={bondType === 'single' ? '#3b82f6' : '#ef4444'} />
                            <text x="160" y="105" fill="white" fontSize="12" textAnchor="middle" fontWeight="700">
                                {bondType === 'single' ? 'C' : 'N'}
                            </text>

                            {/* Rotating H atoms (or H and R' for amide) */}
                            <line x1="175" y1="90" x2="200" y2="70" stroke="#64748b" strokeWidth="2" />
                            <circle cx="207" cy="63" r="10" fill="#94a3b8" />
                            <text x="207" y="67" fill="white" fontSize="9" textAnchor="middle" fontWeight="700">H</text>

                            {bondType === 'single' ? (
                                <>
                                    <line x1="175" y1="110" x2="200" y2="130" stroke="#64748b" strokeWidth="2" />
                                    <circle cx="207" cy="137" r="10" fill="#94a3b8" />
                                    <text x="207" y="141" fill="white" fontSize="9" textAnchor="middle" fontWeight="700">H</text>

                                    <line x1="160" y1="118" x2="160" y2="150" stroke="#64748b" strokeWidth="2" />
                                    <circle cx="160" cy="158" r="10" fill="#94a3b8" />
                                    <text x="160" y="162" fill="white" fontSize="9" textAnchor="middle" fontWeight="700">H</text>
                                </>
                            ) : (
                                <>
                                    <line x1="175" y1="110" x2="200" y2="130" stroke="#64748b" strokeWidth="2" />
                                    <text x="210" y="140" fill="#64748b" fontSize="12" fontWeight="600">R'</text>
                                </>
                            )}
                        </motion.g>

                        {/* Rotation angle */}
                        <text x="140" y="185" fill="#e2e8f0" fontSize="14" textAnchor="middle" fontWeight="700">
                            θ = {rotationAngle}°
                        </text>

                        {bondType === 'amide' && (
                            <text x="140" y="185" fill="#ef4444" fontSize="12" textAnchor="middle" fontWeight="600">
                                🔒 LOCKED by Resonance (θ = 0°)
                            </text>
                        )}
                    </svg>
                </div>
            </div>
        </div>
    );
}

// ============================================================================
// CASE STUDY: RITONAVIR
// ============================================================================

function RitonavirCaseStudy() {
    return (
        <div style={{ padding: '1.5rem' }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1.5rem'
            }}>
                <span style={{ fontSize: '1.5rem' }}>🧬</span>
                <div>
                    <h4 style={{ color: '#e2e8f0', margin: 0 }}>Case Study: Ritonavir (HIV Protease Inhibitor)</h4>
                    <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.85rem' }}>
                        How hybridization determines antiviral drug efficacy
                    </p>
                </div>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1.5fr',
                gap: '2rem'
            }}>
                {/* 2D Structure from PubChem */}
                <div style={{
                    background: 'white',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <img
                        src={getPubChem2DImage(392622, 300)}
                        alt="Ritonavir Structure"
                        style={{ maxWidth: '100%', height: 'auto' }}
                    />
                    <div style={{ color: '#1e293b', fontWeight: 700, marginTop: '0.5rem', fontSize: '1.1rem' }}>
                        Ritonavir
                    </div>
                    <div style={{ color: '#64748b', fontSize: '0.85rem' }}>
                        Norvir® • CID: 392622
                    </div>
                </div>

                {/* Drug Details */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{
                        padding: '1.25rem',
                        background: 'rgba(239, 68, 68, 0.1)',
                        borderRadius: '16px',
                        border: '1px solid rgba(239, 68, 68, 0.3)'
                    }}>
                        <div style={{ color: '#ef4444', fontWeight: 700, marginBottom: '0.75rem', fontSize: '1.1rem' }}>
                            🎯 Mechanism of Action
                        </div>
                        <div style={{ color: '#e2e8f0', fontSize: '0.95rem', lineHeight: 1.7 }}>
                            Ritonavir inhibits <strong>HIV-1 protease</strong>, an enzyme essential for viral replication.
                            The drug&apos;s <strong style={{ color: '#8b5cf6' }}>multiple amide bonds</strong> create a rigid backbone
                            that mimics the <strong>transition state</strong> of the protease&apos;s natural substrate.
                        </div>
                    </div>

                    <div style={{
                        padding: '1.25rem',
                        background: 'rgba(139, 92, 246, 0.1)',
                        borderRadius: '16px',
                        border: '1px solid rgba(139, 92, 246, 0.3)'
                    }}>
                        <div style={{ color: '#a78bfa', fontWeight: 700, marginBottom: '0.75rem', fontSize: '1.1rem' }}>
                            🔬 Hybridization Connection
                        </div>
                        <div style={{ color: '#e2e8f0', fontSize: '0.95rem', lineHeight: 1.7 }}>
                            The <strong style={{ color: '#8b5cf6' }}>sp² amide carbons</strong> force a precise
                            <strong> 120° geometry</strong> that matches the enzyme&apos;s active site pocket.
                            If the drug were flexible (sp³), it wouldn&apos;t fit properly and would lose potency.
                        </div>
                    </div>

                    <div style={{
                        padding: '1.25rem',
                        background: 'rgba(34, 197, 94, 0.1)',
                        borderRadius: '16px',
                        border: '1px solid rgba(34, 197, 94, 0.3)'
                    }}>
                        <div style={{ color: '#22c55e', fontWeight: 700, marginBottom: '0.75rem', fontSize: '1.1rem' }}>
                            💊 Clinical Impact
                        </div>
                        <div style={{ color: '#e2e8f0', fontSize: '0.95rem', lineHeight: 1.7 }}>
                            <strong>HIV/AIDS:</strong> Part of HAART combination therapy<br />
                            <strong>COVID-19:</strong> Combined with Nirmatrelvir in <strong style={{ color: '#22c55e' }}>Paxlovid®</strong><br />
                            <strong>Potency:</strong> Ki = 0.02 nM (extremely potent!)
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ============================================================================
// FEATURED DRUGS GALLERY
// ============================================================================

function FeaturedDrugsGallery() {
    const [selectedDrug, setSelectedDrug] = useState<Drug>(FEATURED_DRUGS[0]);

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
                    <h4 style={{ color: '#e2e8f0', margin: 0 }}>Featured Drugs: Hybridization in Action</h4>
                    <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.85rem' }}>
                        Real drugs demonstrating sp², sp³, and sp hybridization
                    </p>
                </div>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: '200px 1fr',
                gap: '1.5rem'
            }}>
                {/* Drug Selection */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {FEATURED_DRUGS.map(drug => (
                        <motion.button
                            key={drug.pubchemCid}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSelectedDrug(drug)}
                            style={{
                                padding: '1rem',
                                background: selectedDrug.pubchemCid === drug.pubchemCid
                                    ? `${drug.color}30`
                                    : 'rgba(255, 255, 255, 0.05)',
                                border: `2px solid ${selectedDrug.pubchemCid === drug.pubchemCid ? drug.color : 'rgba(255, 255, 255, 0.1)'}`,
                                borderRadius: '12px',
                                cursor: 'pointer',
                                textAlign: 'left'
                            }}
                        >
                            <div style={{ color: drug.color, fontWeight: 700 }}>{drug.name}</div>
                            <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{drug.brand}</div>
                            <div style={{
                                marginTop: '0.5rem',
                                padding: '0.25rem 0.5rem',
                                background: `${drug.color}20`,
                                borderRadius: '6px',
                                color: drug.color,
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                display: 'inline-block'
                            }}>
                                {drug.hybridization}
                            </div>
                        </motion.button>
                    ))}
                </div>

                {/* Selected Drug Details */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedDrug.pubchemCid}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        style={{
                            background: 'rgba(0, 0, 0, 0.4)',
                            borderRadius: '16px',
                            padding: '1.5rem',
                            border: `2px solid ${selectedDrug.color}40`
                        }}
                    >
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '1.5rem'
                        }}>
                            {/* 2D Structure */}
                            <div style={{
                                background: 'white',
                                borderRadius: '12px',
                                padding: '1rem',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}>
                                <img
                                    src={getPubChem2DImage(selectedDrug.pubchemCid, 250)}
                                    alt={`${selectedDrug.name} Structure`}
                                    style={{ maxWidth: '100%', height: 'auto' }}
                                />
                                <div style={{ color: '#1e293b', fontWeight: 600, marginTop: '0.5rem' }}>
                                    2D Structure
                                </div>
                            </div>

                            {/* Info */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div>
                                    <div style={{ color: selectedDrug.color, fontSize: '1.5rem', fontWeight: 700 }}>
                                        {selectedDrug.name}
                                    </div>
                                    <div style={{ color: '#94a3b8' }}>{selectedDrug.brand}</div>
                                </div>

                                <div style={{
                                    padding: '0.75rem',
                                    background: `${selectedDrug.color}15`,
                                    borderRadius: '8px'
                                }}>
                                    <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>KEY HYBRIDIZATION</div>
                                    <div style={{ color: selectedDrug.color, fontWeight: 700, fontSize: '1.25rem' }}>
                                        {selectedDrug.hybridization}
                                    </div>
                                </div>

                                <div style={{
                                    padding: '0.75rem',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    borderRadius: '8px'
                                }}>
                                    <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>KEY FEATURE</div>
                                    <div style={{ color: '#e2e8f0', fontSize: '0.9rem' }}>
                                        {selectedDrug.keyFeature}
                                    </div>
                                </div>

                                <div style={{
                                    padding: '0.75rem',
                                    background: 'rgba(34, 197, 94, 0.1)',
                                    borderRadius: '8px'
                                }}>
                                    <div style={{ color: '#22c55e', fontSize: '0.75rem' }}>CLINICAL USE</div>
                                    <div style={{ color: '#e2e8f0', fontSize: '0.9rem' }}>
                                        {selectedDrug.clinicalUse}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function AmideDrugDevelopmentLab() {
    const [activeTab, setActiveTab] = useState<'amide' | 'rigidity' | 'ritonavir' | 'gallery'>('amide');

    const tabs = [
        { id: 'amide', label: 'Amide Bond', icon: '🔗' },
        { id: 'rigidity', label: 'Rigidity Test', icon: '🔄' },
        { id: 'ritonavir', label: 'Case Study', icon: '🧬' },
        { id: 'gallery', label: 'Featured Drugs', icon: '💊' }
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
                background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '1.75rem' }}>💊</span>
                    <div>
                        <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'white', margin: 0 }}>
                            Drug Development: The Geometry of Life
                        </h3>
                        <p style={{ color: 'var(--neutral-400)', margin: '0.25rem 0 0', fontSize: '0.9rem' }}>
                            How hybridization determines drug rigidity and receptor binding
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
                                ? 'linear-gradient(135deg, #ef4444, #8b5cf6)'
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
                {activeTab === 'amide' && (
                    <motion.div
                        key="amide"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <AmideBondSection />
                    </motion.div>
                )}

                {activeTab === 'rigidity' && (
                    <motion.div
                        key="rigidity"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <RigidityTestSimulation />
                    </motion.div>
                )}

                {activeTab === 'ritonavir' && (
                    <motion.div
                        key="ritonavir"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <RitonavirCaseStudy />
                    </motion.div>
                )}

                {activeTab === 'gallery' && (
                    <motion.div
                        key="gallery"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <FeaturedDrugsGallery />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
