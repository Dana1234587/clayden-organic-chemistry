import { FlashcardData, GlossaryTerm, MiniQuizData } from '../../types';

export const flashcards: FlashcardData[] = [
    {
        front: 'What is a molecular orbital?',
        back: 'A region of space in a molecule where electrons are likely to be found, formed by combining atomic orbitals'
    },
    {
        front: 'What is the difference between bonding and antibonding orbitals?',
        back: 'Bonding orbitals (σ) have electron density BETWEEN nuclei and lower energy. Antibonding orbitals (σ*) have a node between nuclei and higher energy.'
    },
    {
        front: 'Bond Order Formula',
        back: 'Bond Order = ½ × (bonding electrons − antibonding electrons)'
    },
    {
        front: 'What is sp³ hybridization?',
        back: 'Mixing of one s and three p orbitals to form four equivalent hybrid orbitals arranged tetrahedrally (109.5°). Example: CH₄'
    },
    {
        front: 'What is sp² hybridization?',
        back: 'Mixing of one s and two p orbitals to form three hybrid orbitals in a trigonal planar arrangement (120°). One p orbital remains unhybridized for π bonding. Example: C₂H₄'
    },
    {
        front: 'What is sp hybridization?',
        back: 'Mixing of one s and one p orbital to form two linear hybrid orbitals (180°). Two p orbitals remain for π bonds. Example: C₂H₂'
    },
    {
        front: 'What does VSEPR stand for?',
        back: 'Valence Shell Electron Pair Repulsion - a model that predicts molecular geometry by minimizing repulsion between electron pairs'
    },
    {
        front: 'Why are lone pairs more repulsive than bonding pairs?',
        back: 'Lone pairs are only attracted to one nucleus, so they spread out more and occupy more space than bonding pairs'
    },
    {
        front: 'Difference between σ and π bonds',
        back: 'σ bonds: head-on overlap, cylindrical symmetry, allows rotation. π bonds: side-on overlap, restricts rotation.'
    },
    {
        front: 'Why is water bent (104.5°)?',
        back: 'Two lone pairs on oxygen push the two O-H bonding pairs closer together, reducing the angle from 109.5° to 104.5°'
    },
    {
        front: 'Why can\'t double bonds rotate?',
        back: 'Rotation would break the π bond overlap, requiring ~250 kJ/mol of energy. The p orbitals must remain parallel.'
    },
    {
        front: 'What are HOMO and LUMO?',
        back: 'HOMO = Highest Occupied Molecular Orbital (electron donor). LUMO = Lowest Unoccupied Molecular Orbital (electron acceptor). These are key for reactivity.'
    },
];

export const glossary: GlossaryTerm[] = [
    { term: 'Atomic Orbital', definition: 'A region of space around an atom where an electron is most likely to be found' },
    { term: 'Molecular Orbital', definition: 'An orbital that extends over two or more atoms, formed by combining atomic orbitals' },
    { term: 'Bonding Orbital (σ)', definition: 'A molecular orbital with increased electron density between nuclei, leading to a stable bond' },
    { term: 'Antibonding Orbital (σ*)', definition: 'A molecular orbital with a node between nuclei, destabilizing the bond' },
    { term: 'Bond Order', definition: 'A measure of bond strength calculated as ½(bonding electrons − antibonding electrons)' },
    { term: 'Hybridization', definition: 'The mixing of atomic orbitals to form new hybrid orbitals optimized for bonding' },
    { term: 'sp³ Hybrid', definition: 'Four equivalent orbitals from mixing one s and three p orbitals; tetrahedral geometry (109.5°)' },
    { term: 'sp² Hybrid', definition: 'Three orbitals from mixing one s and two p orbitals; trigonal planar (120°)' },
    { term: 'sp Hybrid', definition: 'Two orbitals from mixing one s and one p orbital; linear geometry (180°)' },
    { term: 'VSEPR', definition: 'Valence Shell Electron Pair Repulsion - theory predicting molecular shapes based on electron pair repulsion' },
    { term: 'Sigma Bond (σ)', definition: 'A bond formed by head-on orbital overlap, cylindrically symmetric around the bond axis' },
    { term: 'Pi Bond (π)', definition: 'A bond formed by side-on overlap of p orbitals, with electron density above and below the bond axis' },
    { term: 'Node', definition: 'A region where the probability of finding an electron is zero (wave function = 0)' },
    { term: 'HOMO', definition: 'Highest Occupied Molecular Orbital - the highest energy orbital containing electrons' },
    { term: 'LUMO', definition: 'Lowest Unoccupied Molecular Orbital - the lowest energy empty orbital' },
    { term: 'cis-trans Isomers', definition: 'Geometric isomers around a double bond; cis = same side, trans = opposite sides' },
];

export const miniQuizzes: MiniQuizData[] = [
    {
        id: 'ch4-mo-quiz',
        afterSection: 'molecular-orbitals',
        questions: [
            {
                id: 'mo-q1',
                question: 'What is the bond order of H₂?',
                options: ['0', '0.5', '1', '2'],
                correctAnswer: 2,
                explanation: 'H₂ has 2 electrons in σ bonding and 0 in σ* antibonding. Bond Order = ½(2-0) = 1'
            }
        ]
    },
    {
        id: 'ch4-hyb-quiz',
        afterSection: 'hybridization',
        questions: [
            {
                id: 'hyb-q1',
                question: 'What is the hybridization of carbon in ethene (C₂H₄)?',
                options: ['sp', 'sp²', 'sp³', 'sp³d'],
                correctAnswer: 1,
                explanation: 'In ethene, carbon forms a double bond. Each carbon is sp² hybridized with trigonal planar geometry (120°).'
            }
        ]
    },
    {
        id: 'ch4-vsepr-quiz',
        afterSection: 'vsepr-theory',
        questions: [
            {
                id: 'vsepr-q1',
                question: 'What is the shape of ammonia (NH₃)?',
                options: ['Tetrahedral', 'Trigonal planar', 'Trigonal pyramidal', 'Bent'],
                correctAnswer: 2,
                explanation: 'NH₃ has 3 bonding pairs and 1 lone pair. The lone pair pushes down on the bonds, creating a trigonal pyramidal shape.'
            }
        ]
    }
];
