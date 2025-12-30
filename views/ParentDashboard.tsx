
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

  // 自动校验支付
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
  }, [inputPin]);

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
      <div className="min-h-screen bg-[#FFFBEB] flex flex-col relative overflow-hidden">
        {/* 支付弹窗 */}
        {showPayModal && pendingReward && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-pop">
            <div className={`bg-white rounded-[2rem] p-6 w-full max-w-xs text-center shadow-2xl border-4 border-brand-yellow ${errorShake ? 'animate-wiggle' : ''}`}>
              <div className="text-4xl mb-2">{pendingReward.icon}</div>
              <div className="font-black text-gray-800 text-lg">{pendingReward.name}</div>
              <div className="text-yellow-600 font-bold mb-4">支付 {pendingReward.cost} 金币</div>
              
              <div className="flex justify-center space-x-3 mb-6">
                {[0, 1, 2, 3].map(i => (
                  <div key={i} className={`w-3 h-3 rounded-full border-2 border-gray-300 ${i < inputPin.length ? 'bg-brand-blue border-brand-blue' : ''}`}></div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[1,2,3,4,5,6,7,8,9].map(n => (
                  <button key={n} onClick={() => handlePinInput(n.toString())} className="h-12 rounded-xl bg-gray-50 font-black text-lg active:bg-gray-200">{n}</button>
                ))}
                <button onClick={() => { setShowPayModal(false); setPendingReward(null); }} className="h-12 text-red-400 font-bold text-xs">取消</button>
                <button onClick={() => handlePinInput('0')} className="h-12 bg-gray-50 font-black text-lg">0</button>
                <button onClick={() => setInputPin('')} className="h-12 text-gray-400 font-bold text-xs">清空</button>
              </div>
            </div>
          </div>
        )}

        {/* 成功反馈 */}
        {successAnim && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-brand-green/95 p-4 animate-pop">
            <div className="text-center text-white">
              <div className="text-8xl mb-4">🎁</div>
              <h2 className="text-3xl font-black">兑换成功！</h2>
              <p className="font-bold opacity-80 mt-2">快去找妈妈领取吧</p>
            </div>
          </div>
        )}

        <div className="p-4 flex justify-between items-center bg-white shadow-sm sticky top-0 z-10">
          <Button variant="neutral" size="sm" onClick={onBack}><ArrowLeftIcon /></Button>
          <div className="flex items-center bg-yellow-100 px-4 py-1.5 rounded-full border-2 border-yellow-200">
            <CoinIcon size={20} className="mr-2" />
            <span className="font-black text-xl text-yellow-700">{coins}</span>
          </div>
        </div>

        <div className="flex-1 p-4 overflow-y-auto">
          <div className="grid grid-cols-2 gap-4 pb-10">
            {rewards.map(reward => {
              const canAfford = coins >= reward.cost;
              return (
                <button 
                  key={reward.id}
                  onClick={() => initiateRedeem(reward)}
                  className={`bg-white rounded-3xl p-4 shadow-sm border-2 transition-all active:scale-95 flex flex-col items-center
                    ${canAfford ? 'border-transparent hover:border-brand-yellow' : 'opacity-40 grayscale'}
                  `}
                >
                  <div className="text-5xl mb-3 bg-slate-50 w-full aspect-square flex items-center justify-center rounded-2xl">{reward.icon}</div>
                  <div className="font-black text-gray-700 truncate w-full text-center">{reward.name}</div>
                  <div className="mt-2 flex items-center space-x-1 text-yellow-600 font-black">
                    <span>{reward.cost}</span>
                    <CoinIcon size={14} />
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
    <div className="min-h-screen bg-slate-50 flex flex-col">
       <div className="p-4 flex justify-between items-center bg-slate-800 text-white">
          <div className="flex items-center">
            <Button variant="neutral" size="sm" onClick={onBack} className="mr-3 bg-slate-700 text-white"><ArrowLeftIcon /></Button>
            <h2 className="text-xl font-bold">后台管理</h2>
          </div>
          <div className="flex items-center bg-slate-700 px-3 py-1 rounded-full">
            <CoinIcon size={16} className="mr-2" />
            <span className="font-black text-yellow-400">{coins}</span>
          </div>
       </div>

       <div className="flex bg-white shadow-sm">
           <button onClick={() => setActiveTab('TASKS')} className={`flex-1 py-4 font-bold border-b-4 ${activeTab === 'TASKS' ? 'border-brand-blue text-brand-blue' : 'border-transparent text-gray-400'}`}>任务奖惩</button>
           <button onClick={() => setActiveTab('REWARDS')} className={`flex-1 py-4 font-bold border-b-4 ${activeTab === 'REWARDS' ? 'border-brand-yellow text-brand-orange' : 'border-transparent text-gray-400'}`}>商品设置</button>
           <button onClick={() => setActiveTab('SETTINGS')} className={`flex-1 py-4 font-bold border-b-4 ${activeTab === 'SETTINGS' ? 'border-gray-500 text-gray-700' : 'border-transparent text-gray-400'}`}>设置</button>
       </div>

       <div className="flex-1 p-6 max-w-2xl mx-auto w-full overflow-y-auto">
           {activeTab === 'TASKS' && (
               <div className="grid grid-cols-1 gap-4">
                   {tasks.map(task => (
                       <div key={task.id} className="bg-white p-4 rounded-2xl border flex justify-between items-center shadow-sm">
                           <button onClick={() => onUpdateCoins(task.value)} className="flex items-center">
                               <span className="text-3xl mr-3">{task.icon}</span>
                               <div className="text-left">
                                   <div className="font-bold text-gray-700">{task.name}</div>
                                   <div className={`text-xs font-black ${task.value > 0 ? 'text-green-500' : 'text-red-500'}`}>{task.value > 0 ? '+' : ''}{task.value}</div>
                               </div>
                           </button>
                           <button onClick={() => onDeleteTask(task.id)} className="text-gray-300">×</button>
                       </div>
                   ))}
               </div>
           )}

           {activeTab === 'REWARDS' && (
               <div className="space-y-4">
                   {rewards.map(reward => (
                       <div key={reward.id} className="bg-white p-4 rounded-2xl border flex justify-between items-center">
                           <div className="font-bold text-gray-700 flex items-center">
                               <span className="mr-2">{reward.icon}</span> {reward.name} ({reward.cost})
                           </div>
                           <button onClick={() => onDeleteReward(reward.id)} className="text-red-400 font-bold">删除</button>
                       </div>
                   ))}
               </div>
           )}

           {activeTab === 'SETTINGS' && (
               <div className="bg-white p-6 rounded-3xl border">
                   <h3 className="font-bold mb-4">修改 PIN 码</h3>
                   <input maxLength={4} onChange={e => { if(e.target.value.length === 4) onUpdatePin(e.target.value); }} placeholder="输入 4 位新密码" className="w-full p-3 bg-gray-50 rounded-xl mb-4 text-center text-2xl tracking-widest font-black" />
               </div>
           )}
       </div>
    </div>
  );
};
