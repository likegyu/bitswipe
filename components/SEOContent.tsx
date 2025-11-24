import React from 'react';

export const SEOContent = () => {
    return (
        <section className="w-full max-w-4xl mx-auto px-4 py-12 text-gray-600 dark:text-gray-300">
            <div className="prose prose-sm sm:prose lg:prose-lg dark:prose-invert mx-auto">

                {/* Mission Statement */}
                <div className="mb-12 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-800">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Why Bitswipe?</h2>
                    <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                        I created Bitswipe to bridge the gap between boring study and the thrill of live trading.
                        Many aspiring traders struggle with the slow pace of real-time mock trading—waiting hours for a setup to form.
                    </p>
                    <p className="mb-0 text-gray-700 dark:text-gray-300 leading-relaxed">
                        Bitswipe solves this by using <strong>real historical Bitcoin data</strong> to create a fast-paced, intuitive web game.
                        It allows you to experience months of market movements in minutes, helping you recognize patterns faster.
                        Our goal is to provide a platform where you can test your intuition, analyze your win rates detailedly,
                        and easily share your achievements with friends—all while having fun without the financial risk.
                    </p>
                </div>

                <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Mastering Chart Patterns</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {/* Head and Shoulders */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <div className="h-40 mb-4 flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                            <svg viewBox="0 0 200 120" className="w-full h-full" fill="none">
                                {/* Grid Lines */}
                                <line x1="0" y1="30" x2="200" y2="30" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4" className="dark:stroke-gray-700" />
                                <line x1="0" y1="60" x2="200" y2="60" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4" className="dark:stroke-gray-700" />
                                <line x1="0" y1="90" x2="200" y2="90" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4" className="dark:stroke-gray-700" />

                                {/* Left Shoulder */}
                                <rect x="20" y="70" width="8" height="20" fill="#22c55e" rx="1" /> {/* Green */}
                                <line x1="24" y1="65" x2="24" y2="95" stroke="#22c55e" strokeWidth="1" />
                                <rect x="35" y="60" width="8" height="25" fill="#22c55e" rx="1" />
                                <line x1="39" y1="55" x2="39" y2="90" stroke="#22c55e" strokeWidth="1" />
                                <rect x="50" y="75" width="8" height="15" fill="#ef4444" rx="1" /> {/* Red */}
                                <line x1="54" y1="70" x2="54" y2="95" stroke="#ef4444" strokeWidth="1" />

                                {/* Head */}
                                <rect x="65" y="50" width="8" height="30" fill="#22c55e" rx="1" />
                                <line x1="69" y1="40" x2="69" y2="85" stroke="#22c55e" strokeWidth="1" />
                                <rect x="80" y="30" width="8" height="40" fill="#22c55e" rx="1" /> {/* Peak */}
                                <line x1="84" y1="20" x2="84" y2="75" stroke="#22c55e" strokeWidth="1" />
                                <rect x="95" y="45" width="8" height="35" fill="#ef4444" rx="1" />
                                <line x1="99" y1="40" x2="99" y2="85" stroke="#ef4444" strokeWidth="1" />

                                {/* Right Shoulder */}
                                <rect x="110" y="70" width="8" height="15" fill="#ef4444" rx="1" />
                                <line x1="114" y1="65" x2="114" y2="90" stroke="#ef4444" strokeWidth="1" />
                                <rect x="125" y="65" width="8" height="20" fill="#22c55e" rx="1" />
                                <line x1="129" y1="60" x2="129" y2="90" stroke="#22c55e" strokeWidth="1" />
                                <rect x="140" y="75" width="8" height="25" fill="#ef4444" rx="1" />
                                <line x1="144" y1="70" x2="144" y2="105" stroke="#ef4444" strokeWidth="1" />

                                {/* Breakdown */}
                                <rect x="155" y="90" width="8" height="25" fill="#ef4444" rx="1" />
                                <line x1="159" y1="85" x2="159" y2="115" stroke="#ef4444" strokeWidth="1" />

                                {/* Neckline */}
                                <path d="M10 95 L190 95" strokeDasharray="4 4" className="stroke-gray-400 dark:stroke-gray-500" strokeWidth="2" />
                                <text x="100" y="120" textAnchor="middle" className="fill-gray-500 text-xs font-bold">Neckline Support</text>
                            </svg>
                        </div>
                        <h3 className="font-bold text-lg mb-2">Head and Shoulders</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            A bearish reversal pattern. It has three peaks: a higher middle peak (head) between two smaller peaks (shoulders).
                            Breaking the "neckline" support often signals a price drop.
                        </p>
                    </div>

                    {/* Double Bottom */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <div className="h-40 mb-4 flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                            <svg viewBox="0 0 200 120" className="w-full h-full" fill="none">
                                {/* Grid Lines */}
                                <line x1="0" y1="30" x2="200" y2="30" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4" className="dark:stroke-gray-700" />
                                <line x1="0" y1="60" x2="200" y2="60" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4" className="dark:stroke-gray-700" />
                                <line x1="0" y1="90" x2="200" y2="90" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4" className="dark:stroke-gray-700" />

                                {/* First Bottom */}
                                <rect x="20" y="30" width="8" height="30" fill="#ef4444" rx="1" />
                                <line x1="24" y1="25" x2="24" y2="65" stroke="#ef4444" strokeWidth="1" />
                                <rect x="35" y="60" width="8" height="30" fill="#ef4444" rx="1" />
                                <line x1="39" y1="55" x2="39" y2="95" stroke="#ef4444" strokeWidth="1" /> {/* Low 1 */}
                                <rect x="50" y="55" width="8" height="20" fill="#22c55e" rx="1" />
                                <line x1="54" y1="50" x2="54" y2="80" stroke="#22c55e" strokeWidth="1" />

                                {/* Middle Peak */}
                                <rect x="65" y="40" width="8" height="25" fill="#22c55e" rx="1" />
                                <line x1="69" y1="35" x2="69" y2="70" stroke="#22c55e" strokeWidth="1" />
                                <rect x="80" y="35" width="8" height="15" fill="#ef4444" rx="1" />
                                <line x1="84" y1="30" x2="84" y2="55" stroke="#ef4444" strokeWidth="1" />

                                {/* Second Bottom */}
                                <rect x="95" y="50" width="8" height="30" fill="#ef4444" rx="1" />
                                <line x1="99" y1="45" x2="99" y2="85" stroke="#ef4444" strokeWidth="1" />
                                <rect x="110" y="65" width="8" height="25" fill="#ef4444" rx="1" />
                                <line x1="114" y1="60" x2="114" y2="95" stroke="#ef4444" strokeWidth="1" /> {/* Low 2 */}
                                <rect x="125" y="55" width="8" height="25" fill="#22c55e" rx="1" />
                                <line x1="129" y1="50" x2="129" y2="85" stroke="#22c55e" strokeWidth="1" />

                                {/* Breakout */}
                                <rect x="140" y="40" width="8" height="30" fill="#22c55e" rx="1" />
                                <line x1="144" y1="35" x2="144" y2="75" stroke="#22c55e" strokeWidth="1" />
                                <rect x="155" y="20" width="8" height="30" fill="#22c55e" rx="1" />
                                <line x1="159" y1="15" x2="159" y2="55" stroke="#22c55e" strokeWidth="1" />

                                {/* Resistance Line */}
                                <path d="M10 35 L190 35" strokeDasharray="4 4" className="stroke-gray-400 dark:stroke-gray-500" strokeWidth="2" />
                                <text x="100" y="15" textAnchor="middle" className="fill-gray-500 text-xs font-bold">Resistance Breakout</text>
                            </svg>
                        </div>
                        <h3 className="font-bold text-lg mb-2">Double Bottom (W Pattern)</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            A bullish reversal pattern looking like a "W". It indicates the price has hit a support level twice and failed to break lower.
                            Breaking the upper resistance confirms the uptrend.
                        </p>
                    </div>
                </div>

                <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Advanced Tools & Indicators</h2>
                <p className="mb-6">
                    Want to trade like a pro? Click the <strong>Settings (Gear Icon)</strong> button in the top right corner to enable professional technical indicators.
                </p>

                <div className="space-y-6 mb-12">

                    <div className="flex gap-4 items-start">
                        <div className="p-3 bg-green-100 text-green-600 rounded-lg mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">Leverage (1x - 100x) & Liquidation Risk</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                <strong>Educational Goal:</strong> Understand the high risks of leverage trading safely.
                                <br />• <strong>Leverage:</strong> Amplifies both profits and losses. (e.g., 10x leverage turns a 1% move into 10%)
                                <br />• <strong>Liquidation:</strong> If your loss exceeds 100% of your margin (e.g., -2% move at 50x), you lose your entire bet.
                                <br />• <em>Game Rule: If you are liquidated, the game ends immediately, regardless of remaining rounds. Use this to practice risk management!</em>
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4 items-start">
                        <div className="p-3 bg-purple-100 text-purple-600 rounded-lg mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" /></svg>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">RSI (Relative Strength Index)</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                Measures the speed and change of price movements.
                                <br />• <strong>Above 70:</strong> Overbought (Price might drop)
                                <br />• <strong>Below 30:</strong> Oversold (Price might rise)
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4 items-start">
                        <div className="p-3 bg-blue-100 text-blue-600 rounded-lg mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">MA (Moving Average)</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                Shows the average price over a specific period, smoothing out price fluctuations to identify the trend direction.
                                <br />• <strong>Slope Up:</strong> Uptrend (Bullish)
                                <br />• <strong>Slope Down:</strong> Downtrend (Bearish)
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4 items-start">
                        <div className="p-3 bg-orange-100 text-orange-600 rounded-lg mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" /></svg>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">Bollinger Bands</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                A set of lines plotted two standard deviations (positively and negatively) away from a simple moving average.
                                <br />• <strong>Squeeze:</strong> Low volatility, often followed by a breakout.
                                <br />• <strong>Touch:</strong> Price touching the upper band may indicate overbought, lower band may indicate oversold.
                            </p>
                        </div>
                    </div>

                </div>

                <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">How to Play</h2>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li><strong>Analyze the Chart:</strong> Review the historical candlestick chart displayed on the card. Look for patterns, trends, and indicators.</li>
                    <li><strong>Make a Prediction:</strong> Decide if the price will go up (Long), down (Short), or stay sideways (Hold).</li>
                    <li><strong>Tap to Predict:</strong> Tap the 'Long' button to predict a rise, 'Short' for a drop, or 'Hold' to wait.</li>
                    <li><strong>Instant Results:</strong> Experience immediate feedback with interactive visual effects that reveal your result right away.</li>
                    <li><strong>Track Your Progress:</strong> Monitor your win rate and virtual profit to see how your trading skills improve over time.</li>
                </ul>

                <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Trading Tips for Beginners</h2>
                <p className="mb-4">
                    Successful trading requires discipline and strategy. Here are a few tips to keep in mind while playing Bitswipe:
                </p>
                <ol className="list-decimal pl-6 mb-6 space-y-2">
                    <li><strong>Trend is Your Friend:</strong> It's often safer to trade in the direction of the overall trend rather than against it.</li>
                    <li><strong>Wait for Confirmation:</strong> Don't jump into a trade too early. Wait for a candle to close to confirm a pattern.</li>
                    <li><strong>Manage Your Risk:</strong> In real trading, never risk more than you can afford to lose. Bitswipe lets you practice this mindset safely.</li>
                    <li><strong>Learn from Mistakes:</strong> Analyze your losing trades to understand what went wrong. Was it a false breakout? Did you miss a support level?</li>
                </ol>

                <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Trusted Resources for Learning</h2>
                <p className="mb-4">
                    To further improve your trading skills, we recommend studying from reputable sources. Here are some trusted platforms where you can learn more about technical analysis:
                </p>
                <ul className="list-disc pl-6 mb-8 space-y-2">
                    <li>
                        <a href="https://www.binance.com/en/academy/articles/tags/technical-analysis" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                            <strong>Binance Academy:</strong>
                        </a> Free educational resources on cryptocurrency trading and blockchain technology.
                    </li>
                    <li>
                        <a href="https://www.okx.com/learn" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                            <strong>OKX Learn:</strong>
                        </a> Comprehensive crypto learning platform covering trading basics, technical analysis, and market trends.
                    </li>
                </ul>

                <p className="text-sm text-gray-500 mt-8 italic">
                    Disclaimer: Bitswipe is a simulation game for entertainment and educational purposes only.
                    It does not involve real money trading and does not constitute financial advice.
                </p>
            </div>
        </section>
    );
};
