'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PDBMolstarViewerProps {
    pdbId: string;
    title: string;
    description?: string;
    height?: number;
}

// Component to embed RCSB Mol* viewer for real PDB structures
export default function PDBMolstarViewer({
    pdbId,
    title,
    description,
    height = 400
}: PDBMolstarViewerProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    // RCSB 3D view URL that embeds Mol* viewer
    const viewerUrl = `https://www.rcsb.org/3d-view/${pdbId}`;

    // Alternative: Direct Mol* URL
    const molstarUrl = `https://molstar.org/viewer/?pdb=${pdbId.toLowerCase()}`;

    const handleLoad = () => {
        setIsLoading(false);
    };

    const handleError = () => {
        setError('Failed to load structure');
        setIsLoading(false);
    };

    return (
        <div style={{
            background: 'var(--neutral-900)',
            borderRadius: '12px',
            border: '1px solid var(--neutral-800)',
            overflow: 'hidden'
        }}>
            {/* Header */}
            <div style={{
                padding: '1rem 1.25rem',
                borderBottom: '1px solid var(--neutral-800)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <div>
                    <h4 style={{
                        margin: 0,
                        fontSize: '1rem',
                        fontWeight: 600,
                        color: 'var(--neutral-200)'
                    }}>
                        {title}
                    </h4>
                    {description && (
                        <p style={{
                            margin: '0.25rem 0 0 0',
                            fontSize: '0.8rem',
                            color: 'var(--neutral-500)'
                        }}>
                            {description}
                        </p>
                    )}
                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                }}>
                    <span style={{
                        padding: '0.25rem 0.5rem',
                        background: 'rgba(139, 92, 246, 0.2)',
                        borderRadius: '6px',
                        fontSize: '0.7rem',
                        fontFamily: 'monospace',
                        color: 'var(--primary-400)'
                    }}>
                        PDB: {pdbId}
                    </span>
                    <a
                        href={`https://www.rcsb.org/structure/${pdbId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            padding: '0.25rem 0.5rem',
                            background: 'var(--neutral-800)',
                            borderRadius: '6px',
                            fontSize: '0.7rem',
                            color: 'var(--neutral-400)',
                            textDecoration: 'none'
                        }}
                    >
                        View on RCSB →
                    </a>
                </div>
            </div>

            {/* Viewer Container */}
            <div style={{
                position: 'relative',
                height: `${height}px`,
                background: '#000'
            }}>
                {/* Loading State */}
                {isLoading && (
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'var(--neutral-900)',
                        zIndex: 5
                    }}>
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                            style={{
                                width: '40px',
                                height: '40px',
                                border: '3px solid var(--neutral-700)',
                                borderTopColor: 'var(--primary-500)',
                                borderRadius: '50%',
                                marginBottom: '1rem'
                            }}
                        />
                        <p style={{ color: 'var(--neutral-400)', margin: 0, fontSize: '0.9rem' }}>
                            Loading Crystal Structure...
                        </p>
                        <p style={{ color: 'var(--neutral-500)', margin: '0.5rem 0 0 0', fontSize: '0.75rem' }}>
                            PDB ID: {pdbId}
                        </p>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'var(--neutral-900)',
                        zIndex: 5
                    }}>
                        <span style={{ fontSize: '2rem', marginBottom: '1rem' }}>⚠️</span>
                        <p style={{ color: 'var(--accent-red)', margin: 0 }}>{error}</p>
                        <a
                            href={`https://www.rcsb.org/3d-view/${pdbId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                marginTop: '1rem',
                                padding: '0.5rem 1rem',
                                background: 'var(--primary-500)',
                                borderRadius: '8px',
                                color: 'white',
                                textDecoration: 'none',
                                fontSize: '0.85rem'
                            }}
                        >
                            Open in New Tab
                        </a>
                    </div>
                )}

                {/* Mol* Iframe */}
                <iframe
                    ref={iframeRef}
                    src={molstarUrl}
                    onLoad={handleLoad}
                    onError={handleError}
                    style={{
                        width: '100%',
                        height: '100%',
                        border: 'none',
                        display: isLoading || error ? 'none' : 'block'
                    }}
                    title={`3D Structure: ${pdbId}`}
                    allow="fullscreen"
                    sandbox="allow-scripts allow-same-origin allow-popups"
                />
            </div>
        </div>
    );
}
