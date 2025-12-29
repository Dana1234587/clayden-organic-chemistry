import { ChapterSection } from '../../types';

export const introduction = `<h4>🔬 Welcome to the world of structural determination!</h4>

<p>Imagine being a <strong>molecular detective</strong>. You have an unknown compound in a vial—perhaps a new drug candidate, a natural product from a rainforest plant, or a metabolite from a patient's blood sample. Your mission: determine its exact structure, atom by atom.</p>

<p>In this chapter, you'll master the <strong>four pillars</strong> of structural determination:</p>

<ul>
<li>🔍 <strong>X-ray Crystallography</strong> - The "final appeal" that shows atoms directly</li>
<li>⚖️ <strong>Mass Spectrometry (MS)</strong> - Weighing molecules and detecting elements</li>
<li>🧲 <strong>NMR Spectroscopy</strong> - Mapping carbon skeletons and hydrogen environments</li>
<li>📡 <strong>IR Spectroscopy</strong> - Identifying functional groups through vibrations</li>
</ul>

<p>Each technique reveals different clues. Together, they solve the molecular mystery!</p>`;

export const sections: ChapterSection[] = [
    // ========================================
    // PHASE 1: X-RAY & INTRODUCTION (Pages 1-4)
    // ========================================
    {
        id: 'why-structure-matters',
        title: 'Why Structure Matters',
        content: `<h4>🏥 Would You Trust a Mystery Medicine?</h4>

<p>Imagine a doctor offering you a pill but saying: "I have no idea what's in it, but it might help!" <strong>You'd refuse.</strong> Knowing the exact structure of a molecule is critical because:</p>

<div class="highlight-box">
<strong>Structure Determines Everything:</strong>
<ul>
<li>💊 <strong>Drug activity</strong> - Wrong structure = wrong effect (or dangerous!)</li>
<li>🧬 <strong>Biological interactions</strong> - Enzymes recognize 3D shape precisely</li>
<li>⚗️ <strong>Chemical reactivity</strong> - Predict how molecules transform</li>
<li>🏭 <strong>Quality control</strong> - Confirm you made what you intended</li>
</ul>
</div>

<h4>🔍 The Detective Analogy</h4>

<p>Structure determination is like solving a crime:</p>

<table class="reference-table">
<thead>
<tr><th>Crime Scene</th><th>Chemistry Lab</th></tr>
</thead>
<tbody>
<tr><td>Fingerprints</td><td>IR spectrum (functional group fingerprint)</td></tr>
<tr><td>DNA evidence</td><td>Mass spectrum (molecular identity)</td></tr>
<tr><td>Witness testimony</td><td>NMR signals (atom environments)</td></tr>
<tr><td>Photograph of suspect</td><td>X-ray structure (direct visualization)</td></tr>
</tbody>
</table>

<div class="tip-box">
<strong>💡 Historical Note:</strong> Before spectroscopy (pre-1950s), chemists spent years doing tedious chemical reactions to prove structures. Today, we can determine complex structures in hours!
</div>`,
        keyPoints: [
            'Molecular structure determines ALL properties',
            'Wrong structure = wrong drug effect',
            'Modern spectroscopy replaced years of chemical tests',
            'Multiple techniques used together give the full picture'
        ]
    },
    {
        id: 'xray-crystallography',
        title: 'X-ray Crystallography: The Final Appeal',
        content: `<h4>⚖️ The Ultimate Proof</h4>

<p>If structure determination were a court case, <strong>X-ray crystallography would be the DNA evidence</strong>—definitive and unambiguous. It directly shows where atoms are positioned in 3D space!</p>

<div class="highlight-box">
<strong>How X-ray Crystallography Works:</strong>
<ol>
<li>Grow a <strong>single crystal</strong> of your compound</li>
<li>Shine <strong>X-rays</strong> through the crystal</li>
<li>Measure the <strong>diffraction pattern</strong></li>
<li>Calculate <strong>electron density maps</strong></li>
<li>Build the 3D molecular structure!</li>
</ol>
</div>

<h4>📊 Reading an X-ray Structure</h4>

<p>X-ray reveals:</p>
<ul>
<li>✅ Exact bond lengths (to 0.001 Å precision!)</li>
<li>✅ Bond angles</li>
<li>✅ 3D conformation</li>
<li>✅ Crystal packing</li>
</ul>

<div class="tip-box">
<strong>💎 Famous Example:</strong> The structure of DNA (Watson & Crick, 1953) was solved using X-ray diffraction data from Rosalind Franklin's crystallography work!
</div>

<h4>🎯 Why It's Called "The Final Appeal"</h4>

<p>When all other evidence is ambiguous, an X-ray structure settles the matter definitively. It's like a photograph of the molecule—showing every atom's position.</p>`,
        keyPoints: [
            'X-ray crystallography directly shows atom positions',
            'Requires growing a single crystal',
            'Gives bond lengths to 0.001 Å precision',
            'Used to solve DNA structure in 1953'
        ],
        molecules: [
            { name: 'Adipic Acid', description: 'Classic X-ray example - zigzag structure' },
            { name: 'Caffeine', description: 'Famous X-ray structure determination' }
        ]
    },
    {
        id: 'xray-limitations',
        title: 'Limitations of X-ray: Why We Need Spectroscopy',
        content: `<h4>⚠️ X-ray Isn't Always Possible</h4>

<p>Despite its power, X-ray crystallography has significant limitations:</p>

<div class="warning-box">
<strong>Problem 1: Need for Crystals</strong>
<ul>
<li>Must grow a <strong>single crystal</strong> of suitable quality</li>
<li>Many compounds are oily liquids or don't crystallize</li>
<li>Some crystals are too small or have defects</li>
</ul>
</div>

<div class="warning-box">
<strong>Problem 2: Missing Hydrogens</strong>
<ul>
<li>X-rays scatter off <strong>electrons</strong></li>
<li>Hydrogen has only 1 electron—very weak signal!</li>
<li>H positions often must be calculated, not observed</li>
</ul>
</div>

<div class="warning-box">
<strong>Problem 3: Time and Resources</strong>
<ul>
<li>Crystal growing can take weeks/months</li>
<li>Equipment is expensive</li>
<li>Not practical for routine analysis</li>
</ul>
</div>

<h4>💡 The Spectroscopic Alternative</h4>

<p>This is where <strong>spectroscopy</strong> shines! It works on:</p>

<table class="reference-table">
<thead>
<tr><th>Sample Type</th><th>X-ray?</th><th>Spectroscopy?</th></tr>
</thead>
<tbody>
<tr><td>Pure crystal</td><td>✅ Yes</td><td>✅ Yes</td></tr>
<tr><td>Liquid</td><td>❌ No</td><td>✅ Yes</td></tr>
<tr><td>Gas</td><td>❌ No</td><td>✅ Yes</td></tr>
<tr><td>Mixture</td><td>❌ No</td><td>✅ Yes</td></tr>
<tr><td>Tiny amount</td><td>❌ Usually no</td><td>✅ Yes</td></tr>
</tbody>
</table>

<div class="highlight-box">
<strong>The Spectroscopy Toolkit:</strong>
<ul>
<li><strong>MS</strong> - Molecular weight & formula</li>
<li><strong>NMR</strong> - Carbon skeleton & proton environments</li>
<li><strong>IR</strong> - Functional groups</li>
</ul>
Together, these often give enough information without ever needing an X-ray!
</div>`,
        keyPoints: [
            'X-ray needs high-quality single crystals',
            'Hydrogen atoms are hard to see with X-rays',
            'Spectroscopy works on liquids, gases, mixtures',
            'MS + NMR + IR together can solve most structures'
        ]
    },
    // ========================================
    // PHASE 2: MASS SPECTROMETRY (Pages 5-9)
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
        id: 'ms-instrumentation',
        title: 'Mass Spectrometer Components',
        content: `<h4>🔬 Three Essential Functions</h4>

<p>A mass spectrometer has three main components that work together to analyze molecules:</p>

<div class="highlight-box">
<strong>The Three Components:</strong>
<ol>
<li><strong>Ion Source</strong> - Converts sample molecules into gas-phase ions</li>
<li><strong>Mass Analyzer</strong> - Separates ions based on their m/z ratios</li>
<li><strong>Detector</strong> - Measures ion abundance and generates the mass spectrum</li>
</ol>
</div>

<h4>⚡ Electron Impact (EI) Ionization</h4>

<p>The most common ionization method for small organic molecules is <strong>Electron Impact (EI)</strong>:</p>

<div class="highlight-box">
<strong>How EI Works:</strong>
<ol>
<li>Sample is vaporized and enters the ion source as a gas</li>
<li>High-energy electron beam (70 eV) bombards the molecules</li>
<li>Collision knocks out an electron: <strong>M + e⁻ → M⁺• + 2e⁻</strong></li>
<li>This creates a <strong>radical cation (M⁺•)</strong> - the molecular ion</li>
</ol>
</div>

<h4>🌌 The Need for Vacuum</h4>

<p>Mass spectrometry must be performed under <strong>high vacuum</strong> (10⁻⁵ to 10⁻⁸ torr):</p>

<ul>
<li>✓ Ions are highly reactive and short-lived</li>
<li>✓ Collisions with air molecules would destroy ions</li>
<li>✓ Allows ions to travel freely from source to detector</li>
<li>✓ One billionth of atmospheric pressure!</li>
</ul>

<h4>🧲 Magnetic Sector Mass Analyzer</h4>

<p>Classic design uses a magnetic field to separate ions:</p>

<table class="reference-table">
<thead>
<tr><th>Step</th><th>What Happens</th></tr>
</thead>
<tbody>
<tr><td>Acceleration</td><td>Ions are accelerated by electric field</td></tr>
<tr><td>Magnetic Deflection</td><td>Perpendicular magnetic field bends ion path</td></tr>
<tr><td>Separation</td><td>Light ions curve more than heavy ions</td></tr>
<tr><td>Detection</td><td>Only ions with specific m/z reach detector</td></tr>
</tbody>
</table>

<div class="warning-box">
<strong>⚠️ Important:</strong> By varying the magnetic field strength, ions of different m/z can be focused on the detector one at a time, building up the complete mass spectrum.
</div>

<h4>📊 Radical Cations vs Carbocations</h4>

<p>Two types of ions form in a mass spectrometer:</p>

<ul>
<li><strong>Radical cation (M⁺•):</strong> Odd number of electrons, has both a charge and unpaired electron</li>
<li><strong>Carbocation:</strong> Even number of electrons, only has a positive charge</li>
</ul>

<div class="tip-box">
<strong>💡 Key Insight:</strong> The molecular ion (M⁺•) is always a radical cation because we remove ONE electron. Fragment ions can be either type depending on how fragmentation occurs.
</div>`,
        keyPoints: [
            'Three components: Ion Source, Mass Analyzer, Detector',
            'EI ionization uses 70 eV electron beam',
            'High vacuum (10⁻⁵ to 10⁻⁸ torr) is essential',
            'Magnetic field separates ions by m/z',
            'Molecular ion M⁺• is a radical cation'
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
        id: 'ms-carbon-counting',
        title: 'Carbon Counting with ¹³C (M+1 Peak)',
        content: `<h4>📐 Using Isotopes to Count Carbons</h4>

<p>Natural carbon contains <strong>1.1% ¹³C</strong>. This creates a small "M+1" peak that tells us how many carbons are present!</p>

<div class="highlight-box">
<strong>The M+1 Formula:</strong>
<p style="font-size: 1.2em; text-center;"><strong>M+1 intensity ≈ n × 1.1%</strong></p>
<p>where <em>n</em> = number of carbon atoms</p>
</div>

<h4>🔢 Worked Examples</h4>

<table class="reference-table">
<thead>
<tr><th>Compound</th><th># Carbons</th><th>M+1 Intensity</th></tr>
</thead>
<tbody>
<tr><td>Acetone (C₃H₆O)</td><td>3</td><td>3 × 1.1 = 3.3%</td></tr>
<tr><td>Benzene (C₆H₆)</td><td>6</td><td>6 × 1.1 = 6.6%</td></tr>
<tr><td>Decane (C₁₀H₂₂)</td><td>10</td><td>10 × 1.1 = 11.0%</td></tr>
<tr><td>Cholesterol (C₂₇H₄₆O)</td><td>27</td><td>27 × 1.1 = 29.7%</td></tr>
</tbody>
</table>

<div class="tip-box">
<strong>💡 Pro Tip:</strong> You can work backwards! If you see M+1 = 8.8%, you know there are approximately 8 carbons (8.8 ÷ 1.1 ≈ 8).
</div>

<h4>⚠️ When M+1 is Complicated</h4>

<p>The M+1 peak can also arise from:</p>
<ul>
<li>¹⁵N (0.37% natural abundance)</li>
<li>¹⁸O (0.20% natural abundance)</li>
<li>²H (0.015% - usually negligible)</li>
</ul>

<p>For organic compounds with only C, H, and O, the ¹³C contribution dominates.</p>`,
        keyPoints: [
            'M+1 peak = molecules with one ¹³C atom',
            'M+1 intensity ≈ 1.1% per carbon',
            'Reverse calculation: # carbons ≈ (M+1 %) / 1.1',
            'Works best without Cl/Br present'
        ]
    },
    {
        id: 'ms-fragmentation-intro',
        title: 'Fragmentation Patterns',
        content: `<h4>💥 Breaking Bonds</h4>

<p>After ionization, the molecular ion M⁺• often fragments into smaller pieces. These fragments provide structural clues!</p>

<div class="highlight-box">
<strong>Why Molecules Fragment:</strong>
<ul>
<li>70 eV electron beam gives <strong>excess energy</strong></li>
<li>Weakest bonds break first</li>
<li>Most stable fragments survive to be detected</li>
<li>Fragmentation patterns are <strong>reproducible</strong> - like fingerprints!</li>
</ul>
</div>

<h4>🎯 Types of Fragment Ions</h4>

<table class="reference-table">
<thead>
<tr><th>Ion Type</th><th># Electrons</th><th>Example</th></tr>
</thead>
<tbody>
<tr><td>Radical Cation (M⁺•)</td><td>Odd</td><td>CH₃OH⁺• (m/z = 32)</td></tr>
<tr><td>Even-Electron Cation</td><td>Even</td><td>CH₃CO⁺ (m/z = 43)</td></tr>
<tr><td>Odd-Electron Fragment</td><td>Odd</td><td>CH₂=OH⁺• (m/z = 31)</td></tr>
</tbody>
</table>

<h4>📊 Fragmentation Rules</h4>

<ul>
<li><strong>Rule 1:</strong> Cleavage occurs at <strong>weakest bonds</strong> (C-C weaker than C-H)</li>
<li><strong>Rule 2:</strong> Fragments that form <strong>stable cations</strong> are more abundant</li>
<li><strong>Rule 3:</strong> Resonance stabilization increases fragment intensity</li>
<li><strong>Rule 4:</strong> Heteroatoms (O, N, S) direct fragmentation to adjacent bonds</li>
</ul>

<div class="warning-box">
<strong>⚠️ The Nitrogen Rule Revisited:</strong><br>
• Odd-electron ions: Even mass if no N or even # N; Odd mass if odd # N<br>
• Even-electron ions: Odd mass if no N or even # N; Even mass if odd # N
</div>

<h4>🔑 Common Neutral Losses</h4>

<p>Recognizing these losses helps identify functional groups:</p>

<table class="reference-table">
<thead>
<tr><th>Loss</th><th>Mass</th><th>Suggests</th></tr>
</thead>
<tbody>
<tr><td>H₂O</td><td>-18</td><td>Alcohol or acid</td></tr>
<tr><td>CO</td><td>-28</td><td>Aldehyde or ketone</td></tr>
<tr><td>CO₂</td><td>-44</td><td>Carboxylic acid or ester</td></tr>
<tr><td>CH₃</td><td>-15</td><td>Methyl group</td></tr>
<tr><td>C₂H₅</td><td>-29</td><td>Ethyl group</td></tr>
</tbody>
</table>`,
        keyPoints: [
            'Fragmentation provides structural information',
            'Weakest bonds break preferentially',
            'Stable cations are more abundant (base peak)',
            'Common neutral losses reveal functional groups'
        ]
    },
    {
        id: 'ms-alpha-cleavage',
        title: 'α-Cleavage: Breaking Next to Heteroatoms',
        content: `<h4>🔪 The Most Important Fragmentation</h4>

<p><strong>α-Cleavage</strong> is the cleavage of a bond <strong>adjacent (α) to a heteroatom</strong> (O, N, S). It's one of the most common and predictable fragmentation patterns!</p>

<div class="highlight-box">
<strong>Why α-Cleavage Happens:</strong>
<ul>
<li>The heteroatom's <strong>lone pair</strong> stabilizes the resulting cation through resonance</li>
<li>Produces <strong>even-electron cations</strong> (usually the base peak)</li>
<li>Loss of a radical (odd-electron neutral fragment)</li>
</ul>
</div>

<h4>⚗️ α-Cleavage in Ketones</h4>

<p><strong>Example: Acetone (CH₃COCH₃)</strong></p>

<p>The C-C bond next to C=O breaks, giving:</p>
<ul>
<li><strong>CH₃CO⁺</strong> (m/z = 43) - acylium ion (base peak!)</li>
<li><strong>•CH₃</strong> - methyl radical (neutral, not detected)</li>
</ul>

<div class="tip-box">
<strong>💡 Acylium Ion Stability:</strong> The CH₃CO⁺ ion is resonance-stabilized:<br>
CH₃-C≡O⁺ ↔ CH₃-C⁺=O<br>
This makes m/z = 43 one of the most common peaks in ketone spectra!
</div>

<h4>🍺 α-Cleavage in Alcohols</h4>

<p><strong>Example: Ethanol (CH₃CH₂OH)</strong></p>

<p>Cleavage at the C-C bond gives:</p>
<ul>
<li><strong>CH₂=OH⁺</strong> (m/z = 31) - oxonium ion</li>
<li>Further loss of H → <strong>CHO⁺</strong> (m/z = 29)</li>
</ul>

<h4>🧪 α-Cleavage in Amines</h4>

<p><strong>Example: Diethylamine ((CH₃CH₂)₂NH)</strong></p>

<p>Produces characteristic iminium ion:</p>
<ul>
<li><strong>CH₂=NH₂⁺</strong> (m/z = 30)</li>
<li>Or larger <strong>[R-CH=NH₂]⁺</strong> depending on R group</li>
</ul>

<div class="highlight-box">
<strong>Recognition Pattern:</strong><br>
If you see a strong peak at m/z = 43, think <strong>ketone</strong> (CH₃CO⁺).<br>
If you see m/z = 31, think <strong>alcohol</strong> (CH₂OH⁺).<br>
If you see m/z = 30, think <strong>primary amine</strong> (CH₂NH₂⁺).
</div>`,
        keyPoints: [
            'α-Cleavage = breaking bond next to O, N, or S',
            'Produces even-electron cations (often base peak)',
            'Ketones give acylium ions (RCO⁺)',
            'Alcohols give oxonium ions (often m/z = 31)',
            'Amines give iminium ions (often m/z = 30)'
        ]
    },
    {
        id: 'ms-mclafferty',
        title: 'McLafferty Rearrangement',
        content: `<h4>🔄 The Six-Membered Ring Dance</h4>

<p>The <strong>McLafferty rearrangement</strong> is a characteristic fragmentation of carbonyl compounds with a <strong>γ-hydrogen</strong> (hydrogen three bonds away from C=O).</p>

<div class="highlight-box">
<strong>Requirements for McLafferty:</strong>
<ol>
<li>Must have a <strong>carbonyl group</strong> (C=O)</li>
<li>Must have a <strong>γ-hydrogen</strong> (H on the carbon 3 bonds from C=O)</li>
<li>Proceeds through a <strong>6-membered ring</strong> transition state</li>
</ol>
</div>

<h4>🧩 The Mechanism</h4>

<p><strong>Example: 2-Pentanone (CH₃COCH₂CH₂CH₃)</strong></p>

<div class="highlight-box">
<strong>Step-by-Step:</strong>
<ol>
<li>Molecular ion M⁺• = 86</li>
<li>γ-Hydrogen transfers to C=O through 6-membered ring</li>
<li>β-bond (C-C bond) cleaves simultaneously</li>
<li>Products:
   <ul>
   <li><strong>Enol radical cation</strong> (m/z = 58, contains C=O)</li>
   <li><strong>Neutral alkene</strong> (ethene, 28 amu)</li>
   </ul>
</li>
</ol>
</div>

<h4>📐 The 6-Membered Ring</h4>

<p>The rearrangement is geometrically favorable because:</p>
<ul>
<li>Forms a 6-membered transition state (low strain)</li>
<li>Hydrogen transfer and bond cleavage happen together</li>
<li>Results in an <strong>odd-electron enol cation</strong></li>
</ul>

<h4>🎯 Why McLafferty is Important</h4>

<table class="reference-table">
<thead>
<tr><th>Compound Type</th><th>McLafferty Product</th><th>Common m/z</th></tr>
</thead>
<tbody>
<tr><td>Methyl ketones</td><td>CH₃-C(OH)=CH₂⁺•</td><td>58</td></tr>
<tr><td>Aliphatic ketones</td><td>R-C(OH)=CH₂⁺•</td><td>Variable</td></tr>
<tr><td>Esters</td><td>Similar enol cations</td><td>Variable</td></tr>
<tr><td>Aldehydes</td><td>HC(OH)=CH₂⁺•</td><td>44</td></tr>
</tbody>
</table>

<div class="tip-box">
<strong>💡 Diagnostic Value:</strong> McLafferty rearrangement often produces the <strong>base peak</strong> in carbonyl spectra. Seeing m/z = 58 in a ketone spectrum is a strong indicator of McLafferty rearrangement!
</div>

<div class="warning-box">
<strong>⚠️ Mass Balance Check:</strong><br>
Always verify: M⁺• = Enol cation + Neutral alkene<br>
Example: 86 = 58 + 28 ✓
</div>`,
        keyPoints: [
            'McLafferty = γ-H transfer through 6-membered ring',
            'Requires carbonyl + γ-hydrogen',
            'Produces odd-electron enol cation + neutral alkene',
            'Methyl ketones give m/z = 58',
            'Often the base peak in carbonyl spectra'
        ]
    },
    {
        id: 'ms-soft-ionization',
        title: 'Soft Ionization: ESI and MALDI',
        content: `<h4>🌸 Gentle Ionization for Large Molecules</h4>

<p>Electron Impact (EI) is great for small molecules, but it <strong>fragments large biomolecules</strong>. For proteins, carbohydrates, and glycoconjugates, we need <strong>soft ionization</strong> techniques!</p>

<div class="highlight-box">
<strong>The Problem with EI:</strong>
<ul>
<li>❌ High energy (70 eV) causes extensive fragmentation</li>
<li>❌ Destroys delicate molecules like proteins</li>
<li>❌ Molecular ion often too weak or absent</li>
<li>❌ Only works for volatile, thermally stable compounds</li>
</ul>
</div>

<h4>🌊 Electrospray Ionization (ESI)</h4>

<p>ESI is the <strong>gold standard</strong> for analyzing large biomolecules:</p>

<div class="highlight-box">
<strong>How ESI Works:</strong>
<ol>
<li>Sample solution sprayed through charged needle (+3 to +5 kV)</li>
<li>Creates fine droplets with excess charge</li>
<li>Solvent evaporates → droplets shrink</li>
<li>Coulombic repulsion ejects ions: <strong>[M+nH]ⁿ⁺</strong></li>
</ol>
</div>

<h4>🔋 Multiple Charging - ESI's Superpower</h4>

<p>Large molecules gain <strong>many protons</strong>, creating multiply charged ions:</p>

<table class="reference-table">
<thead>
<tr><th>Ion Type</th><th>Example</th><th>m/z</th></tr>
</thead>
<tbody>
<tr><td>Protein (MW 50,000)</td><td>[M+20H]²⁰⁺</td><td>2,500</td></tr>
<tr><td>Peptide (MW 2,000)</td><td>[M+2H]²⁺</td><td>1,000</td></tr>
<tr><td>Small molecule</td><td>[M+H]⁺</td><td>MW+1</td></tr>
</tbody>
</table>

<div class="tip-box">
<strong>💡 Why Multiple Charging Matters:</strong> A 100,000 Da protein with 50 charges gives m/z = 2,000 - easily detectable! Without multiple charging, m/z = 100,000 would be out of range for most instruments.
</div>

<h4>💥 MALDI: Matrix-Assisted Laser Desorption/Ionization</h4>

<p>MALDI uses a <strong>laser</strong> to ionize molecules embedded in a crystalline matrix:</p>

<div class="highlight-box">
<strong>How MALDI Works:</strong>
<ol>
<li>Sample mixed with <strong>matrix</strong> (light-absorbing small molecule)</li>
<li>Co-crystallize onto metal target plate</li>
<li>UV laser pulse (337 nm) hits the sample</li>
<li>Matrix absorbs energy and transfers to analyte</li>
<li>Gentle desorption/ionization: <strong>[M+H]⁺</strong></li>
</ol>
</div>

<h4>🧪 Common MALDI Matrices</h4>

<table class="reference-table">
<thead>
<tr><th>Matrix</th><th>Best Application</th></tr>
</thead>
<tbody>
<tr><td>CHCA (α-cyano)</td><td>Peptides \u003c 5 kDa</td></tr>
<tr><td>DHB</td><td>Carbohydrates, glycoproteins</td></tr>
<tr><td>Sinapinic acid</td><td>Proteins \u003e 5 kDa</td></tr>
</tbody>
</table>

<h4>⚖️ ESI vs MALDI Comparison</h4>

<table class="reference-table">
<thead>
<tr><th>Feature</th><th>ESI</th><th>MALDI</th></tr>
</thead>
<tbody>
<tr><td>Charging</td><td>Multiple [M+nH]ⁿ⁺</td><td>Singly [M+H]⁺</td></tr>
<tr><td>Sample Prep</td><td>Liquid solution</td><td>Co-crystallized with matrix</td></tr>
<tr><td>Speed</td><td>Moderate</td><td>Very fast</td></tr>
<tr><td>Salt Tolerance</td><td>Low</td><td>High</td></tr>
<tr><td>Best For</td><td>Online LC-MS</td><td>High-throughput screening</td></tr>
</tbody>
</table>

<div class="highlight-box">
<strong>🧬 Applications to Biomolecules:</strong>
<ul>
<li><strong>Proteins/Peptides:</strong> Both ESI and MALDI excellent</li>
<li><strong>Carbohydrates:</strong> MALDI with DHB matrix preferred</li>
<li><strong>Glycoconjugates:</strong> ESI for intact analysis, MALDI for mapping</li>
<li><strong>Oligonucleotides:</strong> ESI (negative mode) commonly used</li>
</ul>
</div>`,
        keyPoints: [
            'EI fragments large molecules; soft ionization preserves them',
            'ESI: Multiple charging brings large MW into detectable range',
            'MALDI: Laser desorption produces singly-charged ions',
            'ESI best for LC-MS; MALDI best for high-throughput',
            'Perfect for proteins, carbohydrates, glycoconjugates'
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
    // DETAILED MS EXAMPLES
    // ========================================
    {
        id: 'ms-example-propane',
        title: 'Detailed Example: Propane Fragmentation',
        content: `<h4>📊 Complete Analysis of Propane (C₃H₈)</h4>

<p>This example demonstrates <strong>alkane fragmentation</strong> in detail, showing how C-C bonds break and why larger carbocations are more abundant.</p>

<div class="highlight-box">
<strong>Learning Objectives:</strong>
<ul>
<li>Understand C-C bond cleavage in alkanes</li>
<li>See why ethyl cation (C₂H₅⁺) is more stable than methyl cation (CH₃⁺)</li>
<li>Learn to interpret mass spectra with multiple peaks</li>
<li>Practice mass accounting (M⁺ → fragments)</li>
</ul>
</div>

<p><em>The interactive diagram below shows the complete mass spectrum, molecular structure, fragmentation pathways, and detailed explanations.</em></p>`,
        keyPoints: [
            'Propane: MW = 44, base peak = 29 (C₂H₅⁺)',
            'C-C cleavage produces ethyl cation (29) and methyl cation (15)',
            'Larger carbocations more stable due to hyperconjugation',
            'Example of simple alkane fragmentation pattern'
        ]
    },
    {
        id: 'ms-example-acetone',
        title: 'Detailed Example: Acetone α-Cleavage',
        content: `<h4>⚡ Complete Analysis of Acetone (CH₃COCH₃)</h4>

<p>This example demonstrates <strong>α-cleavage in ketones</strong>, one of the most important fragmentation patterns in mass spectrometry!</p>

<div class="highlight-box">
<strong>Learning Objectives:</strong>
<ul>
<li>Understand α-cleavage mechanism (bond next to C=O)</li>
<li>See how acylium ion (CH₃CO⁺) forms and why it's so stable</li>
<li>Learn about resonance stabilization in MS fragments</li>
<li>Recognize diagnostic m/z = 43 for methyl ketones</li>
</ul>
</div>

<p><em>The interactive diagram shows symmetric α-cleavage on both sides of the carbonyl.</em></p>

<div class="warning-box">
<strong>🔑 Diagnostic Peak:</strong> m/z = 43 (CH₃CO⁺) is one of the MOST COMMON peaks in organic MS!
</div>`,
        keyPoints: [
            'Acetone: MW = 58, base peak = 43 (CH₃CO⁺)',
            'α-Cleavage produces acylium ion - resonance stabilized',
            'm/z = 43 diagnostic for CH₃CO⁺ (acetyl cation)',
            'Even-electron cation more stable than radical cations'
        ]
    },
    {
        id: 'ms-example-ethanol',
        title: 'Detailed Example: Ethanol Fragmentation',
        content: `<h4>🍺 Complete Analysis of Ethanol (CH₃CH₂OH)</h4>

<p>This example demonstrates <strong>alcohol fragmentation</strong>, including characteristic water loss and weak molecular ions.</p>

<div class="highlight-box">
<strong>Learning Objectives:</strong>
<ul>
<li>Understand why alcohols show WEAK molecular ions</li>
<li>Learn about M-18 peak (water loss) - diagnostic for alcohols</li>
<li>See how oxonium ions (CH₂OH⁺) form via α-cleavage</li>
<li>Understand competing fragmentation pathways</li>
</ul>
</div>

<p><em>The diagram shows TWO competing pathways: H₂O loss and α-cleavage.</em></p>`,
        keyPoints: [
            'Ethanol: MW = 46 (weak M⁺), base peak = 28 (water loss)',
            'M-18 peak diagnostic for alcohols (H₂O loss)',
            'm/z = 31 (CH₂OH⁺) suggests primary alcohol',
            'Secondary fragmentation: CH₂OH⁺ → CHO⁺ (m/z = 29)'
        ]
    },
    {
        id: 'ms-example-cyclopropane',
        title: 'Detailed Example: Cyclopropane Ring Stability',
        content: `<h4>💍 Complete Analysis of Cyclopropane (C₃H₆)</h4>

<p>This example demonstrates how <strong>ring structures affect fragmentation</strong> and how to distinguish structural isomers.</p>

<div class="highlight-box">
<strong>Learning Objectives:</strong>
<ul>
<li>Understand why cyclopropane's M⁺ is the BASE PEAK (unlike propane)</li>
<li>See how ring stability prevents simple C-C cleavage</li>
<li>Learn to distinguish cyclic vs acyclic isomers</li>
<li>Recognize importance of ABSENT peaks</li>
</ul>
</div>

<p><em>Comparison table with propane highlights key spectral differences.</em></p>`,
        keyPoints: [
            'Cyclopropane: MW = 42 (M⁺ is BASE PEAK!)',
            'Ring structure stabilizes molecular ion',
            'Absence of m/z = 29 distinguishes from propane',
            'Allyl cation (m/z = 41) from H loss'
        ]
    },
    {
        id: 'ms-example-butanone',
        title: 'Detailed Example: 2-Butanone McLafferty',
        content: `<h4>🔄 Complete Analysis of 2-Butanone (CH₃COCH₂CH₃)</h4>

<p>This example demonstrates <strong>McLafferty rearrangement</strong> - a key rearrangement fragmentation!</p>

<div class="highlight-box">
<strong>Learning Objectives:</strong>
<ul>
<li>Understand McLafferty rearrangement mechanism (γ-H transfer)</li>
<li>See the 6-membered ring transition state</li>
<li>Learn how McLafferty COMPETES with α-cleavage</li>
<li>Recognize enol cation formation (m/z = 58)</li>
</ul>
</div>

<p><em>Toggle button switches between α-cleavage and McLafferty views!</em></p>

<div class="warning-box">
<strong>Mass Balance:</strong> 72 = 58 + 28 ✓
</div>`,
        keyPoints: [
            '2-Butanone: MW = 72, base peak = 58 (McLafferty)',
            'McLafferty requires γ-hydrogen (3 bonds from C=O)',
            '6-membered ring transition state (low strain)',
            'Competing pathways: McLafferty (58) vs α-cleavage (43, 57)'
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
