/**
 * Chapter 1: What is Organic Chemistry?
 * Molecule data for visualization
 * 
 * Contains molecules referenced in Chapter 1 content:
 * - Serotonin, Caffeine (Organic Chemistry and You)
 * - Methane, Ethanol (Organic Compounds)
 * - Azulene, Benzene (Colors of Organic Chemistry)
 * - Limonene, Muscone, Civetone, Frontalin, Thioacetone (Smell & Pheromones)
 * - Aspirin, Quinine, Penicillin G, Taxol, Atorvastatin, Omeprazole (Medicine)
 * - Vanillin, Menthol, Damascenone, Retinal (Perfumery & Vision)
 */

import { MoleculeRegistry } from '../../moleculeTypes';

export const chapter1Molecules: MoleculeRegistry = {
    // ========================================
    // Section: Organic Chemistry and You
    // ========================================
    'serotonin': {
        color: '#8b5cf6',
        emoji: '😊',
        formula: 'C₁₀H₁₂N₂O',
        skeletal: 'Indole ring with ethylamine side chain',
        functionalGroups: ['Amine (-NH₂)', 'Hydroxyl (-OH)', 'Aromatic ring'],
        pubchemCid: 5202,
        pdb: `COMPND    SEROTONIN
ATOM      1  N1  SER     1       0.000   0.000   0.000  1.00  0.00           N
ATOM      2  C2  SER     1       1.300   0.000   0.000  1.00  0.00           C
ATOM      3  C3  SER     1       2.000   1.200   0.000  1.00  0.00           C
ATOM      4  C4  SER     1       1.300   2.400   0.000  1.00  0.00           C
ATOM      5  C5  SER     1       0.000   2.400   0.000  1.00  0.00           C
ATOM      6  C6  SER     1      -0.700   1.200   0.000  1.00  0.00           C
ATOM      7  C7  SER     1       3.500   1.200   0.000  1.00  0.00           C
ATOM      8  C8  SER     1       4.200   2.400   0.000  1.00  0.00           C
ATOM      9  N2  SER     1       3.500   3.600   0.000  1.00  0.00           N
ATOM     10  C9  SER     1       2.100   3.600   0.000  1.00  0.00           C
ATOM     11  O1  SER     1       5.600   2.400   0.000  1.00  0.00           O
ATOM     12  C10 SER     1       6.300   3.700   0.000  1.00  0.00           C
ATOM     13  N2  SER     1       7.600   4.300   0.000  1.00  0.00           N
END`
    },
    'caffeine': {
        color: '#f59e0b',
        emoji: '☕',
        formula: 'C₈H₁₀N₄O₂',
        skeletal: 'Fused purine ring system (imidazole + pyrimidine)',
        functionalGroups: ['Carbonyl (C=O)', 'Methyl groups (-CH₃)', 'Heterocyclic N'],
        pubchemCid: 2519,
        pdb: `COMPND    CAFFEINE
ATOM      1  N1  CAF     1       0.000   0.000   0.000  1.00  0.00           N
ATOM      2  C2  CAF     1       1.300   0.000   0.000  1.00  0.00           C
ATOM      3  N3  CAF     1       2.000   1.200   0.000  1.00  0.00           N
ATOM      4  C4  CAF     1       1.300   2.400   0.000  1.00  0.00           C
ATOM      5  C5  CAF     1       0.000   2.400   0.000  1.00  0.00           C
ATOM      6  C6  CAF     1      -0.700   1.200   0.000  1.00  0.00           C
ATOM      7  N7  CAF     1       2.000   3.600   0.000  1.00  0.00           N
ATOM      8  C8  CAF     1       1.300   4.800   0.000  1.00  0.00           C
ATOM      9  N9  CAF     1       0.000   4.800   0.000  1.00  0.00           N
ATOM     10  O1  CAF     1      -2.100   1.200   0.000  1.00  0.00           O
ATOM     11  O2  CAF     1       2.000   6.000   0.000  1.00  0.00           O
ATOM     12  C10 CAF     1      -0.700  -1.200   0.000  1.00  0.00           C
ATOM     13  C11 CAF     1       3.500   3.600   0.000  1.00  0.00           C
ATOM     14  C12 CAF     1      -0.700   6.000   0.000  1.00  0.00           C
END`
    },

    // ========================================
    // Section: Organic Compounds
    // ========================================
    'methane': {
        color: '#6366f1',
        emoji: '⚛️',
        formula: 'CH₄',
        skeletal: 'Single carbon atom with four hydrogen atoms (tetrahedral)',
        functionalGroups: ['None - simplest hydrocarbon'],
        pubchemCid: 297,
        pdb: `COMPND    METHANE
ATOM      1  C   CH4     1       0.000   0.000   0.000  1.00  0.00           C
ATOM      2  H1  CH4     1       0.629   0.629   0.629  1.00  0.00           H
ATOM      3  H2  CH4     1      -0.629  -0.629   0.629  1.00  0.00           H
ATOM      4  H3  CH4     1       0.629  -0.629  -0.629  1.00  0.00           H
ATOM      5  H4  CH4     1      -0.629   0.629  -0.629  1.00  0.00           H
END`
    },
    'ethanol': {
        color: '#3b82f6',
        emoji: '🧪',
        formula: 'C₂H₆O',
        skeletal: 'Two-carbon chain with terminal hydroxyl group',
        functionalGroups: ['Hydroxyl (-OH)', 'Methyl (-CH₃)'],
        pubchemCid: 702,
        pdb: `COMPND    ETHANOL
ATOM      1  C1  ETH     1       0.000   0.000   0.000  1.00  0.00           C
ATOM      2  C2  ETH     1       1.500   0.000   0.000  1.00  0.00           C
ATOM      3  O1  ETH     1       2.100   1.300   0.000  1.00  0.00           O
ATOM      4  H1  ETH     1      -0.400  -1.000   0.000  1.00  0.00           H
ATOM      5  H2  ETH     1      -0.400   0.500   0.900  1.00  0.00           H
ATOM      6  H3  ETH     1      -0.400   0.500  -0.900  1.00  0.00           H
ATOM      7  H4  ETH     1       1.900  -0.500   0.900  1.00  0.00           H
ATOM      8  H5  ETH     1       1.900  -0.500  -0.900  1.00  0.00           H
ATOM      9  H6  ETH     1       3.100   1.200   0.000  1.00  0.00           H
END`
    },

    // ========================================
    // Section: Colors of Organic Chemistry
    // ========================================
    'azulene': {
        color: '#3b82f6',
        emoji: '💎',
        formula: 'C₁₀H₈',
        skeletal: 'Fused 5,7-ring aromatic system. Non-alternant hydrocarbon.',
        functionalGroups: ['Non-benzenoid aromatic', 'Fused rings'],
        pubchemCid: 9231,
        pdb: `COMPND    AZULENE` // Will rely on PubChem fetch
    },
    'ddq': {
        color: '#ea580c', // Dark orange/red
        emoji: '🔶',
        formula: 'C₈Cl₂N₂O₂',
        skeletal: 'Quinone ring with two cyano and two chloro groups',
        functionalGroups: ['Quinone', 'Nitrile (-CN)', 'Chloride'],
        pubchemCid: 6586,
        pdb: `COMPND    DDQ`
    },
    'diazomethane': {
        color: '#facc15', // Yellow
        emoji: '⚡',
        formula: 'CH₂N₂',
        skeletal: 'Linear C=N=N structure with resonance',
        functionalGroups: ['Diazo group (=N2)', 'Methylidene'],
        pubchemCid: 9551,
        pdb: `COMPND    DIAZOMETHANE`
    },
    '9-nitrosojulolidine': {
        color: '#ef4444', // Red/Orange
        emoji: '🔴',
        formula: 'C₁₂H₁₄N₂O',
        skeletal: 'Fused tricyclic nitrogen system with nitroso group',
        functionalGroups: ['Nitroso (-N=O)', 'Tertiary amine', 'Fused rings'],
        pubchemCid: 70831,
        pdb: `COMPND    9-NITROSOJULOLIDINE`
    },
    'beta-carotene': {
        color: '#f97316', // Orange
        emoji: '🥕',
        formula: 'C₄₀H₅₆',
        skeletal: 'Long conjugated polyene chain (11 double bonds)',
        functionalGroups: ['Conjugated system', 'Cyclohexene rings'],
        pubchemCid: 5280489,
        pdb: `COMPND    BETA-CAROTENE`
    },
    'chlorophyll': {
        color: '#22c55e', // Green
        emoji: '🍃',
        formula: 'C₅₅H₇₂MgN₄O₅',
        skeletal: 'Porphyrin ring with Magnesium center + phytol tail',
        functionalGroups: ['Porphyrin', 'Magnesium complex', 'Ester', 'Phytol chain'],
        pubchemCid: 5748352,
        pdb: `COMPND    CHLOROPHYLL A`
    },
    'benzene': {
        color: '#ec4899',
        emoji: '🔵',
        formula: 'C₆H₆',
        skeletal: 'Hexagonal ring with alternating double bonds',
        functionalGroups: ['Aromatic ring'],
        pubchemCid: 241,
        pdb: `COMPND    BENZENE
ATOM      1  C1  BEN     1       1.400   0.000   0.000  1.00  0.00           C
ATOM      2  C2  BEN     1       0.700   1.212   0.000  1.00  0.00           C
ATOM      3  C3  BEN     1      -0.700   1.212   0.000  1.00  0.00           C
ATOM      4  C4  BEN     1      -1.400   0.000   0.000  1.00  0.00           C
ATOM      5  C5  BEN     1      -0.700  -1.212   0.000  1.00  0.00           C
ATOM      6  C6  BEN     1       0.700  -1.212   0.000  1.00  0.00           C
ATOM      7  H1  BEN     1       2.500   0.000   0.000  1.00  0.00           H
ATOM      8  H2  BEN     1       1.250   2.165   0.000  1.00  0.00           H
ATOM      9  H3  BEN     1      -1.250   2.165   0.000  1.00  0.00           H
ATOM     10  H4  BEN     1      -2.500   0.000   0.000  1.00  0.00           H
ATOM     11  H5  BEN     1      -1.250  -2.165   0.000  1.00  0.00           H
ATOM     12  H6  BEN     1       1.250  -2.165   0.000  1.00  0.00           H
END`
    },

    // ========================================
    // Section: Smell & Pheromones
    // ========================================
    'limonene': {
        color: '#eab308',
        emoji: '🍋',
        formula: 'C₁₀H₁₆',
        skeletal: 'Cyclohexene ring with isopropenyl group (terpene)',
        functionalGroups: ['Cyclohexene ring', 'C=C double bond', 'Isopropenyl group'],
        pubchemCid: 22311,
        pdb: `COMPND    LIMONENE
ATOM      1  C1  LIM     1       0.000   0.000   0.000  1.00  0.00           C
ATOM      2  C2  LIM     1       1.400   0.000   0.000  1.00  0.00           C
ATOM      3  C3  LIM     1       2.100   1.200   0.000  1.00  0.00           C
ATOM      4  C4  LIM     1       1.400   2.400   0.000  1.00  0.00           C
ATOM      5  C5  LIM     1      -0.200   2.300   0.000  1.00  0.00           C
ATOM      6  C6  LIM     1      -0.700   0.900   0.000  1.00  0.00           C
ATOM      7  C7  LIM     1       3.600   1.600   0.000  1.00  0.00           C
ATOM      8  C8  LIM     1       4.100   3.000   0.000  1.00  0.00           C
ATOM      9  C9  LIM     1      -0.600  -1.300   0.000  1.00  0.00           C
ATOM     10  C10 LIM     1      -2.000  -1.500   0.000  1.00  0.00           C
END`
    },
    'muscone': {
        color: '#a855f7',
        emoji: '🦌',
        formula: 'C₁₆H₃₀O',
        skeletal: '15-membered macrocyclic ketone ring',
        functionalGroups: ['Ketone (C=O)', 'Large ring (macrocycle)', 'Methyl group'],
        pubchemCid: 10947,
        pdb: `COMPND    MUSCONE
ATOM      1  C1  MUS     1       0.000   0.000   0.000  1.00  0.00           C
ATOM      2  C2  MUS     1       1.500   0.000   0.000  1.00  0.00           C
ATOM      3  C3  MUS     1       2.200   1.300   0.000  1.00  0.00           C
ATOM      4  C4  MUS     1       3.700   1.300   0.000  1.00  0.00           C
ATOM      5  C5  MUS     1       4.400   2.600   0.000  1.00  0.00           C
ATOM      6  C6  MUS     1       5.900   2.600   0.000  1.00  0.00           C
ATOM      7  C7  MUS     1       6.600   1.300   0.000  1.00  0.00           C
ATOM      8  C8  MUS     1       6.000   0.000   0.000  1.00  0.00           C
ATOM      9  C9  MUS     1       4.500   0.000   0.000  1.00  0.00           C
ATOM     10  C10 MUS     1       3.800  -1.300   0.000  1.00  0.00           C
ATOM     11  C11 MUS     1       2.300  -1.300   0.000  1.00  0.00           C
ATOM     12  C12 MUS     1       1.600  -2.600   0.000  1.00  0.00           C
ATOM     13  C13 MUS     1       0.100  -2.600   0.000  1.00  0.00           C
ATOM     14  C14 MUS     1      -0.600  -1.300   0.000  1.00  0.00           C
ATOM     15  C15 MUS     1      -2.100  -1.300   0.000  1.00  0.00           C
ATOM     16  O1  MUS     1      -2.800  -2.300   0.000  1.00  0.00           O
END`
    },
    'civetone': {
        color: '#f472b6',
        emoji: '🐱',
        formula: 'C₁₇H₃₀O',
        skeletal: '17-membered macrocyclic ketone with cis double bond',
        functionalGroups: ['Ketone (C=O)', 'Macrocycle', 'C=C double bond (cis)'],
        pubchemCid: 441463,
        pdb: `COMPND    CIVETONE
ATOM      1  C1  CIV     1       0.000   0.000   0.000  1.00  0.00           C
ATOM      2  C2  CIV     1       1.500   0.000   0.000  1.00  0.00           C
ATOM      3  C3  CIV     1       2.200   1.300   0.200  1.00  0.00           C
ATOM      4  C4  CIV     1       3.700   1.400   0.300  1.00  0.00           C
ATOM      5  C5  CIV     1       4.500   0.200   0.400  1.00  0.00           C
ATOM      6  C6  CIV     1       6.000   0.300   0.500  1.00  0.00           C
ATOM      7  C7  CIV     1       6.800   1.500   0.600  1.00  0.00           C
ATOM      8  C8  CIV     1       8.300   1.400   0.700  1.00  0.00           C
ATOM      9  C9  CIV     1       9.100   0.200   0.600  1.00  0.00           C
ATOM     10  C10 CIV     1       8.500  -1.100   0.400  1.00  0.00           C
ATOM     11  C11 CIV     1       7.000  -1.200   0.300  1.00  0.00           C
ATOM     12  C12 CIV     1       6.200  -2.400   0.200  1.00  0.00           C
ATOM     13  C13 CIV     1       4.700  -2.500   0.100  1.00  0.00           C
ATOM     14  C14 CIV     1       3.900  -1.300   0.000  1.00  0.00           C
ATOM     15  C15 CIV     1       2.400  -1.400  -0.100  1.00  0.00           C
ATOM     16  C16 CIV     1       1.600  -2.600  -0.200  1.00  0.00           C
ATOM     17  C17 CIV     1       0.100  -2.500  -0.100  1.00  0.00           C
ATOM     18  O1  CIV     1      -0.700  -1.400   0.000  1.00  0.00           O
END`
    },
    'frontalin': {
        color: '#22c55e',
        emoji: '🪲',
        formula: 'C₈H₁₄O₂',
        skeletal: 'Bicyclic ketal (two fused rings with oxygens)',
        functionalGroups: ['Ketal (C bonded to 2 oxygens)', 'Bicyclic ring'],
        pubchemCid: 15809,
        pdb: `COMPND    FRONTALIN
ATOM      1  C1  FRO     1       0.000   0.000   0.000  1.00  0.00           C
ATOM      2  C2  FRO     1       1.500   0.000   0.000  1.00  0.00           C
ATOM      3  O1  FRO     1       2.000   1.300   0.000  1.00  0.00           O
ATOM      4  C3  FRO     1       1.200   2.400   0.000  1.00  0.00           C
ATOM      5  C4  FRO     1      -0.300   2.200   0.000  1.00  0.00           C
ATOM      6  O2  FRO     1      -0.800   0.900   0.000  1.00  0.00           O
ATOM      7  C5  FRO     1       1.600   3.800   0.000  1.00  0.00           C
ATOM      8  C6  FRO     1       2.200  -1.200   0.000  1.00  0.00           C
END`
    },
    'thioacetone': {
        color: '#fbbf24',
        emoji: '💀',
        formula: 'C₃H₆S',
        skeletal: 'Three-carbon with central thioketone (C=S)',
        functionalGroups: ['Thioketone (C=S)', 'Methyl groups'],
        pubchemCid: 11352,
        pdb: `COMPND    THIOACETONE
ATOM      1  C1  THI     1       0.000   0.000   0.000  1.00  0.00           C
ATOM      2  C2  THI     1       1.500   0.000   0.000  1.00  0.00           C
ATOM      3  S1  THI     1       2.300   1.500   0.000  1.00  0.00           S
ATOM      4  C3  THI     1      -0.700   1.300   0.000  1.00  0.00           C
END`
    },

    // ========================================
    // Section: Medicine
    // ========================================
    'aspirin': {
        color: '#ef4444',
        emoji: '💊',
        formula: 'C₉H₈O₄',
        skeletal: 'Benzene ring with ester and carboxylic acid groups',
        functionalGroups: ['Carboxylic acid (-COOH)', 'Ester (-COO-)', 'Benzene ring'],
        pubchemCid: 2244,
        pdb: `COMPND    ASPIRIN
ATOM      1  C1  ASP     1       0.000   0.000   0.000  1.00  0.00           C
ATOM      2  C2  ASP     1       1.400   0.000   0.000  1.00  0.00           C
ATOM      3  C3  ASP     1       2.100   1.200   0.000  1.00  0.00           C
ATOM      4  C4  ASP     1       1.400   2.400   0.000  1.00  0.00           C
ATOM      5  C5  ASP     1       0.000   2.400   0.000  1.00  0.00           C
ATOM      6  C6  ASP     1      -0.700   1.200   0.000  1.00  0.00           C
ATOM      7  C7  ASP     1      -2.100   1.200   0.000  1.00  0.00           C
ATOM      8  O1  ASP     1      -2.800   0.000   0.000  1.00  0.00           O
ATOM      9  O2  ASP     1      -2.800   2.400   0.000  1.00  0.00           O
ATOM     10  O3  ASP     1       2.100  -1.200   0.000  1.00  0.00           O
ATOM     11  C8  ASP     1       3.500  -1.200   0.000  1.00  0.00           C
ATOM     12  C9  ASP     1       4.200   0.000   0.000  1.00  0.00           C
ATOM     13  O4  ASP     1       4.200  -2.400   0.000  1.00  0.00           O
END`
    },
    'quinine': {
        color: '#06b6d4',
        emoji: '💊',
        formula: 'C₂₀H₂₄N₂O₂',
        skeletal: 'Quinoline-quinuclidine alkaloid from cinchona bark',
        functionalGroups: ['Quinoline ring', 'Quinuclidine bicyclic', 'Methoxy (-OCH₃)', 'Vinyl group'],
        pubchemCid: 3034034,
        pdb: `COMPND    QUININE
ATOM      1  N1  QUI     1       0.000   0.000   0.000  1.00  0.00           N
ATOM      2  C2  QUI     1       1.400   0.000   0.000  1.00  0.00           C
ATOM      3  C3  QUI     1       2.100   1.200   0.000  1.00  0.00           C
ATOM      4  C4  QUI     1       1.400   2.400   0.000  1.00  0.00           C
ATOM      5  C5  QUI     1       0.000   2.400   0.000  1.00  0.00           C
ATOM      6  C6  QUI     1      -0.700   1.200   0.000  1.00  0.00           C
ATOM      7  C7  QUI     1       3.600   1.200   0.000  1.00  0.00           C
ATOM      8  C8  QUI     1       4.300   2.400   0.000  1.00  0.00           C
ATOM      9  C9  QUI     1       3.600   3.600   0.000  1.00  0.00           C
ATOM     10  N2  QUI     1       2.100   3.600   0.000  1.00  0.00           N
ATOM     11  O1  QUI     1      -2.100   1.200   0.000  1.00  0.00           O
ATOM     12  C10 QUI     1      -2.800   2.400   0.000  1.00  0.00           C
ATOM     13  C11 QUI     1       5.000   0.000   1.000  1.00  0.00           C
ATOM     14  C12 QUI     1       6.000   0.000   1.500  1.00  0.00           C
ATOM     15  O2  QUI     1       5.800   3.600   0.000  1.00  0.00           O
END`
    },
    'penicillin g': {
        color: '#22c55e',
        emoji: '🦠',
        formula: 'C₁₆H₁₈N₂O₄S',
        skeletal: 'Beta-lactam ring fused to thiazolidine - the first antibiotic',
        functionalGroups: ['β-lactam (4-membered ring)', 'Thiazolidine ring', 'Amide', 'Carboxylic acid'],
        pubchemCid: 5904,
        pdb: `COMPND    PENICILLIN G
ATOM      1  S1  PEN     1       0.000   0.000   0.000  1.00  0.00           S
ATOM      2  C2  PEN     1       1.500   0.500   0.500  1.00  0.00           C
ATOM      3  C3  PEN     1       2.300   1.500   0.000  1.00  0.00           C
ATOM      4  N1  PEN     1       1.500   2.500  -0.500  1.00  0.00           N
ATOM      5  C4  PEN     1       0.200   2.000   0.000  1.00  0.00           C
ATOM      6  C5  PEN     1       3.700   1.500   0.000  1.00  0.00           C
ATOM      7  O1  PEN     1       4.400   2.500   0.000  1.00  0.00           O
ATOM      8  N2  PEN     1       4.200   0.300   0.000  1.00  0.00           N
ATOM      9  C6  PEN     1       5.600   0.000   0.000  1.00  0.00           C
ATOM     10  C7  PEN     1       6.300   1.200   0.000  1.00  0.00           C
ATOM     11  C8  PEN     1       7.700   1.200   0.000  1.00  0.00           C
ATOM     12  C9  PEN     1       8.400   0.000   0.000  1.00  0.00           C
ATOM     13  C10 PEN     1       7.700  -1.200   0.000  1.00  0.00           C
ATOM     14  C11 PEN     1       6.300  -1.200   0.000  1.00  0.00           C
ATOM     15  C12 PEN     1      -0.800   2.800   0.500  1.00  0.00           C
ATOM     16  O2  PEN     1      -1.500   3.500   0.000  1.00  0.00           O
ATOM     17  O3  PEN     1      -1.000   2.500   1.800  1.00  0.00           O
END`
    },
    'taxol': {
        color: '#a855f7',
        emoji: '🌲',
        formula: 'C₄₇H₅₁NO₁₄',
        skeletal: 'Complex diterpene with 11 chiral centers - anticancer drug',
        functionalGroups: ['Ester groups', 'Amide', 'Hydroxyl groups', 'Epoxide', 'Oxetane ring'],
        pubchemCid: 36314,
        rcsbLigandId: 'TA1',
        pdb: `COMPND    TAXOL (PACLITAXEL)
ATOM      1  C1  TAX     1       0.000   0.000   0.000  1.00  0.00           C
ATOM      2  C2  TAX     1       1.540   0.000   0.000  1.00  0.00           C
ATOM      3  C3  TAX     1       2.100   1.400   0.000  1.00  0.00           C
ATOM      4  C4  TAX     1       1.300   2.500   0.500  1.00  0.00           C
ATOM      5  C5  TAX     1      -0.200   2.300   0.200  1.00  0.00           C
ATOM      6  C6  TAX     1      -0.700   0.900   0.500  1.00  0.00           C
ATOM      7  C7  TAX     1       3.600   1.600   0.000  1.00  0.00           C
ATOM      8  O1  TAX     1       4.200   2.700   0.000  1.00  0.00           O
ATOM      9  C8  TAX     1       4.400   0.400   0.000  1.00  0.00           C
ATOM     10  C9  TAX     1       4.000  -1.000   0.000  1.00  0.00           C
ATOM     11  C10 TAX     1       2.500  -1.200   0.000  1.00  0.00           C
ATOM     12  O2  TAX     1      -2.000   0.700   0.000  1.00  0.00           O
ATOM     13  C11 TAX     1       5.900   0.500   0.000  1.00  0.00           C
ATOM     14  O3  TAX     1       6.600   1.500   0.000  1.00  0.00           O
ATOM     15  N1  TAX     1       6.500  -0.700   0.000  1.00  0.00           N
ATOM     16  C12 TAX     1       7.900  -0.800   0.000  1.00  0.00           C
ATOM     17  O4  TAX     1      -1.000   3.200  -0.500  1.00  0.00           O
END`
    },
    'atorvastatin': {
        color: '#ef4444',
        emoji: '❤️',
        formula: 'C₃₃H₃₅FN₂O₅',
        skeletal: 'Lipitor - HMG-CoA reductase inhibitor with pyrrole core',
        functionalGroups: ['Pyrrole ring', 'Fluorophenyl', 'Carboxylic acid', 'Hydroxyl groups'],
        pubchemCid: 60823,
        rcsbLigandId: 'ATV',
        pdb: `COMPND    ATORVASTATIN (LIPITOR)
ATOM      1  N1  ATV     1       0.000   0.000   0.000  1.00  0.00           N
ATOM      2  C2  ATV     1       1.200   0.700   0.000  1.00  0.00           C
ATOM      3  C3  ATV     1       1.200   2.100   0.000  1.00  0.00           C
ATOM      4  C4  ATV     1      -0.100   2.500   0.000  1.00  0.00           C
ATOM      5  C5  ATV     1      -0.900   1.300   0.000  1.00  0.00           C
ATOM      6  C6  ATV     1       2.400   0.000   0.000  1.00  0.00           C
ATOM      7  C7  ATV     1       3.700   0.500   0.000  1.00  0.00           C
ATOM      8  C8  ATV     1       4.900  -0.200   0.000  1.00  0.00           C
ATOM      9  C9  ATV     1       4.900  -1.600   0.000  1.00  0.00           C
ATOM     10  C10 ATV     1       3.700  -2.300   0.000  1.00  0.00           C
ATOM     11  C11 ATV     1       2.500  -1.400   0.000  1.00  0.00           C
ATOM     12  F1  ATV     1       6.100  -2.200   0.000  1.00  0.00           F
ATOM     13  C12 ATV     1      -2.300   1.300   0.000  1.00  0.00           C
ATOM     14  C13 ATV     1      -3.100   2.400   0.000  1.00  0.00           C
ATOM     15  O1  ATV     1      -4.300   2.200   0.000  1.00  0.00           O
ATOM     16  O2  ATV     1      -2.600   3.600   0.000  1.00  0.00           O
END`
    },
    'omeprazole': {
        color: '#8b5cf6',
        emoji: '💜',
        formula: 'C₁₇H₁₉N₃O₃S',
        skeletal: 'Proton pump inhibitor with benzimidazole and pyridine',
        functionalGroups: ['Benzimidazole', 'Pyridine', 'Sulfoxide (S=O)', 'Methoxy groups'],
        pubchemCid: 4594,
        rcsbLigandId: 'OPZ',
        pdb: `COMPND    OMEPRAZOLE
ATOM      1  N1  OMP     1       0.000   0.000   0.000  1.00  0.00           N
ATOM      2  C2  OMP     1       1.300   0.000   0.000  1.00  0.00           C
ATOM      3  N2  OMP     1       2.000   1.200   0.000  1.00  0.00           N
ATOM      4  C3  OMP     1       1.200   2.300   0.000  1.00  0.00           C
ATOM      5  C4  OMP     1      -0.200   2.000   0.000  1.00  0.00           C
ATOM      6  C5  OMP     1      -0.700   0.700   0.000  1.00  0.00           C
ATOM      7  C6  OMP     1       2.000  -1.200   0.000  1.00  0.00           C
ATOM      8  S1  OMP     1       3.600  -1.000   0.000  1.00  0.00           S
ATOM      9  O1  OMP     1       4.000  -1.000   1.400  1.00  0.00           O
ATOM     10  C7  OMP     1       4.200   0.600   0.000  1.00  0.00           C
ATOM     11  N3  OMP     1       5.500   0.900   0.000  1.00  0.00           N
ATOM     12  C8  OMP     1       5.800   2.200   0.000  1.00  0.00           C
ATOM     13  C9  OMP     1       4.700   3.000   0.000  1.00  0.00           C
ATOM     14  C10 OMP     1       3.500   2.300   0.000  1.00  0.00           C
ATOM     15  C11 OMP     1       3.500   0.900   0.000  1.00  0.00           C
ATOM     16  O2  OMP     1       1.500   3.600   0.000  1.00  0.00           O
ATOM     17  O3  OMP     1       6.200  -1.500   0.000  1.00  0.00           O
END`
    },

    // ========================================
    // Section: Perfumery & Vision
    // ========================================
    'vanillin': {
        color: '#d97706',
        emoji: '🍦',
        formula: 'C₈H₈O₃',
        skeletal: 'Benzene ring with aldehyde, methoxy, and hydroxyl groups',
        functionalGroups: ['Aldehyde (-CHO)', 'Methoxy (-OCH₃)', 'Hydroxyl (-OH)', 'Benzene ring'],
        pubchemCid: 1183,
        pdb: `COMPND    VANILLIN
ATOM      1  C1  VAN     1       0.000   0.000   0.000  1.00  0.00           C
ATOM      2  C2  VAN     1       1.400   0.000   0.000  1.00  0.00           C
ATOM      3  C3  VAN     1       2.100   1.200   0.000  1.00  0.00           C
ATOM      4  C4  VAN     1       1.400   2.400   0.000  1.00  0.00           C
ATOM      5  C5  VAN     1       0.000   2.400   0.000  1.00  0.00           C
ATOM      6  C6  VAN     1      -0.700   1.200   0.000  1.00  0.00           C
ATOM      7  C7  VAN     1      -2.100   1.200   0.000  1.00  0.00           C
ATOM      8  O1  VAN     1      -2.800   2.300   0.000  1.00  0.00           O
ATOM      9  O2  VAN     1      -0.700  -1.200   0.000  1.00  0.00           O
ATOM     10  O3  VAN     1       2.100   3.700   0.000  1.00  0.00           O
ATOM     11  C8  VAN     1       4.200   0.000   0.000  1.00  0.00           C
END`
    },
    'menthol': {
        color: '#10b981',
        emoji: '🌿',
        formula: 'C₁₀H₂₀O',
        skeletal: 'Cyclohexane ring with methyl, isopropyl, and hydroxyl groups',
        functionalGroups: ['Hydroxyl (-OH)', 'Cyclohexane ring', 'Isopropyl group'],
        pubchemCid: 16666,
        pdb: `COMPND    MENTHOL
ATOM      1  C1  MEN     1       0.000   0.000   0.000  1.00  0.00           C
ATOM      2  C2  MEN     1       1.500   0.000   0.000  1.00  0.00           C
ATOM      3  C3  MEN     1       2.200   1.300   0.200  1.00  0.00           C
ATOM      4  C4  MEN     1       1.400   2.400  -0.500  1.00  0.00           C
ATOM      5  C5  MEN     1       0.000   2.200  -0.200  1.00  0.00           C
ATOM      6  C6  MEN     1      -0.700   1.100   0.200  1.00  0.00           C
ATOM      7  C7  MEN     1       2.100  -1.200   0.000  1.00  0.00           C
ATOM      8  O1  MEN     1       3.700   1.300   0.000  1.00  0.00           O
ATOM      9  C8  MEN     1      -2.200   1.100   0.000  1.00  0.00           C
ATOM     10  C9  MEN     1      -2.900   0.000   0.800  1.00  0.00           C
ATOM     11  C10 MEN     1      -2.900   1.000  -1.400  1.00  0.00           C
END`
    },
    'damascenone': {
        color: '#ec4899',
        emoji: '🌹',
        formula: 'C₁₃H₁₈O',
        skeletal: 'Rose ketone with cyclohexene and conjugated system',
        functionalGroups: ['Ketone (C=O)', 'Conjugated double bonds', 'Cyclohexene ring'],
        pubchemCid: 5366074,
        pdb: `COMPND    DAMASCENONE
ATOM      1  C1  DAM     1       0.000   0.000   0.000  1.00  0.00           C
ATOM      2  C2  DAM     1       1.400   0.000   0.000  1.00  0.00           C
ATOM      3  C3  DAM     1       2.100   1.200   0.000  1.00  0.00           C
ATOM      4  C4  DAM     1       1.400   2.400   0.000  1.00  0.00           C
ATOM      5  C5  DAM     1       0.000   2.400   0.000  1.00  0.00           C
ATOM      6  C6  DAM     1      -0.700   1.200   0.000  1.00  0.00           C
ATOM      7  C7  DAM     1       3.600   1.200   0.000  1.00  0.00           C
ATOM      8  C8  DAM     1       4.300   2.400   0.000  1.00  0.00           C
ATOM      9  C9  DAM     1       5.800   2.400   0.000  1.00  0.00           C
ATOM     10  O1  DAM     1       6.500   3.500   0.000  1.00  0.00           O
ATOM     11  C10 DAM     1       6.500   1.100   0.000  1.00  0.00           C
ATOM     12  C11 DAM     1      -0.700  -1.200   0.000  1.00  0.00           C
ATOM     13  C12 DAM     1       2.100   3.700   0.000  1.00  0.00           C
END`
    },
    'retinal': {
        color: '#f97316',
        emoji: '👁️',
        formula: 'C₂₀H₂₈O',
        skeletal: 'Conjugated polyene chain with cyclohexene ring and aldehyde',
        functionalGroups: ['Aldehyde (-CHO)', 'Conjugated double bonds', 'Cyclohexene ring'],
        pubchemCid: 638015,
        pdb: `COMPND    RETINAL
ATOM      1  C1  RET     1       0.000   0.000   0.000  1.00  0.00           C
ATOM      2  C2  RET     1       1.400   0.000   0.000  1.00  0.00           C
ATOM      3  C3  RET     1       2.100   1.200   0.000  1.00  0.00           C
ATOM      4  C4  RET     1       3.600   1.200   0.000  1.00  0.00           C
ATOM      5  C5  RET     1       4.300   2.400   0.000  1.00  0.00           C
ATOM      6  C6  RET     1       5.800   2.400   0.000  1.00  0.00           C
ATOM      7  C7  RET     1       6.500   3.600   0.000  1.00  0.00           C
ATOM      8  C8  RET     1       8.000   3.600   0.000  1.00  0.00           C
ATOM      9  C9  RET     1       8.700   4.800   0.000  1.00  0.00           C
ATOM     10  C10 RET     1      10.200   4.800   0.000  1.00  0.00           C
ATOM     11  C11 RET     1      10.900   6.000   0.000  1.00  0.00           C
ATOM     12  C12 RET     1      12.400   6.000   0.000  1.00  0.00           C
ATOM     13  C13 RET     1      13.100   7.200   0.000  1.00  0.00           C
ATOM     14  C14 RET     1      14.600   7.200   0.000  1.00  0.00           C
ATOM     15  C15 RET     1      15.300   8.400   0.000  1.00  0.00           C
ATOM     16  O1  RET     1      16.500   8.400   0.000  1.00  0.00           O
ATOM     17  C16 RET     1      -0.700   1.200   0.000  1.00  0.00           C
ATOM     18  C17 RET     1      -0.700  -1.200   0.000  1.00  0.00           C
ATOM     19  C18 RET     1       1.400   2.400   0.000  1.00  0.00           C
ATOM     20  C19 RET     1       8.700   2.400   0.000  1.00  0.00           C
ATOM     21  C20 RET     1      13.100   4.800   0.000  1.00  0.00           C
END`
    },
    '11-cis-retinal': {
        color: '#3b82f6',
        emoji: '👁️',
        formula: 'C₂₀H₂₈O',
        skeletal: '11-cis configuration - BENT chain at C11=C12, pre-light absorption',
        functionalGroups: ['Aldehyde (-CHO)', 'Conjugated double bonds (cis at C11)', 'Cyclohexene ring'],
        pubchemCid: 5280490,
        pdb: `COMPND    11-CIS-RETINAL
ATOM      1  C1  RET     1       0.000   0.000   0.000  1.00  0.00           C
ATOM      2  C2  RET     1       1.400   0.000   0.000  1.00  0.00           C
ATOM      3  C3  RET     1       2.100   1.200   0.000  1.00  0.00           C
ATOM      4  C4  RET     1       3.600   1.200   0.000  1.00  0.00           C
ATOM      5  C5  RET     1       4.300   2.400   0.000  1.00  0.00           C
ATOM      6  C6  RET     1       5.800   2.400   0.000  1.00  0.00           C
ATOM      7  C7  RET     1       6.800   3.500   0.000  1.00  0.00           C
ATOM      8  C8  RET     1       8.200   3.500   0.000  1.00  0.00           C
ATOM      9  C9  RET     1       9.200   4.500   0.000  1.00  0.00           C
ATOM     10  C10 RET     1      10.600   4.500   0.000  1.00  0.00           C
ATOM     11  C11 RET     1      11.600   5.500   0.000  1.00  0.00           C
ATOM     12  C12 RET     1      11.000   6.800   1.500  1.00  0.00           C
ATOM     13  C13 RET     1       9.500   7.200   2.000  1.00  0.00           C
ATOM     14  C14 RET     1       8.500   8.200   2.500  1.00  0.00           C
ATOM     15  C15 RET     1       7.100   8.500   3.000  1.00  0.00           C
ATOM     16  O1  RET     1       6.000   9.200   3.300  1.00  0.00           O
ATOM     17  C16 RET     1      -0.700   1.200   0.000  1.00  0.00           C
ATOM     18  C17 RET     1      -0.700  -1.200   0.000  1.00  0.00           C
ATOM     19  C18 RET     1       1.400   2.400   0.000  1.00  0.00           C
ATOM     20  C19 RET     1       8.200   2.300   0.000  1.00  0.00           C
END`
    },
    'all-trans-retinal': {
        color: '#f97316',
        emoji: '☀️',
        formula: 'C₂₀H₂₈O',
        skeletal: 'All-trans configuration - STRAIGHT chain, post-light absorption',
        functionalGroups: ['Aldehyde (-CHO)', 'Conjugated double bonds (all trans)', 'Cyclohexene ring'],
        pubchemCid: 1070,
        pdb: `COMPND    ALL-TRANS-RETINAL
ATOM      1  C1  RET     1       0.000   0.000   0.000  1.00  0.00           C
ATOM      2  C2  RET     1       1.400   0.000   0.000  1.00  0.00           C
ATOM      3  C3  RET     1       2.100   1.200   0.000  1.00  0.00           C
ATOM      4  C4  RET     1       3.600   1.200   0.000  1.00  0.00           C
ATOM      5  C5  RET     1       4.300   2.400   0.000  1.00  0.00           C
ATOM      6  C6  RET     1       5.800   2.400   0.000  1.00  0.00           C
ATOM      7  C7  RET     1       6.500   3.600   0.000  1.00  0.00           C
ATOM      8  C8  RET     1       8.000   3.600   0.000  1.00  0.00           C
ATOM      9  C9  RET     1       8.700   4.800   0.000  1.00  0.00           C
ATOM     10  C10 RET     1      10.200   4.800   0.000  1.00  0.00           C
ATOM     11  C11 RET     1      10.900   6.000   0.000  1.00  0.00           C
ATOM     12  C12 RET     1      12.400   6.000   0.000  1.00  0.00           C
ATOM     13  C13 RET     1      13.100   7.200   0.000  1.00  0.00           C
ATOM     14  C14 RET     1      14.600   7.200   0.000  1.00  0.00           C
ATOM     15  C15 RET     1      15.300   8.400   0.000  1.00  0.00           C
ATOM     16  O1  RET     1      16.500   8.400   0.000  1.00  0.00           O
ATOM     17  C16 RET     1      -0.700   1.200   0.000  1.00  0.00           C
ATOM     18  C17 RET     1      -0.700  -1.200   0.000  1.00  0.00           C
ATOM     19  C18 RET     1       1.400   2.400   0.000  1.00  0.00           C
ATOM     20  C19 RET     1       8.700   2.400   0.000  1.00  0.00           C
ATOM     21  C20 RET     1      13.100   4.800   0.000  1.00  0.00           C
END`
    },

    // ========================================
    // Section: Drug Discovery (Cis/Trans in Medicine)
    // ========================================
    'cisplatin': {
        color: '#10b981',
        emoji: '💚',
        formula: 'Pt(NH₃)₂Cl₂',
        skeletal: 'Square planar platinum complex with cis configuration (Cl-Pt-Cl angle = 90°)',
        functionalGroups: ['Platinum(II) center', 'Amine ligands (NH₃)', 'Chloride ligands (Cl⁻)'],
        // Correct cis geometry: Cl atoms ADJACENT (90° apart), NH3 groups ADJACENT (90° apart)
        // Square planar: all atoms in same plane (z=0)
        // Pt-Cl bond: ~2.33 Å, Pt-N bond: ~2.05 Å
        pdb: `COMPND    CISPLATIN - CIS-DIAMMINEDICHLOROPLATINUM(II)
AUTHOR    CORRECT SQUARE PLANAR GEOMETRY
ATOM      1  PT  CPT     1       0.000   0.000   0.000  1.00  0.00          PT
ATOM      2  CL1 CPT     1       2.330   0.000   0.000  1.00  0.00          CL
ATOM      3  CL2 CPT     1       0.000   2.330   0.000  1.00  0.00          CL
ATOM      4  N1  CPT     1      -2.050   0.000   0.000  1.00  0.00           N
ATOM      5  N2  CPT     1       0.000  -2.050   0.000  1.00  0.00           N
ATOM      6  H11 CPT     1      -2.500   0.850   0.300  1.00  0.00           H
ATOM      7  H12 CPT     1      -2.500  -0.400   0.850  1.00  0.00           H
ATOM      8  H13 CPT     1      -2.500  -0.400  -0.850  1.00  0.00           H
ATOM      9  H21 CPT     1       0.850  -2.500   0.300  1.00  0.00           H
ATOM     10  H22 CPT     1      -0.400  -2.500   0.850  1.00  0.00           H
ATOM     11  H23 CPT     1      -0.400  -2.500  -0.850  1.00  0.00           H
CONECT    1    2    3    4    5
CONECT    4    6    7    8
CONECT    5    9   10   11
END`
    },
    'transplatin': {
        color: '#ef4444',
        emoji: '❌',
        formula: 'Pt(NH₃)₂Cl₂',
        skeletal: 'Square planar platinum complex with trans configuration (Cl-Pt-Cl angle = 180°)',
        functionalGroups: ['Platinum(II) center', 'Amine ligands (NH₃)', 'Chloride ligands (Cl⁻)'],
        // Correct trans geometry: Cl atoms OPPOSITE (180° apart), NH3 groups OPPOSITE (180° apart)
        // Square planar: all atoms in same plane (z=0)
        pdb: `COMPND    TRANSPLATIN - TRANS-DIAMMINEDICHLOROPLATINUM(II)
AUTHOR    CORRECT SQUARE PLANAR GEOMETRY
ATOM      1  PT  TPT     1       0.000   0.000   0.000  1.00  0.00          PT
ATOM      2  CL1 TPT     1       2.330   0.000   0.000  1.00  0.00          CL
ATOM      3  CL2 TPT     1      -2.330   0.000   0.000  1.00  0.00          CL
ATOM      4  N1  TPT     1       0.000   2.050   0.000  1.00  0.00           N
ATOM      5  N2  TPT     1       0.000  -2.050   0.000  1.00  0.00           N
ATOM      6  H11 TPT     1       0.850   2.500   0.300  1.00  0.00           H
ATOM      7  H12 TPT     1      -0.400   2.500   0.850  1.00  0.00           H
ATOM      8  H13 TPT     1      -0.400   2.500  -0.850  1.00  0.00           H
ATOM      9  H21 TPT     1       0.850  -2.500   0.300  1.00  0.00           H
ATOM     10  H22 TPT     1      -0.400  -2.500   0.850  1.00  0.00           H
ATOM     11  H23 TPT     1      -0.400  -2.500  -0.850  1.00  0.00           H
CONECT    1    2    3    4    5
CONECT    4    6    7    8
CONECT    5    9   10   11
END`
    },
    'tamoxifen': {
        color: '#ec4899',
        emoji: '🎀',
        formula: 'C₂₆H₂₉NO',
        skeletal: 'Triphenylethylene derivative with aminoethoxy side chain',
        functionalGroups: ['Phenyl rings', 'Ethylene core', 'Tertiary amine', 'Ether linkage'],
        pubchemCid: 2733526,
        pdb: `COMPND    TAMOXIFEN
ATOM      1  C1  TAM     1       0.000   0.000   0.000  1.00  0.00           C
ATOM      2  C2  TAM     1       1.400   0.000   0.000  1.00  0.00           C
ATOM      3  C3  TAM     1       2.100   1.200   0.000  1.00  0.00           C
ATOM      4  C4  TAM     1       1.400   2.400   0.000  1.00  0.00           C
ATOM      5  C5  TAM     1       0.000   2.400   0.000  1.00  0.00           C
ATOM      6  C6  TAM     1      -0.700   1.200   0.000  1.00  0.00           C
ATOM      7  C7  TAM     1      -2.200   1.200   0.000  1.00  0.00           C
ATOM      8  C8  TAM     1      -2.900   2.400   0.000  1.00  0.00           C
ATOM      9  O1  TAM     1      -4.300   2.400   0.000  1.00  0.00           O
ATOM     10  C9  TAM     1      -5.000   3.600   0.000  1.00  0.00           C
ATOM     11  C10 TAM     1      -6.500   3.600   0.000  1.00  0.00           C
ATOM     12  N1  TAM     1      -7.200   4.800   0.000  1.00  0.00           N
END`
    },

    // ========================================
    // Section: Aspirin Discovery Story (From Vitalism to Synthesis)
    // ========================================
    'salicin': {
        color: '#059669',
        emoji: '🌿',
        formula: 'C₁₃H₁₈O₇',
        skeletal: 'Glucoside of salicyl alcohol - the natural precursor from willow bark',
        functionalGroups: ['Glucose ring', 'Phenolic ring', 'Glycosidic bond', 'Hydroxyl groups'],
        pubchemCid: 439503,
        pdb: `COMPND    SALICIN - NATURAL PRECURSOR FROM WILLOW BARK
ATOM      1  C1  SAL     1       0.000   0.000   0.000  1.00  0.00           C
ATOM      2  C2  SAL     1       1.400   0.000   0.000  1.00  0.00           C
ATOM      3  C3  SAL     1       2.100   1.200   0.000  1.00  0.00           C
ATOM      4  C4  SAL     1       1.400   2.400   0.000  1.00  0.00           C
ATOM      5  C5  SAL     1       0.000   2.400   0.000  1.00  0.00           C
ATOM      6  C6  SAL     1      -0.700   1.200   0.000  1.00  0.00           C
ATOM      7  O1  SAL     1       3.500   1.200   0.000  1.00  0.00           O
ATOM      8  C7  SAL     1       4.200   2.400   0.000  1.00  0.00           C
END`
    },
    'salicylic-acid': {
        color: '#dc2626',
        emoji: '⚗️',
        formula: 'C₇H₆O₃',
        skeletal: 'Benzene ring with carboxylic acid and hydroxyl groups - bitter and causes stomach irritation',
        functionalGroups: ['Carboxylic acid (-COOH)', 'Phenolic hydroxyl (-OH)', 'Aromatic ring'],
        pubchemCid: 338,
        pdb: `COMPND    SALICYLIC ACID - ACTIVE BUT CAUSES STOMACH IRRITATION
ATOM      1  C1  SLA     1       0.000   0.000   0.000  1.00  0.00           C
ATOM      2  C2  SLA     1       1.400   0.000   0.000  1.00  0.00           C
ATOM      3  C3  SLA     1       2.100   1.200   0.000  1.00  0.00           C
ATOM      4  C4  SLA     1       1.400   2.400   0.000  1.00  0.00           C
ATOM      5  C5  SLA     1       0.000   2.400   0.000  1.00  0.00           C
ATOM      6  C6  SLA     1      -0.700   1.200   0.000  1.00  0.00           C
ATOM      7  C7  SLA     1      -2.200   1.200   0.000  1.00  0.00           C
ATOM      8  O1  SLA     1      -2.900   0.000   0.000  1.00  0.00           O
ATOM      9  O2  SLA     1      -2.900   2.400   0.000  1.00  0.00           O
ATOM     10  O3  SLA     1       2.100   0.000   0.000  1.00  0.00           O
END`
    },
    'aspirin': {
        color: '#2563eb',
        emoji: '💊',
        formula: 'C₉H₈O₄',
        skeletal: 'Acetylsalicylic acid - Hoffmann\'s 1897 breakthrough with acetyl group modification',
        functionalGroups: ['Carboxylic acid (-COOH)', 'Ester (acetyl -OCOCH₃)', 'Aromatic ring'],
        pubchemCid: 2244,
        pdb: `COMPND    ASPIRIN - ACETYLSALICYLIC ACID (HOFFMANN 1897)
ATOM      1  C1  ASP     1       0.000   0.000   0.000  1.00  0.00           C
ATOM      2  C2  ASP     1       1.400   0.000   0.000  1.00  0.00           C
ATOM      3  C3  ASP     1       2.100   1.200   0.000  1.00  0.00           C
ATOM      4  C4  ASP     1       1.400   2.400   0.000  1.00  0.00           C
ATOM      5  C5  ASP     1       0.000   2.400   0.000  1.00  0.00           C
ATOM      6  C6  ASP     1      -0.700   1.200   0.000  1.00  0.00           C
ATOM      7  C7  ASP     1      -2.200   1.200   0.000  1.00  0.00           C
ATOM      8  O1  ASP     1      -2.900   0.000   0.000  1.00  0.00           O
ATOM      9  O2  ASP     1      -2.900   2.400   0.000  1.00  0.00           O
ATOM     10  O3  ASP     1       2.100   0.000   0.000  1.00  0.00           O
ATOM     11  C8  ASP     1       3.500   0.000   0.000  1.00  0.00           C
ATOM     12  O4  ASP     1       4.200  -1.200   0.000  1.00  0.00           O
ATOM     13  C9  ASP     1       4.200   1.200   0.000  1.00  0.00           C
END`
    },
};
