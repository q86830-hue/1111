
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

  const calculateAnswer = (lvl: LevelData): number | string => {
    return lvl.config.ans;
  };

  useEffect(() => {
    if (currentLives <= 0) setShowGameOver(true);
  }, [currentLives]);

  useEffect(() => {
    const correctAnswer = calculateAnswer(level);
    let opts: (number | string)[] = [];

    if (typeof correctAnswer === 'number') {
      const set = new Set<number>();
      set.add(correctAnswer);
      while(set.size < 3) {
        const dev = range(-3, 3);
        const c = correctAnswer + dev;
        if (c >= 0) set.add(c);
      }
      opts = Array.from(set).sort(() => Math.random() - 0.5);
    } else {
      opts = [correctAnswer, "一样多", correctAnswer === "左边多" ? "右边多" : "左边多"].sort(() => Math.random() - 0.5);
    }
    
    setOptions(opts);
    setSelected(null);
    setIsWrong(false);
  }, [level.uniqueId]);

  const checkAnswer = (val: any) => {
    if (selected !== null) return;
    const correctAnswer = calculateAnswer(level);
    const isCorrect = val.toString() === correctAnswer.toString();
    setSelected(val);

    if (isCorrect) {
      audio.playCorrect();
      setTimeout(() => onComplete(level.id, 3), 800);
    } else {
      audio.playWrong();
      setIsWrong(true);
      onLoseLife();
      onUpdateCoins(-5);
      setTimeout(() => {
        setSelected(null);
        setIsWrong(false);
      }, 800);
    }
  };

  const renderVisuals = () => {
    const { visual, count, left, right, shape, type } = level.config;
    
    if (type === 'clock') {
        return (
            <div className="relative w-40 h-40 rounded-full border-4 border-gray-800 bg-white flex items-center justify-center">
                {Array.from({length: 12}).map((_, i) => (
                    <div key={i} className="absolute inset-0 text-center font-bold pt-1" style={{transform: `rotate(${i * 30}deg)`}}>
                        <span style={{display:'inline-block', transform: `rotate(-${i * 30}deg)`}}>{i === 0 ? 12 : i}</span>
                    </div>
                ))}
                {/* 时针 */}
                <div className="absolute w-1 h-12 bg-gray-800 rounded-full bottom-1/2 origin-bottom" style={{transform: `rotate(${level.config.ans * 30}deg)`}}></div>
                {/* 分针 */}
                <div className="absolute w-1 h-16 bg-brand-blue rounded-full bottom-1/2 origin-bottom" style={{transform: `rotate(0deg)`}}></div>
            </div>
        );
    }

    if (level.type === GameType.COUNTING) {
      const Icon = visual === 'apple' ? AppleIcon : StarIcon;
      return (
        <div className="flex flex-wrap justify-center gap-4 p-4 bg-white/40 rounded-3xl">
            {Array.from({ length: count }).map((_, i) => <Icon key={i} size={48} />)}
        </div>
      );
    }

    if (level.type === GameType.SHAPES) {
        const ShapeComp = shape === 'circle' ? Shapes.Circle : shape === 'square' ? Shapes.Square : shape === 'triangle' ? Shapes.Triangle : Shapes.Rectangle;
        return <ShapeComp size={100} color="bg-brand-blue" />;
    }

    if (level.type === GameType.ADDITION || level.type === GameType.SUBTRACTION || (level.type === GameType.EQUATION && left !== undefined)) {
        const symbol = level.type === GameType.ADDITION ? '+' : level.type === GameType.SUBTRACTION ? '-' : '和';
        return (
            <div className="text-6xl md:text-8xl font-black text-brand-blue flex items-center space-x-4">
              <span>{left}</span>
              <span className="text-brand-orange text-4xl">{symbol}</span>
              <span>{right}</span>
            </div>
        );
    }

    return <MagnifierIcon size={100} className="opacity-20" />;
  };

  return (
    <div className="flex flex-col items-center h-full w-full p-4 bg-slate-50 pt-safe pb-safe">
      <div className="w-full max-w-lg flex justify-between items-center mb-6">
        <Button variant="neutral" size="sm" onClick={onBack} className="w-12 h-12 rounded-full p-0 flex items-center justify-center shadow-md">
          <ArrowLeftIcon />
        </Button>
        <div className="flex items-center space-x-3 bg-white px-5 py-2 rounded-full shadow-md border-2 border-slate-100">
            <HeartIcon filled className="text-brand-pink" size={24} />
            <span className="font-black text-2xl text-gray-700">{currentLives}</span>
        </div>
      </div>
      
      <div className={`w-full max-w-lg bg-white rounded-[3rem] p-8 shadow-2xl border-4 transition-all duration-300 flex-1 flex flex-col ${isWrong ? 'border-red-400 animate-wiggle' : 'border-white'}`}>
        <div className="text-center mb-2">
           <span className="bg-brand-blue/10 text-brand-blue text-xs px-4 py-1.5 rounded-full font-black tracking-widest uppercase">{level.title}</span>
        </div>
        
        <h2 className="text-2xl md:text-3xl font-black text-gray-800 text-center mb-10 leading-snug">
          {level.question}
        </h2>
        
        <div className="flex-1 flex justify-center items-center mb-10 bg-slate-50/50 rounded-[2rem] p-6 border-2 border-dashed border-slate-200">
          {renderVisuals()}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {options.map((opt, i) => (
            <Button 
              key={i} 
              variant={selected === opt ? 'success' : 'neutral'} 
              size="lg"
              className={`text-2xl h-20 ${selected === opt ? '' : 'border-slate-100'}`}
              onClick={() => checkAnswer(opt)}
            >
              {opt}
            </Button>
          ))}
        </div>
      </div>

      {showGameOver && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-blue/30 backdrop-blur-xl p-4">
          <div className="bg-white rounded-[3rem] p-10 w-full max-w-xs text-center shadow-2xl">
            <div className="text-7xl mb-6">🩺</div>
            <h3 className="text-2xl font-black text-gray-800 mb-2">体力用完啦</h3>
            <p className="text-sm text-gray-500 mb-8">大脑需要休息，去找家长恢复体力吧！</p>
            <Button variant="danger" fullWidth size="lg" onClick={onBack}>返回主页</Button>
          </div>
        </div>
      )}
    </div>
  );
};

const range = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
