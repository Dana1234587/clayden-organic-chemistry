import { ChapterSection } from '../../types';

export const introduction = `<h4>🔬 Welcome to the world of structural determination!</h4>

<p>Imagine being a <strong>molecular detective</strong>. You have an unknown compound in a vial—perhaps a new drug candidate, a natural product from a rainforest plant, or a metabolite from a patient's blood sample. Your mission: determine its exact structure, atom by atom.</p>

<p>In this chapter, you'll master the <strong>four pillars</strong> of structural determination:</p>

<ul>
<li>🔍 <strong>X-ray Crystallography</strong> - The "final appeal" that shows atoms directly</li>
<li>⚖️ <strong>Mass Spectrometry (MS)</strong> - Weighing molecules and detecting elements</li>
<li>🧲 <strong>NMR Spectroscopy</strong> - Mapping carbon skeletons and hydrogen environments</li>
<li>📡 <strong>IR Spectroscopy</strong> - Identifying functional groups through vibrations</li>
</ul>

<p>Each technique reveals different clues. Together, they solve the molecular mystery!</p>`;

export const sections: ChapterSection[] = [
    // ========================================
    // PHASE 1: X-RAY & INTRODUCTION (Pages 1-4)
    // ========================================
    {
        id: 'why-structure-matters',
        title: 'Why Structure Matters',
        content: `<h4>🏥 Would You Trust a Mystery Medicine?</h4>

<p>Imagine a doctor offering you a pill but saying: "I have no idea what's in it, but it might help!" <strong>You'd refuse.</strong> Knowing the exact structure of a molecule is critical because:</p>

<div class="highlight-box">
<strong>Structure Determines Everything:</strong>
<ul>
<li>💊 <strong>Drug activity</strong> - Wrong structure = wrong effect (or dangerous!)</li>
<li>🧬 <strong>Biological interactions</strong> - Enzymes recognize 3D shape precisely</li>
<li>⚗️ <strong>Chemical reactivity</strong> - Predict how molecules transform</li>
<li>🏭 <strong>Quality control</strong> - Confirm you made what you intended</li>
</ul>
</div>

<h4>🔍 The Detective Analogy</h4>

<p>Structure determination is like solving a crime:</p>

<table class="reference-table">
<thead>
<tr><th>Crime Scene</th><th>Chemistry Lab</th></tr>
</thead>
<tbody>
<tr><td>Fingerprints</td><td>IR spectrum (functional group fingerprint)</td></tr>
<tr><td>DNA evidence</td><td>Mass spectrum (molecular identity)</td></tr>
<tr><td>Witness testimony</td><td>NMR signals (atom environments)</td></tr>
<tr><td>Photograph of suspect</td><td>X-ray structure (direct visualization)</td></tr>
</tbody>
</table>

<div class="tip-box">
<strong>💡 Historical Note:</strong> Before spectroscopy (pre-1950s), chemists spent years doing tedious chemical reactions to prove structures. Today, we can determine complex structures in hours!
</div>`,
        keyPoints: [
            'Molecular structure determines ALL properties',
            'Wrong structure = wrong drug effect',
            'Modern spectroscopy replaced years of chemical tests',
            'Multiple techniques used together give the full picture'
        ]
    },
    {
        id: 'xray-crystallography',
        title: 'X-ray Crystallography: The Final Appeal',
        content: `<h4>⚖️ The Ultimate Proof</h4>

<p>If structure determination were a court case, <strong>X-ray crystallography would be the DNA evidence</strong>—definitive and unambiguous. It directly shows where atoms are positioned in 3D space!</p>

<div class="highlight-box">
<strong>How X-ray Crystallography Works:</strong>
<ol>
<li>Grow a <strong>single crystal</strong> of your compound</li>
<li>Shine <strong>X-rays</strong> through the crystal</li>
<li>Measure the <strong>diffraction pattern</strong></li>
<li>Calculate <strong>electron density maps</strong></li>
<li>Build the 3D molecular structure!</li>
</ol>
</div>

<h4>📊 Reading an X-ray Structure</h4>

<p>X-ray reveals:</p>
<ul>
<li>✅ Exact bond lengths (to 0.001 Å precision!)</li>
<li>✅ Bond angles</li>
<li>✅ 3D conformation</li>
<li>✅ Crystal packing</li>
</ul>

<div class="tip-box">
<strong>💎 Famous Example:</strong> The structure of DNA (Watson & Crick, 1953) was solved using X-ray diffraction data from Rosalind Franklin's crystallography work!
</div>

<h4>🎯 Why It's Called "The Final Appeal"</h4>

<p>When all other evidence is ambiguous, an X-ray structure settles the matter definitively. It's like a photograph of the molecule—showing every atom's position.</p>`,
        keyPoints: [
            'X-ray crystallography directly shows atom positions',
            'Requires growing a single crystal',
            'Gives bond lengths to 0.001 Å precision',
            'Used to solve DNA structure in 1953'
        ],
        molecules: [
            { name: 'Adipic Acid', description: 'Classic X-ray example - zigzag structure' },
            { name: 'Caffeine', description: 'Famous X-ray structure determination' }
        ]
    },
    {
        id: 'xray-limitations',
        title: 'Limitations of X-ray: Why We Need Spectroscopy',
        content: `<h4>⚠️ X-ray Isn't Always Possible</h4>

<p>Despite its power, X-ray crystallography has significant limitations:</p>

<div class="warning-box">
<strong>Problem 1: Need for Crystals</strong>
<ul>
<li>Must grow a <strong>single crystal</strong> of suitable quality</li>
<li>Many compounds are oily liquids or don't crystallize</li>
<li>Some crystals are too small or have defects</li>
</ul>
</div>

<div class="warning-box">
<strong>Problem 2: Missing Hydrogens</strong>
<ul>
<li>X-rays scatter off <strong>electrons</strong></li>
<li>Hydrogen has only 1 electron—very weak signal!</li>
<li>H positions often must be calculated, not observed</li>
</ul>
</div>

<div class="warning-box">
<strong>Problem 3: Time and Resources</strong>
<ul>
<li>Crystal growing can take weeks/months</li>
<li>Equipment is expensive</li>
<li>Not practical for routine analysis</li>
</ul>
</div>

<h4>💡 The Spectroscopic Alternative</h4>

<p>This is where <strong>spectroscopy</strong> shines! It works on:</p>

<table class="reference-table">
<thead>
<tr><th>Sample Type</th><th>X-ray?</th><th>Spectroscopy?</th></tr>
</thead>
<tbody>
<tr><td>Pure crystal</td><td>✅ Yes</td><td>✅ Yes</td></tr>
<tr><td>Liquid</td><td>❌ No</td><td>✅ Yes</td></tr>
<tr><td>Gas</td><td>❌ No</td><td>✅ Yes</td></tr>
<tr><td>Mixture</td><td>❌ No</td><td>✅ Yes</td></tr>
<tr><td>Tiny amount</td><td>❌ Usually no</td><td>✅ Yes</td></tr>
</tbody>
</table>

<div class="highlight-box">
<strong>The Spectroscopy Toolkit:</strong>
<ul>
<li><strong>MS</strong> - Molecular weight & formula</li>
<li><strong>NMR</strong> - Carbon skeleton & proton environments</li>
<li><strong>IR</strong> - Functional groups</li>
</ul>
Together, these often give enough information without ever needing an X-ray!
</div>`,
        keyPoints: [
            'X-ray needs high-quality single crystals',
            'Hydrogen atoms are hard to see with X-rays',
            'Spectroscopy works on liquids, gases, mixtures',
            'MS + NMR + IR together can solve most structures'
        ]
    },
    // ========================================
    // PHASE 2: MASS SPECTROMETRY (Pages 5-9)
    // ========================================
    {
        id: 'ms-introduction',
        title: 'Mass Spectrometry: Weighing Molecules',
        content: `<h4>🎯 ما هو مطياف الكتلة؟ What is Mass Spectrometry?</h4>

<p>تخيل أن لديك <strong>ميزان فائق الدقة</strong> يستطيع وزن جزيء واحد! هذا بالضبط ما يفعله مطياف الكتلة. لكنه يذهب أبعد من ذلك - فهو يكشف لك <strong>كيف يتفكك الجزيء</strong> إلى قطع أصغر.</p>

<div class="highlight-box">
<strong>🔬 المكونات الثلاثة للجهاز:</strong>
<table class="reference-table">
<thead>
<tr><th>المكون</th><th>الوظيفة</th><th>التشبيه</th></tr>
</thead>
<tbody>
<tr><td><strong>Ion Source</strong></td><td>تحويل الجزيء إلى أيون</td><td>مثل إزالة إلكترون من الجزيء</td></tr>
<tr><td><strong>Mass Analyzer</strong></td><td>فصل الأيونات حسب الكتلة</td><td>مثل غربال يفرز حسب الحجم</td></tr>
<tr><td><strong>Detector</strong></td><td>قياس كمية كل أيون</td><td>مثل عداد يحسب كل نوع</td></tr>
</tbody>
</table>
</div>

<h4>⚡ كيف يعمل؟ The Process Step-by-Step</h4>

<div class="highlight-box">
<strong>الخطوة 1: التأين (Ionization) - EI Mode</strong>
<p>يُقذف الجزيء بحزمة إلكترونات عالية الطاقة (70 eV). هذا يطرد إلكترون واحد من الجزيء:</p>
<p style="text-align: center; font-size: 1.2em; font-family: monospace;">
M + e⁻ → M<sup>+•</sup> + 2e⁻
</p>
<p>الناتج <strong>M<sup>+•</sup></strong> يُسمى <strong>Molecular Ion</strong> أو <strong>Parent Ion</strong></p>
</div>

<div class="highlight-box">
<strong>الخطوة 2: التفتت (Fragmentation)</strong>
<p>الطاقة الزائدة تجعل الجزيء غير مستقر → يتكسر إلى قطع أصغر</p>
<ul>
<li>كل قطعة مشحونة تظهر كـ <strong>Peak</strong> في الطيف</li>
<li>القطع المحايدة (بدون شحنة) <strong>لا تُكتشف</strong></li>
</ul>
</div>

<div class="highlight-box">
<strong>الخطوة 3: الفصل والكشف (Separation & Detection)</strong>
<p>الأيونات تُسرَّع في مجال كهربائي، ثم تُفصل حسب نسبة <strong>m/z</strong> (الكتلة/الشحنة)</p>
<p>معظم الأيونات لها شحنة +1، لذا <strong>m/z = الكتلة</strong></p>
</div>

<h4>📊 كيف تقرأ طيف الكتلة؟ Reading a Mass Spectrum</h4>

<div class="warning-box">
<strong>🎯 دليلك المرجعي السريع:</strong>
<ol>
<li><strong>ابحث عن أعلى m/z</strong> → هذا غالباً الـ Molecular Ion (M⁺) = الوزن الجزيئي</li>
<li><strong>ابحث عن أطول قمة</strong> → هذا الـ Base Peak (نضعه = 100%)</li>
<li><strong>احسب الفروقات</strong> → الفرق بين M⁺ والقمم الأخرى يخبرك ماذا فُقد</li>
<li><strong>تحقق من الأنماط</strong> → هل يوجد M+2؟ قد يكون Cl أو Br</li>
</ol>
</div>

<h4>📈 أنواع القمم في الطيف</h4>

<table class="reference-table">
<thead>
<tr><th>نوع القمة</th><th>الرمز</th><th>ماذا يعني؟</th><th>كيف تجده؟</th></tr>
</thead>
<tbody>
<tr>
<td><strong>Molecular Ion</strong></td>
<td>M⁺ أو M<sup>+•</sup></td>
<td>الجزيء كامل ناقص إلكترون واحد</td>
<td>عادةً أعلى m/z (لكن ليس دائماً الأطول!)</td>
</tr>
<tr>
<td><strong>Base Peak</strong></td>
<td>100%</td>
<td>الأيون الأكثر استقراراً/وفرة</td>
<td>أطول قمة في الطيف</td>
</tr>
<tr>
<td><strong>Fragment Ions</strong></td>
<td>متنوعة</td>
<td>قطع ناتجة عن تكسر الجزيء</td>
<td>قمم أصغر من M⁺</td>
</tr>
<tr>
<td><strong>M+1 Peak</strong></td>
<td>M+1</td>
<td>يحتوي ذرة ¹³C واحدة</td>
<td>بجانب M⁺، أصغر بكثير</td>
</tr>
<tr>
<td><strong>M+2 Peak</strong></td>
<td>M+2</td>
<td>يشير لوجود Cl أو Br</td>
<td>قمة بعد M⁺ بـ 2 وحدات</td>
</tr>
</tbody>
</table>

<h4>🧮 حساب الفقدانات الشائعة</h4>

<div class="highlight-box">
<strong>جدول الفقدانات المهمة:</strong>
<table class="reference-table">
<thead>
<tr><th>الفرق (Δm)</th><th>ماذا فُقد؟</th><th>التفسير</th></tr>
</thead>
<tbody>
<tr><td>-1</td><td>H•</td><td>ذرة هيدروجين</td></tr>
<tr><td>-15</td><td>CH₃•</td><td>مجموعة ميثيل</td></tr>
<tr><td>-17</td><td>OH•</td><td>مجموعة هيدروكسيل</td></tr>
<tr><td>-18</td><td>H₂O</td><td>ماء (من كحول)</td></tr>
<tr><td>-28</td><td>CO أو C₂H₄</td><td>كربونيل أو إيثيلين</td></tr>
<tr><td>-29</td><td>CHO• أو C₂H₅•</td><td>ألدهيد أو إيثيل</td></tr>
<tr><td>-31</td><td>OCH₃•</td><td>ميثوكسي</td></tr>
<tr><td>-43</td><td>CH₃CO• أو C₃H₇•</td><td>أسيتيل أو بروبيل</td></tr>
<tr><td>-45</td><td>OC₂H₅• أو CHO₂•</td><td>إيثوكسي أو فورميت</td></tr>
</tbody>
</table>
</div>

<div class="tip-box">
<strong>💡 مثال عملي:</strong>
<p>إذا رأيت M⁺ = 186 وقمة عند 171:</p>
<p>الفرق = 186 - 171 = <strong>15</strong> → فُقدت مجموعة <strong>CH₃</strong></p>
</div>`,
        keyPoints: [
            'MS يقيس نسبة الكتلة/الشحنة (m/z)',
            'Molecular Ion (M⁺) يعطيك الوزن الجزيئي مباشرة',
            'Base Peak هي أطول قمة (أكثر الأيونات استقراراً)',
            'الفرق بين القمم يكشف ما فُقد من الجزيء',
            'M+2 يشير لوجود Cl أو Br'
        ],
        molecules: [
            { name: '4-Bromoanisole', description: 'MW = 186, يظهر نمط البروم 1:1' },
            { name: 'Hexan-2-one', description: 'MW = 100, يظهر فقدان CH₃ و CH₃CO' }
        ]
    },
    {
        id: 'ms-isotopes',
        title: 'Isotope Patterns: Detecting Cl and Br',
        content: `<h4>🎲 بصمة الطبيعة - Nature's Fingerprint</h4>

<p>بعض العناصر لها <strong>نظائر متعددة</strong> توجد طبيعياً. هذا يخلق أنماطاً مميزة في طيف الكتلة تعمل كـ<strong>بصمات</strong> للعناصر!</p>

<div class="warning-box">
<strong>🔑 المفتاح:</strong> انظر دائماً إلى القمم عند <strong>M+2</strong>. إذا وجدت قمة كبيرة هناك، فهذا يعني وجود <strong>Cl</strong> أو <strong>Br</strong>!
</div>

<h4>🔬 الكلور (Chlorine): النمط 3:1</h4>

<div class="highlight-box">
<strong>نظائر الكلور:</strong>
<table class="reference-table">
<thead><tr><th>النظير</th><th>الكتلة</th><th>النسبة الطبيعية</th></tr></thead>
<tbody>
<tr><td>³⁵Cl</td><td>35</td><td><strong>75.77%</strong> (≈ 3 أجزاء)</td></tr>
<tr><td>³⁷Cl</td><td>37</td><td><strong>24.23%</strong> (≈ 1 جزء)</td></tr>
</tbody>
</table>
<p style="margin-top: 0.5rem;"><strong>النتيجة:</strong> نسبة M : M+2 = <strong>3:1</strong> (أو 100% : 33%)</p>
</div>

<div class="tip-box">
<strong>💡 كيف تتعرف على Cl؟</strong>
<p>إذا رأيت قمة M+2 تساوي <strong>ثلث</strong> ارتفاع M⁺ → يوجد <strong>كلور واحد</strong></p>
</div>

<h4>🟤 البروم (Bromine): النمط 1:1</h4>

<div class="highlight-box">
<strong>نظائر البروم:</strong>
<table class="reference-table">
<thead><tr><th>النظير</th><th>الكتلة</th><th>النسبة الطبيعية</th></tr></thead>
<tbody>
<tr><td>⁷⁹Br</td><td>79</td><td><strong>50.50%</strong></td></tr>
<tr><td>⁸¹Br</td><td>81</td><td><strong>49.50%</strong></td></tr>
</tbody>
</table>
<p style="margin-top: 0.5rem;"><strong>النتيجة:</strong> نسبة M : M+2 = <strong>1:1</strong> (قمتان متساويتان!)</p>
</div>

<div class="warning-box">
<strong>🎯 كيف تتعرف على Br؟</strong>
<p>إذا رأيت قمتين <strong>متساويتين تقريباً</strong> تفصلهما وحدتان → يوجد <strong>بروم</strong>!</p>
<p>هذا أسهل نمط للتعرف عليه في MS!</p>
</div>

<h4>📊 جدول أنماط الهالوجينات</h4>

<table class="reference-table">
<thead>
<tr><th>الهالوجين</th><th>النمط</th><th>ارتفاع M+2</th><th>الشكل</th></tr>
</thead>
<tbody>
<tr><td><strong>1 × Cl</strong></td><td>3:1</td><td>33% من M</td><td>قمة صغيرة بعد M⁺</td></tr>
<tr><td><strong>2 × Cl</strong></td><td>9:6:1</td><td>67% من M</td><td>ثلاث قمم متدرجة</td></tr>
<tr><td><strong>3 × Cl</strong></td><td>27:27:9:1</td><td>100% من M</td><td>نمط معقد</td></tr>
<tr><td><strong>1 × Br</strong></td><td>1:1</td><td>100% من M</td><td>قمتان متساويتان ⭐</td></tr>
<tr><td><strong>2 × Br</strong></td><td>1:2:1</td><td>200% من M</td><td>ثلاث قمم (الوسطى أكبر)</td></tr>
<tr><td><strong>Cl + Br</strong></td><td>3:4:1</td><td>معقد</td><td>أربع إلى ست قمم</td></tr>
</tbody>
</table>

<h4>🔢 قمة M+1: حساب عدد ذرات الكربون</h4>

<div class="highlight-box">
<strong>نظير الكربون ¹³C:</strong>
<ul>
<li>¹²C: 98.9% (الأكثر شيوعاً)</li>
<li>¹³C: <strong>1.1%</strong> (يسبب M+1)</li>
</ul>

<p><strong>القاعدة:</strong> نسبة M+1 ≈ <strong>1.1% × عدد ذرات الكربون</strong></p>
</div>

<div class="tip-box">
<strong>💡 مثال عملي:</strong>
<p>إذا كان ارتفاع M+1 = <strong>16.5%</strong> من M⁺</p>
<p>عدد الكربونات = 16.5 ÷ 1.1 = <strong>15 ذرة كربون</strong></p>
<p>هذه طريقة سريعة لتقدير الصيغة الجزيئية!</p>
</div>

<h4>🎯 ملخص سريع للتعرف</h4>

<div class="warning-box">
<strong>دليلك السريع:</strong>
<ul>
<li>قمتان <strong>متساويتان</strong> (M و M+2)؟ → <strong>Br</strong> واحد</li>
<li>M+2 = <strong>⅓</strong> من M؟ → <strong>Cl</strong> واحد</li>
<li>M+2 = <strong>⅔</strong> من M؟ → <strong>2 × Cl</strong></li>
<li>M+1 كبيرة؟ → احسب عدد الكربونات</li>
<li>لا M+2 ملحوظة؟ → لا هالوجينات ثقيلة</li>
</ul>
</div>`,
        keyPoints: [
            'Chlorine: نسبة 3:1 (M+2 = 33% من M)',
            'Bromine: نسبة 1:1 (قمتان متساويتان)',
            'M+1 peak يكشف عدد ذرات الكربون (×1.1%)',
            'نمطان Cl يعطيان 9:6:1',
            'Isotope patterns هي بصمات العناصر'
        ],
        molecules: [
            { name: 'Chloroform', description: 'CHCl₃ - نمط 3 كلورات معقد' },
            { name: 'Bromoethane', description: 'C₂H₅Br - نمط 1:1 كلاسيكي' },
            { name: 'Methylene Chloride', description: 'CH₂Cl₂ - نمط 9:6:1' }
        ]
    },
    {
        id: 'ms-high-resolution',
        title: 'High-Resolution MS: Exact Formulas',
        content: `<h4>🎯 Beyond Integer Mass</h4>

<p>Regular MS gives integer masses (114, 115, etc.). But what if two different molecules have the same integer mass?</p>

<div class="warning-box">
<strong>The Problem:</strong>
<ul>
<li>C₇H₁₄O has integer mass = 114</li>
<li>C₈H₁₈ also has integer mass = 114</li>
</ul>
How do we distinguish them?
</div>

<h4>🔬 The Solution: Exact Masses</h4>

<p>Every element has a precise mass that's NOT exactly an integer:</p>

<table class="reference-table">
<thead>
<tr><th>Element</th><th>Integer Mass</th><th>Exact Mass</th></tr>
</thead>
<tbody>
<tr><td>¹H</td><td>1</td><td>1.00783</td></tr>
<tr><td>¹²C</td><td>12</td><td>12.00000 (definition)</td></tr>
<tr><td>¹⁴N</td><td>14</td><td>14.00307</td></tr>
<tr><td>¹⁶O</td><td>16</td><td>15.99492</td></tr>
</tbody>
</table>

<h4>📊 Solving Our Example</h4>

<div class="highlight-box">
<strong>Calculating Exact Masses:</strong>

<strong>C₇H₁₄O:</strong>
7(12.00000) + 14(1.00783) + 1(15.99492) = <strong>114.1039</strong>

<strong>C₈H₁₈:</strong>
8(12.00000) + 18(1.00783) = <strong>114.1408</strong>

<em>Difference = 0.0369 (easily detected!)</em>
</div>

<h4>🔢 The Nitrogen Rule</h4>

<div class="tip-box">
<strong>💡 Nitrogen Rule:</strong>
<ul>
<li>Molecules with <strong>EVEN</strong> MW have <strong>zero or EVEN</strong> nitrogen atoms</li>
<li>Molecules with <strong>ODD</strong> MW have <strong>ODD</strong> nitrogen atoms</li>
</ul>
<em>Example: MW = 121 (odd) → contains 1 or 3 nitrogens</em>
</div>`,
        keyPoints: [
            'High-resolution MS measures masses to 4+ decimal places',
            'Exact masses distinguish isomeric formulas',
            'Carbon is exactly 12.00000 by definition',
            'Nitrogen Rule: Odd MW = Odd N count'
        ]
    },
    {
        id: 'ms-fragmentation',
        title: 'Fragmentation: How Molecules Break Apart',
        content: `<h4>⚡ لماذا يتفتت الجزيء؟ Why Do Molecules Fragment?</h4>

<p>بعد التأين، يحتوي الـ Molecular Ion (M⁺) على <strong>طاقة زائدة</strong>. هذه الطاقة تكسر الروابط الأضعف!</p>

<div class="highlight-box">
<strong>🔑 القاعدة الذهبية:</strong>
<ul>
<li>الروابط <strong>C-C</strong> أضعف من <strong>C-H</strong> → تنكسر أولاً</li>
<li>الشظايا الأكثر <strong>استقراراً</strong> تظهر بكثافة أعلى</li>
<li>الـ <strong>Base Peak</strong> هي الشظية الأكثر استقراراً</li>
</ul>
</div>

<h4>🎯 أنواع التفتت الرئيسية</h4>

<div class="highlight-box">
<strong>1️⃣ Alpha-Cleavage (α-Cleavage)</strong>
<p>الانكسار بجانب ذرة تحمل زوج إلكترونات حرة (O, N, S, X)</p>
<ul>
<li>الكحولات: تفقد H₂O أو تنكسر عند الـ C-C المجاور لـ OH</li>
<li>الأمينات: تنكسر عند الـ C-C المجاور لـ N</li>
<li>الكيتونات: تفقد مجموعات ألكيل من جانبي C=O</li>
</ul>
</div>

<div class="highlight-box">
<strong>2️⃣ McLafferty Rearrangement</strong>
<p>إعادة ترتيب خاصة تحدث مع الكربونيلات التي لها سلسلة γ-H</p>
<ul>
<li>ينتقل H من الموضع γ</li>
<li>تنكسر الرابطة β</li>
<li>يُفقد ألكين محايد</li>
</ul>
<p style="font-family: monospace;">مثال: الكيتون يفقد ألكين ويعطي enol cation</p>
</div>

<h4>📊 جدول الشظايا الشائعة</h4>

<table class="reference-table">
<thead>
<tr><th>m/z</th><th>الشظية</th><th>مصدرها</th></tr>
</thead>
<tbody>
<tr><td>15</td><td>CH₃⁺</td><td>مجموعة ميثيل</td></tr>
<tr><td>29</td><td>CHO⁺ أو C₂H₅⁺</td><td>ألدهيد أو إيثيل</td></tr>
<tr><td>43</td><td>CH₃CO⁺ أو C₃H₇⁺</td><td>أسيتيل أو بروبيل</td></tr>
<tr><td>57</td><td>C₄H₉⁺</td><td>t-Butyl (مستقر جداً!)</td></tr>
<tr><td>77</td><td>C₆H₅⁺</td><td>حلقة بنزين (Phenyl)</td></tr>
<tr><td>91</td><td>C₇H₇⁺</td><td>Tropylium / Benzyl</td></tr>
<tr><td>105</td><td>C₆H₅CO⁺</td><td>Benzoyl</td></tr>
</tbody>
</table>

<h4>🏆 استقرار الكاتيونات</h4>

<div class="warning-box">
<strong>ترتيب الاستقرار (من الأكثر إلى الأقل):</strong>
<p style="text-align: center; font-size: 1.1em;">
<strong>Tropylium (91)</strong> > <strong>Tertiary</strong> > <strong>Allyl/Benzyl</strong> > <strong>Secondary</strong> > <strong>Primary</strong> > <strong>Methyl</strong>
</p>
<p>الكاتيون الأكثر استقراراً يظهر كـ Base Peak!</p>
</div>

<div class="tip-box">
<strong>💡 مثال: Hexan-2-one (C₆H₁₂O)</strong>
<ul>
<li>M⁺ = 100</li>
<li>فقدان CH₃ → m/z = 85</li>
<li>فقدان CH₃CO (43) → m/z = 57 (butyl)</li>
<li>CH₃CO⁺ → m/z = 43 (base peak غالباً)</li>
</ul>
</div>`,
        keyPoints: [
            'Alpha-cleavage: انكسار بجانب O, N, S',
            'الكاتيونات المستقرة تظهر بكثافة أعلى',
            'm/z = 91 (Tropylium) يشير للمركبات العطرية',
            'm/z = 43 (Acetyl) شائع في الكيتونات',
            'الفرق بين القمم يكشف ما فُقد'
        ],
        molecules: [
            { name: 'Hexan-2-one', description: 'يظهر α-cleavage واضح' },
            { name: 'Benzyl Alcohol', description: 'يعطي m/z = 91 (Tropylium)' }
        ]
    },
    {
        id: 'ms-advanced-biomolecules',
        title: 'MS للجزيئات الكبيرة: البروتينات والكربوهيدرات',
        content: `<h4>🧬 لماذا EI لا يعمل مع الجزيئات الكبيرة؟</h4>

<p>تقنية <strong>Electron Impact (EI)</strong> التي درسناها تعمل بشكل ممتاز مع الجزيئات الصغيرة (MW < 1000). لكن مع البروتينات والكربوهيدرات:</p>

<div class="warning-box">
<strong>⚠️ المشكلة:</strong>
<ul>
<li>الجزيئات الكبيرة <strong>لا تتبخر</strong> بسهولة (تتحلل قبل أن تتبخر)</li>
<li>حتى لو تبخرت، الطاقة العالية تكسرها إلى قطع صغيرة جداً</li>
<li>نفقد معلومات الوزن الجزيئي!</li>
</ul>
</div>

<h4>🌊 الحل: تقنيات التأين اللطيفة (Soft Ionization)</h4>

<div class="highlight-box">
<strong>1️⃣ ESI - Electrospray Ionization</strong>
<p><em>تُستخدم للبروتينات والببتيدات والأحماض النووية</em></p>
<ul>
<li>المحلول يُرش عبر إبرة مشحونة</li>
<li>تتكون <strong>قطرات صغيرة مشحونة</strong></li>
<li>المذيب يتبخر → تبقى الأيونات</li>
<li><strong>ميزة:</strong> شحنات متعددة (+2, +3, +10...) تخفض m/z المقاس</li>
</ul>
</div>

<div class="tip-box">
<strong>💡 لماذا الشحنات المتعددة مفيدة؟</strong>
<p>بروتين وزنه <strong>50,000 Da</strong> مع +50 شحنة:</p>
<p style="text-align: center; font-family: monospace;">m/z = 50,000 ÷ 50 = <strong>1000</strong></p>
<p>يمكن قياسه بأجهزة عادية!</p>
</div>

<div class="highlight-box">
<strong>2️⃣ MALDI - Matrix-Assisted Laser Desorption/Ionization</strong>
<p><em>تُستخدم للبوليمرات والكربوهيدرات والبروتينات</em></p>
<ul>
<li>العينة تُخلط مع <strong>مصفوفة (Matrix)</strong> ماصة للضوء</li>
<li>ليزر يضرب المصفوفة → تتبخر وتحمل العينة معها</li>
<li>تأين لطيف يحافظ على الجزيء سليماً</li>
<li><strong>ميزة:</strong> عادة شحنة واحدة (+1) → m/z = MW مباشرة</li>
</ul>
</div>

<h4>🏛️ معهد Ferrier للأبحاث - Ferrier Research Institute</h4>

<div class="highlight-box">
<strong>🔬 من هم؟</strong>
<p>مركز أبحاث عالمي في <strong>جامعة فيكتوريا ويلينغتون</strong> (نيوزيلندا) متخصص في:</p>
<ul>
<li>🧪 كيمياء الكربوهيدرات</li>
<li>🧬 تحليل البروتينات السكرية (Glycoproteins)</li>
<li>💊 اكتشاف الأدوية</li>
</ul>
</div>

<div class="highlight-box">
<strong>🎯 كيف يستخدمون MS؟</strong>

<table class="reference-table">
<thead>
<tr><th>التطبيق</th><th>التقنية</th><th>ماذا يقيسون؟</th></tr>
</thead>
<tbody>
<tr>
<td>تحليل السكريات</td>
<td>GC-MS, LC-MS</td>
<td>أنواع السكريات ورباطاتها</td>
</tr>
<tr>
<td>البروتينات السكرية</td>
<td>LC-HRMS</td>
<td>مواقع الارتباط، تركيب السلاسل</td>
</tr>
<tr>
<td>تسلسل السكريات</td>
<td>Ion Mobility MS</td>
<td>ترتيب السكريات في السلسلة</td>
</tr>
<tr>
<td>الهيبارين والجليكانات</td>
<td>Shotgun MS</td>
<td>بنية السكريات المعقدة</td>
</tr>
</tbody>
</table>
</div>

<h4>🌍 تطبيقات حقيقية</h4>

<div class="tip-box">
<strong>💊 في اكتشاف الأدوية:</strong>
<ul>
<li>تحديد بنية الجليكانات على سطح الخلايا</li>
<li>فهم كيف ترتبط الفيروسات بالخلايا</li>
<li>تطوير لقاحات تستهدف السكريات السطحية</li>
</ul>
</div>

<div class="warning-box">
<strong>🔬 مثال:</strong>
<p>لتحليل <strong>Heparan Sulfate</strong> (سكريد معقد):</p>
<ol>
<li>تحضير العينة مع Matrix مناسبة</li>
<li>MALDI-TOF للوزن الجزيئي</li>
<li>MS/MS للتجزئة والتسلسل</li>
<li>Ion Mobility لفصل الأيزومرات</li>
</ol>
</div>

<h4>📊 مقارنة التقنيات</h4>

<table class="reference-table">
<thead>
<tr><th>الخاصية</th><th>EI</th><th>ESI</th><th>MALDI</th></tr>
</thead>
<tbody>
<tr><td>نوع العينة</td><td>صغيرة، متطايرة</td><td>محلول</td><td>صلبة/محلول</td></tr>
<tr><td>الوزن الجزيئي</td><td>< 1000</td><td>> 100,000</td><td>> 1,000,000</td></tr>
<tr><td>التفتت</td><td>كثير</td><td>قليل</td><td>قليل جداً</td></tr>
<tr><td>الشحنات</td><td>+1</td><td>متعددة</td><td>+1 غالباً</td></tr>
<tr><td>الاستخدام</td><td>مركبات عضوية صغيرة</td><td>بروتينات</td><td>بوليمرات، كربوهيدرات</td></tr>
</tbody>
</table>`,
        keyPoints: [
            'EI للجزيئات الصغيرة (MW < 1000)',
            'ESI للبروتينات - يعطي شحنات متعددة',
            'MALDI للكربوهيدرات والبوليمرات',
            'معهد Ferrier رائد في تحليل الجليكانات',
            'Soft ionization يحافظ على الجزيء سليماً'
        ],
        molecules: [
            { name: 'Insulin', description: 'بروتين 5.8 kDa - يُحلل بـ ESI' },
            { name: 'Heparin', description: 'سكريد معقد - يُحلل بـ MALDI' }
        ]
    },

    // ========================================
    // MODULE 2: 13C NMR
    // ========================================
    {
        id: 'nmr-13c-introduction',
        title: '¹³C NMR: Mapping the Carbon Skeleton',
        content: `<h4>🧲 Nuclear Magnetic Resonance</h4>

<p>NMR spectroscopy uses magnetic fields to probe atomic nuclei. For organic chemists, ¹³C NMR reveals the carbon backbone of molecules!</p>

<div class="highlight-box">
<strong>Why ¹³C NMR?</strong>
<ul>
<li>🦴 Shows the <strong>carbon skeleton</strong> directly</li>
<li>📍 Each carbon in a <strong>different environment</strong> gives a different signal</li>
<li>🔢 Count the peaks → count the carbon environments!</li>
</ul>
</div>

<h4>📏 The Chemical Shift Scale (ppm)</h4>

<p>Chemical shift (δ) is measured in parts per million (ppm) relative to TMS:</p>

<table class="reference-table">
<thead>
<tr><th>Region (ppm)</th><th>Carbon Type</th><th>Examples</th></tr>
</thead>
<tbody>
<tr><td>0-50</td><td>Saturated (sp³)</td><td>CH₃, CH₂, CH</td></tr>
<tr><td>50-100</td><td>Next to O or N</td><td>C-O, C-N</td></tr>
<tr><td>100-150</td><td>Unsaturated (sp²)</td><td>C=C, Aromatic</td></tr>
<tr><td>150-220</td><td>Carbonyl</td><td>C=O (aldehydes, ketones, acids)</td></tr>
</tbody>
</table>

<div class="warning-box">
<strong>⚠️ Remember:</strong> TMS (tetramethylsilane) is the reference at <strong>0 ppm</strong>.
All other carbons appear "downfield" (to the left) of TMS.
</div>

<h4>🛡️ Shielding and Deshielding</h4>

<ul>
<li><strong>High electron density</strong> → MORE shielding → signal moves RIGHT (upfield, toward 0)</li>
<li><strong>Low electron density</strong> (near O, N) → LESS shielding → signal moves LEFT (downfield)</li>
</ul>`,
        keyPoints: [
            '¹³C NMR reveals the carbon skeleton',
            'Chemical shift measured in ppm vs TMS (0 ppm)',
            'Four regions: Saturated, C-O/N, Unsaturated, Carbonyl',
            'More electron density = more shielding = upfield shift'
        ],
        molecules: [
            { name: 'Lactic Acid', description: 'Three distinct carbon signals' },
            { name: 'Ethanol', description: 'Two carbons in different environments' }
        ]
    },
    {
        id: 'nmr-symmetry',
        title: 'Symmetry: When Carbons Look the Same',
        content: `<h4>🪞 The Power of Symmetry</h4>

<p>Here's a powerful principle: <strong>Carbons in identical environments give the SAME signal!</strong></p>

<div class="highlight-box">
<strong>Example: BHT (C₁₅H₂₄O)</strong>
<ul>
<li>Has 15 carbon atoms</li>
<li>But only shows <strong>7 peaks</strong> in ¹³C NMR!</li>
<li>Why? Due to the molecule's plane of symmetry</li>
</ul>
</div>

<h4>📊 Counting Signals</h4>

<table class="reference-table">
<thead>
<tr><th>Molecule</th><th>Carbons</th><th>¹³C Signals</th><th>Symmetry</th></tr>
</thead>
<tbody>
<tr><td>Ethane (C₂H₆)</td><td>2</td><td>1</td><td>Both CH₃ identical</td></tr>
<tr><td>Propane (C₃H₈)</td><td>3</td><td>2</td><td>Two ends identical</td></tr>
<tr><td>Benzene (C₆H₆)</td><td>6</td><td>1</td><td>All 6 carbons identical!</td></tr>
<tr><td>Adipic acid</td><td>6</td><td>3</td><td>Plane through center</td></tr>
</tbody>
</table>

<div class="tip-box">
<strong>💡 Pro Tip:</strong> Fewer peaks than expected? Look for symmetry!
More peaks than expected? Look for isomers or impurities!
</div>

<h4>🎯 Identifying Equivalent Carbons</h4>

<p>Carbons are equivalent if:</p>
<ol>
<li>They can be interchanged by a symmetry operation (rotation, mirror)</li>
<li>They're chemically and magnetically identical</li>
</ol>`,
        keyPoints: [
            'Equivalent carbons give ONE signal',
            'Symmetry reduces the number of peaks',
            'Benzene: 6 carbons but only 1 signal!',
            'Count signals to probe molecular symmetry'
        ],
        molecules: [
            { name: 'BHT', description: '15 carbons → 7 signals due to symmetry' },
            { name: 'Adipic Acid', description: '6 carbons → 3 signals' }
        ]
    },

    // ========================================
    // MODULE 3: 1H NMR  
    // ========================================
    {
        id: 'nmr-1h-introduction',
        title: '¹H NMR: Proton Environments',
        content: `<h4>🎯 The Proton Perspective</h4>

<p>While ¹³C NMR maps the carbon skeleton, ¹H NMR focuses on hydrogen atoms. It's actually MORE sensitive because:</p>

<div class="highlight-box">
<strong>Why ¹H NMR is King:</strong>
<ul>
<li>⚡ <strong>100% natural abundance</strong> of ¹H (vs only 1.1% for ¹³C)</li>
<li>📊 Much stronger signals</li>
<li>🔢 Peak integration shows the <strong>number of hydrogens</strong></li>
</ul>
</div>

<h4>📏 The 0-12 ppm Scale</h4>

<p>Proton chemical shifts are compressed into a much narrower range than ¹³C:</p>

<table class="reference-table">
<thead>
<tr><th>Region (ppm)</th><th>Proton Type</th><th>Examples</th></tr>
</thead>
<tbody>
<tr><td>0-2</td><td>Alkyl (saturated)</td><td>CH₃, CH₂</td></tr>
<tr><td>2-4.5</td><td>Next to C=O or C=C</td><td>CH₃CO-, allylic</td></tr>
<tr><td>4.5-6.5</td><td>Vinyl / alkene</td><td>=CH₂, =CH-</td></tr>
<tr><td>6.5-8.5</td><td>Aromatic</td><td>Benzene rings</td></tr>
<tr><td>9-10</td><td>Aldehyde</td><td>-CHO</td></tr>
<tr><td>10-12</td><td>Carboxylic acid</td><td>-COOH</td></tr>
</tbody>
</table>

<h4>🔄 ¹³C vs ¹H: Same Molecule, Different View</h4>

<div class="tip-box">
<strong>Acetic Acid Example:</strong>
<ul>
<li>¹³C NMR: 2 peaks at ~20 ppm (CH₃) and ~180 ppm (C=O)</li>
<li>¹H NMR: 2 peaks at ~2 ppm (CH₃) and ~11 ppm (COOH)</li>
</ul>
Same molecule, completely different scales!
</div>`,
        keyPoints: [
            '¹H NMR is more sensitive (100% natural abundance)',
            '0-12 ppm scale (vs 0-200 ppm for ¹³C)',
            'Peak integration reveals H count',
            'Aromatic H: 6.5-8.5 ppm, Aldehyde H: 9-10 ppm'
        ],
        molecules: [
            { name: 'Acetic Acid', description: 'Compare ¹³C vs ¹H spectra' },
            { name: 'Benzene', description: 'Single peak at 7.5 ppm' }
        ]
    },

    // ========================================
    // MODULE 4: IR SPECTROSCOPY
    // ========================================
    {
        id: 'ir-introduction',
        title: 'IR Spectroscopy: Seeing Functional Groups',
        content: `<h4>🌊 Vibrating Bonds</h4>

<p>Infrared (IR) spectroscopy detects the vibrations of chemical bonds. Different functional groups vibrate at characteristic frequencies!</p>

<div class="highlight-box">
<strong>What IR Detects:</strong>
<ul>
<li>🔗 <strong>Bond stretching</strong> - bonds getting longer/shorter</li>
<li>📐 <strong>Bond bending</strong> - angles changing</li>
<li>🎯 <strong>Functional groups</strong> - each has a unique pattern!</li>
</ul>
</div>

<h4>📊 The Wavenumber Scale</h4>

<p>IR uses <strong>wavenumber (cm⁻¹)</strong> not wavelength. Higher number = higher frequency = stronger bond.</p>

<h4>🎯 The Four Key Regions</h4>

<table class="reference-table">
<thead>
<tr><th>Region (cm⁻¹)</th><th>Bond Type</th><th>Shape/Notes</th></tr>
</thead>
<tbody>
<tr><td>3200-3600</td><td>O-H, N-H</td><td>Broad (H-bonded) or sharp (free)</td></tr>
<tr><td>2800-3100</td><td>C-H</td><td>Always present in organic molecules</td></tr>
<tr><td>2100-2300</td><td>C≡C, C≡N</td><td>Triple bonds - sharp peak</td></tr>
<tr><td>1600-1800</td><td>C=O, C=C</td><td>Double bonds - very diagnostic!</td></tr>
</tbody>
</table>

<div class="warning-box">
<strong>⚠️ The Fingerprint Region (< 1500 cm⁻¹):</strong>
This region is complex and unique to each molecule. Don't try to interpret individual peaks - use it for comparison only!
</div>

<h4>⚛️ Why Bond Strength Matters (Hooke's Law)</h4>

<ul>
<li><strong>Stronger bond</strong> → higher frequency (e.g., C≡C > C=C > C-C)</li>
<li><strong>Heavier atoms</strong> → lower frequency (e.g., C-Cl < C-H)</li>
</ul>`,
        keyPoints: [
            'IR detects bond vibrations (stretching/bending)',
            'Wavenumber scale: 4000-500 cm⁻¹',
            'O-H and N-H: 3200-3600 cm⁻¹ (often broad)',
            'C=O: ~1700 cm⁻¹ (strongest, most diagnostic peak!)'
        ],
        molecules: [
            { name: 'Paracetamol', description: 'Multiple IR regions visible' },
            { name: 'Cyanoacetamide', description: 'Shows C≡N and amide bands' }
        ]
    },
    {
        id: 'ir-hydrogen-bonding',
        title: 'Hydrogen Bonding in IR',
        content: `<h4>🔗 The Shape Tells the Story</h4>

<p>The appearance of O-H and N-H peaks in IR reveals whether hydrogen bonding is present:</p>

<div class="highlight-box">
<h5>O-H Peak Shapes:</h5>
<table>
<tr><td><strong>Free O-H:</strong></td><td>Sharp peak at ~3600 cm⁻¹</td></tr>
<tr><td><strong>H-bonded O-H (alcohol):</strong></td><td>Broad "U" shape, 3200-3400 cm⁻¹</td></tr>
<tr><td><strong>Carboxylic acid O-H:</strong></td><td>Very broad "V", 2500-3300 cm⁻¹</td></tr>
</table>
</div>

<h4>🧪 N-H Patterns</h4>

<table class="reference-table">
<thead>
<tr><th>Group</th><th>Pattern</th><th>Explanation</th></tr>
</thead>
<tbody>
<tr><td>-NH₂ (primary amine/amide)</td><td>Two peaks</td><td>Symmetric + antisymmetric stretch</td></tr>
<tr><td>-NH (secondary)</td><td>One peak</td><td>Single N-H stretch</td></tr>
</tbody>
</table>

<div class="tip-box">
<strong>💡 Pro Tip:</strong> The carbonyl peak (C=O) at ~1700 cm⁻¹ is usually the STRONGEST peak in the spectrum. It's the most diagnostic feature for identifying aldehydes, ketones, esters, and acids!
</div>`,
        keyPoints: [
            'Broad O-H = hydrogen bonding present',
            'Sharp O-H = no hydrogen bonding (dilute solution)',
            'Carboxylic acid O-H is very broad (overlaps C-H region)',
            'C=O is the strongest, most diagnostic peak'
        ]
    },

    // ========================================
    // MODULE 5: PROBLEM SOLVING
    // ========================================
    {
        id: 'dbe-calculation',
        title: 'Double Bond Equivalents (DBE)',
        content: `<h4>🧮 Counting Unsaturation</h4>

<p>Before interpreting spectra, calculate the <strong>Double Bond Equivalent (DBE)</strong> - also called degree of unsaturation. This tells you how many rings OR double bonds your molecule has!</p>

<div class="highlight-box">
<h5>📐 The Formula:</h5>
<p style="font-size: 1.2em; text-align: center;">
<strong>DBE = C + 1 - H/2 + N/2</strong>
</p>
<p style="font-size: 0.9em;">(Halogens count as H, Oxygen is ignored)</p>
</div>

<h4>📊 What DBE Values Mean</h4>

<table class="reference-table">
<thead>
<tr><th>DBE</th><th>Possible Structures</th></tr>
</thead>
<tbody>
<tr><td>0</td><td>Saturated, no rings</td></tr>
<tr><td>1</td><td>One double bond OR one ring</td></tr>
<tr><td>2</td><td>Two double bonds, one triple bond, or combinations</td></tr>
<tr><td>4</td><td>Benzene ring (3 C=C + ring)</td></tr>
<tr><td>≥4</td><td>Suspect aromatic ring!</td></tr>
</tbody>
</table>

<h4>🎯 Worked Examples</h4>

<div class="highlight-box">
<strong>Example 1: C₆H₆ (Benzene)</strong>
<ul>
<li>DBE = 6 + 1 - 6/2 = 6 + 1 - 3 = <strong>4</strong></li>
<li>This matches: 1 ring + 3 double bonds = benzene!</li>
</ul>

<strong>Example 2: C₅H₉BrO₂</strong>
<ul>
<li>Br counts as H → C₅H₁₀O₂</li>
<li>DBE = 5 + 1 - 10/2 = 5 + 1 - 5 = <strong>1</strong></li>
<li>Either one ring OR one double bond</li>
</ul>
</div>`,
        keyPoints: [
            'DBE = C + 1 - H/2 + N/2',
            'DBE = 4 strongly suggests a benzene ring',
            'Halogens count as H in the formula',
            'Oxygen is ignored in DBE calculation'
        ]
    },
    {
        id: 'problem-solving-strategy',
        title: 'Solving Structural Problems',
        content: `<h4>🔍 The Detective's Toolkit</h4>

<p>When faced with an unknown compound, follow this systematic approach:</p>

<div class="highlight-box">
<h5>Step-by-Step Strategy:</h5>
<ol>
<li><strong>MS:</strong> Get the molecular formula (or at least MW)</li>
<li><strong>DBE:</strong> Calculate degree of unsaturation</li>
<li><strong>IR:</strong> Identify functional groups (C=O, O-H, N-H, etc.)</li>
<li><strong>¹³C NMR:</strong> Count carbon environments</li>
<li><strong>¹H NMR:</strong> Map hydrogen environments</li>
<li><strong>Assemble:</strong> Put the pieces together!</li>
</ol>
</div>

<h4>🧩 Case Study: Unknown Compound X</h4>

<p>A reaction of <strong>Propenal (MW 56) + Ethylene Glycol (MW 62) + HBr</strong> gives a product with MW 181.</p>

<table class="reference-table">
<thead>
<tr><th>Step</th><th>Data</th><th>Conclusion</th></tr>
</thead>
<tbody>
<tr><td>Mass</td><td>181 - 56 - 62 = 63</td><td>Lost ~18 (water) + added ~81 (HBr)</td></tr>
<tr><td>Formula</td><td>C₅H₉BrO₂</td><td>-</td></tr>
<tr><td>DBE</td><td>1</td><td>One ring OR one C=C</td></tr>
<tr><td>IR</td><td>No C=O, no O-H</td><td>Not aldehyde, not alcohol</td></tr>
<tr><td>NMR</td><td>Symmetric C-O-C-O-C</td><td>Acetal linkage!</td></tr>
</tbody>
</table>

<div class="tip-box">
<strong>💡 Answer:</strong> The product is a <strong>cyclic acetal</strong> (1,3-dioxolane derivative) with a bromomethyl group!
</div>

<h4>🎯 Practice Makes Perfect</h4>

<p>The best way to master structure determination is practice. Try solving problems where you:</p>
<ul>
<li>Start with spectra and work backwards to structure</li>
<li>Predict spectra from known structures</li>
<li>Compare similar molecules to see pattern differences</li>
</ul>`,
        keyPoints: [
            'Follow the systematic approach: MS → DBE → IR → NMR',
            'Each technique provides different information',
            'Combine all data to narrow down possibilities',
            'Practice is essential for mastery!'
        ],
        molecules: [
            { name: 'Acrolein', description: 'Propenal - starting material' },
            { name: 'Ethylene Glycol', description: '1,2-Diol - reacts to form acetal' }
        ]
    }
];
