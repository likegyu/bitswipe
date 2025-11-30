import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Simple in-memory cache
const CACHE: Record<string, any[]> = {};

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const timeframe = searchParams.get('timeframe');
    const limit = parseInt(searchParams.get('limit') || '300');

    if (!timeframe) {
        return NextResponse.json({ error: 'Timeframe is required' }, { status: 400 });
    }

    const dataDir = path.join(process.cwd(), 'public', 'data');
    const metadataPath = path.join(dataDir, 'metadata.json');

    if (!fs.existsSync(metadataPath)) {
        return NextResponse.json({ error: 'Metadata not found' }, { status: 404 });
    }

    try {
        const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));
        const timeframeData = metadata[timeframe];

        if (!timeframeData || !timeframeData.files || timeframeData.files.length === 0) {
            return NextResponse.json({ error: `No data found for timeframe ${timeframe}` }, { status: 404 });
        }

        // Select a random file (year)
        const randomFile = timeframeData.files[Math.floor(Math.random() * timeframeData.files.length)];
        const cacheKey = `${timeframe}-${randomFile}`;

        let candles: any[] = [];

        // Check cache first
        if (CACHE[cacheKey]) {
            candles = CACHE[cacheKey];
        } else {
            // Read from file if not in cache
            const filePath = path.join(dataDir, randomFile);

            if (!fs.existsSync(filePath)) {
                return NextResponse.json({ error: 'Data file not found' }, { status: 404 });
            }

            const fileContent = fs.readFileSync(filePath, 'utf-8');
            candles = JSON.parse(fileContent);

            // Store in cache
            CACHE[cacheKey] = candles;
        }

        if (candles.length <= limit) {
            return NextResponse.json(candles);
        }

        // Select a random slice
        const maxStartIndex = candles.length - limit;
        const startIndex = Math.floor(Math.random() * maxStartIndex);
        const slice = candles.slice(startIndex, startIndex + limit);

        return NextResponse.json(slice);

    } catch (error) {
        console.error('Error serving candles:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
