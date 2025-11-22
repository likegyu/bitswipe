import { CandlestickData, Time } from 'lightweight-charts';

export interface CandleData {
    time: string | number;
    open: number;
    high: number;
    low: number;
    close: number;
}

export type Timeframe = '1m' | '15m' | '1d';

export const TIMEFRAME_CONFIG = {
    '1m': { visible: 60, prediction: 5, file: '/1m_candles.json' },
    '15m': { visible: 50, prediction: 4, file: '/15m_candles.json' },
    '1d': { visible: 40, prediction: 3, file: '/1d_candles.json' },
};

export async function fetchCandleData(timeframe: Timeframe): Promise<CandleData[]> {
    const config = TIMEFRAME_CONFIG[timeframe];
    try {
        const response = await fetch(config.file);
        if (!response.ok) {
            throw new Error(`Failed to fetch data for ${timeframe}`);
        }
        const data = await response.json();

        // Assuming the JSON structure is an array of arrays or objects. 
        // Let's handle a common format: [[time, open, high, low, close], ...] or [{time, open...}, ...]
        // The user didn't specify the exact JSON format, but usually it's OHLCV.
        // I'll assume it's an array of objects matching the interface or similar.
        // If it's raw arrays, I might need to map it. 
        // Let's assume it matches the lightweight-charts requirement or close to it.
        // I'll add a safe mapper.

        return data.map((item: any) => {
            // Handle if time is unix timestamp in ms or s
            // Lightweight charts prefers unix timestamp in seconds for 'Time' type
            let time = item.time || item[0];
            const open = item.open || item[1];
            const high = item.high || item[2];
            const low = item.low || item[3];
            const close = item.close || item[4];

            // Convert to seconds if it looks like milliseconds (roughly > year 2000 in seconds)
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
