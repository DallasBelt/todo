import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { getTasks } from '../api/getTasks';
import { createTask } from '../api/createTask';

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

  return {
    tasksQuery,
    createTaskMutation,
  };
};
