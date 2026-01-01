
import React, { useState, useCallback } from 'react';
import { Home } from './views/Home';
import { AdventureMap } from './views/AdventureMap';
import { GameLevel } from './views/GameLevel';
import { Tools } from './views/Tools';
import { MakeTenTool } from './views/MakeTenTool';
import { ParentDashboard } from './views/ParentDashboard';
import { AppView, LevelData } from './types';
import { generateLevelFromPool } from './utils/QuestionBank';
import { audio } from './utils/audio';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);
  const [isParentMode, setIsParentMode] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState(1);
  const [coins, setCoins] = useState(100);
  const [lives, setLives] = useState(5);
  const [parentPin, setParentPin] = useState("0000");
  const [activeLevel, setActiveLevel] = useState<LevelData | null>(null);
  
  const [pageIndex, setPageIndex] = useState(0);
  const [currentSlotId, setCurrentSlotId] = useState(1);

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
          rewards={[]}
          onAddReward={() => {}}
          onDeleteReward={() => {}}
          tasks={[]}
          onAddTask={() => {}}
          onDeleteTask={() => {}}
          isParentMode={isParentMode}
          parentPin={parentPin}
          onUpdatePin={(pin) => setParentPin(pin)}
        />
      )}
    </div>
  );
};

export default App;
