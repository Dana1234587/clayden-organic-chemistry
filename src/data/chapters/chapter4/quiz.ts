import { ChapterQuiz } from '../../types';

export const quiz: ChapterQuiz[] = [
    // ========== ATOMIC ORBITALS ==========
    {
        id: 'q1-orbital-shapes',
        question: 'What is the shape of a p orbital?',
        options: [
            'Spherical',
            'Dumbbell (two lobes)',
            'Four-leaf clover',
            'Ring-shaped'
        ],
        correctAnswer: 1,
        explanation: 'p orbitals have a dumbbell shape with two lobes on opposite sides of the nucleus, separated by a planar node.',
        topic: 'Atomic Orbitals'
    },
    {
        id: 'q2-phase-meaning',
        question: 'The + and − signs on orbital diagrams represent:',
        options: [
            'Positive and negative electrical charges',
            'The phase (sign) of the wave function',
            'The direction of electron spin',
            'The probability of finding electrons'
        ],
        correctAnswer: 1,
        explanation: 'The signs represent the mathematical phase of the wave function, NOT electrical charge. This is crucial for understanding how orbitals combine.',
        topic: 'Atomic Orbitals'
    },
    {
        id: 'q3-nodes',
        question: 'What is a node in an orbital?',
        options: [
            'A region of maximum electron density',
            'The nucleus of the atom',
            'A region where the probability of finding an electron is zero',
            'The boundary of the orbital'
        ],
        correctAnswer: 2,
        explanation: 'A node is a region where the wave function (and therefore the probability of finding an electron) equals zero.',
        topic: 'Atomic Orbitals'
    },

    // ========== MOLECULAR ORBITALS ==========
    {
        id: 'q4-bonding-orbital',
        question: 'A bonding molecular orbital is formed when atomic orbitals combine:',
        options: [
            'Out of phase (one + and one −)',
            'In phase (both + or both −)',
            'With different energies',
            'From different atom types'
        ],
        correctAnswer: 1,
        explanation: 'Bonding orbitals form from in-phase (constructive) overlap, which increases electron density between the nuclei.',
        topic: 'Molecular Orbital Theory'
    },
    {
        id: 'q5-antibonding',
        question: 'Which is TRUE about antibonding (σ*) orbitals?',
        options: [
            'They have lower energy than atomic orbitals',
            'They have a node between the nuclei',
            'They strengthen the bond',
            'They form from in-phase overlap'
        ],
        correctAnswer: 1,
        explanation: 'Antibonding orbitals have a node between the nuclei (destructive interference) and are higher in energy than the original atomic orbitals.',
        topic: 'Molecular Orbital Theory'
    },
    {
        id: 'q6-bond-order',
        question: 'The bond order formula is:',
        options: [
            '(Bonding electrons + Antibonding electrons) / 2',
            '(Bonding electrons − Antibonding electrons) / 2',
            'Bonding electrons / Antibonding electrons',
            'Total electrons / 2'
        ],
        correctAnswer: 1,
        explanation: 'Bond Order = ½(bonding electrons − antibonding electrons). A higher bond order means a stronger, shorter bond.',
        topic: 'Molecular Orbital Theory'
    },
    {
        id: 'q7-he2-stability',
        question: 'Why is He₂ unstable (does not exist as a molecule)?',
        options: [
            'Helium atoms are too big',
            'The bond order is zero (2 bonding, 2 antibonding)',
            'Helium has no electrons to share',
            'The atomic orbitals cannot overlap'
        ],
        correctAnswer: 1,
        explanation: 'He₂ would have 4 electrons: 2 in σ (bonding) and 2 in σ* (antibonding). Bond Order = ½(2-2) = 0, meaning no net bonding.',
        topic: 'Molecular Orbital Theory'
    },

    // ========== HYBRIDIZATION ==========
    {
        id: 'q8-sp3-geometry',
        question: 'An sp³ hybridized carbon has what geometry?',
        options: [
            'Linear (180°)',
            'Trigonal planar (120°)',
            'Tetrahedral (109.5°)',
            'Square planar (90°)'
        ],
        correctAnswer: 2,
        explanation: 'sp³ hybridization creates 4 equivalent hybrid orbitals pointing to the corners of a tetrahedron with 109.5° angles.',
        topic: 'Hybridization'
    },
    {
        id: 'q9-sp2-identification',
        question: 'Which molecule contains an sp² hybridized carbon?',
        options: [
            'Methane (CH₄)',
            'Ethane (C₂H₆)',
            'Ethene (C₂H₄)',
            'Ethyne (C₂H₂)'
        ],
        correctAnswer: 2,
        explanation: 'Ethene has a C=C double bond. Each carbon is sp² hybridized (trigonal planar) with one unhybridized p orbital forming the π bond.',
        topic: 'Hybridization'
    },
    {
        id: 'q10-sp-angle',
        question: 'The bond angle in an sp hybridized carbon is:',
        options: [
            '90°',
            '109.5°',
            '120°',
            '180°'
        ],
        correctAnswer: 3,
        explanation: 'sp hybridization creates 2 hybrid orbitals pointing in opposite directions (180°), giving a linear geometry.',
        topic: 'Hybridization'
    },
    {
        id: 'q11-unhybridized-p',
        question: 'How many unhybridized p orbitals remain in an sp² carbon?',
        options: [
            '0',
            '1',
            '2',
            '3'
        ],
        correctAnswer: 1,
        explanation: 'sp² uses one s and two p orbitals, leaving one unhybridized p orbital perpendicular to the sp² plane for π bonding.',
        topic: 'Hybridization'
    },

    // ========== VSEPR ==========
    {
        id: 'q12-vsepr-principle',
        question: 'VSEPR theory predicts molecular shape based on:',
        options: [
            'The number of protons in the nucleus',
            'Electron pair repulsion',
            'The mass of atoms',
            'Nuclear magnetic resonance'
        ],
        correctAnswer: 1,
        explanation: 'VSEPR (Valence Shell Electron Pair Repulsion) predicts that electron pairs arrange to minimize repulsion.',
        topic: 'VSEPR Theory'
    },
    {
        id: 'q13-water-shape',
        question: 'Why is water (H₂O) bent instead of linear?',
        options: [
            'Hydrogen atoms are too light',
            'The lone pairs on oxygen push the bonds together',
            'Oxygen is sp hybridized',
            'Water molecules attract each other'
        ],
        correctAnswer: 1,
        explanation: 'Water has 2 bonding pairs and 2 lone pairs. The lone pairs repel more strongly, pushing the H-O-H angle to about 104.5°.',
        topic: 'VSEPR Theory'
    },
    {
        id: 'q14-ammonia-angle',
        question: 'Ammonia (NH₃) has a bond angle of 107° instead of 109.5° because:',
        options: [
            'Nitrogen is smaller than carbon',
            'One lone pair compresses the bond angles',
            'Hydrogen atoms are very small',
            'There are only 3 bonds'
        ],
        correctAnswer: 1,
        explanation: 'Ammonia has 1 lone pair which repels the bonding pairs more strongly, compressing the H-N-H angle from 109.5° to 107°.',
        topic: 'VSEPR Theory'
    },
    {
        id: 'q15-lone-pair-repulsion',
        question: 'Which has the STRONGEST repulsion in VSEPR theory?',
        options: [
            'Bonding-Bonding',
            'Lone-Bonding',
            'Lone-Lone',
            'All repulsions are equal'
        ],
        correctAnswer: 2,
        explanation: 'Repulsion order: Lone-Lone > Lone-Bonding > Bonding-Bonding. Lone pairs spread out more because they are only attracted to one nucleus.',
        topic: 'VSEPR Theory'
    },

    // ========== SIGMA AND PI BONDS ==========
    {
        id: 'q16-sigma-overlap',
        question: 'Sigma (σ) bonds are formed by:',
        options: [
            'Side-on overlap of p orbitals',
            'Head-on (end-to-end) overlap of orbitals',
            'Overlap of two lone pairs',
            'Ionic bonding'
        ],
        correctAnswer: 1,
        explanation: 'Sigma bonds form from head-on overlap along the bond axis, creating cylindrical electron density between atoms.',
        topic: 'Sigma and Pi Bonds'
    },
    {
        id: 'q17-double-bond-composition',
        question: 'A carbon-carbon double bond consists of:',
        options: [
            'Two sigma bonds',
            'Two pi bonds',
            'One sigma bond and one pi bond',
            'One sigma bond and two pi bonds'
        ],
        correctAnswer: 2,
        explanation: 'A double bond = 1 σ bond (from sp² hybrid orbitals) + 1 π bond (from parallel p orbitals).',
        topic: 'Sigma and Pi Bonds'
    },
    {
        id: 'q18-pi-bond-strength',
        question: 'Why are pi bonds generally weaker than sigma bonds?',
        options: [
            'Pi bonds have more electrons',
            'Side-on overlap is less efficient than head-on overlap',
            'Pi bonds are longer',
            'Sigma bonds have a node'
        ],
        correctAnswer: 1,
        explanation: 'Pi bonds form from side-on overlap of p orbitals, which gives less electron density between nuclei than head-on sigma overlap.',
        topic: 'Sigma and Pi Bonds'
    },
    {
        id: 'q19-triple-bond',
        question: 'A triple bond (like in ethyne C₂H₂) contains:',
        options: [
            '3 sigma bonds',
            '3 pi bonds',
            '1 sigma + 2 pi bonds',
            '2 sigma + 1 pi bond'
        ],
        correctAnswer: 2,
        explanation: 'A triple bond = 1 σ bond + 2 π bonds. The sigma forms from sp hybrid orbitals, the two pi bonds from two sets of parallel p orbitals.',
        topic: 'Sigma and Pi Bonds'
    },

    // ========== MOLECULAR ROTATION ==========
    {
        id: 'q20-single-bond-rotation',
        question: 'Single bonds allow free rotation because:',
        options: [
            'They are weaker than double bonds',
            'Sigma bonds have cylindrical symmetry',
            'There are no electrons between atoms',
            'Carbon atoms are small'
        ],
        correctAnswer: 1,
        explanation: 'Sigma bonds have cylindrical (axial) symmetry—the electron density looks the same from any angle around the bond axis.',
        topic: 'Molecular Rotation'
    },
    {
        id: 'q21-double-bond-restriction',
        question: 'Double bonds cannot rotate freely because:',
        options: [
            'They are too short',
            'Rotation would break the pi bond overlap',
            'Carbon is too heavy',
            'There are too many electrons'
        ],
        correctAnswer: 1,
        explanation: 'Pi bonds require p orbitals to remain parallel. Rotation would break this overlap, costing ~250 kJ/mol of energy.',
        topic: 'Molecular Rotation'
    },
    {
        id: 'q22-cis-trans',
        question: 'cis-trans isomers exist for double bonds because:',
        options: [
            'Double bonds are very short',
            'Rotation is restricted, locking groups in position',
            'Carbon has 4 electrons',
            'Pi bonds are magnetic'
        ],
        correctAnswer: 1,
        explanation: 'Since rotation around C=C is restricted, groups attached to the double bond are locked either on the same side (cis) or opposite sides (trans).',
        topic: 'Molecular Rotation'
    },

    // ========== HOMO/LUMO ==========
    {
        id: 'q23-homo-lumo',
        question: 'What does HOMO stand for?',
        options: [
            'Homogeneous Molecular Overlap',
            'Highest Occupied Molecular Orbital',
            'Hydrogen-Oxygen Molecular Orientation',
            'High-Order Magnetic Orientation'
        ],
        correctAnswer: 1,
        explanation: 'HOMO = Highest Occupied Molecular Orbital. Along with LUMO (Lowest Unoccupied), these frontier orbitals control chemical reactivity.',
        topic: 'Molecular Orbital Theory'
    },

    // ========== APPLICATION QUESTIONS ==========
    {
        id: 'q24-ethene-planarity',
        question: 'Why is ethene (C₂H₄) a planar molecule?',
        options: [
            'It is lighter than ethane',
            'The p orbitals must be parallel to form the π bond',
            'Carbon atoms repel hydrogen atoms',
            'There are no lone pairs'
        ],
        correctAnswer: 1,
        explanation: 'For the π bond in ethene to form, the unhybridized p orbitals on each carbon must be parallel, forcing all atoms into the same plane.',
        topic: 'Sigma and Pi Bonds'
    },
    {
        id: 'q25-co2-linear',
        question: 'CO₂ is linear because:',
        options: [
            'Carbon is small',
            'Carbon is sp hybridized with no lone pairs',
            'Oxygen atoms repel each other',
            'There are ionic bonds'
        ],
        correctAnswer: 1,
        explanation: 'Carbon in CO₂ is sp hybridized (2 bonds, 0 lone pairs), giving a linear geometry with 180° angle.',
        topic: 'Hybridization'
    }
];
