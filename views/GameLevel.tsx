
import React, { useState, useEffect } from 'react';
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

  const LIVE_COST = 100;

  // 关键修复：当 uniqueId 变化（包括复活重置后）重置所有答题状态
  useEffect(() => {
    setSelected(null);
    setIsWrong(false);
    if (currentLives <= 0) setShowGameOver(true);
  }, [level.uniqueId]);

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
        setTimeout(() => { 
          setSelected(null); 
          setIsWrong(false); 
        }, 800);
      }
    }
  };

  const resetGameStateAfterRevive = () => {
    setSelected(null);
    setIsWrong(false);
    setShowGameOver(false);
    setShowParentAuth(false);
    setInputPin('');
    onRefresh(); // 同时也刷新题目，防止卡在错题逻辑
  };

  const handleBuyLives = () => {
    if (coins >= LIVE_COST) {
      onUpdateCoins(-LIVE_COST);
      onSetLives(5);
      resetGameStateAfterRevive();
      audio.playWin();
    } else {
      setErrorShake(true);
      setTimeout(() => setErrorShake(false), 500);
    }
  };

  const handleParentRevive = (digit: string) => {
    if (inputPin.length < 4) {
      const newPin = inputPin + digit;
      setInputPin(newPin);
      audio.playClick();
      if (newPin.length === 4) {
        if (newPin === parentPin) {
          audio.playWin();
          onSetLives(5);
          resetGameStateAfterRevive();
        } else {
          audio.playWrong();
          setErrorShake(true);
          setTimeout(() => {
            setErrorShake(false);
            setInputPin('');
          }, 500);
        }
      }
    }
  };

  const renderVisuals = () => {
    if (isRefreshing) return (
      <div className="flex flex-col items-center animate-pop">
        <div className="text-6xl mb-4 animate-spin-slow">🪄</div>
        <p className="text-brand-blue font-black text-xs animate-pulse tracking-widest">魔法加载中...</p>
      </div>
    );
    // ... 保持原有的 renderVisuals 逻辑不变 ...
    return <div className="text-center px-4 animate-pop flex flex-col items-center">
      <span className="text-7xl block mb-6 select-none">🎯</span>
      <div className="bg-slate-100/80 px-4 py-2 rounded-2xl border border-slate-200">
        <p className="font-black text-brand-blue text-sm uppercase tracking-widest">{level.unit} 专题</p>
      </div>
    </div>;
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#F8FAFC] pt-safe pb-safe overflow-hidden px-4">
      <div className="w-full flex justify-between items-center mb-2 pt-2">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-slate-400 border border-slate-100 shadow-sm active:scale-90 transition-all">
          <ArrowLeftIcon size={18} />
        </button>
        <div className="flex items-center space-x-2">
            <button onClick={handleRefresh} disabled={isRefreshing} className="bg-white text-brand-blue border border-brand-blue/30 px-3 py-1.5 rounded-full shadow-sm flex items-center active:scale-95">
                <span className={`mr-1 text-sm ${isRefreshing ? 'animate-spin' : ''}`}>♻️</span>
                <span className="font-black text-[10px]">换一题</span>
            </button>
            <div className="flex items-center bg-white px-3 py-1.5 rounded-full shadow-sm border border-slate-50">
              <HeartIcon filled className="text-brand-pink mr-1.5" size={16} />
              <span className="font-black text-lg text-slate-700">{currentLives}</span>
            </div>
        </div>
      </div>
      
      <div className={`w-full max-w-sm mx-auto bg-white rounded-[2rem] p-5 shadow-[0_15px_40px_rgba(0,0,0,0.04)] border-2 transition-all flex-1 flex flex-col relative overflow-hidden mb-4 ${isWrong ? 'border-brand-pink animate-wiggle' : 'border-white'}`}>
        <div className="text-center mb-2">
          <div className="bg-slate-50 text-slate-300 text-[6px] px-2 py-0.5 rounded-full font-black tracking-widest inline-block border border-slate-100 uppercase">
            {level.unit} · 第 {level.id} 关
          </div>
        </div>
        <h2 className="text-lg font-black text-slate-800 text-center mb-3 leading-tight min-h-[2.5rem] flex items-center justify-center px-4">{level.question}</h2>
        <div className="flex-1 flex justify-center items-center bg-slate-50/50 rounded-[1.5rem] border border-dashed border-slate-100 overflow-hidden p-4 mb-4">
          {renderVisuals()}
        </div>
        <div className="grid grid-cols-1 gap-2">
          {level.config.options.map((opt: any, i: number) => (
            <button 
              key={`${level.id}-${i}`}
              disabled={isRefreshing}
              className={`h-12 rounded-xl font-black text-lg border-2 transition-all flex items-center justify-center shadow-sm active:translate-y-0.5
                ${selected === String(opt).trim() 
                  ? (String(opt).trim() === String(level.config.ans).trim() ? 'bg-brand-green text-white border-brand-green' : 'bg-brand-pink text-white border-brand-pink') 
                  : 'bg-white text-slate-700 border-slate-50 active:bg-slate-50'}
              `} 
              onClick={() => checkAnswer(opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {showGameOver && (
          <div className="fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-xl flex items-center justify-center p-8 animate-pop">
              {!showParentAuth ? (
                <div className={`bg-white rounded-[2.5rem] p-8 text-center shadow-2xl border-4 border-white max-w-xs w-full ${errorShake ? 'animate-wiggle' : ''}`}>
                    <div className="text-6xl mb-4 animate-bounce">🙀</div>
                    <h2 className="text-xl font-black text-slate-800 mb-6">哎呀，能量耗尽了</h2>
                    <div className="flex flex-col space-y-3">
                      <Button variant="success" size="md" fullWidth onClick={handleBuyLives} className="rounded-xl h-14 text-sm"><CoinIcon size={16} className="mr-2" /> 花费 {LIVE_COST} 金币复活</Button>
                      <Button variant="secondary" size="md" fullWidth onClick={() => { setShowParentAuth(true); setInputPin(''); }} className="rounded-xl h-14 text-sm">👨‍👩‍👧‍👦 向家长申请复活</Button>
                      <Button variant="neutral" size="md" fullWidth onClick={onBack} className="rounded-xl h-12 text-xs border-none text-slate-400">回到地图</Button>
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
                      {[1,2,3,4,5,6,7,8,9].map(n => <button key={n} onClick={() => handleParentRevive(n.toString())} className="h-12 rounded-xl bg-slate-50 font-black text-lg active:bg-slate-100 active:translate-y-1">{n}</button>)}
                      <button onClick={() => setShowParentAuth(false)} className="h-12 text-slate-300 font-black text-xs">取消</button>
                      <button onClick={() => handleParentRevive('0')} className="h-12 rounded-xl bg-slate-50 font-black text-lg">0</button>
                      <button onClick={() => setInputPin('')} className="h-12 text-slate-300 font-black text-xs">重置</button>
                    </div>
                </div>
              )}
          </div>
      )}
    </div>
  );
};
