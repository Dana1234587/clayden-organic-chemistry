'use client';

import React, { useState } from 'react';

interface McLaffertyDiagramProps {
    className?: string;
}

export default function McLaffertyDiagram({ className = '' }: McLaffertyDiagramProps) {
    const [showMechanism, setShowMechanism] = useState(false);

    return (
        <div className={`border-2 border-indigo-300 rounded-lg p-6 bg-gradient-to-br from-indigo-50 to-blue-50 ${className}`}>
            <h3 className="text-xl font-bold text-center mb-4 text-indigo-900">McLafferty Rearrangement</h3>

            <div className="bg-white rounded-lg p-4 mb-6 border-2 border-indigo-200">
                <h4 className="font-bold text-lg text-indigo-900 mb-2">What is McLafferty Rearrangement?</h4>
                <p className="text-gray-700 mb-2">
                    A characteristic rearrangement in carbonyl compounds where a <strong>γ-hydrogen</strong> (hydrogen on the carbon <strong>three bonds away</strong> from C=O) is transferred through a <strong>six-membered ring transition state</strong>.
                </p>
                <p className="text-sm text-gray-600 italic">
                    💡 Results in cleavage of the β-bond and formation of an enol radical cation + neutral alkene
                </p>
            </div>

            {/* Example: 2-Pentanone */}
            <div className="bg-gradient-to-br from-white to-indigo-50 rounded-lg p-6 border-2 border-indigo-200 mb-6">
                <h4 className="font-semibold text-indigo-900 mb-4">Example: 2-Pentanone (CH₃COCH₂CH₂CH₃)</h4>

                <svg viewBox="0 0 800 400" className="w-full h-auto">
                    {/* Starting compound */}
                    <g>
                        <text x="50" y="30" className="text-sm font-bold fill-indigo-900">Molecular Ion (M⁺• = 86)</text>

                        {/* 2-Pentanone structure with labels */}
                        <text x="80" y="80" className="text-base fill-gray-800">H₃C</text>
                        <line x1="120" y1="75" x2="145" y2="75" stroke="#000" strokeWidth="2" />
                        <text x="150" y="80" className="text-base fill-red-700 font-bold">C</text>
                        <line x1="165" y1="60" x2="165" y2="40" stroke="#000" strokeWidth="3" />
                        <text x="170" y="35" className="text-base fill-red-700 font-bold">O</text>

                        {/* Beta carbon */}
                        <line x1="180" y1="75" x2="205" y2="75" stroke="#000" strokeWidth="2" />
                        <text x="210" y="80" className="text-base fill-gray-800">CH₂</text>
                        <text x="215" y="100" className="text-xs fill-blue-600 font-bold">β</text>

                        {/* Gamma carbon with H */}
                        <line x1="250" y1="75" x2="275" y2="75" stroke="#000" strokeWidth="2" />
                        <text x="280" y="80" className="text-base fill-gray-800">CH₂</text>
                        <line x1="295" y1="60" x2="295" y2="40" stroke="#000" strokeWidth="1" />
                        <text x="300" y="35" className="text-base fill-green-700 font-bold">H</text>
                        <text x="290" y="100" className="text-xs fill-green-600 font-bold">γ</text>

                        {/* Terminal methyl */}
                        <line x1="320" y1="75" x2="345" y2="75" stroke="#000" strokeWidth="2" />
                        <text x="350" y="80" className="text-base fill-gray-800">CH₃</text>

                        {/* Radical and charge */}
                        <circle cx="165" cy="90" r="3" fill="#dc2626" />
                        <text x="170" y="93" className="text-xs fill-red-600">•⁺</text>
                    </g>

                    {/* Six-membered transition state */}
                    {showMechanism && (
                        <g>
                            <text x="100" y="180" className="text-sm font-bold fill-purple-700">6-Membered Transition State</text>

                            {/* Curved arrows showing electron movement */}
                            <path d="M 295 45 Q 250 90 210 75" fill="none" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowgreen)" strokeDasharray="3,3" />
                            <text x="240" y="60" className="text-xs fill-green-600">H transfer</text>

                            <path d="M 160 85 Q 190 100 220 85" fill="none" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowred)" strokeDasharray="3,3" />
                            <text x="180" y="115" className="text-xs fill-red-600">π electrons</text>

                            <path d="M 240 80 L 260 90" fill="none" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowblue)" strokeDasharray="3,3" />
                            <text x="245" y="100" className="text-xs fill-blue-600">bond breaks</text>

                            {/* Hexagonal ring outline */}
                            <path d="M 165 70 L 210 70 L 250 85 L 280 75 L 280 55 L 220 45 Z"
                                fill="none" stroke="#9333ea" strokeWidth="2" strokeDasharray="5,5" opacity="0.5" />
                        </g>
                    )}

                    {/* Arrow to products */}
                    <g>
                        <path d="M 400 75 L 450 75" stroke="#6366f1" strokeWidth="3" markerEnd="url(#arrowindigo)" />
                        <text x="405" y="65" className="text-xs fill-indigo-700 font-semibold">McLafferty</text>
                        <text x="405" y="95" className="text-xs fill-gray-600">rearrangement</text>
                    </g>

                    {/* Products */}
                    <g>
                        <text x="500" y="30" className="text-sm font-bold fill-green-700">Products</text>

                        {/* Enol radical cation */}
                        <rect x="490" y="50" width="140" height="90" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" rx="5" />
                        <text x="500" y="70" className="text-xs fill-green-700 font-bold">Enol radical cation</text>
                        <text x="515" y="95" className="text-base fill-gray-800">H₃C</text>
                        <line x1="555" y1="90" x2="580" y2="90" stroke="#000" strokeWidth="2" />
                        <text x="585" y="95" className="text-base fill-red-700 font-bold">C</text>
                        <line x1="600" y1="75" x2="600" y2="55" stroke="#000" strokeWidth="3" />
                        <text x="605" y="50" className="text-base fill-red-700 font-bold">O</text>
                        <line x1="585" y1="105" x2="585" y2="125" stroke="#000" strokeWidth="3" />
                        <text x="590" y="120" className="text-base fill-gray-800">CH</text>
                        <line x1="570" y1="120" x2="555" y2="130" stroke="#000" strokeWidth="1" />
                        <text x="540" y="135" className="text-base fill-green-700">H</text>

                        <circle cx="600" cy="105" r="3" fill="#dc2626" />
                        <text x="605" y="108" className="text-xs fill-red-600">•⁺</text>
                        <text x="500" y="132" className="text-xs fill-green-700 font-bold">m/z = 58</text>

                        {/* Plus sign */}
                        <text x="645" y="90" className="text-2xl fill-gray-600">+</text>

                        {/* Neutral alkene */}
                        <rect x="675" y="50" width="110" height="90" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" rx="5" />
                        <text x="685" y="70" className="text-xs fill-amber-700 font-bold">Neutral alkene</text>
                        <text x="695" y="95" className="text-base fill-gray-800">CH₂=CH₂</text>
                        <text x="685" y="132" className="text-xs fill-amber-600">Ethene (28 amu)</text>
                    </g>

                    {/* Calculation box */}
                    <g>
                        <rect x="50" y="250" width="700" height="120" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="2" rx="8" />
                        <text x="70" y="275" className="text-sm font-bold fill-purple-900">Mass Balance Check:</text>
                        <text x="70" y="300" className="text-sm fill-gray-700">M⁺• (2-Pentanone) = 86 amu</text>
                        <text x="70" y="325" className="text-sm fill-gray-700">Product 1: Enol cation = 58 amu (C₃H₆O⁺•)</text>
                        <text x="70" y="350" className="text-sm fill-gray-700">Product 2: Ethene = 28 amu (C₂H₄)</text>
                        <text x="500" y="310" className="text-sm fill-green-700 font-bold">58 + 28 = 86 ✓</text>
                    </g>

                    {/* Arrow markers */}
                    <defs>
                        <marker id="arrowgreen" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                            <path d="M0,0 L0,6 L9,3 z" fill="#10b981" />
                        </marker>
                        <marker id="arrowred" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                            <path d="M0,0 L0,6 L9,3 z" fill="#ef4444" />
                        </marker>
                        <marker id="arrowblue" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                            <path d="M0,0 L0,6 L9,3 z" fill="#3b82f6" />
                        </marker>
                        <marker id="arrowindigo" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                            <path d="M0,0 L0,6 L9,3 z" fill="#6366f1" />
                        </marker>
                    </defs>
                </svg>
            </div>

            {/* Toggle mechanism button */}
            <div className="flex justify-center mb-6">
                <button
                    onClick={() => setShowMechanism(!showMechanism)}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 shadow-lg transition-all"
                >
                    {showMechanism ? 'Hide' : 'Show'} Mechanism Details
                </button>
            </div>

            {/* Key Points */}
            <div className="bg-indigo-100 border-2 border-indigo-400 rounded-lg p-4">
                <h4 className="font-bold text-indigo-900 mb-3">🔑 Key Requirements for McLafferty Rearrangement</h4>
                <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                        <span className="text-indigo-600 font-bold mr-2">1.</span>
                        <span className="text-gray-700">Must have a <strong>carbonyl group</strong> (C=O)</span>
                    </li>
                    <li className="flex items-start">
                        <span className="text-indigo-600 font-bold mr-2">2.</span>
                        <span className="text-gray-700">Must have a <strong>γ-hydrogen</strong> (H three bonds away from C=O)</span>
                    </li>
                    <li className="flex items-start">
                        <span className="text-indigo-600 font-bold mr-2">3.</span>
                        <span className="text-gray-700">Forms a <strong>6-membered ring</strong> transition state</span>
                    </li>
                    <li className="flex items-start">
                        <span className="text-indigo-600 font-bold mr-2">4.</span>
                        <span className="text-gray-700">Produces an <strong>odd-electron enol cation</strong> + neutral alkene</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}
