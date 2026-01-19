import { pgTable, text, serial, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===
export const analyses = pgTable("analyses", {
  id: serial("id").primaryKey(),
  imageUrl: text("image_url").notNull(),
  result: jsonb("result").notNull(), // Stores the structured report
  createdAt: timestamp("created_at").defaultNow(),
});

// === BASE SCHEMAS ===
export const insertAnalysisSchema = createInsertSchema(analyses).omit({ id: true, createdAt: true });

// === EXPLICIT API CONTRACT TYPES ===
export type Analysis = typeof analyses.$inferSelect;
export type InsertAnalysis = z.infer<typeof insertAnalysisSchema>;

// Analysis Report Structure (The structured JSON returned by AI simulation)
export const analysisReportSchema = z.object({
  trend: z.enum(["Uptrend", "Downtrend", "Sideways"]),
  fundamentals: z.string(),
  entrySide: z.enum(["Long", "Short"]),
  entryPoint: z.string(),
  confirmation: z.enum(["Yes", "No"]),
  riskReward: z.string(),
  stopLoss: z.string(),
  takeProfit: z.string(),
  exitStrategy: z.string(),
  psychology: z.string(),
  logic: z.string(),
  probability: z.string(), // e.g., "75%"
  riskLevel: z.enum(["High", "Medium", "Low"]),
});

export type AnalysisReport = z.infer<typeof analysisReportSchema>;

// Request/Response types
export type CreateAnalysisRequest = {
  imageUrl: string; // URL returned after upload
};

export type AnalysisResponse = Analysis & {
  parsedResult: AnalysisReport; // Helper for frontend type safety if needed, though 'result' is jsonb
};
