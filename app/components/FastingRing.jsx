import React from 'react';

export default function FastingRing({ progressPercentage, hours, minutes, seconds, currentPhase }) {
  const radius = 140;
  const stroke = 12;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const clampedProgress = Math.min(progressPercentage, 100);
  const strokeDashoffset = circumference - (clampedProgress / 100) * circumference;

  return (
    <div className="relative flex flex-col items-center justify-center w-full max-w-sm mx-auto my-10">
      <svg
        height={radius * 2}
        width={radius * 2}
        className="transform -rotate-90 drop-shadow-2xl"
        aria-hidden="true"
      >
        <circle
          stroke="#161618"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke="currentColor"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={`${circumference} ${circumference}`}
          style={{
            strokeDashoffset,
            transition: 'stroke-dashoffset 1s ease-in-out',
          }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className={`${currentPhase.ringClass} transition-colors duration-1000`}
        />
      </svg>

      <div className="absolute flex flex-col items-center justify-center text-center" aria-live="polite">
        <div className="flex items-baseline space-x-1">
          <span className="text-5xl font-black tracking-tighter text-white tabular-nums font-heading">
            {hours.toString().padStart(2, '0')}
          </span>
          <span className="text-xl text-tuwa-muted font-medium">h</span>
          <span className="text-5xl font-black tracking-tighter text-white tabular-nums font-heading">
            {minutes.toString().padStart(2, '0')}
          </span>
          <span className="text-xl text-tuwa-muted font-medium">m</span>
        </div>
        <span className="text-sm font-semibold tracking-widest text-tuwa-muted tabular-nums mt-1">
          {seconds.toString().padStart(2, '0')}s
        </span>
        <span className={`mt-4 font-bold tracking-widest uppercase text-xs ${currentPhase.color}`}>
          {currentPhase.title}
        </span>
      </div>
    </div>
  );
}
