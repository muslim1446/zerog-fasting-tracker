/** Static copy for server-rendered HTML (search engines & AI bots, no JavaScript). */

export const FASTING_PHASES = [
  {
    title: 'Anabolic Phase',
    window: '0–4 hours after your last meal',
    description:
      'Digestion and nutrient storage dominate. Blood glucose and insulin are typically elevated as the body processes recent intake.',
  },
  {
    title: 'Catabolic Phase',
    window: '4–12 hours',
    description:
      'Blood sugar tends to normalize and insulin falls. The body begins drawing on liver glycogen reserves for energy.',
  },
  {
    title: 'Fat Burning',
    window: '12–16 hours',
    description:
      'Glycogen stores deplete; fat oxidation increases. Many intermittent-fasting practitioners target this window for metabolic flexibility.',
  },
  {
    title: 'Mild Ketosis',
    window: '16–24 hours',
    description:
      'The liver produces ketone bodies. Some users report steadier energy and heightened mental clarity during this stage.',
  },
  {
    title: 'Autophagy',
    window: '24–48 hours',
    description:
      'Cellular repair pathways may intensify. The body recycles damaged proteins—an area of active scientific study, not medical certainty.',
  },
  {
    title: 'Growth Hormone Spike',
    window: '48–72 hours',
    description:
      'Human growth hormone can rise sharply in extended fasts. Extended fasting beyond 24 hours should only be considered with medical guidance.',
  },
  {
    title: 'Deep Fasting',
    window: '72+ hours',
    description:
      'Prolonged fasting carries significant risks. OpenTuwa Fasting is designed for daily intermittent protocols, not multi-day clinical fasts.',
  },
];

export const FASTING_PROTOCOLS = [
  {
    name: '12:12 — Circadian rhythm',
    hours: 12,
    summary:
      'Twelve hours fasting, twelve hours eating. Aligns eating with daylight and is often the gentlest entry point for beginners.',
  },
  {
    name: '14:10 — Early time-restricted feeding',
    hours: 14,
    summary:
      'Fourteen-hour fast with a ten-hour eating window, commonly skipping breakfast and finishing dinner earlier.',
  },
  {
    name: '16:8 — Standard intermittent fasting',
    hours: 16,
    summary:
      'The most popular protocol: sixteen hours fasted, eight hours for meals—often noon to 8 p.m. or 10 a.m. to 6 p.m.',
  },
  {
    name: '18:6 — Advanced fat-burn window',
    hours: 18,
    summary:
      'Eighteen hours without calories and a six-hour refeed window for those already adapted to 16:8.',
  },
  {
    name: '20:4 — Warrior diet pattern',
    hours: 20,
    summary:
      'One substantial evening meal within four hours; demanding and not appropriate for all populations.',
  },
  {
    name: '24h+ — Extended / autophagy focus',
    hours: 24,
    summary:
      'Full-day or longer fasts require caution, hydration, electrolytes, and professional oversight where indicated.',
  },
];

export const METRICS_EXPLAINED = [
  {
    name: 'Estimated calories during fast',
    body: 'Derived from your Total Daily Energy Expenditure (TDEE), spread hourly across elapsed fasting time. Uses the Mifflin–St Jeor basal metabolic rate equation adjusted for activity level.',
  },
  {
    name: 'Fat oxidized (grams)',
    body: 'A progressive model estimating how much energy shifts from glycogen toward fat over hours fasted. Not a laboratory measurement.',
  },
  {
    name: 'Glycogen depletion (%)',
    body: 'Illustrates how quickly liver glycogen may diminish based on activity—active individuals deplete stores faster than sedentary baselines.',
  },
  {
    name: 'Hydration target (liters)',
    body: 'Approximates daily water needs at ~35 ml per kilogram of body weight. Fasting does not reduce the need for fluids.',
  },
];

export const FAQ = [
  {
    q: 'Does OpenTuwa Fasting store my data in the cloud?',
    a: 'Profile fields and timer state are kept in your browser local storage by default. No account is required. Clearing site data removes your profile.',
  },
  {
    q: 'Is this medical advice?',
    a: 'No. OpenTuwa Fasting is an independent wellness timer published by OpenTuwa Media. Estimates are educational models only. Consult a qualified clinician before changing diet, medication, or fasting practice.',
  },
  {
    q: 'Who should avoid intermittent fasting?',
    a: 'Pregnant or breastfeeding individuals, children, people with a history of eating disorders, and anyone on glucose-lowering medication should seek professional guidance before fasting.',
  },
  {
    q: 'How is OpenTuwa Fasting related to OpenTuwa News?',
    a: 'Both are operated under the OpenTuwa independent media and research umbrella. The fasting tool is a separate wellness utility at fasting.opentuwa.com; journalism lives at opentuwa.com.',
  },
  {
    q: 'What scientific basis do the phases use?',
    a: 'Phase boundaries adapt to your selected activity level and elapsed hours, informed by common intermittent-fasting literature. Individual metabolism varies widely.',
  },
];

export const ONBOARDING_FIELDS = [
  {
    name: 'Username',
    description: 'A local display name stored only on your device. Used to personalize the dashboard header.',
  },
  {
    name: 'Age',
    description: 'Required for the Mifflin–St Jeor basal metabolic rate calculation (minimum 16 years).',
  },
  {
    name: 'Biological sex',
    description: 'Male and female constants in the BMR formula produce different metabolic baselines.',
  },
  {
    name: 'Weight (kg)',
    description: 'Body mass in kilograms for BMR, TDEE, hydration, and glycogen models.',
  },
  {
    name: 'Height (cm)',
    description: 'Height in centimeters completes the Mifflin–St Jeor equation.',
  },
  {
    name: 'Activity level',
    description:
      'From sedentary through very active. Higher activity accelerates glycogen depletion estimates and raises TDEE multipliers.',
  },
  {
    name: 'Fasting goal (hours)',
    description:
      'Target fasting window—12, 14, 16, 18, 20, or 24+ hours—used for progress ring completion and phase context.',
  },
];

export const HOME_LEAD = `OpenTuwa Fasting is a free intermittent-fasting timer and metabolic phase guide from OpenTuwa Media. Set a fasting goal, start your timer, and follow illustrative estimates for calories, fat oxidation, glycogen depletion, and hydration—without creating an account or sending biometrics to our servers.`;

export const HOW_IT_WORKS = [
  'Visit the profile setup page and enter age, height, weight, sex, activity level, and your target fasting hours.',
  'Return to the dashboard and press Start fast when you begin your eating-window break.',
  'The progress ring and phase label update in real time based on elapsed hours.',
  'Press End fast when you eat; metrics reset until your next session.',
  'Edit your profile anytime from the settings control on the dashboard.',
];
