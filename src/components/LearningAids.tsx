'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ExamTipProps {
    children: React.ReactNode;
}

export const ExamTip: React.FC<ExamTipProps> = ({ children }) => (
    <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        style={{
            background: 'linear-gradient(135deg, rgba(234, 179, 8, 0.15), rgba(234, 179, 8, 0.05))',
            borderLeft: '4px solid #EAB308',
            borderRadius: '0 12px 12px 0',
            padding: '1rem 1.25rem',
            marginTop: '1rem',
            marginBottom: '1rem',
        }}
    >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.2rem' }}>📝</span>
            <div>
                <p style={{
                    color: '#EAB308',
                    fontWeight: 600,
                    marginBottom: '0.25rem',
                    fontSize: '0.9rem',
                }}>
                    EXAM TIP
                </p>
                <p style={{
                    color: 'var(--neutral-200)',
                    margin: 0,
                    fontSize: '0.95rem',
                    lineHeight: 1.6,
                }}>
                    {children}
                </p>
            </div>
        </div>
    </motion.div>
);

interface PlainEnglishProps {
    technical: string;
    simple: string;
}

export const PlainEnglish: React.FC<PlainEnglishProps> = ({ technical, simple }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
            background: 'rgba(59, 130, 246, 0.1)',
            borderRadius: '12px',
            padding: '1rem 1.25rem',
            marginTop: '1rem',
            marginBottom: '1rem',
            border: '1px solid rgba(59, 130, 246, 0.2)',
        }}
    >
        <div style={{ marginBottom: '0.75rem' }}>
            <span style={{ color: 'var(--neutral-400)', fontSize: '0.8rem' }}>Technical:</span>
            <p style={{ color: 'var(--neutral-300)', margin: '0.25rem 0 0', fontStyle: 'italic' }}>
                "{technical}"
            </p>
        </div>
        <div style={{
            paddingTop: '0.75rem',
            borderTop: '1px dashed rgba(59, 130, 246, 0.3)',
        }}>
            <span style={{ color: '#3B82F6', fontSize: '0.8rem', fontWeight: 600 }}>💡 In Plain English:</span>
            <p style={{ color: 'var(--neutral-100)', margin: '0.25rem 0 0', fontWeight: 500 }}>
                "{simple}"
            </p>
        </div>
    </motion.div>
);

interface CommonQuestionProps {
    question: string;
    answer: string;
}

export const CommonQuestion: React.FC<CommonQuestionProps> = ({ question, answer }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
            background: 'rgba(139, 92, 246, 0.1)',
            borderRadius: '12px',
            padding: '1rem 1.25rem',
            marginTop: '1rem',
            marginBottom: '1rem',
            border: '1px solid rgba(139, 92, 246, 0.2)',
        }}
    >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.2rem' }}>❓</span>
            <div>
                <p style={{
                    color: 'var(--primary-300)',
                    fontWeight: 600,
                    marginBottom: '0.5rem',
                    fontSize: '0.95rem',
                }}>
                    "{question}"
                </p>
                <p style={{
                    color: 'var(--neutral-200)',
                    margin: 0,
                    fontSize: '0.9rem',
                    lineHeight: 1.6,
                }}>
                    {answer}
                </p>
            </div>
        </div>
    </motion.div>
);

interface DifficultyBadgeProps {
    level: 'fundamental' | 'important' | 'advanced';
}

export const DifficultyBadge: React.FC<DifficultyBadgeProps> = ({ level }) => {
    const config = {
        fundamental: { color: '#22C55E', label: '🟢 Fundamental', desc: 'Must know!' },
        important: { color: '#EAB308', label: '🟡 Important', desc: 'Should know' },
        advanced: { color: '#EF4444', label: '🔴 Advanced', desc: 'Nice to know' },
    };

    const { color, label, desc } = config[level];

    return (
        <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: `${color}20`,
            color: color,
            padding: '0.35rem 0.75rem',
            borderRadius: '20px',
            fontSize: '0.8rem',
            fontWeight: 600,
        }}>
            {label}
            <span style={{ color: 'var(--neutral-400)', fontWeight: 400 }}>• {desc}</span>
        </span>
    );
};

interface ComparisonCardProps {
    leftTitle: string;
    leftStructure: string;
    leftDescription: string;
    rightTitle: string;
    rightStructure: string;
    rightDescription: string;
    keyDifference: string;
}

export const ComparisonCard: React.FC<ComparisonCardProps> = ({
    leftTitle,
    leftStructure,
    leftDescription,
    rightTitle,
    rightStructure,
    rightDescription,
    keyDifference,
}) => (
    <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
            background: 'var(--gradient-card)',
            borderRadius: '16px',
            padding: '1.5rem',
            marginTop: '1.5rem',
            marginBottom: '1.5rem',
            border: '1px solid rgba(255,255,255,0.1)',
        }}
    >
        <h4 style={{
            color: 'var(--neutral-100)',
            textAlign: 'center',
            marginBottom: '1.5rem',
            fontSize: '1rem',
        }}>
            🔄 Compare & Contrast
        </h4>

        <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            gap: '1rem',
            alignItems: 'center',
        }}>
            {/* Left side */}
            <div style={{
                background: 'rgba(139, 92, 246, 0.1)',
                borderRadius: '12px',
                padding: '1.25rem',
                textAlign: 'center',
            }}>
                <h5 style={{ color: 'var(--primary-300)', margin: '0 0 0.75rem' }}>{leftTitle}</h5>
                <p style={{
                    fontFamily: 'monospace',
                    fontSize: '1.25rem',
                    color: 'var(--neutral-100)',
                    margin: '0 0 0.5rem',
                }}>
                    {leftStructure}
                </p>
                <p style={{ color: 'var(--neutral-400)', fontSize: '0.85rem', margin: 0 }}>
                    {leftDescription}
                </p>
            </div>

            {/* VS */}
            <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--neutral-300)',
                fontWeight: 700,
                fontSize: '0.9rem',
            }}>
                VS
            </div>

            {/* Right side */}
            <div style={{
                background: 'rgba(59, 130, 246, 0.1)',
                borderRadius: '12px',
                padding: '1.25rem',
                textAlign: 'center',
            }}>
                <h5 style={{ color: '#3B82F6', margin: '0 0 0.75rem' }}>{rightTitle}</h5>
                <p style={{
                    fontFamily: 'monospace',
                    fontSize: '1.25rem',
                    color: 'var(--neutral-100)',
                    margin: '0 0 0.5rem',
                }}>
                    {rightStructure}
                </p>
                <p style={{ color: 'var(--neutral-400)', fontSize: '0.85rem', margin: 0 }}>
                    {rightDescription}
                </p>
            </div>
        </div>

        {/* Key Difference */}
        <div style={{
            marginTop: '1.25rem',
            padding: '0.85rem 1rem',
            background: 'rgba(34, 197, 94, 0.1)',
            borderRadius: '8px',
            textAlign: 'center',
        }}>
            <span style={{ color: '#22C55E', fontWeight: 600 }}>💡 Key Difference: </span>
            <span style={{ color: 'var(--neutral-200)' }}>{keyDifference}</span>
        </div>
    </motion.div>
);

export default { ExamTip, PlainEnglish, CommonQuestion, DifficultyBadge, ComparisonCard };
