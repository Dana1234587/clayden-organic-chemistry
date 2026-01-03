'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

// Dynamic imports
const AspirinJourneySimulation = dynamic(() => import('./AspirinJourneySimulation'), {
    ssr: false,
    loading: () => (
        <div style={{ height: '500px', background: '#030712', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
            Loading Simulation...
        </div>
    )
});

const MoleculeCard = dynamic(() => import('./MoleculeCard'), {
    ssr: false,
    loading: () => <div style={{ height: '300px', background: 'rgba(30,41,59,0.5)', borderRadius: '16px' }} />
});

const InteractiveLabQuiz = dynamic(() => import('./InteractiveLabQuiz'), {
    ssr: false,
    loading: () => <div style={{ height: '300px', background: 'rgba(30,41,59,0.5)', borderRadius: '16px' }} />
});

type TabType = 'story' | 'molecules' | 'simulation' | 'lab';
type LabMode = 'guided' | 'quiz';

// Molecule data with functional groups and positions for hover
const aspirinMolecules = [
    {
        name: 'Salicin',
        formula: 'C₁₃H₁₈O₇',
        cid: 439503,
        source: 'Willow Bark (لحاء الصفصاف)',
        mw: 286.28,
        functionalGroups: [
            { name: 'Glycosidic Bond', symbol: 'C-O-C', role: 'Links glucose to benzene', effect: 'Slow release through hydrolysis', color: '#22c55e' },
            { name: 'Phenolic -OH', symbol: '-OH', role: 'Active hydroxyl group', effect: 'Converts to Salicylic Acid in liver', color: '#3b82f6' },
            { name: 'Glucose Ring', symbol: 'C₆H₁₂O₆', role: 'Sugar moiety (6-membered)', effect: 'Increases water solubility for absorption', color: '#8b5cf6' },
            { name: 'Benzene Ring', symbol: 'C₆H₅', role: 'Aromatic ring (6-membered)', effect: 'Drug core - becomes Salicylic Acid', color: '#f97316' }
        ],
        color: '#22c55e',
        icon: '🌿'
    },
    {
        name: 'Salicylic Acid',
        formula: 'C₇H₆O₃',
        cid: 338,
        source: 'Metabolite of Salicin',
        mw: 138.12,
        functionalGroups: [
            { name: 'Carboxylic Acid', symbol: '-COOH', role: 'Acidic group', effect: '⚠️ Causes stomach irritation', color: '#ef4444' },
            { name: 'Phenolic -OH', symbol: '-OH', role: 'Free hydroxyl', effect: '⚠️ Gastric bleeding risk', color: '#f97316' },
            { name: 'Benzene Ring', symbol: 'C₆H₅', role: 'Aromatic core', effect: 'Lipophilic character', color: '#6366f1' }
        ],
        color: '#ef4444',
        icon: '⚗️',
        warning: 'FREE -OH group causes stomach problems!'
    },
    {
        name: 'Aspirin',
        formula: 'C₉H₈O₄',
        cid: 2244,
        source: 'Hoffmann 1897',
        mw: 180.16,
        functionalGroups: [
            { name: 'Carboxylic Acid', symbol: '-COOH', role: 'Mild acidic group', effect: '✅ Less irritation', color: '#22c55e' },
            { name: 'Acetyl Ester', symbol: '-OCOCH₃', role: 'THE KEY!', effect: '✅ Protects stomach, blocks COX', color: '#3b82f6' },
            { name: 'Benzene Ring', symbol: 'C₆H₅', role: 'Aromatic core', effect: 'Fits COX-2 active site', color: '#8b5cf6' }
        ],
        color: '#3b82f6',
        icon: '💊',
        highlight: 'Acetyl group replaces OH = NO stomach irritation!'
    }
];

// Quiz questions for Virtual Lab
const labQuizQuestions = [
    {
        step: 1,
        question: 'Which reagent is the starting material for Aspirin synthesis?',
        options: ['Acetic Acid', 'Salicylic Acid', 'Acetone', 'Ethanol'],
        correct: 1,
        explanation: 'Salicylic Acid provides the aromatic ring with -OH and -COOH groups'
    },
    {
        step: 2,
        question: 'What reagent provides the Acetyl group (-COCH₃)?',
        options: ['Acetic Acid', 'Acetone', 'Acetic Anhydride', 'Acetaldehyde'],
        correct: 2,
        explanation: 'Acetic Anhydride (CH₃CO)₂O is the acetylating agent'
    },
    {
        step: 3,
        question: 'What is the catalyst used in this reaction?',
        options: ['Sulfuric Acid', 'Phosphoric Acid', 'Hydrochloric Acid', 'No catalyst needed'],
        correct: 1,
        explanation: 'H₃PO₄ acts as a proton donor to catalyze the esterification'
    },
    {
        step: 4,
        question: 'What is the optimal temperature for this reaction?',
        options: ['25°C (Room temp)', '50°C', '85°C', '100°C'],
        correct: 2,
        explanation: '85°C provides enough energy without decomposing the product'
    },
    {
        step: 5,
        question: 'Why do we add cold water after heating?',
        options: ['To dissolve Aspirin', 'To decompose excess Anhydride', 'To cool the flask', 'To wash impurities'],
        correct: 1,
        explanation: 'Water hydrolyzes unreacted Acetic Anhydride to Acetic Acid'
    },
    {
        step: 6,
        question: 'How do we obtain pure Aspirin crystals?',
        options: ['Evaporation', 'Distillation', 'Ice bath crystallization', 'Centrifugation'],
        correct: 2,
        explanation: 'Cooling in ice bath decreases solubility, causing crystallization'
    }
];

// Lab steps for guided mode - DETAILED INSTRUCTIONS (ENGLISH)
const labSteps = [
    {
        step: 1,
        title: 'Prepare Your Reagents',
        instruction: '**Gather your equipment:**\n\n1. ⚗️ Erlenmeyer Flask (125mL)\n2. ⚖️ Analytical balance\n3. 🧪 Graduated cylinder (10mL)\n\n**Measure precisely:**\n• Salicylic Acid: **2.0 grams** (white powder)\n• Acetic Anhydride: **5.0 mL** (colorless liquid - pungent smell!)\n• Phosphoric Acid: prepare dropper (5 drops only)',
        chemicals: ['Salicylic Acid (2g)', 'Acetic Anhydride (5mL)', 'H₃PO₄ (catalyst)'],
        safety: '🥽 Wear safety goggles and gloves! Work under fume hood.'
    },
    {
        step: 2,
        title: 'Add Salicylic Acid to Flask',
        instruction: '**Steps:**\n\n1. 📍 Place the Erlenmeyer flask on the bench\n2. 🥄 Use a clean spatula to transfer Salicylic Acid powder\n3. ⚗️ Add the 2g to the flask\n\n**Note:** The white powder will remain at the bottom - this is normal!',
        chemicals: ['Salicylic Acid (2g)'],
        safety: '⚠️ Do not inhale the powder! It irritates respiratory system.'
    },
    {
        step: 3,
        title: 'Add Acetic Anhydride',
        instruction: '**Steps:**\n\n1. 🧪 Use graduated cylinder to measure 5mL of Acetic Anhydride\n2. ⚗️ Add it **slowly** to the flask over Salicylic Acid\n3. 🔄 Swirl gently\n\n**Observe:** The powder will partially dissolve forming a suspension',
        chemicals: ['Acetic Anhydride (5mL)'],
        safety: '💨 Very pungent odor! Work under fume hood. If skin contact, wash immediately with water.'
    },
    {
        step: 4,
        title: 'Add Catalyst Drops',
        instruction: '**Steps:**\n\n1. 💧 Using dropper, add **exactly 5 drops** of H₃PO₄\n2. 🔄 Swirl the flask gently in circular motion\n\n**Why the Catalyst?**\nPhosphoric acid speeds up the reaction by donating protons (H⁺)',
        chemicals: ['5 drops H₃PO₄ (85% conc.)'],
        safety: '🔴 Concentrated acid! One drop can burn skin. Be careful!'
    },
    {
        step: 5,
        title: 'Heat in Water Bath',
        instruction: '**Steps:**\n\n1. 🌡️ Prepare water bath at **85°C** (do not exceed 90°C!)\n2. ⚗️ Place flask in water bath\n3. ⏱️ Heat for **15 minutes**, stirring every 3 minutes\n\n**Success indicators:**\n• Solution becomes completely clear\n• White powder disappears\n• Small bubbles appear',
        chemicals: [],
        safety: '🔥 Caution: Hot! Use flask tongs. Do not leave unattended.',
        temperature: 85
    },
    {
        step: 6,
        title: 'Quench with Cold Water',
        instruction: '**Steps:**\n\n1. ⏸️ Remove flask from water bath, let cool for 2 minutes\n2. 💧 Add **20mL cold water** very slowly (dropwise at first)\n3. 🔄 Swirl gently\n\n**Why cold water?**\nWater hydrolyzes excess Acetic Anhydride into Acetic Acid (harmless)\n\n**Warning:** Exothermic reaction - flask will feel warm!',
        chemicals: ['Cold distilled water (20mL)'],
        safety: '⚡ Exothermic reaction! Add water very slowly.'
    },
    {
        step: 7,
        title: 'Ice Bath Crystallization',
        instruction: '**Steps:**\n\n1. 🧊 Prepare ice bath (ice + water + salt)\n2. ⚗️ Place flask in ice bath\n3. ⏱️ Wait **10-15 minutes**\n4. 🔄 Gently swirl every 3 minutes to encourage crystallization\n\n**Success indicators:**\n• White shiny crystals appear ⬜\n• Solution becomes cloudy then crystals settle',
        chemicals: [],
        safety: '❄️ Use tongs to hold the cold flask.'
    },
    {
        step: 8,
        title: 'Vacuum Filtration',
        instruction: '**Steps:**\n\n1. 🔧 Set up vacuum filtration (Buchner Funnel)\n2. 📄 Place wet filter paper in funnel\n3. 🔌 Turn on vacuum\n4. ⚗️ Pour solution onto funnel\n5. 💧 Wash crystals with 10mL ice-cold water\n6. ⏱️ Leave vacuum on for 5 minutes to dry crystals',
        chemicals: ['Cold wash water (10mL)'],
        safety: '⚠️ Do not break vacuum before removing funnel! Crystals are fragile - do not press.'
    },
    {
        step: 9,
        title: 'Product Ready!',
        instruction: '**🎉 Congratulations! You made Aspirin!**\n\n**Quality check:**\n1. ⚖️ Weigh the dried crystals\n2. 📊 Calculate percent yield:\n   - Theoretical yield: 2.6g\n   - % Yield = (Actual ÷ 2.6) × 100%\n\n**Expected yield:** 70-90% (~1.8 - 2.3g)\n\n**Purity test (optional):**\n• Melting point: 135-136°C\n• FeCl₃ test: No purple color (means pure!)',
        chemicals: [],
        safety: '✨ Pure Aspirin crystals are white and shiny!',
        yield: '~2.3g (85-90%)'
    }
];

interface AspirinDiscoveryPanelProps {
    drugDiscovery: {
        title: string;
        subtitle?: string;
        story: { phase: string; title: string; year: string; content: string; molecule?: string; }[];
        keyInsight?: string;
        academicReference?: { title: string; author: string; quote?: string; };
    };
}

export default function AspirinDiscoveryPanel({ drugDiscovery }: AspirinDiscoveryPanelProps) {
    const [activeTab, setActiveTab] = useState<TabType>('story');
    const [selectedMolecule, setSelectedMolecule] = useState(0);
    const [hoveredFG, setHoveredFG] = useState<number | null>(null);
    const [storyPhase, setStoryPhase] = useState(0);

    // Lab state
    const [labMode, setLabMode] = useState<LabMode>('guided');
    const [labStep, setLabStep] = useState(0);
    const [quizStep, setQuizStep] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [quizComplete, setQuizComplete] = useState(false);

    const tabs = [
        { id: 'story' as const, icon: '📖', label: 'Story' },
        { id: 'molecules' as const, icon: '🧪', label: 'Molecules' },
        { id: 'simulation' as const, icon: '🎮', label: 'Simulation' },
        { id: 'lab' as const, icon: '🔬', label: 'Virtual Lab' }
    ];

    const handleQuizAnswer = (answerIdx: number) => {
        setSelectedAnswer(answerIdx);
        setShowResult(true);
        if (answerIdx === labQuizQuestions[quizStep].correct) {
            setScore(prev => prev + 1);
        }
    };

    const nextQuizQuestion = () => {
        if (quizStep < labQuizQuestions.length - 1) {
            setQuizStep(prev => prev + 1);
            setSelectedAnswer(null);
            setShowResult(false);
        } else {
            setQuizComplete(true);
        }
    };

    const restartQuiz = () => {
        setQuizStep(0);
        setSelectedAnswer(null);
        setShowResult(false);
        setScore(0);
        setQuizComplete(false);
    };

    return (
        <div style={{
            background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
            borderRadius: '20px',
            overflow: 'hidden',
            border: '1px solid rgba(59,130,246,0.2)'
        }}>
            {/* Header */}
            <div style={{
                padding: '1.25rem 1.5rem',
                background: 'linear-gradient(135deg, rgba(34,197,94,0.15), rgba(59,130,246,0.1))',
                borderBottom: '1px solid rgba(148,163,184,0.1)'
            }}>
                <h2 style={{
                    margin: 0,
                    fontSize: '1.3rem',
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #22c55e, #3b82f6)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    💊 Aspirin: From Willow Bark to Modern Medicine
                </h2>
            </div>

            {/* Tab Navigation */}
            <div style={{
                display: 'flex',
                padding: '0.75rem 1.5rem',
                background: 'rgba(0,0,0,0.3)',
                gap: '0.5rem',
                borderBottom: '1px solid rgba(148,163,184,0.1)'
            }}>
                {tabs.map(tab => (
                    <motion.button
                        key={tab.id}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                            flex: 1,
                            padding: '0.75rem',
                            background: activeTab === tab.id
                                ? 'linear-gradient(135deg, rgba(59,130,246,0.3), rgba(34,197,94,0.2))'
                                : 'transparent',
                            border: activeTab === tab.id ? '1px solid rgba(59,130,246,0.5)' : '1px solid transparent',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        <span style={{ fontSize: '1rem' }}>{tab.icon}</span>
                        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: activeTab === tab.id ? '#e2e8f0' : '#64748b' }}>
                            {tab.label}
                        </span>
                    </motion.button>
                ))}
            </div>

            {/* Content Area */}
            <div style={{ padding: '1.5rem', minHeight: '520px' }}>
                <AnimatePresence mode="wait">
                    {/* STORY TAB */}
                    {activeTab === 'story' && (
                        <motion.div key="story" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                                {drugDiscovery.story.map((phase, idx) => (
                                    <motion.button
                                        key={phase.phase}
                                        whileHover={{ scale: 1.02 }}
                                        onClick={() => setStoryPhase(idx)}
                                        style={{
                                            flex: 1,
                                            padding: '0.75rem',
                                            background: storyPhase === idx ? `rgba(${idx === 0 ? '34,197,94' : idx === 1 ? '239,68,68' : '59,130,246'},0.2)` : 'rgba(30,41,59,0.5)',
                                            border: storyPhase === idx ? `2px solid ${idx === 0 ? '#22c55e' : idx === 1 ? '#ef4444' : '#3b82f6'}` : '1px solid rgba(148,163,184,0.2)',
                                            borderRadius: '12px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <div style={{ fontSize: '1.25rem' }}>{idx === 0 ? '🌿' : idx === 1 ? '⚠️' : '✨'}</div>
                                        <div style={{ fontSize: '0.7rem', color: storyPhase === idx ? '#e2e8f0' : '#64748b', marginTop: '0.25rem' }}>{phase.year}</div>
                                    </motion.button>
                                ))}
                            </div>

                            <div style={{
                                padding: '1.5rem',
                                background: `rgba(${storyPhase === 0 ? '34,197,94' : storyPhase === 1 ? '239,68,68' : '59,130,246'},0.1)`,
                                borderRadius: '16px',
                                border: `1px solid rgba(${storyPhase === 0 ? '34,197,94' : storyPhase === 1 ? '239,68,68' : '59,130,246'},0.3)`
                            }}>
                                <h3 style={{ margin: '0 0 1rem', color: storyPhase === 0 ? '#22c55e' : storyPhase === 1 ? '#ef4444' : '#3b82f6', fontSize: '1.2rem' }}>
                                    {drugDiscovery.story[storyPhase].title}
                                </h3>
                                <p style={{ margin: 0, color: '#cbd5e1', lineHeight: 1.7 }}>{drugDiscovery.story[storyPhase].content}</p>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem' }}>
                                <button
                                    onClick={() => setStoryPhase(prev => Math.max(0, prev - 1))}
                                    disabled={storyPhase === 0}
                                    style={{ padding: '0.75rem 1.5rem', background: storyPhase === 0 ? 'rgba(30,41,59,0.5)' : 'rgba(59,130,246,0.2)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: '10px', color: storyPhase === 0 ? '#64748b' : '#60a5fa', fontWeight: 600, cursor: storyPhase === 0 ? 'not-allowed' : 'pointer' }}
                                >← Previous</button>
                                <button
                                    onClick={() => storyPhase < 2 ? setStoryPhase(prev => prev + 1) : setActiveTab('molecules')}
                                    style={{ padding: '0.75rem 1.5rem', background: 'linear-gradient(135deg, #3b82f6, #2563eb)', border: 'none', borderRadius: '10px', color: 'white', fontWeight: 600, cursor: 'pointer' }}
                                >{storyPhase < 2 ? 'Next Step →' : 'View Molecules →'}</button>
                            </div>
                        </motion.div>
                    )}

                    {/* MOLECULES TAB - Premium Cards with FG Click */}
                    {activeTab === 'molecules' && (
                        <motion.div key="molecules" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            {/* Molecule Selector */}
                            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
                                {aspirinMolecules.map((mol, idx) => (
                                    <motion.button
                                        key={mol.name}
                                        whileHover={{ scale: 1.02 }}
                                        onClick={() => setSelectedMolecule(idx)}
                                        style={{
                                            flex: 1,
                                            padding: '0.75rem',
                                            background: selectedMolecule === idx ? `${mol.color}20` : 'rgba(30,41,59,0.5)',
                                            border: selectedMolecule === idx ? `2px solid ${mol.color}` : '1px solid rgba(148,163,184,0.2)',
                                            borderRadius: '12px',
                                            cursor: 'pointer',
                                            textAlign: 'center'
                                        }}
                                    >
                                        <span style={{ fontSize: '1.5rem' }}>{mol.icon}</span>
                                        <div style={{ fontSize: '0.8rem', fontWeight: 600, color: selectedMolecule === idx ? mol.color : '#94a3b8', marginTop: '0.25rem' }}>{mol.name}</div>
                                    </motion.button>
                                ))}
                            </div>

                            {/* Selected Molecule Card */}
                            <MoleculeCard
                                name={aspirinMolecules[selectedMolecule].name}
                                formula={aspirinMolecules[selectedMolecule].formula}
                                cid={aspirinMolecules[selectedMolecule].cid}
                                mw={aspirinMolecules[selectedMolecule].mw}
                                icon={aspirinMolecules[selectedMolecule].icon}
                                color={aspirinMolecules[selectedMolecule].color}
                                functionalGroups={aspirinMolecules[selectedMolecule].functionalGroups.map(fg => ({
                                    ...fg,
                                    atoms: fg.symbol
                                }))}
                                warning={aspirinMolecules[selectedMolecule].warning}
                                highlight={aspirinMolecules[selectedMolecule].highlight}
                            />

                            <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.8rem', color: '#64748b' }}>
                                💡 Click on functional groups to highlight them in the 2D structure!
                            </p>
                        </motion.div>
                    )}

                    {/* SIMULATION TAB */}
                    {activeTab === 'simulation' && (
                        <motion.div key="simulation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <AspirinJourneySimulation />
                        </motion.div>
                    )}

                    {/* VIRTUAL LAB TAB - Quiz Mode */}
                    {activeTab === 'lab' && (
                        <motion.div key="lab" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            {/* Mode Selector */}
                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    onClick={() => setLabMode('guided')}
                                    style={{
                                        flex: 1,
                                        padding: '1rem',
                                        background: labMode === 'guided' ? 'rgba(34,197,94,0.2)' : 'rgba(30,41,59,0.5)',
                                        border: labMode === 'guided' ? '2px solid #22c55e' : '1px solid rgba(148,163,184,0.2)',
                                        borderRadius: '12px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>📖</div>
                                    <div style={{ fontWeight: 600, color: labMode === 'guided' ? '#22c55e' : '#94a3b8' }}>Guided Mode</div>
                                    <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Step-by-step instructions</div>
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    onClick={() => { setLabMode('quiz'); restartQuiz(); }}
                                    style={{
                                        flex: 1,
                                        padding: '1rem',
                                        background: labMode === 'quiz' ? 'rgba(249,115,22,0.2)' : 'rgba(30,41,59,0.5)',
                                        border: labMode === 'quiz' ? '2px solid #f97316' : '1px solid rgba(148,163,184,0.2)',
                                        borderRadius: '12px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>🎯</div>
                                    <div style={{ fontWeight: 600, color: labMode === 'quiz' ? '#f97316' : '#94a3b8' }}>Quiz Mode</div>
                                    <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Test your knowledge!</div>
                                </motion.button>
                            </div>

                            {/* GUIDED MODE */}
                            {labMode === 'guided' && (
                                <>
                                    <div style={{ marginBottom: '1rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Step {labStep + 1} of {labSteps.length}</span>
                                        </div>
                                        <div style={{ height: '6px', background: 'rgba(30,41,59,0.8)', borderRadius: '3px' }}>
                                            <motion.div animate={{ width: `${((labStep + 1) / labSteps.length) * 100}%` }} style={{ height: '100%', background: 'linear-gradient(90deg, #22c55e, #3b82f6)', borderRadius: '3px' }} />
                                        </div>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '0.8fr 1.2fr', gap: '1.5rem' }}>
                                        {/* Visual - Lab Equipment SVG */}
                                        <div style={{ height: '350px', background: 'linear-gradient(180deg, #1e3a5f, #0f172a)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(59,130,246,0.3)', position: 'relative' }}>
                                            <svg viewBox="0 0 200 200" style={{ width: '85%', height: '85%' }}>
                                                {/* Flask */}
                                                <path d="M70 45 L70 90 L35 175 L165 175 L130 90 L130 45" fill="none" stroke="#60a5fa" strokeWidth="3" />
                                                <ellipse cx="100" cy="45" rx="30" ry="8" fill="none" stroke="#60a5fa" strokeWidth="3" />
                                                {/* Contents based on step */}
                                                {labStep >= 1 && <ellipse cx="100" cy="158" rx="55" ry="14" fill="#fef3c7" opacity="0.5" />}
                                                {labStep >= 2 && <ellipse cx="100" cy="152" rx="48" ry="12" fill="#fcd34d" opacity="0.7" />}
                                                {labStep >= 4 && (
                                                    <>
                                                        <ellipse cx="100" cy="145" rx="42" ry="10" fill="#fbbf24" opacity="0.9" />
                                                        {/* Steam/bubbles */}
                                                        <circle cx="85" cy="90" r="3" fill="#93c5fd" opacity="0.6" />
                                                        <circle cx="100" cy="85" r="4" fill="#93c5fd" opacity="0.5" />
                                                        <circle cx="115" cy="92" r="3" fill="#93c5fd" opacity="0.6" />
                                                    </>
                                                )}
                                                {labStep >= 6 && (
                                                    <>
                                                        {/* Crystals */}
                                                        <polygon points="80,148 85,142 90,148 85,154" fill="white" />
                                                        <polygon points="110,152 115,146 120,152 115,158" fill="white" />
                                                        <polygon points="95,155 98,150 101,155 98,160" fill="white" />
                                                    </>
                                                )}
                                                {labStep >= 7 && (
                                                    <>
                                                        {/* Filter funnel */}
                                                        <path d="M60 20 L140 20 L100 70" fill="none" stroke="#a78bfa" strokeWidth="2" />
                                                        <text x="100" y="15" fontSize="8" fill="#a78bfa" textAnchor="middle">Vacuum Filter</text>
                                                    </>
                                                )}
                                            </svg>
                                            {/* Step indicator */}
                                            <div style={{ position: 'absolute', bottom: '10px', left: '10px', padding: '4px 10px', background: 'rgba(0,0,0,0.6)', borderRadius: '6px', fontSize: '0.7rem', color: '#94a3b8' }}>
                                                Step {labStep + 1}/{labSteps.length}
                                            </div>
                                        </div>

                                        {/* Instructions Panel - DETAILED */}
                                        <div style={{
                                            padding: '1.25rem',
                                            background: 'rgba(34,197,94,0.08)',
                                            borderRadius: '16px',
                                            border: '1px solid rgba(34,197,94,0.3)',
                                            maxHeight: '350px',
                                            overflowY: 'auto'
                                        }}>
                                            {/* Step Badge */}
                                            <div style={{ display: 'inline-flex', padding: '0.35rem 0.75rem', background: 'rgba(34,197,94,0.2)', borderRadius: '20px', marginBottom: '0.75rem' }}>
                                                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#22c55e' }}>STEP {labSteps[labStep].step} of {labSteps.length}</span>
                                            </div>

                                            {/* Title */}
                                            <h4 style={{ margin: '0 0 1rem', color: '#4ade80', fontSize: '1.15rem', fontWeight: 700 }}>{labSteps[labStep].title}</h4>

                                            {/* Detailed Instructions */}
                                            {'instruction' in labSteps[labStep] && (
                                                <div style={{
                                                    padding: '1rem',
                                                    background: 'rgba(15,23,42,0.6)',
                                                    borderRadius: '12px',
                                                    marginBottom: '1rem',
                                                    fontSize: '0.85rem',
                                                    lineHeight: 1.7,
                                                    color: '#e2e8f0',
                                                    whiteSpace: 'pre-wrap',
                                                    direction: 'ltr',
                                                    textAlign: 'left'
                                                }}>
                                                    {(labSteps[labStep] as { instruction?: string }).instruction?.split('\\n').map((line: string, i: number) => {
                                                        // Bold text
                                                        const boldLine = line.replace(/\*\*([^*]+)\*\*/g, '<strong style="color:#fbbf24">$1</strong>');
                                                        return (
                                                            <div key={i} dangerouslySetInnerHTML={{ __html: boldLine }} style={{ marginBottom: line === '' ? '0.5rem' : '0.25rem' }} />
                                                        );
                                                    })}
                                                </div>
                                            )}

                                            {/* Chemicals Tags */}
                                            {labSteps[labStep].chemicals.length > 0 && (
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                                                    {labSteps[labStep].chemicals.map((c, i) => (
                                                        <span key={i} style={{ padding: '0.4rem 0.75rem', background: 'rgba(59,130,246,0.2)', borderRadius: '8px', fontSize: '0.75rem', color: '#60a5fa', fontWeight: 500 }}>🧪 {c}</span>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Safety Warning */}
                                            {labSteps[labStep].safety && (
                                                <div style={{ padding: '0.75rem', background: 'rgba(239,68,68,0.15)', borderRadius: '10px', fontSize: '0.8rem', color: '#fca5a5', border: '1px solid rgba(239,68,68,0.3)' }}>
                                                    {labSteps[labStep].safety}
                                                </div>
                                            )}

                                            {/* Yield Info */}
                                            {labSteps[labStep].yield && (
                                                <div style={{ marginTop: '1rem', padding: '0.85rem', background: 'rgba(34,197,94,0.2)', borderRadius: '10px', textAlign: 'center', color: '#86efac', fontWeight: 600, fontSize: '1rem' }}>
                                                    🎉 Expected Yield: {labSteps[labStep].yield}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem' }}>
                                        <button onClick={() => setLabStep(prev => Math.max(0, prev - 1))} disabled={labStep === 0}
                                            style={{ padding: '0.75rem 1.5rem', background: labStep === 0 ? 'rgba(30,41,59,0.5)' : 'rgba(59,130,246,0.2)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: '10px', color: labStep === 0 ? '#64748b' : '#60a5fa', fontWeight: 600, cursor: labStep === 0 ? 'not-allowed' : 'pointer' }}>
                                            ← Previous
                                        </button>
                                        {labStep < labSteps.length - 1 ? (
                                            <button onClick={() => setLabStep(prev => prev + 1)}
                                                style={{ padding: '0.75rem 1.5rem', background: 'linear-gradient(135deg, #22c55e, #16a34a)', border: 'none', borderRadius: '10px', color: 'white', fontWeight: 600, cursor: 'pointer' }}>
                                                Next Step →
                                            </button>
                                        ) : (
                                            <button onClick={() => setLabStep(0)}
                                                style={{ padding: '0.75rem 1.5rem', background: 'linear-gradient(135deg, #3b82f6, #2563eb)', border: 'none', borderRadius: '10px', color: 'white', fontWeight: 600, cursor: 'pointer' }}>
                                                🔄 Restart
                                            </button>
                                        )}
                                    </div>
                                </>
                            )}

                            {/* QUIZ MODE - Interactive Drag-Drop */}
                            {labMode === 'quiz' && (
                                <InteractiveLabQuiz />
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
