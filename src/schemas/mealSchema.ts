import { z } from "zod";
import { MealType } from "@prisma/client";

export const mealSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  calories: z.number().min(0, "Calories must be a positive number"),
  type: z.nativeEnum(MealType),
  date: z.date()
});
