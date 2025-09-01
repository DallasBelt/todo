import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { getTasks } from '../api/getTasks';
import { createTask } from '../api/createTask';
import { deleteTask } from '../api/deleteTask';
import { updateTask } from '../api/updateTask';

import { useTasksStore } from '@/app/useTasksStore';

export const useTasks = () => {
  const queryClient = useQueryClient();

  const { setIsEditingTask, setCreateTaskDialog } = useTasksStore();

  const tasksQuery = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
  });

  const createTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('¡Tarea creada exitósamente!');
      setCreateTaskDialog(false);
    },
    onError: (error) => {
      toast.error('Error al crear la tarea.', { description: error.message });
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: ({
      id,
      task,
    }: {
      id: string;
      task: {
        title: string;
        description?: string;
        status?: 'PENDING' | 'ONGOING' | 'FINISHED';
      };
    }) => updateTask(id, task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('¡Tarea actualizada exitósamente!');
      setCreateTaskDialog(false);
    },
    onError: (error) => {
      toast.error('Error al actualizar la tarea.', {
        description: error.message,
      });
    },
  });

  const markTaskPending = (task: {
    id: string;
    title: string;
    description: string;
  }) => {
    updateTaskMutation.mutate({
      id: task.id,
      task: {
        title: task.title,
        description: task.description,
        status: 'PENDING',
      },
    });
  };

  const markTaskOngoing = (task: {
    id: string;
    title: string;
    description: string;
  }) => {
    updateTaskMutation.mutate({
      id: task.id,
      task: {
        title: task.title,
        description: task.description,
        status: 'ONGOING',
      },
    });
  };

  const markTaskFinished = (task: { id: string; title: string }) => {
    updateTaskMutation.mutate({
      id: task.id,
      task: {
        title: task.title,
        status: 'FINISHED',
      },
    });
  };

  const deleteTaskMutation = useMutation({
    mutationFn: (id: string) => deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('¡Tarea eliminada exitósamente!');
    },
    onError: (error) => {
      toast.error('Error al eliminar la tarea.', {
        description: error.message,
      });
    },
  });

  return {
    tasksQuery,
    createTaskMutation,
    updateTaskMutation,
    markTaskPending,
    markTaskOngoing,
    markTaskFinished,
    deleteTaskMutation,
  };
};
