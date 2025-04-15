"use client";

import { useState, useEffect, useCallback } from "react";
import { Meal } from "@/types/meal";
import { MealType } from "@prisma/client";
import MealItem from "@/components/MealItem";
import MealFilter from "@/components/MealFilter";
import MealModal from "@/components/MealModal";
import CaloriesSummary from "@/components/CaloriesSummary";
import { PlusIcon } from "@heroicons/react/24/solid";
import {
  fetchMeals,
  createMeal,
  updateMeal,
  deleteMeal,
} from "@/services/mealService";

type MealFormData = {
  name: string;
  description?: string;
  calories: number;
  datetime: Date;
  type: MealType;
};

export default function Dashboard() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMeal, setCurrentMeal] = useState<Meal | undefined>(undefined);
  const [filters, setFilters] = useState<{ type?: MealType; date?: Date }>({});

  const loadMeals = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchMeals(filters);
      console.log("Fetched meals with filters:", filters);
      console.log("Fetched meals:", data);
      setMeals(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    loadMeals();
  }, [loadMeals]);

  const handleAddMeal = async (data: MealFormData) => {
    try {
      await createMeal(data);
      setIsModalOpen(false);
      loadMeals();
    } catch (err) {
      console.error(err);
      alert("Failed to add meal. Please try again.");
    }
  };

  const handleEditMeal = async (data: MealFormData) => {
    if (!currentMeal) return;

    try {
      await updateMeal(currentMeal.id, data);
      setIsModalOpen(false);
      setCurrentMeal(undefined);
      loadMeals();
    } catch (err) {
      console.error(err);
      alert("Failed to update meal. Please try again.");
    }
  };

  const handleDeleteMeal = async (id: string) => {
    try {
      await deleteMeal(id);
      loadMeals();
    } catch (err) {
      console.error(err);
      alert("Failed to delete meal. Please try again.");
    }
  };

  const openAddModal = () => {
    setCurrentMeal(undefined);
    setIsModalOpen(true);
  };

  const openEditModal = (meal: Meal) => {
    setCurrentMeal(meal);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Meal Tracker</h1>
        <button
          onClick={openAddModal}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Meal
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <MealFilter onFilterChange={setFilters} />
          <CaloriesSummary meals={meals} date={filters.date} />
        </div>

        <div className="md:col-span-2">
          {isLoading ? (
            <div className="text-center py-8">
              <p>Loading meals...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-600">
              <p>{error}</p>
              <button
                onClick={loadMeals}
                className="mt-2 text-indigo-600 hover:text-indigo-800"
              >
                Try again
              </button>
            </div>
          ) : meals.length === 0 ? (
            <div className="text-center py-8 bg-white shadow rounded-lg">
              <p className="text-gray-500">
                No meals found for the selected filters.
              </p>
              <button
                onClick={openAddModal}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Add your first meal
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {meals.map((meal) => (
                <MealItem
                  key={meal.id}
                  meal={meal}
                  onEdit={openEditModal}
                  onDelete={handleDeleteMeal}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <MealModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setCurrentMeal(undefined);
        }}
        initialData={currentMeal}
        onSubmit={currentMeal ? handleEditMeal : handleAddMeal}
      />
    </div>
  );
}
