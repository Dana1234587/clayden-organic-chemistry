'use client';

import React, { useState } from 'react';

interface MALDIDiagramProps {
    className?: string;
}

export default function MALDIDiagram({ className = '' }: MALDIDiagramProps) {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <div className={`border-2 border-amber-300 rounded-lg p-6 bg-gradient-to-br from-amber-50 to-yellow-50 ${className}`}>
            <h3 className="text-xl font-bold text-center mb-4 text-amber-900">MALDI: Matrix-Assisted Laser Desorption/Ionization</h3>

            <div className="bg-white rounded-lg p-4 mb-6 border-2 border-amber-200">
                <h4 className="font-bold text-lg text-amber-900 mb-2">What is MALDI?</h4>
                <p className="text-gray-700 mb-2">
                    MALDI uses a <strong>laser</strong> to desorb and ionize analyte molecules from a <strong>matrix</strong> crystal. Perfect for large, fragile biomolecules!
                </p>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="bg-green-50 p-3 rounded border border-green-300">
                        <p className="font-semibold text-green-800 text-sm mb-1">✓ Advantages:</p>
                        <ul className="text-xs text-gray-700 space-y-1">
                            <li>• Ultra-soft ionization</li>
                            <li>• Singly-charged ions [M+H]⁺</li>
                            <li>• High tolerance to salts</li>
                            <li>• Fast analysis</li>
                        </ul>
                    </div>
                    <div className="bg-blue-50 p-3 rounded border border-blue-300">
                        <p className="font-semibold text-blue-800 text-sm mb-1">📊 Applications:</p>
                        <ul className="text-xs text-gray-700 space-y-1">
                            <li>• Peptide mass fingerprinting</li>
                            <li>• Protein identification</li>
                            <li>• Polymers</li>
                            <li>• Oligosaccharides</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* MALDI Process Diagram */}
            <div className="bg-white rounded-lg p-6 border-2 border-amber-200 mb-6">
                <h4 className="font-semibold text-amber-900 mb-4 text-center">MALDI Process</h4>

                <svg viewBox="0 0 800 450" className="w-full h-auto">
                    {/* Step 1: Sample preparation */}
                    <g>
                        <text x="50" y="30" className="text-sm font-bold fill-amber-900">Step 1: Sample Preparation</text>
                        <rect x="50" y="45" width="200" height="120" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" rx="5" />

                        {/* Matrix crystals */}
                        <g>
                            {[0, 1, 2, 3, 4].map((i) => (
                                <g key={i}>
                                    <polygon
                                        points={`${80 + i * 30},${90 + Math.random() * 20} ${90 + i * 30},${70 + Math.random() * 20} ${100 + i * 30},${85 + Math.random() * 20} ${95 + i * 30},${100 + Math.random() * 20}`}
                                        fill="#fbbf24"
                                        stroke="#d97706"
                                        strokeWidth="1"
                                    />
                                </g>
                            ))}
                        </g>

                        {/* Analyte molecules (small dots) */}
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <circle
                                key={i}
                                cx={70 + (i % 4) * 40}
                                cy={110 + Math.floor(i / 4) * 20}
                                r="3"
                                fill="#dc2626"
                            />
                        ))}

                        <text x="150" y="145" textAnchor="middle" className="text-xs fill-amber-700 font-bold">Matrix crystals</text>
                        <text x="150" y="158" textAnchor="middle" className="text-xs fill-red-600">+ Analyte</text>

                        {/* Metal plate */}
                        <rect x="50" y="165" width="200" height="10" fill="#71717a" stroke="#3f3f46" strokeWidth="2" />
                        <text x="150" y="193" textAnchor="middle" className="text-xs fill-gray-600">Metal target plate</text>
                    </g>

                    {/* Arrow */}
                    <path d="M 280 105 L 330 105" stroke="#d97706" strokeWidth="3" markerEnd="url(#arroworange)" />

                    {/* Step 2: Laser pulse */}
                    <g>
                        <text x="360" y="30" className="text-sm font-bold fill-amber-900">Step 2: Laser Pulse</text>
                        <rect x="360" y="45" width="200" height="150" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" rx="5" />

                        {/* Laser beam */}
                        <g>
                            <path d="M 400 50 L 460 170" stroke="#ef4444" strokeWidth="6" opacity="0.7" />
                            <path d="M 420 50 L 460 170" stroke="#ef4444" strokeWidth="6" opacity="0.7" />
                            <path d="M 440 50 L 460 170" stroke="#ef4444" strokeWidth="6" opacity="0.7" />
                            <text x="400" y="40" className="text-xs fill-red-600 font-bold">UV Laser (337 nm)</text>
                            <polygon points="455,170 465,170 460,180" fill="#ef4444" />
                        </g>

                        {/* Explosion/desorption */}
                        <g>
                            {/* Matrix and analyte ejection */}
                            {[0, 1, 2, 3, 4, 5].map((i) => {
                                const angle = (i * 60) - 150;
                                const x = 460 + Math.cos(angle * Math.PI / 180) * (30 + i * 5);
                                const y = 180 + Math.sin(angle * Math.PI / 180) * (30 + i * 5);
                                return (
                                    <g key={i}>
                                        <circle cx={x} cy={y} r="2" fill={i % 3 === 0 ? "#dc2626" : "#fbbf24"} />
                                        <path
                                            d={`M 460 180 L ${x} ${y}`}
                                            stroke="#fca5a5"
                                            strokeWidth="1"
                                            strokeDasharray="2,2"
                                            opacity="0.5"
                                        />
                                    </g>
                                );
                            })}

                            <text x="490" y="150" className="text-lg">💥</text>
                        </g>

                        {/* Target plate */}
                        <rect x="360" y="185" width="200" height="10" fill="#71717a" stroke="#3f3f46" strokeWidth="2" />
                        <text x="460" y="213" textAnchor="middle" className="text-xs fill-gray-600">Sample ablation</text>
                    </g>

                    {/* Arrow */}
                    <path d="M 280 250 L 330 250" stroke="#d97706" strokeWidth="3" markerEnd="url(#arroworange2)" />

                    {/* Step 3: Ionization */}
                    <g>
                        <text x="360" y="240" className="text-sm font-bold fill-amber-900">Step 3: Ion Formation</text>
                        <rect x="360" y="255" width="200" height="130" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" rx="5" />

                        {/* Ionized molecules */}
                        <g>
                            <ellipse cx="400" cy="295" rx="25" ry="15" fill="#a78bfa" fillOpacity="0.3" stroke="#8b5cf6" strokeWidth="2" />
                            <text x="400" y="300" textAnchor="middle" className="text-xs fill-purple-700 font-bold">[M+H]⁺</text>

                            <ellipse cx="460" cy="310" rx="30" ry="18" fill="#a78bfa" fillOpacity="0.3" stroke="#8b5cf6" strokeWidth="2" />
                            <text x="460" y="315" textAnchor="middle" className="text-xs fill-purple-700 font-bold">[M+H]⁺</text>

                            <ellipse cx="510" cy="295" rx="22" ry="13" fill="#a78bfa" fillOpacity="0.3" stroke="#8b5cf6" strokeWidth="2" />
                            <text x="510" y="300" textAnchor="middle" className="text-xs fill-purple-700 font-bold">[M+H]⁺</text>

                            <ellipse cx="430" cy="345" rx="28" ry="16" fill="#a78bfa" fillOpacity="0.3" stroke="#8b5cf6" strokeWidth="2" />
                            <text x="430" y="350" textAnchor="middle" className="text-xs fill-purple-700 font-bold">[M+H]⁺</text>
                        </g>

                        <text x="460" y="375" textAnchor="middle" className="text-xs fill-green-700 font-bold">
                            Singly-charged ions
                        </text>
                    </g>

                    {/* Arrow to mass analyzer */}
                    <g>
                        <path d="M 580 315 L 650 315" stroke="#6366f1" strokeWidth="4" markerEnd="url(#arrowblue)" />
                        <text x="590" y="305" className="text-xs fill-indigo-700 font-semibold">To TOF mass analyzer</text>
                    </g>

                    {/* Mass analyzer representation */}
                    <g>
                        <rect x="670" y="270" width="110" height="90" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" rx="5" />
                        <text x="725" y="290" textAnchor="middle" className="text-xs font-bold fill-blue-800">TOF-MS</text>
                        <text x="725" y="305" textAnchor="middle" className="text-xs fill-blue-600">Time-of-Flight</text>
                        <text x="725" y="325" textAnchor="middle" className="text-xs fill-blue-600">Light ions →</text>
                        <text x="725" y="340" textAnchor="middle" className="text-xs fill-blue-600">fly faster</text>
                    </g>

                    <defs>
                        <marker id="arroworange" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                            <path d="M0,0 L0,6 L9,3 z" fill="#d97706" />
                        </marker>
                        <marker id="arroworange2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                            <path d="M0,0 L0,6 L9,3 z" fill="#d97706" />
                        </marker>
                        <marker id="arrowblue" markerWidth="12" markerHeight="12" refX="10" refY="3" orient="auto" markerUnits="strokeWidth">
                            <path d="M0,0 L0,6 L10,3 z" fill="#6366f1" />
                        </marker>
                    </defs>
                </svg>
            </div>

            {/* Toggle details button */}
            <div className="flex justify-center mb-6">
                <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="px-6 py-3 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 shadow-lg transition-all"
                >
                    {showDetails ? 'Hide' : 'Show'} Matrix Details
                </button>
            </div>

            {/* Matrix information */}
            {showDetails && (
                <div className="bg-amber-50 border-2 border-amber-300 rounded-lg p-4 mb-6">
                    <h4 className="font-bold text-amber-900 mb-3">🧪 Common MALDI Matrices</h4>
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b-2 border-amber-300">
                                <th className="text-left p-2 text-amber-900">Matrix</th>
                                <th className="text-left p-2 text-amber-900">Best For</th>
                                <th className="text-left p-2 text-amber-900">Laser λ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-amber-100">
                                <td className="p-2 text-gray-700 font-semibold">CHCA (α-cyano)</td>
                                <td className="p-2 text-gray-700">Peptides \u003c 5 kDa</td>
                                <td className="p-2 text-gray-700">337 nm (UV)</td>
                            </tr>
                            <tr className="border-b border-amber-100">
                                <td className="p-2 text-gray-700 font-semibold">DHB</td>
                                <td className="p-2 text-gray-700">Carbohydrates, glycoproteins</td>
                                <td className="p-2 text-gray-700">337/355 nm</td>
                            </tr>
                            <tr>
                                <td className="p-2 text-gray-700 font-semibold">Sinapinic acid</td>
                                <td className="p-2 text-gray-700">Proteins \u003e 5 kDa</td>
                                <td className="p-2 text-gray-700">337 nm</td>
                            </tr>
                        </tbody>
                    </table>
                    <p className="text-xs text-gray-600 italic mt-3">
                        💡 The matrix absorbs laser energy and transfers it to the analyte, causing gentle desorption and ionization
                    </p>
                </div>
            )}

            {/* Key Points */}
            <div className="bg-amber-100 border-2 border-amber-400 rounded-lg p-4">
                <h4 className="font-bold text-amber-900 mb-3">🔑 MALDI Key Features</h4>
                <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                        <span className="text-amber-600 font-bold mr-2">•</span>
                        <span className="text-gray-700"><strong>Ultra-gentle:</strong> No fragmentation - perfect for delicate glycoconjugates</span>
                    </li>
                    <li className="flex items-start">
                        <span className="text-amber-600 font-bold mr-2">•</span>
                        <span className="text-gray-700"><strong>Singly-charged:</strong> Produces [M+H]⁺ ions (easier to interpret than ESI)</span>
                    </li>
                    <li className="flex items-start">
                        <span className="text-amber-600 font-bold mr-2">•</span>
                        <span className="text-gray-700"><strong>Fast:</strong> Ideal for high-throughput screening (proteomics)</span>
                    </li>
                    <li className="flex items-start">
                        <span className="text-amber-600 font-bold mr-2">•</span>
                        <span className="text-gray-700"><strong>Salt-tolerant:</strong> Works even with biological sample impurities</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}
