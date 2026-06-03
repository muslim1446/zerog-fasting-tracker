'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Activity, User, Scale, Ruler, Timer } from 'lucide-react';
export default function Onboarding() {
const router = useRouter();
const [mounted, setMounted] = useState(false);
const [formData, setFormData] = useState({
username: '',
age: '',
sex: 'male',
weight: '',
height: '',
activityLevel: 'sedentary',
targetHours: '16'
});
useEffect(() => {
setMounted(true);
const existing = localStorage.getItem('user_profile');
if (existing) {
try {
setFormData(JSON.parse(existing));
} catch(e) {}
}
}, []);
const handleChange = (e) => {
setFormData({ ...formData, [e.target.name]: e.target.value });
};
const handleSubmit = (e) => {
e.preventDefault();
localStorage.setItem('user_profile', JSON.stringify({
...formData,
age: parseInt(formData.age),
weight: parseFloat(formData.weight),
height: parseFloat(formData.height),
targetHours: parseInt(formData.targetHours)
}));
router.push('/');
};
if (!mounted) return null;
return (
<div className="min-h-screen bg-neutral-950 text-white flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
<div className="max-w-md w-full mx-auto bg-neutral-900/50 border border-neutral-800/80 p-8 rounded-[2rem] shadow-2xl backdrop-blur-sm">
<div className="text-center mb-8">
<h2 className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-2">
Biological Baseline
</h2>
<p className="text-gray-400 text-sm">
Calibrate the ZeroG algorithm to your specific physiology for precise metabolic tracking.
</p>
</div>
<form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-1">
        <label className="flex items-center text-xs uppercase tracking-wider text-gray-500 mb-1 gap-2">
          <User size={14} /> Username
        </label>
        <input 
          type="text" 
          name="username" 
          required
          value={formData.username}
          className="w-full bg-neutral-950/50 border border-neutral-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all text-sm"
          placeholder="e.g., faster99"
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="flex items-center text-xs uppercase tracking-wider text-gray-500 mb-1 gap-2">
             Age
          </label>
          <input type="number" name="age" min="16" max="120" required value={formData.age} className="w-full bg-neutral-950/50 border border-neutral-800 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-all text-sm" onChange={handleChange} placeholder="Years" />
        </div>
        <div className="space-y-1">
          <label className="flex items-center text-xs uppercase tracking-wider text-gray-500 mb-1 gap-2">
             Biological Sex
          </label>
          <select name="sex" value={formData.sex} className="w-full bg-neutral-950/50 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-all text-sm appearance-none" onChange={handleChange}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="flex items-center text-xs uppercase tracking-wider text-gray-500 mb-1 gap-2">
            <Scale size={14} /> Weight (kg)
          </label>
          <input type="number" step="0.1" name="weight" required value={formData.weight} className="w-full bg-neutral-950/50 border border-neutral-800 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-all text-sm" onChange={handleChange} placeholder="e.g. 75.5" />
        </div>
        <div className="space-y-1">
          <label className="flex items-center text-xs uppercase tracking-wider text-gray-500 mb-1 gap-2">
            <Ruler size={14} /> Height (cm)
          </label>
          <input type="number" name="height" required value={formData.height} className="w-full bg-neutral-950/50 border border-neutral-800 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-all text-sm" onChange={handleChange} placeholder="e.g. 175" />
        </div>
      </div>

      <div className="space-y-1">
        <label className="flex items-center text-xs uppercase tracking-wider text-gray-500 mb-1 gap-2">
          <Activity size={14} /> Activity Level
        </label>
        <select name="activityLevel" value={formData.activityLevel} className="w-full bg-neutral-950/50 border border-neutral-800 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:border-purple-500 transition-all text-sm" onChange={handleChange}>
          <option value="sedentary">Sedentary (Little to no exercise)</option>
          <option value="light">Lightly Active (1-3 days/week)</option>
          <option value="moderate">Moderately Active (3-5 days/week)</option>
          <option value="active">Active (6-7 days/week)</option>
          <option value="very_active">Very Active (Physical job/intense)</option>
        </select>
      </div>

      <div className="space-y-1">
        <label className="flex items-center text-xs uppercase tracking-wider text-gray-500 mb-1 gap-2">
          <Timer size={14} /> Fasting Goal
        </label>
        <select name="targetHours" value={formData.targetHours} className="w-full bg-neutral-950/50 border border-neutral-800 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:border-purple-500 transition-all text-sm" onChange={handleChange}>
          <option value="12">12:12 - Circadian Rhythm</option>
          <option value="14">14:10 - Early Time Restricted</option>
          <option value="16">16:8 - Standard Intermittent</option>
          <option value="18">18:6 - Advanced Fat Burn</option>
          <option value="20">20:4 - Warrior Diet</option>
          <option value="24">24h+ - Autophagy Focus</option>
        </select>
      </div>

      <button 
        type="submit"
        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-lg py-4 rounded-xl mt-8 hover:from-purple-500 hover:to-blue-500 transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)] active:scale-[0.98]"
      >
        Initialize Algorithm
      </button>
    </form>
  </div>
</div>
);
}
