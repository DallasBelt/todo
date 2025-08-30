import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { getTasks } from '../api/getTasks';
import { createTask } from '../api/createTask';
import { deleteTask } from '../api/deleteTask';

import { useTasksStore } from '@/app/useTasksStore';

export const useTasks = () => {
  const queryClient = useQueryClient();

  const { setCreateTaskDialog } = useTasksStore();

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
    mutationFn: (task: {
      id: string;
      title: string;
      description?: string;
      status: string;
    }) => {
      return fetch(`/api/tasks/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      }).then((res) => {
        if (!res.ok) {
          throw new Error('Error al actualizar la tarea');
        }
        return res.json();
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('¡Tarea actualizada exitósamente!');
    },
    onError: (error) => {
      toast.error('Error al actualizar la tarea.', {
        description: error.message,
      });
    },
  });

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
    deleteTaskMutation,
  };
};
