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
// Calculates how much of the liver's glycogen has been depleted
export const calculateGlycogenDepletion = (hoursFasted, activityLevel) => {
const depletionRates = {
sedentary: 16,
light: 15,
moderate: 14,
active: 12,
very_active: 10
};
const hoursToDeplete = depletionRates[activityLevel] || 16;
const percentage = Math.min(100, (hoursFasted / hoursToDeplete) * 100);
return percentage;
};
// Rough baseline estimate for calories burned entirely while in the fasted state
export const calculateCaloriesBurned = (tdee, hoursFasted) => {
return (tdee / 24) * hoursFasted;
};
// Simulates metabolic switching from glucose/glycogen to fat oxidation
export const calculateFatBurned = (hoursFasted, tdee) => {
if (hoursFasted < 4) return 0; // Digestion phase
const hourlyBurn = tdee / 24;
let fatCalories = 0;
// Progressive fat oxidation model
for(let i = 1; i <= Math.floor(hoursFasted); i++) {
if (i > 16) fatCalories += hourlyBurn * 0.85; // ~85% from fat deep in fast
else if (i > 12) fatCalories += hourlyBurn * 0.65; // Transitioning to fat
else if (i > 4) fatCalories += hourlyBurn * 0.20; // Mostly burning glycogen
}
return fatCalories / 9; // 1g of fat = 9 kcal
};
// Adjusts physiological phase boundaries dynamically based on activity levels
export const getFastingPhase = (hoursFasted, activityLevel = 'sedentary') => {
const mod = (activityLevel === 'active' || activityLevel === 'very_active') ? 0.85 : 1;
if (hoursFasted < 4 * mod) return {
id: "anabolic",
title: "Anabolic Phase",
description: "Digesting and storing nutrients. Blood sugar and insulin are elevated.",
color: "text-emerald-400",
ringClass: "glow-emerald text-emerald-400"
};
if (hoursFasted < 12 * mod) return {
id: "catabolic",
title: "Catabolic Phase",
description: "Blood sugar normalizes. Insulin drops. Transitioning to stored glycogen.",
color: "text-blue-400",
ringClass: "glow-blue text-blue-400"
};
if (hoursFasted < 16 * mod) return {
id: "fat-burning",
title: "Fat Burning",
description: "Glycogen depleted. Body is shifting to burning adipose tissue for fuel.",
color: "text-orange-400",
ringClass: "glow-orange text-orange-400"
};
if (hoursFasted < 24 * mod) return {
id: "ketosis",
title: "Mild Ketosis",
description: "Liver generates ketones. Increased mental clarity and fat oxidation.",
color: "text-purple-400",
ringClass: "glow-purple text-purple-400"
};
if (hoursFasted < 48 * mod) return {
id: "autophagy",
title: "Autophagy",
description: "Cellular repair initiated. Body recycles damaged proteins and cells.",
color: "text-pink-400",
ringClass: "glow-pink text-pink-400"
};
if (hoursFasted < 72 * mod) return {
id: "hgh",
title: "Growth Hormone Spike",
description: "HGH levels increase dramatically to preserve muscle tissue.",
color: "text-yellow-400",
ringClass: "glow-yellow text-yellow-400"
};
return {
id: "deep",
title: "Deep Fasting",
description: "Maximum insulin sensitivity and immune stem cell regeneration.",
color: "text-red-400",
ringClass: "glow-red text-red-400"
};
};