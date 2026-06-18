import { z } from "zod";

export const joinMovementSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  city: z.string().min(1, { message: "City is required" }),
});
