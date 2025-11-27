import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Define the Zod schema
const MarketSentimentSchema = z.object({
    sentiment: z.enum(["very_positive", "positive", "neutral", "negative", "very_negative"]).describe("The overall sentiment of the market based on the news. Use 5-level scale: very_positive (strong bullish), positive (mildly bullish), neutral, negative (mildly bearish), very_negative (strong bearish)."),
    summary_en: z.string().describe("A short summary of the market situation in English (1-2 sentences)."),
    summary_ko: z.string().describe("A short summary of the market situation in Korean (1-2 sentences)."),
    summary_es: z.string().describe("A short summary of the market situation in Spanish (1-2 sentences)."),
    summary_ja: z.string().describe("A short summary of the market situation in Japanese (1-2 sentences)."),
});

export type MarketSentiment = z.infer<typeof MarketSentimentSchema>;

export async function getBitcoinMarketSentiment(): Promise<MarketSentiment> {
    const prompt = `
You are a crypto market analyst.
1. Search for the latest news about Bitcoin(BTC) from today.
2. Analyze the overall sentiment of the market based on these news using a 5-LEVEL SCALE:
   - "very_positive": Strong bullish sentiment with multiple positive catalysts
   - "positive": Mildly bullish with positive indicators
   - "neutral": Mixed signals or consolidation phase
   - "negative": Mildly bearish with concerning factors
   - "very_negative": Strong bearish sentiment with multiple negative catalysts
3. Identify the KEY CAUSES and reasons behind this sentiment.
4. Identify upcoming factors that could impact Bitcoin in the near future.
5. Provide a brief price prediction based on your analysis.
6. Write a comprehensive summary(2 - 3 sentences) of the market situation in each language that includes:
   - Current sentiment and its main causes
   - Key upcoming factors that could affect the price
   - Your price prediction and outlook
   - ** IMPORTANT **: Do NOT start with greetings like "Hello" or "Today". Go STRAIGHT to the point.
   - ** LANGUAGE STYLE **: Use NATURAL, CONVERSATIONAL language that native speakers actually use.
     * Avoid stiff, AI-generated phrases
     * Use local colloquialisms and natural expressions (e.g., Korean: "급등", "조정", "횡보"; English: "rally", "dump", "sideways")
     * Write as if you're chatting with a friend who understands crypto, not writing a formal report
   - Example: "Bitcoin is consolidating around $95K as ETF inflows pause after record weeks. The upcoming Federal Reserve meeting and potential regulatory clarity could drive volatility. Analysts predict a potential breakout to $100K if institutional demand resumes."
   - Tone: Friendly but professional and direct.

You MUST respond with ONLY a valid JSON object in this exact format:
{
  "sentiment": "very_positive" | "positive" | "neutral" | "negative" | "very_negative",
  "summary_en": "English summary here",
  "summary_ko": "Korean summary here",
  "summary_es": "Spanish summary here",
  "summary_ja": "Japanese summary here"
}

CRITICAL RULES:
- Do NOT include any citation numbers or reference markers like [1], [2], [3] in your summaries
- Do NOT include any other text, markdown formatting, or code blocks
- Just provide the raw JSON object with clean summaries
`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-pro",
            contents: prompt,
            config: {
                tools: [{ googleSearch: {} }],
            },
        });

        // Parse and validate the response
        if (!response.text) {
            throw new Error("Empty response from Gemini API");
        }

        // Clean the response text (remove potential markdown code blocks)
        let jsonText = response.text.trim();
        if (jsonText.startsWith("```json")) {
            jsonText = jsonText.replace(/^```json\s*/, "").replace(/\s*```$/, "");
        } else if (jsonText.startsWith("```")) {
            jsonText = jsonText.replace(/^```\s*/, "").replace(/\s*```$/, "");
        }

        const sentimentData = MarketSentimentSchema.parse(JSON.parse(jsonText));

        return sentimentData;

    } catch (e) {
        console.error("Failed to get market sentiment", e);
        throw new Error("Failed to get market sentiment");
    }
}