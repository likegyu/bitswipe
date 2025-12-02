import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Define the Zod schema
const MarketSentimentSchema = z.object({
    sentiment: z.enum(["positive", "neutral", "negative"])
        .describe("Determine market sentiment based on news: positive (bullish), neutral (sideways), negative (bearish)."),

    // 각 언어별 요약 요청을 스키마 description에 통합하여 프롬프트 중복 제거
    summary_en: z.string()
        .describe("2-3 sentences English summary. "),

    summary_ko: z.string()
        .describe("2-3 sentences Korean summary. 존댓말 사용(해요체)."),

    summary_es: z.string()
        .describe("2-3 sentences Spanish summary. "),

    summary_ja: z.string()
        .describe("2-3 sentences Japanese summary. "),
});

export type MarketSentiment = z.infer<typeof MarketSentimentSchema>;

export async function getBitcoinMarketSentiment(): Promise<MarketSentiment> {
    const prompt = `Find the latest Bitcoin news from today and analyze the market sentiment.`;

    // 수정된 SYSTEM_INSTRUCTION
    const SYSTEM_INSTRUCTION = `
Role: Crypto market analyst.
Tone: Friendly, professional, direct. NO greetings.
Style: Use natural crypto language (e.g., '횡보', '급등', '급락'). Include causes, upcoming factors, and price outlook. Crucially, identify and highlight any major upcoming events (e.g., 연준 회의, 금리 변동, 규제 변경) that are likely to drive significant price volatility. Conversational tone.
important: Do NOT include any citation numbers or reference markers like [1], [2], [3] in your summaries. Do not parentheses into other languages in one language like 급등(quick rise).
`;
    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-pro-preview",
            contents: prompt,
            config: {
                systemInstruction: {
                    parts: [{ text: SYSTEM_INSTRUCTION }]
                },
                tools: [{ googleSearch: {} }],
                responseMimeType: "application/json",
                responseJsonSchema: zodToJsonSchema(MarketSentimentSchema),
            },
        });

        // Parse and validate the response
        if (!response.text) {
            throw new Error("Empty response from Gemini API");
        }

        const sentimentData = MarketSentimentSchema.parse(JSON.parse(response.text));

        return sentimentData;

    } catch (e) {
        console.error("Failed to get market sentiment", e);
        throw new Error("Failed to get market sentiment");
    }
}