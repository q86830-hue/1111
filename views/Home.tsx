
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

  // 唯一入口：点击金币进入兑换超市
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
          audio.playCorrect(); // Already full
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
        onNavigate(AppView.PARENT_DASHBOARD, true); // Enable Parent Mode
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
    <div className="flex flex-col items-center min-h-screen p-4 bg-gradient-to-b from-blue-50 to-blue-200 relative overflow-hidden">
      
      {/* PIN Modal for Parent Mode Entrance */}
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
                      <button onClick={() => setShowPinModal(false)} className="h-14 rounded-xl bg-red-100 text-red-500 font-bold">取消</button>
                      <button onClick={() => handlePinInput('0')} className="h-14 rounded-xl bg-gray-100 font-bold text-xl active:bg-gray-200 shadow-sm border-b-2 border-gray-300 active:border-b-0 active:translate-y-0.5 transition-all">0</button>
                      <button onClick={handlePinSubmit} className="h-14 rounded-xl bg-brand-blue text-white font-bold shadow-[0_4px_0_rgba(0,0,0,0.2)] active:shadow-none active:translate-y-1">OK</button>
                  </div>
              </div>
          </div>
      )}

      {/* Buy Lives Modal */}
      {showBuyLivesModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-pop">
              <div className={`bg-white rounded-3xl p-6 md:p-8 w-full max-w-xs md:max-w-sm text-center shadow-2xl border-4 border-brand-pink ${errorShake ? 'animate-wiggle' : ''}`}>
                  <div className="text-5xl md:text-6xl mb-2">❤️</div>
                  <h3 className="text-xl md:text-2xl font-black text-gray-800 mb-2">补充体力</h3>
                  <p className="text-gray-500 mb-6 font-bold text-sm md:text-base">花费 {LIVE_COST} 金币回满体力?</p>
                  
                  <div className="flex justify-center items-center bg-yellow-50 rounded-xl p-2 mb-6 border border-yellow-200">
                      <span className="text-gray-400 text-xs font-bold mr-2">当前拥有:</span>
                      <CoinIcon className="mr-1" size={20} />
                      <span className={`font-black text-xl ${coins < LIVE_COST ? 'text-red-500' : 'text-yellow-600'}`}>{coins}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                      <Button variant="neutral" onClick={() => setShowBuyLivesModal(false)}>取消</Button>
                      <Button variant="success" onClick={confirmBuyLives} disabled={coins < LIVE_COST}>
                          {coins < LIVE_COST ? '金币不足' : '购买'}
                      </Button>
                  </div>
              </div>
          </div>
      )}

      {/* Stats Header */}
      <div className="w-full max-w-md flex justify-between items-center mb-6 mt-2 relative z-10">
         <button 
            onClick={handleParentClick}
            className="bg-white/90 p-2 rounded-full shadow-md border-2 border-white text-gray-500 hover:text-brand-blue active:scale-95 flex items-center px-3 md:px-4"
         >
            <SettingsIcon size={18} className="mr-1 md:mr-1" />
            <span className="text-[10px] md:text-xs font-bold">家长管理</span>
         </button>

         <div className="flex items-center space-x-2">
             <button 
                onClick={handleLivesClick}
                className="flex items-center bg-white/90 px-2.5 py-1.5 rounded-full shadow-md border-2 border-white active:scale-95 transition-transform"
             >
                <HeartIcon filled className="mr-1 text-brand-pink" size={18} />
                <span className={`font-black text-base md:text-lg ${lives < 2 ? 'text-red-600 animate-pulse' : 'text-gray-700'}`}>
                    {lives}
                </span>
                {lives < maxLives && <span className="ml-1 text-[10px] bg-brand-green text-white px-1 rounded-full">+</span>}
             </button>

             {/* 进入商店的唯一入口 */}
             <button 
                onClick={handleCoinClick}
                className="flex items-center bg-yellow-100/90 px-2.5 py-1.5 rounded-full shadow-md border-2 border-white active:scale-95 transition-transform cursor-pointer hover:bg-yellow-200 ring-2 ring-yellow-400/50"
             >
                <CoinIcon className="mr-1" size={18} />
                <span className="font-black text-base md:text-lg text-yellow-700">{coins}</span>
                <span className="ml-1 text-[10px] bg-yellow-500 text-white px-1.5 rounded-full animate-bounce">兑</span>
             </button>
         </div>
      </div>

      <div className="text-center space-y-2 animate-bounce-slow mb-6 z-0 mt-2">
        <h1 className="text-4xl md:text-5xl font-black text-brand-blue tracking-wider drop-shadow-md">
          快乐数学
        </h1>
        <div className="bg-white/80 px-4 py-1 rounded-full text-brand-orange font-bold text-sm md:text-lg inline-block shadow-sm">
          人教版一年级同步
        </div>
      </div>

      <div className="w-full max-w-lg bg-white/60 p-4 rounded-3xl backdrop-blur-sm mb-6 z-10">
        <p className="text-center text-gray-500 font-bold mb-3 text-sm">选择你的年级</p>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-2">
          {[1, 2, 3, 4, 5, 6].map((g) => (
            <button
              key={g}
              onClick={() => onSelectGrade(g)}
              className={`
                aspect-square rounded-xl font-black text-lg shadow-sm transition-all border-2 flex items-center justify-center
                ${selectedGrade === g 
                  ? 'bg-brand-blue text-white border-brand-blue scale-110 shadow-lg z-10' 
                  : 'bg-white text-gray-400 border-transparent hover:bg-blue-50'
                }
              `}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      <div className="relative mb-8 group cursor-pointer z-10" onClick={() => onNavigate(AppView.ADVENTURE_MAP)}>
        <div className="absolute inset-0 bg-brand-yellow rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity animate-pulse"></div>
        <div className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-full flex items-center justify-center shadow-2xl border-4 border-brand-yellow relative z-10 transform group-hover:scale-105 transition-transform">
           <span className="text-7xl md:text-8xl">
             {selectedGrade <= 2 ? '🐼' : selectedGrade <= 4 ? '🦊' : '🦁'}
           </span>
           <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-brand-success text-white text-lg md:text-xl px-4 md:px-6 py-2 rounded-full font-black shadow-lg whitespace-nowrap border-2 border-white bg-brand-green hover:bg-green-500 transition-colors">
              开始闯关 ▶
           </div>
        </div>
      </div>

      <div className="w-full max-w-sm space-y-4 mb-8 z-10 px-4">
        <Button 
          variant="neutral" 
          size="lg" 
          fullWidth
          onClick={() => onNavigate(AppView.TOOLS_MENU)}
          className="shadow-sm border-brand-blue/20 text-brand-blue"
        >
             <span className="mr-3 text-2xl">🛠️</span>
             数学工具箱
        </Button>
      </div>
      
    </div>
  );
};
