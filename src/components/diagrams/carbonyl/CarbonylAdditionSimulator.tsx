'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ReactionStep {
    id: number;
    title: string;
    description: string;
    arrowDescription: string;
    beforeSVG: React.ReactNode;
    afterSVG: React.ReactNode;
}

// ========== CYANOHYDRIN REACTION ==========
const CYANOHYDRIN_REACTION: ReactionStep[] = [
    {
        id: 1,
        title: 'Starting Materials',
        description: 'Cyanide ion (CN⁻) approaches the aldehyde/ketone. The CN⁻ has a lone pair on carbon and is nucleophilic. The carbonyl carbon (C=O) is electrophilic (δ⁺).',
        arrowDescription: 'No arrows yet - identifying the nucleophile and electrophile',
        beforeSVG: (
            <g>
                {/* CN- nucleophile */}
                <circle cx="70" cy="90" r="28" fill="#22c55e" opacity="0.2" />
                <text x="70" y="95" textAnchor="middle" fill="#86efac" fontSize="16" fontWeight="bold">CN⁻</text>
                <text x="70" y="130" textAnchor="middle" fill="#94a3b8" fontSize="11">Nucleophile</text>

                {/* Carbonyl */}
                <circle cx="200" cy="90" r="24" fill="#3b82f6" opacity="0.2" />
                <text x="200" y="85" textAnchor="middle" fill="#93c5fd" fontSize="14" fontWeight="bold">C</text>
                <text x="200" y="100" textAnchor="middle" fill="#fbbf24" fontSize="10">δ⁺</text>

                <line x1="224" y1="80" x2="260" y2="60" stroke="#94a3b8" strokeWidth="3" />
                <line x1="226" y1="86" x2="258" y2="68" stroke="#94a3b8" strokeWidth="3" />

                <circle cx="275" cy="55" r="20" fill="#ef4444" opacity="0.2" />
                <text x="275" y="60" textAnchor="middle" fill="#fca5a5" fontSize="14" fontWeight="bold">O</text>
                <text x="275" y="35" textAnchor="middle" fill="#fbbf24" fontSize="10">δ⁻</text>

                <text x="200" y="145" textAnchor="middle" fill="#94a3b8" fontSize="11">Electrophile (carbonyl)</text>
            </g>
        ),
        afterSVG: (
            <g>
                <circle cx="70" cy="90" r="28" fill="#22c55e" opacity="0.2" />
                <text x="70" y="95" textAnchor="middle" fill="#86efac" fontSize="16" fontWeight="bold">CN⁻</text>
                <circle cx="200" cy="90" r="24" fill="#3b82f6" opacity="0.2" />
                <text x="200" y="95" textAnchor="middle" fill="#93c5fd" fontSize="14" fontWeight="bold">C=O</text>
            </g>
        )
    },
    {
        id: 2,
        title: 'Nucleophilic Attack',
        description: 'The lone pair on CN⁻ attacks the electrophilic carbonyl carbon. This forms a new C-C σ bond. The electrons flow from nucleophile to electrophile.',
        arrowDescription: 'Arrow 1: From CN⁻ lone pair → Carbonyl carbon (forms new C-C bond)',
        beforeSVG: (
            <g>
                <circle cx="70" cy="90" r="28" fill="#22c55e" opacity="0.2" />
                <text x="70" y="95" textAnchor="middle" fill="#86efac" fontSize="16" fontWeight="bold">CN⁻</text>

                {/* Curly Arrow */}
                <motion.path
                    d="M 98 90 Q 130 60 168 85"
                    fill="none"
                    stroke="#fbbf24"
                    strokeWidth="3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1 }}
                />
                <motion.polygon
                    points="168,85 158,78 160,88"
                    fill="#fbbf24"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                />

                <circle cx="200" cy="90" r="24" fill="#3b82f6" opacity="0.2" />
                <text x="200" y="85" textAnchor="middle" fill="#93c5fd" fontSize="14" fontWeight="bold">C</text>
                <text x="200" y="100" textAnchor="middle" fill="#fbbf24" fontSize="10">δ⁺</text>

                <line x1="224" y1="80" x2="260" y2="60" stroke="#94a3b8" strokeWidth="3" />
                <line x1="226" y1="86" x2="258" y2="68" stroke="#94a3b8" strokeWidth="3" />

                <circle cx="275" cy="55" r="20" fill="#ef4444" opacity="0.2" />
                <text x="275" y="60" textAnchor="middle" fill="#fca5a5" fontSize="14" fontWeight="bold">O</text>
            </g>
        ),
        afterSVG: (
            <g>
                <circle cx="80" cy="90" r="25" fill="#22c55e" opacity="0.2" />
                <text x="80" y="95" textAnchor="middle" fill="#86efac" fontSize="14" fontWeight="bold">CN</text>

                <line x1="105" y1="90" x2="165" y2="90" stroke="#fbbf24" strokeWidth="3" strokeDasharray="5,5">
                    <animate attributeName="stroke-dashoffset" from="10" to="0" dur="0.5s" repeatCount="indefinite" />
                </line>
                <text x="135" y="80" textAnchor="middle" fill="#fbbf24" fontSize="10">forming</text>

                <circle cx="190" cy="90" r="24" fill="#3b82f6" opacity="0.2" />
                <text x="190" y="95" textAnchor="middle" fill="#93c5fd" fontSize="14" fontWeight="bold">C</text>

                <line x1="210" y1="75" x2="245" y2="55" stroke="#94a3b8" strokeWidth="3" />
                <line x1="212" y1="81" x2="243" y2="63" stroke="#94a3b8" strokeWidth="3" />

                <circle cx="260" cy="50" r="18" fill="#ef4444" opacity="0.2" />
                <text x="260" y="55" textAnchor="middle" fill="#fca5a5" fontSize="13" fontWeight="bold">O</text>
            </g>
        )
    },
    {
        id: 3,
        title: 'π Bond Breaks',
        description: 'As the new C-C bond forms, the π electrons of C=O move entirely to oxygen, creating an alkoxide intermediate (O⁻).',
        arrowDescription: 'Arrow 2: From C=O π bond → Oxygen (gives O⁻)',
        beforeSVG: (
            <g>
                <circle cx="70" cy="90" r="24" fill="#22c55e" opacity="0.2" />
                <text x="70" y="95" textAnchor="middle" fill="#86efac" fontSize="14" fontWeight="bold">CN</text>

                <line x1="94" y1="90" x2="150" y2="90" stroke="#22c55e" strokeWidth="3" />

                <circle cx="175" cy="90" r="22" fill="#3b82f6" opacity="0.2" />
                <text x="175" y="95" textAnchor="middle" fill="#93c5fd" fontSize="14" fontWeight="bold">C</text>

                {/* Arrow 2 - pi bond breaking */}
                <motion.path
                    d="M 195 78 Q 220 55 250 62"
                    fill="none"
                    stroke="#f97316"
                    strokeWidth="3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1 }}
                />
                <motion.polygon
                    points="250,62 240,55 242,65"
                    fill="#f97316"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                />

                <line x1="195" y1="80" x2="235" y2="55" stroke="#94a3b8" strokeWidth="3" opacity="0.4" />

                <circle cx="260" cy="50" r="20" fill="#ef4444" opacity="0.3" />
                <text x="260" y="55" textAnchor="middle" fill="#fca5a5" fontSize="14" fontWeight="bold">O⁻</text>
            </g>
        ),
        afterSVG: (
            <g>
                <circle cx="70" cy="90" r="24" fill="#22c55e" opacity="0.2" />
                <text x="70" y="95" textAnchor="middle" fill="#86efac" fontSize="14" fontWeight="bold">CN</text>
                <line x1="94" y1="90" x2="150" y2="90" stroke="#22c55e" strokeWidth="3" />
                <circle cx="175" cy="90" r="22" fill="#3b82f6" opacity="0.2" />
                <text x="175" y="95" textAnchor="middle" fill="#93c5fd" fontSize="14" fontWeight="bold">C</text>
                <line x1="195" y1="80" x2="235" y2="55" stroke="#94a3b8" strokeWidth="3" />
                <circle cx="260" cy="50" r="20" fill="#ef4444" opacity="0.3" />
                <text x="260" y="55" textAnchor="middle" fill="#fca5a5" fontSize="14" fontWeight="bold">O⁻</text>

                <text x="260" y="85" textAnchor="middle" fill="#f97316" fontSize="10">alkoxide</text>
            </g>
        )
    },
    {
        id: 4,
        title: 'Protonation → Cyanohydrin',
        description: 'The alkoxide picks up H⁺ from HCN or solvent to give the neutral cyanohydrin product with both -OH and -CN on the same carbon.',
        arrowDescription: 'Final product: Cyanohydrin with -OH and -CN on same carbon ✓',
        beforeSVG: (
            <g>
                {/* Product */}
                <circle cx="100" cy="90" r="24" fill="#22c55e" opacity="0.2" />
                <text x="100" y="95" textAnchor="middle" fill="#86efac" fontSize="12" fontWeight="bold">CN</text>

                <line x1="124" y1="90" x2="160" y2="90" stroke="#22c55e" strokeWidth="3" />

                <circle cx="180" cy="90" r="24" fill="#3b82f6" opacity="0.3" />
                <text x="180" y="95" textAnchor="middle" fill="#93c5fd" fontSize="14" fontWeight="bold">C</text>

                <line x1="200" y1="75" x2="235" y2="50" stroke="#ef4444" strokeWidth="3" />

                <circle cx="255" cy="45" r="18" fill="#ef4444" opacity="0.2" />
                <text x="255" y="50" textAnchor="middle" fill="#fca5a5" fontSize="12" fontWeight="bold">OH</text>

                <motion.g
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <circle cx="295" cy="45" r="14" fill="#fbbf24" opacity="0.2" />
                    <text x="295" y="50" textAnchor="middle" fill="#fde68a" fontSize="12" fontWeight="bold">H</text>
                </motion.g>

                <text x="180" y="145" textAnchor="middle" fill="#22c55e" fontSize="14" fontWeight="bold">Cyanohydrin ✓</text>
            </g>
        ),
        afterSVG: (
            <g>
                <circle cx="140" cy="90" r="45" fill="#22c55e" opacity="0.1" />
                <text x="140" y="85" textAnchor="middle" fill="#86efac" fontSize="14" fontWeight="bold">NC—C—OH</text>
                <text x="140" y="105" textAnchor="middle" fill="#94a3b8" fontSize="11">|</text>
                <text x="140" y="120" textAnchor="middle" fill="#94a3b8" fontSize="11">R</text>
                <text x="140" y="155" textAnchor="middle" fill="#22c55e" fontSize="13" fontWeight="bold">Cyanohydrin Product</text>
            </g>
        )
    }
];

// Component taking reaction data as prop
interface CarbonylMechanismSimulatorProps {
    reactionName?: string;
    reactionSteps?: ReactionStep[];
}

export default function CarbonylAdditionSimulator({
    reactionName = 'Cyanohydrin Formation',
    reactionSteps = CYANOHYDRIN_REACTION
}: CarbonylMechanismSimulatorProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [showingAfter, setShowingAfter] = useState(false);
    const [selectedReaction, setSelectedReaction] = useState<'cyanohydrin' | 'nabh4' | 'grignard'>('cyanohydrin');

    const step = reactionSteps[currentStep];

    const nextStep = () => {
        if (showingAfter) {
            if (currentStep < reactionSteps.length - 1) {
                setCurrentStep(c => c + 1);
                setShowingAfter(false);
            }
        } else {
            setShowingAfter(true);
        }
    };

    const prevStep = () => {
        if (!showingAfter && currentStep > 0) {
            setCurrentStep(c => c - 1);
            setShowingAfter(true);
        } else {
            setShowingAfter(false);
        }
    };

    const reset = () => {
        setCurrentStep(0);
        setShowingAfter(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
                background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.95))',
                borderRadius: '20px',
                padding: '24px',
                border: '1px solid rgba(251, 191, 36, 0.2)',
                marginBottom: '24px'
            }}
        >
            <h3 style={{ margin: '0 0 8px', color: '#fbbf24', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span>⚗️</span> Carbonyl Addition: {reactionName}
            </h3>
            <p style={{ margin: '0 0 16px', color: '#94a3b8', fontSize: '0.85rem' }}>
                Watch how nucleophiles attack the carbonyl group step-by-step
            </p>

            {/* Progress Bar */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                {reactionSteps.map((s, i) => (
                    <div
                        key={s.id}
                        style={{
                            flex: 1,
                            height: '6px',
                            borderRadius: '3px',
                            background: i < currentStep ? '#22c55e' : i === currentStep ? '#fbbf24' : 'rgba(255,255,255,0.1)'
                        }}
                    />
                ))}
            </div>

            {/* Step Title Box */}
            <div style={{
                background: 'rgba(251, 191, 36, 0.1)',
                border: '1px solid rgba(251, 191, 36, 0.3)',
                borderRadius: '12px',
                padding: '12px 16px',
                marginBottom: '16px'
            }}>
                <div style={{ color: '#fbbf24', fontWeight: 600, marginBottom: '4px' }}>
                    Step {step.id}: {step.title}
                </div>
                <div style={{ color: '#e2e8f0', fontSize: '0.9rem' }}>{step.description}</div>
            </div>

            {/* SVG Visualization */}
            <div style={{
                background: 'rgba(0,0,0,0.3)',
                borderRadius: '16px',
                padding: '20px',
                marginBottom: '16px',
                minHeight: '180px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <svg width="100%" height="180" viewBox="0 0 360 180">
                    <AnimatePresence mode="wait">
                        <motion.g
                            key={`${currentStep}-${showingAfter}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            {showingAfter ? step.afterSVG : step.beforeSVG}
                        </motion.g>
                    </AnimatePresence>
                </svg>
            </div>

            {/* Arrow Description Box */}
            <div style={{
                background: 'rgba(139, 92, 246, 0.1)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                borderRadius: '10px',
                padding: '10px 14px',
                marginBottom: '20px'
            }}>
                <span style={{ color: '#a78bfa', fontSize: '0.85rem' }}>🎯 {step.arrowDescription}</span>
            </div>

            {/* Controls */}
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <button
                    onClick={prevStep}
                    disabled={currentStep === 0 && !showingAfter}
                    style={{
                        padding: '10px 20px',
                        borderRadius: '10px',
                        border: 'none',
                        background: currentStep === 0 && !showingAfter ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.1)',
                        color: currentStep === 0 && !showingAfter ? '#64748b' : '#e2e8f0',
                        fontWeight: 600,
                        cursor: currentStep === 0 && !showingAfter ? 'not-allowed' : 'pointer'
                    }}
                >
                    ← Back
                </button>
                <button
                    onClick={nextStep}
                    disabled={currentStep === reactionSteps.length - 1 && showingAfter}
                    style={{
                        padding: '10px 24px',
                        borderRadius: '10px',
                        border: 'none',
                        background: currentStep === reactionSteps.length - 1 && showingAfter
                            ? 'rgba(255,255,255,0.05)'
                            : 'linear-gradient(135deg, #22c55e, #16a34a)',
                        color: currentStep === reactionSteps.length - 1 && showingAfter ? '#64748b' : 'white',
                        fontWeight: 600,
                        cursor: currentStep === reactionSteps.length - 1 && showingAfter ? 'not-allowed' : 'pointer'
                    }}
                >
                    Next →
                </button>
                <button
                    onClick={reset}
                    style={{
                        padding: '10px 16px',
                        borderRadius: '10px',
                        border: '1px solid rgba(255,255,255,0.2)',
                        background: 'transparent',
                        color: '#94a3b8',
                        fontWeight: 600,
                        cursor: 'pointer'
                    }}
                >
                    🔄 Reset
                </button>
            </div>
        </motion.div>
    );
}
