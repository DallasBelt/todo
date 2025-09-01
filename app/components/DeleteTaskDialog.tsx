import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

import { useTasks } from '../hooks/useTasks';
import { useTasksStore } from '@/app/useTasksStore';

export const DeleteTaskDialog = () => {
  const { deleteTaskMutation } = useTasks();
  const { deleteTaskDialog, setDeleteTaskDialog, task } = useTasksStore();

  return (
    <AlertDialog open={deleteTaskDialog} onOpenChange={setDeleteTaskDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Está completamente seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no puede deshacerse.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>No, regresar</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              if (task.id) {
                deleteTaskMutation.mutate(task.id);
              }
            }}
          >
            Sí, borrar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
