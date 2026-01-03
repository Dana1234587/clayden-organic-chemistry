'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Types
type SimulationStep = 'discovery' | 'optimization' | 'docking' | 'dashboard';

interface ResearchMetrics {
    bindingAffinity: number;
    molecularWeight: number;
    hDonors: number;
    hAcceptors: number;
    logP: number;
    rotBonds: number;
}

export default function AspirinJourneySimulation() {
    const [currentStep, setCurrentStep] = useState<SimulationStep>('discovery');
    const [stepProgress, setStepProgress] = useState<Record<SimulationStep, boolean>>({
        discovery: false,
        optimization: false,
        docking: false,
        dashboard: false
    });

    // Step 1: Discovery state
    const [barkDragged, setBarkDragged] = useState(false);
    const [salicinRevealed, setSalicinRevealed] = useState(false);

    // Step 2: Optimization state
    const [acetylDragged, setAcetylDragged] = useState(false);
    const [aspirinSynthesized, setAspirinSynthesized] = useState(false);

    // Step 3: Docking state
    const [dockingStarted, setDockingStarted] = useState(false);
    const [aspirinDocked, setAspirinDocked] = useState(false);
    const [serineAcetylated, setSerineAcetylated] = useState(false);
    const [painBlocked, setPainBlocked] = useState(false);

    // Metrics
    const [metrics, setMetrics] = useState<ResearchMetrics>({
        bindingAffinity: 0,
        molecularWeight: 0,
        hDonors: 0,
        hAcceptors: 0,
        logP: 0,
        rotBonds: 0
    });

    const steps: { id: SimulationStep; title: string; icon: string }[] = [
        { id: 'discovery', title: 'Natural Lead', icon: '🌿' },
        { id: 'optimization', title: 'Optimization', icon: '⚗️' },
        { id: 'docking', title: 'COX-2 Docking', icon: '🧬' },
        { id: 'dashboard', title: 'Research Data', icon: '📊' }
    ];

    // Track if current step's action is completed
    const [stepActionDone, setStepActionDone] = useState(false);

    // Complete step action (but don't auto-advance)
    const markStepActionDone = () => {
        setStepActionDone(true);
    };

    // Manual next step
    const goToNextStep = () => {
        const stepIdx = steps.findIndex(s => s.id === currentStep);
        if (stepIdx < steps.length - 1) {
            setStepProgress(prev => ({ ...prev, [currentStep]: true }));
            setCurrentStep(steps[stepIdx + 1].id);
            setStepActionDone(false);
        }
    };

    // Previous step
    const goToPrevStep = () => {
        const stepIdx = steps.findIndex(s => s.id === currentStep);
        if (stepIdx > 0) {
            setCurrentStep(steps[stepIdx - 1].id);
            setStepActionDone(true); // Previous step was already done
        }
    };

    // Restart simulation
    const restartSimulation = () => {
        setCurrentStep('discovery');
        setStepProgress({ discovery: false, optimization: false, docking: false, dashboard: false });
        setStepActionDone(false);
        setBarkDragged(false);
        setSalicinRevealed(false);
        setAcetylDragged(false);
        setAspirinSynthesized(false);
        setDockingStarted(false);
        setAspirinDocked(false);
        setSerineAcetylated(false);
        setPainBlocked(false);
        setMetrics({ bindingAffinity: 0, molecularWeight: 0, hDonors: 0, hAcceptors: 0, logP: 0, rotBonds: 0 });
    };

    // Step 1: Discovery interaction
    const handleBarkDrag = () => {
        setBarkDragged(true);
        setTimeout(() => {
            setSalicinRevealed(true);
            setTimeout(() => markStepActionDone(), 1000);
        }, 1000);
    };

    // Step 2: Acetyl switch
    const handleAcetylDrop = () => {
        setAcetylDragged(true);
        setTimeout(() => {
            setAspirinSynthesized(true);
            setMetrics({
                bindingAffinity: -8.2,
                molecularWeight: 180.16,
                hDonors: 1,
                hAcceptors: 4,
                logP: 1.19,
                rotBonds: 3
            });
            setTimeout(() => markStepActionDone(), 1000);
        }, 1500);
    };

    // Step 3: Docking simulation
    const startDocking = () => {
        setDockingStarted(true);

        // Simulate docking progress
        setTimeout(() => setAspirinDocked(true), 2000);
        setTimeout(() => setSerineAcetylated(true), 4000);
        setTimeout(() => {
            setPainBlocked(true);
            markStepActionDone();
        }, 5500);
    };

    return (
        <div style={{
            background: 'linear-gradient(180deg, #030712 0%, #111827 100%)',
            borderRadius: '20px',
            overflow: 'hidden',
            border: '1px solid rgba(59,130,246,0.2)'
        }}>
            {/* Header */}
            <div style={{
                padding: '1.5rem 2rem',
                background: 'linear-gradient(135deg, rgba(34,197,94,0.15), rgba(59,130,246,0.1))',
                borderBottom: '1px solid rgba(148,163,184,0.1)'
            }}>
                <h2 style={{
                    margin: 0,
                    fontSize: '1.4rem',
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #22c55e, #3b82f6)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    🧪 The Aspirin Journey: From Willow Bark to COX-2 Inhibition
                </h2>
                <p style={{ margin: '0.25rem 0 0', color: '#94a3b8', fontSize: '0.85rem' }}>
                    Interactive Drug Discovery Simulation • Based on Real PDB Data
                </p>
            </div>

            {/* Step Navigator */}
            <div style={{
                display: 'flex',
                padding: '1rem 2rem',
                background: 'rgba(0,0,0,0.3)',
                gap: '0.5rem'
            }}>
                {steps.map((step, idx) => {
                    // Can click if: current step, completed step, or next step after completed
                    const canNavigate = stepProgress[step.id] ||
                        currentStep === step.id ||
                        (idx > 0 && stepProgress[steps[idx - 1].id]) ||
                        idx === 0;

                    return (
                        <motion.button
                            key={step.id}
                            whileHover={canNavigate ? { scale: 1.02 } : {}}
                            onClick={() => {
                                if (canNavigate) {
                                    setCurrentStep(step.id);
                                    // Reset step action if going to uncompleted step
                                    if (!stepProgress[step.id]) {
                                        setStepActionDone(false);
                                    } else {
                                        setStepActionDone(true);
                                    }
                                }
                            }}
                            style={{
                                flex: 1,
                                padding: '0.75rem',
                                background: currentStep === step.id
                                    ? 'linear-gradient(135deg, rgba(59,130,246,0.3), rgba(34,197,94,0.2))'
                                    : stepProgress[step.id]
                                        ? 'rgba(34,197,94,0.15)'
                                        : 'rgba(30,41,59,0.5)',
                                border: currentStep === step.id
                                    ? '2px solid #3b82f6'
                                    : stepProgress[step.id]
                                        ? '1px solid #22c55e'
                                        : '1px solid rgba(148,163,184,0.2)',
                                borderRadius: '12px',
                                cursor: canNavigate ? 'pointer' : 'not-allowed',
                                position: 'relative',
                                opacity: canNavigate ? 1 : 0.5
                            }}
                        >
                            <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{step.icon}</div>
                            <div style={{
                                fontSize: '0.7rem',
                                fontWeight: 600,
                                color: currentStep === step.id ? '#60a5fa' : stepProgress[step.id] ? '#22c55e' : '#64748b'
                            }}>
                                Step {idx + 1}
                            </div>
                            <div style={{
                                fontSize: '0.75rem',
                                color: currentStep === step.id ? '#e2e8f0' : '#94a3b8'
                            }}>
                                {step.title}
                            </div>
                            {stepProgress[step.id] && (
                                <div style={{
                                    position: 'absolute',
                                    top: '0.5rem',
                                    right: '0.5rem',
                                    fontSize: '0.9rem'
                                }}>✅</div>
                            )}
                        </motion.button>
                    );
                })}
            </div>

            {/* Main Content Area */}
            <div style={{ padding: '2rem', minHeight: '450px' }}>
                <AnimatePresence mode="wait">
                    {/* STEP 1: Natural Lead Discovery */}
                    {currentStep === 'discovery' && (
                        <motion.div
                            key="discovery"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                                <h3 style={{ margin: 0, color: '#22c55e', fontSize: '1.2rem' }}>
                                    🌿 Step 1: Natural Lead Discovery
                                </h3>
                                <p style={{ margin: '0.5rem 0 0', color: '#94a3b8', fontSize: '0.9rem' }}>
                                    Discover the active compound from Willow Bark
                                </p>
                            </div>

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '2rem',
                                alignItems: 'center'
                            }}>
                                {/* Willow Bark Visual */}
                                <div style={{
                                    position: 'relative',
                                    height: '300px',
                                    background: 'linear-gradient(180deg, #064e3b 0%, #022c22 100%)',
                                    borderRadius: '16px',
                                    overflow: 'hidden',
                                    border: '1px solid #059669'
                                }}>
                                    {/* Tree SVG */}
                                    <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%' }}>
                                        {/* Tree trunk */}
                                        <rect x="85" y="80" width="30" height="120" fill="#78350f" rx="3" />
                                        <rect x="80" y="80" width="40" height="10" fill="#92400e" rx="2" />
                                        {/* Tree crown */}
                                        <ellipse cx="100" cy="50" rx="60" ry="45" fill="#166534" />
                                        <ellipse cx="70" cy="60" rx="35" ry="30" fill="#15803d" />
                                        <ellipse cx="130" cy="60" rx="35" ry="30" fill="#15803d" />
                                        {/* Bark piece (draggable) */}
                                        {!barkDragged && (
                                            <motion.g
                                                whileHover={{ scale: 1.1, cursor: 'grab' }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={handleBarkDrag}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <rect x="75" y="110" width="20" height="35" fill="#a16207" rx="3" stroke="#ca8a04" strokeWidth="2" strokeDasharray="4,2">
                                                    <animate attributeName="opacity" values="1;0.7;1" dur="1.5s" repeatCount="indefinite" />
                                                </rect>
                                                <text x="85" y="180" textAnchor="middle" fontSize="8" fill="#fcd34d">Click to extract!</text>
                                            </motion.g>
                                        )}
                                    </svg>

                                    {barkDragged && !salicinRevealed && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            style={{
                                                position: 'absolute',
                                                top: '50%',
                                                left: '50%',
                                                transform: 'translate(-50%, -50%)',
                                                color: '#fcd34d',
                                                fontSize: '1rem',
                                                fontWeight: 600
                                            }}
                                        >
                                            Extracting... ⏳
                                        </motion.div>
                                    )}
                                </div>

                                {/* Salicin Molecule */}
                                <div style={{
                                    height: '300px',
                                    background: 'rgba(15,23,42,0.8)',
                                    borderRadius: '16px',
                                    border: '1px solid rgba(148,163,184,0.2)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    position: 'relative'
                                }}>
                                    {!salicinRevealed ? (
                                        <div style={{ color: '#64748b', textAlign: 'center' }}>
                                            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>❓</div>
                                            <p style={{ margin: 0, fontSize: '0.9rem' }}>Extract bark to discover molecule</p>
                                        </div>
                                    ) : (
                                        <motion.div
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            style={{ textAlign: 'center' }}
                                        >
                                            <iframe
                                                src="https://embed.molview.org/v1/?mode=balls&cid=439503&bg=1e293b"
                                                style={{
                                                    width: '100%',
                                                    height: '220px',
                                                    border: 'none',
                                                    borderRadius: '12px'
                                                }}
                                                title="Salicin 3D"
                                            />
                                            <div style={{ marginTop: '0.75rem' }}>
                                                <p style={{ margin: 0, color: '#22c55e', fontWeight: 700, fontSize: '1.1rem' }}>
                                                    Salicin Discovered! 🎉
                                                </p>
                                                <p style={{ margin: '0.25rem 0 0', color: '#94a3b8', fontSize: '0.8rem' }}>
                                                    C₁₃H₁₈O₇ • PubChem CID: 439503
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 2: Lead Optimization (Acetyl Switch) */}
                    {currentStep === 'optimization' && (
                        <motion.div
                            key="optimization"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                                <h3 style={{ margin: 0, color: '#f59e0b', fontSize: '1.2rem' }}>
                                    ⚗️ Step 2: Lead Optimization - The Acetyl Switch
                                </h3>
                                <p style={{ margin: '0.5rem 0 0', color: '#94a3b8', fontSize: '0.9rem' }}>
                                    Add the Acetyl group to convert Salicylic Acid → Aspirin
                                </p>
                            </div>

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr auto 1fr',
                                gap: '1.5rem',
                                alignItems: 'center'
                            }}>
                                {/* Salicylic Acid */}
                                <div style={{
                                    padding: '1.5rem',
                                    background: aspirinSynthesized ? 'rgba(239,68,68,0.1)' : 'rgba(239,68,68,0.2)',
                                    borderRadius: '16px',
                                    border: '1px solid #ef4444',
                                    textAlign: 'center',
                                    opacity: aspirinSynthesized ? 0.5 : 1,
                                    transition: 'all 0.5s'
                                }}>
                                    <iframe
                                        src="https://embed.molview.org/v1/?mode=balls&cid=338&bg=1e293b"
                                        style={{
                                            width: '100%',
                                            height: '180px',
                                            border: 'none',
                                            borderRadius: '12px'
                                        }}
                                        title="Salicylic Acid"
                                    />
                                    <p style={{ margin: '0.75rem 0 0', color: '#ef4444', fontWeight: 600 }}>Salicylic Acid</p>
                                    <p style={{ margin: '0.25rem 0 0', color: '#94a3b8', fontSize: '0.75rem' }}>
                                        C₇H₆O₃ • ⚠️ Causes stomach irritation
                                    </p>
                                </div>

                                {/* Acetyl Group (Draggable) */}
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                                    {!acetylDragged ? (
                                        <motion.button
                                            whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(34,197,94,0.5)' }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={handleAcetylDrop}
                                            style={{
                                                padding: '1.5rem 2rem',
                                                background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                                                border: 'none',
                                                borderRadius: '16px',
                                                cursor: 'pointer',
                                                boxShadow: '0 4px 20px rgba(34,197,94,0.3)'
                                            }}
                                        >
                                            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🧪</div>
                                            <div style={{ color: 'white', fontWeight: 700, fontSize: '1rem' }}>
                                                -OCOCH₃
                                            </div>
                                            <div style={{ color: '#bbf7d0', fontSize: '0.7rem', marginTop: '0.25rem' }}>
                                                Acetyl Group
                                            </div>
                                        </motion.button>
                                    ) : (
                                        <motion.div
                                            initial={{ scale: 1.5, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1, x: 100 }}
                                            transition={{ duration: 0.8 }}
                                            style={{ color: '#22c55e', fontSize: '2rem' }}
                                        >
                                            ✨ → →
                                        </motion.div>
                                    )}

                                    {!acetylDragged && (
                                        <p style={{
                                            color: '#22c55e',
                                            fontSize: '0.8rem',
                                            fontWeight: 600,
                                            animation: 'pulse 2s infinite'
                                        }}>
                                            Click to add!
                                        </p>
                                    )}
                                </div>

                                {/* Aspirin Result */}
                                <div style={{
                                    padding: '1.5rem',
                                    background: aspirinSynthesized ? 'rgba(34,197,94,0.2)' : 'rgba(59,130,246,0.1)',
                                    borderRadius: '16px',
                                    border: aspirinSynthesized ? '2px solid #22c55e' : '1px solid rgba(59,130,246,0.3)',
                                    textAlign: 'center',
                                    transition: 'all 0.5s'
                                }}>
                                    {aspirinSynthesized ? (
                                        <motion.div
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                        >
                                            <iframe
                                                src="https://embed.molview.org/v1/?mode=balls&cid=2244&bg=1e293b"
                                                style={{
                                                    width: '100%',
                                                    height: '180px',
                                                    border: 'none',
                                                    borderRadius: '12px'
                                                }}
                                                title="Aspirin"
                                            />
                                            <p style={{ margin: '0.75rem 0 0', color: '#22c55e', fontWeight: 700 }}>
                                                ✅ Aspirin Synthesized!
                                            </p>
                                            <p style={{ margin: '0.25rem 0 0', color: '#94a3b8', fontSize: '0.75rem' }}>
                                                C₉H₈O₄ • Safe & Effective
                                            </p>
                                        </motion.div>
                                    ) : (
                                        <div style={{ height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <div style={{ color: '#64748b', textAlign: 'center' }}>
                                                <div style={{ fontSize: '3rem' }}>💊</div>
                                                <p style={{ margin: '0.5rem 0 0', fontSize: '0.85rem' }}>Aspirin</p>
                                                <p style={{ margin: '0.25rem 0 0', fontSize: '0.7rem' }}>Add acetyl to synthesize</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 3: COX-2 Docking */}
                    {currentStep === 'docking' && (
                        <motion.div
                            key="docking"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                                <h3 style={{ margin: 0, color: '#8b5cf6', fontSize: '1.2rem' }}>
                                    🧬 Step 3: In Silico Docking - COX-2 Inhibition
                                </h3>
                                <p style={{ margin: '0.5rem 0 0', color: '#94a3b8', fontSize: '0.9rem' }}>
                                    Dock Aspirin into COX-2 enzyme active site (PDB: 5IKQ)
                                </p>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
                                {/* 3D Viewer */}
                                <div style={{
                                    height: '320px',
                                    background: '#0a0a0f',
                                    borderRadius: '16px',
                                    overflow: 'hidden',
                                    border: '1px solid rgba(139,92,246,0.3)',
                                    position: 'relative'
                                }}>
                                    <iframe
                                        src="https://molstar.org/viewer/?pdb=5ikq&hide-controls=1"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            border: 'none'
                                        }}
                                        title="COX-2 Enzyme (5IKQ)"
                                    />

                                    {/* Overlay for pain blocked */}
                                    {painBlocked && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            style={{
                                                position: 'absolute',
                                                top: '50%',
                                                left: '50%',
                                                transform: 'translate(-50%, -50%)',
                                                padding: '1.5rem 2.5rem',
                                                background: 'rgba(34,197,94,0.95)',
                                                borderRadius: '16px',
                                                boxShadow: '0 0 40px rgba(34,197,94,0.5)'
                                            }}
                                        >
                                            <div style={{ fontSize: '2rem', textAlign: 'center' }}>🎉</div>
                                            <div style={{ color: 'white', fontWeight: 700, fontSize: '1.25rem' }}>
                                                PAIN BLOCKED!
                                            </div>
                                            <div style={{ color: '#bbf7d0', fontSize: '0.8rem', textAlign: 'center' }}>
                                                Irreversible Inhibition
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* PDB Badge */}
                                    <div style={{
                                        position: 'absolute',
                                        top: '0.75rem',
                                        left: '0.75rem',
                                        padding: '0.35rem 0.75rem',
                                        background: 'rgba(0,0,0,0.8)',
                                        borderRadius: '6px',
                                        fontSize: '0.7rem',
                                        color: '#a78bfa'
                                    }}>
                                        PDB: 5IKQ • COX-2 Enzyme
                                    </div>
                                </div>

                                {/* Docking Progress */}
                                <div style={{
                                    padding: '1.25rem',
                                    background: 'rgba(139,92,246,0.1)',
                                    borderRadius: '16px',
                                    border: '1px solid rgba(139,92,246,0.2)'
                                }}>
                                    <h4 style={{ margin: '0 0 1rem', color: '#a78bfa', fontSize: '0.9rem' }}>
                                        Docking Progress
                                    </h4>

                                    {!dockingStarted ? (
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={startDocking}
                                            style={{
                                                width: '100%',
                                                padding: '1rem',
                                                background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
                                                border: 'none',
                                                borderRadius: '12px',
                                                color: 'white',
                                                fontWeight: 700,
                                                fontSize: '1rem',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            🚀 Start Docking
                                        </motion.button>
                                    ) : (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                            {[
                                                { label: 'Approaching active site', done: aspirinDocked, icon: '🎯' },
                                                { label: 'Aspirin docked', done: aspirinDocked, icon: '🔗' },
                                                { label: 'Acetylating Ser-530', done: serineAcetylated, icon: '⚡' },
                                                { label: 'Enzyme locked', done: painBlocked, icon: '🔒' }
                                            ].map((item, idx) => (
                                                <div
                                                    key={idx}
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.75rem',
                                                        padding: '0.5rem',
                                                        background: item.done ? 'rgba(34,197,94,0.2)' : 'rgba(30,41,59,0.5)',
                                                        borderRadius: '8px',
                                                        border: item.done ? '1px solid #22c55e' : '1px solid transparent'
                                                    }}
                                                >
                                                    <span style={{ fontSize: '1rem' }}>{item.icon}</span>
                                                    <span style={{
                                                        fontSize: '0.8rem',
                                                        color: item.done ? '#22c55e' : '#94a3b8',
                                                        flex: 1
                                                    }}>
                                                        {item.label}
                                                    </span>
                                                    {item.done && <span style={{ color: '#22c55e' }}>✓</span>}
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {serineAcetylated && (
                                        <div style={{
                                            marginTop: '1rem',
                                            padding: '0.75rem',
                                            background: 'rgba(249,115,22,0.15)',
                                            borderRadius: '8px',
                                            fontSize: '0.75rem',
                                            color: '#fb923c'
                                        }}>
                                            ⚡ Acetyl group transferred to Serine-530
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 4: Research Dashboard */}
                    {currentStep === 'dashboard' && (
                        <motion.div
                            key="dashboard"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                                <h3 style={{ margin: 0, color: '#06b6d4', fontSize: '1.2rem' }}>
                                    📊 Step 4: Research Dashboard
                                </h3>
                                <p style={{ margin: '0.5rem 0 0', color: '#94a3b8', fontSize: '0.9rem' }}>
                                    Drug-likeness Analysis & Lipinski's Rule of Five
                                </p>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                                {/* Binding Affinity */}
                                <div style={{
                                    padding: '1.25rem',
                                    background: 'linear-gradient(135deg, rgba(34,197,94,0.15), rgba(16,185,129,0.05))',
                                    borderRadius: '16px',
                                    border: '1px solid rgba(34,197,94,0.3)',
                                    textAlign: 'center'
                                }}>
                                    <div style={{ fontSize: '0.7rem', color: '#22c55e', fontWeight: 600, marginBottom: '0.5rem' }}>
                                        BINDING AFFINITY
                                    </div>
                                    <div style={{ fontSize: '2rem', fontWeight: 700, color: '#22c55e' }}>
                                        {metrics.bindingAffinity}
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>kcal/mol</div>
                                </div>

                                {/* Molecular Weight */}
                                <div style={{
                                    padding: '1.25rem',
                                    background: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(37,99,235,0.05))',
                                    borderRadius: '16px',
                                    border: '1px solid rgba(59,130,246,0.3)',
                                    textAlign: 'center'
                                }}>
                                    <div style={{ fontSize: '0.7rem', color: '#3b82f6', fontWeight: 600, marginBottom: '0.5rem' }}>
                                        MOLECULAR WEIGHT
                                    </div>
                                    <div style={{ fontSize: '2rem', fontWeight: 700, color: '#3b82f6' }}>
                                        {metrics.molecularWeight}
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>g/mol (≤500 ✓)</div>
                                </div>

                                {/* LogP */}
                                <div style={{
                                    padding: '1.25rem',
                                    background: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(124,58,237,0.05))',
                                    borderRadius: '16px',
                                    border: '1px solid rgba(139,92,246,0.3)',
                                    textAlign: 'center'
                                }}>
                                    <div style={{ fontSize: '0.7rem', color: '#8b5cf6', fontWeight: 600, marginBottom: '0.5rem' }}>
                                        LogP (LIPOPHILICITY)
                                    </div>
                                    <div style={{ fontSize: '2rem', fontWeight: 700, color: '#8b5cf6' }}>
                                        {metrics.logP}
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>(≤5 ✓)</div>
                                </div>
                            </div>

                            {/* Lipinski's Rule */}
                            <div style={{
                                marginTop: '1.5rem',
                                padding: '1.5rem',
                                background: 'rgba(6,182,212,0.1)',
                                borderRadius: '16px',
                                border: '1px solid rgba(6,182,212,0.3)'
                            }}>
                                <h4 style={{ margin: '0 0 1rem', color: '#06b6d4', fontSize: '1rem' }}>
                                    ✅ Lipinski's Rule of Five - PASSED
                                </h4>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
                                    {[
                                        { label: 'MW ≤ 500', value: `${metrics.molecularWeight}`, pass: true },
                                        { label: 'H-Donors ≤ 5', value: `${metrics.hDonors}`, pass: true },
                                        { label: 'H-Acceptors ≤ 10', value: `${metrics.hAcceptors}`, pass: true },
                                        { label: 'LogP ≤ 5', value: `${metrics.logP}`, pass: true }
                                    ].map((rule, idx) => (
                                        <div
                                            key={idx}
                                            style={{
                                                padding: '0.75rem',
                                                background: 'rgba(34,197,94,0.15)',
                                                borderRadius: '8px',
                                                textAlign: 'center'
                                            }}
                                        >
                                            <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{rule.label}</div>
                                            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#22c55e' }}>
                                                {rule.value} ✓
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <p style={{
                                    margin: '1rem 0 0',
                                    color: '#94a3b8',
                                    fontSize: '0.85rem',
                                    textAlign: 'center'
                                }}>
                                    🎉 Aspirin is a "drug-like" molecule suitable for oral bioavailability!
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Navigation Footer */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '1.5rem',
                    paddingTop: '1.5rem',
                    borderTop: '1px solid rgba(148,163,184,0.2)'
                }}>
                    <button
                        onClick={goToPrevStep}
                        disabled={currentStep === 'discovery'}
                        style={{
                            padding: '0.75rem 1.5rem',
                            background: currentStep === 'discovery' ? 'rgba(30,41,59,0.5)' : 'rgba(59,130,246,0.2)',
                            border: '1px solid rgba(59,130,246,0.3)',
                            borderRadius: '10px',
                            color: currentStep === 'discovery' ? '#64748b' : '#60a5fa',
                            fontWeight: 600,
                            cursor: currentStep === 'discovery' ? 'not-allowed' : 'pointer',
                            fontSize: '0.9rem'
                        }}
                    >
                        ← Previous
                    </button>

                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                        {currentStep === 'dashboard' && stepProgress.dashboard ? (
                            <button
                                onClick={restartSimulation}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                                    border: 'none',
                                    borderRadius: '10px',
                                    color: 'white',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    fontSize: '0.9rem'
                                }}
                            >
                                🔄 Restart Simulation
                            </button>
                        ) : currentStep !== 'dashboard' ? (
                            <button
                                onClick={goToNextStep}
                                disabled={!stepActionDone}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    background: stepActionDone
                                        ? 'linear-gradient(135deg, #3b82f6, #2563eb)'
                                        : 'rgba(30,41,59,0.5)',
                                    border: stepActionDone ? 'none' : '1px solid rgba(148,163,184,0.3)',
                                    borderRadius: '10px',
                                    color: stepActionDone ? 'white' : '#64748b',
                                    fontWeight: 600,
                                    cursor: stepActionDone ? 'pointer' : 'not-allowed',
                                    fontSize: '0.9rem'
                                }}
                            >
                                Next Step →
                            </button>
                        ) : (
                            <button
                                onClick={() => { setStepProgress(prev => ({ ...prev, dashboard: true })); }}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
                                    border: 'none',
                                    borderRadius: '10px',
                                    color: 'white',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    fontSize: '0.9rem'
                                }}
                            >
                                ✅ Complete Simulation
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
