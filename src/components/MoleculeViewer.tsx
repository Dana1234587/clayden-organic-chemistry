'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getMolecule, hasMolecule as checkMolecule } from '@/data/moleculeRegistry';
import { MoleculeData } from '@/data/moleculeTypes';

// Custom SVG for Platinum Complexes (Cisplatin/Transplatin)
function PlatinumComplexSVG({ type }: { type: 'cisplatin' | 'transplatin' }) {
    const isCis = type === 'cisplatin';
    return (
        <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%', maxHeight: '250px' }}>
            {/* Background grid */}
            <defs>
                <radialGradient id="ptGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#e5e5e5" />
                    <stop offset="100%" stopColor="#a3a3a3" />
                </radialGradient>
                <radialGradient id={isCis ? "clGradCis" : "clGradTrans"} cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor={isCis ? "#4ade80" : "#f87171"} />
                    <stop offset="100%" stopColor={isCis ? "#22c55e" : "#ef4444"} />
                </radialGradient>
                <radialGradient id="nGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#60a5fa" />
                    <stop offset="100%" stopColor="#3b82f6" />
                </radialGradient>
            </defs>

            {/* Center Pt */}
            <circle cx="100" cy="100" r="18" fill="url(#ptGrad)" stroke="#737373" strokeWidth="2" />
            <text x="100" y="106" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1f2937">Pt</text>

            {isCis ? (
                /* CIS Configuration: Cl adjacent (90°), NH3 adjacent */
                <>
                    {/* Cl atoms - top and right (adjacent) */}
                    <line x1="100" y1="82" x2="100" y2="52" stroke="#22c55e" strokeWidth="3" />
                    <circle cx="100" cy="42" r="14" fill="url(#clGradCis)" />
                    <text x="100" y="47" textAnchor="middle" fontSize="11" fontWeight="bold" fill="white">Cl</text>

                    <line x1="118" y1="100" x2="148" y2="100" stroke="#22c55e" strokeWidth="3" />
                    <circle cx="158" cy="100" r="14" fill="url(#clGradCis)" />
                    <text x="158" y="105" textAnchor="middle" fontSize="11" fontWeight="bold" fill="white">Cl</text>

                    {/* NH3 groups - bottom and left (adjacent) */}
                    <line x1="100" y1="118" x2="100" y2="148" stroke="#3b82f6" strokeWidth="3" />
                    <circle cx="100" cy="158" r="12" fill="url(#nGrad)" />
                    <text x="100" y="154" textAnchor="middle" fontSize="7" fill="white">NH₃</text>

                    <line x1="82" y1="100" x2="52" y2="100" stroke="#3b82f6" strokeWidth="3" />
                    <circle cx="42" cy="100" r="12" fill="url(#nGrad)" />
                    <text x="42" y="96" textAnchor="middle" fontSize="7" fill="white">NH₃</text>

                    {/* Distance annotation */}
                    <path d="M 100 42 Q 130 70, 158 100" fill="none" stroke="#22c55e" strokeWidth="1" strokeDasharray="3,2" opacity="0.6" />
                    <text x="145" y="60" fontSize="8" fill="#22c55e" fontWeight="bold">3.3 Å</text>
                </>
            ) : (
                /* TRANS Configuration: Cl opposite (180°), NH3 opposite */
                <>
                    {/* Cl atoms - left and right (opposite) */}
                    <line x1="82" y1="100" x2="52" y2="100" stroke="#ef4444" strokeWidth="3" />
                    <circle cx="42" cy="100" r="14" fill="url(#clGradTrans)" />
                    <text x="42" y="105" textAnchor="middle" fontSize="11" fontWeight="bold" fill="white">Cl</text>

                    <line x1="118" y1="100" x2="148" y2="100" stroke="#ef4444" strokeWidth="3" />
                    <circle cx="158" cy="100" r="14" fill="url(#clGradTrans)" />
                    <text x="158" y="105" textAnchor="middle" fontSize="11" fontWeight="bold" fill="white">Cl</text>

                    {/* NH3 groups - top and bottom (opposite) */}
                    <line x1="100" y1="82" x2="100" y2="52" stroke="#3b82f6" strokeWidth="3" />
                    <circle cx="100" cy="42" r="12" fill="url(#nGrad)" />
                    <text x="100" y="38" textAnchor="middle" fontSize="7" fill="white">NH₃</text>

                    <line x1="100" y1="118" x2="100" y2="148" stroke="#3b82f6" strokeWidth="3" />
                    <circle cx="100" cy="158" r="12" fill="url(#nGrad)" />
                    <text x="100" y="154" textAnchor="middle" fontSize="7" fill="white">NH₃</text>

                    {/* Distance annotation */}
                    <line x1="42" y1="115" x2="158" y2="115" stroke="#ef4444" strokeWidth="1" strokeDasharray="3,2" opacity="0.6" />
                    <text x="100" y="130" textAnchor="middle" fontSize="8" fill="#ef4444" fontWeight="bold">4.66 Å</text>
                </>
            )}

            {/* Labels */}
            <text x="100" y="188" textAnchor="middle" fontSize="10" fill={isCis ? "#22c55e" : "#ef4444"} fontWeight="bold">
                {isCis ? "cis-[Pt(NH₃)₂Cl₂]" : "trans-[Pt(NH₃)₂Cl₂]"}
            </text>
            <text x="100" y="15" textAnchor="middle" fontSize="8" fill="#9ca3af">
                Square Planar Geometry
            </text>
        </svg>
    );
}

// Structure2DRenderer - renders 2D skeletal structures from PubChem
function Structure2DRenderer({ pubchemCid, smiles, moleculeName }: {
    pubchemCid?: number;
    smiles?: string;
    moleculeName: string;
}) {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Check for platinum complexes first - render custom SVG
    const lowerName = moleculeName.toLowerCase();
    if (lowerName === 'cisplatin' || lowerName === 'transplatin') {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
                padding: '15px',
                boxSizing: 'border-box',
                background: '#fafafa',
                borderRadius: '8px'
            }}>
                <PlatinumComplexSVG type={lowerName as 'cisplatin' | 'transplatin'} />
            </div>
        );
    }

    useEffect(() => {
        setIsLoading(true);
        setError(null);

        // Use PubChem 2D image API - provides accurate skeletal structures
        if (pubchemCid) {
            // PubChem provides accurate 2D structures with proper bond angles
            const url = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${pubchemCid}/PNG?image_size=300x300`;
            setImageUrl(url);
            setIsLoading(false);
        } else if (smiles) {
            // Fallback to SMILES-based rendering via PubChem
            const url = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/smiles/${encodeURIComponent(smiles)}/PNG?image_size=300x300`;
            setImageUrl(url);
            setIsLoading(false);
        } else {
            setError('No structure data available');
            setIsLoading(false);
        }
    }, [pubchemCid, smiles]);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            padding: '15px',
            boxSizing: 'border-box',
        }}>
            {isLoading ? (
                <div style={{ color: '#666', fontSize: '0.9rem' }}>
                    Loading 2D structure...
                </div>
            ) : error ? (
                <div style={{ color: '#999', fontSize: '0.8rem' }}>{error}</div>
            ) : imageUrl ? (
                <>
                    <img
                        src={imageUrl}
                        alt={`2D structure of ${moleculeName}`}
                        style={{
                            maxWidth: '100%',
                            maxHeight: 'calc(100% - 30px)',
                            objectFit: 'contain',
                        }}
                        onError={() => setError('Could not load 2D structure')}
                    />
                    <div style={{
                        marginTop: '8px',
                        fontSize: '0.65rem',
                        color: '#666',
                        textAlign: 'center',
                    }}>
                        📐 Zigzag Skeletal • ═ Double Bond • ≡ Triple Bond
                    </div>
                </>
            ) : null}
        </div>
    );
}

// Mobile detection hook
function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(
                window.innerWidth < 768 ||
                'ontouchstart' in window ||
                navigator.maxTouchPoints > 0
            );
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return isMobile;
}

interface MoleculeViewerProps {
    moleculeName: string;
    smilesOrPdb?: string;
    description?: string;
    height?: number;
    cid?: number; // Direct PubChem CID bypass
    pdbId?: string; // PDB ID for protein-ligand complexes (e.g., "1PGE")
    rcsbLigandId?: string; // RCSB ligand ID (e.g., "FLP" for Diclofenac)
    autoRotate?: boolean;
    showControls?: boolean;
    startExpanded?: boolean; // Start with 3D model visible immediately
    formula?: string; // Chemical formula to display
    functionalGroups?: { name: string; formula?: string; importance: string }[]; // Functional groups with their functions
}

// ============================================
// MOLECULE DATA MOVED TO CHAPTER-SPECIFIC FILES
// ============================================
// Molecule data has been refactored into separate files for better organization:
// - src/data/moleculeTypes.ts - TypeScript interfaces
// - src/data/moleculeRegistry.ts - Central registry that aggregates all molecules
// - src/data/chapters/chapter1/molecules.ts - Chapter 1 molecules
// - src/data/chapters/chapter2/molecules.ts - Chapter 2 molecules
// 
// Use getMolecule(name) and checkMolecule(name) from the registry imports
// ============================================

type ViewStyle = 'stick' | 'sphere' | 'line' | 'cartoon';

export default function MoleculeViewer({
    moleculeName,
    description,
    height = 350,
    cid,
    pdbId,
    rcsbLigandId,
    autoRotate = false, // Default to false - user clicks to rotate
    startExpanded = false, // Default to collapsed (legacy behavior)
    formula, // Chemical formula
    functionalGroups // Functional groups data
}: MoleculeViewerProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const viewerRef = useRef<any>(null);
    const rotationRef = useRef<number | null>(null);
    const [viewStyle, setViewStyle] = useState<ViewStyle>('stick');
    const [isLoading, setIsLoading] = useState(false);
    const [isExpanded, setIsExpanded] = useState(startExpanded);
    const [isRotating, setIsRotating] = useState(autoRotate);
    const [showLabels, setShowLabels] = useState(false); // Default to NO labels for cleaner view
    const [viewMode, setViewMode] = useState<'3d' | '2d'>('3d'); // Toggle between 3D and 2D
    const [showInfo, setShowInfo] = useState(false); // Info panel toggle
    const [selectedFg, setSelectedFg] = useState<number | null>(null); // Selected functional group index
    const isMobile = useIsMobile();

    // Try to get from registry, or construct transient object if cid or rcsbLigandId provided
    let molecule = getMolecule(moleculeName.toLowerCase());
    if (!molecule && (cid || rcsbLigandId)) {
        molecule = {
            name: moleculeName,
            formula: formula || 'Structure',
            skeletal: 'Structure',
            description: description || 'Loaded from PubChem',
            functionalGroups: [],
            emoji: '💊',
            color: '#3b82f6',
            pubchemCid: cid,
            rcsbLigandId: rcsbLigandId,
            pdbId: pdbId
        } as any;
    }
    const hasMolecule = !!molecule;

    // Load 3D viewer only when expanded
    useEffect(() => {
        if (!isExpanded || !containerRef.current || !hasMolecule) return;

        const loadViewer = async () => {
            setIsLoading(true);

            // Wait for DOM to be ready (important for mobile)
            await new Promise(resolve => setTimeout(resolve, 100));

            if (!containerRef.current) {
                setIsLoading(false);
                return;
            }

            try {
                // Dynamically import 3Dmol
                const $3Dmol = await import('3dmol');

                // Clear previous viewer
                if (viewerRef.current) {
                    viewerRef.current.clear();
                }

                // Ensure container has dimensions
                const container = containerRef.current;
                const rect = container.getBoundingClientRect();
                if (rect.width === 0 || rect.height === 0) {
                    console.warn('Container has no dimensions, retrying...');
                    await new Promise(resolve => setTimeout(resolve, 200));
                }

                // Create new viewer with mobile-optimized options
                const viewer = $3Dmol.createViewer(container, {
                    backgroundColor: 'rgba(10, 10, 15, 0.95)',
                    antialias: !isMobile, // Disable antialiasing on mobile for performance
                    disableFog: isMobile, // Disable fog on mobile
                });

                viewerRef.current = viewer;

                // Try to fetch from PubChem or RCSB PDB for accurate 3D structure
                let modelData = molecule.pdb;
                let modelFormat = molecule.format || 'pdb';
                let loaded3D = false;

                // First try PubChem 3D conformer
                if (molecule.pubchemCid) {
                    try {
                        const pubchemUrl = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${molecule.pubchemCid}/SDF?record_type=3d`;
                        const response = await fetch(pubchemUrl);
                        if (response.ok) {
                            const sdfData = await response.text();
                            // Check if we got actual SDF data (not an error message)
                            if (sdfData.includes('V2000') || sdfData.includes('V3000')) {
                                modelData = sdfData;
                                modelFormat = 'sdf';
                                loaded3D = true;
                                console.log('Loaded SDF from PubChem for CID:', molecule.pubchemCid);
                            }
                        }
                    } catch (err) {
                        console.warn('PubChem 3D failed:', err);
                    }
                }

                // If PubChem failed and we have RCSB ligand ID, try RCSB PDB
                if (!loaded3D && molecule.rcsbLigandId) {
                    try {
                        const rcsbUrl = `https://files.rcsb.org/ligands/download/${molecule.rcsbLigandId}_ideal.sdf`;
                        const response = await fetch(rcsbUrl);
                        if (response.ok) {
                            const sdfData = await response.text();
                            if (sdfData.includes('V2000') || sdfData.includes('V3000')) {
                                modelData = sdfData;
                                modelFormat = 'sdf';
                                loaded3D = true;
                                console.log('Loaded SDF from RCSB PDB for ligand:', molecule.rcsbLigandId);
                            }
                        }
                    } catch (err) {
                        console.warn('RCSB PDB failed:', err);
                    }
                }

                if (!loaded3D) {
                    console.warn('Using local PDB fallback for:', moleculeName);
                }

                viewer.addModel(modelData, modelFormat);
                applyStyle(viewer, viewStyle, molecule.color, showLabels);
                viewer.zoomTo();
                viewer.render();

                // Force a resize to ensure proper rendering on mobile
                if (isMobile) {
                    setTimeout(() => {
                        if (viewerRef.current) {
                            viewerRef.current.resize();
                            viewerRef.current.render();
                        }
                    }, 100);
                }

                // Stop rotation when user interacts with the viewer
                const stopRotationOnInteraction = () => {
                    if (rotationRef.current) {
                        cancelAnimationFrame(rotationRef.current);
                        rotationRef.current = null;
                        setIsRotating(false);
                    }
                };

                containerRef.current?.addEventListener('mousedown', stopRotationOnInteraction);
                containerRef.current?.addEventListener('touchstart', stopRotationOnInteraction);
                containerRef.current?.addEventListener('wheel', stopRotationOnInteraction);

            } catch (error) {
                console.error('Failed to load 3Dmol:', error);
            }

            setIsLoading(false);
        };

        loadViewer();

        return () => {
            if (rotationRef.current) {
                cancelAnimationFrame(rotationRef.current);
            }
            if (viewerRef.current) {
                viewerRef.current.clear();
                viewerRef.current = null;
            }
        };
    }, [isExpanded, moleculeName, hasMolecule]);

    useEffect(() => {
        if (viewerRef.current && hasMolecule) {
            applyStyle(viewerRef.current, viewStyle, molecule.color, showLabels);
            viewerRef.current.render();
        }
    }, [viewStyle, moleculeName, hasMolecule, molecule?.color, showLabels]);

    const applyStyle = (viewer: any, style: ViewStyle, color: string, showLabels: boolean) => {
        viewer.setStyle({}, {});
        viewer.removeAllLabels();

        // Define element colors for reference (Jmol scheme)
        const elementColors: Record<string, string> = {
            'C': '#909090', // Gray - Carbon
            'O': '#FF0D0D', // Red - Oxygen  
            'N': '#3050F8', // Blue - Nitrogen
            'H': '#FFFFFF', // White - Hydrogen
            'S': '#FFFF00', // Yellow - Sulfur
            'F': '#90E050', // Light green - Fluorine
            'Cl': '#1FF01F', // Green - Chlorine
            'Br': '#A62929', // Brown - Bromine
            'I': '#940094', // Purple - Iodine
            'P': '#FF8000', // Orange - Phosphorus
            'Mg': '#00FF00', // Green - Magnesium
            'Fe': '#E06633' // Orange-brown - Iron
        };

        switch (style) {
            case 'stick':
                // Ball and stick with clear bonds
                viewer.setStyle({}, {
                    stick: { radius: 0.2, colorscheme: 'Jmol' }, // Thicker sticks
                    sphere: { scale: 0.4, colorscheme: 'Jmol' }  // Visible joints
                });
                break;
            case 'sphere':
                // Large spheres to show atoms clearly
                viewer.setStyle({}, {
                    sphere: { scale: 0.9, colorscheme: 'Jmol' }
                });
                break;
            case 'line':
                viewer.setStyle({}, {
                    line: { colorscheme: 'Jmol', linewidth: 3 }
                });
                break;
            case 'cartoon':
                // Custom colored representation
                viewer.setStyle({}, {
                    stick: { radius: 0.25, color: color },
                    sphere: { scale: 0.45, color: color }
                });
                break;
        }

        // Add labels if enabled
        if (showLabels) {
            const atoms = viewer.getModel().atoms;
            atoms.forEach((atom: any) => {
                if (atom.elem !== 'H') { // Skip H for clarity unless requested? Keep it clean.
                    viewer.addLabel(atom.elem, {
                        position: { x: atom.x, y: atom.y, z: atom.z },
                        backgroundColor: 'rgba(0,0,0,0.6)',
                        fontColor: elementColors[atom.elem] || '#FFFFFF',
                        fontSize: 14,
                        fontOpacity: 1,
                        backgroundOpacity: 0.6,
                        borderThickness: 0,
                        inFront: true,
                        showBackground: true
                    });
                }
            });
        }
    };

    const startRotation = () => {
        if (!viewerRef.current) return;

        const rotate = () => {
            if (viewerRef.current && isRotating) {
                viewerRef.current.rotate(0.8, 'y'); // Slightly faster rotation
                viewerRef.current.render();
                rotationRef.current = requestAnimationFrame(rotate);
            }
        };
        rotate();
    };

    const stopRotation = () => {
        if (rotationRef.current) {
            cancelAnimationFrame(rotationRef.current);
            rotationRef.current = null;
        }
    };

    // Handle rotation state changes
    useEffect(() => {
        if (isRotating && viewerRef.current && isExpanded) {
            startRotation();
        } else {
            stopRotation();
        }
        return () => stopRotation();
    }, [isRotating, isExpanded]);

    const handleStyleChange = (style: ViewStyle) => {
        setViewStyle(style);
    };

    const toggleRotation = () => {
        setIsRotating(!isRotating);
    };

    const handleClose = () => {
        setIsExpanded(false);
        if (viewerRef.current) {
            viewerRef.current.clear();
            viewerRef.current = null;
        }
    };

    // Placeholder card when not expanded
    if (!isExpanded) {
        return (
            <motion.div
                className="molecule-viewer-container"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                    background: hasMolecule
                        ? `linear-gradient(135deg, ${molecule.color}15 0%, rgba(30, 30, 46, 0.95) 50%)`
                        : 'var(--gradient-card)',
                    cursor: hasMolecule ? 'pointer' : 'default',
                }}
                onClick={() => hasMolecule && setIsExpanded(true)}
                whileHover={hasMolecule ? { scale: 1.02, y: -4 } : {}}
                whileTap={hasMolecule ? { scale: 0.98 } : {}}
            >
                <div style={{
                    padding: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '180px',
                    textAlign: 'center',
                }}>
                    {hasMolecule ? (
                        <>
                            <span style={{ fontSize: '3.5rem', marginBottom: '0.75rem' }}>
                                {molecule.emoji}
                            </span>
                            <h4 style={{
                                margin: 0,
                                fontSize: '1.2rem',
                                color: 'var(--neutral-100)',
                                fontWeight: 600,
                                marginBottom: '0.25rem',
                            }}>
                                {moleculeName}
                            </h4>
                            {/* Chemical Formula */}
                            <div style={{
                                fontSize: '1.1rem',
                                fontWeight: 600,
                                color: molecule.color,
                                marginBottom: '0.5rem',
                                fontFamily: 'monospace',
                            }}>
                                {molecule.formula}
                            </div>
                            {/* Skeletal Description */}
                            <p style={{
                                margin: '0 0 0.75rem',
                                fontSize: '0.8rem',
                                color: 'var(--neutral-400)',
                                lineHeight: 1.4,
                                textAlign: 'center',
                            }}>
                                📐 {molecule.skeletal}
                            </p>
                            {/* Functional Groups */}
                            <div style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '6px',
                                justifyContent: 'center',
                                marginBottom: '1rem',
                            }}>
                                {molecule.functionalGroups.map((group, i) => (
                                    <span
                                        key={i}
                                        style={{
                                            background: `${molecule.color}20`,
                                            color: molecule.color,
                                            padding: '3px 8px',
                                            borderRadius: '6px',
                                            fontSize: '0.7rem',
                                            fontWeight: 500,
                                        }}
                                    >
                                        {group}
                                    </span>
                                ))}
                            </div>
                            {description && (
                                <p style={{
                                    margin: '0 0 0.75rem',
                                    fontSize: '0.8rem',
                                    color: 'var(--neutral-500)',
                                    lineHeight: 1.4,
                                }}>
                                    {description}
                                </p>
                            )}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    padding: '10px 24px',
                                    background: `linear-gradient(135deg, ${molecule.color} 0%, ${molecule.color}cc 100%)`,
                                    border: 'none',
                                    borderRadius: '12px',
                                    color: 'white',
                                    fontSize: '0.9rem',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    boxShadow: `0 4px 20px ${molecule.color}40`,
                                }}
                            >
                                <span>🔬</span>
                                View 3D Model
                            </motion.button>
                        </>
                    ) : (
                        <>
                            <span style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }}>🧬</span>
                            <h4 style={{
                                margin: 0,
                                fontSize: '1.1rem',
                                color: 'var(--neutral-300)',
                                fontWeight: 600,
                            }}>
                                {moleculeName}
                            </h4>
                            <p style={{
                                margin: '0.5rem 0 0',
                                fontSize: '0.8rem',
                                color: 'var(--neutral-500)',
                            }}>
                                3D model coming soon
                            </p>
                        </>
                    )}
                </div>
            </motion.div>
        );
    }

    // Expanded 3D viewer
    return (
        <motion.div
            className="molecule-viewer-container"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden' }}
        >
            {/* Header */}
            <div style={{
                padding: '0.75rem 1rem',
                borderBottom: '1px solid var(--card-border)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '0.5rem',
                flexWrap: 'wrap'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flex: '1 1 auto' }}>
                    <span style={{ fontSize: '1.2rem' }}>{molecule?.emoji || '🧬'}</span>
                    <h4 style={{
                        margin: 0,
                        fontSize: '1rem',
                        color: 'var(--neutral-100)',
                        fontWeight: 600,
                    }}>
                        {moleculeName}
                    </h4>
                    <span style={{
                        fontFamily: 'monospace',
                        color: molecule?.color || 'var(--primary-400)',
                        fontSize: '0.85rem',
                    }}>
                        {molecule?.formula}
                    </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                    {/* Info Button */}
                    {functionalGroups && functionalGroups.length > 0 && (
                        <button
                            onClick={() => setShowInfo(!showInfo)}
                            style={{
                                padding: '6px 12px',
                                background: showInfo ? 'linear-gradient(135deg, #8b5cf6, #6366f1)' : 'rgba(139, 92, 246, 0.2)',
                                border: '1px solid rgba(139, 92, 246, 0.4)',
                                borderRadius: '6px',
                                color: 'white',
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                            }}
                        >
                            ℹ️ Info
                        </button>
                    )}
                    <span className="badge" style={{ fontSize: '0.7rem', padding: '4px 8px' }}>3D Interactive</span>
                    <button
                        onClick={handleClose}
                        style={{
                            padding: '6px 12px',
                            background: 'rgba(255, 255, 255, 0.15)',
                            border: 'none',
                            borderRadius: '6px',
                            color: 'var(--neutral-200)',
                            fontSize: '0.75rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        ✕ Close
                    </button>
                </div>
            </div>

            {/* Info Panel */}
            <AnimatePresence>
                {showInfo && functionalGroups && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        style={{
                            overflow: 'hidden',
                            background: 'linear-gradient(180deg, rgba(139, 92, 246, 0.1) 0%, rgba(15, 23, 42, 0.95) 100%)',
                            borderBottom: '1px solid rgba(139, 92, 246, 0.2)'
                        }}
                    >
                        <div style={{ padding: '0.75rem 1rem' }}>
                            <div style={{ color: '#a78bfa', fontSize: '0.65rem', fontWeight: 700, marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                                🧬 Functional Groups
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                {functionalGroups.map((fg, i) => (
                                    <div key={i} style={{
                                        padding: '0.5rem 0.6rem',
                                        background: 'rgba(99, 102, 241, 0.08)',
                                        borderRadius: '8px',
                                        borderLeft: '3px solid #8b5cf6'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                                            <span style={{ color: '#e2e8f0', fontSize: '0.8rem', fontWeight: 600 }}>{fg.name}</span>
                                            {fg.formula && (
                                                <span style={{
                                                    color: '#a78bfa',
                                                    fontSize: '0.75rem',
                                                    fontFamily: 'monospace',
                                                    background: 'rgba(139, 92, 246, 0.15)',
                                                    padding: '2px 6px',
                                                    borderRadius: '4px'
                                                }}>{fg.formula}</span>
                                            )}
                                        </div>
                                        <div style={{ color: '#94a3b8', fontSize: '0.7rem', marginTop: '0.2rem' }}>{fg.importance}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Viewer */}
            <div style={{ position: 'relative' }}>
                <AnimatePresence>
                    {isLoading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{
                                position: 'absolute',
                                inset: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: 'var(--neutral-900)',
                                zIndex: 10
                            }}
                        >
                            <div style={{ textAlign: 'center' }}>
                                <div style={{
                                    fontSize: '2rem',
                                    marginBottom: '0.5rem',
                                    animation: 'pulse 1.5s infinite',
                                }}>
                                    🔬
                                </div>
                                <div style={{ color: 'var(--primary-400)' }}>
                                    Loading 3D model...
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <div
                    ref={containerRef}
                    style={{
                        width: '100%',
                        height: isMobile ? '250px' : `${Math.min(height, 300)}px`,
                        position: 'relative',
                        zIndex: 1,
                        touchAction: 'none',
                        WebkitUserSelect: 'none',
                        userSelect: 'none',
                        overflow: 'hidden',
                        borderRadius: '8px',
                        margin: '0 auto',
                        maxWidth: '100%',
                    }}
                />

                {/* 2D Structure View (when in 2D mode) */}
                {viewMode === '2d' && molecule && (
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 5,
                        background: 'rgba(255,255,255,0.95)',
                        borderRadius: '12px',
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                    }}>
                        {/* 2D Structure Image */}
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.5rem' }}>
                            <Structure2DRenderer
                                pubchemCid={molecule.pubchemCid}
                                smiles={molecule.smiles}
                                moleculeName={moleculeName}
                            />
                        </div>

                        {/* Interactive Functional Groups */}
                        {functionalGroups && functionalGroups.length > 0 && (
                            <div style={{
                                background: 'linear-gradient(180deg, #1e1e2e 0%, #0f0f1a 100%)',
                                padding: '0.75rem',
                                borderTop: '1px solid rgba(139, 92, 246, 0.2)'
                            }}>
                                <div style={{
                                    color: '#a78bfa',
                                    fontSize: '0.6rem',
                                    fontWeight: 700,
                                    marginBottom: '0.5rem',
                                    textTransform: 'uppercase',
                                    textAlign: 'center'
                                }}>
                                    👆 Click a functional group to learn more
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', justifyContent: 'center' }}>
                                    {functionalGroups.map((fg, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setSelectedFg(selectedFg === i ? null : i)}
                                            style={{
                                                padding: '0.4rem 0.7rem',
                                                background: selectedFg === i
                                                    ? 'linear-gradient(135deg, #8b5cf6, #6366f1)'
                                                    : 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(99, 102, 241, 0.2))',
                                                border: '1px solid rgba(139, 92, 246, 0.4)',
                                                borderRadius: '8px',
                                                color: '#e2e8f0',
                                                fontSize: '0.75rem',
                                                fontWeight: 600,
                                                cursor: 'pointer',
                                                transition: 'all 0.2s',
                                                transform: selectedFg === i ? 'scale(1.05)' : 'scale(1)'
                                            }}
                                        >
                                            {fg.name}
                                            {fg.formula && (
                                                <span style={{
                                                    marginLeft: '0.3rem',
                                                    color: selectedFg === i ? '#fff' : '#a78bfa',
                                                    fontFamily: 'monospace',
                                                    fontSize: '0.65rem'
                                                }}>
                                                    {fg.formula}
                                                </span>
                                            )}
                                        </button>
                                    ))}
                                </div>
                                {/* Selected functional group info */}
                                {selectedFg !== null && functionalGroups[selectedFg] && (
                                    <div style={{
                                        marginTop: '0.5rem',
                                        padding: '0.6rem 0.8rem',
                                        background: 'rgba(139, 92, 246, 0.15)',
                                        borderRadius: '10px',
                                        borderLeft: '3px solid #8b5cf6'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                                            <span style={{ color: '#f1f5f9', fontSize: '0.85rem', fontWeight: 700 }}>
                                                {functionalGroups[selectedFg].name}
                                            </span>
                                            {functionalGroups[selectedFg].formula && (
                                                <span style={{
                                                    color: '#a78bfa',
                                                    fontSize: '0.8rem',
                                                    fontFamily: 'monospace',
                                                    background: 'rgba(139, 92, 246, 0.2)',
                                                    padding: '2px 6px',
                                                    borderRadius: '4px'
                                                }}>
                                                    {functionalGroups[selectedFg].formula}
                                                </span>
                                            )}
                                        </div>
                                        <div style={{ color: '#94a3b8', fontSize: '0.75rem', lineHeight: 1.4 }}>
                                            {functionalGroups[selectedFg].importance}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Color Legend for 3D view */}
            {viewMode === '3d' && (
                <div style={{
                    display: 'flex',
                    flexWrap: 'nowrap',
                    justifyContent: 'space-between',
                    gap: '4px',
                    padding: '6px 12px',
                    background: 'rgba(0, 0, 0, 0.3)',
                    margin: '0',
                    borderRadius: '0'
                }}>
                    {[
                        { elem: 'C', color: '#909090', name: 'Carbon' },
                        { elem: 'O', color: '#FF0D0D', name: 'Oxygen' },
                        { elem: 'N', color: '#3050F8', name: 'Nitrogen' },
                        { elem: 'H', color: '#FFFFFF', name: 'Hydrogen' },
                        { elem: 'S', color: '#FFFF00', name: 'Sulfur' },
                        { elem: 'Cl', color: '#1FF01F', name: 'Chlorine' },
                    ].map(item => (
                        <div key={item.elem} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '3px',
                            fontSize: '0.6rem',
                            color: 'var(--neutral-400)'
                        }}>
                            <div style={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                background: item.color,
                                border: item.elem === 'H' ? '1px solid #666' : 'none'
                            }} />
                            <span>{item.name}</span>
                        </div>
                    ))}
                </div>
            )}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '8px',
                margin: '12px 16px',
            }}>
                <button
                    onClick={() => setViewMode('3d')}
                    style={{
                        flex: 1,
                        padding: '10px',
                        background: viewMode === '3d'
                            ? 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)'
                            : 'rgba(255, 255, 255, 0.1)',
                        border: 'none',
                        borderRadius: '10px',
                        color: viewMode === '3d' ? 'white' : 'var(--neutral-400)',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                    }}
                >
                    🔮 3D Model
                </button>
                <button
                    onClick={() => setViewMode('2d')}
                    style={{
                        flex: 1,
                        padding: '10px',
                        background: viewMode === '2d'
                            ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                            : 'rgba(255, 255, 255, 0.1)',
                        border: 'none',
                        borderRadius: '10px',
                        color: viewMode === '2d' ? 'white' : 'var(--neutral-400)',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                    }}
                >
                    📐 2D Skeletal
                </button>
            </div>

            {/* Controls */}
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                padding: '12px 16px',
                background: 'rgba(0, 0, 0, 0.4)',
                alignItems: 'center'
            }}>
                <button
                    onClick={() => handleStyleChange('stick')}
                    style={{
                        padding: '8px 14px',
                        background: viewStyle === 'stick' ? 'linear-gradient(135deg, #8b5cf6, #6366f1)' : 'rgba(255, 255, 255, 0.1)',
                        border: 'none',
                        borderRadius: '8px',
                        color: 'white',
                        fontSize: '0.8rem',
                        fontWeight: 500,
                        cursor: 'pointer'
                    }}
                >
                    Stick
                </button>
                <button
                    onClick={() => handleStyleChange('sphere')}
                    style={{
                        padding: '8px 14px',
                        background: viewStyle === 'sphere' ? 'linear-gradient(135deg, #8b5cf6, #6366f1)' : 'rgba(255, 255, 255, 0.1)',
                        border: 'none',
                        borderRadius: '8px',
                        color: 'white',
                        fontSize: '0.8rem',
                        fontWeight: 500,
                        cursor: 'pointer'
                    }}
                >
                    Sphere
                </button>
                <button
                    onClick={() => handleStyleChange('line')}
                    style={{
                        padding: '8px 14px',
                        background: viewStyle === 'line' ? 'linear-gradient(135deg, #8b5cf6, #6366f1)' : 'rgba(255, 255, 255, 0.1)',
                        border: 'none',
                        borderRadius: '8px',
                        color: 'white',
                        fontSize: '0.8rem',
                        fontWeight: 500,
                        cursor: 'pointer'
                    }}
                >
                    Line
                </button>
                <button
                    onClick={() => handleStyleChange('cartoon')}
                    style={{
                        padding: '8px 14px',
                        background: viewStyle === 'cartoon' ? 'linear-gradient(135deg, #8b5cf6, #6366f1)' : 'rgba(255, 255, 255, 0.1)',
                        border: 'none',
                        borderRadius: '8px',
                        color: 'white',
                        fontSize: '0.8rem',
                        fontWeight: 500,
                        cursor: 'pointer'
                    }}
                >
                    Colored
                </button>
                <div style={{ flex: 1 }} />
                <button
                    onClick={toggleRotation}
                    style={{
                        padding: '8px 14px',
                        background: isRotating ? 'linear-gradient(135deg, #22c55e, #16a34a)' : 'rgba(255, 255, 255, 0.1)',
                        border: 'none',
                        borderRadius: '8px',
                        color: 'white',
                        fontSize: '0.8rem',
                        fontWeight: 500,
                        cursor: 'pointer'
                    }}
                >
                    {isRotating ? '⏸ Pause' : '▶ Rotate'}
                </button>
            </div>
        </motion.div>
    );
}
