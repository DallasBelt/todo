import { NextResponse } from 'next/server';
import { PrismaClient } from '@/prisma/generated/prisma';

const prisma = new PrismaClient();

interface Params {
  params: { id: string };
}

// PATCH /api/tasks/[id] - Update an existing task
export async function PATCH(req: Request, { params }: Params) {
  try {
    const { id } = params;
    const { title, description, status } = await req.json();

    if (!id)
      return NextResponse.json(
        { error: 'Task ID is required.' },
        { status: 400 }
      );

    // Check if the task exists
    const existingTask = await prisma.task.findUnique({ where: { id } });
    if (!existingTask)
      return NextResponse.json({ error: 'Task not found.' }, { status: 404 });

    // Prepare the data to update
    const dataToUpdate: any = {};
    if (title !== undefined && title !== existingTask.title)
      dataToUpdate.title = title;
    if (description !== undefined && description !== existingTask.description)
      dataToUpdate.description = description;
    if (status !== undefined && status !== existingTask.status)
      dataToUpdate.status = status;

    // If no fields are changed, return an error
    if (Object.keys(dataToUpdate).length === 0)
      return NextResponse.json(
        { error: 'No changes detected.' },
        { status: 400 }
      );

    // Update the task
    const updatedTask = await prisma.task.update({
      where: { id },
      data: dataToUpdate,
    });

    return NextResponse.json(updatedTask);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error updating task.' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, { params }: Params) {
  const { id } = params;

  // Check if the task exists
  const existingTask = await prisma.task.findUnique({ where: { id } });
  if (!existingTask) {
    return NextResponse.json({ error: 'Task not found.' }, { status: 404 });
  }

  // Update the task status to 'DELETED' instead of removing it from the database
  await prisma.task.update({
    where: { id },
    data: { status: 'DELETED' },
  });

  return NextResponse.json({ message: 'Task deleted successfully.' });
}
