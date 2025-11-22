import { create } from 'zustand';
import { CandleData, Timeframe, fetchCandleData, TIMEFRAME_CONFIG } from '@/lib/data';
import { calculateSMA, calculateRSI, calculateBollingerBands } from '@/lib/indicators';

export interface GameSettings {
    leverage: number;
    indicators: {
        rsi: boolean;
        ma: boolean;
        bb: boolean;
    };
    timeframe: Timeframe;
}

export interface RoundResult {
    round: number;
    position: 'long' | 'short';
    win: boolean;
    profitPercent: number;
    entryPrice: number;
    exitPrice: number;
}

interface GameState {
    balance: number;
    initialBalance: number;
    round: number;
    maxRounds: number;
    history: RoundResult[];
    settings: GameSettings;
    status: 'IDLE' | 'PLAYING' | 'REVEALING' | 'RESULT' | 'AD' | 'FINISHED';
    isGameStarted: boolean;

    // Data
    allCandles: CandleData[];
    warmupCandles: CandleData[];
    currentCandles: CandleData[];
    futureCandles: CandleData[]; // Candles to be revealed
    entryPrice: number | null;
    currentPosition: 'long' | 'short' | null;

    // Actions
    setSettings: (settings: Partial<GameSettings>) => void;
    initializeGame: () => Promise<void>;
    placeBet: (position: 'long' | 'short') => void;
    completeRound: () => void;
    nextRound: () => void;
    resetGame: () => void;
    revealNextCandle: () => boolean; // Returns true if more candles to reveal
    skipAd: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
    balance: 1000,
    initialBalance: 1000,
    round: 1,
    maxRounds: 10,
    history: [],
    settings: {
        leverage: 1,
        indicators: {
            rsi: false,
            ma: false,
            bb: false,
        },
        timeframe: '1m',
    },
    status: 'IDLE',
    isGameStarted: false,
    allCandles: [],
    warmupCandles: [],
    currentCandles: [],
    futureCandles: [],
    entryPrice: null,
    currentPosition: null,

    setSettings: (newSettings) =>
        set((state) => ({ settings: { ...state.settings, ...newSettings } })),

    initializeGame: async () => {
        const { settings } = get();
        const allData = await fetchCandleData(settings.timeframe);

        // Randomize start point for the first round? 
        // The user wants 50 rounds. We need enough data.
        // Let's just pick a random start index that allows for 50 rounds * (visible + prediction)
        // For now, let's just load data and set status to PLAYING

        set({
            allCandles: allData,
            status: 'IDLE',
            round: 1,
            history: [],
            balance: 1000,
            isGameStarted: true
        });

        get().nextRound();
    },

    placeBet: (position) => {
        const { currentCandles } = get();
        const entryPrice = currentCandles[currentCandles.length - 1].close;
        set({ status: 'REVEALING', currentPosition: position, entryPrice });
    },

    completeRound: () => {
        const { currentCandles, currentPosition, entryPrice, balance, settings, round, history, initialBalance } = get();

        if (!entryPrice || !currentPosition) return;

        const exitPrice = currentCandles[currentCandles.length - 1].close;
        const priceChange = (exitPrice - entryPrice) / entryPrice;

        let win = false;
        if (currentPosition === 'long' && priceChange > 0) win = true;
        if (currentPosition === 'short' && priceChange < 0) win = true;

        // Calculate profit
        // Simple model: Bet 10% of balance? Or fixed amount?
        // User didn't specify bet amount. Let's assume 100 units or 10% of balance.
        // Let's say we bet 10% of current balance.
        const betAmount = balance * 0.1;
        const leverage = settings.leverage;

        // Profit = Bet * Change * Leverage
        // If win, we add profit. If loss, we subtract.
        // Actually, for binary options style (win/loss), usually it's fixed return.
        // But the user mentioned "profit percent" and "leverage".
        // So let's do PnL based on price movement.

        let pnl = 0;
        if (currentPosition === 'long') {
            pnl = betAmount * priceChange * leverage;
        } else {
            pnl = betAmount * (-priceChange) * leverage;
        }

        const newBalance = balance + pnl;
        const profitPercent = (pnl / betAmount) * 100;
        const result: RoundResult = {
            round,
            position: currentPosition,
            win,
            profitPercent,
            entryPrice,
            exitPrice
        };

        set({
            balance: newBalance,
            history: [...history, result],
            // status: 'IDLE' // Don't reset status here, let the UI handle the transition
        });
    },

    nextRound: () => {
        const { allCandles, round, settings, maxRounds, history } = get();

        // If we have history, it means we just finished a round, so increment
        const nextRoundNum = history.length + 1;

        if (nextRoundNum > maxRounds) {
            set({ status: 'FINISHED' });
            return;
        }

        // Logic to pick a slice of candles for this round
        // This is a simplified logic. In a real app, we'd track the current index in allCandles.
        // Let's assume we pick random segments or sequential segments.
        // Sequential is better for "simulation".
        // Let's start from a random point and move forward? Or just random points?
        // Random points are better for "training" so you don't memorize the chart.

        const config = TIMEFRAME_CONFIG[settings.timeframe];
        const totalNeeded = config.visible + config.prediction;
        const warmupNeeded = 50; // Enough for BB (20) + RSI (14)

        // Ensure we have enough data
        if (allCandles.length < totalNeeded + warmupNeeded) return;

        const maxStartIndex = allCandles.length - (totalNeeded + warmupNeeded);
        const startIndex = Math.floor(Math.random() * maxStartIndex);

        const warmupSlice = allCandles.slice(startIndex, startIndex + warmupNeeded);
        const visibleSlice = allCandles.slice(startIndex + warmupNeeded, startIndex + warmupNeeded + config.visible);
        const futureSlice = allCandles.slice(startIndex + warmupNeeded + config.visible, startIndex + warmupNeeded + totalNeeded);

        set({
            warmupCandles: warmupSlice,
            currentCandles: visibleSlice,
            futureCandles: futureSlice,
            status: 'PLAYING',
            round: nextRoundNum,
            currentPosition: null,
            entryPrice: null
        });
    },

    revealNextCandle: () => {
        const { currentCandles, futureCandles, status } = get();
        if (status !== 'REVEALING') return false;

        if (futureCandles.length === 0) {
            // End of round logic should be triggered here or by the component
            return false;
        }

        const nextCandle = futureCandles[0];
        const remainingFuture = futureCandles.slice(1);

        set({
            currentCandles: [...currentCandles, nextCandle],
            futureCandles: remainingFuture,
        });

        return remainingFuture.length > 0;
    },

    resetGame: () => {
        set({
            balance: 1000,
            round: 1,
            history: [],
            status: 'IDLE',
            isGameStarted: false
        });
    },

    skipAd: () => {
        set({ status: 'PLAYING' });
        get().nextRound();
    }
}));
