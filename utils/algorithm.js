// File: utils/algorithm.js
// Purpose: Scientific calculations for BMR, TDEE, and Fasting Biological Phases

// Mifflin-St Jeor Equation for BMR (scientifically validated)
export const calculateBasalMetabolicRate = (weightKg, heightCm, ageYears, isMale) => {
  const s = isMale ? 5 : -161;
  return (10 * weightKg) + (6.25 * heightCm) - (5 * ageYears) + s;
};

export const calculateTDEE = (bmr, activityLevel) => {
  const multipliers = {
    sedentary: 1.2,      // Little to no exercise
    light: 1.375,        // Light exercise 1-3 days/week
    moderate: 1.55,      // Moderate exercise 3-5 days/week
    active: 1.725,       // Heavy exercise 6-7 days/week
    very_active: 1.9     // Very heavy exercise, physical job
  };
  return bmr * (multipliers[activityLevel] || 1.2);
};

// Psychological UX: Giving users physiological milestones to look forward to
export const getFastingPhase = (hoursFasted) => {
  if (hoursFasted < 4) return { title: "Anabolic Phase", description: "Your body is storing nutrients and digesting your last meal.", color: "text-green-400" };
  if (hoursFasted < 12) return { title: "Catabolic Phase", description: "Blood sugar normalizes. You are transitioning to burning stored energy.", color: "text-blue-400" };
  if (hoursFasted < 16) return { title: "Fat Burning", description: "Insulin is low. Your body is actively burning stored fat for fuel.", color: "text-orange-400" };
  if (hoursFasted < 24) return { title: "Mild Ketosis", description: "Your liver is producing ketones. Brain focus increases.", color: "text-purple-400" };
  if (hoursFasted < 48) return { title: "Autophagy", description: "Cellular repair! Your body is cleaning out damaged cells.", color: "text-pink-400" };
  if (hoursFasted < 72) return { title: "Growth Hormone Spike", description: "HGH levels increase significantly to preserve muscle mass.", color: "text-yellow-400" };
  return { title: "Deep Fasting", description: "Maximum insulin sensitivity and deep cellular regeneration.", color: "text-red-400" };
};
