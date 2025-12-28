import { FlashcardData, GlossaryTerm, MiniQuizData } from '../../types';

export const flashcards: FlashcardData[] = [
    { id: "fc-1", front: "What element is the basis of all organic compounds?", back: "Carbon - it forms 4 stable bonds and can bond with itself", category: "Basics" },
    { id: "fc-2", front: "Who disproved vitalism by synthesizing urea in 1828?", back: "Friedrich Wöhler - synthesized urea from ammonium cyanate", category: "History" },
    { id: "fc-3", front: "Who discovered the first synthetic dye (Mauveine)?", back: "William Perkin in 1856 (he was only 18!)", category: "History" },
    { id: "fc-4", front: "What are enantiomers?", back: "Non-superimposable mirror-image molecules, like left and right hands", category: "Stereochemistry" },
    { id: "fc-5", front: "(R)-limonene smells like oranges. What does (S)-limonene smell like?", back: "Lemons! Same atoms, different 3D arrangement = different smell", category: "Stereochemistry" },
    { id: "fc-6", front: "What is sp³ hybridization?", back: "4 groups around carbon → tetrahedral shape → 109.5° bond angles", category: "Hybridization" },
    { id: "fc-7", front: "What is sp² hybridization?", back: "3 groups around carbon → trigonal planar → 120° bond angles", category: "Hybridization" },
    { id: "fc-8", front: "What is sp hybridization?", back: "2 groups around carbon → linear → 180° bond angles", category: "Hybridization" },
    { id: "fc-9", front: "Difference between σ and π bonds?", back: "σ: head-on/free rotation. π: sideways/no rotation", category: "Bonding" },
    { id: "fc-10", front: "A double bond consists of:", back: "1 sigma (σ) bond + 1 pi (π) bond", category: "Bonding" },
    { id: "fc-11", front: "A triple bond consists of:", back: "1 sigma (σ) bond + 2 pi (π) bonds", category: "Bonding" },
    { id: "fc-12", front: "What is electronegativity?", back: "An atom's ability to attract shared electrons", category: "Polarity" },
    { id: "fc-13", front: "Why is CO₂ nonpolar?", back: "Linear geometry causes bond dipoles to cancel out", category: "Polarity" },
    { id: "fc-14", front: "Why is H₂O polar?", back: "Bent geometry means bond dipoles don't cancel", category: "Polarity" },
    { id: "fc-15", front: "Most sold drug ever?", back: "Lipitor (atorvastatin) - $12B/year", category: "Medicine" },
    { id: "fc-16", front: "Thalidomide tragedy cause?", back: "One enantiomer caused birth defects; led to stricter testing", category: "Medicine" },
    { id: "fc-17", front: "Bitterest substance?", back: "Denatonium (Bitrex) - used for safety", category: "Industry" },
    { id: "fc-18", front: "Molecule of vision?", back: "11-cis-retinal - isomerizes with light", category: "Biology" },
    { id: "fc-20", front: "% drugs with fluorine?", back: "About 20%", category: "Medicine" },
];

export const glossary: GlossaryTerm[] = [
    { id: "g-1", term: "Organic Chemistry", definition: "Chemistry of carbon compounds.", category: "Basics" },
    { id: "g-2", term: "Carbon", definition: "Element 6, forms 4 bonds.", category: "Basics" },
    { id: "g-5", term: "Covalent Bond", definition: "Sharing of electron pairs.", category: "Bonding" },
    { id: "g-6", term: "Sigma Bond", definition: "Head-on overlap, free rotation.", category: "Bonding" },
    { id: "g-7", term: "Pi Bond", definition: "Sideways overlap, no rotation.", category: "Bonding" },
    { id: "g-8", term: "Double Bond", definition: "1 sigma + 1 pi bond.", category: "Bonding" },
    { id: "g-10", term: "Hybridization", definition: "Mixing atomic orbitals.", category: "Hybridization" },
    { id: "g-11", term: "sp³", definition: "1s+3p, Tetrahedral, 109.5°.", category: "Hybridization" },
    { id: "g-12", term: "sp²", definition: "1s+2p, Trigonal Planar, 120°.", category: "Hybridization" },
    { id: "g-18", term: "Enantiomers", definition: "Mirror-image stereoisomers.", category: "Stereochemistry" },
    { id: "g-19", term: "Chirality", definition: "Handedness of molecules.", category: "Stereochemistry" },
    { id: "g-21", term: "Electronegativity", definition: "Electron attracting power.", category: "Polarity" },
    { id: "g-22", term: "Polar Bond", definition: "Unequal electron sharing.", category: "Polarity" },
];

export const miniQuizzes: MiniQuizData[] = [
    {
        id: "mini-quiz-1",
        afterSection: "organic-compounds",
        questions: [
            { question: "Who synthesized urea?", options: ["Curie", "Wöhler", "Pasteur", "Perkin"], correctIndex: 1, hint: "1828 German chemist" },
            { question: "Carbon valence electrons?", options: ["2", "4", "6", "8"], correctIndex: 1, hint: "Group 14" }
        ]
    },
    {
        id: "mini-quiz-2",
        afterSection: "stereochemistry-intro",
        questions: [
            { question: "Non-superimposable mirror images?", options: ["Isomers", "Enantiomers", "Polymers", "Atoms"], correctIndex: 1, hint: "Handedness" },
            { question: "Drug requiring stereochem testing?", options: ["Aspirin", "Thalidomide", "Tylenol", "Advil"], correctIndex: 1, hint: "1950s tragedy" }
        ]
    },
    {
        id: "mini-quiz-3",
        afterSection: "hybridization",
        questions: [
            { question: "Methane hybridization?", options: ["sp", "sp²", "sp³", "sp⁴"], correctIndex: 2, hint: "4 bonds" },
            { question: "sp³ shape?", options: ["Linear", "Planar", "Tetrahedral", "Bent"], correctIndex: 2, hint: "109.5 degrees" }
        ]
    },
    {
        id: "mini-quiz-4",
        afterSection: "sigma-and-pi-bonds",
        questions: [
            { question: "Double bond composition?", options: ["2 sigma", "2 pi", "1 sigma + 1 pi", "1 sigma + 2 pi"], correctIndex: 2, hint: "One strong, one weak" },
            { question: "Prevents rotation?", options: ["Sigma", "Pi", "Both", "None"], correctIndex: 1, hint: "Sideways overlap" }
        ]
    }
];
