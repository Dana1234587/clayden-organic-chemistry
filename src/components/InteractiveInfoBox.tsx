'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type InfoBoxType = 'funFact' | 'keyPoint' | 'commonMistake' | 'realWorld' | 'tip';

interface InteractiveInfoBoxProps {
    type: InfoBoxType;
    title?: string;
    children: ReactNode;
}

const boxConfig: Record<InfoBoxType, {
    icon: string;
    defaultTitle: string;
    gradient: string;
    borderColor: string;
    bgColor: string;
}> = {
    funFact: {
        icon: '💡',
        defaultTitle: 'Did You Know?',
        gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
        borderColor: 'rgba(245, 158, 11, 0.4)',
        bgColor: 'rgba(245, 158, 11, 0.08)'
    },
    keyPoint: {
        icon: '🎯',
        defaultTitle: 'Key Concept',
        gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
        borderColor: 'rgba(139, 92, 246, 0.4)',
        bgColor: 'rgba(139, 92, 246, 0.08)'
    },
    commonMistake: {
        icon: '⚠️',
        defaultTitle: 'Common Mistake',
        gradient: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)',
        borderColor: 'rgba(244, 63, 94, 0.4)',
        bgColor: 'rgba(244, 63, 94, 0.08)'
    },
    realWorld: {
        icon: '🌍',
        defaultTitle: 'Real World Application',
        gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        borderColor: 'rgba(16, 185, 129, 0.4)',
        bgColor: 'rgba(16, 185, 129, 0.08)'
    },
    tip: {
        icon: '✨',
        defaultTitle: 'Pro Tip',
        gradient: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
        borderColor: 'rgba(6, 182, 212, 0.4)',
        bgColor: 'rgba(6, 182, 212, 0.08)'
    }
};

export default function InteractiveInfoBox({ type, title, children }: InteractiveInfoBoxProps) {
    const config = boxConfig[type];
    const displayTitle = title || config.defaultTitle;

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.4 }}
            style={{
                background: config.bgColor,
                border: `1px solid ${config.borderColor}`,
                borderRadius: '16px',
                padding: '1.25rem 1.5rem',
                margin: '1.5rem 0',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* Gradient accent line */}
            <div style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '4px',
                background: config.gradient,
                borderRadius: '4px 0 0 4px'
            }} />

            {/* Header */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '0.75rem'
            }}>
                <span style={{ fontSize: '1.5rem' }}>{config.icon}</span>
                <h4 style={{
                    margin: 0,
                    fontSize: '1rem',
                    fontWeight: 600,
                    background: config.gradient,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                }}>
                    {displayTitle}
                </h4>
            </div>

            {/* Content */}
            <div style={{
                color: 'var(--neutral-300)',
                fontSize: '0.95rem',
                lineHeight: 1.7,
                paddingLeft: '0.5rem'
            }}>
                {children}
            </div>
        </motion.div>
    );
}
