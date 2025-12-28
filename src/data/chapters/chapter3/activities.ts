import { FlashcardData, GlossaryTerm, MiniQuizData } from '../../types';

export const flashcards: FlashcardData[] = [
    { id: 'fc3-1', front: 'What does MS measure?', back: 'Mass-to-charge ratio (m/z)', category: 'Mass Spectrometry' },
    { id: 'fc3-2', front: 'M⁺ peak in MS?', back: 'Molecular ion - intact molecule with one electron removed', category: 'Mass Spectrometry' },
    { id: 'fc3-3', front: 'Base peak in MS?', back: 'Tallest peak (100%) - most stable fragment', category: 'Mass Spectrometry' },
    { id: 'fc3-4', front: 'Cl isotope pattern?', back: '3:1 ratio (M:M+2) due to ³⁵Cl/³⁷Cl', category: 'Mass Spectrometry' },
    { id: 'fc3-5', front: 'Br isotope pattern?', back: '1:1 ratio (M:M+2) due to ⁷⁹Br/⁸¹Br', category: 'Mass Spectrometry' },
    { id: 'fc3-6', front: 'Nitrogen Rule?', back: 'Odd MW = Odd number of nitrogen atoms', category: 'Mass Spectrometry' },
    { id: 'fc3-7', front: 'TMS in NMR?', back: 'Tetramethylsilane - reference at 0 ppm', category: 'NMR' },
    { id: 'fc3-8', front: 'Shielding effect?', back: 'High electron density → upfield shift (toward 0)', category: 'NMR' },
    { id: 'fc3-9', front: 'Carbonyl ¹³C shift?', back: '150-220 ppm (highly deshielded)', category: 'NMR' },
    { id: 'fc3-10', front: 'C=O in IR?', back: '~1700 cm⁻¹ - strongest, most diagnostic peak', category: 'IR' },
    { id: 'fc3-11', front: 'Broad O-H in IR?', back: 'Indicates hydrogen bonding', category: 'IR' },
    { id: 'fc3-12', front: 'DBE formula?', back: 'C + 1 - H/2 + N/2', category: 'Problem Solving' },
];

export const glossary: GlossaryTerm[] = [
    { id: 'g3-1', term: 'Mass-to-charge ratio (m/z)', definition: 'What mass spectrometry measures - for singly charged ions, equals the mass', category: 'Mass Spectrometry' },
    { id: 'g3-2', term: 'Molecular ion (M⁺)', definition: 'Intact molecule with one electron removed', category: 'Mass Spectrometry' },
    { id: 'g3-3', term: 'Chemical shift (δ)', definition: 'Position of NMR signal in ppm relative to TMS', category: 'NMR' },
    { id: 'g3-4', term: 'Shielding', definition: 'When electrons protect nucleus from magnetic field, causing upfield shift', category: 'NMR' },
    { id: 'g3-5', term: 'Wavenumber (cm⁻¹)', definition: 'Unit for IR spectroscopy - higher = higher energy', category: 'IR' },
    { id: 'g3-6', term: 'Fingerprint region', definition: 'Complex region below 1500 cm⁻¹ unique to each molecule', category: 'IR' },
    { id: 'g3-7', term: 'DBE', definition: 'Double Bond Equivalent - counts rings + double bonds', category: 'Problem Solving' },
];

export const miniQuizzes: MiniQuizData[] = [
    {
        id: 'mq3-1',
        afterSection: 'ms-isotopes',
        questions: [
            {
                question: 'You see M:M+2 = 1:1. Which halogen?',
                options: ['Chlorine', 'Bromine', 'Fluorine'],
                correctIndex: 1,
                hint: 'Equal peaks = 50:50 isotope ratio'
            }
        ]
    },
    {
        id: 'mq3-2',
        afterSection: 'nmr-symmetry',
        questions: [
            {
                question: 'Propane (C₃H₈) shows how many ¹³C signals?',
                options: ['1', '2', '3'],
                correctIndex: 1,
                hint: 'Two ends are equivalent'
            }
        ]
    },
    {
        id: 'mq3-3',
        afterSection: 'dbe-calculation',
        questions: [
            {
                question: 'Calculate DBE for C₄H₈O:',
                options: ['0', '1', '2'],
                correctIndex: 1,
                hint: 'DBE = 4 + 1 - 8/2 = 1'
            }
        ]
    }
];
