"use client";

import { useState } from "react";
import { MealType } from "@prisma/client";
import { mealTypeLabels } from "@/types/meal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface MealFilterProps {
  onFilterChange: (filters: { type?: MealType; date?: Date }) => void;
}

export default function MealFilter({ onFilterChange }: MealFilterProps) {
  const [selectedType, setSelectedType] = useState<MealType | undefined>(undefined);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const handleTypeChange = (type: MealType | undefined) => {
    setSelectedType(type);
    onFilterChange({ 
      type, 
      date: selectedDate || undefined 
    });
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    onFilterChange({ 
      type: selectedType, 
      date: date || undefined 
    });
  };

  const clearFilters = () => {
    setSelectedType(undefined);
    setSelectedDate(null);
    onFilterChange({});
  };

  return (
    <div className="bg-white shadow rounded-lg p-4 mb-6">
      <h2 className="text-lg font-semibold mb-4">Filter Meals</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Meal Type
          </label>
          <div className="flex flex-wrap gap-2">
            {Object.entries(MealType).map(([key, value]) => (
              <button
                key={key}
                onClick={() =>
                  handleTypeChange(
                    selectedType === value ? undefined : (value as MealType)
                  )
                }
                className={`px-3 py-1 text-sm rounded-full ${
                  selectedType === value
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-indigo-600 hover:text-white cursor-pointer"
                }`}
              >
                {mealTypeLabels[value as MealType]}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="MMMM d, yyyy"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm cursor-pointer"
          />
        </div>

        <button
          onClick={clearFilters}
          className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-800 hover:bg-indigo-600 hover:text-white cursor-pointer"
        >
          Clear filters
        </button>
      </div>
    </div>
  );
}
