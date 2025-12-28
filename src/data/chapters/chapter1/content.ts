import { ChapterSection } from '../../types';

export const introduction = `Organic chemistry is the study of carbon-containing compounds and their properties, reactions, and synthesis. 
  It touches every aspect of our lives—from the food we eat to the medicines that keep us healthy, from the clothes we wear 
  to the fuels that power our world. In this chapter, we'll explore why carbon is so special and discover how organic 
  chemistry shapes our daily experiences. We'll learn how organic chemists in the 19th century revolutionized industry,
  and how the molecules around us communicate with our senses through smell, taste, and vision.`;

export const sections: ChapterSection[] = [
  {
    id: "organic-chemistry-and-you",
    title: "Organic Chemistry and You",
    content: `Every moment of your life involves organic chemistry. Right now, as you read this, organic molecules 
      are at work in your body in remarkable ways.
      
      VISION: When light enters your eye, it strikes a molecule called 11-cis-retinal in your retina. This molecule 
      absorbs the light and instantly changes its shape—a double bond switches from cis to trans configuration. This 
      tiny molecular change triggers a cascade of signals that your brain interprets as vision. Without this organic 
      molecule, you couldn't read these words!
      
      MOOD: Your emotions are influenced by serotonin, a neurotransmitter that is an organic molecule. When serotonin 
      binds to receptors in your brain, it affects your mood, sleep, and appetite. Antidepressant medications work 
      by altering serotonin levels in the brain.
      
      TASTE: When you taste something sweet, organic molecules are binding to receptors on your tongue. The caffeine 
      in your coffee, the menthol in your toothpaste, the vanilla in your dessert—all are organic compounds 
      that demonstrate the incredible diversity of carbon chemistry.
      
      Carbon is unique because it can form stable bonds with itself, creating chains, rings, and complex 
      three-dimensional structures. This versatility allows for an almost infinite variety of molecules, 
      each with its own unique properties. Your DNA, the blueprint of life, is an organic molecule containing 
      millions of atoms arranged in a precise sequence.`,
    molecules: [
      { name: "Serotonin", description: "The 'happiness' neurotransmitter that regulates mood" },
      { name: "Caffeine", description: "The stimulant that helps you stay awake" }
    ],
    keyPoints: [
      "11-cis-retinal enables vision through light-induced shape change",
      "Serotonin regulation affects mood and is targeted by antidepressants",
      "Carbon's ability to form 4 bonds creates molecular diversity",
      "Biological processes depend entirely on organic molecules"
    ],
    funFact: "Your eyes contain about 120 million rod cells, each packed with millions of retinal molecules. Every second, billions of these molecules are changing shape in response to light!",
    realWorldConnection: "LASIK eye surgery works by reshaping the cornea, but your ability to see still depends on the retinal molecules unchanged since birth."
  },
  {
    id: "organic-compounds",
    title: "Organic Compounds: From Vitalism to Modern Chemistry",
    content: `The term 'organic' originally meant 'derived from living organisms.' Early chemists believed 
      that organic compounds could only be made by living things through a mysterious 'vital force.' They thought 
      there was something fundamentally different about the chemistry of life that could never be replicated in a lab.
      
      This idea was shattered in 1828 when Friedrich Wöhler, a German chemist, synthesized urea—an organic compound 
      found in urine—from purely inorganic starting materials (ammonium cyanate). Wöhler famously wrote to his mentor: 
      "I must tell you that I can make urea without the use of kidneys, either man or dog!"
      
      Today, we define organic chemistry as the chemistry of carbon compounds, regardless of their origin. 
      Carbon forms the backbone of an enormous variety of compounds because of its unique properties:
      
      • It forms strong covalent bonds with up to four other atoms
      • It can bond with itself to form chains, rings, and branches
      • Carbon-carbon bonds are remarkably stable
      • It bonds well with hydrogen, oxygen, nitrogen, sulfur, and halogens
      
      The simplest organic compound is methane (CH₄), the main component of natural gas. From this simple 
      beginning, the complexity builds to molecules containing thousands of atoms, like proteins and DNA.
      
      Why is carbon so special? It's in the "Goldilocks" position of the periodic table—not too big, not too small, 
      not too electronegative. This allows it to form stable bonds with many elements and create the molecular 
      diversity that life requires.`,
    molecules: [
      { name: "Methane", description: "The simplest organic molecule (CH₄)" },
      { name: "Ethanol", description: "Simple alcohol found in beverages" }
    ],
    keyPoints: [
      "'Vital force' theory was believed until Wöhler synthesized urea in 1828",
      "Organic chemistry is now defined as the chemistry of carbon compounds",
      "Carbon's four bonds enable infinite molecular diversity",
      "Carbon's 'Goldilocks' position makes it ideal for stable bonding"
    ],
    funFact: "Over 10 million organic compounds are known, and thousands more are discovered every year! In contrast, there are only about 100,000 known inorganic compounds.",
    commonMistake: "Not all carbon-containing compounds are organic. CO₂, carbonates (like limestone), and cyanides are considered inorganic by convention."
  },
  {
    id: "colors-of-organic-chemistry",
    title: "The Surprising Colors of Organic Chemistry",
    content: `Many people imagine organic compounds as boring white powders. Nothing could be further 
      from the truth! Organic chemistry is full of vibrant, colorful compounds.
      
      WHY ARE SOME MOLECULES COLORED?
      Color arises when molecules absorb certain wavelengths of visible light. This happens when 
      electrons can be excited to higher energy levels. Molecules with extended systems of alternating 
      single and double bonds (called CONJUGATED systems) are often colored because these electrons 
      are easily excited by visible light.
      
      STUNNING EXAMPLES:
      
      • AZULENE: A beautiful deep blue LIQUID with a peppery smell! Unlike most blue compounds, 
        azulene is a small molecule with just 10 carbons. Its unusual color comes from its 
        non-alternating ring structure.
      
      • DDQ (Dichlorodicyanoquinone): Forms stunning orange-amber needle crystals. Used by 
        chemists as an oxidizing agent in synthesis.
      
      • DIAZOMETHANE: A bright YELLOW gas. It's also explosive and toxic—a reminder that 
        colorful doesn't mean safe! Organic chemists handle it with extreme care.
      
      • 9-NITROSOJULOLIDINE: Green prisms with a remarkable steel-blue metallic lustre.
      
      • CHLOROPHYLL: The molecule that makes plants green! It captures sunlight energy 
        for photosynthesis. Its green color comes from a magnesium ion held in an organic ring.
      
      • BETA-CAROTENE: The orange pigment in carrots! It's also why flamingos are pink 
        (they eat shrimp that ate algae containing carotenoids).
      
      THE CONJUGATION RULE:
      Generally, the more conjugated double bonds a molecule has, the longer the wavelength 
      of light it absorbs, and the more "red-shifted" its color becomes:
      • Few conjugated bonds → absorbs UV (colorless)
      • Medium conjugation → absorbs blue/violet (appears yellow/orange)
      • Extensive conjugation → absorbs across visible spectrum (appears red, purple, or blue)`,
    molecules: [
      { name: "Azulene", description: "A beautiful deep blue liquid - unusual for a small organic molecule!" },
      { name: "Benzene", description: "Colorless - not enough conjugation to absorb visible light" }
    ],
    keyPoints: [
      "Organic compounds can be brilliantly colored, not just white powders",
      "Color comes from absorption of visible light by conjugated electron systems",
      "Azulene is a rare blue organic liquid",
      "More conjugation = longer wavelength absorbed = color shifts toward red",
      "Diazomethane is yellow but highly dangerous"
    ],
    funFact: "The deep blue color of azulene was known to 15th-century alchemists who distilled it from chamomile. The name comes from the Arabic 'lazaward' meaning blue!",
    realWorldConnection: "Food coloring, fabric dyes, and the pigments in your TV screen all rely on organic chemists' understanding of how molecular structure creates color."
  },
  {
    id: "synthetic-dyes",
    title: "Synthetic Dyes: The Birth of the Chemical Industry",
    content: `The modern chemical industry was born from an 18-year-old's failed experiment. In 1856, 
      William Henry Perkin was trying to synthesize quinine (a malaria treatment) in his home laboratory. 
      Instead, he produced a reddish-brown sludge. Most would have thrown it away, but Perkin noticed 
      something interesting—when he cleaned his flask with alcohol, he got a beautiful purple solution.
      
      Perkin had accidentally created MAUVEINE, the first synthetic dye. Purple was incredibly valuable 
      at the time because natural purple dyes (like Tyrian purple from sea snails) were extremely expensive. 
      Perkin patented his discovery, built a factory, and became wealthy. His dye colored Queen Victoria's 
      dresses and sparked the "mauve decade" of fashion.
      
      More importantly, Perkin's discovery showed that valuable organic compounds could be synthesized 
      in the laboratory. This sparked the German chemical industry, which dominated organic chemistry 
      for decades. Companies like BASF, Bayer, and Hoechst were founded to make synthetic dyes.
      
      AROMATIC COMPOUNDS:
      Mauveine and most synthetic dyes contain benzene rings—six-membered carbon rings with special stability. 
      These "aromatic" compounds (named for their often-pleasant smells) include:
      
      • Benzene: The parent compound, a hexagonal ring of carbons
      • Pyridine: A benzene ring with one carbon replaced by nitrogen
      • Thiophene: A five-membered ring with sulfur
      • Phenol: Benzene with an -OH group (used in plastics)
      • Aniline: Benzene with an -NH₂ group (basis of many dyes)
      
      These aromatic building blocks remain essential in pharmaceuticals, polymers, and materials today.`,
    molecules: [
      { name: "Benzene", description: "The parent aromatic compound - a hexagonal ring" }
    ],
    keyPoints: [
      "William Perkin accidentally discovered Mauveine in 1856",
      "First synthetic dye launched the modern chemical industry",
      "Aromatic compounds (benzene rings) are key structural units",
      "German chemical industry (BASF, Bayer) grew from dye chemistry"
    ],
    funFact: "The jeans you might be wearing are colored with INDIGO, now made synthetically. Natural indigo from plants was once so valuable it was called 'blue gold'!",
    realWorldConnection: "Many modern drugs were discovered from dye research. Sulfa antibiotics, the first antibacterial drugs, came from work on azo dyes."
  },
  {
    id: "smell-and-pheromones",
    title: "Chemical Communication: Smell & Pheromones",
    content: `Your sense of smell is a molecular detection system. When you sniff a flower, volatile 
      organic molecules travel up your nose and bind to olfactory receptors. Each receptor recognizes 
      specific molecular shapes, sending signals to your brain that you interpret as scent.
      
      SMELLY MOLECULES:
      Some of the most pungent compounds contain sulfur. Thiols (compounds with -SH groups) are notorious:
      
      • Skunk spray contains 2-butene-1-thiol—detectable at incredibly low concentrations
      • Natural gas is odorless, so gas companies add tert-butyl thiol so you can smell leaks
      • Garlic's smell comes from allyl sulfur compounds
      
      PHEROMONES:
      Insects communicate using organic molecules called pheromones. These chemical signals can:
      
      • Attract mates (sex pheromones)
      • Mark trails to food sources
      • Signal alarm to the colony
      
      BOMBYKOL - The First Pheromone Discovered:
      The silkworm moth (Bombyx mori) can detect a SINGLE MOLECULE of the female sex pheromone, bombykol! 
      It took scientists 20 years and 500,000 female moths to isolate just 12 mg of this compound. 
      Scientists have used pheromone traps to control pest insects without harmful pesticides.
      
      THE PERFUME INDUSTRY - Large Ring Compounds:
      Some of the most valued scents come from large ring compounds found in animal secretions:
      
      • MUSCONE: From the musk deer, a 15-membered ring with a distinctive musky smell
      • CIVETONE: From the civet cat, a 17-membered ring used in expensive perfumes
      
      These compounds are now made synthetically to protect the animals, but their structures 
      were first determined from natural sources. The large rings give them unique properties 
      that make them excellent perfume fixatives.
      
      STEREOCHEMISTRY MATTERS:
      Here's something remarkable: two molecules with the exact same atoms and bonds can smell completely 
      different if they're mirror images of each other! These mirror-image molecules are called ENANTIOMERS.
      
      • (R)-limonene smells like oranges
      • (S)-limonene smells like lemons
      • Same formula, different 3D arrangement, different smell!
      
      FRONTALIN - The Beetle Pheromone:
      The insect pheromone frontalin is a striking example of stereochemistry in action. 
      One enantiomer of frontalin attracts certain bark beetles to trees, while the mirror 
      image REPELS them! This is used in pest control—the wrong enantiomer can protect forests.
      Your nose can distinguish these molecular "handedness" differences!
      
      THE FREIBURG INCIDENT (1889):
      One of the worst smells in chemistry is THIOACETONE. When a factory in Freiburg, Germany made 
      thioacetone, the smell evacuated the entire city! People vomited in the streets from the stench. 
      In 1967, scientists repeated the experiment near Oxford, and workers at an Esso research station 
      400 meters away complained within seconds. This demonstrates just how sensitive our smell is!`,
    molecules: [
      { name: "Limonene", description: "Mirror-image forms smell like oranges vs lemons!" },
      { name: "Muscone", description: "Musk deer pheromone - 15-membered ring" },
      { name: "Civetone", description: "Civet cat pheromone - 17-membered ring for perfumes" },
      { name: "Frontalin", description: "Beetle pheromone - one enantiomer attracts, the other repels!" },
      { name: "Thioacetone", description: "The worst-smelling compound - evacuated Freiburg in 1889!" }
    ],
    keyPoints: [
      "Smell works through molecular shape recognition",
      "Thiols (-SH groups) create strong odors (skunk, garlic)",
      "Pheromones are chemical communication molecules in insects",
      "Enantiomers (mirror-image molecules) can smell completely different",
      "Stereochemistry—the 3D arrangement of atoms—matters for biology"
    ],
    funFact: "Humans can distinguish over 1 trillion different smells! Your olfactory system has about 400 different receptor types that work in combinations.",
    commonMistake: "Don't assume mirror-image molecules behave the same way. In biology and medicine, the 'handedness' of a molecule is often critical for its activity."
  },
  {
    id: "stereochemistry-intro",
    title: "Introduction to Stereochemistry",
    content: `Stereochemistry is the study of the three-dimensional arrangement of atoms in molecules. 
      This seemingly subtle concept has profound effects in biology and medicine.
      
      CHIRALITY AND HANDEDNESS:
      Look at your hands. They are mirror images of each other but not superimposable—you can't place 
      your right hand exactly on top of your left. Molecules can have this same property, called CHIRALITY 
      (from the Greek word for "hand").
      
      A carbon atom bonded to four DIFFERENT groups creates a chiral center. The two mirror-image forms 
      are called ENANTIOMERS. They have identical:
      • Molecular formulas
      • Boiling points
      • Melting points
      • Most chemical properties
      
      But they are NOT identical biologically! Your body's enzymes and receptors are also chiral, so 
      they can distinguish between enantiomers—like how a right hand fits better in a right glove.
      
      THE THALIDOMIDE TRAGEDY:
      In the 1950s, thalidomide was prescribed to pregnant women for morning sickness. Tragically, 
      one enantiomer caused birth defects while the other was safe. Over 10,000 children were affected.
      This disaster led to strict regulations requiring pharmaceutical companies to study both 
      enantiomers of chiral drugs separately.
      
      Today, many drugs are sold as single enantiomers:
      • Esomeprazole (Nexium) is the active enantiomer of omeprazole
      • Levofloxacin is the active enantiomer of ofloxacin
      
      Understanding stereochemistry is essential for understanding how drugs work and how enzymes 
      recognize their substrates with exquisite specificity.`,
    keyPoints: [
      "Chirality = molecular handedness (non-superimposable mirror images)",
      "A carbon with 4 different groups is a chiral center",
      "Enantiomers have identical physical properties but different biological effects",
      "Thalidomide tragedy showed importance of stereochemistry in medicine",
      "Modern drug development studies each enantiomer separately"
    ],
    funFact: "All amino acids in your proteins are 'left-handed' (L-configuration), and all sugars in DNA are 'right-handed' (D-configuration). Life chose specific handedness billions of years ago!",
    commonMistake: "Enantiomers rotate plane-polarized light in opposite directions, but this optical activity doesn't predict which one is biologically active—you have to test them!"
  },
  {
    id: "atomic-structure-review",
    title: "Atomic Structure Review",
    content: `Before diving deeper into organic chemistry, let's review the structure of atoms. Understanding 
      electrons is crucial because chemical bonding is all about electrons!
      
      An atom consists of three subatomic particles:
      • Protons (positive charge) - found in the nucleus
      • Neutrons (no charge) - found in the nucleus  
      • Electrons (negative charge) - orbit the nucleus in shells
      
      The number of protons defines the element. Carbon has 6 protons, so its atomic number is 6. 
      In a neutral atom, the number of electrons equals the number of protons.
      
      Electrons are arranged in shells (energy levels) around the nucleus:
      • 1st shell: holds up to 2 electrons
      • 2nd shell: holds up to 8 electrons
      • 3rd shell: holds up to 8 electrons (simplified)
      
      For carbon (6 electrons):
      • 1st shell: 2 electrons (full)
      • 2nd shell: 4 electrons (not full - these are valence electrons!)
      
      The outermost electrons are called VALENCE ELECTRONS. They are the ones involved in chemical bonding. 
      Carbon has 4 valence electrons, which is why it forms 4 bonds!
      
      The octet rule states that atoms are most stable when their outer shell has 8 electrons (or 2 for 
      hydrogen). Carbon needs 4 more electrons to complete its octet, so it shares electrons 
      by forming 4 covalent bonds.`,
    keyPoints: [
      "Electrons orbit the nucleus in shells (energy levels)",
      "Carbon has 6 electrons: 2 in the first shell, 4 in the second",
      "Valence electrons (outermost) are involved in bonding",
      "The octet rule: atoms want 8 electrons in their outer shell",
      "Carbon forms 4 bonds to complete its octet"
    ],
    funFact: "If an atom were the size of a football stadium, the nucleus would be the size of a marble at the center—atoms are mostly empty space!",
    commonMistake: "Don't confuse shells with orbitals. Shells are energy levels; orbitals are specific regions within shells where electrons are likely to be found."
  },
  {
    id: "chemical-bonding",
    title: "Chemical Bonding Fundamentals",
    content: `Atoms bond together to achieve stability—specifically, to fill their outer electron shells. 
      There are two main types of chemical bonds:
      
      IONIC BONDS form when one atom transfers electrons to another:
      • Typically between metals and nonmetals
      • Creates charged ions (Na⁺ and Cl⁻ in table salt)
      • Not common in organic chemistry
      
      COVALENT BONDS form when atoms SHARE electrons:
      • Typically between nonmetals
      • The shared electrons count toward each atom's octet
      • This is the foundation of organic chemistry!
      
      In organic molecules, carbon always forms covalent bonds. Let's see how methane (CH₄) forms:
      
      • Carbon needs 4 electrons to complete its octet
      • Hydrogen needs 1 electron to complete its shell (duet)
      • Solution: Carbon shares one electron with each of 4 hydrogens
      • Each C-H bond has 2 shared electrons
      
      The strength of a covalent bond depends on how much the electron clouds overlap. This is why 
      carbon-carbon bonds are so strong—the atoms are similar in size and electronegativity.
      
      LEWIS STRUCTURES (electron dot structures) show bonding:
      • Each line represents 2 shared electrons (a bonding pair)
      • Dots around atoms represent non-bonding electrons (lone pairs)`,
    molecules: [
      { name: "Methane", description: "Perfect example of 4 covalent C-H bonds" },
      { name: "Ethanol", description: "Contains C-C, C-H, C-O, and O-H bonds" }
    ],
    keyPoints: [
      "Ionic bonds: electron transfer (not common in organic chemistry)",
      "Covalent bonds: electron sharing (foundation of organic chemistry)",
      "Each covalent bond = 2 shared electrons",
      "Carbon forms 4 covalent bonds to complete its octet",
      "Lewis structures show bonding and lone pairs"
    ],
    realWorldConnection: "Diamond is incredibly hard because it's a giant network of carbon atoms, each forming 4 strong covalent bonds with its neighbors in 3D.",
    commonMistake: "When drawing Lewis structures, don't forget lone pairs! Nitrogen has 1 lone pair, oxygen has 2, and halogens have 3."
  },
  {
    id: "hybridization",
    title: "Carbon's Secret: Hybridization",
    content: `Here's a puzzle: Carbon's electron configuration is 1s² 2s² 2p². That's 2 electrons in the 
      2s orbital and 2 in 2p orbitals. But carbon forms 4 EQUAL bonds in methane. How?
      
      The answer is HYBRIDIZATION—the mixing of atomic orbitals to form new, equivalent hybrid orbitals.
      
      SP³ HYBRIDIZATION (4 single bonds):
      • One 2s orbital + three 2p orbitals combine
      • Creates 4 equivalent sp³ hybrid orbitals
      • Arranged in a TETRAHEDRON (109.5° bond angles)
      • Example: Methane (CH₄), ethane (C₂H₆)
      
      SP² HYBRIDIZATION (double bonds):
      • One 2s orbital + two 2p orbitals combine
      • Creates 3 equivalent sp² hybrid orbitals
      • Arranged in a TRIANGULAR PLANAR shape (120° bond angles)
      • One unhybridized p orbital remains for π bonding
      • Example: Ethene (C₂H₄), benzene
      
      SP HYBRIDIZATION (triple bonds):
      • One 2s orbital + one 2p orbital combine
      • Creates 2 equivalent sp hybrid orbitals
      • Arranged in a LINEAR shape (180° bond angles)
      • Two unhybridized p orbitals remain for π bonding
      • Example: Ethyne/Acetylene (C₂H₂)
      
      Quick rule: Count the "groups" attached to carbon:
      • 4 groups → sp³ (tetrahedral)
      • 3 groups → sp² (trigonal planar)
      • 2 groups → sp (linear)`,
    keyPoints: [
      "Hybridization explains how carbon forms 4 equivalent bonds",
      "sp³: 4 groups, tetrahedral, 109.5° angles",
      "sp²: 3 groups, trigonal planar, 120° angles",
      "sp: 2 groups, linear, 180° angles",
      "Count groups attached to carbon to determine hybridization"
    ],
    funFact: "The tetrahedral shape of sp³ carbon was proposed by van 't Hoff and Le Bel in 1874—before anyone knew about electrons or orbitals!",
    commonMistake: "Double bonds count as ONE group for hybridization. A C=C double bond is one group, not two.",
    diagrams: [
      { type: 'hybridization', props: { type: 'comparison', interactive: true }, caption: 'Compare sp³, sp², and sp hybridization' }
    ],
    difficulty: 'fundamental',
    examTip: "Quick trick: Count the GROUPS (not bonds) attached to carbon. 4 groups = sp³, 3 groups = sp², 2 groups = sp. A double bond counts as ONE group!",
    plainEnglish: {
      technical: "Hybridization involves the mixing of s and p atomic orbitals to form equivalent sp³, sp², or sp hybrid orbitals",
      simple: "Carbon mixes its orbitals like mixing paint colors to make new 'hybrid' orbitals that point in specific directions for bonding!"
    },
    quickCheck: [
      {
        question: "What is the hybridization of a carbon with 3 groups attached (like in ethene C₂H₄)?",
        options: ["sp³", "sp²", "sp", "None - unhybridized"],
        correctIndex: 1,
        explanation: "3 groups means sp² hybridization! The leftover p orbital is used for the π bond in the double bond."
      },
      {
        question: "What bond angle would you expect for an sp³ hybridized carbon?",
        options: ["90°", "109.5°", "120°", "180°"],
        correctIndex: 1,
        explanation: "sp³ gives tetrahedral geometry with 109.5° angles. This is the angle in methane (CH₄)!"
      }
    ]
  },
  {
    id: "sigma-and-pi-bonds",
    title: "Sigma (σ) and Pi (π) Bonds",
    content: `Not all covalent bonds are created equal! There are two types based on orbital overlap:
      
      SIGMA (σ) BONDS:
      • Formed by HEAD-ON (end-to-end) orbital overlap
      • Electron density is concentrated between the nuclei
      • Single bonds are always sigma bonds
      • Very strong because of direct overlap
      • Allows FREE ROTATION around the bond axis
      
      PI (π) BONDS:
      • Formed by SIDEWAYS (parallel) orbital overlap
      • Electron density is above and below the bond axis
      • Found in double and triple bonds (in addition to σ bond)
      • Weaker than sigma bonds due to less overlap
      • PREVENTS rotation (creates rigid structure)
      
      Bond Composition:
      • Single bond (C-C): 1 sigma bond
      • Double bond (C=C): 1 sigma + 1 pi bond
      • Triple bond (C≡C): 1 sigma + 2 pi bonds
      
      Why does this matter?
      
      1. CIS-TRANS ISOMERS: Because double bonds can't rotate, atoms can be "locked" on the same side 
         (cis) or opposite sides (trans) of the double bond. This is why vision works!
      
      2. PLANARITY: Double bonds force connected atoms into a flat arrangement.
      
      3. REACTIVITY: Pi bonds are more exposed and easier to break, making double bonds reactive sites.`,
    keyPoints: [
      "Sigma (σ) bonds: head-on overlap, single bonds, allows rotation",
      "Pi (π) bonds: sideways overlap, in double/triple bonds, prevents rotation",
      "Single = 1σ, Double = 1σ + 1π, Triple = 1σ + 2π",
      "Pi bond rigidity causes cis-trans isomerism",
      "Pi bonds are more reactive than sigma bonds"
    ],
    realWorldConnection: "Trans fats are unhealthy because the trans configuration makes fat molecules straighter, allowing them to pack tightly and clog arteries.",
    funFact: "Your ability to see depends on pi bonds! Light causes cis-to-trans isomerization of a double bond in retinal—without this, vision wouldn't work."
  },
  {
    id: "electronegativity-polarity",
    title: "Electronegativity & Molecular Polarity",
    content: `When two atoms share electrons in a covalent bond, they don't always share equally. 
      This unequal sharing creates POLAR BONDS.
      
      ELECTRONEGATIVITY is an atom's ability to attract shared electrons:
      • Fluorine is most electronegative (4.0)
      • Oxygen is very electronegative (3.5)
      • Carbon is moderate (2.5)
      • Hydrogen is low (2.1)
      
      When atoms with different electronegativities bond:
      • Electrons spend more time near the more electronegative atom
      • Creates a partial negative charge (δ⁻) on one end
      • And a partial positive charge (δ⁺) on the other
      • This is a POLAR COVALENT BOND
      
      MOLECULAR POLARITY depends on:
      1. The polarity of individual bonds
      2. The GEOMETRY of the molecule
      
      Example - CO₂ vs H₂O:
      • CO₂: Two polar C=O bonds, but linear geometry → vectors cancel → NONPOLAR molecule
      • H₂O: Two polar O-H bonds, bent geometry → vectors don't cancel → POLAR molecule
      
      Why polarity matters:
      • Determines solubility ("like dissolves like")
      • Affects boiling points
      • Influences reactivity
      • Determines drug absorption and distribution`,
    keyPoints: [
      "Electronegativity: an atom's pull on shared electrons",
      "Polar bonds have unequal electron sharing (δ⁺ and δ⁻)",
      "Molecular polarity depends on bond polarity AND geometry",
      "CO₂ is nonpolar (linear), H₂O is polar (bent)",
      "Polarity determines solubility, boiling point, and reactivity"
    ],
    commonMistake: "A molecule with polar bonds is not necessarily polar! Symmetry can cause polar bonds to cancel (like in CO₂ or CCl₄).",
    realWorldConnection: "Water's polarity makes it the 'universal solvent'—it dissolves polar and ionic compounds but not oils (nonpolar). This is why oil and water don't mix!"
  },
  {
    id: "periodic-table-organic",
    title: "The Periodic Table in Organic Chemistry",
    content: `While carbon is the star of organic chemistry, it never works alone. Several other elements 
      play crucial supporting roles:
      
      THE COMMON CAST:
      • Hydrogen (H): Most common partner of carbon
      • Oxygen (O): In alcohols, ethers, ketones, carboxylic acids
      • Nitrogen (N): In amines, amides, proteins, DNA
      • Sulfur (S): In thiols, thioethers, amino acids (cysteine, methionine)
      • Phosphorus (P): In DNA backbone, ATP (energy molecule)
      
      THE HALOGENS (F, Cl, Br, I):
      Halogens are often used to modify drug properties:
      • Fluorine makes molecules more stable (many drugs contain fluorine)
      • Chlorine and bromine are used in synthesis
      • Iodine is essential in thyroid hormones
      
      ORGANOMETALLIC CHEMISTRY:
      Some organic reactions use metals:
      • Lithium (Li): n-Butyllithium is a super-strong base
      • Magnesium (Mg): Grignard reagents build carbon-carbon bonds
      • Palladium (Pd): Catalyzes cross-coupling reactions (Nobel Prize 2010)
      
      AGRICULTURAL CHEMISTRY:
      • Fungicides like propiconazole contain nitrogen heterocycles
      • Insecticides like pyrethrins (natural) and imidacloprid (synthetic)
      • Herbicides like glyphosate contain phosphorus
      
      Understanding how different elements behave allows organic chemists to design molecules with 
      specific properties for medicine, agriculture, and materials.`,
    keyPoints: [
      "Common elements: C, H, O, N, S, P, and halogens",
      "Halogens modify drug stability and properties",
      "Organometallic reagents (Li, Mg, Pd) enable powerful transformations",
      "The 2010 Nobel Prize was for palladium-catalyzed cross-coupling",
      "Agricultural chemicals rely on diverse element combinations"
    ],
    funFact: "Prozac (fluoxetine) and Lipitor (atorvastatin) both contain fluorine atoms. About 20% of pharmaceutical drugs contain fluorine!",
    realWorldConnection: "The Heck, Suzuki, and Negishi reactions (Nobel 2010) allow chemists to connect carbon atoms in ways that were previously impossible, enabling synthesis of complex medicines."
  },
  {
    id: "organic-chemistry-and-industry",
    title: "Organic Chemistry and Industry",
    content: `Organic chemistry powers modern industry on a massive scale. The chemical industry 
      is divided into two major branches:
      
      BULK CHEMICALS (Commodity Chemicals):
      • Produced in enormous quantities (millions of tons per year)
      • Relatively simple molecules from petroleum
      • Low price per kilogram
      • Examples: ethylene, propylene, benzene, methanol
      
      FINE CHEMICALS (Specialty Chemicals):
      • Produced in smaller quantities (tons to kilograms)
      • Complex molecules requiring sophisticated synthesis
      • High value per kilogram
      • Examples: pharmaceuticals, fragrances, agrochemicals
      
      PETROCHEMICALS - THE BULK INDUSTRY:
      Crude oil is "cracked" into smaller molecules that become building blocks:
      • Ethylene → polyethylene (plastic bags, bottles)
      • Propylene → polypropylene (containers, textiles)
      • Benzene → polystyrene, nylon, pharmaceuticals
      
      Annual production: over 350 million tons of plastics!
      
      CASE STUDY: YOUR SHOWER GEL (Fine Chemistry in Action)
      A typical shower gel contains dozens of organic molecules, each designed for a purpose:
      
      SURFACTANTS (cleaning):
      • Sodium laureth sulfate (SLS): Main foam-maker
      • Cocamide DEA: Stabilizes foam, adds viscosity
      • Cocamidopropyl betaine: Gentler co-surfactant
      
      FRAGRANCES:
      • α-Pinene: Pine/forest scent
      • Limonene: Citrus freshness
      • Terpinen-4-ol: Tea tree scent + antiseptic
      
      PRESERVATIVES & STABILIZERS:
      • BHT (Butylated hydroxytoluene): Antioxidant
      • Sodium benzoate: Prevents bacterial growth
      • Citric acid: pH adjuster
      
      COLORANTS:
      • Tartrazine (CI 19140): Yellow dye
      • Scarlet GN (CI 14700): Red dye
      
      DENATONIUM BENZOATE (Bitrex) - A SAFETY STORY:
      What's the bitterest substance known to humans? Denatonium benzoate, trade name "Bitrex"!
      It's so bitter that just 10 parts per million make water undrinkable. It's added to:
      • Household cleaners (to prevent accidental poisoning)
      • Antifreeze (to stop children drinking the sweet liquid)
      • Nail polish (to discourage nail-biting)
      
      One organic molecule saves thousands of children's lives every year by making 
      dangerous substances taste terrible!
      
      FOOD INDUSTRY:
      • Vanillin: Vanilla flavor (mostly synthetic now)
      • Maltol: Enhances sweetness perception
      • Saccharin & Aspartame: Artificial sweeteners
      
      SYNTHETIC FIBERS:
      • Nylon: First fully synthetic fiber (1935)—revolutionary for stockings
      • Polyester: Wrinkle-resistant, durable
      • Spandex (Lycra): Stretchy material for athletic wear`,
    molecules: [
      { name: "Vanillin", description: "The main flavor in vanilla" },
      { name: "Limonene", description: "Citrus scent found in many products" }
    ],
    keyPoints: [
      "Bulk chemicals: simple, cheap, millions of tons (petroleum-based)",
      "Fine chemicals: complex, expensive, small quantities (drugs, perfumes)",
      "Shower gel contains dozens of purpose-designed organic molecules",
      "Bitrex is the bitterest substance - saves children from poisoning",
      "Over 350 million tons of plastics produced annually"
    ],
    funFact: "Denatonium (Bitrex) is so bitter that chemists who work with it can taste it on their hands even after washing multiple times. It's detected at 10 parts per BILLION!",
    realWorldConnection: "Next time you use shower gel, remember: every ingredient was designed by organic chemists. The foam, the scent, the color, the preservation—all chemistry in action."
  },
  {
    id: "world-of-perfumery",
    title: "The World of Perfumery",
    content: `The perfume industry beautifully illustrates the art and science of organic chemistry. 
      Fragrances are complex mixtures of organic molecules, each contributing to the overall scent.
      
      NATURAL ESSENTIAL OILS:
      • Rose oil contains over 300 different organic molecules!
      • Jasmine absolute contains cis-jasmone (key scent molecule)
      • Sandalwood contains α-santalol (the characteristic scent)
      
      STRUCTURE AND SMELL:
      Molecular structure determines scent:
      • Menthol: The -OH position creates the cooling sensation
      • Vanillin: The aldehyde group gives the sweet, warm smell
      • Citral: Found in lemon grass (lemony scent)
      
      SYNTHETIC vs NATURAL:
      Vanillin was one of the first flavors synthesized (1874). Today, synthetic vanillin 
      far exceeds natural vanilla extract in production because:
      • It's 50 times cheaper
      • More consistent quality
      • More sustainable (no rainforest destruction for vanilla farms)
      
      STEREOCHEMISTRY IN FRAGRANCE:
      Remember enantiomers? They can smell completely different:
      • (+)-carvone smells like caraway
      • (−)-carvone smells like spearmint
      • Same atoms, different handedness, different smell!
      
      Menthol has 8 possible stereoisomers, but only one specific form (−)-menthol gives 
      the intense cooling sensation. Organic chemists synthesize exactly this form!`,
    molecules: [
      { name: "Vanillin", description: "The primary flavor compound in vanilla" },
      { name: "Menthol", description: "The cooling compound from peppermint" },
      { name: "Damascenone", description: "The deep 'essence' of roses - incredibly powerful scent!" }
    ],
    keyPoints: [
      "Rose oil contains 300+ different organic molecules",
      "Molecular structure determines scent characteristics",
      "Synthetic vanillin is cheaper and more sustainable",
      "Enantiomers (carvone) can smell completely different",
      "Only one of menthol's 8 stereoisomers gives cooling"
    ],
    funFact: "Natural vanilla extract requires 600 hand-pollinated orchid flowers to make just 1 kg—synthetic vanillin is 50 times cheaper and chemically identical!",
    realWorldConnection: "Your perfume is a carefully designed mixture that unfolds over time: top notes (first smell), heart notes (main character), and base notes (lasting impression)."
  },
  {
    id: "organic-chemistry-and-medicine",
    title: "Organic Chemistry and Medicine",
    content: `Perhaps nowhere is organic chemistry more important than in medicine. Almost all drugs 
      are organic molecules designed to interact with biological targets in specific ways.
      
      NATURAL COMPOUNDS:
      • Quinine: From cinchona tree bark, first effective malaria treatment
      • Resveratrol: From grape skins, studied for heart health benefits
      • Vitamin C (ascorbic acid): Essential nutrient that prevents scurvy
      
      HISTORIC BREAKTHROUGHS:
      • PENICILLIN: Discovered by Alexander Fleming in 1928, this antibiotic revolutionized medicine.
        The β-lactam ring structure was a puzzle for chemists—its unusual strained four-membered 
        ring is key to its activity. Dorothy Hodgkin determined its structure using X-ray crystallography.
      
      • TAXOL (Paclitaxel): Found in the bark of Pacific yew trees, this anticancer drug has an 
        incredibly complex structure with 11 chiral centers! Its total synthesis by Holton and 
        Nicolaou in 1994 was a triumph of organic chemistry. Today it's made semi-synthetically.
      
      BLOCKBUSTER DRUGS:
      Modern medicine relies on designed organic molecules:
      
      • Atorvastatin (Lipitor): Lowers cholesterol by inhibiting HMG-CoA reductase
        - Once the best-selling drug in history ($12 billion/year at peak)
      
      • Esomeprazole (Nexium): Treats acid reflux by blocking proton pumps
        - The S-enantiomer of omeprazole (stereochemistry matters!)
      
      • Imatinib (Glivec): Targeted cancer therapy for leukemia
        - Designed to fit a specific mutant protein—precision medicine
      
      • Oseltamivir (Tamiflu): Treats influenza by blocking viral enzymes
      
      THE DRUG DISCOVERY PROCESS:
      1. Target identification (find disease-relevant protein)
      2. Lead discovery (find molecules that interact with target)
      3. Lead optimization (improve potency, reduce side effects)
      4. Clinical trials (test safety and efficacy)
      5. Manufacturing scale-up (efficient synthesis)
      
      It takes about 12 years and $2.6 billion to bring a new drug to market. 
      Organic chemistry is essential at every step.`,
    molecules: [
      { name: "Aspirin", description: "Classic pain reliever and anti-inflammatory" },
      { name: "Quinine", description: "Natural malaria treatment from tree bark" },
      { name: "Penicillin G", description: "First antibiotic - note the strained β-lactam ring!" },
      { name: "Taxol", description: "Anticancer drug with 11 chiral centers" },
      { name: "Caffeine", description: "Stimulant found in coffee and tea" },
      { name: "Atorvastatin", description: "Lipitor - the best-selling drug in history ($12B/year)" },
      { name: "Omeprazole", description: "Losec/Prilosec - proton pump inhibitor for stomach ulcers" }
    ],
    keyPoints: [
      "Quinine (from tree bark) was first effective malaria treatment",
      "Lipitor was once the best-selling drug ($12B/year)",
      "Glivec is an example of targeted cancer therapy",
      "Drug development takes ~12 years and $2.6 billion",
      "Organic chemistry is essential at every step"
    ],
    funFact: "The Pfizer-BioNTech COVID-19 vaccine uses mRNA wrapped in lipid nanoparticles—organic chemistry helped save millions of lives during the pandemic!",
    realWorldConnection: "Understanding organic chemistry helps you understand why some drugs have food interactions (e.g., grapefruit with statins) or why timing of doses matters."
  },
  {
    id: "what-organic-chemists-do",
    title: "What Do Organic Chemists Do?",
    content: `Organic chemists work in many different ways, but their core activities fall into four main categories.
      
      SYNTHESIS - Making Molecules:
      The art of building organic molecules from simpler starting materials. Synthetic chemists design 
      step-by-step routes to construct complex structures. The synthesis of Taxol from simple chemicals 
      was once considered impossible—now it's routine! Synthesis is like molecular architecture.
      
      ANALYSIS - Determining Structure:
      When you discover a new natural product or synthesize a new compound, you need to know its 
      structure. Organic chemists use powerful techniques:
      • NMR Spectroscopy: "Seeing" individual atoms
      • Mass Spectrometry: Weighing molecules precisely  
      • X-ray Crystallography: Taking 3D "photographs" of molecules
      
      MECHANISM - Understanding Reactions:
      Why does a reaction happen? What is the pathway from starting materials to products? 
      Understanding mechanism allows us to:
      • Predict what products will form
      • Design better synthetic routes
      • Avoid unwanted side reactions
      
      This book uses CURLY ARROWS to show how electrons move during reactions—a powerful 
      tool you'll master!
      
      DISCOVERY - Finding New Molecules:
      Whether from natural sources (plants, fungi, marine organisms) or designed in the lab, 
      discovering new molecules with useful properties is at the heart of organic chemistry.
      
      LOOKING FORWARD:
      • Chapters 2-4: You'll learn how to determine molecular structure
      • Chapter 5: You'll master curly arrows and understand mechanism
      • Chapter 6: Your first real reaction—nucleophilic addition to carbonyls!`,
    keyPoints: [
      "Synthesis: building complex molecules step-by-step",
      "Analysis: determining structure using NMR, MS, X-ray",
      "Mechanism: understanding WHY reactions happen",
      "Discovery: finding new useful molecules",
      "Curly arrows show electron movement in reactions"
    ],
    funFact: "Dorothy Hodgkin used X-ray crystallography to determine the structures of penicillin, vitamin B12, and insulin. She won the Nobel Prize in 1964!",
    realWorldConnection: "Every drug you take was first synthesized by organic chemists, its structure determined by analytical chemists, and its mechanism studied to ensure safety and efficacy."
  }
];
