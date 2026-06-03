'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import OpenTuwaBrand from './OpenTuwaBrand';
import { HEALTH_CLAIMS, SUBINFO } from '../../lib/copy';
import { Activity, User, Scale, Ruler, Timer } from 'lucide-react';

export default function OnboardingClient() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    age: '',
    sex: 'male',
    weight: '',
    height: '',
    activityLevel: 'sedentary',
    targetHours: '16',
  });

  useEffect(() => {
    setMounted(true);
    const existing = localStorage.getItem('user_profile');
    if (existing) {
      try {
        setFormData(JSON.parse(existing));
      } catch {
        /* ignore corrupt profile */
      }
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem(
      'user_profile',
      JSON.stringify({
        ...formData,
        age: parseInt(formData.age, 10),
        weight: parseFloat(formData.weight),
        height: parseFloat(formData.height),
        targetHours: parseInt(formData.targetHours, 10),
      })
    );
    router.push('/');
  };

  const inputClass =
    'w-full bg-tuwa-black/80 border border-white/10 rounded-md px-4 py-3 text-sm text-white placeholder:text-tuwa-muted/50 focus:outline-none focus:border-tuwa-accent focus:bg-white/5 transition-all';
  const labelClass =
    'flex items-center text-xs uppercase tracking-wider text-tuwa-muted mb-1 gap-2';

  if (!mounted) {
    return (
      <div className="max-w-md w-full mx-auto">
        <p className="text-tuwa-muted text-sm text-center py-16">Loading form…</p>
      </div>
    );
  }

  return (
    <div className="max-w-md w-full mx-auto">
      <div className="mb-8 text-center">
        <OpenTuwaBrand subinfo={SUBINFO.tagline} className="inline-block" />
      </div>

      <div className="bg-tuwa-gray/40 border border-white/10 p-8 rounded-xl shadow-2xl backdrop-blur-sm">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-heading font-bold text-white mb-2 tracking-tight">
            Biological baseline
          </h2>
          <p className="text-tuwa-muted text-sm leading-relaxed">
            Calibrate metabolic estimates to your physiology. Data stays on this device only.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <label className={labelClass} htmlFor="username">
              <User size={14} aria-hidden="true" /> Username
            </label>
            <input
              id="username"
              type="text"
              name="username"
              required
              value={formData.username}
              className={inputClass}
              placeholder="e.g. reader42"
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className={labelClass} htmlFor="age">
                Age
              </label>
              <input
                id="age"
                type="number"
                name="age"
                min="16"
                max="120"
                required
                value={formData.age}
                className={inputClass}
                onChange={handleChange}
                placeholder="Years"
              />
            </div>
            <div className="space-y-1">
              <label className={labelClass} htmlFor="sex">
                Biological sex
              </label>
              <select
                id="sex"
                name="sex"
                value={formData.sex}
                className={`${inputClass} appearance-none`}
                onChange={handleChange}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className={labelClass} htmlFor="weight">
                <Scale size={14} aria-hidden="true" /> Weight (kg)
              </label>
              <input
                id="weight"
                type="number"
                step="0.1"
                name="weight"
                required
                value={formData.weight}
                className={inputClass}
                onChange={handleChange}
                placeholder="e.g. 75.5"
              />
            </div>
            <div className="space-y-1">
              <label className={labelClass} htmlFor="height">
                <Ruler size={14} aria-hidden="true" /> Height (cm)
              </label>
              <input
                id="height"
                type="number"
                name="height"
                required
                value={formData.height}
                className={inputClass}
                onChange={handleChange}
                placeholder="e.g. 175"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className={labelClass} htmlFor="activityLevel">
              <Activity size={14} aria-hidden="true" /> Activity level
            </label>
            <select
              id="activityLevel"
              name="activityLevel"
              value={formData.activityLevel}
              className={`${inputClass} appearance-none`}
              onChange={handleChange}
            >
              <option value="sedentary">Sedentary (little to no exercise)</option>
              <option value="light">Lightly active (1–3 days/week)</option>
              <option value="moderate">Moderately active (3–5 days/week)</option>
              <option value="active">Active (6–7 days/week)</option>
              <option value="very_active">Very active (physical job / intense)</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className={labelClass} htmlFor="targetHours">
              <Timer size={14} aria-hidden="true" /> Fasting goal
            </label>
            <select
              id="targetHours"
              name="targetHours"
              value={formData.targetHours}
              className={`${inputClass} appearance-none`}
              onChange={handleChange}
            >
              <option value="12">12:12 — Circadian rhythm</option>
              <option value="14">14:10 — Early time-restricted</option>
              <option value="16">16:8 — Standard intermittent</option>
              <option value="18">18:6 — Advanced fat burn</option>
              <option value="20">20:4 — Warrior diet</option>
              <option value="24">24h+ — Autophagy focus</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-tuwa-accent hover:bg-blue-600 text-white font-bold text-sm py-3.5 rounded-md mt-4 transition-all shadow-lg shadow-tuwa-accent/20 active:scale-[0.98]"
          >
            Save profile & continue
          </button>
        </form>

        <p className="text-white/20 text-[11px] mt-6 leading-relaxed text-center">
          {HEALTH_CLAIMS.lawP1}
        </p>
      </div>
    </div>
  );
}
