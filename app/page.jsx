// File: app/page.jsx
// Purpose: Main Dashboard. Connects the algorithm, the visual ring, and the psychological rewards.
'use client';
import { useState, useEffect } from 'react';
import FastingRing from './components/FastingRing';
import { getFastingPhase } from '../utils/algorithm';
import { Flame, Droplet, Activity, Settings } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const [isFasting, setIsFasting] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState({ hours: 0, minutes: 0, seconds: 0, totalHours: 0 });
  const [targetHours, setTargetHours] = useState(16); // Default 16:8 fast

  // Simulating fetching data from D1/Local state
  useEffect(() => {
    const savedStart = localStorage.getItem('fasting_start_time');
    if (savedStart) {
      setStartTime(new Date(savedStart));
      setIsFasting(true);
    }
  }, []);

  useEffect(() => {
    let interval;
    if (isFasting && startTime) {
      interval = setInterval(() => {
        const now = new Date();
        const diffInMs = now - startTime;
        const totalHours = diffInMs / (1000 * 60 * 60);
        
        setElapsedTime({
          hours: Math.floor(totalHours),
          minutes: Math.floor((diffInMs / (1000 * 60)) % 60),
          seconds: Math.floor((diffInMs / 1000) % 60),
          totalHours: totalHours
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isFasting, startTime]);

  const toggleFast = () => {
    if (isFasting) {
      localStorage.removeItem('fasting_start_time');
      setIsFasting(false);
      setElapsedTime({ hours: 0, minutes: 0, seconds: 0, totalHours: 0 });
    } else {
      const now = new Date();
      localStorage.setItem('fasting_start_time', now.toISOString());
      setStartTime(now);
      setIsFasting(true);
    }
  };

  const progressPercentage = Math.min((elapsedTime.totalHours / targetHours) * 100, 100);
  const currentPhase = getFastingPhase(elapsedTime.totalHours);

  return (
    <main className="min-h-screen bg-neutral-950 text-white p-6 font-sans selection:bg-purple-500/30">
      <nav className="flex justify-between items-center mb-12">
        <h1 className="text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
          ZeroG
        </h1>
        <Link href="/onboarding" className="p-2 bg-neutral-900 rounded-full hover:bg-neutral-800 transition">
          <Settings size={20} className="text-gray-400" />
        </Link>
      </nav>

      <section className="text-center mb-8">
        <p className="text-gray-400 text-sm tracking-wider uppercase mb-2">Current State</p>
        <h2 className={`text-3xl font-semibold ${currentPhase.color}`}>
          {isFasting ? currentPhase.title : "Metabolic Rest"}
        </h2>
        <p className="text-gray-500 mt-2 max-w-md mx-auto text-sm">
          {isFasting ? currentPhase.description : "You are currently in your eating window. Hydrate and eat nutrient-dense foods."}
        </p>
      </section>

      <FastingRing 
        progressPercentage={progressPercentage} 
        hours={elapsedTime.hours} 
        minutes={elapsedTime.minutes} 
        currentPhase={currentPhase}
      />

      <div className="flex justify-center mt-10">
        <button 
          onClick={toggleFast}
          className={`px-12 py-4 rounded-full font-bold text-lg tracking-wide transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(0,0,0,0.3)] ${
            isFasting 
              ? 'bg-neutral-800 text-red-400 hover:bg-neutral-700' 
              : 'bg-white text-black hover:bg-gray-200'
          }`}
        >
          {isFasting ? 'End Fast' : 'Start Fast'}
        </button>
      </div>

      {/* Psychological Reinforcement Dashboard */}
      <div className="grid grid-cols-3 gap-4 mt-16 max-w-lg mx-auto">
        <div className="bg-neutral-900/50 p-4 rounded-2xl flex flex-col items-center border border-neutral-800">
          <Flame size={24} className="text-orange-400 mb-2" />
          <span className="text-xl font-bold">{Math.floor(elapsedTime.totalHours * 45)}</span>
          <span className="text-xs text-gray-500 uppercase">kcal burned</span>
        </div>
        <div className="bg-neutral-900/50 p-4 rounded-2xl flex flex-col items-center border border-neutral-800">
          <Droplet size={24} className="text-blue-400 mb-2" />
          <span className="text-xl font-bold">2.5L</span>
          <span className="text-xs text-gray-500 uppercase">Hydration</span>
        </div>
        <div className="bg-neutral-900/50 p-4 rounded-2xl flex flex-col items-center border border-neutral-800">
          <Activity size={24} className="text-green-400 mb-2" />
          <span className="text-xl font-bold">Base</span>
          <span className="text-xs text-gray-500 uppercase">Insulin</span>
        </div>
      </div>
    </main>
  );
}
