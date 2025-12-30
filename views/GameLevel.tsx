
import React, { useState, useEffect } from 'react';
import { Button } from '../components/Button';
import { ArrowLeftIcon, HeartIcon } from '../components/Icons';
import { LevelData } from '../types';
import { audio } from '../utils/audio';

export const GameLevel: React.FC<{
  level: LevelData;
  onBack: () => void;
  onComplete: (id: number, stars: number) => void;
  currentLives: number;
  onLoseLife: () => void;
  onUpdateCoins: (amount: number) => void;
}> = ({ level, onBack, onComplete, currentLives, onLoseLife, onUpdateCoins }) => {
  const [selected, setSelected] = useState<any>(null);
  const [isWrong, setIsWrong] = useState(false);

  useEffect(() => {
    setSelected(null);
    setIsWrong(false);
  }, [level.uniqueId]);

  const checkAnswer = (val: any) => {
    if (selected !== null) return;
    const isCorrect = val.toString() === level.config.ans.toString();
    setSelected(val);
    if (isCorrect) {
      audio.playCorrect();
      onUpdateCoins(10);
      setTimeout(() => onComplete(level.id, 3), 800);
    } else {
      audio.playWrong();
      setIsWrong(true);
      onLoseLife();
      setTimeout(() => {
        setSelected(null);
        setIsWrong(false);
      }, 700);
    }
  };

  const renderVisuals = () => {
    const { config } = level;
    const vt = config.visualType;

    switch(vt) {
      case "AREA_GRID":
        return (
          <div className="grid gap-1 bg-white p-3 rounded-2xl border-4 border-slate-100 shadow-inner" 
               style={{ gridTemplateColumns: `repeat(${config.w}, minmax(0, 1fr))` }}>
            {Array.from({ length: config.w * config.h }).map((_, i) => (
              <div key={i} className="w-10 h-10 bg-brand-green/40 border-2 border-brand-green/20 rounded-lg flex items-center justify-center text-[10px] text-brand-green font-bold">1</div>
            ))}
          </div>
        );

      case "PERIMETER_RECT":
        return (
          <div className="relative border-4 border-brand-blue bg-blue-50/50 flex flex-col items-center justify-center rounded-2xl shadow-lg"
               style={{ width: config.w * 30, height: config.h * 30 }}>
            <span className="absolute -top-8 font-black text-brand-blue text-lg">{config.w} cm</span>
            <span className="absolute -right-14 font-black text-brand-blue text-lg">{config.h} cm</span>
            <div className="text-brand-blue/20 font-black text-xl italic uppercase tracking-widest">周长挑战</div>
          </div>
        );

      case "COMPASS_VIEW":
        const rotations: any = { '北': 0, '东': 90, '南': 180, '西': 270 };
        return (
          <div className="relative w-56 h-56 rounded-full border-8 border-slate-800 bg-white flex items-center justify-center shadow-2xl">
            <div className="absolute font-black text-slate-800 top-2 text-xl">北</div>
            <div className="absolute font-black text-slate-800 right-2 text-xl">东</div>
            <div className="absolute font-black text-slate-800 bottom-2 text-xl">南</div>
            <div className="absolute font-black text-slate-800 left-2 text-xl">西</div>
            <div className="w-3 h-40 bg-gradient-to-b from-red-500 via-red-500 to-slate-200 rounded-full transition-transform duration-1000 shadow-lg"
                 style={{ transform: `rotate(${rotations[config.targetDir]}deg)` }} />
            <div className="w-6 h-6 bg-slate-800 rounded-full z-10 border-4 border-white" />
          </div>
        );

      case "VOLUME_CUBES":
        return (
          <div className="flex flex-wrap justify-center gap-3 max-w-[240px] p-4 bg-orange-50 rounded-3xl border-2 border-orange-100">
            {Array.from({ length: config.count }).map((_, i) => (
              <div key={i} className="w-10 h-10 bg-brand-orange rounded-xl shadow-[4px_4px_0_rgba(255,132,0,0.3)] border-2 border-white transform hover:scale-110 transition-transform" />
            ))}
          </div>
        );

      case "UNIT_CONVERSION":
        return (
          <div className="text-center p-8 bg-white rounded-[3rem] shadow-xl border-4 border-brand-blue/10">
            <div className="text-8xl mb-6 animate-float">🗺️</div>
            <div className="text-3xl font-black text-brand-blue px-8 py-3 bg-blue-50 rounded-full">
              {config.value} <span className="text-xl opacity-60">{config.unit}</span>
            </div>
          </div>
        );

      case "PLACE_VALUE_BLOCKS":
        return (
          <div className="flex space-x-10">
            <div className="flex flex-col items-center">
              <div className="bg-blue-50 p-3 rounded-2xl flex space-x-1 border-4 border-blue-100 shadow-inner">
                {Array.from({ length: config.tens }).map((_, i) => (
                  <div key={i} className="w-5 h-20 bg-brand-blue rounded-md border border-white shadow-sm" />
                ))}
              </div>
              <span className="text-xs font-black text-brand-blue mt-2 tracking-widest uppercase">十位</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-pink-50 p-3 rounded-2xl grid grid-cols-3 gap-2 border-4 border-pink-100 shadow-inner">
                {Array.from({ length: config.ones }).map((_, i) => (
                  <div key={i} className="w-5 h-5 bg-brand-pink rounded-md border border-white shadow-sm animate-pop" />
                ))}
              </div>
              <span className="text-xs font-black text-brand-pink mt-2 tracking-widest uppercase">个位</span>
            </div>
          </div>
        );

      case "PLACE_VALUE_CARDS_LARGE":
        return (
          <div className="flex flex-col items-center">
            <div className="text-5xl font-black text-brand-purple tracking-[0.2em] bg-purple-50 px-10 py-6 rounded-3xl border-4 border-white shadow-xl">
              {config.value.toLocaleString()}
            </div>
            <div className="mt-4 text-slate-400 font-bold tracking-widest">大数的认识：千位以上</div>
          </div>
        );

      case "BASIC_CALC":
        return (
          <div className="text-7xl font-black text-brand-blue bg-white px-12 py-10 rounded-[4rem] shadow-2xl border-b-[12px] border-blue-100 transform hover:scale-105 transition-transform flex items-center space-x-6">
             <span>{config.n1}</span>
             <span className="text-4xl text-slate-300">{config.symbol}</span>
             <span>{config.n2}</span>
          </div>
        );

      case "ANALOG_CLOCK":
        return (
          <div className="relative w-56 h-56 rounded-full border-[12px] border-slate-800 bg-white shadow-2xl flex items-center justify-center">
            {Array.from({length: 12}).map((_, i) => (
              <div key={i} className="absolute inset-2 text-center font-black text-slate-400 text-sm" style={{transform: `rotate(${i * 30 + 30}deg)`}}>
                <span style={{display:'inline-block', transform: `rotate(-${i * 30 + 30}deg)`}}>{i+1}</span>
              </div>
            ))}
            <div className="absolute w-2.5 h-16 bg-slate-800 rounded-full origin-bottom bottom-1/2" 
                 style={{ transform: `rotate(${config.h * 30}deg)` }} />
            <div className="absolute w-1.5 h-22 bg-brand-blue rounded-full origin-bottom bottom-1/2" 
                 style={{ transform: `rotate(${config.m * 6}deg)` }} />
            <div className="absolute w-5 h-5 bg-brand-pink rounded-full border-4 border-white shadow-md" />
          </div>
        );

      case "FRACTION_PIE":
        return (
          <div className="relative w-52 h-52 rounded-full border-8 border-slate-700 overflow-hidden bg-white shadow-2xl group">
             {Array.from({ length: config.total }).map((_, i) => {
               const angle = 360 / config.total;
               return (
                 <div key={i} className={`absolute inset-0 origin-center ${i < config.colored ? 'bg-brand-orange animate-pop' : 'bg-white'} border-r border-slate-100`}
                      style={{ 
                        transform: `rotate(${i * angle}deg)`, 
                        clipPath: `polygon(50% 50%, 50% 0%, 100% 0%, 100% 50%)`, 
                        width: '100%', height: '100%' 
                      }} />
               );
             })}
             <div className="absolute inset-0 flex items-center justify-center text-slate-200 pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity">
                <div className="w-full h-[2px] bg-slate-800 absolute" style={{transform: 'rotate(0deg)'}} />
                <div className="w-full h-[2px] bg-slate-800 absolute" style={{transform: 'rotate(90deg)'}} />
             </div>
          </div>
        );

      case "DECIMAL_SLIDER":
        return (
          <div className="w-full max-w-xs flex flex-col items-center">
             <div className="w-full h-8 bg-slate-100 rounded-full overflow-hidden border-2 border-slate-200 shadow-inner relative mb-6">
                <div className="h-full bg-brand-green transition-all duration-1000 shadow-lg" style={{ width: `${parseFloat(config.val) * 100}%` }} />
                <div className="absolute inset-0 flex justify-between px-1">
                   {Array.from({length: 11}).map((_, i) => <div key={i} className="w-[1px] h-full bg-black/5" />)}
                </div>
             </div>
             <div className="text-4xl font-black text-brand-green bg-white px-6 py-2 rounded-2xl shadow-md border-2 border-brand-green/10">0.{config.val.split('.')[1]}</div>
          </div>
        );

      case "RATIO_VISUAL":
        return (
          <div className="flex flex-col items-center space-y-6">
            <div className="flex space-x-8">
              <div className="flex flex-col items-center">
                <div className="grid grid-cols-2 gap-2 bg-red-50 p-3 rounded-2xl border-2 border-red-100 shadow-inner">
                  {Array.from({length: config.n1}).map((_, i) => <div key={i} className="w-8 h-8 rounded-full bg-brand-pink shadow-md animate-pop" />)}
                </div>
                <span className="text-[10px] font-black text-brand-pink mt-2 uppercase tracking-widest">红球</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="grid grid-cols-2 gap-2 bg-blue-50 p-3 rounded-2xl border-2 border-blue-100 shadow-inner">
                  {Array.from({length: config.n2}).map((_, i) => <div key={i} className="w-8 h-8 rounded-full bg-brand-blue shadow-md animate-pop" />)}
                </div>
                <span className="text-[10px] font-black text-brand-blue mt-2 uppercase tracking-widest">蓝球</span>
              </div>
            </div>
            <div className="text-2xl font-black text-slate-300 italic tracking-[0.5em]">RATIO</div>
          </div>
        );

      case "LINE_GRAPH":
        return (
          <div className="w-full h-56 border-l-8 border-b-8 border-slate-800 flex items-end px-10 relative bg-white/40 rounded-3xl shadow-inner group">
             {config.data.map((d: number, i: number) => (
               <div key={i} className="flex-1 flex flex-col items-center group/item transition-all duration-500 hover:scale-105">
                 <div className="w-12 bg-brand-blue rounded-t-2xl transition-all duration-1000 shadow-xl group-hover/item:bg-brand-blue/80" 
                      style={{ height: `${d}%` }} />
                 <span className="text-xs font-black mt-3 text-slate-500">{d}</span>
               </div>
             ))}
             <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-blue-100/10 to-transparent" />
          </div>
        );

      case "COORDINATE_GRID":
        return (
          <div className="grid grid-cols-5 grid-rows-5 gap-0 w-64 h-64 border-l-8 border-b-8 border-slate-800 relative bg-white shadow-2xl rounded-tr-3xl overflow-hidden">
             {Array.from({length: 25}).map((_, i) => (
               <div key={i} className="border border-slate-100" />
             ))}
             <div className="absolute text-5xl transition-all duration-1000 ease-out drop-shadow-xl" 
                  style={{ left: `${(config.x-1) * 20}%`, bottom: `${(config.y-1) * 20}%`, margin: '8px' }}>🎁</div>
          </div>
        );

      case "NUMBER_BOND":
        return (
          <div className="relative w-full max-w-[260px] h-60 flex flex-col items-center justify-between">
             <div className="w-24 h-24 rounded-full bg-brand-blue flex items-center justify-center text-white text-4xl font-black shadow-2xl z-10 border-8 border-white animate-pop">{config.total}</div>
             <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                <line x1="50" y1="30" x2="25" y2="75" stroke="#4D96FF" strokeWidth="4" strokeDasharray="6" />
                <line x1="50" y1="30" x2="75" y2="75" stroke="#4D96FF" strokeWidth="4" strokeDasharray="6" />
             </svg>
             <div className="w-full flex justify-between px-2 mb-4">
                <div className="w-20 h-20 rounded-full bg-white border-4 border-brand-blue flex items-center justify-center text-brand-blue text-3xl font-black shadow-xl">{config.part1}</div>
                <div className="w-20 h-20 rounded-full bg-white border-4 border-dashed border-slate-200 flex items-center justify-center text-slate-200 text-5xl font-black shadow-xl animate-pulse">?</div>
             </div>
          </div>
        );

      case "MAKE_TEN_VISUAL":
        return (
          <div className="flex flex-col items-center space-y-8">
             <div className="grid grid-cols-5 gap-4 bg-slate-50 p-6 rounded-[3rem] border-8 border-white shadow-2xl">
               {Array.from({length: 10}).map((_, i) => (
                 <div key={i} className="w-14 h-14 rounded-2xl bg-white border-4 border-dashed border-slate-100 flex items-center justify-center">
                    {i < config.n1 && <div className="w-10 h-10 rounded-full bg-brand-blue shadow-inner animate-pop" />}
                    {i >= config.n1 && <div className="w-10 h-10 rounded-full bg-brand-green/10 animate-pulse" />}
                 </div>
               ))}
             </div>
             <div className="flex items-center space-x-6 text-3xl font-black bg-white px-10 py-4 rounded-full shadow-lg border-2 border-slate-50">
                <span className="text-brand-blue">{config.n1}</span>
                <span className="text-slate-200">+</span>
                <span className="text-brand-green">{config.n2}</span>
                <span className="text-slate-200">=</span>
                <span className="text-gray-200 animate-pulse">?</span>
             </div>
          </div>
        );

      case "POSITION_GRID":
        return (
          <div className="relative w-64 h-64 bg-blue-50/50 rounded-[4rem] flex items-center justify-center border-[12px] border-white shadow-2xl">
             <div className="w-32 h-32 bg-brand-yellow/10 rounded-3xl flex items-center justify-center text-8xl border-4 border-brand-yellow/20 shadow-inner">📦</div>
             <div className={`absolute text-9xl transition-all duration-1000 ease-out drop-shadow-2xl
                ${config.pos === '上' ? 'top-2' : config.pos === '下' ? 'bottom-2' : config.pos === '左' ? 'left-2' : 'right-2'}`}>
                {config.target}
             </div>
          </div>
        );

      case "SHAPE_3D_VIEW":
        const shapes3D: any = { '长方体': '📦', '正方体': '🧊', '圆柱': '🥫', '球': '⚽️' };
        return <div className="text-[14rem] animate-pop drop-shadow-[0_30px_50px_rgba(0,0,0,0.15)]">{shapes3D[config.shape] || '📦'}</div>;

      case "SHAPE_2D_VIEW":
        const shapes2D: any = { '平行四边形': '▱', '梯形': '⏢', '三角形': '▲', '长方形': '■' };
        return <div className="text-[12rem] font-black text-brand-blue animate-float drop-shadow-xl">{shapes2D[config.shape] || '◆'}</div>;

      case "COUNT_ITEMS":
        return (
          <div className="flex flex-wrap justify-center gap-6 p-8 max-w-[340px]">
            {Array.from({ length: config.count }).map((_, i) => (
              <span key={i} className="text-6xl animate-pop select-none drop-shadow-2xl" style={{animationDelay: `${i*0.05}s`}}>
                {config.items[i % config.items.length]}
              </span>
            ))}
          </div>
        );

      case "RULER_MEASURE":
        return (
          <div className="flex flex-col items-center w-full px-10">
             <div className="w-full h-16 bg-brand-yellow/20 rounded-full mb-12 relative overflow-hidden shadow-inner border-4 border-white">
                <div className="h-full bg-brand-yellow rounded-full flex items-center px-8 font-black text-brand-orange shadow-lg transition-all duration-1000" style={{width: `${(config.length/14)*100}%`}}>
                  <span className="drop-shadow-sm text-lg">✏️ 铅笔</span>
                </div>
             </div>
             <div className="w-full h-16 border-t-[8px] border-slate-600 flex justify-between px-0 relative">
                {Array.from({length: 15}).map((_, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className={`w-[5px] bg-slate-600 ${i % 5 === 0 ? 'h-10' : 'h-5'}`} />
                    <span className="text-[16px] font-black text-slate-500 mt-2">{i}</span>
                  </div>
                ))}
             </div>
          </div>
        );

      case "TRANSFORM_VIEW":
        return (
          <div className="flex flex-col items-center">
             <div className={`text-[10rem] transition-all duration-[2000ms] ${config.type === '旋转' ? 'rotate-[360deg]' : 'translate-x-20'}`}>🦊</div>
             <div className="mt-4 text-slate-400 font-black animate-pulse">图形正在运动...</div>
          </div>
        );

      default:
        return (
          <div className="flex flex-col items-center justify-center p-16 bg-slate-50/50 rounded-[4rem] border-4 border-dashed border-slate-100">
             <div className="text-9xl mb-8 animate-spin-slow text-slate-200">🌀</div>
             <div className="font-black text-slate-400 text-3xl tracking-widest animate-pulse uppercase">Math Portal Open...</div>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col items-center h-full w-full p-4 bg-[#F0F9FF] pt-safe pb-safe overflow-hidden">
      <div className="w-full max-w-lg flex justify-between items-center mb-6">
        <Button variant="neutral" size="sm" onClick={onBack} className="w-12 h-12 rounded-full p-0 shadow-lg border-white border-4 flex items-center justify-center hover:scale-110 transition-transform">
          <ArrowLeftIcon size={24} />
        </Button>
        <div className="flex items-center space-x-3 bg-white px-6 py-2.5 rounded-full shadow-lg border-4 border-white">
            <HeartIcon filled className={`text-brand-pink ${currentLives < 2 ? 'animate-pulse' : ''}`} size={24} />
            <span className={`font-black text-2xl ${currentLives < 2 ? 'text-red-500' : 'text-slate-700'}`}>{currentLives}</span>
        </div>
      </div>
      
      <div className={`w-full max-w-lg bg-white rounded-[5.5rem] p-8 shadow-2xl border-4 transition-all duration-300 flex-1 flex flex-col ${isWrong ? 'border-red-400 animate-wiggle' : 'border-white'}`}>
        <div className="text-center mb-6">
           <div className="bg-brand-blue/10 text-brand-blue text-[11px] px-6 py-2 rounded-full font-black tracking-[0.4em] uppercase mb-2 inline-block shadow-sm">
             {level.unit}
           </div>
           <div className="text-gray-400 font-bold text-sm block opacity-75">{level.title}</div>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-black text-slate-800 text-center mb-8 leading-tight min-h-[6.5rem] flex items-center justify-center px-4 drop-shadow-sm">
          {level.question}
        </h2>
        
        <div className="flex-1 flex justify-center items-center mb-10 bg-slate-50/50 rounded-[4.5rem] p-8 border-4 border-dashed border-slate-100 shadow-inner overflow-hidden relative">
           {renderVisuals()}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-2">
          {level.config.options.map((opt: any, i: number) => (
            <Button 
              key={i} 
              variant={selected === opt ? (opt.toString() === level.config.ans.toString() ? 'success' : 'danger') : 'neutral'} 
              size="lg"
              className={`text-2xl h-24 rounded-[3.5rem] shadow-xl transform transition-all active:scale-90 ${selected === opt ? 'scale-105 border-green-300 ring-4 ring-green-100' : 'border-slate-50 hover:bg-slate-50 hover:shadow-2xl hover:-translate-y-1'}`}
              onClick={() => checkAnswer(opt)}
            >
              {opt}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
