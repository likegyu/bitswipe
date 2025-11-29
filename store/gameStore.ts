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
    betAmount: number; // Actual bet amount for this round
    actualPnL: number; // Actual profit/loss in dollars
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
    isRankingRegistered: boolean;

    isPositionOpen: boolean;
    candlesSinceEntry: number;
    autoCloseLimit: number;

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
    setRankingRegistered: (registered: boolean) => void;
    initializeGame: () => Promise<void>;
    placeBet: (position: 'long' | 'short' | 'hold') => void;
    closePosition: () => void;
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
    isRankingRegistered: false,
    isPositionOpen: false,
    candlesSinceEntry: 0,
    autoCloseLimit: 30,
    allCandles: [],

    frontChart: null,
    backChart: null,
    currentBetContext: null,

    setSettings: (newSettings) =>
        set((state) => ({ settings: { ...state.settings, ...newSettings } })),

    setRankingRegistered: (registered) => set({ isRankingRegistered: registered }),

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
                isPositionOpen: false,
                candlesSinceEntry: 0,
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

        // Check for HOLD
        if (position === 'hold') {
            const result: RoundResult = {
                round: get().round,
                position: 'hold',
                win: null,
                profitPercent: 0,
                entryPrice: entryPrice,
                exitPrice: entryPrice,
                betAmount: 0,
                actualPnL: 0,
                indicators: {
                    rsi: currentRSI,
                    maTrend,
                    bbPosition
                }
            };

            set({
                history: [...get().history, result],
                currentBetContext: null,
                status: 'RESULT', // Briefly show revealing state or skip directly
            });

            // For HOLD, we just skip to next round (or show result briefly)
            // Let's reuse completeRound logic but adapted
            return;
        }

        set({
            status: 'REVEALING',
            isPositionOpen: true,
            candlesSinceEntry: 0,
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

    closePosition: () => {
        const { isPositionOpen } = get();
        if (!isPositionOpen) return;

        set({ isPositionOpen: false });
        get().completeRound();
    },

    completeRound: () => {
        const { frontChart, balance, settings, round, history, currentBetContext } = get();

        if (!frontChart || !frontChart.entryPrice || !frontChart.currentPosition) return;

        const exitPrice = frontChart.candles[frontChart.candles.length - 1].close;
        const priceChange = (exitPrice - frontChart.entryPrice) / frontChart.entryPrice;
        const currentPosition = frontChart.currentPosition;

        // Handle hold position
        if (currentPosition === 'hold') {
            // Already handled in placeBet for HOLD, but safety check
            // Logic moved to placeBet for immediate resolution or keep here if we want animation
            // If we want animation for hold, we need to decide what to show. 
            // For now, let's assume HOLD resolves immediately without chart revealing.
            // But if we are here, it means completeRound was called.

            // If we want to show "Skipped" effect, we can just proceed.
        }

        let win = false;
        if (currentPosition === 'long' && priceChange > 0) win = true;
        if (currentPosition === 'short' && priceChange < 0) win = true;

        const betAmount = balance * 1.0; // Bet entire balance (All-in)
        const leverage = settings.leverage;

        let pnl = 0;
        let isLiquidated = false;

        if (currentPosition === 'long') {
            pnl = betAmount * priceChange * leverage;
        } else {
            pnl = betAmount * (-priceChange) * leverage;
        }

        // Check for Liquidation (Loss >= 100% of margin)
        const liquidationThreshold = -betAmount;

        if (pnl <= liquidationThreshold) {
            pnl = -betAmount; // Cap loss at bet amount
            isLiquidated = true;
        }

        const newBalance = balance + pnl;
        const profitPercent = (pnl / betAmount) * 100;

        const result: RoundResult = {
            round,
            position: currentPosition,
            win: isLiquidated ? false : win, // Liquidated is always a loss
            profitPercent,
            entryPrice: frontChart.entryPrice,
            exitPrice,
            betAmount,
            actualPnL: pnl,
            indicators: currentBetContext || undefined
        };

        // If liquidated, end the game immediately
        if (isLiquidated) {
            if (typeof window !== 'undefined' && (window as any).dataLayer) {
                (window as any).dataLayer.push({
                    event: 'game_complete',
                    rounds: round, // Ended at current round
                    timeframe: settings.timeframe,
                    reason: 'liquidation'
                });
            }

            set({
                balance: newBalance,
                history: [...history, result],
                currentBetContext: null,
                status: 'FINISHED', // Game Over
                frontChart: null,
                backChart: null
            });
            return;
        }

        set({
            balance: newBalance,
            history: [...history, result],
            currentBetContext: null,
            status: 'RESULT', // 👈 라운드 결과를 보여주는 상태로 변경
            isPositionOpen: false, // 👈 포지션 닫기
            candlesSinceEntry: 0,
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

        // Show Ad based on maxRounds (Reduced frequency)
        let showAd = false;
        if (maxRounds === 10) {
            if (nextRoundNum === 5) showAd = true;
        } else if (maxRounds === 25) {
            if (nextRoundNum === 10 || nextRoundNum === 20) showAd = true;
        } else if (maxRounds === 50) {
            if (nextRoundNum === 15 || nextRoundNum === 30 || nextRoundNum === 45) showAd = true;
        }

        set({
            frontChart: newFrontChart,
            backChart: newBackChart,
            status: showAd ? 'AD' : 'PLAYING',
            round: nextRoundNum,
        });
    },

    revealNextCandle: () => {
        // 💡 수정: 필요한 상태 변수를 get()을 통해 가져옵니다.
        const { frontChart, status, isPositionOpen, candlesSinceEntry, autoCloseLimit, balance, settings } = get();

        // If position is closed (manually), stop revealing immediately
        if (!isPositionOpen) return false;

        if (status !== 'REVEALING' || !frontChart) return false;

        // If no future candles left, end round (shouldn't happen with correct config)
        if (frontChart.futureCandles.length === 0) {
            get().completeRound();
            return false;
        }

        const nextCandle = frontChart.futureCandles[0];
        const newVisible = [...frontChart.candles, nextCandle];
        const newFuture = frontChart.futureCandles.slice(1);

        // Update chart state
        set({
            frontChart: {
                ...frontChart,
                candles: newVisible,
                futureCandles: newFuture,
            },
            candlesSinceEntry: candlesSinceEntry + 1
        });

        // ----------------------------------------------------
        // 💡 실시간 청산 체크 로직 (수정된 로직)
        // ----------------------------------------------------
        const entryPrice = frontChart.entryPrice;
        const currentPosition = frontChart.currentPosition;
        // const leverage = settings.leverage; // settings는 이미 구조분해되어 있으므로 바로 사용 가능
        const betAmount = balance * 1.0;

        // 포지션 진입 가격이 없거나 포지션이 'hold'라면 체크할 필요 없음
        if (entryPrice !== null && currentPosition !== 'hold') {
            const currentPrice = nextCandle.close; // 방금 추가된 캔들의 종가
            const priceChange = (currentPrice - entryPrice) / entryPrice;

            let currentPnl = 0;

            if (currentPosition === 'long') {
                currentPnl = betAmount * priceChange * settings.leverage; // 💡 settings.leverage 사용
            } else {
                currentPnl = betAmount * (-priceChange) * settings.leverage; // 💡 settings.leverage 사용
            }

            // 청산 임계점: 손실액이 마진(betAmount)의 100%와 같거나 커지는 시점
            const liquidationThreshold = -betAmount;

            if (currentPnl <= liquidationThreshold) {

                // 💡 청산 발생! 즉시 게임 종료 처리

                // 1. isPositionOpen을 false로 설정 (리빌링 루프 중지)
                set({ isPositionOpen: false });

                // 2. completeRound 호출 (청산은 completeRound 내에서 FINISHED 상태로 처리됨)
                // 이 시점의 currentPrice를 이용하여 completeRound가 최종 PnL을 계산하게 됩니다.
                get().completeRound();

                // 3. 리빌링 루프 즉시 종료
                return false;
            }
        }
        // ----------------------------------------------------

        // Auto-close if limit reached
        if (candlesSinceEntry + 1 >= autoCloseLimit) {
            get().closePosition();
            return false;
        }

        return true;
    },

    resetGame: () => {
        if (typeof window !== 'undefined') {
            sessionStorage.removeItem('isRankingRegistered');
        }
        set({
            balance: 1000,
            round: 1,
            history: [],
            status: 'IDLE',
            isGameStarted: false,
            isRankingRegistered: false,
            frontChart: null,
            backChart: null,
        });
    },

    skipAd: () => {
        set({ status: 'PLAYING' });
    }
}));
