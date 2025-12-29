'use client';

import React, { useState } from 'react';

interface CarbonIsotopeDiagramProps {
    className?: string;
}

export default function CarbonIsotopeDiagram({ className = '' }: CarbonIsotopeDiagramProps) {
    const [carbonCount, setCarbonCount] = useState(6);

    const calculateM1Intensity = (n: number) => {
        return (n * 1.1).toFixed(2);
    };

    return (
        <div className={`border-2 border-emerald-300 rounded-lg p-6 bg-gradient-to-br from-emerald-50 to-teal-50 ${className}`}>
            <h3 className="text-xl font-bold text-center mb-4 text-emerald-900">¹³C Isotope Pattern (M+1 Peak)</h3>

            <div className="bg-white rounded-lg p-4 mb-6 border-2 border-emerald-200">
                <h4 className="font-bold text-lg text-emerald-900 mb-2">Carbon-13 Natural Abundance</h4>
                <p className="text-gray-700 mb-2">
                    Natural carbon is <strong>98.9% ¹²C</strong> and <strong>1.1% ¹³C</strong>. This creates a small "M+1" peak in mass spectra.
                </p>
                <p className="text-sm text-gray-600 italic">
                    💡 The M+1 peak intensity tells us how many carbons are in the molecule!
                </p>
            </div>

            {/* Interactive Carbon Counter */}
            <div className="bg-gradient-to-br from-white to-emerald-50 rounded-lg p-6 border-2 border-emerald-200 mb-6">
                <h4 className="font-semibold text-emerald-900 mb-4 text-center">Carbon Count Calculator</h4>

                <div className="flex items-center justify-center gap-4 mb-6">
                    <button
                        onClick={() => setCarbonCount(Math.max(1, carbonCount - 1))}
                        className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 text-xl"
                    >
                        −
                    </button>

                    <div className="text-center">
                        <div className="text-4xl font-bold text-emerald-900 mb-1">{carbonCount}</div>
                        <div className="text-sm text-gray-600">carbons</div>
                    </div>

                    <button
                        onClick={() => setCarbonCount(Math.min(20, carbonCount + 1))}
                        className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 text-xl"
                    >
                        +
                    </button>
                </div>

                {/* Formula and Calculation */}
                <div className="bg-emerald-100 rounded-lg p-4 mb-4">
                    <p className="text-center text-lg text-gray-800 mb-2">
                        <strong>Formula:</strong> M+1 intensity ≈ n × 1.1%
                    </p>
                    <p className="text-center text-gray-700">
                        where <em>n</em> = number of carbons
                    </p>
                </div>

                <div className="bg-white rounded-lg p-4 border-2 border-emerald-300">
                    <p className="text-center text-xl text-gray-800 mb-2">
                        M+1 intensity = {carbonCount} × 1.1% = <strong className="text-emerald-700">{calculateM1Intensity(carbonCount)}%</strong>
                    </p>
                    <p className="text-center text-sm text-gray-600 italic">
                        (relative to M peak at 100%)
                    </p>
                </div>
            </div>

            {/* Visual Spectrum Representation */}
            <div className="bg-white rounded-lg p-6 border-2 border-emerald-200 mb-6">
                <h4 className="font-semibold text-emerald-900 mb-4 text-center">Simulated Mass Spectrum</h4>

                <svg viewBox="0 0 400 250" className="w-full h-auto">
                    {/* Axes */}
                    <line x1="50" y1="200" x2="350" y2="200" stroke="#000" strokeWidth="2" />
                    <line x1="50" y1="200" x2="50" y2="30" stroke="#000" strokeWidth="2" />

                    {/* Axis labels */}
                    <text x="200" y="230" textAnchor="middle" className="text-sm fill-gray-700">m/z</text>
                    <text x="20" y="120" textAnchor="middle" transform="rotate(-90 20 120)" className="text-sm fill-gray-700">
                        Relative Intensity (%)
                    </text>

                    {/* M peak */}
                    <rect x="120" y="50" width="40" height="150" fill="#22c55e" stroke="#15803d" strokeWidth="2" />
                    <text x="140" y="45" textAnchor="middle" className="text-sm font-bold fill-green-700">M</text>
                    <text x="140" y="220" textAnchor="middle" className="text-xs fill-gray-600">100</text>
                    <text x="155" y="115" textAnchor="start" className="text-sm font-bold fill-green-700">100%</text>

                    {/* M+1 peak */}
                    {(() => {
                        const m1Height = (parseFloat(calculateM1Intensity(carbonCount)) / 100) * 150;
                        return (
                            <>
                                <rect
                                    x="180"
                                    y={200 - m1Height}
                                    width="40"
                                    height={m1Height}
                                    fill="#10b981"
                                    stroke="#047857"
                                    strokeWidth="2"
                                />
                                <text x="200" y={195 - m1Height} textAnchor="middle" className="text-sm font-bold fill-emerald-700">M+1</text>
                                <text x="200" y="220" textAnchor="middle" className="text-xs fill-gray-600">101</text>
                                <text x="225" y={200 - m1Height / 2} textAnchor="start" className="text-sm font-bold fill-emerald-700">
                                    {calculateM1Intensity(carbonCount)}%
                                </text>
                            </>
                        );
                    })()}

                    {/* M+2 peak (very small, from C-13 in two carbons) */}
                    <rect x="240" y="195" width="40" height="5" fill="#6ee7b7" stroke="#059669" strokeWidth="1" />
                    <text x="260" y="190" textAnchor="middle" className="text-xs fill-emerald-600">M+2</text>
                    <text x="260" y="220" textAnchor="middle" className="text-xs fill-gray-600">102</text>

                    {/* Grid lines */}
                    <line x1="45" y1="125" x2="350" y2="125" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="3,3" />
                    <line x1="45" y1="162.5" x2="350" y2="162.5" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="3,3" />
                    <text x="40" y="128" textAnchor="end" className="text-xs fill-gray-500">50</text>
                    <text x="40" y="53" textAnchor="end" className="text-xs fill-gray-500">100</text>
                </svg>
            </div>

            {/* Example table */}
            <div className="bg-white rounded-lg p-4 border-2 border-emerald-200 mb-6">
                <h4 className="font-semibold text-emerald-900 mb-3 text-center">Common Examples</h4>
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b-2 border-emerald-300">
                            <th className="text-left p-2 text-emerald-900">Compound</th>
                            <th className="text-center p-2 text-emerald-900"># Carbons</th>
                            <th className="text-center p-2 text-emerald-900">M+1 %</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-emerald-100">
                            <td className="p-2 text-gray-700">Benzene (C₆H₆)</td>
                            <td className="text-center p-2 text-gray-700">6</td>
                            <td className="text-center p-2 font-semibold text-emerald-700">6.6%</td>
                        </tr>
                        <tr className="border-b border-emerald-100">
                            <td className="p-2 text-gray-700">Acetone (C₃H₆O)</td>
                            <td className="text-center p-2 text-gray-700">3</td>
                            <td className="text-center p-2 font-semibold text-emerald-700">3.3%</td>
                        </tr>
                        <tr className="border-b border-emerald-100">
                            <td className="p-2 text-gray-700">Decane (C₁₀H₂₂)</td>
                            <td className="text-center p-2 text-gray-700">10</td>
                            <td className="text-center p-2 font-semibold text-emerald-700">11.0%</td>
                        </tr>
                        <tr>
                            <td className="p-2 text-gray-700">Cholesterol (C₂₇H₄₆O)</td>
                            <td className="text-center p-2 text-gray-700">27</td>
                            <td className="text-center p-2 font-semibold text-emerald-700">29.7%</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Key Points */}
            <div className="bg-emerald-100 border-2 border-emerald-400 rounded-lg p-4">
                <h4 className="font-bold text-emerald-900 mb-3">🔑 Using M+1 to Count Carbons</h4>
                <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                        <span className="text-emerald-600 font-bold mr-2">•</span>
                        <span className="text-gray-700">M+1 peak = molecules with one ¹³C atom instead of ¹²C</span>
                    </li>
                    <li className="flex items-start">
                        <span className="text-emerald-600 font-bold mr-2">•</span>
                        <span className="text-gray-700">Intensity ≈ 1.1% per carbon (more carbons = larger M+1)</span>
                    </li>
                    <li className="flex items-start">
                        <span className="text-emerald-600 font-bold mr-2">•</span>
                        <span className="text-gray-700">Reverse calculation: # carbons ≈ (M+1 %) / 1.1</span>
                    </li>
                    <li className="flex items-start">
                        <span className="text-emerald-600 font-bold mr-2">•</span>
                        <span className="text-gray-700">Works best for pure compounds without Cl/Br present</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}
