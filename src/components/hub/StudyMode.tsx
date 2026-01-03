'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChapterData, ChapterSection } from '@/data/types';
import ContentRenderer from '@/components/ContentRenderer';
import InteractiveInfoBox from '@/components/InteractiveInfoBox';
import MiniQuiz from '@/components/MiniQuiz';
import MoleculeComparisonTable from '@/components/MoleculeComparisonTable';
import { ExamTip, PlainEnglish } from '@/components/LearningAids';
import QuickCheck from '@/components/QuickCheck';

interface StudyModeProps {
    chapter: ChapterData;
    completedSections: Set<string>;
    onSectionComplete: (sectionId: string) => void;
}

export default function StudyMode({ chapter, completedSections, onSectionComplete }: StudyModeProps) {
    const [activeSection, setActiveSection] = useState(0);
    const [direction, setDirection] = useState(0);

    const section = chapter.sections[activeSection];
    const isCompleted = completedSections.has(section.id);

    const goToSection = (index: number) => {
        setDirection(index > activeSection ? 1 : -1);
        setActiveSection(index);
    };

    const goNext = () => {
        if (activeSection < chapter.sections.length - 1) {
            goToSection(activeSection + 1);
        }
    };

    const goPrev = () => {
        if (activeSection > 0) {
            goToSection(activeSection - 1);
        }
    };

    const getMiniQuiz = () => {
        return chapter.miniQuizzes.find(q => q.afterSection === section.id);
    };

    const slideVariants = {
        enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 })
    };

    return (
        <div>
            {/* Tab Navigation */}
            <div style={{
                display: 'flex',
                gap: '0.5rem',
                overflowX: 'auto',
                paddingBottom: '1rem',
                marginBottom: '1.5rem',
                borderBottom: '1px solid var(--neutral-800)'
            }}>
                {chapter.sections.map((sec, index) => (
                    <button
                        key={sec.id}
                        onClick={() => goToSection(index)}
                        style={{
                            padding: '0.75rem 1.25rem',
                            background: activeSection === index
                                ? 'var(--gradient-primary)'
                                : completedSections.has(sec.id)
                                    ? 'rgba(16, 185, 129, 0.15)'
                                    : 'var(--neutral-900)',
                            border: activeSection === index
                                ? 'none'
                                : completedSections.has(sec.id)
                                    ? '1px solid var(--accent-emerald)'
                                    : '1px solid var(--neutral-700)',
                            borderRadius: '12px',
                            color: activeSection === index
                                ? 'white'
                                : completedSections.has(sec.id)
                                    ? 'var(--accent-emerald)'
                                    : 'var(--neutral-300)',
                            cursor: 'pointer',
                            whiteSpace: 'nowrap',
                            fontSize: '0.9rem',
                            fontWeight: activeSection === index ? 600 : 400,
                            transition: 'all 0.2s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            background: activeSection === index
                                ? 'rgba(255,255,255,0.2)'
                                : 'var(--neutral-800)',
                            fontSize: '0.75rem',
                            fontWeight: 600
                        }}>
                            {completedSections.has(sec.id) ? '✓' : index + 1}
                        </span>
                        <span className="hide-mobile">{sec.title.length > 20 ? sec.title.slice(0, 20) + '...' : sec.title}</span>
                    </button>
                ))}
            </div>

            {/* Section Content */}
            <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                    key={section.id}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    style={{
                        background: 'var(--gradient-card)',
                        borderRadius: '20px',
                        padding: '2rem',
                        border: '1px solid var(--neutral-800)'
                    }}
                >
                    {/* Section Header */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        gap: '1rem',
                        marginBottom: '1.5rem',
                        flexWrap: 'wrap'
                    }}>
                        <div style={{ flex: 1 }}>
                            <span style={{
                                display: 'inline-block',
                                padding: '0.35rem 0.75rem',
                                background: 'var(--neutral-800)',
                                borderRadius: '20px',
                                fontSize: '0.8rem',
                                color: 'var(--neutral-400)',
                                marginBottom: '0.75rem'
                            }}>
                                Section {activeSection + 1} of {chapter.sections.length}
                            </span>
                            <h2 style={{
                                fontSize: '1.75rem',
                                fontWeight: 700,
                                color: 'var(--neutral-100)',
                                margin: 0
                            }}>
                                {section.title}
                            </h2>
                        </div>

                        {/* Mark Complete Button */}
                        <button
                            onClick={() => onSectionComplete(section.id)}
                            disabled={isCompleted}
                            style={{
                                padding: '0.75rem 1.5rem',
                                background: isCompleted
                                    ? 'rgba(16, 185, 129, 0.2)'
                                    : 'var(--gradient-primary)',
                                border: isCompleted
                                    ? '1px solid var(--accent-emerald)'
                                    : 'none',
                                borderRadius: '12px',
                                color: isCompleted ? 'var(--accent-emerald)' : 'white',
                                cursor: isCompleted ? 'default' : 'pointer',
                                fontSize: '0.9rem',
                                fontWeight: 600,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            {isCompleted ? '✓ Completed' : '✓ Mark Complete'}
                        </button>
                    </div>

                    {/* Main Content */}
                    <div style={{ marginBottom: '2rem' }}>
                        <ContentRenderer content={section.content} />
                    </div>

                    {/* Fun Fact */}
                    {section.funFact && (
                        <InteractiveInfoBox type="funFact">
                            {section.funFact}
                        </InteractiveInfoBox>
                    )}

                    {/* Common Mistake */}
                    {section.commonMistake && (
                        <InteractiveInfoBox type="commonMistake">
                            {section.commonMistake}
                        </InteractiveInfoBox>
                    )}

                    {/* Real World Connection */}
                    {section.realWorldConnection && (
                        <InteractiveInfoBox type="realWorld">
                            {section.realWorldConnection}
                        </InteractiveInfoBox>
                    )}

                    {/* Molecules - Moved to bottom to avoid duplication */}

                    {/* Key Points */}
                    {section.keyPoints && (
                        <div style={{
                            background: 'rgba(139, 92, 246, 0.1)',
                            border: '1px solid rgba(139, 92, 246, 0.3)',
                            borderRadius: '16px',
                            padding: '1.5rem',
                            marginTop: '1.5rem'
                        }}>
                            <h4 style={{
                                margin: '0 0 1rem',
                                color: 'var(--primary-300)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}>
                                💡 Key Points
                            </h4>
                            <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
                                {section.keyPoints.map((point, idx) => (
                                    <li key={idx} style={{
                                        color: 'var(--neutral-300)',
                                        marginBottom: '0.5rem'
                                    }}>
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Exam Tip */}
                    {section.examTip && (
                        <ExamTip>{section.examTip}</ExamTip>
                    )}

                    {/* Plain English */}
                    {section.plainEnglish && (
                        <PlainEnglish
                            technical={section.plainEnglish.technical}
                            simple={section.plainEnglish.simple}
                        />
                    )}

                    {/* Quick Check */}
                    {section.quickCheck && section.quickCheck.length > 0 && (
                        <QuickCheck
                            title={`🧪 Quick Check: ${section.title}`}
                            questions={section.quickCheck}
                        />
                    )}

                    {/* Mini Quiz */}
                    {getMiniQuiz() && (
                        <MiniQuiz
                            questions={getMiniQuiz()!.questions}
                            onComplete={() => console.log('Mini quiz completed')}
                        />
                    )}

                    {/* Featured Molecules - Synced with Course Mode */}
                    {section.molecules && section.molecules.length > 0 && (
                        <div style={{ marginTop: '2.5rem' }}>
                            <MoleculeComparisonTable
                                title="🧪 Featured Molecules"
                                molecules={section.molecules}
                            />
                        </div>
                    )}

                    {/* Navigation */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: '2rem',
                        paddingTop: '1.5rem',
                        borderTop: '1px solid var(--neutral-800)'
                    }}>
                        <button
                            onClick={goPrev}
                            disabled={activeSection === 0}
                            style={{
                                padding: '0.75rem 1.5rem',
                                background: activeSection === 0 ? 'var(--neutral-900)' : 'var(--neutral-800)',
                                border: '1px solid var(--neutral-700)',
                                borderRadius: '12px',
                                color: activeSection === 0 ? 'var(--neutral-600)' : 'var(--neutral-200)',
                                cursor: activeSection === 0 ? 'not-allowed' : 'pointer',
                                fontSize: '0.95rem',
                                fontWeight: 500
                            }}
                        >
                            ← Previous
                        </button>

                        <span style={{
                            color: 'var(--neutral-500)',
                            fontSize: '0.9rem'
                        }}>
                            {activeSection + 1} / {chapter.sections.length}
                        </span>

                        <button
                            onClick={goNext}
                            disabled={activeSection === chapter.sections.length - 1}
                            className="btn-primary"
                            style={{
                                opacity: activeSection === chapter.sections.length - 1 ? 0.5 : 1,
                                cursor: activeSection === chapter.sections.length - 1 ? 'not-allowed' : 'pointer'
                            }}
                        >
                            Next →
                        </button>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
