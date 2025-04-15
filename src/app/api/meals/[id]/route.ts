import { type NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

type RouteParams = {
  params: {
    id: string;
  };
};

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const meal = await prisma.meal.findUnique({
      where: { id: params.id },
    });

    if (!meal) {
      return Response.json({ error: 'Meal not found' }, { status: 404 });
    }

    return Response.json(meal);
  } catch (error) {
    console.error('GET Error:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const data = await request.json();
    const calories = Number(data.calories);

    if (!data.name || isNaN(calories) || !data.datetime || !data.type) {
      return Response.json(
        { error: 'Invalid or missing fields' },
        { status: 400 }
      );
    }

    const updatedMeal = await prisma.meal.update({
      where: { id: params.id },
      data: {
        name: data.name,
        description: data.description || '',
        calories,
        datetime: new Date(data.datetime),
        type: data.type,
      },
    });

    return Response.json(updatedMeal);
  } catch (error) {
    console.error('PUT Error:', error);
    return Response.json(
      { error: 'Failed to update meal' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    await prisma.meal.delete({
      where: { id: params.id },
    });
    return Response.json({ success: true });
  } catch (error) {
    console.error('DELETE Error:', error);
    return Response.json(
      { error: 'Failed to delete meal' },
      { status: 500 }
    );
  }
}