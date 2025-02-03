import { z } from 'zod';

export const userRegistrationSchema = z.object({
  userName: z.string().min(5, 'Username must be at least 5 characters'),
  email: z.string().email(),
  password: z.string().min(8, 'password must be at least 5 characters'),
});

export const userLoginSchema = z.object({
  email: z.string().email().min(5, 'Username must be at least 5 characters'),
  password: z.string().min(8, 'password must be at least 5 characters'),
});