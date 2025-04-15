"use client";

import { useState } from "react";
import { Meal, mealTypeLabels } from "@/types/meal";
import { format } from "date-fns";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import ConfirmModal from "./ConfirmModal";

interface MealItemProps {
  meal: Meal;
  onEdit: (meal: Meal) => void;
  onDelete: (id: string) => void;
}

export default function MealItem({ meal, onEdit, onDelete }: MealItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(meal.id);
    } catch (error) {
      console.error("Error deleting meal:", error);
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="bg-white shadow rounded-lg p-4 mb-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">{meal.name}</h3>
            <p className="text-sm text-gray-500">
              {format(new Date(meal.datetime), "MMMM d, yyyy h:mm a")}
            </p>
            <span className="inline-block mt-1 px-2 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-800">
              {mealTypeLabels[meal.type]}
            </span>
            <p className="mt-2 text-sm text-gray-700">{meal.description}</p>
            <p className="mt-1 font-medium">{meal.calories} calories</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(meal)}
              className="p-1 rounded-full text-gray-500 hover:bg-gray-200 cursor-pointer"
              aria-label="Edit meal"
            >
              <PencilIcon className="h-5 w-5" />
            </button>
            <button
              onClick={() => setShowConfirmModal(true)}
              className="p-1 rounded-full text-gray-500 hover:bg-gray-200 hover:text-red-500 cursor-pointer"
              disabled={isDeleting}
              aria-label="Delete meal"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={() => {
          handleDelete();
          setShowConfirmModal(false);
        }}
        title="Delete Meal"
        message="Are you sure you want to delete this meal? This action cannot be undone."
      />
    </>
  );
}
