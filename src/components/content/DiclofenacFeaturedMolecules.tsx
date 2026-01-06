'use client';

import dynamic from 'next/dynamic';

const MoleculeViewer = dynamic(() => import('../MoleculeViewer'), {
    ssr: false,
    loading: () => null
});

const MOLECULES = [
    {
        name: 'Ibrutinib',
        cid: 24821094,
        formula: 'C₂₅H₂₄N₆O₂',
        functionalGroups: [
            { name: 'Acrylamide', formula: 'CH₂=CHCONH₂', importance: 'Michael acceptor - forms irreversible C-S bond with Cys481' },
            { name: 'Pyrazolopyrimidine', formula: 'C₅H₄N₄', importance: 'ATP-mimetic core - occupies adenine binding pocket' },
            { name: 'Phenyl ether', formula: 'C₆H₅-O-R', importance: 'Lipophilic anchor - enhances membrane permeability' }
        ]
    },
    {
        name: 'Pirtobrutinib',
        cid: 129269915,
        formula: 'C₂₃H₂₂F₂N₆O₂',
        functionalGroups: [
            { name: 'Difluorophenyl', formula: 'C₆H₃F₂', importance: 'Electron-withdrawing - increases binding affinity' },
            { name: 'Carbazole', formula: 'C₁₂H₉N', importance: 'Rigid scaffold - optimal 3D orientation for binding' },
            { name: 'Pyridine', formula: 'C₅H₅N', importance: 'H-bond acceptor - key interaction with kinase hinge' }
        ]
    },
    {
        name: 'Diclofenac',
        cid: 3033,
        formula: 'C₁₄H₁₁Cl₂NO₂',
        functionalGroups: [
            { name: 'Carboxylic Acid', formula: '-COOH', importance: 'Essential for COX binding - ionic interaction with Arg120' },
            { name: '2,6-Dichlorophenyl', formula: 'C₆H₃Cl₂', importance: '80° twist angle - enables COX-2 selectivity' },
            { name: 'Secondary Amine', formula: '-NH-', importance: 'Bridge between rings - optimal geometry for binding' }
        ]
    },
    {
        name: 'Phenylacetic Acid',
        cid: 999,
        formula: 'C₈H₈O₂',
        functionalGroups: [
            { name: 'Carboxylic Acid', formula: '-COOH', importance: 'Essential pharmacophore - enables salt formation & COX interaction' },
            { name: 'Benzene Ring', formula: 'C₆H₆', importance: 'Lipophilic core - hydrophobic interactions with enzyme pocket' },
            { name: 'Methylene Bridge', formula: '-CH₂-', importance: 'Spacer group - positions carboxyl for optimal binding' }
        ]
    },
    {
        name: '2-Anilinophenylacetic Acid',
        cid: 854057,
        formula: 'C₁₄H₁₃NO₂',
        functionalGroups: [
            { name: 'Carboxylic Acid', formula: '-COOH', importance: 'Primary pharmacophore - COX enzyme binding site interaction' },
            { name: 'Aniline (Anilino)', formula: 'C₆H₅NH-', importance: 'Secondary aromatic ring - adds lipophilicity & selectivity' },
            { name: 'Phenylacetate Core', formula: 'C₆H₄-CH₂-COOH', importance: 'Lead structure - basis for Diclofenac optimization' }
        ]
    }
];

export default function DiclofenacFeaturedMolecules() {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1.25rem',
            padding: '1rem'
        }}>
            {MOLECULES.map(mol => (
                <MoleculeViewer
                    key={mol.name}
                    moleculeName={mol.name}
                    cid={mol.cid}
                    formula={mol.formula}
                    functionalGroups={mol.functionalGroups}
                    height={320}
                    autoRotate={false}
                    startExpanded={true}
                />
            ))}
        </div>
    );
}
