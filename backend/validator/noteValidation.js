import { z } from 'zod';

export const noteValidationSchema = z.object({
  title: z.string().trim().min(3, 'Title must be at least 3 characters'),
});