import React from 'react';

export const SEOContent = () => {
    return (
        <section className="w-full max-w-4xl mx-auto px-4 py-12 text-gray-600 dark:text-gray-300">
            <div className="prose prose-sm sm:prose lg:prose-lg dark:prose-invert mx-auto">

                <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">What is Bitswipe?</h2>
                <p className="mb-6">
                    Bitswipe is an interactive Bitcoin trading simulation game designed to help you master the art of reading cryptocurrency charts.
                    Without risking real money, you can practice predicting price movements based on historical Bitcoin market data.
                    Whether you are a beginner looking to understand market trends or an experienced trader testing your intuition,
                    Bitswipe offers a risk-free environment to sharpen your skills.
                </p>

                <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">How to Play</h2>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li><strong>Analyze the Chart:</strong> Review the historical candlestick chart displayed on the card. Look for patterns, trends, and indicators.</li>
                    <li><strong>Make a Prediction:</strong> Decide if the price will go up (Long), down (Short), or stay sideways (Hold).</li>
                    <li><strong>Swipe to Trade:</strong> Swipe right to go Long, left to go Short, or up to Hold.</li>
                    <li><strong>Check Your Results:</strong> Instantly see if your prediction was correct based on the next set of candles.</li>
                    <li><strong>Track Your Progress:</strong> Monitor your win rate and virtual profit to see how your trading skills improve over time.</li>
                </ul>

                <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Understanding Candlestick Charts</h2>
                <p className="mb-4">
                    Candlestick charts are a fundamental tool for traders. Each "candle" represents the price movement of an asset during a specific time period.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <h3 className="font-bold mb-2">Green Candle (Bullish)</h3>
                        <p className="text-sm">
                            Indicates the price closed higher than it opened. The bottom of the body is the opening price, and the top is the closing price.
                        </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <h3 className="font-bold mb-2">Red Candle (Bearish)</h3>
                        <p className="text-sm">
                            Indicates the price closed lower than it opened. The top of the body is the opening price, and the bottom is the closing price.
                        </p>
                    </div>
                </div>

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

                <p className="text-sm text-gray-500 mt-8 italic">
                    Disclaimer: Bitswipe is a simulation game for entertainment and educational purposes only.
                    It does not involve real money trading and does not constitute financial advice.
                </p>
            </div>
        </section>
    );
};
