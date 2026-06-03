'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import FastingRing from './components/FastingRing';
import {
calculateBasalMetabolicRate,
calculateTDEE,
calculateHydrationGoal,
calculateGlycogenDepletion,
calculateCaloriesBurned,
calculateFatBurned,
getFastingPhase
} from '../utils/algorithm';
import { Flame, Droplet, Activity, Settings, Battery, Target } from 'lucide-react';
import Link from 'next/link';
export default function Dashboard() {
const router = useRouter();
const [mounted, setMounted] = useState(false);
const [profile, setProfile] = useState(null);
const [isFasting, setIsFasting] = useState(false);
const [startTime, setStartTime] = useState(null);
const [elapsedTime, setElapsedTime] = useState({ hours: 0, minutes: 0, seconds: 0, totalHours: 0 });
// Load user biometrics strictly on client-side
useEffect(() => {
const savedProfile = localStorage.getItem('user_profile');
if (!savedProfile) {
router.push('/onboarding');
return;
}
try {
  setProfile(JSON.parse(savedProfile));
} catch(e) {
  router.push('/onboarding');
  return;
}

const savedStart = localStorage.getItem('fasting_start_time');
if (savedStart) {
  setStartTime(new Date(savedStart));
  setIsFasting(true);
}
setMounted(true);
}, [router]);
// Sub-second precision tick interval
useEffect(() => {
let interval;
if (isFasting && startTime) {
const tick = () => {
const now = new Date();
const diffInMs = now - startTime;
const totalHours = diffInMs / (1000 * 60 * 60);
setElapsedTime({
      hours: Math.floor(totalHours),
      minutes: Math.floor((diffInMs / (1000 * 60)) % 60),
      seconds: Math.floor((diffInMs / 1000) % 60),
      totalHours: Math.max(0, totalHours)
    });
  };
  tick(); // Run immediately so UI does not lag behind
  interval = setInterval(tick, 1000);
} else {
  setElapsedTime({ hours: 0, minutes: 0, seconds: 0, totalHours: 0 });
}
return () => clearInterval(interval);
}, [isFasting, startTime]);
if (!mounted || !profile) return null;
const toggleFast = () => {
if (isFasting) {
localStorage.removeItem('fasting_start_time');
setIsFasting(false);
} else {
const now = new Date();
localStorage.setItem('fasting_start_time', now.toISOString());
setStartTime(now);
setIsFasting(true);
}
};
// Perform Dynamic Algorithm Calculations
const bmr = calculateBasalMetabolicRate(profile.weight, profile.height, profile.age, profile.sex);
const tdee = calculateTDEE(bmr, profile.activityLevel);
const hydrationGoal = calculateHydrationGoal(profile.weight);
const currentPhase = getFastingPhase(elapsedTime.totalHours, profile.activityLevel);
const targetHours = profile.targetHours || 16;
const progressPercentage = (elapsedTime.totalHours / targetHours) * 100;
const calsBurned = isFasting ? calculateCaloriesBurned(tdee, elapsedTime.totalHours) : 0;
const fatBurnedGrams = isFasting ? calculateFatBurned(elapsedTime.totalHours, tdee) : 0;
const glycogenPct = isFasting ? calculateGlycogenDepletion(elapsedTime.totalHours, profile.activityLevel) : 0;
return (
<main className="min-h-screen bg-neutral-950 text-neutral-100 p-4 sm:p-6 lg:p-8 font-sans flex flex-col max-w-2xl mx-auto">
<nav className="flex justify-between items-center mb-8">
<div>
<h1 className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
ZeroG
</h1>
<p className="text-xs text-gray-500 font-medium mt-1">Metabolics: {profile.username}</p>
</div>
<Link href="/onboarding" className="p-2.5 bg-neutral-900 border border-neutral-800 rounded-full hover:bg-neutral-800 transition shadow-sm">
<Settings size={20} className="text-gray-400" />
</Link>
</nav>
<section className="text-center mb-4">
    <div className="inline-block px-3 py-1 bg-neutral-900 border border-neutral-800 rounded-full mb-3">
      <p className="text-gray-400 text-[10px] sm:text-xs font-bold tracking-widest uppercase flex items-center gap-2">
        <Target size={12} /> Target: {targetHours} Hours
      </p>
    </div>
    <h2 className={`text-3xl font-bold tracking-tight transition-colors duration-1000 ${currentPhase.color}`}>
      {isFasting ? currentPhase.title : "Metabolic Rest"}
    </h2>
    <p className="text-gray-400 mt-3 max-w-md mx-auto text-sm leading-relaxed px-4">
      {isFasting ? currentPhase.description : "You are currently in your eating window. Replenish your body with nutrient-dense foods."}
    </p>
  </section>

  <FastingRing 
    progressPercentage={progressPercentage} 
    hours={elapsedTime.hours} 
    minutes={elapsedTime.minutes} 
    seconds={elapsedTime.seconds}
    currentPhase={currentPhase}
  />

  <div className="flex justify-center mt-4 mb-10 z-10 relative">
    <button 
      onClick={toggleFast}
      className={`px-14 py-4 rounded-full font-black text-lg tracking-wide transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.97] ${
        isFasting 
          ? 'bg-neutral-900 border border-red-900/40 text-red-400 hover:bg-neutral-800 shadow-[0_0_30px_rgba(248,113,113,0.15)]' 
          : 'bg-white text-black hover:bg-gray-200 shadow-[0_0_40px_rgba(255,255,255,0.2)]'
      }`}
    >
      {isFasting ? 'End Fast' : 'Initiate Fast'}
    </button>
  </div>

  {/* Deep Scientific Biological Stats */}
  <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full">
    <div className="bg-neutral-900/40 p-4 sm:p-5 rounded-3xl border border-neutral-800/60 flex flex-col items-start backdrop-blur-sm relative overflow-hidden">
      <div className="flex items-center gap-2 mb-3">
        <Flame size={18} className="text-orange-400" />
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Est. Cals Burned</span>
      </div>
      <span className="text-3xl font-black tabular-nums">{Math.floor(calsBurned)}</span>
      <span className="text-xs text-gray-500 mt-1">kcal generated</span>
    </div>

    <div className="bg-neutral-900/40 p-4 sm:p-5 rounded-3xl border border-neutral-800/60 flex flex-col items-start backdrop-blur-sm relative overflow-hidden">
      <div className="flex items-center gap-2 mb-3">
        <Activity size={18} className="text-pink-400" />
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Fat Oxidized</span>
      </div>
      <span className="text-3xl font-black tabular-nums">{fatBurnedGrams.toFixed(1)}</span>
      <span className="text-xs text-gray-500 mt-1">grams utilized</span>
    </div>

    <div className="bg-neutral-900/40 p-4 sm:p-5 rounded-3xl border border-neutral-800/60 flex flex-col items-start backdrop-blur-sm relative overflow-hidden">
      <div className="flex items-center gap-2 mb-3">
        <Battery size={18} className="text-yellow-400" />
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Glycogen Depleted</span>
      </div>
      <span className="text-3xl font-black tabular-nums">{Math.floor(glycogenPct)}%</span>
      <div className="w-full bg-neutral-800 rounded-full h-1.5 mt-3">
        <div className="bg-yellow-400 h-1.5 rounded-full transition-all duration-1000" style={{ width: `${Math.min(100, glycogenPct)}%` }}></div>
      </div>
    </div>

    <div className="bg-neutral-900/40 p-4 sm:p-5 rounded-3xl border border-neutral-800/60 flex flex-col items-start backdrop-blur-sm relative overflow-hidden">
      <div className="flex items-center gap-2 mb-3">
        <Droplet size={18} className="text-blue-400" />
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Hydration Daily Target</span>
      </div>
      <span className="text-3xl font-black tabular-nums">{hydrationGoal}</span>
      <span className="text-xs text-gray-500 mt-1">Liters (H2O)</span>
    </div>
  </div>
</main>
);
}