"use client";

import { Meal } from "@/types/meal";

interface CaloriesSummaryProps {
  meals: Meal[];
  date?: Date;
}

export default function CaloriesSummary({ meals, date }: CaloriesSummaryProps) {
  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);

  return (
    <div className="bg-white shadow rounded-lg p-4 mb-6">
      <h2 className="text-lg font-bold mb-2">
        {date ? `Calories for ${date.toLocaleDateString()}` : "Total Calories"}
      </h2>
      <p className="text-3xl font-bold text-red-500">{totalCalories}</p>
    </div>
  );
}
