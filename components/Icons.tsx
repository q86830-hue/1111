
import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
  loading?: boolean;
}

const getLoadingClass = (loading?: boolean) => loading ? "animate-pulse opacity-70" : "";

export const AppleIcon: React.FC<IconProps> = ({ size = 24, className = "", loading }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={`text-red-500 ${getLoadingClass(loading)} ${className}`} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C13.5 2 14.5 3.5 14.5 3.5C14.5 3.5 15.5 2 17 2C19.5 2 21 4.5 21 7.5C21 12.5 16 16.5 13.5 21.5C13.5 21.5 13 22 12 22C11 22 10.5 21.5 10.5 21.5C8 16.5 3 12.5 3 7.5C3 4.5 4.5 2 7 2C8.5 2 9.5 3.5 9.5 3.5C9.5 3.5 10.5 2 12 2Z" fill="currentColor"/>
    <path d="M12 2C12 2 11.5 0.5 13.5 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const StarIcon: React.FC<IconProps & { filled?: boolean }> = ({ size = 24, className = "", loading, filled = true }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? "#FFD93D" : "none"} stroke="#FFD93D" strokeWidth="2" strokeLinejoin="round" className={`${getLoadingClass(loading)} ${className}`}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export const HeartIcon: React.FC<IconProps & { filled?: boolean }> = ({ filled = true, size = 24, className = "", loading }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? "#FF6B6B" : "none"} stroke={filled ? "#FF6B6B" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${getLoadingClass(loading)} ${className}`}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

export const CoinIcon: React.FC<IconProps> = ({ size = 24, className = "", loading }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#FFD93D" stroke="#F59E0B" strokeWidth="2" className={`${getLoadingClass(loading)} ${className}`}>
    <circle cx="12" cy="12" r="10"></circle>
    <text x="50%" y="50%" textAnchor="middle" dy=".3em" fontSize="12" fill="#F59E0B" fontWeight="bold">$</text>
  </svg>
);

export const ArrowLeftIcon: React.FC<IconProps> = ({ size = 24, className = "", loading }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${getLoadingClass(loading)} ${className}`}>
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
  </svg>
);

export const SettingsIcon: React.FC<IconProps> = ({ size = 24, className = "", loading }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${getLoadingClass(loading)} ${className}`}>
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33 1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1-2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82 1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
  </svg>
);

const COLOR_MAP: Record<string, string> = {
  "bg-brand-pink": "#FF6B6B",
  "bg-brand-orange": "#FF8400",
  "bg-brand-blue": "#4D96FF",
  "bg-brand-green": "#6BCB77",
  "bg-brand-purple": "#9D4EDD",
  "bg-brand-yellow": "#FFD93D",
  "bg-blue-500": "#3B82F6",
  "bg-green-500": "#10B981"
};

export const Shapes = {
  Sphere: ({ size = 100, colorClass = "bg-brand-pink" }) => {
    const color = COLOR_MAP[colorClass] || "#FF6B6B";
    return (
      <div 
        className="rounded-full relative"
        style={{ 
          width: size, 
          height: size,
          backgroundColor: color,
          backgroundImage: `radial-gradient(circle at 35% 35%, rgba(255,255,255,0.9) 0%, transparent 65%), radial-gradient(circle at 75% 75%, rgba(0,0,0,0.2) 0%, transparent 80%)`,
          boxShadow: `inset -10px -10px 40px rgba(0,0,0,0.3), 0 20px 40px rgba(0,0,0,0.1)`
        }}
      />
    );
  },
  Cube: ({ size = 100, colorClass = "bg-brand-orange" }) => {
    const color = COLOR_MAP[colorClass] || "#FF8400";
    return (
      <div className="relative" style={{ width: size, height: size * 1.2, perspective: '1200px', overflow: 'visible' }}>
        <div className="absolute -bottom-2 left-1 right-1 h-3 bg-black/10 blur-md rounded-full"></div>
        <div 
          className="absolute inset-x-0 bottom-0 top-[20px] rounded-2xl shadow-lg border-b-[15px] border-r-[8px] border-black/20"
          style={{ backgroundColor: color }}
        >
          <div className="absolute -top-[20px] left-0 right-0 h-5 bg-white/30 rounded-t-2xl transform -skew-x-[35deg] origin-bottom"></div>
          <div className="absolute inset-2 border-t border-l border-white/20 rounded-xl"></div>
        </div>
      </div>
    );
  },
  Cuboid: ({ size = 100, colorClass = "bg-brand-blue" }) => {
    const color = COLOR_MAP[colorClass] || "#4D96FF";
    return (
      <div className="relative" style={{ width: size * 1.5, height: size * 1.1, perspective: '1200px', overflow: 'visible' }}>
        <div className="absolute -bottom-4 left-4 right-4 h-4 bg-black/10 blur-xl rounded-full"></div>
        <div 
          className="absolute inset-x-0 bottom-0 top-[25px] rounded-[2rem] shadow-xl border-b-[18px] border-r-[10px] border-black/25"
          style={{ backgroundColor: color }}
        >
          <div className="absolute -top-[25px] left-4 right-4 h-7 bg-white/25 rounded-t-[2rem] transform -skew-x-[25deg] origin-bottom"></div>
          <div className="absolute inset-2 border-t border-l border-white/10 rounded-2xl"></div>
        </div>
      </div>
    );
  },
  Cylinder: ({ size = 100, colorClass = "bg-brand-green" }) => {
    const color = COLOR_MAP[colorClass] || "#6BCB77";
    return (
      <div className="relative flex flex-col items-center" style={{ width: size, overflow: 'visible' }}>
        <div 
          className="w-full h-8 rounded-[100%] absolute -top-4 z-20"
          style={{ 
            backgroundColor: color, 
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 90%)',
            borderBottom: '1px solid rgba(0,0,0,0.05)'
          }}
        ></div>
        <div 
          className="w-full h-24 rounded-b-[3rem] shadow-xl relative overflow-hidden"
          style={{ backgroundColor: color }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/20"></div>
        </div>
        <div className="w-[110%] h-5 bg-black/10 blur-lg rounded-full -mt-2"></div>
      </div>
    );
  }
};
