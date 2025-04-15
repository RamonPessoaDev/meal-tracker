"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MealType } from "@prisma/client";
import { mealTypeLabels } from "@/types/meal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MealHistory from "./MealHistory";

const mealSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  calories: z.number().min(1, "Calories must be at least 1"),
  type: z.nativeEnum(MealType, {
    errorMap: () => ({ message: "Please select a meal type" }),
  }),
  datetime: z.date(),
});

export type MealFormData = z.infer<typeof mealSchema>;

interface MealFormProps {
  initialData?: {
    id: string;
    name: string;
    description: string;
    calories: number;
    datetime: Date;
    type: MealType;
  };
  onSubmit: (data: MealFormData) => Promise<void>;
  onCancel: () => void;
}

interface MealHistoryItem {
  id: string;
  name: string;
  description: string;
  calories: number;
  type: MealType;
  datetime: string;
}

export default function MealForm({
  initialData,
  onSubmit,
  onCancel,
}: MealFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<MealFormData>({
    resolver: zodResolver(mealSchema),
    defaultValues: initialData
      ? {
          name: initialData.name,
          description: initialData.description,
          calories: initialData.calories,
          type: initialData.type,
          datetime: initialData.datetime,
        }
      : {
          name: "",
          description: "",
          calories: 0,
          type: undefined as unknown as MealType,
          datetime: new Date(),
        },
  });

  const handleSelectMeal = (meal: MealHistoryItem) => {
    setValue("name", meal.name);
    setValue("description", meal.description);
    setValue("calories", meal.calories);
    setValue("type", meal.type);
  };

  const datetime = watch("datetime");

  const onFormSubmit: SubmitHandler<MealFormData> = async (data, event) => {
    event?.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(data);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-gray-900">
          {initialData ? "Edit Meal" : "Add New Meal"}
        </h3>
        {!initialData && <MealHistory onSelectMeal={handleSelectMeal} />}
      </div>
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Meal Name
        </label>
        <input
          id="name"
          type="text"
          {...register("name")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          {...register("description")}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="calories"
          className="block text-sm font-medium text-gray-700"
        >
          Calories
        </label>
        <input
          id="calories"
          type="number"
          min="0"
          {...register("calories", { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.calories && (
          <p className="mt-1 text-sm text-red-600">{errors.calories.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="datetime"
          className="block text-sm font-medium text-gray-700"
        >
          Date and Time
        </label>
        <DatePicker
          selected={datetime}
          onChange={(date: Date | null) => {
            if (date) {
              setValue("datetime", date, { shouldValidate: true });
            }
          }}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="MMMM d, yyyy h:mm aa"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.datetime && (
          <p className="mt-1 text-sm text-red-600">{errors.datetime.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Meal Type
        </label>
        <div className="mt-1 space-y-2">
          {Object.entries(MealType).map(([key, value]) => (
            <div key={key} className="flex items-center">
              <input
                id={`type-${value}`}
                type="radio"
                value={value}
                {...register("type")}
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
              />
              <label
                htmlFor={`type-${value}`}
                className="ml-3 block text-sm font-medium text-gray-700"
              >
                {mealTypeLabels[value as MealType]}
              </label>
            </div>
          ))}
        </div>
        {errors.type && (
          <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
        )}
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 cursor-pointer"
        >
          {isSubmitting
            ? "Saving..."
            : initialData
            ? "Update Meal"
            : "Add Meal"}
        </button>
      </div>
    </form>
  );
}
