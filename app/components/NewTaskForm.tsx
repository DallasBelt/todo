'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
import { newTaskSchema } from '../newTaskSchema';

export const NewTaskForm = () => {
  const form = useForm<z.infer<typeof newTaskSchema>>({
    resolver: zodResolver(newTaskSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const onSubmit = (values: z.infer<typeof newTaskSchema>) => {
    createTaskMutation.mutate(values);
    form.reset();
  };

  const { createTaskMutation } = useTasks();

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
            className='w-full md:w-fit'
          >
            Agregar
            {createTaskMutation.isPending && (
              <Loader2 className='me-2 animate-spin' />
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
