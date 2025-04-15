import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { MealType } from "@prisma/client";
import { startOfDay, endOfDay, parseISO } from "date-fns";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get("type") as MealType | null;
    const dateParam = searchParams.get("date");

    const whereClause: {
      type?: MealType;
      datetime?: {
        gte?: Date;
        lte?: Date;
      };
    } = {};

    if (type) {
      whereClause.type = type;
    }

    if (dateParam) {
      const date = parseISO(dateParam);
      whereClause.datetime = {
        gte: startOfDay(date),
        lte: endOfDay(date),
      };
    }

    const meals = await prisma.meal.findMany({
      where: whereClause,
      orderBy: {
        datetime: "desc",
      },
    });

    return NextResponse.json(meals);
  } catch (error) {
    console.error("Error fetching meals:", error);
    return NextResponse.json(
      { error: "Failed to fetch meals" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    if (!data.name || !data.calories || !data.datetime || !data.type) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const calories = Number(data.calories);
    if (isNaN(calories)) {
      return NextResponse.json(
        { error: "Calories must be a number" },
        { status: 400 }
      );
    }  

    const meal = await prisma.meal.create({
      data: {
        name: data.name,
        description: data.description || "",
        calories: calories,
        datetime: new Date(data.datetime),
        type: data.type as MealType
      }
    });

    return NextResponse.json(meal, { status: 201 });
  } catch (error) {
    console.error("Error creating meal:", error);
    return NextResponse.json(
      { error: "Failed to create meal" },
      { status: 500 }
    );
  }
}
