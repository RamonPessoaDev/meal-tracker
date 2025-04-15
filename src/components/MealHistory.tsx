"use client";

import { useState } from "react";
import { MealType } from "@prisma/client";
import { mealTypeLabels } from "@/types/meal";
import { format } from "date-fns";

interface Meal {
  id: string;
  name: string;
  description: string;
  calories: number;
  type: MealType;
  datetime: string;
}

interface MealHistoryProps {
  onSelectMeal: (meal: Meal) => void;
}

export default function MealHistory({ onSelectMeal }: MealHistoryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [meals, setMeals] = useState<Meal[]>([]);

  const fetchMealHistory = async () => {
    try {
      const response = await fetch("/api/meals");
      const data = await response.json();
      setMeals(data);
    } catch (error) {
      console.error("Error fetching meal history:", error);
    }
  };

  const handleButtonClick = () => {
    if (!isOpen) {
      fetchMealHistory();
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleButtonClick}
        className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-indigo-500 focus:outline-none cursor-pointer"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        Meal History
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 w-96 mt-2 bg-white rounded-md shadow-lg"> 
          <div className="py-1 max-h-96 overflow-y-auto">
            {meals.length === 0 ? (
              <div className="px-4 py-2 text-sm text-gray-700">
                No meal history found
              </div>
            ) : (
              meals.map((meal) => (
                <button
                  key={meal.id}
                  onClick={() => {
                    onSelectMeal(meal);
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-3 text-left hover:bg-gray-200 focus:outline-none focus:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-indigo-600">
                        {meal.name}
                      </p>
                      <p className="text-sm text-gray-600 truncate max-w-[200px]">
                        {meal.description || "No description"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-indigo-800">
                        {mealTypeLabels[meal.type]}
                      </p>
                      <p className="text-sm text-red-500">{meal.calories} cal</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {format(new Date(meal.datetime), "MMM d, yyyy 'at' h:mm a")}
                  </p>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
