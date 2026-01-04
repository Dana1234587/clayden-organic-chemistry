'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface Atom {
    symbol: string;
    name: string;
    valenceElectrons: number;
    color: string;
    drugRole: string;
    icon: string;
}

interface BuildingProgress {
    protons: number;
    neutrons: number;
    electrons: number[];  // Array of electrons per shell
    isComplete: boolean;
    element: string | null;
}

interface BioisostereExample {
    original: string;
    replacement: string;
    benefit: string;
    example: string;
}

// ============================================================================
// DATA
// ============================================================================

const GOLDEN_ATOMS: Atom[] = [
    {
        symbol: 'C',
        name: 'Carbon',
        valenceElectrons: 4,
        color: '#6b7280',
        drugRole: 'Scaffold backbone carrying functional groups',
        icon: '⚛️'
    },
    {
        symbol: 'N',
        name: 'Nitrogen',
        valenceElectrons: 5,
        color: '#3b82f6',
        drugRole: 'Amines & H-bonding with receptors',
        icon: '🔵'
    },
    {
        symbol: 'O',
        name: 'Oxygen',
        valenceElectrons: 6,
        color: '#ef4444',
        drugRole: 'Solubility & polar interactions',
        icon: '🔴'
    },
    {
        symbol: 'F',
        name: 'Fluorine',
        valenceElectrons: 7,
        color: '#22c55e',
        drugRole: 'Metabolic stability "magic touch"',
        icon: '✨'
    },
    {
        symbol: 'S',
        name: 'Sulfur',
        valenceElectrons: 6,
        color: '#eab308',
        drugRole: 'Disulfide bonds & thiol groups',
        icon: '🟡'
    },
    {
        symbol: 'Cl',
        name: 'Chlorine',
        valenceElectrons: 7,
        color: '#10b981',
        drugRole: 'Lipophilicity & halogen bonding',
        icon: '💚'
    }
];

const BIOISOSTERES: BioisostereExample[] = [
    {
        original: 'H (Hydrogen)',
        replacement: 'F (Fluorine)',
        benefit: 'Blocks CYP450 metabolism, increases half-life',
        example: 'Fluorouracil vs Uracil'
    },
    {
        original: '-OH (Hydroxyl)',
        replacement: '-NH₂ (Amine)',
        benefit: 'Maintains H-bonding, resists glucuronidation',
        example: 'Sulfanilamide design'
    },
    {
        original: '-COOH (Carboxylic acid)',
        replacement: '-SO₂NH₂ (Sulfonamide)',
        benefit: 'Isosteric replacement, same acidity',
        example: 'PABA → Sulfanilamide'
    },
    {
        original: 'Benzene ring',
        replacement: 'Thiophene ring',
        benefit: 'Similar size/shape, different electronics',
        example: 'Many kinase inhibitors'
    },
    {
        original: '-CH₂- (Methylene)',
        replacement: '-O- (Ether)',
        benefit: 'Isosteric size, adds polarity',
        example: 'Ether linkers in drugs'
    }
];

// ============================================================================
// THE ELECTRON ARCHITECT - NUCLEUS LAB
// ============================================================================

function NucleusLabSim() {
    const [building, setBuilding] = useState<BuildingProgress>({
        protons: 0,
        neutrons: 0,
        electrons: [0, 0, 0],
        isComplete: false,
        element: null
    });
    const [phase, setPhase] = useState<'nucleus' | 'electrons' | 'bonding'>('nucleus');
    const [showSuccess, setShowSuccess] = useState(false);

    const addProton = () => {
        if (building.protons < 8) {
            const newProtons = building.protons + 1;
            const element = newProtons === 6 ? 'Carbon' : newProtons === 7 ? 'Nitrogen' : newProtons === 8 ? 'Oxygen' : null;
            setBuilding(prev => ({ ...prev, protons: newProtons, element }));
        }
    };

    const addNeutron = () => {
        if (building.neutrons < 8) {
            setBuilding(prev => ({ ...prev, neutrons: prev.neutrons + 1 }));
        }
    };

    const addElectron = (shell: number) => {
        const maxElectrons = shell === 0 ? 2 : 8;
        if (building.electrons[shell] < maxElectrons) {
            const newElectrons = [...building.electrons];
            newElectrons[shell]++;

            // Check if complete for carbon
            const totalElectrons = newElectrons.reduce((a, b) => a + b, 0);
            const isComplete = building.protons === 6 && totalElectrons === 6;

            setBuilding(prev => ({ ...prev, electrons: newElectrons, isComplete }));

            if (isComplete) {
                setShowSuccess(true);
            }
        }
    };

    const reset = () => {
        setBuilding({
            protons: 0,
            neutrons: 0,
            electrons: [0, 0, 0],
            isComplete: false,
            element: null
        });
        setPhase('nucleus');
        setShowSuccess(false);
    };

    const getElementColor = () => {
        switch (building.protons) {
            case 6: return '#6b7280'; // Carbon - Gray
            case 7: return '#3b82f6'; // Nitrogen - Blue
            case 8: return '#ef4444'; // Oxygen - Red
            default: return '#1f2937';
        }
    };

    const totalElectrons = building.electrons.reduce((a, b) => a + b, 0);

    return (
        <div style={{ padding: '1.5rem' }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1.5rem'
            }}>
                <span style={{ fontSize: '1.5rem' }}>🏗️</span>
                <div>
                    <h4 style={{ color: '#e2e8f0', margin: 0 }}>The Electron Architect: Build Your Atom</h4>
                    <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.85rem' }}>
                        Build the carbon atom backbone for drug scaffolds
                    </p>
                </div>
            </div>

            {/* Phase Indicator */}
            <div style={{
                display: 'flex',
                gap: '0.5rem',
                marginBottom: '1.5rem'
            }}>
                {(['nucleus', 'electrons', 'bonding'] as const).map((p, i) => (
                    <div
                        key={p}
                        style={{
                            flex: 1,
                            padding: '0.5rem',
                            background: phase === p ? 'rgba(139, 92, 246, 0.2)' : 'rgba(255,255,255,0.05)',
                            border: `2px solid ${phase === p ? '#8b5cf6' : 'rgba(255,255,255,0.1)'}`,
                            borderRadius: '8px',
                            textAlign: 'center',
                            cursor: 'pointer'
                        }}
                        onClick={() => setPhase(p)}
                    >
                        <div style={{ color: phase === p ? '#a78bfa' : '#64748b', fontSize: '0.75rem' }}>
                            PHASE {i + 1}
                        </div>
                        <div style={{ color: phase === p ? '#e2e8f0' : '#94a3b8', fontWeight: 600, fontSize: '0.85rem' }}>
                            {p === 'nucleus' ? 'Build Nucleus' : p === 'electrons' ? 'Add Electrons' : 'Form Bonds'}
                        </div>
                    </div>
                ))}
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.5rem'
            }}>
                {/* Atom Visualization */}
                <div style={{
                    background: 'rgba(0, 0, 0, 0.4)',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <h5 style={{ color: '#e2e8f0', marginBottom: '1rem' }}>
                        {building.element || 'Building Atom...'}
                    </h5>

                    {/* Nucleus with Shells */}
                    <div style={{
                        position: 'relative',
                        width: '200px',
                        height: '200px'
                    }}>
                        {/* Shell 2 */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '200px',
                                height: '200px',
                                borderRadius: '50%',
                                border: '2px dashed rgba(139, 92, 246, 0.3)'
                            }}
                        >
                            {[...Array(building.electrons[1])].map((_, i) => (
                                <motion.div
                                    key={`s2-${i}`}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    style={{
                                        position: 'absolute',
                                        width: '12px',
                                        height: '12px',
                                        borderRadius: '50%',
                                        background: '#8b5cf6',
                                        top: `${50 + 45 * Math.sin(i * Math.PI / 4)}%`,
                                        left: `${50 + 45 * Math.cos(i * Math.PI / 4)}%`,
                                        transform: 'translate(-50%, -50%)'
                                    }}
                                />
                            ))}
                        </motion.div>

                        {/* Shell 1 */}
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
                            style={{
                                position: 'absolute',
                                top: '50px',
                                left: '50px',
                                width: '100px',
                                height: '100px',
                                borderRadius: '50%',
                                border: '2px dashed rgba(59, 130, 246, 0.3)'
                            }}
                        >
                            {[...Array(building.electrons[0])].map((_, i) => (
                                <motion.div
                                    key={`s1-${i}`}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    style={{
                                        position: 'absolute',
                                        width: '10px',
                                        height: '10px',
                                        borderRadius: '50%',
                                        background: '#3b82f6',
                                        top: `${50 + 40 * Math.sin(i * Math.PI)}%`,
                                        left: `${50 + 40 * Math.cos(i * Math.PI)}%`,
                                        transform: 'translate(-50%, -50%)'
                                    }}
                                />
                            ))}
                        </motion.div>

                        {/* Nucleus */}
                        <motion.div
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                                background: `radial-gradient(circle, ${getElementColor()}, ${getElementColor()}80)`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: 700,
                                fontSize: '1.2rem',
                                boxShadow: `0 0 20px ${getElementColor()}50`
                            }}
                        >
                            {building.protons > 0 ? (
                                building.element
                                    ? building.element.charAt(0)
                                    : `${building.protons}+`
                            ) : '?'}
                        </motion.div>
                    </div>

                    {/* Stats */}
                    <div style={{
                        display: 'flex',
                        gap: '1rem',
                        marginTop: '1rem'
                    }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ color: '#ef4444', fontSize: '1.2rem', fontWeight: 700 }}>{building.protons}</div>
                            <div style={{ color: '#94a3b8', fontSize: '0.7rem' }}>Protons</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ color: '#64748b', fontSize: '1.2rem', fontWeight: 700 }}>{building.neutrons}</div>
                            <div style={{ color: '#94a3b8', fontSize: '0.7rem' }}>Neutrons</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ color: '#3b82f6', fontSize: '1.2rem', fontWeight: 700 }}>{totalElectrons}</div>
                            <div style={{ color: '#94a3b8', fontSize: '0.7rem' }}>Electrons</div>
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div style={{
                    background: 'rgba(0, 0, 0, 0.4)',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                    <AnimatePresence mode="wait">
                        {phase === 'nucleus' && (
                            <motion.div
                                key="nucleus"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <h5 style={{ color: '#e2e8f0', marginBottom: '1rem' }}>🔴 Build the Nucleus</h5>
                                <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1rem' }}>
                                    Add 6 protons and 6 neutrons to build a Carbon atom - the backbone of all drugs!
                                </p>
                                <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
                                    <button
                                        onClick={addProton}
                                        style={{
                                            flex: 1,
                                            padding: '1rem',
                                            background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                                            border: 'none',
                                            borderRadius: '12px',
                                            color: 'white',
                                            fontWeight: 600,
                                            cursor: 'pointer'
                                        }}
                                    >
                                        + Proton
                                    </button>
                                    <button
                                        onClick={addNeutron}
                                        style={{
                                            flex: 1,
                                            padding: '1rem',
                                            background: 'linear-gradient(135deg, #64748b, #475569)',
                                            border: 'none',
                                            borderRadius: '12px',
                                            color: 'white',
                                            fontWeight: 600,
                                            cursor: 'pointer'
                                        }}
                                    >
                                        + Neutron
                                    </button>
                                </div>
                                {building.protons === 6 && (
                                    <div style={{
                                        padding: '0.75rem',
                                        background: 'rgba(16, 185, 129, 0.2)',
                                        borderRadius: '8px',
                                        border: '1px solid #10b981',
                                        color: '#10b981',
                                        textAlign: 'center'
                                    }}>
                                        ✅ Carbon nucleus complete! Now add electrons →
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {phase === 'electrons' && (
                            <motion.div
                                key="electrons"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <h5 style={{ color: '#e2e8f0', marginBottom: '1rem' }}>⚡ Add Electrons</h5>
                                <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1rem' }}>
                                    Shell 1: max 2 electrons | Shell 2: max 8 electrons (need 4 for carbon)
                                </p>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    <button
                                        onClick={() => addElectron(0)}
                                        disabled={building.electrons[0] >= 2}
                                        style={{
                                            padding: '1rem',
                                            background: building.electrons[0] >= 2
                                                ? 'rgba(255,255,255,0.1)'
                                                : 'linear-gradient(135deg, #3b82f6, #2563eb)',
                                            border: 'none',
                                            borderRadius: '12px',
                                            color: 'white',
                                            fontWeight: 600,
                                            cursor: building.electrons[0] >= 2 ? 'not-allowed' : 'pointer'
                                        }}
                                    >
                                        + Shell 1 Electron ({building.electrons[0]}/2)
                                    </button>
                                    <button
                                        onClick={() => addElectron(1)}
                                        disabled={building.electrons[1] >= 8}
                                        style={{
                                            padding: '1rem',
                                            background: building.electrons[1] >= 4 && building.protons === 6
                                                ? 'rgba(255,255,255,0.1)'
                                                : 'linear-gradient(135deg, #8b5cf6, #6366f1)',
                                            border: 'none',
                                            borderRadius: '12px',
                                            color: 'white',
                                            fontWeight: 600,
                                            cursor: building.electrons[1] >= 8 ? 'not-allowed' : 'pointer'
                                        }}
                                    >
                                        + Shell 2 Electron ({building.electrons[1]}/8)
                                    </button>
                                </div>

                                {building.electrons[1] === 4 && building.protons === 6 && (
                                    <div style={{
                                        marginTop: '1rem',
                                        padding: '0.75rem',
                                        background: 'rgba(16, 185, 129, 0.2)',
                                        borderRadius: '8px',
                                        border: '1px solid #10b981',
                                        color: '#10b981',
                                        textAlign: 'center'
                                    }}>
                                        🎉 Carbon with 4 valence electrons! Ready for bonding →
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {phase === 'bonding' && (
                            <motion.div
                                key="bonding"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <h5 style={{ color: '#e2e8f0', marginBottom: '1rem' }}>🔗 The Octet Rule</h5>
                                <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1rem' }}>
                                    Carbon needs 8 electrons in its outer shell. With 4 valence electrons,
                                    it can form 4 covalent bonds!
                                </p>
                                <div style={{
                                    padding: '1rem',
                                    background: 'rgba(139, 92, 246, 0.1)',
                                    borderRadius: '12px',
                                    border: '1px solid rgba(139, 92, 246, 0.3)'
                                }}>
                                    <div style={{ color: '#a78bfa', fontWeight: 600, marginBottom: '0.5rem' }}>
                                        Why Carbon is the Drug Backbone:
                                    </div>
                                    <ul style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0, paddingLeft: '1.25rem' }}>
                                        <li>4 bonds = maximum connectivity</li>
                                        <li>Can form chains, rings, branches</li>
                                        <li>Stable C-C bonds (bond energy: 346 kJ/mol)</li>
                                        <li>Perfect for building drug scaffolds</li>
                                    </ul>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <button
                        onClick={reset}
                        style={{
                            marginTop: '1rem',
                            width: '100%',
                            padding: '0.75rem',
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: 'none',
                            borderRadius: '12px',
                            color: 'white',
                            fontWeight: 600,
                            cursor: 'pointer'
                        }}
                    >
                        🔄 Reset Atom
                    </button>
                </div>
            </div>

            {/* Success Message */}
            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        style={{
                            marginTop: '1.5rem',
                            padding: '1.5rem',
                            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(139, 92, 246, 0.2))',
                            borderRadius: '16px',
                            border: '2px solid #10b981',
                            textAlign: 'center'
                        }}
                    >
                        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎉</div>
                        <div style={{ color: '#10b981', fontWeight: 700, fontSize: '1.2rem' }}>
                            Stable Scaffold Achieved!
                        </div>
                        <div style={{ color: '#e2e8f0', marginTop: '0.5rem' }}>
                            Your carbon atom is now ready for molecular docking tests.
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// ============================================================================
// BIOISOSTERE EXPLORER
// ============================================================================

function BioisostereExplorer() {
    const [selectedExample, setSelectedExample] = useState<BioisostereExample>(BIOISOSTERES[0]);

    return (
        <div style={{ padding: '1.5rem' }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1.5rem'
            }}>
                <span style={{ fontSize: '1.5rem' }}>🔄</span>
                <div>
                    <h4 style={{ color: '#e2e8f0', margin: 0 }}>Bioisosterism: The Atomic Exchange</h4>
                    <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.85rem' }}>
                        Replace atoms with similar electronic profiles to optimize drugs
                    </p>
                </div>
            </div>

            {/* Example Selection */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '0.75rem',
                marginBottom: '1.5rem'
            }}>
                {BIOISOSTERES.map((b, i) => (
                    <motion.button
                        key={i}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedExample(b)}
                        style={{
                            padding: '0.75rem',
                            background: selectedExample === b
                                ? 'rgba(16, 185, 129, 0.2)'
                                : 'rgba(255,255,255,0.05)',
                            border: `2px solid ${selectedExample === b ? '#10b981' : 'rgba(255,255,255,0.1)'}`,
                            borderRadius: '12px',
                            cursor: 'pointer',
                            textAlign: 'left'
                        }}
                    >
                        <div style={{ color: '#ef4444', fontSize: '0.75rem', textDecoration: 'line-through' }}>
                            {b.original}
                        </div>
                        <div style={{ color: '#10b981', fontWeight: 600, fontSize: '0.85rem' }}>
                            → {b.replacement}
                        </div>
                    </motion.button>
                ))}
            </div>

            {/* Selected Example Details */}
            <div style={{
                background: 'rgba(0, 0, 0, 0.4)',
                borderRadius: '16px',
                padding: '1.5rem',
                border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '1rem'
                }}>
                    <div style={{
                        padding: '0.75rem 1rem',
                        background: 'rgba(239, 68, 68, 0.2)',
                        borderRadius: '8px',
                        border: '2px solid #ef4444',
                        color: '#ef4444',
                        fontWeight: 600,
                        textDecoration: 'line-through'
                    }}>
                        {selectedExample.original}
                    </div>
                    <motion.div
                        animate={{ x: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        style={{ fontSize: '1.5rem' }}
                    >
                        →
                    </motion.div>
                    <div style={{
                        padding: '0.75rem 1rem',
                        background: 'rgba(16, 185, 129, 0.2)',
                        borderRadius: '8px',
                        border: '2px solid #10b981',
                        color: '#10b981',
                        fontWeight: 600
                    }}>
                        {selectedExample.replacement}
                    </div>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '1rem'
                }}>
                    <div style={{
                        padding: '0.75rem',
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '8px'
                    }}>
                        <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>BENEFIT</div>
                        <div style={{ color: '#e2e8f0', fontSize: '0.9rem' }}>{selectedExample.benefit}</div>
                    </div>
                    <div style={{
                        padding: '0.75rem',
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '8px'
                    }}>
                        <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>DRUG EXAMPLE</div>
                        <div style={{ color: '#a78bfa', fontSize: '0.9rem' }}>{selectedExample.example}</div>
                    </div>
                </div>
            </div>

            {/* Educational Note */}
            <div style={{
                marginTop: '1.5rem',
                padding: '1rem',
                background: 'rgba(59, 130, 246, 0.1)',
                borderRadius: '12px',
                border: '1px solid rgba(59, 130, 246, 0.3)'
            }}>
                <div style={{ color: '#60a5fa', fontWeight: 600, marginBottom: '0.5rem' }}>
                    💡 Why Bioisosteres Work
                </div>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6 }}>
                    Bioisosteres are atoms or groups with <strong>similar valence electrons</strong> and
                    <strong> molecular shape</strong>. When you swap H for F:
                    <br />• Same size (van der Waals radius: H=1.2Å, F=1.47Å)
                    <br />• Blocks metabolic oxidation by CYP450
                    <br />• Increases lipophilicity for membrane penetration
                </div>
            </div>
        </div>
    );
}

// ============================================================================
// GOLDEN ATOMS TABLE
// ============================================================================

function GoldenAtomsTable() {
    const [selectedAtom, setSelectedAtom] = useState<Atom | null>(null);

    return (
        <div style={{ padding: '1.5rem' }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1.5rem'
            }}>
                <span style={{ fontSize: '1.5rem' }}>⭐</span>
                <div>
                    <h4 style={{ color: '#e2e8f0', margin: 0 }}>Golden Atoms in Drug Discovery</h4>
                    <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.85rem' }}>
                        The essential atoms for building effective pharmaceuticals
                    </p>
                </div>
            </div>

            {/* Atom Cards */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '1rem',
                marginBottom: '1.5rem'
            }}>
                {GOLDEN_ATOMS.map(atom => (
                    <motion.div
                        key={atom.symbol}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedAtom(atom)}
                        style={{
                            padding: '1rem',
                            background: selectedAtom === atom
                                ? `${atom.color}30`
                                : 'rgba(255,255,255,0.05)',
                            border: `2px solid ${selectedAtom === atom ? atom.color : 'rgba(255,255,255,0.1)'}`,
                            borderRadius: '12px',
                            cursor: 'pointer',
                            textAlign: 'center'
                        }}
                    >
                        <div style={{ fontSize: '2rem' }}>{atom.icon}</div>
                        <div style={{
                            color: atom.color,
                            fontSize: '1.5rem',
                            fontWeight: 700,
                            marginTop: '0.25rem'
                        }}>
                            {atom.symbol}
                        </div>
                        <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>
                            {atom.name}
                        </div>
                        <div style={{
                            marginTop: '0.5rem',
                            padding: '0.25rem 0.5rem',
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '6px',
                            fontSize: '0.7rem',
                            color: '#e2e8f0'
                        }}>
                            {atom.valenceElectrons} valence e⁻
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Selected Atom Details */}
            <AnimatePresence>
                {selectedAtom && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        style={{
                            padding: '1.5rem',
                            background: `${selectedAtom.color}15`,
                            borderRadius: '16px',
                            border: `2px solid ${selectedAtom.color}50`
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                            <div style={{
                                width: '60px',
                                height: '60px',
                                borderRadius: '50%',
                                background: selectedAtom.color,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.5rem',
                                color: 'white',
                                fontWeight: 700
                            }}>
                                {selectedAtom.symbol}
                            </div>
                            <div>
                                <h5 style={{ color: '#e2e8f0', margin: 0 }}>{selectedAtom.name}</h5>
                                <p style={{ color: selectedAtom.color, margin: 0, fontSize: '0.9rem' }}>
                                    {selectedAtom.valenceElectrons} Valence Electrons
                                </p>
                            </div>
                        </div>
                        <div style={{
                            padding: '0.75rem',
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '8px'
                        }}>
                            <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>ROLE IN DRUG DISCOVERY</div>
                            <div style={{ color: '#e2e8f0', fontSize: '0.95rem', marginTop: '0.25rem' }}>
                                {selectedAtom.drugRole}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {!selectedAtom && (
                <div style={{
                    padding: '2rem',
                    textAlign: 'center',
                    color: '#64748b',
                    fontSize: '0.9rem'
                }}>
                    Click on an atom to see its role in drug discovery
                </div>
            )}
        </div>
    );
}

// ============================================================================
// VAN DER WAALS FORCES VISUALIZATION
// ============================================================================

function VanDerWaalsViz() {
    const [distance, setDistance] = useState(4);
    const [showForce, setShowForce] = useState(false);

    // Calculate VdW force (simplified)
    const calculateForce = () => {
        if (distance < 2) return { value: 999, type: 'repulsion', color: '#ef4444' };
        if (distance < 3) return { value: -8.5, type: 'optimal', color: '#10b981' };
        if (distance < 4) return { value: -4.2, type: 'attraction', color: '#eab308' };
        return { value: -0.5, type: 'weak', color: '#64748b' };
    };

    const force = calculateForce();

    return (
        <div style={{ padding: '1.5rem' }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1.5rem'
            }}>
                <span style={{ fontSize: '1.5rem' }}>☁️</span>
                <div>
                    <h4 style={{ color: '#e2e8f0', margin: 0 }}>Van der Waals Forces & Molecular Docking</h4>
                    <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.85rem' }}>
                        How electron clouds determine drug-receptor binding
                    </p>
                </div>
            </div>

            <div style={{
                background: 'rgba(0, 0, 0, 0.4)',
                borderRadius: '16px',
                padding: '1.5rem',
                border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
                {/* Visualization */}
                <svg viewBox="0 0 400 150" style={{ width: '100%', height: '150px' }}>
                    {/* Drug Molecule */}
                    <g>
                        <circle
                            cx="100"
                            cy="75"
                            r="40"
                            fill="rgba(139, 92, 246, 0.2)"
                            stroke="#8b5cf6"
                            strokeWidth="2"
                        />
                        <circle cx="100" cy="75" r="25" fill="#8b5cf6" opacity="0.6" />
                        <circle cx="100" cy="75" r="10" fill="#8b5cf6" />
                        <text x="100" y="125" textAnchor="middle" fill="#a78bfa" fontSize="12">Drug</text>
                    </g>

                    {/* Receptor */}
                    <g>
                        <motion.circle
                            cx={200 + distance * 20}
                            cy="75"
                            r="45"
                            fill="rgba(59, 130, 246, 0.2)"
                            stroke="#3b82f6"
                            strokeWidth="2"
                            animate={{ cx: 200 + distance * 20 }}
                        />
                        <motion.circle
                            cx={200 + distance * 20}
                            cy="75"
                            r="30"
                            fill="#3b82f6"
                            opacity="0.6"
                            animate={{ cx: 200 + distance * 20 }}
                        />
                        <motion.circle
                            cx={200 + distance * 20}
                            cy="75"
                            r="12"
                            fill="#3b82f6"
                            animate={{ cx: 200 + distance * 20 }}
                        />
                        <motion.text
                            x={200 + distance * 20}
                            y="135"
                            textAnchor="middle"
                            fill="#60a5fa"
                            fontSize="12"
                            animate={{ x: 200 + distance * 20 }}
                        >
                            Receptor
                        </motion.text>
                    </g>

                    {/* Distance Line */}
                    <line
                        x1="140"
                        y1="75"
                        x2={200 + distance * 20 - 45}
                        y2="75"
                        stroke={force.color}
                        strokeWidth="2"
                        strokeDasharray="4,2"
                    />
                    <text
                        x={(140 + 200 + distance * 20 - 45) / 2}
                        y="60"
                        textAnchor="middle"
                        fill={force.color}
                        fontSize="11"
                    >
                        {distance.toFixed(1)} Å
                    </text>
                </svg>

                {/* Distance Slider */}
                <div style={{ marginTop: '1rem' }}>
                    <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
                        Adjust Distance (Å):
                    </label>
                    <input
                        type="range"
                        min="1"
                        max="6"
                        step="0.1"
                        value={distance}
                        onChange={(e) => setDistance(parseFloat(e.target.value))}
                        style={{ width: '100%', marginTop: '0.5rem' }}
                    />
                </div>

                {/* Force Result */}
                <div style={{
                    marginTop: '1rem',
                    padding: '1rem',
                    background: `${force.color}15`,
                    borderRadius: '12px',
                    border: `2px solid ${force.color}40`,
                    textAlign: 'center'
                }}>
                    <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>BINDING ENERGY (ΔG)</div>
                    <div style={{ color: force.color, fontSize: '2rem', fontWeight: 700 }}>
                        {force.value > 0 ? '+' : ''}{force.value} kcal/mol
                    </div>
                    <div style={{ color: force.color, fontWeight: 600 }}>
                        {force.type === 'repulsion' && '⚠️ Steric Clash! Molecules too close.'}
                        {force.type === 'optimal' && '✅ Optimal binding distance!'}
                        {force.type === 'attraction' && '🔄 Moderate attraction'}
                        {force.type === 'weak' && '⚪ Weak interaction - too far'}
                    </div>
                </div>
            </div>
        </div>
    );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function BioisosterismLab() {
    const [activeTab, setActiveTab] = useState<'architect' | 'bioisosteres' | 'atoms' | 'vdw'>('architect');

    const tabs = [
        { id: 'architect', label: 'Electron Architect', icon: '🏗️' },
        { id: 'bioisosteres', label: 'Bioisosteres', icon: '🔄' },
        { id: 'atoms', label: 'Golden Atoms', icon: '⭐' },
        { id: 'vdw', label: 'VdW Forces', icon: '☁️' }
    ];

    return (
        <div style={{
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.98) 100%)',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            overflow: 'hidden'
        }}>
            {/* Header */}
            <div style={{
                padding: '1.5rem 2rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(139, 92, 246, 0.15) 100%)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '1.75rem' }}>⚛️</span>
                    <div>
                        <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'white', margin: 0 }}>
                            Bioisosterism & Atomic Architecture Lab
                        </h3>
                        <p style={{ color: 'var(--neutral-400)', margin: '0.25rem 0 0', fontSize: '0.9rem' }}>
                            PhD-level atomic concepts • Build atoms • VdW forces • Drug optimization
                        </p>
                    </div>
                </div>
            </div>

            {/* Tab Navigation */}
            <div style={{
                display: 'flex',
                gap: '0.5rem',
                padding: '1rem 2rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                overflowX: 'auto'
            }}>
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as typeof activeTab)}
                        style={{
                            padding: '0.75rem 1.25rem',
                            background: activeTab === tab.id
                                ? 'linear-gradient(135deg, #8b5cf6, #6366f1)'
                                : 'rgba(255, 255, 255, 0.05)',
                            border: activeTab === tab.id ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '12px',
                            color: activeTab === tab.id ? 'white' : 'var(--neutral-400)',
                            fontSize: '0.9rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        <span>{tab.icon}</span>
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content */}
            <AnimatePresence mode="wait">
                {activeTab === 'architect' && (
                    <motion.div
                        key="architect"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <NucleusLabSim />
                    </motion.div>
                )}

                {activeTab === 'bioisosteres' && (
                    <motion.div
                        key="bioisosteres"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <BioisostereExplorer />
                    </motion.div>
                )}

                {activeTab === 'atoms' && (
                    <motion.div
                        key="atoms"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <GoldenAtomsTable />
                    </motion.div>
                )}

                {activeTab === 'vdw' && (
                    <motion.div
                        key="vdw"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <VanDerWaalsViz />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
