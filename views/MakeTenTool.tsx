
import React, { useState, useEffect } from 'react';
import { Button } from '../components/Button';
import { ArrowLeftIcon } from '../components/Icons';

export const MakeTenTool: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [num1, setNum1] = useState(9);
    const [num2, setNum2] = useState(4);
    const [isAnimated, setIsAnimated] = useState(false);

    const needed = 10 - num1;
    const remaining = num2 - needed;

    const handleAction = () => {
        setIsAnimated(!isAnimated);
    };

    return (
        <div className="min-h-screen bg-[#F0F9FF] flex flex-col font-sans">
            <div className="p-4 flex items-center bg-white shadow-sm border-b-4 border-blue-100">
                <Button variant="neutral" size="sm" onClick={onBack} className="mr-4">
                    <ArrowLeftIcon />
                </Button>
                <h2 className="text-xl font-black text-blue-600">凑十法：魔法十格阵</h2>
            </div>

            <div className="flex-1 p-6 flex flex-col items-center max-w-2xl mx-auto w-full">
                {/* 控制区 */}
                <div className="bg-white rounded-3xl p-6 shadow-xl mb-8 w-full border-4 border-blue-50">
                    <div className="flex justify-center items-center space-x-6">
                        <div className="flex flex-col items-center">
                            <span className="text-sm font-bold text-blue-400 mb-2">第一个数</span>
                            <select value={num1} onChange={(e) => {setNum1(Number(e.target.value)); setIsAnimated(false);}} className="text-3xl font-black text-blue-600 bg-blue-50 p-2 rounded-xl outline-none">
                                {[9,8,7,6].map(n => <option key={n} value={n}>{n}</option>)}
                            </select>
                        </div>
                        <span className="text-4xl font-black text-gray-300 mt-6">+</span>
                        <div className="flex flex-col items-center">
                            <span className="text-sm font-bold text-green-400 mb-2">第二个数</span>
                            <select value={num2} onChange={(e) => {setNum2(Number(e.target.value)); setIsAnimated(false);}} className="text-3xl font-black text-green-600 bg-green-50 p-2 rounded-xl outline-none">
                                {[2,3,4,5,6,7,8,9].map(n => <option key={n} value={n}>{n}</option>)}
                            </select>
                        </div>
                    </div>
                </div>

                {/* 十格阵展示 */}
                <div className="w-full bg-white rounded-[2.5rem] p-8 shadow-2xl border-4 border-white relative">
                    <div className="space-y-10">
                        {/* 第一个盒（凑十盒） */}
                        <div className="relative">
                            <div className="grid grid-cols-5 gap-3 bg-gray-100 p-3 rounded-2xl border-2 border-gray-200">
                                {Array.from({ length: 10 }).map((_, i) => (
                                    <div key={i} className="aspect-square bg-white rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center">
                                        {i < num1 && <div className="w-8 h-8 rounded-full bg-blue-500 shadow-md"></div>}
                                        {isAnimated && i >= num1 && i < (num1 + needed) && (
                                            <div className="w-8 h-8 rounded-full bg-green-500 shadow-md animate-bounce"></div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="absolute -left-4 -top-4 bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-bold">盒子 A (凑十)</div>
                        </div>

                        {/* 第二个盒（被借盒） */}
                        <div className="relative">
                            <div className="grid grid-cols-5 gap-3 bg-gray-100 p-3 rounded-2xl border-2 border-gray-200">
                                {Array.from({ length: 10 }).map((_, i) => (
                                    <div key={i} className="aspect-square bg-white rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center">
                                        {i < num2 && (
                                            <div className={`w-8 h-8 rounded-full bg-green-500 shadow-md transition-all duration-700 ${isAnimated && i < needed ? 'scale-0 opacity-0 translate-y-[-100px]' : ''}`}></div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="absolute -left-4 -top-4 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">盒子 B</div>
                        </div>
                    </div>
                </div>

                {/* 算式推导 */}
                <div className="mt-8 w-full bg-blue-600 rounded-3xl p-6 text-white text-center shadow-lg transform transition-transform">
                    {!isAnimated ? (
                        <div className="text-4xl font-black">{num1} + {num2} = ?</div>
                    ) : (
                        <div className="flex flex-col items-center">
                            <div className="text-2xl opacity-80 mb-2">{num1} + ({needed} + {remaining})</div>
                            <div className="text-5xl font-black">10 + {remaining} = {10 + remaining}</div>
                        </div>
                    )}
                </div>

                <div className="mt-8 w-full">
                    <Button fullWidth size="xl" variant={isAnimated ? 'neutral' : 'primary'} onClick={handleAction}>
                        {isAnimated ? "重置演示" : "魔法：凑成十！"}
                    </Button>
                </div>
            </div>
        </div>
    );
};
