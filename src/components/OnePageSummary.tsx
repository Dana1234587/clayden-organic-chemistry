'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SummaryCardProps {
    title: string;
    items: {
        term: string;
        definition: string;
        example?: string;
    }[];
    color?: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
    title,
    items,
    color = '#8B5CF6'
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div style={{
            background: `linear-gradient(135deg, ${color}15, ${color}08)`,
            border: `1px solid ${color}40`,
            borderRadius: '12px',
            marginBottom: '1rem',
            overflow: 'hidden',
        }}>
            {/* Header */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                style={{
                    width: '100%',
                    padding: '1rem 1.25rem',
                    background: 'transparent',
                    border: 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                }}
            >
                <span style={{
                    color: color,
                    fontWeight: 600,
                    fontSize: '1rem',
                }}>
                    📋 {title}
                </span>
                <span style={{
                    color: 'var(--neutral-400)',
                    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease',
                }}>
                    ▼
                </span>
            </button>

            {/* Content */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        style={{ overflow: 'hidden' }}
                    >
                        <div style={{
                            padding: '0 1.25rem 1.25rem',
                            display: 'grid',
                            gap: '0.75rem',
                        }}>
                            {items.map((item, index) => (
                                <div
                                    key={index}
                                    style={{
                                        background: 'rgba(0,0,0,0.2)',
                                        borderRadius: '8px',
                                        padding: '0.75rem 1rem',
                                    }}
                                >
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'flex-start',
                                        gap: '1rem',
                                    }}>
                                        <span style={{
                                            color: 'var(--neutral-100)',
                                            fontWeight: 600,
                                            fontFamily: 'monospace',
                                        }}>
                                            {item.term}
                                        </span>
                                        <span style={{
                                            color: 'var(--neutral-300)',
                                            fontSize: '0.9rem',
                                            textAlign: 'right',
                                            flex: 1,
                                        }}>
                                            {item.definition}
                                        </span>
                                    </div>
                                    {item.example && (
                                        <div style={{
                                            marginTop: '0.5rem',
                                            paddingTop: '0.5rem',
                                            borderTop: '1px solid rgba(255,255,255,0.1)',
                                            fontSize: '0.85rem',
                                            color: 'var(--neutral-400)',
                                        }}>
                                            Example: {item.example}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

interface OnePageSummaryProps {
    chapterId: number;
}

const OnePageSummary: React.FC<OnePageSummaryProps> = ({ chapterId }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Chapter 2 summary data
    const abbreviations = [
        { term: 'Me', definition: 'Methyl (-CH₃)', example: 'MeOH = Methanol' },
        { term: 'Et', definition: 'Ethyl (-CH₂CH₃)', example: 'EtOH = Ethanol' },
        { term: 'Pr', definition: 'Propyl (-CH₂CH₂CH₃)' },
        { term: 'Bu', definition: 'Butyl (4 carbons)' },
        { term: 'Ph', definition: 'Phenyl (benzene ring)', example: 'PhOH = Phenol' },
        { term: 'Bn', definition: 'Benzyl (PhCH₂-)', example: 'BnOH = Benzyl alcohol' },
        { term: 'tBu', definition: 'tert-Butyl (-C(CH₃)₃)' },
        { term: 'Ac', definition: 'Acetyl (CH₃CO-)' },
    ];

    const functionalGroups = [
        { term: 'R-OH', definition: 'Alcohol', example: 'Ethanol' },
        { term: 'R-CHO', definition: 'Aldehyde', example: 'Formaldehyde' },
        { term: 'R-CO-R', definition: 'Ketone', example: 'Acetone' },
        { term: 'R-COOH', definition: 'Carboxylic Acid', example: 'Acetic acid' },
        { term: 'R-NH₂', definition: 'Amine', example: 'Aniline' },
        { term: 'R-O-R', definition: 'Ether', example: 'Diethyl ether' },
        { term: 'R-SH', definition: 'Thiol', example: 'Methanethiol' },
        { term: 'R-COO-R', definition: 'Ester', example: 'Ethyl acetate' },
    ];

    const oxidationLevels = [
        { term: 'Level 0', definition: 'Alkanes (no heteroatom bonds)', example: 'CH₄, C₂H₆' },
        { term: 'Level 1', definition: 'Alcohols, Amines, Halides', example: 'CH₃OH' },
        { term: 'Level 2', definition: 'Aldehydes, Ketones (C=O)', example: 'CH₃CHO' },
        { term: 'Level 3', definition: 'Acids, Esters, Amides', example: 'CH₃COOH' },
        { term: 'Level 4', definition: 'CO₂, CCl₄', example: 'CO₂' },
    ];

    const trivialNames = [
        { term: 'Formaldehyde', definition: 'H-CHO (1C aldehyde)' },
        { term: 'Acetaldehyde', definition: 'CH₃-CHO (2C aldehyde)' },
        { term: 'Acetone', definition: 'CH₃-CO-CH₃ (simplest ketone)' },
        { term: 'Acetic acid', definition: 'CH₃-COOH (vinegar)' },
        { term: 'Phenol', definition: 'C₆H₅-OH (benzene + OH)' },
        { term: 'Aniline', definition: 'C₆H₅-NH₂ (benzene + NH₂)' },
    ];

    return (
        <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                    width: '100%',
                    padding: '1rem 1.5rem',
                    background: 'linear-gradient(135deg, var(--primary-500), var(--primary-600))',
                    border: 'none',
                    borderRadius: '12px',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '0.75rem',
                }}
            >
                <span>📄</span>
                <span>{isOpen ? 'Hide' : 'Show'} One-Page Summary</span>
                <span style={{
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease',
                }}>▼</span>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        style={{
                            overflow: 'hidden',
                            marginTop: '1rem',
                        }}
                    >
                        <div style={{
                            background: 'var(--gradient-card)',
                            borderRadius: '16px',
                            padding: '1.5rem',
                            border: '1px solid rgba(255,255,255,0.1)',
                        }}>
                            <h3 style={{
                                color: 'var(--neutral-100)',
                                marginBottom: '1.5rem',
                                textAlign: 'center',
                            }}>
                                📋 Chapter {chapterId} Quick Reference
                            </h3>

                            <SummaryCard title="Common Abbreviations" items={abbreviations} color="#8B5CF6" />
                            <SummaryCard title="Functional Groups" items={functionalGroups} color="#3B82F6" />
                            <SummaryCard title="Oxidation Levels" items={oxidationLevels} color="#22C55E" />
                            <SummaryCard title="Trivial Names" items={trivialNames} color="#F97316" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default OnePageSummary;
