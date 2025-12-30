import React from 'react';
import { Button } from '../components/Button';
import { AppView } from '../types';
import { ArrowLeftIcon } from '../components/Icons';

interface ToolsProps {
    onNavigate: (view: AppView) => void;
    onBack: () => void;
}

export const Tools: React.FC<ToolsProps> = ({ onNavigate, onBack }) => {
    return (
        <div className="min-h-screen bg-brand-blue/10 flex flex-col">
            <div className="p-4 flex items-center bg-white shadow-sm">
                <Button variant="neutral" size="sm" onClick={onBack} className="mr-4">
                    <ArrowLeftIcon />
                </Button>
                <h2 className="text-2xl font-bold text-gray-800">神奇工具箱</h2>
            </div>

            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <button 
                    onClick={() => onNavigate(AppView.TOOL_MAKE_TEN)}
                    className="bg-white p-6 rounded-3xl shadow-lg border-b-4 border-brand-blue active:translate-y-1 active:border-b-0 transition-all text-left group"
                >
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-4xl bg-blue-100 p-3 rounded-2xl group-hover:rotate-12 transition-transform">🔟</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">凑十法演示器</h3>
                    <p className="text-gray-500 text-sm">帮助理解如何凑成10，轻松学习进位加法。</p>
                </button>

                <button 
                    disabled
                    className="bg-gray-100 p-6 rounded-3xl border-2 border-gray-200 text-left opacity-70 cursor-not-allowed"
                >
                    <div className="flex justify-between items-start mb-4">
                         <span className="text-4xl bg-gray-200 p-3 rounded-2xl grayscale">📏</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-500 mb-2">数字尺 (开发中)</h3>
                    <p className="text-gray-400 text-sm">在数轴上跳一跳，认识加减法。</p>
                </button>
            </div>
        </div>
    );
};