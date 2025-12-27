'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface Module {
    id: string;
    title: string;
    chapterId: number;
    sectionId?: string;
    duration: string;
    completed: boolean;
}

interface LearningPath {
    id: string;
    title: string;
    description: string;
    icon: string;
    color: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    estimatedTime: string;
    modules: Module[];
}

const LEARNING_PATHS: LearningPath[] = [
    {
        id: 'fundamentals',
        title: 'Organic Chemistry Fundamentals',
        description: 'Master the building blocks: carbon chemistry, bonding, and molecular structure',
        icon: '🧪',
        color: '#8b5cf6',
        difficulty: 'Beginner',
        estimatedTime: '2 hours',
        modules: [
            { id: 'mod1', title: 'Introduction to Organic Chemistry', chapterId: 1, sectionId: 'intro', duration: '15 min', completed: false },
            { id: 'mod2', title: 'Carbon: The Essential Element', chapterId: 1, sectionId: 'carbon', duration: '20 min', completed: false },
            { id: 'mod3', title: 'Chemical Bonding Basics', chapterId: 1, sectionId: 'bonding', duration: '25 min', completed: false },
            { id: 'mod4', title: 'Molecular Geometry', chapterId: 1, sectionId: 'geometry', duration: '20 min', completed: false },
            { id: 'mod5', title: 'Practice Quiz', chapterId: 1, sectionId: 'quiz', duration: '30 min', completed: false },
        ]
    },
    {
        id: 'functional-groups',
        title: 'Functional Groups Mastery',
        description: 'Learn to identify and understand the behavior of key functional groups',
        icon: '⚗️',
        color: '#10b981',
        difficulty: 'Intermediate',
        estimatedTime: '3 hours',
        modules: [
            { id: 'fg1', title: 'What are Functional Groups?', chapterId: 2, duration: '15 min', completed: false },
            { id: 'fg2', title: 'Alcohols and Ethers', chapterId: 2, duration: '25 min', completed: false },
            { id: 'fg3', title: 'Aldehydes and Ketones', chapterId: 2, duration: '25 min', completed: false },
            { id: 'fg4', title: 'Carboxylic Acids', chapterId: 2, duration: '20 min', completed: false },
            { id: 'fg5', title: 'Amines and Amides', chapterId: 2, duration: '25 min', completed: false },
        ]
    },
    {
        id: 'reactions',
        title: 'Reaction Mechanisms Deep Dive',
        description: 'Understand how organic reactions work at the molecular level',
        icon: '🔬',
        color: '#f59e0b',
        difficulty: 'Advanced',
        estimatedTime: '4 hours',
        modules: [
            { id: 'rx1', title: 'Introduction to Mechanisms', chapterId: 3, duration: '20 min', completed: false },
            { id: 'rx2', title: 'Nucleophilic Substitution', chapterId: 3, duration: '35 min', completed: false },
            { id: 'rx3', title: 'Elimination Reactions', chapterId: 3, duration: '35 min', completed: false },
            { id: 'rx4', title: 'Addition Reactions', chapterId: 3, duration: '30 min', completed: false },
        ]
    },
];

export default function LearningPaths() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedPath, setSelectedPath] = useState<LearningPath | null>(null);
    const [paths, setPaths] = useState<LearningPath[]>(LEARNING_PATHS);

    // Load progress from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('learningPathsProgress');
        if (saved) {
            try {
                const progress = JSON.parse(saved);
                setPaths(prev => prev.map(path => ({
                    ...path,
                    modules: path.modules.map(mod => ({
                        ...mod,
                        completed: progress[path.id]?.includes(mod.id) || false
                    }))
                })));
            } catch (e) {
                console.error('Failed to load progress:', e);
            }
        }
    }, []);

    // Save progress to localStorage
    const toggleModuleComplete = (pathId: string, moduleId: string) => {
        setPaths(prev => {
            const updated = prev.map(path => {
                if (path.id !== pathId) return path;
                return {
                    ...path,
                    modules: path.modules.map(mod =>
                        mod.id === moduleId ? { ...mod, completed: !mod.completed } : mod
                    )
                };
            });

            // Save to localStorage
            const progress: Record<string, string[]> = {};
            updated.forEach(path => {
                progress[path.id] = path.modules.filter(m => m.completed).map(m => m.id);
            });
            localStorage.setItem('learningPathsProgress', JSON.stringify(progress));

            return updated;
        });
    };

    const getPathProgress = (path: LearningPath) => {
        const completed = path.modules.filter(m => m.completed).length;
        return Math.round((completed / path.modules.length) * 100);
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'Beginner': return '#10b981';
            case 'Intermediate': return '#f59e0b';
            case 'Advanced': return '#ef4444';
            default: return '#8b5cf6';
        }
    };

    const [isHovered, setIsHovered] = useState(false);

    if (!isOpen) {
        return (
            <motion.button
                onClick={() => setIsOpen(true)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{
                    opacity: 1,
                    x: 0,
                    width: isHovered ? 'auto' : '36px',
                }}
                whileTap={{ scale: 0.95 }}
                style={{
                    position: 'fixed',
                    left: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: isHovered ? '8px' : '0',
                    padding: isHovered ? '12px 16px' : '12px 10px',
                    background: 'rgba(139, 92, 246, 0.9)',
                    border: 'none',
                    borderRadius: '0 12px 12px 0',
                    color: 'white',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    boxShadow: isHovered ? '4px 4px 20px rgba(139, 92, 246, 0.4)' : '2px 2px 10px rgba(139, 92, 246, 0.2)',
                    zIndex: 100,
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.3s ease',
                }}
            >
                <span style={{ fontSize: '1rem' }}>→</span>
                {isHovered && <span>📚 Learning Paths</span>}
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
                    background: 'rgba(0, 0, 0, 0.7)',
                    backdropFilter: 'blur(8px)',
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px',
                }}
                onClick={(e) => {
                    if (e.target === e.currentTarget) {
                        setIsOpen(false);
                        setSelectedPath(null);
                    }
                }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 50, scale: 0.9 }}
                    style={{
                        width: '100%',
                        maxWidth: selectedPath ? '600px' : '900px',
                        maxHeight: '85vh',
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
                        padding: '24px',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            {selectedPath && (
                                <button
                                    onClick={() => setSelectedPath(null)}
                                    style={{
                                        width: '36px', height: '36px', border: 'none', borderRadius: '10px',
                                        background: 'rgba(255, 255, 255, 0.1)', color: '#c4c4d0', cursor: 'pointer',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem'
                                    }}
                                >←</button>
                            )}
                            <h2 style={{ margin: 0, color: '#f4f4f7', fontSize: '1.4rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span>📚</span>
                                {selectedPath ? selectedPath.title : 'Learning Paths'}
                            </h2>
                        </div>
                        <button
                            onClick={() => { setIsOpen(false); setSelectedPath(null); }}
                            style={{
                                width: '36px', height: '36px', border: 'none', borderRadius: '10px',
                                background: 'rgba(255, 255, 255, 0.1)', color: '#c4c4d0', cursor: 'pointer', fontSize: '1.1rem'
                            }}
                        >✕</button>
                    </div>

                    {/* Content */}
                    <div style={{ flex: 1, overflow: 'auto', padding: '24px' }}>
                        <AnimatePresence mode="wait">
                            {!selectedPath ? (
                                <motion.div
                                    key="paths-list"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0, x: -50 }}
                                    style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}
                                >
                                    {paths.map((path, index) => {
                                        const progress = getPathProgress(path);
                                        return (
                                            <motion.div
                                                key={path.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                whileHover={{ scale: 1.02, y: -5 }}
                                                onClick={() => setSelectedPath(path)}
                                                style={{
                                                    background: `linear-gradient(135deg, ${path.color}15 0%, rgba(30, 30, 46, 0.8) 100%)`,
                                                    border: `1px solid ${path.color}40`,
                                                    borderRadius: '20px',
                                                    padding: '24px',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.3s ease',
                                                }}
                                            >
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                                                    <span style={{ fontSize: '2.5rem' }}>{path.icon}</span>
                                                    <span style={{
                                                        padding: '4px 10px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 600,
                                                        background: `${getDifficultyColor(path.difficulty)}20`,
                                                        color: getDifficultyColor(path.difficulty),
                                                    }}>
                                                        {path.difficulty}
                                                    </span>
                                                </div>
                                                <h3 style={{ margin: '0 0 8px', color: '#f4f4f7', fontSize: '1.1rem' }}>{path.title}</h3>
                                                <p style={{ margin: '0 0 16px', color: '#9898a8', fontSize: '0.85rem', lineHeight: 1.5 }}>{path.description}</p>

                                                {/* Progress Bar */}
                                                <div style={{ marginBottom: '12px' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                                        <span style={{ color: '#c4c4d0', fontSize: '0.8rem' }}>Progress</span>
                                                        <span style={{ color: path.color, fontSize: '0.8rem', fontWeight: 600 }}>{progress}%</span>
                                                    </div>
                                                    <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${progress}%` }}
                                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                                            style={{ height: '100%', background: path.color, borderRadius: '3px' }}
                                                        />
                                                    </div>
                                                </div>

                                                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6b6b7b', fontSize: '0.75rem' }}>
                                                    <span>📖 {path.modules.length} modules</span>
                                                    <span>⏱️ {path.estimatedTime}</span>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="path-detail"
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 50 }}
                                >
                                    {/* Path Info */}
                                    <div style={{
                                        display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px',
                                        padding: '20px', background: `${selectedPath.color}10`, borderRadius: '16px',
                                        border: `1px solid ${selectedPath.color}30`
                                    }}>
                                        <span style={{ fontSize: '3rem' }}>{selectedPath.icon}</span>
                                        <div style={{ flex: 1 }}>
                                            <p style={{ margin: '0 0 8px', color: '#c4c4d0', fontSize: '0.9rem' }}>{selectedPath.description}</p>
                                            <div style={{ display: 'flex', gap: '16px', fontSize: '0.8rem' }}>
                                                <span style={{ color: getDifficultyColor(selectedPath.difficulty) }}>● {selectedPath.difficulty}</span>
                                                <span style={{ color: '#9898a8' }}>⏱️ {selectedPath.estimatedTime}</span>
                                                <span style={{ color: selectedPath.color, fontWeight: 600 }}>{getPathProgress(selectedPath)}% Complete</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Modules List */}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        {selectedPath.modules.map((module, index) => (
                                            <motion.div
                                                key={module.id}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                                style={{
                                                    display: 'flex', alignItems: 'center', gap: '16px',
                                                    padding: '16px 20px',
                                                    background: module.completed ? `${selectedPath.color}15` : 'rgba(255, 255, 255, 0.03)',
                                                    border: `1px solid ${module.completed ? selectedPath.color + '40' : 'rgba(255, 255, 255, 0.08)'}`,
                                                    borderRadius: '14px',
                                                    transition: 'all 0.3s ease',
                                                }}
                                            >
                                                {/* Checkbox */}
                                                <button
                                                    onClick={() => toggleModuleComplete(selectedPath.id, module.id)}
                                                    style={{
                                                        width: '28px', height: '28px', borderRadius: '8px', cursor: 'pointer',
                                                        border: `2px solid ${module.completed ? selectedPath.color : 'rgba(255,255,255,0.3)'}`,
                                                        background: module.completed ? selectedPath.color : 'transparent',
                                                        color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                        fontSize: '0.9rem', transition: 'all 0.2s ease',
                                                    }}
                                                >
                                                    {module.completed && '✓'}
                                                </button>

                                                {/* Module Number */}
                                                <div style={{
                                                    width: '32px', height: '32px', borderRadius: '10px',
                                                    background: `${selectedPath.color}20`, color: selectedPath.color,
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    fontWeight: 700, fontSize: '0.9rem'
                                                }}>
                                                    {index + 1}
                                                </div>

                                                {/* Module Info */}
                                                <div style={{ flex: 1 }}>
                                                    <h4 style={{
                                                        margin: 0, color: module.completed ? selectedPath.color : '#f4f4f7',
                                                        fontSize: '0.95rem', textDecoration: module.completed ? 'line-through' : 'none',
                                                        opacity: module.completed ? 0.8 : 1,
                                                    }}>
                                                        {module.title}
                                                    </h4>
                                                    <span style={{ color: '#6b6b7b', fontSize: '0.75rem' }}>{module.duration}</span>
                                                </div>

                                                {/* Go to Module */}
                                                <Link
                                                    href={`/chapter/${module.chapterId}${module.sectionId ? `#${module.sectionId}` : ''}`}
                                                    onClick={() => setIsOpen(false)}
                                                    style={{
                                                        padding: '8px 16px', borderRadius: '10px',
                                                        background: `${selectedPath.color}20`, color: selectedPath.color,
                                                        fontSize: '0.8rem', fontWeight: 600, textDecoration: 'none',
                                                        transition: 'all 0.2s ease',
                                                    }}
                                                >
                                                    Start →
                                                </Link>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
