'use client';

import React from 'react';
import MSSpectrumExample from './MSSpectrumExample';

interface PropaneFragmentationProps {
    className?: string;
}

export default function PropaneFragmentation({ className = '' }: PropaneFragmentationProps) {
    const spectrumData = [
        { mz: 15, abundance: 20, label: '15', fragment: 'CH₃⁺ (methyl cation)' },
        { mz: 28, abundance: 60, label: '28', fragment: 'C₂H₄⁺• (ethylene radical cation)' },
        { mz: 29, abundance: 100, label: '29', fragment: 'C₂H₅⁺ (ethyl cation)', isBasePeak: true },
        { mz: 44, abundance: 40, label: '44 (M⁺)', fragment: 'C₃H₈⁺• (molecular ion)', isMolecularIon: true }
    ];

    return (
        <div className={`space-y-6 ${className}`}>
            {/* Title */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg p-4">
                <h3 className="text-2xl font-bold text-center">Propane (C₃H₈) Fragmentation Analysis</h3>
                <p className="text-center text-sm mt-1 opacity-90">Simple Alkane • MW = 44</p>
            </div>

            {/* Mass Spectrum */}
            <MSSpectrumExample
                title="Mass Spectrum of Propane"
                data={spectrumData}
                molecularWeight={44}
            />

            {/* Fragmentation Pathway Diagram */}
            <div className="border-2 border-purple-300 rounded-lg p-6 bg-gradient-to-br from-purple-50 to-pink-50">
                <h4 className="text-lg font-bold text-center mb-6 text-purple-900">
                    Fragmentation Pathway
                </h4>

                <svg viewBox="0 0 900 450" className="w-full h-auto">
                    {/* Molecular Ion */}
                    <g>
                        <rect x="350" y="20" width="200" height="90" fill="#f3e8ff" stroke="#7c3aed" strokeWidth="3" rx="8" />
                        <text x="450" y="45" textAnchor="middle" className="text-sm font-bold fill-purple-900">
                            Molecular Ion (M⁺•)
                        </text>
                        <text x="450" y="65" textAnchor="middle" className="text-xs fill-gray-600">
                            m/z = 44
                        </text>

                        {/* Propane structure */}
                        <text x="380" y="90" className="text-lg fill-gray-800">H₃C</text>
                        <line x1="415" y1="85" x2="435" y2="85" stroke="#000" strokeWidth="2" />
                        <text x="440" y="90" className="text-lg fill-gray-800">CH₂</text>
                        <line x1="475" y1="85" x2="495" y2="85" stroke="#000" strokeWidth="2" />
                        <text x="500" y="90" className="text-lg fill-gray-800">CH₃</text>

                        {/* Radical and charge indicators */}
                        <circle cx="450" cy="100" r="3" fill="#dc2626" />
                        <text x="455" y="103" className="text-xs fill-red-600">•⁺</text>

                        <text x="450" y="105" textAnchor="middle" className="text-xs fill-gray-600 italic">
                            (19 valence electrons)
                        </text>
                    </g>

                    {/* Cleavage arrows */}
                    <g>
                        {/* Left cleavage */}
                        <path d="M 400 120 L 250 200" stroke="#9333ea" strokeWidth="3" strokeDasharray="5,5" markerEnd="url(#arrowpurple1)" />
                        <text x="300" y="155" className="text-sm fill-purple-700 font-semibold">C-C cleavage</text>

                        {/* Right cleavage */}
                        <path d="M 500 120 L 650 200" stroke="#9333ea" strokeWidth="3" strokeDasharray="5,5" markerEnd="url(#arrowpurple2)" />
                        <text x="580" y="155" className="text-sm fill-purple-700 font-semibold">C-C cleavage</text>
                    </g>

                    {/* Left products */}
                    <g>
                        {/* Ethyl cation (BASE PEAK) */}
                        <rect x="100" y="210" width="180" height="100" fill="#dcfce7" stroke="#16a34a" strokeWidth="3" rx="8" />
                        <text x="190" y="235" textAnchor="middle" className="text-sm font-bold fill-green-800">
                            Ethyl Cation ⁺
                        </text>
                        <text x="190" y="252" textAnchor="middle" className="text-xs fill-green-700">
                            m/z = 29 (BASE PEAK!)
                        </text>

                        <text x="190" y="275" textAnchor="middle" className="text-lg fill-gray-800">
                            H₃C—CH₂⁺
                        </text>

                        <text x="190" y="295" textAnchor="middle" className="text-xs fill-green-600 italic">
                            More stable - charge dispersal
                        </text>

                        {/* Plus sign */}
                        <text x="295" y="260" className="text-2xl fill-gray-600">+</text>

                        {/* Methyl radical */}
                        <rect x="320" y="230" width="100" height="60" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" rx="5" />
                        <text x="370" y="255" textAnchor="middle" className="text-lg fill-gray-800">•CH₃</text>
                        <text x="370" y="280" textAnchor="middle" className="text-xs fill-amber-600">Neutral radical</text>
                    </g>

                    {/* Right products */}
                    <g>
                        {/* Methyl cation */}
                        <rect x="620" y="210" width="160" height="100" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" rx="8" />
                        <text x="700" y="235" textAnchor="middle" className="text-sm font-bold fill-blue-800">
                            Methyl Cation ⁺
                        </text>
                        <text x="700" y="252" textAnchor="middle" className="text-xs fill-blue-700">
                            m/z = 15 (weaker)
                        </text>

                        <text x="700" y="275" textAnchor="middle" className="text-lg fill-gray-800">
                            H₃C⁺
                        </text>

                        <text x="700" y="295" textAnchor="middle" className="text-xs fill-blue-600 italic">
                            Less stable - small size
                        </text>

                        {/* Plus sign */}
                        <text x="595" y="260" className="text-2xl fill-gray-600">+</text>

                        {/* Ethyl radical */}
                        <rect x="470" y="230" width="110" height="60" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" rx="5" />
                        <text x="525" y="255" textAnchor="middle" className="text-lg fill-gray-800">•CH₂CH₃</text>
                        <text x="525" y="280" textAnchor="middle" className="text-xs fill-amber-600">Neutral radical</text>
                    </g>

                    {/* Key insight box */}
                    <g>
                        <rect x="250" y="340" width="400" height="95" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" rx="8" />
                        <text x="450" y="365" textAnchor="middle" className="text-sm font-bold fill-purple-900">
                            💡 Why is C₂H₅⁺ (m/z=29) the BASE PEAK?
                        </text>
                        <text x="450" y="385" textAnchor="middle" className="text-xs fill-gray-700">
                            The ethyl cation is MORE STABLE than methyl cation because:
                        </text>
                        <text x="450" y="405" textAnchor="middle" className="text-xs fill-gray-700">
                            • Larger size allows better charge dispersal
                        </text>
                        <text x="450" y="421" textAnchor="middle" className="text-xs fill-gray-700">
                            • Hyperconjugation from C-H bonds stabilizes the positive charge
                        </text>
                    </g>

                    {/* Arrow markers */}
                    <defs>
                        <marker id="arrowpurple1" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                            <path d="M0,0 L0,6 L9,3 z" fill="#9333ea" />
                        </marker>
                        <marker id="arrowpurple2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                            <path d="M0,0 L0,6 L9,3 z" fill="#9333ea" />
                        </marker>
                    </defs>
                </svg>
            </div>

            {/* Detailed Explanation */}
            <div className="bg-white border-2 border-blue-200 rounded-lg p-6">
                <h4 className="text-lg font-bold text-blue-900 mb-4">📚 Detailed Explanation</h4>

                <div className="space-y-4">
                    <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Step 1: Ionization</h5>
                        <p className="text-sm text-gray-700 ml-4">
                            C₃H₈ + e⁻ → [C₃H₈]⁺• + 2e⁻<br />
                            High-energy electron (70 eV) knocks out one electron, creating molecular ion with <strong>19 valence electrons</strong> (odd number = radical cation).
                        </p>
                    </div>

                    <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Step 2: C-C Bond Cleavage</h5>
                        <p className="text-sm text-gray-700 ml-4">
                            The C-C bonds are weaker than C-H bonds, so they break preferentially:<br />
                            • <strong>Left cleavage:</strong> [C₃H₈]⁺• → CH₃• + [C₂H₅]⁺ (m/z = 29)<br />
                            • <strong>Right cleavage:</strong> [C₃H₈]⁺• → C₂H₅• + [CH₃]⁺ (m/z = 15)
                        </p>
                    </div>

                    <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Step 3: Why C₂H₅⁺ Dominates</h5>
                        <p className="text-sm text-gray-700 ml-4">
                            The ethyl cation (C₂H₅⁺) is the <strong>BASE PEAK</strong> (100% relative abundance) because:
                        </p>
                        <ul className="text-sm text-gray-700 ml-8 list-disc space-y-1 mt-2">
                            <li>Larger carbocations are generally more stable</li>
                            <li>More C-H bonds provide hyperconjugation stabilization</li>
                            <li>Charge is better dispersed over larger molecular framework</li>
                        </ul>
                    </div>

                    <div className="bg-blue-50 p-3 rounded border border-blue-200 mt-4">
                        <p className="text-sm font-semibold text-blue-900 mb-1">🔑 Key Takeaways:</p>
                        <ul className="text-xs text-gray-700 space-y-1 ml-4">
                            <li>• Alkanes fragment by C-C bond cleavage</li>
                            <li>• Larger carbocation fragments are typically more abundant</li>
                            <li>• Base peak (m/z=29) ≠ Molecular ion (m/z=44)</li>
                            <li>• Neutral radicals are not detected (only cations appear in spectrum)</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Mass Accounting Table */}
            <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-4">
                <h5 className="font-semibold text-gray-900 mb-3">⚖️ Mass Accounting</h5>
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b-2 border-gray-400">
                            <th className="text-left p-2 text-gray-900">Fragment/Ion</th>
                            <th className="text-center p-2 text-gray-900">Formula</th>
                            <th className="text-center p-2 text-gray-900">m/z</th>
                            <th className="text-center p-2 text-gray-900">Type</th>
                            <th className="text-right p-2 text-gray-900">Abundance</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-gray-200">
                            <td className="p-2 text-gray-700">Molecular Ion</td>
                            <td className="text-center p-2 font-mono text-gray-700">[C₃H₈]⁺•</td>
                            <td className="text-center p-2 font-semibold text-purple-700">44</td>
                            <td className="text-center p-2 text-xs text-gray-600">Radical cation</td>
                            <td className="text-right p-2 text-gray-700">40%</td>
                        </tr>
                        <tr className="border-b border-gray-200 bg-green-50">
                            <td className="p-2 text-gray-700 font-semibold">Ethyl cation (BASE)</td>
                            <td className="text-center p-2 font-mono text-gray-700">C₂H₅⁺</td>
                            <td className="text-center p-2 font-semibold text-green-700">29</td>
                            <td className="text-center p-2 text-xs text-gray-600">Carbocation</td>
                            <td className="text-right p-2 font-bold text-green-700">100%</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                            <td className="p-2 text-gray-700">Ethylene (M-2H)</td>
                            <td className="text-center p-2 font-mono text-gray-700">C₂H₄⁺•</td>
                            <td className="text-center p-2 font-semibold text-blue-700">28</td>
                            <td className="text-center p-2 text-xs text-gray-600">Radical cation</td>
                            <td className="text-right p-2 text-gray-700">60%</td>
                        </tr>
                        <tr>
                            <td className="p-2 text-gray-700">Methyl cation</td>
                            <td className="text-center p-2 font-mono text-gray-700">CH₃⁺</td>
                            <td className="text-center p-2 font-semibold text-blue-700">15</td>
                            <td className="text-center p-2 text-xs text-gray-600">Carbocation</td>
                            <td className="text-right p-2 text-gray-700">20%</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
