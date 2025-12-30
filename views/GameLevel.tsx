
import React, { useState, useEffect } from 'react';
import { Button } from '../components/Button';
import { AppleIcon, StarIcon, GemIcon, StickIcon, ArrowLeftIcon, HeartIcon, CoinIcon, MagnifierIcon, Shapes } from '../components/Icons';
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

    // 智能生成选项
    if (typeof correctAnswer === 'number' || (!isNaN(Number(correctAnswer)) && typeof correctAnswer === 'string' && !correctAnswer.includes('/') && !correctAnswer.includes('多'))) {
      const numericAns = Number(correctAnswer);
      const step = numericAns > 100 ? 10 : 1;
      const set = new Set<string>();
      set.add(numericAns.toString());
      
      let attempts = 0;
      while(set.size < 3 && attempts < 50) {
          const offset = (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 3) + 1) * step;
          const candidate = numericAns + offset;
          if (candidate >= 0 && candidate !== numericAns) set.add(candidate.toString());
          attempts++;
      }
      opts = Array.from(set).map(v => (v.includes('.') ? parseFloat(v) : parseInt(v))).sort(() => Math.random() - 0.5);
    } else {
      // 文本类选项（如：左边多/右边多）
      const pool = ["左边多", "右边多", "一样多", "1/2", "1/4", "3/4", "直角", "钝角", "锐角"];
      const filtered = pool.filter(p => p !== correctAnswer.toString());
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
    const isCorrect = val.toString() === correctAnswer.toString();
    setSelected(val);

    if (isCorrect) {
      audio.playCorrect();
      setTimeout(() => onComplete(level.id, 3), 1000);
    } else {
      audio.playWrong();
      setIsWrong(true);
      onLoseLife();
      onUpdateCoins(-5);
      setPenaltyNotify(5);
      setTimeout(() => {
          setSelected(null);
          setIsWrong(false);
          setPenaltyNotify(null);
      }, 1000);
    }
  };

  const renderVisuals = () => {
    const { visual, count, left, right, top, bottom, val, shape } = level.config;
    
    // 观察物体专用渲染 (Cube Stack)
    if (visual === 'cube_stack') {
      return (
        <div className="grid grid-cols-3 gap-1 rotate-12 scale-110">
          {Array.from({ length: count || 0 }).map((_, i) => (
            <div key={i} className="w-12 h-12 bg-brand-blue rounded-lg border-b-4 border-blue-700 shadow-md flex items-center justify-center transform hover:-translate-y-1 transition-transform">
               <div className="w-6 h-6 bg-white/20 rounded-sm"></div>
            </div>
          ))}
        </div>
      );
    }

    if (level.type === GameType.COUNTING) {
      const Icon = visual === 'apple' ? AppleIcon : StarIcon;
      return (
        <div className="flex flex-wrap justify-center gap-2 max-h-[220px] overflow-y-auto p-4">
            {Array.from({ length: count || 0 }).map((_, i) => <Icon key={i} size={32} />)}
        </div>
      );
    }

    if (level.type === GameType.SHAPES) {
        const ShapeComp = shape === 'circle' ? Shapes.Circle : shape === 'square' ? Shapes.Square : shape === 'triangle' ? Shapes.Triangle : Shapes.Rectangle;
        return <ShapeComp size={120} color="bg-brand-blue" />;
    }

    if (level.type === GameType.ADDITION || level.type === GameType.SUBTRACTION || level.type === GameType.MULTIPLICATION || level.type === GameType.DIVISION) {
        const symbol = level.type === GameType.ADDITION ? '+' : level.type === GameType.SUBTRACTION ? '-' : level.type === GameType.MULTIPLICATION ? '×' : '÷';
        return (
            <div className="text-center py-6">
                <div className="text-6xl md:text-8xl font-black text-brand-blue drop-shadow-sm">
                  {left} <span className="text-brand-orange">{symbol}</span> {right}
                </div>
            </div>
        );
    }

    if (level.type === GameType.FRACTION) {
      return (
        <div className="flex flex-col items-center">
            <div className="w-36 h-36 rounded-full border-8 border-brand-blue relative overflow-hidden bg-white shadow-inner">
                {top && bottom && (
                   <div className="absolute bottom-0 left-0 right-0 bg-brand-blue" style={{ height: `${(top/bottom)*100}%` }}></div>
                )}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                    <div className="w-full h-0.5 bg-black rotate-45"></div>
                    <div className="w-full h-0.5 bg-black -rotate-45"></div>
                </div>
            </div>
            <div className="mt-4 font-black text-brand-blue text-2xl tracking-widest">{val || (top && bottom ? `${top}/${bottom}` : '?')}</div>
        </div>
      );
    }

    return (
        <div className="bg-blue-50/50 p-10 rounded-[3rem] border-4 border-white shadow-inner">
            <MagnifierIcon size={80} className="text-brand-blue/30 animate-pulse" />
        </div>
    );
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4 bg-slate-50 relative overflow-hidden">
      {penaltyNotify !== null && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] animate-bounce pointer-events-none">
          <div className="bg-brand-pink text-white px-8 py-4 rounded-full shadow-2xl flex items-center space-x-2 border-4 border-white scale-125">
            <span className="text-3xl font-black">-{penaltyNotify}</span>
            <CoinIcon size={32} className="text-white" />
          </div>
        </div>
      )}

      <div className="w-full max-w-lg flex justify-between items-center mb-6">
        <Button variant="neutral" size="sm" onClick={onBack}><ArrowLeftIcon /></Button>
        <div className="flex items-center space-x-3 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100">
            <HeartIcon filled className="text-brand-pink" size={20} />
            <span className="font-black text-xl text-gray-700">{currentLives}</span>
        </div>
      </div>
      
      <div className={`w-full max-w-lg bg-white rounded-[3rem] p-8 md:p-12 shadow-xl border-4 transition-all duration-300 ${isWrong ? 'border-red-400 animate-wiggle' : 'border-white'}`}>
        <div className="text-center mb-4">
           <span className="bg-brand-blue/10 text-brand-blue text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-widest">{level.title}</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-gray-800 text-center mb-8 leading-tight min-h-[4rem] flex items-center justify-center">{level.question}</h2>
        
        <div className="min-h-[240px] flex flex-wrap justify-center items-center gap-4 mb-10 bg-slate-50/50 rounded-[2.5rem] p-6 border-2 border-dashed border-slate-200 shadow-inner overflow-hidden">
          {renderVisuals()}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {options.map((opt, i) => (
            <Button 
              key={i} 
              variant={selected === opt ? 'success' : 'neutral'} 
              size="lg"
              className={`text-xl h-14 md:h-20 ${selected === opt ? '' : 'border-slate-100'}`}
              onClick={() => checkAnswer(opt)}
            >
              {opt}
            </Button>
          ))}
        </div>
      </div>

      {showGameOver && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-pop">
          <div className="bg-white rounded-[3rem] p-10 w-full max-w-xs text-center shadow-2xl border-4 border-brand-pink">
            <div className="text-7xl mb-4">😿</div>
            <h3 className="text-2xl font-black text-gray-800 mb-2">体力用完了</h3>
            <Button variant="danger" fullWidth onClick={onBack}>休息一下</Button>
          </div>
        </div>
      )}
    </div>
  );
};
