'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DiclofenacLab from './DiclofenacLab';
import BTKMasterclass from './BTKMasterclass';
import MolecularForceSimulator from './MolecularForceSimulator';
import DiclofenacFeaturedMolecules from './DiclofenacFeaturedMolecules';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface AdvancedDrugLabProps {
    lessonId: string;
}

interface DrugCaseStudy {
    name: string;
    genericName?: string;
    pubchemCid: number;
    functionalGroups: FunctionalGroupAnnotation[];
    sarHighlights: string[];
    developmentStory: string;
    clinicalUse: string;
}

interface FunctionalGroupAnnotation {
    name: string;
    role: string;
    importance: 'critical' | 'important' | 'supporting';
    color: string;
}

// ============================================================================
// DRUG CASE STUDIES DATA
// ============================================================================

const DRUG_CASES: Record<string, DrugCaseStudy[]> = {
    'chemical-bonding': [
        {
            name: 'Aspirin',
            genericName: 'Acetylsalicylic Acid',
            pubchemCid: 2244,
            functionalGroups: [
                { name: 'Carboxylic Acid (-COOH)', role: 'Salt formation for solubility, COX binding', importance: 'critical', color: '#ef4444' },
                { name: 'Ester (-OCOCH₃)', role: 'Acetylates COX enzyme irreversibly', importance: 'critical', color: '#f59e0b' },
                { name: 'Benzene Ring', role: 'Hydrophobic scaffold, receptor fit', importance: 'important', color: '#3b82f6' }
            ],
            sarHighlights: [
                'Acetyl group is ESSENTIAL - salicylic acid alone causes GI bleeding',
                'Carboxylic acid must be free for target binding',
                'Ortho-substitution pattern required for activity'
            ],
            developmentStory: 'From willow bark (salicin) to Bayer\'s synthesis in 1897. Felix Hoffmann created it to help his father\'s arthritis. Became world\'s most used drug.',
            clinicalUse: 'Pain, inflammation, fever, cardiovascular protection (low dose)'
        },
        {
            name: 'Cisplatin',
            genericName: 'cis-Diamminedichloroplatinum(II)',
            pubchemCid: 84691,
            functionalGroups: [
                { name: 'Platinum Center', role: 'Forms covalent bonds with DNA', importance: 'critical', color: '#8b5cf6' },
                { name: 'Chloride Ligands', role: 'Leaving groups - displaced by DNA', importance: 'critical', color: '#22c55e' },
                { name: 'Ammonia Ligands', role: 'Carrier ligands - remain attached', importance: 'important', color: '#3b82f6' }
            ],
            sarHighlights: [
                'CIS geometry is ESSENTIAL - trans-platin is inactive',
                'Square planar geometry allows DNA crosslinking',
                'Chloride leaving groups essential for activation'
            ],
            developmentStory: 'Discovered accidentally by Barnett Rosenberg in 1965 while studying electric fields on bacteria. Noticed bacterial growth inhibition near platinum electrodes.',
            clinicalUse: 'Testicular cancer (95% cure rate), ovarian, lung, bladder cancers'
        }
    ],
    'hybridization': [
        {
            name: 'Imatinib',
            genericName: 'Gleevec/Glivec',
            pubchemCid: 5291,
            functionalGroups: [
                { name: 'Pyrimidine Ring (sp²)', role: 'H-bond acceptor, kinase binding', importance: 'critical', color: '#ef4444' },
                { name: 'Piperazine (sp³)', role: 'Solubility, salt formation', importance: 'important', color: '#22c55e' },
                { name: 'Amide (-CONH-)', role: 'H-bonding with kinase backbone', importance: 'critical', color: '#f59e0b' },
                { name: 'Benzene Rings (sp²)', role: 'π-stacking with Phe residues', importance: 'important', color: '#3b82f6' }
            ],
            sarHighlights: [
                'Flat aromatic system (sp²) required for ATP pocket fit',
                'Piperazine (sp³) improves water solubility 100x',
                'Methyl group on piperazine prevents metabolism'
            ],
            developmentStory: 'First rationally designed targeted cancer therapy. Changed CML from death sentence to manageable condition. Developed by Nick Lydon and Brian Druker.',
            clinicalUse: 'Chronic Myeloid Leukemia (CML), GIST tumors'
        }
    ],
    'sigma-and-pi-bonds': [
        {
            name: 'Tamoxifen',
            genericName: 'Nolvadex',
            pubchemCid: 2733526,
            functionalGroups: [
                { name: 'Stilbene Core (C=C π)', role: 'Rigid scaffold, receptor binding', importance: 'critical', color: '#ef4444' },
                { name: 'Dimethylaminoethoxy', role: 'Salt formation, tissue targeting', importance: 'important', color: '#22c55e' },
                { name: 'Phenyl Rings', role: 'π-stacking in estrogen receptor', importance: 'critical', color: '#3b82f6' }
            ],
            sarHighlights: [
                'Z-isomer (cis) is active, E-isomer is inactive',
                'π-bond restricts rotation → locked geometry',
                'Must mimic estradiol flat ring system'
            ],
            developmentStory: 'Originally developed as contraceptive (failed). Discovered to block estrogen receptors in breast tissue. Saved millions of lives from breast cancer.',
            clinicalUse: 'Breast cancer treatment and prevention'
        }
    ],
    'electronegativity-polarity': [
        {
            name: 'Atorvastatin',
            genericName: 'Lipitor',
            pubchemCid: 60823,
            functionalGroups: [
                { name: 'Dihydroxy Acid', role: 'HMG-CoA substrate mimic', importance: 'critical', color: '#ef4444' },
                { name: 'Fluorophenyl', role: 'Metabolic stability, lipophilicity', importance: 'important', color: '#22c55e' },
                { name: 'Amide', role: 'H-bonding with enzyme', importance: 'important', color: '#f59e0b' },
                { name: 'Pyrrole Ring', role: 'Unique scaffold, IP protection', importance: 'supporting', color: '#3b82f6' }
            ],
            sarHighlights: [
                'LogP balance crucial: too polar = poor absorption, too lipophilic = poor solubility',
                'Fluorine adds metabolic stability',
                'Dihydroxy group ESSENTIAL for HMG-CoA reductase inhibition'
            ],
            developmentStory: 'Best-selling drug in history ($12.5B/year at peak). First "super-statin" with excellent efficacy and safety profile.',
            clinicalUse: 'High cholesterol, cardiovascular disease prevention'
        }
    ],
    'periodic-table-organic': [
        {
            name: 'Fluoxetine',
            genericName: 'Prozac',
            pubchemCid: 3386,
            functionalGroups: [
                { name: 'Trifluoromethyl (-CF₃)', role: 'Metabolic blocker, lipophilicity', importance: 'critical', color: '#22c55e' },
                { name: 'Secondary Amine', role: 'Protonation, serotonin transporter binding', importance: 'critical', color: '#3b82f6' },
                { name: 'Ether Linkage', role: 'Bioisostere of amine', importance: 'supporting', color: '#f59e0b' }
            ],
            sarHighlights: [
                'CF₃ is classic fluorine bioisostere - blocks CYP450 oxidation',
                'Replaced metabolically labile groups with F',
                'Result: improved half-life from 2h to 24h'
            ],
            developmentStory: 'Revolutionized depression treatment. First SSRI with clean side effect profile. "Fluorine scan" identified optimal CF₃ position.',
            clinicalUse: 'Depression, OCD, panic disorder, bulimia'
        }
    ]
};

// ============================================================================
// 2D STRUCTURE WITH FUNCTIONAL GROUP ANNOTATIONS
// ============================================================================

function StructureFunctionViewer({ drug }: { drug: DrugCaseStudy }) {
    const [selectedGroup, setSelectedGroup] = useState<FunctionalGroupAnnotation | null>(null);

    return (
        <div style={{
            background: 'rgba(0, 0, 0, 0.4)',
            borderRadius: '16px',
            padding: '1.5rem',
            border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1rem'
            }}>
                <span style={{ fontSize: '1.5rem' }}>📐</span>
                <div>
                    <h4 style={{ color: '#e2e8f0', margin: 0 }}>{drug.name}</h4>
                    <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.85rem' }}>
                        {drug.genericName} • Structure-Function Analysis
                    </p>
                </div>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1.5rem'
            }}>
                {/* 2D Structure Image */}
                <div style={{
                    background: 'white',
                    borderRadius: '12px',
                    padding: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '200px'
                }}>
                    <img
                        src={`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${drug.pubchemCid}/PNG?image_size=300x300`}
                        alt={`2D structure of ${drug.name}`}
                        style={{ maxWidth: '100%', maxHeight: '200px' }}
                    />
                </div>

                {/* Functional Groups */}
                <div>
                    <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginBottom: '0.75rem' }}>
                        FUNCTIONAL GROUPS - Click to Learn
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {drug.functionalGroups.map((fg, i) => (
                            <motion.button
                                key={i}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setSelectedGroup(selectedGroup === fg ? null : fg)}
                                style={{
                                    padding: '0.75rem',
                                    background: selectedGroup === fg
                                        ? `${fg.color}30`
                                        : 'rgba(255, 255, 255, 0.05)',
                                    border: `2px solid ${selectedGroup === fg ? fg.color : 'rgba(255, 255, 255, 0.1)'}`,
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    textAlign: 'left',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                <div style={{
                                    width: '12px',
                                    height: '12px',
                                    borderRadius: '50%',
                                    background: fg.color,
                                    flexShrink: 0
                                }} />
                                <div>
                                    <div style={{
                                        color: '#e2e8f0',
                                        fontSize: '0.85rem',
                                        fontWeight: 600
                                    }}>
                                        {fg.name}
                                    </div>
                                    <div style={{
                                        color: '#94a3b8',
                                        fontSize: '0.75rem'
                                    }}>
                                        {fg.importance === 'critical' ? '⭐ Critical' :
                                            fg.importance === 'important' ? '✓ Important' : '○ Supporting'}
                                    </div>
                                </div>
                            </motion.button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Selected Group Detail */}
            <AnimatePresence>
                {selectedGroup && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{
                            marginTop: '1rem',
                            padding: '1rem',
                            background: `${selectedGroup.color}15`,
                            borderRadius: '12px',
                            border: `1px solid ${selectedGroup.color}40`
                        }}
                    >
                        <div style={{ color: selectedGroup.color, fontWeight: 700, marginBottom: '0.5rem' }}>
                            {selectedGroup.name}
                        </div>
                        <div style={{ color: '#e2e8f0', fontSize: '0.9rem' }}>
                            <strong>Role in Drug:</strong> {selectedGroup.role}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* SAR Highlights */}
            <div style={{
                marginTop: '1.5rem',
                padding: '1rem',
                background: 'rgba(139, 92, 246, 0.1)',
                borderRadius: '12px',
                border: '1px solid rgba(139, 92, 246, 0.3)'
            }}>
                <div style={{ color: '#a78bfa', fontWeight: 600, marginBottom: '0.5rem' }}>
                    🎯 Structure-Activity Relationship (SAR)
                </div>
                <ul style={{ color: '#e2e8f0', fontSize: '0.85rem', margin: 0, paddingLeft: '1.25rem' }}>
                    {drug.sarHighlights.map((h, i) => (
                        <li key={i} style={{ marginBottom: '0.25rem' }}>{h}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

// ============================================================================
// DRUG DISCOVERY TAB
// ============================================================================

function DrugDiscoveryTab({ drug }: { drug: DrugCaseStudy }) {
    return (
        <div style={{ padding: '1.5rem' }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1.5rem'
            }}>
                <span style={{ fontSize: '1.5rem' }}>💊</span>
                <div>
                    <h4 style={{ color: '#e2e8f0', margin: 0 }}>Drug Discovery: {drug.name}</h4>
                    <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.85rem' }}>
                        From target to candidate
                    </p>
                </div>
            </div>

            <StructureFunctionViewer drug={drug} />

            {/* Development Story */}
            <div style={{
                marginTop: '1.5rem',
                padding: '1.5rem',
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.1))',
                borderRadius: '16px',
                border: '1px solid rgba(16, 185, 129, 0.3)'
            }}>
                <div style={{ color: '#10b981', fontWeight: 600, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span>📖</span> Discovery Story
                </div>
                <div style={{ color: '#e2e8f0', fontSize: '0.9rem', lineHeight: 1.7 }}>
                    {drug.developmentStory}
                </div>
            </div>
        </div>
    );
}

// ============================================================================
// DRUG DEVELOPMENT TAB
// ============================================================================

function DrugDevelopmentTab({ drug }: { drug: DrugCaseStudy }) {
    const [activeStage, setActiveStage] = useState<number>(0);

    const stages = [
        { name: 'Target ID', icon: '🎯', description: 'Identify disease-relevant protein target' },
        { name: 'Hit Discovery', icon: '🔍', description: 'Find molecules that interact with target' },
        { name: 'Lead Optimization', icon: '⚗️', description: 'Improve potency, selectivity, ADMET' },
        { name: 'Preclinical', icon: '🐁', description: 'Safety and efficacy in animal models' },
        { name: 'Clinical Trials', icon: '👨‍⚕️', description: 'Phase I, II, III human testing' },
        { name: 'FDA Approval', icon: '✅', description: 'Regulatory review and market launch' }
    ];

    return (
        <div style={{ padding: '1.5rem' }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1.5rem'
            }}>
                <span style={{ fontSize: '1.5rem' }}>🧬</span>
                <div>
                    <h4 style={{ color: '#e2e8f0', margin: 0 }}>Drug Development Pipeline</h4>
                    <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.85rem' }}>
                        ~12 years, $2.6 billion per drug
                    </p>
                </div>
            </div>

            {/* Pipeline Visualization */}
            <div style={{
                display: 'flex',
                gap: '0.5rem',
                marginBottom: '1.5rem',
                overflowX: 'auto',
                padding: '0.5rem 0'
            }}>
                {stages.map((stage, i) => (
                    <motion.button
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveStage(i)}
                        style={{
                            padding: '0.75rem 1rem',
                            background: activeStage === i
                                ? 'linear-gradient(135deg, #8b5cf6, #6366f1)'
                                : 'rgba(255, 255, 255, 0.05)',
                            border: activeStage === i ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '0.25rem',
                            minWidth: '100px'
                        }}
                    >
                        <span style={{ fontSize: '1.5rem' }}>{stage.icon}</span>
                        <span style={{
                            color: activeStage === i ? 'white' : '#94a3b8',
                            fontSize: '0.75rem',
                            fontWeight: 600
                        }}>
                            {stage.name}
                        </span>
                    </motion.button>
                ))}
            </div>

            {/* Stage Details */}
            <div style={{
                padding: '1.5rem',
                background: 'rgba(0, 0, 0, 0.4)',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
                <div style={{ color: '#a78bfa', fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                    {stages[activeStage].icon} {stages[activeStage].name}
                </div>
                <div style={{ color: '#e2e8f0', fontSize: '0.9rem' }}>
                    {stages[activeStage].description}
                </div>
            </div>

            {/* Clinical Use */}
            <div style={{
                marginTop: '1.5rem',
                padding: '1rem',
                background: 'rgba(16, 185, 129, 0.1)',
                borderRadius: '12px',
                border: '1px solid rgba(16, 185, 129, 0.3)'
            }}>
                <div style={{ color: '#10b981', fontWeight: 600, marginBottom: '0.25rem' }}>
                    💊 Clinical Use of {drug.name}
                </div>
                <div style={{ color: '#e2e8f0', fontSize: '0.9rem' }}>
                    {drug.clinicalUse}
                </div>
            </div>
        </div>
    );
}

// ============================================================================
// LESSON-SPECIFIC VIRTUAL LABS
// ============================================================================

function BondingLab() {
    const [selectedBondType, setSelectedBondType] = useState<'ionic' | 'covalent'>('covalent');

    return (
        <div style={{ padding: '1.5rem' }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1.5rem'
            }}>
                <span style={{ fontSize: '1.5rem' }}>⚗️</span>
                <div>
                    <h4 style={{ color: '#e2e8f0', margin: 0 }}>Bond Type Comparison Lab</h4>
                    <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.85rem' }}>
                        How bond type affects drug design
                    </p>
                </div>
            </div>

            {/* Bond Type Selector */}
            <div style={{
                display: 'flex',
                gap: '1rem',
                marginBottom: '1.5rem'
            }}>
                {(['ionic', 'covalent'] as const).map(type => (
                    <motion.button
                        key={type}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedBondType(type)}
                        style={{
                            flex: 1,
                            padding: '1.5rem',
                            background: selectedBondType === type
                                ? type === 'ionic'
                                    ? 'linear-gradient(135deg, #f59e0b, #d97706)'
                                    : 'linear-gradient(135deg, #3b82f6, #2563eb)'
                                : 'rgba(255, 255, 255, 0.05)',
                            border: 'none',
                            borderRadius: '16px',
                            cursor: 'pointer',
                            textAlign: 'center'
                        }}
                    >
                        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                            {type === 'ionic' ? '⚡' : '🔗'}
                        </div>
                        <div style={{ color: 'white', fontWeight: 700, textTransform: 'capitalize' }}>
                            {type} Bonding
                        </div>
                        <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                            {type === 'ionic' ? 'Electron transfer' : 'Electron sharing'}
                        </div>
                    </motion.button>
                ))}
            </div>

            {/* Bond Visualization */}
            <div style={{
                background: 'rgba(0, 0, 0, 0.4)',
                borderRadius: '16px',
                padding: '2rem',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '200px'
            }}>
                <AnimatePresence mode="wait">
                    {selectedBondType === 'ionic' ? (
                        <motion.div
                            key="ionic"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            style={{ textAlign: 'center' }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                                <div style={{
                                    width: '80px',
                                    height: '80px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontWeight: 700,
                                    fontSize: '1.5rem'
                                }}>
                                    Na⁺
                                </div>
                                <motion.div
                                    animate={{ x: [0, 10, 0] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                    style={{ fontSize: '2rem' }}
                                >
                                    ⚡
                                </motion.div>
                                <div style={{
                                    width: '80px',
                                    height: '80px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontWeight: 700,
                                    fontSize: '1.5rem'
                                }}>
                                    Cl⁻
                                </div>
                            </div>
                            <div style={{ color: '#f59e0b', marginTop: '1rem', fontWeight: 600 }}>
                                IONIC: Complete electron transfer
                            </div>
                            <div style={{ color: '#94a3b8', marginTop: '0.5rem', fontSize: '0.85rem' }}>
                                Example: Lithium salts (psychiatric drugs)
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="covalent"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            style={{ textAlign: 'center' }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <div style={{
                                    width: '80px',
                                    height: '80px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #6b7280, #4b5563)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontWeight: 700,
                                    fontSize: '1.5rem'
                                }}>
                                    C
                                </div>
                                <motion.div
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                    style={{
                                        width: '60px',
                                        height: '8px',
                                        background: 'linear-gradient(90deg, #6b7280, #ef4444, #6b7280)',
                                        borderRadius: '4px'
                                    }}
                                />
                                <div style={{
                                    width: '80px',
                                    height: '80px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontWeight: 700,
                                    fontSize: '1.5rem'
                                }}>
                                    O
                                </div>
                            </div>
                            <div style={{ color: '#3b82f6', marginTop: '1rem', fontWeight: 600 }}>
                                COVALENT: Electron sharing
                            </div>
                            <div style={{ color: '#94a3b8', marginTop: '0.5rem', fontSize: '0.85rem' }}>
                                Example: Aspirin (ester + carboxylic acid)
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Drug Impact Box */}
            <div style={{
                marginTop: '1.5rem',
                padding: '1rem',
                background: 'rgba(139, 92, 246, 0.1)',
                borderRadius: '12px',
                border: '1px solid rgba(139, 92, 246, 0.3)'
            }}>
                <div style={{ color: '#a78bfa', fontWeight: 600, marginBottom: '0.5rem' }}>
                    🎯 Drug Design Impact
                </div>
                <div style={{ color: '#e2e8f0', fontSize: '0.85rem', lineHeight: 1.6 }}>
                    {selectedBondType === 'ionic' ? (
                        <>
                            <strong>Ionic drugs</strong> (like Lithium) work by altering ion concentrations.
                            They're water-soluble but may have off-target effects.
                        </>
                    ) : (
                        <>
                            <strong>Covalent drugs</strong> (like Aspirin) form specific bonds with target proteins.
                            Most small-molecule drugs use covalent bonding within the molecule.
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function AdvancedDrugLab({ lessonId }: AdvancedDrugLabProps) {
    const [activeTab, setActiveTab] = useState<'virtualLab' | 'discovery' | 'development'>('virtualLab');
    const [selectedDrug, setSelectedDrug] = useState<DrugCaseStudy | null>(null);
    const [labTab, setLabTab] = useState<'diclofenac' | 'btk' | 'forces' | 'molecules'>('diclofenac');

    // Get drugs for this lesson
    const lessonDrugs = DRUG_CASES[lessonId] || DRUG_CASES['chemical-bonding'];

    // Set default selected drug
    if (!selectedDrug && lessonDrugs.length > 0) {
        setSelectedDrug(lessonDrugs[0]);
    }

    const tabs = [
        { id: 'virtualLab', label: 'Virtual Lab', icon: '🔬' },
        { id: 'discovery', label: 'Drug Discovery', icon: '💊' },
        { id: 'development', label: 'Drug Development', icon: '🧬' }
    ];

    // Special case for Diclofenac Lab (Chemical Bonding Lesson) - Now with multiple tabs
    if (lessonId === 'chemical-bonding') {

        const labTabs = [
            { id: 'diclofenac', label: 'Diclofenac Lab', icon: '🧪' },
            { id: 'btk', label: 'BTK Masterclass', icon: '🎯' },
            { id: 'forces', label: 'Molecular Forces', icon: '⚡' },
            { id: 'molecules', label: 'Featured Molecules', icon: '💊' }
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
                    background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(59, 130, 246, 0.15) 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                }}>
                    <span style={{ fontSize: '1.75rem' }}>🎓</span>
                    <div>
                        <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'white', margin: 0 }}>
                            Advanced Drug Discovery & Design
                        </h3>
                        <p style={{ color: 'var(--neutral-400)', margin: '0.25rem 0 0', fontSize: '0.9rem' }}>
                            Molecular Mechanics • Covalent Resistance • Salt Engineering
                        </p>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div style={{
                    display: 'flex',
                    gap: '0.5rem',
                    padding: '1rem 2rem',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                    flexWrap: 'wrap'
                }}>
                    {labTabs.map(tab => (
                        <motion.button
                            key={tab.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setLabTab(tab.id as any)}
                            style={{
                                padding: '0.6rem 1.2rem',
                                background: labTab === tab.id
                                    ? 'linear-gradient(135deg, #8b5cf6, #6366f1)'
                                    : 'rgba(255,255,255,0.08)',
                                border: labTab === tab.id ? 'none' : '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '10px',
                                color: 'white',
                                fontWeight: 600,
                                fontSize: '0.85rem',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            <span>{tab.icon}</span>
                            {tab.label}
                        </motion.button>
                    ))}
                </div>

                {/* Tab Content */}
                <AnimatePresence mode="wait">
                    {labTab === 'diclofenac' && (
                        <motion.div key="diclofenac" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <DiclofenacLab />
                        </motion.div>
                    )}
                    {labTab === 'btk' && (
                        <motion.div key="btk" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <BTKMasterclass />
                        </motion.div>
                    )}
                    {labTab === 'forces' && (
                        <motion.div key="forces" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <MolecularForceSimulator />
                        </motion.div>
                    )}
                    {labTab === 'molecules' && (
                        <motion.div key="molecules" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <DiclofenacFeaturedMolecules />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    }

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
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(59, 130, 246, 0.15) 100%)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '1.75rem' }}>🎓</span>
                    <div>
                        <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'white', margin: 0 }}>
                            PhD-Level Drug Discovery Lab
                        </h3>
                        <p style={{ color: 'var(--neutral-400)', margin: '0.25rem 0 0', fontSize: '0.9rem' }}>
                            Structure-Function Relationships • Case Studies • Lead Optimization
                        </p>
                    </div>
                </div>
            </div>

            {/* Drug Selector (if multiple) */}
            {lessonDrugs.length > 1 && (
                <div style={{
                    padding: '1rem 2rem',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    gap: '0.5rem'
                }}>
                    {lessonDrugs.map(drug => (
                        <button
                            key={drug.name}
                            onClick={() => setSelectedDrug(drug)}
                            style={{
                                padding: '0.5rem 1rem',
                                background: selectedDrug?.name === drug.name
                                    ? 'rgba(139, 92, 246, 0.3)'
                                    : 'rgba(255, 255, 255, 0.05)',
                                border: selectedDrug?.name === drug.name
                                    ? '1px solid #8b5cf6'
                                    : '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '8px',
                                color: 'white',
                                fontWeight: 600,
                                cursor: 'pointer',
                                fontSize: '0.85rem'
                            }}
                        >
                            {drug.name}
                        </button>
                    ))}
                </div>
            )}

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
                {activeTab === 'virtualLab' && (
                    <motion.div
                        key="virtualLab"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        {lessonId === 'hybridization' ? <DiclofenacLab /> : <BondingLab />}
                    </motion.div>
                )}

                {activeTab === 'discovery' && selectedDrug && (
                    <motion.div
                        key="discovery"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <DrugDiscoveryTab drug={selectedDrug} />
                    </motion.div>
                )}

                {activeTab === 'development' && selectedDrug && (
                    <motion.div
                        key="development"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <DrugDevelopmentTab drug={selectedDrug} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
