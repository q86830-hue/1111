import React, { useState, useEffect } from 'react';
import { Button } from '../components/Button';
import { ArrowLeftIcon, HeartIcon, CoinIcon, Shapes } from '../components/Icons';
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

  const LIVE_COST = 100;

  useEffect(() => {
    setSelected(null);
    setIsWrong(false);
    if (currentLives <= 0) setShowGameOver(true);
  }, [level.uniqueId, currentLives]);

  const handleRefresh = () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    audio.playClick();
    onRefresh();
    setTimeout(() => setIsRefreshing(false), 800);
  };

  const checkAnswer = (val: any) => {
    if (selected !== null || showGameOver || isRefreshing) return;
    const submitted = String(val).trim();
    const correct = String(level.config.ans).trim();
    const isCorrect = submitted === correct;
    setSelected(submitted);
    if (isCorrect) {
      audio.playCorrect();
      onUpdateCoins(10);
      setTimeout(() => onComplete(level.id, 3), 600);
    } else {
      audio.playWrong();
      setIsWrong(true);
      onLoseLife();
      onUpdateCoins(-5);
      if (currentLives <= 1) {
        setTimeout(() => setShowGameOver(true), 500);
      } else {
        setTimeout(() => { setSelected(null); setIsWrong(false); }, 800);
      }
    }
  };

  const renderVisuals = () => {
    if (isRefreshing) return (
      <div className="flex flex-col items-center animate-pop">
        <div className="text-6xl mb-4 animate-spin-slow">🪄</div>
        <p className="text-brand-blue font-black text-xs animate-pulse">正在准备题目...</p>
      </div>
    );

    const { visualType, count, items, total, p1, shape, pos, n1, n2 } = level.config;

    switch (visualType) {
      case "COUNT_ITEMS":
        return (
          <div className="grid grid-cols-5 gap-3">
            {Array.from({ length: count }).map((_, i) => (
              <span key={i} className="text-4xl animate-pop" style={{ animationDelay: `${i * 0.05}s` }}>
                {items[0]}
              </span>
            ))}
          </div>
        );
      case "DECOMP_VISUAL":
        return (
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-brand-yellow flex items-center justify-center text-2xl font-black shadow-lg border-4 border-white">{total}</div>
            <div className="flex space-x-12 relative">
                <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-20 h-0.5 bg-gray-200 -rotate-45 origin-right"></div>
                <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-20 h-0.5 bg-gray-200 rotate-45 origin-left"></div>
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-xl font-black border-2 border-white">{p1}</div>
                <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center text-xl font-black border-2 border-dashed border-pink-300">?</div>
            </div>
          </div>
        );
      case "GEOMETRY_VISUAL":
        return (
          <div className="flex space-x-6">
            {shape === '长方体' && <Shapes.Rectangle size={80} color="bg-brand-blue" />}
            {shape === '正方体' && <Shapes.Square size={80} color="bg-brand-orange" />}
            {shape === '圆柱' && <div className="w-16 h-20 bg-brand-green rounded-[2rem] border-4 border-white shadow-md"></div>}
            {shape === '球' && <Shapes.Circle size={80} color="bg-brand-pink" />}
          </div>
        );
      case "POSITION_VISUAL":
        return (
          <div className="flex items-center space-x-4 bg-white p-4 rounded-2xl shadow-inner border border-gray-100">
             <div className="flex flex-col items-center">
               <span className="text-4xl">🐶</span>
               <span className="text-[10px] font-bold text-gray-400">小狗</span>
             </div>
             <div className="w-8 h-0.5 bg-gray-100"></div>
             <div className="flex flex-col items-center">
               <span className="text-4xl">🐱</span>
               <span className="text-[10px] font-bold text-gray-400">小猫</span>
             </div>
             <div className="w-8 h-0.5 bg-gray-100"></div>
             <div className="flex flex-col items-center">
               <span className="text-4xl">🐰</span>
               <span className="text-[10px] font-bold text-gray-400">小兔</span>
             </div>
          </div>
        );
      case "MAKE_TEN_MINI":
        return (
          <div className="flex flex-col items-center">
             <div className="grid grid-cols-5 gap-1 bg-gray-100 p-2 rounded-lg border border-gray-200 mb-4">
                {Array.from({length: 10}).map((_, i) => (
                  <div key={i} className="w-6 h-6 bg-white rounded flex items-center justify-center border border-dashed border-gray-300">
                    {i < 9 && <div className="w-4 h-4 rounded-full bg-brand-blue"></div>}
                  </div>
                ))}
             </div>
             <div className="text-xl font-black text-gray-400">+</div>
             <div className="flex space-x-1 mt-2">
                {Array.from({length: n2}).map((_, i) => <div key={i} className="w-4 h-4 rounded-full bg-brand-green"></div>)}
             </div>
          </div>
        );
      default:
        return <span className="text-7xl">🎯</span>;
    }
  };

  const resetRevive = () => { setShowGameOver(false); setShowParentAuth(false); setInputPin(''); onSetLives(5); onRefresh(); };

  const handleReviveInput = (digit: string) => {
    if (inputPin.length < 4) {
      const p = inputPin + digit;
      setInputPin(p);
      if (p === parentPin) { audio.playWin(); resetRevive(); }
      else if (p.length === 4) { audio.playWrong(); setErrorShake(true); setTimeout(() => { setErrorShake(false); setInputPin(''); }, 500); }
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#F8FAFC] pt-safe pb-safe overflow-hidden px-4">
      <div className="w-full flex justify-between items-center mb-2 pt-2">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-slate-400 border border-slate-100 shadow-sm active:scale-90"><ArrowLeftIcon size={18} /></button>
        <div className="flex items-center space-x-2">
            <button onClick={handleRefresh} className="bg-white text-brand-blue border border-brand-blue/30 px-3 py-1.5 rounded-full shadow-sm flex items-center"><span className="text-sm">♻️</span><span className="font-black text-[10px]">换一题</span></button>
            <div className="flex items-center bg-white px-3 py-1.5 rounded-full shadow-sm border border-slate-50">
              <HeartIcon filled className="text-brand-pink mr-1.5" size={16} />
              <span className="font-black text-lg text-slate-700">{currentLives}</span>
            </div>
        </div>
      </div>
      
      <div className={`w-full max-w-sm mx-auto bg-white rounded-[2rem] p-5 shadow-xl border-2 flex-1 flex flex-col relative overflow-hidden mb-4 ${isWrong ? 'border-brand-pink animate-wiggle' : 'border-white'}`}>
        <div className="text-center mb-2">
          <div className="bg-slate-50 text-slate-400 text-[8px] px-3 py-1 rounded-full font-black tracking-widest inline-block border border-slate-100 uppercase">
            {level.unit}
          </div>
        </div>
        <h2 className="text-xl font-black text-slate-800 text-center mb-6 leading-tight flex items-center justify-center px-4">{level.question}</h2>
        <div className="flex-1 flex justify-center items-center bg-slate-50/50 rounded-[1.5rem] border border-dashed border-slate-200 overflow-hidden p-6 mb-6">
          {renderVisuals()}
        </div>
        <div className="grid grid-cols-1 gap-3">
          {level.config.options.map((opt: any, i: number) => (
            <button key={i} className={`h-14 rounded-2xl font-black text-xl border-2 transition-all shadow-sm active:translate-y-1 ${selected === String(opt) ? (String(opt) === String(level.config.ans) ? 'bg-brand-green text-white border-brand-green' : 'bg-brand-pink text-white border-brand-pink') : 'bg-white text-slate-700 border-slate-100 active:bg-slate-50'}`} onClick={() => checkAnswer(opt)}>{opt}</button>
          ))}
        </div>
      </div>

      {showGameOver && (
          <div className="fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-xl flex items-center justify-center p-8 animate-pop">
              {!showParentAuth ? (
                <div className="bg-white rounded-[2.5rem] p-8 text-center shadow-2xl border-4 border-white max-w-xs w-full">
                    <div className="text-6xl mb-4 animate-bounce">🙀</div>
                    <h2 className="text-xl font-black text-slate-800 mb-6">哎呀，能量耗尽了</h2>
                    <div className="space-y-3">
                      <Button variant="success" fullWidth onClick={() => { if(coins >= LIVE_COST) { onUpdateCoins(-LIVE_COST); resetRevive(); } else { setErrorShake(true); setTimeout(() => setErrorShake(false), 500); } }} className="rounded-xl h-14 text-sm"><CoinIcon size={16} className="mr-2" /> {LIVE_COST} 金币复活</Button>
                      <Button variant="secondary" fullWidth onClick={() => setShowParentAuth(true)} className="rounded-xl h-14 text-sm">向家长申请复活</Button>
                      <Button variant="neutral" fullWidth onClick={onBack} className="rounded-xl h-12 text-xs border-none text-slate-400">回到地图</Button>
                    </div>
                </div>
              ) : (
                <div className={`bg-white rounded-[2.5rem] p-8 text-center shadow-2xl border-4 border-brand-purple max-w-xs w-full ${errorShake ? 'animate-wiggle' : ''}`}>
                    <h3 className="text-xl font-black text-slate-800 mb-2">家长验证</h3>
                    <p className="text-[10px] font-bold text-slate-400 mb-6">请输入 4 位 PIN 码复活</p>
                    <div className="flex justify-center space-x-3 mb-8">
                      {[0, 1, 2, 3].map(i => <div key={i} className={`w-4 h-4 rounded-full border-2 border-slate-200 ${i < inputPin.length ? 'bg-brand-purple' : 'bg-transparent'}`}></div>)}
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {[1,2,3,4,5,6,7,8,9].map(n => <button key={n} onClick={() => handleReviveInput(n.toString())} className="h-12 rounded-xl bg-slate-50 font-black text-lg active:bg-slate-100">{n}</button>)}
                      <button onClick={() => setShowParentAuth(false)} className="text-slate-300 font-black text-xs">取消</button>
                      <button onClick={() => handleReviveInput('0')} className="h-12 rounded-xl bg-slate-50 font-black text-lg">0</button>
                    </div>
                </div>
              )}
          </div>
      )}
    </div>
  );
};