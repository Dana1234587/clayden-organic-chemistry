import { SectionData } from '../../types';

export const introduction = `The carbonyl group (C=O) is the most important functional group in organic chemistry. In this chapter, you'll master nucleophilic addition reactions – the fundamental process where nucleophiles attack the electrophilic carbonyl carbon. From making alcohols to building complex drug molecules, these reactions are essential for every organic chemist.`;

export const sections: SectionData[] = [
    {
        id: 'carbonyl-structure',
        title: 'The Carbonyl Group: Structure and Reactivity',
        content: `
The carbonyl group consists of a carbon atom double-bonded to an oxygen atom (C=O). This seemingly simple structure creates one of the most reactive centers in organic chemistry.

## Why Is the Carbonyl So Reactive?

**Electronic Structure:**
The C=O bond is highly polarized because oxygen is much more electronegative than carbon (χ = 3.5 vs 2.5).

This creates a permanent dipole: **C(δ⁺)=O(δ⁻)**

**The Key Players:**
- **Carbon** → Electrophilic (δ⁺, electron-poor)
- **Oxygen** → Nucleophilic (δ⁻, electron-rich with lone pairs)

## Molecular Orbitals of C=O

The carbonyl has two important molecular orbitals:

**π Orbital (HOMO of carbonyl):**
- Electron density concentrated on oxygen
- This makes oxygen nucleophilic

**π* Orbital (LUMO of carbonyl):**
- Larger coefficient on carbon
- This is where nucleophiles attack!

The HOMO of any nucleophile interacts with the π* LUMO of the carbonyl – this orbital interaction drives all carbonyl reactions.

## Geometry Change During Reaction

When a nucleophile attacks:

**Before Attack:**
- Carbon is sp² hybridized
- Trigonal planar geometry (120° angles)

**After Attack:**
- Carbon becomes sp³ hybridized  
- Tetrahedral geometry (109.5° angles)

This geometry change relieves angle strain in small rings and affects the stability of the product.
        `,
        keyPoints: [
            'Carbonyl carbon is electrophilic (δ⁺) due to oxygen electronegativity',
            'Nucleophiles attack the π* LUMO on carbonyl carbon',
            'Attack changes geometry from sp² trigonal to sp³ tetrahedral',
            'The C=O bond is highly polarized'
        ],
        funFact: 'Nearly 50% of all known organic compounds contain a carbonyl group – it\'s the king of functional groups!'
    },
    {
        id: 'burgi-dunitz',
        title: 'The Bürgi-Dunitz Trajectory: How Nucleophiles Attack',
        content: `
Not all approach angles are equal! Scientists discovered that nucleophiles attack carbonyls at a very specific angle.

## The Bürgi-Dunitz Angle

In 1973, Hans-Beat Bürgi and Jack Dunitz analyzed crystal structures and discovered:

**Nucleophiles attack at approximately 107° to the C=O bond**

This is NOT perpendicular (90°) and NOT along the C=O axis (180°).

## Why This Angle?

**1. Orbital Overlap:**
The nucleophile's HOMO must overlap with the carbon's π* LUMO. This overlap is maximized at ~107°.

**2. Avoiding Electron Repulsion:**
The nucleophile's electrons would repel the π electrons if attack were perpendicular.

**3. Transition State Geometry:**
The 107° angle smoothly converts the sp² carbon toward sp³ geometry.

## Evidence from Crystal Structures

Bürgi and Dunitz studied "frozen" snapshots of reactions in crystals:

| Distance from C (Å) | Angle (°) | Interpretation |
|---------------------|-----------|----------------|
| 3.0 | 107 | Early approach |
| 2.5 | 107 | Getting closer |
| 2.0 | 105 | Near bonding |
| 1.5 | 109 | Tetrahedral product |

The angle gradually adjusts as the new bond forms and the carbonyl transforms.

## Practical Implications

Understanding the attack trajectory helps predict:
- **Stereochemistry** of product formation
- **Steric effects** from groups blocking the approach
- **Selectivity** when there are two different faces to attack
        `,
        keyPoints: [
            'Nucleophiles attack at ~107° to the C=O bond (Bürgi-Dunitz angle)',
            'This angle maximizes HOMO-LUMO orbital overlap',
            'The trajectory smoothly converts sp² to sp³ geometry',
            'Crystal structures provided experimental evidence'
        ],
        funFact: 'Bürgi and Dunitz used X-ray crystallography to essentially "photograph" reactions in progress – their 1973 paper is still cited today!'
    },
    {
        id: 'cyanohydrin',
        title: 'Cyanohydrin Formation: Adding Cyanide to Carbonyls',
        content: `
The addition of cyanide (CN⁻) to aldehydes and ketones forms **cyanohydrins** – important intermediates in synthesis.

## The Reaction

**Aldehyde/Ketone + HCN → Cyanohydrin**

The product has both -OH and -CN on the same carbon.

## Mechanism (Base-Catalyzed)

**Step 1: Nucleophilic Attack**
The cyanide ion (CN⁻) attacks the electrophilic carbonyl carbon:

CN⁻ (nucleophile) → C=O (electrophile)

The π electrons of C=O move to oxygen, forming an alkoxide intermediate.

**Step 2: Protonation**
The alkoxide picks up a proton (from HCN or solvent) to give the cyanohydrin product.

## Key Features

**Reversibility:**
This reaction is reversible! The equilibrium position depends on:
- Aldehyde: Equilibrium favors cyanohydrin
- Ketone: May not favor product (steric hindrance)

**Why Cyanide?**
- CN⁻ is a good nucleophile (negative charge, available lone pair)
- The C≡N bond is stable in the product
- Provides a handle for further transformations

## Synthetic Value

Cyanohydrins are versatile intermediates:

**-CN can be converted to:**
- Carboxylic acids (-COOH) by hydrolysis
- Amines (-CH₂NH₂) by reduction
- Extended carbon chains

This is a powerful C-C bond forming reaction!

## Safety Note

HCN (hydrogen cyanide) is extremely toxic. Modern synthesis often uses:
- NaCN + acid (generates HCN in situ)
- TMSCN (trimethylsilyl cyanide) – safer alternative
- Enzyme catalysis for stereoselectivity
        `,
        keyPoints: [
            'Cyanide attacks carbonyl carbon as nucleophile',
            'Product has both -OH and -CN on same carbon',
            'Reaction is reversible (equilibrium)',
            'Cyanohydrins are valuable synthetic intermediates'
        ],
        funFact: 'Many plants produce cyanohydrins as defense chemicals – when damaged, enzymes release deadly HCN gas. Cassava and bitter almonds contain these compounds!'
    },
    {
        id: 'hydride-reduction',
        title: 'Hydride Reduction: NaBH₄ and LiAlH₄',
        content: `
Converting carbonyls to alcohols using hydride reagents is one of the most important reactions in synthesis.

## The Two Main Reagents

**Sodium Borohydride (NaBH₄)**
- Mild reducing agent
- Can use in water or alcohols
- Selective for aldehydes/ketones

**Lithium Aluminum Hydride (LiAlH₄)**
- Powerful reducing agent
- MUST use dry ether (reacts violently with water!)
- Reduces almost everything

## The Mechanism: Hydride Transfer

Both reagents deliver H⁻ (hydride ion) to the carbonyl:

**Step 1:** The M-H bond (M = B or Al) acts as the nucleophile. Hydride attacks carbonyl carbon while the metal coordinates to oxygen.

**Step 2:** For NaBH₄, the alkoxide can be protonated by the protic solvent. For LiAlH₄, water is added in a separate step (work-up).

## Comparison Table

| Property | NaBH₄ | LiAlH₄ |
|----------|-------|--------|
| Reactivity | Mild | Very strong |
| Solvent | Water, alcohols | Dry ether only |
| Reduces aldehydes | ✓ | ✓ |
| Reduces ketones | ✓ | ✓ |
| Reduces esters | ✗ | ✓ |
| Reduces carboxylic acids | ✗ | ✓ |
| Reduces amides | ✗ | ✓ |
| Safety | Safe | Flammable! |

## Selectivity Example

If you have a molecule with both a ketone AND an ester:

**NaBH₄:** Only reduces the ketone (ester untouched)
**LiAlH₄:** Reduces BOTH

This selectivity is crucial for complex molecule synthesis.

## Products

- **Aldehyde → Primary alcohol (1°)**
- **Ketone → Secondary alcohol (2°)**

The carbonyl carbon gains one hydrogen and becomes an alcohol.
        `,
        keyPoints: [
            'Hydride (H⁻) acts as nucleophile attacking carbonyl carbon',
            'NaBH₄ is mild and selective; LiAlH₄ is powerful and reduces everything',
            'NaBH₄ works in water; LiAlH₄ requires dry ether',
            'Aldehydes give primary alcohols; ketones give secondary alcohols'
        ],
        funFact: 'LiAlH₄ reacts so violently with water that it can cause fires! Chemists must use perfectly dry glassware and inert atmosphere when using this reagent.'
    },
    {
        id: 'grignard-reaction',
        title: 'Grignard Reactions: Building Carbon Skeletons',
        content: `
Grignard reagents (RMgX) are among the most powerful tools for making C-C bonds in organic synthesis.

## What Are Grignard Reagents?

**General formula: R-Mg-X**

Where:
- R = alkyl or aryl group
- Mg = magnesium
- X = halogen (usually Br or Cl)

The carbon attached to magnesium is **nucleophilic** because the C-Mg bond is highly polarized (C is δ⁻).

## Making Grignard Reagents

R-X + Mg → R-MgX (in dry ether)

The ether coordinates to magnesium, stabilizing the reagent.

**Critical:** Must be completely anhydrous! Water destroys Grignards.

## The Reaction with Carbonyls

The Grignard carbon attacks the electrophilic carbonyl carbon:

**R-MgBr + R'CHO → R-CH(OMgBr)-R' → R-CH(OH)-R'**

After aqueous work-up, you get an alcohol with a new C-C bond!

## Products from Different Carbonyls

| Starting Material | Product |
|-------------------|---------|
| Formaldehyde (H₂C=O) | Primary alcohol |
| Aldehyde (RCHO) | Secondary alcohol |
| Ketone (R₂C=O) | Tertiary alcohol |
| Ester (RCO₂R') | Tertiary alcohol (two R groups add!) |
| CO₂ | Carboxylic acid |

## Organolithium Reagents (RLi)

Even more reactive than Grignards:
- Nucleophilicity: RLi > RMgX
- More difficult to handle
- Used when Grignards don't react

## Synthetic Strategy

Grignard reactions let you "build up" carbon chains:

**Example: Making 2-propanol**
CH₃MgBr + CH₃CHO → CH₃CH(OH)CH₃

You're connecting two fragments to make a larger molecule!
        `,
        keyPoints: [
            'Grignard reagents (RMgX) have nucleophilic carbon (C⁻)',
            'React with carbonyls to form C-C bonds',
            'Must be absolutely anhydrous (water-free)',
            'Can make primary, secondary, or tertiary alcohols depending on carbonyl'
        ],
        funFact: 'Victor Grignard won the Nobel Prize in 1912 for discovering this reaction. It\'s still taught in every organic chemistry course over 100 years later!'
    },
    {
        id: 'hydration-hemiacetal',
        title: 'Hydration and Hemiacetal Formation',
        content: `
Water and alcohols can add to carbonyls, forming important intermediates and products.

## Carbonyl Hydration

**Aldehyde/Ketone + H₂O ⇌ gem-Diol (Hydrate)**

A "gem-diol" has two -OH groups on the same carbon.

## Catalysis Options

**Acid Catalysis:**
1. Protonation of carbonyl oxygen makes carbon MORE electrophilic (C becomes more δ⁺)
2. Water attacks the activated carbonyl
3. Deprotonation gives the diol

**Base Catalysis:**
1. Hydroxide (OH⁻) is a better nucleophile than water
2. OH⁻ attacks carbonyl directly
3. Protonation gives the diol

## Equilibrium Position

Most ketones and aldehydes favor the carbonyl form:

**Aldehydes:** ~50% hydrated in water
**Ketones:** <1% hydrated (steric hindrance)

Exception: Formaldehyde is ~99.9% hydrated because it has no steric protection!

## Hemiacetal Formation

When alcohols add instead of water:

**Aldehyde + ROH ⇌ Hemiacetal**

A hemiacetal has: -OH and -OR on the same carbon

**Key Feature:** Hemiacetals are usually unstable and exist in equilibrium.

## Cyclic Hemiacetals

When the -OH and C=O are in the same molecule (4-5 carbons apart), they can form stable **cyclic hemiacetals**:

**This is how sugars exist!**

Glucose forms a 6-membered ring hemiacetal that is very stable.

## Acetals

If you add MORE alcohol (with acid catalyst), hemiacetals convert to acetals:

**Hemiacetal + ROH → Acetal + H₂O**

Acetals have: Two -OR groups on the same carbon (no -OH)

**Key Feature:** Acetals are stable to base but cleave with acid.

## Biological Importance

- **Glucose:** Cyclic hemiacetal
- **Sucrose:** Contains acetal linkages
- **Glycosides:** Natural acetals in plants
- **Polysaccharides:** Connected by acetal bonds
        `,
        keyPoints: [
            'Water adds to carbonyls to form gem-diols (hydrates)',
            'Acid catalysis activates carbonyl; base catalysis provides better nucleophile',
            'Hemiacetals form from alcohol addition (usually unstable)',
            'Cyclic hemiacetals (like in sugars) are stable'
        ],
        funFact: 'Every sugar molecule in your body exists as a cyclic hemiacetal! When you eat carbohydrates, your enzymes open and close these rings constantly.'
    },
    {
        id: 'reactivity-factors',
        title: 'Reactivity: Aldehydes vs Ketones',
        content: `
Not all carbonyls are equally reactive. Understanding reactivity helps predict reaction outcomes.

## Aldehydes Are More Reactive Than Ketones

This is due to two factors:

**1. Steric Effects**

Aldehydes: Only one substituent (+ H)
Ketones: Two substituents

The two groups in ketones create steric hindrance, blocking the nucleophile's approach to carbon.

**2. Electronic Effects**

Alkyl groups are electron-donating (by hyperconjugation/induction).

In ketones:
- Two alkyl groups donate electron density to carbonyl carbon
- This reduces the δ⁺ character
- Makes carbon less electrophilic

In aldehydes:
- Only one alkyl group (or none in formaldehyde)
- Carbon remains more δ⁺
- More attractive to nucleophiles

## Reactivity Series

Most reactive → Least reactive:

1. **Formaldehyde** (H₂C=O) - no groups, very electrophilic
2. **Other aldehydes** (RCHO) - one alkyl group
3. **Ketones** (R₂CO) - two alkyl groups
4. **Conjugated ketones** - resonance stabilization

## Ring Strain Effects

Small cyclic ketones are MORE reactive than expected:

**Cyclopropanone:** Very reactive!

Why? The sp² carbon has 120° angles, but in a 3-membered ring, angles are forced to 60°.

When nucleophile attacks, carbon becomes sp³ (109.5°). This is closer to 60° than 120° was, so strain is relieved!

## Conjugation Effects

α,β-unsaturated carbonyls (like C=C-C=O) can react at two positions:

- **1,2-addition:** Nucleophile attacks carbonyl carbon (normal)
- **1,4-addition (Michael):** Nucleophile attacks the β-carbon

Conjugation delocalizes electrophilicity across the system.
        `,
        keyPoints: [
            'Aldehydes are more reactive than ketones (steric + electronic effects)',
            'Alkyl groups reduce electrophilicity by electron donation',
            'Ring strain in small cyclic ketones increases reactivity',
            'Conjugated carbonyls can undergo 1,2 or 1,4 addition'
        ],
        funFact: 'Cyclopropanone is so reactive that it was only first isolated in 1965 and immediately reacts with almost anything. Chemists have to make and use it at very low temperatures!'
    },
    {
        id: 'real-world-applications',
        title: 'Applications in Drug Discovery',
        content: `
Nucleophilic addition to carbonyls is essential in pharmaceutical research.

## Drug Synthesis Examples

**1. 5-HT₃ Agonists (Anti-nausea drugs)**

Many anti-nausea medications contain structures made by:
- Grignard addition to ketones
- Reduction of carbonyls to alcohols

These drugs work by binding to serotonin receptors.

**2. Dapsone Pro-drugs**

Bisulfite addition to aldehydes creates water-soluble pro-drugs:

Drug-CHO + NaHSO₃ → Drug-CH(OH)SO₃Na

The pro-drug is more soluble and releases active drug in the body.

**3. Anticancer Agents**

Many anticancer drugs require:
- C-C bond formation via Grignard
- Selective reduction with NaBH₄
- Stereoselective addition

## The Ferrier Research Institute Approach

Researchers at Victoria University use nucleophilic additions for:

**Carbohydrate Chemistry:**
- Modifying sugar hemiacetals
- Creating glycoside drugs
- Anti-viral compounds

**Natural Product Synthesis:**
- Building complex ring systems
- Installing alcohol stereocenters
- Preparing drug candidates

## Industrial Scale

Carbonyl reductions are performed on:
- Kilogram scale in development
- Ton scale in manufacturing
- >50% of drugs involve at least one carbonyl reaction

## Green Chemistry Considerations

Modern pharmaceutical chemistry focuses on:
- Catalytic methods (less waste)
- Enzyme-catalyzed reactions (high selectivity)
- Safer reducing agents (avoid LiAlH₄ at large scale)
- Recyclable reagents

## Career Connections

Understanding these reactions is essential for:
- Medicinal chemists designing new drugs
- Process chemists scaling up reactions
- Biochemists studying enzyme mechanisms
- Graduate students in organic synthesis
        `,
        keyPoints: [
            'Carbonyl reactions are essential in drug synthesis',
            'Pro-drugs can be made by bisulfite addition',
            'Carbohydrate chemistry relies on hemiacetal/acetal chemistry',
            'Industrial pharmaceutical synthesis uses these reactions at ton scale'
        ],
        funFact: 'About 75% of FDA-approved drugs contain at least one carbonyl group or are made using carbonyl reactions. Learning this chapter literally teaches you how medicines are made!'
    }
];
