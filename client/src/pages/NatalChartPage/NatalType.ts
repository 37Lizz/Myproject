import { z } from 'zod';

export const NatalSchema = z.object({
personal_day_number: z.number(),
considered_date: z.number(),
report: z.string(),
});


export type Natal = z.infer<typeof NatalSchema>;

