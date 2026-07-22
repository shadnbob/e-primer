// tests/unit/explainer-conventions.test.js

/**
 * TESTING: Explainer conventions (all types) + the civics / econterms /
 * epistemics dictionaries
 *
 * The first block is a meta-test driven from BiasConfig: every type marked
 * isExplainer — current and future — must live in the explainer category,
 * carry subcategories with full metadata, default on, and compile patterns.
 * Adding a new explainer automatically enrolls it here.
 *
 * The rest pins detection, attribution, and precision guards for the three
 * newest explainers: Speech & Civic Terms, Economic Terms, and
 * Media & Truth Terms.
 */

import { BiasConfig } from '../../src/config/BiasConfig.js';
import { BiasPatterns } from '../../src/dictionaries/index.js';
import { BiasDetector } from '../../src/content/BiasDetector.js';
import { HoverContentGenerator } from '../../src/utils/HoverContentGenerator.js';

describe('Explainer conventions (all isExplainer types)', () => {
  const explainerConfigs = Object.values(BiasConfig.BIAS_TYPES).filter(c => c.isExplainer);
  const patterns = new BiasPatterns();

  test('there are eight explainer types', () => {
    expect(explainerConfigs.map(c => c.id).sort()).toEqual(
      ['civics', 'debate', 'econterms', 'epistemics', 'fallacy', 'isms', 'scistats', 'spectrum']
    );
  });

  test.each(explainerConfigs.map(c => [c.id, c]))(
    '%s follows the explainer conventions',
    (id, config) => {
      expect(config.category).toBe('explainer');
      expect(config.enabled).toBe(true);
      expect(config.subCategories && Object.keys(config.subCategories).length).toBeGreaterThan(0);

      for (const [subId, sub] of Object.entries(config.subCategories)) {
        for (const field of ['name', 'icon', 'color', 'description', 'implication', 'suggestion', 'settingKey', 'statKey', 'basicTip', 'whenConcerning', 'whenAcceptable']) {
          expect(sub[field], `${id}.${subId}.${field}`).toBeTruthy();
        }
      }

      // Patterns compile and the subcategory dictionary agrees with config
      expect(patterns.getCompiledPatterns(id).length).toBeGreaterThan(0);
      const defaults = BiasConfig.getDefaultSettings();
      expect(defaults[config.settingKey]).toBe(true);
    }
  );

  test('every explainer renders a Context badge, never a severity level', () => {
    const generator = new HoverContentGenerator();
    for (const config of explainerConfigs) {
      const [subId, sub] = Object.entries(config.subCategories)[0];
      const html = generator.generateHoverContent({
        text: 'sample',
        type: `${config.id}_${subId}`,
        parentType: config.id,
        subCategory: { id: subId, ...sub },
        intensity: 2
      });
      expect(html, config.id).toContain('>Context<');
      expect(html, config.id).not.toContain('>Moderate<');
    }
  });

  test('explainer cards use the teaching sequence, not the warning layout', () => {
    const generator = new HoverContentGenerator();
    const config = BiasConfig.BIAS_TYPES.DEBATE;
    const sub = { id: 'tolerance_paradox', ...config.subCategories.tolerance_paradox };
    const html = generator.generateHoverContent({
      text: 'paradox of tolerance',
      type: 'debate_tolerance_paradox',
      parentType: 'debate',
      subCategory: sub,
      intensity: 2
    });

    // Fact-first: scaffold → story → usage → solid → shaky → question
    const scaffold = html.indexOf('hover-card-reason');
    const story = html.indexOf('Where it comes from:');
    const usage = html.indexOf('How it gets used:');
    const solid = html.indexOf('On solid ground:');
    const shaky = html.indexOf('On shaky ground:');
    const ask = html.indexOf('Worth asking:');

    expect(scaffold).toBeGreaterThan(-1);
    expect(story).toBeGreaterThan(scaffold);
    expect(usage).toBeGreaterThan(story);   // misuse never leads
    expect(solid).toBeGreaterThan(usage);
    expect(shaky).toBeGreaterThan(solid);   // legitimate use shown first
    expect(ask).toBeGreaterThan(shaky);     // ends on curiosity

    // The teaching content is all there…
    expect(html).toContain('Popper');
    expect(html).toContain('1945');
    // …the scaffold states the paradox plainly for zero-knowledge readers…
    expect(html).toContain('cannot extend unlimited tolerance');
    // …the label doesn't stutter into the imperative ("Worth asking: Ask…")…
    expect(html).not.toContain('Worth asking:</strong> Ask');
    // …and the warning vocabulary is gone from explainer cards
    expect(html).not.toContain('Implication:');
    expect(html).not.toContain('When to be concerned:');
    expect(html).not.toContain('Look for:');
  });

  test('config content contains no stray markdown emphasis', () => {
    // Cards render config strings as raw HTML, so *word* shows its
    // asterisks; emphasis must use <em> tags
    const offenders = [];
    const scan = (value, path) => {
      if (typeof value === 'string') {
        if (/\*[a-z]+\*/i.test(value)) offenders.push(path);
      } else if (Array.isArray(value)) {
        value.forEach((v, i) => scan(v, `${path}[${i}]`));
      } else if (value && typeof value === 'object') {
        for (const [key, v] of Object.entries(value)) scan(v, `${path}.${key}`);
      }
    };
    for (const config of Object.values(BiasConfig.BIAS_TYPES)) scan(config, config.id);
    expect(offenders).toEqual([]);
  });

  test('bias-type cards keep the warning layout', () => {
    const generator = new HoverContentGenerator();
    const html = generator.generateHoverContent({ text: 'obviously', type: 'opinion', intensity: 2 });
    expect(html).toContain('When to be concerned:');
    expect(html).toContain('>Moderate<');
  });
});

describe('Speech & Civic Terms detection', () => {
  let detector, patterns;
  beforeEach(() => { detector = new BiasDetector(); patterns = detector.compiledDetectors.get('civics').patterns; });
  afterEach(() => detector.destroy());
  const subsOf = text => detector.detectPatterns(text, patterns, 'civics').map(m => m.subCategory && m.subCategory.id);

  test('families detect and attribute', () => {
    expect(subsOf('They said the takedown was censorship and violated their free speech.'))
      .toEqual(expect.arrayContaining(['censorship', 'free_speech']));
    expect(subsOf('The First Amendment claim failed, but the court found the post defamatory.'))
      .toEqual(expect.arrayContaining(['free_speech', 'legal_standards']));
    expect(subsOf('You have a right to due process, he insisted.'))
      .toEqual(expect.arrayContaining(['rights', 'legal_standards']));
    expect(subsOf('He was deplatformed after the shadow ban.')).toContain('censorship');
  });

  test('everyday senses stay unmatched', () => {
    expect(subsOf('The banned substances list grew, and animal rights groups objected.')).toEqual([]);
    expect(subsOf('The priest swung the censer during the procession.')).toEqual([]);
  });
});

describe('Economic Terms detection', () => {
  let detector, patterns;
  beforeEach(() => { detector = new BiasDetector(); patterns = detector.compiledDetectors.get('econterms').patterns; });
  afterEach(() => detector.destroy());
  const subsOf = text => detector.detectPatterns(text, patterns, 'econterms').map(m => m.subCategory && m.subCategory.id);

  test('families detect and attribute', () => {
    expect(subsOf('Inflation is cooling, yet the national debt keeps climbing.'))
      .toEqual(expect.arrayContaining(['inflation', 'deficit_debt']));
    expect(subsOf('Economists debated whether the recession was bad for the economy.'))
      .toEqual(expect.arrayContaining(['recession_economy']));
    expect(subsOf('Record profits arrived while the middle class squeezed budgets.'))
      .toEqual(expect.arrayContaining(['class_records']));
    expect(subsOf('Cutting the deficit remained the budget deficit hawks\' goal.'))
      .toContain('deficit_debt');
  });

  test('sports, weather, and balloons stay unmatched', () => {
    expect(subsOf('The team erased the deficit in the fourth quarter.')).toEqual([]);
    expect(subsOf('Record high temperatures hit the region.')).toEqual([]);
    expect(subsOf('She deflated the balloon after the party.')).toEqual([]);
  });
});

describe('Discourse Concepts detection', () => {
  let detector, patterns;
  beforeEach(() => { detector = new BiasDetector(); patterns = detector.compiledDetectors.get('debate').patterns; });
  afterEach(() => detector.destroy());
  const subsOf = text => detector.detectPatterns(text, patterns, 'debate').map(m => m.subCategory && m.subCategory.id);

  test('families detect and attribute', () => {
    expect(subsOf('They invoked the paradox of tolerance to justify the ban.')).toContain('tolerance_paradox');
    // Tolerance-talk triggers are their own family now: the Popper card
    // presumes the paradox was invoked, which "demanding tolerance" isn't
    expect(subsOf('Critics demanding tolerance were accused of preaching tolerance selectively.'))
      .toEqual(expect.arrayContaining(['tolerance_talk']));
    expect(subsOf('Critics demanding tolerance were accused of preaching tolerance selectively.'))
      .not.toContain('tolerance_paradox');
    expect(subsOf('We must be intolerant of intolerance, the pamphlet said.')).toContain('tolerance_paradox');
    expect(subsOf('That is a slippery slope argument, and the thin end of the wedge.'))
      .toEqual(expect.arrayContaining(['slippery_slope']));
    expect(subsOf('Pure whataboutism, she replied — a classic tu quoque.'))
      .toEqual(expect.arrayContaining(['whataboutism']));
    expect(subsOf('He attacked a straw man, then finished with an ad hominem instead of a steelman.'))
      .toEqual(expect.arrayContaining(['strawman_adhominem']));
    expect(subsOf('The proposal sits outside the Overton window.')).toContain('overton_window');
    expect(subsOf('A textbook motte-and-bailey, the reviewer wrote.')).toContain('motte_bailey');
  });

  test('engineering, policy, and literal senses stay unmatched', () => {
    expect(subsOf('The machinist checked the tolerance on the bearing.')).toEqual([]);
    expect(subsOf('Zero tolerance policies spread through schools in the 1990s.')).toEqual([]);
    expect(subsOf('The ski slope was slippery after the overnight rain.')).toEqual([]);
    expect(subsOf('She tolerated the noise from the construction site.')).toEqual([]);
  });

  test('phrases match across source line breaks', () => {
    // HTML text nodes preserve the source's wrapping, so multi-word phrases
    // must tolerate newlines and indentation between words
    expect(subsOf('a community demanding\n                tolerance must act')).toContain('tolerance_talk');
    expect(subsOf('cited the paradox\nof tolerance in the ruling')).toContain('tolerance_paradox');
  });
});

describe('Logical Fallacies detection', () => {
  let detector, patterns;
  beforeEach(() => { detector = new BiasDetector(); patterns = detector.compiledDetectors.get('fallacy').patterns; });
  afterEach(() => detector.destroy());
  const subsOf = text => detector.detectPatterns(text, patterns, 'fallacy').map(m => m.subCategory && m.subCategory.id);

  test('families detect and attribute', () => {
    expect(subsOf('That objection is a red herring and a non sequitur.'))
      .toEqual(expect.arrayContaining(['relevance']));
    expect(subsOf('Which begs the question — pure circular reasoning.'))
      .toEqual(expect.arrayContaining(['circular']));
    expect(subsOf('An appeal to authority, followed by the bandwagon.'))
      .toEqual(expect.arrayContaining(['crowd_authority']));
    expect(subsOf('They cherry-picked results — classic survivorship bias and anecdotal evidence.'))
      .toEqual(expect.arrayContaining(['evidence_games']));
    expect(subsOf('Moving the goalposts again; the burden of proof is yours, no true Scotsman.'))
      .toEqual(expect.arrayContaining(['goalposts_burden']));
    expect(subsOf('It was not real socialism, he insisted.')).toContain('goalposts_burden');
    expect(subsOf('Post hoc reasoning plus the sunk cost fallacy.'))
      .toEqual(expect.arrayContaining(['causal']));
    expect(subsOf("Correlation isn't causation, she recited.")).toContain('causal');
    expect(subsOf('A false equivalence bordering on Godwin\'s law — a false choice.'))
      .toEqual(expect.arrayContaining(['comparison']));
    expect(subsOf('The fallacy fallacy: he was just asking questions, then sealioning with a loaded question.'))
      .toEqual(expect.arrayContaining(['meta']));
  });

  test('statistics and finance senses stay unmatched', () => {
    expect(subsOf('The paper reports a post hoc analysis with Bonferroni correction.')).toEqual([]);
    expect(subsOf('Post hoc tests confirmed the pairwise differences.')).toEqual([]);
    expect(subsOf('They wrote off the sunk costs and moved on.')).toEqual([]);
    expect(subsOf('Her pleading eyes said everything.')).toEqual([]);
  });

  test('class-bearing signature phrases match across line wraps', () => {
    expect(subsOf('he insisted it was never real\n                capitalism at all')).toContain('goalposts_burden');
    expect(subsOf("correlation isn't\n causation, she recited")).toContain('causal');
  });
});

describe('Media & Truth Terms detection', () => {
  let detector, patterns;
  beforeEach(() => { detector = new BiasDetector(); patterns = detector.compiledDetectors.get('epistemics').patterns; });
  afterEach(() => detector.destroy());
  const subsOf = text => detector.detectPatterns(text, patterns, 'epistemics').map(m => m.subCategory && m.subCategory.id);

  test('families detect and attribute', () => {
    expect(subsOf('They called the report fake news pushed by the mainstream media.'))
      .toEqual(expect.arrayContaining(['fake_news', 'narrative_media']));
    expect(subsOf('Fact-checkers labeled it misinformation; he told followers to do your own research.'))
      .toEqual(expect.arrayContaining(['misinfo_disinfo', 'narrative_media']));
    expect(subsOf('That is just a conspiracy theory, she replied.')).toContain('conspiracy');
    expect(subsOf('Critics accused the network of pushing a narrative.')).toContain('narrative_media');
  });

  test('literary, legal, and technical senses stay unmatched', () => {
    expect(subsOf('The narrative structure of the novel impressed critics.')).toEqual([]);
    expect(subsOf('Conspiracy to commit fraud carries heavy penalties.')).toEqual([]);
    expect(subsOf('The media player crashed during the demo.')).toEqual([]);
  });
});
