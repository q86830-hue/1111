
import React, { useState } from 'react';
import { Button } from '../components/Button';
import { AppView } from '../types';
import { HeartIcon, CoinIcon, SettingsIcon } from '../components/Icons';
import { audio } from '../utils/audio';

interface HomeProps {
  onNavigate: (view: AppView, isParentMode?: boolean) => void;
  selectedGrade: number;
  onSelectGrade: (grade: number) => void;
  lives: number;
  maxLives: number;
  coins: number;
  onBuyLives: (cost: number) => boolean; 
  parentPin: string;
}

export const Home: React.FC<HomeProps> = ({ 
  onNavigate, 
  selectedGrade, 
  onSelectGrade,
  lives,
  maxLives,
  coins,
  onBuyLives,
  parentPin
}) => {
  const [showPinModal, setShowPinModal] = useState(false);
  const [showBuyLivesModal, setShowBuyLivesModal] = useState(false);
  const [inputPin, setInputPin] = useState('');
  const [errorShake, setErrorShake] = useState(false);
  
  const LIVE_COST = 100;

  const handleCoinClick = () => {
    audio.playClick();
    onNavigate(AppView.PARENT_DASHBOARD, false);
  };

  const handleParentClick = () => {
    setShowPinModal(true);
    setInputPin('');
  };

  const handleLivesClick = () => {
      if (lives < maxLives) {
          setShowBuyLivesModal(true);
      } else {
          audio.playCorrect(); 
      }
  };

  const confirmBuyLives = () => {
      const success = onBuyLives(LIVE_COST);
      if (success) {
          audio.playCorrect();
          setShowBuyLivesModal(false);
      } else {
          audio.playWrong();
          setErrorShake(true);
          setTimeout(() => setErrorShake(false), 500);
      }
  };

  const handlePinSubmit = () => {
    if (inputPin === parentPin) {
        audio.playCorrect();
        setShowPinModal(false);
        onNavigate(AppView.PARENT_DASHBOARD, true);
    } else {
        audio.playWrong();
        setErrorShake(true);
        setTimeout(() => setErrorShake(false), 500);
        setInputPin('');
    }
  };

  const handlePinInput = (digit: string) => {
      if (inputPin.length < 4) {
          audio.playClick();
          setInputPin(prev => prev + digit);
      }
  };

  return (
    <div className="flex flex-col items-center h-full w-full p-4 bg-gradient-to-b from-blue-50 to-blue-200 relative overflow-hidden pt-safe pb-safe">
      
      {/* PIN 验证弹窗 */}
      {showPinModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
              <div className={`bg-white rounded-3xl p-6 w-full max-w-xs text-center shadow-2xl border-4 border-gray-200 ${errorShake ? 'animate-wiggle' : ''}`}>
                  <h3 className="text-xl font-bold text-gray-700 mb-4">家长验证</h3>
                  <div className="flex justify-center space-x-2 mb-6">
                      {[0, 1, 2, 3].map(i => (
                          <div key={i} className={`w-4 h-4 rounded-full border-2 border-gray-400 ${i < inputPin.length ? 'bg-gray-700' : 'bg-transparent'}`}></div>
                      ))}
                  </div>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                      {[1,2,3,4,5,6,7,8,9].map(n => (
                          <button key={n} onClick={() => handlePinInput(n.toString())} className="h-14 rounded-xl bg-gray-100 font-bold text-xl active:bg-gray-200 shadow-sm border-b-2 border-gray-300 active:border-b-0 active:translate-y-0.5 transition-all">{n}</button>
                      ))}
                      <button onClick={() => setShowPinModal(false)} className="h-14 rounded-xl bg-red-100 text-red-500 font-bold text-sm">取消</button>
                      <button onClick={() => handlePinInput('0')} className="h-14 rounded-xl bg-gray-100 font-bold text-xl active:bg-gray-200 shadow-sm border-b-2 border-gray-300 active:border-b-0 active:translate-y-0.5 transition-all">0</button>
                      <button onClick={handlePinSubmit} className="h-14 rounded-xl bg-brand-blue text-white font-bold shadow-md active:shadow-none active:translate-y-1">OK</button>
                  </div>
              </div>
          </div>
      )}

      {/* 购买体力弹窗 */}
      {showBuyLivesModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-pop">
              <div className={`bg-white rounded-[2.5rem] p-8 w-full max-w-xs text-center shadow-2xl border-4 border-brand-pink ${errorShake ? 'animate-wiggle' : ''}`}>
                  <div className="text-6xl mb-4 animate-bounce">❤️</div>
                  <h3 className="text-2xl font-black text-gray-800 mb-2">补充体力</h3>
                  <p className="text-gray-500 mb-6 font-bold text-sm">花费 {LIVE_COST} 金币回满体力?</p>
                  
                  <div className="flex justify-center items-center bg-yellow-50 rounded-2xl p-3 mb-8 border border-yellow-200">
                      <CoinIcon className="mr-2" size={24} />
                      <span className={`font-black text-2xl ${coins < LIVE_COST ? 'text-red-500' : 'text-yellow-600'}`}>{coins}</span>
                  </div>

                  <div className="flex flex-col space-y-3">
                      <Button variant="success" fullWidth size="lg" onClick={confirmBuyLives} disabled={coins < LIVE_COST}>
                          {coins < LIVE_COST ? '金币不足' : '立即购买'}
                      </Button>
                      <Button variant="neutral" fullWidth onClick={() => setShowBuyLivesModal(false)}>再想想</Button>
                  </div>
              </div>
          </div>
      )}

      {/* 顶部状态栏 */}
      <div className="w-full max-w-lg flex justify-between items-center mb-6">
         <button 
            onClick={handleParentClick}
            className="bg-white/90 p-2 rounded-full shadow-md border-2 border-white text-gray-500 hover:text-brand-blue active:scale-95 flex items-center px-4"
         >
            <SettingsIcon size={18} className="mr-2" />
            <span className="text-xs font-bold">家长管理</span>
         </button>

         <div className="flex items-center space-x-2">
             <button 
                onClick={handleLivesClick}
                className="flex items-center bg-white/90 px-3 py-2 rounded-full shadow-md border-2 border-white active:scale-95 transition-transform"
             >
                <HeartIcon filled className="mr-2 text-brand-pink" size={20} />
                <span className={`font-black text-lg ${lives < 2 ? 'text-red-600 animate-pulse' : 'text-gray-700'}`}>
                    {lives}
                </span>
                {lives < maxLives && <span className="ml-1 text-[10px] bg-brand-green text-white px-1.5 rounded-full">+</span>}
             </button>

             <button 
                onClick={handleCoinClick}
                className="flex items-center bg-yellow-100/90 px-3 py-2 rounded-full shadow-md border-2 border-white active:scale-95 transition-transform"
             >
                <CoinIcon className="mr-2" size={20} />
                <span className="font-black text-lg text-yellow-700">{coins}</span>
                <span className="ml-2 text-[10px] bg-yellow-500 text-white px-1.5 rounded-full">兑</span>
             </button>
         </div>
      </div>

      <div className="text-center space-y-2 mb-8 flex-shrink-0">
        <h1 className="text-5xl font-black text-brand-blue tracking-tighter drop-shadow-lg animate-bounce-slow">
          快乐数学
        </h1>
        <div className="bg-white/80 px-5 py-1.5 rounded-full text-brand-orange font-black text-sm inline-block shadow-sm">
          同步人教版课程
        </div>
      </div>

      {/* 年级选择 */}
      <div className="w-full max-w-md bg-white/50 p-6 rounded-[2.5rem] backdrop-blur-md mb-8">
        <p className="text-center text-gray-600 font-black mb-4 text-sm tracking-widest uppercase opacity-60">选择学习年级</p>
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((g) => (
            <button
              key={g}
              onClick={() => onSelectGrade(g)}
              className={`
                aspect-square rounded-2xl font-black text-2xl transition-all border-4 flex items-center justify-center shadow-lg
                ${selectedGrade === g 
                  ? 'bg-brand-blue text-white border-white scale-105 rotate-3' 
                  : 'bg-white text-gray-300 border-transparent hover:bg-blue-50'
                }
              `}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      <div className="relative mb-10 group cursor-pointer flex-shrink-0" onClick={() => onNavigate(AppView.ADVENTURE_MAP)}>
        <div className="absolute inset-0 bg-brand-yellow rounded-full blur-2xl opacity-30 animate-pulse"></div>
        <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center shadow-2xl border-4 border-white relative z-10 transform transition-transform active:scale-95">
           <span className="text-8xl select-none">
             {selectedGrade <= 2 ? '🐼' : selectedGrade <= 4 ? '🦊' : '🦁'}
           </span>
           <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-brand-green text-white text-xl px-8 py-3 rounded-full font-black shadow-xl whitespace-nowrap border-4 border-white hover:bg-green-500 transition-all">
              开始闯关 ▶
           </div>
        </div>
      </div>

      <div className="w-full max-w-sm px-4 mt-auto">
        <Button 
          variant="neutral" 
          size="lg" 
          fullWidth
          onClick={() => onNavigate(AppView.TOOLS_MENU)}
          className="shadow-sm border-brand-blue/20 text-brand-blue bg-white/80 rounded-3xl"
        >
             <span className="mr-3 text-2xl">🧪</span>
             探索实验室
        </Button>
      </div>
      
    </div>
  );
};
