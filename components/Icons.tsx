
import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
  loading?: boolean;
}

const getLoadingClass = (loading?: boolean) => loading ? "animate-pulse opacity-70" : "";

export const AppleIcon: React.FC<IconProps> = ({ size = 24, className = "", loading }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={`text-red-500 ${getLoadingClass(loading)} ${className}`} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C13.5 2 14.5 3.5 14.5 3.5C14.5 3.5 15.5 2 17 2C19.5 2 21 4.5 21 7.5C21 12.5 16 16.5 13.5 21.5C13.5 21.5 13 22 12 22C11 22 10.5 21.5 10.5 21.5C8 16.5 3 12.5 3 7.5C3 4.5 4.5 2 7 2C8.5 2 9.5 3.5 9.5 3.5C9.5 3.5 10.5 2 12 2Z" stroke="none"/>
    <path d="M12 2C12 2 11.5 0.5 13.5 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const StickIcon: React.FC<IconProps> = ({ size = 24, className = "", loading }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={`text-brand-yellow ${getLoadingClass(loading)} ${className}`} xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="2" width="4" height="20" rx="2" stroke="black" strokeWidth="1" />
  </svg>
);

export const StarIcon: React.FC<IconProps & { filled?: boolean }> = ({ filled = true, size = 32, className = "", loading }) => (
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

export const GiftIcon: React.FC<IconProps> = ({ size = 24, className = "", loading }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`text-brand-purple ${getLoadingClass(loading)} ${className}`}>
    <polyline points="20 12 20 22 4 22 4 12"></polyline>
    <rect x="2" y="7" width="20" height="5"></rect>
    <line x1="12" y1="22" x2="12" y2="7"></line>
    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
  </svg>
);

export const HomeIcon: React.FC<IconProps> = ({ size = 24, className = "", loading }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${getLoadingClass(loading)} ${className}`}>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

export const ArrowLeftIcon: React.FC<IconProps> = ({ size = 24, className = "", loading }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${getLoadingClass(loading)} ${className}`}>
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
  </svg>
);

export const BugIcon: React.FC<IconProps> = ({ size = 24, className = "", loading }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={`text-yellow-400 ${getLoadingClass(loading)} ${className}`} xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="6" />
    <path d="M12 6C12 6 8 2 6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M12 6C12 6 16 2 18 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M8 14L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M16 14L20 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const GemIcon: React.FC<IconProps> = ({ size = 24, className = "", loading }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={`text-red-500 ${getLoadingClass(loading)} ${className}`} xmlns="http://www.w3.org/2000/svg">
    <path d="M6 4L2 10L12 22L22 10L18 4H6Z" stroke="none"/>
    <path d="M2 10H22M12 22L7 10M12 22L17 10" stroke="white" strokeWidth="1" strokeOpacity="0.5"/>
  </svg>
);

export const MonsterIcon: React.FC<IconProps> = ({ size = 24, className = "", loading }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={`text-purple-500 ${getLoadingClass(loading)} ${className}`} xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="6" width="16" height="14" rx="4" />
    <path d="M7 6V3M17 6V3" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    <circle cx="9" cy="12" r="1.5" fill="white"/>
    <circle cx="15" cy="12" r="1.5" fill="white"/>
    <path d="M9 16H15" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const SoldierIcon: React.FC<IconProps> = ({ size = 24, className = "", loading }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={`text-blue-600 ${getLoadingClass(loading)} ${className}`} xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="7" r="4" />
    <path d="M6 21V16C6 13 8 11 12 11C16 11 18 13 18 16V21" stroke="currentColor" strokeWidth="4" />
  </svg>
);

export const MagnifierIcon: React.FC<IconProps> = ({ size = 24, className = "", loading }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" className={`text-amber-700 ${getLoadingClass(loading)} ${className}`} strokeWidth="2">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

export const SettingsIcon: React.FC<IconProps> = ({ size = 24, className = "", loading }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${getLoadingClass(loading)} ${className}`}>
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
  </svg>
);

export const Shapes = {
  Circle: ({ size = 60, color = 'bg-red-400' }: any) => <div className={`${color} rounded-full border-4 border-black/10`} style={{ width: size, height: size }}></div>,
  Square: ({ size = 60, color = 'bg-blue-400' }: any) => <div className={`${color} rounded-xl border-4 border-black/10`} style={{ width: size, height: size }}></div>,
  Triangle: ({ size = 60, color = 'bg-green-400' }: any) => (
    <div style={{ width: 0, height: 0, borderLeft: `${size/2}px solid transparent`, borderRight: `${size/2}px solid transparent`, borderBottom: `${size}px solid #4ade80`, filter: 'drop-shadow(0 4px 0 rgba(0,0,0,0.1))' }}></div>
  ),
  Rectangle: ({ size = 60, color = 'bg-yellow-400' }: any) => <div className={`${color} rounded-xl border-4 border-black/10`} style={{ width: size * 1.5, height: size }}></div>,
};
