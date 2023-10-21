import { z } from 'zod';

export const formDataSchema = z.object({
  title: z
    .string()
    .min(2, { message: 'Title must be at least 2 characters' })
    .max(50, { message: 'Title cannot exceed 50 characters' }),
  content: z
    .string()
    .min(2, { message: 'Content must be at least 2 characters' })
    .max(500, { message: 'Content cannot exceed 500 characters' }),
});

export const profileDataSchema = z.object({
  username: z
    .string()
    .min(2, { message: 'Username must be at least 2 characters' })
    .max(50, { message: 'Username cannot exceed 50 characters' }),
  tier: z
    .string()
    .min(1, { message: 'User role is required' }) // Check for non-empty value
    .refine((value) => ['enterprise', 'gold', 'silver', 'bronze'].includes(value), {
      message: 'Invalid user role',
    }),

});

export const litDataSchema = z.object({
  content: z
    .string()
    .min(2, { message: 'Content must be at least 2 characters' })
    .max(500, { message: 'Content cannot exceed 500 characters' }),
});