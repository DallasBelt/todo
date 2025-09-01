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
    const { title, description, status } = await req.json();

    if (!title) {
      return NextResponse.json(
        { error: 'Title is required.' },
        { status: 400 }
      );
    }

    const newTask = await prisma.task.create({
      data: {
        title,
        description, // optional
        status: status ?? 'PENDING', // default to 'PENDING' if not provided
      },
    });

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error creating task.' },
      { status: 500 }
    );
  }
}
