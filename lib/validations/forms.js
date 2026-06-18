import { z } from "zod";

export const joinMovementSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  city: z.string().min(1, { message: "City is required" }),
});

export const meetPersonSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  city: z.string().min(1, "City is required"),
  vibe: z.string().min(1, "Vibe is required"),
});

export const footerSubscriberSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
});
