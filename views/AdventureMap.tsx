
import React from 'react';
import { Button } from '../components/Button';
import { AppView, LevelData } from '../types';
import { ArrowLeftIcon, StarIcon, HeartIcon, CoinIcon } from '../components/Icons';
import { PEP_CURRICULUM } from '../constants';

interface AdventureMapProps {
  levels: LevelData[];
  selectedGrade: number;
  onSelectLevel: (levelId: number) => void;
  onBack: () => void;
  lives: number;
  coins: number;
}

export const AdventureMap: React.FC<AdventureMapProps> = ({ 
  levels, 
  selectedGrade, 
  onSelectLevel, 
  onBack,
  lives,
  coins
}) => {
  const units = PEP_CURRICULUM[selectedGrade] || [];
  
  return (
    <div className="h-full w-full bg-blue-50/30 flex flex-col overflow-hidden pt-safe pb-safe">
      <div className="p-4 bg-white/80 backdrop-blur-md shadow-sm z-20 sticky top-0 mx-4 mt-2 rounded-3xl border border-white/50">
        <div className="flex justify-between items-center">
            <div className="flex items-center">
                <Button variant="neutral" size="sm" onClick={onBack} className="mr-3 w-10 h-10 p-0 flex items-center justify-center rounded-full">
                    <ArrowLeftIcon size={20} />
                </Button>
                <h2 className="text-lg font-black text-gray-800">{selectedGrade}年级 · 知识冒险</h2>
            </div>
            <div className="flex space-x-2">
                 <div className="flex items-center bg-brand-pink/10 px-3 py-1.5 rounded-full border border-brand-pink/20">
                    <HeartIcon filled size={16} className="mr-1 text-brand-pink" />
                    <span className="font-black text-sm text-brand-pink">{lives}</span>
                 </div>
                 <div className="flex items-center bg-brand-yellow/10 px-3 py-1.5 rounded-full border border-brand-yellow/20">
                    <CoinIcon size={16} className="mr-1" />
                    <span className="font-black text-sm text-yellow-700">{coins}</span>
                 </div>
            </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-8 md:p-12 relative overscroll-contain">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {units.map((unit, index) => (
            <button
              key={unit.id}
              onClick={() => onSelectLevel(100 * selectedGrade + unit.id)}
              className="group relative bg-white p-6 rounded-[2.5rem] shadow-xl border-4 border-white hover:border-brand-blue transition-all active:scale-95 text-left overflow-hidden min-h-[140px] flex flex-col justify-center"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-inner border-b-4 border-black/10
                  ${index % 3 === 0 ? 'bg-blue-100' : index % 3 === 1 ? 'bg-green-100' : 'bg-purple-100'}
                `}>
                  {index + 1}
                </div>
                <div className="bg-slate-100 px-3 py-1 rounded-full text-[9px] font-black text-slate-400 uppercase tracking-widest">UNIT {unit.id}</div>
              </div>
              <h3 className="text-xl font-black text-gray-800 mb-1 leading-tight">{unit.title}</h3>
              <p className="text-[10px] text-brand-blue font-black uppercase tracking-wider opacity-60">点击进入挑战</p>
              
              <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <CoinIcon size={80} />
              </div>
            </button>
          ))}
        </div>
        
        {units.length === 0 && (
          <div className="text-center py-24">
            <div className="text-6xl mb-4 grayscale opacity-30">🚧</div>
            <div className="text-gray-400 font-black text-lg">新关卡正在搭建中...</div>
          </div>
        )}

        <div className="h-20 w-full" /> {/* 底部占位 */}
      </div>
    </div>
  );
};
