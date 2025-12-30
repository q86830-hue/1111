
import React, { useState, useEffect } from 'react';
import { Button } from '../components/Button';
import { ArrowLeftIcon, CoinIcon } from '../components/Icons';
import { Reward, Task } from '../types';
import { audio } from '../utils/audio';

interface ParentDashboardProps {
  onBack: () => void;
  coins: number;
  onUpdateCoins: (amount: number) => void;
  rewards: Reward[];
  onAddReward: (reward: Reward) => void;
  onDeleteReward: (id: string) => void;
  tasks: Task[];
  onAddTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
  isParentMode: boolean;
  parentPin: string;
  onUpdatePin: (newPin: string) => void;
}

export const ParentDashboard: React.FC<ParentDashboardProps> = ({ 
  onBack, 
  coins, 
  onUpdateCoins,
  rewards,
  onAddReward,
  onDeleteReward,
  tasks,
  onAddTask,
  onDeleteTask,
  isParentMode,
  parentPin,
  onUpdatePin
}) => {
  const [activeTab, setActiveTab] = useState<'REWARDS' | 'TASKS' | 'SETTINGS'>('TASKS');
  const [newItemName, setNewItemName] = useState('');
  const [inputPin, setInputPin] = useState('');
  const [pendingReward, setPendingReward] = useState<Reward | null>(null);
  const [showPayModal, setShowPayModal] = useState(false);
  const [errorShake, setErrorShake] = useState(false);
  const [successAnim, setSuccessAnim] = useState(false);

  useEffect(() => {
    if (inputPin.length === 4) {
      if (inputPin === parentPin && pendingReward) {
        audio.playWin();
        onUpdateCoins(-pendingReward.cost);
        setSuccessAnim(true);
        setShowPayModal(false);
        setTimeout(() => {
          setSuccessAnim(false);
          setPendingReward(null);
        }, 2000);
      } else {
        audio.playWrong();
        setErrorShake(true);
        setTimeout(() => {
          setErrorShake(false);
          setInputPin('');
        }, 500);
      }
    }
  }, [inputPin, parentPin, pendingReward, onUpdateCoins]);

  const initiateRedeem = (reward: Reward) => {
    if (coins >= reward.cost) {
      audio.playClick();
      setPendingReward(reward);
      setInputPin('');
      setShowPayModal(true);
    } else {
      audio.playWrong();
      setErrorShake(true);
      setTimeout(() => setErrorShake(false), 500);
    }
  };

  const handlePinInput = (digit: string) => {
    if (inputPin.length < 4) {
      audio.playClick();
      setInputPin(prev => prev + digit);
    }
  };

  if (!isParentMode) {
    return (
      <div className="h-full w-full bg-[#FFFBEB] flex flex-col relative overflow-hidden pt-safe pb-safe">
        {/* 支付验证弹窗 */}
        {showPayModal && pendingReward && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-pop">
            <div className={`bg-white rounded-[3rem] p-8 w-full max-w-xs text-center shadow-2xl border-4 border-brand-yellow ${errorShake ? 'animate-wiggle' : ''}`}>
              <div className="text-6xl mb-4">{pendingReward.icon}</div>
              <div className="font-black text-gray-800 text-xl mb-1">{pendingReward.name}</div>
              <div className="text-yellow-600 font-black text-lg mb-6">需支付 {pendingReward.cost} 金币</div>
              
              <div className="flex justify-center space-x-4 mb-8">
                {[0, 1, 2, 3].map(i => (
                  <div key={i} className={`w-4 h-4 rounded-full border-4 border-gray-100 ${i < inputPin.length ? 'bg-brand-blue border-brand-blue' : 'bg-transparent'}`}></div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[1,2,3,4,5,6,7,8,9].map(n => (
                  <button key={n} onClick={() => handlePinInput(n.toString())} className="h-14 rounded-2xl bg-gray-50 font-black text-xl active:bg-gray-200 border-b-4 border-gray-200 active:border-b-0 active:translate-y-1 transition-all">{n}</button>
                ))}
                <button onClick={() => { setShowPayModal(false); setPendingReward(null); }} className="h-14 text-red-400 font-black text-sm">取消</button>
                <button onClick={() => handlePinInput('0')} className="h-14 rounded-2xl bg-gray-50 font-black text-xl active:bg-gray-200 border-b-4 border-gray-200 active:border-b-0 active:translate-y-1 transition-all">0</button>
                <button onClick={() => setInputPin('')} className="h-14 text-gray-400 font-black text-sm">重置</button>
              </div>
            </div>
          </div>
        )}

        {/* 成功动画 */}
        {successAnim && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center bg-brand-green/95 p-4 animate-pop">
            <div className="text-center text-white">
              <div className="text-9xl mb-6 animate-bounce">🎊</div>
              <h2 className="text-4xl font-black mb-2">兑换成功！</h2>
              <p className="text-xl font-black opacity-80">找爸爸妈妈领取奖励吧</p>
            </div>
          </div>
        )}

        <div className="p-4 flex justify-between items-center bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-10 rounded-b-3xl mx-2">
          <Button variant="neutral" size="sm" onClick={onBack} className="w-10 h-10 p-0 flex items-center justify-center rounded-full"><ArrowLeftIcon size={20} /></Button>
          <div className="flex items-center bg-yellow-400/10 px-5 py-2 rounded-full border-2 border-yellow-400/30">
            <CoinIcon size={22} className="mr-2" />
            <span className="font-black text-2xl text-yellow-700">{coins}</span>
          </div>
        </div>

        <div className="flex-1 p-6 overflow-y-auto overscroll-contain">
          <h2 className="text-center font-black text-gray-400 tracking-[0.3em] text-sm mb-6 uppercase">魔法兑换超市</h2>
          <div className="grid grid-cols-2 gap-6 pb-20">
            {rewards.map(reward => {
              const canAfford = coins >= reward.cost;
              return (
                <button 
                  key={reward.id}
                  onClick={() => initiateRedeem(reward)}
                  className={`bg-white rounded-[2.5rem] p-5 shadow-xl border-4 transition-all active:scale-95 flex flex-col items-center
                    ${canAfford ? 'border-transparent hover:border-brand-yellow' : 'opacity-50 grayscale border-slate-100'}
                  `}
                >
                  <div className="text-6xl mb-4 bg-slate-50 w-full aspect-square flex items-center justify-center rounded-[2rem] shadow-inner">{reward.icon}</div>
                  <div className="font-black text-gray-800 text-lg mb-1 truncate w-full text-center px-1">{reward.name}</div>
                  <div className="mt-auto flex items-center space-x-1.5 bg-yellow-50 px-4 py-1.5 rounded-full border border-yellow-100">
                    <span className="font-black text-yellow-600 text-lg">{reward.cost}</span>
                    <CoinIcon size={16} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-slate-50 flex flex-col pt-safe pb-safe">
       <div className="p-4 flex justify-between items-center bg-slate-900 text-white rounded-b-[2rem] mx-2 mt-2 shadow-2xl">
          <div className="flex items-center">
            <Button variant="neutral" size="sm" onClick={onBack} className="mr-3 w-10 h-10 p-0 rounded-full border-none bg-slate-800 text-white flex items-center justify-center active:bg-slate-700"><ArrowLeftIcon size={18} /></Button>
            <h2 className="text-xl font-black tracking-tight">后台管理中心</h2>
          </div>
          <div className="flex items-center bg-slate-800 px-4 py-1.5 rounded-full border border-slate-700 shadow-inner">
            <CoinIcon size={18} className="mr-2" />
            <span className="font-black text-yellow-400 text-lg tracking-wider">{coins}</span>
          </div>
       </div>

       <div className="flex bg-white/60 backdrop-blur-md shadow-sm mx-4 mt-6 rounded-2xl overflow-hidden border border-slate-200">
           <button onClick={() => setActiveTab('TASKS')} className={`flex-1 py-4 font-black text-sm tracking-widest border-b-4 transition-colors ${activeTab === 'TASKS' ? 'border-brand-blue text-brand-blue bg-blue-50/50' : 'border-transparent text-gray-400 hover:text-gray-600'}`}>任务奖惩</button>
           <button onClick={() => setActiveTab('REWARDS')} className={`flex-1 py-4 font-black text-sm tracking-widest border-b-4 transition-colors ${activeTab === 'REWARDS' ? 'border-brand-yellow text-brand-orange bg-yellow-50/50' : 'border-transparent text-gray-400 hover:text-gray-600'}`}>商品设置</button>
           <button onClick={() => setActiveTab('SETTINGS')} className={`flex-1 py-4 font-black text-sm tracking-widest border-b-4 transition-colors ${activeTab === 'SETTINGS' ? 'border-slate-800 text-slate-800 bg-slate-100' : 'border-transparent text-gray-400 hover:text-gray-600'}`}>系统安全</button>
       </div>

       <div className="flex-1 p-6 max-w-2xl mx-auto w-full overflow-y-auto overscroll-contain">
           {activeTab === 'TASKS' && (
               <div className="space-y-4">
                   {tasks.map(task => (
                       <div key={task.id} className="bg-white p-5 rounded-3xl border-2 border-slate-100 flex justify-between items-center shadow-md active:bg-slate-50 transition-colors">
                           <button onClick={() => onUpdateCoins(task.value)} className="flex items-center flex-1">
                               <span className="text-4xl mr-4 drop-shadow-sm">{task.icon}</span>
                               <div className="text-left">
                                   <div className="font-black text-slate-800 text-lg">{task.name}</div>
                                   <div className={`text-sm font-black tracking-widest ${task.value > 0 ? 'text-brand-green' : 'text-brand-pink'}`}>
                                       {task.value > 0 ? '奖励' : '惩罚'} {Math.abs(task.value)} 金币
                                   </div>
                               </div>
                           </button>
                           <button onClick={() => onDeleteTask(task.id)} className="w-10 h-10 flex items-center justify-center text-slate-300 hover:text-red-400 text-2xl font-light">×</button>
                       </div>
                   ))}
               </div>
           )}

           {activeTab === 'REWARDS' && (
               <div className="space-y-4">
                   {rewards.map(reward => (
                       <div key={reward.id} className="bg-white p-5 rounded-3xl border-2 border-slate-100 flex justify-between items-center shadow-md">
                           <div className="font-black text-slate-800 flex items-center text-lg">
                               <span className="text-3xl mr-3">{reward.icon}</span> 
                               <div>
                                   <div>{reward.name}</div>
                                   <div className="text-xs text-yellow-600 font-bold tracking-widest uppercase">售价 {reward.cost} 金币</div>
                               </div>
                           </div>
                           <button onClick={() => onDeleteReward(reward.id)} className="text-red-400 font-black text-sm bg-red-50 px-4 py-2 rounded-xl">下架</button>
                       </div>
                   ))}
               </div>
           )}

           {activeTab === 'SETTINGS' && (
               <div className="bg-white p-8 rounded-[2.5rem] border-2 border-slate-100 shadow-xl">
                   <h3 className="font-black text-slate-800 mb-6 text-xl text-center">修改安全验证 PIN 码</h3>
                   <div className="space-y-4">
                       <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">输入 4 位数字密码</label>
                       <input 
                         type="tel"
                         maxLength={4} 
                         onChange={e => { if(e.target.value.length === 4) { onUpdatePin(e.target.value); audio.playCorrect(); } }} 
                         placeholder="XXXX" 
                         className="w-full p-6 bg-slate-50 rounded-2xl text-center text-4xl tracking-[1em] font-black border-4 border-transparent focus:border-brand-blue outline-none transition-all" 
                       />
                       <p className="text-center text-[10px] text-slate-400 font-bold px-4">PIN 码用于家长模式验证，请妥善保管，切勿让孩子知晓。</p>
                   </div>
               </div>
           )}
           <div className="h-20" />
       </div>
    </div>
  );
};
