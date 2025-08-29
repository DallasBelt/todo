'use client';

import { PlusIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { NewTaskForm } from './NewTaskForm';
import { useTasksStore } from '@/app/useTasksStore';

export const NewTaskDialog = () => {
  const { createTaskDialog, setCreateTaskDialog } = useTasksStore();

  return (
    <>
      <Button
        variant='outline'
        size={'icon'}
        onClick={() => {
          setCreateTaskDialog(true);
        }}
      >
        <PlusIcon />
      </Button>

      <Dialog open={createTaskDialog} onOpenChange={setCreateTaskDialog}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Nueva tarea</DialogTitle>
            <DialogDescription>
              Llene los datos de la nueva tarea.
            </DialogDescription>
          </DialogHeader>
          {/* Form */}
          <NewTaskForm />
        </DialogContent>
      </Dialog>
    </>
  );
};
