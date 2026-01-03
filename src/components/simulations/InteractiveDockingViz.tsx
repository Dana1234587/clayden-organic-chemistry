'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface InteractiveDockingVizProps {
    drug: 'cisplatin' | 'transplatin';
}

export default function InteractiveDockingViz({ drug }: InteractiveDockingVizProps) {
    const [state, setState] = useState<'idle' | 'approaching' | 'binding' | 'complete' | 'failed'>('idle');
    const [progress, setProgress] = useState(0);
    const [metrics, setMetrics] = useState({ energy: 0, distance: 15, curvature: 0 });

    const CIS = { energy: -42.3, distance: 2.0, curvature: 35 };
    const TRANS = { energy: -8.5, distance: 5.2, curvature: 0 };

    const start = () => {
        setState('approaching');
        setProgress(0);
        const t = drug === 'cisplatin' ? CIS : TRANS;
        const ok = drug === 'cisplatin';

        const iv = setInterval(() => {
            setProgress(p => {
                if (p >= 100) { clearInterval(iv); setState(ok ? 'complete' : 'failed'); return 100; }
                const f = p / 100;
                setMetrics({
                    energy: t.energy * (ok ? f : Math.min(f, 0.2)),
                    distance: 15 - (15 - t.distance) * (ok ? f : Math.min(f, 0.35)),
                    curvature: t.curvature * (ok ? f : 0)
                });
                if (p === 30) setState('binding');
                return p + 2;
            });
        }, 80);
    };

    const reset = () => { setState('idle'); setProgress(0); setMetrics({ energy: 0, distance: 15, curvature: 0 }); };

    return (
        <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'var(--neutral-900)', borderRadius: '16px', border: '1px solid var(--neutral-800)' }}>
            <h4 style={{ color: 'var(--neutral-200)', marginTop: 0, marginBottom: '1rem' }}>
                🧬 Interactive Docking Simulation
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 220px', gap: '1.5rem' }}>
                {/* DNA Visualization */}
                <div style={{ position: 'relative', height: '280px', background: '#0a0a0a', borderRadius: '12px', border: '1px solid var(--neutral-800)' }}>
                    <svg viewBox="0 0 400 220" style={{ width: '100%', height: '100%' }}>
                        <defs>
                            <linearGradient id="dna1c" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#8b5cf6" /><stop offset="100%" stopColor="#6366f1" /></linearGradient>
                            <linearGradient id="dna2c" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#ec4899" /><stop offset="100%" stopColor="#f43f5e" /></linearGradient>
                        </defs>
                        <pattern id="gridc" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" /></pattern>
                        <rect width="100%" height="100%" fill="url(#gridc)" />

                        <g transform="translate(30, 110)">
                            <motion.path d={state === 'complete' ? "M 0 0 Q 40 -15, 80 0 Q 120 15, 160 -30 Q 200 -60, 240 -30 Q 280 0, 320 0" : "M 0 0 Q 40 -25, 80 0 Q 120 25, 160 0 Q 200 -25, 240 0 Q 280 25, 320 0"}
                                fill="none" stroke="url(#dna1c)" strokeWidth="6" strokeLinecap="round"
                                animate={{ d: state === 'complete' ? "M 0 0 Q 40 -15, 80 0 Q 120 15, 160 -30 Q 200 -60, 240 -30 Q 280 0, 320 0" : "M 0 0 Q 40 -25, 80 0 Q 120 25, 160 0 Q 200 -25, 240 0 Q 280 25, 320 0" }}
                                transition={{ duration: 1.2, ease: "easeInOut" }} />
                            <motion.path d={state === 'complete' ? "M 0 50 Q 40 65, 80 50 Q 120 35, 160 80 Q 200 110, 240 80 Q 280 50, 320 50" : "M 0 50 Q 40 75, 80 50 Q 120 25, 160 50 Q 200 75, 240 50 Q 280 25, 320 50"}
                                fill="none" stroke="url(#dna2c)" strokeWidth="6" strokeLinecap="round"
                                animate={{ d: state === 'complete' ? "M 0 50 Q 40 65, 80 50 Q 120 35, 160 80 Q 200 110, 240 80 Q 280 50, 320 50" : "M 0 50 Q 40 75, 80 50 Q 120 25, 160 50 Q 200 75, 240 50 Q 280 25, 320 50" }}
                                transition={{ duration: 1.2, ease: "easeInOut" }} />
                            {[40, 80, 120, 160, 200, 240, 280].map((x, i) => (
                                <line key={i} x1={x} y1={-15 + Math.sin((x - 40) / 40) * 15} x2={x} y2={65 - Math.sin((x - 40) / 40) * 15}
                                    stroke={i === 3 || i === 4 ? 'rgba(16,185,129,0.7)' : 'rgba(255,255,255,0.1)'} strokeWidth={i === 3 || i === 4 ? 3 : 2} />
                            ))}
                            <text x="160" y="-30" textAnchor="middle" fill="var(--accent-emerald)" fontSize="9" fontWeight="bold">G</text>
                            <text x="200" y="-30" textAnchor="middle" fill="var(--accent-emerald)" fontSize="9" fontWeight="bold">G</text>
                            <text x="180" y="85" textAnchor="middle" fill="var(--neutral-500)" fontSize="8">N7-N7: 3.4 Å</text>
                        </g>

                        <AnimatePresence>
                            {state !== 'idle' && (
                                <motion.g initial={{ x: 380 }} animate={{ x: state === 'complete' ? 205 : state === 'failed' ? 240 : 280 - progress * 0.7 }} transition={{ duration: 0.4 }}>
                                    <g transform="translate(0, 110)">
                                        <circle r="14" fill="#d4d4d4" /><text y="4" textAnchor="middle" fill="#1f2937" fontSize="10" fontWeight="bold">Pt</text>
                                        {drug === 'cisplatin' ? (<>
                                            <circle cx="-18" cy="10" r="8" fill="#22c55e" /><circle cx="18" cy="10" r="8" fill="#22c55e" />
                                            <circle cx="-18" cy="-10" r="6" fill="#3b82f6" /><circle cx="18" cy="-10" r="6" fill="#3b82f6" />
                                            <line x1="-18" y1="10" x2="18" y2="10" stroke="#22c55e" strokeWidth="1" strokeDasharray="2,1" />
                                            <text x="0" y="28" textAnchor="middle" fill="#22c55e" fontSize="7" fontWeight="bold">3.3 Å</text>
                                        </>) : (<>
                                            <circle cx="-20" cy="0" r="8" fill="#ef4444" /><circle cx="20" cy="0" r="8" fill="#ef4444" />
                                            <circle cx="0" cy="-18" r="6" fill="#3b82f6" /><circle cx="0" cy="18" r="6" fill="#3b82f6" />
                                            <line x1="-20" y1="0" x2="20" y2="0" stroke="#ef4444" strokeWidth="1" strokeDasharray="2,1" />
                                            <text x="0" y="-26" textAnchor="middle" fill="#ef4444" fontSize="7" fontWeight="bold">4.6 Å</text>
                                        </>)}
                                    </g>
                                </motion.g>
                            )}
                        </AnimatePresence>

                        {state === 'failed' && (
                            <motion.circle cx="240" cy="110" r="40" fill="none" stroke="#ef4444" strokeWidth="2"
                                initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 2] }} transition={{ duration: 0.5, repeat: 2 }} />
                        )}

                        <text x="200" y="20" textAnchor="middle" fill="var(--neutral-300)" fontSize="10" fontWeight="600">
                            {state === 'idle' && '⏸ Ready'}
                            {state === 'approaching' && '⏳ Approaching...'}
                            {state === 'binding' && '🔗 Binding...'}
                            {state === 'complete' && '✅ Cross-link Formed'}
                            {state === 'failed' && '❌ Steric Clash'}
                        </text>
                    </svg>
                    {state !== 'idle' && (
                        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', background: 'var(--neutral-800)' }}>
                            <motion.div style={{ height: '100%', background: drug === 'cisplatin' ? 'var(--accent-emerald)' : 'var(--accent-red)' }}
                                initial={{ width: '0%' }} animate={{ width: `${progress}%` }} />
                        </div>
                    )}
                </div>

                {/* Metrics */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ padding: '0.75rem', background: 'var(--neutral-800)', borderRadius: '8px' }}>
                        <div style={{ fontSize: '0.65rem', color: 'var(--neutral-500)', marginBottom: '0.25rem' }}>⚡ ΔG</div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 700, fontFamily: 'monospace', color: metrics.energy < -20 ? 'var(--accent-emerald)' : 'var(--neutral-400)' }}>
                            {metrics.energy.toFixed(1)} <span style={{ fontSize: '0.7rem' }}>kcal/mol</span>
                        </div>
                    </div>
                    <div style={{ padding: '0.75rem', background: 'var(--neutral-800)', borderRadius: '8px' }}>
                        <div style={{ fontSize: '0.65rem', color: 'var(--neutral-500)', marginBottom: '0.25rem' }}>📏 Pt→N7</div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 700, fontFamily: 'monospace', color: metrics.distance <= 2.5 ? 'var(--accent-emerald)' : 'var(--neutral-400)' }}>
                            {metrics.distance.toFixed(1)} <span style={{ fontSize: '0.7rem' }}>Å</span>
                        </div>
                    </div>
                    <div style={{ padding: '0.75rem', background: 'var(--neutral-800)', borderRadius: '8px' }}>
                        <div style={{ fontSize: '0.65rem', color: 'var(--neutral-500)', marginBottom: '0.25rem' }}>🧬 Bend</div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 700, fontFamily: 'monospace', color: metrics.curvature > 20 ? 'var(--accent-emerald)' : 'var(--neutral-400)' }}>
                            {metrics.curvature.toFixed(0)}<span style={{ fontSize: '0.7rem' }}>°</span>
                        </div>
                    </div>
                    <motion.button whileTap={{ scale: 0.98 }} onClick={state === 'idle' ? start : reset}
                        style={{
                            padding: '0.75rem', background: state === 'idle' ? 'var(--primary-500)' : 'var(--neutral-700)', border: 'none',
                            borderRadius: '8px', color: 'white', fontWeight: 600, cursor: 'pointer', fontSize: '0.8rem', marginTop: 'auto'
                        }}>
                        {state === 'idle' ? '🚀 Attack DNA' : '🔄 Reset'}
                    </motion.button>
                </div>
            </div>

            <AnimatePresence>
                {(state === 'complete' || state === 'failed') && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        style={{
                            marginTop: '1rem', padding: '1rem', background: state === 'complete' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
                            borderRadius: '8px', border: `1px solid ${state === 'complete' ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`
                        }}>
                        <p style={{ margin: 0, color: 'var(--neutral-300)', fontSize: '0.85rem', lineHeight: 1.5 }}>
                            {state === 'complete'
                                ? '✅ Cisplatin formed 1,2-d(GpG) cross-link. DNA bent ~35°, blocking replication.'
                                : '❌ Transplatin: Cl-Cl = 4.6 Å > N7-N7 = 3.4 Å. Steric clash prevents binding.'}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
