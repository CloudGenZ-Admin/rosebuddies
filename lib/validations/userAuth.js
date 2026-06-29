import { z } from "zod";

export const userSignupSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const userLoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const completeProfileSchema = z.object({
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  socialLink: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
});

export const userPreferenceSchema = z.object({
  quizAnswers: z.array(
    z.object({
      question: z.number().int(),
      questionText: z.string().min(1, "Question text is required"),
      responses: z.array(z.string())
    })
  )
});
