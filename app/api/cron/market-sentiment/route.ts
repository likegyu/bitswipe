import { NextResponse } from 'next/server';
import { getBitcoinMarketSentiment } from '@/lib/gemini';
import { supabase, supabaseAdmin } from '@/lib/supabaseClient';

export const maxDuration = 60; // Allow 60 seconds for the function to run (Gemini + DB)

export async function GET(request: Request) {
    // Check for authorization if needed (e.g., a secret query param for the cron job)
    // For simplicity, we'll allow it to be called publicly or check for a CRON_SECRET header if Vercel Cron is used.
    const authHeader = request.headers.get('authorization');
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        // return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        // For now, let's keep it open or check a query param for testing
    }

    try {
        console.log("Starting market sentiment update...");
        const sentimentData = await getBitcoinMarketSentiment();
        console.log("Received sentiment data:", sentimentData);

        // Use Korea Time (UTC+9) for the date
        const now = new Date();
        const koreaTime = new Date(now.getTime() + (9 * 60 * 60 * 1000)); // Add 9 hours
        const today = koreaTime.toISOString().split('T')[0]; // YYYY-MM-DD in Korea Time

        // Check time range: Between 00:00 and 06:00 KST
        const koreaHour = koreaTime.getHours();
        if (koreaHour < 0 || koreaHour >= 6) {
            console.log("Outside of allowed update hours (00:00 - 06:00 KST). Exiting.");
            return NextResponse.json({ error: 'Outside of allowed update hours (00:00 - 06:00 KST).' }, { status: 403 });
        }

        const client = supabaseAdmin || supabase;

        if (!supabaseAdmin) {
            console.warn("SUPABASE_SERVICE_ROLE_KEY not set. Using anon key for updates (requires public RLS policy)." );
        }

        const { data, error } = await client
            .from('daily_market_sentiment')
            .upsert({
                date: today,
                sentiment: sentimentData.sentiment,
                summary_en: sentimentData.summary_en,
                summary_ko: sentimentData.summary_ko,
                summary_es: sentimentData.summary_es,
                summary_ja: sentimentData.summary_ja,
                updated_at: new Date().toISOString(),
            }, { onConflict: 'date' })
            .select();

        if (error) {
            console.error("Supabase error:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, data });
    } catch (error: any) {
        console.error("Internal error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}