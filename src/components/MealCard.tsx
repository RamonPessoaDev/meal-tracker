import { format } from "date-fns";
import { Meal } from "@prisma/client";
import { mealTypeLabels } from "@/types/meal";

interface MealCardProps {
  meal: Meal;
  onEdit: (meal: Meal) => void;
  onDelete: (id: string) => void;
}

export default function MealCard({ meal, onEdit, onDelete }: MealCardProps) {
  return (
    <div className="bg-white shadow rounded-lg p-6 mb-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{meal.name}</h3>
          <p className="text-sm text-gray-500">{mealTypeLabels[meal.type]}</p>
          <p className="text-sm text-gray-500">
            {format(new Date(meal.datetime), "MMM d, yyyy h:mm a")}
          </p>
          {meal.description && (
            <p className="mt-2 text-sm text-gray-600">{meal.description}</p>
          )}
          <p className="mt-2 text-sm font-medium text-gray-900">
            {meal.calories} calories
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(meal)}
            className="text-indigo-600 hover:text-indigo-900"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(meal.id)}
            className="text-red-600 hover:text-red-900"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
