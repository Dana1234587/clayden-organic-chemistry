'use client';

import React, { useState } from 'react';

interface ESIMechanismDiagramProps {
    className?: string;
}

export default function ESIMechanismDiagram({ className = '' }: ESIMechanismDiagramProps) {
    const [step, setStep] = useState(0);

    const steps = [
        {
            title: 'Step 1: Sample Injection',
            description: 'Sample solution (protein/peptide/carbohydrate in acidic solution) is injected through a fine needle at high voltage (+3 to +5 kV).'
        },
        {
            title: 'Step 2: Droplet Formation',
            description: 'The high electric field creates charged droplets at the needle tip. Droplets carry excess positive charges (H⁺ ions).'
        },
        {
            title: 'Step 3: Desolvation',
            description: 'Solvent evaporates from droplets as they travel toward the mass analyzer. Droplets become smaller and more charged.'
        },
        {
            title: 'Step 4: Ion Formation',
            description: 'When Coulombic repulsion exceeds surface tension, ions are ejected from droplets. Large molecules gain multiple charges: [M+nH]ⁿ⁺'
        }
    ];

    return (
        <div className={`border-2 border-cyan-300 rounded-lg p-6 bg-gradient-to-br from-cyan-50 to-blue-50 ${className}`}>
            <h3 className="text-xl font-bold text-center mb-4 text-cyan-900">ESI: Electrospray Ionization</h3>

            <div className="bg-white rounded-lg p-4 mb-6 border-2 border-cyan-200">
                <h4 className="font-bold text-lg text-cyan-900 mb-2">Why ESI for Large Molecules?</h4>
                <p className="text-gray-700 mb-2">
                    <strong>Electrospray Ionization (ESI)</strong> is a "soft" ionization technique perfect for analyzing large, delicate biomolecules without fragmenting them.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="bg-green-50 p-3 rounded border border-green-300">
                        <p className="font-semibold text-green-800 text-sm mb-1">✓ Advantages:</p>
                        <ul className="text-xs text-gray-700 space-y-1">
                            <li>• No fragmentation</li>
                            <li>• Multiple charging</li>
                            <li>• Works for huge molecules</li>
                            <li>• Preserves weak interactions</li>
                        </ul>
                    </div>
                    <div className="bg-blue-50 p-3 rounded border border-blue-300">
                        <p className="font-semibold text-blue-800 text-sm mb-1">📊 Applications:</p>
                        <ul className="text-xs text-gray-700 space-y-1">
                            <li>• Proteins & peptides</li>
                            <li>• Oligonucleotides</li>
                            <li>• Carbohydrates</li>
                            <li>• Glycoconjugates</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Step Navigator */}
            <div className="flex justify-center gap-2 mb-6">
                {steps.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setStep(index)}
                        className={`px-4 py-2 rounded-lg font-semibold transition-all ${step === index
                                ? 'bg-cyan-600 text-white shadow-lg'
                                : 'bg-white text-cyan-600 border-2 border-cyan-300 hover:bg-cyan-100'
                            }`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

            {/* Current Step Info */}
            <div className="bg-cyan-100 rounded-lg p-3 mb-6 border-2 border-cyan-300">
                <h4 className="font-bold text-cyan-900 mb-1">{steps[step].title}</h4>
                <p className="text-sm text-gray-700">{steps[step].description}</p>
            </div>

            {/* ESI Process Diagram */}
            <div className="bg-white rounded-lg p-6 border-2 border-cyan-200">
                <svg viewBox="0 0 800 350" className="w-full h-auto">
                    {/* Needle/Spray tip */}
                    <g>
                        <rect x="50" y="150" width="80" height="20" fill="#64748b" stroke="#334155" strokeWidth="2" />
                        <polygon points="130,150 180,165 130,180" fill="#64748b" stroke="#334155" strokeWidth="2" />
                        <text x="60" y="145" className="text-xs fill-gray-600">High voltage</text>
                        <text x="60" y="200" className="text-xs fill-gray-600">needle (+3-5 kV)</text>

                        {/* Sample inlet */}
                        <rect x="20" y="158" width="30" height="4" fill="#3b82f6" stroke="#1e40af" strokeWidth="1" />
                        <text x="10" y="155" className="text-xs fill-blue-600">Sample</text>
                    </g>

                    {/* Step 1: Formation */}
                    {step >= 0 && (
                        <g>
                            <circle cx="200" cy="165" r="15" fill="#3b82f6" fillOpacity="0.3" stroke="#2563eb" strokeWidth="2" />
                            <text x="200" y="170" textAnchor="middle" className="text-xs fill-blue-700">⁺</text>
                            <circle cx="210" cy="175" r="12" fill="#3b82f6" fillOpacity="0.3" stroke="#2563eb" strokeWidth="2" />
                            <text x="210" y="180" textAnchor="middle" className="text-xs fill-blue-700">⁺</text>
                        </g>
                    )}

                    {/* Step 2: Charged droplets */}
                    {step >= 1 && (
                        <g>
                            <circle cx="300" cy="165" r="18" fill="#06b6d4" fillOpacity="0.4" stroke="#0891b2" strokeWidth="2" />
                            {[0, 1, 2, 3].map((i) => (
                                <text key={i} x={285 + i * 10} y={160 + (i % 2) * 10} className="text-xs fill-cyan-700">⁺</text>
                            ))}
                            <text x="300" y="200" textAnchor="middle" className="text-xs fill-cyan-700 font-bold">
                                Charged droplet
                            </text>
                        </g>
                    )}

                    {/* Step 3: Desolv ation */}
                    {step >= 2 && (
                        <g>
                            {/* Smaller droplets */}
                            <circle cx="450" cy="140" r="12" fill="#0ea5e9" fillOpacity="0.5" stroke="#0284c7" strokeWidth="2" />
                            {[0, 1].map((i) => (
                                <text key={i} x={443 + i * 10} y={140 + i * 5} className="text-xs fill-cyan-800">⁺</text>
                            ))}

                            <circle cx="470" cy="180" r="10" fill="#0ea5e9" fillOpacity="0.5" stroke="#0284c7" strokeWidth="2" />
                            <text x="470" y="183" textAnchor="middle" className="text-xs fill-cyan-800">⁺</text>

                            {/* Evaporation symbols */}
                            {[0, 1, 2].map((i) => (
                                <text key={i} x={420 + i * 15} y={120 + i * 5} className="text-xs fill-gray-400">~</text>
                            ))}
                            <text x="450" y="210" textAnchor="middle" className="text-xs fill-gray-600 font-bold">
                                Evaporation
                            </text>
                        </g>
                    )}

                    {/* Step 4: Ion ejection */}
                    {step >= 3 && (
                        <g>
                            {/* Multiply charged ions */}
                            <g>
                                <ellipse cx="600" cy="120" rx="30" ry="15" fill="#a855f7" fillOpacity="0.3" stroke="#9333ea" strokeWidth="2" />
                                <text x="600" y="125" textAnchor="middle" className="text-sm fill-purple-700 font-bold">[M+3H]³⁺</text>
                                <text x="600" y="145" textAnchor="middle" className="text-xs fill-purple-600">Protein (3+ charge)</text>
                            </g>

                            <g>
                                <ellipse cx="620" cy="180" rx="25" ry="12" fill="#ec4899" fillOpacity="0.3" stroke="#db2777" strokeWidth="2" />
                                <text x="620" y="185" textAnchor="middle" className="text-sm fill-pink-700 font-bold">[M+2H]²⁺</text>
                                <text x="620" y="205" textAnchor="middle" className="text-xs fill-pink-600">Peptide (2+ charge)</text>
                            </g>

                            <g>
                                <ellipse cx="600" cy="240" rx="20" ry="10" fill="#22c55e" fillOpacity="0.3" stroke="#16a34a" strokeWidth="2" />
                                <text x="600" y="245" textAnchor="middle" className="text-sm fill-green-700 font-bold">[M+H]⁺</text>
                                <text x="600" y="265" textAnchor="middle" className="text-xs fill-green-600">Small molecule</text>
                            </g>

                            {/* Arrow to mass analyzer */}
                            <path d="M 680 165 L 750 165" stroke="#6366f1" strokeWidth="3" markerEnd="url(#arrowblue)" />
                            <text x="685" y="155" className="text-xs fill-indigo-700 font-semibold">To mass</text>
                            <text x="685" y="180" className="text-xs fill-indigo-700 font-semibold">analyzer</text>
                        </g>
                    )}

                    {/* Electric field lines */}
                    {[0, 1, 2, 3, 4].map((i) => (
                        <g key={i}>
                            <line
                                x1="180"
                                y1={80 + i * 60}
                                x2="760"
                                y2={80 + i * 60}
                                stroke="#dbeafe"
                                strokeWidth="1"
                                strokeDasharray="3,3"
                            />
                            <text x="765" y={83 + i * 60} className="text-xs fill-blue-400">⁺</text>
                        </g>
                    ))}

                    <defs>
                        <marker id="arrowblue" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                            <path d="M0,0 L0,6 L9,3 z" fill="#6366f1" />
                        </marker>
                    </defs>
                </svg>
            </div>

            {/* Multiple Charging Explanation */}
            <div className="mt-6 bg-purple-50 border-2 border-purple-300 rounded-lg p-4">
                <h4 className="font-bold text-purple-900 mb-2">🔋 Multiple Charging - Key Advantage</h4>
                <p className="text-sm text-gray-700 mb-2">
                    Large proteins can gain many charges (e.g., [M+20H]²⁰⁺). This brings their m/z into a measurable range!
                </p>
                <div className="bg-white rounded p-3 mt-2">
                    <p className="text-xs text-gray-700">
                        <strong>Example:</strong> Protein with MW = 50,000 Da
                    </p>
                    <p className="text-xs text-gray-700">
                        • With 20 charges: m/z = 50,000/20 = <strong className="text-purple-700">2,500</strong> (easily detected!)
                    </p>
                    <p className="text-xs text-gray-700">
                        • Without multiple charging: m/z = 50,000 (too high for most instruments)
                    </p>
                </div>
            </div>
        </div>
    );
}
