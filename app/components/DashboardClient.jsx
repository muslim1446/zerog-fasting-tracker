'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import FastingRing from './FastingRing';
import OpenTuwaBrand from './OpenTuwaBrand';
import {
  calculateBasalMetabolicRate,
  calculateTDEE,
  calculateHydrationGoal,
  calculateGlycogenDepletion,
  calculateCaloriesBurned,
  calculateFatBurned,
  getFastingPhase,
} from '../../utils/algorithm';
import { HEALTH_CLAIMS, SUBINFO } from '../../lib/copy';
import { Flame, Droplet, Activity, Settings, Battery, Target } from 'lucide-react';
import Link from 'next/link';

export default function DashboardClient() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [profile, setProfile] = useState(null);
  const [isFasting, setIsFasting] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalHours: 0,
  });

  useEffect(() => {
    const savedProfile = localStorage.getItem('user_profile');
    if (!savedProfile) {
      router.push('/onboarding');
      return;
    }
    try {
      setProfile(JSON.parse(savedProfile));
    } catch {
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
          totalHours: Math.max(0, totalHours),
        });
      };
      tick();
      interval = setInterval(tick, 1000);
    } else {
      setElapsedTime({ hours: 0, minutes: 0, seconds: 0, totalHours: 0 });
    }
    return () => clearInterval(interval);
  }, [isFasting, startTime]);

  if (!mounted || !profile) {
    return (
      <main className="flex-1 p-4 sm:p-6 lg:p-8 font-sans flex flex-col max-w-2xl mx-auto w-full">
        <OpenTuwaBrand subinfo={SUBINFO.tagline} />
        <p className="text-tuwa-muted text-sm text-center py-16 leading-relaxed">
          Loading your fasting profile…
          <br />
          <Link href="/onboarding" className="text-tuwa-accent hover:text-white mt-4 inline-block">
            Set up profile →
          </Link>
        </p>
      </main>
    );
  }

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

  const bmr = calculateBasalMetabolicRate(profile.weight, profile.height, profile.age, profile.sex);
  const tdee = calculateTDEE(bmr, profile.activityLevel);
  const hydrationGoal = calculateHydrationGoal(profile.weight);
  const currentPhase = getFastingPhase(elapsedTime.totalHours, profile.activityLevel);
  const targetHours = profile.targetHours || 16;
  const progressPercentage = (elapsedTime.totalHours / targetHours) * 100;
  const calsBurned = isFasting ? calculateCaloriesBurned(tdee, elapsedTime.totalHours) : 0;
  const fatBurnedGrams = isFasting ? calculateFatBurned(elapsedTime.totalHours, tdee) : 0;
  const glycogenPct = isFasting
    ? calculateGlycogenDepletion(elapsedTime.totalHours, profile.activityLevel)
    : 0;

  return (
    <main className="flex-1 p-4 sm:p-6 lg:p-8 font-sans flex flex-col max-w-2xl mx-auto w-full">
      <nav className="flex justify-between items-center mb-8 pt-2">
        <OpenTuwaBrand subinfo={`${SUBINFO.profileLabel}: ${profile.username}`} />
        <Link
          href="/onboarding"
          className="p-2.5 bg-white/5 border border-white/10 rounded-md hover:bg-white/10 transition"
          aria-label="Edit profile"
        >
          <Settings size={20} className="text-tuwa-muted" />
        </Link>
      </nav>

      <section className="text-center mb-4" aria-labelledby="phase-heading">
        <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-md mb-3">
          <p className="text-tuwa-muted text-[10px] sm:text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2">
            <Target size={12} className="text-tuwa-accent" aria-hidden="true" />
            Target: {targetHours} hours
          </p>
        </div>
        <h2
          id="phase-heading"
          className={`text-3xl font-heading font-bold tracking-tight transition-colors duration-1000 ${currentPhase.color}`}
        >
          {isFasting ? currentPhase.title : 'Eating window'}
        </h2>
        <p className="text-tuwa-muted mt-3 max-w-md mx-auto text-sm leading-relaxed px-4">
          {isFasting
            ? currentPhase.description
            : 'You are in your eating window. Replenish with nutrient-dense foods when ready to break the fast.'}
        </p>
      </section>

      <FastingRing
        progressPercentage={progressPercentage}
        hours={elapsedTime.hours}
        minutes={elapsedTime.minutes}
        seconds={elapsedTime.seconds}
        currentPhase={currentPhase}
      />

      <div className="flex justify-center mt-4 mb-6 z-10 relative">
        <button
          type="button"
          onClick={toggleFast}
          className={`font-bold text-sm tracking-wide py-3.5 px-10 rounded-md transition-all min-w-[180px] ${
            isFasting
              ? 'bg-white/5 border border-white/10 text-red-400 hover:bg-white/10 hover:text-red-300'
              : 'bg-tuwa-accent hover:bg-blue-600 text-white shadow-lg shadow-tuwa-accent/20'
          }`}
        >
          {isFasting ? 'End fast' : 'Start fast'}
        </button>
      </div>

      <p className="text-center text-white/20 text-[11px] mb-8 px-4">
        {HEALTH_CLAIMS.estimatesNote}
      </p>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full">
        <StatCard
          icon={<Flame size={18} className="text-orange-400" />}
          label="Est. calories"
          value={Math.floor(calsBurned)}
          unit="kcal (estimate)"
        />
        <StatCard
          icon={<Activity size={18} className="text-tuwa-accent" />}
          label="Fat oxidized"
          value={fatBurnedGrams.toFixed(1)}
          unit="grams (estimate)"
        />
        <StatCard
          icon={<Battery size={18} className="text-yellow-400" />}
          label="Glycogen depleted"
          value={`${Math.floor(glycogenPct)}%`}
          progress={Math.min(100, glycogenPct)}
        />
        <StatCard
          icon={<Droplet size={18} className="text-blue-400" />}
          label="Hydration target"
          value={hydrationGoal}
          unit="liters (H₂O)"
        />
      </div>
    </main>
  );
}

function StatCard({ icon, label, value, unit, progress }) {
  return (
    <div className="bg-tuwa-gray/60 p-4 sm:p-5 rounded-xl border border-white/10 flex flex-col items-start backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <span className="text-xs font-bold text-tuwa-muted uppercase tracking-wider">{label}</span>
      </div>
      <span className="text-3xl font-black tabular-nums font-heading text-white">{value}</span>
      {unit && <span className="text-xs text-tuwa-muted mt-1">{unit}</span>}
      {progress !== undefined && (
        <div className="w-full bg-tuwa-black rounded-full h-1.5 mt-3 border border-white/5">
          <div
            className="bg-yellow-400 h-1.5 rounded-full transition-all duration-1000"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}
