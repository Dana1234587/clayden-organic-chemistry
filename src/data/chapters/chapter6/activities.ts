import { FlashcardData, GlossaryTerm, MiniQuizData } from '../../types';

export const flashcards: FlashcardData[] = [
    {
        front: 'Carbonyl Group',
        back: 'C=O functional group. Carbon is electrophilic (δ⁺), oxygen is nucleophilic (δ⁻). Extremely common in organic chemistry.'
    },
    {
        front: 'Bürgi-Dunitz Angle',
        back: '~107° angle at which nucleophiles approach the carbonyl carbon. Maximizes HOMO-LUMO orbital overlap.'
    },
    {
        front: 'Cyanohydrin',
        back: 'Product of HCN addition to aldehyde/ketone. Has -OH and -CN on same carbon. Reversible reaction, useful intermediate.'
    },
    {
        front: 'NaBH₄',
        back: 'Sodium borohydride - mild reducing agent. Works in water/alcohol. Reduces aldehydes and ketones only.'
    },
    {
        front: 'LiAlH₄',
        back: 'Lithium aluminum hydride - powerful reducing agent. Must use dry ether! Reduces virtually all carbonyl compounds.'
    },
    {
        front: 'Hydride (H⁻)',
        back: 'Nucleophilic hydrogen with two electrons. Delivered by NaBH₄ or LiAlH₄ to carbonyl carbon.'
    },
    {
        front: 'Grignard Reagent',
        back: 'R-MgX. The carbon is nucleophilic (δ⁻). Forms C-C bonds with carbonyls. Must be completely anhydrous!'
    },
    {
        front: 'gem-Diol',
        back: 'Geminal diol - two -OH groups on the same carbon. Formed by water addition to carbonyl.'
    },
    {
        front: 'Hemiacetal',
        back: '-OH and -OR on the same carbon. Formed by alcohol addition to aldehyde. Usually unstable unless cyclic.'
    },
    {
        front: 'Acetal',
        back: 'Two -OR groups on the same carbon (no -OH). Stable to base, cleaved by acid. Found in carbohydrates.'
    },
    {
        front: 'Cyclic Hemiacetal',
        back: 'Stable hemiacetal formed when -OH and C=O are in the same molecule. Glucose exists primarily in this form.'
    },
    {
        front: 'LUMO of Carbonyl',
        back: 'π* antibonding orbital. Has larger coefficient on carbon - this is where nucleophiles attack!'
    },
    {
        front: 'Aldehyde vs Ketone Reactivity',
        back: 'Aldehydes > Ketones. Ketones have more steric hindrance and electron donation from two alkyl groups.'
    },
    {
        front: 'Acid Catalysis (carbonyl)',
        back: 'Protonates oxygen, making carbon MORE electrophilic (more δ⁺). Activates carbonyl for weak nucleophiles.'
    },
    {
        front: 'Base Catalysis (carbonyl)',
        back: 'Creates better nucleophile (e.g., OH⁻ instead of H₂O). Does not activate carbonyl directly.'
    }
];

export const glossary: GlossaryTerm[] = [
    { term: 'Carbonyl', definition: 'C=O functional group; carbon is electrophilic, oxygen nucleophilic' },
    { term: 'Bürgi-Dunitz Angle', definition: '~107° approach angle for nucleophilic attack on carbonyl' },
    { term: 'Cyanohydrin', definition: 'Product with -OH and -CN on same carbon from HCN addition' },
    { term: 'NaBH₄', definition: 'Sodium borohydride - mild, selective reducing agent' },
    { term: 'LiAlH₄', definition: 'Lithium aluminum hydride - powerful reducing agent' },
    { term: 'Hydride', definition: 'H⁻ nucleophile that adds to carbonyl carbon' },
    { term: 'Grignard', definition: 'RMgX - organometallic with nucleophilic carbon' },
    { term: 'Organolithium', definition: 'RLi - more reactive than Grignard' },
    { term: 'gem-Diol', definition: 'Two OH groups on the same (geminal) carbon' },
    { term: 'Hemiacetal', definition: 'OH + OR on same carbon; from alcohol + aldehyde' },
    { term: 'Acetal', definition: 'Two OR groups on same carbon; stable to base' },
    { term: 'Transition State', definition: 'Highest energy structure during bond making/breaking' },
    { term: 'Work-up', definition: 'Treatment after reaction to isolate product (often aqueous)' },
    { term: 'Anhydrous', definition: 'Completely water-free conditions' },
    { term: 'Pro-drug', definition: 'Inactive drug that releases active form in body' },
    { term: 'Ring Strain', definition: 'Extra energy from non-ideal bond angles in cyclic molecules' }
];

export const miniQuizzes: MiniQuizData[] = [
    {
        id: 'ch6-carbonyl-quiz',
        afterSection: 'carbonyl-structure',
        questions: [
            {
                id: 'carb-q1',
                question: 'The carbonyl carbon is __?',
                options: ['Nucleophilic', 'Electrophilic', 'Neutral', 'Radical'],
                correctAnswer: 1,
                explanation: 'Carbonyl carbon is δ⁺ (electrophilic) because oxygen pulls electron density away from it.'
            }
        ]
    },
    {
        id: 'ch6-burgi-quiz',
        afterSection: 'burgi-dunitz',
        questions: [
            {
                id: 'burg-q1',
                question: 'Nucleophiles attack at ~__° to C=O',
                options: ['90', '107', '120', '180'],
                correctAnswer: 1,
                explanation: 'The Bürgi-Dunitz angle is approximately 107° for optimal orbital overlap.'
            }
        ]
    },
    {
        id: 'ch6-hydride-quiz',
        afterSection: 'hydride-reduction',
        questions: [
            {
                id: 'hyd-q1',
                question: 'Which works in water?',
                options: ['LiAlH₄', 'NaBH₄', 'Both', 'Neither'],
                correctAnswer: 1,
                explanation: 'NaBH₄ is safe in water/alcohols. LiAlH₄ reacts violently with water!'
            }
        ]
    },
    {
        id: 'ch6-grignard-quiz',
        afterSection: 'grignard-reaction',
        questions: [
            {
                id: 'grig-q1',
                question: 'Grignard + ketone gives __?',
                options: ['1° alcohol', '2° alcohol', '3° alcohol', 'Aldehyde'],
                correctAnswer: 2,
                explanation: 'Ketones already have 2 carbon groups. Adding one more from Grignard gives 3° alcohol.'
            }
        ]
    },
    {
        id: 'ch6-hemiacetal-quiz',
        afterSection: 'hydration-hemiacetal',
        questions: [
            {
                id: 'hemi-q1',
                question: 'Glucose exists mainly as a?',
                options: ['Open chain', 'Cyclic hemiacetal', 'Acetal', 'gem-diol'],
                correctAnswer: 1,
                explanation: 'Glucose forms a stable 6-membered cyclic hemiacetal in aqueous solution.'
            }
        ]
    }
];
