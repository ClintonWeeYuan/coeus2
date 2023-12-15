import { z } from 'zod'

const defaultRequireMessage = 'This field is required'

export const newUserSchema = z.object({
  firstName: z.string().min(1, { message: defaultRequireMessage }),
  lastName: z.string().min(1, { message: defaultRequireMessage }),
  email: z
    .string()
    .min(1, { message: defaultRequireMessage })
    .email({ message: 'Invalid email address' }),
  password: z
    .string({ required_error: defaultRequireMessage })
    .min(6, { message: 'Your password must be at least 6 characters' }),
})

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: defaultRequireMessage })
    .email({ message: 'Invalid email address' }),
  password: z
    .string({ required_error: defaultRequireMessage })
    .min(1, { message: defaultRequireMessage }),
})

export const newClassSchema = z.object({
  ownerId: z.number(),
  title: z.string(),
  studentName: z.string(),
  classType: z.enum(['PRIVATE', 'GROUP']),
  startDate: z.date(),
  endDate: z.date(),
  alert: z.string(),
  link: z.string(),
})

export const existingClassSchema = newClassSchema.extend({
  id: z.number(),
})

export type ClassEvent = z.infer<typeof existingClassSchema>
