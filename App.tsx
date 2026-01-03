
import React, { useState, useCallback, useEffect, ErrorInfo } from 'react';
import { Home } from './views/Home';
import { AdventureMap } from './views/AdventureMap';
import { GameLevel } from './views/GameLevel';
import { Tools } from './views/Tools';
import { MakeTenTool } from './views/MakeTenTool';
import { ParentDashboard } from './views/ParentDashboard';
import { AppView, LevelData, Reward, Task } from './types';
import { generateLevelFromPool } from './utils/QuestionBank';
import { audio } from './utils/audio';

// 添加错误边界组件，确保应用在出现错误时能够优雅降级
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    // 更新状态，下次渲染时显示降级UI
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // 记录错误信息
    console.error('应用错误:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 显示降级UI
      return (
        <div className="h-full w-full flex flex-col items-center justify-center bg-blue-50">
          <h1 className="text-3xl font-bold text-red-600 mb-4">应用出现错误</h1>
          <p className="text-lg text-gray-700 mb-8">很抱歉，应用出现了一些问题，请稍后再试。</p>
          <button 
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
            onClick={() => window.location.reload()}
          >
            重新加载
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const App: React.FC = () => {
  console.log('App组件开始渲染...');
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);
  const [isParentMode, setIsParentMode] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState(1);
  const [coins, setCoins] = useState(100);
  const [lives, setLives] = useState(5);
  const [parentPin, setParentPin] = useState("0000");
  const [activeLevel, setActiveLevel] = useState<LevelData | null>(null);
  
  const [pageIndex, setPageIndex] = useState(0);
  const [currentSlotId, setCurrentSlotId] = useState(1);
  
  const [rewards, setRewards] = useState<Reward[]>([
    { id: '1', name: '看一集动画片', cost: 200, icon: '📺' },
    { id: '2', name: '吃一个冰淇淋', cost: 150, icon: '🍦' },
    { id: '3', name: '去公园玩', cost: 300, icon: '🎡' }
  ]);
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', name: '自己收拾书包', value: 20, icon: '🎒' },
    { id: '2', name: '帮妈妈洗菜', value: 15, icon: '🥬' }
  ]);



  const updateCoins = useCallback((amount: number) => {
    setCoins(prev => Math.max(0, prev + amount));
  }, []);

  const handleLoseLife = useCallback(() => {
    setLives(prev => Math.max(0, prev - 1));
  }, []);

  const navigateTo = (view: AppView, parentMode: boolean = false) => {
    setIsParentMode(parentMode);
    setCurrentView(view);
  };

  const handleSelectLevel = (slotId: number) => {
    try {
      setCurrentSlotId(slotId);
      const data = generateLevelFromPool(selectedGrade, slotId, pageIndex);
      setActiveLevel(data);
      setCurrentView(AppView.GAME_LEVEL);
    } catch (err) {
      console.error("加载关卡失败:", err);
    }
  };

  const handleRefreshLevel = () => {
    try {
      audio.playClick();
      const randomOffset = Math.floor(Math.random() * 5) + 1;
      const data = generateLevelFromPool(selectedGrade, currentSlotId, pageIndex + randomOffset);
      setActiveLevel(data);
    } catch (err) {
      console.warn("换题失败:", err);
    }
  };

  const handleGlobalRefresh = () => {
      setPageIndex(prev => prev + 1);
  };

  const handleComplete = (levelId: number, stars: number) => {
    updateCoins(stars * 10);
    setCurrentView(AppView.ADVENTURE_MAP);
  };

  const handleSelectGrade = (grade: number) => {
    audio.playClick();
    setSelectedGrade(grade);
    setPageIndex(0);
  };

  return (
    <ErrorBoundary>
      <div className="h-full w-full overflow-hidden bg-blue-50">
        {currentView === AppView.HOME && (
          <Home 
            onNavigate={navigateTo} 
            selectedGrade={selectedGrade} 
            onSelectGrade={handleSelectGrade} 
            lives={lives} 
            maxLives={5} 
            coins={coins} 
            onBuyLives={(cost) => {
              if (coins >= cost) {
                updateCoins(-cost);
                setLives(5);
                return true;
              }
              return false;
            }} 
            parentPin={parentPin} 
          />
        )}

        {currentView === AppView.ADVENTURE_MAP && (
          <AdventureMap 
            selectedGrade={selectedGrade} 
            onSelectLevel={handleSelectLevel} 
            onBack={() => setCurrentView(AppView.HOME)} 
            onRefreshMap={handleGlobalRefresh}
            pageIndex={pageIndex}
            lives={lives} 
            coins={coins} 
          />
        )}

        {currentView === AppView.GAME_LEVEL && activeLevel && (
          <GameLevel 
            key={activeLevel.uniqueId} 
            level={activeLevel} 
            onBack={() => setCurrentView(AppView.ADVENTURE_MAP)} 
            onRefresh={handleRefreshLevel} 
            onComplete={handleComplete} 
            currentLives={lives} 
            onLoseLife={handleLoseLife} 
            onSetLives={setLives}
            onUpdateCoins={updateCoins}
            coins={coins}
            parentPin={parentPin}
          />
        )}

        {currentView === AppView.TOOLS_MENU && (
          <Tools onNavigate={(v) => setCurrentView(v)} onBack={() => setCurrentView(AppView.HOME)} />
        )}

        {currentView === AppView.TOOL_MAKE_TEN && (
          <MakeTenTool onBack={() => setCurrentView(AppView.TOOLS_MENU)} />
        )}

        {currentView === AppView.PARENT_DASHBOARD && (
          <ParentDashboard 
            onBack={() => setCurrentView(AppView.HOME)} 
            coins={coins}
            onUpdateCoins={updateCoins}
            rewards={rewards}
            onAddReward={(r) => setRewards(prev => [...prev, r])}
            onDeleteReward={(id) => setRewards(prev => prev.filter(r => r.id !== id))}
            tasks={tasks}
            onAddTask={(t) => setTasks(prev => [...prev, t])}
            onDeleteTask={(id) => setTasks(prev => prev.filter(t => t.id !== id))}
            isParentMode={isParentMode}
            parentPin={parentPin}
            onUpdatePin={(pin) => setParentPin(pin)}
          />
        )}
      </div>
    </ErrorBoundary>
  );
};

export default App;
