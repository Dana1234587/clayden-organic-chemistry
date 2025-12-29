'use client';

import React from 'react';
import MSSpectrumExample from './MSSpectrumExample';

interface AcetoneFragmentationProps {
    className?: string;
}

export default function AcetoneFragmentation({ className = '' }: AcetoneFragmentationProps) {
    const spectrumData = [
        { mz: 15, abundance: 25, label: '15', fragment: 'CH₃⁺ (methyl cation)' },
        { mz: 43, abundance: 100, label: '43', fragment: 'CH₃CO⁺ (acylium ion - α-cleavage)', isBasePeak: true },
        { mz: 58, abundance: 35, label: '58 (M⁺)', fragment: 'C₃H₆O⁺• (molecular ion)', isMolecularIon: true }
    ];

    return (
        <div className={`space-y-6 ${className}`}>
            {/* Title */}
            <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg p-4">
                <h3 className="text-2xl font-bold text-center">Acetone (CH₃COCH₃) Fragmentation Analysis</h3>
                <p className="text-center text-sm mt-1 opacity-90">Simple Ketone • MW = 58 • α-Cleavage</p>
            </div>

            {/* Mass Spectrum */}
            <MSSpectrumExample
                title="Mass Spectrum of Acetone"
                data={spectrumData}
                molecularWeight={58}
            />

            {/* Fragmentation Pathway Diagram */}
            <div className="border-2 border-amber-300 rounded-lg p-6 bg-gradient-to-br from-amber-50 to-orange-50">
                <h4 className="text-lg font-bold text-center mb-6 text-amber-900">
                    α-Cleavage Fragmentation Pathway
                </h4>

                <svg viewBox="0 0 900 500" className="w-full h-auto">
                    {/* Molecular Ion */}
                    <g>
                        <rect x="320" y="30" width="260" height="110" fill="#fef3c7" stroke="#f59e0b" strokeWidth="3" rx="8" />
                        <text x="450" y="55" textAnchor="middle" className="text-sm font-bold fill-amber-900">
                            Molecular Ion (M⁺•)
                        </text>
                        <text x="450" y="72" textAnchor="middle" className="text-xs fill-gray-600">
                            m/z = 58
                        </text>

                        {/* Acetone structure */}
                        <text x="375" y="105" className="text-lg fill-gray-800">H₃C</text>
                        <line x1="410" y1="100" x2="430" y2="100" stroke="#000" strokeWidth="2" />
                        <text x="435" y="105" className="text-lg fill-red-700 font-bold">C</text>
                        <line x1="450" y1="85" x2="450" y2="70" stroke="#000" strokeWidth="3" />
                        <text x="455" y="65" className="text-lg fill-red-700 font-bold">O</text>
                        <line x1="465" y1="100" x2="485" y2="100" stroke="#000" strokeWidth="2" />
                        <text x="490" y="105" className="text-lg fill-gray-800">CH₃</text>

                        {/* Alpha carbons marked */}
                        <text x="385" y="125" className="text-xs fill-purple-600 font-bold">α</text>
                        <text x="500" y="125" className="text-xs fill-purple-600 font-bold">α</text>

                        {/* Radical and charge */}
                        <circle cx="450" cy="115" r="3" fill="#dc2626" />
                        <text x="455" y="118" className="text-xs fill-red-600">•⁺</text>
                    </g>

                    {/* Cleavage arrows */}
                    <g>
                        {/* Left α-cleavage */}
                        <path d="M 380 150 L 250 250" stroke="#f59e0b" strokeWidth="4" strokeDasharray="6,4" markerEnd="url(#arroworange1)" />
                        <text x="290" y="190" className="text-sm fill-amber-700 font-semibold">α-cleavage</text>
                        <text x="280" y="210" className="text-xs fill-gray-600">(C-C next to C=O)</text>

                        {/* Right α-cleavage */}
                        <path d="M 520 150 L 650 250" stroke="#f59e0b" strokeWidth="4" strokeDasharray="6,4" markerEnd="url(#arroworange2)" />
                        <text x="560" y="190" className="text-sm fill-amber-700 font-semibold">α-cleavage</text>
                        <text x="550" y="210" className="text-xs fill-gray-600">(C-C next to C=O)</text>
                    </g>

                    {/* Left products - BASE PEAK */}
                    <g>
                        {/* Acylium ion (CH3CO+) */}
                        <rect x="80" y="260" width="200" height="110" fill="#dcfce7" stroke="#16a34a" strokeWidth="4" rx="8" />
                        <text x="180" y="285" textAnchor="middle" className="text-sm font-bold fill-green-800">
                            Acylium Ion ⁺
                        </text>
                        <text x="180" y="302" textAnchor="middle" className="text-xs fill-green-700 font-bold">
                            m/z = 43 (BASE PEAK!)
                        </text>

                        {/* Structure with resonance */}
                        <g>
                            <text x="130" y="330" className="text-base fill-gray-800">H₃C</text>
                            <line x1="160" y1="325" x2="175" y2="325" stroke="#000" strokeWidth="2" />
                            <text x="178" y="330" className="text-base fill-red-700 font-bold">C</text>
                            <line x1="192" y1="310" x2="192" y2="295" stroke="#000" strokeWidth="3" />
                            <text x="197" y="290" className="text-base fill-red-700 font-bold">O</text>
                            <text x="200" y="330" className="text-base fill-blue-600 font-bold">⁺</text>

                            {/* Resonance arrow */}
                            <path d="M 220 320 L 240 320" stroke="#9333ea" strokeWidth="2" markerEnd="url(#arrowpurplesmall)" />
                            <path d="M 238 323 L 218 323" stroke="#9333ea" strokeWidth="2" markerEnd="url(#arrowpurplesmall2)" />

                            {/* Resonance structure */}
                            <text x="248" y="315" className="text-xs fill-gray-700">Resonance:</text>
                            <text x="250" y="338" className="text-sm fill-gray-700">H₃C—C≡O⁺</text>
                        </g>

                        <text x="180" y="360" textAnchor="middle" className="text-xs fill-green-600 italic font-semibold">
                            Even-electron cation
                        </text>

                        {/* Plus */}
                        <text x="295" y="315" className="text-2xl fill-gray-600">+</text>

                        {/* Methyl radical */}
                        <rect x="330" y="285" width="100" height="60" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" rx="5" />
                        <text x="380" y="310" textAnchor="middle" className="text-lg fill-gray-800">•CH₃</text>
                        <text x="380" y="335" textAnchor="middle" className="text-xs fill-amber-600">Neutral radical</text>
                    </g>

                    {/* Right products - Same as left due to symmetry */}
                    <g>
                        {/* Acylium ion */}
                        <rect x="620" y="260" width="200" height="110" fill="#dcfce7" stroke="#16a34a" strokeWidth="4" rx="8" />
                        <text x="720" y="285" textAnchor="middle" className="text-sm font-bold fill-green-800">
                            Acylium Ion ⁺
                        </text>
                        <text x="720" y="302" textAnchor="middle" className="text-xs fill-green-700 font-bold">
                            m/z = 43 (BASE PEAK!)
                        </text>

                        <text x="720" y="330" textAnchor="middle" className="text-base fill-gray-800">
                            H₃C—C≡O⁺
                        </text>

                        <text x="720" y="360" textAnchor="middle" className="text-xs fill-green-600 italic">
                            (Same ion from both sides)
                        </text>

                        {/* Plus */}
                        <text x="595" y="315" className="text-2xl fill-gray-600">+</text>

                        {/* Methyl radical */}
                        <rect x="470" y="285" width="100" height="60" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" rx="5" />
                        <text x="520" y="310" textAnchor="middle" className="text-lg fill-gray-800">CH₃•</text>
                        <text x="520" y="335" textAnchor="middle" className="text-xs fill-amber-600">Neutral radical</text>
                    </g>

                    {/* Key insight box */}
                    <g>
                        <rect x="200" y="395" width="500" height="95" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" rx="8" />
                        <text x="450" y="420" textAnchor="middle" className="text-sm font-bold fill-purple-900">
                            💡 Why is CH₃CO⁺ (m/z=43) the BASE PEAK?
                        </text>
                        <text x="450" y="440" textAnchor="middle" className="text-xs fill-gray-700">
                            The acylium ion CH₃CO⁺ is HIGHLY STABLE due to:
                        </text>
                        <text x="450" y="460" textAnchor="middle" className="text-xs fill-gray-700">
                            • Resonance: CH₃-C⁺=O ↔ CH₃-C≡O⁺ (oxygen lone pair delocalizes charge)
                        </text>
                        <text x="450" y="476" textAnchor="middle" className="text-xs fill-gray-700">
                            • Even-electron cation (more stable than radical cations)
                        </text>
                    </g>

                    {/* Arrow markers */}
                    <defs>
                        <marker id="arroworange1" markerWidth="12" markerHeight="12" refX="10" refY="3" orient="auto" markerUnits="strokeWidth">
                            <path d="M0,0 L0,6 L10,3 z" fill="#f59e0b" />
                        </marker>
                        <marker id="arroworange2" markerWidth="12" markerHeight="12" refX="10" refY="3" orient="auto" markerUnits="strokeWidth">
                            <path d="M0,0 L0,6 L10,3 z" fill="#f59e0b" />
                        </marker>
                        <marker id="arrowpurplesmall" markerWidth="8" markerHeight="8" refX="7" refY="2" orient="auto" markerUnits="strokeWidth">
                            <path d="M0,0 L0,4 L7,2 z" fill="#9333ea" />
                        </marker>
                        <marker id="arrowpurplesmall2" markerWidth="8" markerHeight="8" refX="7" refY="2" orient="auto" markerUnits="strokeWidth">
                            <path d="M0,0 L0,4 L7,2 z" fill="#9333ea" />
                        </marker>
                    </defs>
                </svg>
            </div>

            {/* Detailed Explanation */}
            <div className="bg-white border-2 border-amber-200 rounded-lg p-6">
                <h4 className="text-lg font-bold text-amber-900 mb-4">📚 Detailed Explanation</h4>

                <div className="space-y-4">
                    <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Step 1: Ionization</h5>
                        <p className="text-sm text-gray-700 ml-4">
                            CH₃COCH₃ + e⁻ → [CH₃COCH₃]⁺• + 2e⁻<br />
                            Electron impact creates molecular ion (m/z = 58) with unpaired electron.
                        </p>
                    </div>

                    <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Step 2: α-Cleavage (Next to C=O)</h5>
                        <p className="text-sm text-gray-700 ml-4">
                            Ketones preferentially cleave at the C-C bond <strong>adjacent (α) to the carbonyl</strong>:<br />
                            [CH₃COCH₃]⁺• → [CH₃CO]⁺ + •CH₃<br />
                            <br />
                            Due to symmetry, both sides produce the SAME acylium ion!
                        </p>
                    </div>

                    <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Step 3: Acylium Ion Stabilization</h5>
                        <p className="text-sm text-gray-700 ml-4">
                            CH₃CO⁺ is exceptionally stable:
                        </p>
                        <ul className="text-sm text-gray-700 ml-8 list-disc space-y-1 mt-2">
                            <li><strong>Resonance:</strong> The positive charge is delocalized between carbon and oxygen</li>
                            <li><strong>Even-electron:</strong> No unpaired electron makes it more stable than radical cations</li>
                            <li><strong>Triple bond character:</strong> The resonance form CH₃-C≡O⁺ contributes significantly</li>
                        </ul>
                    </div>

                    <div className="bg-amber-50 p-3 rounded border border-amber-200 mt-4">
                        <p className="text-sm font-semibold text-amber-900 mb-1">🔑 Key Takeaways:</p>
                        <ul className="text-xs text-gray-700 space-y-1 ml-4">
                            <li>• α-Cleavage is the dominant fragmentation in ketones</li>
                            <li>• Acylium ion (RCO⁺) is resonance-stabilized → often the base peak</li>
                            <li>• m/z = 43 is diagnostic for CH₃CO⁺ (acetyl cation)</li>
                            <li>• Loss of neutral radical (•CH₃) not detected</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Recognition Pattern */}
            <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                <h5 className="font-semibold text-green-900 mb-3">🎯 Recognition Pattern</h5>
                <p className="text-sm text-gray-700 mb-2">
                    If you see a <strong>strong peak at m/z = 43</strong> in a mass spectrum, strongly suspect:
                </p>
                <ul className="text-sm text-gray-700 ml-6 list-disc space-y-1">
                    <li><strong>Methyl ketone</strong> (CH₃COR) - acylium ion from α-cleavage</li>
                    <li>Alternatively: C₃H₇⁺ (propyl cation) from alkanes, but less common</li>
                </ul>
                <p className="text-xs italic text-green-700 mt-3">
                    💡 m/z = 43 is one of the MOST COMMON peaks in organic mass spectrometry!
                </p>
            </div>
        </div>
    );
}
