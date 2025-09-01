'use client';

import { PlusIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { NewTaskForm } from './NewTaskForm';
import { useTasksStore } from '@/app/useTasksStore';
import { is } from 'zod/v4/locales';

type NewTaskDialogProps = {
  status: 'PENDING' | 'ONGOING' | 'FINISHED';
};

export const NewTaskDialog = ({ status }: NewTaskDialogProps) => {
  const {
    createTaskDialog,
    setCreateTaskDialog,
    setTask,
    isEditingTask,
    setIsEditingTask,
  } = useTasksStore();

  return (
    <>
      <Button
        variant='outline'
        size={'icon'}
        className='cursor-pointer w-full'
        onClick={() => {
          setTask({ status: status });
          setIsEditingTask(false);
          setCreateTaskDialog(true);
        }}
      >
        <PlusIcon /> Nueva tarea
      </Button>

      <Dialog open={createTaskDialog} onOpenChange={setCreateTaskDialog}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>
              {isEditingTask ? 'Editar' : 'Nueva'} tarea
            </DialogTitle>
            <DialogDescription>
              {isEditingTask
                ? 'Modifique los datos de la tarea.'
                : 'Llene los datos de la nueva tarea.'}
            </DialogDescription>
          </DialogHeader>
          {/* Form */}
          <NewTaskForm />
        </DialogContent>
      </Dialog>
    </>
  );
};
