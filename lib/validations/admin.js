import { z } from "zod";

export const createCircleSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.string().min(1, "Type is required"),
  status: z.enum(["forming", "active", "completed", "archived"]).optional().default("forming"),
  startDate: z.string().optional().nullable(),
  endDate: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
});

export const createEventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  date: z.string().min(1, "Date is required"),
  location: z.string().min(1, "Location is required"),
  description: z.string().optional().nullable(),
  capacity: z.string().optional().nullable(), // Usually string from FormData
  price: z.string().optional().nullable(),    // Usually string from FormData
});
