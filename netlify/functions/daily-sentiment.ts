import { schedule, Handler } from '@netlify/functions';
import { getBitcoinMarketSentiment } from '@/lib/gemini'; // 경로가 맞는지 확인 필요 (상대 경로 권장: ../../lib/gemini)
import { supabase, supabaseAdmin } from '@/lib/supabaseClient'; // 경로 확인 필요

// Netlify Function 핸들러
const scheduledTaskHandler: Handler = async (event, context) => {
    try {
        console.log("Starting market sentiment update (Scheduled)...");

        // 1. Gemini로 데이터 가져오기
        const sentimentData = await getBitcoinMarketSentiment();
        console.log("Received sentiment data:", sentimentData);

        // 2. 한국 시간(KST) 날짜 계산
        // Netlify 서버는 기본적으로 UTC이므로 9시간을 더해 한국 날짜를 구합니다.
        const now = new Date();
        const koreaTime = new Date(now.getTime() + (9 * 60 * 60 * 1000));
        const today = koreaTime.toISOString().split('T')[0]; // YYYY-MM-DD (KST 기준)

        const client = supabaseAdmin || supabase;

        if (!supabaseAdmin) {
            console.warn("SUPABASE_SERVICE_ROLE_KEY not set. Using anon key.");
        }

        // 3. Supabase 업데이트
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
            return {
                statusCode: 500,
                body: JSON.stringify({ error: error.message }),
            };
        }

        console.log("Update success:", data);
        return {
            statusCode: 200,
            body: JSON.stringify({ success: true, data }),
        };

    } catch (error: any) {
        console.error("Internal error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};

// Cron 표현식: 매일 UTC 15:00 (한국 시간 00:00)
export const handler = schedule("0 15 * * *", scheduledTaskHandler);