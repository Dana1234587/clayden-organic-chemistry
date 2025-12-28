import { FlashcardData, GlossaryTerm, MiniQuizData } from '../../types';

export const flashcards: FlashcardData[] = [
    { id: "fc2-1", front: "What is a 'skeletal structure'?", back: "A drawing style where carbon atoms are corners/ends of lines and H's on C are omitted.", category: "Drawing" },
    { id: "fc2-2", front: "Why do we draw carbon chains as zig-zags?", back: "To represent the actual tetrahedral bond angles (~109.5°) of sp³ carbons.", category: "Drawing" },
    { id: "fc2-3", front: "What does a solid wedge bond represent?", back: "A bond coming OUT of the page towards you.", category: "3D Structure" },
    { id: "fc2-4", front: "What does a dashed bond represent?", back: "A bond going INTO the page away from you.", category: "3D Structure" },
    { id: "fc2-5", front: "What is a functional group?", back: "The reactive part of a molecule (like -OH or C=O) that determines its chemistry.", category: "Functional Groups" },
    { id: "fc2-6", front: "What is the abbreviation 'Ph' stand for?", back: "Phenyl group (a benzene ring substituent).", category: "Abbreviations" },
    { id: "fc2-7", front: "What defines an Oxidation Level 1 carbon?", back: "A carbon bonded to ONE heteroatom (like in alcohols or amines).", category: "Oxidation Levels" },
    { id: "fc2-8", front: "What is the difference between an Aldehyde and a Ketone?", back: "Aldehyde: C=O at END of chain (R-CHO). Ketone: C=O in MIDDLE of chain (R-CO-R).", category: "Functional Groups" },
    { id: "fc2-9", front: "What is R?", back: "A generic placeholder for any alkyl group or carbon chain.", category: "Abbreviations" },
    { id: "fc2-10", front: "What is a nitrile group?", back: "A carbon triple-bonded to nitrogen (-C≡N).", category: "Functional Groups" },
    { id: "fc2-11", front: "What is a Nitro group?", back: "A nitrogen bonded to two oxygens (-NO₂).", category: "Functional Groups" },
    { id: "fc2-12", front: "What are THF, DMF, and DMSO?", back: "Common organic solvents (Tetrahydrofuran, Dimethylformamide, Dimethyl Sulfoxide).", category: "Abbreviations" }
];

export const glossary: GlossaryTerm[] = [
    { id: "g2-1", term: "Skeletal Structure", definition: "A simplified way of drawing organic molecules where carbons are vertices/ends and C-bound hydrogens are implied.", category: "Drawing" },
    { id: "g2-2", term: "Heteroatom", definition: "Any atom that is NOT carbon or hydrogen (e.g., N, O, S, Cl).", category: "General" },
    { id: "g2-3", term: "Functional Group", definition: "A specific atom or group of atoms that determines the chemical reactivity of a molecule.", category: "Functional Groups" },
    { id: "g2-4", term: "Alkane", definition: "A saturated hydrocarbon containing only single bonds (Level 0 oxidation).", category: "Classes" },
    { id: "g2-5", term: "Alkene", definition: "A hydrocarbon containing at least one carbon-carbon double bond.", category: "Classes" },
    { id: "g2-6", term: "Alkyne", definition: "A hydrocarbon containing at least one carbon-carbon triple bond.", category: "Classes" },
    { id: "g2-7", term: "Wedge Bond", definition: "A bond drawn as a solid triangle, indicating it points towards the viewer (out of plane).", category: "3D Structure" },
    { id: "g2-8", term: "Dash Bond", definition: "A bond drawn as a series of dashes, indicating it points away from the viewer (into plane).", category: "3D Structure" },
    { id: "g2-9", term: "Oxidation Level", definition: "A classification based on the number of bonds a carbon atom has to heteroatoms (0, 1, 2, 3, or 4).", category: "General" },
    { id: "g2-10", term: "Aryl Group (Ar)", definition: "Any functional group or substituent derived from an aromatic ring (like phenyl).", category: "General" },
    { id: "g2-11", term: "Nitro Group", definition: "The -NO₂ group.", category: "Functional Groups" },
    { id: "g2-12", term: "Acyl Chloride", definition: "A derivative of a carboxylic acid where the -OH is replaced by -Cl (R-COCl).", category: "Functional Groups" }
];

export const miniQuizzes: MiniQuizData[] = [
    {
        id: "mq2-1",
        afterSection: "drawing-organic-structures",
        questions: [
            {
                question: "In a skeletal structure, what does a vertex (corner) represent?",
                options: ["A hydrogen atom", "A functional group", "A carbon atom with attached hydrogens", "An ionic bond"],
                correctIndex: 2,
                hint: "We omit C and H on C, so a corner is a CH2 usually."
            },
            {
                question: "Which hydrogens MUST be drawn in a skeletal structure?",
                options: ["Hydrogens on terminal carbons", "Hydrogens on heteroatoms (O, N, etc.)", "No hydrogens ever", "All hydrogens"],
                correctIndex: 1,
                hint: "We can only omit H's on Carbon."
            }
        ]
    },
    {
        id: "mq2-2",
        afterSection: "oxidation-levels",
        questions: [
            {
                question: "Which of these is an Oxidation Level 2 compound?",
                options: ["Ethanol (Alcohol)", "Ethane (Alkane)", "Acetone (Ketone)", "Acetic Acid (Carboxylic Acid)"],
                correctIndex: 2,
                hint: "Count the bonds to oxygen. A C=O double bond counts as 2."
            }
        ]
    }
];
