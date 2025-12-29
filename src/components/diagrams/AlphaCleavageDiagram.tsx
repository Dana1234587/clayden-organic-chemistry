'use client';

import React, { useState } from 'react';

interface AlphaCleavageDiagramProps {
    className?: string;
}

export default function AlphaCleavageDiagram({ className = '' }: AlphaCleavageDiagramProps) {
    const [selectedExample, setSelectedExample] = useState<'ketone' | 'alcohol' | 'amine'>('ketone');

    const examples = {
        ketone: {
            title: 'α-Cleavage in Ketones',
            compound: 'Acetone (CH₃COCH₃)',
            mechanism: 'The radical cation cleaves at the α-carbon (next to C=O)',
            products: 'CH₃CO⁺ (m/z = 43, acylium ion) + •CH₃ (neutral radical)',
            explanation: 'The acylium ion (CH₃CO⁺) is stabilized by resonance with the oxygen lone pair.'
        },
        alcohol: {
            title: 'α-Cleavage in Alcohols',
            compound: 'Ethanol (CH₃CH₂OH)',
            mechanism: 'Cleavage at the C-C bond α to the oxygen',
            products: 'CH₂=OH⁺ (m/z = 31) + •CH₃ (neutral radical)',
            explanation: 'Forms an oxonium ion which can further lose H to give CHO⁺ (m/z = 29).'
        },
        amine: {
            title: 'α-Cleavage in Amines',
            compound: 'Diethylamine (CH₃CH₂)₂NH',
            mechanism: 'Cleavage at the C-C bond α to nitrogen',
            products: 'CH₂=NH₂⁺ (m/z = 30, iminium ion) + •CH₂CH₃',
            explanation: 'Nitrogen\'s lone pair can stabilize the positive charge through resonance.'
        }
    };

    return (
        <div className={`border-2 border-purple-300 rounded-lg p-6 bg-gradient-to-br from-purple-50 to-pink-50 ${className}`}>
            <h3 className="text-xl font-bold text-center mb-4 text-purple-900">α-Cleavage Mechanism</h3>

            {/* Example Selector */}
            <div className="flex justify-center gap-3 mb-6">
                {(['ketone', 'alcohol', 'amine'] as const).map((type) => (
                    <button
                        key={type}
                        onClick={() => setSelectedExample(type)}
                        className={`px-4 py-2 rounded-lg font-semibold transition-all ${selectedExample === type
                                ? 'bg-purple-600 text-white shadow-lg'
                                : 'bg-white text-purple-600 border-2 border-purple-300 hover:bg-purple-100'
                            }`}
                    >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                ))}
            </div>

            {/* Current Example Info */}
            <div className="bg-white rounded-lg p-4 mb-6 border-2 border-purple-200">
                <h4 className="font-bold text-lg text-purple-900 mb-2">
                    {examples[selectedExample].title}
                </h4>
                <p className="text-gray-700 mb-1">
                    <span className="font-semibold">Compound:</span> {examples[selectedExample].compound}
                </p>
                <p className="text-gray-700 mb-1">
                    <span className="font-semibold">Mechanism:</span> {examples[selectedExample].mechanism}
                </p>
                <p className="text-gray-700 mb-1">
                    <span className="font-semibold">Products:</span> {examples[selectedExample].products}
                </p>
                <p className="text-sm text-gray-600 italic mt-2">
                    💡 {examples[selectedExample].explanation}
                </p>
            </div>

            {/* Mechanism Diagram */}
            <div className="bg-gradient-to-br from-white to-purple-50 rounded-lg p-6 border-2 border-purple-200">
                {selectedExample === 'ketone' && (
                    <svg viewBox="0 0 700 250" className="w-full h-auto">
                        {/* Molecular Ion */}
                        <g>
                            <text x="50" y="80" className="text-sm font-bold fill-purple-900">Molecular Ion (M⁺•)</text>
                            <text x="50" y="100" className="text-xs fill-gray-600">Acetone radical cation</text>

                            {/* Acetone structure */}
                            <text x="100" y="140" className="text-lg fill-gray-800">H₃C</text>
                            <line x1="140" y1="135" x2="170" y2="135" stroke="#000" strokeWidth="2" />
                            <text x="175" y="140" className="text-lg fill-red-700 font-bold">C</text>
                            <line x1="190" y1="120" x2="190" y2="100" stroke="#000" strokeWidth="3" />
                            <text x="195" y="95" className="text-lg fill-red-700 font-bold">O</text>
                            <line x1="205" y1="135" x2="235" y2="135" stroke="#000" strokeWidth="2" />
                            <text x="240" y="140" className="text-lg fill-gray-800">CH₃</text>

                            {/* Radical dot */}
                            <circle cx="195" cy="155" r="3" fill="#dc2626" />
                            <text x="200" y="158" className="text-xs fill-red-600">•</text>

                            {/* Charge */}
                            <text x="200" y="115" className="text-sm fill-blue-600 font-bold">⁺</text>

                            {/* Alpha carbons labeled */}
                            <text x="110" y="165" className="text-xs fill-purple-600 font-bold">α</text>
                            <text x="250" y="165" className="text-xs fill-purple-600 font-bold">α</text>
                        </g>

                        {/* Arrow */}
                        <g>
                            <path d="M 320 135 L 370 135" stroke="#6b21a8" strokeWidth="3" markerEnd="url(#arrowpurple)" />
                            <text x="345" y="125" className="text-xs fill-purple-700 font-semibold">α-cleavage</text>
                            <text x="340" y="155" className="text-xs fill-gray-600">bond breaks</text>
                        </g>

                        {/* Products */}
                        <g>
                            <text x="420" y="80" className="text-sm font-bold fill-green-700">Products</text>

                            {/* Acylium ion */}
                            <rect x="420" y="95" width="120" height="70" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" rx="5" />
                            <text x="430" y="115" className="text-lg fill-gray-800">H₃C</text>
                            <line x1="470" y1="110" x2="500" y2="110" stroke="#000" strokeWidth="2" />
                            <text x="505" y="115" className="text-lg fill-red-700 font-bold">C</text>
                            <line x1="520" y1="95" x2="520" y2="75" stroke="#000" strokeWidth="3" />
                            <text x="525" y="70" className="text-lg fill-red-700 font-bold">O</text>
                            <text x="525" y="110" className="text-sm fill-blue-600 font-bold">⁺</text>
                            <text x="430" y="145" className="text-xs fill-green-700 font-bold">m/z = 43</text>
                            <text x="430" y="158" className="text-xs fill-green-600">Acylium ion</text>

                            {/* Plus sign */}
                            <text x="555" y="125" className="text-2xl fill-gray-600">+</text>

                            {/* Methyl radical */}
                            <rect x="590" y="95" width="80" height="70" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" rx="5" />
                            <text x="605" y="130" className="text-lg fill-gray-800">•CH₃</text>
                            <text x="600" y="158" className="text-xs fill-amber-600">Neutral radical</text>
                        </g>

                        {/* Arrow markers */}
                        <defs>
                            <marker id="arrowpurple" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                                <path d="M0,0 L0,6 L9,3 z" fill="#6b21a8" />
                            </marker>
                        </defs>
                    </svg>
                )}

                {selectedExample === 'alcohol' && (
                    <svg viewBox="0 0 700 250" className="w-full h-auto">
                        {/* Similar structure for alcohol example */}
                        <text x="50" y="80" className="text-sm font-bold fill-purple-900">Molecular Ion (M⁺•)</text>
                        <text x="50" y="100" className="text-xs fill-gray-600">Ethanol radical cation</text>

                        <text x="80" y="140" className="text-lg fill-gray-800">H₃C—CH₂—O—H</text>
                        <circle cx="125" cy="145" r="3" fill="#dc2626" />
                        <text x="130" y="148" className="text-xs fill-red-600">•⁺</text>

                        <text x="110" y="165" className="text-xs fill-purple-600 font-bold">α</text>

                        <path d="M 250 135 L 300 135" stroke="#6b21a8" strokeWidth="3" markerEnd="url(#arrowpurple2)" />
                        <text x="275" y="125" className="text-xs fill-purple-700">α-cleavage</text>

                        <rect x="350" y="95" width="140" height="70" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" rx="5" />
                        <text x="365" y="130" className="text-lg fill-gray-800">CH₂=OH⁺</text>
                        <text x="360" y="155" className="text-xs fill-green-700 font-bold">m/z = 31</text>

                        <text x="505" y="125" className="text-2xl fill-gray-600">+</text>

                        <rect x="540" y="95" width="80" height="70" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" rx="5" />
                        <text x="555" y="130" className="text-lg fill-gray-800">•CH₃</text>

                        <defs>
                            <marker id="arrowpurple2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                                <path d="M0,0 L0,6 L9,3 z" fill="#6b21a8" />
                            </marker>
                        </defs>
                    </svg>
                )}

                {selectedExample === 'amine' && (
                    <svg viewBox="0 0 700 250" className="w-full h-auto">
                        <text x="50" y="80" className="text-sm font-bold fill-purple-900">Molecular Ion (M⁺•)</text>
                        <text x="50" y="100" className="text-xs fill-gray-600">Diethylamine radical cation</text>

                        <text x="60" y="140" className="text-lg fill-gray-800">(CH₃CH₂)₂NH</text>
                        <circle cx="125" cy="145" r="3" fill="#dc2626" />
                        <text x="130" y="148" className="text-xs fill-red-600">•⁺</text>

                        <path d="M 220" y1="135" x2="270" y2="135" stroke="#6b21a8" strokeWidth="3" markerEnd="url(#arrowpurple3)" />
                        <text x="245" y="125" className="text-xs fill-purple-700">α-cleavage</text>

                        <rect x="320" y="95" width="150" height="70" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" rx="5" />
                        <text x="335" y="130" className="text-lg fill-gray-800">CH₂=NH₂⁺</text>
                        <text x="330" y="155" className="text-xs fill-green-700 font-bold">m/z = 30</text>

                        <text x="485" y="125" className="text-2xl fill-gray-600">+</text>

                        <rect x="520" y="95" width="110" height="70" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" rx="5" />
                        <text x="530" y="130" className="text-lg fill-gray-800">•CH₂CH₃</text>

                        <defs>
                            <marker id="arrowpurple3" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                                <path d="M0,0 L0,6 L9,3 z" fill="#6b21a8" />
                            </marker>
                        </defs>
                    </svg>
                )}
            </div>

            {/* Key Concept Box */}
            <div className="mt-6 bg-purple-100 border-2 border-purple-400 rounded-lg p-4">
                <h4 className="font-bold text-purple-900 mb-2">🔑 Key Concept</h4>
                <p className="text-gray-700 text-sm">
                    <strong>α-Cleavage</strong> is one of the most common fragment pathways. The bond <strong>next to (α to)</strong> a heteroatom (O, N, S) breaks preferentially because the resulting cation can be stabilized by the heteroatom's lone pair through resonance.
                </p>
            </div>
        </div>
    );
}
