/* eslint-disable react/no-unescaped-entities */
'use client';

import { Meal } from "@prisma/client";
import { format } from "date-fns";
import { mealTypeLabels } from "@/types/meal";

interface DashboardPreviewProps {
  meals: Meal[];
}

export default function DashboardPreview({ meals }: DashboardPreviewProps) {
  const today = format(new Date(), 'yyyy-MM-dd');
  const todayMeals = meals.filter(meal => 
    format(new Date(meal.datetime), 'yyyy-MM-dd') === today
  );
  const todayCalories = todayMeals.reduce((sum, meal) => sum + meal.calories, 0);

  const recentMeal = [...meals].sort((a, b) => 
    new Date(b.datetime).getTime() - new Date(a.datetime).getTime()
  )[0];

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Today's Summary</h2>
      <div className="space-y-4">
        <div>
          <p className="text-gray-600">Total Meals Today</p>
          <p className="text-2xl font-bold text-white bg-green-500 rounded-sm px-2">{todayMeals.length}</p>
        </div>
        <div>
          <p className="text-gray-600">Total Calories Today</p>
          <p className="text-2xl font-bold text-white bg-red-500 rounded-sm px-2">{todayCalories}</p>
        </div>
        {recentMeal && (
          <div>
            <p className="text-gray-600 mb-2">Most Recent Meal</p>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{recentMeal.name}</p>
                  <p className="text-sm text-gray-600">
                    {format(new Date(recentMeal.datetime), 'MMM d, h:mm a')}
                  </p>
                  <p className="text-sm text-indigo-600 mt-1">
                    {mealTypeLabels[recentMeal.type]}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Calories</p>
                  <p className="font-medium">{recentMeal.calories}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
