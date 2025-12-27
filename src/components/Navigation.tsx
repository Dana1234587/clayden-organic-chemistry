'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';

const chapters = [
  { id: 1, title: "What is organic chemistry?" },
  { id: 2, title: "Organic structures" },
  { id: 3, title: "Determining organic structures" },
  { id: 4, title: "Structure of molecules" },
  { id: 5, title: "Organic reactions" },
  { id: 6, title: "Nucleophilic addition to the carbonyl group" },
  { id: 7, title: "Delocalization and conjugation" },
  { id: 8, title: "Acidity, basicity, and pKa" },
  { id: 9, title: "Using organometallic reagents to make C–C bonds" },
  { id: 10, title: "Nucleophilic addition at the carbonyl group" },
  { id: 11, title: "Nucleophilic substitution at C=O" },
  { id: 12, title: "Equilibria, rates, and mechanisms" },
  { id: 13, title: "1H NMR: Proton nuclear magnetic resonance" },
  { id: 14, title: "Stereochemistry" },
  { id: 15, title: "Nucleophilic substitution at saturated carbon" },
  { id: 16, title: "Conformational analysis" },
  { id: 17, title: "Elimination reactions" },
  { id: 18, title: "Review of spectroscopic methods" },
  { id: 19, title: "Electrophilic addition to alkenes" },
  { id: 20, title: "Formation and reactions of enols and enolates" },
  { id: 21, title: "Electrophilic aromatic substitution" },
  { id: 22, title: "Conjugate addition and nucleophilic aromatic substitution" },
  { id: 23, title: "Chemoselectivity and protecting groups" },
  { id: 24, title: "Regioselectivity" },
  { id: 25, title: "Alkylation of enolates" },
  { id: 26, title: "Reactions of enolates with carbonyl compounds" },
  { id: 27, title: "Sulfur, silicon, and phosphorus" },
  { id: 28, title: "Retrosynthetic analysis" },
  { id: 29, title: "Aromatic heterocycles 1: reactions" },
  { id: 30, title: "Aromatic heterocycles 2: synthesis" },
  { id: 31, title: "Saturated heterocycles and stereoelectronics" },
  { id: 32, title: "Stereoselectivity in cyclic molecules" },
  { id: 33, title: "Diastereoselectivity" },
  { id: 34, title: "Pericyclic reactions 1: cycloadditions" },
  { id: 35, title: "Pericyclic reactions 2: sigmatropic reactions" },
  { id: 36, title: "Participation, rearrangement, and fragmentation" },
  { id: 37, title: "Radical reactions" },
  { id: 38, title: "Synthesis and reactions of carbenes" },
  { id: 39, title: "Determining reaction mechanisms" },
  { id: 40, title: "Organometallic chemistry" },
  { id: 41, title: "Asymmetric synthesis" },
  { id: 42, title: "Organic chemistry of life" },
  { id: 43, title: "Organic chemistry today" },
];

interface NavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Navigation({ isOpen, onClose }: NavigationProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const isChapterActive = (id: number) => {
    return pathname === `/chapter/${id}`;
  };

  if (!mounted) return null;

  const drawerContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(4px)',
              zIndex: 1100,
            }}
          />

          {/* Drawer */}
          <motion.nav
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              bottom: 0,
              width: 'min(320px, 85vw)',
              background: 'rgba(15, 15, 25, 0.98)',
              backdropFilter: 'blur(20px)',
              borderRight: '1px solid rgba(255, 255, 255, 0.1)',
              zIndex: 1101,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div style={{
              padding: '20px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <Link
                href="/"
                onClick={onClose}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  textDecoration: 'none',
                }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.3rem',
                }}>
                  🧪
                </div>
                <span style={{
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  color: 'var(--neutral-100)',
                }}>
                  Organic Chemistry
                </span>
              </Link>

              <button
                onClick={onClose}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: 'none',
                  color: 'var(--neutral-400)',
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s',
                }}
              >
                ✕
              </button>
            </div>

            {/* Section Title */}
            <div style={{
              padding: '16px 20px 8px',
              fontSize: '0.7rem',
              fontWeight: 600,
              color: 'var(--neutral-500)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}>
              43 Chapters
            </div>

            {/* Chapters List */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '8px 12px 24px',
            }}>
              {chapters.map((chapter, index) => (
                <motion.div
                  key={chapter.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.015 }}
                >
                  <Link
                    href={`/chapter/${chapter.id}`}
                    onClick={onClose}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 14px',
                      borderRadius: '10px',
                      textDecoration: 'none',
                      marginBottom: '4px',
                      background: isChapterActive(chapter.id)
                        ? 'rgba(139, 92, 246, 0.2)'
                        : 'transparent',
                      transition: 'all 0.2s',
                    }}
                  >
                    <span style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '8px',
                      background: isChapterActive(chapter.id)
                        ? 'linear-gradient(135deg, #8b5cf6, #7c3aed)'
                        : 'rgba(255, 255, 255, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: isChapterActive(chapter.id) ? '#fff' : 'var(--neutral-400)',
                      flexShrink: 0,
                    }}>
                      {chapter.id}
                    </span>
                    <span style={{
                      fontSize: '0.85rem',
                      color: isChapterActive(chapter.id)
                        ? '#a78bfa'
                        : 'var(--neutral-300)',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>
                      {chapter.title}
                    </span>
                    {chapter.id === 1 && (
                      <span style={{
                        fontSize: '0.6rem',
                        padding: '3px 6px',
                        background: 'var(--accent-emerald)',
                        color: 'white',
                        borderRadius: '4px',
                        fontWeight: 600,
                        marginLeft: 'auto',
                        flexShrink: 0,
                      }}>
                        NEW
                      </span>
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );

  return createPortal(drawerContent, document.body);
}
