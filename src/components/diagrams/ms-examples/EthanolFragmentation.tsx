'use client';

import React from 'react';
import MSSpectrumExample from './MSSpectrumExample';

interface EthanolFragmentationProps {
    className?: string;
}

export default function EthanolFragmentation({ className = '' }: EthanolFragmentationProps) {
    const spectrumData = [
        { mz: 28, abundance: 45, label: '28', fragment: 'C₂H₄⁺• (loss of H₂O)', isBasePeak: true },
        { mz: 29, abundance: 60, label: '29', fragment: 'CHO⁺ (formyl cation)' },
        { mz: 31, abundance: 85, label: '31', fragment: 'CH₂OH⁺ (oxonium ion from α-cleavage)' },
        { mz: 46, abundance: 20, label: '46 (M⁺)', fragment: 'C₂H₅OH⁺• (molecular ion - weak)', isMolecularIon: true }
    ];

    return (
        <div className={`space-y-6 ${className}`}>
            {/* Title */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg p-4">
                <h3 className="text-2xl font-bold text-center">Ethanol (CH₃CH₂OH) Fragmentation Analysis</h3>
                <p className="text-center text-sm mt-1 opacity-90">Simple Alcohol • MW = 46 • Water Loss + α-Cleavage</p>
            </div>

            {/* Mass Spectrum */}
            <MSSpectrumExample
                title="Mass Spectrum of Ethanol"
                data={spectrumData}
                molecularWeight={46}
            />

            {/* Fragmentation Pathway Diagram */}
            <div className="border-2 border-green-300 rounded-lg p-6 bg-gradient-to-br from-green-50 to-emerald-50">
                <h4 className="text-lg font-bold text-center mb-6 text-green-900">
                    Fragmentation Pathways
                </h4>

                <svg viewBox="0 0 950 550" className="w-full h-auto">
                    {/* Molecular Ion */}
                    <g>
                        <rect x="380" y="20" width="190" height="100" fill="#f0fdf4" stroke="#16a34a" strokeWidth="3" rx="8" />
                        <text x="475" y="45" textAnchor="middle" className="text-sm font-bold fill-green-900">
                            Molecular Ion (M⁺•)
                        </text>
                        <text x="475" y="62" textAnchor="middle" className="text-xs fill-gray-600">
                            m/z = 46 (WEAK)
                        </text>

                        {/* Ethanol structure */}
                        <text x="420" y="90" className="text-lg fill-gray-800">H₃C—CH₂—OH</text>
                        <text x="515" y="88" className="text-xs fill-green-700">⁺•</text>

                        <text x="475" y="110" textAnchor="middle" className="text-xs fill-gray-600 italic">
                            α-carbon
                        </text>
                    </g>

                    {/* Pathway 1: H2O Loss (left) */}
                    <g>
                        <path d="M 400 130 L 250 230" stroke="#16a34a" strokeWidth="3" strokeDasharray="5,5" markerEnd="url(#arrowgreen1)" />
                        <text x="300" y="170" className="text-sm fill-green-700 font-semibold">Loss of H₂O</text>
                        <text x="295" y="188" className="text-xs fill-gray-600">(-18 amu)</text>

                        {/* H2O loss product */}
                        <rect x="100" y="240" width="180" height="95" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" rx="8" />
                        <text x="190" y="265" textAnchor="middle" className="text-sm font-bold fill-blue-800">
                            Ethylene Cation
                        </text>
                        <text x="190" y="282" textAnchor="middle" className="text-xs fill-blue-700">
                            m/z = 28 (BASE PEAK!)
                        </text>
                        <text x="190" y="305" textAnchor="middle" className="text-lg fill-gray-800">
                            CH₂=CH₂⁺•
                        </text>
                        <text x="190" y="325" textAnchor="middle" className="text-xs fill-blue-600 italic">
                            Radical cation
                        </text>
                    </g>

                    {/* Pathway 2: α-Cleavage (center-right) */}
                    <g>
                        <path d="M 500 130 L 500 230" stroke="#f59e0b" strokeWidth="3" strokeDasharray="5,5" markerEnd="url(#arroworange3)" />
                        <text x="515" y="170" className="text-sm fill-amber-700 font-semibold">α-Cleavage</text>
                        <text x="515" y="188" className="text-xs fill-gray-600">(C-C bond)</text>

                        {/* Oxonium ion */}
                        <rect x="400" y="240" width="180" height="95" fill="#dcfce7" stroke="#16a34a" strokeWidth="3" rx="8" />
                        <text x="490" y="265" textAnchor="middle" className="text-sm font-bold fill-green-800">
                            Oxonium Ion
                        </text>
                        <text x="490" y="282" textAnchor="middle" className="text-xs fill-green-700">
                            m/z = 31
                        </text>
                        <text x="490" y="305" textAnchor="middle" className="text-lg fill-gray-800">
                            CH₂=OH⁺
                        </text>
                        <text x="490" y="325" textAnchor="middle" className="text-xs fill-green-600 italic">
                            Even-electron cation
                        </text>

                        {/* Methyl radical */}
                        <text x="595" y="300" className="text-xl fill-gray-600">+</text>
                        <rect x="620" y="265" width="100" height="55" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" rx="5" />
                        <text x="670" y="290" textAnchor="middle" className="text-base fill-gray-800">•CH₃</text>
                        <text x="670" y="310" textAnchor="middle" className="text-xs fill-amber-600">Neutral</text>
                    </g>

                    {/* Further fragmentation from m/z=31 */}
                    <g>
                        <path d="M 490 345 L 490 415" stroke="#22c55e" strokeWidth="2" strokeDasharray="3,3" markerEnd="url(#arrowgreen2)" />
                        <text x="510" y="375" className="text-xs fill-green-600">Loss of H</text>

                        {/* CHO+ ion */}
                        <rect x="420" y="425" width="140" height="75" fill="#fef9c3" stroke="#eab308" strokeWidth="2" rx="5" />
                        <text x="490" y="450" textAnchor="middle" className="text-sm font-bold fill-yellow-800">
                            Formyl Cation
                        </text>
                        <text x="490" y="467" textAnchor="middle" className="text-xs fill-yellow-700">
                            m/z = 29
                        </text>
                        <text x="490" y="488" textAnchor="middle" className="text-lg fill-gray-800">
                            CHO⁺
                        </text>
                    </g>

                    {/* Key insight box */}
                    <g>
                        <rect x="100" y="360" width="280" height="125" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" rx="8" />
                        <text x="240" y="385" textAnchor="middle" className="text-sm font-bold fill-purple-900">
                            💡 Why is M⁺ (m/z=46) WEAK?
                        </text>
                        <text x="240" y="405" textAnchor="middle" className="text-xs fill-gray-700">
                            Alcohols have weak molecular ions because:
                        </text>
                        <text x="240" y="425" textAnchor="middle" className="text-xs fill-gray-700">
                            • Easy H₂O loss → m/z = M-18
                        </text>
                        <text x="240" y="442" textAnchor="middle" className="text-xs fill-gray-700">
                            • α-Cleavage is very favorable
                        </text>
                        <text x="240" y="459" textAnchor="middle" className="text-xs fill-gray-700">
                            • O atom has non-bonding electrons
                        </text>
                        <text x="240" y="476" textAnchor="middle" className="text-xs fill-gray-700">
                            that facilitate fragmentation
                        </text>
                    </g>

                    {/* Arrow markers */}
                    <defs>
                        <marker id="arrowgreen1" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                            <path d="M0,0 L0,6 L9,3 z" fill="#16a34a" />
                        </marker>
                        <marker id="arrowgreen2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                            <path d="M0,0 L0,6 L9,3 z" fill="#22c55e" />
                        </marker>
                        <marker id="arroworange3" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                            <path d="M0,0 L0,6 L9,3 z" fill="#f59e0b" />
                        </marker>
                    </defs>
                </svg>
            </div>

            {/* Detailed Explanation */}
            <div className="bg-white border-2 border-green-200 rounded-lg p-6">
                <h4 className="text-lg font-bold text-green-900 mb-4">📚 Detailed Explanation</h4>

                <div className="space-y-4">
                    <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Pathway 1: Water Loss (Dehydration)</h5>
                        <p className="text-sm text-gray-700 ml-4">
                            [C₂H₅OH]⁺• → [C₂H₄]⁺• + H₂O<br />
                            Loss of water (m/z = M-18 = 46-18 = 28) is <strong>very common in alcohols</strong>.<br />
                            Forms ethylene radical cation (m/z = 28), which is often the base peak.
                        </p>
                    </div>

                    <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Pathway 2: α-Cleavage</h5>
                        <p className="text-sm text-gray-700 ml-4">
                            [C₂H₅OH]⁺• → [CH₂OH]⁺ + •CH₃<br />
                            C-C bond next to oxygen breaks, producing:<br />
                            • <strong>CH₂OH⁺ (m/z = 31):</strong> Oxonium ion - stabilized by O lone pair<br />
                            • <strong>•CH₃:</strong> Methyl radical (neutral, not detected)
                        </p>
                    </div>

                    <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Secondary Fragmentation</h5>
                        <p className="text-sm text-gray-700 ml-4">
                            CH₂OH⁺ can lose H atom → <strong>CHO⁺ (m/z = 29)</strong> formyl cation<br />
                            This creates another significant peak at m/z = 29.
                        </p>
                    </div>

                    <div className="bg-green-50 p-3 rounded border border-green-200 mt-4">
                        <p className="text-sm font-semibold text-green-900 mb-1">🔑 Key Takeaways:</p>
                        <ul className="text-xs text-gray-700 space-y-1 ml-4">
                            <li>• Alcohols show WEAK or absent molecular ions</li>
                            <li>• M-18 peak (water loss) is diagnostic for alcohols</li>
                            <li>• m/z = 31 (CH₂OH⁺) suggests primary alcohol</li>
                            <li>• Multiple fragmentation pathways compete</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Recognition Pattern */}
            <div className="bg-amber-50 border-2 border-amber-300 rounded-lg p-4">
                <h5 className="font-semibold text-amber-900 mb-3">🎯 Recognition Pattern</h5>
                <p className="text-sm text-gray-700 mb-2">
                    <strong>Diagnostic for alcohols:</strong>
                </p>
                <ul className="text-sm text-gray-700 ml-6 list-disc space-y-1">
                    <li>Weak or absent M⁺ peak</li>
                    <li><strong>M-18 peak</strong> (loss of H₂O)</li>
                    <li>m/z = 31 for primary alcohols (CH₂OH⁺)</li>
                    <li>m/z = 45 for secondary alcohols ((CH₃)CHOH⁺)</li>
                </ul>
            </div>
        </div>
    );
}
