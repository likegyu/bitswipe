'use client';

import React, { useEffect, useRef } from 'react';
import { createChart, ColorType, IChartApi, ISeriesApi, Time, CandlestickSeries, LineSeries, IPriceLine } from 'lightweight-charts';
import { useTheme } from 'next-themes';
import { CandleData } from '@/lib/data';
import { calculateSMA, calculateBollingerBands, calculateRSI } from '@/lib/indicators';
import { GameSettings } from '@/store/gameStore';

interface TradingChartProps {
    candles: CandleData[];
    warmupCandles: CandleData[];
    entryPrice: number | null;
    settings: GameSettings;
    height?: string;
}

export const TradingChartBase = ({ candles, warmupCandles, entryPrice, settings, height = '100%' }: TradingChartProps) => {
    const { resolvedTheme } = useTheme();
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const rsiContainerRef = useRef<HTMLDivElement>(null);

    const chartRef = useRef<IChartApi | null>(null);
    const rsiChartRef = useRef<IChartApi | null>(null);

    const candleSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
    const maSeriesRef = useRef<ISeriesApi<"Line"> | null>(null);
    const bbUpperRef = useRef<ISeriesApi<"Line"> | null>(null);
    const bbLowerRef = useRef<ISeriesApi<"Line"> | null>(null);
    const rsiSeriesRef = useRef<ISeriesApi<"Line"> | null>(null);
    const entryLineRef = useRef<IPriceLine | null>(null);

    // Main Chart Initialization
    useEffect(() => {
        if (!chartContainerRef.current) return;

        const isDark = resolvedTheme === 'dark';
        const textColor = isDark ? '#d1d5db' : '#4a4a4a';
        const gridColor = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(197, 203, 206, 0.1)';

        const chart = createChart(chartContainerRef.current, {
            layout: {
                background: { type: ColorType.Solid, color: 'transparent' },
                textColor: textColor,
            },
            grid: {
                vertLines: { color: gridColor },
                horzLines: { color: gridColor },
            },
            width: chartContainerRef.current.clientWidth,
            height: chartContainerRef.current.clientHeight,
            timeScale: {
                visible: false, // Hide time axis
                timeVisible: true,
                secondsVisible: false,
                rightOffset: 0,
                fixLeftEdge: true,
            },
            rightPriceScale: {
                scaleMargins: {
                    top: 0.1,
                    bottom: 0.1,
                },
                minimumWidth: 85,
            },
            handleScale: false,
            handleScroll: false,
            crosshair: {
                vertLine: { visible: false },
                horzLine: { visible: false },
            },
        });

        const candleSeries = (chart as any).addSeries(CandlestickSeries, {
            upColor: '#88d8b0',
            downColor: '#ff6b6b',
            borderVisible: false,
            wickUpColor: '#88d8b0',
            wickDownColor: '#ff6b6b',
        });

        chartRef.current = chart;
        candleSeriesRef.current = candleSeries;

        // Indicators
        if (settings.indicators.ma) {
            maSeriesRef.current = (chart as any).addSeries(LineSeries, { color: '#ffd68a', lineWidth: 2 });
        }
        if (settings.indicators.bb) {
            // Purple color for BB
            bbUpperRef.current = (chart as any).addSeries(LineSeries, { color: '#9370db', lineWidth: 1 });
            bbLowerRef.current = (chart as any).addSeries(LineSeries, { color: '#9370db', lineWidth: 1 });
        }

        const handleResize = () => {
            if (chartContainerRef.current) {
                chart.applyOptions({ width: chartContainerRef.current.clientWidth, height: chartContainerRef.current.clientHeight });
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            chart.remove();
        };
    }, [settings.indicators.ma, settings.indicators.bb, resolvedTheme]);

    // Handle Resize when RSI Toggles
    useEffect(() => {
        if (chartRef.current && chartContainerRef.current) {
            chartRef.current.applyOptions({
                width: chartContainerRef.current.clientWidth,
                height: chartContainerRef.current.clientHeight
            });
            chartRef.current.timeScale().fitContent();
        }
    }, [settings.indicators.rsi]);

    // RSI Chart Initialization
    useEffect(() => {
        if (!settings.indicators.rsi || !rsiContainerRef.current) return;

        const isDark = resolvedTheme === 'dark';
        const textColor = isDark ? '#d1d5db' : '#4a4a4a';
        const gridColor = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(197, 203, 206, 0.1)';

        const chart = createChart(rsiContainerRef.current, {
            layout: {
                background: { type: ColorType.Solid, color: 'transparent' },
                textColor: textColor,
            },
            grid: {
                vertLines: { color: gridColor },
                horzLines: { color: gridColor },
            },
            width: rsiContainerRef.current.clientWidth,
            height: rsiContainerRef.current.clientHeight,
            timeScale: {
                visible: false,
                rightOffset: 0,
                fixLeftEdge: true,
            },
            rightPriceScale: {
                scaleMargins: {
                    top: 0.1,
                    bottom: 0.1,
                },
                minimumWidth: 85,
            },
            handleScale: false,
            handleScroll: false,
            crosshair: {
                vertLine: { visible: false },
                horzLine: { visible: false },
            },
        });

        const rsiSeries = (chart as any).addSeries(LineSeries, {
            color: '#a3d9c9',
            lineWidth: 2,
        });

        rsiSeries.createPriceLine({
            price: 70,
            color: '#ff6b6b',
            lineWidth: 1,
            lineStyle: 2,
            axisLabelVisible: false,
        });
        rsiSeries.createPriceLine({
            price: 30,
            color: '#88d8b0',
            lineWidth: 1,
            lineStyle: 2,
            axisLabelVisible: false,
        });

        rsiChartRef.current = chart;
        rsiSeriesRef.current = rsiSeries;

        const handleResize = () => {
            if (rsiContainerRef.current) {
                chart.applyOptions({ width: rsiContainerRef.current.clientWidth, height: rsiContainerRef.current.clientHeight });
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            chart.remove();
        };
    }, [settings.indicators.rsi, resolvedTheme]);

    // Entry Price Line
    useEffect(() => {
        if (!candleSeriesRef.current) return;

        // Remove existing line if any
        if (entryLineRef.current) {
            candleSeriesRef.current.removePriceLine(entryLineRef.current);
            entryLineRef.current = null;
        }

        // Add new line if entry price exists
        if (entryPrice !== null) {
            entryLineRef.current = candleSeriesRef.current.createPriceLine({
                price: entryPrice,
                color: '#5692f3ff', // Blue color
                lineWidth: 1,
                lineStyle: 2, // Dashed
                axisLabelVisible: true,
                title: 'ENTRY',
            });
        }
    }, [entryPrice]);

    // Data Update
    useEffect(() => {
        if (!candleSeriesRef.current || candles.length === 0) return;

        // Combine warmup and current for calculation
        const fullData = [...warmupCandles, ...candles];

        // Update Main Chart
        candleSeriesRef.current.setData(candles as any);

        if (settings.indicators.ma && maSeriesRef.current) {
            const smaData = calculateSMA(fullData, 20);
            // Filter to show only current visible range
            const visibleSma = smaData.filter(d => candles.some(c => c.time === d.time));
            maSeriesRef.current.setData(visibleSma as any);
        }

        if (settings.indicators.bb && bbUpperRef.current && bbLowerRef.current) {
            const bbData = calculateBollingerBands(fullData);
            const visibleBb = bbData.filter(d => candles.some(c => c.time === d.time));
            bbUpperRef.current.setData(visibleBb.map(d => ({ time: d.time, value: d.upper })) as any);
            bbLowerRef.current.setData(visibleBb.map(d => ({ time: d.time, value: d.lower })) as any);
        }

        if (chartRef.current) {
            chartRef.current.timeScale().fitContent();
        }

        // Update RSI Chart
        if (settings.indicators.rsi && rsiSeriesRef.current && rsiChartRef.current) {
            const rsiData = calculateRSI(fullData, 14);
            const visibleRsi = rsiData.filter(d => candles.some(c => c.time === d.time));
            rsiSeriesRef.current.setData(visibleRsi as any);
            rsiChartRef.current.timeScale().fitContent();

            // Set visible price range to 20-80 for RSI
            rsiSeriesRef.current.applyOptions({
                autoscaleInfoProvider: () => ({
                    priceRange: {
                        minValue: 20,
                        maxValue: 80,
                    },
                }),
            });
        }

    }, [candles, warmupCandles, settings.indicators]);

    return (
        <div className="w-full h-full flex flex-col relative pointer-events-none">
            {/* Chart Info Overlay */}
            <div className="absolute top-4 left-4 z-10 pointer-events-none">
                <div className="flex items-center gap-2">
                    <h1 className="text-sm font-bold text-gray-800 dark:text-gray-200">BTCUSDT</h1>
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">
                        {settings.timeframe === '1d' ? '1D' : settings.timeframe.toUpperCase()}
                    </span>
                </div>
            </div>

            <div ref={chartContainerRef} className={`w-full ${settings.indicators.rsi ? 'h-[70%]' : 'h-full'}`} />

            {settings.indicators.rsi && (
                <div className="w-full h-[30%] border-t border-gray-100 dark:border-gray-800 pt-1 mt-1">
                    <div ref={rsiContainerRef} className="w-full h-full" />
                </div>
            )}
        </div>
    );
};

export const TradingChart = React.memo(TradingChartBase);
