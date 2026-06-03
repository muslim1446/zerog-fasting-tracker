// File: utils/algorithm.js
// Purpose: Precise Scientific calculations for metabolic tracking

// Mifflin-St Jeor Equation for BMR (Scientifically Validated Baseline)
export const calculateBasalMetabolicRate = (weightKg, heightCm, ageYears, sex) => {
  const s = sex === 'male' ? 5 : -161;
  return (10 * weightKg) + (6.25 * heightCm) - (5 * ageYears) + s;
};

// Total Daily Energy Expenditure
export const calculateTDEE = (bmr, activityLevel) => {
  const multipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9
  };
  return bmr * (multipliers[activityLevel] || 1.2);
};

// Hydration Target (Approx 35ml per kg of bodyweight)
export const calculateHydrationGoal = (weightKg) => {
  return (weightKg * 0.035).toFixed(1);
};

// 1. Glycogen Depletion (Exponential Decay)
export const calculateGlycogenDepletion = (hoursFasted, activityLevel) => {
  const depletionRates = {
    sedentary: 16,
    light: 15,
    moderate: 14,
    active: 12,
    very_active: 10
  };
  
  const hoursToDeplete = depletionRates[activityLevel] || 16;
  
  // k is calculated so that ~1% glycogen remains at hoursToDeplete
  // ln(0.01) = -k * hoursToDeplete => k = 4.605 / hoursToDeplete
  const k = 4.605 / hoursToDeplete;
  
  // G(t) = G_0 * e^(-kt)
  const remainingGlycogen = 100 * Math.exp(-k * hoursFasted);
  const percentageDepleted = 100 - remainingGlycogen;
  
  return Math.min(100, Math.max(0, percentageDepleted));
};

// 2. Dynamic Energy Expenditure (Circadian Distribution)
export const calculateCaloriesBurned = (tdee, bmr, hoursFasted, fastStartHour = 20) => {
  // Assuming a standard 8-hour sleep window: 22:00 (10 PM) to 06:00 (6 AM)
  const SLEEP_START = 22;
  const SLEEP_END = 6;
  
  const sleepHourlyBurn = (bmr * 0.85) / 24;
  const totalDailySleepBurn = 8 * sleepHourlyBurn;
  
  // Distribute the rest of the daily TDEE over the 16 waking hours
  const wakingHourlyBurn = (tdee - totalDailySleepBurn) / 16;
  
  let totalBurn = 0;
  
  // Calculate full hours
  for (let i = 0; i < Math.floor(hoursFasted); i++) {
    const currentHour = Math.floor((fastStartHour + i) % 24);
    const isSleeping = currentHour >= SLEEP_START || currentHour < SLEEP_END;
    totalBurn += isSleeping ? sleepHourlyBurn : wakingHourlyBurn;
  }
  
  // Add fractional remainder for precision
  const fractionalHour = hoursFasted % 1;
  if (fractionalHour > 0) {
    const currentHour = Math.floor((fastStartHour + Math.floor(hoursFasted)) % 24);
    const isSleeping = currentHour >= SLEEP_START || currentHour < SLEEP_END;
    totalBurn += (isSleeping ? sleepHourlyBurn : wakingHourlyBurn) * fractionalHour;
  }
  
  return totalBurn;
};

// 3. Substrate Utilization (Sigmoid S-Curve)
export const calculateFatBurned = (hoursFasted, tdee, bmr, fastStartHour = 20) => {
  const SLEEP_START = 22;
  const SLEEP_END = 6;
  
  const sleepHourlyBurn = (bmr * 0.85) / 24;
  const wakingHourlyBurn = (tdee - (8 * sleepHourlyBurn)) / 16;
  
  let fatCalories = 0;
  
  for (let i = 0; i < Math.floor(hoursFasted); i++) {
    const currentHour = Math.floor((fastStartHour + i) % 24);
    const isSleeping = currentHour >= SLEEP_START || currentHour < SLEEP_END;
    const hourlyBurn = isSleeping ? sleepHourlyBurn : wakingHourlyBurn;
    
    // Sigmoid Function: f(x) = baseline + (max_gain / (1 + e^(-k(x - midpoint))))
    // Smooth ramp from ~20% baseline to ~85% ketosis, centered at hour 12
    const fatPercentage = 0.20 + (0.65 / (1 + Math.exp(-0.5 * (i - 12))));
    
    fatCalories += hourlyBurn * fatPercentage;
  }
  
  // Fractional hour handling
  const fractionalHour = hoursFasted % 1;
  if (fractionalHour > 0) {
    const currentHour = Math.floor((fastStartHour + Math.floor(hoursFasted)) % 24);
    const isSleeping = currentHour >= SLEEP_START || currentHour < SLEEP_END;
    const hourlyBurn = isSleeping ? sleepHourlyBurn : wakingHourlyBurn;
    
    const fatPercentage = 0.20 + (0.65 / (1 + Math.exp(-0.5 * (Math.floor(hoursFasted) - 12))));
    fatCalories += (hourlyBurn * fractionalHour) * fatPercentage;
  }
  
  return fatCalories / 9; // 1g of fat = 9 kcal
};

// 4 & 5. Fasting Phase Timelines & Separation of Concerns (UI Agnostic)
export const getFastingPhase = (hoursFasted, activityLevel = 'sedentary') => {
  // Activity modifier only applied to glycogen-dependent early phases
  const earlyMod = (activityLevel === 'active' || activityLevel === 'very_active') ? 0.85 : 1;
  
  if (hoursFasted < 4 * earlyMod) return {
    id: "anabolic",
    title: "Anabolic Phase",
    description: "Digesting and storing nutrients. Blood sugar and insulin are elevated."
  };
  
  if (hoursFasted < 12 * earlyMod) return {
    id: "catabolic",
    title: "Catabolic Phase",
    description: "Blood sugar normalizes. Insulin drops. Transitioning to stored glycogen."
  };
  
  if (hoursFasted < 16 * earlyMod) return {
    id: "fat-burning",
    title: "Fat Burning",
    description: "Glycogen depleted. Body is shifting to burning adipose tissue for fuel."
  };
  
  if (hoursFasted < 24 * earlyMod) return {
    id: "ketosis",
    title: "Mild Ketosis",
    description: "Liver generates ketones. Increased mental clarity and fat oxidation."
  };
  
  // Time-dependent biological pathways (mTOR/AMPK) decoupled from early glycogen modifiers
  if (hoursFasted < 48) return {
    id: "autophagy",
    title: "Autophagy",
    description: "Cellular repair initiated. Body recycles damaged proteins and cells."
  };
  
  if (hoursFasted < 72) return {
    id: "hgh",
    title: "Growth Hormone Spike",
    description: "HGH levels increase dramatically to preserve muscle tissue."
  };
  
  return {
    id: "deep",
    title: "Deep Fasting",
    description: "Maximum insulin sensitivity and immune stem cell regeneration."
  };
};