import { MealType } from "@prisma/client";

export interface Meal {
  id: string;
  name: string;
  description: string;
  calories: number;
  datetime: Date;
  type: MealType;
  createdAt: Date;
  updatedAt: Date;
}

export const mealTypeLabels: Record<MealType, string> = {
  BREAKFAST: "Breakfast",
  LUNCH: "Lunch",
  AFTERNOON_SNACK: "Afternoon Snack",
  DINNER: "Dinner",
};
