import { Meal } from "@/types/meal";
import { MealType } from "@prisma/client";
import { format } from "date-fns";

type MealFormData = {
  name: string;
  description?: string;
  calories: number;
  datetime: Date;
  type: MealType;
};

export async function fetchMeals(filters?: {
  type?: MealType;
  date?: Date;
}): Promise<Meal[]> {
  let url = "/api/meals";
  const params = new URLSearchParams();

  if (filters?.type) {
    params.append("type", filters.type);
  }

  if (filters?.date) {
    params.append("date", format(filters.date, "yyyy-MM-dd"));
  }

  if (params.toString()) {
    url += `?${params.toString()}`;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch meals");
  }

  const data = await response.json();
  return data.map((meal: Meal) => ({
    ...meal,
    datetime: new Date(meal.datetime),
    createdAt: new Date(meal.createdAt),
    updatedAt: new Date(meal.updatedAt),
  }));
}

export async function createMeal(mealData: MealFormData): Promise<Meal> {
  const response = await fetch("/api/meals", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(mealData),
  });

  if (!response.ok) {
    throw new Error("Failed to create meal");
  }

  const data = await response.json();
  return {
    ...data,
    datetime: new Date(data.datetime),
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt),
  };
}

export async function updateMeal(id: string, mealData: MealFormData): Promise<Meal> {
  const response = await fetch(`/api/meals/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(mealData),
  });

  if (!response.ok) {
    throw new Error("Failed to update meal");
  }

  const data = await response.json();
  return {
    ...data,
    datetime: new Date(data.datetime),
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt),
  };
}

export async function deleteMeal(id: string): Promise<void> {
  const response = await fetch(`/api/meals/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete meal");
  }
}
