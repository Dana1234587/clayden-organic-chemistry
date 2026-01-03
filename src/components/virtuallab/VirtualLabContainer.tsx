'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

// Lazy load phase components
const SynthesisBench = dynamic(() => import('./SynthesisBench'), {
    ssr: false,
    loading: () => <PhaseLoader title="Loading Synthesis Bench..." />
});

const MetabolismMystery = dynamic(() => import('./MetabolismMystery'), {
    ssr: false,
    loading: () => <PhaseLoader title="Loading Metabolism Lab..." />
});

const MolecularLock = dynamic(() => import('./MolecularLock'), {
    ssr: false,
    loading: () => <PhaseLoader title="Loading Enzyme Docking..." />
});

const MDDDQuest = dynamic(() => import('./MDDDQuest'), {
    ssr: false,
    loading: () => <PhaseLoader title="Loading MDDD Quest..." />
});

// Loading component
function PhaseLoader({ title }: { title: string }) {
    return (
        <div style={{
            height: '400px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--gradient-card)',
            borderRadius: '20px',
            border: '1px solid var(--neutral-800)'
        }}>
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                style={{ fontSize: '3rem', marginBottom: '1rem' }}
            >
                ⚗️
            </motion.div>
            <div style={{ color: 'var(--neutral-400)' }}>{title}</div>
        </div>
    );
}

// Phase definitions
const PHASES = [
    {
        id: 'synthesis',
        number: 1,
        title: 'The Synthesis Bench',
        subtitle: 'Azo Coupling Reaction',
        icon: '⚗️',
        color: '#dc2626',
        description: 'Synthesize the vibrant red dye, Prontosil'
    },
    {
        id: 'metabolism',
        number: 2,
        title: 'The Metabolism Mystery',
        subtitle: 'In Vitro vs In Vivo',
        icon: '🧬',
        color: '#10b981',
        description: 'Discover why the dye only works inside the body'
    },
    {
        id: 'mechanism',
        number: 3,
        title: 'The Molecular Lock',
        subtitle: 'Mechanism of Action',
        icon: '🔐',
        color: '#8b5cf6',
        description: 'Understand bioisosterism and molecular mimicry'
    },
    {
        id: 'games',
        number: 4,
        title: 'MDDD Quest',
        subtitle: 'Interactive Challenges',
        icon: '🎮',
        color: '#f59e0b',
        description: 'Test your knowledge in fun mini-games'
    }
];

// Badges that can be earned
const BADGES = [
    { id: 'synthesizer', name: 'Master Synthesizer', icon: '🧪', condition: 'Complete Phase 1' },
    { id: 'detective', name: 'Metabolism Detective', icon: '🔍', condition: 'Complete Phase 2' },
    { id: 'architect', name: 'Molecular Architect', icon: '🏗️', condition: 'Complete Phase 3' },
    { id: 'champion', name: 'MDDD Champion', icon: '🏆', condition: 'Complete all games' }
];

export default function VirtualLabContainer() {
    const [currentPhase, setCurrentPhase] = useState<string>('synthesis');
    const [completedPhases, setCompletedPhases] = useState<string[]>([]);
    const [earnedBadges, setEarnedBadges] = useState<string[]>([]);
    const [showIntro, setShowIntro] = useState(true);

    const currentPhaseData = PHASES.find(p => p.id === currentPhase);
    const progress = (completedPhases.length / PHASES.length) * 100;

    const handlePhaseComplete = (phaseId: string) => {
        if (!completedPhases.includes(phaseId)) {
            setCompletedPhases(prev => [...prev, phaseId]);

            // Award badges
            if (phaseId === 'synthesis' && !earnedBadges.includes('synthesizer')) {
                setEarnedBadges(prev => [...prev, 'synthesizer']);
            } else if (phaseId === 'metabolism' && !earnedBadges.includes('detective')) {
                setEarnedBadges(prev => [...prev, 'detective']);
            } else if (phaseId === 'mechanism' && !earnedBadges.includes('architect')) {
                setEarnedBadges(prev => [...prev, 'architect']);
            } else if (phaseId === 'games' && !earnedBadges.includes('champion')) {
                setEarnedBadges(prev => [...prev, 'champion']);
            }
        }
    };

    const goToNextPhase = () => {
        const currentIndex = PHASES.findIndex(p => p.id === currentPhase);
        if (currentIndex < PHASES.length - 1) {
            setCurrentPhase(PHASES[currentIndex + 1].id);
        }
    };

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
                background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <span style={{ fontSize: '2rem' }}>🔬</span>
                            <div>
                                <h2 style={{
                                    fontSize: '1.5rem',
                                    fontWeight: 700,
                                    color: 'white',
                                    margin: 0
                                }}>
                                    Virtual Lab: The Magic Bullet Revolution
                                </h2>
                                <p style={{
                                    color: 'var(--neutral-400)',
                                    margin: '0.25rem 0 0',
                                    fontSize: '0.9rem'
                                }}>
                                    From Synthetic Dyes to Life-Saving Antibiotics
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Badges */}
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {BADGES.map(badge => (
                            <motion.div
                                key={badge.id}
                                initial={{ scale: 0 }}
                                animate={{ scale: earnedBadges.includes(badge.id) ? 1 : 0.5 }}
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: '50%',
                                    background: earnedBadges.includes(badge.id)
                                        ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
                                        : 'rgba(255, 255, 255, 0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: earnedBadges.includes(badge.id) ? '1.25rem' : '1rem',
                                    opacity: earnedBadges.includes(badge.id) ? 1 : 0.3,
                                    cursor: 'help'
                                }}
                                title={badge.name}
                            >
                                {badge.icon}
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Progress Bar */}
                <div style={{ marginTop: '1rem' }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '0.5rem',
                        fontSize: '0.8rem',
                        color: 'var(--neutral-400)'
                    }}>
                        <span>Progress</span>
                        <span>{Math.round(progress)}% Complete</span>
                    </div>
                    <div style={{
                        height: '8px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '4px',
                        overflow: 'hidden'
                    }}>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            style={{
                                height: '100%',
                                background: 'linear-gradient(90deg, #dc2626, #10b981, #8b5cf6, #f59e0b)',
                                borderRadius: '4px'
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Phase Navigation */}
            <div style={{
                display: 'flex',
                gap: '0.5rem',
                padding: '1rem 2rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                overflowX: 'auto'
            }}>
                {PHASES.map((phase, idx) => (
                    <motion.button
                        key={phase.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setCurrentPhase(phase.id)}
                        style={{
                            flex: 1,
                            minWidth: '150px',
                            padding: '0.75rem 1rem',
                            background: currentPhase === phase.id
                                ? `${phase.color}20`
                                : 'rgba(255, 255, 255, 0.02)',
                            border: currentPhase === phase.id
                                ? `2px solid ${phase.color}`
                                : '2px solid rgba(255, 255, 255, 0.05)',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            position: 'relative'
                        }}
                    >
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            justifyContent: 'center'
                        }}>
                            <span style={{ fontSize: '1.25rem' }}>{phase.icon}</span>
                            <div style={{ textAlign: 'left' }}>
                                <div style={{
                                    color: currentPhase === phase.id ? phase.color : 'var(--neutral-300)',
                                    fontWeight: 600,
                                    fontSize: '0.85rem'
                                }}>
                                    Phase {phase.number}
                                </div>
                                <div style={{
                                    color: 'var(--neutral-500)',
                                    fontSize: '0.7rem'
                                }}>
                                    {phase.title}
                                </div>
                            </div>
                        </div>

                        {/* Completed checkmark */}
                        {completedPhases.includes(phase.id) && (
                            <div style={{
                                position: 'absolute',
                                top: -5,
                                right: -5,
                                width: 20,
                                height: 20,
                                borderRadius: '50%',
                                background: '#10b981',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.7rem',
                                color: 'white'
                            }}>
                                ✓
                            </div>
                        )}
                    </motion.button>
                ))}
            </div>

            {/* Phase Content */}
            <div style={{ padding: '1.5rem 2rem' }}>
                {/* Phase Header */}
                {currentPhaseData && (
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        marginBottom: '1.5rem',
                        padding: '1rem',
                        background: `${currentPhaseData.color}10`,
                        borderRadius: '12px',
                        border: `1px solid ${currentPhaseData.color}30`
                    }}>
                        <div style={{
                            width: 60,
                            height: 60,
                            borderRadius: '16px',
                            background: `${currentPhaseData.color}20`,
                            border: `2px solid ${currentPhaseData.color}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '2rem'
                        }}>
                            {currentPhaseData.icon}
                        </div>
                        <div>
                            <div style={{
                                color: currentPhaseData.color,
                                fontSize: '0.8rem',
                                fontWeight: 600,
                                marginBottom: '0.25rem'
                            }}>
                                PHASE {currentPhaseData.number}: {currentPhaseData.subtitle}
                            </div>
                            <h3 style={{
                                color: 'white',
                                margin: 0,
                                fontSize: '1.25rem',
                                fontWeight: 700
                            }}>
                                {currentPhaseData.title}
                            </h3>
                            <p style={{
                                color: 'var(--neutral-400)',
                                margin: '0.25rem 0 0',
                                fontSize: '0.9rem'
                            }}>
                                {currentPhaseData.description}
                            </p>
                        </div>
                    </div>
                )}

                {/* Phase Components */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentPhase}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {currentPhase === 'synthesis' && (
                            <SynthesisBench
                                onComplete={() => handlePhaseComplete('synthesis')}
                                onNext={goToNextPhase}
                            />
                        )}
                        {currentPhase === 'metabolism' && (
                            <MetabolismMystery
                                onComplete={() => handlePhaseComplete('metabolism')}
                                onNext={goToNextPhase}
                            />
                        )}
                        {currentPhase === 'mechanism' && (
                            <MolecularLock
                                onComplete={() => handlePhaseComplete('mechanism')}
                                onNext={goToNextPhase}
                            />
                        )}
                        {currentPhase === 'games' && (
                            <MDDDQuest
                                onComplete={() => handlePhaseComplete('games')}
                            />
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
