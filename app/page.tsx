'use client';

import { Check, Loader2, Trash2 } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { useTasks } from '@/app/hooks/useTasks';
import { NewTaskDialog } from './components/NewTaskDialog';

const statuses = [
  { key: 'PENDING', label: 'Pendientes' },
  { key: 'ONGOING', label: 'En Proceso' },
  { key: 'FINISHED', label: 'Finalizadas' },
] as const;

export default function Tasks() {
  const { tasksQuery } = useTasks();
  const tasks = tasksQuery?.data || [];

  if (tasksQuery.isLoading) {
    return <Loader2 size={50} className='animate-spin' />;
  }

  return (
    <div className='flex flex-col md:flex-row gap-4 px-4 md:px-36 py-12'>
      {statuses.map((status) => (
        <div key={status.key} className='flex-1 min-w-[250px]'>
          <h2 className='text-lg font-bold mb-2 text-center'>{status.label}</h2>
          <div className='min-h-[200px]'>
            {tasks
              .filter((task: any) => task.status === status.key)
              .map((task: any) => (
                <Card key={task.id} className='mb-3 mx-2.5'>
                  <CardHeader>
                    <CardTitle>{task.title}</CardTitle>
                    <p className='text-gray-600 text-sm'>{task.description}</p>
                  </CardHeader>
                  <CardContent className='flex justify-end gap-1'>
                    <Button
                      variant='outline'
                      size='icon'
                      className='cursor-pointer'
                    >
                      <Check />
                    </Button>
                    <Button
                      variant='outline'
                      size='icon'
                      className='cursor-pointer'
                    >
                      <Trash2 />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            <div className='flex justify-end mt-2.5 mx-2.5'>
              <NewTaskDialog />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
