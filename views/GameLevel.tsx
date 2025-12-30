
import React, { useState, useEffect } from 'react';
import { Button } from '../components/Button';
import { AppleIcon, StarIcon, ArrowLeftIcon, HeartIcon, CoinIcon, MagnifierIcon, Shapes } from '../components/Icons';
import { LevelData, GameType } from '../types';
import { audio } from '../utils/audio';

export const GameLevel: React.FC<{
  level: LevelData;
  onBack: () => void;
  onComplete: (id: number, stars: number) => void;
  currentLives: number;
  onLoseLife: () => void;
  onRevive: () => void;
  onUpdateCoins: (amount: number) => void;
  punishments: any[];
  parentPin: string;
}> = ({ 
  level, 
  onBack, 
  onComplete, 
  currentLives, 
  onLoseLife, 
  onUpdateCoins,
}) => {
  const [selected, setSelected] = useState<number | string | null>(null);
  const [options, setOptions] = useState<(number | string)[]>([]);
  const [isWrong, setIsWrong] = useState(false);
  const [showGameOver, setShowGameOver] = useState(false);
  const [penaltyNotify, setPenaltyNotify] = useState<number | null>(null);

  const calculateAnswer = (lvl: LevelData): number | string => {
    const c = lvl.config;
    if (c.ans !== undefined) return c.ans;
    
    switch(lvl.type) {
      case GameType.COUNTING: return c.count || 0;
      case GameType.ADDITION: return (c.left || 0) + (c.right || 0);
      case GameType.SUBTRACTION: return (c.left || 0) - (c.right || 0);
      case GameType.MULTIPLICATION: return (c.left || 0) * (c.right || 0);
      case GameType.DIVISION: return Math.floor((c.left || 0) / (c.right || 1));
      case GameType.FRACTION: return c.val !== undefined ? c.val : `${c.top}/${c.bottom}`;
      default: return 0;
    }
  };

  useEffect(() => {
    if (currentLives <= 0) setShowGameOver(true);
  }, [currentLives]);

  useEffect(() => {
    const correctAnswer = calculateAnswer(level);
    let opts: (number | string)[] = [];

    if (typeof correctAnswer === 'number' || (!isNaN(Number(correctAnswer)) && typeof correctAnswer === 'string' && !correctAnswer.includes('/'))) {
      const numericAns = Number(correctAnswer);
      const set = new Set<string>();
      set.add(numericAns.toString());
      
      let attempts = 0;
      while(set.size < 3 && attempts < 50) {
          const offset = (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 3) + 1);
          const candidate = numericAns + offset;
          if (candidate >= 0 && candidate !== numericAns) set.add(candidate.toString());
          attempts++;
      }
      opts = Array.from(set).map(v => (v.includes('.') ? parseFloat(v) : parseInt(v))).sort(() => Math.random() - 0.5);
    } else {
      const pool = ["左边多", "右边多", "一样多", "1/2", "1/4", "3/4", "直角", "钝角", "平行", "垂直"];
      const filtered = pool.filter(p => p !== (correctAnswer?.toString() || ""));
      opts = [correctAnswer, ...filtered.sort(() => Math.random() - 0.5).slice(0, 2)];
      opts = opts.sort(() => Math.random() - 0.5);
    }
    
    setOptions(opts);
    setSelected(null);
    setIsWrong(false);
  }, [level.uniqueId]);

  const checkAnswer = (val: any) => {
    if (selected !== null || currentLives <= 0) return;
    const correctAnswer = calculateAnswer(level);
    const isCorrect = val?.toString() === correctAnswer?.toString();
    setSelected(val);

    if (isCorrect) {
      audio.playCorrect();
      setTimeout(() => onComplete(level.id, 3), 800);
    } else {
      audio.playWrong();
      setIsWrong(true);
      onLoseLife();
      onUpdateCoins(-5);
      setPenaltyNotify(5);
      if (navigator.vibrate) try { navigator.vibrate(80); } catch(e) {}
      setTimeout(() => {
          setSelected(null);
          setIsWrong(false);
          setPenaltyNotify(null);
      }, 1000);
    }
  };

  const renderVisuals = () => {
    const { visual, count, left, right, top, bottom, val, shape } = level.config;
    
    if (visual === 'cube_stack') {
      return (
        <div className="grid grid-cols-3 gap-2 md:gap-4 rotate-6 scale-90 md:scale-110">
          {Array.from({ length: count || 0 }).map((_, i) => (
            <div key={i} className="w-12 h-12 md:w-16 md:h-16 bg-brand-blue rounded-xl border-b-4 border-blue-700 shadow-md flex items-center justify-center">
               <div className="w-5 h-5 bg-white/20 rounded-sm"></div>
            </div>
          ))}
        </div>
      );
    }

    if (level.type === GameType.COUNTING) {
      const Icon = visual === 'apple' ? AppleIcon : StarIcon;
      const adaptiveSize = count > 15 ? 32 : count > 8 ? 48 : 60;
      return (
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-full overflow-y-auto p-4 bg-white/30 rounded-[2rem]">
            {Array.from({ length: count || 0 }).map((_, i) => <Icon key={i} size={adaptiveSize} />)}
        </div>
      );
    }

    if (level.type === GameType.SHAPES) {
        const ShapeComp = shape === 'circle' ? Shapes.Circle : shape === 'square' ? Shapes.Square : shape === 'triangle' ? Shapes.Triangle : Shapes.Rectangle;
        return <ShapeComp size={140} color="bg-brand-blue" />;
    }

    if (level.type === GameType.ADDITION || level.type === GameType.SUBTRACTION || level.type === GameType.MULTIPLICATION || level.type === GameType.DIVISION) {
        const symbol = level.type === GameType.ADDITION ? '+' : level.type === GameType.SUBTRACTION ? '-' : level.type === GameType.MULTIPLICATION ? '×' : '÷';
        const fontSizeClass = (left > 99 || right > 99) ? 'text-4xl md:text-8xl' : 'text-6xl md:text-9xl';
        return (
            <div className="text-center w-full px-4">
                <div className={`${fontSizeClass} font-black text-brand-blue flex items-center justify-center space-x-3 md:space-x-8`}>
                  <span>{left}</span>
                  <span className="text-brand-orange scale-90">{symbol}</span>
                  <span>{right}</span>
                </div>
            </div>
        );
    }

    if (level.type === GameType.FRACTION) {
      return (
        <div className="flex flex-col items-center">
            <div className="w-36 h-36 md:w-56 md:h-56 rounded-full border-8 border-brand-blue relative overflow-hidden bg-white shadow-xl">
                {top && bottom && (
                   <div className="absolute bottom-0 left-0 right-0 bg-brand-blue transition-all duration-1000" style={{ height: `${(top/bottom)*100}%` }}></div>
                )}
            </div>
            <div className="mt-6 font-black text-brand-blue text-3xl">{val || (top && bottom ? `${top}/${bottom}` : '?')}</div>
        </div>
      );
    }

    return (
        <div className="bg-blue-50/50 p-10 rounded-[3rem] border-4 border-white shadow-inner">
            <MagnifierIcon size={100} className="text-brand-blue/10 animate-pulse" />
        </div>
    );
  };

  return (
    <div className="flex flex-col items-center h-full w-full p-4 bg-slate-50 relative overflow-hidden pt-safe pb-safe">
      {penaltyNotify !== null && (
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] animate-bounce pointer-events-none">
          <div className="bg-brand-pink text-white px-8 py-4 rounded-full shadow-2xl flex items-center space-x-2 border-4 border-white scale-125">
            <span className="text-2xl font-black">-{penaltyNotify}</span>
            <CoinIcon size={28} />
          </div>
        </div>
      )}

      <div className="w-full max-w-lg flex justify-between items-center mb-4">
        <Button variant="neutral" size="sm" onClick={onBack} className="w-12 h-12 rounded-full p-0 flex items-center justify-center shadow-md">
          <ArrowLeftIcon />
        </Button>
        <div className="flex items-center space-x-3 bg-white px-5 py-2 rounded-full shadow-md border-2 border-slate-100">
            <HeartIcon filled className="text-brand-pink" size={20} />
            <span className="font-black text-xl text-gray-700">{currentLives}</span>
        </div>
      </div>
      
      <div className={`w-full max-w-lg bg-white rounded-[3rem] p-6 md:p-10 shadow-2xl border-4 transition-all duration-300 flex-1 flex flex-col ${isWrong ? 'border-red-400 animate-wiggle' : 'border-white'}`}>
        <div className="text-center mb-2">
           <span className="bg-brand-blue/10 text-brand-blue text-[11px] px-5 py-1.5 rounded-full font-black uppercase tracking-widest">{level.title}</span>
        </div>
        
        <h2 className="text-xl md:text-3xl font-black text-gray-800 text-center mb-6 leading-tight min-h-[4.5rem] flex items-center justify-center select-none">
          {level.question}
        </h2>
        
        <div className="flex-1 flex flex-wrap justify-center items-center gap-4 mb-8 bg-slate-50/50 rounded-[2.5rem] p-4 border-2 border-dashed border-slate-200 shadow-inner overflow-hidden">
          {renderVisuals()}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {options.map((opt, i) => (
            <Button 
              key={i} 
              variant={selected === opt ? 'success' : 'neutral'} 
              size="lg"
              className={`text-xl md:text-2xl h-16 md:h-24 ${selected === opt ? '' : 'border-slate-100 active:bg-blue-50'} rounded-[1.5rem]`}
              onClick={() => checkAnswer(opt)}
            >
              {opt}
            </Button>
          ))}
        </div>
      </div>

      {showGameOver && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-blue/30 backdrop-blur-xl p-4 animate-pop">
          <div className="bg-white rounded-[3rem] p-10 w-full max-w-xs text-center shadow-2xl border-4 border-brand-pink">
            <div className="text-8xl mb-6">🩺</div>
            <h3 className="text-2xl font-black text-gray-800 mb-2 tracking-tighter">体力耗尽啦</h3>
            <p className="text-base text-gray-500 mb-10 font-bold leading-tight">大脑需要休息，去找家长增加体力吧！</p>
            <Button variant="danger" fullWidth size="xl" onClick={onBack} className="rounded-2xl">回主页</Button>
          </div>
        </div>
      )}
    </div>
  );
};
