/**
 * Chapter 2: Organic Structures
 * Molecule data for visualization
 * 
 * Contains molecules referenced in Chapter 2 content:
 * - Oxidation Level Series: Ethane, Ethanol, Acetaldehyde, Acetic Acid
 * - Ketone Example: Acetone
 * - Real Drug Examples: Vanillin, Ibuprofen analogs
 */

import { MoleculeRegistry } from '../../moleculeTypes';

export const chapter2Molecules: MoleculeRegistry = {
    // ========================================
    // Section: Oxidation Levels (The Core of Chapter 2)
    // ========================================

    // Level 0: Alkane (no bonds to heteroatoms)
    'ethane': {
        color: '#94a3b8',
        emoji: '🔥',
        formula: 'C₂H₆',
        skeletal: 'Two carbons with single bond (Level 0)',
        functionalGroups: ['Alkane'],
        pubchemCid: 6324,
        pdb: `COMPND    ETHANE
ATOM      1  C1  ETH     1      -0.752   0.000   0.000  1.00  0.00           C
ATOM      2  C2  ETH     1       0.752   0.000   0.000  1.00  0.00           C
ATOM      3  H1  ETH     1      -1.147   1.025   0.000  1.00  0.00           H
ATOM      4  H2  ETH     1      -1.147  -0.513  -0.887  1.00  0.00           H
ATOM      5  H3  ETH     1      -1.147  -0.513   0.887  1.00  0.00           H
ATOM      6  H4  ETH     1       1.147  -1.025   0.000  1.00  0.00           H
ATOM      7  H5  ETH     1       1.147   0.513   0.887  1.00  0.00           H
ATOM      8  H6  ETH     1       1.147   0.513  -0.887  1.00  0.00           H
END`
    },

    // Level 1: Alcohol (1 bond to heteroatom)
    'ethanol': {
        color: '#3b82f6',
        emoji: '🧪',
        formula: 'C₂H₆O',
        skeletal: 'Two-carbon chain with terminal hydroxyl group (Level 1)',
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

    // Level 2: Aldehyde (2 bonds to heteroatom via C=O)
    'acetaldehyde': {
        color: '#f59e0b',
        emoji: '🧪',
        formula: 'C₂H₄O',
        skeletal: 'Two carbons, one C=O double bond (Aldehyde - Level 2)',
        functionalGroups: ['Aldehyde (CHO)', 'Carbonyl (C=O)'],
        pubchemCid: 177,
        smiles: 'CC=O',
        structure2D: `
        O
        ‖
   H₃C─C─H
   
   (Aldehyde: C=O)
`,
        pdb: `COMPND    ACETALDEHYDE
ATOM      1  C1  ALD     1       0.000   0.000   0.000  1.00  0.00           C
ATOM      2  C2  ALD     1       1.530   0.000   0.000  1.00  0.00           C
ATOM      3  O1  ALD     1       2.230   1.210   0.000  1.00  0.00           O
ATOM      4  H1  ALD     1      -0.390  -0.510   0.890  1.00  0.00           H
ATOM      5  H2  ALD     1      -0.390  -0.510  -0.890  1.00  0.00           H
ATOM      6  H3  ALD     1      -0.390   1.020   0.000  1.00  0.00           H
ATOM      7  H4  ALD     1       2.040  -0.960   0.000  1.00  0.00           H
END`
    },

    // Level 3: Carboxylic Acid (3 bonds to heteroatoms)
    'acetic acid': {
        color: '#ef4444',
        emoji: '🥗',
        formula: 'C₂H₄O₂',
        skeletal: 'Two carbons, C=O double bond and -OH (Level 3)',
        functionalGroups: ['Carboxylic Acid (COOH)', 'Carbonyl (C=O)', 'Hydroxyl (-OH)'],
        pubchemCid: 176,
        smiles: 'CC(=O)O',
        structure2D: `
        O
        ‖
   H₃C─C─O─H
        
   (C=O double bond)
`,
        pdb: `COMPND    ACETIC ACID
ATOM      1  C1  AAC     1      -1.465  -0.088   0.000  1.00  0.00           C
ATOM      2  C2  AAC     1       0.000   0.141   0.000  1.00  0.00           C
ATOM      3  O1  AAC     1       0.785  -0.923   0.000  1.00  0.00           O
ATOM      4  O2  AAC     1       0.605   1.385   0.000  1.00  0.00           O
ATOM      5  H1  AAC     1      -1.921   0.395   0.882  1.00  0.00           H
ATOM      6  H2  AAC     1      -1.637  -1.164   0.007  1.00  0.00           H
ATOM      7  H3  AAC     1      -1.921   0.395  -0.882  1.00  0.00           H
ATOM      8  H4  AAC     1       1.751  -0.672   0.000  1.00  0.00           H
END`
    },

    // ========================================
    // Section: Ketone Example
    // ========================================
    'acetone': {
        color: '#f97316',
        emoji: '🧴',
        formula: 'C₃H₆O',
        skeletal: 'Three carbons with central ketone (C=O)',
        functionalGroups: ['Ketone (C=O)', 'Level 2 oxidation'],
        pubchemCid: 180,
        smiles: 'CC(=O)C',
        structure2D: `
        O
        ‖
   H₃C─C─CH₃
   
   (Ketone: C=O)
`,
        pdb: `COMPND    ACETONE
ATOM      1  C1  ACE     1      -1.270   0.000   0.000  1.00  0.00           C
ATOM      2  C2  ACE     1       0.000   0.000   0.000  1.00  0.00           C
ATOM      3  C3  ACE     1       1.270   0.000   0.000  1.00  0.00           C
ATOM      4  O1  ACE     1       0.000   1.230   0.000  1.00  0.00           O
ATOM      5  H1  ACE     1      -1.640   0.520   0.890  1.00  0.00           H
ATOM      6  H2  ACE     1      -1.640   0.520  -0.890  1.00  0.00           H
ATOM      7  H3  ACE     1      -1.640  -1.030   0.000  1.00  0.00           H
ATOM      8  H4  ACE     1       1.640  -0.520   0.890  1.00  0.00           H
ATOM      9  H5  ACE     1       1.640  -0.520  -0.890  1.00  0.00           H
ATOM     10  H6  ACE     1       1.640   1.030   0.000  1.00  0.00           H
END`
    },

    // ========================================
    // Section: Real Drug Examples
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

    // ========================================
    // Section: Aromatic Compounds
    // ========================================
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

    // Methane for Level 0 example  
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

    // ========================================
    // Section: Alkanes (Linear Chains)
    // ========================================
    'pentane': {
        color: '#64748b',
        emoji: '📏',
        formula: 'C₅H₁₂',
        skeletal: 'Five-carbon straight chain alkane (zig-zag shape)',
        functionalGroups: ['Alkane'],
        pubchemCid: 8003,
        pdb: `COMPND    PENTANE
ATOM      1  C1  PEN     1      -2.540   0.000   0.000  1.00  0.00           C
ATOM      2  C2  PEN     1      -1.270   0.870   0.000  1.00  0.00           C
ATOM      3  C3  PEN     1       0.000   0.000   0.000  1.00  0.00           C
ATOM      4  C4  PEN     1       1.270   0.870   0.000  1.00  0.00           C
ATOM      5  C5  PEN     1       2.540   0.000   0.000  1.00  0.00           C
ATOM      6  H1  PEN     1      -2.540  -0.640   0.890  1.00  0.00           H
ATOM      7  H2  PEN     1      -2.540  -0.640  -0.890  1.00  0.00           H
ATOM      8  H3  PEN     1      -3.440   0.630   0.000  1.00  0.00           H
ATOM      9  H4  PEN     1      -1.270   1.510   0.890  1.00  0.00           H
ATOM     10  H5  PEN     1      -1.270   1.510  -0.890  1.00  0.00           H
ATOM     11  H6  PEN     1       0.000  -0.640   0.890  1.00  0.00           H
ATOM     12  H7  PEN     1       0.000  -0.640  -0.890  1.00  0.00           H
ATOM     13  H8  PEN     1       1.270   1.510   0.890  1.00  0.00           H
ATOM     14  H9  PEN     1       1.270   1.510  -0.890  1.00  0.00           H
ATOM     15  H10 PEN     1       2.540  -0.640   0.890  1.00  0.00           H
ATOM     16  H11 PEN     1       2.540  -0.640  -0.890  1.00  0.00           H
ATOM     17  H12 PEN     1       3.440   0.630   0.000  1.00  0.00           H
END`
    },

    'propane': {
        color: '#3b82f6',
        emoji: '🔵',
        formula: 'C₃H₈',
        skeletal: 'Three-carbon straight chain alkane',
        functionalGroups: ['Alkane'],
        pubchemCid: 6334,
        pdb: `COMPND    PROPANE
ATOM      1  C1  PRO     1      -1.270   0.000   0.000  1.00  0.00           C
ATOM      2  C2  PRO     1       0.000   0.870   0.000  1.00  0.00           C
ATOM      3  C3  PRO     1       1.270   0.000   0.000  1.00  0.00           C
ATOM      4  H1  PRO     1      -1.270  -0.640   0.890  1.00  0.00           H
ATOM      5  H2  PRO     1      -1.270  -0.640  -0.890  1.00  0.00           H
ATOM      6  H3  PRO     1      -2.170   0.630   0.000  1.00  0.00           H
ATOM      7  H4  PRO     1       0.000   1.510   0.890  1.00  0.00           H
ATOM      8  H5  PRO     1       0.000   1.510  -0.890  1.00  0.00           H
ATOM      9  H6  PRO     1       1.270  -0.640   0.890  1.00  0.00           H
ATOM     10  H7  PRO     1       1.270  -0.640  -0.890  1.00  0.00           H
ATOM     11  H8  PRO     1       2.170   0.630   0.000  1.00  0.00           H
END`
    },

    // ========================================
    // Section: Cyclic Compounds
    // ========================================
    'cyclohexane': {
        color: '#10b981',
        emoji: '⭕',
        formula: 'C₆H₁₂',
        skeletal: 'Six-membered saturated ring (chair conformation)',
        functionalGroups: ['Cycloalkane', 'Saturated ring'],
        pubchemCid: 9265,
        pdb: `COMPND    CYCLOHEXANE
ATOM      1  C1  CHX     1       1.200   0.700   0.000  1.00  0.00           C
ATOM      2  C2  CHX     1       1.200  -0.700   0.000  1.00  0.00           C
ATOM      3  C3  CHX     1       0.000  -1.400   0.000  1.00  0.00           C
ATOM      4  C4  CHX     1      -1.200  -0.700   0.000  1.00  0.00           C
ATOM      5  C5  CHX     1      -1.200   0.700   0.000  1.00  0.00           C
ATOM      6  C6  CHX     1       0.000   1.400   0.000  1.00  0.00           C
ATOM      7  H1  CHX     1       2.100   1.050   0.520  1.00  0.00           H
ATOM      8  H2  CHX     1       1.200   1.050  -1.040  1.00  0.00           H
ATOM      9  H3  CHX     1       2.100  -1.050   0.520  1.00  0.00           H
ATOM     10  H4  CHX     1       1.200  -1.050  -1.040  1.00  0.00           H
ATOM     11  H5  CHX     1       0.000  -2.100   0.850  1.00  0.00           H
ATOM     12  H6  CHX     1       0.000  -2.100  -0.850  1.00  0.00           H
ATOM     13  H7  CHX     1      -2.100  -1.050   0.520  1.00  0.00           H
ATOM     14  H8  CHX     1      -1.200  -1.050  -1.040  1.00  0.00           H
ATOM     15  H9  CHX     1      -2.100   1.050   0.520  1.00  0.00           H
ATOM     16  H10 CHX     1      -1.200   1.050  -1.040  1.00  0.00           H
ATOM     17  H11 CHX     1       0.000   2.100   0.850  1.00  0.00           H
ATOM     18  H12 CHX     1       0.000   2.100  -0.850  1.00  0.00           H
END`
    },

    // ========================================
    // Section: Aldehydes
    // ========================================
    'formaldehyde': {
        color: '#f97316',
        emoji: '🧪',
        formula: 'CH₂O',
        skeletal: 'Simplest aldehyde (H-CHO)',
        functionalGroups: ['Aldehyde (CHO)', 'Carbonyl (C=O)'],
        pubchemCid: 712,
        pdb: `COMPND    FORMALDEHYDE
ATOM      1  C   FRM     1       0.000   0.000   0.000  1.00  0.00           C
ATOM      2  O   FRM     1       0.000   1.210   0.000  1.00  0.00           O
ATOM      3  H1  FRM     1       0.940  -0.570   0.000  1.00  0.00           H
ATOM      4  H2  FRM     1      -0.940  -0.570   0.000  1.00  0.00           H
END`
    },

    // ========================================
    // Section: Phenolic Compounds
    // ========================================
    'phenol': {
        color: '#ec4899',
        emoji: '🧴',
        formula: 'C₆H₆O',
        skeletal: 'Benzene ring with hydroxyl group (-OH)',
        functionalGroups: ['Aromatic ring', 'Hydroxyl (-OH)', 'Phenol'],
        pubchemCid: 996,
        pdb: `COMPND    PHENOL
ATOM      1  C1  PHE     1       1.400   0.000   0.000  1.00  0.00           C
ATOM      2  C2  PHE     1       0.700   1.212   0.000  1.00  0.00           C
ATOM      3  C3  PHE     1      -0.700   1.212   0.000  1.00  0.00           C
ATOM      4  C4  PHE     1      -1.400   0.000   0.000  1.00  0.00           C
ATOM      5  C5  PHE     1      -0.700  -1.212   0.000  1.00  0.00           C
ATOM      6  C6  PHE     1       0.700  -1.212   0.000  1.00  0.00           C
ATOM      7  O   PHE     1       2.800   0.000   0.000  1.00  0.00           O
ATOM      8  H1  PHE     1       1.250   2.165   0.000  1.00  0.00           H
ATOM      9  H2  PHE     1      -1.250   2.165   0.000  1.00  0.00           H
ATOM     10  H3  PHE     1      -2.500   0.000   0.000  1.00  0.00           H
ATOM     11  H4  PHE     1      -1.250  -2.165   0.000  1.00  0.00           H
ATOM     12  H5  PHE     1       1.250  -2.165   0.000  1.00  0.00           H
ATOM     13  H6  PHE     1       3.200   0.900   0.000  1.00  0.00           H
END`
    },

    'toluene': {
        color: '#8b5cf6',
        emoji: '🎨',
        formula: 'C₇H₈',
        skeletal: 'Benzene ring with methyl group (-CH₃)',
        functionalGroups: ['Aromatic ring', 'Methyl (-CH₃)'],
        pubchemCid: 1140,
        pdb: `COMPND    TOLUENE
ATOM      1  C1  TOL     1       1.400   0.000   0.000  1.00  0.00           C
ATOM      2  C2  TOL     1       0.700   1.212   0.000  1.00  0.00           C
ATOM      3  C3  TOL     1      -0.700   1.212   0.000  1.00  0.00           C
ATOM      4  C4  TOL     1      -1.400   0.000   0.000  1.00  0.00           C
ATOM      5  C5  TOL     1      -0.700  -1.212   0.000  1.00  0.00           C
ATOM      6  C6  TOL     1       0.700  -1.212   0.000  1.00  0.00           C
ATOM      7  C7  TOL     1       2.900   0.000   0.000  1.00  0.00           C
ATOM      8  H1  TOL     1       1.250   2.165   0.000  1.00  0.00           H
ATOM      9  H2  TOL     1      -1.250   2.165   0.000  1.00  0.00           H
ATOM     10  H3  TOL     1      -2.500   0.000   0.000  1.00  0.00           H
ATOM     11  H4  TOL     1      -1.250  -2.165   0.000  1.00  0.00           H
ATOM     12  H5  TOL     1       1.250  -2.165   0.000  1.00  0.00           H
ATOM     13  H6  TOL     1       3.300   1.020   0.000  1.00  0.00           H
ATOM     14  H7  TOL     1       3.300  -0.510   0.890  1.00  0.00           H
ATOM     15  H8  TOL     1       3.300  -0.510  -0.890  1.00  0.00           H
END`
    },

    // ========================================
    // Section: Steroid (Complex structure)
    // ========================================
    'cholesterol': {
        color: '#fbbf24',
        emoji: '🥚',
        formula: 'C₂₇H₄₆O',
        skeletal: 'Four fused rings (3 cyclohexane + 1 cyclopentane) with side chain',
        functionalGroups: ['Steroid backbone', 'Hydroxyl (-OH)', 'Alkene (C=C)'],
        pubchemCid: 5997,
        smiles: 'CC(C)CCCC(C)C1CCC2C1(CCC3C2CC=C4C3(CCC(C4)O)C)C'
    },
};

