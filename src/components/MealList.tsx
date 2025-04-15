import { Meal } from '@prisma/client';
import { format } from 'date-fns';

interface MealListProps {
  meals: Meal[];
  onDelete: (id: string) => Promise<void>;
}

export default function MealList({ meals, onDelete }: MealListProps) {
  return (
    <div className="space-y-4">
      {meals.map((meal) => (
        <div
          key={meal.id}
          className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg">{meal.name}</h3>
              <p className="text-gray-600 text-sm">{meal.description}</p>
              <div className="mt-2 space-x-2">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                  {meal.type}
                </span>
                <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                  {meal.calories} calories
                </span>
                <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                  {format(new Date(meal.datetime), 'h:mm a')}
                </span>
              </div>
            </div>
            <button
              onClick={() => onDelete(meal.id)}
              className="text-red-600 hover:text-red-800"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
