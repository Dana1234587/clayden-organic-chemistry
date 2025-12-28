'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import LayoutWrapper from '@/components/LayoutWrapper';

// Types
interface Question {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation?: string;
    difficulty: 'easy' | 'medium' | 'hard' | 'expert';
}

// QUESTIONS BY DIFFICULTY - 54 TOTAL QUESTIONS
const allQuestions: Question[] = [
    // ========== EASY (Level 1-3) - 15 Questions ==========
    { id: 'e1', difficulty: 'easy', question: 'What is the main element in organic chemistry?', options: ['Oxygen', 'Carbon', 'Nitrogen', 'Hydrogen'], correctAnswer: 1, explanation: 'Carbon is the backbone of all organic molecules.' },
    { id: 'e2', difficulty: 'easy', question: 'How many valence electrons does Carbon have?', options: ['2', '3', '4', '6'], correctAnswer: 2, explanation: 'Carbon has 4 valence electrons.' },
    { id: 'e3', difficulty: 'easy', question: 'What is the simplest organic compound?', options: ['Ethane', 'Methane', 'Propane', 'Butane'], correctAnswer: 1, explanation: 'Methane (CH₄) is the simplest.' },
    { id: 'e4', difficulty: 'easy', question: 'Organic compounds always contain which element?', options: ['Oxygen', 'Nitrogen', 'Carbon', 'Sulfur'], correctAnswer: 2, explanation: 'Carbon is essential in all organic compounds.' },
    { id: 'e5', difficulty: 'easy', question: 'What does "hydro" in hydrocarbon refer to?', options: ['Water', 'Hydrogen', 'Oxygen', 'Helium'], correctAnswer: 1, explanation: 'Hydrocarbons contain hydrogen and carbon.' },
    { id: 'e6', difficulty: 'easy', question: 'How many bonds can carbon form?', options: ['2', '3', '4', '5'], correctAnswer: 2, explanation: 'Carbon forms 4 covalent bonds.' },
    { id: 'e7', difficulty: 'easy', question: 'What is CO₂ called?', options: ['Carbon monoxide', 'Carbon dioxide', 'Carbonic acid', 'Carbonyl'], correctAnswer: 1, explanation: 'CO₂ is carbon dioxide.' },
    { id: 'e8', difficulty: 'easy', question: 'Which is NOT an organic compound?', options: ['Glucose', 'Ethanol', 'Water', 'Methane'], correctAnswer: 2, explanation: 'Water (H₂O) has no carbon.' },
    { id: 'e9', difficulty: 'easy', question: 'What is the molecular formula of ethane?', options: ['CH₄', 'C₂H₆', 'C₂H₄', 'C₃H₈'], correctAnswer: 1, explanation: 'Ethane is C₂H₆ (2 carbons, 6 hydrogens).' },
    { id: 'e10', difficulty: 'easy', question: 'Which element is most abundant in the human body?', options: ['Carbon', 'Oxygen', 'Hydrogen', 'Nitrogen'], correctAnswer: 1, explanation: 'Oxygen makes up about 65% of body mass.' },
    { id: 'e11', difficulty: 'easy', question: 'What type of bond holds atoms together in organic molecules?', options: ['Ionic', 'Covalent', 'Metallic', 'Van der Waals'], correctAnswer: 1, explanation: 'Organic molecules use covalent bonds.' },
    { id: 'e12', difficulty: 'easy', question: 'Propane has how many carbon atoms?', options: ['1', '2', '3', '4'], correctAnswer: 2, explanation: 'Prop- prefix means 3 carbons.' },
    { id: 'e13', difficulty: 'easy', question: 'What is another name for a carbon-carbon single bond?', options: ['Double bond', 'Triple bond', 'Sigma bond', 'Pi bond'], correctAnswer: 2, explanation: 'Single bonds are sigma bonds.' },
    { id: 'e14', difficulty: 'easy', question: 'Which is the smallest alkane?', options: ['Ethane', 'Methane', 'Propane', 'Pentane'], correctAnswer: 1, explanation: 'Methane has only 1 carbon.' },
    { id: 'e15', difficulty: 'easy', question: 'Organic chemistry is the study of compounds containing:', options: ['Metals', 'Carbon', 'Salts', 'Acids only'], correctAnswer: 1, explanation: 'Organic = carbon-based chemistry.' },

    // ========== MEDIUM (Level 4-6) - 15 Questions ==========
    { id: 'm1', difficulty: 'medium', question: 'What type of hybridization gives tetrahedral geometry?', options: ['sp', 'sp²', 'sp³', 'sp³d'], correctAnswer: 2, explanation: 'sp³ = tetrahedral (109.5°)' },
    { id: 'm2', difficulty: 'medium', question: 'Which bond involves side-to-side orbital overlap?', options: ['Sigma bond', 'Pi bond', 'Ionic bond', 'Metal bond'], correctAnswer: 1, explanation: 'Pi bonds form from side-to-side overlap.' },
    { id: 'm3', difficulty: 'medium', question: 'What is the bond angle in sp² hybridized carbon?', options: ['90°', '109.5°', '120°', '180°'], correctAnswer: 2, explanation: 'sp² gives 120° (trigonal planar).' },
    { id: 'm4', difficulty: 'medium', question: 'sp hybridization results in which geometry?', options: ['Tetrahedral', 'Bent', 'Linear', 'Trigonal'], correctAnswer: 2, explanation: 'sp = linear (180°)' },
    { id: 'm5', difficulty: 'medium', question: 'A double bond contains:', options: ['2 sigma bonds', '2 pi bonds', '1 sigma + 1 pi', '1 sigma only'], correctAnswer: 2, explanation: 'Double bond = 1σ + 1π' },
    { id: 'm6', difficulty: 'medium', question: 'Which hybridization has the most s-character?', options: ['sp³', 'sp²', 'sp', 'All equal'], correctAnswer: 2, explanation: 'sp has 50% s-character.' },
    { id: 'm7', difficulty: 'medium', question: 'What is the functional group -OH called?', options: ['Aldehyde', 'Ketone', 'Hydroxyl', 'Carboxyl'], correctAnswer: 2, explanation: '-OH is hydroxyl (alcohols).' },
    { id: 'm8', difficulty: 'medium', question: 'Alkanes have which general formula?', options: ['CₙH₂ₙ', 'CₙH₂ₙ₊₂', 'CₙH₂ₙ₋₂', 'CₙHₙ'], correctAnswer: 1, explanation: 'Alkanes: CₙH₂ₙ₊₂' },
    { id: 'm9', difficulty: 'medium', question: 'Which is more electronegative?', options: ['Carbon', 'Hydrogen', 'Oxygen', 'Nitrogen'], correctAnswer: 2, explanation: 'Electronegativity: O > N > C > H' },
    { id: 'm10', difficulty: 'medium', question: 'A triple bond contains:', options: ['3 sigma bonds', '1 sigma + 2 pi', '3 pi bonds', '2 sigma + 1 pi'], correctAnswer: 1, explanation: 'Triple bond = 1σ + 2π' },
    { id: 'm11', difficulty: 'medium', question: 'What functional group is -CHO?', options: ['Ketone', 'Aldehyde', 'Carboxylic acid', 'Ether'], correctAnswer: 1, explanation: '-CHO is the aldehyde group.' },
    { id: 'm12', difficulty: 'medium', question: 'Alkenes have which general formula?', options: ['CₙH₂ₙ', 'CₙH₂ₙ₊₂', 'CₙH₂ₙ₋₂', 'CₙHₙ'], correctAnswer: 0, explanation: 'Alkenes have CₙH₂ₙ (one double bond).' },
    { id: 'm13', difficulty: 'medium', question: 'The -COOH functional group is called:', options: ['Alcohol', 'Ester', 'Carboxylic acid', 'Amide'], correctAnswer: 2, explanation: '-COOH is carboxylic acid.' },
    { id: 'm14', difficulty: 'medium', question: 'Isomers have the same:', options: ['Structure', 'Molecular formula', 'Properties', 'Boiling point'], correctAnswer: 1, explanation: 'Isomers share molecular formula but differ in structure.' },
    { id: 'm15', difficulty: 'medium', question: 'What is the IUPAC suffix for alcohols?', options: ['-al', '-one', '-ol', '-ane'], correctAnswer: 2, explanation: 'Alcohols end in -ol (e.g., ethanol).' },

    // ========== HARD (Level 7-9) - 14 Questions ==========
    { id: 'h1', difficulty: 'hard', question: 'What is the IUPAC name for CH₃-CH₂-CH₂-OH?', options: ['Methanol', 'Ethanol', 'Propan-1-ol', 'Propan-2-ol'], correctAnswer: 2, explanation: '3 carbons + OH on carbon 1 = propan-1-ol' },
    { id: 'h2', difficulty: 'hard', question: 'Which reaction type is addition of H₂O to an alkene?', options: ['Substitution', 'Elimination', 'Hydration', 'Oxidation'], correctAnswer: 2, explanation: 'Hydration adds water across double bond.' },
    { id: 'h3', difficulty: 'hard', question: 'What determines if a molecule is chiral?', options: ['Double bonds', 'Ring structure', 'Non-superimposable mirror image', 'Ionic bonds'], correctAnswer: 2, explanation: 'Chirality = non-superimposable mirror images.' },
    { id: 'h4', difficulty: 'hard', question: 'E/Z isomerism occurs in molecules with:', options: ['Single bonds only', 'Restricted rotation', 'Ionic bonds', 'No carbon'], correctAnswer: 1, explanation: 'E/Z needs restricted rotation (double bonds).' },
    { id: 'h5', difficulty: 'hard', question: 'The Markovnikov rule predicts:', options: ['Position of leaving group', 'Product of addition to unsymmetrical alkene', 'Rate of reaction', 'Stereochemistry'], correctAnswer: 1, explanation: 'Markovnikov: H goes to C with more Hs.' },
    { id: 'h6', difficulty: 'hard', question: 'SN1 reactions are favored by:', options: ['Primary carbons', 'Tertiary carbons', 'Strong nucleophiles', 'Polar aprotic solvents'], correctAnswer: 1, explanation: 'SN1 favors stable carbocations (tertiary).' },
    { id: 'h7', difficulty: 'hard', question: 'What is the hybridization of carbonyl carbon?', options: ['sp³', 'sp²', 'sp', 'sp³d'], correctAnswer: 1, explanation: 'C=O carbon is sp² hybridized.' },
    { id: 'h8', difficulty: 'hard', question: 'Benzene has how many π electrons?', options: ['2', '4', '6', '8'], correctAnswer: 2, explanation: 'Benzene has 6 π electrons (aromatic).' },
    { id: 'h9', difficulty: 'hard', question: 'SN2 reactions are favored by:', options: ['Tertiary substrates', 'Weak nucleophiles', 'Primary substrates', 'Polar protic solvents'], correctAnswer: 2, explanation: 'SN2 needs accessible carbon (primary best).' },
    { id: 'h10', difficulty: 'hard', question: 'What catalyst is used in catalytic hydrogenation?', options: ['Copper', 'Palladium/Platinum', 'Iron', 'Zinc'], correctAnswer: 1, explanation: 'Pd, Pt, or Ni catalyze H₂ addition.' },
    { id: 'h11', difficulty: 'hard', question: 'Zaitsev rule predicts formation of:', options: ['Less substituted alkene', 'More substituted alkene', 'Alkyne', 'Alcohol'], correctAnswer: 1, explanation: 'Zaitsev: more stable (substituted) alkene forms.' },
    { id: 'h12', difficulty: 'hard', question: 'A carbocation with 3 alkyl groups is called:', options: ['Primary', 'Secondary', 'Tertiary', 'Quaternary'], correctAnswer: 2, explanation: '3 alkyl groups = tertiary carbocation.' },
    { id: 'h13', difficulty: 'hard', question: 'Nucleophilic addition typically occurs at:', options: ['C=C', 'C=O', 'C-C', 'C-H'], correctAnswer: 1, explanation: 'C=O is polar and electrophilic at carbon.' },
    { id: 'h14', difficulty: 'hard', question: 'Which alcohol type can be oxidized to a ketone?', options: ['Primary', 'Secondary', 'Tertiary', 'All types'], correctAnswer: 1, explanation: 'Secondary alcohols oxidize to ketones.' },

    // ========== EXPERT (Level 10+) - 10 Questions ==========
    { id: 'x1', difficulty: 'expert', question: 'Which is the rate-determining step in E1 elimination?', options: ['Proton abstraction', 'Carbocation formation', 'Leaving group departure', 'Bond formation'], correctAnswer: 1, explanation: 'E1: slow carbocation formation is RDS.' },
    { id: 'x2', difficulty: 'expert', question: 'The Diels-Alder reaction is a:', options: ['[2+2] cycloaddition', '[4+2] cycloaddition', '[3+3] cycloaddition', 'Radical reaction'], correctAnswer: 1, explanation: 'Diels-Alder is pericyclic [4+2].' },
    { id: 'x3', difficulty: 'expert', question: 'Hückel\'s rule for aromaticity requires:', options: ['4n electrons', '4n+2 electrons', '4n-2 electrons', 'Even electrons'], correctAnswer: 1, explanation: '4n+2 π electrons for aromaticity.' },
    { id: 'x4', difficulty: 'expert', question: 'Anti-Markovnikov addition occurs with:', options: ['HBr and peroxides', 'HCl alone', 'H₂O and acid', 'Grignard reagents'], correctAnswer: 0, explanation: 'HBr + ROOR gives radical mechanism.' },
    { id: 'x5', difficulty: 'expert', question: 'The Grignard reagent attacks C=O at:', options: ['Oxygen', 'Carbon', 'Both equally', 'Neither'], correctAnswer: 1, explanation: 'Nucleophilic attack at electrophilic carbon.' },
    { id: 'x6', difficulty: 'expert', question: 'Claisen condensation involves:', options: ['Aldehydes only', 'Esters', 'Alkenes', 'Alcohols'], correctAnswer: 1, explanation: 'Claisen condensation of esters forms β-keto esters.' },
    { id: 'x7', difficulty: 'expert', question: 'The Wittig reaction produces:', options: ['Alcohols', 'Ketones', 'Alkenes', 'Amines'], correctAnswer: 2, explanation: 'Wittig converts C=O to C=C using phosphorus ylide.' },
    { id: 'x8', difficulty: 'expert', question: 'Ozonolysis of alkenes produces:', options: ['Alkanes', 'Alcohols', 'Carbonyl compounds', 'Amines'], correctAnswer: 2, explanation: 'O₃ cleaves C=C to give aldehydes/ketones.' },
    { id: 'x9', difficulty: 'expert', question: 'The aldol condensation requires:', options: ['Acid catalyst only', 'α-hydrogen in ketone/aldehyde', 'Metal catalyst', 'UV light'], correctAnswer: 1, explanation: 'Aldol needs α-H for enolate formation.' },
    { id: 'x10', difficulty: 'expert', question: 'Which reagent is used for Swern oxidation?', options: ['KMnO₄', 'DMSO and oxalyl chloride', 'H₂O₂', 'PCC'], correctAnswer: 1, explanation: 'Swern uses DMSO/(COCl)₂ for mild oxidation.' },
];

// Get questions by difficulty
const getQuestionsByDifficulty = (difficulty: string): Question[] => {
    return allQuestions.filter(q => q.difficulty === difficulty);
};

// Level configuration
const LEVELS = [
    { level: 1, name: 'Beginner', difficulty: 'easy', questionsNeeded: 3, color: '#10b981', icon: '🌱' },
    { level: 2, name: 'Starter', difficulty: 'easy', questionsNeeded: 3, color: '#10b981', icon: '🌿' },
    { level: 3, name: 'Learner', difficulty: 'easy', questionsNeeded: 3, color: '#22c55e', icon: '🍀' },
    { level: 4, name: 'Student', difficulty: 'medium', questionsNeeded: 4, color: '#3b82f6', icon: '📘' },
    { level: 5, name: 'Scholar', difficulty: 'medium', questionsNeeded: 4, color: '#3b82f6', icon: '📚' },
    { level: 6, name: 'Apprentice', difficulty: 'medium', questionsNeeded: 4, color: '#6366f1', icon: '🎓' },
    { level: 7, name: 'Chemist', difficulty: 'hard', questionsNeeded: 5, color: '#8b5cf6', icon: '🧪' },
    { level: 8, name: 'Scientist', difficulty: 'hard', questionsNeeded: 5, color: '#a855f7', icon: '🔬' },
    { level: 9, name: 'Expert', difficulty: 'hard', questionsNeeded: 5, color: '#c026d3', icon: '⚗️' },
    { level: 10, name: 'Master', difficulty: 'expert', questionsNeeded: 6, color: '#f59e0b', icon: '🏆' },
    { level: 11, name: 'Legend', difficulty: 'expert', questionsNeeded: 6, color: '#ef4444', icon: '👑' },
    { level: 12, name: 'Champion', difficulty: 'expert', questionsNeeded: 6, color: '#dc2626', icon: '🌟' },
];

type GameMode = 'menu' | 'playing' | 'levelUp' | 'levelDown' | 'complete';

export default function GamesPage() {
    // Core game state
    const [gameMode, setGameMode] = useState<GameMode>('menu');
    const [currentLevel, setCurrentLevel] = useState(1);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [questionsInLevel, setQuestionsInLevel] = useState<Question[]>([]);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    // Score tracking
    const [correctInLevel, setCorrectInLevel] = useState(0);
    const [wrongInLevel, setWrongInLevel] = useState(0);
    const [totalXP, setTotalXP] = useState(0);
    const [streak, setStreak] = useState(0);
    const [hearts, setHearts] = useState(5);
    const [highestLevel, setHighestLevel] = useState(1);

    // Animations
    const [showXpGain, setShowXpGain] = useState(0);
    const [showLevelAnimation, setShowLevelAnimation] = useState<'up' | 'down' | null>(null);

    // Get current level config
    const getCurrentLevelConfig = () => LEVELS.find(l => l.level === currentLevel) || LEVELS[0];

    // Start level
    const startLevel = (level: number) => {
        const levelConfig = LEVELS.find(l => l.level === level) || LEVELS[0];
        const difficultyQuestions = getQuestionsByDifficulty(levelConfig.difficulty);

        // Shuffle and pick questions
        const shuffled = [...difficultyQuestions].sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, levelConfig.questionsNeeded);

        setQuestionsInLevel(selected);
        setCurrentQuestionIndex(0);
        setCorrectInLevel(0);
        setWrongInLevel(0);
        setSelectedAnswer(null);
        setIsCorrect(null);
        setGameMode('playing');
    };

    // Start game
    const startGame = () => {
        setCurrentLevel(1);
        setHearts(5);
        setTotalXP(0);
        setStreak(0);
        startLevel(1);
    };

    // Continue from current level
    const continueGame = () => {
        startLevel(currentLevel);
    };

    // Handle answer
    const handleAnswer = (answerIndex: number) => {
        if (selectedAnswer !== null) return;
        setSelectedAnswer(answerIndex);

        const q = questionsInLevel[currentQuestionIndex];
        const correct = answerIndex === q.correctAnswer;
        setIsCorrect(correct);

        if (correct) {
            const xpGain = currentLevel * 10 + (streak * 5);
            setTotalXP(prev => prev + xpGain);
            setShowXpGain(xpGain);
            setStreak(prev => prev + 1);
            setCorrectInLevel(prev => prev + 1);
            setTimeout(() => setShowXpGain(0), 1500);
        } else {
            setStreak(0);
            setWrongInLevel(prev => prev + 1);
            setHearts(prev => Math.max(0, prev - 1));
        }
    };

    // Next question
    const nextQuestion = () => {
        const levelConfig = getCurrentLevelConfig();

        // Check if level completed
        if (currentQuestionIndex >= questionsInLevel.length - 1) {
            // Evaluate level performance
            const passRate = correctInLevel / questionsInLevel.length;

            if (passRate >= 0.7) {
                // Level up!
                if (currentLevel < LEVELS.length) {
                    setShowLevelAnimation('up');
                    setTimeout(() => {
                        setCurrentLevel(prev => {
                            const newLevel = Math.min(prev + 1, LEVELS.length);
                            setHighestLevel(h => Math.max(h, newLevel));
                            return newLevel;
                        });
                        setShowLevelAnimation(null);
                        setGameMode('levelUp');
                    }, 1500);
                } else {
                    setGameMode('complete');
                }
            } else if (passRate < 0.5 && currentLevel > 1) {
                // Level down
                setShowLevelAnimation('down');
                setTimeout(() => {
                    setCurrentLevel(prev => Math.max(1, prev - 1));
                    setShowLevelAnimation(null);
                    setGameMode('levelDown');
                }, 1500);
            } else {
                // Stay at same level, retry
                setGameMode('levelDown');
            }
        } else if (hearts === 0) {
            setGameMode('complete');
        } else {
            setCurrentQuestionIndex(prev => prev + 1);
            setSelectedAnswer(null);
            setIsCorrect(null);
        }
    };

    // Restart
    const restartGame = () => {
        setHearts(5);
        setTotalXP(0);
        setStreak(0);
        setCurrentLevel(1);
        setGameMode('menu');
    };

    const levelConfig = getCurrentLevelConfig();
    const currentQuestion = questionsInLevel[currentQuestionIndex];

    return (
        <LayoutWrapper>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                {/* Back Button */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    style={{ marginBottom: '1rem' }}
                >
                    <Link
                        href="/"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            color: 'var(--primary-400)',
                            textDecoration: 'none',
                            fontSize: '0.95rem',
                            fontWeight: 500,
                            padding: '0.5rem 1rem',
                            background: 'rgba(139, 92, 246, 0.1)',
                            borderRadius: '10px',
                            border: '1px solid rgba(139, 92, 246, 0.2)',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        ← Back to Home
                    </Link>
                </motion.div>

                {/* Header */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '24px',
                    flexWrap: 'wrap',
                    gap: '16px'
                }}>
                    <div>
                        <h1 style={{
                            fontSize: '1.8rem',
                            margin: 0,
                            background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>
                            🎮 Chemistry Quest
                        </h1>
                        <p style={{ color: 'var(--neutral-400)', margin: '4px 0 0', fontSize: '0.9rem' }}>
                            Level up by answering correctly • Level down on mistakes
                        </p>
                    </div>

                    {/* Stats Bar */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        padding: '10px 16px',
                        background: 'rgba(255,255,255,0.05)',
                        borderRadius: '50px',
                        border: '1px solid rgba(255,255,255,0.1)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span>⭐</span>
                            <span style={{ color: '#f59e0b', fontWeight: 700 }}>{totalXP}</span>
                        </div>
                        <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.1)' }} />
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span>🔥</span>
                            <span style={{ color: '#f43f5e', fontWeight: 700 }}>{streak}</span>
                        </div>
                        <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.1)' }} />
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            {[...Array(5)].map((_, i) => (
                                <span key={i} style={{ fontSize: '0.9rem', opacity: i < hearts ? 1 : 0.3 }}>❤️</span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* XP Gain Animation */}
                <AnimatePresence>
                    {showXpGain > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.5 }}
                            animate={{ opacity: 1, y: -30, scale: 1 }}
                            exit={{ opacity: 0, y: -60 }}
                            style={{
                                position: 'fixed',
                                top: '120px',
                                right: '50%',
                                transform: 'translateX(50%)',
                                padding: '12px 24px',
                                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                                borderRadius: '50px',
                                color: 'white',
                                fontWeight: 700,
                                fontSize: '1.3rem',
                                zIndex: 100,
                                boxShadow: '0 10px 40px rgba(245, 158, 11, 0.5)'
                            }}
                        >
                            +{showXpGain} XP ⭐
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Level Animation */}
                <AnimatePresence>
                    {showLevelAnimation && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            style={{
                                position: 'fixed',
                                inset: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: 'rgba(0,0,0,0.8)',
                                zIndex: 200
                            }}
                        >
                            <motion.div
                                animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 0.5 }}
                                style={{
                                    fontSize: '6rem',
                                    textAlign: 'center'
                                }}
                            >
                                {showLevelAnimation === 'up' ? '🎉' : '😅'}
                                <div style={{
                                    fontSize: '2rem',
                                    color: showLevelAnimation === 'up' ? '#10b981' : '#f59e0b',
                                    fontWeight: 700,
                                    marginTop: '16px'
                                }}>
                                    {showLevelAnimation === 'up' ? 'LEVEL UP!' : 'Try Again!'}
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Main Content */}
                <div style={{
                    background: 'var(--gradient-card)',
                    borderRadius: '24px',
                    border: '1px solid var(--card-border)',
                    overflow: 'hidden',
                    minHeight: '500px'
                }}>
                    <AnimatePresence mode="wait">
                        {/* MENU */}
                        {gameMode === 'menu' && (
                            <motion.div
                                key="menu"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                style={{ padding: '32px' }}
                            >
                                {/* Level Path */}
                                <h2 style={{
                                    color: 'var(--neutral-100)',
                                    fontSize: '1.3rem',
                                    marginBottom: '24px',
                                    textAlign: 'center'
                                }}>
                                    🗺️ Your Journey
                                </h2>

                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(4, 1fr)',
                                    gap: '12px',
                                    marginBottom: '32px'
                                }}>
                                    {LEVELS.map((level, idx) => (
                                        <motion.div
                                            key={level.level}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                            style={{
                                                padding: '16px 12px',
                                                background: currentLevel === level.level
                                                    ? `linear-gradient(135deg, ${level.color}30, ${level.color}10)`
                                                    : level.level <= highestLevel
                                                        ? 'rgba(255,255,255,0.05)'
                                                        : 'rgba(255,255,255,0.02)',
                                                border: `2px solid ${currentLevel === level.level ? level.color : 'transparent'}`,
                                                borderRadius: '16px',
                                                textAlign: 'center',
                                                opacity: level.level <= highestLevel ? 1 : 0.5
                                            }}
                                        >
                                            <div style={{ fontSize: '1.8rem', marginBottom: '4px' }}>
                                                {level.level <= highestLevel ? level.icon : '🔒'}
                                            </div>
                                            <div style={{
                                                fontSize: '0.7rem',
                                                color: level.level === currentLevel ? level.color : 'var(--neutral-400)',
                                                fontWeight: 600
                                            }}>
                                                LVL {level.level}
                                            </div>
                                            <div style={{
                                                fontSize: '0.65rem',
                                                color: 'var(--neutral-500)',
                                                marginTop: '2px'
                                            }}>
                                                {level.name}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Current Level Info */}
                                <div style={{
                                    padding: '24px',
                                    background: `linear-gradient(135deg, ${levelConfig.color}20, rgba(30, 30, 46, 0.8))`,
                                    borderRadius: '20px',
                                    border: `1px solid ${levelConfig.color}40`,
                                    textAlign: 'center',
                                    marginBottom: '24px'
                                }}>
                                    <div style={{ fontSize: '3rem', marginBottom: '12px' }}>{levelConfig.icon}</div>
                                    <h3 style={{
                                        color: levelConfig.color,
                                        fontSize: '1.5rem',
                                        margin: '0 0 8px'
                                    }}>
                                        Level {currentLevel}: {levelConfig.name}
                                    </h3>
                                    <p style={{ color: 'var(--neutral-400)', margin: 0, fontSize: '0.9rem' }}>
                                        Difficulty: <strong style={{ color: levelConfig.color, textTransform: 'capitalize' }}>{levelConfig.difficulty}</strong>
                                        <br />
                                        Answer {levelConfig.questionsNeeded} questions • Get 70%+ to level up
                                    </p>
                                </div>

                                {/* Start Button */}
                                <motion.button
                                    onClick={currentLevel === 1 && totalXP === 0 ? startGame : continueGame}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    style={{
                                        width: '100%',
                                        padding: '18px',
                                        background: `linear-gradient(135deg, ${levelConfig.color}, ${levelConfig.color}cc)`,
                                        border: 'none',
                                        borderRadius: '16px',
                                        color: 'white',
                                        fontSize: '1.2rem',
                                        fontWeight: 700,
                                        cursor: 'pointer',
                                        boxShadow: `0 8px 30px ${levelConfig.color}40`
                                    }}
                                >
                                    {currentLevel === 1 && totalXP === 0 ? '🚀 Start Quest' : '▶️ Continue Level ' + currentLevel}
                                </motion.button>

                                {/* Tips */}
                                <div style={{
                                    marginTop: '24px',
                                    padding: '16px 20px',
                                    background: 'rgba(139, 92, 246, 0.1)',
                                    borderRadius: '12px',
                                    border: '1px solid rgba(139, 92, 246, 0.2)'
                                }}>
                                    <h4 style={{ color: '#a78bfa', margin: '0 0 8px', fontSize: '0.85rem' }}>💡 How it works</h4>
                                    <ul style={{
                                        margin: 0,
                                        paddingLeft: '16px',
                                        color: 'var(--neutral-400)',
                                        fontSize: '0.8rem',
                                        lineHeight: 1.8
                                    }}>
                                        <li><strong style={{ color: '#10b981' }}>70%+ correct</strong> → Level up to harder questions</li>
                                        <li><strong style={{ color: '#f59e0b' }}>Below 50%</strong> → Level down for more practice</li>
                                        <li>Build <strong style={{ color: '#f43f5e' }}>streaks</strong> for bonus XP!</li>
                                    </ul>
                                </div>
                            </motion.div>
                        )}

                        {/* PLAYING */}
                        {gameMode === 'playing' && currentQuestion && (
                            <motion.div
                                key={`q-${currentQuestionIndex}`}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                style={{ padding: '24px' }}
                            >
                                {/* Level & Progress */}
                                <div style={{ marginBottom: '20px' }}>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        marginBottom: '12px'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <span style={{ fontSize: '1.5rem' }}>{levelConfig.icon}</span>
                                            <div>
                                                <div style={{
                                                    color: levelConfig.color,
                                                    fontWeight: 700,
                                                    fontSize: '0.9rem'
                                                }}>
                                                    Level {currentLevel}: {levelConfig.name}
                                                </div>
                                                <div style={{
                                                    color: 'var(--neutral-500)',
                                                    fontSize: '0.75rem'
                                                }}>
                                                    {levelConfig.difficulty.toUpperCase()} • Question {currentQuestionIndex + 1}/{questionsInLevel.length}
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{
                                            display: 'flex',
                                            gap: '12px',
                                            fontSize: '0.85rem'
                                        }}>
                                            <span style={{ color: '#10b981' }}>✓ {correctInLevel}</span>
                                            <span style={{ color: '#ef4444' }}>✗ {wrongInLevel}</span>
                                        </div>
                                    </div>

                                    {/* Progress bar */}
                                    <div style={{
                                        height: '8px',
                                        background: 'var(--neutral-800)',
                                        borderRadius: '4px',
                                        overflow: 'hidden'
                                    }}>
                                        <motion.div
                                            animate={{ width: `${((currentQuestionIndex + 1) / questionsInLevel.length) * 100}%` }}
                                            style={{
                                                height: '100%',
                                                background: `linear-gradient(90deg, ${levelConfig.color}, ${levelConfig.color}88)`,
                                                borderRadius: '4px'
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Question */}
                                <h2 style={{
                                    fontSize: '1.4rem',
                                    color: 'var(--neutral-100)',
                                    marginBottom: '28px',
                                    lineHeight: 1.5
                                }}>
                                    {currentQuestion.question}
                                </h2>

                                {/* Options */}
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
                                    {currentQuestion.options.map((option, index) => {
                                        const isSelected = selectedAnswer === index;
                                        const isCorrectAnswer = index === currentQuestion.correctAnswer;
                                        const showResult = selectedAnswer !== null;

                                        let bgColor = 'rgba(255,255,255,0.05)';
                                        let borderColor = 'rgba(255,255,255,0.1)';
                                        let textColor = 'var(--neutral-100)';

                                        if (showResult) {
                                            if (isCorrectAnswer) {
                                                bgColor = 'rgba(16, 185, 129, 0.2)';
                                                borderColor = '#10b981';
                                                textColor = '#10b981';
                                            } else if (isSelected) {
                                                bgColor = 'rgba(239, 68, 68, 0.2)';
                                                borderColor = '#ef4444';
                                                textColor = '#ef4444';
                                            }
                                        }

                                        return (
                                            <motion.button
                                                key={index}
                                                onClick={() => handleAnswer(index)}
                                                disabled={selectedAnswer !== null}
                                                whileHover={selectedAnswer === null ? { scale: 1.02, y: -4 } : {}}
                                                whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
                                                style={{
                                                    padding: '18px 20px',
                                                    background: bgColor,
                                                    border: `2px solid ${borderColor}`,
                                                    borderRadius: '14px',
                                                    color: textColor,
                                                    fontSize: '1rem',
                                                    fontWeight: 500,
                                                    cursor: selectedAnswer === null ? 'pointer' : 'default',
                                                    textAlign: 'left',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '12px'
                                                }}
                                            >
                                                <span style={{
                                                    width: '30px',
                                                    height: '30px',
                                                    borderRadius: '8px',
                                                    background: showResult && isCorrectAnswer ? '#10b981' : 'rgba(255,255,255,0.1)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontSize: '0.85rem',
                                                    fontWeight: 700,
                                                    flexShrink: 0
                                                }}>
                                                    {showResult && isCorrectAnswer ? '✓' : String.fromCharCode(65 + index)}
                                                </span>
                                                {option}
                                            </motion.button>
                                        );
                                    })}
                                </div>

                                {/* Explanation */}
                                <AnimatePresence>
                                    {selectedAnswer !== null && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            style={{
                                                marginTop: '20px',
                                                padding: '16px 20px',
                                                background: isCorrect ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                                borderRadius: '14px',
                                                border: `1px solid ${isCorrect ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                                            }}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                                                <span style={{ fontSize: '1.3rem' }}>{isCorrect ? '🎉' : '💡'}</span>
                                                <strong style={{ color: isCorrect ? '#10b981' : '#f59e0b' }}>
                                                    {isCorrect ? 'Correct!' : 'Not quite!'}
                                                </strong>
                                            </div>
                                            <p style={{ color: 'var(--neutral-300)', margin: 0, fontSize: '0.9rem' }}>
                                                {currentQuestion.explanation}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Continue Button */}
                                {selectedAnswer !== null && (
                                    <motion.button
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        onClick={nextQuestion}
                                        style={{
                                            marginTop: '20px',
                                            width: '100%',
                                            padding: '16px',
                                            background: `linear-gradient(135deg, ${levelConfig.color}, ${levelConfig.color}aa)`,
                                            border: 'none',
                                            borderRadius: '12px',
                                            color: 'white',
                                            fontSize: '1.1rem',
                                            fontWeight: 600,
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Continue →
                                    </motion.button>
                                )}
                            </motion.div>
                        )}

                        {/* LEVEL UP */}
                        {gameMode === 'levelUp' && (
                            <motion.div
                                key="levelup"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                style={{ padding: '40px', textAlign: 'center' }}
                            >
                                <motion.div
                                    animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                    style={{ fontSize: '5rem', marginBottom: '20px' }}
                                >
                                    {levelConfig.icon}
                                </motion.div>
                                <h2 style={{ color: '#10b981', fontSize: '2rem', marginBottom: '8px' }}>
                                    🎉 Level Up!
                                </h2>
                                <p style={{ color: 'var(--neutral-300)', marginBottom: '24px', fontSize: '1.1rem' }}>
                                    You reached <strong style={{ color: levelConfig.color }}>Level {currentLevel}: {levelConfig.name}</strong>
                                </p>
                                <p style={{ color: 'var(--neutral-400)', marginBottom: '32px' }}>
                                    Get ready for <strong style={{ color: levelConfig.color, textTransform: 'capitalize' }}>{levelConfig.difficulty}</strong> questions!
                                </p>
                                <motion.button
                                    onClick={continueGame}
                                    whileHover={{ scale: 1.02 }}
                                    style={{
                                        padding: '16px 48px',
                                        background: `linear-gradient(135deg, ${levelConfig.color}, ${levelConfig.color}cc)`,
                                        border: 'none',
                                        borderRadius: '14px',
                                        color: 'white',
                                        fontSize: '1.1rem',
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                        boxShadow: `0 8px 30px ${levelConfig.color}40`
                                    }}
                                >
                                    🚀 Start Level {currentLevel}
                                </motion.button>
                            </motion.div>
                        )}

                        {/* LEVEL DOWN / RETRY */}
                        {gameMode === 'levelDown' && (
                            <motion.div
                                key="leveldown"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                style={{ padding: '40px', textAlign: 'center' }}
                            >
                                <div style={{ fontSize: '4rem', marginBottom: '20px' }}>💪</div>
                                <h2 style={{ color: '#f59e0b', fontSize: '1.8rem', marginBottom: '12px' }}>
                                    Keep Practicing!
                                </h2>
                                <p style={{ color: 'var(--neutral-300)', marginBottom: '32px' }}>
                                    {currentLevel === 1
                                        ? "Let's try again and get that 70%!"
                                        : `You're now at Level ${currentLevel}. Practice more to level up!`
                                    }
                                </p>
                                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                                    <motion.button
                                        onClick={continueGame}
                                        whileHover={{ scale: 1.02 }}
                                        style={{
                                            padding: '14px 32px',
                                            background: `linear-gradient(135deg, ${levelConfig.color}, ${levelConfig.color}cc)`,
                                            border: 'none',
                                            borderRadius: '12px',
                                            color: 'white',
                                            fontSize: '1rem',
                                            fontWeight: 600,
                                            cursor: 'pointer'
                                        }}
                                    >
                                        🔄 Try Again
                                    </motion.button>
                                    <motion.button
                                        onClick={restartGame}
                                        whileHover={{ scale: 1.02 }}
                                        style={{
                                            padding: '14px 32px',
                                            background: 'rgba(255,255,255,0.1)',
                                            border: '1px solid rgba(255,255,255,0.2)',
                                            borderRadius: '12px',
                                            color: 'var(--neutral-300)',
                                            fontSize: '1rem',
                                            fontWeight: 600,
                                            cursor: 'pointer'
                                        }}
                                    >
                                        🏠 Main Menu
                                    </motion.button>
                                </div>
                            </motion.div>
                        )}

                        {/* COMPLETE (no hearts or max level) */}
                        {gameMode === 'complete' && (
                            <motion.div
                                key="complete"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                style={{ padding: '40px', textAlign: 'center' }}
                            >
                                <div style={{ fontSize: '5rem', marginBottom: '20px' }}>
                                    {hearts === 0 ? '💔' : '🏆'}
                                </div>
                                <h2 style={{
                                    color: hearts === 0 ? '#ef4444' : '#f59e0b',
                                    fontSize: '2rem',
                                    marginBottom: '16px'
                                }}>
                                    {hearts === 0 ? 'Game Over!' : 'Champion!'}
                                </h2>

                                {/* Stats */}
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(3, 1fr)',
                                    gap: '16px',
                                    maxWidth: '400px',
                                    margin: '0 auto 32px'
                                }}>
                                    <div style={{
                                        padding: '20px',
                                        background: 'rgba(139, 92, 246, 0.1)',
                                        borderRadius: '16px'
                                    }}>
                                        <div style={{ fontSize: '1.3rem' }}>⭐</div>
                                        <div style={{ color: '#a78bfa', fontWeight: 700, fontSize: '1.5rem' }}>{totalXP}</div>
                                        <div style={{ color: 'var(--neutral-500)', fontSize: '0.75rem' }}>Total XP</div>
                                    </div>
                                    <div style={{
                                        padding: '20px',
                                        background: 'rgba(16, 185, 129, 0.1)',
                                        borderRadius: '16px'
                                    }}>
                                        <div style={{ fontSize: '1.3rem' }}>{levelConfig.icon}</div>
                                        <div style={{ color: '#10b981', fontWeight: 700, fontSize: '1.5rem' }}>{currentLevel}</div>
                                        <div style={{ color: 'var(--neutral-500)', fontSize: '0.75rem' }}>Level</div>
                                    </div>
                                    <div style={{
                                        padding: '20px',
                                        background: 'rgba(245, 158, 11, 0.1)',
                                        borderRadius: '16px'
                                    }}>
                                        <div style={{ fontSize: '1.3rem' }}>🏅</div>
                                        <div style={{ color: '#f59e0b', fontWeight: 700, fontSize: '1.5rem' }}>{highestLevel}</div>
                                        <div style={{ color: 'var(--neutral-500)', fontSize: '0.75rem' }}>Highest</div>
                                    </div>
                                </div>

                                <motion.button
                                    onClick={restartGame}
                                    whileHover={{ scale: 1.02 }}
                                    style={{
                                        padding: '16px 40px',
                                        background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
                                        border: 'none',
                                        borderRadius: '14px',
                                        color: 'white',
                                        fontSize: '1.1rem',
                                        fontWeight: 600,
                                        cursor: 'pointer'
                                    }}
                                >
                                    🎮 Play Again
                                </motion.button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Back button during game */}
                {gameMode === 'playing' && (
                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={() => setGameMode('menu')}
                        style={{
                            marginTop: '16px',
                            padding: '12px 20px',
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '12px',
                            color: 'var(--neutral-400)',
                            fontSize: '0.9rem',
                            cursor: 'pointer'
                        }}
                    >
                        ← Exit to Menu
                    </motion.button>
                )}
            </div>
        </LayoutWrapper>
    );
}
