import { NextResponse } from 'next/server';
import { PrismaClient } from '@/prisma/generated/prisma';

const prisma = new PrismaClient();

interface Params {
  params: { id: string };
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
