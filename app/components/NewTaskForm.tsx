'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { useTasks } from '../hooks/useTasks';
import { useTasksStore } from '../useTasksStore';
import { newTaskSchema } from '../newTaskSchema';

export const NewTaskForm = () => {
  const { createTaskMutation, updateTaskMutation } = useTasks();
  const { task, isEditingTask } = useTasksStore();

  const form = useForm<z.infer<typeof newTaskSchema>>({
    resolver: zodResolver(newTaskSchema),
    defaultValues: {
      title: isEditingTask ? task.title : '',
      description: isEditingTask ? task.description : '',
    },
  });

  const onSubmit = (values: z.infer<typeof newTaskSchema>) => {
    if (isEditingTask) {
      // Check if there are changes
      if (
        values.title === task.title &&
        values.description === task.description
      ) {
        toast.info('No se detectaron cambios.');
        return;
      }
      updateTaskMutation.mutate({ id: task.id!, task: values });
    } else {
      createTaskMutation.mutate({
        ...values,
        status: task.status,
      });
    }

    // form.reset({ title: '', description: '' });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2.5'>
        <div className='flex flex-col space-y-2.5'>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <Input type='text' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <Input type='text' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='pt-5 md:flex md:justify-center'>
          <Button
            type='submit'
            disabled={createTaskMutation.isPending}
            className='w-full md:w-fit cursor-pointer'
          >
            {isEditingTask ? 'Guardar' : 'Agregar'}
            {createTaskMutation.isPending && (
              <Loader2 className='me-2 animate-spin' />
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
