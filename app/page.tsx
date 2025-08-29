'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Trash2 } from 'lucide-react';

const mockTasks = [
  { id: '1', title: 'Tarea 1', status: 'PENDING' },
  { id: '2', title: 'Tarea 2', status: 'ONGOING' },
  { id: '3', title: 'Tarea 3', status: 'FINISHED' },
  { id: '4', title: 'Tarea 4', status: 'PENDING' },
  { id: '5', title: 'Tarea 5', status: 'ONGOING' },
];

const statuses = [
  { key: 'PENDING', label: 'Pendientes' },
  { key: 'ONGOING', label: 'En Proceso' },
  { key: 'FINISHED', label: 'Finalizadas' },
] as const;

export default function Tasks() {
  return (
    <div className='flex flex-col md:flex-row gap-4 px-4 md:px-36 py-12'>
      {statuses.map((status) => (
        <div key={status.key} className='flex-1 min-w-[250px]'>
          <h2 className='text-lg font-bold mb-2 text-center'>{status.label}</h2>
          <div className='min-h-[200px]'>
            {mockTasks
              .filter((task) => task.status === status.key)
              .map((task) => (
                <Card key={task.id} className='mb-3 mx-2.5'>
                  <CardHeader>
                    <CardTitle>{task.title}</CardTitle>
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
          </div>
        </div>
      ))}
    </div>
  );
}
