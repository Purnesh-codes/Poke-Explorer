import React from "react";

type StatGaugeProps = {
  label: string;
  value: number;
  max?: number;
  color: string; // Tailwind text color (e.g. "text-red-500")
  strokeColor: string; // Hex code for SVG stroke (e.g. "#ef4444")
  glowColor: string; // rgba for drop-shadow glow
  icon: React.ReactNode;
};

export function StatGauge({
  label,
  value,
  max = 150,
  color,
  strokeColor,
  glowColor,
  icon,
}: StatGaugeProps) {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(value / max, 1);
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <div className="flex flex-col items-center">
      {/* Circle Container */}
      <div className="relative flex h-24 w-24 items-center justify-center">
        <svg
          className="h-full w-full -rotate-90 transform"
          viewBox="0 0 100 100"
        >
          {/* Background Track */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="#12182e"
            strokeWidth="7"
            fill="transparent"
          />
          {/* Progress Stroke with Glow */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke={strokeColor}
            strokeWidth="7"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            style={{
              filter: `drop-shadow(0 0 6px ${glowColor})`,
            }}
          />
        </svg>

        {/* Center Glowing Icon */}
        <div
          className={`absolute flex items-center justify-center ${color}`}
          style={{ filter: `drop-shadow(0 0 8px ${glowColor})` }}
        >
          {icon}
        </div>
      </div>

      {/* Value */}
      <span className="text-base font-semibold text-slate-100">{value}</span>

      {/* Label */}
      <span className=" font-medium text-slate-400 capitalize text-center">
        {label}
      </span>
    </div>
  );
}
