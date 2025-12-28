import { ChapterSection } from '../../types';

export const introduction = `Drawing organic molecules is not just about making pretty pictures—it's about communicating chemical reality. In organic chemistry, the structure IS the chemistry. 

Because organic molecules can become very complex, chemists have developed a shorthand way to draw them that is fast, clear, and informative. This chapter will teach you how to "read and write" organic chemistry fluently, from understanding the zig-zag backbone of carbon chains to visualizing the 3D nature of molecules on a 2D page.`;

export const sections: ChapterSection[] = [
    {
        id: "drawing-organic-structures",
        title: "Drawing Organic Structures",
        content: `Drawing molecules correctly is the first step to understanding them. We don't draw every single atom in organic chemistry because it would be too cluttered. Instead, we use **Skeletal Structures**.

**GUIDELINE 1: The Zig-Zag Line**
Carbon chains are drawn as zig-zag lines. Why? Because carbon atoms with single bonds are tetrahedral, with bond angles of roughly 109.5°. A zig-zag line on paper is the best way to represent this 3D shape in 2D.
![Zig Zag Chain](/images/chapter2/zigzag_chain.png)

**GUIDELINE 2: Omit Carbons**
We rarely write the letter 'C'. Any corner (vertex) or endpoint of a line represents a Carbon atom.
*   A line end = a CH₃ group (methyl)
*   A vertex = a CH₂ group (methylene)
*   A vertex with a branch = a CH group (methine)
*   A vertex with 3 branches = a C (quaternary carbon)

**GUIDELINE 3: Omit Hydrogens (mostly)**
We do NOT draw hydrogen atoms attached to carbon. We know carbon always forms 4 bonds. If you see a carbon line end (1 bond), you assume there are 3 invisible hydrogens attached to satisfy the valency.

**CRITICAL EXCEPTION:**
You MUST write out hydrogens attached to **heteroatoms** (atoms that are not C). 
*   Right: -OH, -NH₂
*   Wrong: -O, -N (unless they are actually ions/radicals)

**Common Abbreviations:**
*   **Me**: Methyl (-CH₃)
*   **Et**: Ethyl (-CH₂CH₃)
*   **Pr**: Propyl (-CH₂CH₂CH₃)
*   **Bu**: Butyl (-CH₂CH₂CH₂CH₃)
*   **Ph**: Phenyl (benzene ring group)
*   **Ar**: Aryl group (any aromatic ring)
*   **R**: Any alkyl group/wildcard
*   **Solvents**: THF (Tetrahydrofuran), DMF (Dimethylformamide), DMSO (Dimethyl Sulfoxide)`,
        keyPoints: [
            "Draw carbon chains as zig-zags to mimic 109.5° angles",
            "Carbon atoms are implied at corners and ends of lines",
            "Hydrogen atoms on carbons are omitted (implied)",
            "Hydrogens on Heteroatoms (O, N, S...) MUST be drawn",
            "Learn abbreviations like Me, Et, Ph to save time"
        ],
        funFact: "The zig-zag convention is so universal that if you drew a straight line for a carbon chain, chemists would think you meant a Triple Bond (alkyne) which is actually linear!",
        commonMistake: "Forgetting to draw the H's on heteroatoms. Writing '-O' instead of '-OH' changes the molecule from an alcohol to an alkoxy radical or ion!"
    },
    {
        id: "hydrocarbon-frameworks",
        title: "Hydrocarbon Frameworks",
        content: `The "skeleton" of a molecule is its hydrocarbon framework. It provides the shape and support but is usually not the reactive part.

**Chains:**
The backbone can be a straight chain or branched.
*   **Saturated**: Contains only single bonds (Alkanes).
*   **Unsaturated**: Contains double (Alkenes) or triple bonds (Alkynes).

**Rings:**
Carbon chains can bite their own tails to form rings.
*   **Cyclohexane**: A 6-membered ring (very common).
*   **Benzene**: A special 6-membered ring with alternating double bonds. It is planar and very stable.

Rings can be fused together to create complex structures like steroids (e.g., cholesterol, testosterone).`,
        keyPoints: [
            "Frameworks provide the structure/shape",
            "Saturated = single bonds only",
            "Unsaturated = contains double or triple bonds",
            "Rings are common and can be fused together"
        ]
    },
    {
        id: "functional-groups",
        title: "Functional Groups (The Reactive Parts)",
        content: `If the carbon skeleton is the frame, the **Functional Groups** are the engine. These are specific atoms or groups of atoms that determine HOW the molecule reacts.

Molecules with the same functional group behave similarly. If you learn how an aldehyde reacts, you know how ALL aldehydes react.

![Functional Groups](/images/chapter2/functional_groups_chart.png)

**Key Functional Groups to Know:**

**Hydrocarbons:**
*   **Alkane**: Single bonds only (Not reactive)
*   **Alkene**: C=C double bond (Reactive)
*   **Alkyne**: C≡C triple bond (Reactive)
*   **Arene**: Aromatic ring (Special stability)

**Single Bond to Heteroatom:**
*   **Alcohol**: R-OH
*   **Ether**: R-O-R
*   **Amine**: R-NH₂
*   **Halide**: R-X (X = F, Cl, Br, I)

**Carbonyls (C=O):**
*   **Aldehyde**: R-CHO (Carbonyl at end)
*   **Ketone**: R-CO-R (Carbonyl in middle)
*   **Carboxylic Acid**: R-COOH (Acidic!)
*   **Ester**: R-COOR (Sweet smells)
*   **Amide**: R-CONH₂ (In proteins)
*   **Acyl Chloride**: R-COCl (Very reactive)
*   **Nitro Group**: R-NO₂ (Explosive potential)
*   **Acetal**: R-C(OR)₂-H (Two ether groups on same carbon)

> [!TIP]
> **Key Reactivity Patterns:**
> *   **Alcohols**: Nucleophiles (attack positive things) or Acids (lose H⁺).
> *   **Carbonyls (C=O)**: Electrophiles at the C (attacked by negatives).
> *   **Amines**: Bases (grab H⁺) and Nucleophiles.
`,
        keyPoints: [
            "Functional groups determine chemical reactivity",
            "Alcohols contain -OH groups",
            "Carbonyls contain C=O double bonds",
            "Aldehydes vs Ketones: Position of C=O matters",
            "Carboxylic acids are acidic; Amines are basic"
        ],
        realWorldConnection: "The smell of bananas comes from an ESTER (isoamyl acetate). The smell of rotting fish comes from an AMINE (trimethylamine). Functional groups determine what your nose detects!"
    },
    {
        id: "oxidation-levels",
        title: "Classification by Oxidation Level",
        content: `A useful way to organize organic chemistry is by **Oxidation Level**. This is defined by how many bonds a carbon has to a **Heteroatom** (more electronegative atom).

**Level 0 (Alkanes)**
*   No bonds to heteroatoms.
*   Example: Ethane (CH₃-CH₃)

**Level 1 (Alcohols, Amines, Halides)**
*   **One bond** to a heteroatom.
*   Example: Ethanol (CH₃-CH₂-OH), Ethylamine

**Level 2 (Carbonyls)**
*   **Two bonds** to heteroatoms.
*   Example: Ethanal (Aldehyde), Acetone (Ketone)
*   Note: A C=O double bond counts as 2 bonds!

**Level 3 (Carboxylic Acids, Esters, Amides, Nitriles)**
*   **Three bonds** to heteroatoms.
*   Example: Acetic Acid (CH₃-COOH), Acetonitrile (CH₃-CN)

**Level 4 (Carbon Dioxide)**
*   **Four bonds** to heteroatoms.
*   Example: CO₂, Carbonates.

Moving from Level 0 → 4 is **Oxidation**.
Moving from Level 4 → 0 is **Reduction**.

### Visual Oxidation Series

See how the number of bonds to oxygen increases?

**Level 0: Alkane** (Ethane) --[Oxidation]--> **Level 2: Aldehyde** (Acetaldehyde) --[Oxidation]--> **Level 3: Carboxylic Acid** (Acetic Acid)`,
        keyPoints: [
            "Classification based on bonds to heteroatoms (O, N, X)",
            "Level 0: Hydrocarbons",
            "Level 1: Alcohols/Amines (1 bond)",
            "Level 2: Aldehydes/Ketones (2 bonds)",
            "Level 3: Acids/Esters (3 bonds)",
            "Level 4: CO₂ (4 bonds)"
        ],
        commonMistake: "Thinking oxidation always involves Oxygen. Transforming an alkane to an alkyl chloride (C-H -> C-Cl) is also an oxidation!",
        molecules: [
            { name: "Ethane", description: "Level 0: No bonds to heteroatoms" },
            { name: "Acetaldehyde", description: "Level 2: Two bonds to oxygen (C=O)" },
            { name: "Acetic Acid", description: "Level 3: Three bonds to oxygen" }
        ]
    },
    {
        id: "naming-compounds",
        title: "Naming Compounds",
        content: `There are two languages in organic chemistry:
1.  **Systematic (IUPAC) Names**: Precise, logical, rule-based. Everyone understands them.
2.  **Common (Trivial) Names**: Historical, widely used in industry/labs.

**Basic IUPAC Rules:**
1.  **Longest Chain**: Find the longest continuous carbon chain. This is the parent name (e.g., 5 carbons = Pentane).
2.  **Numbering**: Number the chain to give the functional group the lowest number.
3.  **Substituents**: Name branches (methyl, ethyl) and list them alphabetically.

**Examples:**
*   Systematic: **Propanone** vs Common: **Acetone**
*   Systematic: **Ethanoic Acid** vs Common: **Acetic Acid**
*   Systematic: **Trichloromethane** vs Common: **Chloroform**
*   Systematic: **Propan-1-ol** vs **Propan-2-ol** (Numbering is key!)

For very complex molecules like **Strychnine** or **Vitamin B12**, we almost exclusively use the common name because the systematic name would be lines long!

You typically need to know both!`,
        molecules: [
            { name: "Acetone", description: "Common name for Propanone" },
            { name: "Acetic Acid", description: "Common name for Ethanoic Acid" }
        ],
        keyPoints: [
            "IUPAC names are systematic and unique",
            "Common names are historical but very common in practice",
            "Rule 1: Always find the longest carbon chain first",
            "Number from the end closest to the functional group"
        ]
    },
    {
        id: "3d-representation",
        title: "3D Representation in 2D",
        content: `Molecules are 3D objects, but paper is 2D. To show depth, we use **Wedge and Dash** bonds.

![Wedge Dash Bond](/images/chapter2/wedge_dash_bond.png)

*   **Solid Line**: Bond is flat in the plane of the paper.
*   **Wedge (Solid Triangle)**: Bond is coming **OUT** towards you.
*   **Dash (Hashed Line)**: Bond is going **IN** away from you.

**Why does this matter?**
Biochemistry depends on shape. An enzyme might only accept a molecule where a specific group is pointing "up" (wedge) and not "down" (dash). This concept leads to Stereochemistry (Chapter 4).`,
        keyPoints: [
            "Molecules are 3D objects",
            "Wedge = Out (towards viewer)",
            "Dash = In (away from viewer)",
            "Crucial for stereochemistry and biology"
        ]
    }
];
