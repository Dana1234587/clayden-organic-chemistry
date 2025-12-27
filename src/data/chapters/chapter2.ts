import { ChapterData } from './chapter1';

export const chapter2: ChapterData = {
    id: 2,
    title: "Organic Structures",
    subtitle: "How to draw, read, and understand organic molecules",
    estimatedTime: 55,
    introduction: `Every science has its own language, and organic chemistry is no exception. Before we can explore 
  reactions and mechanisms, we need to learn how organic chemists communicate about molecular structures. 
  In this chapter, you'll learn the essential skills of drawing and interpreting organic molecules—from 
  full structural formulas to the elegant shorthand that chemists use every day. You'll discover how 
  functional groups give molecules their chemical personalities, and how to identify the different types 
  of carbon atoms in a molecule.`,

    learningObjectives: [
        "Draw organic molecules using skeletal (line) notation",
        "Understand the zigzag convention for carbon chains",
        "Identify and name common functional groups",
        "Distinguish between alkanes, alkenes, and alkynes",
        "Classify carbon atoms as primary (1°), secondary (2°), or tertiary (3°)",
        "Recognize saturated vs unsaturated hydrocarbons",
        "Interpret complex ring systems and heterocycles",
        "Understand the 'R' group notation for substituents"
    ],

    flashcards: [
        { id: "fc2-1", front: "What does a vertex in skeletal formula represent?", back: "A carbon atom with enough hydrogens to complete 4 bonds", category: "Drawing" },
        { id: "fc2-2", front: "What is skeletal (line) notation?", back: "A simplified way to draw organic molecules where carbons are implied at vertices and line ends", category: "Drawing" },
        { id: "fc2-3", front: "How many hydrogens does a carbon with 2 bonds in skeletal notation have?", back: "2 hydrogens (carbon always makes 4 bonds total)", category: "Drawing" },
        { id: "fc2-4", front: "What is a functional group?", back: "A specific group of atoms that gives a molecule its characteristic chemical properties", category: "Functional Groups" },
        { id: "fc2-5", front: "What functional group is -OH?", back: "Hydroxyl group (found in alcohols)", category: "Functional Groups" },
        { id: "fc2-6", front: "What is the carbonyl group?", back: "C=O (a carbon double-bonded to oxygen)", category: "Functional Groups" },
        { id: "fc2-7", front: "What is a primary (1°) carbon?", back: "A carbon bonded to only ONE other carbon", category: "Carbon Types" },
        { id: "fc2-8", front: "What is a secondary (2°) carbon?", back: "A carbon bonded to TWO other carbons", category: "Carbon Types" },
        { id: "fc2-9", front: "What is a tertiary (3°) carbon?", back: "A carbon bonded to THREE other carbons", category: "Carbon Types" },
        { id: "fc2-10", front: "What is a quaternary (4°) carbon?", back: "A carbon bonded to FOUR other carbons (no hydrogens)", category: "Carbon Types" },
        { id: "fc2-11", front: "What is the difference between saturated and unsaturated?", back: "Saturated = all single bonds. Unsaturated = contains double or triple bonds", category: "Hydrocarbons" },
        { id: "fc2-12", front: "What is the general formula for alkanes?", back: "CₙH₂ₙ₊₂ (e.g., methane CH₄, ethane C₂H₆)", category: "Hydrocarbons" },
        { id: "fc2-13", front: "What does 'R' represent in organic chemistry?", back: "Any alkyl group or hydrocarbon substituent (placeholder for any organic group)", category: "Notation" },
        { id: "fc2-14", front: "What is a carboxylic acid group?", back: "-COOH (carbonyl + hydroxyl, written as -CO₂H)", category: "Functional Groups" },
        { id: "fc2-15", front: "What is an ester group?", back: "-COO- (carbonyl bonded to an oxygen bonded to another carbon)", category: "Functional Groups" },
        { id: "fc2-16", front: "How do you identify an aldehyde vs a ketone?", back: "Aldehyde: C=O at end of chain. Ketone: C=O in middle of chain", category: "Functional Groups" },
        { id: "fc2-17", front: "What is a heterocycle?", back: "A ring containing atoms other than carbon (like N, O, or S)", category: "Rings" },
        { id: "fc2-18", front: "Name the 6-carbon straight chain alkane", back: "Hexane (hex = 6)", category: "Naming" },
        { id: "fc2-19", front: "What suffix indicates an alcohol?", back: "-ol (as in methanol, ethanol, propanol)", category: "Naming" },
        { id: "fc2-20", front: "What suffix indicates a carboxylic acid?", back: "-oic acid (as in ethanoic acid = acetic acid)", category: "Naming" },
    ],

    glossary: [
        { id: "g2-1", term: "Skeletal Formula", definition: "A simplified representation of organic molecules where carbon atoms are shown as vertices and line endpoints, with hydrogen atoms implied.", category: "Drawing", example: "A zigzag line with 4 vertices represents pentane (5 carbons)." },
        { id: "g2-2", term: "Functional Group", definition: "A specific group of atoms within a molecule that determines the molecule's characteristic chemical reactions.", category: "Functional Groups", relatedTerms: ["Hydroxyl", "Carbonyl", "Carboxyl"] },
        { id: "g2-3", term: "Hydroxyl Group", definition: "The -OH functional group, characteristic of alcohols.", category: "Functional Groups", example: "Ethanol (CH₃CH₂OH) contains a hydroxyl group." },
        { id: "g2-4", term: "Carbonyl Group", definition: "A carbon-oxygen double bond (C=O), found in aldehydes, ketones, carboxylic acids, and esters.", category: "Functional Groups" },
        { id: "g2-5", term: "Alkane", definition: "A saturated hydrocarbon containing only single bonds between carbon atoms.", category: "Hydrocarbons", example: "Methane (CH₄), ethane (C₂H₆), propane (C₃H₈)" },
        { id: "g2-6", term: "Alkene", definition: "An unsaturated hydrocarbon containing at least one carbon-carbon double bond.", category: "Hydrocarbons", example: "Ethene (C₂H₄), propene (C₃H₆)" },
        { id: "g2-7", term: "Alkyne", definition: "An unsaturated hydrocarbon containing at least one carbon-carbon triple bond.", category: "Hydrocarbons", example: "Ethyne/acetylene (C₂H₂)" },
        { id: "g2-8", term: "Saturated", definition: "A hydrocarbon that contains only single bonds and the maximum number of hydrogen atoms.", category: "Hydrocarbons", relatedTerms: ["Alkane", "Unsaturated"] },
        { id: "g2-9", term: "Unsaturated", definition: "A hydrocarbon that contains double or triple bonds and fewer than the maximum hydrogen atoms.", category: "Hydrocarbons" },
        { id: "g2-10", term: "Primary Carbon (1°)", definition: "A carbon atom bonded to only one other carbon atom.", category: "Carbon Types" },
        { id: "g2-11", term: "Secondary Carbon (2°)", definition: "A carbon atom bonded to two other carbon atoms.", category: "Carbon Types" },
        { id: "g2-12", term: "Tertiary Carbon (3°)", definition: "A carbon atom bonded to three other carbon atoms.", category: "Carbon Types" },
        { id: "g2-13", term: "Quaternary Carbon (4°)", definition: "A carbon atom bonded to four other carbon atoms (no hydrogens).", category: "Carbon Types" },
        { id: "g2-14", term: "R Group", definition: "A placeholder symbol used to represent any alkyl group or substituent in general formulas.", category: "Notation" },
        { id: "g2-15", term: "Heterocycle", definition: "A cyclic compound where the ring contains atoms other than carbon, typically nitrogen, oxygen, or sulfur.", category: "Rings", example: "Pyridine (contains nitrogen), furan (contains oxygen)" },
        { id: "g2-16", term: "Carboxylic Acid", definition: "A functional group containing both a carbonyl and a hydroxyl group (-COOH).", category: "Functional Groups", example: "Acetic acid (vinegar), formic acid (ant venom)" },
        { id: "g2-17", term: "Ester", definition: "A functional group formed when a carboxylic acid reacts with an alcohol (-COO-).", category: "Functional Groups", example: "Ethyl acetate (nail polish remover scent)" },
        { id: "g2-18", term: "Aldehyde", definition: "A functional group with a carbonyl at the end of a carbon chain (-CHO).", category: "Functional Groups", example: "Formaldehyde, acetaldehyde" },
        { id: "g2-19", term: "Ketone", definition: "A functional group with a carbonyl in the middle of a carbon chain.", category: "Functional Groups", example: "Acetone (nail polish remover)" },
        { id: "g2-20", term: "Amine", definition: "A functional group containing nitrogen bonded to carbons (-NH₂, -NHR, or -NR₂).", category: "Functional Groups", example: "Methylamine, found in rotting fish" },
    ],

    sections: [
        {
            id: "drawing-organic-molecules",
            title: "Drawing Organic Molecules",
            content: `Organic chemists have developed a shorthand for drawing molecules that would be impossibly 
      tedious to draw in full. The key insight is simple: carbon is everywhere in organic molecules, 
      so we don't always need to draw it explicitly.
      
      FULL STRUCTURAL FORMULA:
      The most detailed way to draw a molecule shows every atom and every bond. For simple molecules 
      like methane (CH₄), this works fine. But imagine drawing a molecule with 50 carbons—you'd 
      need to draw every single C and every single H!
      
      CONDENSED FORMULA:
      A middle ground where we group atoms together. Ethanol becomes CH₃CH₂OH. The bonds are implied 
      by how atoms are grouped together.
      
      SKELETAL (LINE) FORMULA:
      The most elegant shorthand. Here's how it works:
      • Each vertex (corner) represents a carbon atom
      • Each line end represents a carbon atom
      • Hydrogens on carbon are NOT drawn—they're implied
      • Heteroatoms (O, N, S, etc.) ARE explicitly shown
      • All hydrogens on heteroatoms ARE drawn
      
      To count hydrogens on any carbon, remember: carbon always forms 4 bonds. If a carbon shows 
      2 lines connecting to it, it has 2 hydrogens. If it shows 3 lines, it has 1 hydrogen.`,
            keyPoints: [
                "Skeletal formulas show carbons as vertices and line ends",
                "Hydrogens on carbon are implied (not drawn)",
                "Heteroatoms (O, N, etc.) are always shown explicitly",
                "Carbon always has 4 bonds—use this to count implied hydrogens"
            ],
            funFact: "August Kekulé reportedly dreamed of a snake biting its own tail, inspiring the cyclic structure of benzene! Dreams can lead to scientific breakthroughs.",
            commonMistake: "Forgetting that each vertex has IMPLIED hydrogens. A 'bare' vertex isn't just carbon—it's carbon plus hydrogens to make 4 bonds total."
        },
        {
            id: "zigzag-notation",
            title: "The Zigzag Convention",
            content: `When drawing carbon chains in skeletal notation, chemists use a zigzag pattern. This 
      isn't just for aesthetics—it represents how the tetrahedral geometry of sp³ carbons 
      arranges bonds in three dimensions.
      
      WHY ZIGZAG?
      In a tetrahedral carbon, bonds point to the corners of a tetrahedron (109.5° angles). When 
      we draw this in 2D, the zigzag pattern best represents this geometry when the chain is 
      in its most extended (anti) conformation.
      
      READING THE ZIGZAG:
      • Each bend (vertex) = 1 carbon
      • Each end of the chain = 1 carbon
      • Count the vertices plus the two ends to get total carbons
      
      EXAMPLE - HEXANE (6 carbons):
      Draw a line with 5 bends → that's 5 vertices + 2 ends... wait, that's 7! Actually, the 
      ends ARE the first and last vertices, so 5 bends = 6 carbons.
      
      The easiest way: count all the points where lines meet or end. That's your carbon count!
      
      BRANCHED CHAINS:
      When a chain branches, draw the main chain as a zigzag, then add branches coming off 
      at each vertex. Remember: a branched carbon still only has 4 bonds total.`,
            keyPoints: [
                "Zigzag pattern represents tetrahedral geometry in 2D",
                "Count vertices AND line ends to count carbons",
                "Main chain runs along the zigzag; branches stick out",
                "This convention is universal among organic chemists worldwide"
            ],
            realWorldConnection: "This notation is so standard that pharmaceutical patents, research papers, and drug databases all use skeletal formulas. Learning this is like learning the alphabet of organic chemistry!",
            commonMistake: "Drawing chains straight instead of zigzag. While technically correct, it looks unprofessional and makes it harder to see structural details."
        },
        {
            id: "hydrocarbon-frameworks",
            title: "Hydrocarbon Frameworks",
            content: `Hydrocarbons—molecules containing only carbon and hydrogen—form the backbone of organic 
      chemistry. Understanding their classification is essential.
      
      ALKANES (Saturated Hydrocarbons):
      • All single bonds (C-C)
      • General formula: CₙH₂ₙ₊₂
      • Most stable, least reactive
      • Examples: methane CH₄, ethane C₂H₆, propane C₃H₈
      
      ALKENES (Unsaturated - Double Bonds):
      • Contains at least one C=C double bond
      • General formula: CₙH₂ₙ (for one double bond)
      • More reactive than alkanes
      • Examples: ethene C₂H₄, propene C₃H₆
      
      ALKYNES (Unsaturated - Triple Bonds):
      • Contains at least one C≡C triple bond
      • General formula: CₙH₂ₙ₋₂ (for one triple bond)
      • Very reactive
      • Examples: ethyne (acetylene) C₂H₂
      
      CYCLIC HYDROCARBONS:
      When the carbon chain forms a ring, we prefix with "cyclo-":
      • Cyclohexane: 6-carbon ring, all single bonds
      • Cyclohexene: 6-carbon ring with one double bond
      • Benzene: special 6-carbon ring with alternating double bonds (aromatic)
      
      NAMING CONVENTION:
      • 1 carbon = meth-
      • 2 carbons = eth-
      • 3 carbons = prop-
      • 4 carbons = but-
      • 5 carbons = pent-
      • 6 carbons = hex-
      • 7 carbons = hept-
      • 8 carbons = oct-
      • Then add -ane (single bonds), -ene (double), -yne (triple)`,
            molecules: [
                { name: "Methane", description: "Simplest alkane (CH₄) - natural gas" },
                { name: "Benzene", description: "Aromatic ring - parent of many compounds" }
            ],
            keyPoints: [
                "Alkanes: all single bonds, CₙH₂ₙ₊₂",
                "Alkenes: contain C=C double bonds, CₙH₂ₙ",
                "Alkynes: contain C≡C triple bonds, CₙH₂ₙ₋₂",
                "Prefix indicates carbon count (meth-, eth-, prop-, etc.)",
                "Suffix indicates bond type (-ane, -ene, -yne)"
            ],
            funFact: "Acetylene (ethyne) burns so hot that it's used in welding torches to cut through steel! The triple bond stores enormous energy.",
            realWorldConnection: "Your car runs on a mixture of alkanes (gasoline). Propane heats your grill. Methane is natural gas. These simple molecules power our world!"
        },
        {
            id: "primary-secondary-tertiary",
            title: "Primary, Secondary, and Tertiary Carbons",
            content: `Not all carbon atoms are created equal! We classify them by how many OTHER carbons 
      they're connected to.
      
      PRIMARY CARBON (1°):
      • Connected to only ONE other carbon
      • Usually at the end of a chain
      • Has the most hydrogens (typically CH₃)
      • Symbol: 1° or primary
      
      SECONDARY CARBON (2°):
      • Connected to TWO other carbons
      • Found in the middle of unbranched chains
      • Typically has 2 hydrogens (-CH₂-)
      • Symbol: 2° or secondary
      
      TERTIARY CARBON (3°):
      • Connected to THREE other carbons
      • Found at branch points
      • Has only 1 hydrogen
      • Symbol: 3° or tertiary
      
      QUATERNARY CARBON (4°):
      • Connected to FOUR other carbons
      • No hydrogens at all!
      • Found at major branching points
      • Symbol: 4° or quaternary
      
      WHY THIS MATTERS:
      The classification affects reactivity! In many reactions:
      • 3° carbons are most stable as carbocations
      • 1° carbons are most accessible for substitution
      • 2° carbons are somewhere in between
      
      HYDROGEN CLASSIFICATION:
      The same system applies to hydrogens:
      • Primary H = hydrogen on a primary carbon
      • Secondary H = hydrogen on a secondary carbon
      • Tertiary H = hydrogen on a tertiary carbon
      
      This affects which hydrogens are removed in reactions!`,
            keyPoints: [
                "1° carbon: bonded to 1 other carbon",
                "2° carbon: bonded to 2 other carbons",
                "3° carbon: bonded to 3 other carbons",
                "4° carbon: bonded to 4 other carbons (no H!)",
                "Classification affects reactivity and stability"
            ],
            commonMistake: "Counting bonds to hydrogen when classifying carbons. Only count bonds to OTHER CARBON atoms, not to hydrogen!",
            funFact: "The famous SN1 reaction strongly prefers tertiary carbons because they form the most stable carbocations. You'll learn why in later chapters!"
        },
        {
            id: "functional-groups-intro",
            title: "Introduction to Functional Groups",
            content: `A functional group is like a molecule's personality—it determines how the molecule 
      behaves chemically. The carbon skeleton provides structure, but functional groups 
      provide reactivity.
      
      WHAT IS A FUNCTIONAL GROUP?
      A specific arrangement of atoms that gives predictable chemical properties. If you know 
      the functional group, you can predict how the molecule will react!
      
      THE MOST IMPORTANT FUNCTIONAL GROUPS:
      
      ALCOHOLS (-OH):
      • Hydroxyl group bonded to carbon
      • Named with -ol suffix (methanol, ethanol)
      • Polar, forms hydrogen bonds
      • Found in beverages, solvents, fuels
      
      ETHERS (C-O-C):
      • Oxygen between two carbons
      • Less polar than alcohols
      • Used as anesthetics, solvents
      
      AMINES (-NH₂, -NHR, -NR₂):
      • Nitrogen bonded to carbons
      • Basic (accept protons)
      • Found in proteins, drugs, DNA
      
      THIOLS (-SH):
      • Sulfur version of alcohols
      • Very smelly! (skunk spray, garlic)
      • Found in proteins (cysteine)
      
      The "R" in these formulas represents any hydrocarbon group. It's a placeholder that 
      lets us describe the general structure without specifying the exact molecule.`,
            keyPoints: [
                "Functional groups determine chemical reactivity",
                "Alcohols (-OH) are polar and form hydrogen bonds",
                "Amines (-NH₂) are basic (accept protons)",
                "Thiols (-SH) are smelly sulfur compounds",
                "'R' represents any organic substituent"
            ],
            realWorldConnection: "Knowing functional groups lets you predict properties. Alcohols dissolve in water. Amines smell fishy. Thiols smell terrible. These patterns are reliable once you learn them!",
            funFact: "The smell of rotting fish is caused by amines like trimethylamine. Your nose is incredibly sensitive to these nitrogen-containing molecules!"
        },
        {
            id: "carbonyl-compounds",
            title: "Carbonyl Compounds",
            content: `The carbonyl group (C=O) is perhaps the most important functional group in organic 
      chemistry. It appears in aldehydes, ketones, carboxylic acids, esters, amides, and more!
      
      ALDEHYDES (-CHO):
      • Carbonyl at the END of a carbon chain
      • Named with -al suffix (methanal, ethanal)
      • Formaldehyde (methanal): preservative, found in building materials
      • Acetaldehyde (ethanal): hangover molecule!
      
      KETONES (>C=O):
      • Carbonyl in the MIDDLE of a carbon chain
      • Named with -one suffix (propanone, butanone)
      • Acetone (propanone): nail polish remover
      • Important in metabolism (ketone bodies)
      
      CARBOXYLIC ACIDS (-COOH):
      • Carbonyl + hydroxyl on the same carbon
      • Named with -oic acid suffix
      • Acetic acid (ethanoic acid): vinegar
      • Formic acid: ant venom!
      • Key group in amino acids
      
      ESTERS (-COO-):
      • Carbonyl bonded to oxygen bonded to carbon
      • Named as [alcohol part] [acid part]-ate
      • Pleasant fruity smells!
      • Fats and oils are esters
      
      KEY DIFFERENCE:
      • Aldehyde: at least ONE hydrogen on the carbonyl carbon
      • Ketone: NO hydrogens on the carbonyl carbon
      
      This distinction matters because aldehydes are more easily oxidized than ketones.`,
            molecules: [
                { name: "Vanillin", description: "Aldehyde - the smell of vanilla" },
                { name: "Aspirin", description: "Ester + carboxylic acid" }
            ],
            keyPoints: [
                "Carbonyl (C=O) is found in many functional groups",
                "Aldehyde: carbonyl at end of chain (-CHO)",
                "Ketone: carbonyl in middle of chain (>C=O)",
                "Carboxylic acid: carbonyl + hydroxyl (-COOH)",
                "Ester: carbonyl + bridging oxygen (-COO-)"
            ],
            funFact: "The fruity smell of bananas, apples, and pears all come from different esters! Isoamyl acetate smells like bananas, ethyl butyrate like pineapples.",
            commonMistake: "Confusing aldehydes and ketones. Remember: aldehydes are at the END (and have H on carbonyl), ketones are in the MIDDLE."
        },
        {
            id: "ring-systems",
            title: "Ring Systems and Heterocycles",
            content: `Many important organic molecules contain rings. Some contain only carbon (carbocycles), 
      while others include other atoms (heterocycles).
      
      CARBOCYCLES:
      Rings containing only carbon:
      • Cyclopropane (3 carbons) - very strained!
      • Cyclobutane (4 carbons)
      • Cyclopentane (5 carbons)
      • Cyclohexane (6 carbons) - most stable
      
      Ring strain affects stability—3 and 4-membered rings are less stable because bond 
      angles are forced away from the ideal 109.5°.
      
      HETEROCYCLES:
      Rings containing atoms other than carbon:
      
      NITROGEN HETEROCYCLES:
      • Pyrrole: 5-membered ring with N (found in hemoglobin)
      • Pyridine: 6-membered ring with N (like benzene with N)
      • Imidazole: 5-membered ring with 2 N atoms (in histidine)
      
      OXYGEN HETEROCYCLES:
      • Furan: 5-membered ring with O
      • Pyran: 6-membered ring with O (in sugars!)
      • Tetrahydrofuran (THF): common solvent
      
      SULFUR HETEROCYCLES:
      • Thiophene: 5-membered ring with S
      • Used in some pharmaceuticals
      
      BIOLOGICAL IMPORTANCE:
      DNA bases are heterocycles! Adenine, guanine, cytosine, thymine—all contain 
      nitrogen heterocycles. Life is built on these ring structures.`,
            keyPoints: [
                "Carbocycles contain only carbon in the ring",
                "Heterocycles contain N, O, or S in the ring",
                "6-membered rings are most stable (least ring strain)",
                "DNA bases are nitrogen heterocycles",
                "Ring strain decreases stability in small rings"
            ],
            funFact: "Caffeine contains two fused nitrogen heterocycles—a purine ring system. Coffee, tea, and chocolate all contain this aromatic heterocyclic structure!",
            realWorldConnection: "Most drugs are heterocycles! About 85% of all pharmaceuticals contain at least one heterocyclic ring. Learning these structures is essential for medicinal chemistry."
        },
        {
            id: "r-group-notation",
            title: "The 'R' Group Convention",
            content: `When organic chemists write general reactions or describe functional groups, they often 
      use 'R' to represent "any organic group." This is incredibly useful shorthand.
      
      WHAT IS R?
      R stands for any alkyl group—any arrangement of carbon and hydrogen atoms. It could be:
      • CH₃ (methyl)
      • CH₃CH₂ (ethyl)
      • A complex branched structure
      • Even a ring!
      
      WHY USE R?
      It lets us write GENERAL formulas:
      • ROH = any alcohol
      • RNH₂ = any primary amine
      • RCOOH = any carboxylic acid
      • ROR' = any ether (two different R groups!)
      
      MULTIPLE R GROUPS:
      When a molecule has multiple organic groups, we use R, R', R'', etc.:
      • Ketone: RCOR' (two potentially different groups)
      • Tertiary amine: NR₃ or NRR'R''
      
      SPECIFIC GROUPS:
      Sometimes we get more specific:
      • Me = CH₃ (methyl)
      • Et = CH₃CH₂ (ethyl)
      • Pr = CH₃CH₂CH₂ (propyl)
      • iPr = (CH₃)₂CH (isopropyl)
      • Bu = butyl (4 carbons)
      • Ph = phenyl (benzene ring without one H)
      
      LDA - A FAMOUS EXAMPLE:
      Lithium diisopropylamide (LDA) is written with iPr groups because it uses 
      isopropyl substituents on nitrogen. It's one of the most important bases in 
      organic synthesis!`,
            keyPoints: [
                "R represents any alkyl (organic) group",
                "ROH means any alcohol, RCOOH means any carboxylic acid",
                "R' and R'' indicate different groups",
                "Me = methyl, Et = ethyl, Ph = phenyl",
                "This notation allows writing general reactions"
            ],
            commonMistake: "Thinking R can only be simple groups. R can be incredibly complex—a 50-carbon chain with rings and branches is still just 'R' when focusing on the functional group!",
            realWorldConnection: "Drug discovery uses R-group notation extensively. Medicinal chemists might synthesize 50 versions of a drug, changing only the R group to find the best one."
        }
    ],

    miniQuizzes: [
        {
            id: "mq2-1",
            afterSection: "zigzag-notation",
            questions: [
                {
                    question: "In a skeletal formula, what does each vertex represent?",
                    options: ["A hydrogen atom", "A carbon atom", "An oxygen atom", "A bond"],
                    correctIndex: 1,
                    hint: "Think about what's implied at each corner!"
                },
                {
                    question: "If a vertex has 2 lines going to it, how many hydrogens does that carbon have?",
                    options: ["0", "1", "2", "3"],
                    correctIndex: 2,
                    hint: "Carbon always makes 4 bonds total..."
                }
            ]
        },
        {
            id: "mq2-2",
            afterSection: "primary-secondary-tertiary",
            questions: [
                {
                    question: "A carbon bonded to 3 other carbons is called:",
                    options: ["Primary", "Secondary", "Tertiary", "Quaternary"],
                    correctIndex: 2,
                    hint: "Count the number of carbon-carbon bonds"
                },
                {
                    question: "Which type of carbon has NO hydrogens attached?",
                    options: ["Primary", "Secondary", "Tertiary", "Quaternary"],
                    correctIndex: 3,
                    hint: "All 4 bonds go to other carbons..."
                }
            ]
        },
        {
            id: "mq2-3",
            afterSection: "carbonyl-compounds",
            questions: [
                {
                    question: "What distinguishes an aldehyde from a ketone?",
                    options: [
                        "Aldehydes are larger molecules",
                        "Aldehydes have carbonyl at the end of the chain",
                        "Ketones are more polar",
                        "Ketones are always cyclic"
                    ],
                    correctIndex: 1,
                    hint: "Think about where the carbonyl group is positioned"
                }
            ]
        }
    ],

    quiz: [
        {
            id: 1,
            question: "In a skeletal formula, how many hydrogens are on a carbon that shows 3 bonds?",
            options: ["0", "1", "2", "3"],
            correctIndex: 1,
            explanation: "Carbon always forms 4 bonds. If 3 are shown, 1 is to hydrogen (4 - 3 = 1).",
            difficulty: "easy"
        },
        {
            id: 2,
            question: "What is the general formula for an alkane?",
            options: ["CₙH₂ₙ", "CₙH₂ₙ₊₂", "CₙH₂ₙ₋₂", "CₙHₙ"],
            correctIndex: 1,
            explanation: "Alkanes are saturated hydrocarbons with formula CₙH₂ₙ₊₂. For methane (n=1): CH₄.",
            difficulty: "easy"
        },
        {
            id: 3,
            question: "Which functional group is characteristic of alcohols?",
            options: ["-COOH", "-CHO", "-OH", "-NH₂"],
            correctIndex: 2,
            explanation: "The hydroxyl group (-OH) defines alcohols. Examples: methanol, ethanol, propanol.",
            difficulty: "easy"
        },
        {
            id: 4,
            question: "A carbon at a branch point connected to 3 other carbons is:",
            options: ["Primary", "Secondary", "Tertiary", "Quaternary"],
            correctIndex: 2,
            explanation: "Tertiary (3°) carbons are bonded to exactly 3 other carbon atoms.",
            difficulty: "medium"
        },
        {
            id: 5,
            question: "What does 'R' represent in organic chemistry notation?",
            options: [
                "A ring structure only",
                "Any alkyl (organic) group",
                "A radical species",
                "A reactive intermediate"
            ],
            correctIndex: 1,
            explanation: "R is a placeholder for any organic group—methyl, ethyl, or even complex structures.",
            difficulty: "easy"
        },
        {
            id: 6,
            question: "Which is the correct suffix for a carboxylic acid?",
            options: ["-ol", "-al", "-one", "-oic acid"],
            correctIndex: 3,
            explanation: "Carboxylic acids use the suffix -oic acid (e.g., ethanoic acid, propanoic acid).",
            difficulty: "medium"
        },
        {
            id: 7,
            question: "What type of compound has a carbonyl at the END of a carbon chain?",
            options: ["Ketone", "Aldehyde", "Ester", "Ether"],
            correctIndex: 1,
            explanation: "Aldehydes have the carbonyl (C=O) at the end. Ketones have it in the middle.",
            difficulty: "medium"
        },
        {
            id: 8,
            question: "A heterocycle is a ring that contains:",
            options: [
                "Only carbon atoms",
                "Atoms other than carbon (like N, O, S)",
                "Only 6 members",
                "Double bonds only"
            ],
            correctIndex: 1,
            explanation: "Heterocycles contain heteroatoms (non-carbon atoms) like nitrogen, oxygen, or sulfur.",
            difficulty: "medium"
        },
        {
            id: 9,
            question: "Which hydrocarbon type contains a C≡C triple bond?",
            options: ["Alkane", "Alkene", "Alkyne", "Arene"],
            correctIndex: 2,
            explanation: "Alkynes contain triple bonds. Alkanes have single bonds, alkenes have double bonds.",
            difficulty: "easy"
        },
        {
            id: 10,
            question: "Acetone (propanone) is an example of a:",
            options: ["Aldehyde", "Ketone", "Carboxylic acid", "Alcohol"],
            correctIndex: 1,
            explanation: "Acetone has a carbonyl in the middle of the chain (between two methyl groups), making it a ketone.",
            difficulty: "medium"
        },
        {
            id: 11,
            question: "The abbreviation 'Ph' in organic chemistry stands for:",
            options: ["Phosphorus", "Phenyl (benzene ring)", "Phenylalanine", "Phosphate"],
            correctIndex: 1,
            explanation: "Ph represents a phenyl group—a benzene ring with one hydrogen removed for bonding.",
            difficulty: "medium"
        },
        {
            id: 12,
            question: "Why do organic chemists draw chains in a zigzag pattern?",
            options: [
                "It looks nicer",
                "It represents the tetrahedral geometry of sp³ carbons",
                "It saves space",
                "It's required by international standards"
            ],
            correctIndex: 1,
            explanation: "The zigzag represents how tetrahedral carbons (109.5° angles) arrange in 3D space.",
            difficulty: "medium"
        }
    ]
};
