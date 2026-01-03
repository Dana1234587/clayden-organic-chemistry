'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MDDDQuestProps {
    onComplete: () => void;
}

type GameType = 'temperature' | 'structure' | 'liver';
type GameState = 'menu' | 'playing' | 'won' | 'lost';

export default function MDDDQuest({ onComplete }: MDDDQuestProps) {
    const [currentGame, setCurrentGame] = useState<GameType | null>(null);
    const [gamesCompleted, setGamesCompleted] = useState<GameType[]>([]);

    const handleGameComplete = (game: GameType) => {
        if (!gamesCompleted.includes(game)) {
            setGamesCompleted(prev => [...prev, game]);
        }
        setCurrentGame(null);

        if (gamesCompleted.length >= 2) {
            onComplete();
        }
    };

    return (
        <div>
            {!currentGame && (
                <>
                    {/* Game Selection */}
                    <div style={{
                        textAlign: 'center',
                        marginBottom: '2rem'
                    }}>
                        <h3 style={{ color: '#f59e0b', marginBottom: '0.5rem' }}>
                            🎮 The MDDD Quest
                        </h3>
                        <p style={{ color: 'var(--neutral-400)' }}>
                            Complete all 3 mini-games to earn the Champion badge!
                        </p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '1rem'
                    }}>
                        {/* Temperature Master */}
                        <motion.button
                            whileHover={{ scale: 1.02, y: -5 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setCurrentGame('temperature')}
                            style={{
                                padding: '1.5rem',
                                background: gamesCompleted.includes('temperature')
                                    ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(5, 150, 105, 0.2) 100%)'
                                    : 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.1) 100%)',
                                border: gamesCompleted.includes('temperature')
                                    ? '2px solid #10b981'
                                    : '2px solid #3b82f6',
                                borderRadius: '20px',
                                cursor: 'pointer',
                                textAlign: 'center'
                            }}
                        >
                            <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>🧊</div>
                            <div style={{
                                color: gamesCompleted.includes('temperature') ? '#10b981' : '#3b82f6',
                                fontWeight: 700,
                                marginBottom: '0.5rem'
                            }}>
                                Temperature Master
                            </div>
                            <div style={{ color: 'var(--neutral-400)', fontSize: '0.85rem' }}>
                                Keep the reaction cool!
                            </div>
                            {gamesCompleted.includes('temperature') && (
                                <div style={{
                                    marginTop: '0.75rem',
                                    color: '#10b981',
                                    fontWeight: 600
                                }}>
                                    ✓ Completed
                                </div>
                            )}
                        </motion.button>

                        {/* Structure Matcher */}
                        <motion.button
                            whileHover={{ scale: 1.02, y: -5 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setCurrentGame('structure')}
                            style={{
                                padding: '1.5rem',
                                background: gamesCompleted.includes('structure')
                                    ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(5, 150, 105, 0.2) 100%)'
                                    : 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%)',
                                border: gamesCompleted.includes('structure')
                                    ? '2px solid #10b981'
                                    : '2px solid #8b5cf6',
                                borderRadius: '20px',
                                cursor: 'pointer',
                                textAlign: 'center'
                            }}
                        >
                            <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>🔬</div>
                            <div style={{
                                color: gamesCompleted.includes('structure') ? '#10b981' : '#8b5cf6',
                                fontWeight: 700,
                                marginBottom: '0.5rem'
                            }}>
                                Structure Matcher
                            </div>
                            <div style={{ color: 'var(--neutral-400)', fontSize: '0.85rem' }}>
                                Find the chromophore!
                            </div>
                            {gamesCompleted.includes('structure') && (
                                <div style={{
                                    marginTop: '0.75rem',
                                    color: '#10b981',
                                    fontWeight: 600
                                }}>
                                    ✓ Completed
                                </div>
                            )}
                        </motion.button>

                        {/* Liver Race */}
                        <motion.button
                            whileHover={{ scale: 1.02, y: -5 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setCurrentGame('liver')}
                            style={{
                                padding: '1.5rem',
                                background: gamesCompleted.includes('liver')
                                    ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(5, 150, 105, 0.2) 100%)'
                                    : 'linear-gradient(135deg, rgba(220, 38, 38, 0.1) 0%, rgba(185, 28, 28, 0.1) 100%)',
                                border: gamesCompleted.includes('liver')
                                    ? '2px solid #10b981'
                                    : '2px solid #dc2626',
                                borderRadius: '20px',
                                cursor: 'pointer',
                                textAlign: 'center'
                            }}
                        >
                            <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>🏃</div>
                            <div style={{
                                color: gamesCompleted.includes('liver') ? '#10b981' : '#dc2626',
                                fontWeight: 700,
                                marginBottom: '0.5rem'
                            }}>
                                Liver Race
                            </div>
                            <div style={{ color: 'var(--neutral-400)', fontSize: '0.85rem' }}>
                                Reach the liver!
                            </div>
                            {gamesCompleted.includes('liver') && (
                                <div style={{
                                    marginTop: '0.75rem',
                                    color: '#10b981',
                                    fontWeight: 600
                                }}>
                                    ✓ Completed
                                </div>
                            )}
                        </motion.button>
                    </div>

                    {/* Progress */}
                    <div style={{
                        marginTop: '2rem',
                        textAlign: 'center',
                        padding: '1rem',
                        background: 'rgba(0, 0, 0, 0.3)',
                        borderRadius: '16px'
                    }}>
                        <div style={{ color: 'var(--neutral-400)', marginBottom: '0.5rem' }}>
                            Games Completed: {gamesCompleted.length}/3
                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '0.5rem'
                        }}>
                            {[0, 1, 2].map(i => (
                                <div key={i} style={{
                                    width: 40,
                                    height: 8,
                                    borderRadius: 4,
                                    background: i < gamesCompleted.length ? '#10b981' : 'rgba(255,255,255,0.1)'
                                }} />
                            ))}
                        </div>
                    </div>
                </>
            )}

            {/* Game Components */}
            <AnimatePresence mode="wait">
                {currentGame === 'temperature' && (
                    <motion.div
                        key="temp"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                    >
                        <TemperatureMaster
                            onComplete={() => handleGameComplete('temperature')}
                            onBack={() => setCurrentGame(null)}
                        />
                    </motion.div>
                )}

                {currentGame === 'structure' && (
                    <motion.div
                        key="struct"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                    >
                        <StructureMatcher
                            onComplete={() => handleGameComplete('structure')}
                            onBack={() => setCurrentGame(null)}
                        />
                    </motion.div>
                )}

                {currentGame === 'liver' && (
                    <motion.div
                        key="liver"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                    >
                        <LiverRace
                            onComplete={() => handleGameComplete('liver')}
                            onBack={() => setCurrentGame(null)}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// ========================================
// GAME 1: Temperature Master
// ========================================
function TemperatureMaster({ onComplete, onBack }: { onComplete: () => void; onBack: () => void }) {
    const [temperature, setTemperature] = useState(3);
    const [score, setScore] = useState(0);
    const [gameState, setGameState] = useState<GameState>('menu');
    const [iceCubes, setIceCubes] = useState<{ id: number; x: number; y: number }[]>([]);
    const [timeLeft, setTimeLeft] = useState(30);

    const spawnIceCube = useCallback(() => {
        const newCube = {
            id: Date.now(),
            x: Math.random() * 80 + 10,
            y: -10
        };
        setIceCubes(prev => [...prev, newCube]);
    }, []);

    useEffect(() => {
        if (gameState !== 'playing') return;

        const tempInterval = setInterval(() => {
            setTemperature(prev => Math.min(15, prev + 0.5));
        }, 500);

        const spawnInterval = setInterval(spawnIceCube, 800);

        const timerInterval = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    setGameState('won');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            clearInterval(tempInterval);
            clearInterval(spawnInterval);
            clearInterval(timerInterval);
        };
    }, [gameState, spawnIceCube]);

    useEffect(() => {
        if (temperature >= 10 && gameState === 'playing') {
            setGameState('lost');
        }
    }, [temperature, gameState]);

    useEffect(() => {
        if (gameState !== 'playing') return;

        const fallInterval = setInterval(() => {
            setIceCubes(prev =>
                prev.map(cube => ({ ...cube, y: cube.y + 5 }))
                    .filter(cube => cube.y < 110)
            );
        }, 50);

        return () => clearInterval(fallInterval);
    }, [gameState]);

    const catchIceCube = (id: number) => {
        setIceCubes(prev => prev.filter(c => c.id !== id));
        setTemperature(prev => Math.max(0, prev - 1.5));
        setScore(prev => prev + 10);
    };

    const startGame = () => {
        setGameState('playing');
        setTemperature(3);
        setScore(0);
        setTimeLeft(30);
        setIceCubes([]);
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <button
                    onClick={onBack}
                    style={{
                        padding: '0.5rem 1rem',
                        background: 'rgba(255,255,255,0.1)',
                        border: 'none',
                        borderRadius: '8px',
                        color: 'var(--neutral-400)',
                        cursor: 'pointer'
                    }}
                >
                    ← Back
                </button>
                <h3 style={{ color: '#3b82f6', margin: 0 }}>🧊 Temperature Master</h3>
                <div style={{ color: 'var(--neutral-400)' }}>Score: {score}</div>
            </div>

            {gameState === 'menu' && (
                <div style={{ textAlign: 'center', padding: '3rem' }}>
                    <p style={{ color: 'var(--neutral-300)', marginBottom: '1.5rem' }}>
                        Click the falling ice cubes to keep the temperature below 10°C!<br />
                        Survive for 30 seconds to win!
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={startGame}
                        style={{
                            padding: '1rem 2rem',
                            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                            border: 'none',
                            borderRadius: '12px',
                            color: 'white',
                            fontWeight: 600,
                            cursor: 'pointer'
                        }}
                    >
                        Start Game!
                    </motion.button>
                </div>
            )}

            {gameState === 'playing' && (
                <>
                    {/* Stats Bar */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '1rem',
                        padding: '0.75rem 1rem',
                        background: 'rgba(0,0,0,0.3)',
                        borderRadius: '12px'
                    }}>
                        <div>
                            <span style={{ color: 'var(--neutral-400)', marginRight: '0.5rem' }}>🌡️</span>
                            <span style={{
                                color: temperature < 5 ? '#10b981' : temperature < 8 ? '#f59e0b' : '#ef4444',
                                fontWeight: 700
                            }}>
                                {temperature.toFixed(1)}°C
                            </span>
                        </div>
                        <div style={{ color: 'var(--neutral-300)' }}>
                            ⏱️ {timeLeft}s
                        </div>
                    </div>

                    {/* Game Area */}
                    <div style={{
                        height: '300px',
                        background: 'linear-gradient(180deg, #1e3a5f 0%, #0f2744 100%)',
                        borderRadius: '16px',
                        position: 'relative',
                        overflow: 'hidden',
                        border: '2px solid #3b82f6'
                    }}>
                        {iceCubes.map(cube => (
                            <motion.button
                                key={cube.id}
                                onClick={() => catchIceCube(cube.id)}
                                style={{
                                    position: 'absolute',
                                    left: `${cube.x}%`,
                                    top: `${cube.y}%`,
                                    fontSize: '2rem',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    transform: 'translate(-50%, -50%)'
                                }}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.8 }}
                            >
                                🧊
                            </motion.button>
                        ))}
                    </div>
                </>
            )}

            {gameState === 'won' && (
                <div style={{ textAlign: 'center', padding: '3rem' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🏆</div>
                    <h3 style={{ color: '#10b981', marginBottom: '1rem' }}>You Won!</h3>
                    <p style={{ color: 'var(--neutral-300)', marginBottom: '1rem' }}>
                        Score: {score} points
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onComplete}
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
                        Claim Badge! 🏅
                    </motion.button>
                </div>
            )}

            {gameState === 'lost' && (
                <div style={{ textAlign: 'center', padding: '3rem' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>💥</div>
                    <h3 style={{ color: '#ef4444', marginBottom: '1rem' }}>Temperature Too High!</h3>
                    <p style={{ color: 'var(--neutral-300)', marginBottom: '1rem' }}>
                        The diazonium salt decomposed!
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={startGame}
                        style={{
                            padding: '1rem 2rem',
                            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                            border: 'none',
                            borderRadius: '12px',
                            color: 'white',
                            fontWeight: 600,
                            cursor: 'pointer'
                        }}
                    >
                        Try Again
                    </motion.button>
                </div>
            )}
        </div>
    );
}

// ========================================
// GAME 2: Structure Matcher
// ========================================
function StructureMatcher({ onComplete, onBack }: { onComplete: () => void; onBack: () => void }) {
    const [selected, setSelected] = useState<number | null>(null);
    const [result, setResult] = useState<'correct' | 'wrong' | null>(null);

    const molecules = [
        { id: 1, name: 'Ethanol', formula: 'C₂H₆O', hasChromophore: false, color: '#64748b' },
        { id: 2, name: 'Prontosil', formula: 'N=N link', hasChromophore: true, color: '#dc2626' },
        { id: 3, name: 'Methane', formula: 'CH₄', hasChromophore: false, color: '#64748b' },
        { id: 4, name: 'Glucose', formula: 'C₆H₁₂O₆', hasChromophore: false, color: '#64748b' },
        { id: 5, name: 'Acetic Acid', formula: 'CH₃COOH', hasChromophore: false, color: '#64748b' },
    ];

    const handleSelect = (id: number) => {
        setSelected(id);
        const mol = molecules.find(m => m.id === id);
        if (mol?.hasChromophore) {
            setResult('correct');
        } else {
            setResult('wrong');
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <button
                    onClick={onBack}
                    style={{
                        padding: '0.5rem 1rem',
                        background: 'rgba(255,255,255,0.1)',
                        border: 'none',
                        borderRadius: '8px',
                        color: 'var(--neutral-400)',
                        cursor: 'pointer'
                    }}
                >
                    ← Back
                </button>
                <h3 style={{ color: '#8b5cf6', margin: 0 }}>🔬 Structure Matcher</h3>
                <div />
            </div>

            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <p style={{ color: 'var(--neutral-300)' }}>
                    Which molecule has the <strong style={{ color: '#f97316' }}>N=N chromophore</strong> that produces red color?
                </p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                gap: '0.75rem',
                marginBottom: '2rem'
            }}>
                {molecules.map(mol => (
                    <motion.button
                        key={mol.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => !result && handleSelect(mol.id)}
                        disabled={!!result}
                        style={{
                            padding: '1rem',
                            background: selected === mol.id
                                ? result === 'correct'
                                    ? 'rgba(16, 185, 129, 0.2)'
                                    : 'rgba(239, 68, 68, 0.2)'
                                : 'rgba(0, 0, 0, 0.3)',
                            border: selected === mol.id
                                ? result === 'correct'
                                    ? '2px solid #10b981'
                                    : '2px solid #ef4444'
                                : '2px solid rgba(255,255,255,0.1)',
                            borderRadius: '12px',
                            cursor: result ? 'default' : 'pointer'
                        }}
                    >
                        <div style={{
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            background: mol.color,
                            margin: '0 auto 0.5rem'
                        }} />
                        <div style={{ color: 'white', fontWeight: 600, fontSize: '0.85rem' }}>
                            {mol.name}
                        </div>
                        <div style={{ color: 'var(--neutral-500)', fontSize: '0.75rem' }}>
                            {mol.formula}
                        </div>
                    </motion.button>
                ))}
            </div>

            {result === 'correct' && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ textAlign: 'center' }}
                >
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
                    <h3 style={{ color: '#10b981', marginBottom: '1rem' }}>Correct!</h3>
                    <p style={{ color: 'var(--neutral-300)', marginBottom: '1rem' }}>
                        Prontosil has the N=N azo chromophore that creates its red color!
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onComplete}
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
                        Claim Badge! 🏅
                    </motion.button>
                </motion.div>
            )}

            {result === 'wrong' && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ textAlign: 'center' }}
                >
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>❌</div>
                    <h3 style={{ color: '#ef4444', marginBottom: '1rem' }}>Not quite!</h3>
                    <p style={{ color: 'var(--neutral-300)', marginBottom: '1rem' }}>
                        That molecule doesn&apos;t have a conjugated chromophore.
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => { setSelected(null); setResult(null); }}
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
                        Try Again
                    </motion.button>
                </motion.div>
            )}
        </div>
    );
}

// ========================================
// GAME 3: Liver Race
// ========================================
function LiverRace({ onComplete, onBack }: { onComplete: () => void; onBack: () => void }) {
    const [playerY, setPlayerY] = useState(50);
    const [obstacles, setObstacles] = useState<{ id: number; x: number; y: number; type: 'bad' | 'good' }[]>([]);
    const [distance, setDistance] = useState(0);
    const [gameState, setGameState] = useState<GameState>('menu');
    const [enzymesCollected, setEnzymesCollected] = useState(0);

    const GOAL_DISTANCE = 100;

    useEffect(() => {
        if (gameState !== 'playing') return;

        const gameLoop = setInterval(() => {
            // Move obstacles
            setObstacles(prev =>
                prev.map(o => ({ ...o, x: o.x - 5 }))
                    .filter(o => o.x > -10)
            );

            // Progress distance
            setDistance(prev => {
                if (prev >= GOAL_DISTANCE) {
                    setGameState('won');
                    return GOAL_DISTANCE;
                }
                return prev + 1;
            });
        }, 100);

        const spawnInterval = setInterval(() => {
            const newObs = {
                id: Date.now(),
                x: 100,
                y: Math.random() * 80 + 10,
                type: Math.random() > 0.6 ? 'good' as const : 'bad' as const
            };
            setObstacles(prev => [...prev, newObs]);
        }, 600);

        return () => {
            clearInterval(gameLoop);
            clearInterval(spawnInterval);
        };
    }, [gameState]);

    // Collision detection
    useEffect(() => {
        if (gameState !== 'playing') return;

        obstacles.forEach(obs => {
            if (obs.x < 20 && obs.x > 5 && Math.abs(obs.y - playerY) < 15) {
                if (obs.type === 'bad') {
                    setGameState('lost');
                } else {
                    setEnzymesCollected(prev => prev + 1);
                    setObstacles(prevObs => prevObs.filter(o => o.id !== obs.id));
                }
            }
        });
    }, [obstacles, playerY, gameState]);

    const movePlayer = (direction: 'up' | 'down') => {
        setPlayerY(prev => {
            if (direction === 'up') return Math.max(10, prev - 15);
            return Math.min(90, prev + 15);
        });
    };

    const startGame = () => {
        setGameState('playing');
        setDistance(0);
        setPlayerY(50);
        setObstacles([]);
        setEnzymesCollected(0);
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <button
                    onClick={onBack}
                    style={{
                        padding: '0.5rem 1rem',
                        background: 'rgba(255,255,255,0.1)',
                        border: 'none',
                        borderRadius: '8px',
                        color: 'var(--neutral-400)',
                        cursor: 'pointer'
                    }}
                >
                    ← Back
                </button>
                <h3 style={{ color: '#dc2626', margin: 0 }}>🏃 Liver Race</h3>
                <div style={{ color: 'var(--neutral-400)' }}>⚡ {enzymesCollected}</div>
            </div>

            {gameState === 'menu' && (
                <div style={{ textAlign: 'center', padding: '3rem' }}>
                    <p style={{ color: 'var(--neutral-300)', marginBottom: '1.5rem' }}>
                        Guide Prontosil to the liver! Avoid ❌ Excretion obstacles.<br />
                        Collect ⚡ Enzyme power-ups!
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={startGame}
                        style={{
                            padding: '1rem 2rem',
                            background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                            border: 'none',
                            borderRadius: '12px',
                            color: 'white',
                            fontWeight: 600,
                            cursor: 'pointer'
                        }}
                    >
                        Start Race!
                    </motion.button>
                </div>
            )}

            {gameState === 'playing' && (
                <>
                    {/* Progress Bar */}
                    <div style={{
                        marginBottom: '1rem',
                        padding: '0.5rem 1rem',
                        background: 'rgba(0,0,0,0.3)',
                        borderRadius: '12px'
                    }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '0.5rem',
                            color: 'var(--neutral-400)',
                            fontSize: '0.85rem'
                        }}>
                            <span>🔴 Prontosil</span>
                            <span>🫀 Liver</span>
                        </div>
                        <div style={{
                            height: '8px',
                            background: 'rgba(255,255,255,0.1)',
                            borderRadius: '4px',
                            overflow: 'hidden'
                        }}>
                            <motion.div
                                animate={{ width: `${distance}%` }}
                                style={{
                                    height: '100%',
                                    background: 'linear-gradient(90deg, #dc2626, #10b981)',
                                    borderRadius: '4px'
                                }}
                            />
                        </div>
                    </div>

                    {/* Game Area */}
                    <div style={{
                        height: '250px',
                        background: 'linear-gradient(90deg, #1f1f1f 0%, #2d1f1f 50%, #1f2d1f 100%)',
                        borderRadius: '16px',
                        position: 'relative',
                        overflow: 'hidden',
                        border: '2px solid #dc2626'
                    }}>
                        {/* Player */}
                        <motion.div
                            animate={{ top: `${playerY}%` }}
                            style={{
                                position: 'absolute',
                                left: '10%',
                                transform: 'translate(-50%, -50%)',
                                fontSize: '2rem',
                                zIndex: 10
                            }}
                        >
                            🔴
                        </motion.div>

                        {/* Obstacles */}
                        {obstacles.map(obs => (
                            <motion.div
                                key={obs.id}
                                style={{
                                    position: 'absolute',
                                    left: `${obs.x}%`,
                                    top: `${obs.y}%`,
                                    transform: 'translate(-50%, -50%)',
                                    fontSize: '1.5rem'
                                }}
                            >
                                {obs.type === 'bad' ? '❌' : '⚡'}
                            </motion.div>
                        ))}

                        {/* Goal */}
                        <div style={{
                            position: 'absolute',
                            right: 10,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            fontSize: '3rem'
                        }}>
                            🫀
                        </div>
                    </div>

                    {/* Controls */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '1rem',
                        marginTop: '1rem'
                    }}>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => movePlayer('up')}
                            style={{
                                width: 60,
                                height: 60,
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                                border: 'none',
                                color: 'white',
                                fontSize: '1.5rem',
                                cursor: 'pointer'
                            }}
                        >
                            ⬆️
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => movePlayer('down')}
                            style={{
                                width: 60,
                                height: 60,
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                                border: 'none',
                                color: 'white',
                                fontSize: '1.5rem',
                                cursor: 'pointer'
                            }}
                        >
                            ⬇️
                        </motion.button>
                    </div>
                </>
            )}

            {gameState === 'won' && (
                <div style={{ textAlign: 'center', padding: '3rem' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🫀</div>
                    <h3 style={{ color: '#10b981', marginBottom: '1rem' }}>You Reached the Liver!</h3>
                    <p style={{ color: 'var(--neutral-300)', marginBottom: '1rem' }}>
                        Enzymes collected: ⚡ {enzymesCollected}
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onComplete}
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
                        Claim Badge! 🏅
                    </motion.button>
                </div>
            )}

            {gameState === 'lost' && (
                <div style={{ textAlign: 'center', padding: '3rem' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>💀</div>
                    <h3 style={{ color: '#ef4444', marginBottom: '1rem' }}>Excreted!</h3>
                    <p style={{ color: 'var(--neutral-300)', marginBottom: '1rem' }}>
                        Prontosil was eliminated before reaching the liver!
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={startGame}
                        style={{
                            padding: '1rem 2rem',
                            background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                            border: 'none',
                            borderRadius: '12px',
                            color: 'white',
                            fontWeight: 600,
                            cursor: 'pointer'
                        }}
                    >
                        Try Again
                    </motion.button>
                </div>
            )}
        </div>
    );
}
