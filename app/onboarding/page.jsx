// File: app/onboarding/page.jsx
// Purpose: Collect user biometrics for the algorithm to personalize the experience. Open access by design.
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Onboarding() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    age: '',
    weight: '',
    height: '',
    activityLevel: 'sedentary',
    region: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here AI IDE should link this to the Cloudflare D1 API route
    // For now, save to local config to allow immediate testing
    localStorage.setItem('user_profile', JSON.stringify(formData));
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col justify-center p-6">
      <div className="max-w-md w-full mx-auto bg-neutral-900 border border-neutral-800 p-8 rounded-3xl shadow-2xl">
        <h2 className="text-3xl font-bold mb-2">Initialize Profile</h2>
        <p className="text-gray-400 text-sm mb-8">
          The algorithm needs your biological baseline to calculate accurate metabolic phases. Publicly accessible by design.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Global Username</label>
            <input 
              type="text" 
              name="username" 
              required
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors"
              placeholder="e.g., faster99"
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Age</label>
              <input type="number" name="age" required className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3" onChange={handleChange} />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Weight (kg)</label>
              <input type="number" name="weight" required className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3" onChange={handleChange} />
            </div>
          </div>

          <div>
             <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Height (cm)</label>
             <input type="number" name="height" required className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3" onChange={handleChange} />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Activity Level</label>
            <select name="activityLevel" className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white appearance-none" onChange={handleChange}>
              <option value="sedentary">Sedentary (Desk Job)</option>
              <option value="light">Lightly Active</option>
              <option value="moderate">Moderately Active</option>
              <option value="active">Very Active</option>
            </select>
          </div>

          <button 
            type="submit"
            className="w-full bg-white text-black font-bold text-lg py-4 rounded-xl mt-6 hover:bg-gray-200 transition-colors"
          >
            Generate Algorithm Baseline
          </button>
        </form>
      </div>
    </div>
  );
}
