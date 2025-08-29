import { NextResponse } from 'next/server';
import { PrismaClient } from '@/prisma/generated/prisma';

const prisma = new PrismaClient();

// GET /api/tasks - Get all tasks
export async function GET() {
  const tasks = await prisma.task.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(tasks);
}

// POST /api/tasks - Create a new task
export async function POST(req: Request) {
  try {
    const { title, description } = await req.json();

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const newTask = await prisma.task.create({
      data: {
        title,
        description, // optional
      },
    });

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error creating task' }, { status: 500 });
  }
}

// PATCH /api/tasks - Update an existing task
export async function PATCH(req: Request) {
  try {
    const { id, title, description, status } = await req.json();

    // Validate input
    if (!id)
      return NextResponse.json(
        { error: 'Task ID is required' },
        { status: 400 }
      );

    // Check if task exists
    const existingTask = await prisma.task.findUnique({ where: { id } });
    if (!existingTask)
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });

    // Prepare data to update
    const dataToUpdate: any = {};
    if (title !== undefined && title !== existingTask.title)
      dataToUpdate.title = title;
    if (description !== undefined && description !== existingTask.description)
      dataToUpdate.description = description;
    if (status !== undefined && status !== existingTask.status)
      dataToUpdate.status = status;

    // If no fields to update, return early
    if (Object.keys(dataToUpdate).length === 0) {
      return NextResponse.json(
        { error: 'No changes detected' },
        { status: 400 }
      );
    }

    // Update the task
    const updatedTask = await prisma.task.update({
      where: { id },
      data: dataToUpdate,
    });

    return NextResponse.json(updatedTask);
  } catch (error) {
    return NextResponse.json({ error: 'Error updating task' }, { status: 500 });
  }
}

// DELETE /api/tasks - Delete a task
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    // Validate input
    if (!id) {
      return NextResponse.json(
        { error: 'Task ID is required' },
        { status: 400 }
      );
    }

    // Check if task exists
    const existingTask = await prisma.task.findUnique({ where: { id } });
    if (!existingTask) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    // Delete the task
    await prisma.task.delete({ where: { id } });

    return NextResponse.json({ message: 'Task deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting task' }, { status: 500 });
  }
}
