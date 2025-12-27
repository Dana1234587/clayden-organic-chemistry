'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MatchPair {
    id: string;
    term: string;
    definition: string;
}

interface MemoryCard {
    id: string;
    content: string;
    type: 'term' | 'definition';
    pairId: string;
    isFlipped: boolean;
    isMatched: boolean;
}

type GameType = 'matching' | 'memory' | 'sorting';

interface GameCenterProps {
    pairs: MatchPair[];
    title?: string;
}

const ORGANIC_PAIRS: MatchPair[] = [
    { id: '1', term: 'Carbon', definition: 'Element with 4 valence electrons' },
    { id: '2', term: 'Hybridization', definition: 'Mixing of atomic orbitals' },
    { id: '3', term: 'Sigma Bond', definition: 'Head-to-head orbital overlap' },
    { id: '4', term: 'Pi Bond', definition: 'Side-to-side orbital overlap' },
    { id: '5', term: 'Electronegativity', definition: 'Ability to attract electrons' },
    { id: '6', term: 'sp³ Hybrid', definition: 'Tetrahedral geometry (109.5°)' },
    { id: '7', term: 'sp² Hybrid', definition: 'Trigonal planar geometry (120°)' },
    { id: '8', term: 'sp Hybrid', definition: 'Linear geometry (180°)' },
];

export default function GameCenter({ pairs = ORGANIC_PAIRS, title = 'Chemistry Games' }: GameCenterProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedGame, setSelectedGame] = useState<GameType | null>(null);
    const [gameScore, setGameScore] = useState(0);
    const [gameComplete, setGameComplete] = useState(false);

    // Matching Game State
    const [matchingPairs, setMatchingPairs] = useState<MatchPair[]>([]);
    const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
    const [matchedPairs, setMatchedPairs] = useState<Set<string>>(new Set());
    const [wrongMatch, setWrongMatch] = useState<string | null>(null);

    // Memory Game State
    const [memoryCards, setMemoryCards] = useState<MemoryCard[]>([]);
    const [flippedCards, setFlippedCards] = useState<string[]>([]);
    const [memoryMoves, setMemoryMoves] = useState(0);

    // Initialize games
    const initMatchingGame = useCallback(() => {
        setMatchingPairs([...pairs].sort(() => Math.random() - 0.5).slice(0, 6));
        setSelectedTerm(null);
        setMatchedPairs(new Set());
        setGameScore(0);
        setGameComplete(false);
        setWrongMatch(null);
    }, [pairs]);

    const initMemoryGame = useCallback(() => {
        const gamePairs = [...pairs].sort(() => Math.random() - 0.5).slice(0, 4);
        const cards: MemoryCard[] = [];
        gamePairs.forEach(pair => {
            cards.push({ id: `${pair.id}-t`, content: pair.term, type: 'term', pairId: pair.id, isFlipped: false, isMatched: false });
            cards.push({ id: `${pair.id}-d`, content: pair.definition, type: 'definition', pairId: pair.id, isFlipped: false, isMatched: false });
        });
        setMemoryCards(cards.sort(() => Math.random() - 0.5));
        setFlippedCards([]);
        setMemoryMoves(0);
        setGameScore(0);
        setGameComplete(false);
    }, [pairs]);

    // Matching Game Logic
    const handleTermClick = (termId: string) => {
        if (matchedPairs.has(termId)) return;
        setSelectedTerm(termId);
        setWrongMatch(null);
    };

    const handleDefinitionClick = (pair: MatchPair) => {
        if (!selectedTerm || matchedPairs.has(pair.id)) return;

        if (selectedTerm === pair.id) {
            setMatchedPairs(prev => new Set(prev).add(pair.id));
            setGameScore(prev => prev + 100);
            setSelectedTerm(null);

            if (matchedPairs.size + 1 === matchingPairs.length) {
                setGameComplete(true);
            }
        } else {
            setWrongMatch(pair.id);
            setGameScore(prev => Math.max(0, prev - 25));
            setTimeout(() => setWrongMatch(null), 600);
        }
    };

    // Memory Game Logic
    const handleCardClick = (cardId: string) => {
        if (flippedCards.length === 2) return;

        const card = memoryCards.find(c => c.id === cardId);
        if (!card || card.isMatched || flippedCards.includes(cardId)) return;

        const newFlipped = [...flippedCards, cardId];
        setFlippedCards(newFlipped);
        setMemoryMoves(prev => prev + 1);

        if (newFlipped.length === 2) {
            const [first, second] = newFlipped.map(id => memoryCards.find(c => c.id === id)!);

            if (first.pairId === second.pairId) {
                setTimeout(() => {
                    setMemoryCards(prev => prev.map(c =>
                        c.pairId === first.pairId ? { ...c, isMatched: true } : c
                    ));
                    setFlippedCards([]);
                    setGameScore(prev => prev + 150);

                    const allMatched = memoryCards.filter(c => !c.isMatched).length === 2;
                    if (allMatched) setGameComplete(true);
                }, 500);
            } else {
                setTimeout(() => setFlippedCards([]), 1000);
            }
        }
    };

    // Start game
    const startGame = (game: GameType) => {
        setSelectedGame(game);
        if (game === 'matching') initMatchingGame();
        else if (game === 'memory') initMemoryGame();
    };

    const games = [
        { type: 'matching' as GameType, icon: '🔗', title: 'Match the Pairs', description: 'Connect terms with their definitions', color: '#8b5cf6' },
        { type: 'memory' as GameType, icon: '🧠', title: 'Memory Challenge', description: 'Find matching pairs by memory', color: '#10b981' },
        { type: 'sorting' as GameType, icon: '📊', title: 'Sort It Out', description: 'Arrange items in correct order', color: '#f59e0b' },
    ];

    if (!isOpen) {
        return (
            <motion.button
                onClick={() => setIsOpen(true)}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '16px 24px',
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
                    border: 'none',
                    borderRadius: '16px',
                    color: 'white',
                    fontSize: '1rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    boxShadow: '0 8px 30px rgba(139, 92, 246, 0.3)',
                    width: '100%',
                    justifyContent: 'center',
                }}
            >
                <span style={{ fontSize: '1.5rem' }}>🎮</span>
                Play Learning Games
            </motion.button>
        );
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                    position: 'fixed',
                    inset: 0,
                    background: 'rgba(0, 0, 0, 0.85)',
                    backdropFilter: 'blur(10px)',
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px',
                }}
                onClick={(e) => {
                    if (e.target === e.currentTarget) {
                        setIsOpen(false);
                        setSelectedGame(null);
                    }
                }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 50, scale: 0.9 }}
                    style={{
                        width: '100%',
                        maxWidth: '800px',
                        maxHeight: '90vh',
                        background: 'rgba(30, 30, 46, 0.98)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '24px',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    {/* Header */}
                    <div style={{
                        padding: '20px 24px',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            {selectedGame && (
                                <button
                                    onClick={() => { setSelectedGame(null); setGameComplete(false); }}
                                    style={{
                                        width: '36px', height: '36px', border: 'none', borderRadius: '10px',
                                        background: 'rgba(255, 255, 255, 0.1)', color: '#c4c4d0', cursor: 'pointer',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem'
                                    }}
                                >←</button>
                            )}
                            <h2 style={{ margin: 0, color: '#f4f4f7', fontSize: '1.3rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span>🎮</span>
                                {selectedGame ? games.find(g => g.type === selectedGame)?.title : 'Game Center'}
                            </h2>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            {selectedGame && (
                                <span style={{ color: '#f59e0b', fontWeight: 700, fontSize: '1.1rem' }}>
                                    ⭐ {gameScore} pts
                                </span>
                            )}
                            <button
                                onClick={() => { setIsOpen(false); setSelectedGame(null); }}
                                style={{
                                    width: '36px', height: '36px', border: 'none', borderRadius: '10px',
                                    background: 'rgba(255, 255, 255, 0.1)', color: '#c4c4d0', cursor: 'pointer', fontSize: '1.1rem'
                                }}
                            >✕</button>
                        </div>
                    </div>

                    {/* Content */}
                    <div style={{ flex: 1, overflow: 'auto', padding: '24px' }}>
                        <AnimatePresence mode="wait">
                            {!selectedGame ? (
                                <motion.div
                                    key="games-list"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}
                                >
                                    {games.map((game, index) => (
                                        <motion.button
                                            key={game.type}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            whileHover={{ scale: 1.03, y: -5 }}
                                            onClick={() => startGame(game.type)}
                                            disabled={game.type === 'sorting'}
                                            style={{
                                                background: `linear-gradient(135deg, ${game.color}20 0%, rgba(30, 30, 46, 0.8) 100%)`,
                                                border: `1px solid ${game.color}40`,
                                                borderRadius: '20px',
                                                padding: '28px 24px',
                                                cursor: game.type === 'sorting' ? 'not-allowed' : 'pointer',
                                                textAlign: 'left',
                                                opacity: game.type === 'sorting' ? 0.5 : 1,
                                            }}
                                        >
                                            <span style={{ fontSize: '3rem', display: 'block', marginBottom: '12px' }}>{game.icon}</span>
                                            <h3 style={{ margin: '0 0 8px', color: '#f4f4f7', fontSize: '1.1rem' }}>{game.title}</h3>
                                            <p style={{ margin: 0, color: '#9898a8', fontSize: '0.85rem' }}>{game.description}</p>
                                            {game.type === 'sorting' && (
                                                <span style={{ marginTop: '12px', display: 'inline-block', padding: '4px 12px', background: 'rgba(255,255,255,0.1)', borderRadius: '20px', fontSize: '0.75rem', color: '#6b6b7b' }}>
                                                    Coming Soon
                                                </span>
                                            )}
                                        </motion.button>
                                    ))}
                                </motion.div>
                            ) : gameComplete ? (
                                <motion.div
                                    key="complete"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    style={{ textAlign: 'center', padding: '40px 20px' }}
                                >
                                    <div style={{ fontSize: '5rem', marginBottom: '20px' }}>🎉</div>
                                    <h3 style={{ color: '#10b981', fontSize: '1.8rem', marginBottom: '12px' }}>Excellent!</h3>
                                    <p style={{ color: '#c4c4d0', fontSize: '1.1rem', marginBottom: '8px' }}>
                                        Final Score: <strong style={{ color: '#f59e0b' }}>{gameScore} points</strong>
                                    </p>
                                    {selectedGame === 'memory' && (
                                        <p style={{ color: '#9898a8', marginBottom: '24px' }}>Completed in {memoryMoves} moves</p>
                                    )}
                                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                                        <button
                                            onClick={() => startGame(selectedGame)}
                                            style={{
                                                padding: '12px 24px', border: 'none', borderRadius: '12px',
                                                background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
                                                color: 'white', fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer'
                                            }}
                                        >🔄 Play Again</button>
                                        <button
                                            onClick={() => { setSelectedGame(null); setGameComplete(false); }}
                                            style={{
                                                padding: '12px 24px', border: 'none', borderRadius: '12px',
                                                background: 'rgba(255,255,255,0.1)', color: '#c4c4d0',
                                                fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer'
                                            }}
                                        >📋 More Games</button>
                                    </div>
                                </motion.div>
                            ) : selectedGame === 'matching' ? (
                                <motion.div key="matching" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                    <p style={{ color: '#9898a8', marginBottom: '20px', textAlign: 'center' }}>
                                        Click a term, then click its matching definition
                                    </p>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                                        {/* Terms Column */}
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                            <h4 style={{ color: '#8b5cf6', margin: '0 0 8px', fontSize: '0.9rem' }}>📝 Terms</h4>
                                            {matchingPairs.map(pair => (
                                                <motion.button
                                                    key={pair.id}
                                                    onClick={() => handleTermClick(pair.id)}
                                                    whileHover={{ scale: matchedPairs.has(pair.id) ? 1 : 1.02 }}
                                                    style={{
                                                        padding: '14px 18px',
                                                        background: matchedPairs.has(pair.id) ? 'rgba(16, 185, 129, 0.2)' : selectedTerm === pair.id ? 'rgba(139, 92, 246, 0.3)' : 'rgba(255,255,255,0.05)',
                                                        border: `2px solid ${matchedPairs.has(pair.id) ? '#10b981' : selectedTerm === pair.id ? '#8b5cf6' : 'rgba(255,255,255,0.1)'}`,
                                                        borderRadius: '12px',
                                                        color: matchedPairs.has(pair.id) ? '#10b981' : '#f4f4f7',
                                                        fontSize: '0.95rem',
                                                        fontWeight: 600,
                                                        cursor: matchedPairs.has(pair.id) ? 'default' : 'pointer',
                                                        textAlign: 'left',
                                                        textDecoration: matchedPairs.has(pair.id) ? 'line-through' : 'none',
                                                        opacity: matchedPairs.has(pair.id) ? 0.6 : 1,
                                                    }}
                                                >
                                                    {matchedPairs.has(pair.id) && <span style={{ marginRight: '8px' }}>✓</span>}
                                                    {pair.term}
                                                </motion.button>
                                            ))}
                                        </div>
                                        {/* Definitions Column */}
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                            <h4 style={{ color: '#10b981', margin: '0 0 8px', fontSize: '0.9rem' }}>📖 Definitions</h4>
                                            {[...matchingPairs].sort(() => Math.random() - 0.5).map(pair => (
                                                <motion.button
                                                    key={`def-${pair.id}`}
                                                    onClick={() => handleDefinitionClick(pair)}
                                                    animate={wrongMatch === pair.id ? { x: [0, -10, 10, -10, 10, 0] } : {}}
                                                    style={{
                                                        padding: '14px 18px',
                                                        background: matchedPairs.has(pair.id) ? 'rgba(16, 185, 129, 0.2)' : wrongMatch === pair.id ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255,255,255,0.05)',
                                                        border: `2px solid ${matchedPairs.has(pair.id) ? '#10b981' : wrongMatch === pair.id ? '#ef4444' : 'rgba(255,255,255,0.1)'}`,
                                                        borderRadius: '12px',
                                                        color: matchedPairs.has(pair.id) ? '#10b981' : wrongMatch === pair.id ? '#ef4444' : '#c4c4d0',
                                                        fontSize: '0.85rem',
                                                        cursor: matchedPairs.has(pair.id) ? 'default' : 'pointer',
                                                        textAlign: 'left',
                                                        opacity: matchedPairs.has(pair.id) ? 0.6 : 1,
                                                    }}
                                                >
                                                    {matchedPairs.has(pair.id) && <span style={{ marginRight: '8px' }}>✓</span>}
                                                    {pair.definition}
                                                </motion.button>
                                            ))}
                                        </div>
                                    </div>
                                    <div style={{ marginTop: '20px', textAlign: 'center', color: '#6b6b7b', fontSize: '0.85rem' }}>
                                        Matched: {matchedPairs.size} / {matchingPairs.length}
                                    </div>
                                </motion.div>
                            ) : selectedGame === 'memory' ? (
                                <motion.div key="memory" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                        <p style={{ color: '#9898a8', margin: 0 }}>Find matching term-definition pairs</p>
                                        <span style={{ color: '#6b6b7b', fontSize: '0.85rem' }}>Moves: {memoryMoves}</span>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                                        {memoryCards.map((card, index) => (
                                            <motion.button
                                                key={card.id}
                                                onClick={() => handleCardClick(card.id)}
                                                initial={{ opacity: 0, rotateY: 180 }}
                                                animate={{
                                                    opacity: 1,
                                                    rotateY: flippedCards.includes(card.id) || card.isMatched ? 0 : 180,
                                                    scale: card.isMatched ? 0.95 : 1,
                                                }}
                                                transition={{ delay: index * 0.05 }}
                                                style={{
                                                    aspectRatio: '1',
                                                    padding: '12px',
                                                    background: card.isMatched ? 'rgba(16, 185, 129, 0.2)' : flippedCards.includes(card.id) ? (card.type === 'term' ? 'rgba(139, 92, 246, 0.2)' : 'rgba(16, 185, 129, 0.15)') : 'rgba(255,255,255,0.05)',
                                                    border: `2px solid ${card.isMatched ? '#10b981' : flippedCards.includes(card.id) ? (card.type === 'term' ? '#8b5cf6' : '#10b981') : 'rgba(255,255,255,0.1)'}`,
                                                    borderRadius: '14px',
                                                    cursor: card.isMatched ? 'default' : 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    textAlign: 'center',
                                                    fontSize: '0.75rem',
                                                    color: card.isMatched ? '#10b981' : '#f4f4f7',
                                                    fontWeight: card.type === 'term' ? 600 : 400,
                                                }}
                                            >
                                                {(flippedCards.includes(card.id) || card.isMatched) ? card.content : '❓'}
                                            </motion.button>
                                        ))}
                                    </div>
                                </motion.div>
                            ) : null}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
