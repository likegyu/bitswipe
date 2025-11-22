'use client';

import React from 'react';
import { useGameStore } from '@/store/gameStore';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Sector } from 'recharts';



export const ResultModal = () => {
    const { status, history, balance, initialBalance, resetGame } = useGameStore();

    if (status !== 'FINISHED') return null;

    const totalRounds = history.length;
    const wins = history.filter(h => h.win).length;
    const losses = totalRounds - wins;
    const winRate = totalRounds > 0 ? (wins / totalRounds) * 100 : 0;

    const longBets = history.filter(h => h.position === 'long');
    const longWins = longBets.filter(h => h.win).length;
    const longWinRate = longBets.length > 0 ? (longWins / longBets.length) * 100 : 0;

    const shortBets = history.filter(h => h.position === 'short');
    const shortWins = shortBets.filter(h => h.win).length;
    const shortWinRate = shortBets.length > 0 ? (shortWins / shortBets.length) * 100 : 0;

    const profit = balance - initialBalance;
    const profitPercent = ((profit / initialBalance) * 100).toFixed(2);

    const data = [
        { name: 'Wins', value: wins },
        { name: 'Losses', value: losses },
    ];

    const COLORS = ['#88d8b0', '#ff6b6b'];



    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md z-[80] flex items-center justify-center p-4">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto"
            >
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Game Result</h2>

                {/* Main Win Rate */}
                <div className="flex flex-col items-center mb-8">
                    <h3 className="text-lg font-medium text-gray-500 mb-2">Total Win Rate</h3>
                    <div className="w-64 h-64 relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={[data[0]]}
                                    innerRadius={70}
                                    outerRadius={98} // Larger for Wins
                                    startAngle={90}
                                    endAngle={90 - (360 * (data[0].value / (data[0].value + data[1].value)))}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    <Cell fill={COLORS[0]} />
                                </Pie>
                                <Pie
                                    data={[data[1]]}
                                    innerRadius={70}
                                    outerRadius={90} // Standard for Losses
                                    startAngle={90 - (360 * (data[0].value / (data[0].value + data[1].value)))}
                                    endAngle={-270}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    <Cell fill={COLORS[1]} />
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex items-center justify-center flex-col">
                            <span className="text-3xl font-bold" style={{ color: winRate >= 50 ? COLORS[0] : COLORS[1] }}>
                                {Math.round(winRate)}%
                            </span>
                        </div>
                    </div>
                </div>

                {/* Sub Stats */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-gray-50 p-4 rounded-2xl text-center">
                        <h4 className="text-sm text-gray-500 mb-1">Long Win Rate</h4>
                        <span className="text-xl font-bold text-success">{Math.round(longWinRate)}%</span>
                        <div className="text-xs text-gray-400 mt-1">{longWins}/{longBets.length}</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-2xl text-center">
                        <h4 className="text-sm text-gray-500 mb-1">Short Win Rate</h4>
                        <span className="text-xl font-bold text-error">{Math.round(shortWinRate)}%</span>
                        <div className="text-xs text-gray-400 mt-1">{shortWins}/{shortBets.length}</div>
                    </div>
                </div>

                {/* Final Profit */}
                <div className="text-center mb-8">
                    <h3 className="text-lg font-medium text-gray-500 mb-2">Total Return</h3>
                    <span className={`text-4xl font-bold ${profit >= 0 ? 'text-success' : 'text-error'}`}>
                        {profit >= 0 ? '+' : ''}{profitPercent}%
                    </span>
                </div>

                <button
                    onClick={resetGame}
                    className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-colors shadow-lg shadow-orange-200"
                >
                    Play Again
                </button>
            </motion.div>
        </div>
    );
};
