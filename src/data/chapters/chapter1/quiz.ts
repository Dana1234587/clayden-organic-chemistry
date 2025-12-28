import { ChapterQuiz } from '../../types';

export const quiz: ChapterQuiz[] = [
    {
        id: 1,
        question: "What element is the basis of all organic compounds?",
        options: ["Oxygen", "Nitrogen", "Carbon", "Hydrogen"],
        correctIndex: 2,
        explanation: "Carbon is the defining element of organic chemistry. Its ability to form four stable bonds and bond with itself allows for incredible molecular diversity.",
        difficulty: "easy"
    },
    {
        id: 2,
        question: "Who synthesized urea and disproved the 'vital force' theory?",
        options: ["Marie Curie", "Friedrich Wöhler", "Louis Pasteur", "William Perkin"],
        correctIndex: 1,
        explanation: "Friedrich Wöhler synthesized urea from inorganic materials in 1828, proving that organic compounds don't require a 'vital force'.",
        difficulty: "easy"
    },
    {
        id: 3,
        question: "Who discovered the first synthetic dye, Mauveine?",
        options: ["Friedrich Wöhler", "William Perkin", "August Kekulé", "Louis Pasteur"],
        correctIndex: 1,
        explanation: "William Perkin accidentally discovered Mauveine in 1856 while trying to synthesize quinine. He was only 18 years old!",
        difficulty: "easy"
    },
    {
        id: 4,
        question: "What are mirror-image molecules that cannot be superimposed called?",
        options: ["Isomers", "Enantiomers", "Conformers", "Resonance structures"],
        correctIndex: 1,
        explanation: "Enantiomers are non-superimposable mirror images, like left and right hands. They often have different biological effects.",
        difficulty: "medium"
    },
    {
        id: 5,
        question: "(R)-limonene smells like oranges. What does (S)-limonene smell like?",
        options: ["Oranges", "Lemons", "Mint", "Vanilla"],
        correctIndex: 1,
        explanation: "These enantiomers have the same formula but different 3D arrangements, causing completely different smells—oranges vs lemons!",
        difficulty: "medium"
    },
    {
        id: 6,
        question: "Which drug tragedy led to stricter testing of enantiomers?",
        options: ["Aspirin", "Thalidomide", "Penicillin", "Valium"],
        correctIndex: 1,
        explanation: "Thalidomide caused birth defects because one enantiomer was harmful. This led to requirements to test both enantiomers of chiral drugs.",
        difficulty: "medium"
    },
    {
        id: 7,
        question: "What is the hybridization of carbon in ethene (C₂H₄)?",
        options: ["sp", "sp²", "sp³", "unhybridized"],
        correctIndex: 1,
        explanation: "In ethene, each carbon has 3 groups (2 H + 1 C via double bond), so hybridization is sp² with 120° bond angles.",
        difficulty: "medium"
    },
    {
        id: 8,
        question: "What is the bond angle in a tetrahedral (sp³) carbon?",
        options: ["90°", "109.5°", "120°", "180°"],
        correctIndex: 1,
        explanation: "sp³ hybridization creates a tetrahedral geometry with bond angles of 109.5°. This is the shape of methane.",
        difficulty: "medium"
    },
    {
        id: 9,
        question: "A triple bond consists of:",
        options: ["1σ + 1π", "2σ + 1π", "1σ + 2π", "3σ bonds"],
        correctIndex: 2,
        explanation: "A triple bond consists of 1 sigma bond (head-on overlap) and 2 pi bonds (sideways overlap).",
        difficulty: "medium"
    },
    {
        id: 10,
        question: "Which molecule is NONPOLAR despite having polar bonds?",
        options: ["H₂O", "NH₃", "CO₂", "HCl"],
        correctIndex: 2,
        explanation: "CO₂ is linear, so the two polar C=O bonds point in opposite directions and cancel out, making the molecule nonpolar.",
        difficulty: "medium"
    },
    {
        id: 11,
        question: "What molecule in your eye changes shape when light hits it?",
        options: ["Serotonin", "Retinal", "Melanin", "Rhodopsin"],
        correctIndex: 1,
        explanation: "11-cis-retinal absorbs light and isomerizes to all-trans-retinal, triggering the nerve signal that creates vision.",
        difficulty: "medium"
    },
    {
        id: 12,
        question: "Which compound gives natural gas its smell (for safety)?",
        options: ["Methane", "Ethane", "Butyl thiol", "Propane"],
        correctIndex: 2,
        explanation: "Natural gas is odorless! Gas companies add thiols (like tert-butyl thiol) so you can smell dangerous leaks.",
        difficulty: "medium"
    },
    {
        id: 13,
        question: "What percentage of pharmaceutical drugs contain fluorine?",
        options: ["About 5%", "About 20%", "About 50%", "About 80%"],
        correctIndex: 1,
        explanation: "About 20% of pharmaceuticals contain fluorine atoms, which can improve drug stability and metabolic properties.",
        difficulty: "hard"
    },
    {
        id: 14,
        question: "The 2010 Nobel Prize in Chemistry was for:",
        options: ["DNA sequencing", "Palladium-catalyzed cross-coupling", "Green fluorescent protein", "Ribosome structure"],
        correctIndex: 1,
        explanation: "The 2010 Nobel Prize went to Heck, Negishi, and Suzuki for palladium-catalyzed cross-coupling reactions, powerful tools for making carbon-carbon bonds.",
        difficulty: "hard"
    },
    {
        id: 15,
        question: "Approximately how much does it cost to bring a new drug to market?",
        options: ["$100 million", "$500 million", "$2.6 billion", "$10 billion"],
        correctIndex: 2,
        explanation: "Drug development takes about 12 years and costs approximately $2.6 billion on average, covering discovery, trials, and approval.",
        difficulty: "hard"
    },
    {
        id: 16,
        question: "Which amino acids in proteins are 'left-handed' (L-configuration)?",
        options: ["None of them", "Half of them", "Most of them", "All of them"],
        correctIndex: 3,
        explanation: "All amino acids in proteins are L-configuration. Life chose this handedness billions of years ago!",
        difficulty: "hard"
    },
    {
        id: 17,
        question: "What natural compound from tree bark was the first malaria treatment?",
        options: ["Aspirin", "Quinine", "Morphine", "Digitalis"],
        correctIndex: 1,
        explanation: "Quinine, extracted from cinchona tree bark, was the first effective malaria treatment and is still used today.",
        difficulty: "easy"
    },
    {
        id: 18,
        question: "Why is synthetic vanillin more common than natural vanilla extract?",
        options: ["It tastes better", "It's 50 times cheaper", "It's healthier", "It's more aromatic"],
        correctIndex: 1,
        explanation: "Synthetic vanillin is chemically identical but 50 times cheaper and more sustainable than natural vanilla.",
        difficulty: "easy"
    },
    {
        id: 19,
        question: "What is the main surfactant (foam-maker) in most shower gels?",
        options: ["Citric acid", "Sodium laureth sulfate", "Vanilla extract", "Sodium chloride"],
        correctIndex: 1,
        explanation: "Sodium laureth sulfate (SLS) is the surfactant that creates foam in shower gels and shampoos.",
        difficulty: "medium"
    },
    {
        id: 20,
        question: "What organic chemistry activity involves building complex molecules step-by-step?",
        options: ["Analysis", "Mechanism", "Synthesis", "Spectroscopy"],
        correctIndex: 2,
        explanation: "Synthesis is the art of building molecules. Organic chemists design routes to construct complex structures from simpler starting materials.",
        difficulty: "easy"
    },
    {
        id: 21,
        question: "Which drug was once the best-selling pharmaceutical in history ($12 billion/year)?",
        options: ["Aspirin", "Penicillin", "Lipitor (atorvastatin)", "Ibuprofen"],
        correctIndex: 2,
        explanation: "Lipitor (atorvastatin) for lowering cholesterol was the best-selling drug ever, reaching $12 billion in annual sales at its peak.",
        difficulty: "medium"
    },
    {
        id: 22,
        question: "What makes organic molecules colored?",
        options: ["Heavy atoms", "Conjugated double bond systems", "The presence of oxygen", "High molecular weight"],
        correctIndex: 1,
        explanation: "Extended systems of alternating single and double bonds (conjugation) allow electrons to absorb visible light, creating color.",
        difficulty: "medium"
    },
    {
        id: 23,
        question: "What is the bitterest substance known to humans?",
        options: ["Caffeine", "Quinine", "Denatonium (Bitrex)", "Thioacetone"],
        correctIndex: 2,
        explanation: "Denatonium benzoate (Bitrex) is so bitter that 10 parts per million make water undrinkable. It's added to household products to prevent accidental poisoning.",
        difficulty: "medium"
    },
    {
        id: 24,
        question: "What's the difference between bulk and fine chemicals?",
        options: ["Bulk are solid, fine are liquid", "Bulk are cheap and simple, fine are expensive and complex", "Bulk are natural, fine are synthetic", "No difference"],
        correctIndex: 1,
        explanation: "Bulk chemicals (like ethylene) are simple, cheap, produced in millions of tons. Fine chemicals (like drugs) are complex, expensive, produced in small quantities.",
        difficulty: "medium"
    },
    {
        id: 25,
        question: "Azulene is unusual because it is:",
        options: ["The sweetest compound", "A blue organic liquid", "The largest molecule known", "Completely odorless"],
        correctIndex: 1,
        explanation: "Azulene is a rare deep blue organic liquid. Its unusual non-alternating ring structure absorbs light differently from most organic compounds.",
        difficulty: "hard"
    },
    {
        id: 26,
        question: "Omeprazole (Losec/Prilosec) treats stomach ulcers by:",
        options: ["Killing bacteria", "Blocking proton pumps", "Neutralizing acid", "Coating the stomach"],
        correctIndex: 1,
        explanation: "Omeprazole is a proton pump inhibitor (PPI) that reduces stomach acid production by blocking the enzyme that pumps acid into the stomach.",
        difficulty: "hard"
    }
];
