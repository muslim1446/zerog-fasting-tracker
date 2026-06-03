// File: app/components/FastingRing.jsx
// Purpose: The core psychological motivator. A beautiful, visual progress ring.
import React from 'react';

export default function FastingRing({ progressPercentage, hours, minutes, currentPhase }) {
  const radius = 120;
  const stroke = 12;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progressPercentage / 100) * circumference;

  return (
    <div className="relative flex flex-col items-center justify-center w-full max-w-sm mx-auto my-8">
      <svg
        height={radius * 2}
        width={radius * 2}
        className="transform -rotate-90 drop-shadow-2xl"
      >
        {/* Background Ring */}
        <circle
          stroke="#1f2937"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        {/* Progress Ring */}
        <circle
          stroke="currentColor"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset, transition: 'stroke-dashoffset 1s ease-in-out' }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className={`${currentPhase.color.replace('text-', 'text-')}`}
        />
      </svg>
      
      {/* Center Text */}
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className="text-5xl font-extrabold tracking-tighter text-white">
          {hours}<span className="text-2xl text-gray-400">h</span> {minutes}<span className="text-2xl text-gray-400">m</span>
        </span>
        <span className={`mt-2 font-medium tracking-widest uppercase text-xs ${currentPhase.color}`}>
          {currentPhase.title}
        </span>
      </div>
    </div>
  );
}
