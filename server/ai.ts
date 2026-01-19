import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function analyzeChart(imageBase64: string) {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const result = await model.generateContent([
    {
      inlineData: {
        data: imageBase64,
        mimeType: "image/png",
      },
    },
    `
You are a professional trading chart analyst.

Analyze this chart and provide:
• Market Trend
• Support & Resistance
• Buy or Sell Bias
• Entry Zone
• Stop Loss
• Risk Level

Give clear, concise trading-style analysis.
`,
  ]);

  return result.response.text();
}