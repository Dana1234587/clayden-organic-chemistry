'use client';

import React, { useState } from 'react';
import MSSpectrumExample from './MSSpectrumExample';

interface ButanoneFragmentationProps {
    className?: string;
}

export default function ButanoneFragmentation({ className = '' }: ButanoneFragmentationProps) {
    const [showMcLafferty, setShowMcLafferty] = useState(false);

    const spectrumData = [
        { mz: 29, abundance: 70, label: '29', fragment: 'CHO⁺ or C₂H₅⁺' },
        { mz: 43, abundance: 75, label: '43', fragment: 'CH₃CO⁺ (acylium - α-cleavage)' },
        { mz: 57, abundance: 45, label: '57', fragment: 'C₂H₅CO⁺ (propionyl cation - α-cleavage)' },
        { mz: 58, abundance: 100, label: '58', fragment: 'Enol cation (McLafferty)', isBasePeak: true },
        { mz: 72, abundance: 25, label: '72 (M⁺)', fragment: 'C₄H₈O⁺• (molecular ion)', isMolecularIon: true }
    ];

    return (
        <div className={`space-y-6 ${className}`}>
            {/* Title */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg p-4">
                <h3 className="text-2xl font-bold text-center">2-Butanone (CH₃COCH₂CH₃) Fragmentation Analysis</h3>
                <p className="text-center text-sm mt-1 opacity-90">Asymmetric Ketone • MW = 72 • McLafferty + α-Cleavage</p>
            </div>

            {/* Mass Spectrum */}
            <MSSpectrumExample
                title="Mass Spectrum of 2-Butanone (Methyl Ethyl Ketone)"
                data={spectrumData}
                molecularWeight={72}
            />

            {/* Fragmentation Pathways Diagram */}
            <div className="border-2 border-indigo-300 rounded-lg p-6 bg-gradient-to-br from-indigo-50 to-purple-50">
                <h4 className="text-lg font-bold text-center mb-4 text-indigo-900">
                    Fragmentation Pathways
                </h4>

                {/* Toggle button */}
                <div className="flex justify-center mb-6">
                    <button
                        onClick={() => setShowMcLafferty(!showMcLafferty)}
                        className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 shadow-lg transition-all"
                    >
                        {showMcLafferty ? 'Show α-Cleavage' : 'Show McLafferty Rearrangement'}
                    </button>
                </div>

                {!showMcLafferty ? (
                    // Alpha-Cleavage Pathway
                    <svg viewBox="0 0 950 500" className="w-full h-auto">
                        {/* Molecular Ion */}
                        <g>
                            <rect x="350" y="20" width="250" height="110" fill="#fef3c7" stroke="#f59e0b" strokeWidth="3" rx="8" />
                            <text x="475" y="45" textAnchor="middle" className="text-sm font-bold fill-amber-900">
                                Molecular Ion (M⁺•)
                            </text>
                            <text x="475" y="62" textAnchor="middle" className="text-xs fill-gray-600">
                                m/z = 72
                            </text>

                            {/* Structure */}
                            <text x="395" y="95" className="text-lg fill-gray-800">H₃C</text>
                            <line x1="430" y1="90" x2="445" y2="90" stroke="#000" strokeWidth="2" />
                            <text x="450" y="95" className="text-lg fill-red-700 font-bold">C</text>
                            <line x1="465" y1="75" x2="465" y2="60" stroke="#000" strokeWidth="3" />
                            <text x="470" y="55" className="text-lg fill-red-700 font-bold">O</text>
                            <line x1="480" y1="90" x2="495" y2="90" stroke="#000" strokeWidth="2" />
                            <text x="500" y="95" className="text-lg fill-gray-800">CH₂</text>
                            <line x1="535" y1="90" x2="550" y2="90" stroke="#000" strokeWidth="2" />
                            <text x="555" y="95" className="text-lg fill-gray-800">CH₃</text>

                            <text x="410" y="115" className="text-xs fill-purple-600 font-bold">α₁</text>
                            <text x="512" y="115" className="text-xs fill-purple-600 font-bold">α₂</text>

                            <circle cx="475" cy="105" r="3" fill="#dc2626" />
                            <text x="480" y="108" className="text-xs fill-red-600">•⁺</text>
                        </g>

                        {/* Left α-cleavage */}
                        <g>
                            <path d="M 400 140 L 250 240" stroke="#f59e0b" strokeWidth="3" strokeDasharray="5,5" markerEnd="url(#arroworange4)" />
                            <text x="300" y="180" className="text-sm fill-amber-700 font-semibold">α₁-cleavage</text>

                            <rect x="100" y="250" width="180" height="95" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" rx="8" />
                            <text x="190" y="275" textAnchor="middle" className="text-sm font-bold fill-green-800">
                                Acetyl Cation
                            </text>
                            <text x="190" y="292" textAnchor="middle" className="text-xs fill-green-700">
                                m/z = 43 (75%)
                            </text>
                            <text x="190" y="318" textAnchor="middle" className="text-lg fill-gray-800">
                                CH₃CO⁺
                            </text>
                            <text x="190" y="335" textAnchor="middle" className="text-xs fill-green-600 italic">
                                + •CH₂CH₃ (neutral)
                            </text>
                        </g>

                        {/* Right α-cleavage */}
                        <g>
                            <path d="M 550 140 L 700 240" stroke="#f59e0b" strokeWidth="3" strokeDasharray="5,5" markerEnd="url(#arroworange5)" />
                            <text x="600" y="180" className="text-sm fill-amber-700 font-semibold">α₂-cleavage</text>

                            <rect x="620" y="250" width="180" height="95" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" rx="8" />
                            <text x="710" y="275" textAnchor="middle" className="text-sm font-bold fill-blue-800">
                                Propionyl Cation
                            </text>
                            <text x="710" y="292" textAnchor="middle" className="text-xs fill-blue-700">
                                m/z = 57 (45%)
                            </text>
                            <text x="710" y="318" textAnchor="middle" className="text-lg fill-gray-800">
                                C₂H₅CO⁺
                            </text>
                            <text x="710" y="335" textAnchor="middle" className="text-xs fill-blue-600 italic">
                                + •CH₃ (neutral)
                            </text>
                        </g>

                        {/* Key insight */}
                        <g>
                            <rect x="200" y="370" width="550" height="115" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" rx="8" />
                            <text x="475" y="395" textAnchor="middle" className="text-sm font-bold fill-purple-900">
                                💡 Two Different α-Cleavages (Asymmetric Ketone)
                            </text>
                            <text x="475" y="415" textAnchor="middle" className="text-xs fill-gray-700">
                                Unlike acetone (symmetric), 2-butanone can cleave on EITHER side:
                            </text>
                            <text x="475" y="435" textAnchor="middle" className="text-xs fill-gray-700">
                                • Left side (α₁): Yields CH₃CO⁺ (m/z = 43) - slightly more abundant
                            </text>
                            <text x="475" y="452" textAnchor="middle" className="text-xs fill-gray-700">
                                • Right side (α₂): Yields C₂H₅CO⁺ (m/z = 57) - moderately abundant
                            </text>
                            <text x="475" y="472" textAnchor="middle" className="text-xs fill-gray-700 font-semibold">
                                Both acylium ions are resonance stabilized!
                            </text>
                        </g>

                        <defs>
                            <marker id="arroworange4" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                                <path d="M0,0 L0,6 L9,3 z" fill="#f59e0b" />
                            </marker>
                            <marker id="arroworange5" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                                <path d="M0,0 L0,6 L9,3 z" fill="#f59e0b" />
                            </marker>
                        </defs>
                    </svg>
                ) : (
                    // McLafferty Rearrangement
                    <svg viewBox="0 0 950 600" className="w-full h-auto">
                        {/* Molecular Ion with gamma label */}
                        <g>
                            <rect x="350" y="20" width="250" height="120" fill="#fef3c7" stroke="#f59e0b" strokeWidth="3" rx="8" />
                            <text x="475" y="45" textAnchor="middle" className="text-sm font-bold fill-amber-900">
                                Molecular Ion (M⁺•)
                            </text>
                            <text x="475" y="62" textAnchor="middle" className="text-xs fill-gray-600">
                                m/z = 72
                            </text>

                            {/* Structure with γ-H marked */}
                            <text x="395" y="95" className="text-lg fill-gray-800">H₃C</text>
                            <line x1="430" y1="90" x2="445" y2="90" stroke="#000" strokeWidth="2" />
                            <text x="450" y="95" className="text-lg fill-red-700 font-bold">C</text>
                            <line x1="465" y1="75" x2="465" y2="60" stroke="#000" strokeWidth="3" />
                            <text x="470" y="55" className="text-lg fill-red-700 font-bold">O</text>
                            <line x1="480" y1="90" x2="495" y2="90" stroke="#000" strokeWidth="2" />
                            <text x="498" y="95" className="text-lg fill-gray-800">CH₂</text>
                            <line x1="531" y1="90" x2="548" y2="90" stroke="#000" strokeWidth="2" />
                            <text x="551" y="95" className="text-base fill-gray-800">CH₃</text>

                            <text x="508" y="115" className="text-xs fill-green-600 font-bold">β</text>
                            <text x="560" y="115" className="text-xs fill-green-600 font-bold">γ (γ-H here!)</text>

                            <circle cx="475" cy="108" r="3" fill="#dc2626" />
                            <text x="480" y="111" className="text-xs fill-red-600">•⁺</text>
                        </g>

                        {/* 6-membered transition state */}
                        <g>
                            <path d="M 475 150 L 475 220" stroke="#6366f1" strokeWidth="3" markerEnd="url(#arrowpurple3)" />
                            <text x="490" y="180" className="text-sm fill-indigo-700 font-semibold">McLafferty</text>
                            <text x="490" y="198" className="text-xs fill-gray-600">(6-membered ring</text>
                            <text x="490" y="213" className="text-xs fill-gray-600">transition state)</text>

                            {/* Transition state ring */}
                            <ellipse cx="475" cy="185" rx="60" ry="35" fill="none" stroke="#9333ea" strokeWidth="2" strokeDasharray="3,3" />

                            {/* Curved arrows for mechanism */}
                            <path d="M 555 90 Q 475 120 475 75" stroke="#16a34a" strokeWidth="2" fill="none" markerEnd="url(#arrowgreen3)" />
                            <text x="500" y="105" className="text-xs fill-green-600">H transfer</text>
                        </g>

                        {/* Products */}
                        <g>
                            {/* Enol cation - BASE PEAK */}
                            <rect x="100" y="240" width="220" height="125" fill="#dcfce7" stroke="#16a34a" strokeWidth="4" rx="8" />
                            <text x="210" y="265" textAnchor="middle" className="text-sm font-bold fill-green-800">
                                Enol Radical Cation
                            </text>
                            <text x="210" y="282" textAnchor="middle" className="text-xs fill-green-700 font-bold">
                                m/z = 58 (BASE PEAK!)
                            </text>

                            <g transform="translate(155, 300)">
                                <text x="0" y="0" className="text-base fill-gray-800">H₃C</text>
                                <line x1="25" y1="-5" x2="35" y2="-5" stroke="#000" strokeWidth="2" />
                                <text x="38" y="0" className="text-base fill-red-700 font-bold">C</text>
                                <line x1="52" y1="-20" x2="52" y2="-30" stroke="#000" strokeWidth="2" />
                                <text x="56" y="-32" className="text-base fill-red-700 font-bold">OH</text>
                                <line x1="62" y1="-5" x2="72" y2="-5" stroke="#000" strokeWidth="3" />
                                <text x="75" y="0" className="text-base fill-gray-800">CH₂</text>
                            </g>

                            <text x="210" y="345" textAnchor="middle" className="text-xs fill-green-600 italic">
                                Odd-electron cation (keeps C=O)
                            </text>

                            {/* Plus */}
                            <text x="335" y="305" className="text-2xl fill-gray-600">+</text>

                            {/* Ethene */}
                            <rect x="370" y="270" width="140" height="75" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" rx="5" />
                            <text x="440" y="295" textAnchor="middle" className="text-sm font-bold fill-amber-800">
                                Ethene
                            </text>
                            <text x="440" y="312" textAnchor="middle" className="text-xs fill-amber-700">
                                28 amu
                            </text>
                            <text x="440" y="332" textAnchor="middle" className="text-base fill-gray-800">
                                CH₂=CH₂
                            </text>
                        </g>

                        {/* Mass balance */}
                        <g>
                            <rect x="560" y="280" width="170" height="65" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" rx="5" />
                            <text x="645" y="303" textAnchor="middle" className="text-sm font-bold fill-blue-800">
                                ✓ Mass Balance
                            </text>
                            <text x="645" y="322" textAnchor="middle" className="text-xs fill-gray-700">
                                M⁺• = Products
                            </text>
                            <text x="645" y="337" textAnchor="middle" className="text-xs fill-blue-700 font-semibold">
                                72 = 58 + 28 ✓
                            </text>
                        </g>

                        {/* Mechanism explanation */}
                        <g>
                            <rect x="120" y="390" width="710" height="195" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" rx="8" />
                            <text x="475" y="415" textAnchor="middle" className="text-sm font-bold fill-purple-900">
                                🔄 McLafferty Rearrangement Mechanism
                            </text>

                            <text x="130" y="440" className="text-xs fill-gray-700 font-semibold">
                                Step 1: γ-Hydrogen Transfer
                            </text>
                            <text x="130" y="457" className="text-xs fill-gray-700">
                                • The hydrogen on the γ-carbon (third carbon from C=O) transfers to the oxygen
                            </text>
                            <text x="130" y="472" className="text-xs fill-gray-700">
                                • Forms 6-membered ring transition state (low strain, geometrically favorable)
                            </text>

                            <text x="130" y="495" className="text-xs fill-gray-700 font-semibold">
                                Step 2: β-Bond Cleavage
                            </text>
                            <text x="130" y="512" className="text-xs fill-gray-700">
                                • Simultaneously, the C-C bond between β and γ carbons breaks
                            </text>
                            <text x="130" y="527" className="text-xs fill-gray-700">
                                • Electron pair from breaking bond goes to form C=C double bond
                            </text>

                            <text x="130" y="550" className="text-xs fill-gray-700 font-semibold">
                                Products:
                            </text>
                            <text x="130" y="567" className="text-xs fill-gray-700">
                                • <strong>Enol radical cation</strong> (m/z = 58) - contains the carbonyl group, ODD electron count
                            </text>
                            <text x="130" y="582" className="text-xs fill-gray-700">
                                • <strong>Neutral alkene</strong> (ethene, 28 amu) - not detected
                            </text>
                        </g>

                        <defs>
                            <marker id="arrowpurple3" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                                <path d="M0,0 L0,6 L9,3 z" fill="#6366f1" />
                            </marker>
                            <marker id="arrowgreen3" markerWidth="8" markerHeight="8" refX="7" refY="2" orient="auto" markerUnits="strokeWidth">
                                <path d="M0,0 L0,4 L7,2 z" fill="#16a34a" />
                            </marker>
                        </defs>
                    </svg>
                )}
            </div>

            {/* Comparison Section */}
            <div className="bg-white border-2 border-indigo-200 rounded-lg p-6">
                <h4 className="text-lg font-bold text-indigo-900 mb-4">⚖️ Competing Pathways</h4>

                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b-2 border-indigo-300">
                            <th className="text-left p-2 text-indigo-900">Pathway</th>
                            <th className="text-center p-2 text-indigo-900">Product</th>
                            <th className="text-center p-2 text-indigo-900">m/z</th>
                            <th className="text-right p-2 text-indigo-900">Abundance</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-gray-200 bg-green-50">
                            <td className="p-2 text-gray-700 font-semibold">McLafferty</td>
                            <td className="text-center p-2 text-gray-700">Enol cation (CH₃C(OH)=CH₂⁺•)</td>
                            <td className="text-center p-2 font-bold text-green-700">58</td>
                            <td className="text-right p-2 font-bold text-green-700">100% (BASE)</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                            <td className="p-2 text-gray-700">α₁-Cleavage</td>
                            <td className="text-center p-2 text-gray-700">Acetyl cation (CH₃CO⁺)</td>
                            <td className="text-center p-2 font-semibold text-amber-700">43</td>
                            <td className="text-right p-2 text-gray-700">75%</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                            <td className="p-2 text-gray-700">α₂-Cleavage</td>
                            <td className="text-center p-2 text-gray-700">Propionyl cation (C₂H₅CO⁺)</td>
                            <td className="text-center p-2 font-semibold text-blue-700">57</td>
                            <td className="text-right p-2 text-gray-700">45%</td>
                        </tr>
                    </tbody>
                </table>

                <div className="bg-indigo-50 p-3 rounded border border-indigo-200 mt-4">
                    <p className="text-sm font-semibold text-indigo-900 mb-1">🔑 Key Insight:</p>
                    <p className="text-xs text-gray-700">
                        In 2-butanone, <strong>McLafferty rearrangement DOMINATES</strong> and produces the base peak (m/z = 58).
                        α-Cleavages also occur but give less abundant peaks. This is typical for ketones with γ-hydrogens!
                    </p>
                </div>
            </div>
        </div>
    );
}
