
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '../components/Button';
import { ArrowLeftIcon, HeartIcon, CoinIcon } from '../components/Icons';
import { LevelData } from '../types';
import { audio } from '../utils/audio';

export const GameLevel: React.FC<{
  level: LevelData;
  onBack: () => void;
  onRefresh: () => void;
  onComplete: (id: number, stars: number) => void;
  currentLives: number;
  onLoseLife: () => void;
  onSetLives: (lives: number) => void;
  onUpdateCoins: (amount: number) => void;
  coins: number;
  parentPin: string;
}> = ({ level, onBack, onRefresh, onComplete, currentLives, onLoseLife, onSetLives, onUpdateCoins, coins, parentPin }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [isWrong, setIsWrong] = useState(false);
  const [showGameOver, setShowGameOver] = useState(false);
  const [showParentAuth, setShowParentAuth] = useState(false);
  const [inputPin, setInputPin] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [errorShake, setErrorShake] = useState(false);

  useEffect(() => {
    setSelected(null);
    setIsWrong(false);
    if (currentLives <= 0) setShowGameOver(true);
  }, [level.uniqueId, currentLives]);

  const handleRefresh = useCallback(() => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    audio.playClick();
    onRefresh();
    setTimeout(() => setIsRefreshing(false), 600);
  }, [isRefreshing, onRefresh]);

  const checkAnswer = useCallback((val: any) => {
    if (selected !== null || showGameOver || isRefreshing) return;
    try {
      const submitted = String(val).trim();
      const isCorrect = submitted === String(level.config.ans).trim();
      setSelected(submitted);

      if (isCorrect) {
        audio.playCorrect();
        onUpdateCoins(10);
        setTimeout(() => onComplete(level.id, 3), 800);
      } else {
        audio.playWrong();
        setIsWrong(true);
        onLoseLife();
        onUpdateCoins(-5);
        if (currentLives <= 1) {
          setTimeout(() => setShowGameOver(true), 500);
        } else {
          setTimeout(() => { setSelected(null); setIsWrong(false); }, 1000);
        }
      }
    } catch (error) {
      console.error('Error checking answer:', error);
      // 静默处理错误，避免影响用户体验
    }
  }, [selected, showGameOver, isRefreshing, level.config.ans, level.id, currentLives, onUpdateCoins, onLoseLife, onComplete]);

  const renderVisuals = useCallback(() => {
    if (isRefreshing) return (
      <div className="flex flex-col items-center animate-pop">
        <div className="text-6xl mb-4 animate-bounce">✨</div>
        <p className="text-brand-blue font-black text-sm animate-pulse">魔法重组中...</p>
      </div>
    );

    try {
      const { visualType, count, items, n1, n2, op, hour, isHalf, r, c, emoji, num, den } = level.config;

      switch (visualType) {
        case "COUNT_ITEMS":
          return (
            <div className="flex flex-wrap justify-center gap-3 bg-white/50 p-4 rounded-[2rem] max-w-full">
              {Array.from({ length: count || 0 }).map((_, i) => (
                <span key={i} className="text-3xl sm:text-4xl animate-pop" style={{ animationDelay: `${i * 0.05}s` }}>{items?.[0] || '🍎'}</span>
              ))}
            </div>
          );
        case "MULT_ARRAY":
          return (
            <div className="flex flex-col items-center gap-1 bg-white/30 p-4 rounded-3xl">
              {Array.from({ length: r || 2 }).map((_, row) => (
                <div key={row} className="flex gap-1">
                  {Array.from({ length: c || 2 }).map((_, col) => (
                    <span key={col} className="text-2xl drop-shadow-sm animate-pop" style={{ animationDelay: `${(row * c + col) * 0.02}s` }}>{emoji || '⭐'}</span>
                  ))}
                </div>
              ))}
            </div>
          );
        case "FRACTION_PIE":
          return (
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full border-4 border-slate-100 shadow-xl overflow-hidden bg-white">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                {Array.from({ length: Math.max(den || 1, 1) }).map((_, i) => {
                  const angle = (360 / (den || 1));
                  const startAngle = i * angle;
                  const endAngle = (i + 1) * angle;
                  const x1 = 50 + 50 * Math.cos((Math.PI * startAngle) / 180);
                  const y1 = 50 + 50 * Math.sin((Math.PI * startAngle) / 180);
                  const x2 = 50 + 50 * Math.cos((Math.PI * endAngle) / 180);
                  const y2 = 50 + 50 * Math.sin((Math.PI * endAngle) / 180);
                  const path = `M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`;
                  return (
                    <path 
                      key={i} 
                      d={path} 
                      fill={i < (num || 0) ? '#4D96FF' : '#F1F5F9'} 
                      stroke="#fff" 
                      strokeWidth="1"
                    />
                  );
                })}
              </svg>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <div className="bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-black text-slate-500 shadow-sm">{num || 1}/{den || 1}</div>
              </div>
            </div>
          );
        case "CLOCK_VISUAL":
          const hrPos = (hour || 12) % 12;
          const hrDeg = (hrPos * 30) + (isHalf ? 15 : 0);
          const minDeg = isHalf ? 180 : 0;
          return (
            <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full border-[8px] sm:border-[10px] border-slate-800 bg-white shadow-2xl flex items-center justify-center scale-95 sm:scale-100">
               <div className="absolute inset-0 rounded-full border-[6px] border-slate-50/50 z-10"></div>
               <div className="absolute bottom-1/2 left-1/2 w-2.5 sm:w-3 h-12 sm:h-14 bg-slate-800 rounded-full origin-bottom z-20" style={{ transform: `translateX(-50%) rotate(${hrDeg}deg)` }}></div>
               <div className="absolute bottom-1/2 left-1/2 w-1.5 sm:w-2 h-18 sm:h-20 bg-brand-blue rounded-full origin-bottom z-20" style={{ transform: `translateX(-50%) rotate(${minDeg}deg)` }}></div>
               <div className="w-4 h-4 sm:w-5 sm:h-5 bg-slate-800 rounded-full z-30 border-2 sm:border-4 border-white"></div>
               {[12, 3, 6, 9].map((n, i) => (
                  <div key={n} className="absolute inset-3 sm:inset-4 text-center" style={{ transform: `rotate(${i * 90}deg)` }}>
                      <span className="inline-block font-black text-slate-300 text-sm sm:text-lg" style={{ transform: `rotate(-${i * 90}deg)` }}>{n}</span>
                  </div>
               ))}
            </div>
          );
        case "ARITHMETIC_CARD":
          const maxLen = Math.max(String(n1 || '0').length, String(n2 || '0').length);
          const fontSize = maxLen > 2 ? 'text-2xl sm:text-4xl' : 'text-4xl sm:text-5xl';
          const cardSize = maxLen > 2 ? 'w-20 h-24 sm:w-24 sm:h-32' : 'w-20 h-28 sm:w-24 sm:h-32';
          
          return (
            <div className="flex items-center justify-center space-x-2 sm:space-x-4 animate-pop w-full max-w-full px-2">
               <div className={`${cardSize} bg-white rounded-2xl sm:rounded-3xl shadow-lg border-t-4 sm:border-t-8 border-brand-blue flex items-center justify-center ${fontSize} font-black text-slate-800 transition-all`}>{n1 || '0'}</div>
               <div className="text-xl sm:text-3xl font-black text-slate-300">{op || "+"}</div>
               <div className={`${cardSize} bg-white rounded-2xl sm:rounded-3xl shadow-lg border-t-4 sm:border-t-8 border-brand-green flex items-center justify-center ${fontSize} font-black text-slate-800 transition-all`}>{n2 || '0'}</div>
               <div className="text-xl sm:text-3xl font-black text-slate-300">=</div>
               <div className={`${cardSize} bg-slate-50 rounded-2xl sm:rounded-3xl shadow-inner border-2 sm:border-4 border-dashed border-slate-200 flex items-center justify-center ${fontSize} font-black text-slate-200 transition-all`}>?</div>
            </div>
          );
        default:
          return (
            <div className="flex flex-col items-center">
               <div className="w-48 h-36 sm:w-64 sm:h-48 bg-white/80 rounded-[2rem] sm:rounded-[3rem] shadow-xl border-4 border-slate-100 flex items-center justify-center">
                  <span className="text-6xl sm:text-8xl animate-bounce">🤔</span>
               </div>
               <p className="mt-4 text-slate-400 font-black text-[10px] tracking-widest">请思考这道难题...</p>
            </div>
          );
      }
    } catch (error) {
      console.error('Error rendering visuals:', error);
      return (
        <div className="flex flex-col items-center justify-center h-full">
          <span className="text-6xl mb-4">😯</span>
          <p className="text-slate-500 font-black">加载题目遇到问题</p>
        </div>
      );
    }
  }, [isRefreshing, level.config]);

  const resetRevive = useCallback(() => {
    setShowGameOver(false);
    setShowParentAuth(false);
    setInputPin('');
    onSetLives(5);
    onRefresh();
  }, [onSetLives, onRefresh]);

  const handleReviveInput = useCallback((digit: string) => {
    if (inputPin.length < 4) {
      try {
        const p = inputPin + digit;
        setInputPin(p);
        if (p === parentPin) { 
          audio.playWin(); 
          resetRevive(); 
        }
        else if (p.length === 4) { 
          audio.playWrong(); 
          setErrorShake(true); 
          setTimeout(() => { setErrorShake(false); setInputPin(''); }, 500); 
        }
      } catch (error) {
        console.error('Error handling revive input:', error);
      }
    }
  }, [inputPin, parentPin, resetRevive]);

  return (
    <div className="flex flex-col h-full w-full bg-[#F8FAFC] pt-safe pb-safe overflow-hidden px-3 sm:px-4">
      <div className="w-full flex justify-between items-center mb-3 sm:mb-4 pt-2 sm:pt-4">
        <button 
          onClick={onBack} 
          className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl sm:rounded-2xl bg-white text-slate-400 border-2 border-slate-50 shadow-sm active:scale-90 transition-transform"
          aria-label="返回"
        >
          <ArrowLeftIcon size={20} />
        </button>
        <div className="flex items-center space-x-2 sm:space-x-3">
            <button 
              onClick={handleRefresh} 
              className="bg-white text-brand-blue border-2 border-brand-blue/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl shadow-sm flex items-center active:translate-y-1 transition-all"
              disabled={isRefreshing}
            >
              <span className="text-sm sm:text-lg mr-1.5 sm:mr-2">♻️</span>
              <span className="font-black text-xs sm:text-sm">换一题</span>
            </button>
            <div className="flex items-center bg-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl shadow-sm border-2 border-slate-50">
              <HeartIcon filled className="text-brand-pink mr-1 sm:mr-2" size={16} sm:size={20} />
              <span className="font-black text-lg sm:text-xl text-slate-700">{currentLives}</span>
            </div>
        </div>
      </div>
      
      <div className={`w-full max-w-sm mx-auto bg-white rounded-[2.5rem] sm:rounded-[4rem] p-4 sm:p-6 shadow-2xl border-4 flex-1 flex flex-col relative overflow-hidden mb-4 sm:mb-6 transition-colors duration-300 ${isWrong ? 'border-brand-pink animate-wiggle' : 'border-white'}`}>
        <div className="text-center mb-3 sm:mb-4">
          <div className="bg-slate-100 text-slate-500 text-[8px] sm:text-[10px] px-4 sm:px-6 py-1.5 sm:py-2 rounded-full font-black tracking-widest inline-block border-2 border-white shadow-sm uppercase">
            {level.unit}
          </div>
        </div>
        <h2 className="text-lg sm:text-2xl font-black text-slate-800 text-center mb-4 sm:mb-6 leading-tight px-2">{level.question}</h2>
        <div className="flex-1 flex justify-center items-center bg-slate-50/40 rounded-[2rem] sm:rounded-[3.5rem] border-4 border-dashed border-slate-100/60 overflow-hidden p-2 sm:p-4 mb-4 sm:mb-6 min-h-[220px] sm:min-h-[300px] relative">
          {renderVisuals()}
        </div>
        <div className="grid grid-cols-1 gap-3 sm:gap-4">
          {level.config?.options?.length > 0 ? level.config.options.map((opt: any, i: number) => (
            <button 
              key={i} 
              disabled={selected !== null}
              className={`h-14 sm:h-16 rounded-[1.8rem] sm:rounded-[2.2rem] font-black text-xl sm:text-2xl border-b-[6px] sm:border-b-[10px] transition-all shadow-lg active:border-b-0 active:translate-y-2 ${selected === String(opt) ? (String(opt) === String(level.config.ans) ? 'bg-brand-green text-white border-green-600' : 'bg-brand-pink text-white border-red-600') : 'bg-white text-slate-700 border-slate-200 active:bg-slate-50'}`} 
              onClick={() => checkAnswer(opt)}
              aria-pressed={selected === String(opt)}
            >
              {opt}
            </button>
          )) : (
            <div className="text-center py-6 text-slate-500 font-black">
              题目选项加载中...
            </div>
          )}
        </div>
      </div>

      {showGameOver && (
          <div className="fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-xl flex items-center justify-center p-6 sm:p-8 animate-pop">
              {!showParentAuth ? (
                <div className="bg-white rounded-[2.5rem] sm:rounded-[3.5rem] p-8 sm:p-10 text-center shadow-2xl border-4 border-white max-w-xs w-full">
                    <div className="text-5xl sm:text-7xl mb-4 sm:mb-6 animate-bounce">😿</div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-800 mb-6 sm:mb-8">体力耗尽啦！</h2>
                    <div className="space-y-3 sm:space-y-4">
                      <Button 
                        variant="success" 
                        fullWidth 
                        onClick={() => {
                          try {
                            if(coins >= 100) { 
                              onUpdateCoins(-100); 
                              resetRevive(); 
                            } else { 
                              setErrorShake(true); 
                              setTimeout(() => setErrorShake(false), 500); 
                            }
                          } catch (error) {
                            console.error('Error handling revive:', error);
                          }
                        }} 
                        className="rounded-2xl h-14 sm:h-16 text-base sm:text-lg"
                      >
                        <CoinIcon size={20} className="mr-2" /> 100 复活
                      </Button>
                      <Button 
                        variant="secondary" 
                        fullWidth 
                        onClick={() => setShowParentAuth(true)} 
                        className="rounded-2xl h-14 sm:h-16 text-base sm:text-lg"
                      >
                        家长辅导复活
                      </Button>
                      <Button 
                        variant="neutral" 
                        fullWidth 
                        onClick={onBack} 
                        className="rounded-2xl h-10 sm:h-12 text-xs border-none text-slate-400 font-black uppercase tracking-widest"
                      >
                        返回地图
                      </Button>
                    </div>
                </div>
              ) : (
                <div className={`bg-white rounded-[3rem] sm:rounded-[4rem] p-8 sm:p-12 text-center shadow-2xl border-4 border-brand-purple max-w-xs w-full ${errorShake ? 'animate-wiggle' : ''}`}>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-800 mb-4 tracking-tighter">家长安全验证</h3>
                    <p className="text-[8px] sm:text-[10px] text-slate-400 font-black mb-6 sm:mb-8 uppercase tracking-widest">请输入 PIN 码解锁</p>
                    <div className="flex justify-center space-x-3 sm:space-x-4 mb-8 sm:mb-10">
                      {[0, 1, 2, 3].map(i => <div key={i} className={`w-4 h-4 sm:w-6 sm:h-6 rounded-full border-2 sm:border-4 border-slate-100 ${i < inputPin.length ? 'bg-brand-purple border-brand-purple' : 'bg-transparent'}`}></div>)}
                    </div>
                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                      {[1,2,3,4,5,6,7,8,9].map(n => (
                        <button 
                          key={n} 
                          onClick={() => handleReviveInput(n.toString())} 
                          className="h-12 sm:h-16 rounded-xl sm:rounded-2xl bg-slate-50 font-black text-lg sm:text-xl border-b-4 border-slate-200 active:border-b-0 active:translate-y-1 transition-all"
                        >
                          {n}
                        </button>
                      ))}
                      <button 
                        onClick={() => setShowParentAuth(false)} 
                        className="text-slate-300 font-black text-[10px] sm:text-sm uppercase"
                      >
                        取消
                      </button>
                      <button 
                        onClick={() => handleReviveInput('0')} 
                        className="h-12 sm:h-16 rounded-xl sm:rounded-2xl bg-slate-50 font-black text-lg sm:text-xl border-b-4 border-slate-200 active:border-b-0 active:translate-y-1 transition-all"
                      >
                        0
                      </button>
                    </div>
                </div>
              )}
          </div>
      )}
    </div>
  );
};
