'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface MolstarViewerProps {
    pdbId: string;
    height?: number;
}

// Using RCSB 3D View iframe - most reliable method to show real PDB structures
export default function MolstarViewer({ pdbId, height = 400 }: MolstarViewerProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    // RCSB 3D Structure Viewer URL
    const viewerUrl = `https://www.rcsb.org/3d-view/${pdbId.toUpperCase()}?preset=ligandInteraction`;

    return (
        <div style={{
            position: 'relative',
            height: `${height}px`,
            borderRadius: '12px',
            overflow: 'hidden',
            background: '#1e1e2e',
            border: '1px solid var(--neutral-800)'
        }}>
            {/* Loading State */}
            {isLoading && !error && (
                <div style={{
                    position: 'absolute', inset: 0,
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    background: '#1e1e2e', zIndex: 10
                }}>
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                        style={{
                            width: '40px', height: '40px',
                            border: '3px solid #333',
                            borderTopColor: 'var(--primary-500)',
                            borderRadius: '50%',
                            marginBottom: '1rem'
                        }}
                    />
                    <p style={{ color: 'var(--neutral-400)', margin: 0, fontSize: '0.9rem' }}>
                        Loading Crystal Structure...
                    </p>
                    <p style={{ color: 'var(--neutral-500)', margin: '0.25rem 0 0', fontSize: '0.75rem' }}>
                        PDB: {pdbId.toUpperCase()}
                    </p>
                </div>
            )}

            {/* Error Fallback */}
            {error && (
                <div style={{
                    position: 'absolute', inset: 0,
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    background: '#1e1e2e', zIndex: 10
                }}>
                    <span style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔬</span>
                    <p style={{ color: 'var(--neutral-300)', margin: 0, fontSize: '0.9rem' }}>
                        PDB: {pdbId.toUpperCase()}
                    </p>
                    <a
                        href={`https://www.rcsb.org/3d-view/${pdbId.toUpperCase()}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            marginTop: '1rem',
                            padding: '0.75rem 1.5rem',
                            background: 'var(--primary-500)',
                            borderRadius: '8px',
                            color: 'white',
                            textDecoration: 'none',
                            fontSize: '0.85rem',
                            fontWeight: 600
                        }}
                    >
                        View in RCSB 3D Viewer →
                    </a>
                </div>
            )}

            {/* RCSB 3D View iFrame */}
            <iframe
                src={viewerUrl}
                style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    display: isLoading || error ? 'none' : 'block'
                }}
                onLoad={() => setIsLoading(false)}
                onError={() => { setError(true); setIsLoading(false); }}
                title={`PDB Structure: ${pdbId}`}
                allow="fullscreen"
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            />
        </div>
    );
}
