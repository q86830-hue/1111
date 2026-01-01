
import React, { useState } from 'react';
import { ArrowLeftIcon, HeartIcon } from '../components/Icons';
import { audio } from '../utils/audio';

interface AdventureMapProps {
  selectedGrade: number;
  onSelectLevel: (slotId: number) => void;
  onBack: () => void;
  lives: number;
  coins: number;
  onRefreshMap: () => void;
  pageIndex: number;
}

export const AdventureMap: React.FC<AdventureMapProps> = ({ 
  selectedGrade, 
  onSelectLevel, 
  onBack,
  lives,
  onRefreshMap,
  pageIndex
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleMagicRefresh = () => {
    if (isRefreshing) return;
    audio.playClick();
    setIsRefreshing(true);
    onRefreshMap();
    setTimeout(() => setIsRefreshing(false), 800);
  };

  const slots = Array.from({ length: 20 }, (_, i) => i + 1);

  const getThemeColor = () => {
    if (selectedGrade <= 2) return 'bg-[#F0FDF4]'; 
    if (selectedGrade <= 4) return 'bg-[#F0F9FF]'; 
    return 'bg-[#F5F3FF]'; 
  };

  const getBorderColor = () => {
    if (selectedGrade <= 2) return 'border-green-100';
    if (selectedGrade <= 4) return 'border-blue-100';
    return 'border-purple-100';
  };

  return (
    <div className={`h-full w-full ${getThemeColor()} flex flex-col overflow-hidden relative transition-colors duration-500`}>
      <div className="pt-safe px-4 pb-4 bg-white/90 backdrop-blur-md shadow-sm z-50 rounded-b-[2rem] flex items-center justify-between border-b border-slate-50">
        <div className="flex items-center">
          <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 border border-slate-100 active:scale-90 transition-all">
            <ArrowLeftIcon size={18} />
          </button>
          <div className="ml-3">
            <h2 className="text-lg font-black text-slate-800 leading-tight">{selectedGrade}年级 · 同步练习</h2>
            <p className="text-[8px] font-black text-brand-blue uppercase tracking-tighter opacity-40">PEP CURRICULUM POOL</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button 
            onClick={handleMagicRefresh}
            disabled={isRefreshing}
            className={`w-12 h-12 rounded-full bg-brand-blue text-white shadow-lg border-2 border-white flex flex-col items-center justify-center active:scale-95 transition-all ${isRefreshing ? 'animate-spin opacity-50' : ''}`}
          >
            <span className="text-base leading-none mb-0.5">✨</span>
            <span className="text-[9px] font-black leading-none whitespace-nowrap">换一批</span>
          </button>

          <div className="flex items-center bg-slate-50 px-3 py-1.5 rounded-2xl border border-slate-100">
            <HeartIcon filled size={16} className="mr-1 text-brand-pink" />
            <span className="font-black text-base text-slate-700">{lives}</span>
          </div>
        </div>
      </div>

      <div className={`flex-1 overflow-y-auto px-5 py-6 no-scrollbar transition-all duration-500 ${isRefreshing ? 'opacity-30 blur-sm scale-95' : 'opacity-100 scale-100'}`}>
        <div className="max-w-md mx-auto grid grid-cols-4 gap-4 pb-24">
          {slots.map(id => (
            <button
              key={id}
              onClick={() => { audio.playClick(); onSelectLevel(id); }}
              className={`aspect-[4/5] bg-white rounded-[1.5rem] flex flex-col items-center justify-center border-2 ${getBorderColor()} transition-all duration-300 relative group shadow-sm active:shadow-inner active:translate-y-1`}
            >
              <span className="text-2xl font-black text-slate-700 group-hover:text-brand-blue">{id}</span>
              <div className="mt-1 flex space-x-0.5">
                 <div className="w-1.5 h-1.5 rounded-full bg-brand-yellow"></div>
                 <div className="w-1.5 h-1.5 rounded-full bg-slate-100"></div>
                 <div className="w-1.5 h-1.5 rounded-full bg-slate-100"></div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="fixed bottom-6 left-0 right-0 z-40 flex justify-center px-8 pointer-events-none">
        <div className="bg-white/95 backdrop-blur-xl px-8 py-3 rounded-full border border-slate-100 shadow-xl flex items-center space-x-3 w-full max-w-xs animate-pop">
          <div className="text-xl animate-bounce">🎯</div>
          <p className="text-[10px] font-black text-brand-blue leading-tight tracking-tight">已同步人教版 {selectedGrade} 年级核心考点</p>
        </div>
      </div>
    </div>
  );
};
