'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProgressTrackerProps {
    sections: { id: string; title: string }[];
    currentSection: string;
    completedSections: Set<string>;
    estimatedTime: number;
}

export default function ProgressTracker({
    sections,
    currentSection,
    completedSections,
    estimatedTime
}: ProgressTrackerProps) {
    const [isExpanded, setIsExpanded] = useState(true);
    const [isVisible, setIsVisible] = useState(false);

    const completedCount = completedSections.size;
    const progressPercent = (completedCount / sections.length) * 100;
    const remainingTime = Math.ceil(estimatedTime * (1 - completedCount / sections.length));

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 300);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    style={{
                        position: 'fixed',
                        top: '100px',
                        right: '20px',
                        zIndex: 100,
                        width: isExpanded ? '280px' : '60px',
                        transition: 'width 0.3s ease'
                    }}
                >
                    <div style={{
                        background: 'var(--gradient-card)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid var(--card-border)',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
                    }}>
                        {/* Header */}
                        <div
                            onClick={() => setIsExpanded(!isExpanded)}
                            style={{
                                padding: '1rem',
                                borderBottom: isExpanded ? '1px solid var(--neutral-800)' : 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem'
                            }}
                        >
                            <div style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '50%',
                                background: `conic-gradient(var(--primary-500) ${progressPercent}%, var(--neutral-700) 0%)`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                color: 'white',
                                position: 'relative'
                            }}>
                                <div style={{
                                    position: 'absolute',
                                    width: '28px',
                                    height: '28px',
                                    borderRadius: '50%',
                                    background: 'var(--neutral-900)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    {completedCount}/{sections.length}
                                </div>
                            </div>
                            {isExpanded && (
                                <div style={{ flex: 1 }}>
                                    <div style={{
                                        fontSize: '0.875rem',
                                        fontWeight: 600,
                                        color: 'var(--neutral-100)'
                                    }}>
                                        Your Progress
                                    </div>
                                    <div style={{
                                        fontSize: '0.75rem',
                                        color: 'var(--neutral-400)'
                                    }}>
                                        ~{remainingTime} min remaining
                                    </div>
                                </div>
                            )}
                            <span style={{
                                color: 'var(--neutral-400)',
                                fontSize: '1rem'
                            }}>
                                {isExpanded ? '◀' : '▶'}
                            </span>
                        </div>

                        {/* Section List */}
                        {isExpanded && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                style={{
                                    padding: '0.5rem',
                                    maxHeight: '400px',
                                    overflowY: 'auto'
                                }}
                            >
                                {sections.map((section, index) => {
                                    const isCompleted = completedSections.has(section.id);
                                    const isCurrent = section.id === currentSection;

                                    return (
                                        <motion.div
                                            key={section.id}
                                            whileHover={{ scale: 1.02, x: 4 }}
                                            onClick={() => scrollToSection(section.id)}
                                            style={{
                                                padding: '0.75rem',
                                                borderRadius: '10px',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.75rem',
                                                background: isCurrent
                                                    ? 'rgba(139, 92, 246, 0.2)'
                                                    : 'transparent',
                                                border: isCurrent
                                                    ? '1px solid rgba(139, 92, 246, 0.4)'
                                                    : '1px solid transparent',
                                                marginBottom: '0.25rem',
                                                transition: 'all 0.2s'
                                            }}
                                        >
                                            <div style={{
                                                width: '24px',
                                                height: '24px',
                                                borderRadius: '50%',
                                                background: isCompleted
                                                    ? 'var(--accent-emerald)'
                                                    : isCurrent
                                                        ? 'var(--primary-500)'
                                                        : 'var(--neutral-700)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '0.7rem',
                                                fontWeight: 600,
                                                color: 'white'
                                            }}>
                                                {isCompleted ? '✓' : index + 1}
                                            </div>
                                            <span style={{
                                                fontSize: '0.8rem',
                                                color: isCompleted
                                                    ? 'var(--accent-emerald)'
                                                    : isCurrent
                                                        ? 'var(--neutral-100)'
                                                        : 'var(--neutral-400)',
                                                fontWeight: isCurrent ? 600 : 400,
                                                flex: 1,
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap'
                                            }}>
                                                {section.title}
                                            </span>
                                        </motion.div>
                                    );
                                })}
                            </motion.div>
                        )}

                        {/* Progress Bar */}
                        {isExpanded && (
                            <div style={{
                                padding: '0.75rem 1rem',
                                borderTop: '1px solid var(--neutral-800)'
                            }}>
                                <div style={{
                                    height: '6px',
                                    background: 'var(--neutral-800)',
                                    borderRadius: '3px',
                                    overflow: 'hidden'
                                }}>
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progressPercent}%` }}
                                        transition={{ duration: 0.5 }}
                                        style={{
                                            height: '100%',
                                            background: 'var(--gradient-primary)',
                                            borderRadius: '3px'
                                        }}
                                    />
                                </div>
                                <div style={{
                                    marginTop: '0.5rem',
                                    fontSize: '0.75rem',
                                    color: 'var(--neutral-400)',
                                    textAlign: 'center'
                                }}>
                                    {Math.round(progressPercent)}% Complete
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
