import { z } from 'zod';
import { insertAnalysisSchema, analyses, analysisReportSchema } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  analysis: {
    create: {
      method: 'POST' as const,
      path: '/api/analyze',
      // Input is multipart form data handled by middleware, but we validate the body structure
      input: z.object({}), 
      responses: {
        201: z.custom<typeof analyses.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    list: {
      method: 'GET' as const,
      path: '/api/history',
      responses: {
        200: z.array(z.custom<typeof analyses.$inferSelect>()),
      },
    },
  },
};

// Helper for URL building
export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export type AnalysisReport = z.infer<typeof analysisReportSchema>;
