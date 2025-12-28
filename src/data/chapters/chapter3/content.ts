import { ChapterSection } from '../../types';

export const introduction = `Welcome to the world of structural determination! In this chapter, you'll learn how chemists act as molecular detectives, using powerful spectroscopic techniques to deduce the exact structure of unknown compounds.

We'll explore four essential tools:
• **Mass Spectrometry (MS)** - Weighing molecules and detecting elements
• **¹³C NMR** - Mapping the carbon skeleton  
• **¹H NMR** - Probing hydrogen environments
• **IR Spectroscopy** - Identifying functional groups

By the end, you'll combine all these techniques to solve structural puzzles like a pro!`;

export const sections: ChapterSection[] = [
    // ========================================
    // MODULE 1: MASS SPECTROMETRY
    // ========================================
    {
        id: 'ms-introduction',
        title: 'Mass Spectrometry: Weighing Molecules',
        content: `<h4>🎯 The Molecular Scale</h4>

<p>Mass spectrometry (MS) is like having an incredibly precise scale that can weigh individual molecules! But it goes further than just mass - it can also:</p>

<div class="highlight-box">
<strong>What MS Tells Us:</strong>
<ul>
<li>📊 <strong>Molecular Weight</strong> - The exact mass of your molecule</li>
<li>🧩 <strong>Fragments</strong> - How the molecule breaks apart</li>
<li>🔍 <strong>Elemental Composition</strong> - Which elements are present</li>
<li>🎲 <strong>Isotope Patterns</strong> - Reveals Cl, Br, and other halogens</li>
</ul>
</div>

<h4>⚡ How It Works: The "Brick Wall" Analogy</h4>

<p>Imagine throwing a molecule at a brick wall at incredible speed. What happens?</p>

<ol>
<li><strong>Ionization:</strong> An electron gets knocked off → M⁺ (molecular ion)</li>
<li><strong>Fragmentation:</strong> The molecule breaks into pieces</li>
<li><strong>Detection:</strong> Fragments are sorted by mass-to-charge ratio (m/z)</li>
</ol>

<div class="warning-box">
<strong>⚠️ Key Point:</strong> MS measures <em>mass-to-charge ratio (m/z)</em>, not just mass!
For singly charged ions (most common), m/z = mass.
</div>

<h4>📈 Reading a Mass Spectrum</h4>

<table class="reference-table">
<thead>
<tr><th>Peak Type</th><th>Symbol</th><th>Meaning</th></tr>
</thead>
<tbody>
<tr><td>Molecular Ion</td><td>M⁺</td><td>Intact molecule with one electron removed</td></tr>
<tr><td>Base Peak</td><td>100%</td><td>Most abundant ion (tallest peak)</td></tr>
<tr><td>Fragment Ions</td><td>Various</td><td>Pieces of the broken molecule</td></tr>
<tr><td>M+1 Peak</td><td>M+1</td><td>Contains one ¹³C atom</td></tr>
</tbody>
</table>`,
        keyPoints: [
            'MS measures mass-to-charge ratio (m/z)',
            'Electron impact removes an electron, creating M⁺',
            'The base peak is the tallest (most stable fragment)',
            'M⁺ gives the molecular weight directly'
        ],
        molecules: [
            { name: 'Isopentyl Acetate', description: 'Bee pheromone - MW = 130' },
            { name: 'Propan-2-ol', description: 'Secondary alcohol - see fragmentation' }
        ]
    },
    {
        id: 'ms-isotopes',
        title: 'Isotope Patterns: Detecting Cl and Br',
        content: `<h4>🎲 Nature's Fingerprint</h4>

<p>Some elements have multiple naturally occurring isotopes. This creates characteristic patterns in mass spectra that act like fingerprints!</p>

<h4>🔬 Chlorine: The 3:1 Pattern</h4>

<div class="highlight-box">
<strong>Chlorine Isotopes:</strong>
<ul>
<li>³⁵Cl: 75% natural abundance</li>
<li>³⁷Cl: 25% natural abundance</li>
</ul>
<strong>Result:</strong> M : M+2 ratio = <strong>3:1</strong>
</div>

<p>For molecules with <strong>2 chlorines (Cl₂)</strong>:</p>
<ul>
<li>M : M+2 : M+4 = <strong>9:6:1</strong></li>
<li>This comes from: (3:1) × (3:1) = 9:6:1</li>
</ul>

<h4>🟤 Bromine: The 1:1 Pattern</h4>

<div class="highlight-box">
<strong>Bromine Isotopes:</strong>
<ul>
<li>⁷⁹Br: 50% natural abundance</li>
<li>⁸¹Br: 50% natural abundance</li>
</ul>
<strong>Result:</strong> M : M+2 ratio = <strong>1:1</strong> (equal heights)
</div>

<h4>📊 Quick Reference: Halogen Patterns</h4>

<table class="reference-table">
<thead>
<tr><th>Halogen</th><th>Pattern</th><th>M+2 Height</th></tr>
</thead>
<tbody>
<tr><td>1 × Cl</td><td>3:1</td><td>33% of M</td></tr>
<tr><td>2 × Cl</td><td>9:6:1</td><td>67% of M</td></tr>
<tr><td>1 × Br</td><td>1:1</td><td>100% of M</td></tr>
<tr><td>Cl + Br</td><td>3:4:1</td><td>Complex</td></tr>
</tbody>
</table>

<div class="tip-box">
<strong>💡 Pro Tip:</strong> See equal M and M+2 peaks? Think BROMINE!
See M+2 that's ⅓ of M? Think CHLORINE!
</div>`,
        keyPoints: [
            'Chlorine shows a 3:1 (M:M+2) pattern',
            'Bromine shows a 1:1 (M:M+2) pattern - equal heights!',
            'Two chlorines give 9:6:1 pattern',
            'Isotope patterns are like molecular fingerprints'
        ],
        molecules: [
            { name: 'Chloroform', description: 'CHCl₃ - complex isotope pattern' },
            { name: 'Bromoethane', description: 'C₂H₅Br - classic 1:1 pattern' }
        ]
    },
    {
        id: 'ms-high-resolution',
        title: 'High-Resolution MS: Exact Formulas',
        content: `<h4>🎯 Beyond Integer Mass</h4>

<p>Regular MS gives integer masses (114, 115, etc.). But what if two different molecules have the same integer mass?</p>

<div class="warning-box">
<strong>The Problem:</strong>
<ul>
<li>C₇H₁₄O has integer mass = 114</li>
<li>C₈H₁₈ also has integer mass = 114</li>
</ul>
How do we distinguish them?
</div>

<h4>🔬 The Solution: Exact Masses</h4>

<p>Every element has a precise mass that's NOT exactly an integer:</p>

<table class="reference-table">
<thead>
<tr><th>Element</th><th>Integer Mass</th><th>Exact Mass</th></tr>
</thead>
<tbody>
<tr><td>¹H</td><td>1</td><td>1.00783</td></tr>
<tr><td>¹²C</td><td>12</td><td>12.00000 (definition)</td></tr>
<tr><td>¹⁴N</td><td>14</td><td>14.00307</td></tr>
<tr><td>¹⁶O</td><td>16</td><td>15.99492</td></tr>
</tbody>
</table>

<h4>📊 Solving Our Example</h4>

<div class="highlight-box">
<strong>Calculating Exact Masses:</strong>

<strong>C₇H₁₄O:</strong>
7(12.00000) + 14(1.00783) + 1(15.99492) = <strong>114.1039</strong>

<strong>C₈H₁₈:</strong>
8(12.00000) + 18(1.00783) = <strong>114.1408</strong>

<em>Difference = 0.0369 (easily detected!)</em>
</div>

<h4>🔢 The Nitrogen Rule</h4>

<div class="tip-box">
<strong>💡 Nitrogen Rule:</strong>
<ul>
<li>Molecules with <strong>EVEN</strong> MW have <strong>zero or EVEN</strong> nitrogen atoms</li>
<li>Molecules with <strong>ODD</strong> MW have <strong>ODD</strong> nitrogen atoms</li>
</ul>
<em>Example: MW = 121 (odd) → contains 1 or 3 nitrogens</em>
</div>`,
        keyPoints: [
            'High-resolution MS measures masses to 4+ decimal places',
            'Exact masses distinguish isomeric formulas',
            'Carbon is exactly 12.00000 by definition',
            'Nitrogen Rule: Odd MW = Odd N count'
        ]
    },

    // ========================================
    // MODULE 2: 13C NMR
    // ========================================
    {
        id: 'nmr-13c-introduction',
        title: '¹³C NMR: Mapping the Carbon Skeleton',
        content: `<h4>🧲 Nuclear Magnetic Resonance</h4>

<p>NMR spectroscopy uses magnetic fields to probe atomic nuclei. For organic chemists, ¹³C NMR reveals the carbon backbone of molecules!</p>

<div class="highlight-box">
<strong>Why ¹³C NMR?</strong>
<ul>
<li>🦴 Shows the <strong>carbon skeleton</strong> directly</li>
<li>📍 Each carbon in a <strong>different environment</strong> gives a different signal</li>
<li>🔢 Count the peaks → count the carbon environments!</li>
</ul>
</div>

<h4>📏 The Chemical Shift Scale (ppm)</h4>

<p>Chemical shift (δ) is measured in parts per million (ppm) relative to TMS:</p>

<table class="reference-table">
<thead>
<tr><th>Region (ppm)</th><th>Carbon Type</th><th>Examples</th></tr>
</thead>
<tbody>
<tr><td>0-50</td><td>Saturated (sp³)</td><td>CH₃, CH₂, CH</td></tr>
<tr><td>50-100</td><td>Next to O or N</td><td>C-O, C-N</td></tr>
<tr><td>100-150</td><td>Unsaturated (sp²)</td><td>C=C, Aromatic</td></tr>
<tr><td>150-220</td><td>Carbonyl</td><td>C=O (aldehydes, ketones, acids)</td></tr>
</tbody>
</table>

<div class="warning-box">
<strong>⚠️ Remember:</strong> TMS (tetramethylsilane) is the reference at <strong>0 ppm</strong>.
All other carbons appear "downfield" (to the left) of TMS.
</div>

<h4>🛡️ Shielding and Deshielding</h4>

<ul>
<li><strong>High electron density</strong> → MORE shielding → signal moves RIGHT (upfield, toward 0)</li>
<li><strong>Low electron density</strong> (near O, N) → LESS shielding → signal moves LEFT (downfield)</li>
</ul>`,
        keyPoints: [
            '¹³C NMR reveals the carbon skeleton',
            'Chemical shift measured in ppm vs TMS (0 ppm)',
            'Four regions: Saturated, C-O/N, Unsaturated, Carbonyl',
            'More electron density = more shielding = upfield shift'
        ],
        molecules: [
            { name: 'Lactic Acid', description: 'Three distinct carbon signals' },
            { name: 'Ethanol', description: 'Two carbons in different environments' }
        ]
    },
    {
        id: 'nmr-symmetry',
        title: 'Symmetry: When Carbons Look the Same',
        content: `<h4>🪞 The Power of Symmetry</h4>

<p>Here's a powerful principle: <strong>Carbons in identical environments give the SAME signal!</strong></p>

<div class="highlight-box">
<strong>Example: BHT (C₁₅H₂₄O)</strong>
<ul>
<li>Has 15 carbon atoms</li>
<li>But only shows <strong>7 peaks</strong> in ¹³C NMR!</li>
<li>Why? Due to the molecule's plane of symmetry</li>
</ul>
</div>

<h4>📊 Counting Signals</h4>

<table class="reference-table">
<thead>
<tr><th>Molecule</th><th>Carbons</th><th>¹³C Signals</th><th>Symmetry</th></tr>
</thead>
<tbody>
<tr><td>Ethane (C₂H₆)</td><td>2</td><td>1</td><td>Both CH₃ identical</td></tr>
<tr><td>Propane (C₃H₈)</td><td>3</td><td>2</td><td>Two ends identical</td></tr>
<tr><td>Benzene (C₆H₆)</td><td>6</td><td>1</td><td>All 6 carbons identical!</td></tr>
<tr><td>Adipic acid</td><td>6</td><td>3</td><td>Plane through center</td></tr>
</tbody>
</table>

<div class="tip-box">
<strong>💡 Pro Tip:</strong> Fewer peaks than expected? Look for symmetry!
More peaks than expected? Look for isomers or impurities!
</div>

<h4>🎯 Identifying Equivalent Carbons</h4>

<p>Carbons are equivalent if:</p>
<ol>
<li>They can be interchanged by a symmetry operation (rotation, mirror)</li>
<li>They're chemically and magnetically identical</li>
</ol>`,
        keyPoints: [
            'Equivalent carbons give ONE signal',
            'Symmetry reduces the number of peaks',
            'Benzene: 6 carbons but only 1 signal!',
            'Count signals to probe molecular symmetry'
        ],
        molecules: [
            { name: 'BHT', description: '15 carbons → 7 signals due to symmetry' },
            { name: 'Adipic Acid', description: '6 carbons → 3 signals' }
        ]
    },

    // ========================================
    // MODULE 3: 1H NMR  
    // ========================================
    {
        id: 'nmr-1h-introduction',
        title: '¹H NMR: Proton Environments',
        content: `<h4>🎯 The Proton Perspective</h4>

<p>While ¹³C NMR maps the carbon skeleton, ¹H NMR focuses on hydrogen atoms. It's actually MORE sensitive because:</p>

<div class="highlight-box">
<strong>Why ¹H NMR is King:</strong>
<ul>
<li>⚡ <strong>100% natural abundance</strong> of ¹H (vs only 1.1% for ¹³C)</li>
<li>📊 Much stronger signals</li>
<li>🔢 Peak integration shows the <strong>number of hydrogens</strong></li>
</ul>
</div>

<h4>📏 The 0-12 ppm Scale</h4>

<p>Proton chemical shifts are compressed into a much narrower range than ¹³C:</p>

<table class="reference-table">
<thead>
<tr><th>Region (ppm)</th><th>Proton Type</th><th>Examples</th></tr>
</thead>
<tbody>
<tr><td>0-2</td><td>Alkyl (saturated)</td><td>CH₃, CH₂</td></tr>
<tr><td>2-4.5</td><td>Next to C=O or C=C</td><td>CH₃CO-, allylic</td></tr>
<tr><td>4.5-6.5</td><td>Vinyl / alkene</td><td>=CH₂, =CH-</td></tr>
<tr><td>6.5-8.5</td><td>Aromatic</td><td>Benzene rings</td></tr>
<tr><td>9-10</td><td>Aldehyde</td><td>-CHO</td></tr>
<tr><td>10-12</td><td>Carboxylic acid</td><td>-COOH</td></tr>
</tbody>
</table>

<h4>🔄 ¹³C vs ¹H: Same Molecule, Different View</h4>

<div class="tip-box">
<strong>Acetic Acid Example:</strong>
<ul>
<li>¹³C NMR: 2 peaks at ~20 ppm (CH₃) and ~180 ppm (C=O)</li>
<li>¹H NMR: 2 peaks at ~2 ppm (CH₃) and ~11 ppm (COOH)</li>
</ul>
Same molecule, completely different scales!
</div>`,
        keyPoints: [
            '¹H NMR is more sensitive (100% natural abundance)',
            '0-12 ppm scale (vs 0-200 ppm for ¹³C)',
            'Peak integration reveals H count',
            'Aromatic H: 6.5-8.5 ppm, Aldehyde H: 9-10 ppm'
        ],
        molecules: [
            { name: 'Acetic Acid', description: 'Compare ¹³C vs ¹H spectra' },
            { name: 'Benzene', description: 'Single peak at 7.5 ppm' }
        ]
    },

    // ========================================
    // MODULE 4: IR SPECTROSCOPY
    // ========================================
    {
        id: 'ir-introduction',
        title: 'IR Spectroscopy: Seeing Functional Groups',
        content: `<h4>🌊 Vibrating Bonds</h4>

<p>Infrared (IR) spectroscopy detects the vibrations of chemical bonds. Different functional groups vibrate at characteristic frequencies!</p>

<div class="highlight-box">
<strong>What IR Detects:</strong>
<ul>
<li>🔗 <strong>Bond stretching</strong> - bonds getting longer/shorter</li>
<li>📐 <strong>Bond bending</strong> - angles changing</li>
<li>🎯 <strong>Functional groups</strong> - each has a unique pattern!</li>
</ul>
</div>

<h4>📊 The Wavenumber Scale</h4>

<p>IR uses <strong>wavenumber (cm⁻¹)</strong> not wavelength. Higher number = higher frequency = stronger bond.</p>

<h4>🎯 The Four Key Regions</h4>

<table class="reference-table">
<thead>
<tr><th>Region (cm⁻¹)</th><th>Bond Type</th><th>Shape/Notes</th></tr>
</thead>
<tbody>
<tr><td>3200-3600</td><td>O-H, N-H</td><td>Broad (H-bonded) or sharp (free)</td></tr>
<tr><td>2800-3100</td><td>C-H</td><td>Always present in organic molecules</td></tr>
<tr><td>2100-2300</td><td>C≡C, C≡N</td><td>Triple bonds - sharp peak</td></tr>
<tr><td>1600-1800</td><td>C=O, C=C</td><td>Double bonds - very diagnostic!</td></tr>
</tbody>
</table>

<div class="warning-box">
<strong>⚠️ The Fingerprint Region (< 1500 cm⁻¹):</strong>
This region is complex and unique to each molecule. Don't try to interpret individual peaks - use it for comparison only!
</div>

<h4>⚛️ Why Bond Strength Matters (Hooke's Law)</h4>

<ul>
<li><strong>Stronger bond</strong> → higher frequency (e.g., C≡C > C=C > C-C)</li>
<li><strong>Heavier atoms</strong> → lower frequency (e.g., C-Cl < C-H)</li>
</ul>`,
        keyPoints: [
            'IR detects bond vibrations (stretching/bending)',
            'Wavenumber scale: 4000-500 cm⁻¹',
            'O-H and N-H: 3200-3600 cm⁻¹ (often broad)',
            'C=O: ~1700 cm⁻¹ (strongest, most diagnostic peak!)'
        ],
        molecules: [
            { name: 'Paracetamol', description: 'Multiple IR regions visible' },
            { name: 'Cyanoacetamide', description: 'Shows C≡N and amide bands' }
        ]
    },
    {
        id: 'ir-hydrogen-bonding',
        title: 'Hydrogen Bonding in IR',
        content: `<h4>🔗 The Shape Tells the Story</h4>

<p>The appearance of O-H and N-H peaks in IR reveals whether hydrogen bonding is present:</p>

<div class="highlight-box">
<h5>O-H Peak Shapes:</h5>
<table>
<tr><td><strong>Free O-H:</strong></td><td>Sharp peak at ~3600 cm⁻¹</td></tr>
<tr><td><strong>H-bonded O-H (alcohol):</strong></td><td>Broad "U" shape, 3200-3400 cm⁻¹</td></tr>
<tr><td><strong>Carboxylic acid O-H:</strong></td><td>Very broad "V", 2500-3300 cm⁻¹</td></tr>
</table>
</div>

<h4>🧪 N-H Patterns</h4>

<table class="reference-table">
<thead>
<tr><th>Group</th><th>Pattern</th><th>Explanation</th></tr>
</thead>
<tbody>
<tr><td>-NH₂ (primary amine/amide)</td><td>Two peaks</td><td>Symmetric + antisymmetric stretch</td></tr>
<tr><td>-NH (secondary)</td><td>One peak</td><td>Single N-H stretch</td></tr>
</tbody>
</table>

<div class="tip-box">
<strong>💡 Pro Tip:</strong> The carbonyl peak (C=O) at ~1700 cm⁻¹ is usually the STRONGEST peak in the spectrum. It's the most diagnostic feature for identifying aldehydes, ketones, esters, and acids!
</div>`,
        keyPoints: [
            'Broad O-H = hydrogen bonding present',
            'Sharp O-H = no hydrogen bonding (dilute solution)',
            'Carboxylic acid O-H is very broad (overlaps C-H region)',
            'C=O is the strongest, most diagnostic peak'
        ]
    },

    // ========================================
    // MODULE 5: PROBLEM SOLVING
    // ========================================
    {
        id: 'dbe-calculation',
        title: 'Double Bond Equivalents (DBE)',
        content: `<h4>🧮 Counting Unsaturation</h4>

<p>Before interpreting spectra, calculate the <strong>Double Bond Equivalent (DBE)</strong> - also called degree of unsaturation. This tells you how many rings OR double bonds your molecule has!</p>

<div class="highlight-box">
<h5>📐 The Formula:</h5>
<p style="font-size: 1.2em; text-align: center;">
<strong>DBE = C + 1 - H/2 + N/2</strong>
</p>
<p style="font-size: 0.9em;">(Halogens count as H, Oxygen is ignored)</p>
</div>

<h4>📊 What DBE Values Mean</h4>

<table class="reference-table">
<thead>
<tr><th>DBE</th><th>Possible Structures</th></tr>
</thead>
<tbody>
<tr><td>0</td><td>Saturated, no rings</td></tr>
<tr><td>1</td><td>One double bond OR one ring</td></tr>
<tr><td>2</td><td>Two double bonds, one triple bond, or combinations</td></tr>
<tr><td>4</td><td>Benzene ring (3 C=C + ring)</td></tr>
<tr><td>≥4</td><td>Suspect aromatic ring!</td></tr>
</tbody>
</table>

<h4>🎯 Worked Examples</h4>

<div class="highlight-box">
<strong>Example 1: C₆H₆ (Benzene)</strong>
<ul>
<li>DBE = 6 + 1 - 6/2 = 6 + 1 - 3 = <strong>4</strong></li>
<li>This matches: 1 ring + 3 double bonds = benzene!</li>
</ul>

<strong>Example 2: C₅H₉BrO₂</strong>
<ul>
<li>Br counts as H → C₅H₁₀O₂</li>
<li>DBE = 5 + 1 - 10/2 = 5 + 1 - 5 = <strong>1</strong></li>
<li>Either one ring OR one double bond</li>
</ul>
</div>`,
        keyPoints: [
            'DBE = C + 1 - H/2 + N/2',
            'DBE = 4 strongly suggests a benzene ring',
            'Halogens count as H in the formula',
            'Oxygen is ignored in DBE calculation'
        ]
    },
    {
        id: 'problem-solving-strategy',
        title: 'Solving Structural Problems',
        content: `<h4>🔍 The Detective's Toolkit</h4>

<p>When faced with an unknown compound, follow this systematic approach:</p>

<div class="highlight-box">
<h5>Step-by-Step Strategy:</h5>
<ol>
<li><strong>MS:</strong> Get the molecular formula (or at least MW)</li>
<li><strong>DBE:</strong> Calculate degree of unsaturation</li>
<li><strong>IR:</strong> Identify functional groups (C=O, O-H, N-H, etc.)</li>
<li><strong>¹³C NMR:</strong> Count carbon environments</li>
<li><strong>¹H NMR:</strong> Map hydrogen environments</li>
<li><strong>Assemble:</strong> Put the pieces together!</li>
</ol>
</div>

<h4>🧩 Case Study: Unknown Compound X</h4>

<p>A reaction of <strong>Propenal (MW 56) + Ethylene Glycol (MW 62) + HBr</strong> gives a product with MW 181.</p>

<table class="reference-table">
<thead>
<tr><th>Step</th><th>Data</th><th>Conclusion</th></tr>
</thead>
<tbody>
<tr><td>Mass</td><td>181 - 56 - 62 = 63</td><td>Lost ~18 (water) + added ~81 (HBr)</td></tr>
<tr><td>Formula</td><td>C₅H₉BrO₂</td><td>-</td></tr>
<tr><td>DBE</td><td>1</td><td>One ring OR one C=C</td></tr>
<tr><td>IR</td><td>No C=O, no O-H</td><td>Not aldehyde, not alcohol</td></tr>
<tr><td>NMR</td><td>Symmetric C-O-C-O-C</td><td>Acetal linkage!</td></tr>
</tbody>
</table>

<div class="tip-box">
<strong>💡 Answer:</strong> The product is a <strong>cyclic acetal</strong> (1,3-dioxolane derivative) with a bromomethyl group!
</div>

<h4>🎯 Practice Makes Perfect</h4>

<p>The best way to master structure determination is practice. Try solving problems where you:</p>
<ul>
<li>Start with spectra and work backwards to structure</li>
<li>Predict spectra from known structures</li>
<li>Compare similar molecules to see pattern differences</li>
</ul>`,
        keyPoints: [
            'Follow the systematic approach: MS → DBE → IR → NMR',
            'Each technique provides different information',
            'Combine all data to narrow down possibilities',
            'Practice is essential for mastery!'
        ],
        molecules: [
            { name: 'Acrolein', description: 'Propenal - starting material' },
            { name: 'Ethylene Glycol', description: '1,2-Diol - reacts to form acetal' }
        ]
    }
];
