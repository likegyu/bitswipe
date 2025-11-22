import { CandleData } from './data';

export function calculateSMA(data: CandleData[], period: number): { time: string | number; value: number }[] {
    const smaData = [];
    for (let i = period - 1; i < data.length; i++) {
        const slice = data.slice(i - period + 1, i + 1);
        const sum = slice.reduce((acc, candle) => acc + candle.close, 0);
        smaData.push({
            time: data[i].time,
            value: sum / period,
        });
    }
    return smaData;
}

export function calculateRSI(data: CandleData[], period: number = 14): { time: string | number; value: number }[] {
    const rsiData = [];
    if (data.length <= period) return [];

    let gains = 0;
    let losses = 0;

    // Initial calculation
    for (let i = 1; i <= period; i++) {
        const change = data[i].close - data[i - 1].close;
        if (change > 0) gains += change;
        else losses -= change;
    }

    let avgGain = gains / period;
    let avgLoss = losses / period;

    for (let i = period + 1; i < data.length; i++) {
        const change = data[i].close - data[i - 1].close;
        let gain = change > 0 ? change : 0;
        let loss = change < 0 ? -change : 0;

        avgGain = (avgGain * (period - 1) + gain) / period;
        avgLoss = (avgLoss * (period - 1) + loss) / period;

        const rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
        const rsi = 100 - (100 / (1 + rs));

        rsiData.push({
            time: data[i].time,
            value: rsi,
        });
    }
    return rsiData;
}

export function calculateBollingerBands(data: CandleData[], period: number = 20, multiplier: number = 2) {
    const bbData = [];
    for (let i = period - 1; i < data.length; i++) {
        const slice = data.slice(i - period + 1, i + 1);
        const sum = slice.reduce((acc, candle) => acc + candle.close, 0);
        const sma = sum / period;

        const squaredDiffs = slice.map(candle => Math.pow(candle.close - sma, 2));
        const variance = squaredDiffs.reduce((acc, val) => acc + val, 0) / period;
        const stdDev = Math.sqrt(variance);

        bbData.push({
            time: data[i].time,
            upper: sma + multiplier * stdDev,
            lower: sma - multiplier * stdDev,
            middle: sma,
        });
    }
    return bbData;
}
