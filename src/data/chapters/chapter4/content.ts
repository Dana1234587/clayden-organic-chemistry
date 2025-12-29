import { ChapterSection } from '../../types';

export const introduction = `
Welcome to the fascinating world of molecular structure! In this chapter, you'll discover how atoms combine 
to form molecules, and why molecules have the specific 3D shapes they do. Understanding molecular structure 
is the foundation for predicting how molecules will react with each other.

We'll explore:
• How atomic orbitals combine to form molecular orbitals
• The concept of hybridization (sp³, sp², sp)
• How to predict molecular geometry using VSEPR theory
• Why some bonds can rotate freely while others cannot
`;

export const sections: ChapterSection[] = [
    // ========== SECTION 1: INTRODUCTION ==========
    {
        id: 'seeing-molecules',
        title: 'Seeing Molecules: Experimental Methods',
        content: `
            <h3>How Do We Know What Molecules Look Like?</h3>
            
            <p>Molecules are incredibly small—far too small to see with visible light. Yet chemists have 
            developed remarkable techniques to determine exactly where atoms are positioned in 3D space.</p>

            <div class="info-box cyan">
                <h4>🔬 Key Experimental Techniques</h4>
                <ul>
                    <li><strong>X-ray Crystallography:</strong> Fires X-rays at crystals and analyzes the diffraction pattern. 
                    This reveals atomic positions with incredible precision (±0.01 Å).</li>
                    <li><strong>Electron Diffraction:</strong> Similar to X-rays but uses electrons. Useful for gases.</li>
                    <li><strong>Atomic Force Microscopy (AFM):</strong> A tiny probe "feels" the surface of molecules. 
                    Can actually image individual atoms!</li>
                    <li><strong>NMR Spectroscopy:</strong> Uses nuclear spin to determine how atoms are connected.</li>
                </ul>
            </div>

            <div class="highlight-box">
                <p><strong>💡 Amazing Fact:</strong> In 2009, scientists at IBM used AFM to take the first actual 
                "photograph" of an organic molecule (pentacene), clearly showing its hexagonal carbon rings!</p>
            </div>

            <h4>Why Structure Matters</h4>
            <p>The 3D structure of a molecule determines:</p>
            <ul>
                <li>Its <strong>physical properties</strong> (melting point, boiling point)</li>
                <li>Its <strong>reactivity</strong> (which parts can be attacked)</li>
                <li>Its <strong>biological activity</strong> (drugs must fit into specific receptor sites)</li>
            </ul>

            <p>To understand structure, we must first understand <strong>orbitals</strong>—the regions 
            where electrons are most likely to be found.</p>
        `
    },

    // ========== SECTION 2: ATOMIC ORBITALS ==========
    {
        id: 'atomic-orbitals',
        title: 'Atomic Orbitals: Where Electrons Live',
        content: `
            <h3>The Quantum Mechanical View of Atoms</h3>
            
            <p>Electrons don't orbit the nucleus like planets around the sun. Instead, they exist in 
            <strong>orbitals</strong>—3D regions of space where there's a high probability of finding an electron.</p>

            <div class="concept-card">
                <h4>🌊 Orbitals as Waves</h4>
                <p>Orbitals are described by mathematical wave functions (ψ). The <strong>square</strong> of the 
                wave function (ψ²) gives us the <em>probability density</em>—the likelihood of finding an 
                electron at any point.</p>
            </div>

            <h4>Types of Atomic Orbitals</h4>
            
            <div class="orbital-comparison">
                <div class="orbital-type s-orbital">
                    <h5>s Orbitals</h5>
                    <ul>
                        <li><strong>Shape:</strong> Spherical</li>
                        <li><strong>Nodes:</strong> 0 for 1s, 1 spherical node for 2s</li>
                        <li><strong>Capacity:</strong> 2 electrons</li>
                        <li><strong>Angular momentum:</strong> l = 0</li>
                    </ul>
                </div>
                
                <div class="orbital-type p-orbital">
                    <h5>p Orbitals</h5>
                    <ul>
                        <li><strong>Shape:</strong> Dumbbell (two lobes)</li>
                        <li><strong>Nodes:</strong> 1 planar node through nucleus</li>
                        <li><strong>Orientations:</strong> px, py, pz (three at 90°)</li>
                        <li><strong>Capacity:</strong> 6 electrons total (2 per orbital)</li>
                        <li><strong>Angular momentum:</strong> l = 1</li>
                    </ul>
                </div>
            </div>

            <div class="warning-box">
                <h4>⚠️ Common Misconception: Phase ≠ Charge</h4>
                <p>The <strong>+ and −</strong> signs on orbital diagrams represent the <em>phase</em> of the 
                wave function, NOT electrical charge! Think of it like the peaks and troughs of a wave. 
                This phase difference is crucial for understanding how orbitals combine.</p>
            </div>

            <h4>Nodes: Where Electrons Are Never Found</h4>
            <p>A <strong>node</strong> is a region where the probability of finding an electron is exactly zero. 
            There are two types:</p>
            <ol>
                <li><strong>Radial nodes:</strong> Spherical shells (like layers of an onion)</li>
                <li><strong>Planar nodes:</strong> Flat planes passing through the nucleus</li>
            </ol>
            <p>The number of nodes increases with energy: 2s has one radial node, 2p has one planar node.</p>
        `
    },

    // ========== SECTION 3: MOLECULAR ORBITALS ==========
    {
        id: 'molecular-orbitals',
        title: 'Molecular Orbital Theory',
        content: `
            <h3>How Atoms Bond: The MO Approach</h3>
            
            <p>When atoms come together, their atomic orbitals combine to form new 
            <strong>molecular orbitals (MOs)</strong> that belong to the entire molecule.</p>

            <div class="key-concept">
                <h4>🔑 The LCAO Method</h4>
                <p><strong>Linear Combination of Atomic Orbitals:</strong> Molecular orbitals are formed by 
                adding or subtracting atomic orbitals mathematically.</p>
                <p>ψ(bonding) = ψA + ψB → In-phase combination</p>
                <p>ψ(antibonding) = ψA − ψB → Out-of-phase combination</p>
            </div>

            <h4>Bonding vs Antibonding Orbitals</h4>
            
            <table class="styled-table">
                <thead>
                    <tr>
                        <th>Property</th>
                        <th>Bonding (σ)</th>
                        <th>Antibonding (σ*)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>Formation</strong></td>
                        <td>In-phase overlap (+ + or − −)</td>
                        <td>Out-of-phase overlap (+ −)</td>
                    </tr>
                    <tr>
                        <td><strong>Energy</strong></td>
                        <td>Lower than atomic orbitals</td>
                        <td>Higher than atomic orbitals</td>
                    </tr>
                    <tr>
                        <td><strong>Electron density</strong></td>
                        <td>High between nuclei</td>
                        <td>Zero between nuclei (node)</td>
                    </tr>
                    <tr>
                        <td><strong>Effect on bond</strong></td>
                        <td>Strengthens bond</td>
                        <td>Weakens bond</td>
                    </tr>
                </tbody>
            </table>

            <h4>The H₂ Molecule: Simplest Example</h4>
            <p>Two hydrogen 1s orbitals combine:</p>
            <ul>
                <li><strong>σ (bonding):</strong> Electrons concentrated between the nuclei → stable bond</li>
                <li><strong>σ* (antibonding):</strong> Node between nuclei → would destabilize</li>
            </ul>
            <p>H₂ has 2 electrons in σ, 0 in σ* → <strong>Bond Order = 1</strong> (stable single bond)</p>

            <div class="formula-box">
                <h4>📐 Bond Order Formula</h4>
                <p><strong>Bond Order = ½(bonding electrons − antibonding electrons)</strong></p>
                <ul>
                    <li>Bond Order = 1 → Single bond</li>
                    <li>Bond Order = 2 → Double bond</li>
                    <li>Bond Order = 3 → Triple bond</li>
                    <li>Bond Order = 0 → No bond (unstable)</li>
                </ul>
            </div>
        `
    },

    // ========== SECTION 4: ORBITAL OVERLAP FACTORS ==========
    {
        id: 'overlap-factors',
        title: 'Factors Affecting Orbital Overlap',
        content: `
            <h3>What Makes a Good Bond?</h3>
            
            <p>Not all orbital overlaps are equally effective. Four key factors determine how well 
            orbitals combine:</p>

            <div class="factor-grid">
                <div class="factor-card">
                    <h4>1️⃣ Energy Match</h4>
                    <p>Orbitals combine best when they have <strong>similar energies</strong>. 
                    If energies are too different, electrons stay mostly on the lower-energy atom.</p>
                    <p class="example">Example: In HF, hydrogen's 1s and fluorine's 2p have different energies, 
                    making the bond polar.</p>
                </div>

                <div class="factor-card">
                    <h4>2️⃣ Distance</h4>
                    <p>Orbitals must be <strong>close enough</strong> to overlap significantly. 
                    As atoms approach, overlap increases until repulsion takes over.</p>
                    <p class="example">The optimal bond length balances overlap and repulsion.</p>
                </div>

                <div class="factor-card">
                    <h4>3️⃣ Size</h4>
                    <p>Orbitals must be <strong>similar in size</strong> for effective overlap. 
                    A tiny 1s orbital doesn't overlap well with a large 3p orbital.</p>
                    <p class="example">C-C bonds are stronger than Si-Si bonds partly due to better size matching.</p>
                </div>

                <div class="factor-card">
                    <h4>4️⃣ Symmetry</h4>
                    <p>Orbitals must have the <strong>correct symmetry</strong> to overlap. 
                    s orbitals are symmetric, while p orbitals have a preferred direction.</p>
                    <p class="example">A px orbital overlaps well with another px but not with a py.</p>
                </div>
            </div>

            <h4>HOMO and LUMO: The Reactive Orbitals</h4>
            
            <div class="concept-highlight">
                <p><strong>HOMO</strong> = Highest Occupied Molecular Orbital</p>
                <p><strong>LUMO</strong> = Lowest Unoccupied Molecular Orbital</p>
                <p>These are the frontier orbitals that participate in chemical reactions. Electrons flow 
                from HOMO (electron donor) to LUMO (electron acceptor).</p>
            </div>
        `
    },

    // ========== SECTION 5: HYBRIDIZATION ==========
    {
        id: 'hybridization',
        title: 'Hybridization: Mixing Atomic Orbitals',
        content: `
            <h3>Why Carbon Forms Four Equivalent Bonds</h3>
            
            <p>Carbon has the electron configuration 1s² 2s² 2p². With only 2 unpaired electrons 
            in the 2p orbitals, how can it form <em>four</em> bonds (as in CH₄)?</p>

            <p>The answer is <strong>hybridization</strong>—the mathematical mixing of atomic orbitals 
            to create new hybrid orbitals optimized for bonding.</p>

            <div class="hybridization-section">
                <h4>sp³ Hybridization (Tetrahedral)</h4>
                <div class="hybrid-details">
                    <p><strong>Mixing:</strong> One 2s + three 2p → Four sp³ orbitals</p>
                    <p><strong>Geometry:</strong> Tetrahedral (like a tripod with 4 legs)</p>
                    <p><strong>Bond Angle:</strong> 109.5°</p>
                    <p><strong>Examples:</strong> CH₄ (methane), CCl₄, ethane (C₂H₆)</p>
                </div>
                
                <div class="visual-note">
                    <p>🎯 The four sp³ orbitals point to the corners of a tetrahedron, 
                    maximizing their distance from each other.</p>
                </div>
            </div>

            <div class="hybridization-section">
                <h4>sp² Hybridization (Trigonal Planar)</h4>
                <div class="hybrid-details">
                    <p><strong>Mixing:</strong> One 2s + two 2p → Three sp² orbitals (+ one unhybridized p)</p>
                    <p><strong>Geometry:</strong> Trigonal planar (flat triangle)</p>
                    <p><strong>Bond Angle:</strong> 120°</p>
                    <p><strong>Examples:</strong> Ethene (C₂H₄), BF₃, carbonyl groups (C=O)</p>
                </div>
                
                <div class="visual-note">
                    <p>🎯 The remaining p orbital is perpendicular to the plane and 
                    forms the π bond in double bonds.</p>
                </div>
            </div>

            <div class="hybridization-section">
                <h4>sp Hybridization (Linear)</h4>
                <div class="hybrid-details">
                    <p><strong>Mixing:</strong> One 2s + one 2p → Two sp orbitals (+ two unhybridized p)</p>
                    <p><strong>Geometry:</strong> Linear (straight line)</p>
                    <p><strong>Bond Angle:</strong> 180°</p>
                    <p><strong>Examples:</strong> Ethyne (C₂H₂), CO₂, HCN</p>
                </div>
                
                <div class="visual-note">
                    <p>🎯 Two perpendicular p orbitals remain unhybridized, forming 
                    two π bonds (as in triple bonds).</p>
                </div>
            </div>

            <div class="summary-table">
                <table class="styled-table">
                    <thead>
                        <tr>
                            <th>Hybridization</th>
                            <th>Geometry</th>
                            <th>Angle</th>
                            <th>σ bonds</th>
                            <th>π bonds possible</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>sp³</strong></td>
                            <td>Tetrahedral</td>
                            <td>109.5°</td>
                            <td>4</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td><strong>sp²</strong></td>
                            <td>Trigonal planar</td>
                            <td>120°</td>
                            <td>3</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td><strong>sp</strong></td>
                            <td>Linear</td>
                            <td>180°</td>
                            <td>2</td>
                            <td>2</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `
    },

    // ========== SECTION 6: VSEPR THEORY ==========
    {
        id: 'vsepr-theory',
        title: 'VSEPR Theory: Predicting Molecular Shapes',
        content: `
            <h3>Electron Pairs Repel Each Other</h3>
            
            <p><strong>VSEPR</strong> = Valence Shell Electron Pair Repulsion</p>
            
            <p>The basic idea is simple: electron pairs around a central atom arrange themselves 
            to minimize repulsion (get as far apart as possible).</p>

            <div class="key-principle">
                <h4>🔑 Key Principle</h4>
                <p>Lone pairs take up MORE space than bonding pairs because they're only attracted 
                to one nucleus, so they spread out more.</p>
                <p class="repulsion-order"><strong>Repulsion order:</strong> Lone-Lone > Lone-Bonding > Bonding-Bonding</p>
            </div>

            <h4>Effect of Lone Pairs on Geometry</h4>

            <div class="geometry-examples">
                <div class="geometry-card">
                    <h5>Methane (CH₄)</h5>
                    <p><strong>Electron pairs:</strong> 4 bonding, 0 lone</p>
                    <p><strong>Shape:</strong> Tetrahedral</p>
                    <p><strong>Angle:</strong> 109.5° (ideal)</p>
                </div>

                <div class="geometry-card">
                    <h5>Ammonia (NH₃)</h5>
                    <p><strong>Electron pairs:</strong> 3 bonding, 1 lone</p>
                    <p><strong>Shape:</strong> Trigonal pyramidal</p>
                    <p><strong>Angle:</strong> 107° (compressed by lone pair)</p>
                </div>

                <div class="geometry-card">
                    <h5>Water (H₂O)</h5>
                    <p><strong>Electron pairs:</strong> 2 bonding, 2 lone</p>
                    <p><strong>Shape:</strong> Bent</p>
                    <p><strong>Angle:</strong> 104.5° (more compression)</p>
                </div>
            </div>

            <div class="insight-box">
                <h4>💡 Why Water is Bent, Not Linear</h4>
                <p>Water has 4 electron pairs around oxygen (2 bonding + 2 lone pairs). 
                The base geometry is tetrahedral, but we only "see" the two O-H bonds, 
                making it appear bent. The lone pairs push the bonds closer together, 
                reducing the angle from 109.5° to 104.5°.</p>
            </div>

            <h4>VSEPR Quick Reference</h4>
            <table class="styled-table">
                <thead>
                    <tr>
                        <th>Total pairs</th>
                        <th>Bonding</th>
                        <th>Lone</th>
                        <th>Molecular Shape</th>
                        <th>Example</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>2</td><td>2</td><td>0</td><td>Linear</td><td>CO₂</td></tr>
                    <tr><td>3</td><td>3</td><td>0</td><td>Trigonal planar</td><td>BF₃</td></tr>
                    <tr><td>3</td><td>2</td><td>1</td><td>Bent</td><td>SO₂</td></tr>
                    <tr><td>4</td><td>4</td><td>0</td><td>Tetrahedral</td><td>CH₄</td></tr>
                    <tr><td>4</td><td>3</td><td>1</td><td>Trigonal pyramidal</td><td>NH₃</td></tr>
                    <tr><td>4</td><td>2</td><td>2</td><td>Bent</td><td>H₂O</td></tr>
                </tbody>
            </table>
        `
    },

    // ========== SECTION 7: SIGMA AND PI BONDS ==========
    {
        id: 'sigma-pi-bonds',
        title: 'Sigma (σ) and Pi (π) Bonds',
        content: `
            <h3>Two Types of Covalent Bonds</h3>
            
            <p>When orbitals overlap, they can do so in two distinct ways, creating two types of bonds:</p>

            <div class="bond-comparison">
                <div class="bond-type sigma">
                    <h4>Sigma (σ) Bonds</h4>
                    <ul>
                        <li><strong>Overlap:</strong> Head-on (along the bond axis)</li>
                        <li><strong>Symmetry:</strong> Cylindrical around the bond axis</li>
                        <li><strong>Strength:</strong> Stronger (more overlap)</li>
                        <li><strong>Rotation:</strong> Free rotation possible</li>
                        <li><strong>Formation:</strong> s-s, s-p, or sp hybrid orbitals</li>
                    </ul>
                </div>

                <div class="bond-type pi">
                    <h4>Pi (π) Bonds</h4>
                    <ul>
                        <li><strong>Overlap:</strong> Side-on (above/below bond axis)</li>
                        <li><strong>Symmetry:</strong> Two lobes above and below</li>
                        <li><strong>Strength:</strong> Weaker (less overlap)</li>
                        <li><strong>Rotation:</strong> Rotation breaks the bond!</li>
                        <li><strong>Formation:</strong> Parallel p orbitals</li>
                    </ul>
                </div>
            </div>

            <h4>Bond Types in Organic Molecules</h4>
            
            <table class="styled-table">
                <thead>
                    <tr>
                        <th>Bond Type</th>
                        <th>σ Bonds</th>
                        <th>π Bonds</th>
                        <th>Example</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>Single Bond (C−C)</strong></td>
                        <td>1</td>
                        <td>0</td>
                        <td>Ethane (C₂H₆)</td>
                    </tr>
                    <tr>
                        <td><strong>Double Bond (C=C)</strong></td>
                        <td>1</td>
                        <td>1</td>
                        <td>Ethene (C₂H₄)</td>
                    </tr>
                    <tr>
                        <td><strong>Triple Bond (C≡C)</strong></td>
                        <td>1</td>
                        <td>2</td>
                        <td>Ethyne (C₂H₂)</td>
                    </tr>
                </tbody>
            </table>

            <div class="important-note">
                <h4>⚡ Key Insight: All Multiple Bonds Start with σ</h4>
                <p>The first bond between any two atoms is ALWAYS a sigma bond. 
                Additional bonds (in double/triple bonds) are pi bonds formed by 
                the side-on overlap of unhybridized p orbitals.</p>
            </div>

            <h4>π Bonds and Planarity</h4>
            <p>For p orbitals to overlap side-on (forming π bonds), they must be 
            <strong>parallel</strong>. This forces molecules with double bonds to be <strong>planar</strong> 
            around the double bond.</p>
            <p>Example: In ethene (H₂C=CH₂), all 6 atoms lie in the same plane.</p>
        `
    },

    // ========== SECTION 8: MOLECULAR ROTATION ==========
    {
        id: 'molecular-rotation',
        title: 'Rotation Around Bonds',
        content: `
            <h3>Why Some Bonds Rotate and Others Don't</h3>
            
            <p>The ability of a molecule to rotate around its bonds dramatically affects its 
            3D shape, properties, and reactivity.</p>

            <div class="rotation-comparison">
                <div class="rotation-type free">
                    <h4>✅ Free Rotation (Single Bonds)</h4>
                    <p>Sigma bonds have <strong>cylindrical symmetry</strong>—electron density is 
                    the same at all angles around the bond axis.</p>
                    <p><strong>Result:</strong> Rotation costs almost no energy. The bond can spin 
                    freely (millions of times per second at room temperature).</p>
                    <p class="example"><strong>Example:</strong> Ethane (C₂H₆) can adopt many 
                    different "conformations" as the C-C bond rotates.</p>
                </div>

                <div class="rotation-type restricted">
                    <h4>❌ Restricted Rotation (Double Bonds)</h4>
                    <p>Pi bonds require parallel p orbitals. Rotating would 
                    <strong>break the π overlap</strong>, costing significant energy (~250 kJ/mol).</p>
                    <p><strong>Result:</strong> Double bonds are "locked" in place. No rotation 
                    at normal temperatures.</p>
                    <p class="example"><strong>Example:</strong> Ethene (H₂C=CH₂) is rigid and planar. 
                    The two carbons cannot rotate relative to each other.</p>
                </div>
            </div>

            <div class="consequence-box">
                <h4>🧬 Biological Consequence: cis-trans Isomers</h4>
                <p>Because double bonds can't rotate, molecules with C=C can exist as different 
                <strong>geometric isomers</strong>:</p>
                <ul>
                    <li><strong>cis:</strong> Groups on the same side of the double bond</li>
                    <li><strong>trans:</strong> Groups on opposite sides of the double bond</li>
                </ul>
                <p>These isomers have different physical properties and biological activities! 
                For example, natural fats contain mainly cis double bonds, while artificial 
                trans fats (from partial hydrogenation) have been linked to health problems.</p>
            </div>

            <h4>Energy Barrier to Rotation</h4>
            <p>Even single bonds have a small energy barrier to rotation due to:</p>
            <ul>
                <li><strong>Steric interactions:</strong> Groups bumping into each other</li>
                <li><strong>Torsional strain:</strong> Eclipsed conformations are higher energy than staggered</li>
            </ul>
            <p>However, this barrier is small (~12 kJ/mol for ethane) and easily overcome at room temperature.</p>

            <div class="summary-box">
                <h4>📋 Summary: Rotation Rules</h4>
                <ul>
                    <li><strong>Single bonds (σ only):</strong> Free rotation → flexible molecules</li>
                    <li><strong>Double bonds (σ + π):</strong> No rotation → rigid, planar</li>
                    <li><strong>Triple bonds (σ + 2π):</strong> No rotation → linear</li>
                </ul>
            </div>
        `
    },

    // ========== SECTION 9: CHAPTER SUMMARY ==========
    {
        id: 'chapter-summary',
        title: 'Chapter Summary',
        content: `
            <h3>Key Takeaways</h3>

            <div class="summary-grid">
                <div class="summary-card">
                    <h4>🔵 Atomic Orbitals</h4>
                    <ul>
                        <li>s orbitals: spherical</li>
                        <li>p orbitals: dumbbell-shaped</li>
                        <li>Nodes = zero electron density</li>
                    </ul>
                </div>

                <div class="summary-card">
                    <h4>🟣 Molecular Orbitals</h4>
                    <ul>
                        <li>Bonding (σ): stable, low energy</li>
                        <li>Antibonding (σ*): destabilizing</li>
                        <li>Bond Order = ½(bonding − antibonding)</li>
                    </ul>
                </div>

                <div class="summary-card">
                    <h4>🟢 Hybridization</h4>
                    <ul>
                        <li>sp³: tetrahedral (109.5°)</li>
                        <li>sp²: trigonal planar (120°)</li>
                        <li>sp: linear (180°)</li>
                    </ul>
                </div>

                <div class="summary-card">
                    <h4>🟡 VSEPR</h4>
                    <ul>
                        <li>Electron pairs repel</li>
                        <li>Lone pairs > bonding pairs</li>
                        <li>Shape depends on ALL pairs</li>
                    </ul>
                </div>

                <div class="summary-card">
                    <h4>🔴 σ vs π Bonds</h4>
                    <ul>
                        <li>σ: head-on, cylindrical</li>
                        <li>π: side-on, restricts rotation</li>
                        <li>Double = 1σ + 1π</li>
                    </ul>
                </div>

                <div class="summary-card">
                    <h4>⚪ Rotation</h4>
                    <ul>
                        <li>Single bonds: free rotation</li>
                        <li>Double bonds: no rotation</li>
                        <li>Creates cis/trans isomers</li>
                    </ul>
                </div>
            </div>

            <div class="next-chapter">
                <h4>🔜 Coming Up: Organic Reactions</h4>
                <p>Now that you understand molecular structure, you're ready to learn how molecules 
                <strong>react</strong> with each other! We'll see how HOMO-LUMO interactions drive 
                chemical reactions and how orbital symmetry controls reactivity.</p>
            </div>
        `
    }
];
