import { QuizQuestion } from '../../types';

export const quiz: QuizQuestion[] = [
    // Carbonyl Structure
    {
        id: 'ch6-q1',
        question: 'Why is the carbonyl carbon electrophilic?',
        options: [
            'Carbon has empty orbitals',
            'Oxygen is more electronegative, creating δ⁺ on carbon',
            'Carbon has a full positive charge',
            'The π bond donates electrons'
        ],
        correctIndex: 1,
        explanation: 'Oxygen is more electronegative (3.5 vs 2.5) than carbon, so it pulls electron density toward itself, leaving carbon with partial positive charge (δ⁺).'
    },
    {
        id: 'ch6-q2',
        question: 'What is the hybridization of carbonyl carbon before nucleophilic attack?',
        options: ['sp', 'sp²', 'sp³', 'sp³d'],
        correctIndex: 1,
        explanation: 'The carbonyl carbon is sp² hybridized with trigonal planar geometry (120° angles) before the attack.'
    },
    {
        id: 'ch6-q3',
        question: 'After nucleophilic attack, the carbonyl carbon becomes:',
        options: ['sp hybridized and linear', 'sp² and trigonal', 'sp³ and tetrahedral', 'sp³d and octahedral'],
        correctIndex: 2,
        explanation: 'The nucleophile adds to the carbon, which gains a fourth substituent and becomes sp³ with tetrahedral geometry (109.5°).'
    },
    // Bürgi-Dunitz
    {
        id: 'ch6-q4',
        question: 'The Bürgi-Dunitz angle describes:',
        options: [
            'The C=O bond angle',
            'The trajectory of nucleophilic attack (~107°)',
            'The H-C-H angle in products',
            'The angle between orbitals'
        ],
        correctIndex: 1,
        explanation: 'Bürgi and Dunitz discovered that nucleophiles approach at ~107° to the C=O bond, not perpendicular (90°).'
    },
    {
        id: 'ch6-q5',
        question: 'Why do nucleophiles attack at the Bürgi-Dunitz angle?',
        options: [
            'It\'s the path of least steric hindrance only',
            'It maximizes HOMO-LUMO orbital overlap',
            'It minimizes the distance traveled',
            'It produces the fastest reaction'
        ],
        correctIndex: 1,
        explanation: 'The ~107° angle maximizes overlap between the nucleophile HOMO and the carbonyl π* LUMO, which has its larger lobe on carbon.'
    },
    // Cyanohydrin
    {
        id: 'ch6-q6',
        question: 'What is the product of adding HCN to an aldehyde?',
        options: ['Alcohol', 'Cyanohydrin', 'Acetal', 'Hemiacetal'],
        correctIndex: 1,
        explanation: 'Adding HCN gives a cyanohydrin, which has both -OH and -CN groups on the same carbon.'
    },
    {
        id: 'ch6-q7',
        question: 'Cyanohydrin formation is:',
        options: ['Irreversible', 'Reversible', 'Endothermic only', 'Only acid-catalyzed'],
        correctIndex: 1,
        explanation: 'Cyanohydrin formation is an equilibrium reaction. The position depends on the carbonyl (aldehydes favor product more than ketones).'
    },
    {
        id: 'ch6-q8',
        question: 'The -CN group in a cyanohydrin can be converted to:',
        options: [
            'Only hydroxyl groups',
            'Carboxylic acids or amines',
            'Nothing useful',
            'Halogens only'
        ],
        correctIndex: 1,
        explanation: 'The -CN group is versatile: hydrolysis gives carboxylic acids, reduction gives amines. This makes cyanohydrins valuable synthetic intermediates.'
    },
    // Hydride Reduction
    {
        id: 'ch6-q9',
        question: 'Which reducing agent can be used in water?',
        options: ['LiAlH₄', 'NaBH₄', 'Both', 'Neither'],
        correctIndex: 1,
        explanation: 'NaBH₄ is mild and can be used in water or alcohols. LiAlH₄ reacts violently with water and must be used in dry ether.'
    },
    {
        id: 'ch6-q10',
        question: 'LiAlH₄ reduces all of the following EXCEPT:',
        options: ['Aldehydes', 'Ketones', 'Esters', 'Alkenes'],
        correctIndex: 3,
        explanation: 'LiAlH₄ reduces most carbonyl compounds (aldehydes, ketones, esters, carboxylic acids, amides) but does NOT reduce simple alkenes.'
    },
    {
        id: 'ch6-q11',
        question: 'Reduction of a ketone with NaBH₄ gives:',
        options: ['Primary alcohol', 'Secondary alcohol', 'Tertiary alcohol', 'Aldehyde'],
        correctIndex: 1,
        explanation: 'Ketones (R₂C=O) are reduced to secondary alcohols (R₂CH-OH). The carbonyl carbon gains one H.'
    },
    {
        id: 'ch6-q12',
        question: 'In hydride reduction, the hydride (H⁻) acts as:',
        options: ['Electrophile', 'Nucleophile', 'Leaving group', 'Catalyst'],
        correctIndex: 1,
        explanation: 'Hydride is a nucleophile – it donates its electrons to the electrophilic carbonyl carbon.'
    },
    // Grignard
    {
        id: 'ch6-q13',
        question: 'In a Grignard reagent (RMgBr), the carbon attached to Mg is:',
        options: ['Electrophilic (δ⁺)', 'Nucleophilic (δ⁻)', 'Neutral', 'A leaving group'],
        correctIndex: 1,
        explanation: 'The C-Mg bond is polarized with δ⁻ on carbon, making it nucleophilic. This is why Grignards attack electrophiles.'
    },
    {
        id: 'ch6-q14',
        question: 'Grignard reactions MUST be performed:',
        options: [
            'In water',
            'In dry ether (anhydrous conditions)',
            'At high temperature',
            'With acid catalyst'
        ],
        correctIndex: 1,
        explanation: 'Water destroys Grignard reagents (RMgBr + H₂O → R-H + Mg(OH)Br). Completely dry conditions are essential.'
    },
    {
        id: 'ch6-q15',
        question: 'CH₃MgBr + CH₃CHO → ?',
        options: [
            'Primary alcohol',
            'Secondary alcohol',
            'Tertiary alcohol',
            'Ketone'
        ],
        correctIndex: 1,
        explanation: 'A Grignard (CH₃⁻) attacking an aldehyde (CH₃CHO) gives a secondary alcohol: CH₃CH(OH)CH₃ (2-propanol).'
    },
    {
        id: 'ch6-q16',
        question: 'To make a tertiary alcohol using Grignard, you should react RMgBr with:',
        options: ['Aldehyde', 'Ketone', 'Formaldehyde', 'CO₂'],
        correctIndex: 1,
        explanation: 'Ketones (R₂C=O) + Grignard gives tertiary alcohols (R₃C-OH, three carbon substituents).'
    },
    // Hydration/Hemiacetal
    {
        id: 'ch6-q17',
        question: 'A gem-diol is:',
        options: [
            'A molecule with two OH groups on adjacent carbons',
            'A molecule with two OH groups on the same carbon',
            'A cyclic ether',
            'An aromatic alcohol'
        ],
        correctIndex: 1,
        explanation: 'Gem-diols have two -OH groups on the same carbon ("geminal"). They form when water adds to carbonyls.'
    },
    {
        id: 'ch6-q18',
        question: 'In acid-catalyzed carbonyl hydration, the acid:',
        options: [
            'Acts as nucleophile',
            'Makes carbonyl carbon MORE electrophilic',
            'Reduces the carbonyl',
            'Blocks the reaction'
        ],
        correctIndex: 1,
        explanation: 'Protonation of carbonyl oxygen makes the carbon MORE electrophilic (more δ⁺), activating it for water attack.'
    },
    {
        id: 'ch6-q19',
        question: 'A hemiacetal contains:',
        options: [
            '-OH and -OR on the same carbon',
            'Two -OR groups on the same carbon',
            'Only an alcohol group',
            'A carboxylic acid'
        ],
        correctIndex: 0,
        explanation: 'Hemiacetals have both -OH and -OR on the same carbon. Acetals have two -OR groups (no -OH).'
    },
    {
        id: 'ch6-q20',
        question: 'Glucose exists primarily as a:',
        options: [
            'Open-chain aldehyde',
            'Cyclic hemiacetal',
            'Cyclic acetal',
            'gem-diol'
        ],
        correctIndex: 1,
        explanation: 'In aqueous solution, glucose forms a stable 6-membered cyclic hemiacetal (pyranose form). The open chain form is less than 1%.'
    },
    // Reactivity
    {
        id: 'ch6-q21',
        question: 'Aldehydes are more reactive than ketones because:',
        options: [
            'Aldehydes are larger molecules',
            'Ketones have more steric hindrance and electron donation',
            'Aldehydes have stronger C=O bonds',
            'Ketones are more polar'
        ],
        correctIndex: 1,
        explanation: 'Ketones have two alkyl groups that both block nucleophilic approach (steric) and donate electrons (reducing δ⁺ on carbon).'
    },
    {
        id: 'ch6-q22',
        question: 'Formaldehyde is the most reactive aldehyde because:',
        options: [
            'It has no alkyl groups blocking the carbonyl',
            'It has the strongest C=O bond',
            'It is the largest aldehyde',
            'It has the most resonance'
        ],
        correctIndex: 0,
        explanation: 'Formaldehyde (H₂C=O) has no alkyl groups, so there is no steric hindrance and no electron donation to reduce electrophilicity.'
    },
    {
        id: 'ch6-q23',
        question: 'Cyclopropanone is very reactive because:',
        options: [
            'It has many substituents',
            'Ring strain is relieved upon sp³ formation',
            'The carbonyl is not polarized',
            'It cannot form tetrahedral products'
        ],
        correctIndex: 1,
        explanation: 'The sp² angles (120°) are strained in a 3-membered ring (60°). Converting to sp³ (109.5°) partially relieves this strain, driving reactivity.'
    },
    // Applications
    {
        id: 'ch6-q24',
        question: 'Bisulfite addition to aldehydes creates:',
        options: [
            'Water-insoluble precipitates',
            'Water-soluble addition products',
            'Acetals',
            'Cyanohydrins'
        ],
        correctIndex: 1,
        explanation: 'Bisulfite adds to aldehydes to give soluble sulfonate salts. This is used to make water-soluble pro-drugs.'
    },
    {
        id: 'ch6-q25',
        question: 'What percentage of FDA-approved drugs involve carbonyl chemistry?',
        options: ['About 25%', 'About 50%', 'About 75%', 'About 90%'],
        correctIndex: 2,
        explanation: 'Approximately 75% of FDA-approved drugs either contain carbonyl groups or are synthesized using carbonyl reactions.'
    }
];
