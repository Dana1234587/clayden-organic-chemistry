'use client';

import React, { useState } from 'react';

interface MSInstrumentDiagramProps {
    className?: string;
}

export default function MSInstrumentDiagram({ className = '' }: MSInstrumentDiagramProps) {
    const [activeComponent, setActiveComponent] = useState<string | null>(null);

    const components = {
        ionSource: {
            title: 'Ion Source',
            description: 'Molecules are bombarded with high-energy electrons (70 eV), knocking off electrons to create M⁺• radical cations.',
            details: 'EI (Electron Impact) ionization operating under high vacuum (10⁻⁵ to 10⁻⁸ torr)'
        },
        massAnalyzer: {
            title: 'Mass Analyzer',
            description: 'Ions are accelerated and deflected by a magnetic field. Lighter ions curve more than heavier ions.',
            details: 'Separation based on mass-to-charge ratio (m/z). Only ions with specific m/z reach the detector at a given field strength.'
        },
        detector: {
            title: 'Detector',
            description: 'Ions strike the detector, generating an electrical signal proportional to their abundance.',
            details: 'Signal is amplified and recorded as a mass spectrum showing relative abundance vs m/z.'
        }
    };

    return (
        <div className={`border-2 border-blue-300 rounded-lg p-6 bg-gradient-to-br from-blue-50 to-indigo-50 ${className}`}>
            <h3 className="text-xl font-bold text-center mb-6 text-blue-900">Mass Spectrometer Components</h3>

            {/* Main Diagram */}
            <div className="relative mb-8">
                <svg viewBox="0 0 800 300" className="w-full h-auto">
                    {/* Vacuum chamber outline */}
                    <rect x="20" y="40" width="760" height="220" fill="#f0f4ff" stroke="#4a5568" strokeWidth="2" rx="10" />
                    <text x="400" y="30" textAnchor="middle" className="text-sm font-semibold fill-gray-700">High Vacuum Chamber (10⁻⁵ - 10⁻⁸ torr)</text>

                    {/* Ion Source */}
                    <g
                        onClick={() => setActiveComponent('ionSource')}
                        className="cursor-pointer hover:opacity-80 transition-opacity"
                    >
                        <rect x="50" y="100" width="120" height="120" fill="#fef3c7" stroke="#f59e0b" strokeWidth="3" rx="8" />
                        <text x="110" y="130" textAnchor="middle" className="font-bold fill-amber-700">Ion Source</text>
                        <text x="110" y="150" textAnchor="middle" className="text-xs fill-amber-600">(EI)</text>

                        {/* Electron beam */}
                        <line x1="60" y1="160" x2="100" y2="160" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowred)" />
                        <text x="80" y="155" textAnchor="middle" className="text-xs fill-red-600">e⁻</text>

                        {/* Sample inlet */}
                        <rect x="80" y="70" width="60" height="20" fill="#94a3b8" stroke="#475569" strokeWidth="1" rx="3" />
                        <text x="110" y="84" textAnchor="middle" className="text-xs fill-white font-semibold">Sample</text>
                        <line x1="110" y1="90" x2="110" y2="100" stroke="#475569" strokeWidth="2" markerEnd="url(#arrow)" />

                        {/* Ions created */}
                        {[0, 1, 2].map((i) => (
                            <circle key={i} cx={120 + i * 15} cy={180 + i * 10} r="4" fill="#dc2626" opacity="0.7" />
                        ))}
                    </g>

                    {/* Ion acceleration path */}
                    <g>
                        <path d="M 170 160 Q 250 160 330 160" fill="none" stroke="#8b5cf6" strokeWidth="3" strokeDasharray="5,5" />
                        <text x="250" y="150" textAnchor="middle" className="text-xs fill-purple-600 font-semibold">Accelerating Voltage</text>
                        {/* Ion beam */}
                        {[0, 1, 2, 3, 4].map((i) => (
                            <circle key={i} cx={190 + i * 30} cy={160} r="3" fill="#dc2626" />
                        ))}
                    </g>

                    {/* Mass Analyzer */}
                    <g
                        onClick={() => setActiveComponent('massAnalyzer')}
                        className="cursor-pointer hover:opacity-80 transition-opacity"
                    >
                        <rect x="330" y="80" width="200" height="160" fill="#dbeafe" stroke="#3b82f6" strokeWidth="3" rx="8" />
                        <text x="430" y="110" textAnchor="middle" className="font-bold fill-blue-700">Mass Analyzer</text>
                        <text x="430" y="130" textAnchor="middle" className="text-xs fill-blue-600">(Magnetic Sector)</text>

                        {/* Magnetic field indicators */}
                        <text x="350" y="160" className="text-2xl fill-blue-600">🧲</text>
                        <text x="490" y="160" className="text-2xl fill-blue-600">🧲</text>

                        {/* Curved ion paths */}
                        <path d="M 330 160 Q 380 140 430 150" fill="none" stroke="#ef4444" strokeWidth="2" opacity="0.6" />
                        <text x="380" y="135" className="text-xs fill-red-600">Light ions</text>

                        <path d="M 330 160 Q 380 160 430 165" fill="none" stroke="#f97316" strokeWidth="2" opacity="0.8" />
                        <text x="380" y="175" className="text-xs fill-orange-600">Medium ions</text>

                        <path d="M 330 160 Q 380 180 430 190" fill="none" stroke="#eab308" strokeWidth="2" opacity="0.6" />
                        <text x="380" y="205" className="text-xs fill-yellow-700">Heavy ions</text>
                    </g>

                    {/* Path to detector */}
                    <g>
                        <path d="M 530 165 L 620 165" fill="none" stroke="#f97316" strokeWidth="3" markerEnd="url(#arroworange)" />
                        <text x="575" y="155" textAnchor="middle" className="text-xs fill-orange-600 font-semibold">Selected m/z</text>
                        {[0, 1, 2].map((i) => (
                            <circle key={i} cx={550 + i * 25} cy={165} r="3" fill="#f97316" />
                        ))}
                    </g>

                    {/* Detector */}
                    <g
                        onClick={() => setActiveComponent('detector')}
                        className="cursor-pointer hover:opacity-80 transition-opacity"
                    >
                        <rect x="620" y="120" width="130" height="90" fill="#dcfce7" stroke="#22c55e" strokeWidth="3" rx="8" />
                        <text x="685" y="150" textAnchor="middle" className="font-bold fill-green-700">Detector</text>
                        <text x="685" y="170" textAnchor="middle" className="text-xs fill-green-600">& Amplifier</text>

                        {/* Signal icon */}
                        <path d="M 640 185 L 650 185 L 655 175 L 665 195 L 675 165 L 680 185 L 730 185"
                            fill="none" stroke="#22c55e" strokeWidth="2" />
                    </g>

                    {/* Arrow markers */}
                    <defs>
                        <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                            <path d="M0,0 L0,6 L9,3 z" fill="#475569" />
                        </marker>
                        <marker id="arrowred" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                            <path d="M0,0 L0,6 L9,3 z" fill="#ef4444" />
                        </marker>
                        <marker id="arroworange" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                            <path d="M0,0 L0,6 L9,3 z" fill="#f97316" />
                        </marker>
                    </defs>
                </svg>
            </div>

            {/* Component Info Display */}
            {activeComponent && (
                <div className="bg-white border-2 border-indigo-300 rounded-lg p-4 shadow-lg">
                    <h4 className="text-lg font-bold text-indigo-900 mb-2">
                        {components[activeComponent as keyof typeof components].title}
                    </h4>
                    <p className="text-gray-700 mb-2">
                        {components[activeComponent as keyof typeof components].description}
                    </p>
                    <p className="text-sm text-gray-600 italic">
                        {components[activeComponent as keyof typeof components].details}
                    </p>
                    <button
                        onClick={() => setActiveComponent(null)}
                        className="mt-3 px-4 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm"
                    >
                        Close
                    </button>
                </div>
            )}

            {!activeComponent && (
                <p className="text-center text-gray-600 text-sm italic">
                    Click on any component to learn more
                </p>
            )}
        </div>
    );
}
