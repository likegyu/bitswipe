import { CandlestickData, Time } from 'lightweight-charts';

export interface CandleData {
    time: string | number;
    open: number;
    high: number;
    low: number;
    close: number;
}

export type Timeframe = '1m' | '5m' | '15m' | '30m' | '1h' | '1d';

export const TIMEFRAME_CONFIG = {
    '1m': { visible: 120, prediction: 5 },  // 2 hours context
    '5m': { visible: 100, prediction: 5 },  // ~8 hours context
    '15m': { visible: 96, prediction: 5 },  // 24 hours context (1 day)
    '30m': { visible: 96, prediction: 5 },  // 48 hours context (2 days)
    '1h': { visible: 120, prediction: 5 },  // 5 days context (1 trading week)
    '1d': { visible: 90, prediction: 5 },   // ~3 months context (1 quarter)
};

export async function fetchCandleData(timeframe: Timeframe): Promise<CandleData[]> {
    try {
        const response = await fetch(`/api/candles?timeframe=${timeframe}&limit=2000`);
        if (!response.ok) {
            throw new Error(`Failed to fetch data for ${timeframe}`);
        }
        const data = await response.json();

        return data.map((item: any) => {
            let time = item.time || item[0];
            const open = item.open || item[1];
            const high = item.high || item[2];
            const low = item.low || item[3];
            const close = item.close || item[4];

            if (typeof time === 'number' && time > 2000000000) {
                time = time / 1000;
            }

            return {
                time: time as Time,
                open: Number(open),
                high: Number(high),
                low: Number(low),
                close: Number(close),
            };
        });
    } catch (error) {
        console.error("Error fetching candle data:", error);
        return [];
    }
}
