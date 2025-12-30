
import React, { useState, useEffect } from 'react';
import { Home } from './views/Home';
import { AdventureMap } from './views/AdventureMap';
import { GameLevel } from './views/GameLevel';
import { Tools } from './views/Tools';
import { MakeTenTool } from './views/MakeTenTool';
import { ParentDashboard } from './views/ParentDashboard';
import { AppView, LevelData, Reward, Task } from './types';
import { LEVEL_DATA } from './constants';
import { generateLevelData } from './utils/QuestionBank';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);
  const [isParentMode, setIsParentMode] = useState(false);
  const [mapLevels, setMapLevels] = useState<LevelData[]>(LEVEL_DATA);
  const [activeLevel, setActiveLevel] = useState<LevelData | null>(null);
  const [selectedGrade, setSelectedGrade] = useState(1);
  const [coins, setCoins] = useState(100);
  const [lives, setLives] = useState(5);
  const [parentPin, setParentPin] = useState("0000");

  const [rewards, setRewards] = useState<Reward[]>([
    { id: '1', name: '看电视15分钟', cost: 50, icon: '📺' },
    { id: '2', name: '吃个冰淇淋', cost: 100, icon: '🍦' },
    { id: '3', name: '玩游戏10分钟', cost: 80, icon: '🎮' },
    { id: '4', name: '买个小玩具', cost: 300, icon: '🧸' }
  ]);
  
  const [tasks, setTasks] = useState<Task[]>([
    { id: 't1', name: '准时完成作业', value: 20, icon: '📝' },
    { id: 't2', name: '主动整理书包', value: 10, icon: '🎒' },
    { id: 't3', name: '无故发脾气', value: -15, icon: '💢' }
  ]);

  const updateCoins = (amount: number) => {
    setCoins(prev => Math.max(0, prev + amount));
  };

  const navigateTo = (view: AppView, parentMode: boolean = false) => {
    setIsParentMode(parentMode);
    setCurrentView(view);
  };

  const handleSelectLevel = (id: number) => {
    try {
      const data = generateLevelData(id, selectedGrade);
      setActiveLevel(data);
      setCurrentView(AppView.GAME_LEVEL);
    } catch (err) {
      console.error("Failed to generate level:", err);
      alert("关卡生成失败，请稍后再试");
    }
  };

  const handleComplete = (levelId: number, stars: number) => {
    updateCoins(stars * 10);
    setMapLevels(prev => prev.map(l => {
      if (l.id === levelId) return { ...l, stars: Math.max(l.stars, stars) };
      if (l.id === levelId + 1) return { ...l, locked: false };
      return l;
    }));
    setCurrentView(AppView.ADVENTURE_MAP);
  };

  const handleLoseLife = () => {
    setLives(prev => {
      const newLives = prev - 1;
      if (newLives <= 0) {
        // Potential logic for Game Over state
      }
      return Math.max(0, newLives);
    });
  };

  return (
    <div className="h-full w-full overflow-hidden bg-blue-50">
      {currentView === AppView.HOME && (
        <Home 
          onNavigate={navigateTo} 
          selectedGrade={selectedGrade} 
          onSelectGrade={setSelectedGrade} 
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
          levels={mapLevels} 
          selectedGrade={selectedGrade} 
          onSelectLevel={handleSelectLevel} 
          onBack={() => setCurrentView(AppView.HOME)} 
          lives={lives} 
          coins={coins} 
        />
      )}

      {currentView === AppView.GAME_LEVEL && activeLevel && (
        <GameLevel 
          key={activeLevel.uniqueId}
          level={activeLevel} 
          onBack={() => setCurrentView(AppView.ADVENTURE_MAP)} 
          onComplete={handleComplete} 
          currentLives={lives} 
          onLoseLife={handleLoseLife} 
          onUpdateCoins={updateCoins}
        />
      )}

      {currentView === AppView.TOOLS_MENU && (
        <Tools 
          onNavigate={(v) => setCurrentView(v)} 
          onBack={() => setCurrentView(AppView.HOME)} 
        />
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
          onAddReward={(r) => setRewards([...rewards, r])}
          onDeleteReward={(id) => setRewards(rewards.filter(r => r.id !== id))}
          tasks={tasks}
          onAddTask={(t) => setTasks([...tasks, t])}
          onDeleteTask={(id) => setTasks(tasks.filter(t => t.id !== id))}
          isParentMode={isParentMode}
          parentPin={parentPin}
          onUpdatePin={setParentPin}
        />
      )}
    </div>
  );
};

export default App;
