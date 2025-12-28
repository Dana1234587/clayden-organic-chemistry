import { ChapterQuiz } from '../../types';

export const quiz: ChapterQuiz[] = [
    {
        id: 1,
        question: "In a skeletal drawing, a line end represents which group?",
        options: ["CH", "CH2", "CH3", "C"],
        correctIndex: 2,
        explanation: "A line end is a carbon bonded to 1 other carbon, so it must have 3 hydrogens (CH3) to satisfy carbon's valency of 4.",
        difficulty: "easy"
    },
    {
        id: 2,
        question: "What does a 'wedge' bond indicate?",
        options: ["Atomic vibration", "Bond going into the page", "Bond coming out of the page", "A double bond"],
        correctIndex: 2,
        explanation: "A solid wedge indicates the bond is projecting outwards towards the viewer (3D structure).",
        difficulty: "easy"
    },
    {
        id: 3,
        question: "Which functional group contains a nitrogen atom?",
        options: ["Alcohol", "Ester", "Amine", "Ketone"],
        correctIndex: 2,
        explanation: "Amines are derivatives of ammonia and define the presence of nitrogen (R-NH2, R2NH, etc.).",
        difficulty: "easy"
    },
    {
        id: 4,
        question: "What is the Oxidation Level of a Carboxylic Acid?",
        options: ["Level 1", "Level 2", "Level 3", "Level 4"],
        correctIndex: 2,
        explanation: "The carboxyl carbon has a double bond to one oxygen (2 bonds) and a single bond to an -OH (1 bond). Total = 3 bonds to heteroatoms.",
        difficulty: "medium"
    },
    {
        id: 5,
        question: "Why do we draw carbon chains in a zig-zag pattern?",
        options: ["It looks cooler", "To save space", "To represent the 109.5° tetrahedral bond angles", "Because double bonds are bent"],
        correctIndex: 2,
        explanation: "The zig-zag represents the actual geometry of sp3 hybridized carbon atoms which have bond angles of approx 109.5°.",
        difficulty: "medium"
    },
    {
        id: 6,
        question: "Which molecule has the SAME Oxidation Level as Acetaldehyde (Level 2)?",
        options: ["Ethanol (Alcohol)", "Acetic Acid (Carboxlic Acid)", "Dichloromethane (CH2Cl2)", "Methane (CH4)"],
        correctIndex: 2,
        explanation: "Acetaldehyde is Level 2 (2 bonds to O). Dichloromethane has 2 bonds to Cl (a heteroatom), so it is also Level 2. Ethanol is Level 1, Methane is Level 0.",
        difficulty: "hard"
    },
    {
        id: 7,
        question: "A reaction transforms an Alcohol (Level 1) into a Ketone (Level 2). What type of reaction is this?",
        options: ["Reduction", "Substitution", "Oxidation", "Elimination"],
        correctIndex: 2,
        explanation: "Increasing the number of bonds to a heteroatom (from 1 in alcohol to 2 in ketone) is defined as Oxidation.",
        difficulty: "hard"
    }
];
