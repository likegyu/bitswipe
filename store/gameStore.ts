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
    maxRounds: number;
}

export interface RoundResult {
    round: number;
    position: 'long' | 'short' | 'hold';
    win: boolean | null; // null for hold position
    profitPercent: number;
    entryPrice: number;
    exitPrice: number;
    indicators?: {
        rsi: number;
        maTrend: 'up' | 'down' | 'flat';
        bbPosition: 'upper' | 'lower' | 'middle' | 'none';
    };
}

export interface ChartState {
    id: string;
    candles: CandleData[]; // Visible candles
    warmupCandles: CandleData[];
    futureCandles: CandleData[]; // Candles to be revealed
    entryPrice: number | null;
    currentPosition: 'long' | 'short' | 'hold' | null;
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
    isLoading: boolean;

    // Data
    allCandles: CandleData[];

    // Dual Chart System
    frontChart: ChartState | null;
    backChart: ChartState | null;

    // Analysis Context
    currentBetContext: {
        rsi: number;
        maTrend: 'up' | 'down' | 'flat';
        bbPosition: 'upper' | 'lower' | 'middle' | 'none';
    } | null;

    // Actions
    setSettings: (settings: Partial<GameSettings>) => void;
    initializeGame: () => Promise<void>;
    placeBet: (position: 'long' | 'short' | 'hold') => void;
    completeRound: () => void;
    nextRound: () => void;
    resetGame: () => void;
    revealNextCandle: () => boolean; // Returns true if more candles to reveal
    skipAd: () => void;
}

const generateChartData = (allCandles: CandleData[], timeframe: Timeframe): ChartState | null => {
    const config = TIMEFRAME_CONFIG[timeframe];
    const totalNeeded = config.visible + config.prediction;
    const warmupNeeded = 50;

    if (allCandles.length < totalNeeded + warmupNeeded) return null;

    const maxStartIndex = allCandles.length - (totalNeeded + warmupNeeded);
    const startIndex = Math.floor(Math.random() * maxStartIndex);

    const warmupSlice = allCandles.slice(startIndex, startIndex + warmupNeeded);
    const visibleSlice = allCandles.slice(startIndex + warmupNeeded, startIndex + warmupNeeded + config.visible);
    const futureSlice = allCandles.slice(startIndex + warmupNeeded + config.visible, startIndex + warmupNeeded + totalNeeded);

    return {
        id: Math.random().toString(36).substring(7),
        candles: visibleSlice,
        warmupCandles: warmupSlice,
        futureCandles: futureSlice,
        entryPrice: null,
        currentPosition: null,
    };
};

export const useGameStore = create<GameState>((set, get) => ({
    balance: 1000,
    initialBalance: 1000,
    round: 1,
    maxRounds: 25,
    history: [],
    settings: {
        leverage: 1,
        indicators: {
            rsi: false,
            ma: false,
            bb: false,
        },
        timeframe: '1m',
        maxRounds: 25,
    },
    status: 'IDLE',
    isGameStarted: false,
    isLoading: false,
    allCandles: [],

    frontChart: null,
    backChart: null,
    currentBetContext: null,

    setSettings: (newSettings) =>
        set((state) => ({ settings: { ...state.settings, ...newSettings } })),

    initializeGame: async () => {
        set({ isLoading: true });

        try {
            const { settings } = get();
            const allData = await fetchCandleData(settings.timeframe);

            const frontChart = generateChartData(allData, settings.timeframe);
            const backChart = generateChartData(allData, settings.timeframe);

            set({
                allCandles: allData,
                status: 'IDLE',
                round: 1,
                maxRounds: settings.maxRounds,
                history: [],
                balance: 1000,
                isGameStarted: true,
                isLoading: false,
                frontChart,
                backChart,
                currentBetContext: null,
            });

            // Start the game immediately
            set({ status: 'PLAYING' });
        } catch (error) {
            console.error('Failed to initialize game:', error);
            set({ isLoading: false });
        }
    },

    placeBet: (position) => {
        const { frontChart, status } = get();
        if (status !== 'PLAYING' || !frontChart) return;

        const entryPrice = frontChart.candles[frontChart.candles.length - 1].close;

        // Calculate Indicators for Analysis
        const fullData = [...frontChart.warmupCandles, ...frontChart.candles];

        // RSI
        const rsiData = calculateRSI(fullData, 14);
        const currentRSI = rsiData.length > 0 ? rsiData[rsiData.length - 1].value : 50;

        // MA Trend
        const maData = calculateSMA(fullData, 20);
        let maTrend: 'up' | 'down' | 'flat' = 'flat';
        if (maData.length >= 2) {
            const currentMA = maData[maData.length - 1].value;
            const prevMA = maData[maData.length - 2].value;
            if (currentMA > prevMA) maTrend = 'up';
            else if (currentMA < prevMA) maTrend = 'down';
        }

        // BB Position
        const bbData = calculateBollingerBands(fullData, 20, 2);
        let bbPosition: 'upper' | 'lower' | 'middle' | 'none' = 'none';
        if (bbData.length > 0) {
            const currentBB = bbData[bbData.length - 1];
            const close = fullData[fullData.length - 1].close;
            const range = currentBB.upper - currentBB.lower;
            const threshold = range * 0.1; // 10% threshold

            if (Math.abs(close - currentBB.upper) < threshold || close > currentBB.upper) bbPosition = 'upper';
            else if (Math.abs(close - currentBB.lower) < threshold || close < currentBB.lower) bbPosition = 'lower';
            else if (Math.abs(close - currentBB.middle) < threshold) bbPosition = 'middle';
        }

        set({
            status: 'REVEALING',
            frontChart: {
                ...frontChart,
                currentPosition: position,
                entryPrice
            },
            currentBetContext: {
                rsi: currentRSI,
                maTrend,
                bbPosition
            }
        });
    },

    completeRound: () => {
        const { frontChart, balance, settings, round, history, currentBetContext } = get();

        if (!frontChart || !frontChart.entryPrice || !frontChart.currentPosition) return;

        const exitPrice = frontChart.candles[frontChart.candles.length - 1].close;
        const priceChange = (exitPrice - frontChart.entryPrice) / frontChart.entryPrice;
        const currentPosition = frontChart.currentPosition;

        // Handle hold position
        if (currentPosition === 'hold') {
            const result: RoundResult = {
                round,
                position: 'hold',
                win: null,
                profitPercent: 0,
                entryPrice: frontChart.entryPrice,
                exitPrice,
                indicators: currentBetContext || undefined
            };

            set({
                history: [...history, result],
                currentBetContext: null
            });
            return;
        }

        let win = false;
        if (currentPosition === 'long' && priceChange > 0) win = true;
        if (currentPosition === 'short' && priceChange < 0) win = true;

        const betAmount = balance * 0.1;
        const leverage = settings.leverage;

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
            entryPrice: frontChart.entryPrice,
            exitPrice,
            indicators: currentBetContext || undefined
        };

        set({
            balance: newBalance,
            history: [...history, result],
            currentBetContext: null
        });
    },

    nextRound: () => {
        const { allCandles, backChart, round, maxRounds, settings, history } = get();

        const nextRoundNum = history.length + 1;

        if (nextRoundNum > maxRounds) {
            if (typeof window !== 'undefined' && (window as any).dataLayer) {
                (window as any).dataLayer.push({
                    event: 'game_complete',
                    rounds: maxRounds,
                    timeframe: settings.timeframe
                });
            }

            set({
                status: 'FINISHED',
                frontChart: null,
                backChart: null
            });
            return;
        }

        // Move back chart to front
        const newFrontChart = backChart;

        // Generate new back chart (unless it's the last round)
        let newBackChart: ChartState | null = null;
        if (nextRoundNum < maxRounds) {
            newBackChart = generateChartData(allCandles, settings.timeframe);
        }

        // Show Ad based on maxRounds
        let showAd = false;
        if (maxRounds === 10) {
            if (nextRoundNum === 4 || nextRoundNum === 8) showAd = true;
        } else if (maxRounds === 25) {
            if (nextRoundNum === 7 || nextRoundNum === 13 || nextRoundNum === 19) showAd = true;
        } else if (maxRounds === 50) {
            if (nextRoundNum === 9 || nextRoundNum === 17 || nextRoundNum === 25 || nextRoundNum === 33 || nextRoundNum === 41) showAd = true;
        }

        set({
            frontChart: newFrontChart,
            backChart: newBackChart,
            status: showAd ? 'AD' : 'PLAYING',
            round: nextRoundNum,
        });
    },

    revealNextCandle: () => {
        const { frontChart, status } = get();
        if (status !== 'REVEALING' || !frontChart) return false;

        if (frontChart.futureCandles.length === 0) {
            return false;
        }

        const nextCandle = frontChart.futureCandles[0];
        const remainingFuture = frontChart.futureCandles.slice(1);

        set({
            frontChart: {
                ...frontChart,
                candles: [...frontChart.candles, nextCandle],
                futureCandles: remainingFuture,
            }
        });

        return remainingFuture.length > 0;
    },

    resetGame: () => {
        set({
            balance: 1000,
            round: 1,
            history: [],
            status: 'IDLE',
            isGameStarted: false,
            frontChart: null,
            backChart: null,
        });
    },

    skipAd: () => {
        set({ status: 'PLAYING' });
    }
}));
